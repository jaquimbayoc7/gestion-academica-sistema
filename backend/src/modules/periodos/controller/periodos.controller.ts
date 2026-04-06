/**
 * CONTROLADOR DE PERÍODOS ACADÉMICOS
 *
 * ENDPOINTS:
 *   GET    /api/v1/periodos      → Listar todos (ordenados por ID desc)
 *   GET    /api/v1/periodos/:id   → Obtener período por ID
 *   POST   /api/v1/periodos      → Crear período (si activo=true, desactiva los demás)
 *   PUT    /api/v1/periodos/:id   → Actualizar período
 *   DELETE /api/v1/periodos/:id   → Eliminar período
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
import { PeriodosService } from '../service/periodos.service';
import { CreatePeriodoDto } from '../dto/create-periodo.dto';
import { UpdatePeriodoDto } from '../dto/update-periodo.dto';

@Controller('periodos')
export class PeriodosController {
  constructor(private readonly periodosService: PeriodosService) {}

  @Get()
  findAll() {
    return this.periodosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.periodosService.findOne(id);
  }

  @Post()
  create(@Body() createPeriodoDto: CreatePeriodoDto) {
    return this.periodosService.create(createPeriodoDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePeriodoDto: UpdatePeriodoDto,
  ) {
    return this.periodosService.update(id, updatePeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.periodosService.remove(id);
  }
}
