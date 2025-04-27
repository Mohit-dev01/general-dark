import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import ThreeBackground from "../components/ThreeBackground";
import DotNavigation from "../components/DotNavigation";
import WhatsAppButton from "../components/WhatsAppButton";
import LoadingScreen from "../components/LoadingScreen";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTimeout, setLoadingTimeout] = useState<number | null>(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Update page title
    document.title = "Consultant Landing Page";

    // Simulate network request and resource loading
    const startTime = Date.now();
    const minLoadingTime = 2500; // Minimum time to show loading screen (ms)

    // Start a timeout to detect slow loading
    const slowLoadingTimeout = window.setTimeout(() => {
      console.log("Loading is taking longer than expected...");
      setLoadingTimeout(null);
    }, 5000); // Show the timeout message after 5 seconds

    // Function to finish loading
    const finishLoading = () => {
      window.clearTimeout(slowLoadingTimeout);

      const loadTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - loadTime);

      // Ensure loading screen shows for at least the minimum time
      setTimeout(() => {
        setIsLoading(false);
        initAnimations();
      }, remainingTime);
    };

    // Check for page resources loaded
    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }

    // Setup keyboard navigation
    const setupKeyboardNavigation = () => {
      const sections = [
        "home",
        "services",
        "about",
        "process",
        "testimonials",
        "contact",
      ];

      let currentSectionIndex = 0;

      const handleKeyDown = (e: KeyboardEvent) => {
        // Arrow up: previous section
        if (e.key === "ArrowUp" && currentSectionIndex > 0) {
          currentSectionIndex--;
          navigateToSection(sections[currentSectionIndex]);
        }

        // Arrow down: next section
        if (
          e.key === "ArrowDown" &&
          currentSectionIndex < sections.length - 1
        ) {
          currentSectionIndex++;
          navigateToSection(sections[currentSectionIndex]);
        }
      };

      const navigateToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
          });
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    };

    setupKeyboardNavigation();

    // Initialize GSAP animations
    const initAnimations = () => {
      // Add special entry animation for stars
      gsap.fromTo(
        ".star",
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          stagger: 0.01,
          ease: "power3.out",
        }
      );

      // Animate sections on scroll
      gsap.utils.toArray<HTMLElement>("section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    };

    return () => {
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(slowLoadingTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-hasten-darker text-white">
      <LoadingScreen isLoading={isLoading} />
      <ThreeBackground />
      <WhatsAppButton />
      <DotNavigation />
      <Navigation />
      <HeroSection />

      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      <Footer />
    </div>
  );
};

export default Index;
