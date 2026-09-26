import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [fadeExit, setFadeExit] = useState(false);

  useEffect(() => {
    if (percent >= 100 && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [percent, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setFadeExit(true);
      const timer = setTimeout(() => {
        import("./utils/initialFX").then((module) => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        });
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, setIsLoading]);

  return (
    <div className={`loading-screen ${fadeExit ? "loading-exit" : ""}`}>
      {/* Subtle burgundy ambient background glow */}
      <div className="loading-ambient-glow" />

      {/* Top Brand Monogram */}
      <div className="loading-header-minimal">
        <span className="loading-brand">UN</span>
      </div>

      {/* Center Cinematic Minimal Loader */}
      <div className="loading-center">
        {/* Subtle Burgundy Ember */}
        <div className="loading-ember-point">
          <div className="loading-ember-pulse" />
          <div className="loading-ember-core" />
        </div>

        {/* Identity & Subtitle */}
        <h2 className="loading-title">UMER NAWAZ</h2>
        <p className="loading-subtext">INITIALIZING INTELLIGENT SYSTEMS</p>

        {/* Hairline Burgundy Progress Bar */}
        <div className="loading-progress-track">
          <div
            className="loading-progress-bar"
            style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="loading-percentage">
          <span>{Math.min(100, Math.round(percent))}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 65) {
      let rand = Math.round(Math.random() * 8) + 4;
      percent = Math.min(65, percent + rand);
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random() * 2) + 1;
        setLoading(Math.min(96, percent));
        if (percent >= 96) {
          clearInterval(interval);
        }
      }, 150);
    }
  }, 60);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent += 2;
          setLoading(Math.min(100, percent));
        } else {
          resolve(100);
          clearInterval(interval);
        }
      }, 10);
    });
  }
  return { loaded, percent, clear };
};
