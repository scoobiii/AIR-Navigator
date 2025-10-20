import React, { useState } from 'react';
import { SERVICE_EVENTS, SERVICE_HISTORY_EVENTS } from '../constants';
import { EventList } from './EventList';
import { EventDetailModal } from './EventDetailModal';
import type { ServiceEvent } from '../types';
import { useLocale } from '../contexts/LocaleContext';

export const Dashboard: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<ServiceEvent | null>(null);
  const [activeTab, setActiveTab] = useState<'open' | 'history'>('open');
  const { t } = useLocale();

  const handleSelectEvent = (event: ServiceEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const eventsToShow = activeTab === 'open' ? SERVICE_EVENTS : SERVICE_HISTORY_EVENTS;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold text-white">{t('service_health')}</h1>
            <span className="text-sm text-gray-400">{t('updated_ago', { minutes: 1 })}</span>
          </div>
          <p className="text-sm text-gray-400">{t('service_health')}</p>
        </header>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-semibold text-white">{t('view_your_account_health')}</h2>
                <p className="text-sm text-gray-400 mt-1 max-w-2xl">{t('account_health_promo_text')}</p>
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md border border-gray-600 transition-colors text-sm">
                {t('open_your_account_health')}
            </button>
        </div>

        <div className="border-b border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                    onClick={() => setActiveTab('open')}
                    className={`${
                        activeTab === 'open'
                            ? 'border-blue-400 text-blue-300'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                >
                    {t('open_and_recent_issues')} ({SERVICE_EVENTS.length})
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`${
                        activeTab === 'history'
                            ? 'border-blue-400 text-blue-300'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors focus:outline-none`}
                >
                    {t('service_history')} ({SERVICE_HISTORY_EVENTS.length})
                </button>
            </nav>
        </div>

        <EventList events={eventsToShow} onSelectEvent={handleSelectEvent} />

        {selectedEvent && (
          <EventDetailModal
            isOpen={!!selectedEvent}
            onClose={handleCloseModal}
            event={selectedEvent}
          />
        )}
      </div>
    </div>
  );
};