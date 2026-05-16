import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'

const GOLD = '#C9A052'

// Instagram SVG (same inline approach used in Navbar)
function InstagramIcon({ size = 20, color = GOLD }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill={color} stroke="none" />
    </svg>
  )
}

type ContactOption = {
  icon: (color: string) => React.ReactNode
  label: string
  sub: string
  href: string
  target?: string
  hoverBg: string
  hoverColor: string
}

const OPTIONS: ContactOption[] = [
  {
    icon: (color) => <InstagramIcon size={20} color={color} />,
    label: 'Follow us',
    sub: '@bc_luxery',
    href: 'https://www.instagram.com/bc_luxery',
    target: '_blank',
    hoverBg: 'rgba(212,0,110,0.1)',
    hoverColor: '#D4006E',
  },
  {
    icon: (color) => <Phone size={20} color={color} strokeWidth={1.5} />,
    label: 'Call us',
    sub: '954 226 3557',
    href: 'tel:+19542263557',
    hoverBg: 'rgba(201,160,82,0.1)',
    hoverColor: GOLD,
  },
]

export default function FloatingContact() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      {/* ── Contact card (opens above button) ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              background: '#111111',
              border: '1px solid rgba(201,160,82,0.3)',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
              minWidth: '200px',
            }}
          >
            {/* Header */}
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.25em',
                color: 'rgba(201,160,82,0.6)',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Contact Us
            </div>
            <div
              style={{
                height: '1px',
                background: 'rgba(201,160,82,0.2)',
                marginBottom: '12px',
              }}
            />

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {OPTIONS.map((opt) => (
                <ContactRow key={opt.href} opt={opt} onClose={() => setOpen(false)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact us"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: 'none',
          background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
          boxShadow: '0 4px 20px rgba(201,160,82,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          padding: 0,
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(201,160,82,0.65)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(201,160,82,0.4)'
        }}
      >
        <img
          src="/Logo.png"
          alt="CAMI"
          style={{
            width: '32px',
            height: '32px',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
          }}
        />
      </button>
    </div>
  )
}

// Separate component so each row manages its own hover color state
function ContactRow({
  opt,
  onClose,
}: {
  opt: ContactOption
  onClose: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={opt.href}
      target={opt.target}
      rel={opt.target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={onClose}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        borderRadius: '8px',
        textDecoration: 'none',
        background: hovered ? opt.hoverBg : 'transparent',
        transition: 'background 0.2s',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        {opt.icon(hovered ? opt.hoverColor : GOLD)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 400,
            color: '#F5E6C8',
          }}
        >
          {opt.label}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            color: GOLD,
          }}
        >
          {opt.sub}
        </span>
      </div>
    </a>
  )
}
