/**
 * ============================================================
 * MÓDULO DE ESTUDIANTES
 * ============================================================
 *
 * Cada módulo en NestJS encapsula un dominio de negocio completo.
 * Este módulo registra las 3 capas de la arquitectura:
 *
 *   Controller (capa de presentación)
 *   └─→ Recibe peticiones HTTP y delega al Service
 *
 *   Service (capa de lógica de negocio)
 *   └─→ Aplica reglas de negocio, validaciones y manejo de errores
 *
 *   Repository (capa de acceso a datos)
 *   └─→ Ejecuta las consultas SQL a través de Prisma ORM
 *
 * FLUJO DE UNA PETICIÓN:
 *   HTTP Request → Controller → Service → Repository → Prisma → PostgreSQL
 *   HTTP Response ← Controller ← Service ← Repository ← Prisma ← PostgreSQL
 */
import { Module } from '@nestjs/common';
import { EstudiantesController } from './controller/estudiantes.controller';
import { EstudiantesService } from './service/estudiantes.service';
import { EstudiantesRepository } from './repository/estudiantes.repository';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService, EstudiantesRepository],
})
export class EstudiantesModule {}
