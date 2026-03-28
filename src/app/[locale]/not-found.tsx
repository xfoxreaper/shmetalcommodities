import { Section, Container, Typography, Button } from '@/components/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Section background="navy" className="min-h-[60vh] flex items-center">
      <Container>
        <div className="text-center">
          <Typography variant="display" className="text-gold mb-6">404</Typography>
          <Typography variant="h2" className="text-warm-white mb-4">Page Not Found</Typography>
          <Typography variant="body" className="text-warm-white/70 mb-10 max-w-md mx-auto">
            The page you are looking for does not exist or has been moved.
          </Typography>
          <Link href="/">
            <Button variant="ghost">Return Home</Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
