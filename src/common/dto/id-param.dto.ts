import { IsUUID } from 'class-validator';

export class IdParamReqDto {
  @IsUUID('4', { message: 'Invalid UUID' })
  id: string;
}
