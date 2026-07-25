import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getAdjacentProjects, projects } from "../data/projects";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

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
  { num: "01", label: "Discover",   bg: "#FDFCFA" },
  { num: "02", label: "Synthesise", bg: "#F7F4EF" },
  { num: "03", label: "Define",     bg: "#F0EBE3" },
  { num: "04", label: "Ideate",     bg: "#E8E0D5" },
  { num: "05", label: "Design",     bg: "#DDD3C6" },
  { num: "06", label: "Validate",   bg: AMBER     },
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

function Img({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
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
            style={{ width: "100%", display: "block", border: "1px solid rgba(0,0,0,0.06)" }}
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

function PhaseSection({
  phaseIndex, title, description, children,
  sectionRef,
}: {
  phaseIndex: number;
  title: string;
  description: string;
  children: React.ReactNode;
  sectionRef?: React.RefObject<HTMLDivElement | null>;
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

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "11px", color: DARK, opacity: 0.4, letterSpacing: "0.1em", marginBottom: "12px" }}
          >
            01 / 2024 · End-to-end UX Research & Design
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 100px)",
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
            stress-free — from early research through to a validated high-fidelity prototype.
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(0,0,0,0.12)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}
          >
            {[
              { label: "My role", value: "UX/UI Designer" },
              { label: "Duration", value: "12 weeks" },
              { label: "Team", value: "Solo project" },
              { label: "Tools", value: "Figma · Maze · Miro" },
              { label: "Platform", value: "Mobile App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(0,0,0,0.05)", padding: "14px 18px" }}>
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
              { value: "85", label: "SUS score — Grade A" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: DARK, lineHeight: 1, marginBottom: "4px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "13px", color: DARK, opacity: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#F3F1EE", padding: "18px 40px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["UX Research", "UI Design", "Mobile App", "Flutter", "Usability Testing"].map((t) => (
            <span key={t} style={{
              background: "#FFFFFF", color: "#666", borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(0,0,0,0.08)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <PhaseSection
        phaseIndex={0}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Mapping the cat owner's emotional experience"
        description="Research started with a survey and in-depth interviews to understand not just what users do, but how they feel. The core finding: the primary problem isn't UX friction — it's anxiety."
      >
        <div ref={makeRef(0)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <Img src={surveyResults} alt="Google Form survey responses" caption="Survey — quantitative validation" />
          <Img src={empathyMap} alt="Empathy map" caption="Empathy Map — Say · Think · Do · Feel" />
        </div>
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
            { name: "Emotional Anxiety", color: "#FFC5C5", insight: "Not knowing if the cat is okay is the single biggest concern — anxiety doesn't stop until owners are physically reunited." },
            { name: "Emergency & Safety", color: "#C5E8FF", insight: "No emergency protocol exists. Owners found out days later their cat hadn't been eating — with no notification from the facility." },
            { name: "Care & Profile Management", color: "#C5FFC8", insight: "Owners repeat the cat's diet, allergies, and behaviours at every visit. Staff gave the wrong food because notes weren't read." },
            { name: "Communication Gap", color: "#FFE8C5", insight: "Owners always initiate contact. Replies are vague or a blurry photo. Asking more feels like being a burden." },
            { name: "Booking & Information", color: "#E8C5FF", insight: "Everything happens over LINE. No booking system, no pricing online — endless back-and-forth to confirm a date." },
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
        <Img src={affinityDiagram} alt="Affinity diagram" caption="Affinity Diagram — grouped research insights" />
      </PhaseSection>

      {/* ═══ 03 DEFINE ═══ */}
      <PhaseSection
        phaseIndex={2}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Who we're designing for"
        description="Research findings shaped a primary persona and an As-Is journey map showing exactly where emotional low points occur — and where design intervention matters most."
      >
        <div ref={makeRef(2)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <Img src={persona} alt="Persona: Nat" caption="Persona — Nat, Sales Executive, cat owner of Mochi & Milo" />
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px", background: "rgba(0,0,0,0.1)", borderRadius: "12px",
          overflow: "hidden", margin: "20px 0 24px",
        }}>
          {[
            { label: "Age", value: "26" },
            { label: "Occupation", value: "Sales Executive" },
            { label: "Location", value: "Bangkok (4–5× / yr)" },
            { label: "Cats", value: "Mochi & Milo, 5 yrs" },
            { label: "Device", value: "Smartphone, iPad" },
            { label: "Tech comfort", value: "High — app-first" },
          ].map((d) => (
            <div key={d.label} style={{ background: "rgba(0,0,0,0.04)", padding: "14px 18px" }}>
              <p style={{ fontSize: "10px", color: "#999", letterSpacing: "0.07em", marginBottom: "3px" }}>{d.label.toUpperCase()}</p>
              <p style={{ fontSize: "13px", color: DARK }}>{d.value}</p>
            </div>
          ))}
        </div>

        <FadeUp delay={0.1}>
          <div style={{
            background: AMBER + "22", borderRadius: "12px", padding: "20px 24px",
            borderLeft: `4px solid ${AMBER}`, marginBottom: "28px",
          }}>
            <p style={{ fontSize: "15px", color: DARK, lineHeight: "1.65", fontStyle: "italic" }}>
              "I have three days of client meetings in Chiang Mai, but I can't stop worrying if Mochi and Milo are okay."
            </p>
            <p style={{ fontSize: "12px", color: "#AAA", marginTop: "8px" }}>— Nat</p>
          </div>
        </FadeUp>
        <Img src={userJourneyMap} alt="As-Is user journey map" caption="User Journey Map (As-Is) — Focused → Irritated → Frustrated → Exhausted → Anxious → Stressed → Annoyed" />
      </PhaseSection>

      {/* ═══ 04 IDEATE ═══ */}
      <PhaseSection
        phaseIndex={3}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="HMW → Prioritise → Sketch"
        description="Each cluster was reframed as a How Might We question. 8 HMWs were scored on Impact vs Effort and filtered via MoSCoW, revealing MVP scope. Crazy 8s generated concepts in 8 minutes flat."
      >
        <div ref={makeRef(3)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <Img src={howMightWe} alt="8 How Might We questions" caption="How Might We — 8 design opportunities" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "16px 0" }}>
          <Img src={impactEffort} alt="Impact-Effort matrix" caption="Impact-Effort prioritisation" />
          <Img src={moscow} alt="MoSCoW prioritisation" caption="MoSCoW — 7 Must Have, 1 Should Have" />
        </div>
        <FadeUp delay={0.1}>
          <div style={{
            background: "#FFFFFF", borderRadius: "12px", padding: "18px 22px",
            borderLeft: "4px solid #2D6A4F", marginBottom: "20px",
            border: "1px solid rgba(0,0,0,0.07)", borderLeftWidth: "4px", borderLeftColor: "#2D6A4F",
          }}>
            <p style={{ fontSize: "10px", color: "#2D6A4F", letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>
              QUICK WINS — HIGH IMPACT, LOW EFFORT
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
        <Img src={crazy8s} alt="Crazy 8s sketches" caption="Crazy 8s — rapid ideation" />
      </PhaseSection>

      {/* ═══ 05 DESIGN ═══ */}
      <PhaseSection
        phaseIndex={4}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="Visual direction, architecture & flow"
        description="With scope defined, I established the visual language through a mood board, structured the app with a sitemap, then mapped the core booking task as a user flow before moving to hi-fi screens."
      >
        <div ref={makeRef(4)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />
        <Img src={moodBoard} alt="Whisker Haven mood board" caption="Mood board — Cozy · Calm · Warm · Homey" />
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "20px 0 32px" }}>
          {[
            { name: "Warm Sienna", hex: "#C0714A" },
            { name: "Honey Yellow", hex: "#D4A853" },
            { name: "Sage Green", hex: "#8FA882" },
            { name: "Warm White", hex: "#F5F0E8" },
            { name: "Sand Linen", hex: "#C8B89A" },
            { name: "Deep Soil", hex: "#3D2B1F" },
          ].map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: c.hex, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
              <span style={{ fontSize: "12px", color: "#666" }}>{c.name}</span>
            </motion.div>
          ))}
        </div>
        <Img src={sitemap} alt="Sitemap" caption="Sitemap — information architecture" />
        <div style={{ marginTop: "16px" }}>
          <Img src={userFlow} alt="User flow" caption="User Flow — completing a room booking and payment" />
        </div>
      </PhaseSection>

      {/* ═══ 06 VALIDATE ═══ */}
      <PhaseSection
        phaseIndex={5}
        sectionRef={{ current: null } as unknown as React.RefObject<HTMLDivElement | null>}
        title="High-fidelity prototype & usability testing"
        description="Wireframes fed into a Figma prototype. Usability testing with real cat owners measured task completion and overall usability via the System Usability Scale."
      >
        <div ref={makeRef(5)} style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          {[
            { value: "100%", label: "Task completion", note: "across all participants" },
            { value: "85", label: "SUS score", note: "Grade A — 'Excellent'" },
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

        <FadeUp>
          <div style={{
            background: "rgba(0,0,0,0.08)", borderRadius: "16px", padding: "64px 32px",
            textAlign: "center", border: "1.5px dashed rgba(0,0,0,0.15)",
          }}>
            <div style={{ fontSize: "32px", marginBottom: "8px", opacity: 0.3 }}>🖼</div>
            <p style={{ fontSize: "12px", color: DARK, opacity: 0.4, letterSpacing: "0.05em" }}>
              HI-FI MOCKUP SCREENS — COMING SOON
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ borderLeft: "4px solid rgba(0,0,0,0.2)", paddingLeft: "24px", margin: "48px 0 0" }}>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: DARK, lineHeight: "1.55", fontStyle: "italic", fontWeight: 400 }}>
              Whisker Haven proved that trust — not price — is the core conversion driver in care-service platforms. Transparent caregiver profiles and instant booking confirmation resolved the key friction points.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div style={{
            marginTop: "40px", padding: "28px 32px",
            background: "rgba(0,0,0,0.1)", borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: "16px",
          }}>
            <div>
              <p style={{ fontSize: "12px", color: DARK, opacity: 0.5, marginBottom: "3px" }}>Want to explore it?</p>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: DARK, fontWeight: 400 }}>
                View the prototype
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: DARK, color: AMBER, borderRadius: "100px",
                padding: "13px 26px", fontSize: "14px", textDecoration: "none",
              }}
            >
              View prototype ↗
            </motion.a>
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
