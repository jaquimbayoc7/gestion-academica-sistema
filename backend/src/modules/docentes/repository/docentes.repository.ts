import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Injectable()
export class DocentesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-02
    return [];
  }

  findOne(id: number) {
    // TODO: HU-02
    return null;
  }

  create(dto: CreateDocenteDto) {
    // TODO: HU-02
    return null;
  }

  update(id: number, dto: UpdateDocenteDto) {
    // TODO: HU-02
    return null;
  }

  remove(id: number) {
    // TODO: HU-02
    return null;
  }
}
