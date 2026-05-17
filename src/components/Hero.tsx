import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, Mail } from 'lucide-react'
import HookahSmoke from './HookahSmoke'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
})

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.7, delay },
})

function scrollToNext() {
  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
}

// ── Instagram SVG ──────────────────────────────────────────
function InstagramIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  )
}

// ── Contact dropdown item ───────────────────────────────────
function DropdownItem({ icon, text, href, target }: {
  icon: React.ReactNode; text: string; href: string; target?: string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px', borderRadius: '6px', textDecoration: 'none',
        background: hovered ? 'rgba(201,160,82,0.08)' : 'transparent',
        transition: 'background 0.15s', cursor: 'pointer',
      }}
    >
      {icon}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: text.includes('@') || text.includes('.com') ? '11px' : '13px',
        fontWeight: 300, color: '#F5E6C8',
      }}>
        {text}
      </span>
    </a>
  )
}

// ── CTA buttons with inline contact dropdown ───────────────
function ContactButtons() {
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!show) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [show])

  const btnBase = {
    flex: 1, minWidth: 0, whiteSpace: 'nowrap' as const,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '16px 0', fontFamily: "'Inter', sans-serif",
    fontSize: '12px', letterSpacing: '0.15em',
    textTransform: 'uppercase' as const, borderRadius: 0,
    cursor: 'pointer', transition: 'all 0.3s ease',
  }

  return (
    <div className="hero-ctas">
      {/* Primary */}
      <a
        href="#book"
        onClick={(e) => { e.preventDefault(); document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }}
        style={{ ...btnBase, background: 'linear-gradient(135deg, #C9A052, #E8C97A)', color: '#080808', fontWeight: 600, textDecoration: 'none', border: 'none' }}
        onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'scale(1.02)' }}
        onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'scale(1)' }}
      >
        Book Your Hookah
      </a>

      {/* Secondary with dropdown */}
      <div ref={ref} style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <button
          onClick={() => setShow((v) => !v)}
          style={{ ...btnBase, width: '100%', background: 'transparent', color: '#C9A052', fontWeight: 500, border: '1px solid #C9A052' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,160,82,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          Contact Us
        </button>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'absolute', bottom: 'calc(100% + 12px)',
                left: '50%', transform: 'translateX(-50%)',
                width: '220px', background: '#111111',
                border: '1px solid rgba(201,160,82,0.3)', borderRadius: '8px',
                padding: '12px', boxShadow: '0 -8px 32px rgba(0,0,0,0.6)', zIndex: 50,
              }}
            >
              <DropdownItem icon={<InstagramIcon color="#D4006E" />} text="@bc_luxery" href="https://www.instagram.com/bc_luxery" target="_blank" />
              <DropdownItem icon={<Phone size={18} color="#C9A052" strokeWidth={1.5} />} text="954 226 3557" href="tel:+19542263557" />
              <DropdownItem icon={<Mail size={18} color="#C9A052" strokeWidth={1.5} />} text="camiblackromeo@gmail.com" href="mailto:camiblackromeo@gmail.com" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Hero ───────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '72px',
        paddingBottom: '100px', // space for scroll indicator
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px', // gap between framed content and buttons
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      {/* ── Background effects ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,160,82,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" className="glow-left" style={{
        position: 'absolute', left: '-100px', top: '30%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,0,110,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" className="glow-right" style={{
        position: 'absolute', right: '-100px', top: '50%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,0,110,0.15) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '300px',
        background: 'radial-gradient(circle, rgba(201,160,82,0.08) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── FRAMED CONTENT — border lives INSIDE this div ── */}
      <div
        style={{
          position: 'relative', // frame is scoped here
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
          padding: '40px 40px 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* ── Hookah left (flipped) ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: '-20px',
          zIndex: 6, pointerEvents: 'none',
        }}>
          <HookahSmoke flip />
        </div>

        {/* ── Hookah right ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, right: '-20px',
          zIndex: 6, pointerEvents: 'none',
        }}>
          <HookahSmoke />
        </div>

        {/* Art Deco border — child of content, NOT of section */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(201,160,82,0.2)',
          pointerEvents: 'none',
        }} />
        {/* Corner accents */}
        {[
          { top: 0, left: 0, borderTop: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
          { top: 0, right: 0, borderTop: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
          { bottom: 0, left: 0, borderBottom: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
          { bottom: 0, right: 0, borderBottom: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
        ].map((s, i) => (
          <div key={i} aria-hidden="true" style={{ position: 'absolute', width: '40px', height: '40px', pointerEvents: 'none', ...s }} />
        ))}

        {/* Badge */}
        <motion.div {...fadeIn(0.2)} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', position: 'relative' }}>
          <div style={{ height: '1px', width: '48px', background: '#C9A052', opacity: 0.6 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 400, letterSpacing: '0.25em', color: '#C9A052', textTransform: 'uppercase' }}>
            South Florida's Premium Experience
          </span>
          <div style={{ height: '1px', width: '48px', background: '#C9A052', opacity: 0.6 }} />
        </motion.div>

        {/* Logo */}
        <motion.div {...fadeIn(0.4)} style={{ marginBottom: '32px', position: 'relative' }}>
          <img src="/Logo.png" alt="CAMI by Black Romeo" className="logo-pulse"
            style={{ width: 'clamp(160px, 20vw, 220px)', display: 'block', mixBlendMode: 'screen' }} />
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.6)} style={{ marginBottom: '20px', position: 'relative' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", margin: 0, lineHeight: 1.05 }}>
            <span style={{ display: 'block', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 300, color: '#F5E6C8', letterSpacing: '-0.01em' }}>
              ELEVATE YOUR
            </span>
            <span style={{
              display: 'block', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700,
              background: 'linear-gradient(135deg, #C9A052, #E8C97A, #C9A052)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', color: 'transparent', letterSpacing: '-0.01em',
            }}>
              HOOKAH EXPERIENCE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p {...fadeIn(0.8)} style={{
          fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)',
          fontWeight: 300, color: 'rgba(245,230,200,0.7)',
          maxWidth: '480px', lineHeight: 1.65, margin: '0 0 32px', position: 'relative',
        }}>
          Premium hookah rentals for restaurants, lounges &amp; private events across South Florida
        </motion.p>

        {/* Separator ◆ */}
        <motion.div {...fadeIn(0.9)} style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A052)' }} />
          <span style={{ color: '#C9A052', fontSize: '10px' }}>◆</span>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, #C9A052, transparent)' }} />
        </motion.div>
      </div>

      {/* ── BUTTONS — outside the frame, sibling div ── */}
      <motion.div
        {...fadeIn(1.0)}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '560px',
          padding: '0 32px',
          boxSizing: 'border-box',
        }}
      >
        <ContactButtons />
      </motion.div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll down"
        style={{
          position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
          background: 'none', border: 'none', cursor: 'pointer', zIndex: 10, padding: '8px',
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', letterSpacing: '0.25em', color: 'rgba(201,160,82,0.4)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div className="scroll-indicator" style={{ color: 'rgba(201,160,82,0.5)' }}>
          <ChevronDown size={24} />
        </div>
      </button>
    </section>
  )
}
