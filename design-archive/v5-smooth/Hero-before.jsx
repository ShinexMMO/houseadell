import { useEffect, useRef, useState } from "react";
import { heroMedia } from "./heroMedia.js";

export default function Hero() {
  const videoRef = useRef(null);
  const loopRef = useRef(null);
  const wantsPlayback = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [showLoop, setShowLoop] = useState(false);
  const [failed, setFailed] = useState(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    const loop = loopRef.current;
    if (!video) return;
    wantsPlayback.current = !preference.matches;
    if (wantsPlayback.current) video.play().catch(() => {});
    const change = () => {
      if (preference.matches) {
        wantsPlayback.current = false;
        video.pause();
        loop?.pause();
      }
    };
    preference.addEventListener("change", change);
    return () => {
      preference.removeEventListener("change", change);
      video.pause();
      loop?.pause();
    };
  }, []);

  const toggle = () => {
    const video =
      showLoop || videoRef.current?.ended ? loopRef.current : videoRef.current;
    if (!video) return;
    if (!video.paused) {
      wantsPlayback.current = false;
      video.pause();
      return;
    }
    wantsPlayback.current = true;
    video.play().catch(() => setPlaying(false));
  };

  const syncPlayback = () => {
    setPlaying(
      [videoRef.current, loopRef.current].some(
        (video) => video && !video.paused && !video.ended,
      ),
    );
  };

  const continueWithSwirls = () => {
    setPlaying(false);
    if (wantsPlayback.current && failed !== "loop") {
      loopRef.current?.play().catch(() => setPlaying(false));
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
      {heroMedia.video && (
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
          onPause={syncPlayback}
          onEnded={continueWithSwirls}
          onError={() => setFailed("intro")}
        />
      )}
      {heroMedia.loop && (
        <video
          className={`hero-video hero-video-loop${showLoop ? " is-visible" : ""}`}
          ref={loopRef}
          src={heroMedia.loop}
          poster={heroMedia.loopPoster}
          hidden={failed === "loop" || failed === "intro"}
          muted
          playsInline
          loop
          preload="auto"
          aria-hidden="true"
          onPlaying={() => {
            videoRef.current?.pause();
            setShowLoop(true);
            setPlaying(true);
          }}
          onPause={syncPlayback}
          onError={() => {
            setFailed("loop");
            setPlaying(false);
          }}
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
            {playing ? "Bewegung pausieren" : "Bewegung fortsetzen"}
          </button>
        )}
      </div>
    </section>
  );
}
