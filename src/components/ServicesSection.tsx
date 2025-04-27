
import { Briefcase, Globe, FileCheck, Users, Award, HeartHandshake } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const services = [
  {
    icon: <Briefcase className="h-8 w-8 text-white" />,
    title: 'Work Permits',
    description: 'Expert guidance for temporary work permits and pathways to permanent residency through employment.'
  },
  {
    icon: <Globe className="h-8 w-8 text-white" />,
    title: 'Skilled Immigration',
    description: 'Navigate Express Entry, Provincial Nominee Programs, and other skilled worker pathways with confidence.'
  },
  {
    icon: <Users className="h-8 w-8 text-white" />,
    title: 'Family Sponsorship',
    description: 'Reunite with your loved ones through family class sponsorship programs for spouses, children, and parents.'
  },
  {
    icon: <FileCheck className="h-8 w-8 text-white" />,
    title: 'Student Visas',
    description: 'Comprehensive support for international students looking to study and build a future in Canada.'
  },
  {
    icon: <Award className="h-8 w-8 text-white" />,
    title: 'Business Immigration',
    description: 'Specialized services for entrepreneurs, investors, and self-employed individuals seeking business opportunities.'
  },
  {
    icon: <HeartHandshake className="h-8 w-8 text-white" />,
    title: 'Citizenship Applications',
    description: 'End-to-end assistance with Canadian citizenship applications and preparation for citizenship tests.'
  }
];

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Initialize GSAP animations
    if (isVisible) {
      const tl = gsap.timeline();
      
      // Animate section title
      tl.from(".services-title-container", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      
      // Animate each card with staggered timing
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { 
              y: 50, 
              opacity: 0 
            },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              delay: 0.3 + index * 0.1,
              ease: "power2.out" 
            }
          );
        }
      });
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
    
    // Play hover sound if available
    if (typeof window !== 'undefined' && (window as any).playHoverSound) {
      (window as any).playHoverSound();
    }
    
    // GSAP animation on hover
    gsap.to(cardsRef.current[index], {
      y: -5,
      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.05)',
      duration: 0.3
    });
  };

  const handleCardLeave = (index: number) => {
    setHoveredCard(null);
    
    // GSAP animation on leave
    gsap.to(cardsRef.current[index], {
      y: 0,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 0.3
    });
  };

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-black border-t border-white/5">
      <div className="section-container">
        <div className="services-title-container text-center mb-20">
          <h2 className="spaced-text text-sm mb-4 text-white" style={{ animationDelay: '0.1s' }}>OUR SERVICES</h2>
          <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">Immigration Solutions</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            We offer a comprehensive range of immigration services tailored to meet your unique needs and goals.
          </p>
          <div className="w-16 h-px bg-white/20 mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="service-card"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <div className="service-icon-container">
                {service.icon}
              </div>
              <h3 className="text-xl font-light text-white mb-4 tracking-wide">{service.title}</h3>
              <p className="text-white/70 leading-relaxed">{service.description}</p>
              
              <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/5 z-0"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-white/3 z-0"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#contact" 
            className="inline-block bg-transparent border border-white text-white px-8 py-3 rounded-sm transition-all duration-300 hover:bg-white hover:text-black text-sm tracking-wider"
          >
            Discuss Your Immigration Needs
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
