"use client";

import { useEffect, useRef, useCallback } from 'react';

const useTextAnimation = (titleText: string) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const randomText = (amount: number) => {
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
    let text = '';
    for (let i = 0; i < amount; i++) {
      text += symbols[Math.floor(Math.random() * symbols.length)];
    }
    return text;
  };

  const animateTitle = useCallback(() => {
    if (!titleRef.current) return;

    const animationInterval = 7000;
    const characterDelay = 200;
    const randomDelay = 50;

    const intervalId = setInterval(() => {
      for (let j = 0; j <= titleText.length; j++) {
        window.setTimeout(() => {
          const current = j;
          for (let k = 0; k <= 5; k++) {
            window.setTimeout(() => {
              const correct = titleText.slice(0, current) + randomText(titleText.length - current);
              if (titleRef.current) {
                titleRef.current.innerText = correct;
              }
            }, randomDelay * k);
          }
        }, characterDelay * j);
      }
    }, animationInterval);

    // 清理函數
    return () => {
      clearInterval(intervalId);
    };
  }, [titleText]); // 只依賴 titleText

  useEffect(() => {
    animateTitle();
  }, [animateTitle]);

  return titleRef;
};

export default useTextAnimation;
