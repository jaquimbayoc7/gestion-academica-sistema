import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreatePeriodoDto } from '../dto/create-periodo.dto';
import { UpdatePeriodoDto } from '../dto/update-periodo.dto';

@Injectable()
export class PeriodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.periodoAcademico.findMany({ orderBy: { id: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.periodoAcademico.findUnique({ where: { id } });
  }

  create(data: CreatePeriodoDto) {
    return this.prisma.periodoAcademico.create({
      data: {
        nombre: data.nombre,
        fechaInicio: new Date(data.fechaInicio),
        fechaFin: new Date(data.fechaFin),
        activo: data.activo ?? false,
      },
    });
  }

  update(id: number, data: UpdatePeriodoDto) {
    const updateData: Record<string, unknown> = { ...data };
    if (data.fechaInicio) updateData.fechaInicio = new Date(data.fechaInicio);
    if (data.fechaFin) updateData.fechaFin = new Date(data.fechaFin);
    return this.prisma.periodoAcademico.update({ where: { id }, data: updateData });
  }

  remove(id: number) {
    return this.prisma.periodoAcademico.delete({ where: { id } });
  }

  deactivateAll() {
    return this.prisma.periodoAcademico.updateMany({
      where: { activo: true },
      data: { activo: false },
    });
  }
}
