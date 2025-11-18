import { useState } from 'react'

function CTA() {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [fruit, setFruit] = useState('Mango')
  const [quantity, setQuantity] = useState(5)
  const [submitted, setSubmitted] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="cta" className="pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/70 p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Ready to taste the future?</h2>
              <p className="mt-2 text-slate-300/90">Tell us what you need and where you are. We’ll confirm delivery ETA instantly.</p>

              <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-2">Your Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Adaeze Okonkwo" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">City</label>
                  <input value={city} onChange={(e)=>setCity(e.target.value)} required className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Abuja" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Fruit</label>
                  <select value={fruit} onChange={(e)=>setFruit(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    {['Mango','Pineapple','Banana','Orange','Avocado','Apple'].map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Quantity (crates)</label>
                  <input type="number" min="1" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value)||1)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div className="sm:col-span-2">
                  <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-900 hover:bg-emerald-400">Get instant quote</button>
                </div>
              </form>

              {submitted && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-slate-900/70 p-4 text-sm text-slate-200">
                  <p><span className="font-semibold text-emerald-400">Thanks {name}</span> — we’ll reach you in {city} with delivery options for {quantity} crate(s) of {fruit}. This demo doesn’t place a real order.</p>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute -inset-10 -z-10 blur-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent" />
              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="rounded-xl border border-emerald-500/20 p-4">
                    <p className="text-emerald-300">Average ETA</p>
                    <p className="mt-2 text-3xl font-bold text-white">6h</p>
                    <p className="text-xs text-slate-400">Major cities</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 p-4">
                    <p className="text-emerald-300">Cold Chain</p>
                    <p className="mt-2 text-3xl font-bold text-white">2‑8°C</p>
                    <p className="text-xs text-slate-400">Door to door</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 p-4">
                    <p className="text-emerald-300">Coverage</p>
                    <p className="mt-2 text-3xl font-bold text-white">36</p>
                    <p className="text-xs text-slate-400">States</p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 p-4">
                    <p className="text-emerald-300">Satisfaction</p>
                    <p className="mt-2 text-3xl font-bold text-white">4.9★</p>
                    <p className="text-xs text-slate-400">Customer rated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
