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

export const content = {
  es: {
    nav: {
      home: 'Inicio',
      features: 'Funciones',
      community: 'Comunidad',
      faq: 'Preguntas frecuentes',
      support: 'Soporte',
    },
    skip: 'Saltar al contenido',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
    language: 'Seleccionar idioma',
    soon: 'Próximamente',
    explore: 'Conoce Buchonean2',
    discover: 'Descubre la comunidad',
    hero: {
      title: 'Hay pasiones que nos acercan.',
      body: 'Un nuevo capítulo para Buchonean2. Un espacio para nuestra comunidad, con mucho por compartir.',
      tag: 'Lo que viene se vive en comunidad.',
      caption: 'Cada conexión es el comienzo de algo.',
      captionSmall: 'Ilustración conceptual',
    },
    intro: {
      title: 'Una misma pasión. Nuevas conexiones.',
      body: 'Estamos preparando el siguiente paso de Buchonean2. Aquí podrás conocer el proyecto, consultar las novedades confirmadas y encontrar respuestas antes del lanzamiento.',
    },
    pillars: [
      {
        title: 'Un punto de encuentro',
        body: 'Conoce el espacio dedicado a la comunidad Buchonean2.',
        link: 'Explorar comunidad',
      },
      {
        title: 'Lo que viene',
        body: 'Consulta el estado de las funciones y lo que está por anunciarse.',
        link: 'Ver funciones',
      },
      {
        title: 'Respuestas claras',
        body: 'Información sobre disponibilidad, idiomas y próximos anuncios.',
        link: 'Resolver mis dudas',
      },
    ],
    communityTeaser: {
      title: 'La comunidad empieza con nosotros.',
      body: 'La curiosidad, el respeto y las ganas de compartir nos acercan. Conoce la visión detrás de este nuevo capítulo.',
      link: 'Nuestra comunidad',
    },
    availability: {
      title: 'El próximo capítulo, en tu bolsillo.',
      body: 'Buchonean2 llegará a App Store y Google Play. La fecha de lanzamiento todavía no está confirmada.',
      note: 'Las descargas aún no están disponibles.',
    },
    faqTitle: 'Las primeras preguntas, resueltas.',
    allFaq: 'Ver todas las preguntas',
    questions: [
      {
        q: '¿Ya puedo descargar Buchonean2?',
        a: 'Todavía no. La aplicación está anunciada como «Próximamente» en App Store y Google Play. Publicaremos los enlaces oficiales cuando estén disponibles.',
      },
      {
        q: '¿Cuándo se lanzará la aplicación?',
        a: 'No hay una fecha de lanzamiento confirmada. Este sitio se actualizará cuando haya información oficial.',
      },
      {
        q: '¿En qué idiomas está disponible el sitio?',
        a: 'Puedes consultar este sitio en español e inglés. Usa el selector ES / EN, visible en la parte superior de todas las páginas.',
      },
      {
        q: '¿Qué funciones tendrá la aplicación?',
        a: 'El listado definitivo de funciones todavía no está confirmado para este sitio. La página de funciones se actualizará con información verificada.',
      },
      {
        q: '¿Cómo puedo contactar con soporte?',
        a: 'El canal oficial de soporte todavía no está publicado. Mientras tanto, consulta la página de soporte y las preguntas frecuentes para encontrar la información disponible.',
      },
      {
        q: '¿Dónde puedo seguir las novedades?',
        a: 'Consulta este sitio para conocer las novedades confirmadas. Los perfiles sociales y otros canales se enlazarán cuando sean verificados.',
      },
    ],
    features: {
      title: 'Un vistazo a lo que viene.',
      intro:
        'Estamos preparando el próximo capítulo de Buchonean2. Las funciones se presentarán aquí cuando estén confirmadas.',
      heading: 'Información clara, desde el principio.',
      body: 'El catálogo de funciones, la compatibilidad y los requisitos de la aplicación están pendientes de confirmación. No hay descargas disponibles todavía.',
      status: 'Detalles por anunciar',
      items: [
        'Funciones de la aplicación',
        'Compatibilidad y requisitos',
        'Disponibilidad en las tiendas',
      ],
    },
    community: {
      title: 'Lo mejor empieza al conectar.',
      intro:
        'Buchonean2 tiene a su comunidad en el centro. Este espacio presenta los valores que queremos compartir.',
      heading: 'Un espacio para compartir con respeto.',
      values: [
        {
          title: 'Respeto',
          body: 'Detrás de cada conversación hay una persona. Escuchar y tratar bien a los demás es nuestro punto de partida.',
        },
        {
          title: 'Curiosidad',
          body: 'Siempre hay algo nuevo por aprender. Las preguntas y las distintas perspectivas enriquecen una comunidad.',
        },
        {
          title: 'Conexión',
          body: 'Las pasiones compartidas abren conversaciones. Queremos dar lugar a esos encuentros.',
        },
      ],
      note: 'Los canales oficiales y las normas de participación se publicarán cuando estén confirmados.',
    },
    faq: {
      title: 'Todo empieza con una pregunta.',
      intro:
        'Lo que sabemos hasta ahora sobre Buchonean2, su disponibilidad y este sitio.',
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
        'Próximamente en App Store y Google Play. Sin fecha de lanzamiento confirmada.',
    },
    footer: {
      line: 'Una comunidad. Un nuevo capítulo.',
      note: 'Sitio en desarrollo: identidad visual y contenido provisional sujetos a validación. El texto de marca sustituye temporalmente al logotipo oficial.',
      rights: 'Buchonean2',
      brand: 'Marca tipográfica provisional',
    },
    notFound: {
      title: 'Esta página no está aquí.',
      body: 'Puede que la dirección haya cambiado o que el enlace esté incompleto.',
      link: 'Volver al inicio',
    },
    meta: {
      home: {
        title: 'Buchonean2 | Una comunidad, un nuevo capítulo',
        description:
          'Conoce Buchonean2, explora su comunidad y resuelve tus dudas. Próximamente en App Store y Google Play, sin fecha de lanzamiento confirmada.',
      },
      features: {
        title: 'Funciones de Buchonean2 | Información y novedades',
        description:
          'Consulta el estado de las funciones de Buchonean2. Los detalles de la aplicación se publicarán cuando estén confirmados.',
      },
      community: {
        title: 'Comunidad Buchonean2 | Conectar y compartir',
        description:
          'Descubre la visión de la comunidad Buchonean2: respeto, curiosidad y conexión. Conoce este nuevo capítulo del proyecto.',
      },
      faq: {
        title: 'Preguntas frecuentes | Buchonean2',
        description:
          'Resuelve tus dudas sobre Buchonean2: lanzamiento, disponibilidad, idiomas, funciones y canales de soporte.',
      },
      support: {
        title: 'Soporte y ayuda | Buchonean2',
        description:
          'Consulta la información de ayuda de Buchonean2 y las preguntas frecuentes mientras se prepara el canal oficial de soporte.',
      },
    },
  },
  en: {
    nav: {
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
    soon: 'Coming soon',
    explore: 'Meet Buchonean2',
    discover: 'Discover the community',
    hero: {
      title: 'Shared passions bring us closer.',
      body: 'A new chapter for Buchonean2. A space for our community, with so much to share.',
      tag: 'What comes next starts with community.',
      caption: 'Every connection starts something.',
      captionSmall: 'Concept illustration',
    },
    intro: {
      title: 'One shared passion. New connections.',
      body: 'We’re preparing the next step for Buchonean2. Get to know the project, find confirmed updates and get answers before launch.',
    },
    pillars: [
      {
        title: 'A place to meet',
        body: 'Get to know the space dedicated to the Buchonean2 community.',
        link: 'Explore the community',
      },
      {
        title: 'What comes next',
        body: 'Check the status of features and what has yet to be announced.',
        link: 'Explore features',
      },
      {
        title: 'Clear answers',
        body: 'Information on availability, languages and upcoming announcements.',
        link: 'Find answers',
      },
    ],
    communityTeaser: {
      title: 'Community starts with us.',
      body: 'Curiosity, respect and a willingness to share bring us together. Discover the vision behind this new chapter.',
      link: 'Our community',
    },
    availability: {
      title: 'The next chapter, in your pocket.',
      body: 'Buchonean2 is coming to the App Store and Google Play. A launch date has not been confirmed.',
      note: 'Downloads are not available yet.',
    },
    faqTitle: 'Your first questions, answered.',
    allFaq: 'See all questions',
    questions: [
      {
        q: 'Can I download Buchonean2 yet?',
        a: 'Not yet. The app is marked “Coming soon” for the App Store and Google Play. We’ll publish official download links when they are available.',
      },
      {
        q: 'When will the app launch?',
        a: 'There is no confirmed launch date. This website will be updated when official information is available.',
      },
      {
        q: 'Which languages does this website support?',
        a: 'You can browse this website in Spanish and English. Use the ES / EN selector at the top of every page.',
      },
      {
        q: 'What features will the app have?',
        a: 'The final feature list has not been confirmed for this website. The features page will be updated with verified information.',
      },
      {
        q: 'How can I contact support?',
        a: 'An official support channel has not been published yet. In the meantime, visit the support page and FAQ for the information currently available.',
      },
      {
        q: 'Where can I find updates?',
        a: 'Visit this website for confirmed updates. Social profiles and other channels will be linked once verified.',
      },
    ],
    features: {
      title: 'A look at what’s ahead.',
      intro:
        'We’re preparing the next chapter of Buchonean2. Features will be introduced here once they are confirmed.',
      heading: 'Clear information, from the start.',
      body: 'The feature list, compatibility and app requirements are awaiting confirmation. Downloads are not available yet.',
      status: 'Details to be announced',
      items: [
        'App features',
        'Compatibility and requirements',
        'App store availability',
      ],
    },
    community: {
      title: 'Good things start with connection.',
      intro:
        'Community is at the heart of Buchonean2. This space introduces the values we want to share.',
      heading: 'A place to share with respect.',
      values: [
        {
          title: 'Respect',
          body: 'There is a person behind every conversation. Listening and treating each other well is where we start.',
        },
        {
          title: 'Curiosity',
          body: 'There is always something new to learn. Questions and different perspectives enrich a community.',
        },
        {
          title: 'Connection',
          body: 'Shared passions open conversations. We want to make room for those connections.',
        },
      ],
      note: 'Official channels and participation guidelines will be published once confirmed.',
    },
    faq: {
      title: 'It starts with a question.',
      intro:
        'What we know so far about Buchonean2, its availability and this website.',
    },
    support: {
      title: 'Getting your help ready.',
      intro: 'Find the information available as we prepare for launch.',
      heading: 'Support channel coming later',
      body: 'No official support email or contact form has been published yet. We’ll announce the contact channel here once it is confirmed.',
      faq: 'Read frequently asked questions',
      status: 'App availability',
      statusBody:
        'Coming soon to the App Store and Google Play. No confirmed launch date.',
    },
    footer: {
      line: 'One community. A new chapter.',
      note: 'Development site: visual identity and draft content await approval. A temporary wordmark stands in for the official logo.',
      rights: 'Buchonean2',
      brand: 'Temporary wordmark',
    },
    notFound: {
      title: 'This page isn’t here.',
      body: 'The address may have changed, or the link may be incomplete.',
      link: 'Back to home',
    },
    meta: {
      home: {
        title: 'Buchonean2 | One community, a new chapter',
        description:
          'Meet Buchonean2, explore the community and find answers. Coming soon to the App Store and Google Play, with no confirmed launch date.',
      },
      features: {
        title: 'Buchonean2 Features | Information and updates',
        description:
          'Check the status of Buchonean2 features. App details will be published once they have been confirmed.',
      },
      community: {
        title: 'Buchonean2 Community | Connect and share',
        description:
          'Discover the vision for the Buchonean2 community: respect, curiosity and connection. Get to know the next chapter of the project.',
      },
      faq: {
        title: 'Frequently asked questions | Buchonean2',
        description:
          'Find answers about Buchonean2: launch, availability, website languages, features and support channels.',
      },
      support: {
        title: 'Support and help | Buchonean2',
        description:
          'Find Buchonean2 help information and frequently asked questions while the official support channel is being prepared.',
      },
    },
  },
}
