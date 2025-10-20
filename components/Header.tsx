import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

const AWSLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto text-white" viewBox="0 0 128 128">
        <path fill="currentColor" d="M36.19 86.33c0-3.67 2.22-5.49 6.2-5.49 2.22 0 4.2.49 6.2 1.36a4.8 4.8 0 00.73-3.67c-.24-5.38-4.32-9.47-10.27-9.47-9.8 0-16.7 7.09-16.7 18.22 0 9.8 6.44 17.6 15.7 17.6 9.47 0 15.35-6.68 15.35-15.7s-5.63-12.82-12.23-12.82c-3.18 0-5.75.86-7.83 2.1a1 1 0 01-1.35-.37c-.36-.6-.12-1.34.48-1.7 2.7-1.58 6.32-2.43 10.04-2.43 9.35 0 16.94 6.8 16.94 15.23 0 8.3-6.1 15.1-15.1 15.1-6.8 0-12.35-4.43-14.38-10.66a1.14 1.14 0 011.08-1.48h.24zm84.4-38.33c.85 0 1.34-.85 1-1.6l-2.1-4.2c-.37-.74-1.34-.85-1.84-.24l-3.28 2.82c-.5.48-.48 1.34.12 1.84l4.22 3.28c.5.36 1.23.24 1.6-.24a1.2 1.2 0 00.28-.66zM114 62.1c-.5-.5-1.34-.48-1.84.12l-3.9 3.28c-.5.5-.6 1.34-.12 1.84l2.1 2.57c.5.5 1.34.6 1.84.12l3.9-3.28c.5-.5.6-1.34.12-1.84l-2.1-2.7zM97.1 57.17c-.5-.5-1.34-.48-1.84.12l-3.9 3.28c-.5.5-.6 1.34-.12 1.84l2.1 2.57c.5.5 1.34.6 1.84.12l3.9-3.28c.5-.5.6-1.34.12-1.84l-2.1-2.7z" />
        <path fill="currentColor" d="M107.5 73.57c-3.55 0-6.1 2.22-6.1 5.37 0 3.18 2.55 5.5 6.1 5.5 3.43 0 6.1-2.22 6.1-5.5s-2.67-5.37-6.1-5.37zm0 9.23c-2.22 0-3.9-1.6-3.9-3.9s1.7-3.9 3.9-3.9c2.1 0 3.9 1.6 3.9 3.9s-1.7 3.9-3.9 3.9zm-22-10.46c-2.1-3.67-5.5-5.63-9.5-5.63-5.26 0-10.15 4.94-10.15 13.45 0 7.83 5.02 12.83 11.2 12.83 4.1 0 7.6-2.22 9.5-6.2h.1l.12 5.5c0 .6.5 1.1 1.1 1.1h3.43c.6 0 1.1-.5 1.1-1.1V63.9c0-.6-.5-1.1-1.1-1.1h-4.2c-.6 0-1.1.5-1.1 1.1v3.55h-.12zm-8.8 9.5c-3.43 0-6.1-3.55-6.1-8.32 0-4.65 2.55-8.2 6.1-8.2 3.43 0 6.1 3.55 6.1 8.2s-2.67 8.3-6.1 8.3zM60.1 86.8c-.6 0-1.1-.5-1.1-1.1V62.83c0-.6.5-1.1 1.1-1.1h4.2c.6 0 1.1.5 1.1 1.1V85.7c0 .6-.5 1.1-1.1 1.1H60.1zM52 61.7c-3.55 0-6.1 2.22-6.1 5.37 0 3.18 2.55 5.5 6.1 5.5 3.43 0 6.1-2.22 6.1-5.5s-2.67-5.37-6.1-5.37zm0 9.23c-2.22 0-3.9-1.6-3.9-3.9s1.7-3.9 3.9-3.9c2.1 0 3.9 1.6 3.9 3.9s-1.7 3.9-3.9 3.9z" />
    </svg>
);

const NavLink = ({ children }: { children: React.ReactNode }) => (
    <button className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors h-full px-3">
        <span>{children}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    </button>
);

export const Header: React.FC = () => {
  const { t } = useLocale();
  return (
    <header className="bg-[#16191f] sticky top-0 z-10 border-b border-gray-700 shadow-md h-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <AWSLogo />
          </div>
          <div className="flex items-center h-full">
            <NavLink>{t('contact_us')}</NavLink>
            <NavLink>{t('support')}</NavLink>
            <NavLink>{t('my_account')}</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};