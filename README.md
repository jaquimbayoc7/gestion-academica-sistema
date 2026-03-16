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

### Sprint 1 — Infraestructura y entidades base

> 📅 **Mar 16 → Mar 29** · 🚫 Festivo: Mar 23 (San José) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/1)

| # | Historia de Usuario | Labels | Issue |
|---|---|---|---|
| HU-01 | Gestión de Estudiantes | `user-story` `backend` `frontend` | [#1](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/1) |
| HU-02 | Gestión de Docentes | `user-story` `backend` `frontend` | [#2](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/2) |
| HU-03 | Gestión de Programas Académicos | `user-story` `backend` `frontend` | [#3](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/3) |

**Entregables:**
- Docker Compose con PostgreSQL, NestJS y Next.js
- Prisma schema con entidades Estudiante, Docente y ProgramaAcademico
- Migraciones ejecutadas
- CRUD completo (Controller → Service → Repository) para las 3 entidades
- Frontend: listados y formularios básicos

---

### Sprint 2 — Entidades académicas

> 📅 **Mar 30 → Abr 10** · 🚫 Festivos: Abr 2-3 (Semana Santa) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/2)

| # | Historia de Usuario | Labels | Issue |
|---|---|---|---|
| HU-04 | Gestión de Asignaturas | `user-story` `backend` `frontend` | [#4](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/4) |
| HU-05 | Gestión de Períodos Académicos | `user-story` `backend` | [#5](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/5) |
| HU-06 | Asignación Docente-Asignatura | `user-story` `backend` | [#6](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/6) |

**Entregables:**
- CRUD de Asignatura con relación a ProgramaAcademico
- CRUD de PeriodoAcademico con lógica de período activo único
- CRUD de AsignacionDocente con validación de unicidad compuesta
- Common module: Filters, Interceptors, Pipes

---

### Sprint 3 — Matrícula, Calificaciones y Frontend base

> 📅 **Abr 13 → Abr 17** · 📝 Cierre Segundo Corte: Abr 17 · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/3)

| # | Historia de Usuario | Labels | Issue |
|---|---|---|---|
| HU-07 | Matrícula de Estudiantes | `user-story` `backend` | [#7](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/7) |
| HU-08 | Registro de Calificaciones | `user-story` `backend` | [#8](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/8) |
| HU-09 | Listado Estudiantes por Asignatura | `user-story` `backend` | [#9](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/9) |
| HU-10 | Listado Asignaturas del Docente | `user-story` `backend` | [#10](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/10) |
| HU-11 | Common Module: Filters, Interceptors, Pipes | `user-story` `cross-cutting` | [#11](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/11) |

**Entregables:**
- Módulo de Matrícula con validación de unicidad compuesta
- Módulo de Calificación con cálculo automático de nota definitiva
- Listados especializados (estudiantes por asignatura, asignaturas del docente)
- Common Module global (filtros, interceptores, pipes)
- Frontend: estructura Next.js, listados y formularios de entidades base

---

### Sprint 4 — Frontend avanzado e integración

> 📅 **Abr 20 → May 8** · 🚫 Festivo: May 1 (Día del Trabajo) · [Ver Milestone](https://github.com/jaquimbayoc7/gestion-academica-sistema/milestone/4)

| # | Historia de Usuario | Labels | Issue |
|---|---|---|---|
| HU-12 | Frontend: Matrícula y Calificaciones | `user-story` `frontend` | [#12](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/12) |
| HU-13 | Frontend: Navegación y Layout General | `user-story` `frontend` | [#13](https://github.com/jaquimbayoc7/gestion-academica-sistema/issues/13) |

**Entregables:**
- Formularios con selects dinámicos encadenados (período → asignatura → estudiante)
- Tabla editable de calificaciones con cálculo en tiempo real
- Layout general con sidebar/navbar y navegación entre secciones
- Diseño responsivo (desktop + tablet)
- Componentes de feedback (toast/alert de éxito/error)

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
- [ ] Endpoint(s) implementados con arquitectura en capas: Controller → Service → Repository
- [ ] DTOs con validaciones usando `class-validator` y `class-transformer`
- [ ] Manejo de errores con excepciones HTTP apropiadas (`NotFoundException`, `ConflictException`, `BadRequestException`)
- [ ] Respuestas con formato uniforme (interceptor aplicado)
- [ ] Endpoint probado manualmente con Postman/Thunder Client

### Frontend
- [ ] Página(s) implementada(s) con componentes reutilizables
- [ ] Consumo del API a través de la capa de `services/`
- [ ] Manejo de estados: carga (loading), éxito y error
- [ ] Formularios con validación del lado del cliente
- [ ] Diseño responsivo y navegable

### Infraestructura y Código
- [ ] Código versionado en GitHub con commits descriptivos
- [ ] El servicio funciona correctamente con `docker compose up`
- [ ] No hay errores de consola ni advertencias críticas
- [ ] Las migraciones de Prisma están aplicadas y el esquema es consistente

---

## 📊 Tablero Kanban

El seguimiento del proyecto se realiza mediante un tablero Kanban en GitHub Projects:

🔗 **[Ver Tablero Kanban](https://github.com/users/jaquimbayoc7/projects/2)**

El tablero incluye:
- **Columnas:** Todo → In Progress → Done
- **Campos personalizados:** Sprint, Release, Prioridad
- **Vistas:** Board (Kanban), Table, Roadmap

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
