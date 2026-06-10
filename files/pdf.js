function generarPDF(resultado) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    console.log('DEBUG PDF: resultado.analisis =', resultado.analisis);
    console.log('DEBUG PDF: resultado.analisis.percentiles =', resultado.analisis?.percentiles);
    
    const logo = document.getElementById('logo-image');
    const logoData = logo ? logo.src : null;
    
    const CARGO = 'Analista SIG';
    
    let y = 20;
    
    if (logoData) {
        try {
            doc.addImage(logoData, 'PNG', 15, 10, 35, 18);
        } catch (e) {
            console.log('Logo no disponible');
        }
    }
    
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('DRAGADOS MAR Y TER', 105, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('MARYTER S.A.S', 105, 31, { align: 'center' });
    
    y = 42;
    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.line(15, y, 195, y);
    y += 5;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORME DE EVALUACION COMPORTAMENTAL', 105, y, { align: 'center' });
    y += 6;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Prueba DISC - Perfil para ' + CARGO, 105, y, { align: 'center' });
    y += 10;
    
    doc.line(15, y, 195, y);
    y += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL CANDIDATO', 15, y);
    y += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const nombre = resultado.nombre || 'No disponible';
    const cedula = resultado.cedula || 'No disponible';
    const fecha = new Date(resultado.fecha).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const perfilDISC = resultado.analisis?.perfil || 'N/A';
    
    doc.text(`Nombre: ${nombre}`, 15, y);
    doc.text(`Cedula: ${cedula}`, 80, y);
    y += 5;
    doc.text(`Fecha: ${fecha}`, 15, y);
    doc.text(`Cargo: ${CARGO}`, 80, y);
    y += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('GRAFICO DISC', 15, y);
    y += 6;
    
    const dimensiones = [
        { clave: 'D', nombre: 'Dominancia', valor: resultado.analisis?.percentiles?.D ?? 0 },
        { clave: 'I', nombre: 'Influencia', valor: resultado.analisis?.percentiles?.I ?? 0 },
        { clave: 'S', nombre: 'Estabilidad', valor: resultado.analisis?.percentiles?.S ?? 0 },
        { clave: 'C', nombre: 'Conscienciosidad', valor: resultado.analisis?.percentiles?.C ?? 0 }
    ];
    
    console.log('DEBUG PDF: dimensiones =', dimensiones);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    dimensiones.forEach(dim => {
        const percentil = dim.valor;
        console.log('DEBUG PDF: dim.clave=', dim.clave, 'percentil=', percentil);
        const anchoBarra = (percentil / 100) * 100;
        
        doc.text(`${dim.clave}`, 15, y + 3);
        
        let colorBarra;
        if (percentil >= 75) colorBarra = [40, 167, 69];
        else if (percentil >= 55) colorBarra = [0, 123, 255];
        else if (percentil >= 40) colorBarra = [255, 193, 7];
        else colorBarra = [108, 117, 125];
        
        doc.setFillColor(230, 230, 230);
        doc.rect(25, y - 2, 100, 7, 'F');
        
        doc.setFillColor(colorBarra[0], colorBarra[1], colorBarra[2]);
        doc.rect(25, y - 2, anchoBarra, 7, 'F');
        
        doc.setTextColor(0, 0, 0);
        doc.text(`${percentil}%`, 130, y + 3);
        doc.text(dim.nombre, 145, y + 3);
        
        y += 10;
    });
    
    y += 3;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Estilo Comportamental: ' + perfilDISC, 15, y);
    y += 8;
    
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(240, 248, 255);
    doc.rect(15, y, 180, 28, 'FD');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('RESUMEN EJECUTIVO', 20, y + 5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const promedioGeneral = Object.values(resultado.analisis?.compatibilidad || {}).reduce((a, b) => a + b, 0) / 
        Object.keys(resultado.analisis?.compatibilidad || {}).length || 0;
    
    let resumenTexto = '';
    if (promedioGeneral >= 75) {
        resumenTexto = `Candidato APTO para el cargo de ${CARGO}. Su perfil DISC muestra alta compatibilidad con los requisitos del puesto, especialmente en liderazgo, organización y orientación a resultados. Se recomienda para la gestión de proyectos en múltiples zonas geográficas de Colombia.`;
    } else if (promedioGeneral >= 55) {
        resumenTexto = `Candidato APTO CON DESARROLLO para el cargo de ${CARGO}. El perfil muestra compatibilidad adecuada con la mayoría de requisitos. Se recomienda capacitación específica en áreas de mejora identificadas. Potencial de éxito con mentorización y seguimiento en los primeros meses.`;
    } else if (promedioGeneral >= 40) {
        resumenTexto = `Candidato REQUIERE EVALUACION ADICIONAL para el cargo de ${CARGO}. Se identifican fortalezas pero también brechas significativas con los requisitos del puesto. Se sugiere entrevista conductual profunda y validación de competencias técnicas.`;    
    } else {
        resumenTexto = `Candidato NO RECOMENDADO para el cargo de ${CARGO}. El perfil DISC no muestra la compatibilidad necesaria con los requisitos del puesto. Se sugiere evaluar al candidato para otras posiciones que se ajusten mejor a su perfil comportamental.`;    
    }
    
    const lineasResumen = doc.splitTextToSize(resumenTexto, 170);
    doc.text(lineasResumen, 20, y + 12);
    y += 35;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('FORTALEZAS', 15, y);
    y += 5;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    
    const fortalezas = resultado.analisis?.fortalezas || [];
    if (fortalezas.length > 0) {
        fortalezas.forEach(f => {
            doc.text('+ ' + f, 20, y);
            y += 4;
        });
    } else {
        doc.text('No se identificaron fortalezas destacadas', 20, y);
        y += 4;
    }
    
    y += 5;
    doc.setFont('helvetica', 'bold');
    doc.text('AREAS DE DESARROLLO', 15, y);
    y += 5;
    
    doc.setFont('helvetica', 'normal');
    const areasDesarrollo = resultado.analisis?.areasDesarrollo || [];
    if (areasDesarrollo.length > 0) {
        areasDesarrollo.forEach(a => {
            doc.text('- ' + a, 20, y);
            y += 4;
        });
    } else {
        doc.text('No se identificaron areas criticas de mejora', 20, y);
        y += 4;
    }
    
    y += 10;
    doc.line(15, y, 195, y);
    y += 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('ANALISIS DE COMPATIBILIDAD CON EL CARGO', 105, y, { align: 'center' });
    y += 6;
    
    doc.setFontSize(10);
    doc.text('"' + CARGO + '"', 105, y, { align: 'center' });
    y += 8;
    
    const startX = 20;
    const colWidths = [70, 25, 35, 45];
    
    doc.setFillColor(26, 58, 92);
    doc.rect(startX, y, 160, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('Requisito', startX + 3, y + 5);
    doc.text('%', startX + colWidths[0] + 3, y + 5);
    doc.text('Puntos', startX + colWidths[0] + colWidths[1] + 3, y + 5);
    doc.text('Evaluacion', startX + colWidths[0] + colWidths[1] + colWidths[2] + 3, y + 5);
    
    y += 7;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    const requisitosMostrar = [
        { nombre: 'Conocimiento Normativo SST', clave: 'conocimientoNormativo' },
        { nombre: 'Liderazgo en Seguridad', clave: 'liderazgoSeguridad' },
        { nombre: 'Gestion SG-SST', clave: 'gestionSST' },
        { nombre: 'Comunicacion de Riesgos', clave: 'comunicacionRiesgos' },
        { nombre: 'Investigacion Incidentes', clave: 'investigacionIncidentes' },
        { nombre: 'Trabajo de Campo', clave: 'trabajoCampo' },
        { nombre: 'Capacitacion en SST', clave: 'capacitacionSST' },
        { nombre: 'Gestion Ambiental', clave: 'gestionAmbiental' },
        { nombre: 'Auditoria y Verificacion', clave: 'auditoriaVerificacion' },
        { nombre: 'Cumplimiento Legal', clave: 'cumplimientoLegal' }
    ];
    
    requisitosMostrar.forEach((req, i) => {
        if (i % 2 === 0) {
            doc.setFillColor(245, 245, 245);
            doc.rect(startX, y, 160, 6, 'F');
        } else {
            doc.setFillColor(255, 255, 255);
            doc.rect(startX, y, 160, 6, 'F');
        }
        
        const percentil = resultado.analisis?.compatibilidad?.[req.clave] || 0;
        let evaluacion = '';
        let colorEval;
        
        if (percentil >= 75) {
            evaluacion = 'OPTIMO';
            colorEval = [40, 167, 69];
        } else if (percentil >= 55) {
            evaluacion = 'ADECUADO';
            colorEval = [0, 123, 255];
        } else if (percentil >= 40) {
            evaluacion = 'EN DESARROLLO';
            colorEval = [255, 193, 7];
        } else {
            evaluacion = 'INSUFICIENTE';
            colorEval = [220, 53, 69];
        }
        
        doc.setFontSize(8);
        doc.text(req.nombre, startX + 3, y + 4);
        doc.text(`${percentil}`, startX + colWidths[0] + 5, y + 4);
        doc.text(`${percentil}/100`, startX + colWidths[0] + colWidths[1] + 5, y + 4);
        
        doc.setTextColor(colorEval[0], colorEval[1], colorEval[2]);
        doc.text(evaluacion, startX + colWidths[0] + colWidths[1] + colWidths[2] + 3, y + 4);
        doc.setTextColor(0, 0, 0);
        
        y += 6;
    });
    
    y += 8;
    doc.line(15, y, 195, y);
    y += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('INTERPRETACION DE DIMENSIONES DISC', 105, y, { align: 'center' });
    y += 8;
    
    const interpretaciones = [
        {
            clave: 'D',
            nombre: 'DOMINANCIA',
            percentil: resultado.analisis?.percentiles?.D || 0,
            texto: getInterpretacionD(resultado.analisis?.percentiles?.D || 0)
        },
        {
            clave: 'I',
            nombre: 'INFLUENCIA',
            percentil: resultado.analisis?.percentiles?.I || 0,
            texto: getInterpretacionI(resultado.analisis?.percentiles?.I || 0)
        },
        {
            clave: 'S',
            nombre: 'ESTABILIDAD',
            percentil: resultado.analisis?.percentiles?.S || 0,
            texto: getInterpretacionS(resultado.analisis?.percentiles?.S || 0)
        },
        {
            clave: 'C',
            nombre: 'CONSCIENCIOSIDAD',
            percentil: resultado.analisis?.percentiles?.C || 0,
            texto: getInterpretacionC(resultado.analisis?.percentiles?.C || 0)
        }
    ];
    
    interpretaciones.forEach(dim => {
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(`${dim.clave} - ${dim.nombre} (${dim.percentil}%):`, 15, y);
        y += 4;
        
        doc.setFont('helvetica', 'normal');
        const lineasInterp = doc.splitTextToSize(dim.texto, 175);
        doc.text(lineasInterp, 15, y);
        y += lineasInterp.length * 4 + 3;
    });
    
    y += 5;
    doc.line(15, y, 195, y);
    y += 8;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('RECOMENDACIONES', 15, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    const recomendaciones = getRecomendaciones(resultado.analisis);
    recomendaciones.forEach((rec, i) => {
        doc.text(`${i + 1}. ${rec}`, 15, y);
        y += 5;
    });
    
    y += 10;
    doc.line(15, y, 195, y);
    y += 10;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('Evaluacion realizada por: _________________________', 15, y);
    y += 8;
    doc.text('Firma: ______________________  Fecha: ___________', 15, y);
    y += 10;
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('maryter@dragadosmaryter.com', 105, y, { align: 'center' });
    y += 4;
    doc.text('Cartagena de Indias, Colombia - MARYTER S.A.S', 105, y, { align: 'center' });
    
    const nombreArchivo = `InformeDISC_${cedula}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(nombreArchivo);
}

function getInterpretacionD(percentil) {
    if (percentil >= 80) {
        return 'Perfil altamente orientado a resultados. Toma decisiones rápidas y asume el control de situaciones complejas. Ideal para liderar proyectos desafiantes y gestionar múltiples frentes de trabajo.';
    } else if (percentil >= 60) {
        return 'Capacidad de liderazgo bien desarrollada. Balance entre toma de decisiones y consideración de alternativas. Adecuado para coordinar proyectos con objetivos ambiciosos.';
    } else if (percentil >= 40) {
        return 'Enfoque moderado hacia resultados. Puede requerir impulso adicional en situaciones de presión. Se beneficia de entorno que permita análisis antes de actuar.';
    } else {
        return 'Preferencia por trabajar con información detallada antes de tomar decisiones. Puede mostrarse cauteloso ante cambios rápidos. Se recomienda acompañarlo en entornos dinámicos.';
    }
}

function getInterpretacionI(percentil) {
    if (percentil >= 80) {
        return 'Excelentes habilidades interpersonales. Comunicación efectiva con equipos y stakeholders. Ideal para negociaciones con clientes y motivación de equipos operativos.';
    } else if (percentil >= 60) {
        return 'Buena capacidad de comunicación. Relaciona bien con diferentes perfiles. Adecuado para mantener relaciones con clientes y equipos en múltiples ubicaciones.';
    } else if (percentil >= 40) {
        return 'Comunicación funcional pero no su principal fortaleza. Puede preferir trabajar con datos y hechos. Se recomienda enfocarlo en interacción con equipos ya conocidos.';
    } else {
        return 'Perfil más reservado en interacción social. Prefiere trabajar con información concreta. Puede requerir apoyo en situaciones que requieran networking o comunicación extensiva.';
    }
}

function getInterpretacionS(percentil) {
    if (percentil >= 80) {
        return 'Alta estabilidad y compromiso sostenido. Ideal para proyectos de largo plazo y equipos que requieren consistencia. Muy leal con procedimientos y estándares establecidos.';
    } else if (percentil >= 60) {
        return 'Buen balance entre estabilidad y flexibilidad. Comprometido con equipos y tareas. Puede adaptarse a cambios cuando se le explica el rationale.';
    } else if (percentil >= 40) {
        return 'Estabilidad moderada. Puede mostrar impaciencia con cambios muy frecuentes. Requiere entornos con cierta predictibilidad para máximo rendimiento.';
    } else {
        return 'Alta adaptabilidad al cambio. Prefiere variedad en tareas y proyectos. Puede aburrirse con trabajos rutinarios. Se adapta bien a entornos dinámicos.';
    }
}

function getInterpretacionC(percentil) {
    if (percentil >= 80) {
        return 'Enfoque excepcional en calidad y precisión. Seguimiento riguroso de procedimientos y estándares. Ideal para velar por cumplimiento contractual y facturación correcta.';
    } else if (percentil >= 60) {
        return 'Buen equilibrio entre calidad y eficiencia. Sigue procedimientos correctamente mientras busca soluciones pragmáticas. Adecuado para control de calidad en proyectos.';
    } else if (percentil >= 40) {
        return 'Atención a detalles funcional. Puede ocasionalmente pasar por alto aspectos críticos. Se beneficia de checklists y procesos de verificación.';
    } else {
        return 'Enfoque en visión general más que en detalles. Pragmático en búsqueda de soluciones. Puede requerir sistemas de control adicionales para cumplimiento normativo.';
    }
}

function getRecomendaciones(analisis) {
    const recomendaciones = [];
    
    if (!analisis) {
        recomendaciones.push('Revisar evaluación completada del candidato');
        return recomendaciones;
    }
    
    const percentiles = analisis.percentiles || {};
    const compatibilidad = analisis.compatibilidad || {};
    
    if (percentiles.D < 55) {
        recomendaciones.push('Fortalecer liderazgo en seguridad para hacer cumplir normas y detener trabajos inseguros');
    }
    
    if (percentiles.I < 55) {
        recomendaciones.push('Capacitación en comunicación asertiva y técnicas de sensibilización en SST');
    }
    
    if (percentiles.S < 55) {
        recomendaciones.push('Desarrollar constancia en seguimiento de planes de acción y trabajo de campo');
    }
    
    if (percentiles.C < 55) {
        recomendaciones.push('Fortalecer rigor documental, conocimiento normativo y atención al detalle HSEQ');
    }
    
    if (compatibilidad.conocimientoNormativo < 65) {
        recomendaciones.push('Formación en legislación SST colombiana y normas ISO (9001, 14001, 45001)');
    }
    
    if (compatibilidad.investigacionIncidentes < 65) {
        recomendaciones.push('Entrenamiento en metodologías de investigación de incidentes');
    }
    
    if (compatibilidad.capacitacionSST < 65) {
        recomendaciones.push('Desarrollo de habilidades como facilitador en capacitaciones de seguridad');
    }
    
    if (recomendaciones.length === 0) {
        recomendaciones.push('Mantenimiento de buenas prácticas identificadas en la evaluación HSEQ');
        recomendaciones.push('Seguimiento periódico del desempeño en el cargo de Analista SIG');
    }
    
    return recomendaciones.slice(0, 5);
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
    
    const promedioGeneral = Object.values(resultado.analisis?.compatibilidad || {}).reduce((a, b) => a + b, 0) / 
        Object.keys(resultado.analisis?.compatibilidad || {}).length || 0;
    
    let labelClase = 'bg-secondary';
    let labelTexto = 'En Desarrollo';
    
    if (promedioGeneral >= 75) {
        labelClase = 'bg-success';
        labelTexto = 'APTO';
    } else if (promedioGeneral >= 55) {
        labelClase = 'bg-info';
        labelTexto = 'APTO CON DESARROLLO';
    } else if (promedioGeneral >= 40) {
        labelClase = 'bg-warning';
        labelTexto = 'REQUIERE EVALUACION';
    } else {
        labelClase = 'bg-danger';
        labelTexto = 'NO RECOMENDADO';
    }
    
    container.innerHTML = `
        <div class="resultado-card">
            <div class="resultado-header">
                <img src="../Sin-titulo-1.png" alt="MARYTER" class="resultado-logo" id="logo-image">
                <div>
                    <h3>DRAGADOS MAR Y TER</h3>
                    <p>Evaluación DISC - Perfil para Analista SIG</p>
                </div>
            </div>
            
            <div class="text-center mb-4">
                <span class="badge ${labelClase} fs-6">${labelTexto}</span>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <p><strong>Nombre:</strong> ${resultado.nombre}</p>
                    <p><strong>Cedula:</strong> ${resultado.cedula}</p>
                </div>
                <div class="col-md-6">
                    <p><strong>Fecha:</strong> ${new Date(resultado.fecha).toLocaleDateString('es-CO')}</p>
                    <p><strong>Perfil:</strong> ${resultado.analisis?.perfil || 'N/A'}</p>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title text-center mb-4">Gráfico DISC</h5>
                    <div class="grafico-disc">
                        ${['D', 'I', 'S', 'C'].map(dim => {
                            const percentil = resultado.analisis?.percentiles?.[dim] || 0;
                            const nombreCompleto = {
                                D: 'DOMINANCIA',
                                I: 'INFLUENCIA',
                                S: 'ESTABILIDAD',
                                C: 'CONSCIENCIOSIDAD'
                            }[dim];
                            let colorClase = 'bg-secondary';
                            if (percentil >= 75) colorClase = 'bg-success';
                            else if (percentil >= 55) colorClase = 'bg-primary';
                            else if (percentil >= 40) colorClase = 'bg-warning';
                            
                            return `
                                <div class="barra-disc">
                                    <div class="etiqueta-dim">${dim}</div>
                                    <div class="barra-container">
                                        <div class="barra-llena ${colorClase}" style="width: ${percentil}%"></div>
                                    </div>
                                    <div class="percentil-dim">${percentil}%</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Estilo Comportamental</h5>
                    <p class="estilo-nombre">${resultado.analisis?.perfil || 'N/A'}</p>
                    <p class="estilo-desc">${resultado.analisis?.estilo || 'Sin descripción disponible'}</p>
                </div>
            </div>
            
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">Compatibilidad con el Cargo: Analista SIG</h5>
                    <table class="table table-bordered table-sm">
                        <thead>
                            <tr>
                                <th>Requisito</th>
                                <th>Percentil</th>
                                <th>Evaluación</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${Object.entries(resultado.analisis?.compatibilidad || {}).map(([req, percentil]) => {
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
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="analisis-card fortalezas">
                        <h6>Fortalezas</h6>
                        ${(resultado.analisis?.fortalezas || []).length > 0 ? 
                            `<ul>${resultado.analisis.fortalezas.map(f => `<li>${f}</li>`).join('')}</ul>` :
                            '<p class="text-muted">No se identificaron fortalezas destacadas</p>'
                        }
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="analisis-card debilidades">
                        <h6>Areas de Desarrollo</h6>
                        ${(resultado.analisis?.areasDesarrollo || []).length > 0 ?
                            `<ul>${resultado.analisis.areasDesarrollo.map(d => `<li>${d}</li>`).join('')}</ul>` :
                            '<p class="text-muted">No se identificaron areas criticas de mejora</p>'
                        }
                    </div>
                </div>
            </div>
            
            <div class="alert alert-info mt-4">
                <h6>Recomendacion:</h6>
                <p class="mb-0">${resultado.analisis?.recomendacion || 'Sin recomendación disponible'}</p>
            </div>
            
            <div class="text-center mt-4">
                <button class="btn btn-success btn-lg" onclick="descargarPDFResultado('${resultado.cedula}')">
                    Descargar Informe PDF
                </button>
            </div>
        </div>
    `;
}

async function descargarPDFResultado(cedula) {
    const resultado = await obtenerResultados(cedula);
    if (!resultado) {
        alert('Resultado no encontrado');
        return;
    }
    
    generarPDF(resultado);
}