function generarPDF(resultado) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const CARGO = 'Coordinador HSEQ';
    const analisis = resultado.analisis || {};
    const percentiles = analisis.percentiles || { D:0, I:0, S:0, C:0 };
    const compatibilidad = analisis.compatibilidad || {};

    const logoEl = document.getElementById('logo-image');
    let y = 20;

    if (logoEl) {
        try { doc.addImage(logoEl, 'PNG', 15, 10, 35, 18); } catch(e) { console.warn('Logo PDF:', e); }
    }

    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('DRAGADOS MAR Y TER  -  MARYTER S.A.S', 105, 22, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Cartagena de Indias, Colombia  |  maryter@dragadosmaryter.com', 105, 28, { align: 'center' });

    y = 36;
    doc.setDrawColor(26, 58, 92); doc.setLineWidth(0.8);
    doc.line(15, y, 195, y); y += 6;

    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('INFORME DE EVALUACION COMPORTAMENTAL DISC', 105, y, { align: 'center' }); y += 6;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Cargo evaluado: ' + CARGO, 105, y, { align: 'center' }); y += 6;
    doc.line(15, y, 195, y); y += 8;

    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CANDIDATO', 15, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);

    const nombre = resultado.nombre || 'No disponible';
    const cedula = resultado.cedula || 'No disponible';
    const email  = resultado.email  || 'No registrado';
    const fecha  = new Date(resultado.fecha).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const perfilNombre = analisis.perfil || analisis.estilo || 'N/A';

    doc.text('Nombre: ' + nombre, 15, y);  doc.text('Cedula: ' + cedula, 110, y); y += 5;
    doc.text('Correo: ' + email,  15, y);  doc.text('Fecha:  ' + fecha,  110, y); y += 5;
    doc.text('Cargo evaluado: ' + CARGO, 15, y);
    doc.text('Perfil DISC: ' + perfilNombre, 110, y); y += 8;

    const promedioGeneral = Object.keys(compatibilidad).length > 0
        ? Object.values(compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(compatibilidad).length
        : 0;

    let vText = 'EN PROCESO', vColor = [108, 117, 125];
    if      (promedioGeneral >= 75) { vText = 'APTO';                      vColor = [25, 135, 84]; }
    else if (promedioGeneral >= 55) { vText = 'APTO CON DESARROLLO';       vColor = [13, 110, 253]; }
    else if (promedioGeneral >= 40) { vText = 'REQUIERE EVALUACION ADICIONAL'; vColor = [253, 126, 20]; }
    else if (promedioGeneral > 0)   { vText = 'NO RECOMENDADO';            vColor = [220, 53, 69]; }

    doc.setFillColor(vColor[0], vColor[1], vColor[2]);
    doc.rect(15, y, 180, 10, 'F');
    doc.setTextColor(255,255,255); doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('VEREDICTO: ' + vText + '  (' + Math.round(promedioGeneral) + '% compatibilidad)',
        105, y + 7, { align: 'center' });
    doc.setTextColor(0,0,0); y += 16;

    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('RESULTADOS POR DIMENSION DISC', 15, y); y += 7;

    const dimDefs = [
        { key:'D', nombre:'Dominancia' },
        { key:'I', nombre:'Influencia' },
        { key:'S', nombre:'Estabilidad' },
        { key:'C', nombre:'Conscienciosidad' }
    ];
    const dimColors = { D:[220,53,69], I:[253,126,20], S:[25,135,84], C:[13,110,253] };

    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    dimDefs.forEach(d => {
        const p = percentiles[d.key] || 0;
        const bw = (p / 100) * 110;
        let bColor = [108,117,125];
        if (p >= 75) bColor = [25,135,84];
        else if (p >= 55) bColor = [13,110,253];
        else if (p >= 40) bColor = [253,126,20];

        doc.setFillColor(dimColors[d.key][0], dimColors[d.key][1], dimColors[d.key][2]);
        doc.circle(20, y + 2, 4, 'F');
        doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
        doc.text(d.key, 20, y + 3.5, { align: 'center' });
        doc.setTextColor(0,0,0); doc.setFont('helvetica', 'normal'); doc.setFontSize(9);

        doc.text(d.nombre, 27, y + 3.5);

        doc.setFillColor(230,230,230); doc.rect(70, y - 1, 110, 7, 'F');
        doc.setFillColor(bColor[0], bColor[1], bColor[2]);
        if (bw > 0) doc.rect(70, y - 1, bw, 7, 'F');

        doc.setTextColor(0,0,0);
        doc.text(p + '%', 183, y + 3.5);

        let nivel = 'Bajo';
        if (p >= 75) nivel = 'Alto';
        else if (p >= 55) nivel = 'Medio-Alto';
        else if (p >= 40) nivel = 'Medio';
        doc.setFontSize(7);
        doc.text(nivel, 70 + bw + 2, y + 3.5);
        doc.setFontSize(9);

        y += 11;
    });

    y += 4;
    doc.line(15, y, 195, y); y += 8;

    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN EJECUTIVO', 15, y); y += 6;

    doc.setFillColor(240, 248, 255);
    doc.setDrawColor(186, 230, 253);
    const resumenRect = y;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);

    let resumen = '';
    if (promedioGeneral >= 75)
        resumen = 'Candidato APTO para el cargo de ' + CARGO + '. Su perfil DISC muestra alta compatibilidad con los requisitos del puesto, especialmente en conocimiento normativo SST, liderazgo en seguridad y cumplimiento legal. Se recomienda para la gestión del SG-SST en operaciones de alto riesgo.';
    else if (promedioGeneral >= 55)
        resumen = 'Candidato APTO CON DESARROLLO para el cargo de ' + CARGO + '. El perfil muestra compatibilidad adecuada con la mayoría de requisitos HSEQ. Se recomienda capacitación específica en las áreas de mejora identificadas y acompañamiento durante los primeros meses.';
    else if (promedioGeneral >= 40)
        resumen = 'Candidato REQUIERE EVALUACION ADICIONAL para el cargo de ' + CARGO + '. Se identifican fortalezas pero también brechas significativas con los requisitos HSEQ. Se sugiere entrevista conductual profunda y validación de competencias técnicas.';
    else
        resumen = 'Candidato NO RECOMENDADO para el cargo de ' + CARGO + '. El perfil DISC no muestra la compatibilidad necesaria con los requisitos del puesto HSEQ. Se sugiere evaluar al candidato para otras posiciones que se ajusten mejor a su perfil comportamental.';

    const lineasResumen = doc.splitTextToSize(resumen, 172);
    const resumenH = lineasResumen.length * 5 + 10;
    doc.rect(15, resumenRect, 180, resumenH, 'FD');
    doc.text(lineasResumen, 19, resumenRect + 7);
    y = resumenRect + resumenH + 8;

    const fortalezas = analisis.fortalezas || [];
    const areas = analisis.areasDesarrollo || [];

    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('FORTALEZAS', 15, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    if (fortalezas.length > 0) {
        fortalezas.forEach(f => { doc.text('+ ' + f, 20, y); y += 5; });
    } else {
        doc.text('No se identificaron fortalezas destacadas con los umbrales actuales.', 20, y); y += 5;
    }
    y += 3;

    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('AREAS DE DESARROLLO', 15, y); y += 5;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    if (areas.length > 0) {
        areas.forEach(a => { doc.text('- ' + a, 20, y); y += 5; });
    } else {
        doc.text('No se identificaron areas criticas de mejora.', 20, y); y += 5;
    }
    y += 5;

    if (y > 220) { doc.addPage(); y = 20; }
    doc.line(15, y, 195, y); y += 8;

    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('ANALISIS DE COMPATIBILIDAD CON EL CARGO', 105, y, { align: 'center' }); y += 6;
    doc.setFontSize(10);
    doc.text('"' + CARGO + '"', 105, y, { align: 'center' }); y += 8;

    const startX = 20;
    const colW = [78, 22, 32, 48];

    doc.setFillColor(26, 58, 92);
    doc.rect(startX, y, 160, 7, 'F');
    doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
    doc.text('Competencia / Requisito', startX + 2, y + 5);
    doc.text('%',       startX + colW[0] + 4, y + 5);
    doc.text('Puntaje', startX + colW[0] + colW[1] + 2, y + 5);
    doc.text('Evaluacion', startX + colW[0] + colW[1] + colW[2] + 2, y + 5);
    y += 7; doc.setTextColor(0,0,0); doc.setFont('helvetica', 'normal');

    const reqRows = [
        { label: 'Conocimiento Normativo SST',   key: 'conocimientoNormativo' },
        { label: 'Liderazgo en Seguridad',       key: 'liderazgoSeguridad' },
        { label: 'Gestion del SG-SST',           key: 'gestionSST' },
        { label: 'Comunicacion de Riesgos',      key: 'comunicacionRiesgos' },
        { label: 'Investigacion de Incidentes',  key: 'investigacionIncidentes' },
        { label: 'Trabajo de Campo',             key: 'trabajoCampo' },
        { label: 'Capacitacion en SST',          key: 'capacitacionSST' },
        { label: 'Gestion Ambiental',            key: 'gestionAmbiental' },
        { label: 'Auditoria y Verificacion',     key: 'auditoriaVerificacion' },
        { label: 'Cumplimiento Legal',           key: 'cumplimientoLegal' }
    ];

    reqRows.forEach((req, i) => {
        doc.setFillColor(i % 2 === 0 ? 245 : 255, i % 2 === 0 ? 245 : 255, i % 2 === 0 ? 245 : 255);
        doc.rect(startX, y, 160, 6, 'F');
        const p = compatibilidad[req.key] || 0;
        let ev = 'INSUFICIENTE', ec = [220, 53, 69];
        if      (p >= 75) { ev = 'OPTIMO';        ec = [25, 135, 84]; }
        else if (p >= 55) { ev = 'ADECUADO';      ec = [13, 110, 253]; }
        else if (p >= 40) { ev = 'EN DESARROLLO'; ec = [253, 126, 20]; }
        doc.setFontSize(8);
        doc.text(req.label, startX + 2, y + 4);
        doc.text('' + p,    startX + colW[0] + 5, y + 4);
        doc.text(p + '/100', startX + colW[0] + colW[1] + 2, y + 4);
        doc.setTextColor(ec[0], ec[1], ec[2]);
        doc.text(ev, startX + colW[0] + colW[1] + colW[2] + 2, y + 4);
        doc.setTextColor(0,0,0);
        y += 6;
    });

    doc.setFillColor(26, 58, 92);
    doc.rect(startX, y, 160, 7, 'F');
    doc.setTextColor(255,255,255); doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
    doc.text('PROMEDIO GENERAL', startX + 2, y + 5);
    doc.text(Math.round(promedioGeneral) + '%', startX + colW[0] + 5, y + 5);
    doc.text(Math.round(promedioGeneral) + '/100', startX + colW[0] + colW[1] + 2, y + 5);
    doc.text(vText, startX + colW[0] + colW[1] + colW[2] + 2, y + 5);
    doc.setTextColor(0,0,0); y += 12;

    if (y > 230) { doc.addPage(); y = 20; }

    doc.line(15, y, 195, y); y += 8;
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('INTERPRETACION POR DIMENSION', 105, y, { align: 'center' }); y += 8;

    const interpFns = { D: getInterpretacionD, I: getInterpretacionI, S: getInterpretacionS, C: getInterpretacionC };
    const nivelStr  = p => p >= 75 ? 'Alto' : p >= 55 ? 'Medio-Alto' : p >= 40 ? 'Medio' : 'Bajo';

    dimDefs.forEach(d => {
        if (y > 250) { doc.addPage(); y = 20; }
        const p = percentiles[d.key] || 0;
        doc.setFontSize(9); doc.setFont('helvetica', 'bold');
        doc.text(d.key + ' - ' + d.nombre + ' (' + p + '% - ' + nivelStr(p) + '):', 15, y); y += 4;
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(interpFns[d.key](p), 175);
        doc.text(lines, 15, y);
        y += lines.length * 4 + 5;
    });

    if (y > 230) { doc.addPage(); y = 20; }
    doc.line(15, y, 195, y); y += 8;
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('RECOMENDACIONES', 15, y); y += 7;
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');

    const recs = getRecomendaciones(analisis);
    recs.forEach((rec, i) => {
        if (y > 270) { doc.addPage(); y = 20; }
        const lines = doc.splitTextToSize((i+1) + '. ' + rec, 175);
        doc.text(lines, 15, y);
        y += lines.length * 5 + 2;
    });

    if (y > 230) { doc.addPage(); y = 20; }
    y += 5; doc.line(15, y, 195, y); y += 8;
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('CONCEPTO FINAL', 15, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    const linesCF = doc.splitTextToSize(analisis.recomendacion || 'Sin recomendación disponible.', 175);
    doc.text(linesCF, 15, y); y += linesCF.length * 5 + 10;

    if (y > 240) { doc.addPage(); y = 20; }
    doc.line(15, y, 195, y); y += 10;
    doc.setFontSize(9);
    doc.text('Evaluacion realizada por: _________________________', 15, y); y += 8;
    doc.text('Firma: ______________________  Fecha: _______________', 15, y); y += 12;

    doc.setFontSize(8); doc.setTextColor(120, 120, 120);
    doc.text('maryter@dragadosmaryter.com  |  Cartagena de Indias, Colombia  |  MARYTER S.A.S', 105,
        doc.internal.pageSize.height - 10, { align: 'center' });

    const nombreArchivo = 'InformeDISC_' + (resultado.cedula || 'SN') + '_' +
        new Date().toISOString().split('T')[0] + '.pdf';
    doc.save(nombreArchivo);
}

function getInterpretacionD(percentil) {
    if (percentil >= 80) return 'Perfil altamente orientado a resultados. Toma decisiones rápidas y asume el control de situaciones complejas. Ideal para liderar proyectos desafiantes y gestionar múltiples frentes de trabajo simultáneamente.';
    if (percentil >= 60) return 'Capacidad de liderazgo bien desarrollada. Balance entre toma de decisiones y consideración de alternativas. Adecuado para coordinar proyectos con objetivos ambiciosos y equipos geográficamente dispersos.';
    if (percentil >= 40) return 'Enfoque moderado hacia resultados. Puede requerir impulso adicional en situaciones de alta presión o urgencia. Se beneficia de entornos que permitan análisis antes de actuar.';
    return 'Preferencia por trabajar con información detallada antes de tomar decisiones. Puede mostrarse cauteloso ante cambios rápidos. Se recomienda acompañamiento en entornos muy dinámicos.';
}

function getInterpretacionI(percentil) {
    if (percentil >= 80) return 'Excelentes habilidades interpersonales. Comunicación efectiva con equipos y stakeholders. Ideal para negociaciones con clientes y motivación de equipos operativos en múltiples zonas.';
    if (percentil >= 60) return 'Buena capacidad de comunicación. Se relaciona bien con diferentes perfiles. Adecuado para mantener relaciones con clientes y equipos en múltiples ubicaciones geográficas.';
    if (percentil >= 40) return 'Comunicación funcional pero no su principal fortaleza. Puede preferir trabajar con datos y hechos concretos. Se recomienda enfocarlo en interacción con equipos ya conocidos.';
    return 'Perfil más reservado en interacción social. Prefiere trabajar con información concreta y estructurada. Puede requerir apoyo en situaciones que exijan networking o comunicación extensiva.';
}

function getInterpretacionS(percentil) {
    if (percentil >= 80) return 'Alta estabilidad y compromiso sostenido. Ideal para proyectos de largo plazo y equipos que requieren consistencia. Muy leal con procedimientos y estándares establecidos.';
    if (percentil >= 60) return 'Buen balance entre estabilidad y flexibilidad. Comprometido con equipos y tareas asignadas. Puede adaptarse a cambios cuando se explica claramente el objetivo.';
    if (percentil >= 40) return 'Estabilidad moderada. Puede mostrar impaciencia con cambios muy frecuentes. Requiere entornos con cierta predictibilidad para lograr su máximo rendimiento.';
    return 'Alta adaptabilidad al cambio. Prefiere variedad en tareas y proyectos nuevos. Puede aburrirse con trabajos rutinarios. Se adapta muy bien a entornos dinámicos y cambiantes.';
}

function getInterpretacionC(percentil) {
    if (percentil >= 80) return 'Enfoque excepcional en calidad y precisión. Seguimiento riguroso de procedimientos y estándares normativos. Ideal para velar por cumplimiento contractual y exactitud en informes.';
    if (percentil >= 60) return 'Buen equilibrio entre calidad y eficiencia operativa. Sigue procedimientos correctamente mientras busca soluciones prácticas. Adecuado para control de calidad en proyectos.';
    if (percentil >= 40) return 'Atención a detalles funcional. Puede ocasionalmente pasar por alto aspectos críticos. Se beneficia de listas de verificación y procesos de revisión formales.';
    return 'Enfoque en visión general más que en detalles específicos. Pragmático en búsqueda de soluciones. Puede requerir sistemas de control adicionales para garantizar el cumplimiento normativo.';
}

function getRecomendaciones(analisis) {
    const recs = [];
    const p = analisis?.percentiles || {};
    const c = analisis?.compatibilidad || {};
    if (p.D < 55) recs.push('Fortalecer el liderazgo en seguridad para hacer cumplir normas y detener trabajos inseguros con firmeza.');
    if (p.I < 55) recs.push('Capacitación en comunicación asertiva y técnicas de sensibilización para programas de SST.');
    if (p.S < 55) recs.push('Desarrollar constancia en seguimiento de planes de acción y trabajo de campo sostenido en zonas operativas.');
    if (p.C < 55) recs.push('Fortalecer el rigor documental, conocimiento normativo y atención al detalle en informes HSEQ.');
    if ((c.conocimientoNormativo || 0) < 65) recs.push('Formación en legislación SST colombiana (Decreto 1072, Resolución 0312) y normas ISO.');
    if ((c.investigacionIncidentes || 0) < 65) recs.push('Entrenamiento en metodologías de investigación de incidentes y análisis de causalidad.');
    if ((c.capacitacionSST || 0) < 65) recs.push('Desarrollo de habilidades como facilitador en capacitaciones y charlas de seguridad.');
    if (recs.length === 0) {
        recs.push('Mantener las buenas prácticas identificadas en la evaluación conductual HSEQ.');
        recs.push('Realizar seguimiento periódico del desempeño en el cargo de Coordinador HSEQ.');
        recs.push('Explorar roles de mayor responsabilidad en gestión HSEQ aprovechando el perfil comportamental sólido.');
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
        conocimientoNormativo: 'Conocimiento Normativo SST',
        liderazgoSeguridad: 'Liderazgo en Seguridad',
        gestionSST: 'Gestión del SG-SST',
        comunicacionRiesgos: 'Comunicación de Riesgos',
        investigacionIncidentes: 'Investigación de Incidentes',
        trabajoCampo: 'Trabajo de Campo Operativo',
        capacitacionSST: 'Capacitación en SST',
        gestionAmbiental: 'Gestión Ambiental',
        auditoriaVerificacion: 'Auditoría y Verificación',
        cumplimientoLegal: 'Cumplimiento Legal'
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
                    <strong>Cargo evaluado:</strong> Coordinador HSEQ</p>
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
                <div class="dato"><strong>Cargo:</strong> Coordinador HSEQ</div>
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

        <h6 class="section-title">Compatibilidad con el Cargo: Coordinador HSEQ</h6>
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
    </div>`;
    
    // Append technical results if available
    if (resultado.tecnico && resultado.tecnico.analisis) {
        const ta = resultado.tecnico.analisis;
        const tVClass = ta.porcentaje >= 70 ? 'bg-success' : ta.porcentaje >= 50 ? 'bg-warning text-dark' : 'bg-danger';
        
        const techDiv = document.createElement('div');
        techDiv.className = 'resultado-card';
        techDiv.style.marginTop = '20px';
        techDiv.innerHTML = `
            <h6 class="section-title">Resultados Evaluación Técnica SIG</h6>
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
                            <th>Categoria</th>
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
    let r = await obtenerResultados(cedula);
    if (!r) r = window.resultadoGlobal || null;
    if (!r) { alert('Resultado no encontrado'); return; }
    generarPDF(r);
}

function generarPDFCompleto(discResult, tecResult) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const W = 210, H = 297;
    
    const logoEl = document.getElementById('logo-image');
    let y = 20;

    if (logoEl) {
        try { doc.addImage(logoEl, 'PNG', 15, 10, 35, 18); } catch(e) { console.warn('Logo PDF:', e); }
    }

    // SECTION 1: DISC RESULTS
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('DRAGADOS MAR Y TER  -  MARYTER S.A.S', 105, 22, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text('Cartagena de Indias, Colombia  |  maryter@dragadosmaryter.com', 105, 28, { align: 'center' });

    y = 36;
    doc.setDrawColor(26, 58, 92); doc.setLineWidth(0.8);
    doc.line(15, y, 195, y); y += 6;

    doc.setFontSize(13); doc.setFont('helvetica', 'bold');
    doc.text('INFORME DE EVALUACION COMPORTAMENTAL DISC', 105, y, { align: 'center' }); y += 6;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Cargo evaluado: Coordinador HSEQ', 105, y, { align: 'center' }); y += 6;
    doc.line(15, y, 195, y); y += 8;

    // Candidate data
    const analisis = discResult.analisis || {};
    const percentiles = analisis.percentiles || { D:0, I:0, S:0, C:0 };
    const compatibilidad = analisis.compatibilidad || {};
    
    doc.setFontSize(10); doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CANDIDATO', 15, y); y += 6;
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
    
    const nombre = discResult.nombre || 'No disponible';
    const cedula = discResult.cedula || 'No disponible';
    const email = discResult.email || 'No registrado';
    const fecha = new Date(discResult.fecha).toLocaleDateString('es-CO', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const perfilNombre = analisis.perfil || analisis.estilo || 'N/A';
    
    doc.text('Nombre: ' + nombre, 15, y); doc.text('Cedula: ' + cedula, 110, y); y += 5;
    doc.text('Correo: ' + email, 15, y); doc.text('Fecha: ' + fecha, 110, y); y += 5;
    doc.text('Cargo evaluado: Coordinador HSEQ', 15, y);
    doc.text('Perfil DISC: ' + perfilNombre, 110, y); y += 8;

    // DISC Scores
    const promedioGeneral = Object.keys(compatibilidad).length > 0
        ? Math.round(Object.values(compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(compatibilidad).length)
        : 0;
    
    let vText = 'EN PROCESO', vColor = [108, 117, 125];
    if (promedioGeneral >= 75) { vText = 'APTO'; vColor = [25, 135, 84]; }
    else if (promedioGeneral >= 55) { vText = 'APTO CON DESARROLLO'; vColor = [13, 110, 253]; }
    else if (promedioGeneral >= 40) { vText = 'REQUIERE EVALUACION ADICIONAL'; vColor = [253, 126, 20]; }
    else if (promedioGeneral > 0) { vText = 'NO RECOMENDADO'; vColor = [220, 53, 69]; }
    
    doc.setFillColor(vColor[0], vColor[1], vColor[2]);
    doc.rect(15, y, 180, 10, 'F');
    doc.setTextColor(255,255,255); doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('VEREDICTO DISC: ' + vText + '  (' + promedioGeneral + '% compatibilidad)', 105, y + 7, { align: 'center' });
    doc.setTextColor(0,0,0); y += 16;
    
    // DISC dimension bars (simplified)
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('RESULTADOS POR DIMENSION DISC', 15, y); y += 7;
    
    const dimDefs = [
        { key:'D', nombre:'Dominancia' },
        { key:'I', nombre:'Influencia' },
        { key:'S', nombre:'Estabilidad' },
        { key:'C', nombre:'Conscienciosidad' }
    ];
    const dimColors = { D:[220,53,69], I:[253,126,20], S:[25,135,84], C:[13,110,253] };
    
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    dimDefs.forEach(d => {
        const p = percentiles[d.key] || 0;
        const bw = (p / 100) * 110;
        let bColor = [108,117,125];
        if (p >= 75) bColor = [25,135,84];
        else if (p >= 55) bColor = [13,110,253];
        else if (p >= 40) bColor = [253,126,20];
        
        doc.setFillColor(dimColors[d.key][0], dimColors[d.key][1], dimColors[d.key][2]);
        doc.circle(20, y + 2, 4, 'F');
        doc.setTextColor(255,255,255); doc.setFontSize(8); doc.setFont('helvetica', 'bold');
        doc.text(d.key, 20, y + 3.5, { align: 'center' });
        doc.setTextColor(0,0,0); doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
        doc.text(d.nombre, 27, y + 3.5);
        
        doc.setFillColor(230,230,230); doc.rect(70, y - 1, 110, 7, 'F');
        doc.setFillColor(bColor[0], bColor[1], bColor[2]);
        if (bw > 0) doc.rect(70, y - 1, bw, 7, 'F');
        doc.setTextColor(0,0,0);
        doc.text(p + '%', 183, y + 3.5);
        y += 11;
    });
    
    y += 4;
    doc.line(15, y, 195, y); y += 8;
    
    // Compatibility table (compact)
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('COMPATIBILIDAD CON EL CARGO', 15, y); y += 6;
    
    const reqRows = [
        { label: 'Conocimiento Normativo SST', key: 'conocimientoNormativo' },
        { label: 'Liderazgo en Seguridad', key: 'liderazgoSeguridad' },
        { label: 'Gestion del SG-SST', key: 'gestionSST' },
        { label: 'Comunicacion de Riesgos', key: 'comunicacionRiesgos' },
        { label: 'Investigacion de Incidentes', key: 'investigacionIncidentes' },
        { label: 'Trabajo de Campo', key: 'trabajoCampo' },
        { label: 'Capacitacion en SST', key: 'capacitacionSST' },
        { label: 'Gestion Ambiental', key: 'gestionAmbiental' },
        { label: 'Auditoria y Verificacion', key: 'auditoriaVerificacion' },
        { label: 'Cumplimiento Legal', key: 'cumplimientoLegal' }
    ];
    
    doc.setFontSize(8);
    reqRows.forEach((req, i) => {
        if (y > 260) { doc.addPage(); y = 20; }
        const p = compatibilidad[req.key] || 0;
        let ev = 'INSUFICIENTE';
        if (p >= 75) ev = 'OPTIMO';
        else if (p >= 55) ev = 'ADECUADO';
        else if (p >= 40) ev = 'EN DESARROLLO';
        doc.text(req.label + ': ' + p + '% - ' + ev, 20, y);
        y += 5;
    });
    y += 4;
    
    // PAGE BREAK - TECHNICAL RESULTS
    doc.addPage();
    y = 20;
    
    doc.setFontSize(16); doc.setFont('helvetica', 'bold');
    doc.text('EVALUACION TECNICA - CONOCIMIENTOS SIG', 105, y, { align: 'center' }); y += 6;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal');
    doc.text('Sistemas Integrados de Gestion - HSEQ', 105, y, { align: 'center' }); y += 8;
    doc.line(15, y, 195, y); y += 8;
    
    if (tecResult && tecResult.analysis) {
        const ta = tecResult.analysis;
        const tColor = ta.porcentaje >= 70 ? [25,135,84] : ta.porcentaje >= 50 ? [253,126,20] : [220,53,69];
        
        doc.setFillColor(tColor[0], tColor[1], tColor[2]);
        doc.rect(15, y, 180, 10, 'F');
        doc.setTextColor(255,255,255); doc.setFontSize(11); doc.setFont('helvetica', 'bold');
        doc.text('VEREDICTO TECNICO: ' + ta.veredicto + '  (' + ta.puntaje + '/' + ta.total + ' - ' + ta.porcentaje + '%)', 105, y + 7, { align: 'center' });
        doc.setTextColor(0,0,0); y += 16;
        
        // Category breakdown
        doc.setFontSize(11); doc.setFont('helvetica', 'bold');
        doc.text('RESULTADOS POR CATEGORIA', 15, y); y += 7;
        
        Object.values(ta.categorias).forEach(cat => {
            if (y > 270) { doc.addPage(); y = 20; }
            const cColor = cat.porcentaje >= 70 ? [25,135,84] : cat.porcentaje >= 50 ? [253,126,20] : [220,53,69];
            const bw = (cat.porcentaje / 100) * 100;
            
            doc.setFillColor(240,240,240); doc.rect(15, y, 180, 9, 'F');
            doc.setFont('helvetica', 'normal'); doc.setFontSize(8);
            doc.text(cat.label, 20, y + 6);
            
            doc.setFillColor(220,225,235); doc.rect(100, y + 2, 80, 5, 'F');
            doc.setFillColor(cColor[0], cColor[1], cColor[2]);
            doc.rect(100, y + 2, bw, 5, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.text(cat.porcentaje + '% (' + cat.aciertos + '/' + cat.total + ')', 185, y + 6, { align: 'right' });
            y += 11;
        });
        
        y += 4;
        
        // Incorrect answers
        if (ta.incorrectas && ta.incorrectas.length > 0) {
            doc.setFontSize(11); doc.setFont('helvetica', 'bold');
            doc.text('PREGUNTAS INCORRECTAS - RETROALIMENTACION', 15, y); y += 7;
            
            ta.incorrectas.forEach((item, i) => {
                if (y > 250) { doc.addPage(); y = 20; }
                const letters = ['A','B','C','D'];
                doc.setFont('helvetica', 'bold'); doc.setFontSize(8);
                doc.setTextColor(220,53,69);
                doc.text((i+1) + '. ' + item.pregunta.pregunta, 15, y); y += 5;
                doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
                doc.setTextColor(100,100,100);
                doc.text('Respuesta: ' + letters[item.respondida] + ' | Correcta: ' + letters[item.pregunta.correct], 20, y); y += 4;
                doc.setTextColor(13,124,102);
                const fbLines = doc.splitTextToSize(item.pregunta.retroalimentacion, 170);
                fbLines.forEach(line => { doc.text(line, 20, y); y += 4; });
                doc.setTextColor(0,0,0);
                y += 3;
            });
        }
        
        y += 4;
        
        // Recommendation
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
        doc.text('RECOMENDACION', 15, y); y += 6;
        doc.setFont('helvetica', 'normal'); doc.setFontSize(9);
        const recLines = doc.splitTextToSize(ta.recomendacion, 175);
        recLines.forEach(line => { doc.text(line, 15, y); y += 5; });
    } else {
        doc.setFontSize(10); doc.setFont('helvetica', 'normal');
        doc.text('No se realizo evaluacion tecnica.', 15, y);
    }
    
    // Footer on all pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFontSize(8); doc.setTextColor(120, 120, 120);
        doc.text('maryter@dragadosmaryter.com  |  Cartagena de Indias, Colombia  |  MARYTER S.A.S', 105,
            doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    const nombreArchivo = 'InformeCompleto_' + (discResult.cedula || 'SN') + '_' +
        new Date().toISOString().split('T')[0] + '.pdf';
    doc.save(nombreArchivo);
}