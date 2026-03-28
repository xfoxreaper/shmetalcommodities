import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'h1', 'h2', 'h3', 'body', 'label', 'pullquote'],
    },
    locale: {
      control: 'select',
      options: ['en', 'de', 'zh', 'ar'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Metal. Markets. Trust.',
    className: 'text-charcoal',
  },
};

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'A Trading House Built on Relationships',
    className: 'text-charcoal',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'Our Markets',
    className: 'text-charcoal',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'Team Leadership',
    className: 'text-charcoal',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children:
      'SH Metal Commodities operates at the intersection of global commodity markets and long-standing trading relationships. Our expertise in non-ferrous metals spans copper, aluminium, and zinc.',
    className: 'text-charcoal max-w-prose',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'Established in Hamburg, Germany',
    className: 'text-charcoal',
  },
};

export const Pullquote: Story = {
  args: {
    variant: 'pullquote',
    children: 'We trade with our name on every deal.',
    className: 'text-charcoal border-s-[3px] border-gold ps-6',
  },
};

export const DisplayOnNavy: Story = {
  name: 'Display — Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    variant: 'display',
    children: 'Metal. Markets. Trust.',
    className: 'text-warm-white',
  },
};

export const CJKDisplay: Story = {
  name: 'Display — CJK (zh locale)',
  args: {
    variant: 'display',
    locale: 'zh',
    children: '金属。市场。信任。',
    className: 'text-charcoal',
  },
};

export const RTLLabel: Story = {
  name: 'Label — RTL (ar locale)',
  parameters: {
    backgrounds: { default: 'ivory' },
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'label',
    children: 'مقرها في هامبورغ، ألمانيا',
    className: 'text-charcoal',
  },
};
