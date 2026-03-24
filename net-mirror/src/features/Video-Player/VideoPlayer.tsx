import { useState, useRef, useEffect, useCallback } from "react";
import type { CSSProperties, MouseEvent } from "react";
import PlayIcon from "../../shared/components/PlayIcon";
import { AudioIcon } from "../../shared/components/AudioIcon";
import { BackIcon } from "../../shared/components/BackIcon";
import { EpisodesIcon } from "../../shared/components/EpisodeIcon";
import { ForwardIcon } from "../../shared/components/ForwardIcon";
import { FullscreenIcon } from "../../shared/components/FullScreenIcon";
import PauseIcon from "../../shared/components/PauseIcon";
import { RewindIcon } from "../../shared/components/RewindIcon";
import { SmallPauseIcon } from "../../shared/components/SmallPauseIcon";
import { SmallPlayIcon } from "../../shared/components/SmallPlayIcon";
import { SubtitlesIcon } from "../../shared/components/SubtitleIcon";
import { VolumeIcon } from "../../shared/components/VolumeIcon";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Episode {
  num: number;
  title: string;
  desc: string;
  dur: string;
}

interface TooltipPos {
  x: number;
  time: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const episodes: Episode[] = [
  { num: 1, title: "The Hellfire Club", desc: "While Eleven and the gang enjoy a relatively normal life in California, a darkness lurks beneath Hawkins.", dur: "77 min" },
  { num: 2, title: "Vecna's Curse", desc: "A local teen is found dead, and Hawkins police begin investigating. Meanwhile, Eleven faces a new threat.", dur: "75 min" },
  { num: 3, title: "The Monster and the Superhero", desc: "Murray and Joyce travel to Alaska. Eleven undergoes a drastic step to try to recover her powers.", dur: "63 min" },
  { num: 4, title: "Dear Billy", desc: "Max finds herself in grave danger. Eleven learns the truth about what happened at Hawkins Lab.", dur: "79 min" },
  { num: 5, title: "The Nina Project", desc: "Eleven and Dr. Owens arrive at a secret facility. The gang tries to decode Vecna's curse.", dur: "67 min" },
  { num: 6, title: "The Dive", desc: "The team searches for the gate. Robin and Nancy learn more about Vecna's past.", dur: "74 min" },
  { num: 7, title: "The Massacre at Hawkins Lab", desc: "Eleven's recovery takes a dark turn. Joyce and Murray face an unexpected obstacle.", dur: "98 min" },
  { num: 8, title: "Papa", desc: "A determined group sets off on a dangerous mission. Eleven achieves a new level of power.", dur: "85 min" },
  { num: 9, title: "The Piggyback", desc: "The battle for Hawkins and Eleven face their most dangerous adversary yet.", dur: "149 min" },
];

const scenes: string[] = [
  "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1400&q=80",
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1400&q=80",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&q=80",
];

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}


// ─── CountdownRing ────────────────────────────────────────────────────────────

interface CountdownRingProps {
  countdown: number;
  total?: number;
}

function CountdownRing({ countdown, total = 8 }: CountdownRingProps) {
  const circumference = 62.8;
  const offset = circumference * (countdown / total);
  return (
    <span style={{ display: "inline-block", position: "relative", width: 24, height: 24, verticalAlign: "middle", marginRight: 6 }}>
      <svg viewBox="0 0 24 24" width="24" height="24" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" />
        <circle
          cx="12" cy="12" r="10" fill="none"
          stroke="#e50914" strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - offset}
          style={{ transition: "stroke-dashoffset 1s linear" }}
        />
      </svg>
    </span>
  );
}

// ─── EpisodeCard ──────────────────────────────────────────────────────────────

interface EpisodeCardProps {
  episode: Episode;
  isActive: boolean;
  onClick: () => void;
}

function EpisodeCard({ episode, isActive, onClick }: EpisodeCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: 12, padding: 10, borderRadius: 4,
        cursor: "pointer", marginBottom: 8,
        background: isActive
          ? "rgba(255,255,255,0.12)"
          : hovered
          ? "rgba(255,255,255,0.08)"
          : "transparent",
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 96, height: 54, borderRadius: 3, flexShrink: 0,
        background: "#222", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 11, color: "rgba(255,255,255,0.4)",
      }}>
        E{episode.num}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>
            E{episode.num}: {episode.title}
          </span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap" }}>
            {episode.dur}
          </span>
        </div>
        <p style={{
          fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.4, margin: "3px 0 0",
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {episode.desc}
        </p>
      </div>
    </div>
  );
}

// ─── NetflixVideoPlayer ───────────────────────────────────────────────────────

export default function NetflixVideoPlayer() {
  const TOTAL_SEC = 3312;

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSec, setCurrentSec] = useState<number>(0);
  const [volume, setVolume] = useState<number>(85);
  const [muted, setMuted] = useState<boolean>(false);
  const [subtitlesOn, setSubtitlesOn] = useState<boolean>(false);
  const [episodesOpen, setEpisodesOpen] = useState<boolean>(false);
  const [controlsVisible, setControlsVisible] = useState<boolean>(true);
  const [showSkipIntro, setShowSkipIntro] = useState<boolean>(false);
  const [nextUpVisible, setNextUpVisible] = useState<boolean>(false);
  const [nextUpCountdown, setNextUpCountdown] = useState<number>(8);
  const [activeEpisodeIdx, setActiveEpisodeIdx] = useState<number>(0);
  const [sceneIdx, setSceneIdx] = useState<number>(0);
  const [tooltipPos, setTooltipPos] = useState<TooltipPos>({ x: 0, time: "0:00" });
  const [progressHover, setProgressHover] = useState<boolean>(false);

  const tickerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const controlTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const nextUpShownRef = useRef<boolean>(false);
  const playerRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // ── Ticker ──
  useEffect(() => {
    if (isPlaying) {
      tickerRef.current = setInterval(() => {
        setCurrentSec((prev) => {
          if (prev >= TOTAL_SEC) { setIsPlaying(false); return prev; }
          return prev + 0.2;
        });
      }, 200);
    } else {
      clearInterval(tickerRef.current);
    }
    return () => clearInterval(tickerRef.current);
  }, [isPlaying]);

  // ── Skip intro visibility ──
  useEffect(() => {
    setShowSkipIntro(currentSec > 5 && currentSec < 90);
  }, [currentSec]);

  // ── Next-up trigger ──
  useEffect(() => {
    if (isPlaying && currentSec >= TOTAL_SEC - 60 && !nextUpShownRef.current) {
      nextUpShownRef.current = true;
      setNextUpVisible(true);
      setNextUpCountdown(8);
      countdownTimerRef.current = setInterval(() => {
        setNextUpCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownTimerRef.current);
            playNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [currentSec, isPlaying]);

  // ── Auto-hide controls ──
  const showControls = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(controlTimeoutRef.current);
    controlTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => { return () => clearTimeout(controlTimeoutRef.current); }, []);

  // ── Handlers ──
  const togglePlay = () => setIsPlaying((p) => !p);

  const seek = (delta: number) =>
    setCurrentSec((prev) => Math.max(0, Math.min(TOTAL_SEC, prev + delta)));

  const skipIntro = () => setCurrentSec(90);

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setCurrentSec(Math.max(0, Math.min(TOTAL_SEC, pct * TOTAL_SEC)));
  };

  const handleProgressHover = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setTooltipPos({ x: e.clientX - rect.left, time: fmt(pct * TOTAL_SEC) });
  };

  const dismissNextUp = () => {
    clearInterval(countdownTimerRef.current);
    setNextUpVisible(false);
  };

  const playNext = () => {
    dismissNextUp();
    setCurrentSec(0);
    nextUpShownRef.current = false;
    const nextIdx = (activeEpisodeIdx + 1) % episodes.length;
    setActiveEpisodeIdx(nextIdx);
    setSceneIdx(nextIdx % scenes.length);
  };

  const selectEpisode = (idx: number) => {
    setActiveEpisodeIdx(idx);
    setSceneIdx(idx % scenes.length);
    setCurrentSec(0);
    nextUpShownRef.current = false;
    setEpisodesOpen(false);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    const el = playerRef.current as HTMLDivElement & { requestFullscreen?: () => Promise<void> };
    if (!document.fullscreenElement) el?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  const progress = (currentSec / TOTAL_SEC) * 100;
  const currentEpisode = episodes[activeEpisodeIdx];
  const nextEpisode = episodes[(activeEpisodeIdx + 1) % episodes.length];

  // ─── Styles (fully typed as CSSProperties) ───────────────────────────────

  const s: Record<string, CSSProperties> = {
    wrapper: {
      position: "relative", width: "100%", height: "100vh",
      background: "#000", overflow: "hidden",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#fff",
    },
    videoBg: {
      position: "absolute", inset: 0, overflow: "hidden",
    },
    sceneImg: {
      width: "100%", height: "100%",
      objectFit: "cover" as const,
      filter: "brightness(0.55)",
    },
    sceneOverlay: {
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
    },
    controlsOverlay: {
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column" as const,
      transition: "opacity 0.4s",
      opacity: controlsVisible ? 1 : 0,
      pointerEvents: controlsVisible ? "auto" : "none",
    },
    topBar: {
      display: "flex", alignItems: "center", gap: 16,
      padding: "20px 28px 0",
      background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
    },
    backBtn: {
      background: "none", border: "none", color: "#fff", cursor: "pointer",
      display: "flex", alignItems: "center", gap: 8,
      fontSize: 15, fontWeight: 500, padding: "6px 0",
    },
    topTitle: {
      fontSize: 17, fontWeight: 600, letterSpacing: "0.01em",
      textShadow: "0 1px 6px rgba(0,0,0,0.8)",
    },
    skipIntroBtn: {
      marginLeft: "auto",
      background: "rgba(20,20,20,0.7)",
      border: "1.5px solid rgba(255,255,255,0.7)",
      color: "#fff", fontSize: 14, fontWeight: 500,
      padding: "8px 22px", borderRadius: 4, cursor: "pointer",
    },
    midControls: {
      flex: 1, display: "flex", alignItems: "center",
      justifyContent: "center", gap: 40,
    },
    ctrlBtn: {
      background: "none", border: "none", color: "#fff", cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      borderRadius: "50%", padding: 0,
    },
    playPauseBtn: {
      width: 70, height: 70,
      background: "rgba(255,255,255,0.15)",
      border: "2px solid rgba(255,255,255,0.3)",
    },
    bottomBar: {
      padding: "0 28px 20px",
      background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
    },
    progressArea: {
      position: "relative", cursor: "pointer", padding: "8px 0",
    },
    progressTrack: {
      width: "100%", height: progressHover ? 6 : 4,
      background: "rgba(255,255,255,0.25)", borderRadius: 2,
      position: "relative", overflow: "visible",
      transition: "height 0.2s",
    },
    progressBuffer: {
      position: "absolute", left: 0, top: 0, height: "100%",
      background: "rgba(255,255,255,0.35)", borderRadius: 2, width: "72%",
    },
    progressFill: {
      position: "absolute", left: 0, top: 0, height: "100%",
      background: "#e50914", borderRadius: 2,
      width: `${progress}%`, transition: "width 0.1s linear",
    },
    progressThumb: {
      position: "absolute", top: "50%",
      transform: "translate(-50%, -50%)",
      width: 14, height: 14, background: "#e50914",
      borderRadius: "50%", opacity: progressHover ? 1 : 0,
      left: `${progress}%`, transition: "opacity 0.2s",
      pointerEvents: "none" as const,
    },
    tooltip: {
      position: "absolute", bottom: 28,
      background: "rgba(0,0,0,0.85)", color: "#fff",
      fontSize: 12, padding: "4px 8px", borderRadius: 3,
      pointerEvents: "none" as const, transform: "translateX(-50%)",
      whiteSpace: "nowrap" as const, opacity: progressHover ? 1 : 0,
      left: tooltipPos.x, transition: "opacity 0.15s",
    },
    bottomRow: { display: "flex", alignItems: "center", gap: 16 },
    timeDisplay: {
      fontSize: 13, color: "rgba(255,255,255,0.9)",
      minWidth: 110, letterSpacing: "0.03em", whiteSpace: "nowrap" as const,
    },
    rightCtrls: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 },
    qualityBadge: {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.2)",
      fontSize: 11, fontWeight: 700, padding: "2px 6px",
      borderRadius: 3, color: "rgba(255,255,255,0.9)", letterSpacing: "0.05em",
    },
    volumeGroup: { display: "flex", alignItems: "center", gap: 8 },
    volumeSlider: { width: 70, accentColor: "#fff", cursor: "pointer" },
    episodesPanel: {
      position: "absolute", right: 0, top: 0, bottom: 0,
      width: 340, background: "rgba(20,20,20,0.97)",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      transform: episodesOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
      overflowY: "auto" as const, zIndex: 20, padding: "24px 20px",
    },
    nextUpCard: {
      position: "absolute", bottom: 90, right: 28,
      background: "rgba(20,20,20,0.95)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: 6, padding: 14, width: 280,
      display: nextUpVisible ? "flex" : "none",
      flexDirection: "column" as const, gap: 12, zIndex: 10,
    },
  };

  const iconBtnStyle = (active = false): CSSProperties => ({
    background: "none", border: "none",
    color: active ? "#e50914" : "rgba(255,255,255,0.85)",
    cursor: "pointer", padding: 5, borderRadius: 4,
    display: "flex", alignItems: "center",
  });

  return (
    <div
      ref={playerRef}
      style={s.wrapper}
      onMouseMove={showControls}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element;
        if (target.closest("button") || target.closest("[data-panel]")) return;
        togglePlay();
      }}
    >
      {/* ── Video Background ── */}
      <div style={s.videoBg}>
        <img src={scenes[sceneIdx]} alt="scene" style={s.sceneImg} />
        <div style={s.sceneOverlay} />
      </div>

      {/* ── Controls Overlay ── */}
      <div style={s.controlsOverlay}>

        {/* Top Bar */}
        <div style={s.topBar}>
          <button style={s.backBtn} onClick={() => navigate(-1)}>
            <BackIcon />
          </button>
          <div style={s.topTitle}>
            Stranger Things · S4:E{currentEpisode.num} · {currentEpisode.title}
          </div>
          {showSkipIntro && (
            <button style={s.skipIntroBtn} onClick={skipIntro}>
              Skip Intro
            </button>
          )}
        </div>

        {/* Mid Controls */}
        <div style={s.midControls}>
          <button style={s.ctrlBtn} onClick={() => seek(-10)}><RewindIcon /></button>
          <button style={{ ...s.ctrlBtn, ...s.playPauseBtn }} onClick={togglePlay}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button style={s.ctrlBtn} onClick={() => seek(10)}><ForwardIcon /></button>
        </div>

        {/* Bottom Bar */}
        <div style={s.bottomBar}>

          {/* Progress Bar */}
          <div
            style={s.progressArea}
            onClick={handleProgressClick}
            onMouseMove={handleProgressHover}
            onMouseEnter={() => setProgressHover(true)}
            onMouseLeave={() => setProgressHover(false)}
          >
            <div style={s.progressTrack}>
              <div style={s.progressBuffer} />
              <div style={s.progressFill} />
              <div style={s.progressThumb} />
            </div>
            <div style={s.tooltip}>{tooltipPos.time}</div>
          </div>

          {/* Bottom Row */}
          <div style={s.bottomRow}>
            <button style={s.ctrlBtn} onClick={togglePlay}>
              {isPlaying ? <SmallPauseIcon /> : <SmallPlayIcon />}
            </button>

            <div style={s.volumeGroup}>
              <button style={iconBtnStyle()} onClick={() => setMuted((m) => !m)}>
                <VolumeIcon muted={muted} />
              </button>
              <input
                type="range" min="0" max="100"
                value={muted ? 0 : volume}
                style={s.volumeSlider}
                onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
              />
            </div>

            <div style={s.timeDisplay}>{fmt(currentSec)} / {fmt(TOTAL_SEC)}</div>

            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {currentEpisode.title}
            </div>

            <div style={s.rightCtrls}>
              <span style={s.qualityBadge}>HD</span>
              <button style={iconBtnStyle(subtitlesOn)} onClick={() => setSubtitlesOn((v) => !v)} title="Subtitles">
                <SubtitlesIcon />
              </button>
              <button style={iconBtnStyle()} onClick={() => alert("Audio: English")} title="Audio">
                <AudioIcon />
              </button>
              <button style={iconBtnStyle(episodesOpen)} onClick={() => setEpisodesOpen((o) => !o)} title="Episodes">
                <EpisodesIcon />
              </button>
              <button style={iconBtnStyle()} onClick={toggleFullscreen} title="Fullscreen">
                <FullscreenIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Next Up Card ── */}
      <div style={s.nextUpCard} data-panel="">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            <CountdownRing countdown={nextUpCountdown} total={8} />
            Next Episode
          </span>
          <button onClick={dismissNextUp} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 80, height: 45, background: "linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius: 3, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>S4:E{nextEpisode.num}</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{nextEpisode.title}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{nextEpisode.dur} · 2022</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={playNext} style={{ background: "#e50914", border: "none", color: "#fff", fontSize: 13, fontWeight: 600, padding: "7px 16px", borderRadius: 4, cursor: "pointer", flex: 1 }}>
            ▶ Play
          </button>
          <button onClick={dismissNextUp} style={{ background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", fontSize: 13, padding: "7px 12px", borderRadius: 4, cursor: "pointer" }}>
            Later
          </button>
        </div>
      </div>

      {/* ── Episodes Panel ── */}
      <div style={s.episodesPanel} data-panel="">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600 }}>Season 4</h3>
          <button onClick={() => setEpisodesOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>
        {episodes.map((ep, idx) => (
          <EpisodeCard
            key={ep.num}
            episode={ep}
            isActive={idx === activeEpisodeIdx}
            onClick={() => selectEpisode(idx)}
          />
        ))}
      </div>
    </div>
  );
}