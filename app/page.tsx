import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <h1 className="mb-4 text-lg font-bold">Welcome to PartyCraft!</h1>
      <Button variant="default">Sign Up</Button>
    </main>
  );
}
