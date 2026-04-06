/**
 * REPOSITORIO DE PROGRAMAS ACADÉMICOS
 * CRUD básico sin includes (la entidad no tiene relaciones que mostrar en listado).
 * Los programas son referenciados por Estudiantes y Asignaturas via FK.
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { UpdateProgramaDto } from '../dto/update-programa.dto';

@Injectable()
export class ProgramasRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.programaAcademico.findMany({ orderBy: { id: 'asc' } });
  }

  findOne(id: number) {
    return this.prisma.programaAcademico.findUnique({ where: { id } });
  }

  create(dto: CreateProgramaDto) {
    return this.prisma.programaAcademico.create({ data: dto });
  }

  update(id: number, dto: UpdateProgramaDto) {
    return this.prisma.programaAcademico.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.programaAcademico.delete({ where: { id } });
  }
}
