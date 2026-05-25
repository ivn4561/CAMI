import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    nombre, email, telefono, fecha, hora,
    direccion, tipoVenue, numHookahs, sabores, notas, edad
  } = req.body

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Reservas`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            'Full Name': nombre,
            'Email': email,
            'Phone': telefono,
            'Event Date': fecha,
            'Event Time': hora,
            'Delivery Address': direccion,
            'Venue Type': tipoVenue,
            'Number of Hookahs': parseInt(numHookahs),
            'Preferred Flavors': Array.isArray(sabores)
              ? sabores
              : sabores.split(',').map((s: string) => s.trim()).filter(Boolean),
            'Special Notes': notas,
            'Edad': parseInt(edad),
            'Reservation Status': 'Pendiente'
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable error:', error)
      return res.status(500).json({ error: 'Error saving to database' })
    }

    const saboresStr = Array.isArray(sabores) ? sabores.join(', ') : sabores

    try {
      // EMAIL 1 — Confirmación al cliente
      await resend.emails.send({
        from: 'CAMI × Black Romeo <onboarding@resend.dev>',
        to: email,
        subject: '🐺 Booking Confirmed — CAMI × Black Romeo',
        html: `
          <div style="background:#080808; color:#F5E6C8;
                      font-family:Georgia,serif; padding:40px;
                      max-width:600px; margin:0 auto;">

            <div style="text-align:center; margin-bottom:32px;">
              <h1 style="color:#C9A052; font-size:28px;
                         letter-spacing:4px; margin:0;">
                CAMI × BLACK ROMEO
              </h1>
              <p style="color:#C9A052; font-size:11px;
                        letter-spacing:3px; margin:8px 0 0;">
                LUXURY BRAND EXPERIENCE
              </p>
            </div>

            <div style="border:1px solid rgba(201,160,82,0.3);
                        padding:32px; margin-bottom:24px;">
              <h2 style="color:#C9A052; font-size:20px;
                         letter-spacing:2px; margin:0 0 8px;">
                ✓ BOOKING CONFIRMED
              </h2>
              <p style="color:rgba(245,230,200,0.7);
                        font-size:15px; margin:0;">
                Thank you ${nombre}. Your premium hookah
                experience is confirmed.
              </p>
            </div>

            <div style="margin-bottom:24px;">
              <h3 style="color:#C9A052; font-size:12px;
                         letter-spacing:3px; margin:0 0 16px;">
                YOUR BOOKING DETAILS
              </h3>
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    DATE &amp; TIME
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    ${fecha} at ${hora}
                  </td>
                </tr>
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    LOCATION
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    ${direccion}
                  </td>
                </tr>
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    VENUE TYPE
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    ${tipoVenue}
                  </td>
                </tr>
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    HOOKAHS
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    ${numHookahs}
                  </td>
                </tr>
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    FLAVORS
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;
                             border-bottom:1px solid rgba(201,160,82,0.1);">
                    ${saboresStr}
                  </td>
                </tr>
                <tr>
                  <td style="color:rgba(245,230,200,0.5);
                             font-size:12px; padding:8px 0;">
                    AGE VERIFIED
                  </td>
                  <td style="color:#F5E6C8; font-size:14px;
                             padding:8px 0; text-align:right;">
                    ${edad} ✓
                  </td>
                </tr>
              </table>
            </div>

            <div style="background:rgba(201,160,82,0.05);
                        border:1px solid rgba(201,160,82,0.2);
                        padding:20px; margin-bottom:24px;
                        text-align:center;">
              <p style="color:rgba(245,230,200,0.6);
                        font-size:13px; margin:0 0 8px;">
                QUESTIONS? CONTACT US
              </p>
              <p style="color:#C9A052; font-size:16px; margin:0;">
                📞 954 226 3557
              </p>
              <p style="color:#C9A052; font-size:14px; margin:4px 0 0;">
                camiblackromeo@gmail.com
              </p>
            </div>

            <p style="color:rgba(245,230,200,0.3);
                      font-size:11px; text-align:center;
                      letter-spacing:2px; margin:0;">
              © 2025 CAMI × BLACK ROMEO · SOUTH FLORIDA
            </p>
          </div>
        `
      })

      // EMAIL 2 — Notificación a Camila
      await resend.emails.send({
        from: 'Bookings <onboarding@resend.dev>',
        to: 'camiblackromeo@gmail.com',
        subject: `🐺 NEW BOOKING — ${nombre} · ${fecha}`,
        html: `
          <div style="font-family:Arial,sans-serif;
                      padding:24px; background:#111;
                      color:#F5E6C8;">
            <h2 style="color:#C9A052;">
              🐺 NEW BOOKING RECEIVED
            </h2>
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:8px 0; color:#999;">Name</td>
                  <td style="padding:8px 0;">${nombre}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Phone</td>
                  <td style="padding:8px 0;">${telefono}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Email</td>
                  <td style="padding:8px 0;">${email}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Date</td>
                  <td style="padding:8px 0;">${fecha} at ${hora}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Address</td>
                  <td style="padding:8px 0;">${direccion}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Venue</td>
                  <td style="padding:8px 0;">${tipoVenue}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Hookahs</td>
                  <td style="padding:8px 0;">${numHookahs}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Flavors</td>
                  <td style="padding:8px 0;">${saboresStr}</td></tr>
              <tr><td style="padding:8px 0; color:#999;">Notes</td>
                  <td style="padding:8px 0;">${notas || 'None'}</td></tr>
            </table>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
      // booking already saved — do not surface email failure to client
    }

    return res.status(200).json({ success: true })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
