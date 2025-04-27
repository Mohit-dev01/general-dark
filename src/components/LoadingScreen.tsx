import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [starsCreated, setStarsCreated] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFadeOut(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        // Simulate loading progress
        const newProgress = prevProgress + Math.random() * 10;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle fade out animation completion
  useEffect(() => {
    if (!isLoading && fadeOut) {
      const timer = setTimeout(() => {
        setFadeOut(false);

        // Trigger star animation in hero section
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("loading-complete"));
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, fadeOut]);

  // Create stars for background animation
  useEffect(() => {
    if (!starsCreated) {
      createStars();
      setStarsCreated(true);
    }
  }, [starsCreated]);

  const createStars = () => {
    const starsContainer = document.querySelector(".stars-container");
    if (!starsContainer) return;

    // Clear existing stars first
    starsContainer.innerHTML = "";

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const z = Math.random() * 50 - 25;
      const delay = Math.random() * 5;
      const duration = 1 + Math.random() * 2;
      const size = 1 + Math.random() * 2;

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.transform = `translateZ(${z}px)`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animationDelay = `${delay}s`;
      star.style.animationDuration = `${duration}s`;

      starsContainer.appendChild(star);
    }
  };

  if (!isLoading && !fadeOut) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="perspective-500">
        <div className="mb-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse-glow">
              <div
                className="ripple-circle"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "80px",
                  height: "80px",
                }}
              ></div>
              <div
                className="ripple-circle"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "120px",
                  height: "120px",
                  animationDelay: "0.5s",
                }}
              ></div>
              <div
                className="ripple-circle"
                style={{
                  left: "50%",
                  top: "50%",
                  width: "160px",
                  height: "160px",
                  animationDelay: "1s",
                }}
              ></div>
            </div>
          </div>
          <h1 className="text-white text-4xl font-light tracking-wider z-10 relative">
            {import.meta.env.VITE_CONSULTANCY_FIRST_NAME}
          </h1>
          <p className="text-white/70 text-sm mt-2 tracking-widest">
            {import.meta.env.VITE_CONSULTANCY_LAST_NAME}
          </p>
        </div>

        <div className="w-48 mb-6 overflow-hidden">
          <Progress value={progress} className="h-0.5 bg-white/10" />
        </div>

        <div className="flex items-center">
          <Loader className="animate-spin text-white mr-2" size={16} />
          <p className="text-white/70 text-sm">
            {Math.round(progress)}% Loading
          </p>
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="stars-container absolute inset-0 z-0 perspective-500"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
