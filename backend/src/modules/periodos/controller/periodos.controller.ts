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
