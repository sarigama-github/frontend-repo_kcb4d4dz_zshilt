import { useState } from 'react'
import { Menu, ShoppingBasket, TreePine } from 'lucide-react'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50">
          <div className="flex items-center justify-between px-6 py-4">
            <a href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute -inset-1 rounded-xl bg-emerald-500/40 blur-sm opacity-0 group-hover:opacity-100 transition" />
                <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-slate-900 shadow-lg">
                  <TreePine className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight text-white">Horion Farms</p>
                <p className="text-xs text-emerald-300/80">Fresh. Fast. Futuristic.</p>
              </div>
            </a>

            <nav className="hidden md:flex items-center gap-8 text-sm text-slate-200/90">
              <a href="#features" className="hover:text-white transition">Why Horion</a>
              <a href="#products" className="hover:text-white transition">Fruits</a>
              <a href="#delivery" className="hover:text-white transition">Nationwide</a>
              <a href="#cta" className="hover:text-white transition">Order</a>
            </nav>

            <div className="flex items-center gap-3">
              <a href="#cta" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-slate-900 font-semibold shadow-emerald-500/30 shadow hover:bg-emerald-400 transition">
                <ShoppingBasket className="h-4 w-4" /> Order Now
              </a>
              <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center justify-center rounded-xl border border-emerald-500/30 p-2 text-white/90 hover:bg-emerald-500/10">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden border-t border-emerald-500/20 px-6 py-4 space-y-3">
              <a onClick={() => setOpen(false)} href="#features" className="block text-slate-200">Why Horion</a>
              <a onClick={() => setOpen(false)} href="#products" className="block text-slate-200">Fruits</a>
              <a onClick={() => setOpen(false)} href="#delivery" className="block text-slate-200">Nationwide</a>
              <a onClick={() => setOpen(false)} href="#cta" className="block text-slate-900 bg-emerald-500 rounded-lg px-4 py-2 font-semibold">Order</a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
