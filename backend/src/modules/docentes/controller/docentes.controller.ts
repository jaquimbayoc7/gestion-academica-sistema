/**
 * CONTROLADOR DE DOCENTES
 *
 * ENDPOINTS:
 *   GET    /api/v1/docentes      → Listar todos los docentes
 *   GET    /api/v1/docentes/:id   → Obtener docente por ID
 *   POST   /api/v1/docentes      → Crear docente
 *   PUT    /api/v1/docentes/:id   → Actualizar docente
 *   DELETE /api/v1/docentes/:id   → Eliminar docente (falla si tiene asignaciones)
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
import { DocentesService } from '../service/docentes.service';
import { CreateDocenteDto } from '../dto/create-docente.dto';
import { UpdateDocenteDto } from '../dto/update-docente.dto';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  findAll() {
    return this.docentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.findOne(id);
  }

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.remove(id);
  }
}
