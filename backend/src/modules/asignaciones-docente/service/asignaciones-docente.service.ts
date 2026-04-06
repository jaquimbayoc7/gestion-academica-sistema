import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AsignacionesDocenteRepository } from '../repository/asignaciones-docente.repository';
import { CreateAsignacionDocenteDto } from '../dto/create-asignacion-docente.dto';
import { UpdateAsignacionDocenteDto } from '../dto/update-asignacion-docente.dto';

@Injectable()
export class AsignacionesDocenteService {
  constructor(
    private readonly asignacionesDocenteRepository: AsignacionesDocenteRepository,
  ) {}

  findAll() {
    return this.asignacionesDocenteRepository.findAll();
  }

  async findOne(id: number) {
    const asignacion = await this.asignacionesDocenteRepository.findOne(id);
    if (!asignacion) throw new NotFoundException(`Asignación con ID ${id} no encontrada`);
    return asignacion;
  }

  async create(dto: CreateAsignacionDocenteDto) {
    const existing = await this.asignacionesDocenteRepository.findByCompound(
      dto.docenteId, dto.asignaturaId, dto.periodoAcademicoId,
    );
    if (existing) throw new ConflictException('Esta asignación ya existe para este docente, asignatura y período');
    try {
      return await this.asignacionesDocenteRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2003') throw new NotFoundException('El docente, asignatura o período referenciado no existe');
      throw error;
    }
  }

  async update(id: number, dto: UpdateAsignacionDocenteDto) {
    await this.findOne(id);
    try {
      return await this.asignacionesDocenteRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Esta asignación ya existe');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.asignacionesDocenteRepository.remove(id);
  }
}
}
