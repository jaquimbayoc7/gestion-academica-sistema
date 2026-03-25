import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Injectable()
export class EstudiantesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-01 — implementar consulta Prisma
    return [];
  }

  findOne(id: number) {
    // TODO: HU-01 — implementar consulta Prisma
    return null;
  }

  create(dto: CreateEstudianteDto) {
    // TODO: HU-01 — implementar creación Prisma
    return null;
  }

  update(id: number, dto: UpdateEstudianteDto) {
    // TODO: HU-01 — implementar actualización Prisma
    return null;
  }

  remove(id: number) {
    // TODO: HU-01 — implementar eliminación Prisma
    return null;
  }
}
