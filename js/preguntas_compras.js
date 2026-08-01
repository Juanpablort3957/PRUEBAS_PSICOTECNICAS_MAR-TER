var PREGUNTAS = {
    disc: {
        nombre: "Perfil DISC - Evaluaci\u00f3n Comportamental Asistente de Compras",
        descripcion: "Seleccione la opci\u00f3n que mejor lo describe. No hay respuestas correctas o incorrectas.",
        tiempo: 1200,
        preguntas: [
            { id: 1, dimensi: "D", pregunta: "Cuando un proveedor no entrega a tiempo y el frente de trabajo urge el material, yo:", opcionA: "Busco un proveedor alternativo inmediatamente y resuelvo", opcionB: "Reporto la novedad a mi supervisor y espero instrucciones", pesoA: 1, pesoB: 0 },
            { id: 2, dimensi: "D", pregunta: "Ante m\u00faltiples solicitudes de compra urgentes al mismo tiempo, prefiero:", opcionA: "Priorizar por mi criterio y resolver una por una r\u00e1pidamente", opcionB: "Preguntar a mi jefe cu\u00e1l debo atender primero", pesoA: 1, pesoB: 0 },
            { id: 3, dimensi: "D", pregunta: "Cuando un proveedor ofrece un precio m\u00e1s bajo pero sin factura formal, yo:", opcionA: "Rechazo la oferta y busco un proveedor formal as\u00ed sea m\u00e1s costoso", opcionB: "Consulto con mi supervisor si podemos aceptar esa cotizaci\u00f3n", pesoA: 1, pesoB: 0 },
            { id: 4, dimensi: "D", pregunta: "Si detecto que hay un error repetitivo en las \u00f3rdenes de compra del \u00e1rea:", opcionA: "Propongo un nuevo formato o proceso para evitar el error", opcionB: "Sigo las instrucciones actuales y se\u00f1alo el error cuando ocurra", pesoA: 1, pesoB: 0 },
            { id: 5, dimensi: "D", pregunta: "Cuando el almac\u00e9n reclama que los insumos llegaron incompletos, mi reacci\u00f3n es:", opcionA: "Llamar de inmediato al proveedor para exigir el despacho completo", opcionB: "Revisar primero la orden de compra y la remisi\u00f3n antes de actuar", pesoA: 1, pesoB: 0 },
            { id: 6, dimensi: "D", pregunta: "En d\u00edas de alto volumen de trabajo en compras, prefiero:", opcionA: "Acelerar el ritmo para sacar todo lo pendiente cuanto antes", opcionB: "Mantener mi ritmo habitual para no cometer errores", pesoA: 1, pesoB: 0 },
            { id: 7, dimensi: "I", pregunta: "Al contactar por tel\u00e9fono a un proveedor nuevo para solicitar cotizaci\u00f3n:", opcionA: "Me presento de forma amable, explico la necesidad y construyo relaci\u00f3n", opcionB: "Voy directo al punto: necesito cotizaci\u00f3n de estos \u00edtems", pesoA: 1, pesoB: 0 },
            { id: 8, dimensi: "I", pregunta: "Cuando un compa\u00f1ero de otro \u00e1rea necesita un material urgente:", opcionA: "Lo atiendo con amabilidad y le explico el proceso para agilizar su solicitud", opcionB: "Le indico que debe diligenciar el formato de solicitud primero", pesoA: 1, pesoB: 0 },
            { id: 9, dimensi: "I", pregunta: "En una reuni\u00f3n de \u00e1rea para revisar proveedores, prefiero:", opcionA: "Compartir mi experiencia con cada proveedor y sugerir mejoras", opcionB: "Presentar los datos objetivos de desempe\u00f1o de cada proveedor", pesoA: 1, pesoB: 0 },
            { id: 10, dimensi: "I", pregunta: "Cuando un proveedor se molesta por un reclamo de facturaci\u00f3n, yo:", opcionA: "Mantengo la calma, explico el motivo del reclamo y busco un acuerdo", opcionB: "Me remito estrictamente a lo que dice la orden de compra y la factura", pesoA: 1, pesoB: 0 },
            { id: 11, dimensi: "I", pregunta: "Al capacitar a un nuevo asistente en el \u00e1rea de compras:", opcionA: "Le explico los procesos con paciencia y lo motivo a hacer preguntas", opcionB: "Le entrego los procedimientos escritos para que los estudie", pesoA: 1, pesoB: 0 },
            { id: 12, dimensi: "I", pregunta: "Cuando debo pedirle a un proveedor que mejore sus tiempos de entrega:", opcionA: "Lo llamo, le explico la situaci\u00f3n y negociamos nuevos plazos", opcionB: "Le env\u00edo un correo formal indicando los nuevos requerimientos", pesoA: 1, pesoB: 0 },
            { id: 13, dimensi: "S", pregunta: "Con el archivo de \u00f3rdenes de compra del mes, prefiero:", opcionA: "Organizarlas por proveedor y fecha apenas llegan, sin acumular", opcionB: "Organizarlas cuando tenga un espacio entre otras tareas", pesoA: 1, pesoB: 0 },
            { id: 14, dimensi: "S", pregunta: "Cuando debo actualizar la base de datos de proveedores:", opcionA: "Lo hago peri\u00f3dicamente aunque sea una tarea repetitiva", opcionB: "La actualizo cuando hay cambios significativos en los contactos", pesoA: 1, pesoB: 0 },
            { id: 15, dimensi: "S", pregunta: "En el seguimiento semanal de despachos pendientes, prefiero:", opcionA: "Revisar toda la lista met\u00f3dicamente cada semana sin falta", opcionB: "Hacer seguimiento solo a los pedidos que est\u00e1n pr\u00f3ximos a vencer", pesoA: 1, pesoB: 0 },
            { id: 16, dimensi: "S", pregunta: "Cuando hay un cambio en el procedimiento de compras, yo:", opcionA: "Me adapto al nuevo procedimiento y lo sigo consistentemente", opcionB: "Aplico el nuevo procedimiento pero mantengo lo que funcionaba del anterior", pesoA: 1, pesoB: 0 },
            { id: 17, dimensi: "S", pregunta: "En la revisi\u00f3n mensual de facturas para enviar a contabilidad:", opcionA: "Prefiero hacerla en un bloque de tiempo dedicado, sin interrupciones", opcionB: "La hago entre otras tareas a lo largo del d\u00eda", pesoA: 1, pesoB: 0 },
            { id: 18, dimensi: "S", pregunta: "Cuando recibo una solicitud de compra incompleta o con errores:", opcionA: "La devuelvo con las correcciones necesarias y espero la versi\u00f3n correcta", opcionB: "La gestiono con la informaci\u00f3n disponible para no retrasar el proceso", pesoA: 1, pesoB: 0 },
            { id: 19, dimensi: "C", pregunta: "Al revisar una factura contra la orden de compra correspondiente:", opcionA: "Verifico cada \u00edtem, cantidad, precio unitario y total antes de aprobar", opcionB: "Reviso los totales y cantidades principales para agilizar el proceso", pesoA: 1, pesoB: 0 },
            { id: 20, dimensi: "C", pregunta: "Cuando registro una nueva orden de compra en el sistema:", opcionA: "Verifico dos veces cada campo antes de guardar: c\u00f3digo, cantidad, precio, proveedor", opcionB: "Registro la informaci\u00f3n principal y reviso al final del d\u00eda", pesoA: 1, pesoB: 0 },
            { id: 21, dimensi: "C", pregunta: "Al hacer una cotizaci\u00f3n en Excel para comparar proveedores:", opcionA: "Preparo una tabla detallada con f\u00f3rmulas, filtros y validaci\u00f3n de datos", opcionB: "Hago una comparaci\u00f3n r\u00e1pida con los datos principales de cada proveedor", pesoA: 1, pesoB: 0 },
            { id: 22, dimensi: "C", pregunta: "Cuando debo archivar documentos del \u00e1rea de compras:", opcionA: "Los organizo con un sistema claro de carpetas por proveedor, mes y tipo de documento", opcionB: "Los archivo en orden cronol\u00f3gico para encontrarlos f\u00e1cilmente despu\u00e9s", pesoA: 1, pesoB: 0 },
            { id: 23, dimensi: "C", pregunta: "Al preparar un informe de compras del mes para mi jefe:", opcionA: "Incluyo datos exactos, gr\u00e1ficos y an\u00e1lisis de cada categor\u00eda de compra", opcionB: "Presento un resumen con los datos m\u00e1s relevantes y las novedades", pesoA: 1, pesoB: 0 },
            { id: 24, dimensi: "C", pregunta: "Si encuentro una inconsistencia entre el inventario y las \u00f3rdenes de compra:", opcionA: "Investigo cada caso hasta encontrar la causa de la diferencia", opcionB: "Reporto la diferencia a mi supervisor para que defina c\u00f3mo proceder", pesoA: 1, pesoB: 0 }
        ]
    },
    tecnico: {
        nombre: "Evaluaci\u00f3n T\u00e9cnica - Asistente de Compras",
        descripcion: "Eval\u00faa tus conocimientos en gesti\u00f3n de compras, documentaci\u00f3n, Excel, proveedores y log\u00edstica de abastecimiento.",
        tiempo: 1440,
        preguntas: [
            { id: 1, categoria: "Gesti\u00f3n de Compras", pregunta: "\u00bfQu\u00e9 es una orden de compra?", opciones: ["Documento que formaliza la solicitud de bienes o servicios a un proveedor", "Lista de productos que necesita el almac\u00e9n", "Factura que emite el proveedor", "Solicitud interna de materiales"], correcta: 0 },
            { id: 2, categoria: "Gesti\u00f3n de Compras", pregunta: "\u00bfQu\u00e9 informaci\u00f3n debe contener una orden de compra?", opciones: ["Solo el precio total", "Descripci\u00f3n del producto, cantidad, precio unitario, datos del proveedor y condiciones de entrega", "Solo el nombre del proveedor y la fecha", "El logo de la empresa y la firma del gerente"], correcta: 1 },
            { id: 3, categoria: "Gesti\u00f3n de Compras", pregunta: "\u00bfCu\u00e1l es la diferencia entre una cotizaci\u00f3n y una orden de compra?", opciones: ["Son lo mismo con diferente nombre", "La cotizaci\u00f3n es informativa y la orden de compra es el compromiso formal de adquirir los bienes o servicios", "La orden de compra es una solicitud interna y la cotizaci\u00f3n es externa", "No hay diferencia"], correcta: 1 },
            { id: 4, categoria: "Documentaci\u00f3n y Archivo", pregunta: "\u00bfQu\u00e9 documentos deben archivarse juntos despu\u00e9s de completar una compra?", opciones: ["Solo la orden de compra", "Solicitud de compra, cotizaciones, orden de compra, remisi\u00f3n y factura", "Solo la factura del proveedor", "La cotizaci\u00f3n y la llamada telef\u00f3nica"], correcta: 1 },
            { id: 5, categoria: "Documentaci\u00f3n y Archivo", pregunta: "\u00bfQu\u00e9 es una remisi\u00f3n?", opciones: ["Documento que entrega el proveedor con los bienes despachados para que el comprador firme el recibido", "Una copia de la orden de compra", "La factura del proveedor", "Un correo electr\u00f3nico de confirmaci\u00f3n"], correcta: 0 },
            { id: 6, categoria: "Documentaci\u00f3n y Archivo", pregunta: "\u00bfPara qu\u00e9 sirve el cruce documental en compras?", opciones: ["Para decorar el archivo del \u00e1rea", "Para verificar que los bienes recibidos, la remisi\u00f3n, la orden de compra y la factura coincidan antes de enviar a contabilidad", "Para elegir al proveedor m\u00e1s barato", "Para calcular el IVA"], correcta: 1 },
            { id: 7, categoria: "Excel y Ofim\u00e1tica", pregunta: "En Excel, \u00bfqu\u00e9 funci\u00f3n se usa para buscar un valor en una tabla?", opciones: ["BUSCARV", "SUMA", "SI", "CONTAR"], correcta: 0 },
            { id: 8, categoria: "Excel y Ofim\u00e1tica", pregunta: "\u00bfQu\u00e9 es una tabla din\u00e1mica en Excel?", opciones: ["Una herramienta para resumir, analizar y presentar grandes vol\u00famenes de datos de forma interactiva", "Una tabla con colores", "Una hoja de c\u00e1lculo compartida", "Un gr\u00e1fico circular"], correcta: 0 },
            { id: 9, categoria: "Excel y Ofim\u00e1tica", pregunta: "\u00bfQu\u00e9 filtro en Excel permite mostrar solo los datos que cumplen ciertas condiciones?", opciones: ["Filtro avanzado / Autofiltro", "Negrita", "Guardar como PDF", "Copiar y pegar"], correcta: 0 },
            { id: 10, categoria: "Proveedores", pregunta: "\u00bfQu\u00e9 se debe solicitar primero a un proveedor nuevo antes de hacer una compra?", opciones: ["Su n\u00famero de celular personal", "Cotizaci\u00f3n formal con precios, tiempos de entrega y condiciones de pago", "Su n\u00famero de cuenta bancaria", "El nombre de su gerente"], correcta: 1 },
            { id: 11, categoria: "Proveedores", pregunta: "\u00bfPor qu\u00e9 es importante comparar al menos 3 cotizaciones antes de comprar?", opciones: ["Porque es obligatorio por ley en todas las compras", "Para obtener la mejor relaci\u00f3n calidad-precio y cumplir con pol\u00edticas de transparencia en compras", "Porque los proveedores lo exigen", "Para llenar m\u00e1s papeles en el archivo"], correcta: 1 },
            { id: 12, categoria: "Proveedores", pregunta: "\u00bfQu\u00e9 es una base de datos de proveedores?", opciones: ["Un registro organizado con informaci\u00f3n de contacto, productos, precios y condiciones de cada proveedor", "Una lista en un papel", "El directorio telef\u00f3nico de la ciudad", "Un programa de dise\u00f1o gr\u00e1fico"], correcta: 0 },
            { id: 13, categoria: "Log\u00edstica", pregunta: "\u00bfQu\u00e9 significa 'tiempo de entrega' o 'lead time' en compras?", opciones: ["El tiempo que tarda el \u00e1rea contable en pagar", "El per\u00edodo entre que se emite la orden de compra y se reciben los bienes", "La duraci\u00f3n de la llamada con el proveedor", "La fecha de vencimiento de la factura"], correcta: 1 },
            { id: 14, categoria: "Log\u00edstica", pregunta: "\u00bfQu\u00e9 es un seguimiento de despacho?", opciones: ["Perseguir al mensajero", "Verificar con el proveedor que los bienes fueron enviados y confirmar la fecha estimada de llegada", "Abrir las cajas cuando llegan", "Contar los productos en el almac\u00e9n"], correcta: 1 },
            { id: 15, categoria: "Log\u00edstica", pregunta: "\u00bfQu\u00e9 se debe hacer si un proveedor entrega productos incompletos o da\u00f1ados?", opciones: ["Aceptarlos y no decir nada", "Rechazar el despacho parcial, documentar la novedad en la remisi\u00f3n y notificar al proveedor para que complete o reponga", "Pagar solo la mitad de la factura", "Botar los productos y pedir nuevos"], correcta: 1 },
            { id: 16, categoria: "Facturaci\u00f3n", pregunta: "\u00bfQu\u00e9 diferencias debe tener una factura legal en Colombia?", opciones: ["Nombre, NIT, direcci\u00f3n, numeraci\u00f3n autorizada DIAN, fecha, descripci\u00f3n, valores y resoluci\u00f3n de facturaci\u00f3n", "Cualquier papel con un precio escrito", "Un correo electr\u00f3nico", "Una llamada telef\u00f3nica grabada"], correcta: 0 },
            { id: 17, categoria: "Facturaci\u00f3n", pregunta: "\u00bfQu\u00e9 verificaci\u00f3n debe hacerse antes de enviar una factura a contabilidad?", opciones: ["Revisar que coincida con la orden de compra y la remisi\u00f3n en cantidades, precios y datos del proveedor", "Solo ver el monto total", "Llamar al proveedor para preguntar", "Firmarla sin revisar"], correcta: 0 },
            { id: 18, categoria: "Facturaci\u00f3n", pregunta: "En el flujo de compras, \u00bfqu\u00e9 documento se genera primero?", opciones: ["La factura", "La solicitud de compra o requerimiento del \u00e1rea solicitante", "El pago al proveedor", "El comprobante de egreso"], correcta: 1 },
            { id: 19, categoria: "Sistemas", pregunta: "\u00bfQu\u00e9 funci\u00f3n tiene un sistema ERP (como SAP o Siigo) en el \u00e1rea de compras?", opciones: ["Solo enviar correos", "Integrar y gestionar las compras, inventarios, proveedores y contabilidad en un solo sistema", "Dise\u00f1ar logos de la empresa", "Ser un cat\u00e1logo de productos"], correcta: 1 },
            { id: 20, categoria: "Sistemas", pregunta: "Al registrar una orden de compra en un sistema, \u00bfqu\u00e9 dato es indispensable?", opciones: ["El color de la caja del producto", "El c\u00f3digo del producto o servicio, cantidad y precio unitario", "La hora exacta del registro", "La temperatura ambiente del d\u00eda"], correcta: 1 },
            { id: 21, categoria: "Atenci\u00f3n al Cliente Interno", pregunta: "\u00bfQu\u00e9 significa 'cliente interno' en el contexto de compras?", opciones: ["Un cliente que compra dentro de la empresa", "Las \u00e1reas o personas de la misma empresa que solicitan materiales o insumos al \u00e1rea de compras", "Un proveedor que tambi\u00e9n compra", "El gerente general de la empresa"], correcta: 1 },
            { id: 22, categoria: "Atenci\u00f3n al Cliente Interno", pregunta: "Cuando un frente de trabajo solicita un material urgente y no hay presupuesto aprobado, \u00bfqu\u00e9 debe hacer el asistente de compras?", opciones: ["Comprarlo con su dinero personal", "Informar al solicitante sobre el proceso de aprobaci\u00f3n requerido y escalar la urgencia a su supervisor", "Ignorar la solicitud", "Decir que no hay sin dar explicaci\u00f3n"], correcta: 1 },
            { id: 23, categoria: "\u00c9tica en Compras", pregunta: "\u00bfPor qu\u00e9 es importante la transparencia en el proceso de compras?", opciones: ["Para que los proveedores regalen cosas", "Para garantizar imparcialidad, evitar conflictos de inter\u00e9s y asegurar el mejor uso de los recursos de la empresa", "Porque es opcional", "Solo para cumplir con el gerente"], correcta: 1 },
            { id: 24, categoria: "\u00c9tica en Compras", pregunta: "Si un proveedor le ofrece un beneficio personal a cambio de elegir su cotizaci\u00f3n, \u00bfqu\u00e9 debe hacer?", opciones: ["Aceptarlo discretamente", "Rechazarlo y reportar la situaci\u00f3n a su supervisor, pues constituye un conflicto de inter\u00e9s", "Pedir m\u00e1s dinero", "Contarle a los compa\u00f1eros y aceptar entre todos"], correcta: 1 }
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
    if (porcentaje >= 80) recomendacion = 'Excelente dominio t\u00e9cnico en compras. Demuestra conocimiento s\u00f3lido en gesti\u00f3n documental, proveedores, Excel y proceso de abastecimiento.';
    else if (porcentaje >= 65) recomendacion = 'Buen conocimiento t\u00e9cnico en compras. Se recomienda reforzar las \u00e1reas con menor puntuaci\u00f3n.';
    else if (porcentaje >= 50) recomendacion = 'Conocimiento t\u00e9cnico b\u00e1sico. Requiere formaci\u00f3n en procesos de compras y herramientas ofim\u00e1ticas.';
    else recomendacion = 'Conocimiento t\u00e9cnico insuficiente. Se recomienda capacitaci\u00f3n integral antes de asumir responsabilidades en el \u00e1rea.';

    return {
        puntaje: aciertos, total: total, porcentaje: porcentaje,
        veredicto: veredicto, categorias: categorias, recomendacion: recomendacion
    };
}
