import Image from "next/image";
import { IntroReveal, Preloader } from "@/components/intro";
import { LocalTime } from "@/components/local-time";
import {
  BigName,
  CursorDot,
  DrawLine,
  HeroPhoto,
  Magnetic,
  MotionProvider,
  Reveal,
  ScrollMarquee,
  ScrollProgress,
  SplitWords,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import { Orbit } from "@/components/orbit";
import {
  about,
  education,
  experience,
  intro,
  marquee,
  orbitInner,
  orbitOuter,
  profile,
  projects,
  skills,
  testimonials,
  type TimelineItem,
} from "@/lib/content";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience", desktopOnly: true },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: profile.links.github, label: "GitHub" },
  { href: profile.links.linkedin, label: "LinkedIn" },
  { href: profile.links.freelancer, label: "Freelancer" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: "https://hassanftouni.me",
  image: `https://hassanftouni.me${profile.photo}`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.links.linkedin, profile.links.github],
  address: { "@type": "PostalAddress", addressLocality: "Beirut", addressCountry: "Lebanon" },
};

export default function HomePage() {
  return (
    <MotionProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Preloader name={profile.name} />
      <ScrollProgress />
      <CursorDot />

      <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur">
        <IntroReveal y={-12} className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-2.5 font-medium tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-serif text-sm text-paper transition-transform duration-500 group-hover:rotate-[360deg]">
              H
            </span>
            {profile.name}
          </a>
          <nav className="flex gap-5 text-sm text-ink-2 sm:gap-7">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`roll-link hover:text-ink ${item.desktopOnly ? "hidden sm:inline-flex" : "inline-flex"}`}
              >
                <span data-text={item.label}>{item.label}</span>
              </a>
            ))}
          </nav>
        </IntroReveal>
      </header>

      <main id="top">
        {/* Intro */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-[1.35fr_0.85fr] lg:gap-10 lg:pb-24">
          <div>
            <IntroReveal className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-muted">
              <span className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {profile.available}
              </span>
              <span>
                {profile.location} · <LocalTime timeZone={profile.timezone} />
              </span>
            </IntroReveal>

            <h1 className="mt-8 font-serif text-[3.2rem] leading-[1] tracking-tight sm:text-7xl lg:text-8xl">
              <SplitWords text={profile.name} onLoad delay={0.1} className="block" />
              <SplitWords
                text={`${profile.role.toLowerCase()}.`}
                onLoad
                delay={0.3}
                className="block italic text-ink-2"
              />
            </h1>

            <IntroReveal delay={0.55}>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-2 sm:text-xl">{intro}</p>
            </IntroReveal>

            <IntroReveal delay={0.7} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent"
                >
                  Get in touch
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
              <a href="#work" className="link text-sm">
                See my work ↓
              </a>
            </IntroReveal>
          </div>

          <div className="order-first w-[42%] max-w-[300px] pl-4 sm:w-[32%] sm:pl-6 lg:order-none lg:ml-auto lg:w-full lg:pl-0">
            <HeroPhoto
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              tag="Currently at Tabbiq AI"
              badge="Software engineer · Beirut · Open to work · "
            />
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* Work */}
          <Section id="work" index="01" label="Selected work" title="Things I’ve built.">
            <ol className="border-b border-line">
              {projects.map((project, i) => (
                <li key={project.title}>
                  <Reveal y={30}>
                    <article className="project-row group relative isolate grid gap-3 border-t border-line py-8 md:grid-cols-[3rem_1fr_1.3fr] md:gap-8 md:py-10">
                      <span className="font-mono text-xs text-muted md:pt-3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="flex items-start gap-3 font-serif text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-4xl">
                          {project.title}
                          <span className="arrow mt-2 text-xl text-accent">→</span>
                        </h3>
                        <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted">
                          {project.kind} · {project.date}
                        </p>
                      </div>
                      <div>
                        <p className="leading-relaxed text-ink-2">{project.description}</p>
                        <p className="mt-3 font-mono text-xs text-muted">{project.stack.join("  ·  ")}</p>
                        {(project.live || project.repo) && (
                          <div className="mt-4 flex gap-5 text-sm">
                            {project.live && (
                              <a href={project.live} target="_blank" rel="noopener noreferrer" className="link text-accent">
                                Live site ↗
                              </a>
                            )}
                            {project.repo && (
                              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="link text-accent">
                                Code ↗
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        <ScrollMarquee words={marquee} />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {/* About */}
          <Section id="about" index="02" label="About" title="A bit about me.">
            <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
              <div className="space-y-6 text-lg leading-relaxed text-ink-2">
                {about.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <p>{paragraph}</p>
                  </Reveal>
                ))}
              </div>
              <Stagger className="grid grid-cols-2 gap-x-6 gap-y-8 self-start">
                {skills.map((group) => (
                  <StaggerItem key={group.group}>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-muted">{group.group}</h3>
                    <ul className="mt-3 space-y-1">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Section>

          {/* Orbit */}
          <Section id="network" index="03" label="Worked with" title="People & places I’ve worked with.">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
              <Reveal>
                <p className="max-w-md text-lg leading-relaxed text-ink-2">
                  Companies I&apos;ve worked at, schools I&apos;ve trained with, and clients who came back for a
                  second project. Hover a logo to see who it is.
                </p>
                <ul className="mt-8 flex max-w-md flex-wrap gap-2 text-sm">
                  {[...orbitInner, ...orbitOuter].map((item) => (
                    <li key={item.name} className="rounded-full border border-line px-3 py-1 text-ink-2">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Orbit
                inner={orbitInner}
                outer={orbitOuter}
                center={
                  <div className="relative aspect-square">
                    <span className="pulse-ring absolute inset-0 rounded-full border border-ink/30" />
                    <span className="pulse-ring absolute inset-0 rounded-full border border-ink/30 [animation-delay:1.5s]" />
                    <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-paper bg-white shadow-[0_10px_30px_-10px_rgba(26,25,23,0.4)]">
                      <Image
                        src={profile.photo}
                        alt={profile.name}
                        width={200}
                        height={200}
                        className="h-full w-full scale-125 object-cover object-[50%_20%]"
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" index="04" label="Experience" title="Where I’ve been.">
            <div className="grid gap-16 md:grid-cols-2 md:gap-12">
              <Timeline heading="Work" items={experience} />
              <Timeline heading="Education & certificates" items={education} />
            </div>
          </Section>

          {/* Testimonials */}
          <Section id="kind-words" index="05" label="Kind words" title="What clients say.">
            <Stagger className="grid gap-12 md:grid-cols-3 md:gap-10">
              {testimonials.map((t) => (
                <StaggerItem key={t.name} className="flex">
                  <figure className="flex flex-col border-t border-ink pt-6">
                    <blockquote className="flex-1 font-serif text-xl leading-snug">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <Image
                        src={t.avatar}
                        alt=""
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div className="text-sm leading-tight">
                        <div>{t.name}</div>
                        <div className="text-muted">{t.project}</div>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              ))}
            </Stagger>
          </Section>

          {/* Contact */}
          <section id="contact" className="border-t border-line py-24 sm:py-36">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">(06) Contact</p>
            <h2 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] sm:text-7xl">
              <SplitWords text="Have a project in mind?" />{" "}
              <SplitWords text="Let’s talk." delay={0.3} className="italic text-ink-2" />
            </h2>
            <Reveal delay={0.2}>
              <div className="mt-12">
                <Magnetic strength={0.15}>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link inline-block break-all text-2xl text-accent sm:text-4xl"
                  >
                    {profile.email}
                  </a>
                </Magnetic>
              </div>
              <div className="mt-4">
                <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link text-lg text-ink-2">
                  {profile.phone}
                </a>
              </div>
              <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link hover:text-ink">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </main>

      <footer className="overflow-hidden border-t border-line">
        <div className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
          <BigName text={profile.name} />
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs text-muted sm:px-8">
          <span>
            © {new Date().getFullYear()} {profile.name} · Beirut
          </span>
          <a href="#top" className="link hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </footer>
    </MotionProvider>
  );
}

function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line py-20 sm:py-28">
      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        ({index}) {label}
      </p>
      <h2 className="mb-14 mt-5 font-serif text-4xl leading-tight sm:mb-20 sm:text-6xl">
        <SplitWords text={title} />
      </h2>
      {children}
    </section>
  );
}

function Timeline({ heading, items }: { heading: string; items: TimelineItem[] }) {
  return (
    <div>
      <Reveal>
        <h3 className="font-serif text-2xl">{heading}</h3>
      </Reveal>
      <div className="relative mt-8 pl-8">
        <DrawLine className="left-[5px]" />
        <Stagger className="space-y-9">
          {items.map((item) => (
            <StaggerItem key={item.title + item.place} className="relative">
              <span className="absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-paper" />
              <p className="font-mono text-xs text-muted">{item.period}</p>
              <div className="mt-1 flex items-center gap-3">
                {item.logo && (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-white p-1">
                    <Image src={item.logo} alt="" width={24} height={24} unoptimized={item.logo.endsWith(".svg")} className="h-full w-full object-contain" />
                  </span>
                )}
                <div>
                  <div className="text-base font-medium">{item.title}</div>
                  <div className="text-sm text-ink-2">{item.place}</div>
                </div>
              </div>
              {item.note && <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.note}</p>}
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
