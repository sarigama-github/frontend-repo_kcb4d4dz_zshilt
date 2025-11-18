import { MapPin, Timer, Package } from 'lucide-react'

function Delivery() {
  return (
    <section id="delivery" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <MapPin className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Order from Anywhere</h3>
            <p className="mt-2 text-sm text-slate-300/90">Place orders from any city — we ship nationwide with real‑time tracking.</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <Timer className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Same‑Day in Major Cities</h3>
            <p className="mt-2 text-sm text-slate-300/90">Lagos, Abuja, Port Harcourt, Kano, Ibadan — delivered fresh within hours.</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
            <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <Package className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Cold‑Chain Guaranteed</h3>
            <p className="mt-2 text-sm text-slate-300/90">Temperature‑controlled from farm to door to keep your fruits perfect.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Delivery
