import { useState, useEffect, useRef } from "react";
import {
  FileSearch,
  FileEdit,
  Clock,
  CheckSquare,
  Send,
  MessageCircle,
} from "lucide-react";
import { gsap } from "gsap";

const ProcessSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      stepsRef.current.forEach((step, index) => {
        if (step) {
          gsap.fromTo(
            step,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.15,
              ease: "power2.out",
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

  const steps = [
    {
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      title: "Initial Consultation",
      description:
        "We begin with a comprehensive assessment of your situation and immigration goals.",
      color: "bg-hasten-navy",
    },
    {
      icon: <FileSearch className="h-10 w-10 text-black" />,
      title: "Eligibility Assessment",
      description:
        "Our team evaluates your eligibility for various immigration programs and pathways.",
      color: "bg-hasten-teal",
    },
    {
      icon: <FileEdit className="h-10 w-10 text-white" />,
      title: "Documentation Preparation",
      description:
        "We assist in gathering and preparing all required documents for your application.",
      color: "bg-hasten-navy",
    },
    {
      icon: <Send className="h-10 w-10 text-black" />,
      title: "Application Submission",
      description:
        "Your application is carefully reviewed and submitted to the appropriate authorities.",
      color: "bg-hasten-teal",
    },
    {
      icon: <Clock className="h-10 w-10 text-white" />,
      title: "Application Monitoring",
      description:
        "We track your application and provide regular updates throughout the process.",
      color: "bg-hasten-navy",
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-black" />,
      title: "Successful Settlement",
      description:
        "We celebrate your success and offer post-landing support for your new beginning.",
      color: "bg-hasten-teal",
    },
  ];

  const handleStepHover = (index: number) => {
    // Play hover sound if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).playHoverSound) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).playHoverSound();
    }

    // GSAP animation on hover
    gsap.to(stepsRef.current[index]?.querySelector(".step-icon"), {
      scale: 1.1,
      duration: 0.3,
    });
  };

  const handleStepLeave = (index: number) => {
    // Reset animation
    gsap.to(stepsRef.current[index]?.querySelector(".step-icon"), {
      scale: 1,
      duration: 0.3,
    });
  };

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-hasten-dark">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Immigration Process
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A simple, transparent approach to guide you through your immigration
            journey
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-hasten-teal/30 transform -translate-x-1/2 z-0"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                onMouseEnter={() => handleStepHover(index)}
                onMouseLeave={() => handleStepLeave(index)}
              >
                <div
                  className={`flex-1 p-6 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>

                <div className="mx-4 md:mx-0 my-4 md:my-0">
                  <div
                    className={`step-icon ${step.color} rounded-full p-4 shadow-lg shadow-hasten-teal/20`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="flex-1 p-6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
