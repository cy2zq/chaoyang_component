import React, { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export interface ImageItem {
  src: string;
  alt?: string;
}

/** 自定义轮播特效（codeRain 与 matrixRain 相同） */
export type CustomCarouselEffect =
  | 'timeSlice'
  | 'ripple'
  | 'matrixRain'
  | 'codeRain'
  | 'pixelRain'
  | 'albumScroll'
  | 'ringGallery';

export interface CustomCarouselProps {
  effect: CustomCarouselEffect;
  images: ImageItem[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  height?: string | number;
  dots?: boolean;
  navButtons?: boolean;
  afterChange?: (current: number) => void;
  style?: React.CSSProperties;
}

const SLICE_COUNT = 12;
const TIME_SLICE_DURATION = 1200;
const RIPPLE_DURATION = 2200;
const MATRIX_DURATION = 3000;
const PIXEL_RAIN_DURATION = 2200;

const MATRIX_CHARS =
  '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]|/\\=+*@#$%';
const CHAR_SIZE = 14;
const PIXEL_SIZE = 6;

const CustomCarousel: FC<CustomCarouselProps> = ({
  effect,
  images,
  autoplay = true,
  autoplaySpeed = 4000,
  height = 400,
  dots = true,
  navButtons = true,
  afterChange,
  style,
}) => {
  const eff =
    effect === 'codeRain'
      ? 'matrixRain'
      : (effect as
          | 'timeSlice'
          | 'ripple'
          | 'matrixRain'
          | 'pixelRain'
          | 'albumScroll'
          | 'ringGallery');

  const [currentIndex, setCurrentIndex] = useState(0);
  const indexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const sliceLayerRef = useRef<HTMLDivElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const displayImagesRef = useRef<(HTMLImageElement | HTMLCanvasElement)[]>([]);
  const corsImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Ring gallery: accumulated rotation to keep continuous spin direction
  const ringAccumRef = useRef(0);
  const [ringAccum, setRingAccum] = useState(0);

  const usesCanvas =
    eff === 'ripple' || eff === 'matrixRain' || eff === 'pixelRain';

  const albumColumnCount = 5;
  const albumImagesPerColumn = useMemo(
    () => Math.max(8, Math.min(12, Math.max(images.length, 8))),
    [images.length],
  );

  // Ring gallery: auto-fill to ≥6 cards so multiple cards are always visible
  const RING_FILL = 6;
  const ringDisplayImages = useMemo<ImageItem[]>(() => {
    if (eff !== 'ringGallery' || images.length === 0) return images;
    if (images.length >= RING_FILL) return images;
    const filled: ImageItem[] = [];
    while (filled.length < RING_FILL) filled.push(...images);
    return filled.slice(0, RING_FILL);
  }, [eff, images]);

  const ringCardW = 200;
  const ringN = eff === 'ringGallery' ? ringDisplayImages.length : images.length;
  const ringAngleDeg = ringN >= 2 ? 360 / ringN : 0;
  const ringTranslateZ = useMemo(() => {
    if (ringN < 2) return 0;
    // Negative: ring recedes into screen (matches original HTML)
    if (ringN === 2) return -(ringCardW * 1.1);
    return -((ringCardW / 2 + 8) / Math.tan(Math.PI / ringN));
  }, [ringN]);

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  const drawCoverToCtx = useCallback(
    (
      img: HTMLImageElement | HTMLCanvasElement,
      targetCtx: CanvasRenderingContext2D,
      w: number,
      h: number,
    ) => {
      const imgW =
        (img as HTMLImageElement).naturalWidth || (img as HTMLCanvasElement).width;
      const imgH =
        (img as HTMLImageElement).naturalHeight || (img as HTMLCanvasElement).height;
      if (!imgW || !imgH || !w || !h) return;
      const iR = imgW / imgH;
      const cR = w / h;
      let sx: number, sy: number, sw: number, sh: number;
      if (iR > cR) {
        sh = imgH; sw = sh * cR; sx = (imgW - sw) / 2; sy = 0;
      } else {
        sw = imgW; sh = sw / cR; sx = 0; sy = (imgH - sh) / 2;
      }
      targetCtx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    },
    [],
  );

  const drawImageCover = useCallback(
    (img: HTMLImageElement | HTMLCanvasElement) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      if (!cw || !ch) return;
      drawCoverToCtx(img, ctx, cw, ch);
    },
    [drawCoverToCtx],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctxRef.current = ctx;
    const current = displayImagesRef.current[indexRef.current];
    if (!isTransitioningRef.current && current) drawImageCover(current);
  }, [drawImageCover]);

  const pixelRippleTransition = useCallback(
    (
      fromCors: HTMLImageElement,
      toCors: HTMLImageElement,
      fromDisplay: HTMLImageElement | HTMLCanvasElement,
      toDisplay: HTMLImageElement | HTMLCanvasElement,
      onComplete: () => void,
    ) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) {
        onComplete();
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const pw = Math.max(1, Math.floor(cw));
      const ph = Math.max(1, Math.floor(ch));

      const centerX = pw * (0.3 + Math.random() * 0.4);
      const centerY = ph * (0.3 + Math.random() * 0.4);
      const maxDist = Math.sqrt(
        Math.max(centerX, pw - centerX) ** 2 + Math.max(centerY, ph - centerY) ** 2,
      );

      const makeOffscreen = (src: HTMLImageElement) => {
        const oc = document.createElement('canvas');
        oc.width = pw; oc.height = ph;
        const octx = oc.getContext('2d')!;
        drawCoverToCtx(src, octx, pw, ph);
        return octx.getImageData(0, 0, pw, ph);
      };

      let fromData: ImageData;
      let toData: ImageData;
      try {
        fromData = makeOffscreen(fromCors);
        toData = makeOffscreen(toCors);
      } catch {
        clipRippleTransition(fromDisplay, toDisplay, onComplete);
        return;
      }

      const outputCanvas = document.createElement('canvas');
      outputCanvas.width = pw; outputCanvas.height = ph;
      const outputCtx = outputCanvas.getContext('2d')!;
      const outputData = outputCtx.createImageData(pw, ph);

      const startTime = performance.now();
      const waveCount = 3;
      const waveWidth = 60;
      const waveAmplitude = 20;
      const step = 2;

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / RIPPLE_DURATION, 1);
        const eased =
          progress < 0.5 ? 4 * progress ** 3 : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const waveFront = eased * (maxDist + waveWidth * waveCount);
        const out = outputData.data;

        for (let y = 0; y < ph; y += step) {
          for (let x = 0; x < pw; x += step) {
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const relDist = waveFront - dist;

            let srcX = x, srcY = y;
            let useNew = false;

            if (relDist > waveWidth * waveCount) {
              useNew = true;
            } else if (relDist > 0) {
              const phase = (relDist / waveWidth) * Math.PI * 2;
              const amp =
                waveAmplitude *
                Math.sin(phase) *
                Math.exp((-relDist / (waveWidth * waveCount)) * 2);
              const angle = Math.atan2(dy, dx);
              srcX = x + Math.cos(angle) * amp;
              srcY = y + Math.sin(angle) * amp;
              useNew = relDist > waveWidth;
            }

            srcX = Math.max(0, Math.min(pw - 1, Math.round(srcX)));
            srcY = Math.max(0, Math.min(ph - 1, Math.round(srcY)));
            const srcIdx = (srcY * pw + srcX) * 4;
            const srcData = useNew ? toData : fromData;

            for (let dy2 = 0; dy2 < step && y + dy2 < ph; dy2++) {
              for (let dx2 = 0; dx2 < step && x + dx2 < pw; dx2++) {
                const outIdx = ((y + dy2) * pw + (x + dx2)) * 4;
                out[outIdx] = srcData.data[srcIdx];
                out[outIdx + 1] = srcData.data[srcIdx + 1];
                out[outIdx + 2] = srcData.data[srcIdx + 2];
                out[outIdx + 3] = 255;
              }
            }
          }
        }

        outputCtx.putImageData(outputData, 0, 0);
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(outputCanvas, 0, 0, cw, ch);

        if (progress > 0.02 && progress < 0.95) {
          ctx.save();
          ctx.globalAlpha = 0.28 * (1 - Math.abs(progress - 0.4));
          for (let w = 0; w < waveCount; w++) {
            const rd = waveFront - w * waveWidth;
            if (rd > 0 && rd < maxDist) {
              ctx.beginPath();
              ctx.arc(centerX, centerY, rd, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(150, 200, 255, ${0.35 - w * 0.1})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
          ctx.restore();
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, cw, ch);
          drawImageCover(toDisplay);
          onComplete();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [drawCoverToCtx, drawImageCover],
  );

  const clipRippleTransition = useCallback(
    (
      fromImg: HTMLImageElement | HTMLCanvasElement,
      toImg: HTMLImageElement | HTMLCanvasElement,
      onComplete: () => void,
    ) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) {
        onComplete();
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const centerX = cw * (0.25 + Math.random() * 0.5);
      const centerY = ch * (0.25 + Math.random() * 0.5);
      const maxDist = Math.sqrt(
        Math.max(centerX, cw - centerX) ** 2 + Math.max(centerY, ch - centerY) ** 2,
      );

      const startTime = performance.now();
      const waveCount = 4;
      const waveSpacing = 32;
      const edgeSoft = 40;

      const offCanvas = document.createElement('canvas');
      offCanvas.width = Math.floor(cw);
      offCanvas.height = Math.floor(ch);
      const offCtx = offCanvas.getContext('2d')!;

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / RIPPLE_DURATION, 1);
        const eased =
          progress < 0.5 ? 4 * progress ** 3 : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const frontRadius = eased * (maxDist + waveSpacing * waveCount);
        const revealRadius = Math.max(0, frontRadius - waveSpacing * waveCount);

        ctx.clearRect(0, 0, cw, ch);
        drawImageCover(fromImg);

        if (revealRadius > 1) {
          offCtx.clearRect(0, 0, cw, ch);
          offCtx.globalCompositeOperation = 'source-over';
          drawCoverToCtx(toImg, offCtx, cw, ch);

          offCtx.globalCompositeOperation = 'destination-in';
          const grad = offCtx.createRadialGradient(
            centerX, centerY, Math.max(0, revealRadius - edgeSoft),
            centerX, centerY, revealRadius + edgeSoft * 0.5,
          );
          grad.addColorStop(0, 'rgba(0,0,0,1)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          offCtx.beginPath();
          offCtx.arc(centerX, centerY, revealRadius + edgeSoft * 0.5, 0, Math.PI * 2);
          offCtx.fillStyle = grad;
          offCtx.fill();
          offCtx.globalCompositeOperation = 'source-over';

          ctx.drawImage(offCanvas, 0, 0);
        }

        const ringAlpha = Math.sin(Math.PI * Math.min(progress * 1.1, 1));
        for (let i = 0; i < waveCount; i++) {
          const ringR = frontRadius - i * waveSpacing;
          if (ringR > 0 && ringR < maxDist + waveSpacing * 2) {
            ctx.save();
            ctx.globalAlpha = ringAlpha * (0.5 - i * 0.1);
            ctx.beginPath();
            ctx.arc(centerX, centerY, ringR, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(120, 190, 255, 1)';
            ctx.lineWidth = 2.5 - i * 0.4;
            ctx.stroke();
            ctx.restore();
          }
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, cw, ch);
          drawImageCover(toImg);
          onComplete();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [drawCoverToCtx, drawImageCover],
  );

  const matrixTransition = useCallback(
    (
      fromImg: HTMLImageElement | HTMLCanvasElement,
      toImg: HTMLImageElement | HTMLCanvasElement,
      onComplete: () => void,
    ) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) {
        onComplete();
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;
      const pw = Math.floor(cw);
      const ph = Math.floor(ch);
      const cols = Math.ceil(pw / CHAR_SIZE);
      const rows = Math.ceil(ph / CHAR_SIZE);

      const sampleCanvas = document.createElement('canvas');
      sampleCanvas.width = pw;
      sampleCanvas.height = ph;
      const sampleCtx = sampleCanvas.getContext('2d')!;
      drawCoverToCtx(toImg, sampleCtx, pw, ph);
      let sampleData: ImageData;
      let sampleOk = true;
      try {
        sampleData = sampleCtx.getImageData(0, 0, pw, ph);
      } catch {
        sampleOk = false;
        sampleData = sampleCtx.createImageData(pw, ph);
      }

      const fromCanvas = document.createElement('canvas');
      fromCanvas.width = canvas.width;
      fromCanvas.height = canvas.height;
      const fromCtx = fromCanvas.getContext('2d')!;
      fromCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCoverToCtx(fromImg, fromCtx, cw, ch);

      const toCanvas = document.createElement('canvas');
      toCanvas.width = canvas.width;
      toCanvas.height = canvas.height;
      const toCtx = toCanvas.getContext('2d')!;
      toCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCoverToCtx(toImg, toCtx, cw, ch);

      type Col = {
        head: number;
        speed: number;
        trailLength: number;
        chars: string[];
        revealed: boolean[];
      };
      const columns: Col[] = [];
      for (let col = 0; col < cols; col++) {
        const trailLen = 15 + Math.floor(Math.random() * 5);
        const column: Col = {
          head: -Math.floor(Math.random() * rows * 1.5),
          speed: 0.3 + Math.random() * 0.5,
          trailLength: trailLen,
          chars: [],
          revealed: new Array(rows).fill(false),
        };
        for (let row = 0; row < rows; row++) {
          column.chars.push(
            MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]!,
          );
        }
        columns.push(column);
      }

      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / MATRIX_DURATION, 1);

        ctx.clearRect(0, 0, cw, ch);

        if (progress < 0.5) {
          ctx.globalAlpha = 1 - progress * 2;
          ctx.drawImage(fromCanvas, 0, 0, cw, ch);
          ctx.globalAlpha = 1;
        }

        for (let col = 0; col < cols; col++) {
          const column = columns[col]!;
          for (let row = 0; row < rows; row++) {
            if (column.revealed[row]) {
              const x = col * CHAR_SIZE;
              const y = row * CHAR_SIZE;
              ctx.drawImage(
                toCanvas,
                x * dpr,
                y * dpr,
                CHAR_SIZE * dpr,
                CHAR_SIZE * dpr,
                x,
                y,
                CHAR_SIZE,
                CHAR_SIZE,
              );
            }
          }
        }

        ctx.font = `${CHAR_SIZE}px monospace`;
        ctx.textBaseline = 'top';

        for (let col = 0; col < cols; col++) {
          const column = columns[col]!;
          column.head += column.speed;
          const headRow = Math.floor(column.head);
          const trailLength = column.trailLength;

          for (let i = 0; i < trailLength; i++) {
            const row = headRow - i;
            if (row < 0 || row >= rows) continue;

            const x = col * CHAR_SIZE;
            const y = row * CHAR_SIZE;

            if (Math.random() < 0.05) {
              column.chars[row] =
                MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]!;
            }

            const brightness = i === 0 ? 1.0 : Math.max(0, 1 - i / trailLength);

            if (i === 0) {
              ctx.fillStyle = `rgba(200, 255, 200, ${brightness})`;
            } else if (i < 3) {
              ctx.fillStyle = `rgba(0, 255, 70, ${brightness * 0.9})`;
            } else if (sampleOk) {
              const sx = Math.min(Math.floor(x + CHAR_SIZE / 2), pw - 1);
              const sy = Math.min(Math.floor(y + CHAR_SIZE / 2), ph - 1);
              const idx = (sy * pw + sx) * 4;
              const r = sampleData.data[idx] ?? 0;
              const g = sampleData.data[idx + 1] ?? 0;
              const b = sampleData.data[idx + 2] ?? 0;
              const mix = Math.min(1, i / trailLength + 0.3);
              const mr = Math.floor(r * (1 - mix));
              const mg = Math.floor(g * (1 - mix) + 255 * mix);
              const mb = Math.floor(b * (1 - mix) + 70 * mix);
              ctx.fillStyle = `rgba(${mr}, ${mg}, ${mb}, ${brightness * 0.7})`;
            } else {
              ctx.fillStyle = `rgba(0, 255, 70, ${brightness * 0.7})`;
            }

            ctx.fillText(column.chars[row]!, x, y);
          }

          const revealRow = headRow - trailLength - 3;
          if (revealRow >= 0 && revealRow < rows) {
            column.revealed[revealRow] = true;
          }
        }

        let allRevealed = true;
        if (progress > 0.7) {
          outer: for (let c = 0; c < cols; c++) {
            for (let row = 0; row < rows; row++) {
              if (!columns[c]!.revealed[row]) {
                allRevealed = false;
                break outer;
              }
            }
          }
        } else {
          allRevealed = false;
        }

        if (progress < 1 && !allRevealed) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, cw, ch);
          drawImageCover(toImg);
          onComplete();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [drawCoverToCtx, drawImageCover],
  );

  const pixelRainTransition = useCallback(
    (
      fromImg: HTMLImageElement | HTMLCanvasElement,
      toImg: HTMLImageElement | HTMLCanvasElement,
      onComplete: () => void,
    ) => {
      const canvas = canvasRef.current;
      const ctx = ctxRef.current;
      if (!canvas || !ctx) {
        onComplete();
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      const offscreen = document.createElement('canvas');
      offscreen.width = Math.floor(cw);
      offscreen.height = Math.floor(ch);
      const offCtx = offscreen.getContext('2d')!;
      drawCoverToCtx(fromImg, offCtx, cw, ch);

      let fromPixels: ImageData;
      try {
        fromPixels = offCtx.getImageData(0, 0, Math.floor(cw), Math.floor(ch));
      } catch {
        clipRippleTransition(fromImg, toImg, onComplete);
        return;
      }

      const cols = Math.ceil(cw / PIXEL_SIZE);
      const rows = Math.ceil(ch / PIXEL_SIZE);
      const columnConfigs: { delay: number; speed: number; trail: number }[] = [];
      for (let col = 0; col < cols; col++) {
        const centerDist = Math.abs(col - cols / 2) / (cols / 2);
        columnConfigs.push({
          delay: centerDist * 0.3 + Math.random() * 0.15,
          speed: 0.8 + Math.random() * 0.6,
          trail: 3 + Math.floor(Math.random() * 5),
        });
      }

      const pixelStates: {
        r: number; g: number; b: number; fallen: boolean; y: number; vy: number; opacity: number;
      }[][] = [];
      const fw = Math.floor(cw);
      const fh = Math.floor(ch);
      for (let row = 0; row < rows; row++) {
        pixelStates[row] = [];
        for (let col = 0; col < cols; col++) {
          const sx = Math.min(col * PIXEL_SIZE + PIXEL_SIZE / 2, fw - 1);
          const sy = Math.min(row * PIXEL_SIZE + PIXEL_SIZE / 2, fh - 1);
          const idx = (Math.floor(sy) * fw + Math.floor(sx)) * 4;
          pixelStates[row]![col] = {
            r: fromPixels.data[idx] ?? 0,
            g: fromPixels.data[idx + 1] ?? 0,
            b: fromPixels.data[idx + 2] ?? 0,
            fallen: false,
            y: row * PIXEL_SIZE,
            vy: 0,
            opacity: 1,
          };
        }
      }

      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / PIXEL_RAIN_DURATION, 1);
        ctx.clearRect(0, 0, cw, ch);
        ctx.globalAlpha = Math.min(1, progress * 2);
        drawImageCover(toImg);
        ctx.globalAlpha = 1;

        let allFallen = true;
        for (let col = 0; col < cols; col++) {
          const config = columnConfigs[col]!;
          const colProgress = Math.max(0, (progress - config.delay) / (1 - config.delay));
          const dissolveFront = colProgress * (rows + config.trail);

          for (let row = 0; row < rows; row++) {
            const pixel = pixelStates[row]![col]!;
            if (row < dissolveFront && !pixel.fallen) {
              pixel.fallen = true;
              pixel.vy = config.speed * 2;
            }
            if (pixel.fallen) {
              pixel.vy += 0.35 * config.speed;
              pixel.y += pixel.vy;
              const fallDist = pixel.y - row * PIXEL_SIZE;
              pixel.opacity = Math.max(0, 1 - fallDist / (ch * 0.7));
              if (pixel.y < ch + PIXEL_SIZE && pixel.opacity > 0.01) {
                allFallen = false;
                ctx.globalAlpha = pixel.opacity;
                ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
                ctx.fillRect(col * PIXEL_SIZE, pixel.y, PIXEL_SIZE - 0.5, PIXEL_SIZE - 0.5);
                if (pixel.opacity > 0.3 && pixel.vy > 3) {
                  const trailAlpha = pixel.opacity * 0.2;
                  ctx.globalAlpha = trailAlpha;
                  ctx.fillStyle = `rgb(${Math.min(255, pixel.r + 80)}, ${Math.min(255, pixel.g + 80)}, ${Math.min(255, pixel.b + 80)})`;
                  for (let t = 1; t <= 2; t++) {
                    ctx.fillRect(
                      col * PIXEL_SIZE,
                      pixel.y - t * PIXEL_SIZE * 0.8,
                      PIXEL_SIZE - 0.5,
                      PIXEL_SIZE - 0.5,
                    );
                  }
                }
              }
            } else {
              allFallen = false;
              ctx.globalAlpha = 1;
              ctx.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
              ctx.fillRect(col * PIXEL_SIZE, pixel.y, PIXEL_SIZE - 0.5, PIXEL_SIZE - 0.5);
            }
          }
        }

        ctx.globalAlpha = 1;

        if (progress < 1 || !allFallen) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, cw, ch);
          drawImageCover(toImg);
          onComplete();
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [drawCoverToCtx, drawImageCover, clipRippleTransition],
  );

  const createSlices = useCallback(
    (imageSrc: string, containerHeight: number) => {
      const sliceLayer = sliceLayerRef.current;
      if (!sliceLayer) return;
      sliceLayer.innerHTML = '';
      const sliceHeight = containerHeight / SLICE_COUNT;
      for (let i = 0; i < SLICE_COUNT; i++) {
        const slice = document.createElement('div');
        slice.className = 'cy-slice';
        slice.style.top = `${i * sliceHeight}px`;
        slice.style.height = `${sliceHeight + 1}px`;
        const img = document.createElement('img');
        img.src = imageSrc;
        img.style.top = `-${i * sliceHeight}px`;
        img.style.height = `${containerHeight}px`;
        slice.appendChild(img);
        sliceLayer.appendChild(slice);
      }
    },
    [],
  );

  const timeSliceTransition = useCallback(
    (
      fromIndex: number,
      toIndex: number,
      direction: 'next' | 'prev',
      onComplete: () => void,
    ) => {
      const carousel = carouselRef.current;
      const sliceLayer = sliceLayerRef.current;
      const scanline = scanlineRef.current;
      const baseImg = baseImgRef.current;
      if (!carousel || !sliceLayer || !scanline || !baseImg) {
        onComplete();
        return;
      }

      const containerHeight = carousel.offsetHeight;
      createSlices(images[fromIndex]!.src, containerHeight);
      baseImg.src = images[toIndex]!.src;
      baseImg.alt = images[toIndex]!.alt || '';

      scanline.classList.remove('active');
      void scanline.offsetWidth;
      scanline.classList.add('active');

      const slices = sliceLayer.querySelectorAll<HTMLDivElement>('.cy-slice');
      const staggerDelay = TIME_SLICE_DURATION / (SLICE_COUNT * 1.5);

      slices.forEach((slice, i) => {
        const delay = i * staggerDelay;
        const xDirection = (i % 2 === 0 ? 1 : -1) * (direction === 'next' ? 1 : -1);
        const translateX = xDirection * (120 + Math.random() * 80);
        const rotation = xDirection * (5 + Math.random() * 15);
        const skewX = xDirection * (3 + Math.random() * 7);
        window.setTimeout(() => {
          slice.style.transition =
            'transform 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), opacity 0.5s ease-out';
          slice.style.transform = `translateX(${translateX}%) rotate(${rotation}deg) skewX(${skewX}deg)`;
          slice.style.opacity = '0';
        }, delay);
      });

      window.setTimeout(() => {
        if (sliceLayerRef.current) sliceLayerRef.current.innerHTML = '';
        scanlineRef.current?.classList.remove('active');
        onComplete();
      }, TIME_SLICE_DURATION + 200);
    },
    [createSlices, images],
  );

  const createPlaceholder = useCallback((index: number, alt?: string) => {
    const placeholder = document.createElement('canvas');
    placeholder.width = 1920;
    placeholder.height = 1080;
    const pCtx = placeholder.getContext('2d');
    if (!pCtx) return placeholder;
    const gradient = pCtx.createLinearGradient(0, 0, 1920, 1080);
    gradient.addColorStop(0, `hsl(${200 + index * 20}, 60%, 20%)`);
    gradient.addColorStop(1, `hsl(${200 + index * 20}, 60%, 10%)`);
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 1920, 1080);
    if (alt) {
      pCtx.fillStyle = '#fff';
      pCtx.font = '48px sans-serif';
      pCtx.textAlign = 'center';
      pCtx.fillText(alt, 960, 540);
    }
    return placeholder;
  }, []);

  useEffect(() => {
    if (!usesCanvas) return;
    let cancelled = false;
    displayImagesRef.current = new Array(images.length);
    corsImagesRef.current = new Array(images.length).fill(null);

    images.forEach((imgData, index) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        displayImagesRef.current[index] = img;
        if (index === indexRef.current && ctxRef.current && !isTransitioningRef.current) {
          drawImageCover(img);
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        const ph = createPlaceholder(index, imgData.alt);
        displayImagesRef.current[index] = ph;
        if (index === indexRef.current && ctxRef.current && !isTransitioningRef.current) {
          drawImageCover(ph);
        }
      };
      img.src = imgData.src;

      const corsImg = new Image();
      corsImg.crossOrigin = 'anonymous';
      corsImg.onload = () => {
        if (!cancelled) corsImagesRef.current[index] = corsImg;
      };
      corsImg.onerror = () => {
        if (!cancelled) corsImagesRef.current[index] = null;
      };
      corsImg.src = imgData.src;
    });

    return () => { cancelled = true; };
  }, [usesCanvas, images, drawImageCover, createPlaceholder]);

  useEffect(() => {
    if (!usesCanvas) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(() => { resizeCanvas(); });
    if (canvas.parentElement) observer.observe(canvas.parentElement);
    resizeCanvas();

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [usesCanvas, resizeCanvas]);

  useEffect(() => {
    if (eff !== 'timeSlice') return;
    if (baseImgRef.current && images[0]) {
      baseImgRef.current.src = images[0].src;
      baseImgRef.current.alt = images[0].alt || '';
    }
  }, [eff, images]);

  const goTo = useCallback(
    (targetIndex: number) => {
      if (
        isTransitioningRef.current ||
        targetIndex === indexRef.current ||
        !images.length ||
        targetIndex < 0 ||
        targetIndex >= images.length
      )
        return;

      const fromIndex = indexRef.current;
      const direction: 'next' | 'prev' = targetIndex > fromIndex ? 'next' : 'prev';
      isTransitioningRef.current = true;

      const finish = () => {
        indexRef.current = targetIndex;
        setCurrentIndex(targetIndex);
        isTransitioningRef.current = false;
        if (afterChange) afterChange(targetIndex);
      };

      if (eff === 'timeSlice') {
        timeSliceTransition(fromIndex, targetIndex, direction, finish);
      } else if (eff === 'ripple') {
        const fromDisplay = displayImagesRef.current[fromIndex];
        const toDisplay = displayImagesRef.current[targetIndex];
        const fromCors = corsImagesRef.current[fromIndex];
        const toCors = corsImagesRef.current[targetIndex];
        if (fromCors && toCors) {
          pixelRippleTransition(
            fromCors,
            toCors,
            fromDisplay!,
            toDisplay!,
            finish,
          );
        } else {
          clipRippleTransition(
            fromDisplay || createPlaceholder(fromIndex),
            toDisplay || createPlaceholder(targetIndex),
            finish,
          );
        }
      } else if (eff === 'matrixRain') {
        const fromD = displayImagesRef.current[fromIndex];
        const toD = displayImagesRef.current[targetIndex];
        matrixTransition(
          fromD || createPlaceholder(fromIndex),
          toD || createPlaceholder(targetIndex),
          finish,
        );
      } else if (eff === 'pixelRain') {
        const fromD = displayImagesRef.current[fromIndex];
        const toD = displayImagesRef.current[targetIndex];
        // Use CORS image for pixel data (avoids tainted-canvas error)
        const fromCors = corsImagesRef.current[fromIndex];
        pixelRainTransition(
          fromCors ?? fromD ?? createPlaceholder(fromIndex),
          toD ?? createPlaceholder(targetIndex),
          finish,
        );
      } else if (eff === 'ringGallery') {
        // Determine forward/backward considering wrap-around
        const isForward =
          (targetIndex - fromIndex + images.length) % images.length <
          images.length / 2;
        if (isForward) {
          ringAccumRef.current -= ringAngleDeg;
        } else {
          ringAccumRef.current += ringAngleDeg;
        }
        setRingAccum(ringAccumRef.current);
        finish();
      } else {
        finish();
      }
    },
    [
      eff,
      images,
      afterChange,
      ringAngleDeg,
      timeSliceTransition,
      pixelRippleTransition,
      clipRippleTransition,
      matrixTransition,
      pixelRainTransition,
      createPlaceholder,
    ],
  );

  const startAutoplay = useCallback(() => {
    if (!autoplay || images.length < 2) return;
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    autoplayTimerRef.current = setInterval(() => {
      goTo((indexRef.current + 1) % images.length);
    }, autoplaySpeed);
  }, [autoplay, autoplaySpeed, images.length, goTo]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handlePrev = () => {
    if (!images.length) return;
    goTo((indexRef.current - 1 + images.length) % images.length);
    startAutoplay();
  };
  const handleNext = () => {
    if (!images.length) return;
    goTo((indexRef.current + 1) % images.length);
    startAutoplay();
  };
  const handleIndicator = (idx: number) => { goTo(idx); startAutoplay(); };

  const containerStyle: React.CSSProperties = {
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  const effectClass =
    eff === 'timeSlice'
      ? 'cy-time-slice'
      : eff === 'ripple'
        ? 'cy-ripple'
        : eff === 'matrixRain'
          ? 'cy-matrix-rain'
          : eff === 'pixelRain'
            ? 'cy-pixel-rain'
            : eff === 'albumScroll'
              ? 'cy-album-scroll'
              : 'cy-ring-gallery';

  return (
    <div
      className={`cy-custom-carousel ${effectClass}`}
      style={containerStyle}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      {eff === 'albumScroll' ? (
        <div className="cy-album-stage">
          <div
            className="cy-album-wrapper"
            style={
              {
                ['--cy-album-n-rows' as string]: albumImagesPerColumn,
              } as React.CSSProperties
            }
          >
            <div className="cy-album-columns">
              {Array.from({ length: albumColumnCount }).map((_, col) => (
                <div
                  key={col}
                  className={`cy-album-column ${col % 2 === 0 ? 'cy-album-up' : 'cy-album-down'}`}
                >
                  {Array.from({ length: albumImagesPerColumn }).map((_, row) => {
                    const idx =
                      images.length === 0
                        ? 0
                        : (col * albumImagesPerColumn + row + currentIndex * 3) %
                          images.length;
                    const src = images[idx]?.src;
                    return (
                      <div
                        key={row}
                        className="cy-album-tile"
                        style={
                          src
                            ? { backgroundImage: `url(${src})` }
                            : undefined
                        }
                        role="presentation"
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : eff === 'ringGallery' ? (
        images.length < 1 ? null : images.length < 2 ? (
          <div className="cy-ring-stage cy-ring-fallback">
            <img className="cy-ring-single" src={images[0]!.src} alt={images[0]!.alt || ''} />
          </div>
        ) : (
          <div className="cy-ring-stage">
            <div
              className="cy-ring-scene"
              style={{ ['--n' as string]: ringN } as React.CSSProperties}
            >
              <div
                className="cy-ring-a3d"
                style={{ transform: `rotateY(${ringAccum}deg)` }}
              >
                {ringDisplayImages.map((item, i) => (
                  <img
                    key={i}
                    className="cy-ring-card"
                    src={item.src}
                    alt={item.alt || ''}
                    loading="lazy"
                    style={{
                      width: ringCardW,
                      transform: `rotateY(${i * ringAngleDeg}deg) translateZ(${ringTranslateZ}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="cy-carousel" ref={carouselRef}>
          {eff === 'timeSlice' && (
            <>
              <div className="cy-base-layer">
                <img ref={baseImgRef} alt="" />
              </div>
              <div className="cy-slice-layer" ref={sliceLayerRef} />
              <div className="cy-scanline" ref={scanlineRef} />
            </>
          )}
          {usesCanvas && <canvas ref={canvasRef} />}
        </div>
      )}

      {navButtons && images.length > 1 && (
        <>
          <button type="button" className="cy-nav-btn cy-prev" onClick={handlePrev} aria-label="Previous">‹</button>
          <button type="button" className="cy-nav-btn cy-next" onClick={handleNext} aria-label="Next">›</button>
        </>
      )}

      {dots && images.length > 1 && (
        <div className="cy-indicators">
          {images.map((_, idx) => (
            <button
              type="button"
              key={idx}
              className={`cy-indicator ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handleIndicator(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomCarousel;
