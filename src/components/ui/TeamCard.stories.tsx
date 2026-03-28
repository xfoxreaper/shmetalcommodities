import type { Meta, StoryObj } from '@storybook/react';
import { TeamCard } from './TeamCard';

const meta: Meta<typeof TeamCard> = {
  title: 'UI/TeamCard',
  component: TeamCard,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'ivory' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeamCard>;

export const WithPlaceholderAvatar: Story = {
  args: {
    name: '<!-- PLACEHOLDER: Founder Full Name -->',
    title: '<!-- PLACEHOLDER: Managing Director -->',
    bio: '<!-- PLACEHOLDER: 3-4 sentence bio describing background, expertise, and role at SH Metal Commodities. -->',
    initials: 'SH',
    photoUrl: null,
    linkedIn: null,
  },
};

export const WithLinkedIn: Story = {
  args: {
    name: 'Sample Team Member',
    title: 'Head of Trading',
    bio: 'Over two decades of experience in non-ferrous metal markets across Europe and Asia. Responsible for all trading relationships and market strategy.',
    initials: 'ST',
    photoUrl: null,
    linkedIn: 'https://linkedin.com',
  },
};

export const RTL: Story = {
  name: 'RTL (ar locale)',
  decorators: [
    (Story: React.ComponentType) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'اسم العضو',
    title: 'مدير التداول',
    bio: 'أكثر من عشرين عامًا من الخبرة في أسواق المعادن غير الحديدية عبر أوروبا وآسيا.',
    initials: 'SM',
    photoUrl: null,
    linkedIn: null,
  },
};

export const GridLayout: Story = {
  name: 'Team Grid — 3 Cards',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="bg-ivory p-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1100px] mx-auto">
        {[
          { initials: 'SH', title: 'Managing Director' },
          { initials: 'AM', title: 'Head of Trading' },
          { initials: 'JD', title: 'Operations Manager' },
        ].map((member, i) => (
          <TeamCard
            key={i}
            name="<!-- PLACEHOLDER: Name -->"
            title={member.title}
            bio="<!-- PLACEHOLDER: Bio -->"
            initials={member.initials}
            photoUrl={null}
            linkedIn={null}
          />
        ))}
      </div>
    </div>
  ),
};
