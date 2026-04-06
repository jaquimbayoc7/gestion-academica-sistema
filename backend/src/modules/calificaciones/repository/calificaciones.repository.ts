/**
 * REPOSITORIO DE CALIFICACIONES
 *
 * CONSULTAS CON RELACIONES PROFUNDAS:
 *   La calificación incluye:
 *     - matricula → que incluye:
 *       - estudiante           → Para mostrar nombre del estudiante
 *       - asignacionDocente    → que incluye:
 *         - asignatura         → Nombre de la materia
 *         - docente            → Nombre del profesor
 *
 * findByMatricula(): Busca calificación por matriculaId (UNIQUE).
 *   Se usa para verificar que no se creen duplicados.
 *   Cada matrícula tiene máximo UNA calificación.
 *
 * NOTA: Los métodos create/update reciben un objeto plano con los
 *   datos calculados (incluyendo notaDefinitiva), no un DTO.
 *   Esto es porque el Service calcula la nota antes de guardar.
 */
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
