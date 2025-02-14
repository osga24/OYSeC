'use client';
import React, { useEffect, useRef } from 'react';

interface FloatingImageProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  src,
  alt,
  title,
  description,
  width = 300,
  height = 300
}) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!imageRef.current) return;

      const floatY = Math.sin(Date.now() / 2000) * 15;
      const floatX = Math.cos(Date.now() / 2500) * 10;
      const rotation = Math.cos(Date.now() / 3000) * 2;

      imageRef.current.style.transform = `
        translate(${floatX}px, ${floatY}px)
        rotate(${rotation}deg)
      `;

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div
        ref={imageRef}
        className="transition-transform duration-300 ease-out"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: '100%', // 確保圖片不會溢出容器
          height: 'auto'    // 保持圖片比例
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
      {(title || description) && (
        <div className="mt-8 text-green-400">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingImage;
