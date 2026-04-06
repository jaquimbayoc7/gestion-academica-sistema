import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CalificacionesRepository } from '../repository/calificaciones.repository';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { UpdateCalificacionDto } from '../dto/update-calificacion.dto';

@Injectable()
export class CalificacionesService {
  constructor(
    private readonly calificacionesRepository: CalificacionesRepository,
  ) {}

  findAll() {
    return this.calificacionesRepository.findAll();
  }

  async findOne(id: number) {
    const calificacion = await this.calificacionesRepository.findOne(id);
    if (!calificacion) throw new NotFoundException(`Calificación con ID ${id} no encontrada`);
    return calificacion;
  }

  async create(dto: CreateCalificacionDto) {
    const existing = await this.calificacionesRepository.findByMatricula(dto.matriculaId);
    if (existing) throw new ConflictException('Ya existe una calificación para esta matrícula');
    const notaDefinitiva = this.calcularDefinitiva(dto.nota1, dto.nota2, dto.nota3);
    return this.calificacionesRepository.create({
      matriculaId: dto.matriculaId,
      nota1: dto.nota1,
      nota2: dto.nota2,
      nota3: dto.nota3,
      notaDefinitiva,
    });
  }

  async update(id: number, dto: UpdateCalificacionDto) {
    const current = await this.findOne(id);
    const nota1 = dto.nota1 ?? current.nota1;
    const nota2 = dto.nota2 ?? current.nota2;
    const nota3 = dto.nota3 ?? current.nota3;
    const notaDefinitiva = this.calcularDefinitiva(nota1, nota2, nota3);
    return this.calificacionesRepository.update(id, {
      nota1, nota2, nota3, notaDefinitiva,
    });
  }

  private calcularDefinitiva(nota1?: number | null, nota2?: number | null, nota3?: number | null): number | undefined {
    if (nota1 != null && nota2 != null && nota3 != null) {
      return Math.round((nota1 * 0.3 + nota2 * 0.3 + nota3 * 0.4) * 100) / 100;
    }
    return undefined;
  }
}
