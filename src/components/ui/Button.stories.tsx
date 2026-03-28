import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Learn More',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Contact Us',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'View Services',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    children: 'Sending…',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Unavailable',
    disabled: true,
  },
};

export const PrimaryOnNavy: Story = {
  name: 'Primary — Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    variant: 'primary',
    children: 'Learn More',
  },
};

export const GhostOnNavy: Story = {
  name: 'Ghost — Navy Background',
  parameters: {
    backgrounds: { default: 'navy' },
  },
  args: {
    variant: 'ghost',
    children: 'View Services',
  },
};

export const RTLPrimary: Story = {
  name: 'Primary — RTL',
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'primary',
    children: 'اعرف المزيد',
  },
};
