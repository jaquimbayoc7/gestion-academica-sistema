/**
 * SERVICIO DE ASIGNACIONES DOCENTE
 *
 * LÓGICA DE NEGOCIO ESPECÍFICA:
 *
 *   create():
 *     1. Verifica duplicado con findByCompound() → si existe, ConflictException 409
 *     2. Intenta crear → si FK no existe, captura P2003 → NotFoundException 404
 *
 *   Esto asegura que:
 *     - No se duplique la asignación (docente+asignatura+periodo)
 *     - El docente, asignatura y período referenciados EXISTAN
 *
 * DIFERENCIA con otros Services:
 *   Aquí se captura P2003 (FK violation) además de P2002 (unique violation).
 *   Esto es porque el DTO solo contiene IDs, y esos IDs podrían no existir.
 */
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

  /** HU-15: Reporte de matriculados por asignación con estadísticas */
  async reporte(id: number) {
    const asignacion = await this.findOne(id);
    const matriculas = await this.asignacionesDocenteRepository.reporte(id);

    const estudiantes = matriculas.map((m) => {
      const cal = m.calificacion;
      return {
        matriculaId: m.id,
        codigoEstudiantil: m.estudiante.codigoEstudiantil,
        nombres: m.estudiante.nombres,
        apellidos: m.estudiante.apellidos,
        nota1: cal?.nota1 ?? null,
        nota2: cal?.nota2 ?? null,
        nota3: cal?.nota3 ?? null,
        notaDefinitiva: cal?.notaDefinitiva ?? null,
        estado: cal?.notaDefinitiva != null ? (cal.notaDefinitiva >= 3 ? 'Aprobado' : 'Reprobado') : 'Sin calificar',
      };
    });

    const conNota = estudiantes.filter((e) => e.notaDefinitiva != null);
    return {
      asignacionId: asignacion.id,
      asignatura: asignacion.asignatura?.nombre,
      codigo: asignacion.asignatura?.codigo,
      creditos: asignacion.asignatura?.creditos,
      docente: `${asignacion.docente?.nombres} ${asignacion.docente?.apellidos}`,
      periodo: asignacion.periodoAcademico?.nombre,
      totalMatriculados: estudiantes.length,
      aprobados: conNota.filter((e) => e.notaDefinitiva! >= 3).length,
      reprobados: conNota.filter((e) => e.notaDefinitiva! < 3).length,
      sinCalificar: estudiantes.filter((e) => e.notaDefinitiva == null).length,
      estudiantes,
    };
  }
}
