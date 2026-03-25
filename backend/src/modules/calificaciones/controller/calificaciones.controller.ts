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
