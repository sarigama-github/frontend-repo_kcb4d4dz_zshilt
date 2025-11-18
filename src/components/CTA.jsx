import { useMemo, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const fruits = [
  { name: 'Mango', price: 2500 },
  { name: 'Pineapple', price: 1800 },
  { name: 'Banana', price: 1200 },
  { name: 'Orange', price: 1500 },
  { name: 'Avocado', price: 3000 },
  { name: 'Apple', price: 2200 },
]

const cities = ['Lagos','Abuja','Port Harcourt','Ibadan','Kano','Enugu','Benin City']

function Naira({ amount }) {
  return <span>₦{Number(amount || 0).toLocaleString()}</span>
}

function CTA() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('Lagos')
  const [fruit, setFruit] = useState('Mango')
  const [quantity, setQuantity] = useState(5)
  const [eta, setEta] = useState(null)
  const [loadingEta, setLoadingEta] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const unitPrice = useMemo(() => fruits.find(f => f.name === fruit)?.price || 0, [fruit])
  const subtotal = useMemo(() => unitPrice * (quantity || 0), [unitPrice, quantity])
  const deliveryFee = useMemo(() => {
    if (!eta) return 0
    // Simple fee model: base ₦1,000 + ₦50/km, capped at ₦25,000
    const fee = 1000 + (eta.distance_km * 50)
    return Math.min(Math.round(fee), 25000)
  }, [eta])
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee])

  const fetchEta = async () => {
    setLoadingEta(true)
    setError('')
    setEta(null)
    try {
      const res = await fetch(`${BASE_URL}/eta?city=${encodeURIComponent(city)}&hub=Lagos`)
      if (!res.ok) throw new Error('Failed to fetch ETA')
      const data = await res.json()
      setEta(data)
    } catch (e) {
      setError('Could not estimate delivery time. Please try again.')
    } finally {
      setLoadingEta(false)
    }
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!eta) {
      await fetchEta()
    }

    try {
      setPlacing(true)
      // Create order
      const orderPayload = {
        items: [{ name: fruit, unit_price: unitPrice, quantity: Number(quantity) || 1 }],
        customer: { name, email: email || 'orders@horionfarms.ng', phone, address, city },
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total: total,
      }
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Order failed')
      }
      const { order_id } = await res.json()

      // Init payment
      const payRes = await fetch(`${BASE_URL}/payments/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id })
      })
      if (!payRes.ok) throw new Error('Payment init failed')
      const payData = await payRes.json()

      // Open checkout
      window.open(payData.authorization_url, '_blank', 'noopener,noreferrer')
      setSuccessMsg('Order created. Redirecting to secure payment...')
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setPlacing(false)
    }
  }

  return (
    <section id="cta" className="pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/70 p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-white">Ready to taste the future?</h2>
              <p className="mt-2 text-slate-300/90">Instant quote, delivery ETA, and secure payment in NGN.</p>

              <form onSubmit={placeOrder} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-slate-300 mb-2">Your Name</label>
                  <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Adaeze Okonkwo" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Email</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Phone</label>
                  <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="0803 123 4567" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">City</label>
                  <select value={city} onChange={(e)=>setCity(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Address</label>
                  <input value={address} onChange={(e)=>setAddress(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="House 10, Adeola St" />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Fruit</label>
                  <select value={fruit} onChange={(e)=>setFruit(e.target.value)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    {fruits.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Quantity (crates)</label>
                  <input type="number" min="1" value={quantity} onChange={(e)=>setQuantity(parseInt(e.target.value)||1)} className="w-full rounded-xl border border-emerald-500/30 bg-slate-900/80 p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <button type="button" onClick={fetchEta} disabled={loadingEta} className="rounded-xl border border-emerald-500/30 bg-slate-900/80 px-4 py-3 text-white hover:border-emerald-400 disabled:opacity-60">
                    {loadingEta ? 'Calculating ETA…' : 'Calculate ETA'}
                  </button>
                  {eta && (
                    <div className="text-sm text-slate-300">
                      ETA: <span className="font-semibold text-emerald-400">{eta.eta_hours}h</span> • Distance: {eta.distance_km}km • Cold-chain: {eta.cold_chain ? 'Yes' : 'No'}
                    </div>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <div className="rounded-xl border border-emerald-500/20 bg-slate-900/60 p-4 text-sm text-slate-200">
                    <div className="flex items-center justify-between"><span>Subtotal</span><span className="font-semibold text-white"><Naira amount={subtotal} /></span></div>
                    <div className="mt-1 flex items-center justify-between"><span>Delivery</span><span className="font-semibold text-white"><Naira amount={deliveryFee} /></span></div>
                    <div className="mt-2 border-t border-emerald-500/20 pt-2 flex items-center justify-between"><span className="text-emerald-300">Total</span><span className="text-emerald-400 text-lg font-bold"><Naira amount={total} /></span></div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button disabled={placing} className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-slate-900 hover:bg-emerald-400 disabled:opacity-60">
                    {placing ? 'Processing…' : 'Place order & pay securely'}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}
              {successMsg && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                  {successMsg}
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute -inset-10 -z-10 blur-3xl bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent" />
              <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="rounded-xl border border-emerald-500/20 p-4">
                    <p className="text-emerald-300">Average ETA</p>
                    <p className="mt-2 text-3xl font-bold text-white">{eta ? `${eta.eta_hours}h` : '6h'}</p>
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
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-slate-900/80 p-4">
                  <p className="text-slate-300 text-sm">You will be redirected to a secure checkout to complete payment. In demo mode, a simulated checkout opens.</p>
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
