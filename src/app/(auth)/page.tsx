
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

export default function LoginPage() {
  const router = useRouter();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isCheckingPermission, setIsCheckingPermission] = useState(true);
  const [isClient, setIsClient] = useState(false);

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
          <CardTitle className="text-2xl">Passenger Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="passenger@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
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
                    Checking location permission...
                  </div>
                ) : hasLocationPermission ? (
                  <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700 dark:text-green-300">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <AlertTitle>Location Enabled</AlertTitle>
                      <AlertDescription>
                          Location access has been granted.
                      </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive" className="flex flex-col items-start gap-4">
                    <div className="flex items-start">
                        <MapPin className="h-4 w-4" />
                        <div className="ml-4">
                            <AlertTitle>Location Access Required</AlertTitle>
                            <AlertDescription>
                                Please enable location permissions to continue.
                            </AlertDescription>
                        </div>
                    </div>
                    <Button type="button" variant="secondary" onClick={requestLocationPermission} className="w-full">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={!hasLocationPermission || isCheckingPermission}>
                  Sign in
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
}
