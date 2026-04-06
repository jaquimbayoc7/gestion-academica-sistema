import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Injectable()
export class EstudiantesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.estudiante.findMany({
      include: { programaAcademico: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.estudiante.findUnique({
      where: { id },
      include: { programaAcademico: true },
    });
  }

  create(dto: CreateEstudianteDto) {
    return this.prisma.estudiante.create({
      data: { ...dto, fechaNacimiento: new Date(dto.fechaNacimiento) },
      include: { programaAcademico: true },
    });
  }

  update(id: number, dto: UpdateEstudianteDto) {
    const data: Record<string, unknown> = { ...dto };
    if (dto.fechaNacimiento) data.fechaNacimiento = new Date(dto.fechaNacimiento);
    return this.prisma.estudiante.update({
      where: { id },
      data,
      include: { programaAcademico: true },
    });
  }

  remove(id: number) {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
