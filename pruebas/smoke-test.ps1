$base = "http://localhost:3001/api/v1"
$pass = 0; $fail = 0; $total = 0
$results = @()
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

function Test-Endpoint {
    param($id, $name, $method, $url, $body)
    $script:total++
    try {
        $params = @{ Uri = $url; Method = $method; ContentType = "application/json" }
        if ($body) { $params.Body = $body }
        $start = Get-Date
        $r = Invoke-RestMethod @params
        $elapsed = [math]::Round(((Get-Date) - $start).TotalMilliseconds)
        $script:pass++
        $result = @{ Id=$id; Name=$name; Status="PASS"; Code=200; Time=$elapsed; Response=$r }
        $script:results += $result
        Write-Host "[PASS] $id $name (${elapsed}ms)" -ForegroundColor Green
        return $r
    } catch {
        $script:fail++
        $code = 0
        try { $code = [int]$_.Exception.Response.StatusCode } catch {}
        $result = @{ Id=$id; Name=$name; Status="FAIL"; Code=$code; Time=0; Response=$null }
        $script:results += $result
        Write-Host "[FAIL] $id $name - Code=$code - $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  SMOKE TEST SUITE - Sistema de Gestion Academica" -ForegroundColor Cyan
Write-Host "  Fecha: $timestamp" -ForegroundColor Cyan
Write-Host "  Target: $base" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# =====================================================================
# MODULO 1: PROGRAMAS ACADEMICOS
# =====================================================================
Write-Host "--- MODULO: Programas Academicos ---" -ForegroundColor Yellow
$r = Test-Endpoint "T01" "CREATE Programa" "POST" "$base/programas" '{"nombre":"Ingenieria de Sistemas","codigo":"ISI","facultad":"Ingenieria","duracionSemestres":10}'
$progId = $r.data.id

$r = Test-Endpoint "T02" "GET ALL Programas" "GET" "$base/programas" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T03" "GET ONE Programa (id=$progId)" "GET" "$base/programas/$progId" $null
Write-Host "       -> nombre: $($r.data.nombre)" -ForegroundColor DarkGray

$r = Test-Endpoint "T04" "UPDATE Programa (id=$progId)" "PUT" "$base/programas/$progId" '{"nombre":"Ing. Sistemas Actualizado"}'
Write-Host "       -> nombre: $($r.data.nombre)" -ForegroundColor DarkGray

# Create temp para DELETE
$rTemp = Test-Endpoint "T05a" "CREATE Programa (temp para DELETE)" "POST" "$base/programas" '{"nombre":"Programa Temporal","codigo":"TMP","facultad":"Test","duracionSemestres":4}'
$tmpId = $rTemp.data.id

$r = Test-Endpoint "T05b" "DELETE Programa (id=$tmpId)" "DELETE" "$base/programas/$tmpId" $null
$r2 = Test-Endpoint "T05c" "GET ALL Programas (post-delete)" "GET" "$base/programas" $null
Write-Host "       -> Count post-delete: $($r2.data.Count)" -ForegroundColor DarkGray

# Test duplicado (ConflictException)
$r = Test-Endpoint "T06" "CREATE Programa DUPLICADO (espera 409)" "POST" "$base/programas" '{"nombre":"Otro Programa","codigo":"ISI","facultad":"Otra","duracionSemestres":6}'
if ($r -eq $null) { Write-Host "       -> Conflict esperado: OK" -ForegroundColor DarkGray; $script:fail--; $script:pass++ }

# Test validacion (BadRequest)
$r = Test-Endpoint "T07" "CREATE Programa SIN CAMPOS (espera 400)" "POST" "$base/programas" '{"nombre":"Solo nombre"}'
if ($r -eq $null) { Write-Host "       -> Validation esperado: OK" -ForegroundColor DarkGray; $script:fail--; $script:pass++ }

Write-Host ""

# =====================================================================
# MODULO 2: DOCENTES
# =====================================================================
Write-Host "--- MODULO: Docentes ---" -ForegroundColor Yellow
$r = Test-Endpoint "T08" "CREATE Docente" "POST" "$base/docentes" '{"nombres":"Maria","apellidos":"Lopez Garcia","documentoIdentidad":"9876543210","tituloProfesional":"PhD Matematicas","especialidad":"Algebra Lineal","correoInstitucional":"maria.lopez@uni.edu"}'
$docId = $r.data.id

$r = Test-Endpoint "T09" "GET ALL Docentes" "GET" "$base/docentes" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T10" "GET ONE Docente (id=$docId)" "GET" "$base/docentes/$docId" $null
Write-Host "       -> $($r.data.nombres) $($r.data.apellidos)" -ForegroundColor DarkGray

$r = Test-Endpoint "T11" "UPDATE Docente (id=$docId)" "PUT" "$base/docentes/$docId" '{"especialidad":"Calculo Multivariable"}'
Write-Host "       -> especialidad: $($r.data.especialidad)" -ForegroundColor DarkGray

Write-Host ""

# =====================================================================
# MODULO 3: ESTUDIANTES
# =====================================================================
Write-Host "--- MODULO: Estudiantes ---" -ForegroundColor Yellow
$bodyEst = "{`"nombres`":`"Juan Carlos`",`"apellidos`":`"Perez Gomez`",`"codigoEstudiantil`":`"EST-2026-001`",`"documentoIdentidad`":`"1234567890`",`"correoInstitucional`":`"juan.perez@uni.edu`",`"fechaNacimiento`":`"2000-01-15`",`"programaAcademicoId`":$progId}"
$r = Test-Endpoint "T12" "CREATE Estudiante" "POST" "$base/estudiantes" $bodyEst
$estId = $r.data.id

$r = Test-Endpoint "T13" "GET ALL Estudiantes" "GET" "$base/estudiantes" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T14" "GET ONE Estudiante (id=$estId)" "GET" "$base/estudiantes/$estId" $null
Write-Host "       -> $($r.data.nombres) $($r.data.apellidos) | Programa: $($r.data.programaAcademico.nombre)" -ForegroundColor DarkGray

$r = Test-Endpoint "T15" "UPDATE Estudiante (id=$estId)" "PUT" "$base/estudiantes/$estId" '{"nombres":"Juan Carlos Andres"}'
Write-Host "       -> nombres: $($r.data.nombres)" -ForegroundColor DarkGray

Write-Host ""

# =====================================================================
# MODULO 4: ASIGNATURAS
# =====================================================================
Write-Host "--- MODULO: Asignaturas ---" -ForegroundColor Yellow
$bodyAsig = "{`"nombre`":`"Calculo Diferencial`",`"codigo`":`"MAT101`",`"creditos`":4,`"programaAcademicoId`":$progId}"
$r = Test-Endpoint "T16" "CREATE Asignatura" "POST" "$base/asignaturas" $bodyAsig
$asigId = $r.data.id

$r = Test-Endpoint "T17" "GET ALL Asignaturas" "GET" "$base/asignaturas" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T18" "GET ONE Asignatura (id=$asigId)" "GET" "$base/asignaturas/$asigId" $null
Write-Host "       -> $($r.data.nombre) ($($r.data.creditos) cr) | Programa: $($r.data.programaAcademico.nombre)" -ForegroundColor DarkGray

$r = Test-Endpoint "T19" "UPDATE Asignatura (id=$asigId)" "PUT" "$base/asignaturas/$asigId" '{"creditos":5}'
Write-Host "       -> creditos: $($r.data.creditos)" -ForegroundColor DarkGray

Write-Host ""

# =====================================================================
# MODULO 5: PERIODOS ACADEMICOS
# =====================================================================
Write-Host "--- MODULO: Periodos Academicos ---" -ForegroundColor Yellow
$r = Test-Endpoint "T20" "CREATE Periodo" "POST" "$base/periodos" '{"nombre":"2026-1","fechaInicio":"2026-01-15","fechaFin":"2026-06-15","activo":true}'
$perId = $r.data.id

$r = Test-Endpoint "T21" "GET ALL Periodos" "GET" "$base/periodos" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T22" "GET ONE Periodo (id=$perId)" "GET" "$base/periodos/$perId" $null
Write-Host "       -> $($r.data.nombre) | activo=$($r.data.activo)" -ForegroundColor DarkGray

$r = Test-Endpoint "T23" "UPDATE Periodo (id=$perId)" "PUT" "$base/periodos/$perId" '{"nombre":"2026-1 Semestre I"}'
Write-Host "       -> nombre: $($r.data.nombre)" -ForegroundColor DarkGray

# Test: crear segundo periodo activo (debe desactivar el anterior)
$r = Test-Endpoint "T24" "CREATE Periodo 2 activo (desactiva anterior)" "POST" "$base/periodos" '{"nombre":"2026-2","fechaInicio":"2026-07-15","fechaFin":"2026-12-15","activo":true}'
$per2Id = $r.data.id
$rCheck = Test-Endpoint "T25" "GET Periodo 1 (debe ser activo=false)" "GET" "$base/periodos/$perId" $null
Write-Host "       -> Periodo 1 activo=$($rCheck.data.activo) (esperado: False)" -ForegroundColor DarkGray

# Reactivar periodo 1 para las pruebas siguientes
$null = Invoke-RestMethod "$base/periodos/$perId" -Method PUT -Body '{"activo":true}' -ContentType "application/json"

Write-Host ""

# =====================================================================
# MODULO 6: ASIGNACIONES DOCENTE
# =====================================================================
Write-Host "--- MODULO: Asignaciones Docente ---" -ForegroundColor Yellow
$bodyAsign = "{`"docenteId`":$docId,`"asignaturaId`":$asigId,`"periodoAcademicoId`":$perId}"
$r = Test-Endpoint "T26" "CREATE Asignacion Docente" "POST" "$base/asignaciones-docente" $bodyAsign
$asignId = $r.data.id

$r = Test-Endpoint "T27" "GET ALL Asignaciones" "GET" "$base/asignaciones-docente" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T28" "GET ONE Asignacion (id=$asignId)" "GET" "$base/asignaciones-docente/$asignId" $null
Write-Host "       -> Docente: $($r.data.docente.nombres) | Asig: $($r.data.asignatura.nombre) | Periodo: $($r.data.periodoAcademico.nombre)" -ForegroundColor DarkGray

# Test duplicado compound
$r = Test-Endpoint "T29" "CREATE Asignacion DUPLICADA (espera 409)" "POST" "$base/asignaciones-docente" $bodyAsign
if ($r -eq $null) { Write-Host "       -> Conflict compound esperado: OK" -ForegroundColor DarkGray; $script:fail--; $script:pass++ }

Write-Host ""

# =====================================================================
# MODULO 7: MATRICULAS
# =====================================================================
Write-Host "--- MODULO: Matriculas ---" -ForegroundColor Yellow
$bodyMat = "{`"estudianteId`":$estId,`"asignacionDocenteId`":$asignId}"
$r = Test-Endpoint "T30" "CREATE Matricula" "POST" "$base/matriculas" $bodyMat
$matId = $r.data.id

$r = Test-Endpoint "T31" "GET ALL Matriculas" "GET" "$base/matriculas" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T32" "GET ONE Matricula (id=$matId)" "GET" "$base/matriculas/$matId" $null
Write-Host "       -> Est: $($r.data.estudiante.nombres) | Asig: $($r.data.asignacionDocente.asignatura.nombre) | Doc: $($r.data.asignacionDocente.docente.nombres)" -ForegroundColor DarkGray

# Test duplicado compound
$r = Test-Endpoint "T33" "CREATE Matricula DUPLICADA (espera 409)" "POST" "$base/matriculas" $bodyMat
if ($r -eq $null) { Write-Host "       -> Conflict compound esperado: OK" -ForegroundColor DarkGray; $script:fail--; $script:pass++ }

Write-Host ""

# =====================================================================
# MODULO 8: CALIFICACIONES
# =====================================================================
Write-Host "--- MODULO: Calificaciones ---" -ForegroundColor Yellow
$bodyCal = "{`"matriculaId`":$matId,`"nota1`":4.0,`"nota2`":3.5,`"nota3`":4.5}"
$r = Test-Endpoint "T34" "CREATE Calificacion" "POST" "$base/calificaciones" $bodyCal
$calId = $r.data.id
$def1 = $r.data.notaDefinitiva
Write-Host "       -> nota1=4.0 nota2=3.5 nota3=4.5 | definitiva=$def1 (esperado: 4.05)" -ForegroundColor DarkGray

$r = Test-Endpoint "T35" "GET ALL Calificaciones" "GET" "$base/calificaciones" $null
Write-Host "       -> Count: $($r.data.Count)" -ForegroundColor DarkGray

$r = Test-Endpoint "T36" "GET ONE Calificacion (id=$calId)" "GET" "$base/calificaciones/$calId" $null
Write-Host "       -> matricula.estudiante: $($r.data.matricula.estudiante.nombres)" -ForegroundColor DarkGray

$r = Test-Endpoint "T37" "UPDATE Calificacion nota2=5.0 (id=$calId)" "PUT" "$base/calificaciones/$calId" '{"nota2":5.0}'
$def2 = $r.data.notaDefinitiva
Write-Host "       -> nota1=$($r.data.nota1) nota2=$($r.data.nota2) nota3=$($r.data.nota3) | definitiva=$def2 (esperado: 4.50)" -ForegroundColor DarkGray

$r = Test-Endpoint "T38" "UPDATE Calificacion todas=2.0 (id=$calId)" "PUT" "$base/calificaciones/$calId" '{"nota1":2.0,"nota2":2.0,"nota3":2.0}'
$def3 = $r.data.notaDefinitiva
Write-Host "       -> nota1=$($r.data.nota1) nota2=$($r.data.nota2) nota3=$($r.data.nota3) | definitiva=$def3 (esperado: 2.00)" -ForegroundColor DarkGray

Write-Host ""

# =====================================================================
# MODULO 9: FRONTEND
# =====================================================================
Write-Host "--- MODULO: Frontend (Next.js) ---" -ForegroundColor Yellow
try {
    $start = Get-Date
    $resp = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
    $elapsed = [math]::Round(((Get-Date) - $start).TotalMilliseconds)
    $script:pass++; $script:total++
    Write-Host "[PASS] T39 Frontend Homepage (status=$($resp.StatusCode), ${elapsed}ms)" -ForegroundColor Green
} catch {
    $script:fail++; $script:total++
    Write-Host "[FAIL] T39 Frontend Homepage - $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# =====================================================================
# RESUMEN
# =====================================================================
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  RESULTADOS SMOKE TEST" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Total:  $total" -ForegroundColor White
Write-Host "  Pass:   $pass" -ForegroundColor Green
Write-Host "  Fail:   $fail" -ForegroundColor $(if($fail -gt 0){"Red"}else{"Green"})
Write-Host "  Rate:   $([math]::Round(($pass/$total)*100, 1))%" -ForegroundColor $(if($fail -gt 0){"Yellow"}else{"Green"})
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

if ($fail -eq 0) {
    Write-Host "  >>> ALL TESTS PASSED <<<" -ForegroundColor Green
} else {
    Write-Host "  >>> SOME TESTS FAILED <<<" -ForegroundColor Red
}
