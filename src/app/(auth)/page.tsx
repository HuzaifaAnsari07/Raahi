
'use client';

import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/login-form'), {
  ssr: false,
  loading: () => <div className="w-full max-w-sm h-[450px]" />, // Placeholder to prevent layout shift
});

export default function LoginPage() {
  return <LoginForm />;
}
