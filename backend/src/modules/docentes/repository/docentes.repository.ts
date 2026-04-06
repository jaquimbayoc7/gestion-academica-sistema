import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Injectable()
export class DocentesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.docente.findMany({ orderBy: { id: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.docente.findUnique({ where: { id } });
  }

  create(dto: CreateDocenteDto) {
    return this.prisma.docente.create({ data: dto });
  }

  update(id: number, dto: UpdateDocenteDto) {
    return this.prisma.docente.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.docente.delete({ where: { id } });
  }
}
