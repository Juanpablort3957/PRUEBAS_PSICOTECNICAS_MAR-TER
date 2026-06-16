// ─── Configuración EmailJS ─────────────────────────────────────────────────
// Mantenimiento: misma config que Analista SIG

const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'kkCv8TWTJtrpN4ueQ',
    SERVICE_ID: 'service_lf010hld',
    TEMPLATE_ID: 'template_6jn95mu',
    EMAIL_DESTINO: 'psic.dayanagomezc@outlook.com'
};

let cedulaActual = '';
let nombreActual = '';
let emailActual = '';
let respuestasDISC = {};
let indicePregunta = 0;
let tiempoInicio = null;
let timerInterval = null;

let pruebaActual = 0;
let respuestasTecnicas = {};
const SECUENCIA = ['disc', 'tecnico'];
const TIEMPO_PREGUNTA_TECNICA = 60;

async function iniciarPrueba(cedula) {
    const candidato = await obtenerCandidato(cedula);
    if (!candidato) {
        alert('Candidato no encontrado');
        window.location.href = 'index_mantenimiento.html';
        return;
    }

    cedulaActual = cedula;
    nombreActual = candidato.nombre;
    emailActual = candidato.email;

    const resultados = await obtenerResultados(cedula);
    if (resultados && resultados.completada) {
        window.location.href = 'resultados_mantenimiento.html?cedula=' + cedula;
        return;
    }

    respuestasDISC = {
        cedula: cedula,
        nombre: nombreActual,
        email: emailActual,
        fecha: new Date().toISOString(),
        DISC: {
            D: 0,
            I: 0,
            S: 0,
            C: 0,
            respuestas: []
        },
        completada: false
    };

    indicePregunta = 0;
    pruebaActual = 0;

    document.getElementById('nombre-candidato').textContent = nombreActual + ' - ' + cedula;

    mostrarPregunta();
}

function mostrarPregunta() {
    if (SECUENCIA[pruebaActual] === 'disc') mostrarPreguntaDisc();
    else mostrarPreguntaTecnica();
}

function mostrarPreguntaDisc() {
    const prueba = PREGUNTAS.disc;
    const pregunta = prueba.preguntas[indicePregunta];
    const total = prueba.preguntas.length;

    const container = document.getElementById('pregunta-container');

    const respuestaAnterior = respuestasDISC.DISC.respuestas[indicePregunta];
    const respondido = respuestaAnterior !== undefined;

    container.innerHTML = `
        <div class="prueba-header">
            <h3>${prueba.nombre}</h3>
            <p class="descripcion">${prueba.descripcion}</p>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: ${((indicePregunta + 1) / total) * 100}%"></div>
            </div>
            <p class="pregunta-contador">Pregunta ${indicePregunta + 1} de ${total}</p>
            <div class="timer" id="timer-prueba">${formatTiempo(60)}</div>
        </div>

        <div class="pregunta-card disc-pregunta">
            <p class="pregunta-texto">${pregunta.pregunta}</p>

            <div class="opciones-disc">
                <label class="opcion-disc ${respuestaAnterior === 'A' ? 'seleccionada' : ''}" id="opcionA" onclick="seleccionarRespuesta('A')">
                    <div class="opcion-letra">A</div>
                    <div class="opcion-texto">${pregunta.opcionA}</div>
                </label>

                <label class="opcion-disc ${respuestaAnterior === 'B' ? 'seleccionada' : ''}" id="opcionB" onclick="seleccionarRespuesta('B')">
                    <div class="opcion-letra">B</div>
                    <div class="opcion-texto">${pregunta.opcionB}</div>
                </label>
            </div>
        </div>

        <div class="acciones">
            <button class="btn btn-secondary" id="btn-anterior" onclick="preguntaAnterior()" ${indicePregunta === 0 ? 'disabled' : ''}>
                ← Anterior
            </button>
            <button class="btn btn-primary" id="btn-siguiente" onclick="siguientePregunta()" ${!respondido ? 'disabled' : ''}>
                ${indicePregunta === total - 1 ? 'Finalizar Prueba' : 'Siguiente →'}
            </button>
        </div>
    `;

    reiniciarTimerPregunta();
    iniciarTimer();
}

function mostrarPreguntaTecnica() {
    const prueba = PREGUNTAS.tecnico;
    const pregunta = prueba.preguntas[indicePregunta];
    const total = prueba.preguntas.length;

    const container = document.getElementById('pregunta-container');
    const letters = ['A', 'B', 'C', 'D'];
    const respuestaAnterior = respuestasTecnicas.respuestas[indicePregunta];
    const respondido = respuestaAnterior !== undefined && respuestaAnterior >= 0;
    const isTimeout = respuestaAnterior === -1;

    container.innerHTML = `
        <div class="prueba-header">
            <h3>${prueba.nombre}</h3>
            <p class="descripcion">Categoría: ${pregunta.categoria}</p>
            <div class="progress mb-3">
                <div class="progress-bar" role="progressbar" style="width: ${((indicePregunta + 1) / total) * 100}%"></div>
            </div>
            <p class="pregunta-contador">Pregunta ${indicePregunta + 1} de ${total}</p>
            <div class="timer" id="timer-prueba">${formatTiempo(TIEMPO_PREGUNTA_TECNICA)}</div>
        </div>

        <div class="pregunta-card disc-pregunta">
            <p class="pregunta-texto"><strong>${pregunta.pregunta}</strong></p>

            <div class="opciones-disc" style="display:flex;flex-direction:column;gap:8px;">
                ${pregunta.opciones.map((opt, i) => {
                    const sel = respuestaAnterior === i ? 'seleccionada' : '';
                    return `
                    <label class="opcion-disc ${sel}"
                           style="cursor:pointer;padding:12px 16px;border-radius:8px;border:2px solid #dee2e6;display:flex;align-items:center;gap:12px;"
                           onclick="seleccionarRespuestaTecnica(${i})" id="opc-${i}">
                        <span style="width:28px;height:28px;border-radius:50%;background:#e9ecef;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0;">${letters[i]}</span>
                        <span>${opt}</span>
                    </label>`;
                }).join('')}
            </div>

            ${respondido || isTimeout ? `
            <div class="alert alert-secondary" style="margin-top:12px;font-size:0.9rem;text-align:center;">
                <small>Respuesta registrada</small>
            </div>` : ''}
        </div>

        <div class="acciones">
            <button class="btn btn-primary" id="btn-siguiente" onclick="siguientePregunta()" ${!respondido && !isTimeout ? 'disabled' : ''}>
                ${indicePregunta === total - 1 ? 'Finalizar Prueba Técnica' : 'Siguiente →'}
            </button>
        </div>
    `;

    reiniciarTimerPregunta();
    iniciarTimerTecnico();
}

function recalcularPuntuaciones() {
    const preguntas = PREGUNTAS.disc.preguntas;
    const respuestas = respuestasDISC.DISC.respuestas;
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

function seleccionarRespuesta(opcion) {
    respuestasDISC.DISC.respuestas[indicePregunta] = opcion;

    recalcularPuntuaciones();

    document.getElementById('opcionA').classList.toggle('seleccionada', opcion === 'A');
    document.getElementById('opcionB').classList.toggle('seleccionada', opcion === 'B');

    document.getElementById('btn-siguiente').disabled = false;
}

function seleccionarRespuestaTecnica(opcion) {
    respuestasTecnicas.respuestas[indicePregunta] = opcion;
    clearInterval(timerInterval);

    mostrarPreguntaTecnica();
    document.getElementById('btn-siguiente').disabled = false;
}

function preguntaAnterior() {
    if (SECUENCIA[pruebaActual] !== 'disc') return;
    if (indicePregunta > 0) {
        indicePregunta--;
        mostrarPregunta();
    }
}

function siguientePregunta() {
    if (SECUENCIA[pruebaActual] === 'disc') {
        const respuestaActual = respuestasDISC.DISC.respuestas[indicePregunta];
        if (respuestaActual === undefined) {
            alert('Por favor seleccione una opción antes de continuar');
            return;
        }
        if (indicePregunta < PREGUNTAS.disc.preguntas.length - 1) {
            indicePregunta++;
            mostrarPregunta();
        } else {
            finalizarPrueba();
        }
    } else {
        if (indicePregunta < PREGUNTAS.tecnico.preguntas.length - 1) {
            indicePregunta++;
            mostrarPregunta();
        } else {
            finalizarPruebaTecnica();
        }
    }
}

function iniciarTimer() {
    const TIEMPO_PREGUNTA = 60;

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const transcurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
        const restante = Math.max(0, TIEMPO_PREGUNTA - transcurrido);

        const timerElem = document.getElementById('timer-prueba');
        if (timerElem) {
            timerElem.textContent = formatTiempo(restante);
        }

        if (restante <= 0) {
            clearInterval(timerInterval);
            avanzarPorTiempo();
        }
    }, 1000);
}

function reiniciarTimerPregunta() {
    tiempoInicio = Date.now();
}

function avanzarPorTiempo() {
    if (indicePregunta < PREGUNTAS.disc.preguntas.length - 1) {
        indicePregunta++;
        mostrarPregunta();
    } else {
        finalizarPrueba();
    }
}

function iniciarTimerTecnico() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const transcurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
        const restante = Math.max(0, TIEMPO_PREGUNTA_TECNICA - transcurrido);

        const timerElem = document.getElementById('timer-prueba');
        if (timerElem) timerElem.textContent = formatTiempo(restante);

        if (restante <= 0) {
            clearInterval(timerInterval);
            avanzarPorTiempoTecnico();
        }
    }, 1000);
}

function avanzarPorTiempoTecnico() {
    if (respuestasTecnicas.respuestas[indicePregunta] === undefined || respuestasTecnicas.respuestas[indicePregunta] < 0) {
        respuestasTecnicas.respuestas[indicePregunta] = -1;
        mostrarPreguntaTecnica();
    }
    setTimeout(() => {
        if (indicePregunta < PREGUNTAS.tecnico.preguntas.length - 1) {
            indicePregunta++;
            mostrarPreguntaTecnica();
        } else {
            finalizarPruebaTecnica();
        }
    }, 2000);
}

function formatTiempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

async function finalizarPrueba() {
    clearInterval(timerInterval);

    respuestasDISC.DISC.tiempoTotal = Date.now() - tiempoInicio;
    respuestasDISC.completada = true;
    respuestasDISC.fechaFinalizacion = new Date().toISOString();

    respuestasDISC.analisis = analizarPerfilDISC({
        D: respuestasDISC.DISC.D,
        I: respuestasDISC.DISC.I,
        S: respuestasDISC.DISC.S,
        C: respuestasDISC.DISC.C
    });

    await guardarResultados(respuestasDISC);

    pruebaActual = 1;
    indicePregunta = 0;

    respuestasTecnicas = {
        cedula: cedulaActual,
        respuestas: new Array(PREGUNTAS.tecnico.preguntas.length).fill(-1),
        analysis: null
    };

    document.getElementById('pregunta-container').innerHTML = `
        <div class="prueba-header text-center">
            <h3>${PREGUNTAS.tecnico.nombre}</h3>
            <p class="descripcion">${PREGUNTAS.tecnico.descripcion}</p>
            <p style="color:#198754;font-size:1rem;">✓ Test comportamental completado. Ahora inicia la evaluación técnica.</p>
        </div>`;

    setTimeout(() => mostrarPreguntaTecnica(), 2000);
}

async function finalizarPruebaTecnica() {
    clearInterval(timerInterval);

    respuestasTecnicas.analysis = analizarPerfilTecnico(respuestasTecnicas.respuestas);

    const resultadoCompleto = {
        ...respuestasDISC,
        tecnico: {
            respuestas: respuestasTecnicas.respuestas,
            analisis: respuestasTecnicas.analysis
        }
    };

    await guardarResultados(resultadoCompleto);

    await guardarCandidato({
        cedula: cedulaActual,
        nombre: nombreActual,
        email: emailActual,
        fecha: new Date().toISOString(),
        completado: true
    });

    await enviarResultadosPorEmail();
}

async function enviarResultadosPorEmail() {
    const analisis = respuestasDISC.analisis;
    const compat = analisis.compatibilidad || {};
    const promedioGeneral = Object.keys(compat).length > 0
        ? Math.round(Object.values(compat).reduce((a, b) => a + b, 0) / Object.keys(compat).length)
        : 0;

    let veredicto = 'EN PROCESO';
    if      (promedioGeneral >= 75) veredicto = 'APTO';
    else if (promedioGeneral >= 55) veredicto = 'APTO CON DESARROLLO';
    else if (promedioGeneral >= 40) veredicto = 'REQUIERE EVALUACION ADICIONAL';
    else if (promedioGeneral > 0)   veredicto = 'NO RECOMENDADO';

    const fortalezas = (analisis.fortalezas || []).length > 0
        ? analisis.fortalezas.map(f => '• ' + f).join('\n')
        : 'Ninguna destacada';

    const areas = (analisis.areasDesarrollo || []).length > 0
        ? analisis.areasDesarrollo.map(a => '• ' + a).join('\n')
        : 'Ninguna crítica';

    const dataEncoded = btoa(unescape(encodeURIComponent(JSON.stringify({
        nombre: nombreActual,
        cedula: cedulaActual,
        email: emailActual,
        fecha: respuestasDISC.fecha,
        analisis: {
            percentiles: analisis.percentiles,
            compatibilidad: analisis.compatibilidad,
            perfil: analisis.perfil,
            estilo: analisis.estilo,
            descripcionEstilo: analisis.descripcionEstilo,
            fortalezas: analisis.fortalezas,
            areasDesarrollo: analisis.areasDesarrollo,
            recomendacion: analisis.recomendacion
        },
        tecnico: respuestasTecnicas.analysis
    }))));

    const baseUrl = window.location.protocol === 'file:'
        ? window.location.href.replace('test_mantenimiento.html', 'resultados_mantenimiento.html').split('?')[0]
        : window.location.origin + window.location.pathname.replace('test_mantenimiento.html', 'resultados_mantenimiento.html');
    const linkResultados = baseUrl + '?cedula=' + encodeURIComponent(cedulaActual) + '&data=' + encodeURIComponent(dataEncoded);

    const params = {
        nombre: nombreActual,
        cedula: cedulaActual,
        fecha: new Date().toLocaleDateString('es-CO', {
            year: 'numeric', month: 'long', day: 'numeric'
        }),
        perfil: analisis.estilo || 'N/A',
        veredicto: veredicto,
        compatibilidad: promedioGeneral + '%',
        email_evaluador: EMAILJS_CONFIG.EMAIL_DESTINO,
        puntajeD: analisis.percentiles.D || 0,
        puntajeI: analisis.percentiles.I || 0,
        puntajeS: analisis.percentiles.S || 0,
        puntajeC: analisis.percentiles.C || 0,
        fortalezas: fortalezas,
        areasDesarrollo: areas,
        linkResultados: linkResultados,
        tecnico_puntaje: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.puntaje : 0,
        tecnico_total: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.total : 0,
        tecnico_porcentaje: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.porcentaje : 0,
        tecnico_veredicto: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.veredicto : ''
    };

    console.log('DEBUG: Enviando email con params:', JSON.stringify(params, null, 2));

    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            params
        );
        console.log('DEBUG: Email enviado exitosamente:', response);

        const successHtml = `
            <div class="container" style="max-width:600px;margin:100px auto;text-align:center;padding:40px;background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
                <img src="Sin-titulo-1.png" alt="MARYTER" id="logo-image" style="max-width:150px;margin-bottom:20px;">
                <h2 style="color:#1a3a5c;">¡Registro Exitoso!</h2>
                <p style="color:#555;font-size:1.1rem;margin:20px 0;">
                    Gracias por tu participación, <strong>${nombreActual}</strong>.
                </p>
                <div style="background:#f0fdf4;border-radius:10px;padding:20px;margin:20px 0;">
                    <p style="color:#198754;font-size:1rem;">
                        ✓ Tus respuestas han sido registradas exitosamente.
                    </p>
                </div>
                <p style="color:#888;font-size:0.85rem;">
                    MARYTER S.A.S - Dragados Mar y Ter
                </p>
            </div>
        `;
        document.body.innerHTML = successHtml;
    } catch (error) {
        console.error('DEBUG: Error enviando email:', error);
        console.error('DEBUG: Status:', error?.status);
        console.error('DEBUG: Text:', error?.text);

        document.body.innerHTML = `
            <div class="container" style="max-width:600px;margin:100px auto;text-align:center;padding:40px;background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,0.08);">
                <img src="Sin-titulo-1.png" alt="MARYTER" id="logo-image" style="max-width:150px;margin-bottom:20px;">
                <h2 style="color:#1a3a5c;">¡Registro Exitoso!</h2>
                <p style="color:#555;font-size:1.1rem;margin:20px 0;">
                    Gracias por tu participación, <strong>${nombreActual}</strong>.
                </p>
                <div style="background:#f0fdf4;border-radius:10px;padding:20px;margin:20px 0;">
                    <p style="color:#198754;font-size:1rem;">
                        ✓ Tus respuestas han sido registradas exitosamente.
                    </p>
                </div>
                <p style="color:#888;font-size:0.85rem;">
                    MARYTER S.A.S - Dragados Mar y Ter
                </p>
            </div>
        `;
    }
}

function analizarPerfilDISC(puntuaciones) {
    const analisis = {
        percentiles: {},
        perfil: '',
        estilo: '',
        fortalezas: [],
        areasDesarrollo: [],
        compatibilidad: {},
        recomendacion: ''
    };

    const maximo = 6;

    ['D', 'I', 'S', 'C'].forEach(dim => {
        analisis.percentiles[dim] = Math.round((puntuaciones[dim] / maximo) * 100);
    });

    const d = puntuaciones.D;
    const i = puntuaciones.I;
    const s = puntuaciones.S;
    const c = puntuaciones.C;

    if (d >= 4 && c >= 4 && s >= 3) {
        analisis.perfil = 'Líder Técnico de Planta';
        analisis.estilo = 'Combina autoridad para liderar equipos de mantenimiento con rigor técnico. Ideal para coordinar cuadrillas y asegurar continuidad operativa.';
    } else if (c >= 4 && s >= 4) {
        analisis.perfil = 'Planificador Metódico';
        analisis.estilo = 'Excelente para planificación de mantenimiento, control de inventarios de repuestos y gestión documental. Prioriza la organización y el cumplimiento.';
    } else if (i >= 4 && s >= 4) {
        analisis.perfil = 'Comunicador Operativo';
        analisis.estilo = 'Gran habilidad para capacitar técnicos, coordinar con proveedores y facilitar comunicación entre áreas de planta.';
    } else if (d >= 4 && i >= 4 && c >= 3) {
        analisis.perfil = 'Transformador de Procesos';
        analisis.estilo = 'Lidera cambios en cultura de mantenimiento con determinación y persuasión. Ideal para implementar TPM y Lean Maintenance.';
    } else if (d >= 3 && i >= 3 && s >= 3 && c >= 3) {
        analisis.perfil = 'Integral de Mantenimiento';
        analisis.estilo = 'Perfil versátil y equilibrado. Puede desempeñarse en múltiples frentes del área de mantenimiento con adaptabilidad.';
    } else if (c >= 4 && d >= 3) {
        analisis.perfil = 'Técnico Especialista';
        analisis.estilo = 'Sólido conocimiento técnico de equipos y procedimientos. Enfoque en confiabilidad, análisis de fallas y cumplimiento de estándares.';
    } else if (d >= 4 && s >= 3) {
        analisis.perfil = 'Supervisor de Campo';
        analisis.estilo = 'Cómodo en planta y trabajo operativo. Toma decisiones rápidas durante fallas y mantiene constancia en seguimiento.';
    } else {
        analisis.perfil = 'Perfil en Desarrollo en Mantenimiento';
        analisis.estilo = 'No encaja en perfiles típicos de coordinación de mantenimiento. Se requiere evaluación adicional.';
    }

    if (analisis.percentiles.D >= 55) analisis.fortalezas.push('Liderazgo de equipos técnicos y toma de decisiones bajo presión');
    if (analisis.percentiles.I >= 55) analisis.fortalezas.push('Comunicación efectiva para coordinar equipos y proveedores');
    if (analisis.percentiles.S >= 55) analisis.fortalezas.push('Constancia en seguimiento de planes de mantenimiento y órdenes de trabajo');
    if (analisis.percentiles.C >= 55) analisis.fortalezas.push('Atención al detalle técnico, gestión documental y cumplimiento de estándares');

    if (analisis.percentiles.D < 40) analisis.areasDesarrollo.push('Capacidad de liderazgo y firmeza para dirigir equipos de mantenimiento');
    if (analisis.percentiles.I < 40) analisis.areasDesarrollo.push('Habilidades de comunicación para coordinar con producción y proveedores');
    if (analisis.percentiles.S < 40) analisis.areasDesarrollo.push('Constancia en seguimiento de programas de mantenimiento y trabajo de campo');
    if (analisis.percentiles.C < 40) analisis.areasDesarrollo.push('Rigor técnico, análisis de fallas y cumplimiento de procedimientos');

    const requisitos = {
        liderazgoEquipos: { dims: ['D', 'I'], peso: 0.9 },
        organizacionPlanificacion: { dims: ['C', 'S'], peso: 1.0 },
        resolucionProblemas: { dims: ['D', 'C'], peso: 0.9 },
        comunicacionEfectiva: { dims: ['I', 'S'], peso: 0.9 },
        orientacionResultados: { dims: ['D', 'C'], peso: 1.0 },
        conocimientoMantenimiento: { dims: ['C', 'D'], peso: 1.0 },
        seguridadIndustrial: { dims: ['C', 'S'], peso: 0.9 },
        gestionRepuestos: { dims: ['C', 'S'], peso: 0.8 },
        mejoraContinua: { dims: ['D', 'C'], peso: 0.8 },
        supervisionTecnica: { dims: ['D', 'S'], peso: 0.9 }
    };

    Object.keys(requisitos).forEach(req => {
        const config = requisitos[req];
        let suma = 0;
        config.dims.forEach(dim => {
            suma += analisis.percentiles[dim] || 0;
        });
        analisis.compatibilidad[req] = Math.round((suma / config.dims.length) * config.peso);
    });

    const promedioGeneral = Object.values(analisis.compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(analisis.compatibilidad).length;

    if (promedioGeneral >= 75) {
        analisis.recomendacion = 'APTO para el cargo de Coordinador de Mantenimiento y Logística. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. Demuestra competencias para liderar equipos, planificar mantenimiento y asegurar continuidad operativa.';
    } else if (promedioGeneral >= 55) {
        analisis.recomendacion = 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo de mantenimiento. Se recomienda capacitación técnica y acompañamiento en los primeros meses.';
    } else if (promedioGeneral >= 40) {
        analisis.recomendacion = 'REQUIERE EVALUACIÓN ADICIONAL. El perfil muestra algunas fortalezas pero brechas significativas para el cargo de mantenimiento. Se recomienda entrevista conductual profunda.';
    } else {
        analisis.recomendacion = 'NO RECOMENDADO para el cargo de Coordinador de Mantenimiento y Logística. El perfil DISC no muestra la compatibilidad necesaria.';
    }

    return analisis;
}
