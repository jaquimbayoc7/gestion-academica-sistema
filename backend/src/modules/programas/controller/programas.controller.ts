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
import { ProgramasService } from '../service/programas.service';
import { CreateProgramaDto } from '../dto/create-programa.dto';
import { UpdateProgramaDto } from '../dto/update-programa.dto';

@Controller('programas')
export class ProgramasController {
  constructor(private readonly programasService: ProgramasService) {}

  @Get()
  findAll() {
    return this.programasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programasService.findOne(id);
  }

  @Post()
  create(@Body() createProgramaDto: CreateProgramaDto) {
    return this.programasService.create(createProgramaDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramaDto: UpdateProgramaDto,
  ) {
    return this.programasService.update(id, updateProgramaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.programasService.remove(id);
  }
}
