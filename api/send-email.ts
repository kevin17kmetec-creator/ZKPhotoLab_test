
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
      // Posodobljeno na verificirano domeno
      from: 'ZK Photolab <info@zkphotolab.si>',
      to: 'info@zkphotolab.si',
      // Reply-to omogoča odgovor direktno stranki
      replyTo: email,
      subject: `Novo sporočilo: ${name} - ${type}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Novo povpraševanje</title>
          </head>
          <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 40px 0;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 4px solid #000000;">
              
              <div style="padding: 40px 50px;">
                <h1 style="font-size: 14px; font-weight: 700; color: #000000; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 30px 0;">ZK PHOTOLAB</h1>
                
                <h2 style="font-size: 24px; font-weight: 300; color: #1a1a1a; margin: 0 0 20px 0; line-height: 1.3;">Prejeli ste novo sporočilo od <span style="font-weight: 600;">${name}</span>.</h2>
                
                <p style="font-size: 15px; color: #666666; margin-bottom: 30px;">Vsebina povpraševanja prek spletne strani zkphotolab.si:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; width: 30%; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">Pošiljatelj</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #1a1a1a;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">E-naslov</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #1a1a1a;"><a href="mailto:${email}" style="color: #000000; text-decoration: none; border-bottom: 1px solid #cccccc;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px;">Tip projekta</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; color: #1a1a1a;">${type}</td>
                  </tr>
                </table>
                
                <div style="background-color: #fafafa; padding: 25px; border-radius: 2px; margin-bottom: 40px;">
                  <p style="font-size: 12px; color: #999999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">Sporočilo</p>
                  <p style="font-size: 16px; color: #1a1a1a; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
                
                <a href="mailto:${email}" style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 18px 30px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; border-radius: 2px;">Odgovori stranki</a>
              </div>
              
              <div style="background-color: #000000; padding: 30px 50px; text-align: center;">
                <p style="font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px; margin: 0;">&copy; 2025 ZK Photolab | Urban & Lifestyle Photography</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true, id: data.data?.id });
  } catch (error: any) {
    console.error('Resend napaka:', error);
    return res.status(500).json({ error: 'Prišlo je do napake pri pošiljanju e-pošte.', details: error.message });
  }
}
