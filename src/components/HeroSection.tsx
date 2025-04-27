import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

const HeroSection = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize stars immediately (don't wait for loading complete)
    createStars();

    // Listen for loading complete event to trigger entrance animation
    const handleLoadingComplete = () => {
      setIsLoadingComplete(true);
      animateStarsEntrance();
    };

    window.addEventListener("loading-complete", handleLoadingComplete);

    // Initialize GSAP animations for other elements
    const initGsapAnimations = () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.5,
      })
        .from(
          ".hero-subtitle",
          {
            opacity: 0,
            duration: 1.2,
          },
          "-=0.8"
        )
        .from(
          ".hero-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".scroll-indicator",
          {
            opacity: 0,
            duration: 0.5,
          },
          "-=0.2"
        );
    };

    initGsapAnimations();

    return () => {
      window.removeEventListener("loading-complete", handleLoadingComplete);
    };
  }, []);

  const animateStarsEntrance = () => {
    gsap.fromTo(
      ".star",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  };

  const createStars = () => {
    if (!starsRef.current) return;

    const container = starsRef.current;
    container.innerHTML = "";

    const starCount = 200; // Increased number of stars
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";

      // Position stars within visible container bounds
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const z = Math.random() * 100 - 50;
      const size = 0.5 + Math.random() * 2;
      const opacity = 0.3 + Math.random() * 0.7;
      const duration = 2 + Math.random() * 3;
      const delay = Math.random() * 5;

      star.style.position = "absolute";
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.backgroundColor = "white";
      star.style.borderRadius = "50%";
      star.style.transform = `translateZ(${z}px)`;
      star.style.opacity = `${opacity}`;
      star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`;
      star.style.willChange = "transform, opacity";

      // Add occasional colored stars
      if (Math.random() > 0.9) {
        const hue = 200 + Math.random() * 60; // Blue-ish colors
        star.style.backgroundColor = `hsl(${hue}, 80%, 70%)`;
      }

      container.appendChild(star);
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black z-0"></div>

      {/* Stars Container - Higher z-index than background */}
      <div
        ref={starsRef}
        className="stars-container absolute inset-0 z-10 overflow-hidden"
        style={{ pointerEvents: "none" }}
      ></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 py-24 max-w-3xl mx-auto">
        <h2 className="spaced-text text-sm mb-6 text-white">
          IMMIGRATION CONSULTANT
        </h2>

        <h1 className="hero-title text-4xl md:text-6xl font-light text-white mb-6 tracking-wide">
          Your Path to Immigration
          <span className="block">Success</span>
        </h1>

        <p className="hero-subtitle text-lg md:text-xl text-white/70 mb-10 font-light">
          Professional guidance tailored to your immigration goals in Canada and
          beyond
        </p>

        <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#services"
            className="bg-transparent border border-white text-white px-8 py-3 rounded-sm font-light hover:bg-white/5 transition-all duration-300 text-sm tracking-widest uppercase"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="bg-white text-black px-8 py-3 rounded-sm font-light hover:bg-white/90 transition-colors duration-300 text-sm tracking-widest uppercase"
          >
            Free Consultation
          </a>
        </div>
      </div>

      <button
        onClick={scrollToServices}
        className="scroll-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 text-white animate-subtle-bounce"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  );
};

export default HeroSection;
