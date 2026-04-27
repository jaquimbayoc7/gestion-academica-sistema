/**
 * CONTROLADOR DE ASIGNACIONES DOCENTE
 *
 * ENDPOINTS:
 *   GET    /api/v1/asignaciones-docente      → Listar todas (con relaciones)
 *   GET    /api/v1/asignaciones-docente/:id   → Obtener una asignación
 *   POST   /api/v1/asignaciones-docente      → Crear asignación (3 FKs)
 *   PUT    /api/v1/asignaciones-docente/:id   → Actualizar asignación
 *   DELETE /api/v1/asignaciones-docente/:id   → Eliminar (falla si tiene matrículas)
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AsignacionesDocenteService } from '../service/asignaciones-docente.service';
import { CreateAsignacionDocenteDto } from '../dto/create-asignacion-docente.dto';
import { UpdateAsignacionDocenteDto } from '../dto/update-asignacion-docente.dto';

@Controller('asignaciones-docente')
export class AsignacionesDocenteController {
  constructor(
    private readonly asignacionesDocenteService: AsignacionesDocenteService,
  ) {}

  @Get()
  findAll() {
    return this.asignacionesDocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionesDocenteService.findOne(id);
  }

  @Post()
  create(@Body() createAsignacionDocenteDto: CreateAsignacionDocenteDto) {
    return this.asignacionesDocenteService.create(createAsignacionDocenteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAsignacionDocenteDto: UpdateAsignacionDocenteDto,
  ) {
    return this.asignacionesDocenteService.update(
      id,
      updateAsignacionDocenteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionesDocenteService.remove(id);
  }

  /** GET /api/v1/asignaciones-docente/1/reporte → HU-15: Reporte de matriculados con estadísticas */
  @Get(':id/reporte')
  reporte(@Param('id', ParseIntPipe) id: number) {
    return this.asignacionesDocenteService.reporte(id);
  }
}
