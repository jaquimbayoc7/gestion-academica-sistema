/**
 * SERVICIO DE ASIGNATURAS
 * Mismo patrón: NotFoundException + ConflictException.
 * La validación de FK (programaAcademicoId) se delega a Prisma:
 *   Si el programa no existe, Prisma lanza P2003, pero aquí solo capturamos P2002.
 *   El error P2003 se propaga como error 500 (podría mejorarse).
 */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AsignaturasRepository } from '../repository/asignaturas.repository';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Injectable()
export class AsignaturasService {
  constructor(private readonly asignaturasRepository: AsignaturasRepository) {}

  findAll() {
    return this.asignaturasRepository.findAll();
  }

  async findOne(id: number) {
    const asignatura = await this.asignaturasRepository.findOne(id);
    if (!asignatura) throw new NotFoundException(`Asignatura con ID ${id} no encontrada`);
    return asignatura;
  }

  async create(dto: CreateAsignaturaDto) {
    try {
      return await this.asignaturasRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe una asignatura con ese código');
      throw error;
    }
  }

  async update(id: number, dto: UpdateAsignaturaDto) {
    await this.findOne(id);
    try {
      return await this.asignaturasRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe una asignatura con ese código');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.asignaturasRepository.remove(id);
  }
}
