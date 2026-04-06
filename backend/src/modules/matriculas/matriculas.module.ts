/**
 * MÓDULO DE MATRÍCULAS
 *
 * Vincula un Estudiante con una AsignacionDocente.
 * Es decir: "El estudiante Juan se matricula en Cálculo I dictado
 * por el profesor Pérez en el período 2026-A".
 *
 * La matrícula es el paso previo al registro de calificaciones.
 * Sin matrícula, no se pueden registrar notas.
 *
 * RESTRICCIÓN: @@unique([estudianteId, asignacionDocenteId])
 *   Un estudiante no puede matricularse dos veces en la misma asignación.
 *
 * NOTA: No tiene endpoint PUT porque una matrícula no se edita, solo se crea o elimina.
 */
import { Module } from '@nestjs/common';
import { MatriculasController } from './controller/matriculas.controller';
import { MatriculasService } from './service/matriculas.service';
import { MatriculasRepository } from './repository/matriculas.repository';

@Module({
  controllers: [MatriculasController],
  providers: [MatriculasService, MatriculasRepository],
})
export class MatriculasModule {}
