import { AnimatePresence, motion } from 'motion/react'
import { Ticker } from 'motion-plus/react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import behanceLogo from '../assets/Ionicons_logo-behance logo.svg'
import githubLogo from '../assets/Ionicons_logo-github logo.svg'
import linkedinLogo from '../assets/LinkedIn_logo_In-Black logo.svg'
import meImage from '../assets/me.png'
import { projects } from '../data/projects'
import './portfolio-pages.css'

const skills = [
  'Figma',
  'Framer',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Javascript',
  'React',
  'ReactNative',
  'Python',
  'UX Research',
]

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/work', 'Work'],
  ['/photography', 'Photography'],
  ['/contact', 'Contact'],
]

function SiteLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="portfolio-shell min-h-screen bg-[#0A0A0A] text-zinc-100">
      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link to="/" className="logo-wordmark text-zinc-100">Ryan Monaghan</Link>
        <nav className="hidden flex-wrap justify-end gap-x-2 gap-y-2 md:flex" aria-label="Main navigation">
          {navItems.map(([path, label]) => (
            <Link key={path} to={path} className="site-nav-link text-zinc-400">{label}</Link>
          ))}
        </nav>
        <button
          type="button"
          className="relative z-40 flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/15 text-zinc-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`block h-px w-4 bg-current transition-transform ${menuOpen ? 'translate-y-1 rotate-45' : ''}`} />
          <span className={`block h-px w-4 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-4 bg-current transition-transform ${menuOpen ? '-translate-y-1 -rotate-45' : ''}`} />
        </button>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-5">
                {navItems.map(([path, label]) => (
                  <Link key={path} to={path} className="border-b border-white/10 pb-3 text-2xl tracking-tight text-zinc-200 transition-colors hover:text-[#B10E1E]" onClick={() => setMenuOpen(false)}>{label}</Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
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
    <header className="mx-auto flex h-[64vh] min-h-0 w-full max-w-7xl flex-col gap-5 px-6 pb-8 pt-8 sm:px-10 lg:px-14 lg:pb-10 lg:pt-8">
      <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">{eyebrow}</p>
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
      <Link to={`/work/${project.slug}`} className={`project-card project-card-${project.color} group flex min-h-80 flex-col justify-between border border-white/10 p-6 transition-colors hover:border-[#B10E1E]/70 sm:p-8`}>
        <div className="flex items-start justify-between gap-5">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">0{index + 1}</span>
          <span className="text-sm text-zinc-500">{project.year}</span>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#B10E1E]">{project.category}</p>
          <h2 className="text-3xl tracking-tight transition-transform group-hover:translate-x-1">{project.title} <span className="text-[#B10E1E]">↗</span></h2>
          <p className="max-w-md text-sm leading-relaxed text-zinc-400">{project.summary}</p>
        </div>
      </Link>
    </motion.article>
  )
}

function ProjectsIndex() {
  const [hoveredProject, setHoveredProject] = useState(null)
  const [previewPoint, setPreviewPoint] = useState({ x: 0, y: 0 })

  return (
    <section className="projects-index">
      <div className="projects-index-intro">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B10E1E]">PROJECTS</p>
        <p className="projects-index-copy">A closer look at the work, from first idea to final interaction.</p>
        <Link to="/work" className="projects-index-button">VIEW MORE <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="projects-index-list" onMouseLeave={() => setHoveredProject(null)}>
        {projects.map((project, index) => (
          <div key={project.slug} className="project-index-row">
            <Link
              to={`/work/${project.slug}`}
              className="project-index-link"
              onMouseEnter={() => setHoveredProject(project.slug)}
              onFocus={() => setHoveredProject(project.slug)}
              onMouseMove={(event) => setPreviewPoint({ x: event.clientX, y: event.clientY })}
              onBlur={() => setHoveredProject(null)}
            >
              <span>{String(index + 1).padStart(2, '0')}.</span>
              <span>{project.title}</span>
              <span className="project-index-arrow" aria-hidden="true">↗</span>
            </Link>
            <AnimatePresence>
              {hoveredProject === project.slug && (
                <motion.div
                  className={`project-preview project-card-${project.color}`}
                  style={{ left: previewPoint.x + 20, top: previewPoint.y + 20 }}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                >
                  <div className="project-preview-canvas">
                    <span>CASE STUDY / {project.year}</span>
                    <strong>{project.title}</strong>
                  </div>
                  <span className="project-preview-category">{project.category}</span>
                  <span>{project.summary}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}

function PhotographyIndex() {
  const featuredPhotos = [
    ['01 / coastal light', 1],
    ['02 / after rain', 2],
    ['03 / late train', 3],
  ]

  return (
    <section className="photography-index">
      <div className="photography-index-intro">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#B10E1E]">PHOTOGRAPHY</p>
        <p className="photography-index-copy">A visual archive of quiet places, passing light, and the details that stay with you.</p>
        <Link to="/photography" className="projects-index-button">VIEW PHOTOGRAPHY <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="photography-index-grid">
        {featuredPhotos.map(([label, index]) => (
          <Link key={label} to="/photography" className={`photography-index-image photo-placeholder photo-placeholder-${index}`}>
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function HomePage() {
  return (
    <SiteLayout>
      <main>
        <section className="home-hero mx-auto grid min-h-[64vh] w-full max-w-7xl items-stretch gap-12 px-6 pb-8 pt-8 sm:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-14 lg:pb-10">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="hero-copy flex flex-col gap-5">
            <p className="page-eyebrow font-mono text-xs uppercase tracking-[0.22em] text-[#B10E1E]">AVAILABLE FOR HIRE</p>
            <h1 className="max-w-5xl text-balance text-6xl font-medium leading-[0.94] tracking-[-0.07em] sm:text-8xl lg:text-9xl">PRODUCT DESIGNER</h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">I'm Ryan, a designer and developer building identities, digital experiences, and visual stories for people with something worth saying.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/work" className="w-fit border border-zinc-700 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-zinc-100 transition-colors hover:border-[#B10E1E] hover:text-[#B10E1E]">Explore the work <span className="ml-3">↗</span></Link></div>
          </motion.div>
          <div className="hero-proof lg:mb-3 lg:h-full">
            <div className="hero-portrait-wrap">
              <motion.span
                className="hero-portrait-tag"
                animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity }}
              >
                ME
              </motion.span>
              <img className="hero-proof-image" src={meImage} alt="Ryan Monaghan" />
            </div>
            <blockquote>Ryan is dedicated to his craft. He takes careful effort to design for software applications, and helped keep our team organized rolling out new initiatives.</blockquote>
            <div className="hero-proof-logos" aria-label="Social profiles">
              <a href="https://www.behance.net" aria-label="Behance"><img src={behanceLogo} alt="" /></a>
              <a href="https://github.com" aria-label="GitHub"><img src={githubLogo} alt="" /></a>
              <a href="https://www.linkedin.com" aria-label="LinkedIn"><img src={linkedinLogo} alt="" /></a>
            </div>
          </div>
          <div className="hero-ticker ticker-strip col-span-full overflow-hidden border-y border-white/10">
            <Ticker
              velocity={40}
              gap={0}
              items={skills.map((skill) => (
                <span key={skill} className="ticker-item-text whitespace-nowrap">{skill}</span>
              ))}
            />
          </div>
        </section>
        <section className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-10 lg:px-14">
          <div className="mb-7 flex items-end justify-between border-b border-white/10 pb-4"><h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">Selected work</h2><Link to="/work" className="text-sm text-zinc-500 hover:text-[#B10E1E]">View all ↗</Link></div>
          {/* Original selected-work cards kept for future reuse.
          <div className="grid gap-3 md:grid-cols-3">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
          */}
          <ProjectsIndex />
        </section>
        <PhotographyIndex />
      </main>
    </SiteLayout>
  )
}

export function AboutPage() {
  return <SiteLayout><main><PageIntro eyebrow="ABOUT" title="A small studio for clear ideas." body="I work across design and code, helping ambitious people turn rough thoughts into experiences with a point of view." /><section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-2 lg:px-14"><div className="text-2xl leading-relaxed tracking-tight text-zinc-200">Good work should feel considered, useful, and a little unexpected.</div><div className="space-y-5 text-zinc-400"><p>My practice moves between brand systems, digital products, editorial work, and photography. The medium changes, but the question stays the same: what is the clearest, most human way to make this matter?</p><p>I collaborate with founders, cultural teams, and people building quietly excellent things.</p></div></section></main></SiteLayout>
}

export function WorkPage() {
  return <SiteLayout><main><PageIntro eyebrow="WORK" title="Selected projects." body="A mix of identity, interaction, and image-making. Open a project to see the thinking behind it." /><section className="mx-auto grid max-w-7xl gap-3 px-6 pb-24 sm:px-10 md:grid-cols-2 lg:px-14">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</section></main></SiteLayout>
}

export function PhotographyPage() {
  return <SiteLayout><main><PageIntro eyebrow="PHOTOGRAPHY" title="Attention is a form of care." body="A growing archive of light, texture, distance, and the scenes that usually pass unnoticed." /><section className="mx-auto grid max-w-7xl grid-cols-2 gap-3 px-6 pb-24 sm:px-10 md:grid-cols-3 lg:px-14">{['01 / coastal light', '02 / after rain', '03 / late train', '04 / borrowed room', '05 / field study', '06 / last light'].map((label, index) => <div key={label} className={`photo-placeholder photo-placeholder-${index + 1} flex aspect-[4/5] items-end p-4`}><span className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-300">{label}</span></div>)}</section></main></SiteLayout>
}

export function ContactPage() {
  return <SiteLayout><main><PageIntro eyebrow="CONTACT" title="Have a good problem? Let’s talk." body="For collaborations, commissions, and thoughtful questions, email me directly." /><section className="mx-auto max-w-7xl px-6 pb-32 sm:px-10 lg:px-14"><a href="mailto:hello@ryanstudio.example" className="group inline-flex items-center gap-4 border-b border-[#B10E1E] pb-3 text-2xl text-zinc-100 transition-colors hover:text-[#B10E1E] sm:text-4xl">hello@ryanstudio.example <span className="text-[#B10E1E] transition-transform group-hover:translate-x-2">↗</span></a></section></main></SiteLayout>
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <SiteLayout><PageIntro eyebrow="404" title="Project not found." body="That case study does not exist yet." /></SiteLayout>
  return <SiteLayout><main><PageIntro eyebrow={`${project.category} / ${project.year}`} title={project.title} body={project.description} /><section className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-[1fr_0.6fr] lg:px-14"><div className={`case-study-visual case-study-visual-${project.color} min-h-[420px] border border-white/10 p-8`}><span className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300">Case study / {project.title}</span></div><div className="space-y-10"><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Role</p><p className="text-zinc-200">{project.role}</p></div><div><p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">Outcomes</p><ul className="space-y-3">{project.outcomes.map((outcome) => <li key={outcome} className="border-b border-white/10 pb-3 text-zinc-300">{outcome}</li>)}</ul></div><Link to="/work" className="inline-block text-sm text-[#B10E1E] hover:text-zinc-100">← Back to work</Link></div></section></main></SiteLayout>
}
