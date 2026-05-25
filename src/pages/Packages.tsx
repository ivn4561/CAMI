import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const ORBS = [
  { top: '10%', left: '5%',  delay: '0s' },
  { top: '40%', right: '3%', delay: '4s' },
  { top: '70%', left: '10%', delay: '8s' },
  { top: '90%', right: '8%', delay: '2s' },
]

function PageSmoke() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
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
          animation: 'floatSlow 12s ease-in-out infinite',
          animationDelay: orb.delay,
        }} />
      ))}
    </div>
  )
}

export default function Packages() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <PageSmoke />
      <Navbar />

      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        zIndex: 10,
      }}>
        {/* Logo */}
        <img
          src="/Logo.png"
          alt="CAMI by Black Romeo"
          style={{ width: '120px', mixBlendMode: 'screen', marginBottom: '32px' }}
        />

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ height: '1px', width: '40px', background: '#C9A052', opacity: 0.5 }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.3em',
            color: '#C9A052',
            textTransform: 'uppercase',
          }}>
            Coming Soon
          </span>
          <div style={{ height: '1px', width: '40px', background: '#C9A052', opacity: 0.5 }} />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 6vw, 56px)',
          fontWeight: 700,
          margin: '0 0 24px',
          background: 'linear-gradient(135deg, #C9A052, #E8C97A, #C9A052)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          letterSpacing: '0.05em',
        }}>
          OUR PACKAGES
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '18px',
          fontWeight: 300,
          color: 'rgba(245,230,200,0.6)',
          maxWidth: '460px',
          lineHeight: 1.7,
          margin: '0 0 36px',
        }}>
          We're crafting something extraordinary.
          <br />
          Premium hookah packages for every occasion.
        </p>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, #C9A052)' }} />
          <span style={{ color: '#C9A052', fontSize: '10px' }}>◆</span>
          <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, #C9A052, transparent)' }} />
        </div>

        {/* Lower text */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(245,230,200,0.4)',
          margin: '0 0 48px',
          letterSpacing: '0.05em',
        }}>
          Stay tuned — something premium is on its way.
        </p>

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '14px 32px',
            background: 'transparent',
            border: '1px solid #C9A052',
            color: '#C9A052',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: 0,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(201,160,82,0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
