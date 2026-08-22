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
        descripcion: "Eval\u00faa tus conocimientos en legislaci\u00f3n laboral, gesti\u00f3n de RRHH, indicadores, presupuesto, SIG, proyectos y an\u00e1lisis de datos.",
        tiempo: 1440,
        preguntas: [
            { id: 1, categoria: "Legislaci\u00f3n Laboral", pregunta: "Con la Ley 2101 de 2021, la jornada laboral m\u00e1xima semanal se redujo progresivamente. \u00bfCu\u00e1l es el l\u00edmite vigente desde el 16 de julio de 2026?", opciones: ["44 horas semanales", "46 horas semanales", "42 horas semanales", "40 horas semanales"], correcta: 2 },
            { id: 2, categoria: "Legislaci\u00f3n Laboral", pregunta: "\u00bfQu\u00e9 valor debe consignar el empleador anualmente al fondo de cesant\u00edas por cada trabajador?", opciones: ["Medio mes de salario por a\u00f1o", "Un mes de salario por a\u00f1o trabajado", "15 d\u00edas de salario por a\u00f1o", "Dos meses de salario por a\u00f1o"], correcta: 1 },
            { id: 3, categoria: "Legislaci\u00f3n Laboral", pregunta: "Para un trabajador con contrato a t\u00e9rmino indefinido y m\u00e1s de un a\u00f1o de servicio, despedido sin justa causa, la indemnizaci\u00f3n legal es:", opciones: ["15 d\u00edas de salario por cada a\u00f1o", "20 d\u00edas de salario por cada a\u00f1o", "60 d\u00edas de salario fijos", "30 d\u00edas por el primer a\u00f1o y 20 d\u00edas adicionales por cada a\u00f1o subsiguiente"], correcta: 3 },
            { id: 4, categoria: "Gesti\u00f3n de RRHH", pregunta: "\u00bfQu\u00e9 t\u00e9cnica de selecci\u00f3n presenta la mayor validez predictiva del desempe\u00f1o laboral futuro?", opciones: ["Assessment center (pruebas situacionales con m\u00faltiples evaluadores)", "Entrevista no estructurada", "An\u00e1lisis grafol\u00f3gico", "\u00danicamente la verificaci\u00f3n de referencias"], correcta: 0 },
            { id: 5, categoria: "Gesti\u00f3n de RRHH", pregunta: "La evaluaci\u00f3n de desempe\u00f1o 360\u00b0 consiste en:", opciones: ["Evaluar solo al jefe inmediato", "Evaluar solo el cumplimiento de metas", "Recopilar retroalimentaci\u00f3n de superiores, pares, subordinados y autoevaluaci\u00f3n", "Calificar la puntualidad del empleado"], correcta: 2 },
            { id: 6, categoria: "Gesti\u00f3n de RRHH", pregunta: "Si una empresa con 100 empleados tuvo 15 retiros durante el a\u00f1o, \u00bfcu\u00e1l es su tasa de rotaci\u00f3n anual aproximada?", opciones: ["1.5%", "15%", "85%", "0.15%"], correcta: 1 },
            { id: 7, categoria: "Indicadores KPIs", pregunta: "La tasa de ausentismo se calcula como:", opciones: ["(Horas de ausencia / Horas programadas) x 100", "(Empleados ausentes / Empleados totales) x 100", "(D\u00edas perdidos / D\u00edas h\u00e1biles) sin multiplicar", "(Retiros / Promedio de empleados) x 100"], correcta: 0 },
            { id: 8, categoria: "Indicadores KPIs", pregunta: "La f\u00f3rmula est\u00e1ndar del \u00edndice de rotaci\u00f3n de personal es:", opciones: ["(Contrataciones / N\u00f3mina total) x 100", "(Ausencias / D\u00edas h\u00e1biles) x 100", "(Horas extra / Horas normales) x 100", "((Ingresos + Retiros) / 2) / Promedio de empleados x 100"], correcta: 3 },
            { id: 9, categoria: "Indicadores KPIs", pregunta: "Si el indicador de cumplimiento del presupuesto administrativo es 115%, esto significa que:", opciones: ["Se ahorr\u00f3 un 15% respecto a lo presupuestado", "Se gast\u00f3 un 15% m\u00e1s de lo presupuestado", "El presupuesto estaba mal formulado", "Se cumpli\u00f3 exactamente el presupuesto"], correcta: 1 },
            { id: 10, categoria: "Presupuesto", pregunta: "La compra de un nuevo servidor para la empresa se clasifica como:", opciones: ["Gasto operativo (OPEX)", "Costo de venta", "Inversi\u00f3n de capital (CAPEX) que se deprecia", "Pasivo circulante"], correcta: 2 },
            { id: 11, categoria: "Presupuesto", pregunta: "Una variaci\u00f3n presupuestal negativa en gastos indica que:", opciones: ["Se gast\u00f3 menos de lo presupuestado (favorable)", "Se gast\u00f3 m\u00e1s de lo presupuestado", "El presupuesto no se formul\u00f3", "No hay informaci\u00f3n suficiente"], correcta: 0 },
            { id: 12, categoria: "Presupuesto", pregunta: "\u00bfCu\u00e1l es la diferencia clave entre el estado de resultados y el flujo de caja?", opciones: ["Son id\u00e9nticos", "El estado de resultados usa causaci\u00f3n y el flujo de caja registra movimientos reales de efectivo", "El flujo de caja es solo para bancos", "El estado de resultados no incluye gastos"], correcta: 3 },
            { id: 13, categoria: "SIG y Calidad", pregunta: "La diferencia entre acci\u00f3n correctiva y acci\u00f3n preventiva es:", opciones: ["Son lo mismo", "La correctiva elimina la causa de una no conformidad detectada; la preventiva evita que ocurra", "La preventiva es m\u00e1s costosa", "La correctiva solo aplica a calidad"], correcta: 1 },
            { id: 14, categoria: "SIG y Calidad", pregunta: "Seg\u00fan ISO 9001, la auditor\u00eda interna debe realizarse:", opciones: ["Solo cuando hay problemas", "Cada 5 a\u00f1os", "A intervalos planificados seg\u00fan la criticidad de los procesos", "\u00danicamente por auditores externos"], correcta: 2 },
            { id: 15, categoria: "SIG y Calidad", pregunta: "Una no conformidad mayor en una auditor\u00eda se caracteriza por:", opciones: ["Incumplimiento que afecta significativamente la eficacia del sistema de gesti\u00f3n", "Un error menor de digitaci\u00f3n", "Una observaci\u00f3n de mejora", "Un comentario informal del auditor"], correcta: 0 },
            { id: 16, categoria: "Gesti\u00f3n de Proyectos", pregunta: "En gesti\u00f3n de proyectos, la ruta cr\u00edtica es:", opciones: ["El camino m\u00e1s corto del proyecto", "La secuencia de tareas que determina la duraci\u00f3n m\u00ednima total del proyecto", "El listado de tareas m\u00e1s costosas", "Las tareas de menor prioridad"], correcta: 3 },
            { id: 17, categoria: "Gesti\u00f3n de Proyectos", pregunta: "La 'triple restricci\u00f3n' de un proyecto se refiere a:", opciones: ["Proveedores, clientes y empleados", "Alcance, tiempo y costo, interrelacionados", "Inicio, desarrollo y cierre", "Planificar, ejecutar y controlar"], correcta: 2 },
            { id: 18, categoria: "Gesti\u00f3n de Proyectos", pregunta: "La diferencia entre un riesgo y un problema en un proyecto es:", opciones: ["No hay diferencia", "El riesgo es un evento futuro incierto; el problema ya ocurri\u00f3", "El problema es m\u00e1s leve que el riesgo", "El riesgo siempre es negativo"], correcta: 1 },
            { id: 19, categoria: "Compras y Negociaci\u00f3n", pregunta: "Para seleccionar un proveedor mediante evaluaci\u00f3n ponderada, se debe:", opciones: ["Elegir siempre al m\u00e1s barato", "Elegir al proveedor m\u00e1s antiguo", "Solicitar m\u00e1s de tres cotizaciones sin criterio", "Asignar pesos a criterios (precio, calidad, entrega) y comparar puntajes totales"], correcta: 3 },
            { id: 20, categoria: "Compras y Negociaci\u00f3n", pregunta: "En negociaci\u00f3n, BATNA significa:", opciones: ["La mejor alternativa a un acuerdo negociado (Best Alternative To a Negotiated Agreement)", "El precio m\u00e1s bajo posible", "Un tipo de contrato", "El proveedor preferido"], correcta: 0 },
            { id: 21, categoria: "Compras y Negociaci\u00f3n", pregunta: "En una licitaci\u00f3n, el criterio de selecci\u00f3n m\u00e1s completo para elegir proveedor es:", opciones: ["Solo el precio m\u00e1s bajo", "El proveedor m\u00e1s cercano", "Evaluaci\u00f3n integral: precio, calidad, plazo, solvencia y cumplimiento", "El proveedor con m\u00e1s publicidad"], correcta: 2 },
            { id: 22, categoria: "An\u00e1lisis de Datos", pregunta: "Para buscar un valor en una tabla usando dos o m\u00e1s criterios simult\u00e1neamente en Excel, la mejor opci\u00f3n es:", opciones: ["BUSCARV simple", "Combinar INDEX y COINCIDIR o usar SUMAR.SI.CONJUNTO", "Solo filtrar manualmente", "Usar CONTAR"], correcta: 1 },
            { id: 23, categoria: "An\u00e1lisis de Datos", pregunta: "\u00bfQu\u00e9 ventaja tiene una tabla din\u00e1mica frente a f\u00f3rmulas manuales para informes gerenciales?", opciones: ["Es m\u00e1s lenta", "No permite c\u00e1lculos", "Solo funciona en Mac", "Permite resumir, segmentar y actualizar grandes vol\u00famenes de datos de forma flexible"], correcta: 3 },
            { id: 24, categoria: "An\u00e1lisis de Datos", pregunta: "Una desviaci\u00f3n est\u00e1ndar alta en los tiempos de entrega de un proveedor indica:", opciones: ["Alta variabilidad e inconsistencia en los tiempos de entrega", "Entregas siempre puntuales", "Proveedor de bajo costo", "No hay datos suficientes"], correcta: 0 }
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
