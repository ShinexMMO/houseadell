import { useEffect, useRef, useState } from "react";
import { heroMedia } from "./heroMedia.js";

export default function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;
    if (!preference.matches) video.play().catch(() => {});
    const change = () => {
      if (preference.matches) video.pause();
    };
    preference.addEventListener("change", change);
    return () => {
      preference.removeEventListener("change", change);
      video.pause();
    };
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    if (video.ended) {
      video.currentTime = 0;
      setEnded(false);
    }
    video.play().catch(() => setPlaying(false));
  };

  return (
    <section
      className="hero hero-latte"
      id="start"
      aria-labelledby="hero-title"
    >
      <img
        className="hero-poster"
        src={heroMedia.poster}
        alt="Ein verziertes Latteglas mit Milch auf einem Holzuntersetzer im House Adell"
        width="1920"
        height="1086"
        fetchPriority="high"
      />
      {heroMedia.video && (
        <video
          className="hero-video"
          ref={videoRef}
          src={heroMedia.video}
          poster={heroMedia.poster}
          hidden={failed}
          muted
          playsInline
          preload="metadata"
          aria-label="Espresso fließt in Milch. Die Kamera taucht langsam in die karamellfarbenen Wirbel ein."
          onPlay={() => {
            setPlaying(true);
            setEnded(false);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
          }}
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-shade" />
      <div className="hero-content">
        <h1 id="hero-title">
          <span>Frühstück.</span>
          <span>Kaffee.</span>
          <span>Adell.</span>
        </h1>
        <div className="hero-caption">
          <p>
            Gute Gesellschaft.
            <br /> Noch besserer Kaffee.
          </p>
          <a href="#speisekarte" className="button button-light">
            Speisekarte ansehen
          </a>
        </div>
      </div>
      <div className="hero-bottom">
        <span>Dein Café in Rotenburg an der Fulda</span>
        {heroMedia.video && !failed && (
          <button className="motion-control" type="button" onClick={toggle}>
            {playing
              ? "Film pausieren"
              : ended
                ? "Film wiederholen"
                : "Film abspielen"}
          </button>
        )}
      </div>
    </section>
  );
}
