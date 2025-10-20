import React, { useState } from 'react';
import { EventList } from './EventList';
import { ServiceStatusList } from './ServiceStatusList';
import { EventDetailModal } from './EventDetailModal';
import { MOCK_EVENTS, MOCK_SERVICE_STATUS } from '../constants';
import type { ServiceEvent } from '../types';

export const Dashboard: React.FC = () => {
  const [events] = useState(MOCK_EVENTS);
  const [serviceStatuses] = useState(MOCK_SERVICE_STATUS);
  const [selectedEvent, setSelectedEvent] = useState<ServiceEvent | null>(null);

  const handleSelectEvent = (event: ServiceEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-white space-y-8">
      <ServiceStatusList statuses={serviceStatuses} />
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Open and recent issues</h2>
        <EventList events={events} onSelectEvent={handleSelectEvent} />
      </div>

      {selectedEvent && (
        <EventDetailModal
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};
