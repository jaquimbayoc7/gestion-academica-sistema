import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class AsignaturasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-04
    return [];
  }

  findOne(id: number) {
    // TODO: HU-04
    return null;
  }

  create(dto: CreateAsignaturaDto) {
    // TODO: HU-04
    return null;
  }

  update(id: number, dto: UpdateAsignaturaDto) {
    // TODO: HU-04
    return null;
  }

  remove(id: number) {
    // TODO: HU-04
    return null;
  }
}
