let candidatosData = [];
let resultadosData = [];

async function cargarDatos() {
    candidatosData = await obtenerTodosCandidatos();
    resultadosData = await obtenerTodosResultados();
    renderizarLista();
}

function renderizarLista() {
    const tbody = document.getElementById('candidatos-lista');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    if (resultadosData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay candidatos evaluados aún</td></tr>';
        return;
    }
    
    resultadosData.forEach(resultado => {
        const candidato = candidatosData.find(c => c.cedula === resultado.cedula);
        const nombre = candidato ? candidato.nombre : resultado.nombre || 'Desconocido';
        const fecha = new Date(resultado.fecha).toLocaleDateString('es-CO');
        
        let estadoBadge = '';
        let veredicto = '';
        
        if (resultado.analisis && resultado.analisis.compatibilidad) {
            const promedioGeneral = Object.values(resultado.analisis.compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(resultado.analisis.compatibilidad).length;
            
            if (promedioGeneral >= 75) {
                estadoBadge = '<span class="badge bg-success">APTO</span>';
                veredicto = 'APTO';
            } else if (promedioGeneral >= 55) {
                estadoBadge = '<span class="badge bg-info">APTO C/DESARROLLO</span>';
                veredicto = 'APTO CON DESARROLLO';
            } else if (promedioGeneral >= 40) {
                estadoBadge = '<span class="badge bg-warning">EVALUAR</span>';
                veredicto = 'REQUIERE EVALUACION';
            } else {
                estadoBadge = '<span class="badge bg-danger">NO APTO</span>';
                veredicto = 'NO RECOMENDADO';
            }
        } else {
            estadoBadge = '<span class="badge bg-secondary">EN PROCESO</span>';
            veredicto = '';
        }
        
        const perfilDISC = resultado.analisis?.perfil || 'N/A';
        
        tbody.innerHTML += `
            <tr onclick="verDetalle('${resultado.cedula}')" style="cursor: pointer;">
                <td>${resultado.cedula}</td>
                <td>${nombre}</td>
                <td>${fecha}</td>
                <td>${estadoBadge}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); verDetalle('${resultado.cedula}')">
                        Ver Detalle
                    </button>
                    <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); descargarPDF('${resultado.cedula}')">
                        PDF
                    </button>
                    <button class="btn btn-sm btn-info" onclick="event.stopPropagation(); copiarLinkPrueba('${resultado.cedula}', '${nombre}')" title="Copiar link de prueba al portapapeles">
                        🔗 Link
                    </button>
                </td>
            </tr>
        `;
    });
    
    document.getElementById('total-candidatos').textContent = resultadosData.length;
    
    const completados = resultadosData.filter(r => r.completada).length;
    document.getElementById('completados').textContent = completados;
    
    const aptos = resultadosData.filter(r => {
        if (!r.analisis || !r.analisis.compatibilidad) return false;
        const promedio = Object.values(r.analisis.compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(r.analisis.compatibilidad).length;
        return promedio >= 55;
    }).length;
    
    document.getElementById('pendientes').textContent = aptos;
}

async function verDetalle(cedula) {
    const resultado = await obtenerResultados(cedula);
    if (!resultado) {
        alert('Resultado no encontrado');
        return;
    }
    
    const candidato = await obtenerCandidato(cedula);
    
    let html = `
        <div class="modal fade" id="modalDetalle" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalle del Candidato - Perfil DISC</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <strong>Cédula:</strong> ${cedula}
                            </div>
                            <div class="col-md-6">
                                <strong>Nombre:</strong> ${candidato?.nombre || resultado.nombre}
                            </div>
                            <div class="col-md-6">
                                <strong>Email:</strong> ${candidato?.email || resultado.email || 'No proporcionado'}
                            </div>
                            <div class="col-md-6">
                                <strong>Fecha:</strong> ${new Date(resultado.fecha).toLocaleDateString('es-CO')}
                            </div>
                            <div class="col-md-6">
                                <strong>Perfil DISC:</strong> ${resultado.analisis?.perfil || 'N/A'}
                            </div>
                        </div>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6>Gráfico DISC</h6>
                                ${['D', 'I', 'S', 'C'].map(dim => {
                                    const percentil = resultado.analisis?.percentiles?.[dim] || 0;
                                    const nombreDim = {
                                        D: 'DOMINANCIA',
                                        I: 'INFLUENCIA',
                                        S: 'CONSTANCIA',
                                        C: 'CONSCIENCIOSIDAD'
                                    }[dim];
                                    let colorClass = 'bg-secondary';
                                    if (percentil >= 75) colorClass = 'bg-success';
                                    else if (percentil >= 55) colorClass = 'bg-primary';
                                    else if (percentil >= 40) colorClass = 'bg-warning';
                                    
                                    return `
                                        <div class="d-flex align-items-center mb-2">
                                            <div style="width: 30px;"><strong>${dim}</strong></div>
                                            <div class="flex-grow-1">
                                                <div class="progress" style="height: 20px;">
                                                    <div class="progress-bar ${colorClass}" style="width: ${percentil}%">${percentil}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6>Compatibilidad con el Cargo</h6>
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Requisito</th>
                                            <th>Percentil</th>
                                            <th>Evaluación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${resultado.analisis?.compatibilidad ? Object.entries(resultado.analisis.compatibilidad).map(([req, percentil]) => {
                                            let evalText = 'En Desarrollo';
                                            let evalClass = 'text-warning';
                                            if (percentil >= 75) { evalText = 'Óptimo'; evalClass = 'text-success'; }
                                            else if (percentil >= 55) { evalText = 'Adecuado'; evalClass = 'text-primary'; }
                                            else if (percentil < 40) { evalText = 'Insuficiente'; evalClass = 'text-danger'; }
                                            
                                            const reqLabel = {
                                                conocimientoNormativo: 'Conocimiento Normativo SST',
                                                liderazgoSeguridad: 'Liderazgo en Seguridad',
                                                gestionSST: 'Gestión SG-SST',
                                                comunicacionRiesgos: 'Comunicación de Riesgos',
                                                investigacionIncidentes: 'Investigación de Incidentes',
                                                trabajoCampo: 'Trabajo de Campo',
                                                capacitacionSST: 'Capacitación en SST',
                                                gestionAmbiental: 'Gestión Ambiental',
                                                auditoriaVerificacion: 'Auditoría y Verificación',
                                                cumplimientoLegal: 'Cumplimiento Legal'
                                            }[req] || req;
                                            
                                            return `
                                                <tr>
                                                    <td>${reqLabel}</td>
                                                    <td>${percentil}%</td>
                                                    <td class="${evalClass}">${evalText}</td>
                                                </tr>
                                            `;
                                        }).join('') : '<tr><td colspan="3">Sin datos</td></tr>'}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-6">
                                <div class="analisis-card fortalezas">
                                    <h6>Fortalezas</h6>
                                    <ul>
                                        ${(resultado.analisis?.fortalezas || []).map(f => `<li>${f}</li>`).join('') || '<li>No identificadas</li>'}
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="analisis-card debilidades">
                                    <h6>Areas de Desarrollo</h6>
                                    <ul>
                                        ${(resultado.analisis?.areasDesarrollo || []).map(d => `<li>${d}</li>`).join('') || '<li>No identificadas</li>'}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="alert alert-info mt-3">
                            <h6>Recomendación:</h6>
                            <p class="mb-0">${resultado.analisis?.recomendacion || 'Sin recomendación disponible'}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success" onclick="descargarPDF('${cedula}')">
                            Descargar PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.getElementById('modal-container') || createModalContainer();
    modalContainer.innerHTML = html;
    
    const modal = new bootstrap.Modal(modalContainer.querySelector('#modalDetalle'));
    modal.show();
}

function createModalContainer() {
    const container = document.createElement('div');
    container.id = 'modal-container';
    document.body.appendChild(container);
    return container;
}

async function descargarPDF(cedula) {
    const resultado = await obtenerResultados(cedula);
    if (!resultado) {
        alert('Resultado no encontrado');
        return;
    }
    
    generarPDF(resultado);
}

async function cambiarPassword() {
    const nuevoPassword = prompt('Ingrese la nueva contraseña:');
    if (nuevoPassword && nuevoPassword.length >= 4) {
        await cambiarPassword(nuevoPassword);
        alert('Contraseña actualizada correctamente');
    } else if (nuevoPassword) {
        alert('La contraseña debe tener al menos 4 caracteres');
    }
}

function filtrarPorFecha() {
    const filtro = document.getElementById('filtro-fecha').value;
    if (!filtro) {
        renderizarLista();
        return;
    }
    
    const fechaFiltro = new Date(filtro).toDateString();
    
    const filtrados = resultadosData.filter(r => {
        const fechaResultado = new Date(r.fecha).toDateString();
        return fechaResultado === fechaFiltro;
    });
    
    const tbody = document.getElementById('candidatos-lista');
    tbody.innerHTML = '';
    
    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay resultados para esta fecha</td></tr>';
        return;
    }
    
    filtrados.forEach(resultado => {
        const candidato = candidatosData.find(c => c.cedula === resultado.cedula);
        const nombre = candidato ? candidato.nombre : resultado.nombre || 'Desconocido';
        const fecha = new Date(resultado.fecha).toLocaleDateString('es-CO');
        const estado = resultado.completada ? 
            '<span class="badge bg-success">Completado</span>' : 
            '<span class="badge bg-warning">Pendiente</span>';
        
        tbody.innerHTML += `
            <tr onclick="verDetalle('${resultado.cedula}')" style="cursor: pointer;">
                <td>${resultado.cedula}</td>
                <td>${nombre}</td>
                <td>${fecha}</td>
                <td>${estado}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); verDetalle('${resultado.cedula}')">
                        Ver Detalle
                    </button>
                    <button class="btn btn-sm btn-success" onclick="event.stopPropagation(); descargarPDF('${resultado.cedula}')">
                        PDF
                    </button>
                    <button class="btn btn-sm btn-info" onclick="event.stopPropagation(); copiarLinkPrueba('${resultado.cedula}', '${nombre}')" title="Copiar link de prueba al portapapeles">
                        🔗 Link
                    </button>
                </td>
            </tr>
        `;
    });
}

async function verificarPassword(password) {
    return await window.db.config.get('password').then(config => {
        return config && config.value === password;
    });
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

function getBaseUrl() {
    const input = document.getElementById('base-url');
    if (!input) return '';
    let url = input.value.trim().replace(/\/+$/, '');
    sessionStorage.setItem('base_url', url);
    return url;
}

function guardarBaseUrl() {
    const url = getBaseUrl();
    alert('URL base guardada: ' + url);
}

function actualizarPreviewLink(link) {
    const el = document.getElementById('preview-link');
    if (el) el.textContent = link || '—';
}

let cedulaSeleccionada = null;

async function copiarLinkPrueba(cedula, nombre) {
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
        alert('Primero configura la URL del sitio en el campo superior.');
        document.getElementById('base-url')?.focus();
        return;
    }
    cedulaSeleccionada = cedula;
    const link = baseUrl + '/test.html?cedula=' + encodeURIComponent(cedula);
    document.getElementById('btn-enviar-link').disabled = false;
    try {
        await navigator.clipboard.writeText(link);
        actualizarPreviewLink(link);
        alert('✅ Link copiado al portapapeles para ' + nombre + ':\n' + link + '\n\nPégalo en WhatsApp o email para enviarlo al candidato.');
    } catch {
        prompt('Copia este link manualmente para ' + nombre + ':', link);
        actualizarPreviewLink(link);
    }
}

async function enviarLinkSeleccionado() {
    if (!cedulaSeleccionada) {
        alert('Primero haz clic en 🔗 Link de un candidato.');
        return;
    }
    const candidato = await obtenerCandidato(cedulaSeleccionada);
    if (!candidato || !candidato.email) {
        alert('El candidato no tiene email registrado. Primero debe registrarse en index.html.');
        return;
    }
    const baseUrl = getBaseUrl();
    if (!baseUrl) {
        alert('Configura la URL del sitio primero.');
        return;
    }
    const link = baseUrl + '/test.html?cedula=' + encodeURIComponent(cedulaSeleccionada);
    // Para habilitar el envío automático:
    // 1. Ir a EmailJS → Email Templates → Create New Template
    // 2. Usar variables: {{nombre}}, {{cedula}}, {{linkPrueba}}
    // 3. Copiar el Template ID y reemplazar abajo
    // 4. Descomentar el código de emailjs.send
    alert('Para enviar automáticamente:\n1. Crea un template en EmailJS con {{nombre}}, {{cedula}}, {{linkPrueba}}\n2. Copia el Template ID\n3. Descomenta el código en panel.js enviarLinkSeleccionado\n\nPor ahora, el link se copió al portapapeles. Pégalo en WhatsApp.');
    /*  // --- DESCOMENTAR CUANDO TENGAS EL TEMPLATE ---
    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, 'TU_TEMPLATE_ID', {
            nombre: candidato.nombre,
            cedula: cedulaSeleccionada,
            linkPrueba: link,
            to_email: candidato.email
        });
        alert('✅ Link enviado a ' + candidato.email);
    } catch (e) {
        alert('Error al enviar email: ' + e.message);
    }
    */
}