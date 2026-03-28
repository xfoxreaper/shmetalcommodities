import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { contact } from '../../../../content/contact';
import { generatePageMetadata } from '@/lib/metadata';
import {
  PageHeader,
  Section,
  Container,
  Typography,
  FadeIn,
} from '@/components/ui';
import { ContactForm } from './ContactForm';
import type { SubjectOption, ContactFormTranslations } from './ContactForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  const subjectsRaw = t.raw('subjects') as SubjectOption[];

  const translations: ContactFormTranslations = {
    name: t('formLabels.name'),
    company: t('formLabels.company'),
    email: t('formLabels.email'),
    subject: t('formLabels.subject'),
    message: t('formLabels.message'),
    submit: t('submit'),
    sending: t('sending'),
    successMessage: t('successMessage'),
    errorMessage: t('errorMessage'),
    subjects: subjectsRaw,
  };

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={t('heading')}
        locale={locale}
      />

      <Section background="ivory">
        <Container>
          <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 max-w-4xl mx-auto">

            {/* LEFT COLUMN — contact details */}
            <div className="space-y-8">
              {/* Address block */}
              <div className="space-y-1">
                <Typography variant="label" className="text-navy mb-3 block">
                  {t('labels.address')}
                </Typography>
                <Typography variant="body">{contact.address.street}</Typography>
                <Typography variant="body">
                  {contact.address.postcode} {contact.address.city}
                </Typography>
                <Typography variant="body">{contact.address.country}</Typography>
              </div>

              {/* Email */}
              <div>
                <Typography variant="label" className="text-navy mb-2 block">
                  {t('labels.email')}
                </Typography>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-body text-base sm:text-lg leading-relaxed text-navy hover:text-gold transition-colors duration-150"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* RIGHT COLUMN — contact form */}
            <div>
              <ContactForm translations={translations} />
            </div>
          </div>
          </FadeIn>
        </Container>
      </Section>
    </div>
  );
}
