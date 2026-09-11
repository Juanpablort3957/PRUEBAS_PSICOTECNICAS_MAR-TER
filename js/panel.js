var candidatosData = [];
var resultadosData = [];
var cedulaSeleccionada = null;

async function cargarDatos() {
    candidatosData = await obtenerTodosCandidatos();
    resultadosData = await obtenerTodosResultados();
    renderizarLista();
}

function getPromedio(resultado) {
    if (!resultado || !resultado.analisis) return 0;
    return getPromedioCombinado(resultado);
}

function renderizarLista() {
    var tbody = document.getElementById('candidatos-lista');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (resultadosData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay candidatos evaluados a\u00fan</td></tr>';
        updateStats();
        return;
    }

    resultadosData.forEach(function(resultado) {
        var candidato = candidatosData.find(function(c) { return c.cedula === resultado.cedula; });
        var nombre = candidato ? candidato.nombre : resultado.nombre || 'Desconocido';
        var fecha = new Date(resultado.fecha).toLocaleDateString('es-CO');
        var prom = getPromedio(resultado);
        var badge;

        if (resultado.analisis && resultado.analisis.compatibilidad) {
            if (prom >= 75) badge = '<span class="badge bg-success">APTO</span>';
            else if (prom >= 55) badge = '<span class="badge bg-info">APTO C/DESARROLLO</span>';
            else if (prom >= 40) badge = '<span class="badge bg-warning">EVALUAR</span>';
            else badge = '<span class="badge bg-danger">NO APTO</span>';
        } else {
            badge = '<span class="badge bg-secondary">EN PROCESO</span>';
        }

        tbody.innerHTML += '<tr onclick="verDetalle(\'' + resultado.cedula + '\')" style="cursor: pointer;">'
            + '<td>' + resultado.cedula + '</td><td>' + nombre + '</td><td>' + fecha + '</td><td>' + badge + '</td>'
            + '<td>'
            + '<button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); verDetalle(\'' + resultado.cedula + '\')">Ver Detalle</button>'
            + '<button class="btn btn-sm btn-success" onclick="event.stopPropagation(); descargarPDF(\'' + resultado.cedula + '\')">PDF</button>'
            + '<button class="btn btn-sm btn-info" onclick="event.stopPropagation(); copiarLinkPrueba(\'' + resultado.cedula + '\', \'' + nombre.replace(/'/g, "\\'") + '\')" title="Copiar link de prueba">\ud83d\udd17 Link</button>'
            + '</td></tr>';
    });

    updateStats();
}

function updateStats() {
    document.getElementById('total-candidatos').textContent = resultadosData.length;
    var completados = resultadosData.filter(function(r) { return r.completada; }).length;
    document.getElementById('completados').textContent = completados;
    var aptos = resultadosData.filter(function(r) { return getPromedio(r) >= 55; }).length;
    document.getElementById('pendientes').textContent = aptos;
}

async function verDetalle(cedula) {
    var resultado = await obtenerResultados(cedula);
    if (!resultado) { alert('Resultado no encontrado'); return; }
    var candidato = await obtenerCandidato(cedula);
    var cfg = getCargoConfig();

    var discBars = ['D', 'I', 'S', 'C'].map(function(dim) {
        var p = resultado.analisis?.percentiles?.[dim] || 0;
        var cls = p >= 75 ? 'bg-success' : p >= 55 ? 'bg-primary' : p >= 40 ? 'bg-warning' : 'bg-secondary';
        return '<div class="d-flex align-items-center mb-2"><div style="width:30px"><strong>' + dim + '</strong></div>'
            + '<div class="flex-grow-1"><div class="progress" style="height:20px"><div class="progress-bar ' + cls + '" style="width:' + p + '%">' + p + '%</div></div></div></div>';
    }).join('');

    var compatRows = resultado.analisis?.compatibilidad
        ? cfg.reqLabels.map(function(r) {
            var p = resultado.analisis.compatibilidad[r.key] || 0;
            var ev = p >= 75 ? ['\u00d3ptimo', 'text-success'] : p >= 55 ? ['Adecuado', 'text-primary'] : p >= 40 ? ['En Desarrollo', 'text-warning'] : ['Insuficiente', 'text-danger'];
            return '<tr><td>' + r.label + '</td><td>' + p + '%</td><td class="' + ev[1] + '">' + ev[0] + '</td></tr>';
        }).join('')
        : '<tr><td colspan="3">Sin datos</td></tr>';

    var ta = (resultado.tecnico && (resultado.tecnico.analisis || resultado.tecnico.analysis)) || null;
    var tecHTML = '';
    if (ta) {
        var tBadge = ta.porcentaje >= 70 ? 'bg-success' : ta.porcentaje >= 50 ? 'bg-warning' : 'bg-danger';
        var tVerd = ta.veredicto || '';
        var tPunt = (typeof ta.puntaje === 'number' ? ta.puntaje : 0) + '/' + (typeof ta.total === 'number' ? ta.total : 0);
        var tPorc = typeof ta.porcentaje === 'number' ? ta.porcentaje : 0;
        var tCat = Object.values(ta.categorias || {}).map(function(cat) {
            var cp = typeof cat.porcentaje === 'number' ? cat.porcentaje : 0;
            return '<tr><td>' + (cat.label || '') + '</td><td class="text-center">' + (cat.aciertos || 0) + '/' + (cat.total || 0) + '</td><td class="text-center">' + cp + '%</td></tr>';
        }).join('');
        tecHTML = '<div class="card mb-3"><div class="card-body"><h6>Resultados Evaluaci\u00f3n T\u00e9cnica</h6>'
            + '<span class="badge ' + tBadge + '">' + tVerd + '</span> '
            + '<strong>' + tPunt + '</strong> (' + tPorc + '%)'
            + '<table class="table table-sm mt-2 mb-2"><thead><tr><th>Categor\u00eda</th><th class="text-center">Aciertos</th><th class="text-center">%</th></tr></thead><tbody>' + tCat + '</tbody></table>'
            + '<p style="font-size:0.85rem;color:#555;margin:0;">' + (ta.recomendacion || '') + '</p></div></div>';
    }

    var html = '<div class="modal fade" id="modalDetalle" tabindex="-1">'
        + '<div class="modal-dialog modal-lg"><div class="modal-content">'
        + '<div class="modal-header"><h5 class="modal-title">Detalle del Candidato - ' + cfg.nombre + '</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>'
        + '<div class="modal-body">'
        + '<div class="row mb-3"><div class="col-md-6"><strong>C\u00e9dula:</strong> ' + cedula + '</div>'
        + '<div class="col-md-6"><strong>Nombre:</strong> ' + (candidato?.nombre || resultado.nombre) + '</div>'
        + '<div class="col-md-6"><strong>Email:</strong> ' + (candidato?.email || resultado.email || 'No proporcionado') + '</div>'
        + '<div class="col-md-6"><strong>Fecha:</strong> ' + new Date(resultado.fecha).toLocaleDateString('es-CO') + '</div>'
        + '<div class="col-md-6"><strong>Perfil DISC:</strong> ' + (resultado.analisis?.perfil || 'N/A') + '</div></div>'
        + '<div class="card mb-3"><div class="card-body"><h6>Gr\u00e1fico DISC</h6>' + discBars + '</div></div>'
        + '<div class="card mb-3"><div class="card-body"><h6>Compatibilidad con el Cargo: ' + cfg.nombre + '</h6>'
        + '<table class="table table-sm"><thead><tr><th>Requisito</th><th>Percentil</th><th>Evaluaci\u00f3n</th></tr></thead><tbody>' + compatRows + '</tbody></table></div></div>'
        + tecHTML
        + '<div class="row"><div class="col-md-6"><div class="analisis-card fortalezas"><h6>Fortalezas</h6><ul>'
        + ((resultado.analisis?.fortalezas || []).length > 0 ? resultado.analisis.fortalezas.map(function(f) { return '<li>' + f + '</li>'; }).join('') : '<li>No identificadas</li>') + '</ul></div></div>'
        + '<div class="col-md-6"><div class="analisis-card debilidades"><h6>\u00c1reas de Desarrollo</h6><ul>'
        + ((resultado.analisis?.areasDesarrollo || []).length > 0 ? resultado.analisis.areasDesarrollo.map(function(a) { return '<li>' + a + '</li>'; }).join('') : '<li>No identificadas</li>') + '</ul></div></div></div>'
        + '<div class="alert alert-info mt-3"><h6>Recomendaci\u00f3n:</h6><p class="mb-0">' + (resultado.analisis?.recomendacion || 'Sin recomendaci\u00f3n disponible') + '</p></div>'
        + '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>'
        + '<button type="button" class="btn btn-success" onclick="descargarPDF(\'' + cedula + '\')">Descargar PDF</button></div></div></div></div>';

    var container = document.getElementById('modal-container') || createModalContainer();
    container.innerHTML = html;
    var modal = new bootstrap.Modal(container.querySelector('#modalDetalle'));
    modal.show();
}

function createModalContainer() {
    var c = document.createElement('div');
    c.id = 'modal-container';
    document.body.appendChild(c);
    return c;
}

async function descargarPDF(cedula) {
    try {
        var resultado = await obtenerResultados(cedula);
        if (!resultado) { alert('Resultado no encontrado'); return; }
        if (resultado.tecnico && resultado.tecnico.analisis) await generarPDFCompleto(resultado, resultado.tecnico);
        else await generarPDF(resultado);
    } catch (e) { console.error('Error:', e); alert('Error al generar PDF: ' + (e.message || e)); }
}

async function cambiarPassword() {
    var nuevo = prompt('Ingrese la nueva contrase\u00f1a:');
    if (nuevo && nuevo.length >= 4) {
        await cambiarPassword(nuevo);
        alert('Contrase\u00f1a actualizada correctamente');
    } else if (nuevo) alert('La contrase\u00f1a debe tener al menos 4 caracteres');
}

function filtrarPorFecha() {
    var filtro = document.getElementById('filtro-fecha').value;
    if (!filtro) { renderizarLista(); return; }
    var fechaFiltro = new Date(filtro).toDateString();
    var filtrados = resultadosData.filter(function(r) {
        return new Date(r.fecha).toDateString() === fechaFiltro;
    });
    var tbody = document.getElementById('candidatos-lista');
    tbody.innerHTML = '';
    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay resultados para esta fecha</td></tr>';
        return;
    }
    filtrados.forEach(function(r) {
        var c = candidatosData.find(function(x) { return x.cedula === r.cedula; });
        var nombre = c ? c.nombre : r.nombre || 'Desconocido';
        var fecha = new Date(r.fecha).toLocaleDateString('es-CO');
        var prom = getPromedio(r);
        var badge;
        if (r.analisis && r.analisis.compatibilidad) {
            if (prom >= 75) badge = '<span class="badge bg-success">APTO</span>';
            else if (prom >= 55) badge = '<span class="badge bg-info">APTO C/DESARROLLO</span>';
            else if (prom >= 40) badge = '<span class="badge bg-warning">EVALUAR</span>';
            else badge = '<span class="badge bg-danger">NO APTO</span>';
        } else badge = '<span class="badge bg-secondary">EN PROCESO</span>';

        tbody.innerHTML += '<tr onclick="verDetalle(\'' + r.cedula + '\')" style="cursor: pointer;">'
            + '<td>' + r.cedula + '</td><td>' + nombre + '</td><td>' + fecha + '</td><td>' + badge + '</td>'
            + '<td><button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); verDetalle(\'' + r.cedula + '\')">Ver Detalle</button>'
            + '<button class="btn btn-sm btn-success" onclick="event.stopPropagation(); descargarPDF(\'' + r.cedula + '\')">PDF</button>'
            + '<button class="btn btn-sm btn-info" onclick="event.stopPropagation(); copiarLinkPrueba(\'' + r.cedula + '\', \'' + nombre.replace(/'/g, "\\'") + '\')">\ud83d\udd17 Link</button></td></tr>';
    });
}

function getBaseUrl() {
    var input = document.getElementById('base-url');
    if (!input) return '';
    var url = input.value.trim().replace(/\/+$/, '');
    sessionStorage.setItem('base_url', url);
    return url;
}

function guardarBaseUrl() {
    var url = getBaseUrl();
    alert('URL base guardada: ' + url);
}

function actualizarPreviewLink(link) {
    var el = document.getElementById('preview-link');
    if (el) el.textContent = link || '\u2014';
}

async function copiarLinkPrueba(cedula, nombre) {
    var baseUrl = getBaseUrl();
    if (!baseUrl) { alert('Primero configura la URL del sitio.'); document.getElementById('base-url')?.focus(); return; }
    var cfg = getCargoConfig();
    cedulaSeleccionada = cedula;
    var link = baseUrl + '/' + cfg.paginaTest + '?cedula=' + encodeURIComponent(cedula);
    var btn = document.getElementById('btn-enviar-link');
    if (btn) btn.disabled = false;
    try {
        await navigator.clipboard.writeText(link);
        actualizarPreviewLink(link);
        alert('\u2705 Link copiado para ' + nombre + ':\n' + link);
    } catch (e) {
        prompt('Copia este link manualmente:', link);
        actualizarPreviewLink(link);
    }
}

async function enviarLinkSeleccionado() {
    if (!cedulaSeleccionada) { alert('Primero haz clic en \ud83d\udd17 Link de un candidato.'); return; }
    var cfg = getCargoConfig();
    var candidato = await obtenerCandidato(cedulaSeleccionada);
    if (!candidato || !candidato.email) { alert('El candidato no tiene email registrado.'); return; }
    var baseUrl = getBaseUrl();
    if (!baseUrl) { alert('Configura la URL del sitio primero.'); return; }
    var link = baseUrl + '/' + cfg.paginaTest + '?cedula=' + encodeURIComponent(cedulaSeleccionada);

    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
            nombre: candidato.nombre,
            cedula: cedulaSeleccionada,
            email_evaluador: EMAILJS_CONFIG.EMAIL_DESTINO,
            linkResultados: link,
            perfil: 'Candidato a ' + cfg.nombre,
            veredicto: 'PENDIENTE',
            compatibilidad: 'Enlace enviado',
            puntajeD: 0, puntajeI: 0, puntajeS: 0, puntajeC: 0,
            fortalezas: 'Realizar prueba psicot\u00e9cnica',
            areasDesarrollo: 'N/A',
            fecha: new Date().toLocaleDateString('es-CO'),
            tecnico_puntaje: 0, tecnico_total: 0, tecnico_porcentaje: 0, tecnico_veredicto: ''
        });
        alert('\u2705 Link enviado a ' + candidato.email);
    } catch (e) {
        console.error('Error enviando:', e);
        alert('Error al enviar: ' + (e.message || e) + '\n\nLink copiado al portapapeles.');
    }
}

async function _verificarPasswordDB(password) {
    return await verificarPassword(password);
}

async function mostrarPanel() {
    document.getElementById('login-panel').style.display = 'none';
    document.getElementById('panel-contenido').style.display = 'block';
    await cargarDatos();
}

function cerrarSesion() {
    sessionStorage.removeItem('evaluador_password');
    window.location.reload();
}

async function _cambiarPasswordPanel() {
    var nuevo = prompt('Ingrese la nueva contrase\u00f1a:');
    if (nuevo && nuevo.length >= 4) {
        await cambiarPassword(nuevo);
        alert('Contrase\u00f1a actualizada correctamente');
    } else if (nuevo) alert('La contrase\u00f1a debe tener al menos 4 caracteres');
}
