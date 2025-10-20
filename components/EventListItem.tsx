import React from 'react';
import type { ServiceEvent } from '../types';
import { useLocale } from '../contexts/LocaleContext';

interface EventListItemProps {
  event: ServiceEvent;
  onSelectEvent: (event: ServiceEvent) => void;
}

const CaretDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.22 3.001-1.742 3.001H4.42c-1.522 0-2.492-1.667-1.742-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const RssIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 5c7.73 0 14 6.27 14 14M6 13a7 7 0 017 7m-7-14v2m0 0a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
);


export const EventListItem: React.FC<EventListItemProps> = ({ event, onSelectEvent }) => {
  const { t } = useLocale();

  const parseLog = (log?: string) => {
    if (!log) return [];
    return log.trim().split('\n').map(line => {
      const match = line.match(/^(\w+\s\d+\s\d{1,2}:\d{2}\s[AP]M\s\w+)\s(.*)/);
      if (match) {
        return { time: match[1], text: match[2] };
      }
      return { time: null, text: line };
    }).filter(u => u.text);
  };

  const updates = parseLog(event.rawLog);
  const { affectedServices } = event;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
            <h3 className="flex items-center font-bold text-white text-lg">
                <CaretDownIcon />
                <span className="ml-2">{t('operational_issue')} - {event.service} ({event.region})</span>
            </h3>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start mb-3">
                <div className="grid grid-cols-2 gap-x-8 text-sm">
                    <div>
                        <div className="text-gray-400">{t('service')}</div>
                        <div className="text-white font-semibold">{event.service}</div>
                    </div>
                    <div>
                        <div className="text-gray-400">{t('severity')}</div>
                        <div className="flex items-center text-amber-400 font-semibold">
                            <WarningIcon />
                            {event.severity}
                        </div>
                    </div>
                </div>
                <button className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-1 px-3 rounded-md border border-gray-600 transition-colors">
                    <RssIcon />
                    {t('rss')}
                </button>
            </div>
            <hr className="border-gray-700 my-4" />
            <div className="prose prose-sm prose-invert max-w-none text-gray-300">
                <h4 className="font-bold text-white text-base">{event.description}</h4>
                {updates.length > 0 ? (
                    <div className="mt-4 space-y-4">
                        {updates.map((update, index) => (
                            <div key={index}>
                                <p className="font-bold text-gray-200">{update.time}</p>
                                <p>{update.text}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="mt-2 text-sm">{t('no_detailed_updates')}</p>}
            </div>

            {affectedServices && (
                 <div className="mt-4">
                    <details>
                        <summary className="cursor-pointer text-sm text-blue-400 hover:underline font-semibold">{t('affected_services')}</summary>
                        <div className="mt-2 p-3 bg-gray-900/50 rounded-md border border-gray-700 text-xs text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="font-bold text-white mb-2">{t('impacted')} ({affectedServices.impacted.length})</h5>
                                <ul className="space-y-1 max-h-48 overflow-y-auto">
                                    {affectedServices.impacted.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                             <div>
                                <h5 className="font-bold text-white mb-2">{t('resolved')} ({affectedServices.resolved.length})</h5>
                                <ul className="space-y-1 max-h-48 overflow-y-auto">
                                    {affectedServices.resolved.map(s => <li key={s}>{s}</li>)}
                                </ul>
                            </div>
                        </div>
                    </details>
                </div>
            )}

             <div className="mt-6 text-center">
                <button 
                  onClick={() => onSelectEvent(event)} 
                  className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                    {t('analyze_with_gemini')} &rarr;
                </button>
            </div>
        </div>
    </div>
  );
};