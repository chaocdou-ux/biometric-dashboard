import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileNav({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'study', label: 'The Study' },
    { id: 'about', label: 'About' },
    { id: 'participate', label: 'Participate' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavigate = (pageId) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => handleNavigate('home')}
            className="flex flex-col"
            aria-label="Navigate to home"
          >
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Biometric Study
            </span>
            <span className="text-xs font-medium text-gray-600 mt-0.5">
              Movement • Music • Wellness
            </span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 -mr-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col items-center justify-center h-full px-8">
          <ul className="space-y-6 w-full max-w-xs">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item.id)}
                  className={`block w-full text-center text-2xl font-semibold py-4 px-6 rounded-xl transition-all ${
                    currentPage === item.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-current={currentPage === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-gray-200 w-full max-w-xs">
            <a
              href="mailto:nathalie@nathaliebonin.com?subject=Study%20Inquiry"
              className="block w-full text-center text-base font-semibold py-3 px-6 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
