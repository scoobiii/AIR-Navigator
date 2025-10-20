import React from 'react';
import type { ServiceStatus } from '../types';
import { useLocale } from '../contexts/LocaleContext';

interface ServiceStatusListProps {
  statuses: ServiceStatus[];
}

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ExclamationCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


export const ServiceStatusList: React.FC<ServiceStatusListProps> = ({ statuses }) => {
    const { t } = useLocale();

    const allOk = statuses.every(s => s.status === 'ok');

    return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">{t('service_status_dashboard')}</h2>
            {allOk ? (
                <div className="flex items-center p-4 bg-green-900/50 rounded-md border border-green-700">
                    <CheckCircleIcon />
                    <p className="ml-3 text-green-300 font-semibold">{t('all_services_operational')}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statuses.map(service => (
                        <div key={service.name} className={`flex items-center p-3 rounded-md ${service.status === 'ok' ? 'bg-gray-700/50' : 'bg-amber-900/50 border border-amber-700'}`}>
                            {service.status === 'ok' ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
                            <span className={`ml-3 text-sm font-medium ${service.status === 'ok' ? 'text-gray-300' : 'text-amber-300'}`}>{service.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
