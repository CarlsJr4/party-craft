import AuthForm from '@/components/custom/AuthForm';
import PageHeading from '@/components/custom/PageHeading';
import PageSubHeading from '@/components/custom/PageSubHeading';
import SignupForm from '@/components/custom/SignupForm';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12">
      <PageHeading>Welcome to PartyCraft!</PageHeading>
      <PageSubHeading>Your all-in-one event planning portal</PageSubHeading>
      <Tabs defaultValue="signin" className="w-[400px] mt-6">
        <TabsList className="grid w-full grid-cols-2 my-3">
          <TabsTrigger value="signin">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign-up</TabsTrigger>
        </TabsList>
        <Card>
          <TabsContent value="signin">
            <AuthForm />
          </TabsContent>
          <TabsContent value="signup">
            <SignupForm />
          </TabsContent>
        </Card>
      </Tabs>
    </main>
  );
}
