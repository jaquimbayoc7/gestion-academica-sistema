import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { UpdateCalificacionDto } from '../dto/update-calificacion.dto';

@Injectable()
export class CalificacionesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-08
    return [];
  }

  findOne(id: number) {
    // TODO: HU-08
    return null;
  }

  create(dto: CreateCalificacionDto) {
    // TODO: HU-08
    return null;
  }

  update(id: number, dto: UpdateCalificacionDto) {
    // TODO: HU-08
    return null;
  }
}
