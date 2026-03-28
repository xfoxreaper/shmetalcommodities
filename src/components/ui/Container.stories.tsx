import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
  title: 'UI/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-gold/20 py-8 text-center font-ui text-sm text-charcoal">
        Content constrained to max-w-[1100px] with responsive horizontal padding
      </div>
    ),
  },
};

export const OnNavy: Story = {
  name: 'On Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    children: (
      <div className="bg-gold/20 py-8 text-center font-ui text-sm text-warm-white">
        Content constrained to max-w-[1100px]
      </div>
    ),
  },
};
