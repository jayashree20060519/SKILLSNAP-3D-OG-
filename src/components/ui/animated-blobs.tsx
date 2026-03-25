import { useEffect, useRef } from 'react';

export function AnimatedBlobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
      
      if (container) {
        container.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none transition-transform duration-1000 ease-out"
      style={{ zIndex: 0 }}
    >
      {/* Large purple blob */}
      <div 
        className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
          top: '10%',
          left: '10%',
          animationDelay: '0s',
        }}
      />
      
      {/* Medium blue blob */}
      <div 
        className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          top: '60%',
          right: '10%',
          animationDelay: '2s',
        }}
      />
      
      {/* Small pink blob */}
      <div 
        className="absolute w-72 h-72 rounded-full opacity-15 blur-3xl animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          bottom: '20%',
          left: '50%',
          animationDelay: '4s',
        }}
      />
      
      {/* Lavender blob */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-15 blur-3xl animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)',
          top: '40%',
          left: '30%',
          animationDelay: '6s',
        }}
      />
      
      {/* Cyan blob */}
      <div 
        className="absolute w-56 h-56 rounded-full opacity-15 blur-3xl animate-blob"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)',
          top: '70%',
          right: '40%',
          animationDelay: '8s',
        }}
      />
    </div>
  );
}
