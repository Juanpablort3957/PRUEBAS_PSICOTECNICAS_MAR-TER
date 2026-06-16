// ======================== html2canvas helpers ========================

async function _capturarHTML(html, width) {
    var div = document.createElement('div');
    div.innerHTML = html;
    div.style.cssText = 'position:absolute;left:-9999px;top:0;width:' + width + 'px;background:#fff;font-family:Arial,Helvetica,sans-serif;';
    document.body.appendChild(div);
    var imgs = div.querySelectorAll('img');
    await Promise.all(Array.from(imgs).map(function(img) {
        return img.complete ? Promise.resolve() : new Promise(function(r) { img.onload = r; img.onerror = r; });
    }));
    await new Promise(function(r) { setTimeout(r, 300); });
    try {
        var canvas = await html2canvas(div, {
            scale: 2,
            backgroundColor: '#ffffff',
            useCORS: true,
            allowTaint: true,
            logging: false,
            width: width,
        });
    } catch (e) {
        document.body.removeChild(div);
        throw new Error('html2canvas falló: ' + (e.message || e));
    }
    document.body.removeChild(div);
    return canvas;
}

function _agregarCanvasPDF(canvas, doc) {
    var pw = doc.internal.pageSize.getWidth() - 30;
    var ph = doc.internal.pageSize.getHeight() - 30;
    var imgH = (canvas.height / canvas.width) * pw;
    var srcY = 0;
    var page = 0;
    while (srcY < canvas.height) {
        if (page > 0) doc.addPage();
        var sliceRatio = ph / imgH;
        var sliceH = Math.min(canvas.height * sliceRatio, canvas.height - srcY);
        var c = document.createElement('canvas');
        c.width = canvas.width;
        c.height = sliceH;
        c.getContext('2d').drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        doc.addImage(c.toDataURL('image/png'), 'PNG', 15, 15, pw, (sliceH / canvas.width) * pw);
        srcY += sliceH;
        page++;
    }
}

async function _logoData() {
    var el = document.getElementById('logo-image');
    if (!el) el = document.querySelector('.logo-container img');
    if (!el) el = document.querySelector('img[src*="Sin-titulo"]');
    if (!el) el = document.querySelector('img[alt*="MARYTER"], img[alt*="maryter"]');
    if (!el) el = document.querySelector('img[src*="logo"], img[src*="Logo"]');
    if (!el) return '';
    var src = el.src;
    if (src.startsWith('data:')) return src;
    try {
        var resp = await fetch(src);
        var blob = await resp.blob();
        return await new Promise(function(resolve) {
            var reader = new FileReader();
            reader.onload = function() { resolve(reader.result); };
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        return '';
    }
}

// ======================== HTML builders ========================

async function _buildDISC(resultado) {
    var CARGO = 'Coordinador de Mantenimiento y Logística';
    var analisis = resultado.analisis || {};
    var percentiles = analisis.percentiles || { D:0, I:0, S:0, C:0 };
    var compatibilidad = analisis.compatibilidad || {};
    var prom = Object.keys(compatibilidad).length > 0
        ? Math.round(Object.values(compatibilidad).reduce(function(a,b) { return a+b; }, 0) / Object.keys(compatibilidad).length)
        : 0;
    var vBg = '#6c757d', vText = 'En Proceso';
    if (prom >= 75) { vBg = '#198754'; vText = 'APTO'; }
    else if (prom >= 55) { vBg = '#0d6efd'; vText = 'APTO CON DESARROLLO'; }
    else if (prom >= 40) { vBg = '#fd7e14'; vText = 'REQUIERE EVALUACI\u00d3N ADICIONAL'; }
    else if (prom > 0) { vBg = '#dc3545'; vText = 'NO RECOMENDADO'; }
    var perfilNombre = analisis.perfil || analisis.estilo || 'N/A';
    var perfilDesc = analisis.descripcionEstilo || analisis.estilo || '';
    var fecha = new Date(resultado.fecha).toLocaleDateString('es-CO', { year:'numeric', month:'long', day:'numeric' });
    var dims = [
        { key:'D', label:'Dominancia', color:'#dc3545', bg:'#fff5f5' },
        { key:'I', label:'Influencia', color:'#fd7e14', bg:'#fffbf5' },
        { key:'S', label:'Estabilidad', color:'#198754', bg:'#f0fdf4' },
        { key:'C', label:'Conscienciosidad', color:'#0d6efd', bg:'#f0f4ff' }
    ];
    var reqLabels = [
        { key:'liderazgoEquipos', label:'Liderazgo de equipos' },
        { key:'organizacionPlanificacion', label:'Organización y planificación' },
        { key:'resolucionProblemas', label:'Resolución de problemas bajo presión' },
        { key:'comunicacionEfectiva', label:'Comunicación efectiva' },
        { key:'orientacionResultados', label:'Orientación a resultados' },
        { key:'conocimientoMantenimiento', label:'Conocimiento técnico de mantenimiento' },
        { key:'seguridadIndustrial', label:'Seguridad industrial' },
        { key:'gestionRepuestos', label:'Gestión de repuestos e inventarios' },
        { key:'mejoraContinua', label:'Mejora continua (Lean/TPM)' },
        { key:'supervisionTecnica', label:'Supervisión técnica' }
    ];
    function ec(p) { return p >= 75 ? ['\u00d3ptimo','#198754'] : p >= 55 ? ['Adecuado','#0d6efd'] : p >= 40 ? ['En Desarrollo','#fd7e14'] : ['Insuficiente','#dc3545']; }
    function nc(p) { return p >= 75 ? {c:'#198754',l:'Alto'} : p >= 55 ? {c:'#0d6efd',l:'Medio-Alto'} : p >= 40 ? {c:'#fd7e14',l:'Medio'} : {c:'#6c757d',l:'Bajo'}; }
    var logo = await _logoData();
    var dimBars = dims.map(function(d) {
        var p = percentiles[d.key] || 0;
        var n = nc(p);
        return '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
            + '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;color:#fff;flex-shrink:0;background:' + d.color + '">' + d.key + '</div>'
            + '<div style="width:130px;font-size:0.78rem;font-weight:600;color:#555;flex-shrink:0">' + d.label + '</div>'
            + '<div style="flex:1;background:#e9ecef;border-radius:6px;height:22px;overflow:hidden"><div style="height:100%;border-radius:6px;display:flex;align-items:center;justify-content:flex-end;padding-right:6px;font-size:0.75rem;font-weight:700;color:#fff;width:' + p + '%;background:' + n.c + '">' + (p > 10 ? p + '%' : '') + '</div></div>'
            + '<div style="width:42px;text-align:right;font-weight:700;font-size:0.9rem;color:#333">' + p + '%</div>'
            + '<div style="width:90px;font-size:0.75rem;color:#777">' + n.l + '</div></div>';
    }).join('');
    var interpItems = dims.map(function(d) {
        var p = percentiles[d.key] || 0;
        var n = nc(p);
        var fn = { D:getInterpretacionD, I:getInterpretacionI, S:getInterpretacionS, C:getInterpretacionC }[d.key];
        return '<div style="border-radius:8px;padding:14px 18px;margin-bottom:10px;border-left:4px solid ' + d.color + ';background:' + d.bg + '">'
            + '<div style="font-weight:700;font-size:0.9rem;margin-bottom:4px">' + d.key + ' \u00b7 ' + d.label + ' \u2014 ' + p + '% (' + n.l + ')</div>'
            + '<p style="font-size:0.85rem;color:#555;margin:0">' + fn(p) + '</p></div>';
    }).join('');
    var compatRows = reqLabels.map(function(r) {
        var p = compatibilidad[r.key] || 0;
        var ev = ec(p);
        return '<tr><td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + r.label + '</td>'
            + '<td style="text-align:center;font-weight:700;font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + p + '%</td>'
            + '<td style="color:' + ev[1] + ';font-weight:700;font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + ev[0] + '</td>'
            + '<td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6"><div style="height:8px;border-radius:4px;background:#e9ecef"><div style="height:8px;border-radius:4px;width:' + p + '%;background:' + ev[1] + '"></div></div></td></tr>';
    }).join('');
    var fortHTML = (analisis.fortalezas || []).length > 0
        ? '<ul style="margin:0;padding-left:20px;font-size:0.9rem">' + analisis.fortalezas.map(function(f){return '<li style="margin-bottom:5px">'+f+'</li>';}).join('') + '</ul>'
        : '<p style="font-size:0.85rem;color:#6c757d;margin:0">No se identificaron fortalezas destacadas con los umbrales actuales.</p>';
    var areasHTML = (analisis.areasDesarrollo || []).length > 0
        ? '<ul style="margin:0;padding-left:20px;font-size:0.9rem">' + analisis.areasDesarrollo.map(function(a){return '<li style="margin-bottom:5px">'+a+'</li>';}).join('') + '</ul>'
        : '<p style="font-size:0.85rem;color:#6c757d;margin:0">No se identificaron \u00e1reas cr\u00edticas de mejora.</p>';
    var recHTML = getRecomendaciones(analisis).map(function(r,i){return '<li style="margin-bottom:5px">'+r+'</li>';}).join('');
    return '<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:20px;font-family:Arial,Helvetica,sans-serif;background:#fff;color:#333">'
        + '<div style="background:linear-gradient(135deg,#1a3a5c,#2563a8);color:#fff;border-radius:10px;padding:20px 28px;margin-bottom:28px;display:flex;align-items:center;gap:20px">'
            + '<img src="' + logo + '" style="width:90px;border-radius:6px;background:#fff;padding:4px" onerror="this.style.display=\'none\'">'
            + '<div><h3 style="margin:0;font-size:1.3rem;font-weight:700">DRAGADOS MAR Y TER \u00b7 MARYTER S.A.S</h3>'
            + '<p style="margin:4px 0 0;font-size:0.9rem;opacity:0.85">Informe de Evaluaci\u00f3n Comportamental DISC<br><strong>Cargo evaluado:</strong> ' + CARGO + '</p></div></div>'
        + '<div style="text-align:center;margin-bottom:24px">'
            + '<span style="display:inline-block;font-size:1rem;padding:8px 22px;border-radius:20px;font-weight:700;background:' + vBg + ';color:#fff">' + vText + '</span>'
            + '<div style="margin-top:8px;color:#6c757d;font-size:0.82rem">Compatibilidad general con el cargo: <strong>' + prom + '%</strong></div></div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Datos del Candidato</div>'
            + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;font-size:0.9rem">'
            + '<div><strong>Nombre:</strong> ' + (resultado.nombre||'No disponible') + '</div>'
            + '<div><strong>C\u00e9dula:</strong> ' + (resultado.cedula||'No disponible') + '</div>'
            + '<div><strong>Correo:</strong> ' + (resultado.email||'No registrado') + '</div>'
            + '<div><strong>Fecha de evaluaci\u00f3n:</strong> ' + fecha + '</div>'
            + '<div><strong>Cargo:</strong> ' + CARGO + '</div>'
            + '<div><strong>Perfil DISC:</strong> ' + perfilNombre + '</div></div></div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Perfil Comportamental</div>'
            + '<div style="background:linear-gradient(135deg,#eef2ff,#e0e7ff);border-radius:10px;padding:18px 24px;border:1px solid #c7d2fe">'
            + '<div style="font-size:1.15rem;font-weight:800;color:#3730a3;margin-bottom:6px">' + perfilNombre + '</div>'
            + '<p style="font-size:0.9rem;color:#4b5563;margin:0">' + (perfilDesc||'Perfil evaluado con base en el modelo DISC de comportamiento laboral.') + '</p></div></div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Resultados por Dimensi\u00f3n DISC</div>'
            + dimBars + '</div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Interpretaci\u00f3n por Dimensi\u00f3n</div>'
            + interpItems + '</div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Compatibilidad con el Cargo: ' + CARGO + '</div>'
            + '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">'
            + '<thead><tr><th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;text-align:left">Competencia / Requisito</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;width:80px">Percentil</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;width:150px">Nivel</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px">Barra</th></tr></thead><tbody>'
            + compatRows
            + '<tr style="background:#1a3a5c;color:#fff;font-weight:700">'
            + '<td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">Promedio General</td>'
            + '<td style="text-align:center;font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + prom + '%</td>'
            + '<td style="color:' + ec(prom)[1] + ';font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6;text-align:center">' + ec(prom)[0] + '</td>'
            + '<td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6"><div style="height:8px;border-radius:4px;background:#e9ecef"><div style="height:8px;border-radius:4px;width:' + prom + '%;background:' + ec(prom)[1] + '"></div></div></td></tr>'
            + '</tbody></table></div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">An\u00e1lisis de Competencias</div>'
            + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">'
            + '<div style="background:#f0fdf4;border-left:4px solid #198754;border-radius:8px;padding:16px 20px"><h6 style="color:#198754;font-weight:700;margin:0 0 10px;font-size:0.9rem">Fortalezas Identificadas</h6>' + fortHTML + '</div>'
            + '<div style="background:#fff7ed;border-left:4px solid #fd7e14;border-radius:8px;padding:16px 20px"><h6 style="color:#e07800;font-weight:700;margin:0 0 10px;font-size:0.9rem">\u00c1reas de Desarrollo</h6>' + areasHTML + '</div></div></div>'
        + '<div style="margin-bottom:24px">'
            + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Recomendaciones para el Evaluador</div>'
            + '<ol style="padding-left:20px;font-size:0.9rem">' + recHTML + '</ol></div>'
        + '<div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:10px;padding:20px 24px;margin-bottom:24px">'
            + '<h6 style="color:#0369a1;font-weight:700;margin:0 0 8px">Concepto Final</h6>'
            + '<p style="font-size:0.92rem;color:#1e3a5f;margin:0">' + (analisis.recomendacion||'Sin recomendaci\u00f3n disponible.') + '</p></div>'
        + '<div style="margin-top:24px;border-top:1px solid #dee2e6;padding-top:16px;text-align:center;font-size:0.9rem;color:#888">'
            + '<p>Evaluaci\u00f3n realizada por: _________________________</p>'
            + '<p>Firma: ______________________  Fecha: _______________</p>'
            + '<p style="margin-top:12px">maryter@dragadosmaryter.com  |  Cartagena de Indias, Colombia  |  MARYTER S.A.S</p></div>'
        + '</body></html>';
}

function _buildTecnico(ta) {
    if (!ta) return '';
    var tBg = ta.porcentaje >= 70 ? '#198754' : ta.porcentaje >= 50 ? '#fd7e14' : '#dc3545';
    var catRows = Object.values(ta.categorias || {}).map(function(cat) {
        var p = cat.porcentaje;
        var cb = p >= 70 ? '#198754' : p >= 50 ? '#fd7e14' : '#dc3545';
        return '<tr><td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + cat.label + '</td>'
            + '<td style="text-align:center;font-weight:700;font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + cat.aciertos + '/' + cat.total + '</td>'
            + '<td style="text-align:center;font-weight:700;font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6">' + p + '%</td>'
            + '<td style="font-size:0.85rem;padding:5px 8px;border:1px solid #dee2e6"><div style="height:8px;border-radius:4px;background:#e9ecef"><div style="height:8px;border-radius:4px;width:' + p + '%;background:' + cb + '"></div></div></td></tr>';
    }).join('');
    return '<div style="margin-top:32px;padding-top:20px;border-top:2px solid #e5e7eb">'
        + '<div style="font-size:1rem;font-weight:700;color:#1a3a5c;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin-bottom:16px">Resultados Evaluaci\u00f3n T\u00e9cnica de Mantenimiento</div>'
        + '<div style="text-align:center;margin-bottom:20px">'
            + '<span style="display:inline-block;font-size:1rem;padding:8px 22px;border-radius:20px;font-weight:700;background:' + tBg + ';color:#fff">' + ta.veredicto + '</span>'
            + '<div style="margin-top:8px;color:#6c757d;font-size:0.82rem">Puntaje: <strong>' + ta.puntaje + '/' + ta.total + '</strong> (' + ta.porcentaje + '%)</div></div>'
        + '<table style="width:100%;border-collapse:collapse;margin-bottom:16px">'
            + '<thead><tr><th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;text-align:left">Categor\u00eda</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;width:70px">Aciertos</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px;width:60px">%</th>'
            + '<th style="background:#1a3a5c;color:#fff;font-size:0.82rem;padding:6px 8px">Barra</th></tr></thead><tbody>'
            + catRows + '</tbody></table>'
        + '<p style="font-size:0.9rem;color:#555">' + (ta.recomendacion||'') + '</p></div>';
}

// ======================== PDF generators ========================

async function generarPDF(resultado) {
    try {
        var html = await _buildDISC(resultado);
        var canvas = await _capturarHTML(html, 800);
        var { jsPDF } = window.jspdf;
        var doc = new jsPDF();
        _agregarCanvasPDF(canvas, doc);
        doc.save('InformeDISC_' + (resultado.cedula || 'SN') + '_' + new Date().toISOString().split('T')[0] + '.pdf');
    } catch (e) {
        console.error('Error en generarPDF:', e);
        alert('Error al generar PDF: ' + (e.message || e));
    }
}

async function generarPDFCompleto(discResult, tecResult) {
    try {
        var html = await _buildDISC(discResult);
        if (tecResult && tecResult.analysis) {
            html += _buildTecnico(tecResult.analysis);
        }
        var canvas = await _capturarHTML(html, 800);
        var { jsPDF } = window.jspdf;
        var doc = new jsPDF();
        _agregarCanvasPDF(canvas, doc);
        doc.save('InformeCompleto_' + (discResult.cedula || 'SN') + '_' + new Date().toISOString().split('T')[0] + '.pdf');
    } catch (e) {
        console.error('Error en generarPDFCompleto:', e);
        alert('Error al generar PDF completo: ' + (e.message || e));
    }
}

function getInterpretacionD(percentil) {
    if (percentil >= 80) return 'Perfil con alta autoridad para liderar equipos de mantenimiento. Toma decisiones rápidas durante fallas críticas y coordina con firmeza bajo presión operativa. Ideal para gestionar paradas de planta y dirigir cuadrillas técnicas.';
    if (percentil >= 60) return 'Buen liderazgo en equipos de mantenimiento. Balance entre firmeza técnica y consideración del personal. Adecuado para coordinar órdenes de trabajo y gestionar prioridades.';
    if (percentil >= 40) return 'Enfoque moderado en liderazgo. Puede requerir apoyo para imponer disciplina técnica en el equipo. Se beneficia de respaldo gerencial en situaciones de alta presión.';
    return 'Perfil que prefiere evitar confrontaciones directas con el equipo técnico. Puede mostrarse indeciso al priorizar trabajos urgentes. Requiere desarrollo en asertividad y liderazgo de equipos de planta.';
}

function getInterpretacionI(percentil) {
    if (percentil >= 80) return 'Excelente comunicador para coordinar con producción, proveedores y áreas internas. Capacidad para capacitar técnicos e influir positivamente en la cultura de mantenimiento. Ideal para negociación con contratistas y reportes a gerencia.';
    if (percentil >= 60) return 'Buena capacidad de comunicación en entorno industrial. Se relaciona adecuadamente con proveedores y personal de otras áreas. Adecuado para reuniones de planificación y reportes de gestión.';
    if (percentil >= 40) return 'Comunicación funcional pero no su principal fortaleza. Puede preferir el análisis técnico sobre la interacción con múltiples áreas. Se recomienda apoyarlo en presentaciones y negociaciones con proveedores.';
    return 'Perfil reservado en comunicación interpersonal. Prefiere trabajar con datos técnicos y procedimientos. Puede requerir apoyo en coordinación interdepartamental y manejo de proveedores.';
}

function getInterpretacionS(percentil) {
    if (percentil >= 80) return 'Alta constancia y compromiso con los programas de mantenimiento. Ideal para seguimiento de planes preventivos, inspecciones recurrentes y trabajo continuo en piso de planta. Muy confiable en la ejecución de rutinas.';
    if (percentil >= 60) return 'Buen balance entre constancia y adaptabilidad. Comprometido con los programas de mantenimiento. Adecuado para entornos que requieren tanto seguimiento de rutinas como respuesta a imprevistos.';
    if (percentil >= 40) return 'Estabilidad moderada. Puede mostrar impaciencia con seguimientos muy repetitivos. Requiere variedad de tareas para mantener su motivación en el rol.';
    return 'Alta adaptabilidad al cambio. Prefiere diversidad de frentes de trabajo y responde bien a emergencias. Puede encontrar monótonas las rutinas de preventivo. Se adapta mejor a entornos dinámicos.';
}

function getInterpretacionC(percentil) {
    if (percentil >= 80) return 'Enfoque excepcional en cumplimiento de estándares técnicos y procedimientos de mantenimiento. Seguimiento riguroso de planes, análisis de fallas y gestión documental. Ideal para control de inventarios de repuestos y reportes de confiabilidad.';
    if (percentil >= 60) return 'Buen equilibrio entre rigor técnico y eficiencia operativa. Sigue procedimientos de mantenimiento correctamente. Adecuado para análisis de fallas, planificación y gestión documental.';
    if (percentil >= 40) return 'Atención a detalles técnicos funcional. Puede pasar por alto algunos requisitos de documentación. Se beneficia de listas de verificación y formatos estandarizados.';
    return 'Enfoque en visión general más que en detalles técnicos. Puede requerir supervisión en gestión documental y análisis de fallas. Se recomienda apoyo en registros y control de repuestos.';
}

function getRecomendaciones(analisis) {
    const recs = [];
    const p = analisis?.percentiles || {};
    const c = analisis?.compatibilidad || {};
    if (p.D < 55) recs.push('Fortalecer el liderazgo de equipos de mantenimiento y la toma de decisiones bajo presión.');
    if (p.I < 55) recs.push('Capacitación en comunicación asertiva y técnicas de coordinación con proveedores y producción.');
    if (p.S < 55) recs.push('Desarrollar constancia en seguimiento de planes de mantenimiento y órdenes de trabajo.');
    if (p.C < 55) recs.push('Fortalecer el rigor técnico, análisis de fallas y documentación de mantenimiento.');
    if ((c.conocimientoMantenimiento || 0) < 65) recs.push('Formación en técnicas de mantenimiento industrial y gestión de activos (ISO 55000).');
    if ((c.seguridadIndustrial || 0) < 65) recs.push('Entrenamiento en normativa de seguridad industrial aplicada a mantenimiento (LOTO, espacios confinados).');
    if ((c.mejoraContinua || 0) < 65) recs.push('Capacitación en Lean Manufacturing, TPM y herramientas de mejora continua.');
    if (recs.length === 0) {
        recs.push('Mantener las buenas prácticas identificadas en la evaluación conductual.');
        recs.push('Realizar seguimiento periódico del desempeño en el cargo de Coordinador de Mantenimiento.');
        recs.push('Explorar roles de mayor responsabilidad en gestión de activos y confiabilidad.');
    }
    return recs.slice(0, 6);
}

async function cargarResultadoYMostrar() {
    const params = new URLSearchParams(window.location.search);
    const cedula = params.get('cedula');
    if (!cedula) {
        document.getElementById('resultado-container').innerHTML = '<p class="alert alert-danger">No se proporciono cedula</p>';
        return;
    }
    const resultado = await obtenerResultados(cedula);
    if (!resultado) {
        document.getElementById('resultado-container').innerHTML = '<p class="alert alert-danger">No se encontraron resultados para esta cedula</p>';
        return;
    }
    mostrarResultado(resultado);
}

function mostrarResultado(resultado) {
    const container = document.getElementById('resultado-container');
    const analisis  = resultado.analisis || {};
    const percentiles = analisis.percentiles || { D: 0, I: 0, S: 0, C: 0 };
    const compatibilidad = analisis.compatibilidad || {};

    const promedioGeneral = Object.keys(compatibilidad).length > 0
        ? Object.values(compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(compatibilidad).length
        : 0;

    let vClass = 'bg-secondary', vText = 'En Proceso';
    if      (promedioGeneral >= 75) { vClass = 'bg-success'; vText = 'APTO'; }
    else if (promedioGeneral >= 55) { vClass = 'bg-info text-dark'; vText = 'APTO CON DESARROLLO'; }
    else if (promedioGeneral >= 40) { vClass = 'bg-warning text-dark'; vText = 'REQUIERE EVALUACIÓN ADICIONAL'; }
    else if (promedioGeneral > 0)   { vClass = 'bg-danger'; vText = 'NO RECOMENDADO'; }

    const perfilNombre = analisis.perfil || analisis.estilo || 'N/A';
    const perfilDesc   = analisis.descripcionEstilo || analisis.estilo || '';
    const fecha = new Date(resultado.fecha).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const dims = [
        { key: 'D', label: 'Dominancia',        interp: getInterpretacionD },
        { key: 'I', label: 'Influencia',         interp: getInterpretacionI },
        { key: 'S', label: 'Estabilidad',        interp: getInterpretacionS },
        { key: 'C', label: 'Conscienciosidad',   interp: getInterpretacionC },
    ];

    function nivelClase(p) {
        if (p >= 75) return 'alto';
        if (p >= 55) return 'medio-alto';
        if (p >= 40) return 'medio';
        return 'bajo';
    }
    function nivelLabel(p) {
        if (p >= 75) return 'Alto';
        if (p >= 55) return 'Medio-Alto';
        if (p >= 40) return 'Medio';
        return 'Bajo';
    }

    const reqLabels = {
        liderazgoEquipos: 'Liderazgo de equipos',
        organizacionPlanificacion: 'Organización y planificación',
        resolucionProblemas: 'Resolución de problemas bajo presión',
        comunicacionEfectiva: 'Comunicación efectiva',
        orientacionResultados: 'Orientación a resultados',
        conocimientoMantenimiento: 'Conocimiento técnico de mantenimiento',
        seguridadIndustrial: 'Seguridad industrial',
        gestionRepuestos: 'Gestión de repuestos e inventarios',
        mejoraContinua: 'Mejora continua (Lean/TPM)',
        supervisionTecnica: 'Supervisión técnica'
    };

    function evalLabel(p) {
        if (p >= 75) return ['Óptimo', 'nivel-optimo'];
        if (p >= 55) return ['Adecuado', 'nivel-adecuado'];
        if (p >= 40) return ['En Desarrollo', 'nivel-desarrollo'];
        return ['Insuficiente', 'nivel-insuficiente'];
    }

    function barColor(p) {
        if (p >= 75) return '#198754';
        if (p >= 55) return '#0d6efd';
        if (p >= 40) return '#fd7e14';
        return '#6c757d';
    }

    const recomendaciones = getRecomendaciones(analisis);

    container.innerHTML = `
    <div class="resultado-card">
        <div class="resultado-header">
            <img src="Sin-titulo-1.png" alt="MARYTER" id="logo-image"
                 onerror="this.style.display='none'">
            <div>
                <h3>DRAGADOS MAR Y TER · MARYTER S.A.S</h3>
                <p>Informe de Evaluación Comportamental DISC<br>
                    <strong>Cargo evaluado:</strong> Coordinador de Mantenimiento y Logística</p>
            </div>
        </div>

        <div class="text-center mb-4">
            <span class="badge badge-veredicto ${vClass}">${vText}</span>
            <div class="mt-2 text-muted" style="font-size:0.82rem;">
                Compatibilidad general con el cargo: <strong>${Math.round(promedioGeneral)}%</strong>
            </div>
        </div>

        <h6 class="section-title">Datos del Candidato</h6>
        <div class="datos-grid mb-4">
            <div class="dato"><strong>Nombre:</strong> ${resultado.nombre || 'No disponible'}</div>
            <div class="dato"><strong>Cédula:</strong> ${resultado.cedula || 'No disponible'}</div>
            <div class="dato"><strong>Correo:</strong> ${resultado.email || 'No registrado'}</div>
            <div class="dato"><strong>Fecha de evaluación:</strong> ${fecha}</div>
                <div class="dato"><strong>Cargo:</strong> Coordinador de Mantenimiento y Logística</div>
            <div class="dato"><strong>Perfil DISC:</strong> ${perfilNombre}</div>
        </div>

        <h6 class="section-title">Perfil Comportamental</h6>
        <div class="perfil-box mb-4">
            <div class="perfil-nombre">${perfilNombre}</div>
            <p class="perfil-desc">${perfilDesc || 'Perfil evaluado con base en el modelo DISC de comportamiento laboral.'}</p>
        </div>

        <h6 class="section-title">Resultados por Dimensión DISC</h6>
        <div class="mb-4">
            ${dims.map(d => {
                const p = percentiles[d.key] || 0;
                const cls = nivelClase(p);
                return `
                <div class="disc-row">
                    <div class="disc-letter ${d.key}">${d.key}</div>
                    <div class="disc-label">${d.label}</div>
                    <div class="disc-bar-outer">
                        <div class="disc-bar-inner ${cls}" style="width:${p}%">${p > 10 ? p + '%' : ''}</div>
                    </div>
                    <div class="disc-pct">${p}%</div>
                    <div class="disc-nivel">${nivelLabel(p)}</div>
                </div>`;
            }).join('')}
        </div>

        <h6 class="section-title">Interpretación por Dimensión</h6>
        <div class="mb-4">
            ${dims.map(d => {
                const p = percentiles[d.key] || 0;
                return `
                <div class="interp-item ${d.key}">
                    <div class="interp-title">${d.key} · ${d.label} — ${p}% (${nivelLabel(p)})</div>
                    <p class="interp-text">${d.interp(p)}</p>
                </div>`;
            }).join('')}
        </div>

        <h6 class="section-title">Compatibilidad con el Cargo: Coordinador de Mantenimiento y Logística</h6>
        <div class="table-responsive mb-4">
            <table class="table table-bordered table-sm compat-table">
                <thead>
                    <tr>
                        <th>Competencia / Requisito</th>
                        <th style="width:90px">Percentil</th>
                        <th style="width:180px">Nivel</th>
                        <th>Barra</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(reqLabels).map(([key, label]) => {
                        const p = compatibilidad[key] || 0;
                        const [ev, ec] = evalLabel(p);
                        return `
                        <tr>
                            <td>${label}</td>
                            <td class="text-center fw-bold">${p}%</td>
                            <td class="${ec}">${ev}</td>
                            <td>
                                <div class="mini-bar">
                                    <div class="mini-bar-fill" style="width:${p}%;background:${barColor(p)}"></div>
                                </div>
                            </td>
                        </tr>`;
                    }).join('')}
                    <tr class="table-dark">
                        <td><strong>Promedio General</strong></td>
                        <td class="text-center fw-bold">${Math.round(promedioGeneral)}%</td>
                        <td class="${evalLabel(promedioGeneral)[1]}">${evalLabel(promedioGeneral)[0]}</td>
                        <td>
                            <div class="mini-bar">
                                <div class="mini-bar-fill" style="width:${Math.round(promedioGeneral)}%;background:${barColor(promedioGeneral)}"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h6 class="section-title">Análisis de Competencias</h6>
        <div class="row mb-4">
            <div class="col-md-6 mb-3">
                <div class="fortalezas-card h-100">
                    <h6>✅ Fortalezas Identificadas</h6>
                    ${(analisis.fortalezas || []).length > 0
                        ? '<ul class="ps-3 mb-0">' + analisis.fortalezas.map(f => '<li>' + f + '</li>').join('') + '</ul>'
                        : '<p class="text-muted mb-0" style="font-size:0.85rem">No se identificaron fortalezas destacadas con los umbrales actuales.</p>'
                    }
                </div>
            </div>
            <div class="col-md-6 mb-3">
                <div class="desarrollo-card h-100">
                    <h6>🔧 Áreas de Desarrollo</h6>
                    ${(analisis.areasDesarrollo || []).length > 0
                        ? '<ul class="ps-3 mb-0">' + analisis.areasDesarrollo.map(a => '<li>' + a + '</li>').join('') + '</ul>'
                        : '<p class="text-muted mb-0" style="font-size:0.85rem">No se identificaron áreas críticas de mejora.</p>'
                    }
                </div>
            </div>
        </div>

        <h6 class="section-title">Recomendaciones para el Evaluador</h6>
        <div class="mb-4">
            <ol class="ps-3" style="font-size:0.9rem;">
                ${recomendaciones.map(r => '<li class="mb-2">' + r + '</li>').join('')}
            </ol>
        </div>

        <div class="recomendacion-box mb-4">
            <h6>📋 Concepto Final</h6>
            <p>${analisis.recomendacion || 'Sin recomendación disponible.'}</p>
        </div>

        <div class="text-center mt-3">
            <button class="btn btn-success btn-lg px-5" onclick="descargarPDFResultado('${resultado.cedula}')">
                📄 Descargar Informe PDF
            </button>
        </div>
    </div>
    `;
    
    if (resultado.tecnico && resultado.tecnico.analisis) {
        const ta = resultado.tecnico.analisis;
        const tVClass = ta.porcentaje >= 70 ? 'bg-success' : ta.porcentaje >= 50 ? 'bg-warning text-dark' : 'bg-danger';
        
        const techDiv = document.createElement('div');
        techDiv.className = 'resultado-card';
        techDiv.style.marginTop = '20px';
        techDiv.innerHTML = `
            <h6 class="section-title">Resultados Evaluación Técnica de Mantenimiento</h6>
            <div class="text-center mb-4">
                <span class="badge badge-veredicto ${tVClass}">${ta.veredicto}</span>
                <div class="mt-2 text-muted" style="font-size:0.82rem;">
                    Puntaje: <strong>${ta.puntaje}/${ta.total}</strong> (${ta.porcentaje}%)
                </div>
            </div>
            <div class="table-responsive mb-3">
                <table class="table table-bordered table-sm compat-table">
                    <thead>
                        <tr>
                            <th>Categoría</th>
                            <th style="width:80px">Aciertos</th>
                            <th style="width:80px">%</th>
                            <th style="width:150px">Barra</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.values(ta.categorias).map(cat => {
                            const p = cat.porcentaje;
                            const barColor = p >= 70 ? '#198754' : p >= 50 ? '#fd7e14' : '#dc3545';
                            return '<tr>' +
                                '<td>' + cat.label + '</td>' +
                                '<td class="text-center fw-bold">' + cat.aciertos + '/' + cat.total + '</td>' +
                                '<td class="text-center fw-bold">' + p + '%</td>' +
                                '<td>' +
                                '<div class="mini-bar"><div class="mini-bar-fill" style="width:' + p + '%;background:' + barColor + '"></div></div>' +
                                '</td></tr>';
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <p style="font-size:0.9rem;color:#555;">${ta.recomendacion}</p>
        `;
        container.appendChild(techDiv);
    }
}

async function descargarPDFResultado(cedula) {
    try {
        let r = await obtenerResultados(cedula);
        if (!r) r = window.resultadoGlobal || null;
        if (!r) { alert('Resultado no encontrado'); return; }
        if (r.tecnico && r.tecnico.analisis) {
            await generarPDFCompleto(r, r.tecnico);
        } else {
            await generarPDF(r);
        }
    } catch (e) {
        console.error('Error en descargarPDFResultado:', e);
        alert('Error al descargar PDF: ' + (e.message || e));
    }
}
