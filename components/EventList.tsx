import React from 'react';
import type { ServiceEvent } from '../types';
import { EventListItem } from './EventListItem';

interface EventListProps {
  events: ServiceEvent[];
  onSelectEvent: (event: ServiceEvent) => void;
}

export const EventList: React.FC<EventListProps> = ({ events, onSelectEvent }) => {
  return (
    <div className="space-y-6">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} onSelectEvent={onSelectEvent} />
      ))}
    </div>
  );
};