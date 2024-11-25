import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export class BaseService {
  protected notFoundException(entity: string): void {
    throw new NotFoundException(`${entity} not found`);
  }

  protected unprocessableEntityException(entity: string): void {
    throw new UnprocessableEntityException(entity);
  }
}
