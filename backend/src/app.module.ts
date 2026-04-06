/**
 * ============================================================
 * MÓDULO RAÍZ DE LA APLICACIÓN (AppModule)
 * ============================================================
 *
 * Este es el módulo principal que registra TODOS los módulos del sistema.
 * NestJS lo usa como punto de partida para construir el árbol de dependencias.
 *
 * ARQUITECTURA MODULAR:
 *   AppModule
 *   ├── PrismaModule          → Conexión a la base de datos (Global)
 *   ├── EstudiantesModule      → CRUD de estudiantes
 *   ├── DocentesModule         → CRUD de docentes
 *   ├── ProgramasModule        → CRUD de programas académicos
 *   ├── AsignaturasModule      → CRUD de asignaturas
 *   ├── PeriodosModule         → CRUD de períodos académicos
 *   ├── AsignacionesDocenteModule → Asignación docente-asignatura-período
 *   ├── MatriculasModule       → Matrícula estudiante-asignación
 *   └── CalificacionesModule   → Registro y cálculo de notas
 *
 * NOTA: PrismaModule es @Global(), por lo que PrismaService está disponible
 * en TODOS los módulos sin necesidad de importarlo explícitamente.
 */
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EstudiantesModule } from './modules/estudiantes/estudiantes.module';
import { DocentesModule } from './modules/docentes/docentes.module';
import { ProgramasModule } from './modules/programas/programas.module';
import { AsignaturasModule } from './modules/asignaturas/asignaturas.module';
import { PeriodosModule } from './modules/periodos/periodos.module';
import { AsignacionesDocenteModule } from './modules/asignaciones-docente/asignaciones-docente.module';
import { MatriculasModule } from './modules/matriculas/matriculas.module';
import { CalificacionesModule } from './modules/calificaciones/calificaciones.module';

@Module({
  imports: [
    PrismaModule,
    EstudiantesModule,
    DocentesModule,
    ProgramasModule,
    AsignaturasModule,
    PeriodosModule,
    AsignacionesDocenteModule,
    MatriculasModule,
    CalificacionesModule,
  ],
})
export class AppModule {}
