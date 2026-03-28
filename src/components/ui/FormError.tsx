interface FormErrorProps {
  id: string;
  message: string;
  className?: string;
}

export function FormError({ id, message, className = '' }: FormErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      className={['font-ui text-xs text-red-600 mt-1', className]
        .filter(Boolean)
        .join(' ')}
    >
      {message}
    </p>
  );
}
