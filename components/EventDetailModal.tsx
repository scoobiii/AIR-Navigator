import React, { useState, useEffect } from 'react';
import type { ServiceEvent, GeminiAnalysis } from '../types';
import { useLocale } from '../contexts/LocaleContext';
import { LoadingSpinner } from './LoadingSpinner';
import { analyzeEvent, LlmType } from '../services/analysisService';

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ServiceEvent;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ isOpen, onClose, event }) => {
  const { t } = useLocale();
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLlm, setSelectedLlm] = useState<LlmType>('gemini-2.5-flash');
  
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeEvent(event, selectedLlm, 'en'); // Using 'en' for now, can be dynamic
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset state when modal is closed or event changes
    if (!isOpen) {
      setAnalysis(null);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">{t('gemini_analysis_for')} {event.service}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </header>
        
        <main className="p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
             <div className="flex-grow">
                <label htmlFor="llm-select" className="block text-sm font-medium text-gray-300 mb-1">{t('select_llm')}</label>
                <select 
                  id="llm-select"
                  value={selectedLlm}
                  onChange={(e) => setSelectedLlm(e.target.value as LlmType)}
                  disabled={isLoading}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro (Advanced)</option>
                    <option value="llama-4-maverick">Llama 4 Maverick (Direct API)</option>
                </select>
             </div>
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full sm:w-auto self-end px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? t('analyzing') : t('analyze')}
            </button>
          </div>
          
          {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md">{t('analysis_failed')}: {error}</div>}

          {analysis && (
            <div className="space-y-6 text-gray-300 prose prose-sm prose-invert max-w-none">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('log_explanation')}</h3>
                <p>{analysis.logExplanation}</p>
              </div>
              <hr className="border-gray-600"/>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('permanent_solution')}</h3>
                <p>{analysis.permanentSolution}</p>
              </div>
               <hr className="border-gray-600"/>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('recommended_test_scenarios')}</h3>
                <ul className="list-disc pl-5 space-y-2">
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
            .prose-invert a { color: #60a5fa; }
            .prose-invert a:hover { color: #93c5fd; }
            .prose-invert ul > li::marker { color: #6b7280; }
       `}</style>
    </div>
  );
};