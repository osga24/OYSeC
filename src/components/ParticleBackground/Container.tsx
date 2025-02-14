'use client';
import React from 'react';
import ParticleCanvas from './Canvas';

interface ParticleBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`relative min-h-screen bg-black ${className}`}>
      <ParticleCanvas />
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParticleBackground;
