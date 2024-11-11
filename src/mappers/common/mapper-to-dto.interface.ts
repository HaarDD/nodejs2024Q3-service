export interface IMapper<
  Entity,
  RequestCreateDto,
  RequestUpdateDto,
  ResponseDto,
> {
  mapToDto(entity: Entity): ResponseDto | Promise<ResponseDto>;
  mapToDtos(entities: Entity[]): ResponseDto[] | Promise<ResponseDto[]>;

  mapFromCreateDto(createDto: RequestCreateDto): Entity;
  mapFromUpdateDto(updateDto: RequestUpdateDto, existingEntity: Entity): Entity;
}
