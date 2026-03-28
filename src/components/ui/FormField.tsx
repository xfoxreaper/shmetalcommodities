'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';

type InputType = 'input' | 'textarea' | 'select';

interface BaseFormFieldProps {
  label: string;
  name: string;
  id?: string;
  error?: string;
  type?: InputType;
  children?: ReactNode; // for select options
  className?: string;
}

type FormFieldProps =
  | (BaseFormFieldProps & { type?: 'input' } & InputHTMLAttributes<HTMLInputElement>)
  | (BaseFormFieldProps & { type: 'textarea' } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  | (BaseFormFieldProps & { type: 'select' } & SelectHTMLAttributes<HTMLSelectElement>);

const inputClasses = [
  'w-full',
  'bg-transparent border-b border-charcoal/30',
  'font-body text-base text-charcoal',
  'py-3 ps-0 pe-0 min-h-[44px]',
  'focus:outline-none focus:border-gold focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
  'transition-colors duration-200',
  'placeholder:text-charcoal/60',
].join(' ');

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(function FormField(props, ref) {
  const {
    label,
    name,
    id,
    error,
    type = 'input',
    children,
    className = '',
    ...rest
  } = props;

  const fieldId = id ?? name;
  const errorId = `${fieldId}-error`;
  const ariaProps = error ? { 'aria-describedby': errorId, 'aria-invalid': true as const } : {};

  return (
    <div className={['flex flex-col gap-1.5', className].filter(Boolean).join(' ')}>
      <label
        htmlFor={fieldId}
        className="font-ui text-xs uppercase tracking-widest text-charcoal/70"
      >
        {label}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          rows={5}
          className={inputClasses}
          {...ariaProps}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : type === 'select' ? (
        <select
          id={fieldId}
          name={name}
          ref={ref as React.ForwardedRef<HTMLSelectElement>}
          className={inputClasses}
          {...ariaProps}
          {...(rest as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          className={inputClasses}
          {...ariaProps}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error && (
        <p id={errorId} role="alert" className="font-ui text-xs text-red-600 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
});
