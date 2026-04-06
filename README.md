# 🎓 Sistema de Gestión Académica

> Proyecto full-stack guiado por el docente — Programación Web 2026A

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Modelo de Datos](#-modelo-de-datos)
- [Plan de Releases](#-plan-de-releases)
- [Sprints e Historias de Usuario](#-sprints-e-historias-de-usuario)
- [Cronograma](#-cronograma)
- [Definition of Done (DoD)](#-definition-of-done-dod)
- [Tablero Kanban](#-tablero-kanban)
- [Instalación y Ejecución](#-instalación-y-ejecución)

---

## 🎯 Estado Actual del Proyecto

> **Última actualización:** 6 de Abril de 2026 — Sprint 4 en curso (Abr 20 → May 8)

### Progreso por Sprint

| Sprint | Estado | HUs | Período |
|---|---|---|---|
| Sprint 1 — Infraestructura y entidades base | ✅ **Completado** | HU-01, HU-02, HU-03 | Mar 16 → Mar 29 |
| Sprint 2 — Entidades académicas | ✅ **Completado** | HU-04, HU-05, HU-06 | Mar 30 → Abr 10 |
| Sprint 3 — Matrícula, Calificaciones y Frontend base | ✅ **Completado** | HU-07 a HU-11 | Abr 13 → Abr 17 |
| Sprint 4 — Frontend avanzado e integración | 🔄 **En progreso (adelantado)** | HU-12, HU-13 | Abr 20 → May 8 |
| Sprint 5 — Reportes, promedio y cierre | ⏳ Pendiente | HU-14, HU-15, HU-16 | May 11 → May 22 |

### Hitos Completados ✅

#### Backend (NestJS + Prisma + PostgreSQL)
- [x] Docker Compose con servicios: PostgreSQL, backend NestJS, frontend Next.js
- [x] Prisma schema con las 8 entidades y todas sus relaciones
- [x] Migración inicial ejecutada (`20260325142014_init`)
- [x] Módulo `estudiantes` — CRUD completo (Controller → Service → Repository)
- [x] Módulo `docentes` — CRUD completo
- [x] Módulo `programas` — CRUD completo
- [x] Módulo `asignaturas` — CRUD completo
- [x] Módulo `periodos` — CRUD completo con lógica de período activo único
- [x] Módulo `asignaciones-docente` — CRUD con validación de unicidad compuesta
- [x] Módulo `matriculas` — CRUD con validación de unicidad compuesta
- [x] Módulo `calificaciones` — CRUD con cálculo automático de nota definitiva
- [x] Common Module: `HttpExceptionFilter`, `ResponseInterceptor`
- [x] Configuración global: `ValidationPipe`, prefix `api/v1`, CORS habilitado

#### Frontend (Next.js 15 + React 19 + TypeScript + Tailwind CSS)
- [x] Estructura de proyecto Next.js 15 con App Router
- [x] Configuración de variables de entorno (`NEXT_PUBLIC_API_URL`)
- [x] Capa HTTP genérica (`src/lib/api.ts`) con `apiGet`, `apiPost`, `apiPut`, `apiDelete`
- [x] 8 interfaces TypeScript para todas las entidades del dominio
- [x] 8 servicios de acceso a la API (con DTOs `CreateDto` y `UpdateDto`)
- [x] Layout raíz + Dashboard layout con grupo de rutas `(dashboard)`
- [x] Sidebar de navegación con `usePathname` y resaltado de ruta activa
- [x] 8 páginas CRUD completas con tablas, formularios, edición y eliminación
- [x] Selects dinámicos encadenados (Programa → Estudiante, Docente/Asignatura/Período → Asignación, etc.)
- [x] Integración frontend ↔ backend con datos reales
- [x] Manejo de estados: loading, error, formularios con validación

#### Infraestructura
- [x] `.dockerignore` en backend y frontend para builds eficientes

#### Guías Pedagógicas
- [x] `guia-backend.html` — Guía paso a paso de construcción del backend
- [x] `guia-frontend.html` — Guía paso a paso de construcción del frontend

#### Smoke Tests (6 de Abril de 2026) ✅
- [x] Programas: CREATE, GET ALL, GET ONE, UPDATE, DELETE — OK
- [x] Estudiantes: CREATE, GET ALL, GET ONE (con relación Programa), UPDATE — OK
- [x] Docentes: CREATE, GET ALL, GET ONE — OK
- [x] Asignaturas: CREATE, GET ONE (con relación Programa) — OK
- [x] Períodos: CREATE, GET ONE (activo=true) — OK
- [x] Asignaciones Docente: CREATE, GET ONE (con relaciones Docente, Asignatura, Período) — OK
- [x] Matrículas: CREATE, GET ONE (con relaciones profundas) — OK
- [x] Calificaciones: CREATE (definitiva=4.05), UPDATE nota2 (definitiva recalculada=4.5) — OK
- [x] Frontend accesible en http://localhost:3000 (status 200)

### Pendiente 🔄

- [ ] Historial académico, reportes y promedio acumulado (Sprint 5)
- [ ] Pruebas E2E
- [ ] Diseño responsivo avanzado (tablet)

---

## 📖 Descripción del Proyecto

El **Sistema de Gestión Académica** es una aplicación web full-stack que permite administrar el proceso académico de una institución educativa: registro de estudiantes, docentes, programas, asignaturas, períodos académicos, matrículas, calificaciones, historial académico y reportes.

### Alcance

| Aspecto | Detalle |
|---|---|
| **Tipo** | Proyecto demostrativo — Guiado por el Docente |
| **Entidades** | 8 entidades con relaciones (ver modelo de datos) |
| **Historias de Usuario** | 16 HUs organizadas en 5 sprints |
| **Releases** | 2 releases alineados con los cortes académicos |
| **Casos de Uso** | 12 CUs (CRUD, matrícula, calificaciones, reportes) |

### Funcionalidades Principales

- ✅ CRUD completo de Estudiantes, Docentes, Programas Académicos y Asignaturas
- ✅ Gestión de Períodos Académicos con control de estado (activo/inactivo)
- ✅ Asignación de Docentes a Asignaturas por período
- ✅ Matrícula de Estudiantes en Asignaturas
- ✅ Registro y cálculo automático de Calificaciones (promedio ponderado)
- ✅ Historial Académico del estudiante agrupado por período
- ✅ Reportes de matriculados por asignatura
- ✅ Cálculo de Promedio Acumulado ponderado por créditos

---

## 🛠 Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| **Backend** | NestJS (Node.js + TypeScript) | API REST con arquitectura en capas |
| **Frontend** | Next.js 14+ (React + TypeScript) | Interfaz de usuario con App Router |
| **Base de Datos** | PostgreSQL 16 | Almacenamiento relacional |
| **ORM** | Prisma | Modelado de datos, migraciones y queries |
| **Contenedores** | Docker + Docker Compose | Orquestación de servicios |
| **Validación** | class-validator + class-transformer | DTOs y validación de entrada |

---

## 🏗 Arquitectura

El proyecto sigue una **arquitectura en capas** con separación de responsabilidades:

```
Cliente HTTP → Controller (valida DTO + ruta) → Service (lógica de negocio) → Repository (acceso a datos) → Prisma / PostgreSQL
```

### Estructura del Proyecto

```
proyecto/
├── docker-compose.yml
├── .env.example
├── backend/                        # API REST con NestJS
│   ├── Dockerfile
│   ├── src/
│   │   ├── common/                 # Módulo compartido (cross-cutting)
│   │   │   ├── filters/            # Filtros de excepción globales
│   │   │   ├── interceptors/       # Interceptores de respuesta
│   │   │   ├── pipes/              # Pipes de validación
│   │   │   └── guards/             # Guards de autenticación
│   │   ├── prisma/                 # Módulo Prisma (acceso a BD)
│   │   └── modules/                # Módulos de dominio
│   │       └── [entidad]/
│   │           ├── controller/     # Solo manejo HTTP
│   │           ├── service/        # Lógica de negocio
│   │           ├── repository/     # Acceso a datos (Prisma)
│   │           ├── dto/            # Validación de entrada
│   │           └── entities/       # Representación del dominio
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
│
├── frontend/                       # Interfaz con Next.js
│   ├── Dockerfile
│   ├── src/
│   │   ├── app/                    # App Router (páginas)
│   │   ├── components/             # Componentes reutilizables
│   │   ├── services/               # Capa de acceso a la API
│   │   ├── interfaces/             # Tipos e interfaces TypeScript
│   │   └── lib/                    # Utilidades
│   └── package.json
│
└── README.md
```

---

## 📊 Modelo de Datos

### Diagrama de Relaciones

```
Estudiante          1 ──── N  Matricula
Docente             1 ──── N  AsignacionDocente
ProgramaAcademico   1 ──── N  Estudiante
ProgramaAcademico   1 ──── N  Asignatura
Asignatura          1 ──── N  AsignacionDocente
PeriodoAcademico    1 ──── N  AsignacionDocente
AsignacionDocente   1 ──── N  Matricula
Matricula           1 ──── 1  Calificacion
```

### Entidades

| Entidad | Campos Principales |
|---|---|
| **Estudiante** | id, nombres, apellidos, codigoEstudiantil (unique), documentoIdentidad (unique), correoInstitucional (unique), fechaNacimiento, programaAcademicoId |
| **Docente** | id, nombres, apellidos, documentoIdentidad (unique), tituloProfesional, especialidad, correoInstitucional (unique), telefono |
| **ProgramaAcademico** | id, nombre, codigo (unique), facultad, duracionSemestres |
| **Asignatura** | id, nombre, codigo (unique), creditos, programaAcademicoId |
| **PeriodoAcademico** | id, nombre (unique), fechaInicio, fechaFin, activo |
| **AsignacionDocente** | id, docenteId, asignaturaId, periodoAcademicoId (unique compound) |
| **Matricula** | id, estudianteId, asignacionDocenteId, fechaInscripcion (unique compound) |
| **Calificacion** | id, matriculaId (unique), nota1, nota2, nota3, notaDefinitiva |

---

## 🚀 Plan de Releases

### Release 1 — Segundo Corte: Backend + Frontend Base

> **📅 Cierre: 17 de Abril de 2026** · Sprints 1, 2 y 3

**Objetivo:** Entregar la API REST completa con arquitectura en capas (Controller → Service → Repository) y el frontend con las vistas de CRUD para todas las entidades base.

| Sprint | Período | HUs | Alcance |
|---|---|---|---|
| [Sprint 1](#sprint-1--infraestructura-y-entidades-base) | Mar 16 → Mar 29 | HU-01, HU-02, HU-03 | Docker, Prisma, Estudiante, Docente, Programa |
| [Sprint 2](#sprint-2--entidades-académicas) | Mar 30 → Abr 10 | HU-04, HU-05, HU-06 | Asignatura, Período, Asignación, Common Module |
| [Sprint 3](#sprint-3--matrícula-calificaciones-y-frontend-base) | Abr 13 → Abr 17 | HU-07 a HU-11 | Matrícula, Calificación, Frontend base |

### Release 2 — Tercer Corte: Integración + Reportes

> **📅 Cierre: 22 de Mayo de 2026** · Sprints 4 y 5

**Objetivo:** Integración completa frontend ↔ backend, flujos complejos (matricular → calificar → historial), reportes y promedio acumulado. Despliegue funcional con Docker.

| Sprint | Período | HUs | Alcance |
|---|---|---|---|
| [Sprint 4](#sprint-4--frontend-avanzado-e-integración) | Abr 20 → May 8 | HU-12, HU-13 | Frontend matrícula/calificaciones, navegación, layout |
| [Sprint 5](#sprint-5--reportes-promedio-y-cierre) | May 11 → May 22 | HU-14, HU-15, HU-16 | Historial, reportes, promedio acumulado, pruebas E2E |

---

## 📌 Sprints e Historias de Usuario

### Sprint 1 — Infraestructura y entidades base ✅

> 📅 **Mar 16 → Mar 29** · 🚫 Festivo: Mar 23 (San José) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/1)

| # | Historia de Usuario | Labels | Issue | Estado |
|---|---|---|---|---|
| HU-01 | Gestión de Estudiantes | `user-story` `backend` `frontend` | [#1](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/1) | ✅ **Done** — Backend + Frontend CRUD |
| HU-02 | Gestión de Docentes | `user-story` `backend` `frontend` | [#2](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/2) | ✅ **Done** — Backend + Frontend CRUD |
| HU-03 | Gestión de Programas Académicos | `user-story` `backend` `frontend` | [#3](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/3) | ✅ **Done** — Backend + Frontend CRUD |

**Entregables:**
- ✅ Docker Compose con PostgreSQL, NestJS y Next.js
- ✅ Prisma schema con entidades Estudiante, Docente y ProgramaAcademico
- ✅ Migraciones ejecutadas (`20260325142014_init`)
- ✅ CRUD completo (Controller → Service → Repository) para las 3 entidades
- ✅ Frontend: páginas CRUD completas con tablas, formularios, edición y eliminación

---

### Sprint 2 — Entidades académicas ✅

> 📅 **Mar 30 → Abr 10** · 🚫 Festivos: Abr 2-3 (Semana Santa) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/2)

| # | Historia de Usuario | Labels | Issue | Estado |
|---|---|---|---|---|
| HU-04 | Gestión de Asignaturas | `user-story` `backend` `frontend` | [#4](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/4) | ✅ **Done** — Backend + Frontend CRUD |
| HU-05 | Gestión de Períodos Académicos | `user-story` `backend` `frontend` | [#5](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/5) | ✅ **Done** — Backend + Frontend CRUD |
| HU-06 | Asignación Docente-Asignatura | `user-story` `backend` `frontend` | [#6](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/6) | ✅ **Done** — Backend + Frontend CRUD |

**Entregables:**
- ✅ CRUD de Asignatura con relación a ProgramaAcademico
- ✅ CRUD de PeriodoAcademico con lógica de período activo único
- ✅ CRUD de AsignacionDocente con validación de unicidad compuesta
- ✅ Common module: `HttpExceptionFilter`, `ResponseInterceptor`
- ✅ Frontend: páginas CRUD completas para Asignaturas, Períodos y Asignaciones

---

### Sprint 3 — Matrícula, Calificaciones y Frontend base ✅

> 📅 **Abr 13 → Abr 17** · 📝 Cierre Segundo Corte: Abr 17 · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/3)

| # | Historia de Usuario | Labels | Issue | Estado |
|---|---|---|---|---|
| HU-07 | Matrícula de Estudiantes | `user-story` `backend` `frontend` | [#7](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/7) | ✅ **Done** — Backend + Frontend CRUD |
| HU-08 | Registro de Calificaciones | `user-story` `backend` `frontend` | [#8](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/8) | ✅ **Done** — Backend + Frontend CRUD |
| HU-09 | Listado Estudiantes por Asignatura | `user-story` `backend` `frontend` | [#9](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/9) | ✅ **Done** — Backend + Frontend |
| HU-10 | Listado Asignaturas del Docente | `user-story` `backend` `frontend` | [#10](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/10) | ✅ **Done** — Backend + Frontend |
| HU-11 | Common Module: Filters, Interceptors, Pipes | `user-story` `cross-cutting` | [#11](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/11) | ✅ **Done** |

**Entregables:**
- ✅ Módulo de Matrícula con validación de unicidad compuesta
- ✅ Módulo de Calificación con cálculo automático de nota definitiva
- ✅ Listados especializados (estudiantes por asignatura, asignaturas del docente)
- ✅ Common Module global (filtros, interceptores)
- ✅ Frontend: estructura Next.js 15, interfaces, servicios y páginas CRUD para Matrículas y Calificaciones
- ✅ Smoke tests ejecutados exitosamente (8/8 módulos — 6 de Abril de 2026)

---

### Sprint 4 — Frontend avanzado e integración ✅

> 📅 **Abr 20 → May 8** · 🚫 Festivo: May 1 (Día del Trabajo) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/4)

| # | Historia de Usuario | Labels | Issue | Estado |
|---|---|---|---|---|
| HU-12 | Frontend: Matrícula y Calificaciones | `user-story` `frontend` | [#12](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/12) | ✅ Completo (adelantado) |
| HU-13 | Frontend: Navegación y Layout General | `user-story` `frontend` | [#13](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/13) | ✅ Completo (adelantado) |

**Entregables:**
- ✅ 8 páginas CRUD completas con tablas, formularios inline, edición y eliminación
- ✅ Formularios con selects dinámicos encadenados (Programa → Estudiante, Docente/Asignatura/Período → Asignación)
- ✅ Calificaciones con cálculo de nota definitiva y codificación por color (verde ≥ 3, rojo < 3)
- ✅ Layout general con sidebar y navegación entre secciones
- ✅ Integración completa frontend ↔ backend verificada con smoke tests
- 🔄 Diseño responsivo avanzado (pendiente)
- 🔄 Componentes de feedback tipo toast/alert (pendiente)

---

### Sprint 5 — Reportes, promedio y cierre

> 📅 **May 11 → May 22** · 🚫 Festivo: May 18 (Día de la Ascensión) · 📝 Cierre Tercer Corte: May 22 · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/5)

| # | Historia de Usuario | Labels | Issue |
|---|---|---|---|
| HU-14 | Historial Académico del Estudiante | `user-story` `backend` `frontend` `reporte` | [#14](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/14) |
| HU-15 | Reporte de Matriculados por Asignatura | `user-story` `backend` `frontend` `reporte` | [#15](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/15) |
| HU-16 | Cálculo de Promedio Acumulado | `user-story` `backend` `frontend` `reporte` | [#16](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/16) |

**Entregables:**
- Endpoint y vista de historial académico agrupado por período
- Reporte de matriculados con estadísticas (aprobados/reprobados)
- Cálculo de promedio acumulado ponderado: `Σ(nota_definitiva × créditos) / Σ(créditos)`
- Pruebas de integración E2E
- Docker Compose validación final

---

## 📅 Cronograma

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    SEGUNDO CORTE (Release 1) — Cierre: 17 Abr 2026          │
│                          Backend + Frontend Base                             │
├─────────────────────┬─────────────────────┬──────────────────────────────────┤
│  Sprint 1           │    Sprint 2         │         Sprint 3                 │
│  Mar 16 → Mar 29    │  Mar 30 → Abr 10    │   Abr 13 → Abr 17              │
│                     │                     │                                  │
│ • Docker + Prisma   │ • Asignatura        │ • Matrícula                      │
│ • Estudiante        │ • Período           │ • Calificación                   │
│ • Docente           │ • Asignación Doc    │ • Common Module                  │
│ • Programa          │ • Filters/Pipes     │ • Frontend: listados y forms     │
│                     │                     │                                  │
│ 🚫 Mar 23          │ 🚫 Abr 2-3         │                                  │
│   (San José)        │   (Semana Santa)    │                                  │
├─────────────────────┴─────────────────────┴──────────────────────────────────┤
│                    TERCER CORTE (Release 2) — Cierre: 22 May 2026           │
│                          Integración + Reportes                              │
├────────────────────────────────────┬─────────────────────────────────────────┤
│        Sprint 4                    │          Sprint 5                       │
│        Abr 20 → May 8             │          May 11 → May 22               │
│                                    │                                         │
│ • Frontend matrículas              │ • Historial académico                   │
│ • Frontend calificaciones          │ • Reporte de matriculados               │
│ • Navegación y layout              │ • Promedio acumulado                    │
│ • Selects dinámicos                │ • Pruebas E2E                           │
│                                    │                                         │
│ 🚫 May 1                          │ 🚫 May 18                              │
│   (Día del Trabajo)               │   (Día de la Ascensión)                │
└────────────────────────────────────┴─────────────────────────────────────────┘
```

### Festivos Colombianos (Marzo — Mayo 2026)

| Fecha | Festivo | Sprint Afectado |
|---|---|---|
| Lunes 23 de Marzo | Día de San José | Sprint 1 |
| Jueves 2 de Abril | Jueves Santo | Sprint 2 |
| Viernes 3 de Abril | Viernes Santo | Sprint 2 |
| Viernes 1 de Mayo | Día del Trabajo | Sprint 4 |
| Lunes 18 de Mayo | Día de la Ascensión | Sprint 5 |

---

## ✅ Definition of Done (DoD)

> 📌 Referencia completa: [Issue #17 — Definition of Done](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/17)

Cada Historia de Usuario se considera **terminada** cuando cumple **todos** los siguientes criterios:

### Backend
- [x] Endpoint(s) implementados con arquitectura en capas: Controller → Service → Repository
- [x] DTOs con validaciones usando `class-validator` y `class-transformer`
- [x] Manejo de errores con excepciones HTTP apropiadas (`NotFoundException`, `ConflictException`, `BadRequestException`)
- [x] Respuestas con formato uniforme (interceptor aplicado)
- [x] Endpoint probado manualmente (Smoke Tests — 6 de Abril de 2026)

### Frontend
- [x] Página(s) implementada(s) con componentes reutilizables
- [x] Consumo del API a través de la capa de `services/`
- [x] Manejo de estados: carga (loading), éxito y error
- [x] Formularios con validación del lado del cliente
- [ ] Diseño responsivo avanzado (pendiente)

### Infraestructura y Código
- [ ] Código versionado en GitHub con commits descriptivos
- [x] El servicio funciona correctamente con `docker compose up`
- [x] No hay errores de consola ni advertencias críticas
- [x] Las migraciones de Prisma están aplicadas y el esquema es consistente

---

## 📊 Tablero Kanban

🔗 **[Ver Tablero Kanban en GitHub Projects](https://github.com/users/jaquimbayoc7/projects/2)**

> **Última actualización:** 6 de Abril de 2026

### 🟢 Done (13 HUs)

| HU | Historia de Usuario | Sprint | Release | Fecha Cierre |
|---|---|---|---|---|
| HU-01 | Gestión de Estudiantes (Backend + Frontend CRUD) | Sprint 1 | R1 | Mar 29, 2026 |
| HU-02 | Gestión de Docentes (Backend + Frontend CRUD) | Sprint 1 | R1 | Mar 29, 2026 |
| HU-03 | Gestión de Programas Académicos (Backend + Frontend CRUD) | Sprint 1 | R1 | Mar 29, 2026 |
| HU-04 | Gestión de Asignaturas (Backend + Frontend CRUD) | Sprint 2 | R1 | Abr 10, 2026 |
| HU-05 | Gestión de Períodos Académicos (Backend + Frontend CRUD) | Sprint 2 | R1 | Abr 10, 2026 |
| HU-06 | Asignación Docente-Asignatura (Backend + Frontend CRUD) | Sprint 2 | R1 | Abr 10, 2026 |
| HU-07 | Matrícula de Estudiantes (Backend + Frontend CRUD) | Sprint 3 | R1 | Abr 06, 2026 |
| HU-08 | Registro de Calificaciones (Backend + Frontend CRUD) | Sprint 3 | R1 | Abr 06, 2026 |
| HU-09 | Listado Estudiantes por Asignatura | Sprint 3 | R1 | Abr 06, 2026 |
| HU-10 | Listado Asignaturas del Docente | Sprint 3 | R1 | Abr 06, 2026 |
| HU-11 | Common Module: Filters, Interceptors, Pipes | Sprint 3 | R1 | Abr 06, 2026 |
| HU-12 | Frontend: Matrícula y Calificaciones (CRUD + selects dinámicos) | Sprint 4 | R2 | Abr 06, 2026 |
| HU-13 | Frontend: Navegación y Layout General (Sidebar + integración) | Sprint 4 | R2 | Abr 06, 2026 |

### 🔵 In Progress (0 HUs)

_No hay historias en progreso actualmente._

### ⚪ Todo / Backlog (3 HUs)

| HU | Historia de Usuario | Sprint | Release | Prioridad |
|---|---|---|---|---|
| HU-14 | Historial Académico del Estudiante | Sprint 5 | R2 | Alta |
| HU-15 | Reporte de Matriculados por Asignatura | Sprint 5 | R2 | Media |
| HU-16 | Cálculo de Promedio Acumulado | Sprint 5 | R2 | Media |

### Resumen de Avance

```
Progreso total: ████████████████████░░░░  13/16 HUs (81.25%)

Release 1 (Segundo Corte):  ████████████████████  11/11 HUs (100%) ✅ COMPLETO
Release 2 (Tercer Corte):   ████████░░░░░░░░░░░░   2/5  HUs (40%)  🔄 En progreso

Backend:   ████████████████████  8/8 módulos (100%) ✅
Frontend:  ████████████████████  8/8 páginas  (100%) ✅
Reportes:  ░░░░░░░░░░░░░░░░░░░░  0/3 reportes (0%)  ⏳
```

---

## ⚙ Instalación y Ejecución

### Prerrequisitos

- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose instalados
- [Git](https://git-scm.com/downloads)

### Clonar el repositorio

```bash
git clone https://github.com/jaquimbayoc7/gestion-academica-sistema.git
cd gestion-academica-sistema
```

### Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

```env
# .env.example
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=gestion_academica_db
```

### Levantar los servicios

```bash
# Levantar todos los servicios con Docker Compose
docker compose up

# O en modo detached (segundo plano)
docker compose up -d
```

### Acceder a los servicios

| Servicio | URL |
|---|---|
| **Frontend (Next.js)** | [http://localhost:3000](http://localhost:3000) |
| **Backend (NestJS API)** | [http://localhost:3001](http://localhost:3001) |
| **PostgreSQL** | `localhost:5432` |

### Ejecutar migraciones de Prisma

```bash
# Entrar al contenedor del backend
docker compose exec backend sh

# Ejecutar migraciones
npx prisma migrate dev

# Generar el cliente Prisma
npx prisma generate
```

---

## 📎 Enlaces Rápidos

| Recurso | Enlace |
|---|---|
| 📋 Tablero Kanban | [GitHub Projects](https://github.com/users/jaquimbayoc7/projects/2) |
| 📌 Issues (todos) | [Ver Issues](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues) |
| 🏁 Sprint 1 | [Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/1) |
| 🏁 Sprint 2 | [Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/2) |
| 🏁 Sprint 3 | [Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/3) |
| 🏁 Sprint 4 | [Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/4) |
| 🏁 Sprint 5 | [Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/5) |
| 📖 Definition of Done | [Issue #17](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/17) |

---

<p align="center">
  <strong>Programación Web — Ingeniería de Sistemas — 2026A</strong><br>
  <em>Corporación Universitaria del Huila — CORHUILA</em>
</p>
