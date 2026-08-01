var PREGUNTAS = {
    disc: {
        nombre: "Perfil DISC - Evaluaci\u00f3n Comportamental Coordinador HSEQ",
        descripcion: "Seleccione la opci\u00f3n que mejor lo describe. No hay respuestas correctas o incorrectas.",
        tiempo: 1200,
        preguntas: [
            { id: 1, dimensi: "D", pregunta: "Cuando un contratista incumple una norma cr\u00edtica de seguridad, prefiero:", opcionA: "Paralizar la actividad inmediatamente y notificar a gerencia", opcionB: "Documentar el hallazgo y escalarlo por los canales formales", pesoA: 1, pesoB: 0 },
            { id: 2, dimensi: "D", pregunta: "Ante un accidente grave en la operaci\u00f3n, mi reacci\u00f3n es:", opcionA: "Tomar el control de la escena y coordinar la respuesta", opcionB: "Activar el plan de emergencias y seguir los protocolos establecidos", pesoA: 1, pesoB: 0 },
            { id: 3, dimensi: "D", pregunta: "Cuando la gerencia presiona para acelerar una operaci\u00f3n que implica riesgos, yo:", opcionA: "Me mantengo firme en los requisitos de seguridad aunque afecte el cronograma", opcionB: "Busco alternativas que balanceen seguridad con productividad", pesoA: 1, pesoB: 0 },
            { id: 4, dimensi: "D", pregunta: "En la implementaci\u00f3n de un nuevo sistema de gesti\u00f3n HSEQ, prefiero:", opcionA: "Liderar el cambio con metas ambiciosas y m\u00e9todos directos", opcionB: "Avanzar gradualmente asegurando la aceptaci\u00f3n del equipo", pesoA: 1, pesoB: 0 },
            { id: 5, dimensi: "D", pregunta: "Cuando debo asignar responsabilidades de seguridad al equipo, prefiero:", opcionA: "Definir claramente roles y exigir rendici\u00f3n de cuentas", opcionB: "Construir consenso sobre qui\u00e9n asume cada responsabilidad", pesoA: 1, pesoB: 0 },
            { id: 6, dimensi: "D", pregunta: "Frente a una no conformidad mayor en una auditor\u00eda externa, mi enfoque es:", opcionA: "Tomar acci\u00f3n inmediata y definir responsables del plan correctivo", opcionB: "Analizar las causas ra\u00edz antes de definir las acciones", pesoA: 1, pesoB: 0 },
            { id: 7, dimensi: "I", pregunta: "Para presentar indicadores HSEQ a la junta directiva, prefiero:", opcionA: "Preparar una presentaci\u00f3n impactante que comunique los logros", opcionB: "Entregar un informe t\u00e9cnico detallado con datos precisos", pesoA: 1, pesoB: 0 },
            { id: 8, dimensi: "I", pregunta: "En una campa\u00f1a de seguridad, mi rol ideal es:", opcionA: "Ser el rostro visible motivando a los equipos en campo", opcionB: "Dise\u00f1ar los contenidos y materiales desde la oficina", pesoA: 1, pesoB: 0 },
            { id: 9, dimensi: "I", pregunta: "Cuando debo negociar con un contratista medidas de seguridad adicionales:", opcionA: "Busco persuadirlo mostrando los beneficios mutuos del cumplimiento", opcionB: "Le presento los requisitos contractuales y legales que debe cumplir", pesoA: 1, pesoB: 0 },
            { id: 10, dimensi: "I", pregunta: "Para fomentar una cultura de seguridad, considero m\u00e1s efectivo:", opcionA: "Realizar charlas motivacionales y reconocer p\u00fablicamente buenas pr\u00e1cticas", opcionB: "Establecer procedimientos claros y verificar su cumplimiento", pesoA: 1, pesoB: 0 },
            { id: 11, dimensi: "I", pregunta: "Cuando diferentes \u00e1reas tienen prioridades que compiten con la seguridad:", opcionA: "Facilito reuniones para alinear objetivos y construir soluciones conjuntas", opcionB: "Emite un concepto t\u00e9cnico escrito dejando clara la postura HSEQ", pesoA: 1, pesoB: 0 },
            { id: 12, dimensi: "I", pregunta: "Al recibir un reconocimiento por resultados en seguridad, prefiero:", opcionA: "Compartir el m\u00e9rito con todo el equipo p\u00fablicamente", opcionB: "Agradecer formalmente y enfocarme en las \u00e1reas que a\u00fan requieren mejora", pesoA: 1, pesoB: 0 },
            { id: 13, dimensi: "S", pregunta: "En el seguimiento de indicadores de seguridad mensuales, prefiero:", opcionA: "Mantener una rutina disciplinada de revisi\u00f3n y an\u00e1lisis", opcionB: "Revisarlos cuando hay variaciones significativas que lo ameriten", pesoA: 1, pesoB: 0 },
            { id: 14, dimensi: "S", pregunta: "Cuando hay cambios frecuentes en la normativa aplicable:", opcionA: "Mantengo un sistema de actualizaci\u00f3n peri\u00f3dica y control de cambios", opcionB: "Me adapto a cada cambio seg\u00fan su urgencia e impacto", pesoA: 1, pesoB: 0 },
            { id: 15, dimensi: "S", pregunta: "Para las inspecciones de seguridad en campo, prefiero:", opcionA: "Seguir un cronograma fijo y checklist estandarizado en cada visita", opcionB: "Variar el enfoque seg\u00fan las condiciones operativas del momento", pesoA: 1, pesoB: 0 },
            { id: 16, dimensi: "S", pregunta: "En la implementaci\u00f3n de un sistema de gesti\u00f3n ISO, mi estilo es:", opcionA: "Seguir met\u00f3dicamente cada fase del plan de implementaci\u00f3n", opcionB: "Ajustar el plan seg\u00fan las necesidades y avances reales", pesoA: 1, pesoB: 0 },
            { id: 17, dimensi: "S", pregunta: "Ante un plan de acci\u00f3n con muchas tareas correctivas, prefiero:", opcionA: "Dar seguimiento met\u00f3dico a cada una hasta su cierre completo", opcionB: "Priorizar las de mayor impacto y delegar las dem\u00e1s", pesoA: 1, pesoB: 0 },
            { id: 18, dimensi: "S", pregunta: "Cuando las operaciones son estables y sin incidentes:", opcionA: "Aprovecho para fortalecer la documentaci\u00f3n y mejorar procesos", opcionB: "Busco nuevos proyectos de mejora e innovaci\u00f3n en seguridad", pesoA: 1, pesoB: 0 },
            { id: 19, dimensi: "C", pregunta: "Al preparar la documentaci\u00f3n para una auditor\u00eda de certificaci\u00f3n ISO:", opcionA: "Verifico exhaustivamente cada requisito, registro y procedimiento", opcionB: "Conf\u00edo en que los procesos diarios aseguran la documentaci\u00f3n requerida", pesoA: 1, pesoB: 0 },
            { id: 20, dimensi: "C", pregunta: "Frente a un requisito legal nuevo que aplica a la operaci\u00f3n:", opcionA: "Estudio detalladamente la norma y verifico el cumplimiento de cada art\u00edculo", opcionB: "Identifico los aspectos principales y ajusto lo necesario", pesoA: 1, pesoB: 0 },
            { id: 21, dimensi: "C", pregunta: "Al revisar una matriz de riesgos elaborada por un analista:", opcionA: "Verifico la metodolog\u00eda, los criterios y la consistencia de la valoraci\u00f3n", opcionB: "Conf\u00edo en el criterio del analista y valido los riesgos cr\u00edticos", pesoA: 1, pesoB: 0 },
            { id: 22, dimensi: "C", pregunta: "Para la elaboraci\u00f3n del informe de gesti\u00f3n anual HSEQ:", opcionA: "Recopilo datos verificables de cada \u00e1rea y construyo un an\u00e1lisis riguroso", opcionB: "Consolido la informaci\u00f3n clave y destaco los logros principales", pesoA: 1, pesoB: 0 },
            { id: 23, dimensi: "C", pregunta: "Cuando identifico una inconsistencia en los registros de SST:", opcionA: "Investigo hasta encontrar la causa y corrijo el sistema de registro", opcionB: "Se\u00f1alo la inconsistencia y solicito la correcci\u00f3n al responsable", pesoA: 1, pesoB: 0 },
            { id: 24, dimensi: "C", pregunta: "Ante una decisi\u00f3n de inversi\u00f3n en equipos de seguridad:", opcionA: "Preparo un an\u00e1lisis t\u00e9cnico-comercial detallado con especificaciones", opcionB: "Presento las opciones principales y recomiendo la m\u00e1s adecuada", pesoA: 1, pesoB: 0 }
        ]
    },
    tecnico: {
        nombre: "Evaluaci\u00f3n T\u00e9cnica - Coordinador HSEQ",
        descripcion: "Eval\u00faa tus conocimientos en sistemas integrados de gesti\u00f3n, legislaci\u00f3n y liderazgo HSEQ.",
        tiempo: 1440,
        preguntas: [
            { id: 1, categoria: "Legislaci\u00f3n SST", pregunta: "\u00bfCu\u00e1l es el objetivo principal del Decreto 1072 de 2015?", opciones: ["Establecer los requisitos del SG-SST en Colombia", "Crear el Ministerio de Trabajo", "Definir los montos de cotizaci\u00f3n a ARL", "Regular las relaciones laborales"], correcta: 0 },
            { id: 2, categoria: "Legislaci\u00f3n SST", pregunta: "Seg\u00fan la Resoluci\u00f3n 0312 de 2019, \u00bfcada cu\u00e1nto debe realizarse la autoevaluaci\u00f3n de los est\u00e1ndares m\u00ednimos?", opciones: ["Trimestral", "Anual", "Semestral", "Bienal"], correcta: 1 },
            { id: 3, categoria: "Legislaci\u00f3n SST", pregunta: "En la clasificaci\u00f3n de empresa seg\u00fan riesgo, \u00bfqu\u00e9 clase corresponde a construcci\u00f3n de obras civiles?", opciones: ["Clase I", "Clase III", "Clase V (Riesgo Alto)", "Clase IV"], correcta: 2 },
            { id: 4, categoria: "ISO y Normas", pregunta: "\u00bfQu\u00e9 significa el enfoque PHVA en ISO 45001?", opciones: ["Planificar, Hacer, Validar, Aplicar", "Proteger, Hacer, Verificar, Actuar", "Planificar, Honrar, Verificar, Actuar", "Planificar, Hacer, Verificar, Actuar"], correcta: 3 },
            { id: 5, categoria: "ISO y Normas", pregunta: "\u00bfCu\u00e1l es el prop\u00f3sito principal de la norma ISO 14001?", opciones: ["Sistema de Gesti\u00f3n Ambiental", "Seguridad y Salud en el Trabajo", "Gesti\u00f3n de Calidad", "Responsabilidad Social"], correcta: 0 },
            { id: 6, categoria: "ISO y Normas", pregunta: "En un sistema integrado de gesti\u00f3n, \u00bfqu\u00e9 significa la estructura de Alto Nivel (HLS)?", opciones: ["Normativa de seguridad para trabajos en altura", "Estructura com\u00fan de cl\u00e1usulas para ISO 45001, 14001 y 9001", "Est\u00e1ndar de competencias del personal HSEQ", "Metodolog\u00eda de auditor\u00eda interna"], correcta: 1 },
            { id: 7, categoria: "Gesti\u00f3n de Riesgos", pregunta: "\u00bfCu\u00e1l metodolog\u00eda es m\u00e1s usada para valorar riesgos en SST?", opciones: ["An\u00e1lisis de Pareto", "M\u00e9todo Delphi", "GTC 45", "An\u00e1lisis FODA"], correcta: 2 },
            { id: 8, categoria: "Gesti\u00f3n de Riesgos", pregunta: "En la jerarqu\u00eda de controles, \u00bfcu\u00e1l es el control m\u00e1s efectivo?", opciones: ["Controles administrativos", "Uso de EPP", "Se\u00f1alizaci\u00f3n", "Eliminaci\u00f3n del peligro"], correcta: 3 },
            { id: 9, categoria: "Gesti\u00f3n de Riesgos", pregunta: "\u00bfQu\u00e9 es un permiso de trabajo en la gesti\u00f3n HSEQ?", opciones: ["Autorizaci\u00f3n documentada para realizar actividades de alto riesgo", "Licencia profesional del coordinador HSEQ", "Certificado de afiliaci\u00f3n a ARL", "Registro de asistencia a capacitaci\u00f3n"], correcta: 0 },
            { id: 10, categoria: "Investigaci\u00f3n de Incidentes", pregunta: "\u00bfQu\u00e9 m\u00e9todo de investigaci\u00f3n de incidentes busca causas ra\u00edz mediante preguntas iterativas?", opciones: ["Diagrama de Gantt", "Los 5 porqu\u00e9s", "An\u00e1lisis DOFA", "Matriz de Eisenhower"], correcta: 1 },
            { id: 11, categoria: "Investigaci\u00f3n de Incidentes", pregunta: "\u00bfQu\u00e9 plazo tiene el empleador para reportar un accidente de trabajo grave a la ARL?", opciones: ["Dentro de los 5 d\u00edas h\u00e1biles siguientes", "Dentro de las 24 horas siguientes", "Dentro de los 2 d\u00edas h\u00e1biles siguientes", "Dentro de la misma semana"], correcta: 2 },
            { id: 12, categoria: "Investigaci\u00f3n de Incidentes", pregunta: "\u00bfQu\u00e9 herramienta gr\u00e1fica se usa para analizar relaciones causa-efecto en incidentes?", opciones: ["Diagrama de flujo", "Histograma", "Gr\u00e1fico de control", "Diagrama de Ishikawa (espina de pescado)"], correcta: 3 },
            { id: 13, categoria: "Auditor\u00eda", pregunta: "\u00bfQu\u00e9 tipo de auditor\u00eda eval\u00faa la conformidad con los requisitos de la propia organizaci\u00f3n?", opciones: ["Auditor\u00eda interna", "Auditor\u00eda de tercera parte", "Auditor\u00eda de certificaci\u00f3n", "Auditor\u00eda forense"], correcta: 0 },
            { id: 14, categoria: "Auditor\u00eda", pregunta: "Como coordinador HSEQ, ante un hallazgo de auditor\u00eda \u00bfqu\u00e9 documento debe emitirse primero?", opciones: ["Informe a gerencia general", "Plan de acci\u00f3n correctiva con responsables y fechas", "Cambio del procedimiento afectado", "Capacitaci\u00f3n masiva al personal"], correcta: 1 },
            { id: 15, categoria: "Emergencias", pregunta: "\u00bfCu\u00e1l es el prop\u00f3sito del Plan de Emergencias en el SG-SST?", opciones: ["Asignar presupuesto para brigadas", "Contratar personal de vigilancia", "Definir acciones para prevenir y responder a situaciones de emergencia", "Definir horarios de evacuaci\u00f3n"], correcta: 2 },
            { id: 16, categoria: "Emergencias", pregunta: "\u00bfQui\u00e9nes conforman el Comit\u00e9 Paritario de Seguridad y Salud en el Trabajo (COPASST)?", opciones: ["Solo representantes del empleador", "Solo el coordinador HSEQ y el gerente", "Los supervisores de cada \u00e1rea", "Representantes del empleador y de los trabajadores en igual n\u00famero"], correcta: 3 },
            { id: 17, categoria: "Indicadores HSEQ", pregunta: "\u00bfQu\u00e9 indicador mide la frecuencia de accidentes de trabajo?", opciones: ["\u00cdndice de frecuencia (IF)", "Tasa de ausentismo", "\u00cdndice de productividad", "Tasa de rotaci\u00f3n"], correcta: 0 },
            { id: 18, categoria: "Indicadores HSEQ", pregunta: "\u00bfC\u00f3mo se calcula la tasa de accidentalidad seg\u00fan la normativa colombiana?", opciones: ["N\u00famero de AT / N\u00famero de trabajadores", "(N\u00famero de AT / Horas hombre trabajadas) x constante K", "D\u00edas perdidos / Total de trabajadores", "Costos por AT / Ingresos operacionales"], correcta: 1 },
            { id: 19, categoria: "Liderazgo HSEQ", pregunta: "Como coordinador HSEQ, \u00bfcu\u00e1l es la mejor estrategia para lograr compromiso gerencial?", opciones: ["Reportar todas las no conformidades a la autoridad laboral", "Delegar toda la gesti\u00f3n en los supervisores", "Presentar indicadores y an\u00e1lisis costo-beneficio de la gesti\u00f3n HSEQ", "Esperar a que gerencia solicite informaci\u00f3n"], correcta: 2 },
            { id: 20, categoria: "Liderazgo HSEQ", pregunta: "\u00bfQu\u00e9 acci\u00f3n refleja mejor el liderazgo en seguridad de un coordinador HSEQ?", opciones: ["Revisar documentos desde la oficina", "Delegar todas las inspecciones en los analistas", "Enviar correos recordatorios de las normas", "Realizar recorridos peri\u00f3dicos en campo dando ejemplo con el uso de EPP"], correcta: 3 },
            { id: 21, categoria: "Gesti\u00f3n Documental", pregunta: "\u00bfQu\u00e9 debe contener el perfil sociodemogr\u00e1fico seg\u00fan el Decreto 1072?", opciones: ["Caracterizaci\u00f3n de trabajadores por edad, g\u00e9nero, cargo, antig\u00fcedad y nivel educativo", "Solo la lista de nombres y c\u00e9dulas", "El RUT de la empresa", "El registro de vacaciones del personal"], correcta: 0 },
            { id: 22, categoria: "Gesti\u00f3n Documental", pregunta: "\u00bfQu\u00e9 documentos son obligatorios en el SG-SST seg\u00fan la Resoluci\u00f3n 0312?", opciones: ["Solo la afiliaci\u00f3n a ARL", "Pol\u00edtica de SST, matriz de riesgos, plan de trabajo anual y plan de emergencias", "El reglamento de higiene y seguridad industrial", "Los contratos de trabajo del personal"], correcta: 1 },
            { id: 23, categoria: "Mejora Continua", pregunta: "\u00bfQu\u00e9 significa el concepto de mejora continua en un sistema de gesti\u00f3n HSEQ?", opciones: ["Cumplir solo lo m\u00ednimo legal requerido", "Cambiar el sistema solo cuando hay un accidente", "Proceso recurrente de optimizaci\u00f3n del desempe\u00f1o en HSEQ", "Hacer lo mismo cada a\u00f1o sin cambios"], correcta: 2 },
            { id: 24, categoria: "Mejora Continua", pregunta: "\u00bfQu\u00e9 herramienta de an\u00e1lisis permite identificar Fortalezas, Debilidades, Oportunidades y Amenazas del SG-SST?", opciones: ["Diagrama de dispersi\u00f3n", "Gr\u00e1fico de control", "Histograma de frecuencia", "Matriz DOFA (FODA)"], correcta: 3 }
        ]
    }
};

function analizarPerfilTecnico(respuestas) {
    var preguntas = PREGUNTAS.tecnico.preguntas;
    var total = preguntas.length;
    var aciertos = 0;
    var categorias = {};

    preguntas.forEach(function(preg, idx) {
        var resp = respuestas[idx];
        if (!categorias[preg.categoria]) {
            categorias[preg.categoria] = { label: preg.categoria, aciertos: 0, total: 0 };
        }
        categorias[preg.categoria].total++;
        if (resp === preg.correcta) {
            aciertos++;
            categorias[preg.categoria].aciertos++;
        }
    });

    var porcentaje = Math.round((aciertos / total) * 100);
    var veredicto;
    if (porcentaje >= 80) veredicto = 'Sobresaliente';
    else if (porcentaje >= 65) veredicto = 'Aceptable';
    else if (porcentaje >= 50) veredicto = 'Requiere Refuerzo';
    else veredicto = 'Insuficiente';

    Object.keys(categorias).forEach(function(cat) {
        categorias[cat].porcentaje = Math.round((categorias[cat].aciertos / categorias[cat].total) * 100);
    });

    var recomendacion;
    if (porcentaje >= 80) recomendacion = 'Excelente dominio t\u00e9cnico en HSEQ. Demuestra conocimiento s\u00f3lido de legislaci\u00f3n, normas ISO, gesti\u00f3n de riesgos y liderazgo en sistemas integrados.';
    else if (porcentaje >= 65) recomendacion = 'Buen conocimiento t\u00e9cnico en HSEQ. Se recomienda reforzar las \u00e1reas con menor puntuaci\u00f3n mediante capacitaci\u00f3n espec\u00edfica.';
    else if (porcentaje >= 50) recomendacion = 'Conocimiento t\u00e9cnico b\u00e1sico. Requiere un plan de formaci\u00f3n estructurado en sistemas de gesti\u00f3n y normativa HSEQ.';
    else recomendacion = 'Conocimiento t\u00e9cnico insuficiente para el rol. Se recomienda formaci\u00f3n integral antes de asumir responsabilidades de coordinaci\u00f3n.';

    return {
        puntaje: aciertos, total: total, porcentaje: porcentaje,
        veredicto: veredicto, categorias: categorias, recomendacion: recomendacion
    };
}
