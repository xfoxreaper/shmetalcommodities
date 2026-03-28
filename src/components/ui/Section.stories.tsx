import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './Section';

const meta: Meta<typeof Section> = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['navy', 'ivory', 'transparent'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Navy: Story = {
  args: {
    background: 'navy',
    children: (
      <p className="font-body text-warm-white text-center">
        Section with navy background and consistent vertical padding
      </p>
    ),
  },
};

export const Ivory: Story = {
  args: {
    background: 'ivory',
    children: (
      <p className="font-body text-charcoal text-center">
        Section with ivory background and consistent vertical padding
      </p>
    ),
  },
};

export const Transparent: Story = {
  args: {
    background: 'transparent',
    children: (
      <p className="font-body text-charcoal text-center">
        Section with transparent background
      </p>
    ),
  },
};
