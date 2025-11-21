'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { StoicLogo } from '@/components/StoicLogo';
import { Loader2, ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email';
      if (errorMessage.includes('user-not-found')) {
        setError('No account found with this email');
      } else if (errorMessage.includes('invalid-email')) {
        setError('Please enter a valid email address');
      } else if (errorMessage.includes('too-many-requests')) {
        setError('Too many requests. Please try again later.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await resetPassword(email);
    } catch {
      // Silently fail on resend
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader className="text-center pb-0">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Check Your Email</h1>
            <p className="text-slate-500 mt-2">
              We&apos;ve sent a password reset link to
            </p>
            <p className="text-stoic-blue font-medium mt-1">{email}</p>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-500 mt-0.5" />
                <div className="text-sm text-slate-600">
                  <p>Click the link in the email to reset your password.</p>
                  <p className="mt-2">If you don&apos;t see it, check your spam folder.</p>
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full py-3 border-slate-300 hover:bg-slate-50 mb-4"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Resend Email'
              )}
            </Button>

            <Link href="/auth/signin">
              <Button
                type="button"
                variant="ghost"
                className="w-full py-3 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader className="text-center pb-0">
          <div className="flex justify-center mb-6">
            <StoicLogo className="w-12 h-12 text-stoic-blue" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Reset Your Password</h1>
          <p className="text-slate-500 mt-2">Enter your email address</p>
        </CardHeader>
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-bold uppercase text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@rome.com"
                className="px-4 py-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-stoic-blue focus:border-transparent"
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-stoic-blue hover:bg-sky-600 text-white font-bold shadow hover:shadow-md transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <Link href="/auth/signin">
            <Button
              type="button"
              variant="ghost"
              className="w-full py-3 mt-4 text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
