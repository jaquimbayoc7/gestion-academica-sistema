import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';

@Injectable()
export class MatriculasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.matricula.findMany({
      include: {
        estudiante: true,
        asignacionDocente: {
          include: { docente: true, asignatura: true, periodoAcademico: true },
        },
        calificacion: true,
      },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.matricula.findUnique({
      where: { id },
      include: {
        estudiante: true,
        asignacionDocente: {
          include: { docente: true, asignatura: true, periodoAcademico: true },
        },
        calificacion: true,
      },
    });
  }

  findByCompound(estudianteId: number, asignacionDocenteId: number) {
    return this.prisma.matricula.findUnique({
      where: {
        estudianteId_asignacionDocenteId: { estudianteId, asignacionDocenteId },
      },
    });
  }

  create(dto: CreateMatriculaDto) {
    return this.prisma.matricula.create({
      data: dto,
      include: {
        estudiante: true,
        asignacionDocente: {
          include: { docente: true, asignatura: true, periodoAcademico: true },
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.matricula.delete({ where: { id } });
  }
}
