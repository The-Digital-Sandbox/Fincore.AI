'use client';

import { useRef, useCallback } from 'react';

export default function BrandPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadSVG = useCallback(() => {
    const link = document.createElement('a');
    link.href = '/fincore-logo.svg';
    link.download = 'fincore-logo.svg';
    link.click();
  }, []);

  const downloadPNG = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      ctx.drawImage(img, 0, 0, 1024, 1024);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'fincore-logo.png';
      link.click();
    };
    img.src = '/fincore-logo.svg';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-10 p-8">
      <h1 className="text-white text-3xl font-bold tracking-tight">Fincore Brand Asset</h1>

      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/fincore-logo.svg"
          alt="Fincore Logo"
          width={300}
          height={300}
          className="block"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={downloadSVG}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors backdrop-blur-sm border border-white/10 cursor-pointer"
        >
          Download SVG
        </button>
        <button
          onClick={downloadPNG}
          className="px-6 py-3 bg-gradient-to-r from-[#3CB8F0] to-[#0A6FE8] hover:brightness-110 text-white rounded-xl font-medium transition-colors cursor-pointer"
        >
          Download PNG
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
