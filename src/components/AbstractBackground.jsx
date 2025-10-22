export default function AbstractBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute"
        style={{
          top: '8%',
          right: '12%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, rgba(168, 85, 247, 0.15) 40%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'pulse 10s ease-in-out infinite'
        }}
      />

      <div
        className="absolute"
        style={{
          top: '35%',
          left: '8%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(59, 130, 246, 0.2) 45%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'pulse 12s ease-in-out infinite 2s'
        }}
      />

      <div
        className="absolute"
        style={{
          bottom: '15%',
          right: '20%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.25) 0%, rgba(249, 115, 22, 0.18) 50%, transparent 75%)',
          borderRadius: '50%',
          filter: 'blur(65px)',
          animation: 'pulse 9s ease-in-out infinite 4s'
        }}
      />

      <div
        className="absolute"
        style={{
          top: '50%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(244, 114, 182, 0.12) 60%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(45px)',
          animation: 'pulse 11s ease-in-out infinite 1s'
        }}
      />

      <svg
        className="absolute"
        style={{
          top: '15%',
          left: '20%',
          width: '180px',
          height: '180px',
          opacity: 0.4,
          animation: 'float 20s ease-in-out infinite'
        }}
        viewBox="0 0 180 180"
        fill="none"
      >
        <circle
          cx="90"
          cy="90"
          r="85"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
        <circle
          cx="90"
          cy="90"
          r="65"
          stroke="url(#gradient2)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute"
        style={{
          bottom: '20%',
          left: '15%',
          width: '220px',
          height: '220px',
          opacity: 0.35,
          animation: 'float 18s ease-in-out infinite 3s'
        }}
        viewBox="0 0 220 220"
        fill="none"
      >
        <circle
          cx="110"
          cy="110"
          r="105"
          stroke="url(#gradient3)"
          strokeWidth="4"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M 110 5 A 105 105 0 0 1 215 110"
          stroke="url(#gradient4)"
          strokeWidth="6"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute"
        style={{
          top: '40%',
          right: '35%',
          width: '150px',
          height: '150px',
          opacity: 0.3,
          animation: 'float 15s ease-in-out infinite 5s'
        }}
        viewBox="0 0 150 150"
        fill="none"
      >
        <circle
          cx="75"
          cy="75"
          r="70"
          stroke="url(#gradient5)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          strokeDasharray="10 5"
        />
        <defs>
          <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      <div
        className="absolute"
        style={{
          top: '25%',
          left: '45%',
          width: '4px',
          height: '4px',
          background: '#3B82F6',
          borderRadius: '50%',
          opacity: 0.6,
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
        }}
      />
      <div
        className="absolute"
        style={{
          top: '60%',
          left: '70%',
          width: '3px',
          height: '3px',
          background: '#8B5CF6',
          borderRadius: '50%',
          opacity: 0.5,
          boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)'
        }}
      />
      <div
        className="absolute"
        style={{
          top: '75%',
          left: '35%',
          width: '4px',
          height: '4px',
          background: '#06B6D4',
          borderRadius: '50%',
          opacity: 0.6,
          boxShadow: '0 0 18px rgba(6, 182, 212, 0.6)'
        }}
      />
    </div>
  );
}
