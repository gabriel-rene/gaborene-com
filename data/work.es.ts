import type { CaseStudyText } from "./work"

const ROLE_DLC =
  "Estrategia digital, dirección de tecnología y producción, de la Cruz (Ogilvy)"

const caseStudiesEs: Record<string, CaseStudyText> = {
  "car-parts-for-life": {
    title: "Car Parts for Life",
    category: "Impacto social",
    summary:
      "Una campaña de impacto social que usa piezas de carro donadas como metáfora visual de la donación de órganos: carros que recibieron “trasplantes” de otros vehículos, para inspirar registros en donaorganos.com.",
    body: `Junto a aliados como Plaza Las Américas y Plaza Del Caribe, la iniciativa presenta carros que recibieron “trasplantes” de piezas de otros vehículos. Esa narrativa visual simplifica el concepto de la donación de órganos e inspira registros a través de donaorganos.com.

La campaña la creó de la Cruz (Ogilvy) para la Fundación Stefano Steenbakkers Betancourt, y ha sido reconocida por su creatividad y su impacto social positivo en varios de los festivales principales.`,
    role: ROLE_DLC,
    pullQuote: {
      quote: "Gracias a ustedes, conseguí un riñón.",
      attribution:
        "Una persona que llamó a la fundación una semana después del lanzamiento. La única métrica que de verdad ha importado.",
    },
    awards: [
      "LUUM Awards 2024, Campaña del Año",
      "LUUM Awards 2024, Grand Prix: Causas / Alianzas para lograr objetivos",
      "LUUM Awards 2024, Grand Prix: Comunicación Institucional",
      "LUUM Awards 2024, Oro (×4): Sociedad, Campañas, Solidaridad",
      "LUUM Awards 2024, Plata: Esencia del Mensaje",
      "El Ojo de Iberoamérica 2024, Plata (×3): Medios, Sustentable, Salud y Farma",
      "El Ojo de Iberoamérica 2024, Bronce (×2): Medios, Vía Pública",
      "Effie Awards Latin America 2025, Finalista: Comunidad Comprometida",
      "Effie Awards Latin America 2025, Finalista: Impacto Positivo",
      "SME Digital Awards 2025, Ganador destacado",
    ],
  },
  "summon-the-king": {
    title: "Summon the King",
    category: "Experiencial",
    summary:
      "Una campaña de Halloween construida alrededor de la leyenda de un Burger King “embrujado”. La gente visitaba restaurantes cerrados y hacía un ritual (decir “Burger King” tres veces) para desbloquear un Whopper gratis. Convirtió las historias de fantasmas en las noches más movidas que esos restaurantes habían tenido.",
    body: `Para generar interés alrededor de Halloween, Burger King lanzó en Puerto Rico una campaña centrada en la leyenda de un restaurante embrujado. Se unió a un dúo popular de podcasters cazafantasmas para documentar una investigación del lugar, e invitó a la gente a visitar restaurantes de Burger King cerrados y hacer un ritual (decir “Burger King” tres veces) para recibir un Whopper gratis.

La campaña usó billboards y anuncios de TV para llevar tráfico a esos restaurantes cerrados, y el resultado fue una experiencia inmersiva en la que los restaurantes reabrieron para la promoción.

En solo dos noches, restaurantes que estaban cerrados se convirtieron en los más concurridos del pueblo.`,
    role: ROLE_DLC,
  },
  voyturisteando: {
    title: "VoyTuristeando.com",
    category: "Plataforma digital",
    summary:
      "Diez meses, de un blog en WordPress a Pasaporte a la Aventura: investigación de campo con residentes, una migración completa de contenido, un directorio de los 78 municipios de Puerto Rico construido en cuatro meses, y un dashboard de datos cuyo retrato de lo que quieren los residentes le dio forma al pasaporte que salió seis meses después.",
    body: `En 2022, voyturisteando.com era el sitio de la Compañía de Turismo de Puerto Rico para residentes, y era un blog de WordPress haciendo el trabajo de un directorio. 637 entradas de directorio, 190 eventos y un puñado de ofertas vivían en una sola instalación de Divi, archivados bajo 84 etiquetas de municipio para 78 municipios. Buscabas playas en Cabo Rojo y no aparecía nada. La página principal todavía tenía lorem ipsum.

Teníamos diez meses, desde la primera auditoría hasta el lanzamiento de Pasaporte a la Aventura: cuatro para construir el directorio y seis más para construir el pasaporte encima.

Primero, la investigación. Nos sentamos con 42 residentes en 14 municipios: entrevistas, recorridos acompañados y un estudio de diario. Tres hallazgos le dieron forma a todo lo que vino después. La gente planifica por pueblo, no por categoría. Los viajes de fin de semana se deciden en el celular, la noche antes. Y la gente confía más en alguien del lugar que en cualquier listado.

Así que la plataforma nueva se organiza por pueblo primero. Sacamos el contenido de WordPress a un CMS headless en Strapi con un front end en Next.js, S3 para los medios y Cloudflare en el edge, bilingüe desde el modelo de datos. Cada lugar recibió un municipio, una región, una categoría y un pin. 48 etiquetas de filtro que se solapaban se convirtieron en 6 categorías y 39 subcategorías. Una noche, un script puso en el mapa 426 lugares limpios y sin duplicados.

El directorio salió en el mes cuatro. Carga en 1.4 segundos en un celular; antes tardaba 8.4.

Entonces el sitio se convirtió en un sensor. Cada búsqueda traía un pueblo y cada respuesta del quiz de onboarding, un interés, así que montamos un dashboard en Power BI que le mostraba a la Compañía de Turismo lo que buscan los residentes, lo que les gusta y cuándo planifican. Las búsquedas llegaban a su pico los jueves por la noche, que es justo lo que nos habían dicho las entrevistas. Esos datos se convirtieron en el motor de contenido del pasaporte: qué lugares añadir, qué pueblos empujar y con qué categorías abrir.

Para el mes nueve, el tráfico de búsqueda orgánica había subido 212% comparado con el mes uno, los 78 municipios tenían tráfico todos los meses, y el directorio había crecido de 426 lugares en el lanzamiento a más de 1,000.

El mapa estaba listo. En el mes diez, seis meses después de que saliera el directorio, lo convertimos en un juego. El directorio nos dijo lo que la gente quería. El pasaporte nos iba a enseñar cómo se mueve por la isla.`,
    role: ROLE_DLC,
  },
  "pasaporte-aventura": {
    title: "Pasaporte a la Aventura",
    category: "Producto digital",
    summary:
      "Una plataforma digital de turismo gamificada que convirtió un pasaporte físico popular en una experiencia móvil, con geolocalización y RFID para impulsar la exploración por los 78 municipios de Puerto Rico, con insignias, competencia y premios mensuales.",
    body: `En 2021, la Compañía de Turismo de Puerto Rico lanzó “Una Isla, 78 Destinos”, una campaña con un pasaporte turístico físico diseñado para impulsar la exploración local. Sin que nadie lo esperara, el pasaporte se convirtió en una sensación y reveló que el público tenía hambre de una exploración interactiva y competitiva. Pero tenía limitaciones reales: era incómodo de cargar, imposible de actualizar con eventos nuevos, y muchas veces no daba abasto para la demanda.

En 2023, la Compañía de Turismo de Puerto Rico presentó Pasaporte a la Aventura, una plataforma digital gamificada que permite explorar más de 700 destinos, coleccionar insignias digitales y competir por premios mensuales. Un uso pionero de la geolocalización, combinado con rótulos con RFID, hizo posible el check-in físico en lugares por toda la isla.

Con la metodología de Design Thinking, la plataforma se construyó alrededor de un diseño centrado en el usuario y accesible en dispositivos móviles. La iniciativa fue un éxito sin precedentes: impulsó la economía local en los 78 municipios y generó datos cruciales sobre el comportamiento del turista local para guiar mejoras futuras.`,
    role: ROLE_DLC,
    awards: [
      "SME Digital Awards 2024, Oro: Diseño de Experiencia e Interfaz de Usuario Digital",
      "SME Digital Awards 2024, Oro: Desarrollo de Soluciones Tecnológicas",
    ],
  },
  reusables: {
    title: "Reusables",
    category: "Campaña de AR",
    summary:
      "Una campaña de AR que le da la vuelta a las etiquetas de “use by”, usando visión por computadora para revelar usos alternativos de productos de supermercado vencidos y sacarlos del camino al vertedero.",
    body: `Casi una tercera parte de toda la comida que se vende en los supermercados termina en la basura cuando los productos llegan a su fecha de “use by”. Esas fechas crean un falso sentido de urgencia, y muchos consumidores las tratan como fechas de expiración definitivas cuando solo son un estimado de su mejor calidad.

SuperMax, el supermercado en línea más grande de Puerto Rico, creó REUSABLES para cambiar ese comportamiento. Con realidad aumentada en Instagram y el sitio reusables.ai, los clientes podían apuntar la cámara del celular a las etiquetas de los productos participantes. El filtro transformaba la etiqueta al instante para mostrar usos alternativos del producto después de su vencimiento, y así evitar que terminara en el vertedero. La etiqueta “Use By” se convirtió en un “Use For”.

Cuando aparecían los usos alternativos, los usuarios podían entrar al sitio para ver tutoriales de cómo aplicar cada life hack. La campaña convirtió un problema de desperdicio en una oportunidad, usando tecnología para provocar un cambio de comportamiento en el punto de compra.`,
    role: ROLE_DLC,
    awards: [
      "FIAP Awards 2023, Bronce: Mejor Campaña de Sostenibilidad",
      "FIAP Awards 2023, Bronce: Innovación Móvil",
      "FIAP Awards 2023, Bronce: Mejor Estrategia de Lanzamiento de Programa",
      "Cannes Lions 2023, Contender",
    ],
  },
  "night-mission": {
    title: "Night Mission",
    category: "Experiencial / AR",
    summary:
      "Una experiencia inmersiva offline que conectó a Burger King Puerto Rico con el lanzamiento de Call of Duty: Modern Warfare II: filtros de AR de visión nocturna, restaurantes remodelados y recompensas dentro del juego, exclusiva de la isla.",
    body: `A finales de 2022, Burger King anunció una colaboración con Call of Duty: Modern Warfare II. El juego era uno de los lanzamientos más esperados de la industria, y la alianza subió las expectativas de lado y lado.

Partiendo de que Call of Duty se promocionaba principalmente como un juego de batallas nocturnas, Burger King creó una experiencia inmersiva offline disponible solo en Puerto Rico. Varios restaurantes seleccionados se remodelaron para parecer escenas del juego. Un filtro de AR permitía a los clientes usar el celular para moverse por el espacio con gafas de visión nocturna y encontrar pistas escondidas para ganar premios, descuentos, combos de edición limitada, recompensas en la BK® App y skins exclusivas dentro del juego.

Durante un mes, la campaña conectó el juego virtual con experiencias reales en los restaurantes, y generó miles de visitas y millones de interacciones.`,
    role: ROLE_DLC,
    awards: [
      "SME Digital Awards 2023, Plata: Gamificación",
      "FIAP Awards 2023, Bronce: Innovación",
      "Effie Awards Latin America 2023, Finalista",
    ],
  },
  eyetracker: {
    title: "The EyeTracker",
    category: "Producto digital",
    summary:
      "Una herramienta móvil georreferenciada que sustituye las compras de pánico antes de un huracán por una lista de suministros personalizada, basada en datos de trayectoria del Centro Nacional de Huracanes y en el primer street view de la ruta proyectada de un huracán.",
    body: `Los supermercados de Puerto Rico enfrentan una crisis predecible antes de cada huracán: las compras de pánico vacían las góndolas y los que llegan después se quedan sin nada. SuperMax, junto a de la Cruz Ogilvy, se propuso cambiar ese comportamiento.

The Eye Tracker integra los datos de trayectoria del Centro Nacional de Huracanes con tecnología de Google para generar una lista de preparación personalizada para cada hogar. Toma en cuenta la ubicación de la tormenta, la presión, la velocidad del viento y la composición específica del hogar para recomendar la cantidad precisa de artículos esenciales, y así elimina el impulso de comprar de más.

La plataforma presentó la primera experiencia de street view de la ruta proyectada de un huracán, para que los usuarios pudieran entender visualmente el área de impacto antes de decidir qué comprar. Después podían comprar los artículos sugeridos directamente en la plataforma, con entrega o recogido en tienda.

El resultado: una preparación para la tormenta más calmada y racional, y suministros esenciales que siguieron disponibles para toda la comunidad.`,
    role: ROLE_DLC,
    awards: [
      "Cannes Lions 2022, Oro: Mobile (Mobile Technology / mCommerce)",
      "Cannes Lions 2022, Bronce: Creative Commerce",
      "Cannes Lions 2022, Bronce: Mobile Website",
      "The One Show 2023, Lápiz de Bronce: Personalized Digital",
      "FIAP Awards 2022, Oro: Innovación Tecnológica",
      "FIAP Awards 2022, Plata: Innovación Móvil",
      "FIAP Awards 2022, Plata: Producción Tecnológica",
      "El Ojo de Iberoamérica, Gran Ojo Digital & Social",
    ],
  },
  hit3001: {
    title: "Hit3001",
    category: "Campaña",
    summary:
      "Para lanzar una iniciativa de empresarismo, el gobierno de Puerto Rico sustituyó el tradicional mensaje de Año Nuevo del gobernador por una película inédita sobre Roberto Clemente, y llenó los cortes comerciales con pitches de jóvenes empresarios puertorriqueños.",
    body: `El gobierno de Puerto Rico necesitaba comunicar un plan local de empresarismo de una forma que de verdad le llegara a la gente. La solución fue sustituir el tradicional mensaje de Año Nuevo del gobernador por la película inédita Chasing 3000, sobre la leyenda del béisbol Roberto Clemente, y usar los cortes comerciales no para anuncios, sino para los pitches de negocio de jóvenes empresarios puertorriqueños.

La película se transmitió por Telemundo sin comerciales. Durante la transmisión, el público conoció las ideas de los empresarios. Al final de la película, se invitó a los televidentes a votar, por web o SMS, por la idea que creían que podía convertirse en el próximo “hit” del país.

Después de la transmisión, los empresarios participaron en una gira de medios nacional. La empresa ganadora recibió asesoría oficial del Departamento de Desarrollo Económico, y se convirtió en un caso modelo para la nueva clase empresarial de Puerto Rico.`,
    awards: [
      "Cannes Lions 2014, León de Bronce",
      "Clio Awards 2014, Bronce",
      "FIAP, Plata",
      "Festival El Sol, Plata",
      "SME Digital Awards 2014 y 2016, Plata: Mejor Ejecución Digital de Campaña de Responsabilidad Social",
    ],
  },
  "hagamos-brillar": {
    title: "Hagamos Brillar a San Juan",
    category: "Campaña comunitaria",
    summary:
      "Una iniciativa de limpieza comunitaria en el Viejo San Juan, que coincidió con el 50 aniversario de 3M en Puerto Rico y movilizó voluntarios para limpiar y embellecer espacios públicos y fomentar la responsabilidad cívica a largo plazo.",
    body: `La campaña coincidió con el 50 aniversario de 3M en Puerto Rico y giró alrededor de una limpieza comunitaria en el Viejo San Juan. El esfuerzo se enfocó en fomentar la responsabilidad cívica: voluntarios, incluidos empleados, familiares y amigos, limpiaron y embellecieron espacios públicos para crear un mejor ambiente para los residentes de la capital.

Más allá del evento de limpieza, la iniciativa invitó a los ciudadanos a asumir un compromiso a largo plazo de mantener limpios los espacios comunitarios, en colaboración con el gobierno local.`,
  },
}

export default caseStudiesEs
