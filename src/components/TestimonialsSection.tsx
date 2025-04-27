
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

const testimonials = [
  {
    name: 'Michael Chen',
    country: 'China',
    role: 'Software Engineer',
    text: "Hasten Immigration Consultants made my dream of moving to Canada a reality. Their expertise guided me through the Express Entry process seamlessly. I'm now happily settled in Toronto with my family.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=120&h=120'
  },
  {
    name: 'Priya Sharma',
    country: 'India',
    role: 'Medical Professional',
    text: 'I had a complex case with previous rejections, but the team at Hasten turned everything around. Their attention to detail and strategic approach helped me secure my work permit and eventually permanent residency.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=120&h=120'
  },
  {
    name: 'Carlos Rodriguez',
    country: 'Mexico',
    role: 'Business Owner',
    text: 'The family sponsorship process seemed overwhelming until I found Hasten. They simplified everything and kept me informed at every step. Now my spouse and children are here with me in Canada.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=120&h=120'
  },
  {
    name: 'Sarah Johnson',
    country: 'USA',
    role: 'Entrepreneur',
    text: 'As a business owner looking to expand to Canada, I needed specialized immigration advice. Hasten provided exceptional service, helping me navigate the business immigration pathway successfully.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=120&h=120'
  }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const maxSlides = testimonials.length;

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

    // Initialize GSAP animations when visible
    if (isVisible) {
      gsap.fromTo(
        ".testimonials-content",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 bg-black border-t border-white/5">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="spaced-text text-sm mb-4 text-white" style={{ animationDelay: '0.1s' }}>TESTIMONIALS</h2>
          <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">Client Success Stories</h3>
          <div className="w-16 h-px bg-white/20 mx-auto"></div>
        </div>
        
        <div className="testimonials-content max-w-6xl mx-auto">
          {/* Cult.com style testimonials */}
          <div className="relative overflow-hidden">
            <div className="transition-all duration-500 ease-in-out" 
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="testimonial-card">
                      <div className="testimonial-header">
                        {testimonial.country.toUpperCase()} • {testimonial.role.toUpperCase()}
                      </div>
                      
                      <div className="testimonial-content">
                        <p className="text-white text-lg md:text-xl leading-relaxed">"{testimonial.text}"</p>
                      </div>
                      
                      <div className="testimonial-author">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="testimonial-author-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/placeholder.svg';
                          }}
                        />
                        <div>
                          <p className="font-medium text-white">{testimonial.name}</p>
                          <p className="text-white/60 text-sm">{testimonial.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <div className="flex space-x-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-white' : 'bg-white/30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
