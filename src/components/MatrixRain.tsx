import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]();:=><";
    const fontSize = isMobile ? 12 : 14;
    let columns: number;
    let drops: number[];

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      columns = Math.floor(canvas!.width / fontSize);
      drops = Array(columns).fill(1).map(() => Math.random() * -100);
    }

    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    function draw() {
      ctx!.fillStyle = "rgba(6, 10, 18, 0.08)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character is bright cyan
        ctx!.fillStyle = `hsla(185, 80%, 65%, ${0.9 - Math.random() * 0.3})`;
        ctx!.font = `${fontSize}px "JetBrains Mono", monospace`;
        ctx!.fillText(char, x, y);

        // Trail characters fade to darker cyan
        if (drops[i] > 1) {
          ctx!.fillStyle = `hsla(185, 80%, 45%, ${0.15})`;
          ctx!.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - fontSize);
        }

        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      aria-hidden="true"
    />
  );
}
