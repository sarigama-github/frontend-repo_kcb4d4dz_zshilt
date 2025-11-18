import { useState } from 'react'
import { Star } from 'lucide-react'

const fruits = [
  { name: 'Mango', price: 2500, tag: 'In Season' },
  { name: 'Pineapple', price: 1800, tag: 'Sweet' },
  { name: 'Banana', price: 1200, tag: 'Everyday' },
  { name: 'Orange', price: 1500, tag: 'Vitamin C' },
  { name: 'Avocado', price: 3000, tag: 'Creamy' },
  { name: 'Apple', price: 2200, tag: 'Imported' },
]

function Products() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="products" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Popular Fruits</h2>
          <p className="text-sm text-slate-300/80">Transparent pricing per crate (₦)</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fruits.map((f) => (
            <button key={f.name} onClick={() => setSelected(f)} className="group text-left rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-6 hover:border-emerald-400/50 transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{f.name}</h3>
                  <p className="mt-1 text-sm text-emerald-300/90">{f.tag}</p>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                  <Star className="h-3 w-3" /> Best pick
                </div>
              </div>
              <p className="mt-6 text-2xl font-bold text-emerald-400">₦{f.price.toLocaleString()}</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={() => setSelected(null)}>
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-slate-900/90 p-6">
              <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
              <p className="mt-2 text-slate-300/90">Crate price: <span className="font-bold text-emerald-400">₦{selected.price.toLocaleString()}</span></p>
              <p className="mt-4 text-sm text-slate-300/80">Ready to ship within 24 hours nationwide. Bulk discounts available for retailers and hotels.</p>
              <a href="#cta" className="mt-6 inline-block rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400">Proceed to order</a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
