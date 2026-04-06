/**
 * CONTROLADOR DE MATRÍCULAS
 *
 * ENDPOINTS (sin PUT — las matrículas no se editan):
 *   GET    /api/v1/matriculas      → Listar todas (con estudiante + asignación + calificación)
 *   GET    /api/v1/matriculas/:id   → Obtener una matrícula
 *   POST   /api/v1/matriculas      → Matricular estudiante (requiere estudianteId + asignacionDocenteId)
 *   DELETE /api/v1/matriculas/:id   → Cancelar matrícula (falla si tiene calificaciones)
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MatriculasService } from '../service/matriculas.service';
import { CreateMatriculaDto } from '../dto/create-matricula.dto';

@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Get()
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.matriculasService.findOne(id);
  }

  @Post()
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matriculasService.remove(id);
  }
}
