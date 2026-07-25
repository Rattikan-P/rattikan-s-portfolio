import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";

const BG = "#E8522A";
const DARK = "#1A0A00";
const ACCENT = "#FFD4A8";
const TEXT_ON_BG = "#FFFFFF";

const PHASES = [
  { num: "01", label: "RESEARCH" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "DESIGN SYSTEM" },
];

const PHASE_BG = ["#FFF8F5", "#FFF0E8", "#FFE6D8"];

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

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div style={{
      background: "rgba(232,82,42,0.04)", borderRadius: "16px",
      padding: "52px 32px", textAlign: "center",
      border: "1.5px dashed rgba(232,82,42,0.15)",
    }}>
      <div style={{ fontSize: "28px", marginBottom: "10px", opacity: 0.15 }}>🖼</div>
      <p style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.05em" }}>{label}</p>
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

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "11px", color: TEXT_ON_BG, opacity: 0.4, letterSpacing: "0.1em", marginBottom: "12px" }}>
            03 / 2024 · Mobile App · UX/UI Design
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 1, color: TEXT_ON_BG, letterSpacing: "-0.03em", marginBottom: "20px", fontWeight: 400,
            }}>
            Healthy Taste
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: TEXT_ON_BG, opacity: 0.7, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}>
            Most calorie-tracking apps fail users within two weeks — the logging feels more effortful than the benefit seems worth.
            Healthy Taste was designed to flip that ratio entirely.
          </motion.p>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(255,255,255,0.15)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}>
            {[
              { label: "My role", value: "UX/UI Designer" },
              { label: "Platform", value: "Mobile App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(255,255,255,0.08)", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: TEXT_ON_BG, opacity: 0.4, letterSpacing: "0.08em", marginBottom: "3px" }}>{m.label.toUpperCase()}</p>
                <p style={{ fontSize: "13px", color: TEXT_ON_BG, lineHeight: "1.4" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}>
            {[
              { value: "3", label: "Competitor apps analysed" },
              { value: "30+", label: "Figma components built" },
              { value: "<30s", label: "Target logging time per meal" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: ACCENT, lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: TEXT_ON_BG, opacity: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#F3F1EE", padding: "18px 40px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["Mobile App", "UX/UI Design", "Design System", "Figma", "Solo Project"].map((t) => (
            <span key={t} style={{
              background: "#FFFFFF", color: "#666", borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(0,0,0,0.08)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 RESEARCH ═══ */}
      <div data-ht-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="RESEARCH" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Understanding the friction
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              The research question was simple: why do people who want to track calories stop doing it within two weeks?
              The answer wasn't willpower — it was the app.
            </p>
          </FadeUp>

          {/* Competitor analysis */}
          <FadeUp delay={0.05}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>COMPETITIVE ANALYSIS</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {[
                  { app: "MyFitnessPal", strength: "Huge food database", weakness: "Search is overwhelming — too many irrelevant results. UI cluttered with ads and upsells." },
                  { app: "Cronometer", strength: "Detailed micronutrient data", weakness: "Steep learning curve. Designed for power users, not casual trackers." },
                  { app: "Lose It!", strength: "Barcode scanning", weakness: "Portion estimation still requires manual gram input — no visual guide." },
                ].map((c, i) => (
                  <motion.div key={c.app}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    style={{
                      background: "#FFFFFF", borderRadius: "12px", padding: "20px",
                      border: "1px solid rgba(232,82,42,0.08)",
                    }}>
                    <p style={{ fontSize: "14px", color: DARK, fontWeight: 600, marginBottom: "10px" }}>{c.app}</p>
                    <div style={{ marginBottom: "8px" }}>
                      <p style={{ fontSize: "10px", color: "#4CAF50", letterSpacing: "0.06em", marginBottom: "3px" }}>✓ STRENGTH</p>
                      <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.5" }}>{c.strength}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", color: BG, letterSpacing: "0.06em", marginBottom: "3px" }}>✗ GAP</p>
                      <p style={{ fontSize: "12px", color: "#555", lineHeight: "1.5" }}>{c.weakness}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Key friction points */}
          <FadeUp delay={0.1}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.08em", marginBottom: "16px", fontWeight: 600 }}>3 KEY FRICTION POINTS IDENTIFIED</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { num: "1", point: "Searching for food items", detail: "Too many results, ambiguous names, and no smart filtering makes finding the right item feel like a chore — so users give up or log inaccurately." },
                  { num: "2", point: "Estimating portions", detail: "Manual gram entry requires a kitchen scale or guesswork. No visual reference means users either over-engineer or stop logging altogether." },
                  { num: "3", point: "Remembering to log", detail: "Fixed-time alarms don't match meal habits. Reminders fire at the wrong moment — after the meal is already forgotten." },
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

          <FadeUp delay={0.12}>
            <div style={{
              background: BG + "0D", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${BG}`,
            }}>
              <p style={{ fontSize: "11px", color: BG, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>KEY INSIGHT</p>
              <p style={{ fontSize: "15px", color: DARK, lineHeight: "1.65", opacity: 0.8 }}>
                Users don't abandon calorie tracking because they lose motivation — they abandon it because the tool makes
                them feel stupid or slow. Removing one step from a repeated daily action has an outsized impact on habit formation.
              </p>
            </div>
          </FadeUp>

          <div style={{ marginTop: "28px" }}>
            <ImagePlaceholder label="PERSONA CARDS — ADD FROM FIGMA" />
          </div>
        </div>
      </div>

      {/* ═══ 02 DESIGN ═══ */}
      <div data-ht-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Simplified logging flow
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              Every screen was designed with one constraint: logging a meal must take under 30 seconds.
              That constraint forced every unnecessary step out of the flow.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {[
                { decision: "Smart food search", rationale: "Surfaces recent entries and popular matches first. Most users eat the same 15–20 meals repeatedly — the search should know this before they type anything." },
                { decision: "Visual portion estimator", rationale: "Photo-based size guides replace manual gram entry. Users tap a visual scale (palm / fist / thumb) rather than entering numbers they have to look up." },
                { decision: "Context-aware reminders", rationale: "Reminders trigger based on the user's actual meal-time patterns, learned after 3 days of use — not fixed 12pm and 6pm alarms that fire at the wrong moment." },
                { decision: "Barcode scanning", rationale: "One-tap scan for packaged foods. Matched to a curated database with Thai food coverage — the gap that MyFitnessPal leaves unfilled for local users." },
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

          <FadeUp delay={0.1}>
            <PrototypeCarousel
              images={["/projects/healthy-taste/prototypes/prototype.png"]}
              alt="HealthyTaste Prototype"
            />
          </FadeUp>
        </div>
      </div>

      {/* ═══ 03 DESIGN SYSTEM ═══ */}
      <div data-ht-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(232,82,42,0.05)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="DESIGN SYSTEM" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Scalable component library
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              A comprehensive Figma design system built to scale — so future features like meal planning, social sharing,
              and coach integration can be built without reinventing the visual language.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
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
                aren't just aesthetic problems — at daily frequency, they feel like bugs. A design system enforces consistency
                before code touches the screen.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.12}>
            <ImagePlaceholder label="DESIGN SYSTEM OVERVIEW — ADD FROM FIGMA" />
          </FadeUp>
        </div>
      </div>

      {/* Closing */}
      <div style={{ background: "#FAFAF8", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ borderLeft: `4px solid ${BG}`, paddingLeft: "28px", marginBottom: "56px" }}>
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
              <motion.a
                href="https://www.figma.com/design/hf7ANRmL8OIWOSZY06Y6md/953351-Term-Project-_-HEALTHY-TASTE"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ background: "#FFFFFF", color: BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}
              >
                Figma ↗
              </motion.a>
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
      <div style={{ background: "#1A1A1A", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#333", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "healthy-taste" ? p.bg : "transparent",
                color: p.slug === "healthy-taste" ? p.textColor : "#444",
                border: p.slug === "healthy-taste" ? "none" : "1px solid #222",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "healthy-taste") { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#888"; } }}
                onMouseLeave={(e) => { if (p.slug !== "healthy-taste") { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#444"; } }}
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
