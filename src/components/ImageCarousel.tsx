"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export default function ImageCarousel({ images, autoPlayInterval = 5000 }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // WCAG 2.2.2: auto-rotation must be pausable, and it stops for good the
  // moment the visitor takes manual control (arrows, dots). The play/pause
  // button is the only way to restart it.
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const regionRef = useRef<HTMLElement>(null);

  // Honour the OS motion preference: never auto-rotate for reduced-motion
  // visitors (they can still page manually). Also tracks live changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) setIsPlaying(false);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // Stop the loop while the carousel is offscreen — every tick fetches the
  // next slide's photo (images ship byte-for-byte, CLAUDE.md D3), so an
  // unseen rotation costs real bandwidth.
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  const rotating = isPlaying && !isHovered && !isFocused && isInView;

  useEffect(() => {
    if (!rotating) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [rotating, images.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Panther Band photo gallery"
      className="relative w-full max-w-6xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
    >
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-lg shadow-lg"
        // Silent while auto-rotating (a five-second announcement loop is
        // noise); announces the new slide once the visitor is driving.
        aria-live={rotating ? "off" : "polite"}
      >
        {images.map((image, index) => {
          // Only mount the current slide and its neighbors (circular). Images
          // ship byte-for-byte (CLAUDE.md D3), so mounting all nine eagerly
          // fetched 2.87 MB below the fold (audit P1-6). Neighbors stay
          // mounted so the crossfade always has a loaded slide to fade to.
          const gap = Math.abs(index - currentIndex);
          if (Math.min(gap, images.length - gap) > 1) return null;
          return (
            <div
              key={image.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${images.length}`}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          );
        })}

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-4 bottom-4 w-11 h-11 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          aria-label={isPlaying ? "Pause automatic slide show" : "Play automatic slide show"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5v14M15 5v14" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex justify-center mt-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => goToSlide(index)}
            className="w-11 h-11 flex items-center justify-center group"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : undefined}
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-[background-color,transform] ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-gray-light group-hover:bg-gray-dark"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
