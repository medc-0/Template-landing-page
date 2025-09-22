import { useEffect, useState } from 'react'

type Feature = { title: string; description: string }

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="Edunomics" className="h-7 w-7" />
          <span className="font-semibold text-white">Edunomics</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#solutions" className="hover:text-white">Solutions</a>
          <a href="#industries" className="hover:text-white">Industries</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Talk to us</a>
          <a href="#get-started" className="inline-flex items-center rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-200">Get started</a>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-24 bg-gradient-to-b from-black to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Modern services for education and enterprise
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-xl">
              Edunomics delivers automation, analytics, and seamless integrations to empower educators, organizations, and individuals.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#get-started" className="inline-flex items-center rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-gray-300">Start now</a>
              <a href="#contact" className="inline-flex items-center rounded-md px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 hover:bg-white/10">Book a demo</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-gray-500">
              <div>
                <div className="text-2xl font-bold text-white">10x</div>
                <div className="text-sm text-gray-400">Faster operations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Priority support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl border border-white/10 bg-zinc-900 shadow-lg p-4 sm:p-6">
              <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-white to-zinc-400 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-sm transition hover:shadow-md">
      <div className="h-10 w-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-4">
        <span className="text-lg">★</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{feature.description}</p>
      <a className="mt-4 inline-flex items-center text-sm font-medium text-white/80 hover:text-white" href="#">Learn more →</a>
    </div>
  )
}

function Features() {
  const [features, setFeatures] = useState<Feature[]>([])
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/public/features` : '/api/public/features', {
      credentials: 'include'
    })
      .then(r => r.json())
      .then(setFeatures)
      .catch(() => setFeatures([
        { title: 'Automation', description: 'Smart tools to save time every day.' },
        { title: 'Analytics', description: 'Understand performance with clarity.' },
        { title: 'Integrations', description: 'Connect the tools you love.' }
      ]))
  }, [])

  return (
    <section id="solutions" className="py-16 sm:py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">What we offer</h2>
          <p className="mt-4 text-gray-300">Solutions tailored for educators, enterprises, and individuals.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-white to-zinc-400 p-8 sm:p-12 text-black">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold">Ready to transform with Edunomics?</h3>
              <p className="mt-2 text-black/70">Let’s build your next leap in learning and operations.</p>
            </div>
            <div className="flex gap-3 lg:justify-end">
              <a href="#get-started" className="inline-flex items-center rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800">Get started</a>
              <a href="mailto:hello@edunomics.com" className="inline-flex items-center rounded-md ring-1 ring-inset ring-black/20 px-4 py-2.5 text-sm font-semibold text-black hover:bg-black/5">Email us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src="/edunomics-logo.svg" alt="Edunomics" className="h-5 w-5" />
          <span className="text-sm text-gray-400">© {new Date().getFullYear()} Edunomics</span>
        </div>
        <div className="text-sm text-gray-400 flex gap-6">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Security</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-full bg-black text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

