import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      {/* ── Layer 1: Radial gold gradient background ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,160,82,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 2: Smoke effects ── */}
      {/* Smoke Left */}
      <div
        aria-hidden="true"
        className="smoke-left"
        style={{
          position: 'absolute',
          left: '-80px',
          top: '20%',
          width: '420px',
          height: '520px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(212,0,110,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      {/* Smoke Right */}
      <div
        aria-hidden="true"
        className="smoke-right"
        style={{
          position: 'absolute',
          right: '-80px',
          bottom: '15%',
          width: '380px',
          height: '480px',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse, rgba(212,0,110,0.15) 0%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 3: Art Deco ornamental border ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '20px',
          pointerEvents: 'none',
          border: '1px solid rgba(201,160,82,0.3)',
        }}
      />
      {/* Corner accents */}
      {[
        { top: '20px', left: '20px', borderTop: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
        { top: '20px', right: '20px', borderTop: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
        { bottom: '20px', left: '20px', borderBottom: '2px solid #C9A052', borderLeft: '2px solid #C9A052' },
        { bottom: '20px', right: '20px', borderBottom: '2px solid #C9A052', borderRight: '2px solid #C9A052' },
      ].map((style, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '40px',
            height: '40px',
            pointerEvents: 'none',
            ...style,
          }}
        />
      ))}

      {/* ── Layer 4: Central content ── */}
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
          gap: '0',
        }}
      >
        {/* a. Badge */}
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

        {/* b. Logo placeholder */}
        <motion.div
          {...fadeIn(0.4)}
          style={{
            width: '180px',
            height: '60px',
            border: '1px solid #C9A052',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '36px',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              fontWeight: 700,
              color: '#C9A052',
              letterSpacing: '0.12em',
            }}
          >
            CAMI × BLACK ROMEO
          </span>
        </motion.div>

        {/* c. Headline */}
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
                background: 'linear-gradient(90deg, #C9A052 0%, #E8C97A 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.01em',
              }}
            >
              HOOKAH EXPERIENCE
            </span>
          </h1>
        </motion.div>

        {/* d. Subtitle */}
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

        {/* e. Decorative separator */}
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

        {/* f. CTAs */}
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
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: '#C9A052',
              color: '#080808',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              border: '1px solid #C9A052',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E8C97A'
              e.currentTarget.style.borderColor = '#E8C97A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C9A052'
              e.currentTarget.style.borderColor = '#C9A052'
            }}
          >
            Book Your Hookah
          </a>

          {/* Secondary */}
          <a
            href="tel:9542263557"
            style={{
              display: 'inline-block',
              padding: '16px 36px',
              background: 'transparent',
              color: '#C9A052',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              border: '1px solid #C9A052',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201,160,82,0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            954 226 3557
          </a>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="scroll-indicator"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'rgba(201,160,82,0.5)',
          zIndex: 10,
        }}
      >
        <ChevronDown size={28} />
      </div>
    </section>
  )
}
