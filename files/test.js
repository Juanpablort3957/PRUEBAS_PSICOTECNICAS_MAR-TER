let cedulaActual = '';
let nombreActual = '';
let emailActual  = '';

// Puntuaciones acumuladas calculadas siempre desde las respuestas registradas (no incremental)
let respuestasDISC = {};
let indicePregunta  = 0;
let tiempoInicio    = null;
let timerInterval   = null;

// ─── Calcula puntuaciones DISC desde cero según respuestas registradas ────────
function recalcularPuntuaciones() {
    const preguntas = PREGUNTAS.disc.preguntas;
    const respuestas = respuestasDISC.DISC.respuestas;   // array de 'A'|'B'|undefined
    const puntos = { D: 0, I: 0, S: 0, C: 0 };

    preguntas.forEach((preg, idx) => {
        const resp = respuestas[idx];
        if (resp === 'A') puntos[preg.dimensi] += preg.pesoA;
        else if (resp === 'B') puntos[preg.dimensi] += preg.pesoB;
    });

    respuestasDISC.DISC.D = puntos.D;
    respuestasDISC.DISC.I = puntos.I;
    respuestasDISC.DISC.S = puntos.S;
    respuestasDISC.DISC.C = puntos.C;
}

// ─── Inicio ───────────────────────────────────────────────────────────────────
async function iniciarPrueba(cedula) {
    const candidato = await obtenerCandidato(cedula);
    if (!candidato) {
        alert('Candidato no encontrado');
        window.location.href = 'index.html';
        return;
    }

    cedulaActual  = cedula;
    nombreActual  = candidato.nombre;
    emailActual   = candidato.email || '';

    // Si ya tiene resultados completos, ir directo a resultados
    const resultados = await obtenerResultados(cedula);
    if (resultados && resultados.completada) {
        window.location.href = 'resultados.html?cedula=' + cedula;
        return;
    }

    respuestasDISC = {
        cedula:    cedula,
        nombre:    nombreActual,
        email:     emailActual,
        fecha:     new Date().toISOString(),
        DISC: {
            D: 0, I: 0, S: 0, C: 0,
            respuestas: []   // array posicional, índice = índice de pregunta
        },
        completada: false
    };

    indicePregunta = 0;
    tiempoInicio   = Date.now();

    const nombreElem = document.getElementById('nombre-candidato');
    if (nombreElem) nombreElem.textContent = nombreActual + ' - ' + cedula;

    mostrarPregunta();
    iniciarTimer();
}

// ─── Renderizar pregunta actual ───────────────────────────────────────────────
function mostrarPregunta() {
    const prueba   = PREGUNTAS.disc;
    const pregunta = prueba.preguntas[indicePregunta];
    const total    = prueba.preguntas.length;

    const container = document.getElementById('pregunta-container');
    const respuestaAnterior = respuestasDISC.DISC.respuestas[indicePregunta];
    const respondido = respuestaAnterior !== undefined;

    const progPct = Math.round(((indicePregunta + 1) / total) * 100);

    container.innerHTML = `
        <div class="prueba-header">
            <h3>${prueba.nombre}</h3>
            <p class="descripcion">${prueba.descripcion}</p>
            <div class="progress mb-2" style="height:8px;">
                <div class="progress-bar" role="progressbar" style="width:${progPct}%"></div>
            </div>
            <p class="pregunta-contador">Pregunta ${indicePregunta + 1} de ${total}</p>
            <div class="timer" id="timer-prueba">${formatTiempo(Math.max(0, 1200 - Math.floor((Date.now() - tiempoInicio) / 1000)))}</div>
        </div>

        <div class="pregunta-card disc-pregunta">
            <p class="pregunta-texto">${pregunta.pregunta}</p>
            <div class="opciones-disc">
                <label class="opcion-disc ${respuestaAnterior === 'A' ? 'seleccionada' : ''}"
                       id="opcionA" onclick="seleccionarRespuesta('A')">
                    <div class="opcion-letra">A</div>
                    <div class="opcion-texto">${pregunta.opcionA}</div>
                </label>
                <label class="opcion-disc ${respuestaAnterior === 'B' ? 'seleccionada' : ''}"
                       id="opcionB" onclick="seleccionarRespuesta('B')">
                    <div class="opcion-letra">B</div>
                    <div class="opcion-texto">${pregunta.opcionB}</div>
                </label>
            </div>
        </div>

        <div class="acciones">
            <button class="btn btn-secondary" id="btn-anterior"
                    onclick="preguntaAnterior()" ${indicePregunta === 0 ? 'disabled' : ''}>
                ← Anterior
            </button>
            <button class="btn btn-primary" id="btn-siguiente"
                    onclick="siguientePregunta()" ${!respondido ? 'disabled' : ''}>
                ${indicePregunta === total - 1 ? 'Finalizar Prueba' : 'Siguiente →'}
            </button>
        </div>
    `;
}

// ─── Selección de respuesta ───────────────────────────────────────────────────
function seleccionarRespuesta(opcion) {
    // Guardar/sobreescribir respuesta para esta pregunta
    respuestasDISC.DISC.respuestas[indicePregunta] = opcion;

    // Recalcular puntuaciones desde cero para evitar doble conteo
    recalcularPuntuaciones();

    document.getElementById('opcionA').classList.toggle('seleccionada', opcion === 'A');
    document.getElementById('opcionB').classList.toggle('seleccionada', opcion === 'B');
    document.getElementById('btn-siguiente').disabled = false;
}

// ─── Navegación ───────────────────────────────────────────────────────────────
function preguntaAnterior() {
    if (indicePregunta > 0) {
        indicePregunta--;
        mostrarPregunta();
    }
}

function siguientePregunta() {
    if (respuestasDISC.DISC.respuestas[indicePregunta] === undefined) {
        alert('Por favor seleccione una opción antes de continuar');
        return;
    }
    if (indicePregunta < PREGUNTAS.disc.preguntas.length - 1) {
        indicePregunta++;
        mostrarPregunta();
    } else {
        finalizarPrueba();
    }
}

// ─── Timer ────────────────────────────────────────────────────────────────────
function iniciarTimer() {
    const tiempoTotal = 1200;
    timerInterval = setInterval(() => {
        const transcurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
        const restante = Math.max(0, tiempoTotal - transcurrido);
        const timerElem = document.getElementById('timer-prueba');
        if (timerElem) timerElem.textContent = formatTiempo(restante);
        if (restante <= 0) {
            clearInterval(timerInterval);
            finalizarPrueba();
        }
    }, 1000);
}

function formatTiempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ─── Finalizar ────────────────────────────────────────────────────────────────
async function finalizarPrueba() {
    clearInterval(timerInterval);

    // Recalcular una última vez para asegurar coherencia
    recalcularPuntuaciones();

    respuestasDISC.DISC.tiempoTotal   = Date.now() - tiempoInicio;
    respuestasDISC.completada          = true;
    respuestasDISC.fechaFinalizacion   = new Date().toISOString();

    // Generar análisis completo usando la función de preguntas.js
    respuestasDISC.analisis = analizarPerfilDISC({
        D: respuestasDISC.DISC.D,
        I: respuestasDISC.DISC.I,
        S: respuestasDISC.DISC.S,
        C: respuestasDISC.DISC.C
    });

    await guardarResultados(respuestasDISC);

    await guardarCandidato({
        cedula:    cedulaActual,
        nombre:    nombreActual,
        email:     emailActual,
        fecha:     new Date().toISOString(),
        completado: true
    });

    window.location.href = 'resultados.html?cedula=' + cedulaActual;
}
