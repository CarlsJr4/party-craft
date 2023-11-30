import AuthForm from '@/components/custom/AuthForm';
import PageHeading from '@/components/custom/PageHeading';
import PageSubHeading from '@/components/custom/PageSubHeading';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <PageHeading>Welcome to PartyCraft!</PageHeading>
      <PageSubHeading>Your all-in-one event planning portal</PageSubHeading>
      <AuthForm />
    </main>
  );
}
