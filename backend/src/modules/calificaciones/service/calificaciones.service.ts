/**
 * SERVICIO DE CALIFICACIONES
 *
 * LÓGICA DE NEGOCIO PRINCIPAL: Cálculo automático de nota definitiva.
 *
 * FÓRMULA:
 *   notaDefinitiva = (nota1 × 0.30) + (nota2 × 0.30) + (nota3 × 0.40)
 *             Corte 1 = 30%    Corte 2 = 30%    Corte 3 = 40%
 *
 * FLUJO de create():
 *   1. Verifica que no exista calificación para esa matrícula → ConflictException 409
 *   2. Calcula notaDefinitiva (solo si las 3 notas están presentes)
 *   3. Guarda en BD con el cálculo incluido
 *
 * FLUJO de update():
 *   1. Obtiene la calificación actual (para mantener notas no enviadas)
 *   2. "Mergea" las notas: dto.nota1 ?? current.nota1 (usa la nueva si viene, si no la actual)
 *   3. Recalcula notaDefinitiva con las 3 notas finales
 *   4. Actualiza en BD
 *
 * calcularDefinitiva():
 *   - Si las 3 notas son NOT NULL → retorna el promedio ponderado
 *   - Si falta alguna nota → retorna undefined (null en BD)
 *   - Redondea a 2 decimales: Math.round(x * 100) / 100
 *
 * EJEMPLO:
 *   nota1=4.0, nota2=3.5, nota3=4.5
 *   definitiva = (4.0×0.30) + (3.5×0.30) + (4.5×0.40) = 1.2 + 1.05 + 1.8 = 4.05
 */
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
