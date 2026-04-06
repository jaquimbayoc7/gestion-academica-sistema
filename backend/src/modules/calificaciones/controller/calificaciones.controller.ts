/**
 * CONTROLADOR DE CALIFICACIONES
 *
 * ENDPOINTS (sin DELETE — las notas no se eliminan):
 *   GET    /api/v1/calificaciones      → Listar todas (con matrícula, estudiante, asignatura)
 *   GET    /api/v1/calificaciones/:id   → Obtener calificación por ID
 *   POST   /api/v1/calificaciones      → Crear calificación para una matrícula
 *   PUT    /api/v1/calificaciones/:id   → Actualizar notas (recalcula definitiva)
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { CalificacionesService } from '../service/calificaciones.service';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { UpdateCalificacionDto } from '../dto/update-calificacion.dto';

@Controller('calificaciones')
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) {}

  @Get()
  findAll() {
    return this.calificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.calificacionesService.findOne(id);
  }

  @Post()
  create(@Body() createCalificacionDto: CreateCalificacionDto) {
    return this.calificacionesService.create(createCalificacionDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCalificacionDto: UpdateCalificacionDto,
  ) {
    return this.calificacionesService.update(id, updateCalificacionDto);
  }
}
