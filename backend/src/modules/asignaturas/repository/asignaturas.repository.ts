import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class AsignaturasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.asignatura.findMany({
      include: { programaAcademico: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.asignatura.findUnique({
      where: { id },
      include: { programaAcademico: true },
    });
  }

  create(dto: CreateAsignaturaDto) {
    return this.prisma.asignatura.create({
      data: dto,
      include: { programaAcademico: true },
    });
  }

  update(id: number, dto: UpdateAsignaturaDto) {
    return this.prisma.asignatura.update({
      where: { id },
      data: dto,
      include: { programaAcademico: true },
    });
  }

  remove(id: number) {
    return this.prisma.asignatura.delete({ where: { id } });
  }
}
