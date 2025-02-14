'use client';
import React from 'react'
import ParticleBackground from '../components/ParticleBackground/Container';
import FloatingImage from '@/components/FloatingImage';
import useTextAnimation from "@/utils/TextAnimation";

export default function Page() {
  const titleText = "OhYeahSeC";
  const titleRef = useTextAnimation(titleText);

  return (
    <ParticleBackground>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* 圖片區塊 */}
        <div className="md:mb-12 mb-8">
          <FloatingImage
            src="/OhYeahSeC.png"
            alt="OYSEC Logo"
            width={350}
            height={350}
          />
        </div>

        {/* 文字區塊 */}
        <div className="text-center">
          {/* Welcome 文字 */}
          <p className="text-2xl md:text-4xl mb-2 text-white font-mono tracking-wider">
            HI! We Are
          </p>

          {/* 標題文字 - 使用自定義動畫 */}
          <h1
            ref={titleRef}
            className="text-5xl md:text-8xl font-extrabold text-green-400 text-center pt-3 tracking-widest font-mono"
            style={{
              textShadow: '0 0 10px rgba(0, 255, 128, 0.5)'
            }}
          >
            {titleText}
          </h1>
        </div>
      </div>
    </ParticleBackground>
  );
}
