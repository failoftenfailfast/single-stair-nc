'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScroll } from 'framer-motion';

interface ScrollytellingSection {
  _id: string;
  title: string;
  content: any[];
  animationTrigger: string;
  cameraPosition: { x: number; y: number; z: number };
  duration: number;
  models: string[];
}

export function useScrollytelling(sections: ScrollytellingSection[]) {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize refs array
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, sections.length);
  }, [sections.length]);

  const updateCurrentSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate which section should be active based on scroll position
    const totalScrollableHeight = documentHeight - windowHeight;
    const scrollProgress = scrollY / totalScrollableHeight;
    
    // Determine current section
    const sectionIndex = Math.floor(scrollProgress * sections.length);
    const clampedIndex = Math.max(0, Math.min(sections.length - 1, sectionIndex));
    
    setCurrentSection(clampedIndex);
    
    // Calculate progress within current section
    const sectionProgress = (scrollProgress * sections.length) % 1;
    setProgress(sectionProgress);
    
    // Check if scrollytelling area is in view
    const scrollytellingStart = windowHeight;
    const scrollytellingEnd = documentHeight - windowHeight;
    setIsInView(scrollY >= scrollytellingStart && scrollY <= scrollytellingEnd);
  }, [sections.length]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateCurrentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCurrentSection(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateCurrentSection]);

  // Intersection Observer for individual sections
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-20% 0px -20% 0px',
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sections]);

  const setRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[index] = el;
  }, []);

  return {
    currentSection,
    progress,
    isInView,
    sectionRefs: sectionRefs.current,
    setRef,
  };
}


