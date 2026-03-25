import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { UpdateProgramaDto } from '../dto/update-programa.dto';

@Injectable()
export class ProgramasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    // TODO: HU-03
    return [];
  }

  findOne(id: number) {
    // TODO: HU-03
    return null;
  }

  create(dto: CreateProgramaDto) {
    // TODO: HU-03
    return null;
  }

  update(id: number, dto: UpdateProgramaDto) {
    // TODO: HU-03
    return null;
  }

  remove(id: number) {
    // TODO: HU-03
    return null;
  }
}
