import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAsignacionDocenteDto } from '../dto/create-asignacion-docente.dto';
import { UpdateAsignacionDocenteDto } from '../dto/update-asignacion-docente.dto';

@Injectable()
export class AsignacionesDocenteRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-06
    return [];
  }

  findOne(id: number) {
    // TODO: HU-06
    return null;
  }

  create(dto: CreateAsignacionDocenteDto) {
    // TODO: HU-06
    return null;
  }

  update(id: number, dto: UpdateAsignacionDocenteDto) {
    // TODO: HU-06
    return null;
  }

  remove(id: number) {
    // TODO: HU-06
    return null;
  }
}
