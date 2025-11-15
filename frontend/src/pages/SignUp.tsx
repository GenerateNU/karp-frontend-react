import type { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { UserType } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { FishIcon } from '@/components/icons/FishIcon';
import { signupApi } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import { createVendor } from '@/api/vendor';
import { createOrganization } from '@/api/organization';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const formData = location.state as {
    userType?: UserType;
    industryType?: string;
    description?: string;
    address?: string;
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect to account type selection if no user type is provided
    if (!formData?.userType) {
      navigate('/signup/select-type', { replace: true });
    }
  }, [formData, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.userType) {
        setError('User type is required');
        setLoading(false);
        return;
      }

      // Create the user account
      await signupApi({
        username: email.trim(),
        email: email.trim(),
        password: password.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        user_type: formData.userType,
      });

      // Automatically sign in the user with the credentials they used to sign up
      try {
        await login(email.trim(), password.trim());

        // Create vendor/organization profile after successful login
        // (industryType, description, address) are saved in a separate API call
        if (formData.userType === 'VENDOR' && formData.industryType) {
          try {
            await createVendor({
              name: `${firstName.trim()} ${lastName.trim()}`,
              business_type: formData.industryType,
            });
          } catch (profileError) {
            console.error('Failed to create vendor profile:', profileError);
            // Continue even if profile creation fails - user can create it later
          }
        } else if (
          formData.userType === 'ORGANIZATION' &&
          formData.description &&
          formData.address
        ) {
          try {
            await createOrganization({
              name: `${firstName.trim()} ${lastName.trim()}`,
              description: formData.description,
              address: formData.address,
            });
          } catch (profileError) {
            console.error(
              'Failed to create organization profile:',
              profileError
            );
            // Continue even if profile creation fails - user can create it later
          }
        }

        // Redirect to home page on successful login
        navigate('/', { replace: true });
      } catch (loginError) {
        // If auto-login fails, redirect to login page with a message
        const error = loginError as Error;
        navigate('/login', {
          replace: true,
          state: {
            message: 'Account created successfully! Please log in.',
            error: error.message || 'Auto-login failed',
          },
        });
      }
    } catch (err) {
      const error = err as Error;
      let errorMessage = 'Sign up failed';
      if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-karp-background flex">
      {/* Left Column - Progress Indicator */}
      <div className="w-1/3 bg-karp-background p-8 border-r border-karp-font/10">
        <Link
          to="/signup/details"
          className="inline-flex items-center text-karp-font hover:text-karp-primary mb-8"
        >
          <ChevronLeftIcon />
        </Link>

        <div className="space-y-8">
          {/* Step 1 - Active */}
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-karp-primary bg-karp-primary/10 flex items-center justify-center">
                <UserIcon className="text-karp-primary" />
              </div>
              <div className="w-0.5 h-16 border-l-2 border-dotted border-gray-300 mt-2"></div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-karp-font text-lg">Your details</h3>
              <p className="text-sm text-gray-500 mt-1">
                Provide an email and password.
              </p>
            </div>
          </div>

          {/* Step 2 - Inactive */}
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <FishIcon className="text-gray-400" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-gray-400 text-lg">
                Welcome to Karp!
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Start reconciling your transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-karp-font mb-8">
            Let's set up your account
          </h1>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-karp-font">
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
                placeholder="Enter your first name."
                className="bg-white border-karp-font/20 text-karp-font"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-karp-font">
                Last name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
                placeholder="Enter your last name."
                className="bg-white border-karp-font/20 text-karp-font"
              />
            </div>

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
                placeholder="Enter your company email address."
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
                placeholder="Enter a password."
                className="bg-white border-karp-font/20 text-karp-font"
              />
            </div>

            {error && (
              <div className="text-karp-orange text-sm bg-karp-orange/10 border border-karp-orange/30 rounded-md p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="outline"
              className="w-full border-karp-orange/30 bg-white text-karp-font hover:bg-karp-font/5"
            >
              {loading ? 'Processing…' : 'Next'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
