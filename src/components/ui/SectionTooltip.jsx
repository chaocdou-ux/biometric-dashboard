import { InfoIcon } from './tooltip';

export function SectionTooltip({ source, interval, significance }) {
  const tooltipContent = [
    source && `Source: ${source}`,
    interval && `Measured: ${interval}`,
    significance && `Significance: ${significance}`
  ].filter(Boolean).join(' | ');

  return (
    <InfoIcon tooltip={tooltipContent} className="ml-2" />
  );
}

export function SectionHeader({ title, source, interval, significance, children }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <h2 className="section-header mb-0">{title}</h2>
        {(source || interval || significance) && (
          <SectionTooltip
            source={source}
            interval={interval}
            significance={significance}
          />
        )}
      </div>
      {children}
    </div>
  );
}
