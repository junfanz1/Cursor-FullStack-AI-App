'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function ProtectedPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth');
        if (!response.ok) {
          throw new Error('Not authorized');
        }
        setIsAuthorized(true);
      } catch (error) {
        toast.error('Not authorized to access this page');
        router.push('/playground');
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">Protected Page</h1>
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
          <p className="text-gray-600">
            This is a protected page that can only be accessed with a valid API key.
          </p>
        </div>
      </div>
    </div>
  );
} 