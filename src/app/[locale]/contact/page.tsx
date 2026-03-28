import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { contact } from '../../../../content/contact';
import { generatePageMetadata } from '@/lib/metadata';
import {
  Section,
  Container,
  Typography,
  GoldDivider,
} from '@/components/ui';
import { ContactForm } from './ContactForm';
import type { SubjectOption, ContactFormTranslations } from './ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'contact');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/contact',
        de: '/de/contact',
        zh: '/zh/contact',
        ar: '/ar/contact',
      },
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations('contact');

  const subjectsRaw = t.raw('subjects') as SubjectOption[];

  const translations: ContactFormTranslations = {
    name: t('formLabels.name'),
    company: t('formLabels.company'),
    email: t('formLabels.email'),
    subject: t('formLabels.subject'),
    message: t('formLabels.message'),
    submit: t('submit'),
    successMessage: t('successMessage'),
    errorMessage: t('errorMessage'),
    subjects: subjectsRaw,
  };

  return (
    <div className="animate-fade-in">
      <Section background="ivory">
        <Container>
          {/* Page heading */}
          <Typography variant="h1" className="mb-6">
            {t('heading')}
          </Typography>
          <GoldDivider className="mb-12" />

          {/* T-421: two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* LEFT COLUMN — T-422: contact details */}
            <div className="space-y-8">
              <Typography variant="h2">{t('heading')}</Typography>

              {/* Address block */}
              <div className="space-y-1">
                <Typography variant="label" className="text-navy mb-3 block">
                  Address
                </Typography>
                {/* PLACEHOLDER */}
                <Typography variant="body">{contact.address.street}</Typography>
                {/* PLACEHOLDER */}
                <Typography variant="body">
                  {contact.address.postcode} {contact.address.city}
                </Typography>
                {/* PLACEHOLDER */}
                <Typography variant="body">{contact.address.country}</Typography>
              </div>

              {/* Phone */}
              <div>
                <Typography variant="label" className="text-navy mb-2 block">
                  Phone
                </Typography>
                {/* PLACEHOLDER */}
                <Typography variant="body">{contact.phone}</Typography>
              </div>

              {/* Email */}
              <div>
                <Typography variant="label" className="text-navy mb-2 block">
                  Email
                </Typography>
                {/* PLACEHOLDER */}
                <Typography variant="body">{contact.email}</Typography>
              </div>

              {/* T-423 */}
              {/* TODO: add Google Maps embed here */}
            </div>

            {/* RIGHT COLUMN — T-424 to T-431: contact form */}
            <div>
              <ContactForm translations={translations} />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
