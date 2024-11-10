import { IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID('4', { message: 'Invalid UUID' })
  id: string;
}
