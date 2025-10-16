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
