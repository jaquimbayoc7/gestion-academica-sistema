/**
 * ============================================================
 * CONTROLADOR DE ESTUDIANTES (Capa de Presentación)
 * ============================================================
 *
 * ¿QUÉ HACE?
 *   Define los endpoints HTTP para el CRUD de estudiantes.
 *   SOLO se encarga de recibir peticiones y retornar respuestas.
 *   NO contiene lógica de negocio (eso lo hace el Service).
 *
 * ENDPOINTS DISPONIBLES:
 *   GET    /api/v1/estudiantes      → Listar todos los estudiantes
 *   GET    /api/v1/estudiantes/:id   → Obtener un estudiante por ID
 *   POST   /api/v1/estudiantes      → Crear un nuevo estudiante
 *   PUT    /api/v1/estudiantes/:id   → Actualizar un estudiante existente
 *   DELETE /api/v1/estudiantes/:id   → Eliminar un estudiante
 *
 * DECORADORES IMPORTANTES:
 *   @Controller('estudiantes') → Prefijo de ruta (se suma al global: /api/v1/estudiantes)
 *   @Get(), @Post(), @Put(), @Delete() → Método HTTP
 *   @Param('id', ParseIntPipe)  → Extrae el parámetro de la URL y lo convierte a número
 *   @Body()                     → Extrae el cuerpo de la petición (JSON)
 *
 * INYECCIÓN DE DEPENDENCIAS:
 *   NestJS inyecta automáticamente EstudiantesService en el constructor.
 *   El Controller NO crea instancias manualmente; el framework las gestiona.
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
import { EstudiantesService } from '../service/estudiantes.service';
import { CreateEstudianteDto } from '../dto/create-estudiante.dto';
import { UpdateEstudianteDto } from '../dto/update-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  /** GET /api/v1/estudiantes → Retorna un array con todos los estudiantes */
  @Get()
  findAll() {
    return this.estudiantesService.findAll();
  }

  /** GET /api/v1/estudiantes/1 → Retorna el estudiante con ID 1.
   *  ParseIntPipe convierte el string "1" de la URL al número 1.
   *  Si el ID no es numérico (ej: "abc"), retorna automáticamente error 400. */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.findOne(id);
  }

  /** POST /api/v1/estudiantes → Crea un nuevo estudiante.
   *  @Body() extrae el JSON del cuerpo y lo valida contra CreateEstudianteDto.
   *  Si faltan campos o tienen formato inválido, retorna error 400 automáticamente. */
  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.create(createEstudianteDto);
  }

  /** PUT /api/v1/estudiantes/1 → Actualiza parcial o totalmente el estudiante 1.
   *  UpdateEstudianteDto usa PartialType, así que TODOS los campos son opcionales. */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstudianteDto: UpdateEstudianteDto,
  ) {
    return this.estudiantesService.update(id, updateEstudianteDto);
  }

  /** DELETE /api/v1/estudiantes/1 → Elimina el estudiante con ID 1.
   *  Si tiene matrículas asociadas, Prisma lanza error P2003 (FK constraint). */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.remove(id);
  }

  /** GET /api/v1/estudiantes/1/historial → HU-14: Historial académico agrupado por período */
  @Get(':id/historial')
  historial(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.historial(id);
  }

  /** GET /api/v1/estudiantes/1/promedio → HU-16: Promedio acumulado ponderado por créditos */
  @Get(':id/promedio')
  promedioAcumulado(@Param('id', ParseIntPipe) id: number) {
    return this.estudiantesService.promedioAcumulado(id);
  }
}
