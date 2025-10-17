
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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/dashboard');
  };
  
  const handleDownloadClick = () => {
    toast({
      title: 'App Coming Soon',
    });
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
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>
            {t('login.description')}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('login.email_label')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="passenger@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{t('login.password_label')}</Label>
              <Input
                id="password"
                type="password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             <Button variant="outline" className="w-full" onClick={handleDownloadClick} type="button">
                <Download className="mr-2 h-4 w-4" />
                Download App
            </Button>
            <Button type="submit" className="w-full">
                {t('login.signin_button')}
            </Button>
            <div className="text-center text-sm">
              {t('login.signup_prompt')}{' '}
              <Link href="/register" className="underline">
                {t('login.signup_link')}
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
