import { useEffect, useRef, useState } from "react";
import { heroMedia } from "./heroMedia.js";
import { createSwirlRenderer } from "./swirlRenderer.js";

export default function Hero() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const flowActive = useRef(false);
  const wantsPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [failed, setFailed] = useState(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (!video) return;
    const renderer = createSwirlRenderer(canvasRef.current, video);
    rendererRef.current = renderer;
    wantsPlayback.current = !preference.matches;
    if (wantsPlayback.current) video.play().catch(() => {});
    const change = () => {
      if (preference.matches) {
        wantsPlayback.current = false;
        video.pause();
        renderer?.pause();
        setPlaying(false);
      }
    };
    preference.addEventListener("change", change);
    return () => {
      preference.removeEventListener("change", change);
      video.pause();
      renderer?.dispose();
      rendererRef.current = null;
      flowActive.current = false;
    };
  }, []);

  const continueWithSwirls = () => {
    if (!wantsPlayback.current) return;
    if (rendererRef.current?.start()) {
      flowActive.current = true;
      setShowFlow(true);
      setPlaying(true);
    } else {
      setPlaying(false);
      setFailed("flow");
    }
  };

  const toggle = () => {
    if (flowActive.current) {
      wantsPlayback.current = !playing;
      if (playing) rendererRef.current?.pause();
      else rendererRef.current?.resume();
      setPlaying(!playing);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      wantsPlayback.current = false;
      video.pause();
    } else {
      wantsPlayback.current = true;
      if (video.ended) continueWithSwirls();
      else video.play().catch(() => setPlaying(false));
    }
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
      <video
        className="hero-video"
        ref={videoRef}
        src={heroMedia.video}
        poster={heroMedia.poster}
        hidden={failed === "intro"}
        muted
        playsInline
        preload="metadata"
        aria-label="Espresso fließt in Milch. Die Kamera taucht langsam in die karamellfarbenen Wirbel ein."
        onPlaying={() => setPlaying(true)}
        onPause={() => {
          if (!flowActive.current) setPlaying(false);
        }}
        onEnded={continueWithSwirls}
        onError={() => {
          setFailed("intro");
          setPlaying(false);
        }}
      />
      <canvas
        className={`hero-flow${showFlow ? " is-visible" : ""}`}
        ref={canvasRef}
        aria-hidden="true"
      />
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
        {!failed && (
          <button className="motion-control" type="button" onClick={toggle}>
            {playing ? "Bewegung pausieren" : "Bewegung fortsetzen"}
          </button>
        )}
      </div>
    </section>
  );
}
