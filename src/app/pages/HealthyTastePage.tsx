import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { Lightbox } from "@/app/components/Lightbox";

const BG = "#E8522A";
const DARK = "#1A0A00";
const ACCENT = "#FFD4A8";
const TEXT_ON_BG = "#FFFFFF";

const PHASES = [
  { num: "01", label: "DISCOVER" },
  { num: "02", label: "SYNTHESISE" },
  { num: "03", label: "DEFINE" },
  { num: "04", label: "IDEATE" },
  { num: "05", label: "DESIGN" },
];

const PHASE_BG = ["#FFF8F5", "#FFF0E8", "#FFF8F5", "#FFF0E8", "#FFF8F5"];

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

function Img({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <FadeUp>
      <figure style={{ margin: 0 }}>
        <motion.div
          whileHover={{ scale: 1.01, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
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
          <figcaption style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.04em", marginTop: "10px", textAlign: "center" }}>{caption}</figcaption>
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
      background: "rgba(232,82,42,0.05)",
      borderTop: "1px solid rgba(232,82,42,0.1)",
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: BG, fontStyle: "italic" }}>{num}</span>
      <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.1)" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#AAA" }}>{label}</span>
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
          animate={{ width: i === activePhase ? 24 : 6, background: i === activePhase ? BG : "rgba(0,0,0,0.15)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

export function HealthyTastePage() {
  const { prev, next } = getAdjacentProjects("healthy-taste");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-ht-phase]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(Number((el as HTMLElement).dataset.htPhase)); },
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
            lineHeight: 1, color: "rgba(255,255,255,0.07)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >03</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: TEXT_ON_BG, opacity: 0.5, textDecoration: "none", fontSize: "13px",
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
            <span style={{ fontSize: "11px", color: TEXT_ON_BG, opacity: 0.4, letterSpacing: "0.1em" }}>03 · 2025</span>
            <span style={{ fontSize: "11px", color: TEXT_ON_BG, background: "rgba(255,255,255,0.15)", borderRadius: "4px", padding: "2px 8px", opacity: 0.9 }}>End-to-end UX/UI Design</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6.5vw, 84px)",
              lineHeight: 1, color: TEXT_ON_BG, letterSpacing: "-0.03em", marginBottom: "20px", fontWeight: 400,
            }}>
            Healthy Taste
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: TEXT_ON_BG, opacity: 0.7, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}>
            Most calorie-tracking apps fail users within two weeks; the logging feels more effortful than the benefit seems worth.
            Healthy Taste was designed to flip that ratio entirely.
          </motion.p>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(232,82,42,0.15)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}>
            {[
              { label: "My role", value: "UX/UI Designer" },
              { label: "Team", value: "5-person team" },
              { label: "Platform", value: "Mobile App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "#FDE6DC", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: DARK, opacity: 0.5, letterSpacing: "0.08em", marginBottom: "3px" }}>{m.label.toUpperCase()}</p>
                <p style={{ fontSize: "13px", color: DARK, lineHeight: "1.4" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "24px", marginTop: "40px", flexWrap: "wrap" }}>
            {[
              { value: "3", label: "Competitor apps analysed" },
              { value: "30+", label: "Figma components built" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: ACCENT, lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: TEXT_ON_BG, opacity: 0.5 }}>{s.label}</div>
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
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))" }}
          >
            <img
              src="/projects/healthy-taste/hero.png"
              alt="Healthy Taste app — calorie tracking with simplified logging"
              style={{ width: "100%", display: "block" }}
            />
          </motion.div>
        </motion.div>

        </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#FDE6DC", padding: "18px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Mobile App", "UX/UI Design", "Design System", "Figma"].map((t) => (
            <span key={t} style={{
              background: "rgba(232,82,42,0.12)", color: "#9A3412", borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(232,82,42,0.25)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <div data-ht-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="DISCOVER" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Understanding the friction
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "36px" }}>
              The research question was simple: why do people who want to track calories stop doing it within two weeks?
              The answer wasn't willpower; it was the app.
            </p>
          </FadeUp>

          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <Img src="/projects/healthy-taste/competitive-analysis.png" alt="Competitive analysis comparing MyFitnessPal, Cronometer, and Lose It! on strengths and gaps" caption="Competitive Analysis: 3 apps compared on strengths and gaps" />
          </div>

          {/* Key friction points */}
          <FadeUp delay={0.05}>
            <div style={{ marginTop: "36px" }}>
              <p style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>3 KEY FRICTION POINTS IDENTIFIED</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { num: "1", point: "Searching for food items", detail: "Too many results, ambiguous names, and no smart filtering makes finding the right item feel like a chore; so users give up or log inaccurately." },
                  { num: "2", point: "Estimating portions", detail: "Manual gram entry requires a kitchen scale or guesswork. No visual reference means users either over-engineer or stop logging altogether." },
                  { num: "3", point: "Remembering to log", detail: "Fixed-time alarms don't match meal habits. Reminders fire at the wrong moment; after the meal is already forgotten." },
                ].map((f, i) => (
                  <motion.div key={f.num}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    style={{
                      background: "#FFFFFF", borderRadius: "12px", padding: "18px 22px",
                      border: "1px solid rgba(0,0,0,0.06)",
                      display: "grid", gridTemplateColumns: "32px 1fr", gap: "16px", alignItems: "start",
                    }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: BG + "15", display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: "13px", color: BG, fontWeight: 600 }}>{f.num}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", color: DARK, fontWeight: 500, marginBottom: "4px" }}>{f.point}</p>
                      <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.65" }}>{f.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: BG + "0D", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${BG}`, marginTop: "28px",
            }}>
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>KEY INSIGHT</p>
              <p style={{ fontSize: "15px", color: DARK, lineHeight: "1.65", opacity: 0.8 }}>
                Users don't abandon calorie tracking because they lose motivation; they abandon it because the tool makes
                them feel stupid or slow. Removing one step from a repeated daily action has an outsized impact on habit formation.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 02 SYNTHESISE ═══ */}
      <div data-ht-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="SYNTHESISE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              From scattered complaints to clusters
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "36px" }}>
              Research notes were grouped into an affinity diagram, turning scattered user complaints into a clear picture of
              where calorie-tracking apps consistently fail.
            </p>
          </FadeUp>

          <Img src="/projects/healthy-taste/affinity-diagram.png" alt="Affinity diagram grouping user research insights into themed clusters" caption="Affinity Diagram: research insights grouped into problem themes" />
        </div>
      </div>

      {/* ═══ 03 DEFINE ═══ */}
      <div data-ht-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="DEFINE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Who we're designing for
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "36px" }}>
              Research findings shaped a primary persona and an as-is journey map, showing exactly where the daily
              tracking experience breaks down.
            </p>
          </FadeUp>

          {/* Persona */}
          <FadeUp delay={0.05}>
            <div style={{
              background: "#FFFFFF", borderRadius: "14px", padding: "28px",
              border: "1px solid rgba(232,82,42,0.12)",
              display: "grid", gridTemplateColumns: "auto 1fr", gap: "24px", alignItems: "start",
              marginBottom: "32px",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: BG, color: "#FFFFFF",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-display)", fontSize: "26px", fontWeight: 400, flexShrink: 0,
              }}>C</div>
              <div>
                <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "6px", fontWeight: 600 }}>PRIMARY PERSONA</p>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: DARK, letterSpacing: "-0.02em", fontWeight: 400, margin: "0 0 2px" }}>Christine, 24</h3>
                <p style={{ fontSize: "13px", color: "#999", marginBottom: "16px" }}>Elementary school teacher</p>

                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.65", marginBottom: "18px" }}>
                  Christine's school asked her to appear in a promotional campaign, so she set out to lose weight; but she refuses
                  to give up the tasty meal she looks forward to every night.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "18px" }}>
                  <div>
                    <p style={{ fontSize: "10px", color: "#4CAF50", letterSpacing: "0.07em", marginBottom: "6px", fontWeight: 600 }}>GOALS</p>
                    <p style={{ fontSize: "13px", color: DARK, lineHeight: "1.6" }}>Lose weight steadily while still enjoying every meal, not white-knuckling through bland diet food.</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "10px", color: BG, letterSpacing: "0.07em", marginBottom: "6px", fontWeight: 600 }}>FRUSTRATIONS</p>
                    <p style={{ fontSize: "13px", color: DARK, lineHeight: "1.6" }}>Calorie apps make logging feel like a chore; she quits within two weeks because it drains the joy out of eating.</p>
                  </div>
                </div>

                <div style={{ background: BG + "0D", borderRadius: "10px", padding: "14px 18px", borderLeft: `4px solid ${BG}` }}>
                  <p style={{ fontSize: "14px", color: DARK, lineHeight: "1.6", fontStyle: "italic", margin: 0 }}>
                    "I want to lose weight, but I also want a tasty meal that still fits my calories."
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          <Img src="/projects/healthy-taste/journey-map.png" alt="As-is user journey map showing where the calorie-tracking experience breaks down" caption="User Journey Map (As-Is): emotional low points across a tracking day" />
        </div>
      </div>

      {/* ═══ 04 IDEATE ═══ */}
      <div data-ht-phase="3" style={{ background: PHASE_BG[3], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>04</div>
        <PhaseStrip num="04" label="IDEATE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Prioritising what to fix first
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "36px" }}>
              Each problem cluster was reframed as a How Might We question, then scored on Impact vs Effort to decide
              which fixes would deliver the most value for the least work.
            </p>
          </FadeUp>

          <Img src="/projects/healthy-taste/prioritize-hmw.png" alt="How Might We questions prioritised using Impact-Effort scoring" caption="HMW Prioritisation: Impact-Effort scoring of design opportunities" />
        </div>
      </div>

      {/* ═══ 05 DESIGN ═══ */}
      <div data-ht-phase="4" style={{ background: PHASE_BG[4], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>05</div>
        <PhaseStrip num="05" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Simplified logging flow
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "36px" }}>
              Every screen was designed with one constraint: logging a meal must take under 30 seconds.
              That constraint forced every unnecessary step out of the flow.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
              {[
                { decision: "Smart food search", rationale: "Surfaces recent entries and popular matches first. Most users eat the same 15–20 meals repeatedly; the search should know this before they type anything." },
                { decision: "Visual portion estimator", rationale: "Photo-based size guides replace manual gram entry. Users tap a visual scale (palm / fist / thumb) rather than entering numbers they have to look up." },
                { decision: "Context-aware reminders", rationale: "Reminders trigger based on the user's actual meal-time patterns, learned after 3 days of use; not fixed 12pm and 6pm alarms that fire at the wrong moment." },
                { decision: "Barcode scanning", rationale: "One-tap scan for packaged foods. Matched to a curated database with Thai food coverage; the gap that MyFitnessPal leaves unfilled for local users." },
              ].map((d, i) => (
                <motion.div key={d.decision}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    background: "#FFFFFF", borderRadius: "12px", padding: "18px 22px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "grid", gridTemplateColumns: "180px 1fr", gap: "20px", alignItems: "start",
                  }}>
                  <p style={{ fontSize: "13px", color: BG, fontWeight: 500 }}>{d.decision}</p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.65" }}>{d.rationale}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <Img src="/projects/healthy-taste/user-flow.png" alt="User flow diagrams for calorie calculation, food history, and AI food suggestion" caption="User Flow: calorie calculation, food history, and AI suggestion flows" />


          {/* Design System sub-section */}
          <FadeUp delay={0.05}>
            <div style={{ marginTop: "48px" }}>
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.12em", marginBottom: "8px", fontWeight: 600 }}>DESIGN SYSTEM</p>
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.6vw, 32px)",
                color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "12px",
              }}>
                Scalable component library
              </h3>
              <p style={{ fontSize: "15px", color: "#666", lineHeight: "1.7", maxWidth: "100%", marginBottom: "32px" }}>
                A comprehensive Figma design system built to scale; so future features like meal planning, social sharing,
                and coach integration can be built without reinventing the visual language.
              </p>
            </div>
          </FadeUp>

          <Img src="/projects/healthy-taste/assets.png" alt="Healthy Taste Figma component library: buttons, inputs, cards, and tokens" caption="Figma component library: foundations and reusable components" />

          <FadeUp delay={0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "36px", marginBottom: "28px" }}>
              {[
                { category: "Foundations", items: ["Colour tokens (primary, semantic, neutral)", "Typography scale (Display → Caption)", "Spacing grid (4px base unit)", "Iconography set"] },
                { category: "Core components", items: ["Buttons (5 variants × 3 states)", "Input fields + validation states", "Cards (food item, meal summary, stat)", "Navigation bar + tab system"] },
                { category: "Complex components", items: ["Food search result list", "Portion size visual picker", "Calorie ring progress indicator", "Macro breakdown bar chart"] },
                { category: "Documentation", items: ["Usage guidelines per component", "Do/don't examples", "Accessibility notes (contrast, tap targets)", "Future feature scaffolding notes"] },
              ].map((cat, i) => (
                <motion.div key={cat.category}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "#FFFFFF", borderRadius: "12px", padding: "20px 22px",
                    border: "1px solid rgba(232,82,42,0.08)",
                  }}>
                  <p style={{ fontSize: "12px", color: BG, fontWeight: 600, letterSpacing: "0.04em", marginBottom: "12px" }}>{cat.category.toUpperCase()}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {cat.items.map((item) => (
                      <p key={item} style={{ fontSize: "12px", color: "#666", lineHeight: "1.5" }}>· {item}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: BG + "0D", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${BG}`, marginBottom: "28px",
            }}>
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>WHY BUILD A SYSTEM, NOT JUST SCREENS</p>
              <p style={{ fontSize: "15px", color: DARK, lineHeight: "1.65", opacity: 0.8 }}>
                A calorie tracker is used every single day. Inconsistent spacing, mismatched button sizes, or off-brand colours
                aren't just aesthetic problems; at daily frequency, they feel like bugs. A design system enforces consistency
                before code touches the screen.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div style={{
              background: "#FFFFFF", borderRadius: "14px", padding: "28px",
              border: "1px solid rgba(232,82,42,0.12)",
            }}>
              {/* Colour palette */}
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>COLOUR PALETTE</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px", marginBottom: "28px" }}>
                {[
                  { group: "Primary", colors: [["Warm Orange", "#FF9A3C"], ["Primary Orange", "#FF8C42"]] },
                  { group: "Secondary", colors: [["Sunny", "#FFD166"], ["Leaf", "#8BC34A"], ["Mint", "#C5E1A5"], ["Sky", "#81D4FA"]] },
                  { group: "Accent", colors: [["Alert", "#FF5722"], ["Danger", "#D32F2F"]] },
                  { group: "Neutral", colors: [["Ink", "#000000"], ["Earth", "#5D4037"]] },
                ].map((cat) => (
                  <div key={cat.group}>
                    <p style={{ fontSize: "10px", color: "#999", letterSpacing: "0.06em", marginBottom: "10px", fontWeight: 600 }}>{cat.group.toUpperCase()}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {cat.colors.map(([name, hex]) => (
                        <div key={hex} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: hex, border: "1px solid rgba(0,0,0,0.1)", flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: "11px", color: DARK, margin: 0, lineHeight: 1.2 }}>{name}</p>
                            <p style={{ fontSize: "10px", color: "#AAA", margin: 0, fontFamily: "var(--font-mono, monospace)" }}>{hex}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Typography */}
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>TYPOGRAPHY</p>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { label: "Topic", font: "Nunito · SemiBold", size: "52px", sample: "Healthy Taste", weight: 600, fontSize: "32px" },
                  { label: "Title", font: "Lexend · Medium", size: "24px", sample: "What's for dinner tonight?", weight: 500, fontSize: "21px" },
                  { label: "Body", font: "Lexend · Regular", size: "16px", sample: "Log your meals in under 30 seconds.", weight: 400, fontSize: "15px" },
                ].map((t) => (
                  <div key={t.label} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "16px", alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.06em", fontWeight: 600, margin: 0 }}>{t.label.toUpperCase()}</p>
                      <p style={{ fontSize: "10px", color: "#AAA", margin: "2px 0 0" }}>{t.font}</p>
                      <p style={{ fontSize: "10px", color: "#AAA", margin: "1px 0 0" }}>{t.size}</p>
                    </div>
                    <p style={{ fontFamily: "var(--font-display)", fontWeight: t.weight, fontSize: t.fontSize, color: DARK, margin: 0, lineHeight: 1.2 }}>{t.sample}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Closing */}
      <div style={{ background: "#FAFAF8", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {/* Hi-fi prototype showcase */}
          <FadeUp>
            <p style={{ fontSize: "14px", color: "#1A1A1A", opacity: 0.6, marginBottom: "24px", lineHeight: "1.6", maxWidth: "100%" }}>
              From wireframes to polished screens: a quick-logging flow and design system built for scalability.
            </p>
          </FadeUp>
          <FadeUp>
            <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.12em", marginBottom: "14px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "8px" }}>
              LO-FI
              <svg width="16" height="16" viewBox="0 0 24 24" fill={BG}>
                <path d="M2 10 L14 10 L14 5 L22 12 L14 19 L14 14 L2 14 Z" />
              </svg>
              HI-FI PROTOTYPE
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <PrototypeCarousel
              images={[
                "/projects/healthy-taste/prototypes/lo-fi.png",
                "/projects/healthy-taste/prototypes/mid-fi.png",
                "/projects/healthy-taste/prototypes/hi-fi.png",
              ]}
              alt="Healthy Taste prototype: lo-fi to hi-fi"
              maxHeight={[520, 700, 700]}
            />
          </FadeUp>

          <FadeUp>
            <div style={{ borderLeft: `4px solid ${BG}`, paddingLeft: "28px", margin: "48px 0 56px" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontSize: "22px", color: DARK,
                lineHeight: "1.55", fontStyle: "italic", fontWeight: 400,
              }}>
                The biggest learning: reducing one step in a repeated daily action has outsized impact on habit formation.
                Every second of friction removed from logging translates directly to higher retention.
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
                <p style={{ fontSize: "12px", color: TEXT_ON_BG, opacity: 0.4, marginBottom: "4px" }}>View the design</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: TEXT_ON_BG, fontWeight: 400 }}>Open in Figma</p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <motion.a
                  href="https://www.figma.com/proto/hf7ANRmL8OIWOSZY06Y6md/953351-Term-Project-_-HEALTHY-TASTE?node-id=4546-20561&p=f&t=1lUlThABv12oi2Ku-9&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4546%3A20561&show-proto-sidebar=1"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "#FFFFFF", color: BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}
                >
                  View prototype ↗
                </motion.a>
                <motion.a
                  href="https://www.figma.com/design/hf7ANRmL8OIWOSZY06Y6md/953351-Term-Project-_-HEALTHY-TASTE?node-id=1-2&t=DnCGveC0tKCWH211-1" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "transparent", color: TEXT_ON_BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.4)" }}
                >
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
          <motion.div whileHover={{ opacity: 0.88 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "48px 40px", textDecoration: "none",
              background: prev.bg, borderRight: next ? "1px solid rgba(0,0,0,0.08)" : "none", height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <ArrowLeft size={14} color={prev.textColor} style={{ opacity: 0.5 }} />
                <span style={{ fontSize: "11px", color: prev.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>PREVIOUS</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: prev.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{prev.title}</p>
            </Link>
          </motion.div>
        )}
        {next && (
          <motion.div whileHover={{ opacity: 0.88 }}>
            <Link to={`/${next.slug}`} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              padding: "48px 40px", textDecoration: "none", background: next.bg, height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: next.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>NEXT</span>
                <ArrowRight size={14} color={next.textColor} style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{next.title}</p>
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
                background: p.slug === "healthy-taste" ? "#FFFFFF" : "transparent",
                color: p.slug === "healthy-taste" ? "#111" : "#888",
                border: p.slug === "healthy-taste" ? "none" : "1px solid #333",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "healthy-taste") { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#CCC"; } }}
                onMouseLeave={(e) => { if (p.slug !== "healthy-taste") { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; } }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
