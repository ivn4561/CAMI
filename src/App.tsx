import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import BookingForm from './components/BookingForm'
import FloatingContact from './components/FloatingContact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808' }}>
      <Navbar />
      <Hero />
      <Services />

      {/* ── Reservations section ── */}
      <section
        id="book"
        style={{
          background: '#080808',
          borderTop: '1px solid rgba(201,160,82,0.1)',
          padding: '100px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '40px',
                background: 'linear-gradient(90deg, transparent, #C9A052)',
                opacity: 0.5,
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: '#C9A052',
                textTransform: 'uppercase',
              }}
            >
              Reservations
            </span>
            <div
              style={{
                height: '1px',
                width: '40px',
                background: 'linear-gradient(90deg, #C9A052, transparent)',
                opacity: 0.5,
              }}
            />
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 5vw, 56px)',
              margin: '0 0 24px',
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                display: 'block',
                fontWeight: 300,
                color: '#F5E6C8',
              }}
            >
              BOOK YOUR
            </span>
            <span
              style={{
                display: 'block',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              EXPERIENCE
            </span>
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: 300,
              color: 'rgba(245,230,200,0.6)',
              maxWidth: '440px',
              lineHeight: 1.7,
              margin: '0 0 56px',
            }}
          >
            Reserve your premium hookah service for your next event.
            We'll take care of everything.
          </p>

          {/* Form — full width of the section container */}
          <div style={{ width: '100%', textAlign: 'left' }}>
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingContact />
    </div>
  )
}
