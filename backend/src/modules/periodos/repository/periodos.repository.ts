import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePeriodoDto } from '../dto/create-periodo.dto';
import { UpdatePeriodoDto } from '../dto/update-periodo.dto';

@Injectable()
export class PeriodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-05
    return [];
  }

  findOne(id: number) {
    // TODO: HU-05
    return null;
  }

  create(dto: CreatePeriodoDto) {
    // TODO: HU-05
    return null;
  }

  update(id: number, dto: UpdatePeriodoDto) {
    // TODO: HU-05
    return null;
  }

  remove(id: number) {
    // TODO: HU-05
    return null;
  }
}
