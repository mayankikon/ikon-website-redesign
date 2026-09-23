"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
    }
  }, []);

  return (
    <div className="hero-media" aria-hidden="true">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/hero-poster.jpg"
      >
        <source src="/assets/hero.mp4" type="video/mp4" />
        <source src="/assets/hero.webm" type="video/webm" />
      </video>
    </div>
  );
}
