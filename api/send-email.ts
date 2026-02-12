
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Preverjanje metode
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda ni dovoljena. Uporabite POST.' });
  }

  // Preverjanje API ključa v okolju
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Resend Error]: RESEND_API_KEY ni nastavljen v okoljskih spremenljivkah.');
    return res.status(500).json({ error: 'Konfiguracijska napaka: API ključ ni najden.' });
  }

  const { name, email, type, message, phone } = req.body;

  // Osnovna validacija vhodnih podatkov
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Manjkajoči obvezni podatki (ime, email ali sporočilo).' });
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      // Produkcijski pošiljatelj z verificirano domeno
      from: 'ZK Photolab <info@zkphotolab.si>',
      to: 'info@zkphotolab.si',
      // Možnost direktnega odgovora stranki
      replyTo: email,
      subject: `Novo povpraševanje: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 20px auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden; }
              .header { background-color: #000; color: #fff; padding: 30px; text-align: center; }
              .header h1 { margin: 0; font-size: 20px; letter-spacing: 4px; font-weight: 300; }
              .content { padding: 40px; }
              .field { margin-bottom: 25px; border-bottom: 1px solid #f5f5f5; padding-bottom: 15px; }
              .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #999; margin-bottom: 5px; display: block; }
              .value { font-size: 16px; color: #1a1a1a; }
              .message-box { background-color: #f9f9f9; padding: 25px; border-radius: 4px; border-left: 3px solid #000; margin-top: 10px; }
              .footer { background-color: #fcfcfc; padding: 20px; text-align: center; font-size: 10px; color: #aaa; border-top: 1px solid #eee; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>ZK PHOTOLAB</h1>
              </div>
              <div class="content">
                <h2 style="font-size: 18px; margin-bottom: 30px; font-weight: 600;">Prejeto novo sporočilo s spletne strani</h2>
                
                <div class="field">
                  <span class="label">Pošiljatelj</span>
                  <span class="value"><strong>${name}</strong></span>
                </div>
                
                <div class="field">
                  <span class="label">E-naslov</span>
                  <span class="value"><a href="mailto:${email}" style="color: #000; text-decoration: none; border-bottom: 1px dotted #000;">${email}</a></span>
                </div>

                ${phone ? `
                <div class="field">
                  <span class="label">Telefon</span>
                  <span class="value">${phone}</span>
                </div>
                ` : ''}
                
                <div class="field">
                  <span class="label">Tip projekta</span>
                  <span class="value">${type || 'Ni določeno'}</span>
                </div>
                
                <div class="field" style="border-bottom: none;">
                  <span class="label">Sporočilo stranke</span>
                  <div class="message-box">
                    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
                
                <div style="margin-top: 40px; text-align: center;">
                  <a href="mailto:${email}" style="background-color: #000; color: #fff; padding: 15px 30px; text-decoration: none; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; display: inline-block;">Odgovori stranki</a>
                </div>
              </div>
              <div class="footer">
                Sistemsko obvestilo | Poslano prek zkphotolab.si
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`[Resend Success]: Email uspešno poslan za ${name} (${data.data?.id})`);
    return res.status(200).json({ success: true, id: data.data?.id });
  } catch (error: any) {
    console.error('[Resend Error]: Napaka pri pošiljanju:', error);
    return res.status(500).json({ 
      error: 'Prišlo je do napake pri pošiljanju e-pošte.', 
      details: error.message 
    });
  }
}
