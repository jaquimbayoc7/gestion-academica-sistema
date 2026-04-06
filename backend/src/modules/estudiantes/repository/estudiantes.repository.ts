/**
 * ============================================================
 * REPOSITORIO DE ESTUDIANTES (Capa de Acceso a Datos)
 * ============================================================
 *
 * ¿QUÉ HACE?
 *   Ejecuta las consultas a la base de datos PostgreSQL usando Prisma ORM.
 *   Encapsula TODAS las operaciones SQL para que el Service no conozca
 *   los detalles de la base de datos.
 *
 * PATRÓN REPOSITORY:
 *   Separa la lógica de acceso a datos de la lógica de negocio.
 *   Si en el futuro se cambia de PostgreSQL a MongoDB, solo se modifica
 *   este archivo, sin afectar el Service ni el Controller.
 *
 * MÉTODOS DE PRISMA USADOS:
 *   findMany()   → SELECT * FROM estudiantes (con relaciones)
 *   findUnique() → SELECT * FROM estudiantes WHERE id = ?
 *   create()     → INSERT INTO estudiantes (...) VALUES (...)
 *   update()     → UPDATE estudiantes SET ... WHERE id = ?
 *   delete()     → DELETE FROM estudiantes WHERE id = ?
 *
 * INCLUDE (relaciones):
 *   { include: { programaAcademico: true } } equivale a un JOIN:
 *   SELECT e.*, p.* FROM estudiantes e
 *   LEFT JOIN programas_academicos p ON e.programaAcademicoId = p.id
 *
 *   Esto retorna el estudiante CON su programa académico anidado:
 *   { id: 1, nombres: "Juan", ..., programaAcademico: { id: 1, nombre: "Ing. Sistemas" } }
 */
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
