import { useEffect, useRef } from 'react'

const SIZES = [8, 14, 20]

function isInActiveSection(clientX: number, clientY: number): boolean {
  for (const id of ['hero', 'about']) {
    const el = document.getElementById(id)
    if (el) {
      const r = el.getBoundingClientRect()
      if (clientY >= r.top && clientY <= r.bottom && clientX >= r.left && clientX <= r.right) {
        return true
      }
    }
  }
  return false
}

export default function MouseSmoke() {
  const lastTime = useRef(0)
  const sizeIndex = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const now = Date.now()
      if (now - lastTime.current < 30) return
      lastTime.current = now

      const active = isInActiveSection(e.clientX, e.clientY)
      const maxOpacity = active ? 0.5 : 0.04
      const size = SIZES[sizeIndex.current % 3]
      sizeIndex.current++

      const el = document.createElement('div')
      el.style.cssText = `
        position:fixed;
        pointer-events:none;
        z-index:999;
        border-radius:50%;
        width:${size}px;
        height:${size}px;
        left:${e.clientX - size / 2}px;
        top:${e.clientY - size / 2}px;
        background:radial-gradient(circle,rgba(212,0,110,0.18) 0%,transparent 70%);
        filter:blur(6px);
        opacity:${maxOpacity};
      `
      document.body.appendChild(el)

      const rise = -(30 + Math.random() * 20)
      el.animate(
        [
          { opacity: maxOpacity, transform: 'translateY(0) scale(1)' },
          { opacity: 0, transform: `translateY(${rise}px) scale(2)` },
        ],
        { duration: 800, easing: 'ease-out', fill: 'forwards' }
      ).onfinish = () => el.remove()
    }

    document.addEventListener('mousemove', handler)
    return () => document.removeEventListener('mousemove', handler)
  }, [])

  return null
}
