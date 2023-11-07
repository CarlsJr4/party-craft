import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <h1 className="mb-4 text-lg font-bold">Welcome to PartyCraft!</h1>
      <Link href="/dashboard/upcoming">
        <Button variant="default">Dashboard</Button>
      </Link>
    </main>
  );
}
