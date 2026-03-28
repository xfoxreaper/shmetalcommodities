import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'UI/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const WithTitle: Story = {
  args: {
    title: 'Our Markets',
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'The People Behind SH Metal Commodities',
    subtitle: 'A team built on deep expertise in non-ferrous metal trading.',
  },
};

export const CJK: Story = {
  name: 'CJK (zh locale)',
  args: {
    title: '我们的市场',
    subtitle: '铜、铝和锌的专业贸易。',
    locale: 'zh',
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
    title: 'أسواقنا',
    subtitle: 'تخصص في تداول المعادن غير الحديدية.',
  },
};
