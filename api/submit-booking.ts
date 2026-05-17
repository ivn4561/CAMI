import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    nombre, email, telefono, fecha, hora,
    direccion, tipoVenue, numHookahs, sabores, notas
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
            'Status': 'Pending'
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Airtable error:', error)
      return res.status(500).json({ error: 'Error saving to database' })
    }

    return res.status(200).json({ success: true })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}
