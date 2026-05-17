import type { CSSProperties } from 'react'

// Smoke particle data: size (px), --drift offset, duration, delay, x offset from center (px)
const PARTICLES = [
  { size: 30, drift: '-15px', duration: '3.5s', delay: '0.0s', xOff: -6 },
  { size: 40, drift:   '8px', duration: '4.2s', delay: '0.5s', xOff:  2 },
  { size: 25, drift: '-20px', duration: '3.8s', delay: '1.0s', xOff:  4 },
  { size: 45, drift:  '12px', duration: '4.8s', delay: '1.5s', xOff: -4 },
  { size: 20, drift:  '-5px', duration: '3.2s', delay: '0.3s', xOff:  6 },
  { size: 35, drift:  '18px', duration: '4.5s', delay: '2.0s', xOff: -8 },
  { size: 28, drift: '-10px', duration: '3.9s', delay: '0.8s', xOff:  0 },
  { size: 42, drift:   '6px', duration: '4.1s', delay: '1.8s', xOff:  8 },
] as const

// Bowl opening is at SVG y=72 out of 400 viewBox height.
// Displayed at 380px → bowl y ≈ 68px from top of component.
// Particles start just above the bowl center (x≈60/120 ≈ 50% of ~114px wide).
const BOWL_TOP_PX = 58   // px from top of 380px container
const BOWL_CENTER_X = 52 // px from left  (57px × 114/120 ≈ 54, nudge slightly left)

interface Props {
  /** Flip horizontally for the left-side hookah */
  flip?: boolean
}

export default function HookahSmoke({ flip = false }: Props) {
  return (
    <div
      className="hookah-wrap"
      style={{
        position: 'relative',
        width: '120px',
        height: '380px',
        pointerEvents: 'none',
        transform: flip ? 'scaleX(-1)' : undefined,
        flexShrink: 0,
      }}
    >
      {/* ── Smoke particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${BOWL_TOP_PX - p.size / 2}px`,
            left: `${BOWL_CENTER_X + p.xOff - p.size / 2}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,0,110,0.18) 0%, rgba(180,0,100,0.06) 50%, transparent 70%)',
            filter: 'blur(8px)',
            animation: `smokeRise ${p.duration} ease-out ${p.delay} infinite`,
            '--drift': p.drift,
          } as CSSProperties}
        />
      ))}

      {/* ── Hookah SVG ── */}
      <svg
        viewBox="0 0 120 400"
        width="120"
        height="380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A052" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="goldGradV" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C9A052" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
        </defs>

        {/* ── Base ── */}
        <rect x="20" y="372" width="80" height="16" rx="8"
          fill="url(#goldGrad)" />

        {/* ── Lower shaft (base → vase) ── */}
        <rect x="57" y="316" width="6" height="56"
          fill="#111111" stroke="#C9A052" strokeWidth="0.8" />

        {/* ── Vase / jar body ── */}
        <ellipse cx="60" cy="276" rx="27" ry="42"
          fill="#0D0D0D" stroke="#C9A052" strokeWidth="1" />

        {/* Vase decorative lines */}
        <line x1="37" y1="256" x2="83" y2="256"
          stroke="rgba(201,160,82,0.3)" strokeWidth="0.5" />
        <line x1="35" y1="276" x2="85" y2="276"
          stroke="rgba(201,160,82,0.3)" strokeWidth="0.5" />
        <line x1="37" y1="296" x2="83" y2="296"
          stroke="rgba(201,160,82,0.3)" strokeWidth="0.5" />

        {/* Vase highlight */}
        <rect x="44" y="248" width="5" height="52" rx="2"
          fill="rgba(255,255,255,0.05)" />

        {/* ── Upper shaft (vase → neck) ── */}
        <rect x="57" y="140" width="6" height="134"
          fill="#111111" stroke="#C9A052" strokeWidth="0.8" />

        {/* ── Neck ── */}
        <rect x="55" y="108" width="10" height="32"
          fill="#111111" stroke="#C9A052" strokeWidth="1" />

        {/* ── Charcoal tray (platillo) ── */}
        <ellipse cx="60" cy="108" rx="24" ry="6"
          fill="rgba(201,160,82,0.55)" stroke="#C9A052" strokeWidth="0.5" />

        {/* ── Bowl (inverted trapezoid / cup) ── */}
        <path d="M 40,108 L 44,74 L 76,74 L 80,108 Z"
          fill="#0D0D0D" stroke="#C9A052" strokeWidth="1" />

        {/* Bowl top opening */}
        <ellipse cx="60" cy="74" rx="17" ry="4"
          fill="#1A1A1A" stroke="#C9A052" strokeWidth="0.8" />

        {/* Bowl inner glow (coal embers hint) */}
        <ellipse cx="60" cy="74" rx="10" ry="2.5"
          fill="rgba(201,160,82,0.12)" />

        {/* Gold accent line at neck–bowl junction */}
        <line x1="38" y1="108" x2="82" y2="108"
          stroke="#C9A052" strokeWidth="0.5" strokeOpacity="0.5" />
      </svg>
    </div>
  )
}
