import { motion } from 'framer-motion'
import { ChevronDown, Phone } from 'lucide-react'

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

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        paddingTop: '72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      {/* ── Radial gold gradient base ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,160,82,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Atmosphere Layer 1: Magenta glow left ── */}
      <div
        aria-hidden="true"
        className="glow-left"
        style={{
          position: 'absolute',
          left: '-100px',
          top: '30%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(212,0,110,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Atmosphere Layer 2: Magenta glow right ── */}
      <div
        aria-hidden="true"
        className="glow-right"
        style={{
          position: 'absolute',
          right: '-100px',
          top: '50%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(212,0,110,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Atmosphere Layer 3: Gold glow center-bottom ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background:
            'radial-gradient(circle, rgba(201,160,82,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Art Deco ornamental border ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '20px',
          border: '1px solid rgba(201,160,82,0.2)',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      {/* Corner accents */}
      {[
        { top: '20px', left: '20px', borderTop: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
        { top: '20px', right: '20px', borderTop: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
        { bottom: '20px', left: '20px', borderBottom: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
        { bottom: '20px', right: '20px', borderBottom: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
      ].map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            pointerEvents: 'none',
            zIndex: 5,
            ...s,
          }}
        />
      ))}

      {/* ── Central content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '700px',
          padding: '0 24px',
        }}
      >
        {/* Badge */}
        <motion.div
          {...fadeIn(0.2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div style={{ height: '1px', width: '48px', background: '#C9A052', opacity: 0.6 }} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              color: '#C9A052',
              textTransform: 'uppercase',
            }}
          >
            South Florida's Premium Experience
          </span>
          <div style={{ height: '1px', width: '48px', background: '#C9A052', opacity: 0.6 }} />
        </motion.div>

        {/* Logo real */}
        <motion.div {...fadeIn(0.4)} style={{ marginBottom: '32px' }}>
          <img
            src="/Logo.png"
            alt="CAMI by Black Romeo"
            className="logo-pulse"
            style={{
              width: 'clamp(160px, 20vw, 220px)',
              display: 'block',
              mixBlendMode: 'screen',
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.div {...fadeUp(0.6)} style={{ marginBottom: '20px' }}>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              margin: 0,
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 300,
                color: '#F5E6C8',
                letterSpacing: '-0.01em',
              }}
            >
              ELEVATE YOUR
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #C9A052, #E8C97A, #C9A052)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.01em',
              }}
            >
              HOOKAH EXPERIENCE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeIn(0.8)}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(15px, 2vw, 18px)',
            fontWeight: 300,
            color: 'rgba(245,230,200,0.7)',
            maxWidth: '480px',
            lineHeight: 1.65,
            margin: '0 0 32px',
          }}
        >
          Premium hookah rentals for restaurants, lounges &amp; private events
          across South Florida
        </motion.p>

        {/* Decorative separator */}
        <motion.div
          {...fadeIn(0.9)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              height: '1px',
              width: '80px',
              background: 'linear-gradient(90deg, transparent, #C9A052)',
            }}
          />
          <span style={{ color: '#C9A052', fontSize: '10px' }}>◆</span>
          <div
            style={{
              height: '1px',
              width: '80px',
              background: 'linear-gradient(90deg, #C9A052, transparent)',
            }}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeIn(1.0)}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Primary */}
          <a
            href="#book"
            className="btn-primary"
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
              color: '#080808',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'brightness(1.1)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Book Your Hookah
          </a>

          {/* Secondary */}
          <a
            href="tel:9542263557"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 36px',
              background: 'transparent',
              color: '#C9A052',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              border: '1px solid #C9A052',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,160,82,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <Phone size={16} />
            954 226 3557
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll down"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10,
          padding: '8px',
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'rgba(201,160,82,0.4)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div className="scroll-indicator" style={{ color: 'rgba(201,160,82,0.5)' }}>
          <ChevronDown size={24} />
        </div>
      </button>
    </section>
  )
}
