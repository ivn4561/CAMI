import type { CSSProperties } from 'react'

const PARTICLES: {
  drift: string
  duration: string
  delay: string
  size: number
}[] = [
  { drift: '-18px', duration: '3.5s', delay: '0s',   size: 35 },
  { drift:  '12px', duration: '4.0s', delay: '0.4s', size: 35 },
  { drift:  '-8px', duration: '3.8s', delay: '0.8s', size: 35 },
  { drift:  '20px', duration: '4.5s', delay: '0.2s', size: 50 },
  { drift: '-15px', duration: '3.2s', delay: '1.2s', size: 50 },
  { drift:   '6px', duration: '4.2s', delay: '0.6s', size: 50 },
  { drift: '-22px', duration: '3.6s', delay: '1.5s', size: 65 },
  { drift:  '16px', duration: '4.8s', delay: '0.3s', size: 65 },
  { drift: '-10px', duration: '3.9s', delay: '1.8s', size: 65 },
  { drift:   '8px', duration: '4.3s', delay: '0.9s', size: 65 },
]

interface Props {
  side: 'left' | 'right'
}

export default function HookahSmoke({ side }: Props) {
  const isRight = side === 'right'

  return (
    <div
      aria-hidden="true"
      className="hookah-outer"
      style={{
        position: 'absolute',
        bottom: 0,
        ...(isRight ? { right: 0 } : { left: 0 }),
        width: 'calc((100vw - 760px) / 2)',
        maxWidth: '300px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: isRight ? 'flex-start' : 'flex-end',
        pointerEvents: 'none',
        zIndex: 6,
        overflow: 'visible',
      }}
    >
      {/* Image wrapper so smoke origin tracks the hookah top */}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Smoke particles — emit from top of hookah */}
        <div style={{
          position: 'absolute',
          bottom: '85%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1px',
          height: '1px',
        }}>
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${p.size}px`,
                height: `${p.size}px`,
                marginLeft: `${-p.size / 2}px`,
                marginTop: `${-p.size / 2}px`,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(212,0,110,0.25) 0%, rgba(180,0,100,0.1) 40%, transparent 70%)',
                filter: 'blur(12px)',
                animation: `smokeRise ${p.duration} ease-out ${p.delay} infinite`,
                '--drift': p.drift,
              } as CSSProperties}
            />
          ))}
        </div>

        <img
          src="/hookah.png"
          alt=""
          className="hookah-img"
          style={{
            width: 'auto',
            objectFit: 'contain',
            objectPosition: 'center bottom',
            display: 'block',
            transform: isRight ? 'scaleX(-1)' : undefined,
            filter: 'drop-shadow(0 0 20px rgba(212,0,110,0.3))',
            opacity: 0.9,
          }}
        />
      </div>
    </div>
  )
}
