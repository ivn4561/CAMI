import { MapPin, Phone, Mail } from 'lucide-react'

const GOLD = '#C9A052'

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(201,160,82,0.1)',
        padding: '100px 24px',
      }}
    >
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>

        {/* Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ height: '1px', width: '40px', background: `linear-gradient(90deg, transparent, ${GOLD})`, opacity: 0.5 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', letterSpacing: '0.25em', color: GOLD, textTransform: 'uppercase' }}>
            Our Story
          </span>
          <div style={{ height: '1px', width: '40px', background: `linear-gradient(90deg, ${GOLD}, transparent)`, opacity: 0.5 }} />
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 600,
          margin: '0 0 16px',
          lineHeight: 1.1,
          background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          Introducing CAMI × BLACK ROMEO
        </h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '28px',
          fontWeight: 300,
          color: `rgba(245,230,200,0.7)`,
          margin: '0 0 48px',
          lineHeight: 1.3,
        }}>
          A Premium Hookah Experience
        </p>

        {/* Paragraphs */}
        {[
          'South Florida, meet your new premium hookah experience. CAMI × BLACK ROMEO brings elegance, flavor, and unforgettable vibes to restaurants, lounges, private events, and celebrations.',
          'From premium hookahs to fresh fruit heads, extra charcoal, refills, and flavors your guests will love — we make every moment feel elevated.',
          'Now proudly serving Miami, Fort Lauderdale, West Palm Beach, Boca Raton, and surrounding areas.',
        ].map((text, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: 300,
            color: `rgba(245,230,200,0.7)`,
            lineHeight: 1.8,
            maxWidth: '680px',
            margin: i < 2 ? '0 0 24px' : '0 0 56px',
          }}>
            {text}
          </p>
        ))}

        {/* Decorative separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px', width: '100%' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,160,82,0.2)' }} />
          <span style={{ color: GOLD, fontSize: '10px' }}>◆</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,160,82,0.2)' }} />
        </div>

        {/* Contact info grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'rgba(201,160,82,0.1)',
          width: '100%',
        }}>
          {/* Location */}
          <ContactCol
            icon={<MapPin size={20} color={GOLD} strokeWidth={1.5} />}
            label="Location"
            text="South Florida"
          />

          {/* Phone */}
          <ContactCol
            icon={<Phone size={20} color={GOLD} strokeWidth={1.5} />}
            label="Call Us"
            text="954 226 3557"
            href="tel:+19542263557"
          />

          {/* Email */}
          <ContactCol
            icon={<Mail size={20} color={GOLD} strokeWidth={1.5} />}
            label="Email Us"
            text="camiblackromeo@gmail.com"
            href="mailto:camiblackromeo@gmail.com"
          />
        </div>
      </div>
    </section>
  )
}

function ContactCol({
  icon,
  label,
  text,
  href,
}: {
  icon: React.ReactNode
  label: string
  text: string
  href?: string
}) {
  const content = (
    <div style={{
      background: '#0A0A0A',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      textAlign: 'center',
    }}>
      {icon}
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.25em',
        color: 'rgba(201,160,82,0.6)',
        textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '16px',
        fontWeight: 300,
        color: '#F5E6C8',
        wordBreak: 'break-all',
      }}>
        {text}
      </span>
    </div>
  )

  if (href) {
    return (
      <a href={href} style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }
  return content
}
