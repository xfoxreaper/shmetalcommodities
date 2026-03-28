import type { Meta, StoryObj } from '@storybook/react';
import { FormError } from './FormError';

const meta: Meta<typeof FormError> = {
  title: 'UI/FormError',
  component: FormError,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormError>;

export const Default: Story = {
  args: {
    id: 'email-error',
    message: 'Please enter a valid email address.',
  },
};

export const RequiredField: Story = {
  args: {
    id: 'name-error',
    message: 'This field is required.',
  },
};

export const MinLength: Story = {
  args: {
    id: 'message-error',
    message: 'Message must be at least 20 characters.',
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
    id: 'name-error-rtl',
    message: 'هذا الحقل مطلوب.',
  },
};
