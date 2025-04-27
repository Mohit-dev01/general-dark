import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize GSAP animations
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      ".nav-logo",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    ).fromTo(
      ".nav-links a",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
      "-=0.3"
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    // Close mobile menu
    setIsMenuOpen(false);

    // Smooth scroll
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 nav-logo">
            <a href="#home" className="flex items-center">
              <span className="text-white font-bold text-2xl">
                {import.meta.env.VITE_CONSULTANCY_FIRST_NAME}
              </span>
              <span className="ml-1 text-white font-light">
                {" "}
                {import.meta.env.VITE_CONSULTANCY_LAST_NAME}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block nav-links">
            <div className="flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-300`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick("#contact");
                }}
                className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded text-sm font-medium transition-colors duration-300"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
              className="text-white hover:text-gray-300 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-effect shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("#contact");
              }}
              className="bg-white text-black hover:bg-gray-200 block px-3 py-2 rounded text-base font-medium mt-2"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
