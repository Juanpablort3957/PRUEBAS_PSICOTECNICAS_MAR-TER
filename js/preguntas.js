const PREGUNTAS = {
    disc: {
        nombre: "Perfil DISC - Evaluación Comportamental HSEQ",
        descripcion: "Seleccione la opción que mejor lo describe. No hay respuestas correctas o incorrectas.",
        tiempo: 1200,
        preguntas: [
            {
                id: 1,
                dimensi: "D",
                pregunta: "Cuando detecto una condición insegura en campo, prefiero:",
                opcionA: "Detener la actividad inmediatamente y tomar control de la situación",
                opcionB: "Reportarlo y esperar instrucciones de mi superior",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 2,
                dimensi: "D",
                pregunta: "Ante una emergencia o incidente grave, mi reacción es:",
                opcionA: "Tomar el mando y coordinar la respuesta",
                opcionB: "Seguir el protocolo establecido sin desviarme",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 3,
                dimensi: "D",
                pregunta: "Cuando un trabajador se niega a usar EPP, yo:",
                opcionA: "Soy firme y hago respetar la norma sin excepción",
                opcionB: "Dialogo para entender sus razones y busco un acuerdo",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 4,
                dimensi: "D",
                pregunta: "En mi labor HSEQ, los resultados en seguridad:",
                opcionA: "Deben lograrse aunque implique medidas drásticas",
                opcionB: "Son importantes pero deben equilibrarse con el clima laboral",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 5,
                dimensi: "D",
                pregunta: "Cuando lidero una investigación de incidentes, prefiero:",
                opcionA: "Dirigir el proceso y tomar decisiones rápidas",
                opcionB: "Recopilar toda la información antes de concluir",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 6,
                dimensi: "D",
                pregunta: "Al enfrentar presión por producción vs. seguridad, yo:",
                opcionA: "Defiendo la seguridad ante todo, sin ceder",
                opcionB: "Busco un punto medio que permita avanzar con control",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 7,
                dimensi: "I",
                pregunta: "Al dictar una capacitación en SST, me siento:",
                opcionA: "Cómodo y motivado, me gusta enseñar y persuadir",
                opcionB: "Prefiero preparar materiales y dejar que otros expongan",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 8,
                dimensi: "I",
                pregunta: "En reuniones HSEQ con equipos operativos, mi fuerte es:",
                opcionA: "Comunicar con entusiasmo y motivar el cambio de actitud",
                opcionB: "Presentar datos técnicos y análisis objetivos",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 9,
                dimensi: "I",
                pregunta: "Para lograr una cultura de seguridad, considero clave:",
                opcionA: "La comunicación constante y la influencia interpersonal",
                opcionB: "Los procedimientos escritos y los controles estrictos",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 10,
                dimensi: "I",
                pregunta: "Al coordinar con supervisores y residentes de obra, yo:",
                opcionA: "Establezco relaciones cercanas para facilitar la gestión",
                opcionB: "Me baso en informes formales y canales oficiales",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 11,
                dimensi: "I",
                pregunta: "En términos de relacionamiento con personal operativo:",
                opcionA: "Soy abierto, accesible y me integro fácilmente",
                opcionB: "Soy reservado pero respetuoso, manteniendo distancia profesional",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 12,
                dimensi: "I",
                pregunta: "Cuando necesito que adopten una nueva medida de seguridad:",
                opcionA: "Uso mi capacidad de persuasión para convencerlos",
                opcionB: "Me apoyo en la autoridad de la norma y la jerarquía",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 13,
                dimensi: "S",
                pregunta: "Al realizar inspecciones de seguridad recurrentes, yo:",
                opcionA: "Soy constante y metódico, sigo siempre el mismo estándar",
                opcionB: "Me adapto según las condiciones del día y el lugar",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 14,
                dimensi: "S",
                pregunta: "Cuando los procedimientos HSEQ cambian frecuentemente:",
                opcionA: "Me cuesta adaptarme, prefiero procesos estables",
                opcionB: "Me ajusto rápido y busco implementar los cambios",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 15,
                dimensi: "S",
                pregunta: "En trabajo de campo en zonas operativas por largos períodos:",
                opcionA: "Mantengo el compromiso y la constancia sin problema",
                opcionB: "Prefiero variedad de lugares y tareas diferentes",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 16,
                dimensi: "S",
                pregunta: "Al hacer seguimiento a planes de acción correctivos:",
                opcionA: "Doy seguimiento paciente y constante hasta el cierre",
                opcionB: "Prefiero resolver rápido y pasar a lo siguiente",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 17,
                dimensi: "S",
                pregunta: "Mi estilo de trabajo en HSEQ es predominantemente:",
                opcionA: "Consistente, confiable, con rutinas bien establecidas",
                opcionB: "Dinámico, versátil, adaptándome a cada situación",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 18,
                dimensi: "S",
                pregunta: "Cuando realizo auditorías o verificaciones, prefiero:",
                opcionA: "Tomarme el tiempo necesario para revisar a fondo",
                opcionB: "Ser eficiente y cubrir la mayor cantidad de puntos",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 19,
                dimensi: "C",
                pregunta: "Al elaborar informes HSEQ, mi prioridad es:",
                opcionA: "Que sean precisos, detallados y sin errores",
                opcionB: "Que sean claros y prácticos, sin tanto detalle",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 20,
                dimensi: "C",
                pregunta: "Sobre el cumplimiento de normas ISO y legales:",
                opcionA: "Debe cumplirse al pie de la letra, sin excepciones",
                opcionB: "Hay que cumplirlas pero con sentido práctico",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 21,
                dimensi: "C",
                pregunta: "Al identificar peligros y valorar riesgos, yo:",
                opcionA: "Soy exhaustivo, revisando cada detalle minuciosamente",
                opcionB: "Identifico lo principal y avanzo a la acción",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 22,
                dimensi: "C",
                pregunta: "Sobre la gestión documental y registros HSEQ:",
                opcionA: "Mantengo todo ordenado, actualizado y trazable",
                opcionB: "Lo gestiono de forma funcional, sin obsesionarme",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 23,
                dimensi: "C",
                pregunta: "Al verificar permisos de trabajo de alto riesgo:",
                opcionA: "Reviso cada detalle antes de autorizar",
                opcionB: "Confío en la palabra del supervisor a cargo",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 24,
                dimensi: "C",
                pregunta: "Mi enfoque hacia los indicadores de accidentalidad es:",
                opcionA: "Analizarlos con rigor estadístico y detalles completos",
                opcionB: "Revisar las tendencias generales y tomar acción",
                pesoA: 1,
                pesoB: 0
            }
        ]
    },
    tecnico: {
        nombre: "Evaluación Técnica SIG - Conocimientos HSEQ",
        descripcion: "Seleccione la respuesta correcta para cada pregunta de conocimiento técnico en Sistemas Integrados de Gestión.",
        tiempo: 1800,
        preguntas: [
            {
                id: 1,
                categoria: "Legislación SST",
                pregunta: "¿Qué decreto unifica y reglamenta el Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST) en Colombia?",
                opciones: ["Resolución 2400 de 1979", "Ley 1562 de 2012", "Decreto 1072 de 2015", "Decreto 472 de 2015"],
                correct: 2,
                retroalimentacion: "El Decreto 1072 de 2015 es el Decreto Único Reglamentario del Sector Trabajo y consolida el SG-SST en el Libro 2, Parte 2, Título 4, Capítulo 6."
            },
            {
                id: 2,
                categoria: "Legislación SST",
                pregunta: "La Resolución 0312 de 2019 define los Estándares Mínimos del SG-SST. ¿A qué tipo de empresa aplica el estándar más completo (60 estándares)?",
                opciones: ["Empresas con 10 o más trabajadores, riesgo I y II", "Toda empresa independiente de su tamaño", "Empresas con más de 50 trabajadores y riesgo III, IV o V", "Solo empresas del sector industrial"],
                correct: 2,
                retroalimentacion: "Las empresas con más de 50 trabajadores clasificadas en riesgo III, IV o V deben cumplir los 60 estándares mínimos definidos por la Resolución 0312 de 2019."
            },
            {
                id: 3,
                categoria: "Legislación SST",
                pregunta: "Según la normatividad colombiana, ¿con qué periodicidad mínima debe revisarse el SG-SST por parte de la alta dirección?",
                opciones: ["Cada 6 meses", "Cada 2 años", "Solo cuando ocurre un accidente grave", "Anualmente"],
                correct: 3,
                retroalimentacion: "El Decreto 1072 de 2015 establece que la alta dirección debe revisar el SG-SST al menos una vez al año."
            },
            {
                id: 4,
                categoria: "Legislación SST",
                pregunta: "¿Cuál de las siguientes normas ISO corresponde al Sistema de Gestión de Seguridad y Salud en el Trabajo?",
                opciones: ["ISO 9001:2015", "ISO 45001:2018", "ISO 14001:2015", "ISO 31000:2018"],
                correct: 1,
                retroalimentacion: "ISO 45001:2018 es la norma internacional para Sistemas de Gestión de Seguridad y Salud en el Trabajo, reemplazando a OHSAS 18001."
            },
            {
                id: 5,
                categoria: "Gestión de Peligros y Riesgos",
                pregunta: "Según la GTC-45, ¿cuál es la fórmula para determinar el nivel de riesgo?",
                opciones: ["NR = Probabilidad + Consecuencia", "NR = Nivel de probabilidad × Nivel de consecuencia", "NR = Nivel de deficiencia × Nivel de exposición", "NR = Frecuencia × Gravedad × Exposición"],
                correct: 1,
                retroalimentacion: "Según la GTC-45, el Nivel de Riesgo = Nivel de Probabilidad × Nivel de Consecuencia."
            },
            {
                id: 6,
                categoria: "Gestión de Peligros y Riesgos",
                pregunta: "En la jerarquía de controles para la mitigación de riesgos laborales, ¿cuál es el control de mayor eficacia?",
                opciones: ["Elementos de Protección Personal (EPP)", "Eliminación del peligro", "Controles administrativos", "Sustitución del agente peligroso"],
                correct: 1,
                retroalimentacion: "La jerarquía de controles establece que la Eliminación del peligro es el control más efectivo, seguido de Sustitución, Controles de ingeniería, Administrativos y EPP."
            },
            {
                id: 7,
                categoria: "Gestión de Peligros y Riesgos",
                pregunta: "Un trabajador realiza labores de carga y descarga en un puerto fluvial durante 8 horas diarias. ¿Cuál es la clasificación de peligro primaria que debe identificarse?",
                opciones: ["Peligro químico por combustibles", "Peligro locativo por superficies irregulares", "Peligro psicosocial por trabajo monótono", "Peligro biomecánico por manipulación manual de cargas"],
                correct: 3,
                retroalimentacion: "La manipulación manual de cargas durante jornadas prolongadas constituye el peligro biomecánico principal."
            },
            {
                id: 8,
                categoria: "Gestión de Peligros y Riesgos",
                pregunta: "¿Qué documento formaliza la autorización para ejecutar actividades de alto riesgo como trabajo en alturas, espacios confinados o trabajo en caliente?",
                opciones: ["Permiso de trabajo", "Acta de inspección de seguridad", "Plan de emergencias", "Procedimiento operativo estándar"],
                correct: 0,
                retroalimentacion: "El Permiso de Trabajo es el documento formal que autoriza la ejecución de actividades de alto riesgo."
            },
            {
                id: 9,
                categoria: "Gestión Ambiental",
                pregunta: "Según ISO 14001:2015, ¿cuál es el propósito principal de identificar los aspectos e impactos ambientales de una organización?",
                opciones: ["Cumplir con los requisitos legales mínimos", "Calcular la huella de carbono corporativa", "Obtener la certificación ambiental ante autoridades", "Determinar los aspectos ambientales significativos para establecer controles"],
                correct: 3,
                retroalimentacion: "ISO 14001:2015 requiere identificar aspectos e impactos para determinar cuáles son significativos y establecer controles."
            },
            {
                id: 10,
                categoria: "Gestión Ambiental",
                pregunta: "En el contexto de operaciones marítimas/fluviales, ¿cuál de los siguientes constituye un aspecto ambiental significativo?",
                opciones: ["Generación de ruido en oficinas administrativas", "Consumo de papel en área administrativa", "Uso de iluminación LED en bodegas", "Descarga de aguas de sentina sin tratamiento al río"],
                correct: 3,
                retroalimentacion: "La descarga de aguas de sentina sin tratamiento constituye un aspecto ambiental significativo con alto impacto sobre los ecosistemas acuáticos."
            },
            {
                id: 11,
                categoria: "Calidad y Gestión Documental",
                pregunta: "Según ISO 9001:2015, ¿qué término reemplaza a 'registros' y 'documentos' de versiones anteriores?",
                opciones: ["Evidencias objetivas", "Procedimientos documentados", "Información documentada", "Registros de calidad"],
                correct: 2,
                retroalimentacion: "ISO 9001:2015 unifica los conceptos bajo el término 'Información documentada'."
            },
            {
                id: 12,
                categoria: "Calidad y Gestión Documental",
                pregunta: "Al realizar una auditoría interna del SIG, un auditor detecta que un procedimiento vigente no corresponde a la práctica real del proceso. ¿Cuál es la acción correcta inmediata?",
                opciones: ["Ignorarlo si no ha causado accidentes", "Registrar el hallazgo como no conformidad y abrir un plan de acción", "Reemplazar el procedimiento sin documentar el cambio", "Informar verbalmente al jefe y esperar instrucciones"],
                correct: 1,
                retroalimentacion: "Un procedimiento desactualizado frente a la práctica real es una no conformidad que requiere plan de acción correctiva."
            },
            {
                id: 13,
                categoria: "Calidad y Gestión Documental",
                pregunta: "¿Cuál es el indicador más adecuado para medir el desempeño en Seguridad y Salud en el Trabajo en términos de accidentalidad?",
                opciones: ["Tasa de Frecuencia de Accidentalidad (TFA)", "Número total de trabajadores capacitados", "Porcentaje de EPP entregados", "Número de inspecciones realizadas"],
                correct: 0,
                retroalimentacion: "La TFA = (N° accidentes × 240.000) / HHT es el indicador estándar de accidentalidad."
            },
            {
                id: 14,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "Durante una inspección en una embarcación, un trabajador reporta que su chaleco salvavidas está en mal estado. ¿Cuál es la acción prioritaria del Analista SIG?",
                opciones: ["Registrar el hallazgo para incluirlo en el próximo informe mensual", "Indicar al trabajador que use el chaleco con cuidado hasta conseguir uno nuevo", "Notificar al supervisor por correo electrónico y esperar respuesta", "Suspender la actividad hasta reponer el EPP y documentar el reemplazo"],
                correct: 3,
                retroalimentacion: "El chaleco es EPP crítico en operaciones fluviales; se debe suspender la actividad y reponer el equipo inmediatamente."
            },
            {
                id: 15,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "Un contratista externo inicia labores sin haber presentado el plan de gestión de residuos peligrosos. ¿Qué debe hacer el Analista SIG?",
                opciones: ["Detener el inicio de actividades hasta cumplir el estándar de contratistas", "Permitir el inicio y solicitar el documento durante la semana", "Verificar si el contratista tiene experiencia previa antes de decidir", "Solicitar al área de compras que gestione el documento"],
                correct: 0,
                retroalimentacion: "Los estándares mínimos de seguridad de contratistas son requisito previo al inicio de obras."
            },
            {
                id: 16,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "Se presenta un accidente laboral leve en campo. ¿Cuál es la secuencia correcta de acciones según el protocolo de investigación?",
                opciones: ["Atender al lesionado, asegurar la escena, reportar, investigar y emitir plan de acción", "Fotografiar, reportar a la ARL, investigar causas, emitir plan de acción", "Esperar la visita de la ARL antes de tomar cualquier acción", "Investigar inmediatamente y reportar solo si hay recurrencia"],
                correct: 0,
                retroalimentacion: "El protocolo correcto: (1) Atención médica, (2) Asegurar escena, (3) Reporte a ARL, (4) Investigación, (5) Plan de acción."
            },
            {
                id: 17,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "¿Qué característica es fundamental en el liderazgo técnico del Analista SIG al dirigir capacitaciones al personal operativo portuario?",
                opciones: ["Adaptar el lenguaje al nivel del personal y validar la comprensión con ejercicios prácticos", "Usar terminología técnica avanzada para demostrar experticia", "Centrar las capacitaciones exclusivamente en la normatividad legal", "Delegar la capacitación a supervisores para optimizar tiempo"],
                correct: 0,
                retroalimentacion: "La comunicación asertiva y adaptada al nivel del receptor es clave en SST."
            },
            {
                id: 18,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "Un indicador de ausentismo muestra un incremento del 40% en el último trimestre. ¿Cuál es la interpretación y acción más adecuada?",
                opciones: ["Es normal en temporada de lluvia, no requiere acción", "Reportarlo al gerente sin análisis adicional", "Indica posibles condiciones de trabajo inadecuadas; se debe analizar causas y proponer mejoras", "Reducir las incapacidades aprobadas para bajar el indicador"],
                correct: 2,
                retroalimentacion: "Un incremento significativo en ausentismo es una señal de alerta sobre condiciones de trabajo o salud ocupacional."
            },
            {
                id: 19,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "En el contexto de actividades de alto riesgo en operaciones fluviales, ¿qué es un ATS (Análisis de Trabajo Seguro)?",
                opciones: ["Una técnica que descompone una tarea en pasos para identificar peligros en cada paso antes de ejecutarla", "Un examen médico previo al trabajo en embarcaciones", "El registro de los accidentes ocurridos durante trabajos fluviales", "El formato de inspección de embarcaciones exigido por la DIMAR"],
                correct: 0,
                retroalimentacion: "El ATS es una herramienta preventiva que desglosa una tarea en pasos, identifica peligros y define controles."
            },
            {
                id: 20,
                categoria: "Competencias y Situaciones Prácticas",
                pregunta: "¿Con qué frecuencia mínima deben realizarse los exámenes médicos ocupacionales periódicos según la normatividad colombiana?",
                opciones: ["Cada año para todos los trabajadores sin distinción", "Solo al ingreso y al retiro del trabajador", "Cada 2 años para riesgo I y II; cada año para riesgo III, IV y V", "Cuando el trabajador lo solicite voluntariamente"],
                correct: 2,
                retroalimentacion: "La Resolución 2346 de 2007 establece la periodicidad según el nivel de riesgo: anual para III-V y cada 2 años para I-II."
            },
            {
                id: 21,
                categoria: "Legislación SST",
                pregunta: "Según la Ley 1562 de 2012, ¿cómo se define accidente de trabajo?",
                opciones: ["Es toda lesión que sufra el trabajador durante su jornada laboral", "Es todo suceso repentino que sobrevenga por causa del trabajo y produzca lesión orgánica o funcional", "Es cualquier enfermedad diagnosticada por un médico", "Es toda incapacidad que genere más de 3 días de ausencia"],
                correct: 1,
                retroalimentacion: "La Ley 1562 de 2012 define accidente de trabajo como todo suceso repentino que sobrevenga por causa del trabajo y produzca lesión."
            },
            {
                id: 22,
                categoria: "Gestión de Peligros y Riesgos",
                pregunta: "¿Cuál es el objetivo principal del COPASST (Comité Paritario de Seguridad y Salud en el Trabajo)?",
                opciones: ["Aprobar el presupuesto anual de SST", "Contratar la ARL para la empresa", "Investigar accidentes y promover la salud ocupacional en la empresa", "Elaborar las nóminas del personal operativo"],
                correct: 2,
                retroalimentacion: "El COPASST tiene como función principal la promoción y vigilancia de las normas de seguridad y salud en el trabajo."
            },
            {
                id: 23,
                categoria: "Gestión Ambiental",
                pregunta: "Según la legislación colombiana, ¿cómo debe gestionarse un residuo peligroso generado en mantenimiento de embarcaciones?",
                opciones: ["Almacenarlo junto con residuos ordinarios para optimizar espacio", "Almacenarlo en recipientes rotulados, etiquetados y entregarlo a gestor autorizado", "Disponerlo en el relleno sanitario municipal", "Verterlo al alcantarillado con abundante agua"],
                correct: 1,
                retroalimentacion: "Los residuos peligrosos (RESPEL) requieren almacenamiento segregado, rotulado y disposición a través de gestores autorizados."
            },
            {
                id: 24,
                categoria: "Calidad y Gestión Documental",
                pregunta: "En un Sistema de Gestión Integrado (SIG), ¿qué significa el enfoque basado en procesos?",
                opciones: ["Documentar todos los procedimientos de la empresa", "Gestionar las actividades como procesos interrelacionados que transforman entradas en salidas", "Tener un organigrama jerárquico bien definido", "Certificar todos los procesos ante una entidad acreditada"],
                correct: 1,
                retroalimentacion: "El enfoque basado en procesos (ISO 9001, ISO 14001, ISO 45001) permite gestionar las actividades como procesos interrelacionados."
            }
        ]
    }
};

const SECUENCIA_PRUEBAS = ['disc', 'tecnico'];

function obtenerPrueba(clave) {
    return PREGUNTAS[clave];
}

function obtenerTotalPreguntas(clave) {
    return PREGUNTAS[clave].preguntas.length;
}

const REQUISITOS_CARGO = {
    conocimientoNormativo: { dimensiones: ['C', 'S'], peso: 1.0 },
    liderazgoSeguridad: { dimensiones: ['D', 'I'], peso: 1.0 },
    gestionSST: { dimensiones: ['C', 'S'], peso: 1.0 },
    comunicacionRiesgos: { dimensiones: ['I', 'S'], peso: 1.0 },
    investigacionIncidentes: { dimensiones: ['C', 'D'], peso: 0.9 },
    trabajoCampo: { dimensiones: ['D', 'S'], peso: 0.8 },
    capacitacionSST: { dimensiones: ['I', 'C'], peso: 0.9 },
    gestionAmbiental: { dimensiones: ['C', 'S'], peso: 0.9 },
    auditoriaVerificacion: { dimensiones: ['C', 'D'], peso: 1.0 },
    cumplimientoLegal: { dimensiones: ['C', 'S'], peso: 1.0 }
};

const CATEGORIAS_TECNICO = {
    legislacionSST: { label: 'Legislación SST', preguntas: [1,2,3,4,21] },
    gestionPeligros: { label: 'Gestión de Peligros y Riesgos', preguntas: [5,6,7,8,22] },
    gestionAmbiental: { label: 'Gestión Ambiental', preguntas: [9,10,23] },
    calidadDocumental: { label: 'Calidad y Gestión Documental', preguntas: [11,12,13,24] },
    competenciasPracticas: { label: 'Competencias y Situaciones Prácticas', preguntas: [14,15,16,17,18,19,20] }
};

function analizarPerfilDISC(puntuaciones) {
    const analisis = {
        perfiles: {},
        percentiles: {},
        estilo: '',
        fortalezas: [],
        areasDesarrollo: [],
        compatibilidad: {},
        recomendacion: ''
    };
    
    const maximoPorDimension = 6;
    
    Object.keys(puntuaciones).forEach(dim => {
        const puntuacion = puntuaciones[dim];
        const percentil = Math.round((puntuacion / maximoPorDimension) * 100);
        analisis.percentiles[dim] = percentil;
        
        if (percentil >= 75) {
            analisis.perfiles[dim] = 'Alto';
        } else if (percentil >= 55) {
            analisis.perfiles[dim] = 'Medio-Alto';
        } else if (percentil >= 40) {
            analisis.perfiles[dim] = 'Medio';
        } else {
            analisis.perfiles[dim] = 'Bajo';
        }
    });
    
    const d = puntuaciones.D || 0;
    const i = puntuaciones.I || 0;
    const s = puntuaciones.S || 0;
    const c = puntuaciones.C || 0;
    
    if (d >= 4 && c >= 4 && s >= 3) {
        analisis.estilo = 'Líder en Seguridad';
        analisis.descripcionEstilo = 'Combina autoridad para hacer cumplir normas con rigor técnico. Ideal para coordinar equipos HSEQ y garantizar cumplimiento normativo en operaciones de alto riesgo.';
    } else if (c >= 4 && s >= 4 && d < 3 && i < 3) {
        analisis.estilo = 'Inspector Metódico';
        analisis.descripcionEstilo = 'Excelente para seguimiento de procedimientos, gestión documental y auditorías. Prioriza la precisión y el cumplimiento de estándares.';
    } else if (i >= 4 && s >= 4 && d < 3 && c < 3) {
        analisis.estilo = 'Facilitador HSEQ';
        analisis.descripcionEstilo = 'Gran habilidad para capacitar, comunicar riesgos y generar cultura de seguridad. Ideal para trabajo con personal operativo y programas de formación.';
    } else if (d >= 4 && i >= 4 && c >= 3) {
        analisis.estilo = 'Transformador en Seguridad';
        analisis.descripcionEstilo = 'Lidera cambios culturales en seguridad con determinación y capacidad de persuasión. Ideal para implementar nuevos sistemas de gestión.';
    } else if (d >= 3 && i >= 3 && s >= 3 && c >= 3) {
        analisis.estilo = 'Integral HSEQ';
        analisis.descripcionEstilo = 'Perfil versátil y equilibrado. Puede desempeñarse en múltiples frentes del SG-SST con adaptabilidad a diferentes contextos operativos.';
    } else if (c >= 4 && d >= 3) {
        analisis.estilo = 'Técnico Normativo';
        analisis.descripcionEstilo = 'Sólido conocimiento de normativas y capacidad para hacerlas cumplir. Enfoque en legislación, estándares ISO y control documental.';
    } else if (d >= 4 && s >= 3) {
        analisis.estilo = 'Operador de Campo';
        analisis.descripcionEstilo = 'Cómodo en terreno y trabajo operativo. Toma decisiones rápidas en campo y mantiene constancia en el seguimiento.';
    } else {
        analisis.estilo = 'Perfil en Desarrollo HSEQ';
        analisis.descripcionEstilo = 'No encaja en los perfiles típicos HSEQ. Se requiere evaluación adicional para determinar su idoneidad para el cargo.';
    }
    
    if (analisis.percentiles.D >= 55) analisis.fortalezas.push('Liderazgo en seguridad y toma de decisiones bajo presión');
    if (analisis.percentiles.I >= 55) analisis.fortalezas.push('Comunicación efectiva para capacitación y sensibilización en SST');
    if (analisis.percentiles.S >= 55) analisis.fortalezas.push('Constancia en seguimiento de planes de acción y procesos HSEQ');
    if (analisis.percentiles.C >= 55) analisis.fortalezas.push('Atención al detalle normativo, gestión documental y cumplimiento legal');
    
    if (analisis.percentiles.D < 40) analisis.areasDesarrollo.push('Capacidad de autoridad y firmeza para hacer cumplir normas de seguridad');
    if (analisis.percentiles.I < 40) analisis.areasDesarrollo.push('Habilidades de comunicación y capacitación en SST');
    if (analisis.percentiles.S < 40) analisis.areasDesarrollo.push('Constancia en seguimiento y trabajo de campo sostenido');
    if (analisis.percentiles.C < 40) analisis.areasDesarrollo.push('Rigor documental, cumplimiento normativo y atención a detalles técnicos');
    
    Object.keys(REQUISITOS_CARGO).forEach(requisito => {
        const config = REQUISITOS_CARGO[requisito];
        let sumaPercentiles = 0;
        
        config.dimensiones.forEach(dim => {
            sumaPercentiles += analisis.percentiles[dim] || 0;
        });
        
        const promedio = sumaPercentiles / config.dimensiones.length;
        analisis.compatibilidad[requisito] = Math.round(promedio * config.peso);
    });
    
    const promedioGeneral = Object.values(analisis.compatibilidad).reduce((a, b) => a + b, 0) / Object.keys(analisis.compatibilidad).length;
    
    if (promedioGeneral >= 75) {
        analisis.recomendacion = 'APTO para el cargo de Analista SIG. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. El candidato demuestra las competencias conductuales necesarias para gestionar el SG-SST, liderar en seguridad, comunicar riesgos efectivamente, y garantizar el cumplimiento normativo y ambiental en operaciones de alto riesgo.';
    } else if (promedioGeneral >= 55) {
        analisis.recomendacion = 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo de Analista SIG. Posee varias competencias requeridas pero requiere desarrollo en áreas específicas. Se recomienda capacitación técnica y acompañamiento en los primeros meses.';
    } else if (promedioGeneral >= 40) {
        analisis.recomendacion = 'REQUIERE EVALUACIÓN ADICIONAL. El perfil muestra algunas fortalezas pero brechas significativas con los requisitos del cargo HSEQ. Se recomienda entrevista conductual profunda y validación de competencias técnicas.';
    } else {
        analisis.recomendacion = 'NO RECOMENDADO para este cargo. El perfil DISC no muestra la compatibilidad necesaria con los requisitos del puesto de Analista SIG. Se sugiere evaluar al candidato para otras posiciones que se ajusten mejor a su perfil comportamental.';
    }
    
    return analisis;
}

function analizarPerfilTecnico(respuestas) {
    const analisis = {
        puntaje: 0,
        total: respuestas.length,
        porcentaje: 0,
        categorias: {},
        correctas: [],
        incorrectas: [],
        veredicto: '',
        recomendacion: ''
    };
    
    const preguntas = PREGUNTAS.tecnico.preguntas;
    
    Object.keys(CATEGORIAS_TECNICO).forEach(cat => {
        const config = CATEGORIAS_TECNICO[cat];
        let aciertos = 0;
        config.preguntas.forEach(id => {
            const idx = preguntas.findIndex(p => p.id === id);
            if (idx >= 0 && respuestas[idx] === preguntas[idx].correct) {
                aciertos++;
            }
        });
        const pct = Math.round((aciertos / config.preguntas.length) * 100);
        analisis.categorias[cat] = { aciertos, total: config.preguntas.length, porcentaje: pct, label: config.label };
    });
    
    respuestas.forEach((r, i) => {
        if (i < preguntas.length) {
            if (r === preguntas[i].correct) analisis.correctas.push(i);
            else analisis.incorrectas.push({ index: i, pregunta: preguntas[i], respondida: r });
        }
    });
    
    analisis.puntaje = analisis.correctas.length;
    analisis.porcentaje = Math.round((analisis.puntaje / analisis.total) * 100);
    
    if (analisis.porcentaje >= 70) {
        analisis.veredicto = 'APTO';
        analisis.recomendacion = 'El candidato demuestra un conocimiento técnico sólido en SIG. Aprobado para continuar el proceso de selección.';
    } else if (analisis.porcentaje >= 50) {
        analisis.veredicto = 'APTO CON DESARROLLO';
        analisis.recomendacion = 'El candidato presenta conocimiento técnico parcial. Se recomienda capacitación complementaria.';
    } else {
        analisis.veredicto = 'NO APTO';
        analisis.recomendacion = 'El candidato no alcanza el nivel técnico mínimo requerido para el cargo HSEQ.';
    }
    
    return analisis;
}
