import { makeRequest } from '@/api/base';
import type {
  Event,
  CreateEventRequest,
  UpdateEventRequest,
} from '@/types/event';

export async function createEvent(
  eventData: CreateEventRequest
): Promise<Event> {
  return makeRequest<Event>('/event/new', 'POST', eventData);
}

export async function getEvent(eventId: string): Promise<Event> {
  return makeRequest<Event>(`/event/${eventId}`, 'GET');
}

export async function getAllEvents(): Promise<Event[]> {
  return makeRequest<Event[]>('/event/all', 'GET');
}

export async function updateEvent(
  eventData: UpdateEventRequest
): Promise<Event> {
  return makeRequest<Event>(`/event/${eventData.id}`, 'PUT', eventData);
}

export async function deleteEvent(eventId: string): Promise<void> {
  return makeRequest<void>(`/event/${eventId}`, 'DELETE');
}

export async function getEventsByOrganization(
  organizationId: string
): Promise<Event[]> {
  return makeRequest<Event[]>(`/event/organization/${organizationId}`, 'GET');
}

export async function uploadEventImage(
  eventId: string,
  imageFile: File
): Promise<{ upload_url: string;
 }> {
  const filename = encodeURIComponent(imageFile.name);
  const presignedData = makeRequest<{ upload_url: string, file_url: string }>(
    `/event/${eventId}/upload-url?filename=${filename}&filetype=${imageFile.type}`,
    'GET',
  );

  const uploadResponse = await fetch((await presignedData).upload_url, {
    method: 'PUT',
    headers: {
      'Content-Type': imageFile.type,
    },
    body: imageFile,
  });

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload image to S3: ${uploadResponse.status} ${uploadResponse.statusText}`);
  }

  // Step 3 — Return the file URL (S3 key)
  return { upload_url: (await presignedData).upload_url };
}