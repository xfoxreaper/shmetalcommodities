import type { Meta, StoryObj } from '@storybook/react';
import { GoldDivider } from './GoldDivider';

const meta: Meta<typeof GoldDivider> = {
  title: 'UI/GoldDivider',
  component: GoldDivider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GoldDivider>;

export const FullWidth: Story = {};

export const Short: Story = {
  args: {
    width: '48px',
  },
};

export const Medium: Story = {
  args: {
    width: '200px',
  },
};

export const OnNavy: Story = {
  name: 'On Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
};
