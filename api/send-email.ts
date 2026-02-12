
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda ni dovoljena' });
  }

  const { name, email, type, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Vsa polja so obvezna' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'ZK Photolab <onboarding@resend.dev>',
      to: 'zigakucis13@gmail.com',
      reply_to: email,
      subject: `Novo povpraševanje: ${name} (${type})`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="border-bottom: 2px solid #000; padding-bottom: 10px;">Novo sporočilo s spletne strani</h2>
          <p><strong>Ime in priimek:</strong> ${name}</p>
          <p><strong>E-naslov:</strong> ${email}</p>
          <p><strong>Tip projekta:</strong> ${type}</p>
          <p><strong>Sporočilo:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>') || 'Brez sporočila.'}
          </div>
          <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999;">Poslano prek kontaktnega obrazca ZK Photolab.</p>
        </div>
      `,
    });

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
