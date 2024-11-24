import { Injectable } from '@nestjs/common';
import { createWriteStream, WriteStream, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { EOL } from 'os';

export enum LogLevel {
  ERROR = 'ERROR',
  WARN = 'WARN',
  INFO = 'INFO',
  DEBUG = 'DEBUG',
}

@Injectable()
export class LoggingService {
  private logStream: WriteStream;
  private currentLogFile: string;
  private currentSize: number = 0;
  private readonly maxSize: number;
  private readonly logLevel: LogLevel;

  constructor() {
    this.maxSize = Number(process.env.LOG_FILE_SIZE_KB || 1024) * 1024; // Convert to bytes
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || LogLevel.INFO;
    this.setupLogFile();
    this.setupProcessHandlers();
  }

  private setupLogFile() {
    const logsDir = join(process.cwd(), 'logs');

    if (!existsSync(logsDir)) {
      mkdirSync(logsDir);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    this.currentLogFile = join(process.cwd(), 'logs', `app-${timestamp}.log`);
    this.logStream = createWriteStream(this.currentLogFile, { flags: 'a' });
  }

  private setupProcessHandlers() {
    process.on('uncaughtException', (error) => {
      this.error('Uncaught Exception', { error: error.stack });
      process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
      this.error('Unhandled Rejection', { reason });
    });
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private writeLog(level: LogLevel, message: string, meta?: any) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toISOString();
    const logEntry =
      JSON.stringify({
        timestamp,
        level,
        message,
        ...meta,
      }) + EOL;

    this.currentSize += Buffer.byteLength(logEntry);

    if (this.currentSize >= this.maxSize) {
      this.logStream.end();
      this.setupLogFile();
      this.currentSize = Buffer.byteLength(logEntry);
    }

    this.logStream.write(logEntry);
    console.log(logEntry);
  }

  debug(message: string, meta?: any) {
    this.writeLog(LogLevel.DEBUG, message, meta);
  }

  info(message: string, meta?: any) {
    this.writeLog(LogLevel.INFO, message, meta);
  }

  warn(message: string, meta?: any) {
    this.writeLog(LogLevel.WARN, message, meta);
  }

  error(message: string, meta?: any) {
    this.writeLog(LogLevel.ERROR, message, meta);
  }

  logRequest(request: any, response: any, duration: number) {
    this.info('Incoming request', {
      method: request.method,
      url: request.url,
      query: request.query,
      body: request.body,
      statusCode: response?.statusCode,
      duration: `${duration}ms`,
    });
  }
}
