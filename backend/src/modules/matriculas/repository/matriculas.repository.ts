/**
 * REPOSITORIO DE MATRÍCULAS
 *
 * CONSULTAS CON RELACIONES PROFUNDAS (nested includes):
 *   La matrícula incluye:
 *     - estudiante               → Datos del estudiante
 *     - asignacionDocente         → La asignación docente, que a su vez incluye:
 *       - docente                → Datos del docente
 *       - asignatura             → Datos de la asignatura
 *       - periodoAcademico       → Datos del período
 *     - calificacion             → Las notas (si existen)
 *
 *   Esto equivale a un SQL con múltiples JOINs y retorna toda la
 *   información necesaria para mostrar en el frontend en UNA sola consulta.
 *
 * findByCompound(): Busca por clave compuesta (estudianteId + asignacionDocenteId)
 *   para verificar duplicados antes de crear.
 *
 * NOTA: No tiene método update() porque las matrículas no se editan.
 */
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
