const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'kkCv8TWTJtrpN4ueQ',
    SERVICE_ID: 'service_lf010hld',
    TEMPLATE_ID: 'template_6jn95mu',
    EMAIL_DESTINO: 'psic.dayanagomezc@outlook.com'
};

var cedulaActual = '';
var nombreActual = '';
var emailActual = '';
var respuestasDISC = {};
var indicePregunta = 0;
var tiempoInicio = null;
var timerInterval = null;

var pruebaActual = 0;
var respuestasTecnicas = {};
var SECUENCIA = ['disc', 'tecnico'];
var TIEMPO_PREGUNTA_TECNICA = 60;

async function iniciarPrueba(cedula) {
    var candidato = await obtenerCandidato(cedula);
    if (!candidato) {
        var cfg = getCargoConfig();
        alert('Candidato no encontrado');
        window.location.href = cfg.paginaInicio;
        return;
    }

    cedulaActual = cedula;
    nombreActual = candidato.nombre;
    emailActual = candidato.email;

    var resultados = await obtenerResultados(cedula);
    if (resultados && resultados.completada) {
        var cfg2 = getCargoConfig();
        window.location.href = cfg2.paginaResultados + '?cedula=' + cedula;
        return;
    }

    respuestasDISC = {
        cedula: cedula,
        nombre: nombreActual,
        email: emailActual,
        fecha: new Date().toISOString(),
        DISC: { D: 0, I: 0, S: 0, C: 0, respuestas: [] },
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
    var prueba = PREGUNTAS.disc;
    var pregunta = prueba.preguntas[indicePregunta];
    var total = prueba.preguntas.length;
    var container = document.getElementById('pregunta-container');
    var respuestaAnterior = respuestasDISC.DISC.respuestas[indicePregunta];
    var respondido = respuestaAnterior !== undefined;

    container.innerHTML = '<div class="prueba-header">'
        + '<h3>' + prueba.nombre + '</h3>'
        + '<p class="descripcion">' + prueba.descripcion + '</p>'
        + '<div class="progress mb-3"><div class="progress-bar" role="progressbar" style="width:' + ((indicePregunta + 1) / total) * 100 + '%"></div></div>'
        + '<p class="pregunta-contador">Pregunta ' + (indicePregunta + 1) + ' de ' + total + '</p>'
        + '<div class="timer" id="timer-prueba">' + formatTiempo(60) + '</div></div>'
        + '<div class="pregunta-card disc-pregunta">'
        + '<p class="pregunta-texto">' + pregunta.pregunta + '</p>'
        + '<div class="opciones-disc">'
        + '<label class="opcion-disc ' + (respuestaAnterior === 'A' ? 'seleccionada' : '') + '" id="opcionA" onclick="seleccionarRespuesta(\'A\')">'
        + '<div class="opcion-letra">A</div><div class="opcion-texto">' + pregunta.opcionA + '</div></label>'
        + '<label class="opcion-disc ' + (respuestaAnterior === 'B' ? 'seleccionada' : '') + '" id="opcionB" onclick="seleccionarRespuesta(\'B\')">'
        + '<div class="opcion-letra">B</div><div class="opcion-texto">' + pregunta.opcionB + '</div></label></div></div>'
        + '<div class="acciones">'
        + '<button class="btn btn-secondary" id="btn-anterior" onclick="preguntaAnterior()" ' + (indicePregunta === 0 ? 'disabled' : '') + '>\u2190 Anterior</button>'
        + '<button class="btn btn-primary" id="btn-siguiente" onclick="siguientePregunta()" ' + (!respondido ? 'disabled' : '') + '>'
        + (indicePregunta === total - 1 ? 'Finalizar Prueba' : 'Siguiente \u2192') + '</button></div>';

    reiniciarTimerPregunta();
    iniciarTimer();
}

function mostrarPreguntaTecnica() {
    var prueba = PREGUNTAS.tecnico;
    var pregunta = prueba.preguntas[indicePregunta];
    var total = prueba.preguntas.length;
    var container = document.getElementById('pregunta-container');
    var letters = ['A', 'B', 'C', 'D'];
    var respuestaAnterior = respuestasTecnicas.respuestas[indicePregunta];
    var respondido = respuestaAnterior !== undefined && respuestaAnterior >= 0;
    var isTimeout = respuestaAnterior === -1;

    var opcionesHTML = pregunta.opciones.map(function(opt, i) {
        var sel = respuestaAnterior === i ? 'seleccionada' : '';
        return '<label class="opcion-disc ' + sel + '" style="cursor:pointer;padding:12px 16px;border-radius:8px;border:2px solid #dee2e6;display:flex;align-items:center;gap:12px;" onclick="seleccionarRespuestaTecnica(' + i + ')" id="opc-' + i + '">'
            + '<span style="width:28px;height:28px;border-radius:50%;background:#e9ecef;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;flex-shrink:0;">' + letters[i] + '</span>'
            + '<span>' + opt + '</span></label>';
    }).join('');

    container.innerHTML = '<div class="prueba-header">'
        + '<h3>' + prueba.nombre + '</h3>'
        + '<p class="descripcion">Categor\u00eda: ' + pregunta.categoria + '</p>'
        + '<div class="progress mb-3"><div class="progress-bar" role="progressbar" style="width:' + ((indicePregunta + 1) / total) * 100 + '%"></div></div>'
        + '<p class="pregunta-contador">Pregunta ' + (indicePregunta + 1) + ' de ' + total + '</p>'
        + '<div class="timer" id="timer-prueba">' + formatTiempo(TIEMPO_PREGUNTA_TECNICA) + '</div></div>'
        + '<div class="pregunta-card disc-pregunta">'
        + '<p class="pregunta-texto"><strong>' + pregunta.pregunta + '</strong></p>'
        + '<div class="opciones-disc" style="display:flex;flex-direction:column;gap:8px;">' + opcionesHTML + '</div>'
        + (respondido || isTimeout ? '<div class="alert alert-secondary" style="margin-top:12px;font-size:0.9rem;text-align:center;"><small>Respuesta registrada</small></div>' : '')
        + '</div>'
        + '<div class="acciones">'
        + '<button class="btn btn-primary" id="btn-siguiente" onclick="siguientePregunta()" ' + (!respondido && !isTimeout ? 'disabled' : '') + '>'
        + (indicePregunta === total - 1 ? 'Finalizar Prueba T\u00e9cnica' : 'Siguiente \u2192') + '</button></div>';

    reiniciarTimerPregunta();
    iniciarTimerTecnico();
}

function recalcularPuntuaciones() {
    var preguntas = PREGUNTAS.disc.preguntas;
    var respuestas = respuestasDISC.DISC.respuestas;
    var puntos = { D: 0, I: 0, S: 0, C: 0 };
    preguntas.forEach(function(preg, idx) {
        var resp = respuestas[idx];
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
    mostrarPreguntaTecnica();
    document.getElementById('btn-siguiente').disabled = false;
}

function preguntaAnterior() {
    if (SECUENCIA[pruebaActual] !== 'disc') return;
    if (indicePregunta > 0) { indicePregunta--; mostrarPregunta(); }
}

function siguientePregunta() {
    if (SECUENCIA[pruebaActual] === 'disc') {
        if (respuestasDISC.DISC.respuestas[indicePregunta] === undefined) {
            alert('Por favor seleccione una opci\u00f3n antes de continuar');
            return;
        }
        if (indicePregunta < PREGUNTAS.disc.preguntas.length - 1) { indicePregunta++; mostrarPregunta(); }
        else finalizarPrueba();
    } else {
        if (indicePregunta < PREGUNTAS.tecnico.preguntas.length - 1) { indicePregunta++; mostrarPregunta(); }
        else finalizarPruebaTecnica();
    }
}

function iniciarTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        var restante = Math.max(0, 60 - Math.floor((Date.now() - tiempoInicio) / 1000));
        var el = document.getElementById('timer-prueba');
        if (el) el.textContent = formatTiempo(restante);
        if (restante <= 0) { clearInterval(timerInterval); avanzarPorTiempo(); }
    }, 1000);
}

function reiniciarTimerPregunta() { tiempoInicio = Date.now(); }

function avanzarPorTiempo() {
    if (indicePregunta < PREGUNTAS.disc.preguntas.length - 1) { indicePregunta++; mostrarPregunta(); }
    else finalizarPrueba();
}

function iniciarTimerTecnico() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        var restante = Math.max(0, TIEMPO_PREGUNTA_TECNICA - Math.floor((Date.now() - tiempoInicio) / 1000));
        var el = document.getElementById('timer-prueba');
        if (el) el.textContent = formatTiempo(restante);
        if (restante <= 0) { clearInterval(timerInterval); avanzarPorTiempoTecnico(); }
    }, 1000);
}

function avanzarPorTiempoTecnico() {
    if (respuestasTecnicas.respuestas[indicePregunta] === undefined || respuestasTecnicas.respuestas[indicePregunta] < 0) {
        respuestasTecnicas.respuestas[indicePregunta] = -1;
        mostrarPreguntaTecnica();
    }
    setTimeout(function() {
        if (indicePregunta < PREGUNTAS.tecnico.preguntas.length - 1) { indicePregunta++; mostrarPreguntaTecnica(); }
        else finalizarPruebaTecnica();
    }, 2000);
}

function formatTiempo(segundos) {
    var mins = Math.floor(segundos / 60);
    var secs = segundos % 60;
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}

async function finalizarPrueba() {
    clearInterval(timerInterval);
    respuestasDISC.DISC.tiempoTotal = Date.now() - tiempoInicio;
    respuestasDISC.completada = true;
    respuestasDISC.fechaFinalizacion = new Date().toISOString();
    respuestasDISC.analisis = analizarPerfilDISC({
        D: respuestasDISC.DISC.D, I: respuestasDISC.DISC.I,
        S: respuestasDISC.DISC.S, C: respuestasDISC.DISC.C
    });
    await guardarResultados(respuestasDISC);

    pruebaActual = 1;
    indicePregunta = 0;
    respuestasTecnicas = {
        cedula: cedulaActual,
        respuestas: new Array(PREGUNTAS.tecnico.preguntas.length).fill(-1),
        analysis: null
    };

    document.getElementById('pregunta-container').innerHTML =
        '<div class="prueba-header text-center"><h3>' + PREGUNTAS.tecnico.nombre + '</h3>'
        + '<p class="descripcion">' + PREGUNTAS.tecnico.descripcion + '</p>'
        + '<p style="color:#198754;font-size:1rem;">\u2713 Test comportamental completado. Ahora inicia la evaluaci\u00f3n t\u00e9cnica.</p></div>';
    setTimeout(function() { mostrarPreguntaTecnica(); }, 2000);
}

async function finalizarPruebaTecnica() {
    clearInterval(timerInterval);
    respuestasTecnicas.analysis = analizarPerfilTecnico(respuestasTecnicas.respuestas);

    var resultadoCompleto = Object.assign({}, respuestasDISC, {
        tecnico: { respuestas: respuestasTecnicas.respuestas, analisis: respuestasTecnicas.analysis }
    });
    await guardarResultados(resultadoCompleto);

    await guardarCandidato({
        cedula: cedulaActual, nombre: nombreActual, email: emailActual,
        fecha: new Date().toISOString(), completado: true
    });
    await enviarResultadosPorEmail();
}

async function enviarResultadosPorEmail() {
    var cfg = getCargoConfig();
    var analisis = respuestasDISC.analisis;
    var compat = analisis.compatibilidad || {};
    var promedioGeneral = getPromedioCombinado({
        analisis: respuestasDISC.analisis,
        tecnico: respuestasTecnicas.analysis ? { analisis: respuestasTecnicas.analysis } : null
    });

    var veredicto = 'EN PROCESO';
    if (promedioGeneral >= 75) veredicto = 'APTO';
    else if (promedioGeneral >= 55) veredicto = 'APTO CON DESARROLLO';
    else if (promedioGeneral >= 40) veredicto = 'REQUIERE EVALUACION ADICIONAL';
    else if (promedioGeneral > 0) veredicto = 'NO RECOMENDADO';

    var fortalezas = (analisis.fortalezas || []).length > 0
        ? analisis.fortalezas.map(function(f) { return '\u2022 ' + f; }).join('\n') : 'Ninguna destacada';
    var areas = (analisis.areasDesarrollo || []).length > 0
        ? analisis.areasDesarrollo.map(function(a) { return '\u2022 ' + a; }).join('\n') : 'Ninguna cr\u00edtica';

    var dataEncoded = btoa(unescape(encodeURIComponent(JSON.stringify({
        nombre: nombreActual, cedula: cedulaActual, email: emailActual,
        fecha: respuestasDISC.fecha,
        analisis: {
            percentiles: analisis.percentiles, compatibilidad: analisis.compatibilidad,
            perfil: analisis.perfil, estilo: analisis.estilo,
            descripcionEstilo: analisis.descripcionEstilo,
            fortalezas: analisis.fortalezas, areasDesarrollo: analisis.areasDesarrollo,
            recomendacion: analisis.recomendacion
        },
        tecnico: respuestasTecnicas.analysis
    }))));

    var baseUrl = window.location.protocol === 'file:'
        ? window.location.href.replace(cfg.paginaTest, cfg.paginaResultados).split('?')[0]
        : window.location.origin + window.location.pathname.replace(cfg.paginaTest, cfg.paginaResultados);
    var linkResultados = baseUrl + '?cedula=' + encodeURIComponent(cedulaActual) + '&data=' + encodeURIComponent(dataEncoded);

    var params = {
        nombre: nombreActual, cedula: cedulaActual,
        fecha: new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }),
        perfil: analisis.estilo || 'N/A', veredicto: veredicto,
        compatibilidad: promedioGeneral + '%',
        email_evaluador: EMAILJS_CONFIG.EMAIL_DESTINO,
        puntajeD: analisis.percentiles.D || 0, puntajeI: analisis.percentiles.I || 0,
        puntajeS: analisis.percentiles.S || 0, puntajeC: analisis.percentiles.C || 0,
        fortalezas: fortalezas, areasDesarrollo: areas,
        linkResultados: linkResultados,
        tecnico_puntaje: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.puntaje : 0,
        tecnico_total: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.total : 0,
        tecnico_porcentaje: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.porcentaje : 0,
        tecnico_veredicto: respuestasTecnicas.analysis ? respuestasTecnicas.analysis.veredicto : ''
    };

    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, params);

        if (cfg.candidatoVeResultados) {
            try { await generarPDFCompleto(respuestasDISC, respuestasTecnicas); } catch (e) {}
        }
        document.body.innerHTML = buildSuccessHTML(true, cfg.candidatoVeResultados);
    } catch (error) {
        console.error('Error enviando email:', error);
        if (cfg.candidatoVeResultados) {
            try { await generarPDFCompleto(respuestasDISC, respuestasTecnicas); } catch (e) {}
        }
        document.body.innerHTML = buildSuccessHTML(false, cfg.candidatoVeResultados);
    }
}

function buildSuccessHTML(emailOK, puedeVerResultados) {
    return '<div class="container" style="max-width:600px;margin:100px auto;text-align:center;padding:40px;background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,0.08);">'
        + '<img src="../Sin-titulo-1.png" alt="MARYTER" id="logo-image" style="max-width:150px;margin-bottom:20px;">'
        + '<h2 style="color:#1a3a5c;">\u00a1Evaluaci\u00f3n Completa!</h2>'
        + '<p style="color:#555;font-size:1.1rem;margin:20px 0;">Gracias por tu participaci\u00f3n, <strong>' + nombreActual + '</strong>.</p>'
        + '<div style="background:' + (emailOK ? '#f0fdf4' : '#fff3cd') + ';border-radius:10px;padding:20px;margin:20px 0;">'
        + '<p style="color:' + (emailOK ? '#198754' : '#856404') + ';font-size:1rem;">\u2713 Tus respuestas han sido registradas exitosamente.</p>'
        + (emailOK ? '' : '<p style="color:#856404;font-size:0.9rem;">No se pudo enviar el email autom\u00e1tico, pero tus datos est\u00e1n seguros.</p>')
        + (puedeVerResultados ? '<p style="color:#555;font-size:0.9rem;">Se ha descargado autom\u00e1ticamente el informe PDF completo.</p>'
            + '<button onclick="generarPDFCompleto(respuestasDISC, respuestasTecnicas)" class="btn btn-success mt-2" style="padding:10px 30px;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;">\ud83d\udcc4 Descargar PDF nuevamente</button>'
            : '<p style="color:#555;font-size:0.9rem;">El equipo evaluador revisar\u00e1 tu perfil y se pondr\u00e1 en contacto contigo.</p>')
        + '</div>'
        + '<p style="color:#888;font-size:0.85rem;">MARYTER S.A.S - Dragados Mar y Ter</p></div>';
}

function analizarPerfilDISC(puntuaciones) {
    var cfg = getCargoConfig();
    var analisis = { percentiles: {}, perfil: '', estilo: '', fortalezas: [], areasDesarrollo: [], compatibilidad: {}, recomendacion: '' };
    var maximo = 6;

    ['D', 'I', 'S', 'C'].forEach(function(dim) {
        analisis.percentiles[dim] = Math.round((puntuaciones[dim] / maximo) * 100);
    });

    var d = puntuaciones.D, i = puntuaciones.I, s = puntuaciones.S, c = puntuaciones.C;
    var matched = false;
    cfg.perfilesDISC.forEach(function(pf) {
        if (!matched && pf.cond(d, i, s, c)) {
            analisis.perfil = pf.perfil;
            analisis.estilo = pf.estilo;
            matched = true;
        }
    });
    if (!matched) {
        analisis.perfil = cfg.perfilDefault.perfil;
        analisis.estilo = cfg.perfilDefault.estilo;
    }

    if (analisis.percentiles.D >= 55) analisis.fortalezas.push(cfg.fortalezaDescs.D);
    if (analisis.percentiles.I >= 55) analisis.fortalezas.push(cfg.fortalezaDescs.I);
    if (analisis.percentiles.S >= 55) analisis.fortalezas.push(cfg.fortalezaDescs.S);
    if (analisis.percentiles.C >= 55) analisis.fortalezas.push(cfg.fortalezaDescs.C);
    if (analisis.percentiles.D < 40) analisis.areasDesarrollo.push(cfg.areaDescs.D);
    if (analisis.percentiles.I < 40) analisis.areasDesarrollo.push(cfg.areaDescs.I);
    if (analisis.percentiles.S < 40) analisis.areasDesarrollo.push(cfg.areaDescs.S);
    if (analisis.percentiles.C < 40) analisis.areasDesarrollo.push(cfg.areaDescs.C);

    Object.keys(cfg.requisitos).forEach(function(req) {
        var config = cfg.requisitos[req];
        var suma = 0;
        config.dims.forEach(function(dim) { suma += analisis.percentiles[dim] || 0; });
        analisis.compatibilidad[req] = Math.round((suma / config.dims.length) * config.peso);
    });

    var promedioGeneral = Object.values(analisis.compatibilidad).reduce(function(a, b) { return a + b; }, 0) / Object.keys(analisis.compatibilidad).length;

    cfg.recomendacionTexts.forEach(function(rt) {
        if (promedioGeneral >= rt.min && !analisis.recomendacion) {
            analisis.recomendacion = rt.text;
        }
    });

    return analisis;
}
