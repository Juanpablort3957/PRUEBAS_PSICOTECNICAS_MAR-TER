var PREGUNTAS = {
    disc: {
        nombre: "Perfil DISC - Evaluaci\u00f3n Comportamental Jefe Administrativo",
        descripcion: "Seleccione la opci\u00f3n que mejor lo describe. No hay respuestas correctas o incorrectas.",
        tiempo: 1200,
        preguntas: [
            { id: 1, dimensi: "D", pregunta: "Cuando un \u00e1rea incumple repetidamente sus metas administrativas, prefiero:", opcionA: "Intervenir directamente, exigir resultados y definir un plan correctivo", opcionB: "Analizar las causas con el equipo antes de tomar medidas", pesoA: 1, pesoB: 0 },
            { id: 2, dimensi: "D", pregunta: "Ante una decisi\u00f3n de recorte de presupuesto que afecta a mi equipo, yo:", opcionA: "Tomo la decisi\u00f3n y comunico los cambios con firmeza", opcionB: "Busco alternativas que minimicen el impacto en el personal", pesoA: 1, pesoB: 0 },
            { id: 3, dimensi: "D", pregunta: "Cuando gerencia pide acelerar un proyecto administrativo con recursos limitados:", opcionA: "Asumo el reto, reasigno prioridades y exijo resultados al equipo", opcionB: "Solicito m\u00e1s tiempo o recursos para no comprometer la calidad", pesoA: 1, pesoB: 0 },
            { id: 4, dimensi: "D", pregunta: "En una negociaci\u00f3n clave con un proveedor, mi estilo es:", opcionA: "Ser directo, plantear mis condiciones y cerrar el acuerdo r\u00e1pido", opcionB: "Explorar opciones y construir un acuerdo de mutuo beneficio", pesoA: 1, pesoB: 0 },
            { id: 5, dimensi: "D", pregunta: "Frente a un empleado con bajo desempe\u00f1o persistente, prefiero:", opcionA: "Aplicar el proceso disciplinario con claridad y firmeza", opcionB: "Buscar las causas y dar oportunidades de mejora primero", pesoA: 1, pesoB: 0 },
            { id: 6, dimensi: "D", pregunta: "Al liderar una reuni\u00f3n de seguimiento operativo, prefiero:", opcionA: "Dirigir la agenda, tomar decisiones y asignar responsables", opcionB: "Facilitar el debate y construir conclusiones en conjunto", pesoA: 1, pesoB: 0 },
            { id: 7, dimensi: "I", pregunta: "Para presentar los resultados del \u00e1rea a la gerencia general:", opcionA: "Preparo una presentaci\u00f3n persuasiva que destaque logros e impacto", opcionB: "Entrego un informe t\u00e9cnico detallado con indicadores precisos", pesoA: 1, pesoB: 0 },
            { id: 8, dimensi: "I", pregunta: "En la gesti\u00f3n del clima laboral, considero m\u00e1s efectivo:", opcionA: "Mantener comunicaci\u00f3n abierta y motivar al equipo con reconocimiento", opcionB: "Establecer pol\u00edticas claras y medir la satisfacci\u00f3n peri\u00f3dicamente", pesoA: 1, pesoB: 0 },
            { id: 9, dimensi: "I", pregunta: "Cuando debo convencer a gerencia de aprobar una inversi\u00f3n necesaria:", opcionA: "Presento el caso con datos y apelo a la visi\u00f3n de negocio", opcionB: "Entrego el an\u00e1lisis costo-beneficio por escrito y espero decisi\u00f3n", pesoA: 1, pesoB: 0 },
            { id: 10, dimensi: "I", pregunta: "En procesos de selecci\u00f3n de personal, prefiero:", opcionA: "Entrevistar candidatos y evaluar el ajuste cultural y motivacional", opcionB: "Basarme en pruebas t\u00e9cnicas y verificaci\u00f3n de competencias", pesoA: 1, pesoB: 0 },
            { id: 11, dimensi: "I", pregunta: "Cuando hay un conflicto entre dos \u00e1reas de la empresa, mi rol es:", opcionA: "Mediar, escuchar ambas partes y facilitar un acuerdo", opcionB: "Emitir una directriz clara con base en las pol\u00edticas establecidas", pesoA: 1, pesoB: 0 },
            { id: 12, dimensi: "I", pregunta: "Al recibir cr\u00edticas del equipo sobre mi gesti\u00f3n, prefiero:", opcionA: "Dialogar abiertamente y ajustar lo que sea razonable", opcionB: "Analizar si las cr\u00edticas tienen fundamento t\u00e9cnico antes de actuar", pesoA: 1, pesoB: 0 },
            { id: 13, dimensi: "S", pregunta: "En el monitoreo mensual de los KPIs del \u00e1rea:", opcionA: "Mantengo una rutina disciplinada de revisi\u00f3n y an\u00e1lisis de variaciones", opcionB: "Reviso cuando hay desviaciones significativas que lo ameriten", pesoA: 1, pesoB: 0 },
            { id: 14, dimensi: "S", pregunta: "Ante cambios en la legislaci\u00f3n laboral que afectan la operaci\u00f3n:", opcionA: "Actualizo los procesos con un sistema de control de cambios peri\u00f3dico", opcionB: "Ajusto lo necesario seg\u00fan la urgencia de cada cambio", pesoA: 1, pesoB: 0 },
            { id: 15, dimensi: "S", pregunta: "En el seguimiento del presupuesto administrativo, prefiero:", opcionA: "Revisarlo peri\u00f3dicamente con disciplina y anticipar desviaciones", opcionB: "Revisarlo al cierre de cada periodo o ante alertas", pesoA: 1, pesoB: 0 },
            { id: 16, dimensi: "S", pregunta: "En la implementaci\u00f3n del Sistema de Gesti\u00f3n de Calidad (SIG):", opcionA: "Seguir met\u00f3dicamente cada fase del plan de implementaci\u00f3n", opcionB: "Ajustar el plan seg\u00fan las necesidades reales de la operaci\u00f3n", pesoA: 1, pesoB: 0 },
            { id: 17, dimensi: "S", pregunta: "Cuando el \u00e1rea opera de forma estable y sin novedades:", opcionA: "Aprovecho para fortalecer procesos, documentaci\u00f3n y mejora continua", opcionB: "Busco nuevos proyectos e innovaciones para el \u00e1rea", pesoA: 1, pesoB: 0 },
            { id: 18, dimensi: "S", pregunta: "En el seguimiento de los planes de acci\u00f3n del \u00e1rea, prefiero:", opcionA: "Dar seguimiento met\u00f3dico a cada tarea hasta su cierre completo", opcionB: "Priorizar las tareas cr\u00edticas y delegar las dem\u00e1s", pesoA: 1, pesoB: 0 },
            { id: 19, dimensi: "C", pregunta: "Al construir el informe ejecutivo mensual para gerencia:", opcionA: "Verifico cada cifra, indicador y conclusi\u00f3n antes de presentarlo", opcionB: "Consolido la informaci\u00f3n clave y destaco los aspectos m\u00e1s relevantes", pesoA: 1, pesoB: 0 },
            { id: 20, dimensi: "C", pregunta: "Frente a un nuevo requisito legal laboral que aplica a la empresa:", opcionA: "Estudio la norma a fondo y verifico el cumplimiento de cada art\u00edculo", opcionB: "Identifico los aspectos principales y ajusto lo necesario", pesoA: 1, pesoB: 0 },
            { id: 21, dimensi: "C", pregunta: "Al analizar los indicadores del \u00e1rea antes de tomar una decisi\u00f3n:", opcionA: "Cruzo datos de m\u00faltiples fuentes y valido su consistencia", opcionB: "Me baso en los datos principales y mi experiencia", pesoA: 1, pesoB: 0 },
            { id: 22, dimensi: "C", pregunta: "En el manejo de informaci\u00f3n confidencial de n\u00f3mina y personal:", opcionA: "Sigo protocolos estrictos de confidencialidad y control de acceso", opcionB: "Conf\u00edo en la discreci\u00f3n del equipo y los sistemas establecidos", pesoA: 1, pesoB: 0 },
            { id: 23, dimensi: "C", pregunta: "Al revisar un contrato o acuerdo con proveedores:", opcionA: "Leo cada cl\u00e1usula y verifico el cumplimiento de las condiciones", opcionB: "Reviso los puntos principales y las condiciones comerciales", pesoA: 1, pesoB: 0 },
            { id: 24, dimensi: "C", pregunta: "Cuando debo decidir sobre una inversi\u00f3n tecnol\u00f3gica para el \u00e1rea:", opcionA: "Preparo un an\u00e1lisis t\u00e9cnico y financiero detallado antes de decidir", opcionB: "Eval\u00fao las opciones principales y recomiendo la m\u00e1s adecuada", pesoA: 1, pesoB: 0 }
        ]
    },
    tecnico: {
        nombre: "Evaluaci\u00f3n T\u00e9cnica - Jefe Administrativo",
        descripcion: "Eval\u00faa tus conocimientos en legislaci\u00f3n laboral, gesti\u00f3n de RRHH, indicadores, presupuesto, SIG y proyectos.",
        tiempo: 1440,
        preguntas: [
            { id: 1, categoria: "Legislaci\u00f3n Laboral", pregunta: "\u00bfCu\u00e1l es la jornada laboral m\u00e1xima legal en Colombia?", opciones: ["48 horas semanales", "40 horas semanales", "44 horas semanales", "50 horas semanales"], correcta: 0 },
            { id: 2, categoria: "Legislaci\u00f3n Laboral", pregunta: "\u00bfQu\u00e9 es el contrato de trabajo a t\u00e9rmino indefinido?", opciones: ["Un contrato sin fecha de terminaci\u00f3n definida", "Un contrato por 3 meses", "Un contrato por obra", "Un contrato temporal"], correcta: 0 },
            { id: 3, categoria: "Legislaci\u00f3n Laboral", pregunta: "\u00bfQu\u00e9 es la prima de servicios?", opciones: ["Un salario adicional pagado semestralmente", "Un bono por productividad", "El auxilio de transporte", "La cesant\u00eda"], correcta: 0 },
            { id: 4, categoria: "Gesti\u00f3n de RRHH", pregunta: "\u00bfCu\u00e1l es el objetivo principal del proceso de inducci\u00f3n?", opciones: ["Integrar al nuevo empleado a la cultura y procesos de la empresa", "Evaluar su desempe\u00f1o", "Firmar el contrato", "Pagar la n\u00f3mina"], correcta: 0 },
            { id: 5, categoria: "Gesti\u00f3n de RRHH", pregunta: "\u00bfQu\u00e9 es la evaluaci\u00f3n de desempe\u00f1o?", opciones: ["Proceso sistem\u00e1tico para medir el rendimiento y competencias del personal", "El pago de n\u00f3mina", "La selecci\u00f3n de personal", "La afiliaci\u00f3n a seguridad social"], correcta: 0 },
            { id: 6, categoria: "Gesti\u00f3n de RRHH", pregunta: "\u00bfQu\u00e9 mide el \u00edndice de rotaci\u00f3n de personal?", opciones: ["La proporci\u00f3n de empleados que salen y entran en un periodo", "El ausentismo", "La productividad", "El clima laboral"], correcta: 0 },
            { id: 7, categoria: "Indicadores KPIs", pregunta: "\u00bfQu\u00e9 es un KPI?", opciones: ["Indicador clave de desempe\u00f1o que mide el logro de objetivos", "Un tipo de contrato", "Un software de n\u00f3mina", "Una norma ISO"], correcta: 0 },
            { id: 8, categoria: "Indicadores KPIs", pregunta: "\u00bfQu\u00e9 es un tablero de control (dashboard)?", opciones: ["Herramienta visual que consolida indicadores para la toma de decisiones", "Un informe en papel", "Una reuni\u00f3n de seguimiento", "Un presupuesto"], correcta: 0 },
            { id: 9, categoria: "Indicadores KPIs", pregunta: "Un indicador de eficiencia mide:", opciones: ["La relaci\u00f3n entre recursos utilizados y resultados obtenidos", "Solo los ingresos", "Solo los costos", "El n\u00famero de empleados"], correcta: 0 },
            { id: 10, categoria: "Presupuesto", pregunta: "\u00bfQu\u00e9 es un presupuesto operativo?", opciones: ["Estimaci\u00f3n de ingresos y gastos para la operaci\u00f3n en un periodo", "El total de ventas", "El inventario", "El pago de impuestos"], correcta: 0 },
            { id: 11, categoria: "Presupuesto", pregunta: "\u00bfQu\u00e9 es una variaci\u00f3n presupuestal?", opciones: ["La diferencia entre lo presupuestado y lo ejecutado", "Un aumento de sueldo", "Un nuevo proveedor", "Una factura"], correcta: 0 },
            { id: 12, categoria: "Presupuesto", pregunta: "El control presupuestal busca:", opciones: ["Asegurar que los gastos se mantengan dentro de lo planificado", "Aumentar gastos", "Reducir personal", "Comprar m\u00e1s insumos"], correcta: 0 },
            { id: 13, categoria: "SIG y Calidad", pregunta: "\u00bfQu\u00e9 significa SIG en el contexto empresarial?", opciones: ["Sistema Integrado de Gesti\u00f3n (calidad, ambiente, seguridad)", "Sistema de Informaci\u00f3n Geogr\u00e1fica", "Servicio de Internet Gratuito", "Sociedad de Inversi\u00f3n Global"], correcta: 0 },
            { id: 14, categoria: "SIG y Calidad", pregunta: "\u00bfQu\u00e9 es la mejora continua (PHVA)?", opciones: ["Ciclo Planificar, Hacer, Verificar, Actuar para optimizar procesos", "Un software de gesti\u00f3n", "Una norma contable", "Un tipo de contrato"], correcta: 0 },
            { id: 15, categoria: "SIG y Calidad", pregunta: "\u00bfQu\u00e9 es una no conformidad?", opciones: ["Incumplimiento de un requisito del sistema de gesti\u00f3n", "Un proveedor nuevo", "Un indicador positivo", "Una reuni\u00f3n de equipo"], correcta: 0 },
            { id: 16, categoria: "Gesti\u00f3n de Proyectos", pregunta: "\u00bfQu\u00e9 es el alcance de un proyecto?", opciones: ["El conjunto de entregables y trabajo definido para el proyecto", "El presupuesto total", "El n\u00famero de integrantes", "La fecha de inicio"], correcta: 0 },
            { id: 17, categoria: "Gesti\u00f3n de Proyectos", pregunta: "\u00bfQu\u00e9 herramienta se usa para planificar las tareas de un proyecto en el tiempo?", opciones: ["Diagrama de Gantt", "Hoja de n\u00f3mina", "Factura", "Acta de reuni\u00f3n"], correcta: 0 },
            { id: 18, categoria: "Gesti\u00f3n de Proyectos", pregunta: "\u00bfQu\u00e9 es un plan de acci\u00f3n?", opciones: ["Conjunto de tareas con responsables y fechas para lograr un objetivo", "Una lista de proveedores", "Un presupuesto anual", "Un contrato"], correcta: 0 },
            { id: 19, categoria: "Compras y Negociaci\u00f3n", pregunta: "En la negociaci\u00f3n con proveedores, el objetivo principal es:", opciones: ["Lograr la mejor relaci\u00f3n calidad-precio y condiciones favorables", "Pagar siempre el precio m\u00e1s alto", "Comprar solo lo m\u00e1s barato sin considerar calidad", "Evitar negociar"], correcta: 0 },
            { id: 20, categoria: "Compras y Negociaci\u00f3n", pregunta: "\u00bfQu\u00e9 es una licitaci\u00f3n o cotizaci\u00f3n comparativa?", opciones: ["Proceso de solicitar y comparar ofertas de varios proveedores", "Un pago anticipado", "Un contrato firmado", "Un inventario"], correcta: 0 },
            { id: 21, categoria: "An\u00e1lisis de Datos", pregunta: "En Excel, \u00bfqu\u00e9 herramienta permite resumir grandes vol\u00famenes de datos?", opciones: ["Tablas din\u00e1micas", "Copiar y pegar", "Guardar como PDF", "Negrita"], correcta: 0 },
            { id: 22, categoria: "An\u00e1lisis de Datos", pregunta: "\u00bfQu\u00e9 funci\u00f3n de Excel se usa para sumar bajo una condici\u00f3n?", opciones: ["SUMAR.SI", "BUSCARV", "CONCATENAR", "HOY"], correcta: 0 },
            { id: 23, categoria: "An\u00e1lisis de Datos", pregunta: "\u00bfQu\u00e9 es un gr\u00e1fico de tendencia?", opciones: ["Representaci\u00f3n visual de la evoluci\u00f3n de datos en el tiempo", "Un documento Word", "Una lista de tareas", "Un correo electr\u00f3nico"], correcta: 0 },
            { id: 24, categoria: "\u00c9tica Directiva", pregunta: "Ante informaci\u00f3n confidencial de la empresa, un jefe administrativo debe:", opciones: ["Protegerla y usarla solo para fines autorizados", "Compartirla con terceros", "Publicarla en redes", "Usarla para beneficio personal"], correcta: 0 }
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
    if (porcentaje >= 80) recomendacion = 'Excelente dominio t\u00e9cnico en gesti\u00f3n administrativa. Demuestra conocimiento s\u00f3lido en legislaci\u00f3n laboral, RRHH, indicadores, presupuesto y sistemas de gesti\u00f3n.';
    else if (porcentaje >= 65) recomendacion = 'Buen conocimiento t\u00e9cnico. Se recomienda reforzar las \u00e1reas con menor puntuaci\u00f3n mediante formaci\u00f3n espec\u00edfica.';
    else if (porcentaje >= 50) recomendacion = 'Conocimiento t\u00e9cnico b\u00e1sico. Requiere formaci\u00f3n estructurada en gesti\u00f3n administrativa y financiera.';
    else recomendacion = 'Conocimiento t\u00e9cnico insuficiente para el rol directivo. Se recomienda formaci\u00f3n integral antes de asumir la jefatura.';

    return {
        puntaje: aciertos, total: total, porcentaje: porcentaje,
        veredicto: veredicto, categorias: categorias, recomendacion: recomendacion
    };
}
