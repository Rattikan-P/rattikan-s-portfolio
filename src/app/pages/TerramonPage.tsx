import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";

import userJourneyMap from "@/imports/User_Journey_Map__Without_App_.png";
import userFlow from "@/imports/User_Flow_Low-fidelity_Prototype.png";

const BG = "#2D5016";
const ACCENT = "#86EFAC";
const TEXT = "#FFFFFF";

const PHASES = [
  { num: "01", label: "DISCOVER" },
  { num: "02", label: "DEFINE" },
  { num: "03", label: "DESIGN" },
  { num: "04", label: "BUILD" },
];

const PHASE_BG = ["#2D5016", "#32581a", "#294d14", "#2a5212"];

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
          whileHover={{ scale: 1.012, boxShadow: "0 16px 48px rgba(0,0,0,0.4)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ borderRadius: "12px", overflow: "hidden", cursor: "zoom-in" }}
        >
          <ImageWithFallback
            src={src} alt={alt}
            style={{ width: "100%", display: "block", border: "1px solid rgba(255,255,255,0.07)" }}
          />
        </motion.div>
        {caption && (
          <figcaption style={{ fontSize: "11px", color: "#4a6a3a", letterSpacing: "0.04em", marginTop: "10px", textAlign: "center" }}>
            {caption}
          </figcaption>
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
      background: "rgba(134,239,172,0.05)",
      borderTop: "1px solid rgba(134,239,172,0.08)",
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: ACCENT, fontStyle: "italic" }}>{num}</span>
      <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.1)" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#4a6a3a" }}>{label}</span>
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
          animate={{ width: i === activePhase ? 24 : 6, background: i === activePhase ? ACCENT : "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

export function TerramonPage() {
  const { prev, next } = getAdjacentProjects("terramon");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-terramon-phase]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(Number((el as HTMLElement).dataset.terramonPhase)); },
        { threshold: 0.3 }
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
          initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-60px", right: "-20px",
            fontFamily: "var(--font-display)", fontSize: "clamp(180px, 24vw, 340px)",
            lineHeight: 1, color: "rgba(134,239,172,0.04)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >04</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: TEXT, opacity: 0.3, textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.03em", transition: "opacity 0.2s", marginBottom: "48px",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.3")}
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "11px", color: TEXT, opacity: 0.25, letterSpacing: "0.1em", marginBottom: "12px" }}>
            04 / 2023 · AI Plant Care App · Team Project
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 1, color: TEXT, letterSpacing: "-0.03em", marginBottom: "20px", fontWeight: 400,
            }}>
            Terramon
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: TEXT, opacity: 0.5, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}>
            A smart gardening assistant that bridges the gap between plant enthusiasm and plant care knowledge: combining AI identification, automated reminders, and community support in one app.
          </motion.p>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(134,239,172,0.1)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}>
            {[
              { label: "My role", value: "UX/UI Designer & Front-end Dev" },
              { label: "Platform", value: "Mobile App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "rgba(134,239,172,0.04)", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: TEXT, opacity: 0.25, letterSpacing: "0.08em", marginBottom: "3px" }}>{m.label.toUpperCase()}</p>
                <p style={{ fontSize: "13px", color: TEXT, lineHeight: "1.4" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}>
            {[
              { value: "6", label: "Core features shipped" },
              { value: "10", label: "Cross-functional team size" },
              { value: "13", label: "Screens in plant ID flow" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: ACCENT, lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: TEXT, opacity: 0.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "rgba(134,239,172,0.04)", padding: "18px 40px", borderBottom: "1px solid rgba(134,239,172,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["AI", "UX/UI Design", "Full-stack", "Team Project", "Vue.js", "Spring Boot", "TensorFlow"].map((t) => (
            <span key={t} style={{
              background: "rgba(134,239,172,0.08)", color: ACCENT,
              borderRadius: "100px", padding: "6px 16px", fontSize: "12px",
              border: "1px solid rgba(134,239,172,0.15)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 DISCOVER ═══ */}
      <div data-terramon-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(134,239,172,0.03)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="DISCOVER" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              The plant dies. Every time.
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.45, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              We mapped the experience of a plant owner <em>without</em> any app; across 8 stages from impulse buy to dead plant.
              The journey revealed where confidence turns to guilt, and where a smart assistant could intervene.
            </p>
          </FadeUp>

          <Img src={userJourneyMap}
            alt="User journey map without app: 8 stages: Go to work → Interested in friends' plants → Buy a plant → Look for ways to care for it → Busy with work → Plant gets sick → Quick Fix Attempts → Plant died. Emotions: Drained → Curious → Excited but responsible → Hopeful → Distracted/guilty → Anxious → Desperate → Disappointed."
            caption="User Journey Map (Without App): 8 stages from discovery to loss"
          />

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "24px" }}>
              {[
                { stage: "Buy a plant", emotion: "Excited, but feeling responsible 😊", insight: "Impulse buy from a shop; no research, no preparation." },
                { stage: "Busy with work", emotion: "Distracted, then guilty 😅", insight: "Work takes over. Watering is forgotten. Guilt creeps in." },
                { stage: "Plant gets sick", emotion: "Anxious and guilty 😰", insight: "Yellow leaves appear. \"Is it too much water or too little?\"" },
                { stage: "Quick Fix Attempts", emotion: "Desperate but hopeful 😢", insight: "Moves the plant, changes soil, waters more; all guesses." },
                { stage: "Plant died", emotion: "Disappointed and regretful 😞", insight: "\"Maybe I need to learn more before getting another plant.\"" },
              ].map((s, i) => (
                <motion.div key={s.stage}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    background: "rgba(134,239,172,0.05)", borderRadius: "10px", padding: "14px 20px",
                    border: "1px solid rgba(134,239,172,0.08)",
                    display: "grid", gridTemplateColumns: "160px 180px 1fr", gap: "16px", alignItems: "center",
                  }}>
                  <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{s.stage}</p>
                  <p style={{ fontSize: "12px", color: TEXT, opacity: 0.5 }}>{s.emotion}</p>
                  <p style={{ fontSize: "13px", color: TEXT, opacity: 0.55, lineHeight: "1.5", fontStyle: "italic" }}>{s.insight}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 02 DEFINE ═══ */}
      <div data-terramon-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(134,239,172,0.03)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="DEFINE" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              6 features. Every one with a purpose.
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.45, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              The journey map revealed three root causes: lack of identification knowledge, no care routine, and no community to ask.
              We defined 6 features to address each; backed by a full Software Requirements Specification.
            </p>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "36px" }}>
            {[
              { num: "F1", name: "Authentication", desc: "Single input field accepting both username and email; reducing login friction and cognitive load." },
              { num: "F2", name: "Plant Identification", desc: "AI-powered photo analysis via TensorFlow. Returns matches with confidence scores, distinctive features, and a direct path to adding the plant to My Garden." },
              { num: "F3", name: "Care Reminders", desc: "Custom schedules per plant: watering, fertilizing, repotting, pruning. Notifications via Firebase Cloud Messaging." },
              { num: "F4", name: "My Garden", desc: "A digital plant journal. Users log photos, notes, species info, and track health over time. All updates reflected immediately." },
              { num: "F5", name: "Community", desc: "Q&A forum, plant care tips, troubleshooting posts. Moderated to ensure appropriate, accurate content." },
              { num: "F6", name: "Vendors Shop", desc: "In-app marketplace for pots, soil, fertilisers, tools, and plants from verified sellers; personalised by plant collection." },
            ].map((f, i) => (
              <motion.div key={f.num}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                style={{
                  background: "rgba(134,239,172,0.05)", borderRadius: "12px", padding: "18px 22px",
                  border: "1px solid rgba(134,239,172,0.08)",
                  display: "grid", gridTemplateColumns: "36px 160px 1fr", gap: "16px", alignItems: "start",
                }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "14px", color: ACCENT, opacity: 0.5, fontStyle: "italic" }}>{f.num}</span>
                <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500, paddingTop: "1px" }}>{f.name}</p>
                <p style={{ fontSize: "13px", color: TEXT, opacity: 0.5, lineHeight: "1.6" }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div style={{
              background: "rgba(134,239,172,0.07)", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${ACCENT}`,
            }}>
              <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em", marginBottom: "12px", fontWeight: 600 }}>SYSTEM ARCHITECTURE</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "Vue.js (Frontend)",
                  "Spring Boot (Backend / AWS)",
                  "MySQL (Database)",
                  "TensorFlow (AI Plant ID)",
                  "Firebase Cloud Messaging",
                ].map((t) => (
                  <span key={t} style={{
                    background: "rgba(134,239,172,0.1)", color: ACCENT,
                    borderRadius: "6px", padding: "5px 12px", fontSize: "12px",
                    border: "1px solid rgba(134,239,172,0.15)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              marginTop: "16px", background: "rgba(255,255,255,0.03)", borderRadius: "14px",
              padding: "22px 28px", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{ fontSize: "11px", color: "#4a6a3a", letterSpacing: "0.08em", marginBottom: "12px", fontWeight: 600 }}>MY CONTRIBUTION: USE CASE OWNERSHIP</p>
              <p style={{ fontSize: "14px", color: TEXT, opacity: 0.6, lineHeight: "1.7" }}>
                I authored the full Use Case Description for <strong style={{ color: ACCENT }}>Feature #2: Plant Identification</strong>:
                5 URS, 14+ SRS items, Normal/Alternative/Exception flows (A1–A9, E1–E4), input specifications,
                pre/post conditions, and a traceability matrix. I also led the design sub-team through sprints and design-to-dev handoff.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 03 DESIGN ═══ */}
      <div data-terramon-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(134,239,172,0.03)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              13-screen plant identification flow
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.45, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              Low-fidelity wireframes mapped every state of the Plant Identification feature; including all error, loading, and edge-case screens; before a single pixel of hi-fi was designed.
            </p>
          </FadeUp>

          <Img src={userFlow}
            alt="User flow low-fidelity prototype: 13 screens: UI-001 Home, UI-002 Camera Option, UI-003 Photo Confirmation, UI-004 Cancel Alert, UI-005 Error, UI-006 Poor Quality Alert, UI-007 Connection Lost, UI-008 Loading/Matching, UI-009 Cannot Identify, UI-010 Plant Result, UI-011 Plant Detail, UI-012 Success Added, UI-013 My Garden"
            caption="Low-fidelity User Flow: Plant Identification · UI-001 to UI-013"
          />

          <FadeUp delay={0.1}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "8px", marginTop: "20px",
            }}>
              {[
                { id: "UI-001", name: "Home" },
                { id: "UI-002", name: "Camera Option" },
                { id: "UI-003", name: "Photo Confirm" },
                { id: "UI-004", name: "Cancel Alert" },
                { id: "UI-005", name: "System Error" },
                { id: "UI-006", name: "Poor Quality" },
                { id: "UI-007", name: "No Connection" },
                { id: "UI-008", name: "Matching Plant" },
                { id: "UI-009", name: "Cannot Identify" },
                { id: "UI-010", name: "Plant Result" },
                { id: "UI-011", name: "Plant Detail" },
                { id: "UI-012", name: "Added Success" },
                { id: "UI-013", name: "My Garden" },
              ].map((s) => (
                <div key={s.id} style={{
                  background: "rgba(134,239,172,0.05)", borderRadius: "8px", padding: "10px 14px",
                  border: "1px solid rgba(134,239,172,0.08)",
                }}>
                  <p style={{ fontSize: "10px", color: ACCENT, opacity: 0.6, letterSpacing: "0.06em", marginBottom: "2px" }}>{s.id}</p>
                  <p style={{ fontSize: "12px", color: TEXT, opacity: 0.65 }}>{s.name}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              marginTop: "20px", background: "rgba(134,239,172,0.07)", borderRadius: "12px",
              padding: "20px 24px", borderLeft: `4px solid ${ACCENT}`,
            }}>
              <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em", marginBottom: "8px", fontWeight: 600 }}>USABILITY REQUIREMENTS MET BY DESIGN</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[
                  "NFR-UH-01: 90% of beginner users can add a plant to My Garden within 45 seconds; achieved by reducing the identify-to-add path to 3 taps",
                  "NFR-UH-02: Core tasks achievable in ≤3 sequential interactions; Plant ID: Identify → Confirm → Add",
                  "NFR-UH-04: Zero ambiguous icons; all UI-001 to UI-013 icons reviewed against icon clarity standard",
                ].map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "16px 1fr", gap: "10px", alignItems: "start" }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: ACCENT, marginTop: "7px", flexShrink: 0 }} />
                    <p style={{ fontSize: "13px", color: TEXT, opacity: 0.6, lineHeight: "1.6" }}>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 04 BUILD ═══ */}
      <div data-terramon-phase="3" style={{ background: PHASE_BG[3], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(134,239,172,0.03)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>04</div>
        <PhaseStrip num="04" label="BUILD" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: TEXT, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Bridging design and engineering across a 10-person team
            </h2>
            <p style={{ fontSize: "16px", color: TEXT, opacity: 0.45, lineHeight: "1.75", maxWidth: "640px", marginBottom: "40px" }}>
              Acting as the bridge between the UX sub-team and engineering, I contributed to front-end implementation while ensuring design intent survived handoff; managing a shared component library across the full team.
            </p>
          </FadeUp>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {[
              { area: "Design-to-dev handoff", detail: "Structured sprints with the UX sub-team of 4, building shared components and documenting design decisions before handing to engineers; reducing back-and-forth during implementation." },
              { area: "Component library", detail: "Managed a shared Figma + code component library keeping design and implementation in sync across all 10 team members. Enforced Terramon Brand Style Guide (primary color #319F5E, Lexend typography)." },
              { area: "Front-end contribution", detail: "Built UI screens in Vue.js, implementing scroll-aware header behavior, consistent icon standards, and the unified login input field; all requirements from the Change Request approved by the team." },
              { area: "Requirements authoring", detail: "Authored UC-001 (Plant Identification with Camera): the most complex use case in the SRS with 5 URS, 14+ SRS items, 9 alternative flows, and 4 exception flows covering all edge cases." },
            ].map((b, i) => (
              <motion.div key={b.area}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.09 }}
                style={{
                  background: "rgba(134,239,172,0.05)", borderRadius: "12px", padding: "20px 24px",
                  border: "1px solid rgba(134,239,172,0.08)",
                  display: "grid", gridTemplateColumns: "180px 1fr", gap: "20px", alignItems: "start",
                }}>
                <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{b.area}</p>
                <p style={{ fontSize: "13px", color: TEXT, opacity: 0.55, lineHeight: "1.65" }}>{b.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Hi-fi prototype */}
          <FadeUp delay={0.1}>
            <PrototypeCarousel
              images={["/projects/terramon/prototypes/prototype.png"]}
              alt="Terramon Prototype"
            />
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
                lineHeight: "1.55", fontStyle: "italic", fontWeight: 400, opacity: 0.8,
              }}>
                Working in a 10-person team taught me that the design-to-dev handoff is itself a design problem.
                Clear documentation, shared components, and regular cross-team reviews made the difference between a product that ships and one that drifts.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: "rgba(134,239,172,0.08)", borderRadius: "20px", padding: "36px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px", border: "1px solid rgba(134,239,172,0.12)",
            }}>
              <div>
                <p style={{ fontSize: "12px", color: TEXT, opacity: 0.25, marginBottom: "4px" }}>Want to explore it?</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: TEXT, fontWeight: 400 }}>View the prototype</p>
              </div>
              <motion.a
                href="https://www.figma.com/proto/xq3f7ikHBApT45PQb8nxqE/SW-Req-Wireframe-G4?node-id=613-2987&p=f&t=mQtS9ZFqwbFlmQoY-1&scaling=scale-down&content-scaling=fixed&page-id=595%3A12&starting-point-node-id=613%3A2987"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ background: ACCENT, color: BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none" }}
              >
                View prototype ↗
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{ display: "grid", gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr", borderTop: "1px solid rgba(134,239,172,0.06)" }}>
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
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: prev.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{prev.title}</p>
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
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{next.title}</p>
            </Link>
          </motion.div>
        )}
      </div>

      {/* All projects */}
      <div style={{ background: "#1a2f0d", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#2a4a1a", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "terramon" ? "rgba(134,239,172,0.1)" : "transparent",
                color: p.slug === "terramon" ? ACCENT : "#3a5a2a",
                border: p.slug === "terramon" ? "1px solid rgba(134,239,172,0.2)" : "1px solid #223a14",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "terramon") { e.currentTarget.style.borderColor = "#3a5a2a"; e.currentTarget.style.color = "#5a8a4a"; } }}
                onMouseLeave={(e) => { if (p.slug !== "terramon") { e.currentTarget.style.borderColor = "#223a14"; e.currentTarget.style.color = "#3a5a2a"; } }}
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
