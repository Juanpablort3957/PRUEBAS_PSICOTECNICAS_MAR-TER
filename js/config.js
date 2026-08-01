var CARGO_CONFIG = {
    sig: {
        nombre: 'Analista SIG',
        cargoFormal: 'Analista SIG',
        paginaInicio: 'index.html',
        paginaTest: 'test.html',
        paginaResultados: 'resultados.html',
        paginaPanel: 'panel.html',
        candidatoVeResultados: true,
        tecnicoSectionTitle: 'Resultados Evaluaci\u00f3n T\u00e9cnica SIG',
        reqLabels: [
            { key: 'conocimientoNormativo', label: 'Conocimiento Normativo SST' },
            { key: 'liderazgoSeguridad', label: 'Liderazgo en Seguridad' },
            { key: 'gestionSST', label: 'Gesti\u00f3n del SG-SST' },
            { key: 'comunicacionRiesgos', label: 'Comunicaci\u00f3n de Riesgos' },
            { key: 'investigacionIncidentes', label: 'Investigaci\u00f3n de Incidentes' },
            { key: 'trabajoCampo', label: 'Trabajo de Campo Operativo' },
            { key: 'capacitacionSST', label: 'Capacitaci\u00f3n en SST' },
            { key: 'gestionAmbiental', label: 'Gesti\u00f3n Ambiental' },
            { key: 'auditoriaVerificacion', label: 'Auditor\u00eda y Verificaci\u00f3n' },
            { key: 'cumplimientoLegal', label: 'Cumplimiento Legal' }
        ],
        requisitos: {
            conocimientoNormativo: { dims: ['C', 'S'], peso: 1.0 },
            liderazgoSeguridad: { dims: ['D', 'I'], peso: 1.0 },
            gestionSST: { dims: ['C', 'S'], peso: 1.0 },
            comunicacionRiesgos: { dims: ['I', 'S'], peso: 1.0 },
            investigacionIncidentes: { dims: ['C', 'D'], peso: 0.9 },
            trabajoCampo: { dims: ['D', 'S'], peso: 0.8 },
            capacitacionSST: { dims: ['I', 'C'], peso: 0.9 },
            gestionAmbiental: { dims: ['C', 'S'], peso: 0.9 },
            auditoriaVerificacion: { dims: ['C', 'D'], peso: 1.0 },
            cumplimientoLegal: { dims: ['C', 'S'], peso: 1.0 }
        },
        perfilesDISC: [
            { cond: function(d,i,s,c){ return d>=4 && c>=4 && s>=3; },
              perfil: 'L\u00edder en Seguridad',
              estilo: 'Combina autoridad para hacer cumplir normas con rigor t\u00e9cnico. Ideal para coordinar equipos HSEQ y garantizar cumplimiento normativo en operaciones de alto riesgo.' },
            { cond: function(d,i,s,c){ return c>=4 && s>=4; },
              perfil: 'Inspector Met\u00f3dico',
              estilo: 'Excelente para seguimiento de procedimientos, gesti\u00f3n documental y auditor\u00edas. Prioriza precisi\u00f3n y cumplimiento de est\u00e1ndares.' },
            { cond: function(d,i,s,c){ return i>=4 && s>=4; },
              perfil: 'Facilitador HSEQ',
              estilo: 'Gran habilidad para capacitar, comunicar riesgos y generar cultura de seguridad. Ideal para trabajo con personal operativo.' },
            { cond: function(d,i,s,c){ return d>=4 && i>=4 && c>=3; },
              perfil: 'Transformador en Seguridad',
              estilo: 'Lidera cambios culturales en seguridad con determinaci\u00f3n y persuasi\u00f3n. Ideal para implementar nuevos sistemas de gesti\u00f3n.' },
            { cond: function(d,i,s,c){ return d>=3 && i>=3 && s>=3 && c>=3; },
              perfil: 'Integral HSEQ',
              estilo: 'Perfil vers\u00e1til y equilibrado. Puede desempe\u00f1arse en m\u00faltiples frentes del SG-SST con adaptabilidad.' },
            { cond: function(d,i,s,c){ return c>=4 && d>=3; },
              perfil: 'T\u00e9cnico Normativo',
              estilo: 'S\u00f3lido en normativas y capacidad para hacerlas cumplir. Enfoque en legislaci\u00f3n, ISO y control documental.' },
            { cond: function(d,i,s,c){ return d>=4 && s>=3; },
              perfil: 'Operador de Campo',
              estilo: 'C\u00f3modo en terreno y trabajo operativo. Toma decisiones r\u00e1pidas y mantiene constancia en seguimiento.' }
        ],
        perfilDefault: { perfil: 'Perfil en Desarrollo HSEQ', estilo: 'No encaja en perfiles t\u00edpicos HSEQ. Se requiere evaluaci\u00f3n adicional.' },
        fortalezaDescs: {
            D: 'Liderazgo en seguridad y toma de decisiones bajo presi\u00f3n',
            I: 'Comunicaci\u00f3n efectiva para capacitaci\u00f3n y sensibilizaci\u00f3n en SST',
            S: 'Constancia en seguimiento de planes de acci\u00f3n y procesos HSEQ',
            C: 'Atenci\u00f3n al detalle normativo, gesti\u00f3n documental y cumplimiento legal'
        },
        areaDescs: {
            D: 'Capacidad de autoridad y firmeza para hacer cumplir normas de seguridad',
            I: 'Habilidades de comunicaci\u00f3n y capacitaci\u00f3n en SST',
            S: 'Constancia en seguimiento y trabajo de campo sostenido',
            C: 'Rigor documental, cumplimiento normativo y atenci\u00f3n a detalles t\u00e9cnicos'
        },
        interpretaciones: {
            D: function(p) {
                if (p >= 80) return 'Perfil con alta autoridad para hacer cumplir normas de seguridad. Toma decisiones r\u00e1pidas en emergencias y lidera con firmeza en operaciones de alto riesgo. Ideal para detener trabajos inseguros y coordinar respuesta ante incidentes.';
                if (p >= 60) return 'Buen liderazgo en seguridad. Balance entre firmeza normativa y consideraci\u00f3n del personal operativo. Adecuado para investigaciones de incidentes y gesti\u00f3n de permisos de trabajo.';
                if (p >= 40) return 'Enfoque moderado en autoridad. Puede requerir apoyo para imponer medidas disciplinarias en seguridad. Se beneficia de respaldo gerencial en situaciones conflictivas.';
                return 'Perfil que prefiere evitar confrontaciones por incumplimientos de seguridad. Puede mostrarse indeciso al detener actividades de alto riesgo. Requiere desarrollo en asertividad y liderazgo normativo.';
            },
            I: function(p) {
                if (p >= 80) return 'Excelente comunicador para capacitaciones y sensibilizaci\u00f3n en SST. Capacidad para persuadir y generar cultura de seguridad en equipos operativos. Ideal para coordinar programas de formaci\u00f3n y reuniones HSEQ.';
                if (p >= 60) return 'Buena capacidad de comunicaci\u00f3n en temas HSEQ. Se relaciona adecuadamente con supervisores y personal de campo. Adecuado para realizar inducciones y charlas de seguridad.';
                if (p >= 40) return 'Comunicaci\u00f3n funcional pero no su principal fortaleza. Puede preferir la documentaci\u00f3n t\u00e9cnica sobre la interacci\u00f3n directa con equipos. Se recomienda apoyarlo en actividades de capacitaci\u00f3n masiva.';
                return 'Perfil reservado en comunicaci\u00f3n. Prefiere trabajar con normativas, informes y an\u00e1lisis. Puede requerir apoyo en actividades que exijan liderazgo de grupos y sensibilizaci\u00f3n en seguridad.';
            },
            S: function(p) {
                if (p >= 80) return 'Alta constancia y compromiso sostenido con los procesos HSEQ. Ideal para seguimiento de planes de acci\u00f3n, inspecciones recurrentes y trabajo de campo prolongado. Muy confiable en el cumplimiento de rutinas.';
                if (p >= 60) return 'Buen balance entre estabilidad y adaptabilidad. Comprometido con las tareas asignadas. Adecuado para trabajos que requieren tanto constancia como capacidad de ajuste a condiciones cambiantes.';
                if (p >= 40) return 'Estabilidad moderada. Puede mostrar impaciencia con seguimientos muy repetitivos. Requiere variedad de tareas para mantener su motivaci\u00f3n en el rol HSEQ.';
                return 'Alta adaptabilidad al cambio. Prefiere diversidad de frentes de trabajo. Puede aburrirse con inspecciones rutinarias. Se adapta mejor a entornos din\u00e1micos y roles de respuesta a emergencias.';
            },
            C: function(p) {
                if (p >= 80) return 'Enfoque excepcional en cumplimiento normativo y calidad. Seguimiento riguroso de est\u00e1ndares ISO, legislaci\u00f3n SST y gesti\u00f3n documental. Ideal para auditor\u00edas, control de registros y verificaci\u00f3n de requisitos legales.';
                if (p >= 60) return 'Buen equilibrio entre rigor normativo y eficiencia operativa. Sigue procedimientos correctamente. Adecuado para identificaci\u00f3n de peligros, valoraci\u00f3n de riesgos y control documental.';
                if (p >= 40) return 'Atenci\u00f3n a detalles normativos funcional. Puede pasar por alto requisitos legales menores. Se beneficia de listas de verificaci\u00f3n y formatos estandarizados para asegurar cumplimiento.';
                return 'Enfoque en visi\u00f3n general m\u00e1s que en detalles normativos. Puede requerir supervisi\u00f3n en gesti\u00f3n documental y verificaci\u00f3n de cumplimiento legal. Se recomienda apoyo administrativo para registros HSEQ.';
            }
        },
        getRecomendaciones: function(analisis) {
            var recs = [];
            var p = analisis.percentiles || {};
            var c = analisis.compatibilidad || {};
            if (p.D < 55) recs.push('Fortalecer el liderazgo en seguridad para hacer cumplir normas y detener trabajos inseguros con firmeza.');
            if (p.I < 55) recs.push('Capacitaci\u00f3n en comunicaci\u00f3n asertiva y t\u00e9cnicas de sensibilizaci\u00f3n para programas de SST.');
            if (p.S < 55) recs.push('Desarrollar constancia en seguimiento de planes de acci\u00f3n y trabajo de campo sostenido en zonas operativas.');
            if (p.C < 55) recs.push('Fortalecer el rigor documental, conocimiento normativo y atenci\u00f3n al detalle en informes HSEQ.');
            if ((c.conocimientoNormativo || 0) < 65) recs.push('Formaci\u00f3n en legislaci\u00f3n SST colombiana (Decreto 1072, Resoluci\u00f3n 0312) y normas ISO.');
            if ((c.investigacionIncidentes || 0) < 65) recs.push('Entrenamiento en metodolog\u00edas de investigaci\u00f3n de incidentes y an\u00e1lisis de causalidad.');
            if ((c.capacitacionSST || 0) < 65) recs.push('Desarrollo de habilidades como facilitador en capacitaciones y charlas de seguridad.');
            if (recs.length === 0) {
                recs.push('Mantener las buenas pr\u00e1cticas identificadas en la evaluaci\u00f3n conductual HSEQ.');
                recs.push('Realizar seguimiento peri\u00f3dico del desempe\u00f1o en el cargo de Analista SIG.');
                recs.push('Explorar roles de mayor responsabilidad en gesti\u00f3n HSEQ aprovechando el perfil comportamental s\u00f3lido.');
            }
            return recs.slice(0, 6);
        },
        recomendacionTexts: [
            { min: 75, text: 'APTO para el cargo de Analista SIG. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. Demuestra competencias para gestionar el SG-SST, liderar en seguridad, comunicar riesgos y garantizar cumplimiento normativo en operaciones de alto riesgo.' },
            { min: 55, text: 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo HSEQ. Se recomienda capacitaci\u00f3n t\u00e9cnica y acompa\u00f1amiento en los primeros meses.' },
            { min: 40, text: 'REQUIERE EVALUACI\u00d3N ADICIONAL. El perfil muestra algunas fortalezas pero brechas significativas para el cargo HSEQ. Se recomienda entrevista conductual profunda.' },
            { min: 0,  text: 'NO RECOMENDADO para el cargo de Analista SIG. El perfil DISC no muestra la compatibilidad necesaria.' }
        ]
    },

    mantenimiento: {
        nombre: 'Coordinador de Mantenimiento y Log\u00edstica',
        cargoFormal: 'Coordinador de Mantenimiento y Log\u00edstica',
        paginaInicio: 'index.html',
        paginaTest: 'test.html',
        paginaResultados: 'resultados.html',
        paginaPanel: 'panel.html',
        candidatoVeResultados: true,
        tecnicoSectionTitle: 'Resultados Evaluaci\u00f3n T\u00e9cnica de Mantenimiento',
        reqLabels: [
            { key: 'liderazgoEquipos', label: 'Liderazgo de equipos' },
            { key: 'organizacionPlanificacion', label: 'Organizaci\u00f3n y planificaci\u00f3n' },
            { key: 'resolucionProblemas', label: 'Resoluci\u00f3n de problemas bajo presi\u00f3n' },
            { key: 'comunicacionEfectiva', label: 'Comunicaci\u00f3n efectiva' },
            { key: 'orientacionResultados', label: 'Orientaci\u00f3n a resultados' },
            { key: 'conocimientoMantenimiento', label: 'Conocimiento t\u00e9cnico de mantenimiento' },
            { key: 'seguridadIndustrial', label: 'Seguridad industrial' },
            { key: 'gestionRepuestos', label: 'Gesti\u00f3n de repuestos e inventarios' },
            { key: 'mejoraContinua', label: 'Mejora continua (Lean/TPM)' },
            { key: 'supervisionTecnica', label: 'Supervisi\u00f3n t\u00e9cnica' }
        ],
        requisitos: {
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
        },
        perfilesDISC: [
            { cond: function(d,i,s,c){ return d>=4 && c>=4 && s>=3; },
              perfil: 'L\u00edder T\u00e9cnico de Planta',
              estilo: 'Combina autoridad para liderar equipos de mantenimiento con rigor t\u00e9cnico. Ideal para coordinar cuadrillas y asegurar continuidad operativa.' },
            { cond: function(d,i,s,c){ return c>=4 && s>=4; },
              perfil: 'Planificador Met\u00f3dico',
              estilo: 'Excelente para planificaci\u00f3n de mantenimiento, control de inventarios de repuestos y gesti\u00f3n documental. Prioriza la organizaci\u00f3n y el cumplimiento.' },
            { cond: function(d,i,s,c){ return i>=4 && s>=4; },
              perfil: 'Comunicador Operativo',
              estilo: 'Gran habilidad para capacitar t\u00e9cnicos, coordinar con proveedores y facilitar comunicaci\u00f3n entre \u00e1reas de planta.' },
            { cond: function(d,i,s,c){ return d>=4 && i>=4 && c>=3; },
              perfil: 'Transformador de Procesos',
              estilo: 'Lidera cambios en cultura de mantenimiento con determinaci\u00f3n y persuasi\u00f3n. Ideal para implementar TPM y Lean Maintenance.' },
            { cond: function(d,i,s,c){ return d>=3 && i>=3 && s>=3 && c>=3; },
              perfil: 'Integral de Mantenimiento',
              estilo: 'Perfil vers\u00e1til y equilibrado. Puede desempe\u00f1arse en m\u00faltiples frentes del \u00e1rea de mantenimiento con adaptabilidad.' },
            { cond: function(d,i,s,c){ return c>=4 && d>=3; },
              perfil: 'T\u00e9cnico Especialista',
              estilo: 'S\u00f3lido conocimiento t\u00e9cnico de equipos y procedimientos. Enfoque en confiabilidad, an\u00e1lisis de fallas y cumplimiento de est\u00e1ndares.' },
            { cond: function(d,i,s,c){ return d>=4 && s>=3; },
              perfil: 'Supervisor de Campo',
              estilo: 'C\u00f3modo en planta y trabajo operativo. Toma decisiones r\u00e1pidas durante fallas y mantiene constancia en seguimiento.' }
        ],
        perfilDefault: { perfil: 'Perfil en Desarrollo en Mantenimiento', estilo: 'No encaja en perfiles t\u00edpicos de coordinaci\u00f3n de mantenimiento. Se requiere evaluaci\u00f3n adicional.' },
        fortalezaDescs: {
            D: 'Liderazgo de equipos t\u00e9cnicos y toma de decisiones bajo presi\u00f3n',
            I: 'Comunicaci\u00f3n efectiva para coordinar equipos y proveedores',
            S: 'Constancia en seguimiento de planes de mantenimiento y \u00f3rdenes de trabajo',
            C: 'Atenci\u00f3n al detalle t\u00e9cnico, gesti\u00f3n documental y cumplimiento de est\u00e1ndares'
        },
        areaDescs: {
            D: 'Capacidad de liderazgo y firmeza para dirigir equipos de mantenimiento',
            I: 'Habilidades de comunicaci\u00f3n para coordinar con producci\u00f3n y proveedores',
            S: 'Constancia en seguimiento de programas de mantenimiento y trabajo de campo',
            C: 'Rigor t\u00e9cnico, an\u00e1lisis de fallas y cumplimiento de procedimientos'
        },
        interpretaciones: {
            D: function(p) {
                if (p >= 80) return 'Perfil con alta autoridad para liderar equipos de mantenimiento. Toma decisiones r\u00e1pidas durante fallas cr\u00edticas y coordina con firmeza bajo presi\u00f3n operativa. Ideal para gestionar paradas de planta y dirigir cuadrillas t\u00e9cnicas.';
                if (p >= 60) return 'Buen liderazgo en equipos de mantenimiento. Balance entre firmeza t\u00e9cnica y consideraci\u00f3n del personal. Adecuado para coordinar \u00f3rdenes de trabajo y gestionar prioridades.';
                if (p >= 40) return 'Enfoque moderado en liderazgo. Puede requerir apoyo para imponer disciplina t\u00e9cnica en el equipo. Se beneficia de respaldo gerencial en situaciones de alta presi\u00f3n.';
                return 'Perfil que prefiere evitar confrontaciones directas con el equipo t\u00e9cnico. Puede mostrarse indeciso al priorizar trabajos urgentes. Requiere desarrollo en asertividad y liderazgo de equipos de planta.';
            },
            I: function(p) {
                if (p >= 80) return 'Excelente comunicador para coordinar con producci\u00f3n, proveedores y \u00e1reas internas. Capacidad para capacitar t\u00e9cnicos e influir positivamente en la cultura de mantenimiento. Ideal para negociaci\u00f3n con contratistas y reportes a gerencia.';
                if (p >= 60) return 'Buena capacidad de comunicaci\u00f3n en entorno industrial. Se relaciona adecuadamente con proveedores y personal de otras \u00e1reas. Adecuado para reuniones de planificaci\u00f3n y reportes de gesti\u00f3n.';
                if (p >= 40) return 'Comunicaci\u00f3n funcional pero no su principal fortaleza. Puede preferir el an\u00e1lisis t\u00e9cnico sobre la interacci\u00f3n con m\u00faltiples \u00e1reas. Se recomienda apoyarlo en presentaciones y negociaciones con proveedores.';
                return 'Perfil reservado en comunicaci\u00f3n interpersonal. Prefiere trabajar con datos t\u00e9cnicos y procedimientos. Puede requerir apoyo en coordinaci\u00f3n interdepartamental y manejo de proveedores.';
            },
            S: function(p) {
                if (p >= 80) return 'Alta constancia y compromiso con los programas de mantenimiento. Ideal para seguimiento de planes preventivos, inspecciones recurrentes y trabajo continuo en piso de planta. Muy confiable en la ejecuci\u00f3n de rutinas.';
                if (p >= 60) return 'Buen balance entre constancia y adaptabilidad. Comprometido con los programas de mantenimiento. Adecuado para entornos que requieren tanto seguimiento de rutinas como respuesta a imprevistos.';
                if (p >= 40) return 'Estabilidad moderada. Puede mostrar impaciencia con seguimientos muy repetitivos. Requiere variedad de tareas para mantener su motivaci\u00f3n en el rol.';
                return 'Alta adaptabilidad al cambio. Prefiere diversidad de frentes de trabajo y responde bien a emergencias. Puede encontrar mon\u00f3tonas las rutinas de preventivo. Se adapta mejor a entornos din\u00e1micos.';
            },
            C: function(p) {
                if (p >= 80) return 'Enfoque excepcional en cumplimiento de est\u00e1ndares t\u00e9cnicos y procedimientos de mantenimiento. Seguimiento riguroso de planes, an\u00e1lisis de fallas y gesti\u00f3n documental. Ideal para control de inventarios de repuestos y reportes de confiabilidad.';
                if (p >= 60) return 'Buen equilibrio entre rigor t\u00e9cnico y eficiencia operativa. Sigue procedimientos de mantenimiento correctamente. Adecuado para an\u00e1lisis de fallas, planificaci\u00f3n y gesti\u00f3n documental.';
                if (p >= 40) return 'Atenci\u00f3n a detalles t\u00e9cnicos funcional. Puede pasar por alto algunos requisitos de documentaci\u00f3n. Se beneficia de listas de verificaci\u00f3n y formatos estandarizados.';
                return 'Enfoque en visi\u00f3n general m\u00e1s que en detalles t\u00e9cnicos. Puede requerir supervisi\u00f3n en gesti\u00f3n documental y an\u00e1lisis de fallas. Se recomienda apoyo en registros y control de repuestos.';
            }
        },
        getRecomendaciones: function(analisis) {
            var recs = [];
            var p = analisis.percentiles || {};
            var c = analisis.compatibilidad || {};
            if (p.D < 55) recs.push('Fortalecer el liderazgo de equipos de mantenimiento y la toma de decisiones bajo presi\u00f3n.');
            if (p.I < 55) recs.push('Capacitaci\u00f3n en comunicaci\u00f3n asertiva y t\u00e9cnicas de coordinaci\u00f3n con proveedores y producci\u00f3n.');
            if (p.S < 55) recs.push('Desarrollar constancia en seguimiento de planes de mantenimiento y \u00f3rdenes de trabajo.');
            if (p.C < 55) recs.push('Fortalecer el rigor t\u00e9cnico, an\u00e1lisis de fallas y documentaci\u00f3n de mantenimiento.');
            if ((c.conocimientoMantenimiento || 0) < 65) recs.push('Formaci\u00f3n en t\u00e9cnicas de mantenimiento industrial y gesti\u00f3n de activos (ISO 55000).');
            if ((c.seguridadIndustrial || 0) < 65) recs.push('Entrenamiento en normativa de seguridad industrial aplicada a mantenimiento (LOTO, espacios confinados).');
            if ((c.mejoraContinua || 0) < 65) recs.push('Capacitaci\u00f3n en Lean Manufacturing, TPM y herramientas de mejora continua.');
            if (recs.length === 0) {
                recs.push('Mantener las buenas pr\u00e1cticas identificadas en la evaluaci\u00f3n conductual.');
                recs.push('Realizar seguimiento peri\u00f3dico del desempe\u00f1o en el cargo de Coordinador de Mantenimiento.');
                recs.push('Explorar roles de mayor responsabilidad en gesti\u00f3n de activos y confiabilidad.');
            }
            return recs.slice(0, 6);
        },
        recomendacionTexts: [
            { min: 75, text: 'APTO para el cargo de Coordinador de Mantenimiento y Log\u00edstica. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. Demuestra competencias para liderar equipos, planificar mantenimiento y asegurar continuidad operativa.' },
            { min: 55, text: 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo de mantenimiento. Se recomienda capacitaci\u00f3n t\u00e9cnica y acompa\u00f1amiento en los primeros meses.' },
            { min: 40, text: 'REQUIERE EVALUACI\u00d3N ADICIONAL. El perfil muestra algunas fortalezas pero brechas significativas para el cargo de mantenimiento. Se recomienda entrevista conductual profunda.' },
            { min: 0,  text: 'NO RECOMENDADO para el cargo de Coordinador de Mantenimiento y Log\u00edstica. El perfil DISC no muestra la compatibilidad necesaria.' }
        ]
    },

    hseq: {
        nombre: 'Coordinador HSEQ',
        cargoFormal: 'Coordinador HSEQ',
        paginaInicio: 'index.html',
        paginaTest: 'test.html',
        paginaResultados: 'resultados.html',
        paginaPanel: 'panel.html',
        candidatoVeResultados: false,
        tecnicoSectionTitle: 'Resultados Evaluaci\u00f3n T\u00e9cnica HSEQ',
        reqLabels: [
            { key: 'liderazgoHSEQ', label: 'Liderazgo en HSEQ' },
            { key: 'gestionSistemasIntegrados', label: 'Gesti\u00f3n de Sistemas Integrados' },
            { key: 'conocimientoNormativo', label: 'Conocimiento Normativo SST' },
            { key: 'gestionRiesgos', label: 'Gesti\u00f3n de Riesgos' },
            { key: 'investigacionIncidentes', label: 'Investigaci\u00f3n de Incidentes' },
            { key: 'auditoriaVerificacion', label: 'Auditor\u00eda y Verificaci\u00f3n' },
            { key: 'comunicacionEstrategica', label: 'Comunicaci\u00f3n Estrat\u00e9gica' },
            { key: 'trabajoCampo', label: 'Trabajo de Campo y Supervisi\u00f3n' },
            { key: 'mejoraContinua', label: 'Mejora Continua HSEQ' },
            { key: 'cumplimientoLegal', label: 'Cumplimiento Legal' }
        ],
        requisitos: {
            liderazgoHSEQ: { dims: ['D', 'I'], peso: 1.0 },
            gestionSistemasIntegrados: { dims: ['C', 'S'], peso: 1.0 },
            conocimientoNormativo: { dims: ['C', 'S'], peso: 1.0 },
            gestionRiesgos: { dims: ['C', 'D'], peso: 1.0 },
            investigacionIncidentes: { dims: ['C', 'D'], peso: 0.9 },
            auditoriaVerificacion: { dims: ['C', 'S'], peso: 1.0 },
            comunicacionEstrategica: { dims: ['I', 'D'], peso: 0.9 },
            trabajoCampo: { dims: ['D', 'S'], peso: 0.8 },
            mejoraContinua: { dims: ['D', 'C'], peso: 0.9 },
            cumplimientoLegal: { dims: ['C', 'S'], peso: 1.0 }
        },
        perfilesDISC: [
            { cond: function(d,i,s,c){ return d>=4 && c>=4 && s>=3; },
              perfil: 'L\u00edder Estrat\u00e9gico HSEQ',
              estilo: 'Combina autoridad para liderar equipos HSEQ con rigor t\u00e9cnico y normativo. Ideal para coordinar sistemas de gesti\u00f3n integrados y tomar decisiones cr\u00edticas en seguridad.' },
            { cond: function(d,i,s,c){ return c>=4 && s>=4; },
              perfil: 'Gestor de Cumplimiento',
              estilo: 'Excelente para seguimiento de normativas, gesti\u00f3n documental y aseguramiento de est\u00e1ndares ISO. Prioriza el cumplimiento riguroso y la mejora continua.' },
            { cond: function(d,i,s,c){ return i>=4 && s>=4; },
              perfil: 'Comunicador HSEQ',
              estilo: 'Gran habilidad para capacitar equipos, presentar indicadores a gerencia y generar cultura de seguridad en toda la organizaci\u00f3n.' },
            { cond: function(d,i,s,c){ return d>=4 && i>=4 && c>=3; },
              perfil: 'Transformador Cultural',
              estilo: 'Lidera cambios culturales en seguridad con determinaci\u00f3n y persuasi\u00f3n. Ideal para implementar nuevos sistemas de gesti\u00f3n y transformar la cultura HSEQ.' },
            { cond: function(d,i,s,c){ return d>=3 && i>=3 && s>=3 && c>=3; },
              perfil: 'Integral HSEQ',
              estilo: 'Perfil vers\u00e1til y equilibrado. Capaz de gestionar simult\u00e1neamente personas, procesos y est\u00e1ndares en el \u00e1mbito HSEQ.' },
            { cond: function(d,i,s,c){ return c>=4 && d>=3; },
              perfil: 'T\u00e9cnico Normativo HSEQ',
              estilo: 'S\u00f3lido en normativas, legislaci\u00f3n y est\u00e1ndares. Enfoque en cumplimiento legal, ISO y control documental de sistemas de gesti\u00f3n.' },
            { cond: function(d,i,s,c){ return d>=4 && s>=3; },
              perfil: 'Operador de Seguridad',
              estilo: 'Fuerte presencia en campo y trabajo operativo. Toma decisiones r\u00e1pidas en seguridad y mantiene constancia en verificaciones y seguimiento.' }
        ],
        perfilDefault: { perfil: 'Perfil en Desarrollo HSEQ', estilo: 'No encaja en perfiles t\u00edpicos de coordinaci\u00f3n HSEQ. Se requiere evaluaci\u00f3n adicional.' },
        fortalezaDescs: {
            D: 'Liderazgo en seguridad y capacidad de tomar decisiones cr\u00edticas bajo presi\u00f3n',
            I: 'Comunicaci\u00f3n efectiva para influenciar la cultura de seguridad en todos los niveles',
            S: 'Constancia en el seguimiento de planes de acci\u00f3n y programas HSEQ',
            C: 'Rigor en cumplimiento normativo, gesti\u00f3n documental y est\u00e1ndares ISO'
        },
        areaDescs: {
            D: 'Fortalecer el liderazgo para detener trabajos inseguros y tomar decisiones en emergencias',
            I: 'Desarrollar habilidades de comunicaci\u00f3n estrat\u00e9gica y capacitaci\u00f3n en HSEQ',
            S: 'Mejorar la constancia en el seguimiento de indicadores y trabajo de campo',
            C: 'Profundizar el conocimiento normativo y rigor en auditor\u00edas de cumplimiento'
        },
        interpretaciones: {
            D: function(p) {
                if (p >= 80) return 'Alto liderazgo para coordinar equipos HSEQ y tomar decisiones cr\u00edticas en seguridad. Capacidad para detener operaciones inseguras, liderar investigaciones de incidentes mayores y gestionar crisis con firmeza.';
                if (p >= 60) return 'Buen liderazgo en seguridad. Equilibrio entre autoridad normativa y gesti\u00f3n de equipos. Adecuado para liderar comit\u00e9s de seguridad y coordinar planes de emergencia.';
                if (p >= 40) return 'Liderazgo moderado. Puede requerir apoyo para tomar decisiones contundentes en seguridad. Se beneficia de un marco claro de autoridad delegada.';
                return 'Perfil que prefiere consenso sobre autoridad directa. Puede mostrar indecisi\u00f3n al detener trabajos de alto riesgo. Requiere desarrollo en liderazgo asertivo para el rol de coordinador.';
            },
            I: function(p) {
                if (p >= 80) return 'Excelente comunicador estrat\u00e9gico para presentar indicadores HSEQ a gerencia, capacitar equipos multidisciplinarios y negociar con contratistas y entes reguladores.';
                if (p >= 60) return 'Buena capacidad de comunicaci\u00f3n en entornos HSEQ. Se relaciona adecuadamente con trabajadores, supervisores y directivos. Adecuado para liderar capacitaciones y comit\u00e9s.';
                if (p >= 40) return 'Comunicaci\u00f3n funcional. Puede preferir el trabajo t\u00e9cnico sobre la interacci\u00f3n social. Requiere apoyo en actividades que exijan persuasi\u00f3n y manejo de grupos grandes.';
                return 'Perfil reservado en comunicaci\u00f3n. Prefiere trabajo normativo y documental. Puede requerir apoyo en presentaciones a gerencia y liderazgo de programas de capacitaci\u00f3n.';
            },
            S: function(p) {
                if (p >= 80) return 'Alta constancia y disciplina en la ejecuci\u00f3n de programas HSEQ. Ideal para seguimiento de indicadores, verificaciones peri\u00f3dicas y mantenimiento de sistemas de gesti\u00f3n a largo plazo.';
                if (p >= 60) return 'Buen balance entre constancia y adaptabilidad. Comprometido con los procesos HSEQ. Adecuado para entornos que requieren seguimiento consistente con capacidad de ajuste.';
                if (p >= 40) return 'Estabilidad moderada. Puede mostrar impaciencia con procesos muy repetitivos. Requiere variedad en sus responsabilidades para mantener alto desempe\u00f1o en el rol.';
                return 'Alta adaptabilidad al cambio. Responde bien a emergencias y entornos din\u00e1micos. Puede encontrar mon\u00f3tonas las auditor\u00edas rutinarias. Se adapta mejor a roles de respuesta a incidentes.';
            },
            C: function(p) {
                if (p >= 80) return 'Enfoque excepcional en cumplimiento normativo y est\u00e1ndares. Rigor en gesti\u00f3n documental, preparaci\u00f3n de auditor\u00edas ISO y control de requisitos legales. Ideal para liderar certificaciones y mantener sistemas integrados de gesti\u00f3n.';
                if (p >= 60) return 'Buen equilibrio entre rigor normativo y pragmatismo operativo. Sigue procedimientos correctamente mientras busca eficiencia. Adecuado para coordinar sistemas de gesti\u00f3n y preparar informes de desempe\u00f1o.';
                if (p >= 40) return 'Atenci\u00f3n a detalles funcional. Puede pasar por alto requisitos documentales menores. Se beneficia de listas de verificaci\u00f3n y sistemas de gesti\u00f3n documental robustos.';
                return 'Enfoque en visi\u00f3n general m\u00e1s que en detalles normativos. Puede requerir supervisi\u00f3n en gesti\u00f3n documental. Se recomienda apoyo administrativo para registros y control de documentos.';
            }
        },
        getRecomendaciones: function(analisis) {
            var recs = [];
            var p = analisis.percentiles || {};
            var c = analisis.compatibilidad || {};
            if (p.D < 55) recs.push('Fortalecer el liderazgo en seguridad para tomar decisiones cr\u00edticas y detener operaciones inseguras.');
            if (p.I < 55) recs.push('Desarrollar comunicaci\u00f3n estrat\u00e9gica para presentar indicadores HSEQ a la alta direcci\u00f3n.');
            if (p.S < 55) recs.push('Mejorar la constancia en seguimiento de planes de acci\u00f3n y programas de mejora continua.');
            if (p.C < 55) recs.push('Profundizar en conocimiento normativo y rigor en la gesti\u00f3n documental de sistemas integrados.');
            if ((c.conocimientoNormativo || 0) < 65) recs.push('Formaci\u00f3n avanzada en legislaci\u00f3n SST colombiana (Decreto 1072, Resoluci\u00f3n 0312) y normas ISO 45001, 14001, 9001.');
            if ((c.investigacionIncidentes || 0) < 65) recs.push('Entrenamiento en metodolog\u00edas avanzadas de investigaci\u00f3n de incidentes (\u00e1rbol de causas, 5 porqu\u00e9s, Ishikawa).');
            if ((c.auditoriaVerificacion || 0) < 65) recs.push('Formaci\u00f3n como auditor interno en normas ISO y t\u00e9cnicas de auditor\u00eda de sistemas de gesti\u00f3n.');
            if (recs.length === 0) {
                recs.push('Mantener las buenas pr\u00e1cticas identificadas en la evaluaci\u00f3n conductual HSEQ.');
                recs.push('Realizar seguimiento peri\u00f3dico del desempe\u00f1o en el cargo de Coordinador HSEQ.');
                recs.push('Explorar roles de mayor responsabilidad en direcci\u00f3n de sistemas integrados de gesti\u00f3n.');
            }
            return recs.slice(0, 6);
        },
        recomendacionTexts: [
            { min: 75, text: 'APTO para el cargo de Coordinador HSEQ. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. Demuestra competencias para liderar sistemas integrados de gesti\u00f3n, gestionar riesgos, coordinar equipos HSEQ y garantizar cumplimiento normativo en operaciones de alto riesgo.' },
            { min: 55, text: 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo de Coordinador HSEQ. Se recomienda plan de desarrollo enfocado en liderazgo de equipos y gesti\u00f3n estrat\u00e9gica de sistemas.' },
            { min: 40, text: 'REQUIERE EVALUACI\u00d3N ADICIONAL. El perfil muestra algunas fortalezas pero brechas para el rol de coordinaci\u00f3n HSEQ. Se recomienda entrevista por competencias y verificaci\u00f3n de experiencia t\u00e9cnica.' },
            { min: 0,  text: 'NO RECOMENDADO para el cargo de Coordinador HSEQ. El perfil DISC no muestra la compatibilidad necesaria para liderar sistemas integrados de gesti\u00f3n.' }
        ]
    }
};

function getCargoConfig() {
    return window.CARGO ? CARGO_CONFIG[window.CARGO] : CARGO_CONFIG.sig;
}
