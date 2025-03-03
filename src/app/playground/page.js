'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Valid API key', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#10B981',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '✅',
        });
        // Wait for the toast to be visible before redirecting
        setTimeout(() => {
          router.push('/protected');
        }, 1000);
      } else {
        toast.error('Invalid API key', {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#EF4444',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
          },
          icon: '❌',
        });
      }
    } catch (error) {
      toast.error('Error validating API key', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: 'white',
          padding: '16px',
          borderRadius: '8px',
        },
        icon: '❌',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <Toaster />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">API Playground</h1>
        
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your API key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="junfan-dev-xxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
            >
              {isSubmitting ? 'Validating...' : 'Validate API Key'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 