import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import './page-curtains.css'

const PAGES = [
  {
    kicker: 'Overview',
    title: 'Every drop-off, mapped.',
    lede: 'Velocity traces each session end to end, so your team always knows exactly where people give up.',
    rows: [
      { label: 'Sessions today', value: '12,480', delta: '+6.1%', positive: true },
      { label: 'Overall conversion', value: '41%', delta: '+2.4%', positive: true },
      { label: 'Alerts open', value: '3', delta: '-1', positive: true },
    ],
  },
  {
    kicker: 'Funnels',
    title: 'See the exact step people quit.',
    lede: 'Four steps, one funnel: pricing view, trial start, payment, active subscription.',
    rows: [
      { label: 'Biggest leak', value: '30%', delta: '+1.8%', positive: false },
      { label: 'Trial-to-payment drop', value: '30%', delta: '-2.6%', positive: true },
      { label: 'Weekly retention', value: '68%', delta: '+3.2%', positive: true },
    ],
  },
  {
    kicker: 'Alerts',
    title: 'Get paged before churn happens.',
    lede: 'Threshold and anomaly rules route straight to Slack, so a leak never sits unnoticed for a week.',
    rows: [
      { label: 'Active alert rules', value: '14', delta: '+2', positive: true },
      { label: 'Mean time to notice', value: '4m', delta: '-38%', positive: true },
      { label: 'False positive rate', value: '2%', delta: '-1%', positive: true },
    ],
  },
]

function PageLedger({ metrics }) {
  return (
    <ul className="mt-2 flex w-full flex-col">
      {metrics.map((metric) => (
        <li key={metric.label} className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4">
          <span className="text-sm text-zinc-400">{metric.label}</span>
          <span className="flex items-baseline gap-3 font-mono tabular-nums">
            <span className="text-[17px] font-medium text-zinc-100">{metric.value}</span>
            <span className={`text-xs ${metric.positive ? 'text-cyan-300' : 'text-zinc-500'}`}>{metric.delta}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

function TopNav() {
  return (
    <header className="relative z-20 w-full py-5">
      <div className="mx-auto flex w-full max-w-[640px] items-center justify-between px-6 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-100">Velocity</span>
        <a href="#sign-in" className="text-sm text-zinc-300 transition-colors hover:text-cyan-300">Sign in</a>
      </div>
    </header>
  )
}

function PageCurtainsContent() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const current = PAGES[page]

  function changePage(nextPage) {
    if (nextPage === page) return
    setDirection(nextPage > page ? 1 : -1)
    setPage(nextPage)
  }

  return (
    <main className="velocity-curtains relative flex min-h-screen flex-col overflow-hidden bg-[#101112] font-sans text-zinc-100">
      <div className="velocity-curtains-glow" aria-hidden="true" />
      <TopNav />

      <div className="relative z-10 mx-auto flex w-full max-w-[640px] flex-1 flex-col justify-center gap-8 px-6 py-16 md:px-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={current.kicker}
            custom={direction}
            className="flex flex-col items-start gap-5"
            initial={{ opacity: 0, x: direction * 40, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, x: direction * -40, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">{current.kicker} / 0{page + 1}</p>
            <h1 className="max-w-[18ch] text-balance text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl">{current.title}</h1>
            <p className="max-w-[50ch] text-pretty text-lg leading-relaxed text-zinc-400">{current.lede}</p>
            <PageLedger metrics={current.rows} />
          </motion.section>
        </AnimatePresence>
      </div>

      <nav className="relative z-10 w-full px-6 pb-12 md:pb-16" aria-label="Pages">
        <div className="mx-auto flex w-fit gap-1 border border-white/10 bg-white/[0.03] p-1">
          {PAGES.map((item, index) => (
            <button
              key={item.kicker}
              type="button"
              aria-current={page === index ? 'page' : undefined}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${page === index ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-500 hover:text-zinc-100'}`}
              onClick={() => changePage(index)}
            >
              {item.kicker}
            </button>
          ))}
        </div>
      </nav>
    </main>
  )
}

export default PageCurtainsContent