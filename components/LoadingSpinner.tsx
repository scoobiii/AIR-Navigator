import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

export const LoadingSpinner: React.FC = () => {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      <p className="text-blue-300 text-sm">{t('contacting_gemini')}</p>
    </div>
  );
};