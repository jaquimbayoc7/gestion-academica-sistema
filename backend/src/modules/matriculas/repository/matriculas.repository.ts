import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';

@Injectable()
export class MatriculasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-07
    return [];
  }

  findOne(id: number) {
    // TODO: HU-07
    return null;
  }

  create(dto: CreateMatriculaDto) {
    // TODO: HU-07
    return null;
  }

  remove(id: number) {
    // TODO: HU-07
    return null;
  }
}
