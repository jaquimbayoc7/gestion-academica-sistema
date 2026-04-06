import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateAsignacionDocenteDto } from '../dto/create-asignacion-docente.dto';
import { UpdateAsignacionDocenteDto } from '../dto/update-asignacion-docente.dto';

@Injectable()
export class AsignacionesDocenteRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.asignacionDocente.findMany({
      include: { docente: true, asignatura: true, periodoAcademico: true },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.asignacionDocente.findUnique({
      where: { id },
      include: { docente: true, asignatura: true, periodoAcademico: true },
    });
  }

  findByCompound(docenteId: number, asignaturaId: number, periodoAcademicoId: number) {
    return this.prisma.asignacionDocente.findUnique({
      where: {
        docenteId_asignaturaId_periodoAcademicoId: { docenteId, asignaturaId, periodoAcademicoId },
      },
    });
  }

  create(dto: CreateAsignacionDocenteDto) {
    return this.prisma.asignacionDocente.create({
      data: dto,
      include: { docente: true, asignatura: true, periodoAcademico: true },
    });
  }

  update(id: number, dto: UpdateAsignacionDocenteDto) {
    return this.prisma.asignacionDocente.update({
      where: { id },
      data: dto,
      include: { docente: true, asignatura: true, periodoAcademico: true },
    });
  }

  remove(id: number) {
    return this.prisma.asignacionDocente.delete({ where: { id } });
  }
}
