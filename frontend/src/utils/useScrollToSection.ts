import { useEffect, useState, RefObject } from 'react';

type ScrollToFunction = (ref: RefObject<HTMLElement | null>) => void;

export const useScrollToSection = (): [ScrollToFunction, string | null] => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollTo = (ref: RefObject<HTMLElement | null>) => {
    if (ref.current) {
      // Get the ID of the section to set as active
      const sectionId = ref.current.id;
      
      // Add a temporary class to the section to trigger animation
      ref.current.classList.add('scroll-target');
      
      // Remove the class after animation completes
      setTimeout(() => {
        if (ref.current) {
          ref.current.classList.remove('scroll-target');
        }
      }, 1000); // Match the duration of the scroll animation
      
      // Scroll to the section using scroll-margin-top (handled by CSS)
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active section
      setActiveSection(sectionId);
      
      // Move focus to the section for screen readers
      if (ref.current.tabIndex === -1 || ref.current.tabIndex === 0) {
        ref.current.focus();
      } else {
        // If the element doesn't have a tabIndex, temporarily set one
        const prevTabIndex = ref.current.getAttribute('tabindex');
        ref.current.setAttribute('tabindex', '-1');
        ref.current.focus();
        if (prevTabIndex) {
          ref.current.setAttribute('tabindex', prevTabIndex);
        } else {
          ref.current.removeAttribute('tabindex');
        }
      }
    }
  };

  // Handle scroll events to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection: string | null = null;
      
      // Use scroll-padding-top equivalent logic (80px header height)
      const scrollPosition = window.scrollY + 80; // header height

      sections.forEach(section => {
        const element = section as HTMLElement;
        // Compare scroll position with section position
        if (element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          currentSection = element.id;
        }
      });

      // Fallback: if no section is found, find the one closest to the scroll position
      if (!currentSection) {
        let closestSection = null;
        let smallestDiff = Infinity;
        
        sections.forEach(section => {
          const element = section as HTMLElement;
          const diff = Math.abs(element.offsetTop - scrollPosition);
          
          if (diff < smallestDiff) {
            smallestDiff = diff;
            closestSection = element.id;
          }
        });
        
        currentSection = closestSection;
      }

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return [scrollTo, activeSection];
};