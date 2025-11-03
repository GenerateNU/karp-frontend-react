import { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { EventForm } from '@/components/EventForm';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';

export function EventsList() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return <div className="p-4">Loading events...</div>;
  }

  if (error) {
    return <div className="p-4 text-karp-orange">Error loading events</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Event
        </Button>
      </div>

      {events && events.length > 0 ? (
        <div className="grid gap-4">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-karp-background border border-karp-font/20 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-karp-primary/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-karp-font">
                    {event.name}
                  </h3>
                  <p className="text-karp-font/70">{event.address}</p>
                  <p className="text-sm text-karp-font/60">
                    {new Date(event.start_date_time).toLocaleDateString()} -{' '}
                    {new Date(event.end_date_time).toLocaleDateString()}
                  </p>
                  {event.description && (
                    <p className="text-karp-font/80 mt-2">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'published'
                        ? 'bg-karp-green/20 text-karp-green'
                        : event.status === 'draft'
                          ? 'bg-karp-yellow/20 text-karp-yellow'
                          : event.status === 'cancelled'
                            ? 'bg-karp-orange/20 text-karp-orange'
                            : 'bg-karp-font/10 text-karp-font'
                    }`}
                  >
                    {event.status}
                  </span>
                  <div className="mt-2 text-sm text-karp-font/70">
                    <p>Max Volunteers: {event.max_volunteers}</p>
                    <p>Coins: {event.coins}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-karp-font/70">
          <p>No events found. Create your first event!</p>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        size="2xl"
      >
        <EventForm onSuccess={() => setShowCreateModal(false)} />
      </Modal>
    </div>
  );
}
