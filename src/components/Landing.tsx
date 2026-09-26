import { PropsWithChildren, useEffect, useRef, useState } from "react";
import HeroLightningCanvas from "./HeroLightningCanvas";
import "./styles/Landing.css";

const NAME_CHARS = "UMER NAWAZ".split("");

const Landing = ({ children }: PropsWithChildren) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const pillarsRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);

  const [charElements, setCharElements] = useState<(HTMLSpanElement | null)[]>([]);
  const [heroElements, setHeroElements] = useState<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setCharElements([...charRefs.current]);
    setHeroElements([roleRef.current, pillarsRef.current, signatureRef.current]);
  }, []);

  // Scroll detection: transitions discovery state to permanent confirmed reveal
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY > 15 && !isScrolled) {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <div className="landing-section" id="landingDiv">
      {/* Background depth vignette */}
      <div className="hero-dark-vignette" />

      {/* The Fireball & Burning Lightning Trail Canvas */}
      <HeroLightningCanvas
        charElements={charElements}
        heroElements={heroElements}
        isScrolled={isScrolled}
      />

      <div className="landing-container hero-container">
        <div className={`hero-content ${isScrolled ? "is-confirmed" : ""}`}>
          {/* Identity Tag */}
          <div className={`hero-prefix ${isScrolled ? "is-visible" : ""}`}>
            <span>PORTFOLIO / 2026</span>
          </div>

          {/* Primary Name in Algerian Font - Revealed by Firelight */}
          <h1 className="hero-name" aria-label="UMER NAWAZ">
            {NAME_CHARS.map((char, index) => {
              if (char === " ") {
                return (
                  <span key={index} className="hero-name-space">
                    &nbsp;
                  </span>
                );
              }
              return (
                <span
                  key={index}
                  ref={(el) => (charRefs.current[index] = el)}
                  className={`hero-char ${isScrolled ? "is-confirmed" : ""}`}
                >
                  {char}
                </span>
              );
            })}
          </h1>

          {/* Secondary: Role - Revealed by Firelight & Confirmed on Scroll */}
          <div
            ref={roleRef}
            className={`hero-role hero-illuminable ${isScrolled ? "is-confirmed" : ""}`}
          >
            <h2>AI / ML ENGINEER</h2>
          </div>

          {/* Third: Supporting Pillar - Revealed by Firelight & Confirmed on Scroll */}
          <div
            ref={pillarsRef}
            className={`hero-pillars hero-illuminable ${isScrolled ? "is-confirmed" : ""}`}
          >
            <p>AGENTIC AI • INTELLIGENT SYSTEMS • LLMs</p>
          </div>

          {/* Fourth: Conceptual Signature - Revealed by Firelight & Confirmed on Scroll */}
          <div
            ref={signatureRef}
            className={`hero-signature hero-illuminable ${isScrolled ? "is-confirmed" : ""}`}
          >
            <div className="hero-signature-line">
              <span>KNOWLEDGE</span>
              <span className="dot">•</span>
              <span>REASONING</span>
              <span className="dot">•</span>
              <span>MEMORY</span>
              <span className="dot">•</span>
              <span>ACTION</span>
            </div>
          </div>

          {/* Subtle scroll hint */}
          <div className={`hero-scroll-cue ${!isScrolled ? "is-visible" : ""}`}>
            <div className="hero-scroll-indicator">
              <span className="hero-scroll-text">DISCOVER • SCROLL TO REVEAL</span>
              <div className="hero-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Landing;
