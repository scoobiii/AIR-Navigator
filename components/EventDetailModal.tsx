import React, { useState, useEffect } from 'react';
import type { ServiceEvent, GeminiAnalysis } from '../types';
import { analyzeEventWithGemini } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';
import { useLocale } from '../contexts/LocaleContext';

interface EventDetailModalProps {
  event: ServiceEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, isOpen, onClose }) => {
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLlm, setSelectedLlm] = useState('gemini-2.5-flash');
  const { locale, t } = useLocale();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeEventWithGemini(event, locale, selectedLlm);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;
  
  const { affectedServices } = event;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-blue-300">{event.service}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          <div className="mb-6 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-lg text-gray-200 mb-2">{t('event_summary')}</h3>
            <p className="text-amber-400 font-medium mb-3">{event.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
              <p><strong className="text-gray-300">{t('region')}:</strong> {event.region}</p>
              <p><strong className="text-gray-300">{t('start_time')}:</strong> {event.startTime}</p>
              <p><strong className="text-gray-300">{t('last_update')}:</strong> {event.lastUpdateTime}</p>
            </div>
            {event.rawLog && (
                <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-blue-400 hover:underline">{t('view_raw_log')}</summary>
                    <pre className="mt-2 p-3 bg-black rounded-md text-xs text-gray-300 whitespace-pre-wrap max-h-40 overflow-y-auto">
                        {event.rawLog}
                    </pre>
                </details>
            )}
             {affectedServices && (
                 <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-blue-400 hover:underline font-semibold">{t('affected_services')}</summary>
                    <div className="mt-2 p-3 bg-black rounded-md text-xs text-gray-300 grid grid-cols-1 md:grid-cols-2 gap-4">
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
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="llm-select" className="block text-sm font-medium text-gray-400 mb-2">{t('select_llm')}</label>
            <select
                id="llm-select"
                value={selectedLlm}
                onChange={(e) => setSelectedLlm(e.target.value)}
                className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="gemini-2.5-flash">{t('gemini_model_name')}</option>
                <option value="llama-3-simulated">{t('llama_model_name_simulated')}</option>
            </select>
          </div>

          <div className="text-center mb-6">
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? t('analyzing') : t('analyze_with_gemini_button')}
            </button>
          </div>

          {isLoading && <div className="flex justify-center items-center p-8"><LoadingSpinner /></div>}
          {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">{error}</div>}
          
          {analysis && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-semibold text-lg text-gray-200 mb-2 border-b border-gray-600 pb-2">{t('log_explanation')}</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{analysis.logExplanation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-200 mb-2 border-b border-gray-600 pb-2">{t('permanent_solution')}</h3>
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{analysis.permanentSolution}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-200 mb-2 border-b border-gray-600 pb-2">{t('vulnerability_test_scenarios')}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {analysis.testScenarios.map((scenario, index) => (
                    <li key={index}>{scenario}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};