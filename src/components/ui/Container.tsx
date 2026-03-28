import { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className = '', ...props }: ContainerProps) {
  return (
    <div
      className={['max-w-[1200px] mx-auto px-6 md:px-10', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
