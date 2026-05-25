import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ANCHOR_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '/packages' },
  { label: 'Contact',  href: '#book' },
]

function smoothScroll(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const brandStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    color: '#C9A052',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
  }

  const linkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    fontWeight: 400,
    color: 'rgba(245,230,200,0.7)',
    textDecoration: 'none',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,160,82,0.12)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Left — CAMI */}
        <div
          style={{
            ...brandStyle,
            borderRight: '1px solid rgba(201,160,82,0.35)',
            paddingRight: '16px',
          }}
        >
          CAMI
        </div>

        {/* Center — links (absolute so they're always centered) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {ANCHOR_LINKS.map(({ label, href }) => (
            <button
              key={label}
              style={linkStyle}
              onClick={() => {
                if (href.startsWith('/')) {
                  navigate(href)
                } else {
                  smoothScroll(href)
                }
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A052')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(245,230,200,0.7)')}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right — BLACK ROMEO */}
        <div style={{ marginLeft: 'auto' }}>
          <div
            style={{
              ...brandStyle,
              borderLeft: '1px solid rgba(201,160,82,0.35)',
              paddingLeft: '16px',
            }}
          >
            Black Romeo
          </div>
        </div>
      </div>
    </nav>
  )
}
