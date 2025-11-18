import { Truck, Leaf, ShieldCheck, Satellite } from 'lucide-react'

function Features() {
  const items = [
    {
      icon: Truck,
      title: 'Nationwide Delivery',
      desc: 'From Lagos to Maiduguri — we deliver same‑day in major cities and within 24‑48h nationwide.',
    },
    {
      icon: Leaf,
      title: 'Regenerative Farming',
      desc: 'Soil‑first practices, zero waste cold chain, and fair pay to farmers across Nigeria.',
    },
    {
      icon: ShieldCheck,
      title: 'Full Traceability',
      desc: 'Every box is QR‑coded with harvest date, farm block, and cold‑chain telemetry.',
    },
    {
      icon: Satellite,
      title: 'IoT‑Powered Freshness',
      desc: 'Sensors across our farms and fleet keep your fruits at optimal temperature door‑to‑door.',
    },
  ]

  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6 hover:border-emerald-400/50 transition">
              <div className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/15 text-emerald-300 group-hover:bg-emerald-500/25">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
