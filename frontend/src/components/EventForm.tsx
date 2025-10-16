import { useState } from 'react';
import { useCreateEvent } from '@/hooks/useEvents';
import type { CreateEventRequest } from '@/types/event';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EventFormProps {
  onSuccess?: () => void;
}

export function EventForm({ onSuccess }: EventFormProps) {
  const [formData, setFormData] = useState<Partial<CreateEventRequest>>({
    name: '',
    address: '',
    start_date_time: '',
    end_date_time: '',
    max_volunteers: 0,
    coins: 0,
    description: '',
    keywords: [],
    age_min: 0,
    age_max: 0,
  });

  const createEventMutation = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.start_date_time ||
      !formData.end_date_time
    ) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      await createEventMutation.mutateAsync(formData as CreateEventRequest);
      alert('Event created successfully!');
      onSuccess?.();
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('Failed to create event');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'max_volunteers' || name === 'coins' ? Number(value) : value,
    }));
  };

  return (
    <Card className="bg-white">
      <CardHeader className="bg-white">
        <CardTitle className="text-gray-900">Create New Event</CardTitle>
      </CardHeader>
      <CardContent className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900">
              Event Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter event name"
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-gray-900">
              Address *
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter event address"
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date_time" className="text-gray-900">
                Start Date & Time *
              </Label>
              <Input
                type="datetime-local"
                id="start_date_time"
                name="start_date_time"
                value={formData.start_date_time}
                onChange={handleChange}
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_date_time" className="text-gray-900">
                End Date & Time *
              </Label>
              <Input
                type="datetime-local"
                id="end_date_time"
                name="end_date_time"
                value={formData.end_date_time}
                onChange={handleChange}
                required
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_volunteers" className="text-gray-900">
                Max Volunteers
              </Label>
              <Input
                type="number"
                id="max_volunteers"
                name="max_volunteers"
                value={formData.max_volunteers}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coins" className="text-gray-900">
                Coins
              </Label>
              <Input
                type="number"
                id="coins"
                name="coins"
                value={formData.coins}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age_min" className="text-gray-900">
                Minimum Age
              </Label>
              <Input
                type="number"
                id="age_min"
                name="age_min"
                value={formData.age_min}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age_max" className="text-gray-900">
                Maximum Age
              </Label>
              <Input
                type="number"
                id="age_max"
                name="age_max"
                value={formData.age_max}
                onChange={handleChange}
                min="0"
                placeholder="0"
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-900">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              placeholder="Enter event description"
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords" className="text-gray-900">
              Keywords
            </Label>
            <Input
              id="keywords"
              name="keywords"
              value={
                Array.isArray(formData.keywords)
                  ? formData.keywords.join(', ')
                  : formData.keywords || ''
              }
              onChange={e => {
                const keywords = e.target.value
                  .split(',')
                  .map(k => k.trim())
                  .filter(k => k);
                setFormData(prev => ({ ...prev, keywords }));
              }}
              placeholder="Enter keywords separated by commas"
              className="bg-white border-gray-300 text-gray-900"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={createEventMutation.isPending}
              className="flex-1"
            >
              {createEventMutation.isPending ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
