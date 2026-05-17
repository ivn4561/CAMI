import { useState, type CSSProperties } from 'react'

// ── Constants ──────────────────────────────────────────────
const GOLD = '#C9A052'
const CREAM = '#F5E6C8'
const MAGENTA = '#D4006E'

const VENUES = ['Restaurant', 'Lounge', 'Private Event']

// ── Shared input styles ────────────────────────────────────
const inputBase: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(201,160,82,0.3)',
  borderRadius: 0,
  color: CREAM,
  fontFamily: "'Inter', sans-serif",
  fontSize: '15px',
  fontWeight: 300,
  padding: '12px 0',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const labelStyle: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '0.2em',
  color: 'rgba(201,160,82,0.6)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '4px',
}

const errorStyle: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontSize: '11px',
  color: MAGENTA,
  marginTop: '4px',
}

// ── Field wrapper ──────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '28px' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  )
}

// ── Focus handlers ─────────────────────────────────────────
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderBottomColor = GOLD
}
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderBottomColor = 'rgba(201,160,82,0.3)'
}

// ── Progress bar ───────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        marginBottom: '48px',
      }}
    >
      {[1, 2, 3].map((n, i) => (
        <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
          {/* Dot */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: `1px solid ${step >= n ? GOLD : 'rgba(201,160,82,0.25)'}`,
              background: step >= n ? 'rgba(201,160,82,0.12)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                color: step >= n ? GOLD : 'rgba(201,160,82,0.35)',
                fontWeight: 500,
              }}
            >
              {n}
            </span>
          </div>
          {/* Connector line between dots */}
          {i < 2 && (
            <div
              style={{
                width: '80px',
                height: '1px',
                background: step > n ? GOLD : 'rgba(201,160,82,0.2)',
                transition: 'background 0.3s',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Step labels ────────────────────────────────────────────
const STEP_LABELS = ['YOUR DETAILS', 'EVENT DETAILS', 'HOOKAH PREFERENCES']

// ── Form data type ─────────────────────────────────────────
type FormData = {
  nombre: string
  email: string
  telefono: string
  fecha: string
  hora: string
  direccion: string
  tipoVenue: string
  numHookahs: string
  sabores: string
  notas: string
}

type Errors = Partial<Record<keyof FormData, string>>

const INITIAL: FormData = {
  nombre: '', email: '', telefono: '',
  fecha: '', hora: '', direccion: '', tipoVenue: '',
  numHookahs: '1', sabores: '', notas: '',
}

// ── Validation ─────────────────────────────────────────────
function validateStep(step: number, data: FormData): Errors {
  const errs: Errors = {}
  const today = new Date().toISOString().split('T')[0]

  if (step === 1) {
    if (!data.nombre.trim()) errs.nombre = 'Full name is required'
    if (!data.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email'
    if (!data.telefono.trim()) errs.telefono = 'Phone number is required'
  }

  if (step === 2) {
    if (!data.fecha) errs.fecha = 'Event date is required'
    else if (data.fecha < today) errs.fecha = 'Date cannot be in the past'
    if (!data.hora) errs.hora = 'Event time is required'
    if (!data.direccion.trim()) errs.direccion = 'Address is required'
    if (!data.tipoVenue) errs.tipoVenue = 'Please select a venue type'
  }

  if (step === 3) {
    if (!data.numHookahs || parseInt(data.numHookahs) < 1) errs.numHookahs = 'Minimum 1 hookah required'
    if (!data.sabores.trim()) errs.sabores = 'Please enter at least one flavor'
  }

  return errs
}

// ── Select & Date shared style (overrides color for options) ──
const selectStyle: CSSProperties = {
  ...inputBase,
  appearance: 'none' as const,
  WebkitAppearance: 'none' as const,
  cursor: 'pointer',
  color: CREAM,
  // date/time pickers inherit OS styling; we just color the text
  colorScheme: 'dark',
}

// ── Main component ─────────────────────────────────────────
export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState('')

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setData((d) => ({ ...d, [field]: e.target.value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const next = () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep((s) => s + 1)
  }

  const back = () => { setErrors({}); setStep((s) => s - 1) }

  const submit = async () => {
    const errs = validateStep(3, data)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('loading')
    try {
      const res = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error('API error')
      }
    } catch {
      setStatus('error')
      setApiError('Something went wrong. Please call us at 954 226 3557')
    }
  }

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          border: '1px solid rgba(201,160,82,0.2)',
          background: 'rgba(201,160,82,0.04)',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '48px',
            color: GOLD,
            marginBottom: '12px',
          }}
        >
          ✓
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.2em',
            color: '#4ade80',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Booking Confirmed
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '15px',
            fontWeight: 300,
            color: 'rgba(245,230,200,0.6)',
            margin: 0,
          }}
        >
          We'll contact you within 24 hours
        </p>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <div>
      <ProgressBar step={step} />

      {/* Step label */}
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.25em',
          color: 'rgba(201,160,82,0.5)',
          textTransform: 'uppercase',
          textAlign: 'center',
          marginBottom: '36px',
        }}
      >
        Step {step} — {STEP_LABELS[step - 1]}
      </div>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div>
          <Field label="Full Name" error={errors.nombre}>
            <input
              style={inputBase}
              type="text"
              value={data.nombre}
              onChange={set('nombre')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Your full name"
              autoComplete="name"
            />
          </Field>
          <Field label="Email Address" error={errors.email}>
            <input
              style={inputBase}
              type="email"
              value={data.email}
              onChange={set('email')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Phone Number" error={errors.telefono}>
            <input
              style={inputBase}
              type="tel"
              value={data.telefono}
              onChange={set('telefono')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="+1 (305) 000 0000"
              autoComplete="tel"
            />
          </Field>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div>
          <Field label="Event Date" error={errors.fecha}>
            <input
              style={selectStyle}
              type="date"
              value={data.fecha}
              onChange={set('fecha')}
              onFocus={onFocus}
              onBlur={onBlur}
              min={new Date().toISOString().split('T')[0]}
            />
          </Field>
          <Field label="Event Time" error={errors.hora}>
            <input
              style={selectStyle}
              type="time"
              value={data.hora}
              onChange={set('hora')}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>
          <Field label="Full Address" error={errors.direccion}>
            <textarea
              style={{ ...inputBase, resize: 'none', minHeight: '72px' }}
              value={data.direccion}
              onChange={set('direccion')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Street address, city, state"
              rows={2}
            />
          </Field>
          <Field label="Venue Type" error={errors.tipoVenue}>
            <select
              style={selectStyle}
              value={data.tipoVenue}
              onChange={set('tipoVenue')}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="" disabled style={{ background: '#111' }}>Select venue type</option>
              {VENUES.map((v) => (
                <option key={v} value={v} style={{ background: '#111', color: CREAM }}>{v}</option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div>
          <Field label="Number of Hookahs" error={errors.numHookahs}>
            <input
              style={inputBase}
              type="number"
              min={1}
              max={20}
              value={data.numHookahs}
              onChange={set('numHookahs')}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </Field>
          <Field label="Preferred Flavors" error={errors.sabores}>
            <textarea
              style={{ ...inputBase, resize: 'none', minHeight: '72px' }}
              value={data.sabores}
              onChange={set('sabores')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="e.g. Mint, Mango, Strawberry"
              rows={2}
            />
          </Field>
          <Field label="Special Notes (optional)">
            <textarea
              style={{ ...inputBase, resize: 'none', minHeight: '72px' }}
              value={data.notas}
              onChange={set('notas')}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Any additional requests..."
              rows={2}
            />
          </Field>
        </div>
      )}

      {/* ── Error message ── */}
      {status === 'error' && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: MAGENTA,
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          {apiError}
        </p>
      )}

      {/* ── Navigation buttons ── */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: step > 1 ? 'space-between' : 'flex-end',
          marginTop: '8px',
        }}
      >
        {step > 1 && (
          <button
            onClick={back}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(201,160,82,0.3)',
              color: 'rgba(201,160,82,0.7)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: 0,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = GOLD
              e.currentTarget.style.color = GOLD
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201,160,82,0.3)'
              e.currentTarget.style.color = 'rgba(201,160,82,0.7)'
            }}
          >
            Back
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={next}
            style={{
              padding: '14px 40px',
              background: 'linear-gradient(135deg, #C9A052, #E8C97A)',
              border: 'none',
              color: '#080808',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
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
            Next
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={status === 'loading'}
            style={{
              padding: '14px 40px',
              background: status === 'loading'
                ? 'rgba(201,160,82,0.4)'
                : 'linear-gradient(135deg, #C9A052, #E8C97A)',
              border: 'none',
              color: '#080808',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              borderRadius: 0,
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading') e.currentTarget.style.filter = 'brightness(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)'
            }}
          >
            {status === 'loading' ? (
              <>
                <Spinner />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Spinner ────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <circle cx="7" cy="7" r="5.5" stroke="rgba(8,8,8,0.4)" strokeWidth="2" />
      <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="#080808" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
