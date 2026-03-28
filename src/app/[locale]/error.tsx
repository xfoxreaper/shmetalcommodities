'use client';

import { Section, Container, Typography, Button } from '@/components/ui';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section background="navy" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <div className="text-center">
          <Typography variant="h1" className="text-warm-white mb-4">Something went wrong</Typography>
          <Typography variant="body" className="text-warm-white/70 mb-10 max-w-md mx-auto">
            An unexpected error occurred. Please try again.
          </Typography>
          <Button variant="ghost" onClick={() => reset()}>
            Try Again
          </Button>
        </div>
      </Container>
    </Section>
  );
}
