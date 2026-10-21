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
      title: 'Tu palomar. Tu legado. Tu pasión.',
      lines: ['Tu palomar.', 'Tu legado.', 'Tu pasión.'],
      body: 'Cada paloma tiene su historia. Cada palomero, su orgullo. Lleva el control de tu palomar con Buchonean2.',
      tag: 'Hecho para palomeros',
      caption: 'La pasión se lleva en el vuelo.',
      captionSmall: 'Buchonean2',
      photoAlt:
        'Paloma de plumaje oscuro en pleno vuelo, con las alas extendidas y la cola abierta contra el cielo azul.',
      signature: 'Orgullo palomero. Pasión compartida.',
      signatureEnd: 'Del palomar al próximo vuelo.',
    },
    intro: {
      title: 'Más que una afición. Una forma de vivir.',
      body: 'Las horas en el palomar. La atención a cada ejemplar. El orgullo de verlo volar. Buchonean2 nace para acompañar esa dedicación y conectar a quienes la comparten.',
    },
    pillars: [
      {
        title: 'De palomero a palomero',
        body: 'Una pasión que se comparte entre criadores, conversaciones y generaciones.',
        link: 'Explorar comunidad',
      },
      {
        title: 'Tu palomar, presente',
        body: 'Conoce la visión de Buchonean2 y consulta los próximos detalles de la aplicación.',
        link: 'Ver funciones',
      },
      {
        title: 'Sin quedarte con la duda',
        body: 'Información sobre disponibilidad, idiomas y próximos anuncios.',
        link: 'Resolver mis dudas',
      },
    ],
    communityTeaser: {
      title: 'El orgullo de ser palomero.',
      body: 'De Cuba a cada rincón de nuestra comunidad hispana, el palomar es un lugar de encuentro. Aquí caben las historias, el conocimiento y el respeto por una pasión que cruza fronteras.',
      link: 'Nuestra comunidad',
      emblem: 'Una pasión que nos representa.',
    },
    availability: {
      title: 'Tu pasión siempre contigo.',
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
      title: 'El próximo paso para tu palomar.',
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
      title: 'Palomeros. Una pasión sin fronteras.',
      intro:
        'De Cuba a la comunidad hispana en todo el mundo. Nos unen la dedicación al palomar, el conocimiento compartido y el orgullo por nuestros ejemplares.',
      heading: 'El legado también se comparte.',
      values: [
        {
          title: 'Respeto',
          body: 'Detrás de cada conversación hay una persona. Escuchar y tratar bien a los demás es nuestro punto de partida.',
        },
        {
          title: 'Conocimiento',
          body: 'Cada generación tiene algo que enseñar y algo que aprender. Compartir experiencias mantiene viva nuestra afición.',
        },
        {
          title: 'Dedicación',
          body: 'El cuidado diario de las palomas y la atención al palomar son parte del orgullo que compartimos.',
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
      line: 'Tu palomar. Tu legado. Tu pasión.',
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
        title: 'Buchonean2 | Tu palomar. Tu legado. Tu pasión.',
        description:
          'Buchonean2, la próxima aplicación para tu palomar y la comunidad palomera. Tu legado y tu pasión, siempre contigo. Próximamente en iOS y Android.',
      },
      features: {
        title: 'Funciones de Buchonean2 | Información y novedades',
        description:
          'Consulta el estado de las funciones de Buchonean2. Los detalles de la aplicación se publicarán cuando estén confirmados.',
      },
      community: {
        title: 'Comunidad palomera | Buchonean2',
        description:
          'Conoce la comunidad palomera de Buchonean2. Criadores de Cuba y de la comunidad hispana unidos por el respeto, la dedicación y las palomas buchonas.',
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
      title: 'Your Loft. Your Legacy. Your Passion.',
      lines: ['Your Loft.', 'Your Legacy.', 'Your Passion.'],
      body: 'Every pigeon has a story. Every breeder takes pride in theirs. Manage your loft with Buchonean2.',
      tag: 'Made for pigeon breeders',
      caption: 'Passion takes flight.',
      captionSmall: 'Buchonean2',
      photoAlt:
        'A dark-feathered pigeon in flight, wings spread and tail fanned against a blue sky.',
      signature: 'Proud breeders. Shared passion.',
      signatureEnd: 'From your loft to the next flight.',
    },
    intro: {
      title: 'More than a hobby. A way of life.',
      body: 'Hours in the loft. Care for every bird. The pride of watching them fly. Buchonean2 is built around that dedication and the people who share it.',
    },
    pillars: [
      {
        title: 'Breeder to breeder',
        body: 'A passion passed between breeders, through conversations and across generations.',
        link: 'Explore the community',
      },
      {
        title: 'Your loft comes first',
        body: 'Explore the vision for Buchonean2 and find upcoming details about the app.',
        link: 'Explore features',
      },
      {
        title: 'Clear answers',
        body: 'Information on availability, languages and upcoming announcements.',
        link: 'Find answers',
      },
    ],
    communityTeaser: {
      title: 'Proud to be a pigeon breeder.',
      body: 'From Cuba to Hispanic communities around the world, the loft brings people together. Share the stories, knowledge and respect behind a passion that crosses borders.',
      link: 'Our community',
      emblem: 'A passion we call our own.',
    },
    availability: {
      title: 'Keep your passion close.',
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
      title: 'The next chapter for your loft.',
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
      title: 'Pigeon breeders. Passion without borders.',
      intro:
        'From Cuba to Hispanic communities worldwide. We share a dedication to our lofts, a wealth of knowledge and pride in our birds.',
      heading: 'A legacy worth sharing.',
      values: [
        {
          title: 'Respect',
          body: 'There is a person behind every conversation. Listening and treating each other well is where we start.',
        },
        {
          title: 'Knowledge',
          body: 'Every generation has something to teach and something to learn. Sharing experience keeps our passion alive.',
        },
        {
          title: 'Dedication',
          body: 'The daily care of our pigeons and attention to our lofts are part of the pride we share.',
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
      line: 'Your Loft. Your Legacy. Your Passion.',
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
        title: 'Buchonean2 | Your Loft. Your Legacy. Your Passion.',
        description:
          'Meet Buchonean2, the upcoming app for your pigeon loft and breeding community. Keep your legacy and passion close. Coming soon to iOS and Android.',
      },
      features: {
        title: 'Buchonean2 Features | Information and updates',
        description:
          'Check the status of Buchonean2 features. App details will be published once they have been confirmed.',
      },
      community: {
        title: 'Pigeon Breeding Community | Buchonean2',
        description:
          'Meet the Buchonean2 pigeon breeding community. Breeders from Cuba and Hispanic communities sharing respect, dedication and a passion for buchón pigeons.',
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
