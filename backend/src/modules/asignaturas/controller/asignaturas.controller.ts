/**
 * CONTROLADOR DE ASIGNATURAS
 *
 * ENDPOINTS:
 *   GET    /api/v1/asignaturas      → Listar todas (incluye programa asociado)
 *   GET    /api/v1/asignaturas/:id   → Obtener una asignatura
 *   POST   /api/v1/asignaturas      → Crear asignatura (requiere programaAcademicoId válido)
 *   PUT    /api/v1/asignaturas/:id   → Actualizar asignatura
 *   DELETE /api/v1/asignaturas/:id   → Eliminar (falla si tiene asignaciones docente)
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
import { AsignaturasService } from '../service/asignaturas.service';
import { CreateAsignaturaDto } from '../dto/create-asignatura.dto';
import { UpdateAsignaturaDto } from '../dto/update-asignatura.dto';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Get()
  findAll() {
    return this.asignaturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.asignaturasService.findOne(id);
  }

  @Post()
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturasService.create(createAsignaturaDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAsignaturaDto: UpdateAsignaturaDto,
  ) {
    return this.asignaturasService.update(id, updateAsignaturaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.asignaturasService.remove(id);
  }
}
