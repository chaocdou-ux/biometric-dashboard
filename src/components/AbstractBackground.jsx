export default function AbstractBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute"
        style={{
          top: '5%',
          right: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(255, 149, 0, 0.4) 0%, rgba(255, 107, 107, 0.25) 35%, rgba(196, 113, 237, 0.15) 65%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'float 15s ease-in-out infinite'
        }}
      />

      <div
        className="absolute"
        style={{
          top: '40%',
          left: '5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(100, 181, 246, 0.35) 0%, rgba(79, 195, 247, 0.25) 40%, rgba(129, 212, 250, 0.15) 70%, transparent 85%)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          animation: 'float 18s ease-in-out infinite 3s'
        }}
      />

      <div
        className="absolute"
        style={{
          bottom: '10%',
          right: '25%',
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(255, 183, 77, 0.38) 0%, rgba(255, 152, 0, 0.28) 45%, rgba(251, 192, 147, 0.18) 70%, transparent 85%)',
          borderRadius: '50%',
          filter: 'blur(85px)',
          animation: 'float 14s ease-in-out infinite 5s'
        }}
      />

      <div
        className="absolute"
        style={{
          top: '55%',
          right: '8%',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(186, 104, 200, 0.3) 0%, rgba(171, 71, 188, 0.2) 50%, rgba(206, 147, 216, 0.12) 75%, transparent 85%)',
          borderRadius: '50%',
          filter: 'blur(75px)',
          animation: 'float 16s ease-in-out infinite 2s'
        }}
      />

      <div
        className="absolute"
        style={{
          top: '20%',
          left: '45%',
          width: '420px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(149, 117, 205, 0.32) 0%, rgba(171, 71, 188, 0.22) 40%, rgba(186, 104, 200, 0.12) 70%, transparent 85%)',
          borderRadius: '50%',
          filter: 'blur(88px)',
          animation: 'float 20s ease-in-out infinite 7s'
        }}
      />

      <div
        className="absolute"
        style={{
          bottom: '25%',
          left: '30%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 138, 101, 0.28) 0%, rgba(255, 112, 67, 0.18) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(70px)',
          animation: 'float 17s ease-in-out infinite 4s'
        }}
      />
    </div>
  );
}
