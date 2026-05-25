import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HookahSmoke from './components/HookahSmoke'
import About from './components/About'
import Services from './components/Services'
import BookingForm from './components/BookingForm'
import FloatingContact from './components/FloatingContact'
import Footer from './components/Footer'
import MouseSmoke from './components/MouseSmoke'
import Packages from './pages/Packages'

const ORBS = [
  { top: '10%',  left: '5%',  delay: '0s' },
  { top: '40%',  right: '3%', delay: '4s' },
  { top: '70%',  left: '10%', delay: '8s' },
  { top: '90%',  right: '8%', delay: '2s' },
]

function PageSmoke() {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 1,
      overflow: 'hidden',
    }}>
      {ORBS.map((orb, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: orb.top,
          left: ('left' in orb) ? orb.left : undefined,
          right: ('right' in orb) ? orb.right : undefined,
          width: '300px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(212,0,110,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: `floatSlow 12s ease-in-out infinite`,
          animationDelay: orb.delay,
        }} />
      ))}
    </div>
  )
}

function Home() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <PageSmoke />
      <Navbar />
      <div style={{ position: 'relative' }}>
        <Hero />
        <HookahSmoke side="left" />
        <HookahSmoke side="right" />
      </div>
      <About />
      <Services />

      {/* ── Reservations ── */}
      <section
        id="book"
        style={{
          background: '#080808',
          borderTop: '1px solid rgba(201,160,82,0.1)',
          padding: '100px 24px',
        }}
      >
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, #C9A052)', opacity: 0.5 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: '#C9A052', textTransform: 'uppercase' }}>
              Reservations
            </span>
            <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, #C9A052, transparent)', opacity: 0.5 }} />
          </div>

          {/* Headline */}
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(40px, 5vw, 56px)', margin: '0 0 24px', lineHeight: 1.05 }}>
            <span style={{ display: 'block', fontWeight: 300, color: '#F5E6C8' }}>BOOK YOUR</span>
            <span style={{
              display: 'block', fontWeight: 700,
              background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', color: 'transparent',
            }}>
              EXPERIENCE
            </span>
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 300,
            color: 'rgba(245,230,200,0.6)', maxWidth: '440px', lineHeight: 1.7, margin: '0 0 56px',
          }}>
            Reserve your premium hookah service for your next event. We'll take care of everything.
          </p>

          <div style={{ width: '100%', textAlign: 'left' }}>
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <MouseSmoke />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </>
  )
}
