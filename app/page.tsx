import AuthForm from '@/components/custom/AuthForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <h1 className="mb-4 text-lg font-bold">Welcome to PartyCraft!</h1>
      <p>The ultimate party-planning application awaits.</p>
      <AuthForm />
    </main>
  );
}
