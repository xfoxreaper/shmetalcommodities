'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormField } from '@/components/ui/FormField';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

export const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  subject: z.enum(['general', 'trading', 'partnership', 'other']),
  message: z.string().min(20),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface SubjectOption {
  value: string;
  label: string;
}

export interface ContactFormTranslations {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  successMessage: string;
  errorMessage: string;
  subjects: SubjectOption[];
}

interface ContactFormProps {
  translations: ContactFormTranslations;
}

export function ContactForm({ translations }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-8">
        <Typography variant="body">{translations.successMessage}</Typography>
      </div>
    );
  }

  // react-hook-form register() returns refs typed for <input>; cast for select/textarea spread
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subjectRegister = register('subject') as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messageRegister = register('message') as any;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {status === 'error' && (
        <p role="alert" className="font-ui text-xs text-red-600">
          {translations.errorMessage}
        </p>
      )}

      {/* T-426: name field */}
      <FormField
        label={translations.name}
        error={errors.name?.message}
        {...register('name')}
      />

      {/* T-426: company field (optional) */}
      <FormField
        label={translations.company}
        error={errors.company?.message}
        {...register('company')}
      />

      {/* T-426: email field */}
      <FormField
        label={translations.email}
        inputMode="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />

      {/* T-427: subject dropdown */}
      <FormField
        label={translations.subject}
        type="select"
        error={errors.subject?.message}
        {...subjectRegister}
      >
        {translations.subjects.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </FormField>

      {/* T-426: message textarea */}
      <FormField
        label={translations.message}
        type="textarea"
        error={errors.message?.message}
        {...messageRegister}
      />

      <Button
        type="submit"
        variant="primary"
        loading={status === 'loading'}
        disabled={status === 'loading'}
        className="w-full sm:w-auto"
      >
        {status === 'loading' ? translations.sending : translations.submit}
      </Button>

      <p className="font-ui text-[11px] tracking-wide text-charcoal/60 mt-4">
        By submitting this form, you agree to our{' '}
        <a href="/privacy" className="underline hover:text-gold transition-colors">
          Privacy Policy
        </a>
        . Your data will be used solely to respond to your enquiry.
      </p>
    </form>
  );
}
