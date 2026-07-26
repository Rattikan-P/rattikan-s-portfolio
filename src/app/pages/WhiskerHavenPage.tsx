import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getAdjacentProjects, projects } from "../data/projects";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";

import empathyMap from "@/imports/Empathy_Map.png";
import surveyResults from "@/imports/Google_Form_Response.png";
import affinityDiagram from "@/imports/Affinity_Diagram_Grouping.png";
import persona from "@/imports/Persona.png";
import userJourneyMap from "@/imports/User_Journey_Map__As-is_.png";
import howMightWe from "@/imports/How_Might_We.png";
import impactEffort from "@/imports/Prioritization_-_Impact-Effort.png";
import moscow from "@/imports/Prioritization_-_MoSCoW.png";
import crazy8s from "@/imports/Crazy8s.png";
import moodBoard from "@/imports/Mood_Board.png";
import sitemap from "@/imports/Sitemap.png";
import userFlow from "@/imports/User_Flow.png";

const AMBER = "#F5A623";
const DARK = "#1A1A1A";

const PHASE_LIST = [
  { num: "01", label: "Discover",   bg: "#FAFAF8" },
  { num: "02", label: "Synthesise", bg: "#F5EBDC" },
  { num: "03", label: "Define",     bg: "#FAFAF8" },
  { num: "04", label: "Ideate",     bg: "#F5EBDC" },
  { num: "05", label: "Design",     bg: "#FAFAF8" },
  { num: "06", label: "Validate",   bg: "#FAF3E6" },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Img({ src, alt, caption, ratio }: { src: string; alt: string; caption?: string; ratio?: string }) {
  return (
    <FadeUp>
      <figure style={{ margin: 0 }}>
        <motion.div
          whileHover={{ scale: 1.015, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ borderRadius: "12px", overflow: "hidden", cursor: "zoom-in" }}
        >
          <ImageWithFallback
            src={src} alt={alt}
            style={{
              width: "100%", display: "block", border: "1px solid rgba(0,0,0,0.06)",
              aspectRatio: ratio, objectFit: ratio ? "cover" : undefined,
            }}
          />
        </motion.div>
        {caption && (
          <figcaption style={{
            fontSize: "11px", color: "#AAA", letterSpacing: "0.04em",
            marginTop: "10px", textAlign: "center",
          }}>{caption}</figcaption>
        )}
      </figure>
    </FadeUp>
  );
}

function SplitBlock({
  image, alt, caption, reverse = false, children,
}: {
  image: string;
  alt: string;
  caption?: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <FadeUp>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "32px", alignItems: "stretch", margin: "24px 0",
      }}>
        <div style={{ order: reverse ? 2 : 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>{children}</div>
        <div style={{ order: reverse ? 1 : 2, display: "flex", flexDirection: "column" }}>
          <figure style={{ margin: 0, flex: 1, display: "flex", flexDirection: "column" }}>
            <motion.div
              whileHover={{ scale: 1.015, boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ borderRadius: "12px", overflow: "hidden", cursor: "zoom-in", flex: 1 }}
            >
              <ImageWithFallback
                src={image} alt={alt}
                style={{ width: "100%", height: "100%", display: "block", border: "1px solid rgba(0,0,0,0.06)", objectFit: "cover" }}
              />
            </motion.div>
            {caption && (
              <figcaption style={{
                fontSize: "11px", color: "#AAA", letterSpacing: "0.04em",
                marginTop: "10px", textAlign: "center",
              }}>{caption}</figcaption>
            )}
          </figure>
        </div>
      </div>
    </FadeUp>
  );
}

function PawDivider() {
  return (
    <FadeUp>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "16px", padding: "40px 0" }}>
        <div style={{ width: "70px", height: "1px", background: "rgba(0,0,0,0.1)" }} />
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(0,0,0,0.15)" }} />
        <div style={{ width: "70px", height: "1px", background: "rgba(0,0,0,0.1)" }} />
      </div>
    </FadeUp>
  );
}

function CountUpStat({ value }: { value: string }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? 1 : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 1400, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  if (!match) return <>{value}</>;
  return <span ref={ref}>{display.toFixed(decimals)}{suffix}</span>;
}

function PullQuote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <FadeUp>
      <div style={{ margin: "40px 0", textAlign: "center" }}>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(22px, 3vw, 32px)",
          color: DARK, lineHeight: 1.4, fontStyle: "italic", fontWeight: 400,
          maxWidth: "680px", margin: "0 auto", position: "relative",
        }}>
          <span style={{ color: AMBER, fontSize: "1.4em", lineHeight: 0, verticalAlign: "-0.2em", marginRight: "4px" }}>“</span>
          {children}
          <span style={{ color: AMBER, fontSize: "1.4em", lineHeight: 0, verticalAlign: "-0.2em", marginLeft: "4px" }}>”</span>
        </div>
        {author && <p style={{ fontSize: "12px", color: "#AAA", marginTop: "12px", letterSpacing: "0.04em" }}>{author}</p>}
      </div>
    </FadeUp>
  );
}

function PawTrail({ side = "left" }: { side?: "left" | "right" }) {
  const paws = side === "right"
    ? [
        { top: "10%", right: "4%", rotate: 200, size: 26 },
        { top: "26%", right: "8%", rotate: 210, size: 22 },
        { top: "44%", right: "5%", rotate: 195, size: 24 },
        { top: "62%", right: "9%", rotate: 205, size: 20 },
      ]
    : [
        { bottom: "8%", left: "3%", rotate: -15, size: 26 },
        { bottom: "24%", left: "7%", rotate: -25, size: 22 },
        { bottom: "42%", left: "3%", rotate: -10, size: 24 },
        { bottom: "60%", left: "8%", rotate: -20, size: 20 },
      ];
  return (
    <>
      {paws.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
          style={{
            position: "absolute",
            top: "top" in p ? p.top : undefined,
            bottom: "bottom" in p ? p.bottom : undefined,
            left: "left" in p ? p.left : undefined,
            right: "right" in p ? p.right : undefined,
            fontSize: p.size, transform: `rotate(${p.rotate}deg)`,
            pointerEvents: "none", userSelect: "none", zIndex: 0,
          }}
        >
          🐾
        </motion.span>
      ))}
    </>
  );
}

function PhaseSection({
  phaseIndex, title, description, children,
  sectionRef, paws,
}: {
  phaseIndex: number;
  title: string;
  description: string;
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
  paws?: "left" | "right";
}) {
  const p = PHASE_LIST[phaseIndex];
  const isDark = p.bg === AMBER;
  const textColor = DARK;

  return (
    <div
      ref={sectionRef}
      data-phase={phaseIndex}
      style={{ background: p.bg, position: "relative", overflow: "hidden" }}
    >
      {/* Ghost number */}
      <div style={{
        position: "absolute", top: "-20px", right: "-16px",
        fontFamily: "var(--font-display)", fontSize: "clamp(140px, 20vw, 240px)",
        color: "rgba(0,0,0,0.04)", fontWeight: 700, lineHeight: 1,
        pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
      }}>{p.num}</div>

      {paws && <PawTrail side={paws} />}

      {/* Phase label strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: "16px",
        padding: "22px 40px",
        background: "rgba(0,0,0,0.04)",
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: "13px",
          color: AMBER, letterSpacing: "0.02em", fontStyle: "italic",
        }}>{p.num}</span>
        <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.12)" }} />
        <span style={{
          fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600,
          color: isDark ? DARK : "#999",
        }}>{p.label.toUpperCase()}</span>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 80px", position: "relative", zIndex: 1 }}>
        <FadeUp>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
            color: textColor, letterSpacing: "-0.02em", fontWeight: 400,
            lineHeight: 1.1, marginBottom: "14px",
          }}>{title}</h2>
          <p style={{
            fontSize: "16px", color: isDark ? DARK : "#777",
            lineHeight: "1.75", maxWidth: "640px", marginBottom: "44px",
          }}>{description}</p>
        </FadeUp>
        {children}
      </div>
    </div>
  );
}

// Sticky side progress
function SideProgress({ activePhase }: { activePhase: number }) {
  return (
    <div style={{
      position: "fixed", right: "28px", top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "10px",
      zIndex: 50,
    }}>
      {PHASE_LIST.map((p, i) => (
        <motion.div
          key={p.num}
          title={p.label}
          animate={{
            width: i === activePhase ? 24 : 6,
            background: i === activePhase ? AMBER : "rgba(0,0,0,0.18)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px", cursor: "default" }}
        />
      ))}
    </div>
  );
}

export function WhiskerHavenPage() {
  const { next } = getAdjacentProjects("whisker-haven");
  const [activePhase, setActivePhase] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(i); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function makeRef(i: number) {
    return (el: HTMLDivElement | null) => { sectionRefs.current[i] = el; };
  }

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <SideProgress activePhase={activePhase} />

      {/* ── Hero ── */}
      <div style={{
        background: AMBER, padding: "120px 40px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-60px", right: "-20px",
            fontFamily: "var(--font-display)", fontSize: "clamp(180px, 26vw, 360px)",
            lineHeight: 1, color: "rgba(0,0,0,0.05)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >01</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: DARK, opacity: 0.4, textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.03em", transition: "opacity 0.2s", marginBottom: "48px",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
          </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
        <div style={{ flex: "1.25 1 340px" }}>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}
          >
            <span style={{ fontSize: "11px", color: DARK, opacity: 0.4, letterSpacing: "0.1em" }}>01 · 2026</span>
            <span style={{ fontSize: "11px", color: DARK, background: "rgba(0,0,0,0.08)", borderRadius: "4px", padding: "2px 8px", opacity: 0.7 }}>Cat Hotel Booking & Management Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 6.5vw, 84px)",
              lineHeight: 1, color: DARK, letterSpacing: "-0.03em",
              marginBottom: "20px", fontWeight: 400,
            }}
          >
            Whisker Haven
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: DARK, opacity: 0.6, maxWidth: "540px", lineHeight: "1.7", marginBottom: "48px" }}
          >
            A booking platform designed to make reserving cat hotel stays simple and
            stress-free: from early research through to a validated high-fidelity prototype.
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(255,255,255,0.4)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}
          >
            {[
              { label: "My role", value: "UX/UI Designer" },
              { label: "Team", value: "2-person team" },
              { label: "Platform", value: "Web App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.2)", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: DARK, opacity: 0.4, letterSpacing: "0.08em", marginBottom: "3px" }}>
                  {m.label.toUpperCase()}
                </p>
                <p style={{ fontSize: "13px", color: DARK }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}
          >
            {[
              { value: "100%", label: "Task completion rate" },
              { value: "85", label: "SUS score: Grade A" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: DARK, lineHeight: 1, marginBottom: "4px" }}>
                  <CountUpStat value={s.value} />
                </div>
                <div style={{ fontSize: "13px", color: DARK, opacity: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: "0.9 1 300px" }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
            }}
          >
            <img
              src="/projects/whisker-haven/hero.png"
              alt="Whisker Haven web app — homepage with room booking and cat care features"
              style={{ width: "100%", display: "block" }}
            />
          </motion.div>
        </motion.div>

        </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#FBE8C0", padding: "18px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["UX Research", "UI Design", "Usability Testing", "End-to-end UX", "Web App"].map((t) => (
            <span key={t} style={{
              background: "rgba(245,166,35,0.18)", color: "#9A6B1A", borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(245,166,35,0.3)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <PhaseSection
        phaseIndex={0}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Mapping the cat owner's emotional experience"
        description="Research combined 5 in-depth interviews with a 15-person survey to understand not just what users do, but how they feel. The core finding: the primary problem isn't UX friction; it's anxiety."
      >
        <div ref={makeRef(0)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />

        <FadeUp>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1px", background: "#E5D9C2", borderRadius: "12px",
            overflow: "hidden", marginBottom: "28px",
          }}>
            {[
              { value: "4.2/5", label: "Average anxiety during a stay" },
              { value: "93%", label: "Worry about cat's diet & wellbeing" },
              { value: "2.5/5", label: "Rated booking ease (low)" },
              { value: "93%", label: "Find comparing prices difficult" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#F3ECDF", padding: "18px 16px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: AMBER, lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "11px", color: "#6B5A45", lineHeight: "1.4" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
          <Img src={surveyResults} alt="Google Form survey responses" caption="Survey (n=15): quantitative validation" />
          <Img src={empathyMap} alt="Empathy map" caption="Empathy Map (n=5 interviews): Say · Think · Do · Feel" />
        </div>
        <PullQuote>
          Not knowing if the cat is okay is the single biggest concern; anxiety doesn't stop until owners are physically reunited.
        </PullQuote>
      </PhaseSection>

      {/* ═══ 02 SYNTHESISE ═══ */}
      <PhaseSection
        phaseIndex={1}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="5 problem clusters from 30+ insights"
        description="Interview notes and survey responses were organised into an affinity diagram, revealing that the problems span emotional, logistical, and communication dimensions."
      >
        <div ref={makeRef(1)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
          {[
            { name: "Emotional Anxiety", color: "#FFC5C5", insight: "Not knowing if the cat is okay is the single biggest concern; anxiety doesn't stop until owners are physically reunited." },
            { name: "Emergency & Safety", color: "#C5E8FF", insight: "No emergency protocol exists. Owners found out days later their cat hadn't been eating; with no notification from the facility." },
            { name: "Care & Profile Management", color: "#C5FFC8", insight: "Owners repeat the cat's diet, allergies, and behaviours at every visit. Staff gave the wrong food because notes weren't read." },
            { name: "Communication Gap", color: "#FFE8C5", insight: "Owners always initiate contact. Replies are vague or a blurry photo. Asking more feels like being a burden." },
            { name: "Booking & Information", color: "#E8C5FF", insight: "Everything happens over LINE. No booking system, no pricing online; endless back-and-forth to confirm a date." },
          ].map((g, i) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: g.color, borderRadius: "10px", padding: "16px 20px",
                display: "grid", gridTemplateColumns: "160px 1fr", gap: "16px", alignItems: "start",
              }}
            >
              <p style={{ fontSize: "13px", color: DARK, fontWeight: 500 }}>{g.name}</p>
              <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.55" }}>{g.insight}</p>
            </motion.div>
          ))}
        </div>
        <Img src={affinityDiagram} alt="Affinity diagram" caption="Affinity Diagram: grouped research insights" />
        <PullQuote>
          Owners always initiate contact. Replies are vague or a blurry photo, and asking more feels like being a burden.
        </PullQuote>
      </PhaseSection>

      {/* ═══ 03 DEFINE ═══ */}
      <PhaseSection
        phaseIndex={2}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Who we're designing for"
        description="Research findings shaped a primary persona and an As-Is journey map showing exactly where emotional low points occur, and where design intervention matters most."
      >
        <div ref={makeRef(2)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <FadeUp>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px", alignItems: "center",
            background: "#FFFFFF", borderRadius: "14px", padding: "24px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <figure style={{ margin: 0 }}>
              <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                <ImageWithFallback
                  src={persona} alt="Persona: Nat"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <figcaption style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.04em", marginTop: "8px", textAlign: "center" }}>
                Persona: Nat, Sales Executive, cat owner of Mochi & Milo
              </figcaption>
            </figure>
            <div>
              <p style={{ fontSize: "11px", color: AMBER, letterSpacing: "0.08em", marginBottom: "8px", fontWeight: 600 }}>
                PRIMARY PERSONA
              </p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "26px", color: DARK,
                letterSpacing: "-0.02em", fontWeight: 400, marginBottom: "4px",
              }}>
                Nat
              </h3>
              <p style={{ fontSize: "13px", color: "#999", marginBottom: "16px" }}>
                A young professional who travels frequently for work and can't stop worrying about her cats.
              </p>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1px", background: "#E5D9C2", borderRadius: "10px",
                overflow: "hidden", marginBottom: "16px",
              }}>
                {[
                  { label: "Age", value: "26" },
                  { label: "Occupation", value: "Sales Executive" },
                  { label: "Location", value: "Bangkok (4–5× / yr)" },
                  { label: "Cats", value: "Mochi & Milo, 5 yrs" },
                  { label: "Device", value: "Smartphone, iPad" },
                  { label: "Tech comfort", value: "High: app-first" },
                ].map((d) => (
                  <div key={d.label} style={{ background: "#F3ECDF", padding: "12px 14px" }}>
                    <p style={{ fontSize: "10px", color: "#9A7B5A", letterSpacing: "0.07em", marginBottom: "3px" }}>{d.label.toUpperCase()}</p>
                    <p style={{ fontSize: "12px", color: DARK }}>{d.value}</p>
                  </div>
                ))}
              </div>
              <div style={{
                background: AMBER + "22", borderRadius: "10px", padding: "16px 18px",
                borderLeft: `4px solid ${AMBER}`,
              }}>
                <p style={{ fontSize: "14px", color: DARK, lineHeight: "1.6", fontStyle: "italic" }}>
                  "I have three days of client meetings in Chiang Mai, but I can't stop worrying if Mochi and Milo are okay."
                </p>
                <p style={{ fontSize: "11px", color: "#AAA", marginTop: "6px" }}>- Nat</p>
              </div>
            </div>
          </div>
        </FadeUp>
        <Img src={userJourneyMap} alt="As-Is user journey map" caption="User Journey Map (As-Is): Focused ➔ Irritated ➔ Frustrated ➔ Exhausted ➔ Anxious ➔ Stressed ➔ Annoyed" />
      </PhaseSection>

      {/* ═══ 04 IDEATE ═══ */}
      <PhaseSection
        phaseIndex={3}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="HMW ➔ Prioritise ➔ Sketch"
        description="Each cluster was reframed as a How Might We question. 8 HMWs were scored on Impact vs Effort and filtered via MoSCoW, revealing MVP scope. Crazy 8s generated concepts in 8 minutes flat."
      >
        <div ref={makeRef(3)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <Img src={howMightWe} alt="8 How Might We questions" caption="How Might We: 8 design opportunities" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "16px 0", alignItems: "start" }}>
          <Img src={impactEffort} alt="Impact-Effort matrix" caption="Impact-Effort prioritisation" />
          <Img src={moscow} alt="MoSCoW prioritisation" caption="MoSCoW: 7 Must Have, 1 Should Have" />
        </div>
        <FadeUp delay={0.1}>
          <div style={{
            background: "#FFFFFF", borderRadius: "12px", padding: "18px 22px",
            borderLeft: "4px solid #2D6A4F", marginBottom: "20px",
            border: "1px solid rgba(0,0,0,0.07)", borderLeftWidth: "4px", borderLeftColor: "#2D6A4F",
          }}>
            <p style={{ fontSize: "10px", color: "#2D6A4F", letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>
              QUICK WINS: HIGH IMPACT, LOW EFFORT
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Self-managed bookings 24/7", "Instant booking status", "Proactive real-time updates", "Fast booking flow"].map((w) => (
                <span key={w} style={{
                  background: "#EAF3EC", color: "#2D6A4F",
                  borderRadius: "6px", padding: "5px 12px", fontSize: "12px",
                }}>{w}</span>
              ))}
            </div>
          </div>
        </FadeUp>
        <Img src={crazy8s} alt="Crazy 8s sketches" caption="Crazy 8s: rapid ideation" />

        <FadeUp delay={0.1}>
          <div style={{
            background: "#FFFFFF", borderRadius: "12px", padding: "20px 24px",
            border: "1px solid rgba(0,0,0,0.06)", marginTop: "20px",
          }}>
            <p style={{ fontSize: "10px", color: AMBER, letterSpacing: "0.08em", marginBottom: "14px", fontWeight: 600 }}>
              FEATURE LIST: 8 KEY FEATURES FROM PRIORITISATION
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
              {[
                { name: "24/7 Automated Booking", desc: "Real-time availability, instant confirmation, no admin wait." },
                { name: "Digital Pet Profile", desc: "Centralised diet, allergy & health data; no repeat briefings." },
                { name: "Daily Status Timeline", desc: "Scheduled photo & video updates throughout the day." },
                { name: "Real-time CCTV", desc: "Live video stream of the cat's room, on demand." },
                { name: "Emergency SOS", desc: "Instant mobile alert for critical or medical incidents." },
                { name: "Room Comparison", desc: "Side-by-side room types, prices & amenities." },
                { name: "Trip Summary", desc: "Post-stay dashboard: duration, expenses, health report." },
                { name: "Check-in Bridge", desc: "Digital summary for faster, accurate physical drop-off." },
              ].map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  style={{ display: "flex", gap: "8px", alignItems: "start" }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", color: AMBER, opacity: 0.6, flexShrink: 0, paddingTop: "1px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p style={{ fontSize: "12px", color: DARK, fontWeight: 500 }}>{f.name}</p>
                    <p style={{ fontSize: "11px", color: "#999", lineHeight: "1.4", marginTop: "1px" }}>{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </PhaseSection>

      {/* ═══ The Solution ═══ */}
      <div style={{ background: "#FAFAF8", padding: "64px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontSize: "11px", color: "#BBB", letterSpacing: "0.12em", marginBottom: "10px" }}>
              THE SOLUTION
            </p>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400,
              lineHeight: 1.1, marginBottom: "14px",
            }}>
              A bridge of reassurance between owners and their cats
            </h2>
            <p style={{ fontSize: "16px", color: "#777", lineHeight: "1.75", maxWidth: "640px", marginBottom: "36px" }}>
              The prioritised features crystallised into three core functional areas. Each one solves a specific pain
              point uncovered in research, and together they turn a reactive, anxious experience into an assured one.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              {
                num: "01",
                name: "Booking Engine",
                tag: "Visual-First Reservation",
                desc: "Detailed room photography and a clear comparison table. A streamlined step-by-step flow: date, cat, room, add-ons, payment.",
              },
              {
                num: "02",
                name: "Stay Management",
                tag: "The Digital Nanny",
                desc: "A private owner dashboard active throughout the stay: 24/7 live CCTV, direct staff chat, structured Daily Report Cards, and SOS emergency alerts.",
              },
              {
                num: "03",
                name: "Pet Identity",
                tag: "Cat Passport",
                desc: "A single source of truth for each cat: diet, allergies, behaviour, medical history. Staff access it instantly via QR code, no repeated briefings.",
              },
            ].map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "#FFFFFF", borderRadius: "14px", padding: "24px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  borderTop: `3px solid ${AMBER}`,
                }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: AMBER, fontStyle: "italic" }}>{p.num}</span>
                <h3 style={{ fontSize: "16px", color: DARK, fontWeight: 600, margin: "6px 0 2px" }}>{p.name}</h3>
                <p style={{ fontSize: "11px", color: AMBER, letterSpacing: "0.04em", marginBottom: "12px" }}>{p.tag}</p>
                <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.6" }}>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <PawDivider />
      </div>

      {/* ═══ 05 DESIGN ═══ */}
      <PhaseSection
        phaseIndex={4}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Visual direction, architecture & flow"
        description="With scope defined, I established the visual language through a mood board, structured the app with a sitemap, then mapped the core booking task as a user flow before moving to hi-fi screens."
      >
        <div ref={makeRef(4)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <FadeUp>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px", alignItems: "center",
            background: "#FFFFFF", borderRadius: "14px", padding: "24px",
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <figure style={{ margin: 0 }}>
              <div style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)" }}>
                <ImageWithFallback
                  src={moodBoard} alt="Whisker Haven mood board"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <figcaption style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.04em", marginTop: "8px", textAlign: "center" }}>
                Mood board: Cozy · Calm · Warm · Homey
              </figcaption>
            </figure>
            <div>
              <p style={{ fontSize: "11px", color: AMBER, letterSpacing: "0.08em", marginBottom: "8px", fontWeight: 600 }}>
                DESIGN LANGUAGE
              </p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "24px", color: DARK,
                letterSpacing: "-0.02em", fontWeight: 400, marginBottom: "12px",
              }}>
                "Cozy Efficiency"
              </h3>
              <p style={{ fontSize: "13px", color: "#777", lineHeight: "1.7", marginBottom: "20px" }}>
                Every reference carries a "golden hour" quality: warm light through curtains, lush greenery, cats at rest.
                The message is simple: <em>your cat is safe, comfortable, and happy here.</em>
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px 10px" }}>
                {[
                  { name: "Warm Sienna", hex: "#D4845A" },
                  { name: "Honey Yellow", hex: "#E8C46A" },
                  { name: "Sage Green", hex: "#8EAE8A" },
                  { name: "Warm White", hex: "#F7F2EA" },
                  { name: "Sand Linen", hex: "#EBE2D4" },
                  { name: "Deep Soil", hex: "#2E2416" },
                ].map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
                  >
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,0.1)" }} />
                    <span style={{ fontSize: "10px", color: "#555", textAlign: "center" }}>{c.name}</span>
                    <span style={{ fontSize: "9px", color: "#AAA", textAlign: "center", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.02em" }}>{c.hex}</span>
                  </motion.div>
                ))}
              </div>

              {/* Typography */}
              <p style={{ fontSize: "11px", color: AMBER, letterSpacing: "0.08em", marginBottom: "14px", fontWeight: 600, marginTop: "28px" }}>TYPOGRAPHY</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Heading", font: "Cormorant Unicase · Bold", sample: "Whisker Haven", family: "'Cormorant Unicase', Georgia, serif", weight: 700, fontSize: "30px" },
                  { label: "Subheading", font: "Nunito · SemiBold", sample: "Stay Management", family: "'Nunito', sans-serif", weight: 600, fontSize: "18px" },
                  { label: "Body", font: "Nunito · Regular", sample: "A cozy, safe stay for your cat.", family: "'Nunito', sans-serif", weight: 400, fontSize: "14px" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "14px", alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: AMBER, letterSpacing: "0.06em", fontWeight: 600, margin: 0 }}>{t.label.toUpperCase()}</p>
                      <p style={{ fontSize: "10px", color: "#AAA", margin: "2px 0 0" }}>{t.font}</p>
                    </div>
                    <p style={{ fontFamily: t.family, fontWeight: t.weight, fontSize: t.fontSize, color: DARK, margin: 0, lineHeight: 1.2 }}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
        <Img src={sitemap} alt="Sitemap" caption="Sitemap: information architecture" />
        <div style={{ marginTop: "16px" }}>
          <Img src={userFlow} alt="User flow" caption="User Flow: completing a room booking and payment" />
        </div>
      </PhaseSection>

      {/* ═══ 06 VALIDATE ═══ */}
      <PhaseSection
        phaseIndex={5}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Tested twice: fix early, then measure"
        description="Testing ran in two stages. A formative test on the low-fi prototype caught friction while it was still cheap to fix. A summative test on the hi-fi prototype then measured effectiveness, efficiency, and satisfaction with 5 cat owners."
      >
        <div ref={makeRef(5)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />

        <FadeUp>
          <div style={{
            background: "#F3ECDF", borderRadius: "12px", padding: "20px 24px",
            marginBottom: "28px", borderLeft: `4px solid ${AMBER}`,
          }}>
            <p style={{ fontSize: "10px", color: AMBER, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>
              FORMATIVE TEST (LOW-FI) · 3 ISSUES FOUND &amp; FIXED
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { issue: "Step indicator didn't convey progress", fix: "Redesigned to show all 5 stages with the active step highlighted" },
                { issue: "CTA button label was ambiguous", fix: "Replaced with action-specific labels like 'Continue to Room Selection'" },
                { issue: "Room cards lacked detail", fix: "Updated to consistently show room name, price/night, and availability" },
              ].map((f) => (
                <div key={f.issue} style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr", gap: "10px", alignItems: "center" }}>
                  <p style={{ fontSize: "12px", color: "#6B5A45", lineHeight: "1.5" }}>{f.issue}</p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={AMBER} style={{ margin: "0 auto" }}>
                    <path d="M2 10 L14 10 L14 5 L22 12 L14 19 L14 14 L2 14 Z" />
                  </svg>
                  <p style={{ fontSize: "12px", color: DARK, lineHeight: "1.5" }}>{f.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <p style={{ fontSize: "10px", color: "#999", letterSpacing: "0.08em", marginBottom: "12px", fontWeight: 600 }}>
            SUMMATIVE TEST (HI-FI) · RESULTS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {[
              { value: "100%", label: "Task completion", note: "Effectiveness · all 5 participants" },
              { value: "79s", label: "Avg. booking time", note: "Efficiency · ~1.3 minutes" },
              { value: "85", label: "SUS score", note: "Satisfaction · Grade A 'Excellent'" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: "rgba(0,0,0,0.1)", borderRadius: "16px", padding: "28px" }}
              >
                <div style={{ fontFamily: "var(--font-display)", fontSize: "52px", color: DARK, lineHeight: 1, marginBottom: "6px" }}>{s.value}</div>
                <div style={{ fontSize: "14px", color: DARK, opacity: 0.8, marginBottom: "2px" }}>{s.label}</div>
                <div style={{ fontSize: "12px", color: DARK, opacity: 0.5 }}>{s.note}</div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp>
          <p style={{ fontSize: "10px", color: AMBER, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>
            LO-FI WIREFRAME &amp; HI-FI PROTOTYPE
          </p>
          <PrototypeCarousel
            images={[
              "/projects/whisker-haven/prototypes/lo-fi.png",
              "/projects/whisker-haven/prototypes/hi-fi.png",
            ]}
            alt="Whisker Haven prototype"
          />
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ borderLeft: "4px solid rgba(0,0,0,0.2)", paddingLeft: "24px", margin: "48px 0 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: DARK, lineHeight: "1.55", fontStyle: "italic", fontWeight: 400 }}>
              Whisker Haven proved that in care-service platforms, proactive transparency is what reduces owner anxiety, not price. A structured booking flow, real-time stay monitoring, and a centralised pet profile transformed a reactive, high-friction experience into a high-assurance one.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div style={{
            marginTop: "40px", padding: "28px 32px",
            background: "#FFFFFF", borderRadius: "14px",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
          }}>
            <div>
              <p style={{ fontSize: "12px", color: DARK, opacity: 0.5, marginBottom: "3px" }}>Want to explore it?</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: DARK, fontWeight: 400 }}>
                View the prototype
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <motion.a
                href="https://www.figma.com/proto/PkZWq94nimC2alRFRcTrlL/UI-Term-Project?node-id=89-227&starting-point-node-id=89%3A227&t=2iidHy6ASEbMyMS1-1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: DARK, color: AMBER, borderRadius: "100px",
                  padding: "13px 26px", fontSize: "14px", textDecoration: "none",
                }}
              >
                View prototype ↗
              </motion.a>
              <motion.a
                href="https://www.figma.com/design/PkZWq94nimC2alRFRcTrlL/UI-Term-Project?node-id=145-195&t=p2iKi1CfIQN2ADnE-1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent", color: DARK, borderRadius: "100px",
                  padding: "13px 26px", fontSize: "14px", textDecoration: "none",
                  border: "1.5px solid rgba(26,26,26,0.3)",
                }}
              >
                Figma ↗
              </motion.a>
            </div>
          </div>
        </FadeUp>
      </PhaseSection>

      {/* Prev / Next */}
      {next && (
        <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
          <Link to={`/${next.slug}`} style={{
            display: "flex", flexDirection: "column", alignItems: "flex-end",
            padding: "48px 40px", textDecoration: "none", background: next.bg,
            borderTop: "1px solid rgba(0,0,0,0.07)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <span style={{ fontSize: "11px", color: next.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>NEXT PROJECT</span>
              <ArrowRight size={14} color={next.textColor} style={{ opacity: 0.5 }} />
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>
              {next.title}
            </p>
          </Link>
        </motion.div>
      )}

      {/* All projects */}
      <div style={{ background: "#111", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#333", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "whisker-haven" ? p.bg : "transparent",
                color: p.slug === "whisker-haven" ? p.textColor : "#444",
                border: p.slug === "whisker-haven" ? "none" : "1px solid #222",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "whisker-haven") { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#888"; } }}
                onMouseLeave={(e) => { if (p.slug !== "whisker-haven") { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#444"; } }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }} />
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
