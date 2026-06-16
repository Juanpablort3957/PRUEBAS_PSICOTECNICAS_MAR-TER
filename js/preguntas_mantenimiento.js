const PREGUNTAS = {
    disc: {
        nombre: "Perfil DISC - Evaluación Comportamental Mantenimiento",
        descripcion: "Seleccione la opción que mejor lo describe. No hay respuestas correctas o incorrectas.",
        tiempo: 1200,
        preguntas: [
            {
                id: 1,
                dimensi: "D",
                pregunta: "Cuando detecto una falla crítica en un equipo en producción, prefiero:",
                opcionA: "Detener la operación inmediatamente y tomar control de la situación",
                opcionB: "Reportarlo y esperar instrucciones de mi superior",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 2,
                dimensi: "D",
                pregunta: "Ante una parada no programada de planta, mi reacción es:",
                opcionA: "Tomar el mando y coordinar la respuesta técnica",
                opcionB: "Seguir el protocolo establecido sin desviarme",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 3,
                dimensi: "D",
                pregunta: "Cuando un técnico se niega a seguir un procedimiento de seguridad, yo:",
                opcionA: "Soy firme y hago respetar la norma sin excepción",
                opcionB: "Dialogo para entender sus razones y busco un acuerdo",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 4,
                dimensi: "D",
                pregunta: "En mi labor de coordinación de mantenimiento, los resultados:",
                opcionA: "Deben lograrse aunque implique medidas drásticas",
                opcionB: "Son importantes pero deben equilibrarse con el clima laboral",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 5,
                dimensi: "D",
                pregunta: "Cuando lidero una investigación de falla mayor, prefiero:",
                opcionA: "Dirigir el proceso y tomar decisiones rápidas",
                opcionB: "Recopilar toda la información antes de concluir",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 6,
                dimensi: "D",
                pregunta: "Al enfrentar presión por producción vs. mantenimiento programado, yo:",
                opcionA: "Defiendo el plan de mantenimiento ante todo, sin ceder",
                opcionB: "Busco un punto medio que permita avanzar con control",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 7,
                dimensi: "I",
                pregunta: "Al capacitar a los técnicos en nuevos procedimientos, me siento:",
                opcionA: "Cómodo y motivado, me gusta enseñar y persuadir",
                opcionB: "Prefiero preparar materiales y dejar que otros expongan",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 8,
                dimensi: "I",
                pregunta: "En reuniones de planificación con producción y operaciones, mi fuerte es:",
                opcionA: "Comunicar con entusiasmo y alinear expectativas entre áreas",
                opcionB: "Presentar datos técnicos y análisis objetivos",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 9,
                dimensi: "I",
                pregunta: "Para lograr que los técnicos adopten una cultura de mantenimiento proactivo, considero clave:",
                opcionA: "La comunicación constante y la influencia interpersonal",
                opcionB: "Los procedimientos escritos y los controles estrictos",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 10,
                dimensi: "I",
                pregunta: "Al coordinar con proveedores de repuestos y servicios externos, yo:",
                opcionA: "Establezco relaciones cercanas para facilitar la gestión",
                opcionB: "Me baso en cotizaciones formales y contratos escritos",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 11,
                dimensi: "I",
                pregunta: "En términos de relacionamiento con el personal técnico a mi cargo:",
                opcionA: "Soy abierto, accesible y me integro fácilmente",
                opcionB: "Soy reservado pero respetuoso, manteniendo distancia profesional",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 12,
                dimensi: "I",
                pregunta: "Cuando necesito que otros departamentos acepten una parada de mantenimiento:",
                opcionA: "Uso mi capacidad de persuasión para convencerlos",
                opcionB: "Me apoyo en la autoridad del plan maestro y la jerarquía",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 13,
                dimensi: "S",
                pregunta: "Al realizar inspecciones rutinarias de equipos, yo:",
                opcionA: "Soy constante y metódico, sigo siempre el mismo estándar",
                opcionB: "Me adapto según las condiciones del día y la criticidad",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 14,
                dimensi: "S",
                pregunta: "Cuando los procedimientos de mantenimiento cambian frecuentemente:",
                opcionA: "Me cuesta adaptarme, prefiero procesos estables",
                opcionB: "Me ajusto rápido y busco implementar los cambios",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 15,
                dimensi: "S",
                pregunta: "En trabajo de campo en planta por largas jornadas:",
                opcionA: "Mantengo el compromiso y la constancia sin problema",
                opcionB: "Prefiero variedad de tareas y zonas diferentes",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 16,
                dimensi: "S",
                pregunta: "Al hacer seguimiento a planes de acción correctivos de fallas:",
                opcionA: "Doy seguimiento paciente y constante hasta el cierre",
                opcionB: "Prefiero resolver rápido y pasar a lo siguiente",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 17,
                dimensi: "S",
                pregunta: "Mi estilo de trabajo en el área de mantenimiento es predominantemente:",
                opcionA: "Consistente, confiable, con rutinas bien establecidas",
                opcionB: "Dinámico, versátil, adaptándome a cada situación",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 18,
                dimensi: "S",
                pregunta: "Cuando realizo auditorías de mantenimiento o verificaciones, prefiero:",
                opcionA: "Tomarme el tiempo necesario para revisar a fondo",
                opcionB: "Ser eficiente y cubrir la mayor cantidad de puntos",
                pesoA: 0,
                pesoB: 1
            },
            {
                id: 19,
                dimensi: "C",
                pregunta: "Al elaborar informes de mantenimiento, mi prioridad es:",
                opcionA: "Que sean precisos, detallados y sin errores",
                opcionB: "Que sean claros y prácticos, sin tanto detalle",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 20,
                dimensi: "C",
                pregunta: "Sobre el cumplimiento de procedimientos y normas técnicas:",
                opcionA: "Debe cumplirse al pie de la letra, sin excepciones",
                opcionB: "Hay que cumplirlas pero con sentido práctico",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 21,
                dimensi: "C",
                pregunta: "Al analizar datos de fallas y confiabilidad de equipos, yo:",
                opcionA: "Soy exhaustivo, revisando cada variable minuciosamente",
                opcionB: "Identifico lo principal y avanzo a la acción",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 22,
                dimensi: "C",
                pregunta: "Sobre la gestión documental y registros de mantenimiento:",
                opcionA: "Mantengo todo ordenado, actualizado y trazable",
                opcionB: "Lo gestiono de forma funcional, sin obsesionarme",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 23,
                dimensi: "C",
                pregunta: "Al verificar permisos de trabajo de alto riesgo en mantenimiento:",
                opcionA: "Reviso cada detalle antes de autorizar",
                opcionB: "Confío en la palabra del supervisor a cargo",
                pesoA: 1,
                pesoB: 0
            },
            {
                id: 24,
                dimensi: "C",
                pregunta: "Mi enfoque hacia los indicadores de gestión de mantenimiento es:",
                opcionA: "Analizarlos con rigor estadístico y detalles completos",
                opcionB: "Revisar las tendencias generales y tomar acción",
                pesoA: 1,
                pesoB: 0
            }
        ]
    },
    tecnico: {
        nombre: "Evaluación Técnica - Conocimientos en Mantenimiento Industrial",
        descripcion: "Seleccione la respuesta correcta para cada pregunta de conocimiento técnico en gestión de mantenimiento, confiabilidad, seguridad industrial, repuestos, Lean y liderazgo.",
        tiempo: 1800,
        preguntas: [
            {
                id: 1,
                categoria: "Gestión del Mantenimiento",
                pregunta: "¿Qué indicador mide la proporción de tiempo que un equipo está operativo respecto al tiempo programado?",
                opciones: ["MTBF", "MTTR", "Disponibilidad", "Confiabilidad"],
                correct: 2,
                retroalimentacion: "La Disponibilidad = (Tiempo Operativo / Tiempo Programado) × 100 es el KPI que mide qué tanto está disponible un equipo cuando se necesita."
            },
            {
                id: 2,
                categoria: "Gestión del Mantenimiento",
                pregunta: "¿Cuál es la principal diferencia entre mantenimiento preventivo sistemático y mantenimiento predictivo?",
                opciones: ["El predictivo se basa en la condición real del equipo, el sistemático en intervalos fijos", "El sistemático usa sensores de vibración, el predictivo no", "No hay diferencia, son sinónimos en la industria", "El predictivo solo aplica a equipos rotativos"],
                correct: 0,
                retroalimentacion: "El mantenimiento sistemático se ejecuta por intervalos fijos (tiempo/ciclos), mientras que el predictivo monitorea la condición real (vibración, temperatura, ultrasonido)."
            },
            {
                id: 3,
                categoria: "Gestión del Mantenimiento",
                pregunta: "Si un compresor opera 720 horas y presenta 3 fallas en ese período, ¿cuál es su MTBF?",
                opciones: ["360 horas", "120 horas", "720 horas", "240 horas"],
                correct: 3,
                retroalimentacion: "MTBF = Tiempo total de operación / Número de fallas = 720 / 3 = 240 horas entre fallas en promedio."
            },
            {
                id: 4,
                categoria: "Gestión del Mantenimiento",
                pregunta: "¿Cuáles son los componentes del Costo Total de Propiedad (TCO) de un equipo industrial?",
                opciones: ["Solo el precio de compra del equipo", "Costo de adquisición, operación, mantenimiento y disposición final", "Únicamente costos de repuestos y mano de obra directa", "Solo los costos fijos de mantenimiento preventivo"],
                correct: 1,
                retroalimentacion: "El TCO incluye todos los costos durante el ciclo de vida: adquisición, instalación, operación (energía, insumos), mantenimiento y disposición final."
            },
            {
                id: 5,
                categoria: "Gestión del Mantenimiento",
                pregunta: "¿Qué indica un backlog de órdenes de trabajo de mantenimiento creciente semana tras semana?",
                opciones: ["Alta productividad del equipo de mantenimiento", "Que los equipos están en óptimas condiciones", "Posible déficit de recursos o incremento de fallas no atendidas", "Exceso de personal de mantenimiento contratado"],
                correct: 2,
                retroalimentacion: "Un backlog creciente indica que se están generando más órdenes de trabajo de las que se pueden ejecutar, señal de falta de recursos o aumento de fallas."
            },
            {
                id: 6,
                categoria: "Ingeniería de Confiabilidad",
                pregunta: "En mantenimiento basado en condición, ¿qué representa el intervalo P-F?",
                opciones: ["Tiempo entre dos fallas consecutivas", "Intervalo entre la detección de una falla potencial y la falla funcional", "Período de garantía ofrecido por el fabricante del equipo", "Tiempo programado entre paradas mayores de planta"],
                correct: 1,
                retroalimentacion: "El intervalo P-F es el tiempo desde que se detecta una condición de falla potencial (P) hasta que ocurre la falla funcional (F). Debe ser suficiente para planificar y ejecutar la intervención."
            },
            {
                id: 7,
                categoria: "Ingeniería de Confiabilidad",
                pregunta: "En un análisis FMEA, ¿qué indica un Número de Prioridad de Riesgo (RPN) elevado?",
                opciones: ["Que el componente tiene bajo costo de reposición", "Que no se requiere mantenimiento preventivo", "Combinación alta de severidad, ocurrencia y detectabilidad que exige acción prioritaria", "Que el equipo debe ser reemplazado de inmediato sin más análisis"],
                correct: 2,
                retroalimentacion: "RPN = Severidad × Ocurrencia × Detectabilidad. Un RPN alto indica un modo de falla crítico que requiere acciones de mitigación prioritarias."
            },
            {
                id: 8,
                categoria: "Ingeniería de Confiabilidad",
                pregunta: "En análisis de confiabilidad con distribución Weibull, ¿qué tipo de falla indica un parámetro de forma β < 1?",
                opciones: ["Fallas tempranas o de mortalidad infantil", "Fallas aleatorias durante la vida útil del equipo", "Fallas por desgaste al final de la vida útil", "Fallas catastróficas sin patrón estadístico"],
                correct: 0,
                retroalimentacion: "β < 1 indica tasa de falla decreciente, típica de fallas tempranas por defectos de fabricación o instalación (mortalidad infantil). β = 1 fallas aleatorias. β > 1 fallas por desgaste."
            },
            {
                id: 9,
                categoria: "Ingeniería de Confiabilidad",
                pregunta: "¿Cuál es el orden metodológico correcto para realizar un análisis de causa raíz (RCA) de una falla?",
                opciones: ["Implementar solución → Investigar causas → Recopilar datos → Cerrar caso", "Reportar a gerencia → Esperar instrucciones → Ejecutar lo ordenado", "Reemplazar el componente fallado → Documentar el reemplazo → Archivar", "Definir el problema → Recopilar evidencia → Identificar causas raíz → Definir acciones correctivas"],
                correct: 3,
                retroalimentacion: "El RCA sigue una metodología estructurada: (1) Definir el problema, (2) Recopilar datos/evidencia, (3) Identificar causas raíz (ej. 5 Porqués, Ishikawa), (4) Definir e implementar acciones correctivas."
            },
            {
                id: 10,
                categoria: "Seguridad Industrial en Mantenimiento",
                pregunta: "¿Qué establece el procedimiento LOTO (Lockout/Tagout) según OSHA 1910.147?",
                opciones: ["Desenergizar, bloquear y etiquetar equipos antes de intervenirlos para prevenir liberación de energía peligrosa", "Solo etiquetar los equipos con el nombre del responsable de la intervención", "Usar EPP adecuado al realizar cualquier tarea de mantenimiento eléctrico", "Reportar incidentes de seguridad al supervisor de planta inmediatamente"],
                correct: 0,
                retroalimentacion: "LOTO es un procedimiento obligatorio que requiere: (1) Apagar el equipo, (2) Aislar fuentes de energía, (3) Bloquear dispositivos de aislamiento, (4) Colocar tarjeta de advertencia, (5) Verificar energía cero."
            },
            {
                id: 11,
                categoria: "Seguridad Industrial en Mantenimiento",
                pregunta: "Para ingreso seguro a un espacio confinado sin equipo de respiración autónomo, el nivel de oxígeno debe estar entre:",
                opciones: ["10% y 15% de oxígeno en volumen", "25% y 30% de oxígeno en volumen", "18% y 21% de oxígeno en volumen", "19.5% y 23.5% de oxígeno en volumen"],
                correct: 3,
                retroalimentacion: "OSHA establece que la atmósfera debe tener entre 19.5% (mínimo seguro) y 23.5% (máximo por riesgo de enriquecimiento). Fuera de este rango se requiere equipo de respiración autónoma."
            },
            {
                id: 12,
                categoria: "Seguridad Industrial en Mantenimiento",
                pregunta: "Según la clasificación ATEX de atmósferas explosivas, ¿qué tipo de ambiente define una Zona 21?",
                opciones: ["Atmósfera de gas explosivo presente de forma continua o por largos períodos", "Atmósfera de gas explosivo presente ocasionalmente en operación normal", "Atmósfera de polvo combustible presente ocasionalmente en operación normal", "Atmósfera no clasificada, sin riesgo de explosión"],
                correct: 2,
                retroalimentacion: "ATEX clasifica: Zona 20 (polvo continuo/presente largos períodos), Zona 21 (polvo ocasional en operación normal), Zona 22 (polvo por corto tiempo). Para gases: Zona 0, 1, 2."
            },
            {
                id: 13,
                categoria: "Seguridad Industrial en Mantenimiento",
                pregunta: "Según la jerarquía de controles de riesgo de NIOSH, ¿cuál es el orden correcto de mayor a menor efectividad?",
                opciones: ["Eliminación → Sustitución → Controles de ingeniería → Controles administrativos → EPP", "EPP → Controles administrativos → Controles de ingeniería → Sustitución → Eliminación", "Controles de ingeniería → Eliminación → EPP → Controles administrativos → Sustitución", "Sustitución → Eliminación → EPP → Controles de ingeniería → Controles administrativos"],
                correct: 0,
                retroalimentacion: "La jerarquía de controles de NIOSH establece: (1) Eliminación, (2) Sustitución, (3) Controles de ingeniería, (4) Controles administrativos, (5) EPP, en orden decreciente de efectividad."
            },
            {
                id: 14,
                categoria: "Gestión de Repuestos y Compras Técnicas",
                pregunta: "Si un repuesto tiene consumo diario de 5 unidades, lead time de 8 días, nivel de servicio 95% (Z=1.65) y desviación estándar diaria de 2 unidades, ¿cuál es el stock de seguridad aproximado?",
                opciones: ["5 unidades", "9 unidades", "16 unidades", "40 unidades"],
                correct: 1,
                retroalimentacion: "Stock de seguridad = Z × σ × √LT = 1.65 × 2 × √8 = 1.65 × 2 × 2.828 ≈ 9.3 ≈ 9 unidades."
            },
            {
                id: 15,
                categoria: "Gestión de Repuestos y Compras Técnicas",
                pregunta: "¿Qué factores determinan el punto de reorden (ROP) en la gestión de inventarios de repuestos?",
                opciones: ["Demanda durante el lead time más el stock de seguridad", "Solo el consumo diario promedio y el precio unitario", "El número de proveedores disponibles y la distancia geográfica", "El presupuesto anual de compras de la planta"],
                correct: 0,
                retroalimentacion: "ROP = (Demanda diaria promedio × Lead time en días) + Stock de seguridad. Es el nivel de inventario que dispara una nueva orden de compra."
            },
            {
                id: 16,
                categoria: "Gestión de Repuestos y Compras Técnicas",
                pregunta: "En la clasificación ABC-VEN de repuestos, ¿qué caracteriza a un repuesto categoría 'V' (Vital)?",
                opciones: ["Es un repuesto de alto volumen de consumo mensual", "Es un repuesto de bajo costo unitario y alta rotación", "Es un repuesto importado con tiempos de entrega superiores a 90 días", "Es un repuesto sin el cual el equipo o proceso se detiene por completo"],
                correct: 3,
                retroalimentacion: "La clasificación VEN prioriza por criticidad: V=Vital (sin él el proceso se detiene), E=Esencial (afecta pero no para), N=No esencial. Se combina con ABC por valor de consumo."
            },
            {
                id: 17,
                categoria: "Gestión de Repuestos y Compras Técnicas",
                pregunta: "¿Cuál es la principal ventaja de un contrato de mantenimiento por disponibilidad garantizada frente a un contrato por tiempo y materiales?",
                opciones: ["Siempre tiene menor costo total para el cliente", "No se requiere programar paradas de planta con anticipación", "El contratista asume el riesgo de cumplir los KPI de disponibilidad pactados", "Los repuestos y consumibles son suministrados por el cliente"],
                correct: 2,
                retroalimentacion: "En un contrato por disponibilidad, el contratista garantiza un nivel de disponibilidad del equipo y asume el riesgo de las intervenciones necesarias para mantenerlo, incentivando mantenimiento proactivo."
            },
            {
                id: 18,
                categoria: "Lean y Mejora Continua",
                pregunta: "¿Cuál es el valor del OEE si un equipo tiene disponibilidad del 90%, rendimiento del 85% y calidad del 95%?",
                opciones: ["85.0%", "90.0%", "95.0%", "72.7%"],
                correct: 3,
                retroalimentacion: "OEE = Disponibilidad × Rendimiento × Calidad = 0.90 × 0.85 × 0.95 = 0.727 = 72.7%. Clase mundial se considera ≥ 85%."
            },
            {
                id: 19,
                categoria: "Lean y Mejora Continua",
                pregunta: "¿Cuál de los 8 pilares del TPM está directamente enfocado en eliminar las Seis Grandes Pérdidas de los equipos?",
                opciones: ["Mantenimiento de Calidad (Hinshitsu Hozen)", "Mantenimiento Planificado (Keikaku Hozen)", "Mejora Enfocada (Kobetsu Kaizen)", "Seguridad, Salud y Medio Ambiente"],
                correct: 1,
                retroalimentacion: "El pilar de Mejora Enfocada (Kobetsu Kaizen) tiene como objetivo eliminar las 6 grandes pérdidas: fallas, preparación/ajuste, paradas menores, velocidad reducida, defectos de arranque y defectos de calidad."
            },
            {
                id: 20,
                categoria: "Lean y Mejora Continua",
                pregunta: "¿En qué consiste la conversión de actividades internas a externas en la técnica SMED?",
                opciones: ["Realizar durante la operación del equipo todas las tareas posibles, dejando solo lo indispensable para la parada", "Contratar personal externo para reducir costos de cambio de formato", "Trasladar las actividades de mantenimiento a un taller externo a la planta", "Convertir mantenimiento correctivo en preventivo externo"],
                correct: 0,
                retroalimentacion: "SMED busca reducir el tiempo de cambio convirtiendo setup interno (con máquina parada) en setup externo (con máquina en operación). Solo se hace durante la parada lo estrictamente necesario."
            },
            {
                id: 21,
                categoria: "Lean y Mejora Continua",
                pregunta: "¿Cuál es la diferencia entre SEITON y SEISO en la metodología 5S?",
                opciones: ["SEITON es limpieza y SEISO es disciplina", "No hay diferencia, son nombres distintos para la misma S", "SEITON es orden (un lugar para cada cosa) y SEISO es limpieza (eliminar suciedad e inspeccionar)", "SEITON es estandarización y SEISO es clasificación"],
                correct: 2,
                retroalimentacion: "5S: (1)SEIRI=Clasificar, (2)SEITON=Ordenar (un lugar para cada cosa), (3)SEISO=Limpiar (mantener limpio e inspeccionar), (4)SEIKETSU=Estandarizar, (5)SHITSUKE=Disciplina."
            },
            {
                id: 22,
                categoria: "Liderazgo y Supervisión Técnica",
                pregunta: "¿Cuál es el principio clave para delegar efectivamente una orden de trabajo a un técnico de mantenimiento?",
                opciones: ["Asignar la tarea con alcance claro, recursos definidos, plazo acordado y criterios de terminación verificables", "Dar instrucciones verbales rápidas para no perder tiempo en documentación", "Permitir que cada técnico decida qué orden de trabajo ejecutar según su criterio", "Asignar todas las órdenes a los técnicos más antiguos por jerarquía"],
                correct: 0,
                retroalimentacion: "La delegación efectiva requiere: alcance claro de la tarea, recursos necesarios asignados, plazo definido y criterios objetivos de terminación para poder verificar el resultado."
            },
            {
                id: 23,
                categoria: "Liderazgo y Supervisión Técnica",
                pregunta: "¿Cuál es el enfoque más efectivo para dar retroalimentación a un técnico con desempeño por debajo de lo esperado?",
                opciones: ["Esperar a la evaluación anual formal para documentar todas las incidencias acumuladas", "Abordar la situación en privado con hechos específicos, escuchar su perspectiva y acordar un plan de mejora", "Hacer una crítica pública durante la reunión de equipo para que sirva de ejemplo", "Ignorar el bajo desempeño y asignarle tareas menos críticas progresivamente"],
                correct: 1,
                retroalimentacion: "La retroalimentación efectiva es: específica (basada en hechos), oportuna (lo antes posible), en privado, bidireccional (escuchar al colaborador) y orientada a soluciones con plan de mejora acordado."
            },
            {
                id: 24,
                categoria: "Liderazgo y Supervisión Técnica",
                pregunta: "¿Qué metodología de priorización de órdenes de trabajo integra criticidad del equipo, impacto en producción y riesgo de seguridad?",
                opciones: ["Matriz de Eisenhower (urgente vs importante)", "Análisis de criticidad basado en riesgo (RBCA) ponderando seguridad, producción y costo", "Método FIFO (primero en entrar, primero en salir)", "Priorización por antigüedad del equipo instalado"],
                correct: 1,
                retroalimentacion: "La priorización basada en criticidad pondera: (1) Riesgo de seguridad, (2) Impacto en producción/operación, (3) Costo de falla vs. costo de intervención, (4) Degradación progresiva del activo."
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
    liderazgoEquipos: { dimensiones: ['D', 'I'], peso: 0.9 },
    organizacionPlanificacion: { dimensiones: ['C', 'S'], peso: 1.0 },
    resolucionProblemas: { dimensiones: ['D', 'C'], peso: 0.9 },
    comunicacionEfectiva: { dimensiones: ['I', 'S'], peso: 0.9 },
    orientacionResultados: { dimensiones: ['D', 'C'], peso: 1.0 },
    conocimientoMantenimiento: { dimensiones: ['C', 'D'], peso: 1.0 },
    seguridadIndustrial: { dimensiones: ['C', 'S'], peso: 0.9 },
    gestionRepuestos: { dimensiones: ['C', 'S'], peso: 0.8 },
    mejoraContinua: { dimensiones: ['D', 'C'], peso: 0.8 },
    supervisionTecnica: { dimensiones: ['D', 'S'], peso: 0.9 }
};

const CATEGORIAS_TECNICO = {
    gestionMantenimiento: { label: 'Gestión del Mantenimiento', preguntas: [1,2,3,4,5] },
    confiabilidad: { label: 'Ingeniería de Confiabilidad', preguntas: [6,7,8,9] },
    seguridadMantenimiento: { label: 'Seguridad Industrial en Mantenimiento', preguntas: [10,11,12,13] },
    repuestos: { label: 'Gestión de Repuestos y Compras Técnicas', preguntas: [14,15,16,17] },
    mejoraContinua: { label: 'Lean y Mejora Continua', preguntas: [18,19,20,21] },
    liderazgo: { label: 'Liderazgo y Supervisión Técnica', preguntas: [22,23,24] }
};

function analizarPerfilDISC(puntuaciones) {
    const analisis = {
        perfiles: {},
        percentiles: {},
        estilo: '',
        descripcionEstilo: '',
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
        analisis.estilo = 'Líder Técnico de Planta';
        analisis.descripcionEstilo = 'Combina autoridad para liderar equipos de mantenimiento con rigor técnico. Ideal para coordinar cuadrillas, priorizar órdenes de trabajo y asegurar continuidad operativa bajo presión.';
    } else if (c >= 4 && s >= 4 && d < 3 && i < 3) {
        analisis.estilo = 'Planificador Metódico';
        analisis.descripcionEstilo = 'Excelente para planificación de mantenimiento, control de inventarios de repuestos y gestión documental. Prioriza la organización, el cumplimiento de programas y la trazabilidad.';
    } else if (i >= 4 && s >= 4 && d < 3 && c < 3) {
        analisis.estilo = 'Comunicador Operativo';
        analisis.descripcionEstilo = 'Gran habilidad para capacitar técnicos, coordinar con proveedores y facilitar comunicación entre áreas. Ideal para roles que requieren interacción constante con producción y logística.';
    } else if (d >= 4 && i >= 4 && c >= 3) {
        analisis.estilo = 'Transformador de Procesos';
        analisis.descripcionEstilo = 'Lidera cambios en cultura de mantenimiento con determinación y capacidad de persuasión. Ideal para implementar TPM, Lean Maintenance y nuevos sistemas de gestión de activos.';
    } else if (d >= 3 && i >= 3 && s >= 3 && c >= 3) {
        analisis.estilo = 'Integral de Mantenimiento';
        analisis.descripcionEstilo = 'Perfil versátil y equilibrado. Puede desempeñarse en múltiples frentes: planificación, supervisión de campo, gestión de repuestos y mejora continua.';
    } else if (c >= 4 && d >= 3) {
        analisis.estilo = 'Técnico Especialista';
        analisis.descripcionEstilo = 'Sólido conocimiento técnico de equipos y procedimientos. Enfoque en confiabilidad, análisis de fallas y cumplimiento de estándares de mantenimiento.';
    } else if (d >= 4 && s >= 3) {
        analisis.estilo = 'Supervisor de Campo';
        analisis.descripcionEstilo = 'Cómodo en piso de planta y trabajo operativo. Toma decisiones rápidas durante fallas y mantiene constancia en el seguimiento de órdenes de trabajo.';
    } else {
        analisis.estilo = 'Perfil en Desarrollo en Mantenimiento';
        analisis.descripcionEstilo = 'No encaja en los perfiles típicos de coordinación de mantenimiento. Se requiere evaluación adicional para determinar su idoneidad para el cargo.';
    }
    
    if (analisis.percentiles.D >= 55) analisis.fortalezas.push('Liderazgo de equipos técnicos y toma de decisiones bajo presión');
    if (analisis.percentiles.I >= 55) analisis.fortalezas.push('Comunicación efectiva para coordinar equipos y proveedores');
    if (analisis.percentiles.S >= 55) analisis.fortalezas.push('Constancia en seguimiento de planes de mantenimiento y órdenes de trabajo');
    if (analisis.percentiles.C >= 55) analisis.fortalezas.push('Atención al detalle técnico, gestión documental y cumplimiento de estándares');
    
    if (analisis.percentiles.D < 40) analisis.areasDesarrollo.push('Capacidad de liderazgo y firmeza para dirigir equipos de mantenimiento');
    if (analisis.percentiles.I < 40) analisis.areasDesarrollo.push('Habilidades de comunicación para coordinar con producción y proveedores');
    if (analisis.percentiles.S < 40) analisis.areasDesarrollo.push('Constancia en seguimiento de programas de mantenimiento y trabajo de campo');
    if (analisis.percentiles.C < 40) analisis.areasDesarrollo.push('Rigor técnico, análisis de fallas y cumplimiento de procedimientos de mantenimiento');
    
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
        analisis.recomendacion = 'APTO para el cargo de Coordinador de Mantenimiento y Logística. El perfil DISC muestra alta compatibilidad con los requisitos del puesto. El candidato demuestra las competencias conductuales necesarias para liderar equipos técnicos, planificar el mantenimiento, resolver problemas bajo presión y asegurar la continuidad operativa de la planta.';
    } else if (promedioGeneral >= 55) {
        analisis.recomendacion = 'APTO CON DESARROLLO. El perfil muestra compatibilidad media con el cargo de Coordinador de Mantenimiento y Logística. Posee varias competencias requeridas pero requiere desarrollo en áreas específicas. Se recomienda capacitación técnica y acompañamiento en los primeros meses.';
    } else if (promedioGeneral >= 40) {
        analisis.recomendacion = 'REQUIERE EVALUACIÓN ADICIONAL. El perfil muestra algunas fortalezas pero brechas significativas con los requisitos del cargo de mantenimiento. Se recomienda entrevista conductual profunda y validación de competencias técnicas.';
    } else {
        analisis.recomendacion = 'NO RECOMENDADO para este cargo. El perfil DISC no muestra la compatibilidad necesaria con los requisitos del puesto de Coordinador de Mantenimiento y Logística. Se sugiere evaluar al candidato para otras posiciones que se ajusten mejor a su perfil comportamental.';
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
        analisis.recomendacion = 'El candidato demuestra un conocimiento técnico sólido en gestión de mantenimiento industrial. Aprobado para continuar el proceso de selección.';
    } else if (analisis.porcentaje >= 50) {
        analisis.veredicto = 'APTO CON DESARROLLO';
        analisis.recomendacion = 'El candidato presenta conocimiento técnico parcial en mantenimiento. Se recomienda capacitación complementaria en las áreas de menor puntuación.';
    } else {
        analisis.veredicto = 'NO APTO';
        analisis.recomendacion = 'El candidato no alcanza el nivel técnico mínimo requerido para el cargo de Coordinador de Mantenimiento y Logística.';
    }
    
    return analisis;
}
