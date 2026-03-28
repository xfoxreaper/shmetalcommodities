// TODO: set RESEND_API_KEY in .env.local and Vercel dashboard before going live

import { Resend } from 'resend';
import { z } from 'zod';

// T-424: same Zod schema as the client — server-side re-validation, never trust client
const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  subject: z.enum(['general', 'trading', 'partnership', 'other']),
  message: z.string().min(20),
});

type ContactData = z.infer<typeof contactSchema>;

// T-433: module-level rate limit map — IP → { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const hourMs = 60 * 60 * 1000;
  const existing = rateLimitMap.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + hourMs });
    return true;
  }

  if (existing.count >= 5) {
    return false;
  }

  existing.count += 1;
  return true;
}

// T-435: clean branded HTML email template
function emailTemplate(data: ContactData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry from ${data.name}</title>
</head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F0E8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;">
          <!-- Navy header bar -->
          <tr>
            <td style="background:#0A1628;padding:28px 40px;">
              <p style="margin:0;color:#B89A5A;font-family:Georgia,serif;font-size:20px;letter-spacing:0.05em;">
                SH Metal Commodities
              </p>
              <p style="margin:4px 0 0;color:#F5F0E8;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;">
                New Contact Enquiry
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid #E8E2D8;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">
                      Full Name
                    </p>
                    <p style="margin:0;font-size:16px;color:#1C1C1C;">${data.name}</p>
                  </td>
                </tr>

                ${data.company ? `
                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #E8E2D8;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">
                      Company
                    </p>
                    <p style="margin:0;font-size:16px;color:#1C1C1C;">${data.company}</p>
                  </td>
                </tr>
                ` : ''}

                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #E8E2D8;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">
                      Email
                    </p>
                    <p style="margin:0;font-size:16px;color:#1C1C1C;">
                      <a href="mailto:${data.email}" style="color:#0A1628;text-decoration:none;">${data.email}</a>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid #E8E2D8;">
                    <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">
                      Subject
                    </p>
                    <p style="margin:0;font-size:16px;color:#1C1C1C;text-transform:capitalize;">${data.subject}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 0;">
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;">
                      Message
                    </p>
                    <p style="margin:0;font-size:15px;color:#1C1C1C;line-height:1.7;white-space:pre-wrap;">${data.message}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer bar -->
          <tr>
            <td style="background:#0A1628;padding:16px 40px;">
              <p style="margin:0;color:#B89A5A;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.05em;">
                SH Metal Commodities · Hamburg, Germany
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(req: Request) {
  // T-433: rate limit check
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (!checkRateLimit(ip)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 });
  }

  // T-432: parse + server-side Zod re-validation
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const data = result.data;

  // T-434: send via Resend
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'SH Metal Commodities <contact@shmetalcommodities.com>',
      to: process.env.CONTACT_FORM_RECIPIENT!,
      subject: `New enquiry: ${data.subject} from ${data.name}`,
      html: emailTemplate(data),
    });
  } catch (err) {
    console.error('[contact/route] Resend error:', err);
    return Response.json({ error: 'Failed to send' }, { status: 500 });
  }

  return Response.json({ success: true });
}
