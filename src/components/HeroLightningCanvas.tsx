import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface HeroLightningCanvasProps {
  charElements: (HTMLSpanElement | null)[];
  heroElements?: (HTMLElement | null)[];
  isScrolled: boolean;
}

export const HeroLightningCanvas: React.FC<HeroLightningCanvasProps> = ({
  charElements,
  heroElements = [],
  isScrolled,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const charElsRef = useRef<(HTMLSpanElement | null)[]>(charElements);
  const heroElsRef = useRef<(HTMLElement | null)[]>(heroElements);
  const isScrolledRef = useRef<boolean>(isScrolled);

  charElsRef.current = charElements;
  heroElsRef.current = heroElements;
  isScrolledRef.current = isScrolled;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Physics parameters for fireball cursor with inertia/lag
    let userMovedMouse = false;
    const mouse = { x: width * 0.15, y: height * 0.46 };
    const target = { x: width * 0.15, y: height * 0.46 };
    const head: Point = { x: width * 0.12, y: height * 0.46 };
    const velocity = { x: 0, y: 0 };

    // Fire trail segments
    const trailLength = 28;
    const trail: Point[] = [];
    for (let i = 0; i < trailLength; i++) {
      trail.push({ x: head.x, y: head.y });
    }

    // Embers / sparks
    const embers: Ember[] = [];
    const maxEmbers = 24;

    const handleMouseMove = (e: MouseEvent) => {
      userMovedMouse = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        userMovedMouse = true;
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let startTime: number | null = null;
    let branchActive = false;
    let branchPoints: Point[] = [];
    let branchTimer = 0;

    // Smoothed illumination values per character and supporting element
    const charIllums: number[] = new Array(15).fill(0);
    const heroIllums: number[] = new Array(8).fill(0);

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      ctx.clearRect(0, 0, width, height);

      // PHASE 1: Complete darkness for the first 0.25s
      if (elapsed < 0.25) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Movement logic
      if (!userMovedMouse) {
        // Initial autonomous sweep across name, role, and signature
        const sweepDuration = 3.8;
        const progress = Math.min(1, Math.max(0, (elapsed - 0.25) / sweepDuration));
        const sweepX = width * 0.15 + progress * (width * 0.7);
        const wave =
          Math.sin(progress * Math.PI * 2.5) * 36 +
          Math.cos(progress * Math.PI * 3.8) * 16;
        target.x = sweepX;
        target.y = height * 0.46 + wave;
      } else {
        target.x = mouse.x;
        target.y = mouse.y;
      }

      // Smooth inertia & damping
      const lag = 0.044; // Organic delayed follow
      const dx = target.x - head.x;
      const dy = target.y - head.y;
      velocity.x += dx * 0.022;
      velocity.y += dy * 0.022;
      velocity.x *= 0.76;
      velocity.y *= 0.76;

      head.x += velocity.x + dx * lag;
      head.y += velocity.y + dy * lag;

      // Update trail
      trail.unshift({ x: head.x, y: head.y });
      if (trail.length > trailLength) {
        trail.pop();
      }

      // Spawn burning embers from head
      if (Math.random() < 0.45 && embers.length < maxEmbers) {
        const emberLife = 0.4 + Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.8;
        const colors = [
          "rgba(255, 140, 50,",
          "rgba(220, 50, 65,",
          "rgba(175, 25, 45,",
          "rgba(255, 180, 80,",
        ];
        embers.push({
          x: head.x + (Math.random() - 0.5) * 8,
          y: head.y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed - 0.2,
          vy: Math.sin(angle) * speed - 0.8, // drifts upward
          size: 1 + Math.random() * 1.8,
          alpha: 1,
          life: 0,
          maxLife: emberLife,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Dynamic Proximity Illumination for Name Characters
      const charEls = charElsRef.current;
      const isScrolledNow = isScrolledRef.current;

      if (charEls && charEls.length > 0) {
        charEls.forEach((el, i) => {
          if (!el) return;
          if (isScrolledNow) {
            el.style.setProperty("--illum", "1");
            return;
          }

          const rect = el.getBoundingClientRect();
          const charCx = rect.left + rect.width / 2;
          const charCy = rect.top + rect.height / 2;

          const distHead = Math.hypot(head.x - charCx, head.y - charCy);

          let minTrailDist = 9999;
          for (let t = 0; t < Math.min(trail.length, 8); t++) {
            const d = Math.hypot(trail[t].x - charCx, trail[t].y - charCy);
            if (d < minTrailDist) minTrailDist = d;
          }

          const effectiveDist = Math.min(distHead, minTrailDist + 15);
          const lightRadius = 185;

          let targetIllum = 0;
          if (effectiveDist < lightRadius) {
            targetIllum = Math.pow(1 - effectiveDist / lightRadius, 1.4);
          }

          if (charIllums[i] === undefined) charIllums[i] = 0;
          charIllums[i] += (targetIllum - charIllums[i]) * 0.22;
          el.style.setProperty("--illum", charIllums[i].toFixed(3));
        });
      }

      // Dynamic Proximity Illumination for Supporting Elements (Role, Pillars, Signature)
      const heroEls = heroElsRef.current;
      if (heroEls && heroEls.length > 0) {
        heroEls.forEach((el, i) => {
          if (!el) return;
          if (isScrolledNow) {
            el.style.setProperty("--illum", "1");
            return;
          }

          const rect = el.getBoundingClientRect();
          // Closest point on element rect to fireball head
          const clampX = Math.max(rect.left, Math.min(head.x, rect.right));
          const clampY = Math.max(rect.top, Math.min(head.y, rect.bottom));
          const distHead = Math.hypot(head.x - clampX, head.y - clampY);

          // Distance to trail
          let minTrailDist = 9999;
          for (let t = 0; t < Math.min(trail.length, 6); t++) {
            const tx = Math.max(rect.left, Math.min(trail[t].x, rect.right));
            const ty = Math.max(rect.top, Math.min(trail[t].y, rect.bottom));
            const d = Math.hypot(trail[t].x - tx, trail[t].y - ty);
            if (d < minTrailDist) minTrailDist = d;
          }

          const effectiveDist = Math.min(distHead, minTrailDist + 10);
          const blockRadius = 170;

          let targetIllum = 0;
          if (effectiveDist < blockRadius) {
            targetIllum = Math.pow(1 - effectiveDist / blockRadius, 1.3);
          }

          if (heroIllums[i] === undefined) heroIllums[i] = 0;
          heroIllums[i] += (targetIllum - heroIllums[i]) * 0.2;
          el.style.setProperty("--illum", heroIllums[i].toFixed(3));
        });
      }

      // --- RENDERING CANVAS VISUALS ---

      // 1. Broad Soft Atmospheric Aura (Hot burgundy falloff)
      ctx.save();
      const auraGrad = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        190
      );
      auraGrad.addColorStop(0, "rgba(175, 25, 45, 0.42)");
      auraGrad.addColorStop(0.3, "rgba(120, 15, 30, 0.24)");
      auraGrad.addColorStop(0.65, "rgba(65, 8, 18, 0.08)");
      auraGrad.addColorStop(1, "rgba(7, 6, 7, 0)");

      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 190, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Burning Fire & Lightning Trail
      // 2A. Soft fiery trail halo
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const jx = Math.sin(elapsed * 16 + i * 0.7) * 2.5;
        const jy = Math.cos(elapsed * 14 + i * 0.8) * 2.5;
        if (i === 0) ctx.moveTo(pt.x + jx, pt.y + jy);
        else ctx.lineTo(pt.x + jx, pt.y + jy);
      }
      ctx.strokeStyle = "rgba(130, 18, 35, 0.38)";
      ctx.lineWidth = 9;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(160, 20, 42, 0.7)";
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // 2B. Core electrical burning filament
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const progressAlong = 1 - i / trail.length;
        const freq = 22;
        const noise =
          (Math.sin(elapsed * freq + i * 1.3) +
            Math.cos(elapsed * (freq * 1.2) + i * 1.6)) *
          (1.6 * progressAlong);
        const x = pt.x + noise;
        const y = pt.y + noise;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(220, 48, 68, 0.95)";
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = "rgba(180, 30, 50, 0.85)";
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.restore();

      // 2C. Occasional fiery branching tendril
      branchTimer++;
      if (branchTimer > 18 && Math.random() < 0.28) {
        branchActive = true;
        branchTimer = 0;
        const startIdx = Math.floor(Math.random() * 6);
        const basePt = trail[startIdx] || head;
        branchPoints = [basePt];
        const angle =
          Math.atan2(velocity.y, velocity.x) +
          (Math.random() - 0.5) * (Math.PI / 1.8);
        const branchLen = 14 + Math.random() * 12;
        branchPoints.push({
          x: basePt.x + Math.cos(angle) * (branchLen * 0.5),
          y: basePt.y + Math.sin(angle) * (branchLen * 0.5),
        });
        branchPoints.push({
          x: basePt.x + Math.cos(angle) * branchLen,
          y: basePt.y + Math.sin(angle) * branchLen,
        });
      }

      if (branchActive && branchPoints.length >= 3) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(branchPoints[0].x, branchPoints[0].y);
        ctx.lineTo(branchPoints[1].x, branchPoints[1].y);
        ctx.lineTo(branchPoints[2].x, branchPoints[2].y);
        ctx.strokeStyle = "rgba(175, 25, 45, 0.75)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
        if (Math.random() < 0.45) branchActive = false;
      }

      // 3. Fireball Head (Burning Core + Organic Flicker)
      ctx.save();
      const flicker1 = Math.sin(elapsed * 26) * 1.6 + Math.cos(elapsed * 19) * 1.2;
      const flicker2 = Math.cos(elapsed * 22) * 1.5;

      const fireGrad = ctx.createRadialGradient(
        head.x + flicker1 * 0.4,
        head.y + flicker2 * 0.4,
        1,
        head.x,
        head.y,
        34
      );
      fireGrad.addColorStop(0, "rgba(255, 140, 50, 0.95)"); // Warm amber core
      fireGrad.addColorStop(0.35, "rgba(210, 38, 55, 0.85)"); // Vibrant burgundy
      fireGrad.addColorStop(0.7, "rgba(130, 15, 30, 0.4)"); // Deep wine burgundy
      fireGrad.addColorStop(1, "rgba(7, 6, 7, 0)");

      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 34 + flicker1, 0, Math.PI * 2);
      ctx.fill();

      // Fiery inner ember
      ctx.beginPath();
      ctx.arc(head.x + flicker1 * 0.3, head.y + flicker2 * 0.3, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 200, 120, 0.95)";
      ctx.shadowColor = "rgba(255, 110, 40, 0.9)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();

      // 4. Embers / Floating Sparks
      for (let i = embers.length - 1; i >= 0; i--) {
        const ember = embers[i];
        ember.life += 0.016;
        if (ember.life >= ember.maxLife) {
          embers.splice(i, 1);
          continue;
        }
        ember.x += ember.vx;
        ember.y += ember.vy;
        ember.vx *= 0.97;
        ember.vy *= 0.97;
        const progress = ember.life / ember.maxLife;
        const alpha = (1 - progress) * 0.9;

        ctx.save();
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size * (1 - progress * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color}${alpha.toFixed(2)})`;
        ctx.shadowColor = "rgba(255, 120, 50, 0.8)";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-lightning-canvas"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 4,
      }}
    />
  );
};

export default HeroLightningCanvas;
