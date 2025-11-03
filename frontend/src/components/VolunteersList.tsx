import { useVolunteers } from '@/hooks/useVolunteers';

export function VolunteersList() {
  const { data: volunteers, isLoading, error } = useVolunteers();

  if (isLoading) {
    return <div className="p-4">Loading volunteers...</div>;
  }

  if (error) {
    return <div className="p-4 text-karp-orange">Error loading volunteers</div>;
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
              className="bg-karp-background border border-karp-font/20 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-karp-primary/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-karp-font">
                    {volunteer.first_name} {volunteer.last_name}
                  </h3>
                  <p className="text-karp-font/70">{volunteer.email}</p>
                  <p className="text-karp-font/70">{volunteer.phone}</p>
                  <p className="text-karp-font/70">{volunteer.address}</p>
                  <p className="text-sm text-karp-font/60">
                    Date of Birth:{' '}
                    {new Date(volunteer.date_of_birth).toLocaleDateString()}
                  </p>
                  {volunteer.skills && volunteer.skills.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-karp-font/80">
                        Skills:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {volunteer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-karp-primary/20 text-karp-primary rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {volunteer.interests && volunteer.interests.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-karp-font/80">
                        Interests:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {volunteer.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-karp-green/20 text-karp-green rounded text-xs"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {volunteer.availability && (
                    <p className="text-sm text-karp-font/70 mt-2">
                      Availability: {volunteer.availability}
                    </p>
                  )}
                  <div className="mt-2 text-sm text-karp-font/70">
                    <p>
                      Emergency Contact: {volunteer.emergency_contact_name} (
                      {volunteer.emergency_contact_phone})
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-karp-font/60">
                    Created:{' '}
                    {new Date(volunteer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-karp-font/70">
          <p>No volunteers found.</p>
        </div>
      )}
    </div>
  );
}
