import { useState, useEffect, useCallback } from 'react';
import styles from './ScrollIndicator.module.css';

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  let ticking = false;

  const calculateScrollProgress = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(100, (scrollTop / docHeight) * 100);
    setScrollProgress(scrollPercent);
    ticking = false;
  }, []);

  const updateScrollProgress = useCallback(() => {
    if (!ticking) {
      requestAnimationFrame(calculateScrollProgress);
      ticking = true;
    }
  }, [calculateScrollProgress]);

  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
      setIsScrolling(true);
      
      // Clear timeout if already set
      if ((window as any).__scrollTimer__) {
        clearTimeout((window as any).__scrollTimer__);
      }
      
      // Set timeout to mark end of scroll
      (window as any).__scrollTimer__ = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize scroll progress
    updateScrollProgress();
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if ((window as any).__scrollTimer__) {
        clearTimeout((window as any).__scrollTimer__);
      }
    };
  }, [updateScrollProgress]);

  return (
    <div className={`${styles['scroll-indicator-container']} ${isScrolling ? styles['scrolled'] : ''}`}>
      <div 
        className={styles['scroll-indicator-bar']} 
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

export default ScrollIndicator;