
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

const DotNavigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleDotClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
      
      // GSAP animation for clicked dot
      gsap.to(`#dot-${sectionId}`, {
        scale: 1.5,
        duration: 0.3,
        yoyo: true,
        repeat: 1
      });
      
      // Play click sound if available
      if (typeof window !== 'undefined' && (window as any).playClickSound) {
        (window as any).playClickSound();
      }
    }
  };

  const handleDotHover = (sectionId: string) => {
    // Play hover sound if available
    if (typeof window !== 'undefined' && (window as any).playHoverSound) {
      (window as any).playHoverSound();
    }
    
    // GSAP animation for hovered dot
    gsap.to(`#dot-${sectionId}`, {
      scale: 1.2,
      duration: 0.2
    });
  };

  const handleDotLeave = (sectionId: string) => {
    gsap.to(`#dot-${sectionId}`, {
      scale: 1,
      duration: 0.2
    });
  };

  return (
    <div className="dot-nav">
      {sections.map(section => (
        <div 
          key={section.id}
          id={`dot-${section.id}`}
          className={`dot ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => handleDotClick(section.id)}
          onMouseEnter={() => handleDotHover(section.id)}
          onMouseLeave={() => handleDotLeave(section.id)}
          aria-label={`Scroll to ${section.label}`}
        >
          <span className="sr-only">{section.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DotNavigation;
