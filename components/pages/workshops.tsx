import { routeAlternates, url, type Locale } from "@/lib/i18n"
import { pageMetadata, SITE_NAME } from "@/lib/site-metadata"
import { JsonLd } from "@/components/structured-data"
import { PreregisterForm, type PreregisterCopy } from "@/components/preregister-form"

const COPY = {
  en: {
    metaTitle: "Workshops",
    title: "Tu primer stack",
    tagline: "A workshop for designers · Taught in Spanish · Date to be announced",
    description:
      "A hands-on workshop for designers: GitHub, dev vocabulary, working with developers and PMs, and building your own work tools. Taught in Spanish.",
    keywords: [
      "workshop for designers Puerto Rico",
      "GitHub for designers",
      "design and development collaboration",
      "Design Dinners",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Home",
    intro: [
      "More and more, design work ends up as code. Designers who understand how their work gets built collaborate better, quote better, and depend less on other people.",
      "This workshop is a first step. I’m putting it together at the request of the Design Dinners community, for designers who want to understand the stack without becoming programmers. The title translates to “your first stack.”",
    ],
    doLabel: "What you’ll do",
    do: [
      "Set up your GitHub account and learn what it’s for.",
      "Learn the words that come up in every meeting with developers: repo, commit, branch, deploy, API, and more.",
      "Build a tool for your own business: an invoice, a project tracker, or a rate calculator. You describe it in plain words to a coding tool and refine it from there.",
      "Publish it online, for free.",
      "Practice explaining your work to developers, PMs, and non-technical people.",
    ],
    takeLabel: "What you take home",
    take: ["A GitHub profile with one live project.", "A one-page dev dictionary for designers."],
    whoLabel: "Who it’s for",
    who: "Designers at every level. No coding experience needed. You work in pairs, one junior with one senior: one brings speed with the tools, the other brings judgment.",
    formatLabel: "Format",
    format: "Two hours, in person, in Spanish. Bring your laptop. Date and place coming soon.",
    formLabel: "Pre-register",
    formIntro: "Sign up and you’ll hear first when there’s a date. It’s not a commitment to attend.",
    form: {
      name: "Name",
      email: "Email",
      level: "Level",
      levels: {
        student: "Student",
        junior: "Junior (0–3 years)",
        mid: "Mid (3–7 years)",
        senior: "Senior (7+ years)",
      },
      interest: "What would you like to learn? (optional)",
      submit: "Pre-register",
      pending: "Sending…",
      success: "Done. I’ll write when there’s a date.",
      invalid: "Check your name, email, and level.",
      error: "Something failed on my end. Try again in a bit.",
      privacy: "I only use your email to tell you about this workshop.",
    },
  },
  es: {
    metaTitle: "Talleres",
    title: "Tu primer stack",
    tagline: "Taller para diseñadores · En español · Fecha por anunciar",
    description:
      "Taller práctico para diseñadores: GitHub, vocabulario dev, cómo colaborar con devs y PMs, y cómo construir tus propias herramientas de trabajo.",
    keywords: [
      "taller para diseñadores Puerto Rico",
      "GitHub para diseñadores",
      "colaboración entre diseño y desarrollo",
      "Design Dinners",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Inicio",
    intro: [
      "Cada vez más, el trabajo de diseño termina en código. El diseñador que entiende cómo se construye lo que diseña colabora mejor, cotiza mejor y depende menos de otros.",
      "Este taller es un primer paso. Lo estoy armando a pedido de la comunidad de Design Dinners, para diseñadores que quieren entender el stack sin tener que volverse programadores.",
    ],
    doLabel: "Lo que vas a hacer",
    do: [
      "Abrir tu cuenta de GitHub y entender para qué sirve.",
      "Aprender el vocabulario que sale en cada reunión con devs: repo, commit, branch, deploy, API y más.",
      "Construir una herramienta para tu propio negocio: una factura, un tracker de proyectos o una calculadora de tarifas. La describes en palabras simples a una herramienta de código y la vas ajustando.",
      "Publicarla en internet, gratis.",
      "Practicar cómo explicar tu trabajo a devs, PMs y gente no técnica.",
    ],
    takeLabel: "Te llevas",
    take: ["Un perfil de GitHub con un proyecto en vivo.", "Un diccionario dev para diseñadores, en una página."],
    whoLabel: "Para quién",
    who: "Diseñadores de todos los niveles. No necesitas saber programar. Se trabaja en parejas, un junior con un senior: uno trae rapidez con las herramientas, el otro trae criterio.",
    formatLabel: "Formato",
    format: "Dos horas, presencial, en español. Trae tu laptop. La fecha y el lugar los anuncio pronto.",
    formLabel: "Pre-registro",
    formIntro: "Anótate y te aviso primero cuando haya fecha. No es un compromiso de asistir.",
    form: {
      name: "Nombre",
      email: "Email",
      level: "Nivel",
      levels: {
        student: "Estudiante",
        junior: "Junior (0–3 años)",
        mid: "Mid (3–7 años)",
        senior: "Senior (7+ años)",
      },
      interest: "¿Qué te gustaría aprender? (opcional)",
      submit: "Pre-registrarme",
      pending: "Enviando…",
      success: "Listo. Te escribo cuando haya fecha.",
      invalid: "Revisa tu nombre, email y nivel.",
      error: "Algo falló de mi lado. Intenta otra vez en un rato.",
      privacy: "Uso tu email solo para avisarte sobre este taller.",
    },
  },
} satisfies Record<Locale, { form: PreregisterCopy } & Record<string, unknown>>

export function workshopsMetadata(locale: Locale) {
  const copy = COPY[locale]
  return pageMetadata({
    locale,
    title: `${copy.title} | ${copy.metaTitle}`,
    description: copy.description,
    keywords: copy.keywords,
    alternates: routeAlternates(locale, "workshops"),
  })
}

const label = "text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest"
const body = "text-stone-600 dark:text-stone-400 leading-relaxed"

export function WorkshopsPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]

  const workshopsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url(locale, "workshops"),
    url: url(locale, "workshops"),
    name: `${copy.title} | ${SITE_NAME}`,
    description: copy.description,
    inLanguage: locale,
    author: { "@id": "https://gaborene.com/#person" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.metaTitle, item: url(locale, "workshops") },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <JsonLd data={workshopsPageSchema} />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {copy.title}
          </h1>
          <p className={label}>{copy.tagline}</p>
        </div>

        <div className={`flex flex-col gap-6 max-w-xl ${body}`}>
          {copy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <section className="flex flex-col gap-4 max-w-xl">
          <h2 className={label}>{copy.doLabel}</h2>
          <ul className={`flex flex-col gap-3 list-disc pl-5 marker:text-stone-500 ${body}`}>
            {copy.do.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4 max-w-xl">
          <h2 className={label}>{copy.takeLabel}</h2>
          <ul className="flex flex-col gap-2">
            {copy.take.map((item) => (
              <li key={item} className="font-serif text-xl text-stone-900 dark:text-stone-100">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4 max-w-xl">
          <h2 className={label}>{copy.whoLabel}</h2>
          <p className={body}>{copy.who}</p>
        </section>

        <section className="flex flex-col gap-4 max-w-xl">
          <h2 className={label}>{copy.formatLabel}</h2>
          <p className={body}>{copy.format}</p>
        </section>

        <section id="preregistro" className="flex flex-col gap-6 pt-8 border-t border-stone-300 dark:border-stone-700 scroll-mt-32">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100">
              {copy.formLabel}
            </h2>
            <p className={body}>{copy.formIntro}</p>
          </div>
          <PreregisterForm locale={locale} copy={copy.form} />
        </section>
      </div>
    </main>
  )
}
