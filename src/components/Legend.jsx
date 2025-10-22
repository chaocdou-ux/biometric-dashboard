import { useState } from 'react';
import { colors, metricLabels, metricDescriptions, dataSourceInfo, significanceThreshold, getMetricDirection } from '../lib/designSystem';

export default function Legend() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-card">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left transition-all duration-300"
        aria-expanded={isExpanded}
        aria-controls="legend-content"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">📖</span>
          <h2 className="text-xl font-semibold" style={{ color: '#0f172a' }}>
            Reference Guide
          </h2>
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#0f172a"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isExpanded && (
        <div id="legend-content" className="mt-6 space-y-8 animate-fadeIn">
          <section>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>
              Metric Color Key
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(metricLabels).map(([key, label]) => (
                <div key={key} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-lg flex-shrink-0 mt-1"
                    style={{ backgroundColor: colors.metrics[key] }}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: '#0f172a' }}>
                      {label}
                    </div>
                    <div className="text-sm mt-1" style={{ color: '#1e293b', opacity: 0.8 }}>
                      {metricDescriptions[key]}
                    </div>
                    <div className="text-xs mt-1 font-medium" style={{ color: '#1e293b', opacity: 0.6 }}>
                      ↑ {getMetricDirection(key) === 'higher' ? 'Higher is better' : 'Lower is better'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.1)' }}></div>

          <section>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>
              {dataSourceInfo.title}
            </h3>
            <div className="space-y-3 text-sm" style={{ color: '#1e293b' }}>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Method:</span>
                <span>{dataSourceInfo.description}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Frequency:</span>
                <span>{dataSourceInfo.frequency}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Scale:</span>
                <span>{dataSourceInfo.scale}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Participants:</span>
                <span>{dataSourceInfo.participants}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Devices:</span>
                <span>{dataSourceInfo.devices}</span>
              </div>
            </div>
          </section>

          <div className="border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.1)' }}></div>

          <section>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f172a' }}>
              Improvement Significance
            </h3>
            <div className="space-y-2 text-sm" style={{ color: '#1e293b' }}>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.cloudGrey }}></div>
                <span>&lt;5% - Minimal change</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.warmGold, opacity: 0.6 }}></div>
                <span>5-15% - Moderate improvement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.skyBlue }}></div>
                <span>15-25% - Significant improvement</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.pineGreen }}></div>
                <span>&gt;25% - Highly significant improvement</span>
              </div>
            </div>
          </section>

          <div className="border-t" style={{ borderColor: 'rgba(15, 23, 42, 0.1)' }}></div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(15, 23, 42, 0.05)', border: '1px solid rgba(15, 23, 42, 0.1)' }}>
            <p className="text-sm font-semibold mb-2" style={{ color: '#0f172a' }}>
              Important Data Notes
            </p>
            <div className="space-y-2 text-xs" style={{ color: '#1e293b', opacity: 0.9 }}>
              <p>• {dataSourceInfo.disclaimer}</p>
              <p>• All data represents self-reported assessments measured on a {dataSourceInfo.scale}.</p>
              <p>• {dataSourceInfo.participants}.</p>
              <p>• Biometric device data provides supplementary context but is not the primary measure.</p>
              <p>• Individual results may vary; percentages reflect group averages across all sessions.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
