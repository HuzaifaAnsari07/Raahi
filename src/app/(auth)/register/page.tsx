
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/lib/i18n/use-translation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Mock registration logic
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center gap-6">
       <div className="flex items-center gap-2 text-2xl font-bold text-primary">
        <Image
          src="/NMMTlogo.jpg"
          alt="NMMT Logo"
          width={40}
          height={40}
          className="h-8 w-8"
        />
        <h1 className="font-headline">NMMT Raahi</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{t('register.title')}</CardTitle>
          <CardDescription>
            {t('register.description')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="name">{t('register.name_label')}</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">{t('register.email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('register.password_label')}</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit">
              {t('register.create_account_button')}
            </Button>
            <div className="text-center text-sm">
              {t('register.signin_prompt')}{' '}
              <Link href="/" className="underline">
                {t('register.signin_link')}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
