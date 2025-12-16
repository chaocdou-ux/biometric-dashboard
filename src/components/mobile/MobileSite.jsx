import { useState, useEffect } from 'react';
import MobileNav from './MobileNav';
import MobileHome from './MobileHome';
import MobileStudy from './MobileStudy';
import MobileAbout from './MobileAbout';
import MobileParticipate from './MobileParticipate';
import MobileContact from './MobileContact';

export default function MobileSite() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'Biometric Study - Where Science Meets Wellness';
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <MobileHome onNavigate={handleNavigate} />;
      case 'study':
        return <MobileStudy onNavigate={handleNavigate} />;
      case 'about':
        return <MobileAbout onNavigate={handleNavigate} />;
      case 'participate':
        return <MobileParticipate onNavigate={handleNavigate} />;
      case 'contact':
        return <MobileContact onNavigate={handleNavigate} />;
      default:
        return <MobileHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <MobileNav currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Biometric Study
              </h3>
              <p className="text-sm text-gray-600">
                Exploring the intersection of science, wellness, and creative expression
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
              <button
                onClick={() => handleNavigate('home')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigate('study')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                The Study
              </button>
              <button
                onClick={() => handleNavigate('about')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigate('participate')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Participate
              </button>
              <button
                onClick={() => handleNavigate('contact')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} Biometric Study. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Research conducted with ethical oversight and participant consent
              </p>
            </div>

            <div className="pt-4">
              <a
                href="mailto:nathalie@nathaliebonin.com"
                className="text-sm text-gray-900 font-medium hover:underline"
              >
                nathalie@nathaliebonin.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
