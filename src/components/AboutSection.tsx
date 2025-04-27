import { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";
import { gsap } from "gsap";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const checklistRef = useRef<HTMLDivElement>(null);

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
      const tl = gsap.timeline();

      tl.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      )
        .fromTo(
          contentRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )
        .fromTo(
          checklistRef.current?.querySelectorAll(".benefit-item"),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        );
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  const benefits = [
    "Licensed immigration consultants with years of experience",
    "Personalized immigration strategies tailored to your goals",
    "High success rate for all types of immigration applications",
    "Transparent process and regular status updates",
    "Support in multiple languages for your convenience",
    "Affordable services with flexible payment options",
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-hasten-darker relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 to-black opacity-80 z-0"></div>

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef}>
            <div className="about-image-container">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800"
                alt="Immigration consultation team"
                className="about-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="mt-6 text-white/70 text-sm italic text-center">
              Our team of immigration experts ready to assist you
            </div>
          </div>

          <div ref={contentRef}>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              Why Choose {import.meta.env.VITE_CONSULTANCY_NAME}?
            </h2>

            <p className="text-white/80 leading-relaxed mb-8">
              With over 15 years of experience in immigration consulting, we've
              helped thousands of individuals and families achieve their
              immigration goals. Our team of licensed consultants provides
              personalized solutions to navigate the complex immigration process
              successfully.
            </p>

            <div className="about-content-highlight">
              "We don't just process applications — we build relationships and
              create pathways to new beginnings."
            </div>

            <div ref={checklistRef} className="space-y-4 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item flex items-start">
                  <CheckCircle className="h-6 w-6 text-hasten-teal mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-white/90">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a
                href="#contact"
                className="bg-white text-black px-8 py-3 rounded-sm font-medium transition-all duration-300 hover:bg-opacity-90"
                onMouseEnter={() => {
                  // Play hover sound if available
                  if (
                    typeof window !== "undefined" &&
                    (window as any).playHoverSound
                  ) {
                    (window as any).playHoverSound();
                  }
                }}
                onClick={() => {
                  // Play click sound if available
                  if (
                    typeof window !== "undefined" &&
                    (window as any).playClickSound
                  ) {
                    (window as any).playClickSound();
                  }
                }}
              >
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
