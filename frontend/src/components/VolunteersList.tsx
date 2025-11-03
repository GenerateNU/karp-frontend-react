import { useVolunteers } from '@/hooks/useVolunteers';

export function VolunteersList() {
  const { data: volunteers, isLoading, error } = useVolunteers();

  if (isLoading) {
    return <div className="p-4">Loading volunteers...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading volunteers</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Volunteers</h1>
      </div>

      {volunteers && volunteers.length > 0 ? (
        <div className="grid gap-4">
          {volunteers.map(volunteer => (
            <div
              key={volunteer.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {volunteer.first_name} {volunteer.last_name}
                  </h3>
                  <p className="text-gray-600">{volunteer.email}</p>
                  <p className="text-gray-600">{volunteer.phone}</p>
                  <p className="text-gray-600">{volunteer.address}</p>
                  <p className="text-sm text-gray-500">
                    Date of Birth:{' '}
                    {new Date(volunteer.date_of_birth).toLocaleDateString()}
                  </p>
                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {volunteer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {volunteer.interests && volunteer.interests.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Interests:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {volunteer.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {volunteer.availability && (
                    <p className="text-sm text-gray-600 mt-2">
                      Availability: {volunteer.availability}
                    </p>
                  )}
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      Emergency Contact: {volunteer.emergency_contact_name} (
                      {volunteer.emergency_contact_phone})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Created:{' '}
                    {new Date(volunteer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No volunteers found.</p>
        </div>
      )}
    </div>
  );
}
