import React from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LocaleProvider, useLocale } from './contexts/LocaleContext';
import type { TranslationKey } from './lib/translations';

const ChevronDownIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const SideNavContent: React.FC = () => {
  const { t } = useLocale();

  const navSection = (titleKey: TranslationKey, linkKeys: TranslationKey[], initiallyOpen = false) => (
    <div className="py-2">
      <details open={initiallyOpen}>
        <summary className="flex items-center font-bold text-sm text-gray-300 cursor-pointer hover:text-white">
          <ChevronDownIcon className="h-4 w-4 mr-1 transition-transform transform details-open:-rotate-180" />
          {t(titleKey)}
        </summary>
        <ul className="pl-5 mt-2 space-y-2">
          {linkKeys.map(linkKey => (
            <li key={linkKey}>
              <a href="#" className={`text-sm ${linkKey === 'open_and_recent_issues' ? 'text-blue-400 font-semibold' : 'text-gray-400 hover:text-blue-300'}`}>
                {t(linkKey)}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
  
  const regionSection = (continentKey: TranslationKey, regionLinks: {key: string, name: string}[]) => (
     <div className="py-2">
      <details>
        <summary className="flex items-center font-bold text-sm text-gray-300 cursor-pointer hover:text-white">
          <ChevronDownIcon className="h-4 w-4 mr-1 transition-transform transform details-open:-rotate-180" />
          {t(continentKey)}
        </summary>
        <ul className="pl-5 mt-2 space-y-2">
          {regionLinks.map(link => (
            <li key={link.key}>
              <a href="#" className="text-sm text-gray-400 hover:text-blue-300">{link.name}</a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );


  return (
    <aside className="w-64 bg-[#232f3e] p-4 flex-shrink-0 border-r border-gray-700 hidden lg:block overflow-y-auto">
      <div className="flex items-center justify-between pb-2 border-b border-gray-600">
        <h2 className="text-lg font-semibold text-white">{t('aws_health_dashboard')}</h2>
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </div>
      <nav className="mt-4 divide-y divide-gray-700">
        {navSection('service_health', ['open_and_recent_issues', 'service_history'], true)}
        {navSection('your_account_health', ['open_and_recent_issues', 'scheduled_changes', 'other_notifications', 'event_log'])}
        {navSection('your_organization_health', ['open_and_recent_issues', 'scheduled_changes', 'other_notifications', 'event_log', 'configurations'])}
        
        <div className="pt-2">
            <h3 className="font-bold text-sm text-gray-300 mb-2">{t('regions')}</h3>
            {regionSection('north_america', [
                { key: 'n_virginia', name: 'N. Virginia (us-east-1)'}, 
                { key: 'ohio', name: 'Ohio (us-east-2)'},
                { key: 'n_california', name: 'N. California (us-west-1)'},
                { key: 'oregon', name: 'Oregon (us-west-2)'}
            ])}
        </div>

      </nav>
      <div className="mt-auto border-t border-gray-700 pt-4">
        <a href="#" className="text-sm text-gray-400 hover:text-blue-300">{t('time_zone_settings')}</a>
      </div>
       <style>{`
        aside {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 3rem); /* Full height minus header */
        }
        nav {
            flex-grow: 1;
        }
        details > summary { list-style: none; }
        details > summary::-webkit-details-marker { display: none; }
        details[open] summary .details-open\\:-rotate-180 { transform: rotate(-180deg); }
      `}</style>
    </aside>
  );
};


const FooterContent: React.FC = () => {
    const { t } = useLocale();
    return (
        <footer className="bg-[#232f3e] text-gray-400 text-xs p-4 border-t border-gray-700">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-white">{t('feedback')}</a>
                    <a href="#" className="hover:text-white">{t('language_selector')}</a>
                </div>
                <div className="text-gray-500">
                    <p>&copy; 2008 - {new Date().getFullYear()}, Amazon Web Services, Inc. or its affiliates. All rights reserved.
                        <a href="#" className="ml-4 hover:text-white">{t('privacy_policy')}</a>
                        <a href="#" className="ml-4 hover:text-white">{t('terms_of_use')}</a>
                        <a href="#" className="ml-4 hover:text-white">{t('cookie_preferences')}</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

function App() {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SideNavContent />
          <main className="flex-1 overflow-y-auto bg-[#1f2937]">
            <Dashboard />
          </main>
        </div>
        <FooterContent />
      </div>
    </LocaleProvider>
  );
}

export default App;