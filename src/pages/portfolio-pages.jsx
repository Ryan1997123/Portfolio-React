import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import './portfolio-pages.css'

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/work', 'Work'],
  ['/photography', 'Photography'],
  ['/contact', 'Contact'],
]

function SiteLayout({ children }) {
  return (
    <div className="portfolio-shell min-h-screen bg-[#101112] text-zinc-100">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-100">Ryan / Studio</Link>
        <nav className="flex flex-wrap justify-end gap-x-5 gap-y-2" aria-label="Main navigation">
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className="text-sm text-zinc-400 transition-colors hover:text-cyan-300">{label}</Link>
          ))}
        </nav>
      </header>
      {children}
      <footer className="mx-auto flex w-full max-w-7xl justify-between border-t border-white/10 px-6 py-6 text-xs text-zinc-500 sm:px-10 lg:px-14">
        <span>Independent designer / developer</span>
        <span>2026</span>
      </footer>
    </div>
  )
}

function PageIntro({ eyebrow, title, body }) {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 pb-16 pt-20 sm:px-10 lg:px-14 lg:pb-24 lg:pt-28">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p>
      <h1 className="max-w-4xl text-balance text-5xl font-medium tracking-[-0.05em] sm:text-7xl">{title}</h1>
      {body && <p className="max-w-2xl text-pretty text-lg leading-relaxed text-zinc-400">{body}</p>}
    </header>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
    >
      <Link to={`/work/${project.slug}`} className={`project-card project-card-${project.color} group flex min-h-80 flex-col justify-between border border-white/10 p-6 transition-colors hover:border-cyan-300/70 sm:p-8`}>
        <div className="flex items-start justify-between gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">0{index + 1}</span>
          <span className="text-sm text-zinc-500">{project.year}</span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">{project.category}</p>
          <h2 className="text-3xl tracking-tight transition-transform group-hover:translate-x-1">{project.title} <span className="text-cyan-300">↗</span></h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        </div>
      </Link>
    </motion.article>
  )
}

export function HomePage() {
  return (
    <SiteLayout>
      <main>
        <section className="mx-auto grid min-h-[72vh] w-full max-w-7xl items-end gap-12 px-6 pb-20 pt-16 sm:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-14 lg:pb-28">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-7">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">Portfolio / 2026</p>
            <h1 className="max-w-5xl text-balance text-6xl font-medium leading-[0.94] tracking-[-0.07em] sm:text-8xl lg:text-9xl">Ideas with a pulse.</h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">I am Ryan, a designer and developer building identities, digital experiences, and visual stories for people with something worth saying.</p>
            <Link to="/work" className="w-fit border border-zinc-700 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-100 transition-colors hover:border-cyan-300 hover:text-cyan-300">Explore the work <span className="ml-3">↗</span></Link>
          </motion.div>
          <div className="flex flex-col gap-4 border-l border-white/10 pl-5 text-sm text-zinc-500 lg:mb-3">
            <span>Based between places.</span>
            <span>Available for select collaborations.</span>
            <span className="font-mono text-cyan-300">Currently: making things clearer.</span>
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-10 lg:px-14">
          <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4"><h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Selected work</h2><Link to="/work" className="text-sm text-zinc-500 hover:text-cyan-300">View all ↗</Link></div>
          <div className="grid gap-3 md:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        </section>
      </main>
    </SiteLayout>
  )
}

export function AboutPage() {
  return <SiteLayout><main><PageIntro eyebrow="About" title="A small studio for clear ideas." body="I work across design and code, helping ambitious people turn rough thoughts into experiences with a point of view." /><section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-2 lg:px-14"><div className="text-2xl leading-relaxed tracking-tight text-zinc-200">Good work should feel considered, useful, and a little unexpected.</div><div className="space-y-5 text-zinc-400"><p>My practice moves between brand systems, digital products, editorial work, and photography. The medium changes, but the question stays the same: what is the clearest, most human way to make this matter?</p><p>I collaborate with founders, cultural teams, and people building quietly excellent things.</p></div></section></main></SiteLayout>
}

export function WorkPage() {
  return <SiteLayout><main><PageIntro eyebrow="Work" title="Selected projects." body="A mix of identity, interaction, and image-making. Open a project to see the thinking behind it." /><section className="mx-auto grid max-w-7xl gap-3 px-6 pb-24 sm:px-10 md:grid-cols-2 lg:px-14">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</section></main></SiteLayout>
}

export function PhotographyPage() {
  return <SiteLayout><main><PageIntro eyebrow="Photography" title="Attention is a form of care." body="A growing archive of light, texture, distance, and the scenes that usually pass unnoticed." /><section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 pb-24 sm:px-10 md:grid-cols-3 lg:px-14">{['01 / coastal light', '02 / after rain', '03 / late train', '04 / borrowed room', '05 / field study', '06 / last light'].map((label, index) => <div key={label} className={`photo-placeholder photo-placeholder-${index + 1} flex aspect-[4/5] items-end p-4`}><span className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-300">{label}</span></div>)}</section></main></SiteLayout>
}

export function ContactPage() {
  return <SiteLayout><main><PageIntro eyebrow="Contact" title="Have a good problem? Let’s talk." body="For collaborations, commissions, and thoughtful questions, email me directly." /><section className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-14"><a href="mailto:hello@ryanstudio.example" className="group inline-flex items-center gap-4 border-b border-cyan-300 pb-3 text-2xl text-zinc-100 transition-colors hover:text-cyan-300 sm:text-4xl">hello@ryanstudio.example <span className="text-cyan-300 transition-transform group-hover:translate-x-2">↗</span></a></section></main></SiteLayout>
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <SiteLayout><PageIntro eyebrow="404" title="Project not found." body="That case study does not exist yet." /></SiteLayout>
  return <SiteLayout><main><PageIntro eyebrow={`${project.category} / ${project.year}`} title={project.title} body={project.description} /><section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-[1fr_0.6fr] lg:px-14"><div className={`case-study-visual case-study-visual-${project.color} min-h-[420px] border border-white/10 p-8`}><span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">Case study / {project.title}</span></div><div className="space-y-10"><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Role</p><p className="text-zinc-200">{project.role}</p></div><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Outcomes</p><ul className="space-y-3">{project.outcomes.map((outcome) => <li key={outcome} className="border-b border-white/10 pb-3 text-zinc-300">{outcome}</li>)}</ul></div><Link to="/work" className="inline-block text-sm text-cyan-300 hover:text-zinc-100">← Back to work</Link></div></section></main></SiteLayout>
}
