import { useOrganizations } from '@/hooks/useOrganizations';

export function OrganizationsList() {
  const { data: organizations, isLoading, error } = useOrganizations();

  if (isLoading) {
    return <div className="p-4">Loading organizations...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading organizations</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
      </div>

      {organizations && organizations.length > 0 ? (
        <div className="grid gap-4">
          {organizations.map(organization => (
            <div
              key={organization.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {organization.name}
                  </h3>
                  <p className="text-gray-600">{organization.address}</p>
                  <p className="text-gray-600">{organization.email}</p>
                  <p className="text-gray-600">{organization.phone}</p>
                  {organization.website && (
                    <p className="text-blue-600 mt-2">
                      <a
                        href={organization.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {organization.website}
                      </a>
                    </p>
                  )}
                  {organization.description && (
                    <p className="text-gray-700 mt-2">
                      {organization.description}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Created:{' '}
                    {new Date(organization.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No organizations found.</p>
        </div>
      )}
    </div>
  );
}
