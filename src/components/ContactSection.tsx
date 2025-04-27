/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { gsap } from "gsap";

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
        formRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      ).fromTo(
        contactInfoRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, [isVisible]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Play click sound if available
    if (typeof window !== "undefined" && (window as any).playClickSound) {
      (window as any).playClickSound();
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-hasten-teal" />,
      title: "Phone",
      details: import.meta.env.VITE_PHONE_NUMBER,
      action: `tel:+91${import.meta.env.VITE_PHONE_NUMBER}`,
    },
    {
      icon: <Mail className="h-6 w-6 text-hasten-teal" />,
      title: "Email",
      details: import.meta.env.VITE_EMAIL,
      action: `mailto:${import.meta.env.VITE_EMAIL}`,
    },
    {
      icon: <MapPin className="h-6 w-6 text-hasten-teal" />,
      title: "Office",
      details: import.meta.env.VITE_ADDRESS,
      action: "https://maps.google.com",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-hasten-dark text-white"
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Have questions about your immigration options? Contact us for a free
            consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

            {isSubmitted ? (
              <div className="glass-effect rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-500 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Message Sent Successfully!
                </h4>
                <p className="text-white/80">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-hasten-teal"
                      placeholder="John Doe"
                      onMouseEnter={() => {
                        // Play hover sound if available
                        if (
                          typeof window !== "undefined" &&
                          (window as any).playHoverSound
                        ) {
                          (window as any).playHoverSound();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-hasten-teal"
                      placeholder="john@example.com"
                      onMouseEnter={() => {
                        // Play hover sound if available
                        if (
                          typeof window !== "undefined" &&
                          (window as any).playHoverSound
                        ) {
                          (window as any).playHoverSound();
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-hasten-teal"
                      placeholder="+91-9996900224"
                      onMouseEnter={() => {
                        // Play hover sound if available
                        if (
                          typeof window !== "undefined" &&
                          (window as any).playHoverSound
                        ) {
                          (window as any).playHoverSound();
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block mb-2 text-sm font-medium"
                    >
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-hasten-teal"
                      onMouseEnter={() => {
                        // Play hover sound if available
                        if (
                          typeof window !== "undefined" &&
                          (window as any).playHoverSound
                        ) {
                          (window as any).playHoverSound();
                        }
                      }}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="Work Permit">Work Permit</option>
                      <option value="Skilled Immigration">
                        Skilled Immigration
                      </option>
                      <option value="Family Sponsorship">
                        Family Sponsorship
                      </option>
                      <option value="Student Visa">Student Visa</option>
                      <option value="Business Immigration">
                        Business Immigration
                      </option>
                      <option value="Citizenship">Citizenship</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-hasten-teal"
                    placeholder="Tell us about your immigration goals..."
                    onMouseEnter={() => {
                      // Play hover sound if available
                      if (
                        typeof window !== "undefined" &&
                        (window as any).playHoverSound
                      ) {
                        (window as any).playHoverSound();
                      }
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-hasten-teal text-white rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(38,182,198,0.5)] disabled:opacity-70"
                  onMouseEnter={() => {
                    // Play hover sound if available
                    if (
                      typeof window !== "undefined" &&
                      (window as any).playHoverSound
                    ) {
                      (window as any).playHoverSound();
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2 text-black" />
                      <span className="text-black">Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div ref={contactInfoRef}>
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="glass-effect rounded-lg p-6 mb-8">
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start hover-card-effect p-2 rounded-lg"
                  >
                    <div className="bg-hasten-navy p-3 rounded-full mr-4 flex-shrink-0 pulse-glow">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-lg">{item.title}</h4>
                      <a
                        href={item.action}
                        className="text-white/80 hover:text-hasten-teal transition-colors duration-300 break-words overflow-wrap-anywhere"
                        target="_blank"
                        rel="noopener noreferrer"
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
                        {item.details}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-6">Business Hours</h3>
            <div className="glass-effect rounded-lg p-6">
              <div className="space-y-2">
                <div className="flex justify-between flex-wrap">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between flex-wrap">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between flex-wrap">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
