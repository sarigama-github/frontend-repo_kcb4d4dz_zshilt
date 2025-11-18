import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_50%_at_50%_0%,black,transparent)]">
        <div className="absolute -top-40 left-1/2 h-[60rem] w-[80rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/60 px-3 py-1 text-xs text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" /> Same‑day delivery across Nigeria
          </div>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Fresh fruits. Nationwide speed.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Horion Farms brings orchard‑fresh produce to your door anywhere in Nigeria. Ultra‑fresh. Traceable. Climate‑smart.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <a href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-slate-900 font-semibold shadow-emerald-500/30 shadow hover:bg-emerald-400 transition">
              Start your order <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#products" className="text-slate-200/90 hover:text-white">Browse fruits</a>
          </div>
        </div>

        <div className="relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative rounded-3xl border border-emerald-500/30 bg-slate-900/50 p-2">
            <div className="grid grid-cols-3 gap-2">
              {["Mango","Pineapple","Banana","Orange","Avocado","Apple","Papaya","Watermelon","Strawberry"].map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15),transparent)]" />
                  <p className="relative text-sm font-semibold text-white">{item}</p>
                  <p className="relative mt-6 text-xs text-emerald-300/80">Farm‑picked</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
