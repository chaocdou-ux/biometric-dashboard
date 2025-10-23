import { useState } from 'react';

export function InfoIcon({ tooltip, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200"
        style={{
          background: 'rgba(15, 23, 42, 0.1)',
          color: '#0f172a'
        }}
        aria-label="Information"
        type="button"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M8 7v4M8 5v0.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {isVisible && (
        <div
          className="absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg whitespace-nowrap"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            minWidth: '200px',
            maxWidth: '300px',
            whiteSpace: 'normal'
          }}
        >
          {tooltip}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              background: 'rgba(15, 23, 42, 0.95)'
            }}
          />
        </div>
      )}
    </div>
  );
}

export function BiometricTerm({ term, children }) {
  const [isVisible, setIsVisible] = useState(false);

  const definitions = {
    'HRV': 'Heart Rate Variability - variation in time between heartbeats, indicating autonomic nervous system health',
    'RMSSD': 'Root Mean Square of Successive Differences - measures short-term heart rate variability',
    'SDNN': 'Standard Deviation of NN intervals - overall heart rate variability metric',
    'SpO2': 'Blood Oxygen Saturation - percentage of oxygen in the blood',
    'Vagus Nerve': 'Main nerve of parasympathetic nervous system, connecting brain to major organs'
  };

  const definition = definitions[term];

  if (!definition) {
    return children;
  }

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help border-b border-dotted border-current"
        style={{ color: '#0f172a' }}
      >
        {children}
      </span>

      {isVisible && (
        <div
          className="absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg"
          style={{
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            minWidth: '250px',
            maxWidth: '350px',
            whiteSpace: 'normal'
          }}
        >
          <strong>{term}:</strong> {definition}
          <div
            style={{
              position: 'absolute',
              bottom: '-4px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              background: 'rgba(15, 23, 42, 0.95)'
            }}
          />
        </div>
      )}
    </span>
  );
}
