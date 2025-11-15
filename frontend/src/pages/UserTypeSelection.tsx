import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { UserType } from '@/types/user';
import { Button } from '@/components/ui/button';
import { UsersIcon } from '@/components/icons/UsersIcon';
import { HandbagIcon } from '@/components/icons/HandbagIcon';
import { FishIcon } from '@/components/icons/FishIcon';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';

const UserTypeSelection = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<UserType | null>(null);

  const handleNext = () => {
    if (selectedType) {
      navigate('/signup', { state: { userType: selectedType } });
    }
  };

  return (
    <div className="min-h-screen bg-karp-background flex">
      {/* Left Column - Progress Indicator */}
      <div className="w-1/3 bg-karp-background p-8 border-r border-karp-font/10">
        <Link
          to="/login"
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

      {/* Right Column - Selection */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-3xl font-bold text-karp-font mb-8">
            Are you an Organization or Vendor?
          </h1>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Organization Card */}
            <button
              type="button"
              onClick={() => setSelectedType('ORGANIZATION')}
              className={`p-8 bg-white rounded-lg border-2 transition-all hover:shadow-lg ${
                selectedType === 'ORGANIZATION'
                  ? 'border-karp-primary shadow-md'
                  : 'border-karp-font/20'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={`${
                    selectedType === 'ORGANIZATION'
                      ? 'text-karp-primary'
                      : 'text-karp-font'
                  }`}
                >
                  <UsersIcon />
                </div>
                <span className="text-lg font-medium text-karp-font">
                  Organization
                </span>
              </div>
            </button>

            {/* Vendor Card */}
            <button
              type="button"
              onClick={() => setSelectedType('VENDOR')}
              className={`p-8 bg-white rounded-lg border-2 transition-all hover:shadow-lg ${
                selectedType === 'VENDOR'
                  ? 'border-karp-primary shadow-md'
                  : 'border-karp-font/20'
              }`}
            >
              <div className="flex flex-col items-center space-y-4">
                <div
                  className={`${
                    selectedType === 'VENDOR'
                      ? 'text-karp-primary'
                      : 'text-karp-font'
                  }`}
                >
                  <HandbagIcon />
                </div>
                <span className="text-lg font-medium text-karp-font">
                  Vendor
                </span>
              </div>
            </button>
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedType}
            variant="outline"
            className="w-full border-karp-orange/30 bg-white text-karp-font hover:bg-karp-font/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
