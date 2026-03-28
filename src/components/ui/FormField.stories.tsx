import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'warm-white' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const TextInput: Story = {
  args: {
    label: 'Full Name',
    name: 'name',
    type: 'input',
    placeholder: 'Enter your name',
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    name: 'email',
    type: 'input',
    inputMode: 'email',
    placeholder: 'name@company.com',
  },
};

export const Textarea: Story = {
  args: {
    label: 'Message',
    name: 'message',
    type: 'textarea',
    placeholder: 'Your message (minimum 20 characters)',
  },
};

export const SelectField: Story = {
  args: {
    label: 'Subject',
    name: 'subject',
    type: 'select',
    children: (
      <>
        <option value="">Select a subject</option>
        <option value="general">General Enquiry</option>
        <option value="trading">Trading Enquiry</option>
        <option value="partnership">Partnership</option>
        <option value="other">Other</option>
      </>
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    name: 'email-error',
    type: 'input',
    placeholder: 'name@company.com',
    error: 'Please enter a valid email address.',
  },
};

export const TextareaWithError: Story = {
  args: {
    label: 'Message',
    name: 'message-error',
    type: 'textarea',
    placeholder: 'Your message',
    error: 'Message must be at least 20 characters.',
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
    label: 'الاسم الكامل',
    name: 'name-rtl',
    type: 'input',
    placeholder: 'أدخل اسمك',
  },
};
