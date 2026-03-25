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
