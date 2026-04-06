import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class CalificacionesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.calificacion.findMany({
      include: {
        matricula: {
          include: {
            estudiante: true,
            asignacionDocente: { include: { asignatura: true, docente: true } },
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.calificacion.findUnique({
      where: { id },
      include: {
        matricula: {
          include: {
            estudiante: true,
            asignacionDocente: { include: { asignatura: true, docente: true } },
          },
        },
      },
    });
  }

  findByMatricula(matriculaId: number) {
    return this.prisma.calificacion.findUnique({ where: { matriculaId } });
  }

  create(data: { matriculaId: number; nota1?: number; nota2?: number; nota3?: number; notaDefinitiva?: number }) {
    return this.prisma.calificacion.create({
      data,
      include: {
        matricula: {
          include: {
            estudiante: true,
            asignacionDocente: { include: { asignatura: true, docente: true } },
          },
        },
      },
    });
  }

  update(id: number, data: { nota1?: number; nota2?: number; nota3?: number; notaDefinitiva?: number }) {
    return this.prisma.calificacion.update({
      where: { id },
      data,
      include: {
        matricula: {
          include: {
            estudiante: true,
            asignacionDocente: { include: { asignatura: true, docente: true } },
          },
        },
      },
    });
  }
}
