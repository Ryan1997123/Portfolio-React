import { motion, useMotionValue, useSpring } from 'motion/react'

const tiles = [
  {
    title: 'Funnels',
    body: 'Watch where users drop off, step by step, and fix the leak that costs you the most.',
    icon: '↘',
  },
  {
    title: 'Thailand',
    body: 'See who comes back, week over week, and which features keep them here.',
    icon: '↻',
  },
  {
    title: 'Ryans Projects',
    body: 'Get pinged the moment a metric moves, before it shows up in the numbers you report.',
    icon: '!',
  },
]

function TiltCard({ children, className = '' }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22 })
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22 })

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    rotateY.set(x * 7)
    rotateX.set(y * -7)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {children}
    </motion.div>
  )
}

function EventRow({ name, time, tone }) {
  const dot = {
    success: 'bg-emerald-500',
    accent: 'bg-cyan-400',
    muted: 'bg-zinc-500',
  }[tone]

  return (
    <li className="flex items-center gap-3 font-mono text-xs">
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate text-zinc-100">{name}</span>
      <span className="shrink-0 text-zinc-500">{time}</span>
    </li>
  )
}

function FeatureBento() {
  return (
    <main className="min-h-screen bg-[#101112] px-6 py-10 font-sans text-zinc-100 sm:px-10 lg:px-16 lg:py-16">
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col gap-10"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.header
          className="flex max-w-3xl flex-col gap-4"
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-400">Motion+ / 01</p>
          <h1 className="text-balance text-4xl font-medium tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            See what changed.
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
            One line of instrumentation, then the whole picture: events as they happen, the funnels that matter, and the metrics teams check each morning.
          </p>
        </motion.header>

        <motion.div
          className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-fr lg:grid-cols-3"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          <TiltCard className="group flex min-h-[360px] flex-col justify-between border border-zinc-800 bg-zinc-900 p-6 sm:col-span-2 lg:row-span-2 lg:min-h-[420px]">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-500">Real-time product intelligence</p>
              <h2 className="max-w-md text-2xl font-medium tracking-tight sm:text-3xl">Every event, the moment it happens.</h2>
              <p className="max-w-md text-sm leading-relaxed text-zinc-400">Product events in real time. No sampling, no cookies. Instrument once and every click, view and conversion lands in a single timeline.</p>
            </div>
            <ul className="flex flex-col gap-2 border border-zinc-800 bg-[#151719] p-4" aria-label="Recent events">
              <EventRow name="checkout.completed" time="2s ago" tone="success" />
              <EventRow name="signup.started" time="4s ago" tone="accent" />
              <EventRow name="dashboard.viewed" time="7s ago" tone="muted" />
            </ul>
          </TiltCard>

          <TiltCard className="flex min-h-[205px] flex-col justify-between border border-zinc-800 bg-zinc-900 p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">Events captured today</span>
            <div>
              <p className="text-4xl font-medium tracking-tight">1,284,502</p>
              <p className="mt-2 font-mono text-xs text-emerald-400">↗ Up this week</p>
            </div>
          </TiltCard>

          <TiltCard className="flex min-h-[205px] flex-col justify-between border border-zinc-800 bg-zinc-900 p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-500">Active workspaces</span>
            <div>
              <p className="text-4xl font-medium tracking-tight">12,480</p>
              <p className="mt-2 font-mono text-xs text-emerald-400">↗ Growing this month</p>
            </div>
          </TiltCard>

          {tiles.map((tile) => (
            <TiltCard key={tile.title} className="group flex min-h-[235px] flex-col border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-cyan-400/60">
              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <span className="text-xl text-cyan-400" aria-hidden="true">{tile.icon}</span>
                <h2 className="text-lg tracking-tight">{tile.title}</h2>
              </div>
              <p className="mt-5 max-w-[34ch] text-sm leading-relaxed text-zinc-400">{tile.body}</p>
              <span className="mt-auto border-t border-zinc-800 pt-4 text-sm text-zinc-200">Learn more <span className="text-cyan-400">→</span></span>
            </TiltCard>
          ))}
        </motion.div>
      </motion.div>
    </main>
  )
}

export default FeatureBento