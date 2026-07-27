import { Link } from "react-router";
import { useState, useEffect, ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";
import { Lightbox } from "@/app/components/Lightbox";

import affinityDiagram from "@/imports/Project_UI__1_.png";
import empathyMap from "@/imports/Project_UI__2_.png";
import persona from "@/imports/Project_UI__3_.png";
import journeyMap from "@/imports/Project_UI__4_.png";
import prioritization from "@/imports/Project_UI__5_.png";

const BG = "#1b2838";
const ACCENT = "#2b6cb0";
const TEXT = "#0f1923";
const HERO_ACCENT = "#66C0F4";

const PHASES = [
  { num: "01", label: "DISCOVER" },
  { num: "02", label: "SYNTHESISE" },
  { num: "03", label: "DEFINE" },
  { num: "04", label: "IDEATE" },
  { num: "05", label: "DESIGN" },
];

const PHASE_BG = ["#F0F6FC", "#E1ECF4", "#F0F6FC", "#E1ECF4", "#F0F6FC"];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Img({ src, alt, caption }: { src: string; alt: string; caption?: ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <FadeUp>
      <figure style={{ margin: 0 }}>
        <motion.div
          whileHover={{ scale: 1.012, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => setIsLightboxOpen(true)}
          style={{ borderRadius: "12px", overflow: "hidden", cursor: "zoom-in" }}
        >
          <ImageWithFallback
            src={src} alt={alt}
            style={{ width: "100%", display: "block", border: "1px solid rgba(0,0,0,0.06)" }}
          />
        </motion.div>
        {caption && (
          <figcaption style={{ fontSize: "11px", color: "#888", letterSpacing: "0.04em", marginTop: "10px", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", flexWrap: "wrap" }}>
            {caption}
          </figcaption>
        )}
        <Lightbox
          isOpen={isLightboxOpen}
          src={src}
          alt={alt}
          onClose={() => setIsLightboxOpen(false)}
        />
      </figure>
    </FadeUp>
  );
}

function PhaseStrip({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px",
      padding: "22px 40px",
      background: "rgba(0,0,0,0.03)",
      borderTop: "1px solid rgba(0,0,0,0.06)",
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: ACCENT, fontStyle: "italic" }}>{num}</span>
      <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.1)" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#999" }}>{label}</span>
    </div>
  );
}

function SideProgress({ activePhase }: { activePhase: number }) {
  return (
    <div style={{
      position: "fixed", right: "28px", top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "10px", zIndex: 50,
    }}>
      {PHASES.map((_, i) => (
        <motion.div key={i}
          animate={{ width: i === activePhase ? 24 : 6, background: i === activePhase ? ACCENT : "rgba(0,0,0,0.15)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

function Bullet({ text }: { text: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: "10px", alignItems: "start" }}>
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, marginTop: "8px", flexShrink: 0 }} />
      <p style={{ fontSize: "15px", color: TEXT, opacity: 0.7, lineHeight: "1.75" }}>{text}</p>
    </div>
  );
}

export function SteamRedesignPage() {
  const { prev, next } = getAdjacentProjects("steam-redesign");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-steam-phase]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(Number((el as HTMLElement).dataset.steamPhase)); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <SideProgress activePhase={activePhase} />

      {/* ── Hero ── */}
      <div style={{ background: BG, padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-60px", right: "-20px",
            fontFamily: "var(--font-display)", fontSize: "clamp(180px, 24vw, 340px)",
            lineHeight: 1, color: "rgba(102,192,244,0.06)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >06</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#FFFFFF", opacity: 0.5, textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.03em", transition: "opacity 0.2s", marginBottom: "48px",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.5")}
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
          </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
        <div style={{ flex: "1.25 1 340px" }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: "#FFFFFF", opacity: 0.5, letterSpacing: "0.1em" }}>06 · 2026</span>
            <span style={{ fontSize: "11px", color: "#FFFFFF", background: "rgba(255,255,255,0.15)", borderRadius: "4px", padding: "2px 8px", opacity: 0.9 }}>App Redesign:UX Research & UI Design</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(44px, 6.5vw, 80px)",
              lineHeight: 1, color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "20px", fontWeight: 400,
            }}>
            Steam Mobile<br />
            <span style={{ color: HERO_ACCENT }}>Redesign</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: "#FFFFFF", opacity: 0.7, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}>
            Steam's mobile app is used by millions, but suffers from significant usability issues on small screens.
            A team of 3 conducted end-to-end UX research to find the root causes, then redesigned the core flows.
          </motion.p>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(102,192,244,0.2)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}>
            {[
              { label: "My role", value: "UX/UI Designer" },
              { label: "Team", value: "3-person team" },
              { label: "Platform", value: "Mobile App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.06)", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: "#FFFFFF", opacity: 0.5, letterSpacing: "0.08em", marginBottom: "3px" }}>{m.label.toUpperCase()}</p>
                <p style={{ fontSize: "13px", color: "#FFFFFF", lineHeight: "1.4" }}>{m.value}</p>
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
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))" }}
          >
            <img
              src="/projects/steam-redesign/hero.png"
              alt="Steam Mobile redesign — improved home and library experience"
              style={{ width: "100%", display: "block" }}
            />
          </motion.div>
        </motion.div>

        </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#DCEBF6", padding: "18px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Cluttered home screen", "Poor navigation", "UI crammed from desktop", "Chat requires separate app"].map((t) => (
            <span key={t} style={{
              background: "rgba(43,108,176,0.1)", color: ACCENT,
              borderRadius: "100px", padding: "6px 16px", fontSize: "12px",
              border: "1px solid rgba(43,108,176,0.25)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <div data-steam-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(43,108,176,0.04)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="DISCOVER" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              What does it actually feel like to use Steam on mobile?
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.6, lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              We mapped the emotional experience of real Steam mobile users; not just what they do, but how they feel when using the app. Three dominant emotions surfaced immediately.
            </p>
          </FadeUp>

          <Img src={empathyMap} alt="Empathy map for Steam mobile users: Say, Think, Does, Feel quadrants. Feelings: Overwhelmed, Confused, Frustrated." caption="Empathy Map: University student · Steam mobile user" />

          <FadeUp delay={0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "24px",
            }}>
              {[
                { emoji: "😰", label: "Overwhelmed", quote: '"Too many games on the home screen, too many irrelevant banners."' },
                { emoji: "😕", label: "Confused", quote: '"Why can\'t I find the game I just bought? Where\'s my library?"' },
                { emoji: "😤", label: "Frustrated", quote: '"Why is the mobile experience worse than the desktop version?"' },
              ].map((f) => (
                <div key={f.label} style={{
                  background: "#FFFFFF", borderRadius: "12px", padding: "20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: "28px", marginBottom: "8px" }}>{f.emoji}</div>
                  <p style={{ fontSize: "13px", color: ACCENT, letterSpacing: "0.04em", marginBottom: "8px", fontWeight: 500 }}>{f.label}</p>
                  <p style={{ fontSize: "12px", color: TEXT, opacity: 0.6, lineHeight: "1.6", fontStyle: "italic" }}>{f.quote}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 02 SYNTHESISE ═══ */}
      <div data-steam-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(43,108,176,0.04)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="SYNTHESISE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              5 problem clusters from 16 insights
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.6, lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              Raw insights were grouped into an affinity diagram, turning scattered complaints into 5 distinct, actionable problem themes; each representing a different dimension of where Steam mobile fails its users.
            </p>
          </FadeUp>

          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <Img src={affinityDiagram} alt="Affinity diagram with 5 groups: Navigation & Findability, Information Architecture & Organization, Visual Hierarchy & Clarity, Feature Integration, Mobile Usability" caption="Affinity Diagram: 16 insights → 5 problem clusters" />
          </div>

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
              {[
                { name: "Navigation & Findability", color: "#E07591", insight: "Scrolling endlessly to find recently purchased games. Using search because category navigation is too confusing." },
                { name: "Information Architecture", color: "#3E9ECC", insight: "No category filters in the library. Discounted games across mixed categories with too many irrelevant tags." },
                { name: "Visual Hierarchy & Clarity", color: "#5BA56A", insight: "Everything looks the same; can't tell if a game is installed. Menu labels lack visual emphasis." },
                { name: "Feature Integration", color: "#D88A3D", insight: "Chat requires downloading a separate app. It feels completely disconnected from the main Steam experience." },
                { name: "Mobile Usability", color: "#9C6CB8", insight: "The UI feels like a website crammed into a phone. Search tags and images overflow the screen width." },
              ].map((g, i) => (
                <motion.div key={g.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  style={{
                    background: "#FFFFFF", borderRadius: "10px", padding: "16px 20px",
                    display: "grid", gridTemplateColumns: "200px 1fr", gap: "16px", alignItems: "start",
                    borderLeft: `4px solid ${g.color}`,
                  }}>
                  <p style={{ fontSize: "13px", color: g.color, fontWeight: 600 }}>{g.name}</p>
                  <p style={{ fontSize: "13px", color: TEXT, opacity: 0.65, lineHeight: "1.55" }}>{g.insight}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 03 DEFINE ═══ */}
      <div data-steam-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(43,108,176,0.04)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="DEFINE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Who we're redesigning for
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.6, lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              Research findings crystallised into a primary persona and a full user journey map: showing exactly which moments break the experience and where the biggest design opportunities lie.
            </p>
          </FadeUp>

          <Img src={persona} alt="Persona: Austin James, 21, University student, Chiang Mai. Quote: I want to find the best deals and manage my library quickly without getting lost in a sea of irrelevant game banners." caption="Persona: Austin James, 21 · University student · Chiang Mai" />

          <FadeUp delay={0.1}>
            <div style={{
              background: "rgba(43,108,176,0.06)", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${ACCENT}`, margin: "20px 0 32px",
            }}>
              <p style={{ fontSize: "15px", color: TEXT, lineHeight: "1.65", fontStyle: "italic", opacity: 0.85 }}>
                "I want to find the best deals and manage my library quickly without getting lost in a sea of irrelevant game banners."
              </p>
              <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>- Austin James</p>
            </div>
          </FadeUp>

          <Img src={journeyMap} alt="User journey map for Austin James: 9 stages from Open App to Exit App. Emotions: Overwhelmed → Frustrated → Tired → Anxious → Skeptical → Turned → Hopeful → Slightly Frustrated." caption="User Journey Map: Austin James · Open App → Store → Library → Decision → Exit" />

          <FadeUp delay={0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "8px", marginTop: "20px",
            }}>
              {[
                { stage: "Open App", emotion: "Overwhelmed 😰", color: "#E07591" },
                { stage: "Store Page", emotion: "Overwhelmed 😰", color: "#E07591" },
                { stage: "Browse Sale", emotion: "Frustrated 😤", color: "#D88A3D" },
                { stage: "Check Library", emotion: "Tired 😓", color: "#C9A04A" },
                { stage: "Apply Filters", emotion: "Anxious 😰", color: "#B8B04A" },
                { stage: "Compare Sale", emotion: "Skeptical 🤨", color: "#7AA56A" },
                { stage: "Game Details", emotion: "Hopeful 🙂", color: "#3E9ECC" },
                { stage: "Decision", emotion: "Slightly Frustrated", color: "#9C6CB8" },
              ].map((s) => (
                <div key={s.stage} style={{
                  background: "#FFFFFF", borderRadius: "10px", padding: "14px 16px",
                  borderTop: `3px solid ${s.color}`,
                }}>
                  <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.06em", marginBottom: "4px" }}>{s.stage.toUpperCase()}</p>
                  <p style={{ fontSize: "12px", color: TEXT, opacity: 0.75 }}>{s.emotion}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 04 IDEATE ═══ */}
      <div data-steam-phase="3" style={{ background: PHASE_BG[3], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(43,108,176,0.04)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>04</div>
        <PhaseStrip num="04" label="IDEATE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Prioritising what to fix first
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.6, lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              With 5 problem clusters, we needed to decide what to tackle first. Impact-Effort and MoSCoW gave us two different lenses, and the tension between them produced the clearest answer.
            </p>
          </FadeUp>

          <Img src={prioritization} alt="Prioritization using Impact-Effort matrix and MoSCoW method: sticky note boards. Final priority table: 1. Unsure if game worth the price (Must Have + High Impact), 2. Discounted games across categories (Quick Win), 3. No price history (Low Impact)." caption="Prioritisation: Impact-Effort Matrix + MoSCoW Method" />

          <FadeUp delay={0.1}>
            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "11px", color: "#999", letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>
                FINAL PRIORITY ORDER
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { rank: "01", problem: "Unsure if game is worth the price / best price", reason: "Must Have + High Impact: core user requirement", highlight: true },
                  { rank: "02", problem: "Discounted games scattered across categories", reason: "Quick Win: high return, lower implementation cost", highlight: false },
                  { rank: "03", problem: "No price history available", reason: "Low Impact / Should Have: not immediately critical", highlight: false },
                ].map((p) => (
                  <div key={p.rank} style={{
                    background: p.highlight ? `rgba(43,108,176,0.08)` : "#FFFFFF",
                    borderRadius: "10px", padding: "16px 20px",
                    border: p.highlight ? `1px solid rgba(43,108,176,0.2)` : "1px solid rgba(0,0,0,0.06)",
                    display: "grid", gridTemplateColumns: "40px 1fr auto", gap: "16px", alignItems: "center",
                  }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: p.highlight ? ACCENT : "#999", fontStyle: "italic" }}>{p.rank}</span>
                    <div>
                      <p style={{ fontSize: "14px", color: TEXT, opacity: 0.85, marginBottom: "2px" }}>{p.problem}</p>
                      <p style={{ fontSize: "12px", color: TEXT, opacity: 0.5 }}>{p.reason}</p>
                    </div>
                    {p.highlight && (
                      <span style={{ background: ACCENT + "20", color: ACCENT, borderRadius: "6px", padding: "4px 10px", fontSize: "11px", whiteSpace: "nowrap" }}>
                        Priority 1
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              marginTop: "20px", background: "#FFFFFF", borderRadius: "12px",
              padding: "20px 24px", border: "1px solid rgba(0,0,0,0.06)",
            }}>
              <p style={{ fontSize: "12px", color: "#999", letterSpacing: "0.06em", marginBottom: "8px", fontWeight: 600 }}>KEY INSIGHT FROM PRIORITISATION</p>
              <p style={{ fontSize: "14px", color: TEXT, opacity: 0.7, lineHeight: "1.65" }}>
                The tension between Impact-Effort and MoSCoW revealed a gap: Impact-Effort focuses on resource cost-effectiveness, while MoSCoW focuses on business and user necessity. A problem can be a Quick Win by effort but not be what users need most; knowing both helps you make the right call.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 05 DESIGN ═══ */}
      <div data-steam-phase="4" style={{ background: PHASE_BG[4], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(43,108,176,0.04)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>05</div>
        <PhaseStrip num="05" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Redesign decisions
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.6, lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              Research-backed redesigns for the three core areas: Home screen, Library, and Store; each directly targeting the highest-priority problems identified through affinity grouping and prioritisation.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
              {[
                { area: "Home screen", before: "Banner-heavy layout with irrelevant generic recommendations", after: "Card-based feed personalised by owned/wishlist genres; deals first, not banners" },
                { area: "Library", before: "No filters, no installed/not-installed toggle, must tap each game to check status", after: "Category filters, installed toggle, persistent sort controls; all visible without tapping in" },
                { area: "Store", before: "Discounted games scattered with no price context or purchase history", after: "Grouped deal categories + price history chart + wishlist-aware deal highlights" },
                { area: "Chat", before: "Requires downloading a separate app, fully disconnected from friends list", after: "Integrated into main navigation, accessible directly from the friends list tab" },
              ].map((d, i) => (
                <motion.div key={d.area}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="steam-before-after-grid"
                  style={{
                    background: "#FFFFFF", borderRadius: "12px", padding: "20px 24px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "grid", gap: "20px", alignItems: "start",
                  }}>
                  <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500, wordBreak: "break-word", overflowWrap: "break-word" }}>{d.area}</p>
                  <div>
                    <p style={{ fontSize: "10px", color: "#999", letterSpacing: "0.06em", marginBottom: "4px" }}>BEFORE</p>
                    <p style={{ fontSize: "13px", color: TEXT, opacity: 0.55, lineHeight: "1.55", wordBreak: "break-word", overflowWrap: "break-word" }}>{d.before}</p>
                  </div>
                  <div style={{
                    background: "rgba(59,130,246,0.04)",
                    borderRadius: "8px",
                    padding: "12px 14px",
                    border: "1px solid rgba(59,130,246,0.15)"
                  }}>
                    <p style={{ fontSize: "10px", color: ACCENT, letterSpacing: "0.06em", marginBottom: "4px" }}>AFTER</p>
                    <p style={{ fontSize: "13px", color: TEXT, opacity: 0.9, lineHeight: "1.55", fontWeight: 500, wordBreak: "break-word", overflowWrap: "break-word" }}>{d.after}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

        </div>
      </div>

      {/* Closing */}
      <div style={{ background: "#F0F6FC", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Hi-fi prototype showcase */}
          <FadeUp>
            <p style={{ fontSize: "14px", color: "#1A1A1A", opacity: 0.6, marginBottom: "24px", lineHeight: "1.6", maxWidth: "100%" }}>
              The final redesign: addressing clutter, navigation, and IA issues revealed by our research.
            </p>
          </FadeUp>
          <FadeUp>
            <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.12em", marginBottom: "14px", fontWeight: 600 }}>
              HI-FI PROTOTYPE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
              <PrototypeCarousel
                images={["/projects/steam-redesign/prototypes/prototype.png"]}
                alt="Steam Mobile Redesign hi-fi prototype"
              />
            </div>
          </FadeUp>

          <FadeUp>
            <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: "28px", margin: "48px 0 56px" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontSize: "22px", color: TEXT,
                lineHeight: "1.55", fontStyle: "italic", fontWeight: 400, opacity: 0.85,
              }}>
                This project reinforced that the worst UX problems are invisible to the people who built the product; they only show up when you watch real users struggle. The affinity diagram turned 16 scattered complaints into 5 actionable design targets.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: BG, borderRadius: "20px", padding: "36px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px",
            }}>
              <div>
                <p style={{ fontSize: "12px", color: "#FFFFFF", opacity: 0.6, marginBottom: "4px" }}>Want to explore it?</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "#FFFFFF", fontWeight: 400 }}>View the prototype</p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <motion.a href="#" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "#FFFFFF", color: BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none" }}>
                  View prototype ↗
                </motion.a>
                <motion.a href="https://www.figma.com/design/riR68PZoZWPbomdRdy7vvT/UI-Redesign?node-id=0-1&t=YoiWJ4KnercHDHLz-1" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "transparent", color: "#FFFFFF", borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                  Figma ↗
                </motion.a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{ display: "grid", gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        {prev && (
          <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "48px 40px", textDecoration: "none",
              background: prev.bg, borderRight: next ? "1px solid rgba(0,0,0,0.1)" : "none", height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <ArrowLeft size={14} color={prev.textColor} style={{ opacity: 0.5 }} />
                <span style={{ fontSize: "11px", color: prev.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>PREVIOUS</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: prev.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>
                {prev.title}
              </p>
            </Link>
          </motion.div>
        )}
        {next && (
          <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
            <Link to={`/${next.slug}`} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              padding: "48px 40px", textDecoration: "none", background: next.bg, height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: next.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>NEXT</span>
                <ArrowRight size={14} color={next.textColor} style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>
                {next.title}
              </p>
            </Link>
          </motion.div>
        )}
      </div>

      {/* All projects */}
      <div style={{ background: "#111", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "steam-redesign" ? "#FFFFFF" : "transparent",
                color: p.slug === "steam-redesign" ? "#111" : "#888",
                border: p.slug === "steam-redesign" ? "none" : "1px solid #333",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "steam-redesign") { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#CCC"; } }}
                onMouseLeave={(e) => { if (p.slug !== "steam-redesign") { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; } }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
                {p.title}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: "1px solid #2A2A2A", paddingTop: "clamp(24px, 4vw, 32px)",
            marginTop: "32px", display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "16px",
          }}>
            <p style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(18px, 3vw, 22px)",
              color: "#333", letterSpacing: "-0.02em", fontWeight: 400, fontStyle: "italic",
            }}>
              Ratti.
            </p>
            <p style={{ fontSize: "12px", color: "#3A3A3A", letterSpacing: "0.03em" }}>
              © 2026 · Rattikan Muangmoon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
