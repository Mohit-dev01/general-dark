
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeBackgroundProps {
  color?: string;
}

const ThreeBackground = ({ color = '#000000' }: ThreeBackgroundProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const particles = useRef<THREE.Points | null>(null);
  const stars = useRef<THREE.Points | null>(null);

  useEffect(() => {
    // Initialize scene only once
    if (!scene.current) {
      scene.current = new THREE.Scene();
    }

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    renderer.current = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.current.setSize(window.innerWidth, window.innerHeight);
    renderer.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.current.setClearColor(0x000000, 1);
    
    if (mountRef.current) {
      mountRef.current.innerHTML = '';
      mountRef.current.appendChild(renderer.current.domElement);
    }

    // Star system
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 800;
    
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      starSizes[i] = Math.random() * 2;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
        time: { value: 0 },
        pointTexture: { value: new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMTItMjZUMTk6MjM6MzcrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTEyLTI2VDE5OjI0OjMxKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTEyLTI2VDE5OjI0OjMxKzAxOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA2YzEzN2ZjLTI3YzgtNGU1NS05MmEzLTcwOWRiNWI3ZDJkOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowNmMxMzdmYy0yN2M4LTRlNTUtOTJhMy03MDlkYjViN2QyZDgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowNmMxMzdmYy0yN2M4LTRlNTUtOTJhMy03MDlkYjViN2QyZDgiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjA2YzEzN2ZjLTI3YzgtNGU1NS05MmEzLTcwOWRiNWI3ZDJkOCIgc3RFdnQ6d2hlbj0iMjAxOC0xMi0yNlQxOToyMzozNyswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKE1hY2ludG9zaCkiLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cPRuFAAAAQNJREFUWIXt1jEOgjAUBuAnJg4egZjYODXqyurk4Ck4ALcgeETdXIlxd9aQmJDASF2KtSSQlITh/1sJNP36WlooRVEURVGaVMuqO0683g5enLcjGOzd8nk5uSDdKlQawDxPXZfnqUMdoAmTwCEC2BwnEW4yAGgGbC2twQCX3xBQzFYCcA9gHxrs+JYYDQBq79Em4xRgguOUmw+Aw8S4TnMyYL0R7kEBmBzMsQVQT0mFEgBj3GQAvg8oZjtGAOYGiN8FmAFIQQXVeACiD0KkdwH8jwDRh5AYgHT+iACQHsJvkQMExAPQJxmgJ0MAiQfIJgMIPxH5JbIzHiD+pSyKoijK3/UGE4JI0zKMTiYAAAAASUVORK5CYII=') }
      },
      vertexShader: `
        attribute float size;
        uniform float time;
        varying float vAlpha;
        
        void main() {
          vAlpha = 0.5 + 0.5 * sin(time * 0.3 + position.x * 0.2);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D pointTexture;
        varying float vAlpha;
        
        void main() {
          gl_FragColor = vec4(color, vAlpha) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    stars.current = new THREE.Points(starGeometry, starMaterial);
    scene.current.add(stars.current);

    // Create particle system for fog and atmosphere
    const fogGeometry = new THREE.BufferGeometry();
    const fogCount = 200;
    
    const positions = new Float32Array(fogCount * 3);
    const scales = new Float32Array(fogCount);
    
    for (let i = 0; i < fogCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random();
    }
    
    fogGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    fogGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    const fogMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x444444) },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float scale;
        uniform float time;
        varying float vScale;
        
        void main() {
          vScale = scale;
          vec3 pos = position;
          pos.y += sin(time * 0.1 + position.x * 0.2) * 0.1 * scale;
          pos.x += cos(time * 0.1 + position.y * 0.2) * 0.1 * scale;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = scale * 30.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vScale;
        
        void main() {
          if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
          float alpha = 0.1 * vScale * (1.0 - length(gl_PointCoord - vec2(0.5, 0.5)) / 0.475);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    particles.current = new THREE.Points(fogGeometry, fogMaterial);
    scene.current.add(particles.current);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (stars.current) {
        stars.current.rotation.y = elapsedTime * 0.02;
        stars.current.rotation.z = elapsedTime * 0.01;
        
        // Update time uniform for shader animation
        (stars.current.material as THREE.ShaderMaterial).uniforms.time.value = elapsedTime;
      }
      
      if (particles.current) {
        particles.current.rotation.x = elapsedTime * 0.02;
        particles.current.rotation.y = elapsedTime * 0.01;
        
        // Update time uniform for shader animation
        (particles.current.material as THREE.ShaderMaterial).uniforms.time.value = elapsedTime;
      }
      
      if (renderer.current && scene.current) {
        renderer.current.render(scene.current, camera);
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (renderer.current) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer.current && mountRef.current) {
        mountRef.current.removeChild(renderer.current.domElement);
      }
    };
  }, [color]);

  return <div ref={mountRef} className="three-container" />;
};

export default ThreeBackground;
