import { Injectable } from '@nestjs/common';
import { CalificacionesRepository } from '../repository/calificaciones.repository';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { UpdateCalificacionDto } from '../dto/update-calificacion.dto';

@Injectable()
export class CalificacionesService {
  constructor(
    private readonly calificacionesRepository: CalificacionesRepository,
  ) {}

  findAll() {
    // TODO: HU-08
    return this.calificacionesRepository.findAll();
  }

  findOne(id: number) {
    // TODO: HU-08
    return this.calificacionesRepository.findOne(id);
  }

  create(dto: CreateCalificacionDto) {
    // TODO: HU-08 — calcular notaDefinitiva = (nota1*0.3)+(nota2*0.3)+(nota3*0.4)
    return this.calificacionesRepository.create(dto);
  }

  update(id: number, dto: UpdateCalificacionDto) {
    // TODO: HU-08 — recalcular notaDefinitiva al actualizar
    return this.calificacionesRepository.update(id, dto);
  }
}
