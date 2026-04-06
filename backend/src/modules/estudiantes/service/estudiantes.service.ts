/**
 * ============================================================
 * SERVICIO DE ESTUDIANTES (Capa de Lógica de Negocio)
 * ============================================================
 *
 * ¿QUÉ HACE?
 *   Contiene TODA la lógica de negocio del módulo de estudiantes:
 *   - Verificar que un estudiante existe antes de actualizarlo/eliminarlo
 *   - Manejar errores de duplicidad (código, documento, correo)
 *   - Transformar errores de Prisma en excepciones HTTP legibles
 *
 * FLUJO DE CADA OPERACIÓN:
 *
 *   findAll():
 *     1. Llama al Repository → retorna todos los estudiantes
 *
 *   findOne(id):
 *     1. Llama al Repository → busca el estudiante por ID
 *     2. Si NO existe → lanza NotFoundException (HTTP 404)
 *     3. Si existe → retorna el estudiante
 *
 *   create(dto):
 *     1. Llama al Repository → intenta crear el estudiante
 *     2. Si hay duplicado (P2002) → lanza ConflictException (HTTP 409)
 *     3. Si todo OK → retorna el estudiante creado
 *
 *   update(id, dto):
 *     1. Llama a findOne(id) → verifica que existe (si no, lanza 404)
 *     2. Llama al Repository → intenta actualizar
 *     3. Si hay duplicado (P2002) → lanza ConflictException (HTTP 409)
 *     4. Si todo OK → retorna el estudiante actualizado
 *
 *   remove(id):
 *     1. Llama a findOne(id) → verifica que existe
 *     2. Llama al Repository → elimina el estudiante
 *     3. Si tiene matrículas (P2003) → Prisma lanza error de FK
 *
 * CÓDIGOS DE ERROR DE PRISMA:
 *   P2002 → Violación de restricción UNIQUE (dato duplicado)
 *   P2003 → Violación de FOREIGN KEY (relación dependiente)
 */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { EstudiantesRepository } from '../repository/estudiantes.repository';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(private readonly estudiantesRepository: EstudiantesRepository) {}

  findAll() {
    return this.estudiantesRepository.findAll();
  }

  async findOne(id: number) {
    const estudiante = await this.estudiantesRepository.findOne(id);
    if (!estudiante) throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    return estudiante;
  }

  async create(dto: CreateEstudianteDto) {
    try {
      return await this.estudiantesRepository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un estudiante con ese código, documento o correo');
      throw error;
    }
  }

  async update(id: number, dto: UpdateEstudianteDto) {
    await this.findOne(id);
    try {
      return await this.estudiantesRepository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') throw new ConflictException('Ya existe un estudiante con ese código, documento o correo');
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.estudiantesRepository.remove(id);
  }
}
