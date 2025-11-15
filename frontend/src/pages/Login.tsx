import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state?: { from?: Location } };
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email.trim(), password.trim());
      const redirectTo =
        (location.state?.from as unknown as { pathname?: string })?.pathname ||
        '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError((err as Error).message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-karp-background">
      <div className="max-w-md w-full mx-4">
        <Card className="bg-karp-background shadow-lg">
          <CardHeader className="bg-karp-background">
            <div className="text-center space-y-2">
              <CardTitle className="text-xl font-bold text-karp-font">
                Welcome to
              </CardTitle>
              <CardTitle className="text-4xl font-bold text-karp-font">
                Karp
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="bg-karp-background">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-karp-font">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Enter your company email"
                  className="bg-white border-karp-font/20 text-karp-font"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-karp-font">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="bg-white border-karp-font/20 text-karp-font"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border-karp-font/20 rounded bg-white"
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-gray-500 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-karp-font underline hover:text-karp-primary"
                >
                  Forgot password
                </Link>
              </div>
              {error && (
                <div className="text-karp-orange text-sm bg-karp-orange/10 border border-karp-orange/30 rounded-md p-3">
                  {error}
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing in…' : 'Log In'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{' '}
                <Link
                  to="/signup/select-type"
                  className="font-bold text-karp-font underline hover:text-karp-primary"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
