
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
import { useState, useEffect } from 'react';
import { MapPin, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/lib/i18n/use-translation';

export default function LoginPage() {
  const router = useRouter();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const checkInitialPermission = async () => {
    if (typeof window === 'undefined' || !navigator.permissions) {
      setIsCheckingPermission(false);
      return;
    }
    setIsCheckingPermission(true);
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'granted') {
      setHasLocationPermission(true);
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
          });
        });
        sessionStorage.setItem('userLocation', JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
      } catch (error) {
        console.error("Could not get user location", error);
      }
    } else {
      setHasLocationPermission(false);
    }
    setIsCheckingPermission(false);
  };
  
  useEffect(() => {
    if(isClient) {
      checkInitialPermission();
    }
  }, [isClient]);

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
        setHasLocationPermission(false);
        return;
    }

    setIsCheckingPermission(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
        });
      });
      sessionStorage.setItem('userLocation', JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }));
      setHasLocationPermission(true);
    } catch (error) {
      console.error('Error getting location:', error);
      setHasLocationPermission(false);
    }
    setIsCheckingPermission(false);
  };

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        <h1 className="font-headline">NMMT Tracker</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{t('login.title')}</CardTitle>
          <CardDescription>
            {t('login.description')}
          </CardDescription>
        </CardHeader>
        {!isClient ? (
          <CardContent>
            <div className="grid gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        ) : (
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
              <div className="space-y-2">
                {isCheckingPermission ? (
                  <div className="flex items-center text-sm text-muted-foreground p-2 border rounded-md">
                    <MapPin className="h-4 w-4 mr-2 animate-pulse" />
                    {t('login.location_checking')}
                  </div>
                ) : hasLocationPermission ? (
                  <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-300">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle>{t('login.location_enabled_title')}</AlertTitle>
                      <AlertDescription>
                          {t('login.location_enabled_desc')}
                      </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive" className="flex flex-col items-start gap-4">
                    <div className="flex items-start">
                        <MapPin className="h-4 w-4" />
                        <div className="ml-4">
                            <AlertTitle>{t('login.location_required_title')}</AlertTitle>
                            <AlertDescription>
                                {t('login.location_required_desc')}
                            </AlertDescription>
                        </div>
                    </div>
                    <Button type="button" variant="secondary" onClick={requestLocationPermission} className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        {t('login.enable_location_button')}
                    </Button>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={!hasLocationPermission || isCheckingPermission}>
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
        )}
      </Card>
    </div>
  );
}
