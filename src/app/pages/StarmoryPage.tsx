import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";

import competitiveAnalysis from "@/imports/Competitive_Analysis.png";
import empathyMap from "@/imports/Empathy_map.png";
import kickoffCanvas from "@/imports/Project_Kickoff_Canvas_Worksheet.png";
import journeyMap from "@/imports/Journey_map.png";

const BG = "#1C1B3A";
const ACCENT = "#A78BFA";
const TEXT = "#FFFFFF";

const PHASES = [
  { num: "01", label: "DISCOVER" },
  { num: "02", label: "DEFINE" },
  { num: "03", label: "DESIGN" },
  { num: "04", label: "BUILD" },
];

const PHASE_BG = ["#1C1B3A", "#221F45", "#272352", "#1E1C3F"];

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
  return (
    <FadeUp>
      <figure style={{ margin: 0 }}>
        <motion.div
          whileHover={{ scale: 1.015, boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ borderRadius: "12px", overflow: "hidden", cursor: "zoom-in" }}
        >
          <ImageWithFallback
            src={src} alt={alt}
            style={{ width: "100%", display: "block", border: "1px solid rgba(255,255,255,0.07)" }}
          />
        </motion.div>
        {caption && (
          <figcaption style={{
            fontSize: "11px", color: "#555", letterSpacing: "0.04em",
            marginTop: "10px", textAlign: "center",
          }}>{caption}</figcaption>
        )}
      </figure>
    </FadeUp>
  );
}

function PhaseStrip({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px",
      padding: "22px 40px",
      background: "rgba(255,255,255,0.03)",
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: "13px",
        color: ACCENT, letterSpacing: "0.02em", fontStyle: "italic",
      }}>{num}</span>
      <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.1)" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#444" }}>
        {label}
      </span>
    </div>
  );
}

function SideProgress({ activePhase }: { activePhase: number }) {
  return (
    <div style={{
      position: "fixed", right: "28px", top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "10px",
      zIndex: 50,
    }}>
      {PHASES.map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === activePhase ? 24 : 6, background: i === activePhase ? ACCENT : "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

export function StarmoryPage() {
  const { next } = getAdjacentProjects("starmory");
  const { prev } = getAdjacentProjects("starmory");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-starmory-phase]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(Number((el as HTMLElement).dataset.starmoryPhase)); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <SideProgress activePhase={activePhase} />

      {/* ── Hero ── */}
      <div style={{ background: BG, padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-60px", right: "-20px",
            fontFamily: "var(--font-display)", fontSize: "clamp(180px, 26vw, 360px)",
            lineHeight: 1, color: "rgba(255,255,255,0.03)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >02</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: TEXT, opacity: 0.35, textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.03em", transition: "opacity 0.2s", marginBottom: "48px",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "11px", color: TEXT, opacity: 0.3, letterSpacing: "0.1em", marginBottom: "12px" }}
          >
            02 / 2024 · AI Language-Learning App
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 1, color: TEXT, letterSpacing: "-0.03em",
              marginBottom: "20px", fontWeight: 400,
            }}
          >
            Starmory
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: TEXT, opacity: 0.55, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}
          >
            Most language apps treat learning as drills disconnected from real life.
            Starmory is different — users photograph their world, and AI turns those
            personal images into vocabulary lessons grounded in their own memories.
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}
          >
            {[
              { label: "My role", value: "UX/UI Designer & Full-stack Dev" },
              { label: "Platform", value: "Mobile App (Flutter)" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.04)", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: TEXT, opacity: 0.3, letterSpacing: "0.08em", marginBottom: "3px" }}>
                  {m.label.toUpperCase()}
                </p>
                <p style={{ fontSize: "13px", color: TEXT, lineHeight: "1.4" }}>{m.value}</p>
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
              { value: "6", label: "Learning theories grounding the design" },
              { value: "6", label: "Core features shipped" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: ACCENT, lineHeight: 1, marginBottom: "4px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "13px", color: TEXT, opacity: 0.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "rgba(255,255,255,0.03)", padding: "18px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["AI", "UX/UI Design", "Flutter", "Full-stack", "Spaced Repetition"].map((t) => (
            <span key={t} style={{
              background: "rgba(167,139,250,0.1)", color: ACCENT,
              borderRadius: "100px", padding: "6px 16px", fontSize: "12px",
              border: "1px solid rgba(167,139,250,0.2)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <div data-starmory-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(255,255,255,0.02)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="DISCOVER" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Why do language apps fail people?
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.5, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              We started by mapping the competitive landscape and understanding the emotional experience of language learners — not just their behaviour, but how they feel when they open (or avoid opening) a study app.
            </p>
          </FadeUp>

          <Img src={competitiveAnalysis} alt="Competitive analysis comparing Duolingo, Longjournal, Moodo, My Diary — feature matrix, screenshots, SWO analysis, and reflection" caption="Competitive Analysis — feature matrix, SWO, and design reflections" />

          <div style={{ marginTop: "20px" }}>
            <Img src={empathyMap} alt="Empathy map for a language learner — Think & Feel, See, Say & Do, Pain, Gain" caption="Empathy Map — the emotional reality of a tired learner" />
          </div>

          <FadeUp delay={0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "28px",
            }}>
              {[
                { label: "Think & Feel", text: "Wants to improve but feels mentally drained. Guilt for 'doing nothing' is actually exhaustion." },
                { label: "Pain", text: "Decision fatigue about where to start. Blank-page effect. Creative friction before any learning happens." },
                { label: "Gain", text: "Effortless learning embedded in daily life. Small wins that restore motivation, not drain it." },
              ].map((c) => (
                <div key={c.label} style={{
                  background: "rgba(167,139,250,0.07)", borderRadius: "12px",
                  padding: "18px 20px", border: "1px solid rgba(167,139,250,0.12)",
                }}>
                  <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.07em", marginBottom: "8px", fontWeight: 600 }}>{c.label.toUpperCase()}</p>
                  <p style={{ fontSize: "13px", color: TEXT, opacity: 0.65, lineHeight: "1.6" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 02 DEFINE ═══ */}
      <div data-starmory-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(255,255,255,0.02)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="DEFINE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Turning insight into a design hypothesis
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.5, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              The Project Kickoff Canvas forced us to articulate the problem, our assumptions, and a testable hypothesis before writing a single line of code or sketching a single screen.
            </p>
          </FadeUp>

          <Img src={kickoffCanvas} alt="Project Kickoff Canvas — problem statement, assumptions, design hypothesis, AI idea, and target user segment" caption="Project Kickoff Canvas — problem, hypothesis, and target user" />

          <FadeUp delay={0.1}>
            <div style={{
              background: "rgba(167,139,250,0.1)", borderRadius: "14px",
              padding: "28px 32px", marginTop: "28px",
              borderLeft: `4px solid ${ACCENT}`,
            }}>
              <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em", marginBottom: "12px", fontWeight: 600 }}>
                DESIGN HYPOTHESIS
              </p>
              <p style={{ fontSize: "16px", color: TEXT, opacity: 0.85, lineHeight: "1.7", fontStyle: "italic" }}>
                "We believe that language lessons built from users' personal photos will make learning feel easier and more consistent for tired people — because familiar images already have context and meaning, helping words stick naturally without forced memorization."
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "Problem statement", text: "People want to learn a language but don't start because it feels like hard work. So they do nothing and feel bad about it later." },
                { label: "Target user", text: "Visual learners, often mentally exhausted, prefer low-effort activities. Take photos regularly. Afraid to start. Self-improvers at heart." },
              ].map((c) => (
                <div key={c.label} style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: "12px",
                  padding: "20px 22px", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.07em", marginBottom: "8px", fontWeight: 600 }}>{c.label.toUpperCase()}</p>
                  <p style={{ fontSize: "14px", color: TEXT, opacity: 0.65, lineHeight: "1.65" }}>{c.text}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 03 DESIGN ═══ */}
      <div data-starmory-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(255,255,255,0.02)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Designing the ideal user journey
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.5, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              Persona Phukan, 21, returns home mentally exhausted after class and just wants to improve her English — without it feeling like work. The journey map plots exactly how Starmory fits into that moment.
            </p>
          </FadeUp>

          <Img src={journeyMap} alt="User journey map for Phukan, 21 — 7 stages from Low-Energy Moment to Daily Memory. Emotions: Too tired → Doesn't look stressful → Let me try → Easier than expected → No need to think → I did something today → Oh, I remember this!" caption="User Journey Map — Phukan, 21 · Low-Energy Moment → Daily Memory" />

          <FadeUp delay={0.1}>
            <div style={{ marginTop: "24px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                "Low-Energy Moment",
                "Accidental Discovery",
                "First Open",
                "One-Tap Start",
                "AI Support & Choice",
                "Visual Reward",
                "Daily Memory",
              ].map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {i > 0 && <ArrowRight size={12} color="#333" />}
                  <span style={{
                    background: "rgba(167,139,250,0.1)", color: ACCENT,
                    borderRadius: "6px", padding: "5px 12px", fontSize: "11px",
                    border: "1px solid rgba(167,139,250,0.15)",
                  }}>{step}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              marginTop: "24px", background: "rgba(255,255,255,0.03)", borderRadius: "14px",
              padding: "24px 28px", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.07em", marginBottom: "12px", fontWeight: 600 }}>
                KEY OPPORTUNITIES FROM THE JOURNEY
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Position learning as rest, not effort — meet users at their lowest energy moment",
                  "Visual-first branding: non-academic, non-demanding aesthetic to reduce fear of commitment",
                  "Skip sign-up, instant access — zero friction to the first interaction",
                  "Zero-typing entry with AI-powered photo suggestions and optional text",
                  "Long-term memory through scrapbook-style visual timeline",
                ].map((o, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: "10px", alignItems: "start" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, marginTop: "7px", flexShrink: 0 }} />
                    <p style={{ fontSize: "14px", color: TEXT, opacity: 0.6, lineHeight: "1.6" }}>{o}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 04 BUILD ═══ */}
      <div data-starmory-phase="3" style={{ background: PHASE_BG[3], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(255,255,255,0.02)", fontWeight: 700, lineHeight: 1,
          pointerEvents: "none", userSelect: "none",
        }}>04</div>
        <PhaseStrip num="04" label="BUILD" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Full-stack ownership
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.5, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              I took primary ownership of the database architecture and FSRS algorithm implementation, while also contributing to the Flutter front-end across the capture, lesson, and review flows.
            </p>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
            {[
              { step: "Database schema", detail: "Designed the Supabase schema to handle user vocabularies, FSRS review schedules, lesson history, and AI-generated content — structured to scale across two developers' feature sets simultaneously." },
              { step: "FSRS algorithm", detail: "Implemented the Free Spaced Repetition Scheduler (Ye et al., 2023) on the back-end — connecting review outcomes to interval recalculation in real time, ensuring each word reappears at the optimal memory moment." },
              { step: "Flutter front-end", detail: "Built the UI across the capture, lesson, and review flows. Managed state across the full app lifecycle while keeping the codebase maintainable through a 16-week build." },
            ].map((b, i) => (
              <motion.div
                key={b.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                style={{
                  background: "rgba(255,255,255,0.03)", borderRadius: "12px",
                  padding: "20px 24px", border: "1px solid rgba(255,255,255,0.06)",
                  display: "grid", gridTemplateColumns: "160px 1fr", gap: "20px", alignItems: "start",
                }}
              >
                <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{b.step}</p>
                <p style={{ fontSize: "14px", color: TEXT, opacity: 0.55, lineHeight: "1.65" }}>{b.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Hi-fi placeholder */}
          <FadeUp delay={0.1}>
            <PrototypeCarousel
              images={["/projects/starmory/prototypes/prototype.png"]}
              alt="Starmory Prototype"
            />
          </FadeUp>
        </div>
      </div>

      {/* Research */}
      <div style={{ background: "#111118", padding: "60px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <p style={{ fontSize: "11px", color: "#333", letterSpacing: "0.12em", marginBottom: "24px" }}>
              GROUNDED IN RESEARCH
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {[
                "Episodic Memory — Tulving, 1972",
                "FSRS Spaced-Repetition — Ye et al., 2023",
                "Input Hypothesis 'i+1' — Krashen, 1985",
                "Self-Reference Effect — Rogers et al., 1977",
                "Speech Act Theory — Austin 1962; Searle 1969",
                "Context-Dependent Memory — Godden & Baddeley, 1975",
              ].map((r, i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  style={{
                    background: "rgba(167,139,250,0.1)", color: ACCENT,
                    borderRadius: "8px", padding: "8px 14px", fontSize: "13px",
                    border: "1px solid rgba(167,139,250,0.18)",
                  }}
                >
                  {r}
                </motion.span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Closing */}
      <div style={{ background: BG, padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: "28px", marginBottom: "56px" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontSize: "22px", color: TEXT,
                lineHeight: "1.55", fontStyle: "italic", fontWeight: 400, opacity: 0.85,
              }}>
                Starmory taught me that the strongest design decisions come from understanding the science of how people actually learn — not from copying what popular apps do. Grounding every feature in an established theory gave us a clear reason to say yes or no to any idea during the build.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: "rgba(167,139,250,0.1)", borderRadius: "20px",
              padding: "36px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px",
              border: "1px solid rgba(167,139,250,0.15)",
            }}>
              <div>
                <p style={{ fontSize: "12px", color: TEXT, opacity: 0.3, marginBottom: "4px" }}>Want to explore it?</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: TEXT, fontWeight: 400 }}>
                  View the prototype
                </p>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: ACCENT, color: BG, borderRadius: "100px",
                  padding: "13px 26px", fontSize: "14px", textDecoration: "none",
                }}
              >
                View prototype ↗
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{ display: "grid", gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {prev && (
          <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "48px 40px",
              textDecoration: "none", background: prev.bg,
              borderRight: next ? "1px solid rgba(255,255,255,0.06)" : "none", height: "100%",
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
      <div style={{ background: "#0D0D15", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#222", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "starmory" ? p.bg : "transparent",
                color: p.slug === "starmory" ? ACCENT : "#333",
                border: p.slug === "starmory" ? `1px solid ${ACCENT}30` : "1px solid #1A1A1A",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "starmory") { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#555"; } }}
                onMouseLeave={(e) => { if (p.slug !== "starmory") { e.currentTarget.style.borderColor = "#1A1A1A"; e.currentTarget.style.color = "#333"; } }}
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
