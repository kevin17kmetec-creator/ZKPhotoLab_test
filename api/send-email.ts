
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Preverjanje metode
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda ni dovoljena. Uporabite POST.' });
  }

  // Preverjanje API ključa v okolju
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY ni nastavljen v okoljskih spremenljivkah.');
    return res.status(500).json({ error: 'Konfiguracijska napaka: API ključ ni najden.' });
  }

  const { name, email, type, message } = req.body;

  // Osnovna validacija vhodnih podatkov
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Manjkajoči obvezni podatki (ime, email ali sporočilo).' });
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      // Za Resend testni način mora biti pošiljatelj izključno onboarding@resend.dev
      from: 'onboarding@resend.dev',
      to: 'kevin17kmetec@gmail.com',
      // Fix: Changed 'reply_to' to 'replyTo' to fix TypeScript property error
      replyTo: email,
      subject: `Povpraševanje: ${name} [${type}]`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px; font-weight: 300; letter-spacing: 1px;">NOVO POVPRAŠEVANJE</h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Ime pošiljatelja:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email pošiljatelja:</strong> <a href="mailto:${email}" style="color: #666;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Tip storitve:</strong> ${type}</p>
          </div>

          <div style="background-color: #f9f9f9; padding: 20px; border-left: 3px solid #000; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>

          <footer style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eee; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 2px;">
            ZK Photolab | Avtomatsko sistemsko sporočilo
          </footer>
        </div>
      `,
    });

    return res.status(200).json({ success: true, id: data.data?.id });
  } catch (error: any) {
    console.error('Resend napaka:', error);
    return res.status(500).json({ error: 'Prišlo je do napake pri pošiljanju e-pošte.', details: error.message });
  }
}
