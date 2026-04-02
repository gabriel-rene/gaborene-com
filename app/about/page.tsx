import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — Gabriel René Rodríguez-Rovira",
  description:
    "Art director, digital strategist, and technology director based in Puerto Rico.",
}

export default function About() {
  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            About
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            I started as an art director in Puerto Rico, working across local and
            international advertising clients. When the social media era hit, I
            moved toward digital creative and strategy — and never fully left
            either side.
          </p>
          <p>
            I co-founded two small digital agencies, ran political campaigns
            across the Americas (armored vehicles included), and directed a team
            of 40 digital creatives with a $2M budget. Along the way I learned
            to use Salesforce, HubSpot, Excel, and to care about the difference
            between all three.
          </p>
          <p>
            For the last several years I've been at de la Cruz, producing digital
            creative work that has won at Cannes, Effie, Ojo, Cúspide, SME, and
            others. The work I'm most proud of tends to live at the edge of
            strategy and technology.
          </p>
          <p>
            I've been speaking and educating on AI — specifically on
            human-centered design and implementation — at forums ranging from the
            El Salvador National Marketing Association to the International
            Women's Economic Forum. The technology is changing us. Understanding
            it is not optional.
          </p>
          <p>
            Outside of work: food nerd, photographer by habit, perpetually
            curious. Based in Puerto Rico.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-stone-400 dark:text-stone-600 uppercase tracking-widest">
            Contact
          </p>
          <a
            href="mailto:gabriel@gaborene.com"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            gabriel@gaborene.com
          </a>
        </div>
      </div>
    </main>
  )
}
