import type { Meta, StoryObj } from '@storybook/react';
import { PlaceholderAvatar } from './PlaceholderAvatar';

const meta: Meta<typeof PlaceholderAvatar> = {
  title: 'UI/PlaceholderAvatar',
  component: PlaceholderAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 40, max: 160, step: 8 } },
  },
};

export default meta;
type Story = StoryObj<typeof PlaceholderAvatar>;

export const Default: Story = {
  args: {
    initials: 'SH',
    size: 80,
  },
};

export const Large: Story = {
  args: {
    initials: 'AM',
    size: 120,
  },
};

export const Small: Story = {
  args: {
    initials: 'JD',
    size: 48,
  },
};

export const OnNavy: Story = {
  name: 'On Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    initials: 'SH',
    size: 80,
  },
};
