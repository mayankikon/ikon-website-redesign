"use client";

import { testimonials } from "@/content/stories";
import { Icon } from "./IconSprite";
import { TextLink } from "./ArrowButton";
import { useEffect, useRef, useState } from "react";

export function TestimonialCarousel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const swipeStartX = useRef<number | undefined>(undefined);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) setIsPaused(true);
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible || document.hidden) return;
    const timer = window.setTimeout(() => {
      setCurrentIndex((index) => (index + 1) % testimonials.length);
    }, 6500);
    return () => window.clearTimeout(timer);
  }, [currentIndex, isPaused, isVisible]);

  function showSlide(nextIndex: number) {
    const total = testimonials.length;
    setCurrentIndex((nextIndex + total) % total);
  }

  return (
    <div
      className="testimonial"
      data-testimonials
      aria-roledescription="carousel"
      aria-label="Dealer results"
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          setIsPaused(true);
          showSlide(currentIndex - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          setIsPaused(true);
          showSlide(currentIndex + 1);
        }
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") swipeStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStartX.current === undefined) return;
        const distance = event.clientX - swipeStartX.current;
        swipeStartX.current = undefined;
        if (Math.abs(distance) < 45) return;
        setIsPaused(true);
        showSlide(currentIndex + (distance < 0 ? 1 : -1));
      }}
      onPointerCancel={() => {
        swipeStartX.current = undefined;
      }}
    >
      <div className="testimonial-viewport" aria-live="off">
        <div className="testimonial-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {testimonials.map((item, index) => (
            <article
              className="quote"
              key={item.person}
              aria-label={`${index + 1} of ${testimonials.length}`}
              aria-hidden={index !== currentIndex}
            >
              <figure className="quote-media">
                <img src={item.image} alt={item.imageAlt} />
                <span className="quote-number">{item.stat}</span>
              </figure>
              <div className="quote-body">
                <div className="chips">
                  {item.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <blockquote>“{item.quote}”</blockquote>
                <TextLink href={item.href}>Read full story</TextLink>
                <div className="who">
                  <img className="who-face" src={item.face} alt="" />
                  <span>
                    <b>{item.person}</b>
                    {item.place}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="testimonial-controls">
        <div className="testimonial-progress">
          <span className="testimonial-status">
            <span>{String(currentIndex + 1).padStart(2, "0")}</span> / 03
          </span>
          <div className="testimonial-dots" aria-label="Choose a testimonial">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.person}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
                onClick={() => {
                  setIsPaused(true);
                  showSlide(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="testimonial-arrows">
          <button
            className="testimonial-toggle"
            type="button"
            aria-label={isPaused ? "Play testimonial rotation" : "Pause testimonial rotation"}
            aria-pressed={isPaused}
            onClick={() => setIsPaused((value) => !value)}
          >
            <Icon name="pause" className="icon" />
            <Icon name="play" className="icon" />
          </button>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => {
              setIsPaused(true);
              showSlide(currentIndex - 1);
            }}
          >
            <span className="control-arrow control-arrow-left" aria-hidden="true">
              <Icon name="arrow-left" />
            </span>
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => {
              setIsPaused(true);
              showSlide(currentIndex + 1);
            }}
          >
            <span className="control-arrow" aria-hidden="true">
              <Icon name="arrow-right" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
