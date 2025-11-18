import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Products from './components/Products'
import Delivery from './components/Delivery'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />

      <Navbar />
      <main>
        <Hero />
        <Features />
        <Products />
        <Delivery />
        <CTA />
      </main>

      <footer className="border-t border-emerald-500/20 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Horion Farms. All rights reserved.</p>
            <div className="text-sm text-slate-400">Made in Nigeria • Freshness guaranteed</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
