export type Locale = 'es' | 'en'
export type Page = 'home' | 'features' | 'community' | 'faq' | 'support'
export const pages: Page[] = ['home', 'features', 'community', 'faq', 'support']
export const paths: Record<Locale, Record<Page, string>> = {
  es: {
    home: '/es/',
    features: '/es/funciones/',
    community: '/es/comunidad/',
    faq: '/es/preguntas-frecuentes/',
    support: '/es/soporte/',
  },
  en: {
    home: '/en/',
    features: '/en/features/',
    community: '/en/community/',
    faq: '/en/faq/',
    support: '/en/support/',
  },
}
export function resolveRoute(path: string): {
  locale: Locale
  page: Page
  found: boolean
} {
  const normalized = path.endsWith('/') ? path : `${path}/`
  for (const locale of ['es', 'en'] as const) {
    for (const page of pages)
      if (paths[locale][page] === normalized)
        return { locale, page, found: true }
  }
  return {
    locale: path.startsWith('/en/') ? 'en' : 'es',
    page: 'home',
    found: false,
  }
}

// Every module below exists in the Buchonean2 app source and is being tested
// before launch. Nothing is published in an app store yet. Anything not yet
// built lives in `planned`, never in a module's points.
export type ModuleId =
  | 'pigeons'
  | 'breeding'
  | 'pedigree'
  | 'captures'
  | 'health'
  | 'flights'
  | 'community'
  | 'nearby'
  | 'rankings'
  | 'stores'
  | 'sale'
  | 'privacy'
export type Status = 'development' | 'planned'
export const moduleIds: ModuleId[] = [
  'pigeons',
  'breeding',
  'pedigree',
  'captures',
  'health',
  'flights',
  'community',
  'nearby',
  'rankings',
  'stores',
  'sale',
  'privacy',
]
export const moduleStatus: Record<ModuleId, Status> = {
  pigeons: 'development',
  breeding: 'development',
  pedigree: 'development',
  captures: 'development',
  health: 'development',
  flights: 'development',
  community: 'development',
  nearby: 'development',
  rankings: 'development',
  stores: 'development',
  sale: 'development',
  privacy: 'development',
}
export const anchors: Record<Locale, Record<ModuleId, string>> = {
  es: {
    pigeons: 'palomas',
    breeding: 'cria',
    pedigree: 'arbol-genealogico',
    captures: 'capturas',
    health: 'salud',
    flights: 'vuelos',
    community: 'comunidad',
    nearby: 'palomeros-cercanos',
    rankings: 'clasificacion-local',
    stores: 'tiendas-cercanas',
    sale: 'en-venta',
    privacy: 'perfil-y-privacidad',
  },
  en: {
    pigeons: 'pigeons',
    breeding: 'breeding',
    pedigree: 'pedigree',
    captures: 'captures',
    health: 'health',
    flights: 'flights',
    community: 'community',
    nearby: 'nearby-breeders',
    rankings: 'local-rankings',
    stores: 'nearby-stores',
    sale: 'for-sale',
    privacy: 'profile-and-privacy',
  },
}

// Real app screens, rendered from the Flutter app with test data and fitted to
// the iPhone screen area below the status bar (393 x 798 pt). `status` is the
// app bar tone at the top of each screen, continued under the status bar.
export type ScreenId = 'pigeon' | 'breeding' | 'flight' | 'profile'
type Tone = 'light' | 'dark'
const light: Tone = 'light'
export const screens: Record<
  ScreenId,
  {
    widths: number[]
    file: Record<Locale, string>
    status: Record<Locale, Tone>
  }
> = {
  pigeon: {
    widths: [400, 640, 860],
    file: { es: 'pigeon-es', en: 'pigeon-en' },
    status: { es: light, en: light },
  },
  breeding: {
    widths: [400, 640, 780],
    file: { es: 'breeding-es', en: 'breeding-en' },
    status: { es: 'dark', en: light },
  },
  flight: {
    widths: [390],
    file: { es: 'flight-es', en: 'flight-es' },
    status: { es: light, en: light },
  },
  profile: {
    widths: [320],
    file: { es: 'profile-es', en: 'profile-en' },
    status: { es: light, en: light },
  },
}

export type GroupMedia =
  | { kind: 'screen'; id: ScreenId }
  | { kind: 'photo'; id: 'buchon' | 'flight' }
  | { kind: 'care' }
export const groupLayout: { modules: ModuleId[]; media: GroupMedia }[] = [
  { modules: ['pigeons'], media: { kind: 'screen', id: 'pigeon' } },
  {
    modules: ['breeding', 'pedigree'],
    media: { kind: 'screen', id: 'breeding' },
  },
  {
    modules: ['captures', 'flights'],
    media: { kind: 'screen', id: 'flight' },
  },
  { modules: ['health'], media: { kind: 'care' } },
  {
    modules: ['community', 'nearby', 'rankings'],
    media: { kind: 'photo', id: 'flight' },
  },
  {
    modules: ['stores', 'sale', 'privacy'],
    media: { kind: 'screen', id: 'profile' },
  },
]
export const moduleScreen: Partial<Record<ModuleId, ScreenId>> = {
  pigeons: 'pigeon',
  breeding: 'breeding',
  flights: 'flight',
  privacy: 'profile',
}

type Module = {
  name: string
  summary: string
  body: string
  points: string[]
  note?: string
}

const es = {
  nav: {
    home: 'Inicio',
    features: 'Funciones',
    community: 'Comunidad',
    faq: 'Preguntas frecuentes',
    support: 'Soporte',
  },
  navShort: {
    home: 'Inicio',
    features: 'Funciones',
    community: 'Comunidad',
    faq: 'Preguntas',
    support: 'Soporte',
  },
  skip: 'Saltar al contenido',
  menu: 'Abrir menú',
  close: 'Cerrar menú',
  language: 'Seleccionar idioma',
  mainNav: 'Navegación principal',
  mobileNav: 'Navegación móvil',
  footerNav: 'Pie de página',
  soon: 'Próximamente',
  hero: {
    tag: 'La app para palomeros',
    title: 'Tu palomar. Tu historia. Tu legado.',
    lines: ['Tu palomar.', 'Tu historia.', 'Tu legado.'],
    body: 'Buchonean2 es la aplicación móvil para palomeros: registra tus palomas, la cría, la genealogía, las capturas, la salud y los vuelos, y conecta con la comunidad palomera de tu zona.',
    cta: 'Ver todas las funciones',
    status: 'Próximamente en App Store y Google Play',
    photoAlt:
      'Palomo buchón de pecho blanco y alas moteadas de gris, con el buche inflado y una anilla azul en la pata, posado sobre un muro de piedra al sol.',
  },
  flightAlt:
    'Paloma de plumaje oscuro en pleno vuelo, con las alas extendidas y la cola abierta contra el cielo azul.',
  index: {
    title: 'Doce módulos. Un solo palomar.',
    body: 'Todo lo que pasa en tu palomar tiene su lugar en la app, desde el primer huevo de la nidada hasta la última captura.',
    link: 'Ver cada módulo en detalle',
  },
  groups: [
    {
      title: 'Tu palomar organizado.',
      body: 'Cada paloma con su ficha completa: anilla, fotos, padres y su historia. La encuentras por nombre o por anilla en segundos.',
    },
    {
      title: 'Cada generación cuenta.',
      body: 'Lleva tus parejas, nidadas y huevos día a día, registra a los pichones con sus padres y construye el árbol de tus mejores líneas.',
    },
    {
      title: 'Cada captura tiene su historia.',
      body: 'Anota cada captura con la paloma que la logró, la anilla capturada, la fecha y la foto o el video. Y controla el tiempo de cada vuelo.',
    },
    {
      title: 'Cuida lo que más valoras.',
      body: 'Vacunas, medicamentos, desparasitaciones y chequeos en un solo historial, con avisos para que ningún cuidado se quede pendiente.',
    },
    {
      title: 'La comunidad palomera.',
      body: 'Comparte solo lo que tú decidas, descubre palomares cerca de ti y sigue las capturas y la clasificación de tu zona.',
    },
    {
      title: 'Todo a tu alcance.',
      body: 'Encuentra tiendas cerca de tu palomar, ofrece las palomas que tienes en venta y decide qué es privado y qué es público.',
    },
  ],
  details: 'Ver detalles',
  care: {
    title: 'Tipos de cuidado que registras',
    items: [
      'Vacunación',
      'Medicamento',
      'Desparasitación',
      'Chequeo veterinario',
    ],
    footnote:
      'Cada cuidado puede repetirse o programarse para una fecha, con aviso ese día.',
  },
  screenCaption: 'Pantalla real de la app en desarrollo, con datos de prueba.',
  screenCaptionEs:
    'Pantalla real de la app en desarrollo, con datos de prueba.',
  screenAlt: {
    pigeon:
      'Ficha de la paloma Gavino en la app, con las pestañas Información, Capturas, Cría, Pedigrí y Premios, su padre, su madre y el estado de venta.',
    breeding:
      'Pantalla Cría de la app con la pareja activa formada por el macho Atlas y la hembra Pearl, sus anillas y la fecha de inicio.',
    flight:
      'Pantalla de entrenamiento con la paloma Gavino en vuelo: 18:41 de tiempo restante sobre 30:00 programados y el botón «Ya entró».',
    profile:
      'Pantalla Perfil de la app con el nombre del palomar, el interruptor de perfil público, los anuncios y las capturas públicas.',
  },
  statusLabel: { development: 'En desarrollo', planned: 'Planificado' },
  statusLegend: [
    {
      status: 'development' as Status,
      body: 'La función ya existe en la app y se está probando antes del lanzamiento.',
    },
    {
      status: 'planned' as Status,
      body: 'Está prevista, pero todavía no forma parte de la app.',
    },
  ],
  today: {
    title: 'Dónde está Buchonean2 hoy.',
    items: [
      {
        label: 'iPhone',
        body: 'La app para iPhone está en pruebas internas antes de llegar a App Store.',
      },
      {
        label: 'Android',
        body: 'La versión para Android está planificada para Google Play.',
      },
      {
        label: 'Funciones',
        body: 'Los doce módulos existen en la app y se están probando. Ninguno está publicado todavía.',
      },
    ],
    link: 'Ver el estado de cada función',
  },
  modules: {
    pigeons: {
      name: 'Palomas',
      summary: 'La ficha completa de cada paloma, siempre en el bolsillo.',
      body: 'Registra cada paloma con su anilla y su historia, y encuéntrala por nombre o por anilla cuando la necesites. La ficha reúne datos, fotos, padres, capturas, cría y premios en un solo lugar.',
      points: [
        'Anilla con año y descripción, sexo, color y tipo',
        'Edad exacta en años, meses y días',
        'Clasificación: voladora, reproductora o pichón',
        'Hasta 12 fotos por paloma, premios y estado de venta',
        'Préstamos de palomas y ficha en PDF para compartir',
      ],
    },
    breeding: {
      name: 'Cría',
      summary: 'Sigue cada pareja desde la postura hasta el pichón anillado.',
      body: 'Forma tus parejas y lleva cada nidada huevo por huevo. La app calcula cuándo debería nacer y cuándo toca anillar, y el pichón pasa a tu palomar con su padre y su madre ya enlazados.',
      points: [
        'Parejas activas e historial de cada una',
        'Nidadas de hasta dos huevos: puesto, nacido, no eclosionó, infértil o perdido',
        'Fechas estimadas de eclosión y de anillado',
        'Registro del pichón en tu palomar con padre y madre',
        'Avisos opcionales del ciclo de cría',
      ],
    },
    pedigree: {
      name: 'Árbol genealógico',
      summary: 'La línea paterna y materna de cada paloma.',
      body: 'Recorre la genealogía generación por generación desde la ficha de cada paloma. Puedes añadir antepasados que nunca estuvieron en tu palomar, aunque solo conozcas su anilla.',
      points: [
        'Padre y madre enlazados desde la ficha',
        'Navegación por generaciones y por la descendencia',
        'Antepasados externos, aunque solo conozcas la anilla',
        'Aviso cuando un vínculo familiar no tiene sentido',
        'Exportación de la genealogía a PDF',
      ],
    },
    captures: {
      name: 'Capturas',
      summary: 'El registro de cada captura y de la paloma que la logró.',
      body: 'Anota la anilla capturada, quién la trajo, cuándo y dónde. Con el historial de cada paloma sabes cuáles de tus buchones rinden de verdad.',
      points: [
        'Anilla capturada y año, fecha y hora',
        'Tipo de paloma capturada: buchón, mensajera o sata',
        'Foto, enlace de video o video corto desde el iPhone',
        'Historial por paloma, búsqueda y orden por fecha',
        'Compartir con la comunidad captura por captura, si lo eliges',
      ],
    },
    health: {
      name: 'Salud',
      summary: 'El historial médico del palomar y los cuidados que tocan.',
      body: 'Registra cada tratamiento una sola vez aunque sea para varias palomas, y deja programado el siguiente. La app te avisa el día que toca y otra vez si sigue pendiente.',
      points: [
        'Vacunación, medicamento, desparasitación y chequeo veterinario',
        'Un mismo cuidado para varias palomas a la vez',
        'Horario del tratamiento, por ejemplo mañana y noche',
        'Próximo cuidado en una fecha concreta o repetido',
        'Historial médico en la ficha de cada paloma',
      ],
    },
    flights: {
      name: 'Vuelos',
      summary: 'Controla el tiempo de vuelo de cada paloma.',
      body: 'Elige la paloma, suéltala y la app lleva la cuenta. Cuando regrese, marcas «Ya entró» y el vuelo queda en su historial.',
      points: [
        'Vuelos de 30 minutos, 1 hora, 2 horas o el tiempo que elijas',
        'Cuenta regresiva y aviso al cumplirse el tiempo',
        'Tiempo extra registrado si tarda más de lo previsto',
        'Historial de vuelos y estadísticas por paloma',
      ],
    },
    community: {
      name: 'Comunidad',
      summary: 'Muestra tu palomar y conoce otros palomares.',
      body: 'Crea el perfil público de tu palomar cuando quieras y elige qué palomas mostrar. Explora otros palomares, síguelos y mira sus capturas más recientes.',
      points: [
        'Perfil público de tu palomar, solo si lo activas',
        'Explorar palomares y seguir a otros palomeros',
        'Palomas publicadas por sus dueños',
        'Capturas públicas recientes',
      ],
    },
    nearby: {
      name: 'Palomeros cercanos',
      summary: 'Descubre palomares de tu zona sin revelar dónde vives.',
      body: 'Busca palomares públicos a 10, 25, 50 o 100 millas. La distancia se calcula entre áreas aproximadas, nunca entre casas.',
      points: [
        'Búsqueda en un radio de 10, 25, 50 o 100 millas',
        'Ubicación aproximada por ciudad o condado, nunca tu dirección',
        'Solo apareces si activas tu ubicación en la comunidad',
        'Puedes desactivarla cuando quieras',
      ],
      note: 'Por ahora, la búsqueda por código postal funciona con códigos de Estados Unidos.',
    },
    rankings: {
      name: 'Clasificación local',
      summary: 'Las palomas y palomares con más capturas en tu zona.',
      body: 'Un Top 3 de tu región basado en un conteo que cualquiera entiende: capturas públicas registradas. Sin puntuaciones secretas.',
      points: [
        'Top 3 de palomas y de palomares de tu región',
        'Cuenta capturas públicas registradas',
        'Solo cuentan capturas que su dueño decidió compartir',
      ],
      note: 'La clasificación es histórica. Las clasificaciones mensuales y anuales están planificadas.',
    },
    stores: {
      name: 'Tiendas cercanas',
      summary: 'Dónde comprar alimento y suministros cerca de tu palomar.',
      body: 'Encuentra tiendas cerca de tu palomar ordenadas por distancia, en lista o en el mapa.',
      points: [
        'Suministros para palomas, tiendas de aves, alimento y semillas y tiendas de mascotas',
        'Lista ordenada por cercanía y vista de mapa',
        'Valoraciones de otros clientes',
      ],
    },
    sale: {
      name: 'En venta',
      summary: 'Ofrece tus palomas a la comunidad, con tus condiciones.',
      body: 'Prepara el anuncio como borrador privado y publícalo cuando esté listo. Los interesados te contactan por el medio que tú elijas.',
      points: [
        'Anuncio con precio, moneda, descripción y hasta 12 fotos',
        'Estado del anuncio: en venta, reservada o vendida',
        'Contacto que tú eliges; tu correo nunca se muestra',
        'Borrador privado hasta que decidas publicar',
      ],
      note: 'Buchonean2 no cobra pagos ni intermedia en la venta: el trato es entre palomeros.',
    },
    privacy: {
      name: 'Perfil y privacidad',
      summary: 'Tú decides qué es privado y qué ve la comunidad.',
      body: 'Tus registros son privados desde el primer día. Publicar el perfil, una paloma o una captura es siempre una decisión tuya, y puedes retirarla cuando quieras.',
      points: [
        'Registros privados por defecto',
        'Nombre de tu palomar y perfil público activable',
        'Ubicación en la comunidad opcional y reversible',
        'Avisos, idioma español o inglés y tema claro u oscuro',
      ],
    },
  } as Record<ModuleId, Module>,
  features: {
    title: 'Todo lo que hace Buchonean2.',
    intro:
      'Doce módulos pensados para el día a día del palomar. Aquí tienes cada uno en detalle, con su estado real de desarrollo.',
    jump: 'Ir a un módulo',
    points: 'Qué puedes hacer',
    plannedTitle: 'Lo que viene',
    plannedBody:
      'Estas mejoras están previstas, pero todavía no forman parte de la app.',
    planned: [
      'Versión para Android en Google Play',
      'Registro de palomas perdidas y recuperadas',
      'Clasificaciones mensuales y anuales',
      'Búsqueda por código postal fuera de Estados Unidos',
    ],
  },
  community: {
    title: 'La comunidad palomera, a tu manera.',
    intro:
      'Buchonean2 une a palomeros de Cuba y de toda la comunidad hispana. Todo lo que compartes es opcional: tus registros siguen siendo privados hasta que tú decidas.',
    privacyTitle: 'Tú decides qué se ve.',
    privateTitle: 'Siempre privado',
    privateItems: [
      'Las notas privadas de tus palomas',
      'La ubicación exacta de tu palomar y de tus capturas',
      'Las palomas inactivas o fallecidas',
      'Tu correo electrónico',
    ],
    publicTitle: 'Público solo si lo eliges',
    publicItems: [
      'El perfil y el nombre de tu palomar',
      'Las palomas que publiques',
      'Las capturas que compartas, con ubicación aproximada',
      'Tus anuncios de palomas en venta',
    ],
    locationTitle: 'Cerca, sin revelar tu casa.',
    locationBody:
      'La ubicación solo se pide cuando pulsas «Usar mi ubicación», o puedes escribir tu código postal. La comunidad ve un área aproximada, el centro de tu ciudad o de tu condado, nunca tu dirección ni tu GPS.',
    rankingTitle: 'Una clasificación que se entiende.',
    rankingBody:
      'La clasificación local cuenta capturas públicas registradas. No es un resultado deportivo verificado ni una puntuación secreta: es un conteo claro de lo que cada palomero decidió compartir.',
    explore: 'Qué encontrarás',
    valuesTitle: 'Lo que nos une.',
    values: [
      {
        title: 'Respeto',
        body: 'Detrás de cada palomar hay una persona. Tratar bien a los demás es el punto de partida.',
      },
      {
        title: 'Conocimiento',
        body: 'Cada generación tiene algo que enseñar y algo que aprender. Compartir experiencia mantiene viva la afición.',
      },
      {
        title: 'Dedicación',
        body: 'El cuidado diario de las palomas y del palomar es parte del orgullo que compartimos.',
      },
    ],
    note: 'Las normas de participación y los canales oficiales de la comunidad se publicarán cuando estén confirmados.',
  },
  availability: {
    title: 'Tu palomar, siempre contigo.',
    body: 'Buchonean2 llegará primero a iPhone a través de App Store. La versión para Android está planificada para Google Play. No hay fecha de lanzamiento confirmada.',
    note: 'Las descargas aún no están disponibles.',
    ios: 'iPhone: en pruebas',
    android: 'Android: planificado',
  },
  faqTitle: 'Las primeras preguntas, resueltas.',
  allFaq: 'Ver todas las preguntas',
  questions: [
    {
      q: '¿Ya puedo descargar Buchonean2?',
      a: 'Todavía no. La app para iPhone está en pruebas internas y llegará a App Store; la versión para Android está planificada para Google Play. Publicaremos los enlaces oficiales cuando estén disponibles.',
    },
    {
      q: '¿Qué puedo hacer con la app?',
      a: 'Registrar tus palomas, la cría, la genealogía, las capturas, la salud y los vuelos, y participar en la comunidad: palomares públicos, palomeros cercanos, clasificación local, tiendas cercanas y palomas en venta. Todas estas funciones están en desarrollo y en pruebas.',
    },
    {
      q: '¿Mis palomas y capturas son públicas?',
      a: 'No, a menos que tú lo decidas. Tus registros son privados por defecto. Puedes publicar tu perfil, una paloma o una captura de una en una, y retirarlas cuando quieras.',
    },
    {
      q: '¿Tengo que compartir mi ubicación?',
      a: 'No. La ubicación es opcional y solo sirve para descubrir palomeros y tiendas cercanas. Si la activas, la comunidad ve un área aproximada, nunca tu dirección.',
    },
    {
      q: '¿Cuándo se lanzará la aplicación?',
      a: 'No hay una fecha de lanzamiento confirmada. Este sitio se actualizará cuando haya información oficial.',
    },
    {
      q: '¿En qué idiomas está?',
      a: 'La app y este sitio están en español e inglés. En el sitio, usa el selector ES / EN de la parte superior de cada página.',
    },
    {
      q: '¿Cómo puedo contactar con soporte?',
      a: 'El canal oficial de soporte todavía no está publicado. Mientras tanto, consulta la página de soporte y estas preguntas frecuentes.',
    },
  ],
  faq: {
    title: 'Todo empieza con una pregunta.',
    intro:
      'Lo que sabemos hasta ahora sobre Buchonean2, su disponibilidad, tu privacidad y este sitio.',
  },
  support: {
    title: 'Estamos preparando la ayuda que necesitas.',
    intro:
      'Encuentra la información disponible mientras se prepara el lanzamiento.',
    heading: 'Canal de soporte pendiente',
    body: 'Todavía no hay un correo ni un formulario de soporte oficial publicado. Anunciaremos aquí el canal de contacto cuando esté confirmado.',
    faq: 'Consultar preguntas frecuentes',
    status: 'Estado de la aplicación',
    statusBody:
      'iPhone en pruebas internas antes de App Store. Android planificado para Google Play. Sin fecha de lanzamiento confirmada.',
  },
  footer: {
    line: 'Tu palomar. Tu historia. Tu legado.',
    note: 'Próximamente en App Store y Google Play. Sin fecha de lanzamiento confirmada.',
    rights: 'Buchonean2',
    brand: 'Logotipo oficial de Buchonean2',
  },
  notFound: {
    title: 'Esta página no está aquí.',
    body: 'Puede que la dirección haya cambiado o que el enlace esté incompleto.',
    link: 'Volver al inicio',
  },
  meta: {
    home: {
      title: 'Buchonean2 | La app para palomeros: palomas, cría y capturas',
      description:
        'Buchonean2 es la app móvil para palomeros y criadores de buchones: palomas, cría, genealogía, capturas, salud, vuelos y comunidad. Próximamente en App Store y Google Play.',
    },
    features: {
      title: 'Funciones de Buchonean2 | Palomas, cría, capturas, salud y más',
      description:
        'Los 12 módulos de Buchonean2: palomas, cría, árbol genealógico, capturas, salud, vuelos, comunidad, palomeros cercanos, clasificación local, tiendas, venta y privacidad.',
    },
    community: {
      title: 'Comunidad palomera | Buchonean2',
      description:
        'Palomares públicos, palomeros cercanos con ubicación aproximada, capturas públicas, clasificación local y tiendas cercanas. En Buchonean2 tú decides qué compartes.',
    },
    faq: {
      title: 'Preguntas frecuentes | Buchonean2',
      description:
        'Resuelve tus dudas sobre Buchonean2: disponibilidad en App Store y Google Play, funciones, privacidad, ubicación, idiomas y soporte.',
    },
    support: {
      title: 'Soporte y ayuda | Buchonean2',
      description:
        'Consulta la información de ayuda de Buchonean2 y las preguntas frecuentes mientras se prepara el canal oficial de soporte.',
    },
  },
}

export type Copy = typeof es

const en: Copy = {
  nav: {
    home: 'Home',
    features: 'Features',
    community: 'Community',
    faq: 'FAQ',
    support: 'Support',
  },
  navShort: {
    home: 'Home',
    features: 'Features',
    community: 'Community',
    faq: 'FAQ',
    support: 'Support',
  },
  skip: 'Skip to content',
  menu: 'Open menu',
  close: 'Close menu',
  language: 'Select language',
  mainNav: 'Main navigation',
  mobileNav: 'Mobile navigation',
  footerNav: 'Footer',
  soon: 'Coming soon',
  hero: {
    tag: 'The app for pigeon breeders',
    title: 'Your loft. Your story. Your legacy.',
    lines: ['Your loft.', 'Your story.', 'Your legacy.'],
    body: 'Buchonean2 is the mobile app for palomeros, the pigeon breeders behind every loft: record your pigeons, breeding, pedigrees, captures, health and flights, and connect with the breeders near you.',
    cta: 'See every feature',
    status: 'Coming soon to the App Store and Google Play',
    photoAlt:
      'A white-breasted buchón pouter with grey-mottled wings, its crop puffed out and a blue ring on its leg, perched on a sunlit stone wall.',
  },
  flightAlt:
    'A dark-feathered pigeon in flight, wings spread and tail fanned against a blue sky.',
  index: {
    title: 'Twelve modules. One loft.',
    body: 'Everything that happens in your loft has a place in the app, from the first egg in a clutch to the latest capture.',
    link: 'See each module in detail',
  },
  groups: [
    {
      title: 'Your loft, organized.',
      body: 'Every pigeon with a complete record: ring, photos, parents and history. Find any bird by name or ring number in seconds.',
    },
    {
      title: 'Every generation counts.',
      body: 'Follow your pairs, clutches and eggs day by day, register each squab with its parents and build the pedigree of your best lines.',
    },
    {
      title: 'Every capture has a story.',
      body: 'Record each capture with the pigeon that made it, the captured ring, the date and a photo or video. And time every flight.',
    },
    {
      title: 'Care for what matters most.',
      body: 'Vaccinations, medication, parasite treatments and checkups in one history, with reminders so no treatment gets missed.',
    },
    {
      title: 'The breeder community.',
      body: 'Share only what you choose, discover lofts near you and follow the captures and rankings in your area.',
    },
    {
      title: 'Everything within reach.',
      body: 'Find stores near your loft, offer the pigeons you have for sale and decide what stays private and what is public.',
    },
  ],
  details: 'See details',
  care: {
    title: 'Types of care you record',
    items: ['Vaccination', 'Medication', 'Parasite treatment', 'Vet checkup'],
    footnote:
      'Each treatment can repeat or be scheduled for a date, with a reminder that day.',
  },
  screenCaption: 'Actual in-development app screen, shown with test data.',
  screenCaptionEs:
    'Actual in-development app screen in Spanish, shown with test data.',
  screenAlt: {
    pigeon:
      'The app’s record for a pigeon named Gavino, with Information, Captures, Breeding, Pedigree and Awards tabs, its father, mother and sale status.',
    breeding:
      'The app’s Breeding screen showing an active pair, the cock Atlas and the hen Pearl, with their rings and start date.',
    flight:
      'The Spanish training screen with the pigeon Gavino in flight: 18:41 remaining of a planned 30:00 and the button marking that it is back.',
    profile:
      'The app’s Profile screen with the loft name, the public profile switch, listings and public captures.',
  },
  statusLabel: { development: 'In development', planned: 'Planned' },
  statusLegend: [
    {
      status: 'development',
      body: 'The feature exists in the app and is being tested before launch.',
    },
    {
      status: 'planned',
      body: 'It is on the roadmap but not part of the app yet.',
    },
  ],
  today: {
    title: 'Where Buchonean2 stands today.',
    items: [
      {
        label: 'iPhone',
        body: 'The iPhone app is in internal testing before it reaches the App Store.',
      },
      {
        label: 'Android',
        body: 'An Android version is planned for Google Play.',
      },
      {
        label: 'Features',
        body: 'All twelve modules exist in the app and are being tested. None has been released yet.',
      },
    ],
    link: 'See the status of each feature',
  },
  modules: {
    pigeons: {
      name: 'Pigeons',
      summary: 'A complete record of every pigeon, always in your pocket.',
      body: 'Record each pigeon with its ring and its history, and find it by name or ring number whenever you need it. One record holds details, photos, parents, captures, breeding and awards.',
      points: [
        'Ring number with year and description, sex, color and type',
        'Exact age in years, months and days',
        'Classification: flyer, breeder or young bird',
        'Up to 12 photos per pigeon, awards and sale status',
        'Pigeon loans and a PDF record to share',
      ],
    },
    breeding: {
      name: 'Breeding',
      summary: 'Follow each pair from the first egg to a ringed squab.',
      body: 'Pair your birds and track every clutch egg by egg. The app estimates when each egg should hatch and when to ring the squab, which joins your loft with its father and mother already linked.',
      points: [
        'Active pairs and the history of each one',
        'Clutches of up to two eggs: laid, hatched, unhatched, infertile or lost',
        'Estimated hatching and ringing dates',
        'Register a squab in your loft with its father and mother',
        'Optional breeding-cycle reminders',
      ],
    },
    pedigree: {
      name: 'Pedigree',
      summary: 'The sire and dam lines of every pigeon.',
      body: 'Walk the pedigree generation by generation from any pigeon’s record. Add ancestors that were never in your loft, even if all you know is the ring number.',
      points: [
        'Father and mother linked from the pigeon’s record',
        'Browse generations and offspring',
        'Outside ancestors, even with only a ring number',
        'A warning when a family link cannot be right',
        'Export the pedigree to PDF',
      ],
    },
    captures: {
      name: 'Captures',
      summary: 'A record of every capture and the pigeon that made it.',
      body: 'Log the captured ring, which of your birds brought it in, when and where. Each pigeon’s capture history shows which of your buchones really perform.',
      points: [
        'Captured ring and year, date and time',
        'Type of captured pigeon: buchón, homer or sata',
        'Photo, video link or a short video from your iPhone',
        'History per pigeon, search and date sorting',
        'Share with the community one capture at a time, if you choose',
      ],
    },
    health: {
      name: 'Health',
      summary: 'Your loft’s medical history and the care that is due.',
      body: 'Record a treatment once, even for several pigeons, and schedule the next one. The app reminds you on the day and again if it is still pending.',
      points: [
        'Vaccination, medication, parasite treatment and vet checkups',
        'One treatment for several pigeons at once',
        'Treatment schedule, for example morning and evening',
        'Next treatment on a set date or repeating',
        'Medical history on each pigeon’s record',
      ],
    },
    flights: {
      name: 'Flights',
      summary: 'Time every pigeon’s flight.',
      body: 'Choose a pigeon, release it and let the app keep time. When it lands, mark it as back and the flight is saved to its history.',
      points: [
        'Flights of 30 minutes, 1 hour, 2 hours or a time you choose',
        'Countdown and a reminder when time is up',
        'Extra time recorded when a bird is late',
        'Flight history and statistics per pigeon',
      ],
    },
    community: {
      name: 'Community',
      summary: 'Show your loft and get to know other lofts.',
      body: 'Create a public profile for your loft whenever you like and choose which pigeons to show. Explore other lofts, follow them and see their latest captures.',
      points: [
        'A public loft profile, only if you turn it on',
        'Explore lofts and follow other breeders',
        'Pigeons published by their owners',
        'Recent public captures',
      ],
    },
    nearby: {
      name: 'Nearby breeders',
      summary: 'Discover lofts in your area without revealing where you live.',
      body: 'Search public lofts within 10, 25, 50 or 100 miles. Distances are measured between approximate areas, never between homes.',
      points: [
        'Search within 10, 25, 50 or 100 miles',
        'Approximate location by city or county, never your address',
        'You only appear if you turn on your community location',
        'Turn it off at any time',
      ],
      note: 'For now, ZIP code search works with US postal codes.',
    },
    rankings: {
      name: 'Local rankings',
      summary: 'The pigeons and lofts with the most captures in your area.',
      body: 'A regional Top 3 based on a count anyone understands: registered public captures. No secret scores.',
      points: [
        'Top 3 pigeons and lofts in your region',
        'Counts registered public captures',
        'Only captures their owners chose to share are counted',
      ],
      note: 'Rankings are all-time. Monthly and yearly rankings are planned.',
    },
    stores: {
      name: 'Nearby stores',
      summary: 'Where to buy feed and supplies near your loft.',
      body: 'Find stores near your loft sorted by distance, as a list or on a map.',
      points: [
        'Pigeon supplies, bird shops, feed and seed and pet stores',
        'List sorted by distance and a map view',
        'Ratings from other customers',
      ],
    },
    sale: {
      name: 'For sale',
      summary: 'Offer your pigeons to the community on your terms.',
      body: 'Prepare a listing as a private draft and publish it when it is ready. Interested breeders contact you the way you choose.',
      points: [
        'Listing with price, currency, description and up to 12 photos',
        'Listing status: for sale, reserved or sold',
        'Contact details you choose; your email is never shown',
        'A private draft until you decide to publish',
      ],
      note: 'Buchonean2 does not take payments or broker sales: the deal is between breeders.',
    },
    privacy: {
      name: 'Profile and privacy',
      summary: 'You decide what is private and what the community sees.',
      body: 'Your records are private from day one. Publishing your profile, a pigeon or a capture is always your decision, and you can take it down whenever you like.',
      points: [
        'Records are private by default',
        'Your loft name and an optional public profile',
        'Optional, reversible community location',
        'Reminders, Spanish or English, and light or dark theme',
      ],
    },
  },
  features: {
    title: 'Everything Buchonean2 does.',
    intro:
      'Twelve modules built around daily life in the loft. Here is each one in detail, with its actual development status.',
    jump: 'Go to a module',
    points: 'What you can do',
    plannedTitle: 'What’s next',
    plannedBody:
      'These improvements are planned but are not part of the app yet.',
    planned: [
      'An Android version on Google Play',
      'Lost and recovered pigeon records',
      'Monthly and yearly rankings',
      'Postal code search outside the United States',
    ],
  },
  community: {
    title: 'The breeder community, your way.',
    intro:
      'Buchonean2 brings together palomeros from Cuba and Hispanic communities everywhere. Everything you share is optional: your records stay private until you decide otherwise.',
    privacyTitle: 'You decide what is seen.',
    privateTitle: 'Always private',
    privateItems: [
      'Your private notes about each pigeon',
      'The exact location of your loft and your captures',
      'Inactive or deceased pigeons',
      'Your email address',
    ],
    publicTitle: 'Public only if you choose',
    publicItems: [
      'Your loft profile and name',
      'The pigeons you publish',
      'The captures you share, with an approximate location',
      'Your listings of pigeons for sale',
    ],
    locationTitle: 'Close by, without revealing your home.',
    locationBody:
      'Your location is only requested when you tap Use My Location, or you can type your ZIP code. The community sees an approximate area, the center of your city or county, never your address or GPS position.',
    rankingTitle: 'Rankings anyone can follow.',
    rankingBody:
      'Local rankings count registered public captures. They are not verified sporting results or a secret score: just a clear count of what each breeder chose to share.',
    explore: 'What you’ll find',
    valuesTitle: 'What brings us together.',
    values: [
      {
        title: 'Respect',
        body: 'There is a person behind every loft. Treating each other well is where we start.',
      },
      {
        title: 'Knowledge',
        body: 'Every generation has something to teach and something to learn. Sharing experience keeps the tradition alive.',
      },
      {
        title: 'Dedication',
        body: 'The daily care of our pigeons and our lofts is part of the pride we share.',
      },
    ],
    note: 'Community guidelines and official channels will be published once confirmed.',
  },
  availability: {
    title: 'Your loft, always with you.',
    body: 'Buchonean2 is coming to iPhone first through the App Store. An Android version is planned for Google Play. A launch date has not been confirmed.',
    note: 'Downloads are not available yet.',
    ios: 'iPhone: in testing',
    android: 'Android: planned',
  },
  faqTitle: 'Your first questions, answered.',
  allFaq: 'See all questions',
  questions: [
    {
      q: 'Can I download Buchonean2 yet?',
      a: 'Not yet. The iPhone app is in internal testing and is coming to the App Store; an Android version is planned for Google Play. We’ll publish official download links when they are available.',
    },
    {
      q: 'What can I do with the app?',
      a: 'Record your pigeons, breeding, pedigrees, captures, health and flights, and take part in the community: public lofts, nearby breeders, local rankings, nearby stores and pigeons for sale. All of these features are in development and being tested.',
    },
    {
      q: 'Are my pigeons and captures public?',
      a: 'No, unless you decide so. Your records are private by default. You can publish your profile, a pigeon or a capture one at a time, and take them down whenever you like.',
    },
    {
      q: 'Do I have to share my location?',
      a: 'No. Location is optional and only used to discover nearby breeders and stores. If you turn it on, the community sees an approximate area, never your address.',
    },
    {
      q: 'When will the app launch?',
      a: 'There is no confirmed launch date. This website will be updated when official information is available.',
    },
    {
      q: 'Which languages are supported?',
      a: 'The app and this website are available in Spanish and English. On the website, use the ES / EN selector at the top of every page.',
    },
    {
      q: 'How can I contact support?',
      a: 'An official support channel has not been published yet. In the meantime, visit the support page and these frequently asked questions.',
    },
  ],
  faq: {
    title: 'It starts with a question.',
    intro:
      'What we know so far about Buchonean2, its availability, your privacy and this website.',
  },
  support: {
    title: 'Getting your help ready.',
    intro: 'Find the information available as we prepare for launch.',
    heading: 'Support channel coming later',
    body: 'No official support email or contact form has been published yet. We’ll announce the contact channel here once it is confirmed.',
    faq: 'Read frequently asked questions',
    status: 'App availability',
    statusBody:
      'iPhone in internal testing ahead of the App Store. Android planned for Google Play. No confirmed launch date.',
  },
  footer: {
    line: 'Your loft. Your story. Your legacy.',
    note: 'Coming soon to the App Store and Google Play. No confirmed launch date.',
    rights: 'Buchonean2',
    brand: 'Official Buchonean2 logo',
  },
  notFound: {
    title: 'This page isn’t here.',
    body: 'The address may have changed, or the link may be incomplete.',
    link: 'Back to home',
  },
  meta: {
    home: {
      title: 'Buchonean2 | The app for pigeon breeders and their lofts',
      description:
        'Buchonean2 is the mobile app for pigeon breeders and buchón keepers: pigeons, breeding, pedigrees, captures, health, flights and community. Coming soon to the App Store and Google Play.',
    },
    features: {
      title: 'Buchonean2 Features | Pigeons, breeding, captures, health',
      description:
        'All 12 Buchonean2 modules: pigeons, breeding, pedigree, captures, health, flights, community, nearby breeders, local rankings, nearby stores, for sale and privacy.',
    },
    community: {
      title: 'Pigeon Breeder Community | Buchonean2',
      description:
        'Public lofts, nearby breeders with approximate location, public captures, local rankings and nearby stores. On Buchonean2 you decide what you share.',
    },
    faq: {
      title: 'Frequently asked questions | Buchonean2',
      description:
        'Answers about Buchonean2: App Store and Google Play availability, features, privacy, location, languages and support.',
    },
    support: {
      title: 'Support and help | Buchonean2',
      description:
        'Find Buchonean2 help information and frequently asked questions while the official support channel is being prepared.',
    },
  },
}

export const content: Record<Locale, Copy> = { es, en }
