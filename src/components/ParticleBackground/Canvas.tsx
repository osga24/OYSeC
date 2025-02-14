'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const initParticles = () => {
      particles.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        alpha: Math.random() * 0.3 + 0.2
      }));
    };

    const updateParticles = () => {
      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;
      });
    };

	const drawParticles = () => {
	  ctx.clearRect(0, 0, width, height);

	  // 繪製粒子
	  particles.current.forEach(particle => {
		ctx.beginPath();
		ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(0, 255, 128, ${particle.alpha})`; // 使用更亮的綠色
		ctx.fill();
	  });

	  // 繪製連線
	  particles.current.forEach((p1, i) => {
		particles.current.slice(i + 1).forEach(p2 => {
		  const dx = p1.x - p2.x;
		  const dy = p1.y - p2.y;
		  const distance = Math.sqrt(dx * dx + dy * dy);

		  if (distance < 200) {
			ctx.beginPath();
			ctx.strokeStyle = `rgba(0, 255, 128, ${0.3 * (1 - distance / 200)})`; // 增加線條亮度
			ctx.lineWidth = 2; // 加粗線條
			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
		  }
		});
	  });
	};

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
    />
  );
};

export default ParticleCanvas;
