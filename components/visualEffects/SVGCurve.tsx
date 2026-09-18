"use client";

import { MouseEvent, useEffect, useRef } from "react";

/**
 * The hairline under each section heading. It bends toward the pointer while
 * the cursor is over it and springs back once the cursor leaves.
 *
 * All animation state lives in refs. It used to be plain `let` bindings in the
 * component body, so every render reset them and the effect's cleanup closed
 * over a `reqId` that was permanently `null` — `cancelAnimationFrame` never
 * cancelled anything, and each hover could leave a 60fps loop running past
 * unmount. One of these renders per heading, so the leaks accumulated.
 */
const SvgCurve = () => {
  const path = useRef<SVGPathElement | null>(null);
  const progress = useRef(0);
  const reqId = useRef<number | null>(null);
  const x = useRef(0.5);
  const time = useRef(Math.PI / 2);

  const setPath = (value: number) => {
    const width = window.innerWidth * 0.7;
    path.current?.setAttribute(
      "d",
      `M 0 50 Q ${width * x.current} ${50 + value} ${width} 50`
    );
  };

  const cancel = () => {
    if (reqId.current !== null) {
      cancelAnimationFrame(reqId.current);
      reqId.current = null;
    }
  };

  const animateIn = () => {
    setPath(progress.current);
    reqId.current = requestAnimationFrame(animateIn);
  };

  const animateOut = () => {
    setPath(progress.current * Math.sin(time.current));
    progress.current = lerp(progress.current, 0, 0.04);
    time.current += 0.2;

    if (Math.abs(progress.current) > 0.5) {
      reqId.current = requestAnimationFrame(animateOut);
      return;
    }

    // Settled — park the line flat and stop burning frames.
    time.current = Math.PI / 2;
    progress.current = 0;
    reqId.current = null;
    setPath(0);
  };

  const handleMouseEnter = () => {
    cancel();
    time.current = Math.PI / 2;
    animateIn();
  };

  const handleMouseLeave = () => {
    cancel();
    animateOut();
  };

  const handleMouseMove = (event: MouseEvent<HTMLSpanElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    x.current = (event.clientX - box.left) / box.width;
    progress.current += event.movementY;
  };

  useEffect(() => {
    setPath(progress.current);

    const handleResize = () => setPath(progress.current);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      // Reads the live ref, so it actually cancels the running loop.
      if (reqId.current !== null) cancelAnimationFrame(reqId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="line">
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="box"
      ></span>
      <svg>
        <path ref={path}></path>
      </svg>
    </div>
  );
};

const lerp = (from: number, to: number, alpha: number) =>
  from * (1 - alpha) + to * alpha;

export default SvgCurve;
