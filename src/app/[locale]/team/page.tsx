// Team page — SH Metal Commodities
// To add a new team member, push a new object to the `team` array in content/team.ts.
// All fields except photoUrl and linkedIn are required; set photoUrl to null to show the placeholder avatar.

import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { team } from '../../../../content/team';
import { generatePageMetadata } from '@/lib/metadata';
import { PageHeader, Container, Section, TeamCard } from '@/components/ui';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const base = await generatePageMetadata(locale, 'team');

  return {
    ...base,
    openGraph: {
      title: base.title as string,
      description: base.description as string,
      type: 'website',
    },
    alternates: {
      languages: {
        en: '/en/team',
        de: '/de/team',
        zh: '/zh/team',
        ar: '/ar/team',
      },
    },
  };
}

export default function TeamPage() {
  const t = useTranslations('team');

  return (
    <div className="animate-fade-in">
      {/* T-401: page header */}
      <PageHeader title={t('heading')} />

      {/* T-402: team grid */}
      <Section background="ivory">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* PLACEHOLDER: all personal details — name, title, bio, photo, LinkedIn */}
            {team.map((member) => (
              <TeamCard
                key={member.id}
                name={member.name}
                title={member.title}
                bio={member.bio}
                initials={member.initials}
                photoUrl={member.photoUrl}
                linkedIn={member.linkedIn}
              />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
