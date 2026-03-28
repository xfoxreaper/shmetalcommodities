import type { Meta, StoryObj } from '@storybook/react';
import { PullQuote } from './PullQuote';

const meta: Meta<typeof PullQuote> = {
  title: 'UI/PullQuote',
  component: PullQuote,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'ivory' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PullQuote>;

export const Default: Story = {
  args: {
    children: 'We trade with our name on every deal.',
  },
};

export const OnNavy: Story = {
  name: 'On Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    children: 'We trade with our name on every deal.',
    className: 'text-warm-white',
  },
};

export const LongQuote: Story = {
  args: {
    children:
      'In a market defined by volatility and complexity, trust is the only currency that compounds. Every relationship we build is a commitment to transparency, expertise, and long-term partnership.',
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
    children: 'نتداول باسمنا في كل صفقة.',
  },
};
