import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class IdParamReqDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID('4', { message: 'Invalid UUID' })
  id: string;
}
