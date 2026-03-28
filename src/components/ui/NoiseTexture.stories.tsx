import type { Meta, StoryObj } from '@storybook/react';
import { NoiseTexture } from './NoiseTexture';

const meta: Meta<typeof NoiseTexture> = {
  title: 'UI/NoiseTexture',
  component: NoiseTexture,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NoiseTexture>;

export const OnNavy: Story = {
  name: 'Noise Overlay — Navy Background',
  decorators: [
    (Story) => (
      <div className="relative h-64 bg-navy flex items-center justify-center">
        <Story />
        <p className="relative z-10 font-display text-3xl text-warm-white tracking-widest">
          Metal. Markets. Trust.
        </p>
      </div>
    ),
  ],
  args: {
    opacity: 0.07,
  },
};

export const LightOpacity: Story = {
  name: 'Subtle Noise (opacity 0.04)',
  decorators: [
    (Story) => (
      <div className="relative h-64 bg-navy flex items-center justify-center">
        <Story />
        <p className="relative z-10 font-display text-2xl text-warm-white">Subtle grain</p>
      </div>
    ),
  ],
  args: {
    opacity: 0.04,
  },
};

export const HeavyOpacity: Story = {
  name: 'Strong Noise (opacity 0.12)',
  decorators: [
    (Story) => (
      <div className="relative h-64 bg-navy flex items-center justify-center">
        <Story />
        <p className="relative z-10 font-display text-2xl text-warm-white">Heavier grain</p>
      </div>
    ),
  ],
  args: {
    opacity: 0.12,
  },
};
