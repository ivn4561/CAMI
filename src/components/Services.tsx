import { Flame, Users } from 'lucide-react'

// ── Shared styles ──────────────────────────────────────────
const GOLD = '#C9A052'
const CREAM = '#F5E6C8'

const sectionTitle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  marginBottom: '48px',
}

const sectionTitleText = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '13px',
  fontWeight: 400,
  letterSpacing: '0.25em',
  color: GOLD,
  textTransform: 'uppercase' as const,
  whiteSpace: 'nowrap' as const,
}

const titleLine = {
  height: '1px',
  width: '60px',
  background: `linear-gradient(90deg, transparent, ${GOLD})`,
  opacity: 0.5,
}

const titleLineRight = {
  ...titleLine,
  background: `linear-gradient(90deg, ${GOLD}, transparent)`,
}

// ── Flavors data ───────────────────────────────────────────
const FLAVORS = [
  'Double Apple', 'Grape', 'Blueberry', 'Mint', 'Watermelon',
  'Strawberry', 'Mango', 'Peach', 'Pineapple', 'Orange',
  'Lemon', 'Kiwi', 'Passion Fruit', 'Bubblegum',
]

// ── Features data ──────────────────────────────────────────
const FEATURES = [
  {
    icon: <span style={{ fontSize: '32px', lineHeight: 1 }}>🍍</span>,
    title: 'FRUIT HEADS',
    sub: 'Pineapple / Orange Bowls',
  },
  {
    icon: <Flame size={32} color={GOLD} strokeWidth={1.5} />,
    title: 'EXTRA CHARCOAL',
    sub: 'Premium coal included',
  },
  {
    icon: <Users size={32} color={GOLD} strokeWidth={1.5} />,
    title: 'EXTRA SHARING',
    sub: 'Multiple guests welcome',
  },
]

// ── Price Card ─────────────────────────────────────────────
function PriceCard({
  label,
  price,
  sub,
}: {
  label: string
  price: string
  sub: string
}) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: '200px',
        background: 'rgba(201,160,82,0.05)',
        border: `1px solid rgba(201,160,82,0.3)`,
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.25em',
          color: `rgba(245,230,200,0.5)`,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '72px',
          fontWeight: 700,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {price}
      </span>

      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: 400,
          letterSpacing: '0.2em',
          color: `rgba(245,230,200,0.6)`,
          textTransform: 'uppercase',
        }}
      >
        {sub}
      </span>
    </div>
  )
}

// ── Feature Card ───────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  sub,
}: {
  icon: React.ReactNode
  title: string
  sub: string
}) {
  return (
    <div
      style={{
        padding: '32px',
        border: '1px solid rgba(201,160,82,0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '14px',
        textAlign: 'center',
        transition: 'border-color 0.3s, background 0.3s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(201,160,82,0.4)'
        el.style.background = 'rgba(201,160,82,0.04)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(201,160,82,0.15)'
        el.style.background = 'transparent'
      }}
    >
      <div>{icon}</div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: CREAM,
          textTransform: 'uppercase',
        }}
      >
        {title}
      </span>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 300,
          color: 'rgba(245,230,200,0.5)',
        }}
      >
        {sub}
      </span>
    </div>
  )
}

// ── Flavor Chip ────────────────────────────────────────────
function FlavorChip({ name }: { name: string }) {
  return (
    <div
      style={{
        border: '1px solid rgba(201,160,82,0.2)',
        padding: '8px 16px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 400,
        letterSpacing: '0.15em',
        color: 'rgba(245,230,200,0.7)',
        textTransform: 'uppercase',
        textAlign: 'center',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = GOLD
        el.style.color = GOLD
        el.style.background = 'rgba(201,160,82,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(201,160,82,0.2)'
        el.style.color = 'rgba(245,230,200,0.7)'
        el.style.background = 'transparent'
      }}
    >
      {name}
    </div>
  )
}

// ── Main export ────────────────────────────────────────────
export default function Services() {
  return (
    <div id="services">
      {/* ═══════════════════════════════════════════════════
          SECCIÓN 1 — PRECIO DESTACADO
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0D0D0D',
          borderTop: '1px solid rgba(201,160,82,0.2)',
          padding: '80px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div style={titleLine} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: GOLD,
                textTransform: 'uppercase',
              }}
            >
              Premium Hookah Experience for Restaurants &amp; Events
            </span>
            <div style={titleLineRight} />
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              fontWeight: 300,
              color: 'rgba(245,230,200,0.7)',
              maxWidth: '500px',
              textAlign: 'center',
              lineHeight: 1.65,
              margin: '0 0 56px',
            }}
          >
            Elevate your lounge, restaurant, or event with a premium hookah
            experience your guests won't forget.
          </p>

          {/* Price cards — 1px gap acts as gold divider */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '600px',
              gap: '1px',
              background: 'rgba(201,160,82,0.3)',
            }}
          >
            <PriceCard label="Starting At" price="$45" sub="Per Hookah" />
            <PriceCard label="Refills" price="$9.50" sub="Per Refill" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECCIÓN 2 — PREMIUM INCLUDES
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0D0D0D',
          padding: '72px 24px',
          borderTop: '1px solid rgba(201,160,82,0.08)',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={sectionTitle}>
            <div style={titleLine} />
            <span style={sectionTitleText}>Premium Includes</span>
            <div style={titleLineRight} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: 'rgba(201,160,82,0.1)',
            }}
          >
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: '#0D0D0D' }}>
                <FeatureCard {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECCIÓN 3 — PREMIUM FLAVORS
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0D0D0D',
          padding: '72px 24px',
          borderTop: '1px solid rgba(201,160,82,0.08)',
        }}
      >
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={sectionTitle}>
            <div style={titleLine} />
            <span style={sectionTitleText}>Premium Flavors</span>
            <div style={titleLineRight} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: '8px',
            }}
          >
            {FLAVORS.map((f) => (
              <FlavorChip key={f} name={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECCIÓN 4 — SERVING AREA
      ═══════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0A0A0A',
          borderTop: '1px solid rgba(201,160,82,0.12)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {/* eyebrow */}
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.35em',
              color: 'rgba(201,160,82,0.6)',
              textTransform: 'uppercase',
            }}
          >
            · Proudly Serving ·
          </span>

          {/* Big title */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 6vw, 56px)',
              fontWeight: 700,
              margin: 0,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            South Florida
          </h2>

          {/* Cities */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: '0.1em',
              color: 'rgba(245,230,200,0.5)',
              margin: 0,
              lineHeight: 1.8,
              textTransform: 'uppercase',
            }}
          >
            Miami · Fort Lauderdale · West Palm Beach
            <br />
            Boca Raton &amp; Surrounding Areas
          </p>

          {/* Decorative separator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '8px 0',
            }}
          >
            <div
              style={{
                height: '1px',
                width: '60px',
                background: 'linear-gradient(90deg, transparent, #C9A052)',
              }}
            />
            <span style={{ color: GOLD, fontSize: '10px' }}>◆</span>
            <div
              style={{
                height: '1px',
                width: '60px',
                background: 'linear-gradient(90deg, #C9A052, transparent)',
              }}
            />
          </div>

          {/* CTA */}
          <a
            href="#book"
            style={{
              display: 'inline-block',
              width: '280px',
              padding: '18px 0',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
              color: '#080808',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
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
            Book Your Experience
          </a>
        </div>
      </section>
    </div>
  )
}
