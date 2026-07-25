import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProject, getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

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

function SideProgress({ phases, activePhase, accent }: { phases: string[]; activePhase: number; accent: string }) {
  return (
    <div style={{
      position: "fixed", right: "28px", top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "10px",
      zIndex: 50,
    }}>
      {phases.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === activePhase ? 24 : 6,
            background: i === activePhase ? accent : "rgba(0,0,0,0.15)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug ?? "");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-phase-idx]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePhase(Number((el as HTMLElement).dataset.phaseIdx));
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  const { prev, next } = getAdjacentProjects(project.slug);
  const isLight = project.textColor === "#1A1A1A";

  // Build alternating warm-neutral backgrounds for phases
  const phaseBgs = [
    "#FDFCFA", "#F7F4EF", "#F0EBE3", "#E8E0D5", "#DDD3C6",
  ];

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <SideProgress phases={project.phases} activePhase={activePhase} accent={project.accent} />

      {/* ── Hero ── */}
      <div style={{
        background: project.bg,
        padding: "120px 40px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ghost number */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-50px", right: "-20px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(180px, 26vw, 340px)",
            lineHeight: 1,
            color: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)",
            fontWeight: 700, pointerEvents: "none", userSelect: "none",
            letterSpacing: "-0.05em",
          }}
        >{project.number}</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: project.textColor, opacity: 0.4, textDecoration: "none",
              fontSize: "13px", letterSpacing: "0.03em",
              transition: "opacity 0.2s", marginBottom: "48px",
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
            style={{ fontSize: "11px", color: project.textColor, opacity: 0.4, letterSpacing: "0.1em", marginBottom: "12px" }}
          >
            {project.number} / {project.year} · {project.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 1, color: project.textColor, letterSpacing: "-0.03em",
              marginBottom: "20px", fontWeight: 400,
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: "18px", color: project.textColor, opacity: 0.65,
              maxWidth: "560px", lineHeight: "1.7", marginBottom: "44px",
            }}
          >
            {project.longDescription}
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px",
              background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)",
              borderRadius: "14px", overflow: "hidden", maxWidth: "700px",
            }}
          >
            {[
              { label: "My role", value: project.role },
              { label: "Duration", value: project.duration },
              { label: "Team", value: project.team },
              { label: "Tools", value: project.tools },
              { label: "Platform", value: project.platform },
            ].map((m) => (
              <div key={m.label} style={{
                background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                padding: "14px 18px",
              }}>
                <p style={{ fontSize: "10px", color: project.textColor, opacity: 0.4, letterSpacing: "0.08em", marginBottom: "3px" }}>
                  {m.label.toUpperCase()}
                </p>
                <p style={{ fontSize: "13px", color: project.textColor, lineHeight: "1.4" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          {project.stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}
            >
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: project.textColor, lineHeight: 1, marginBottom: "4px" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "13px", color: project.textColor, opacity: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tags row */}
      <div style={{ background: "#F3F1EE", padding: "18px 40px", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              background: "#FFFFFF", color: "#666", borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(0,0,0,0.08)",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* ── Phases ── */}
      {project.phases.map((phase, i) => {
        const bg = phaseBgs[i % phaseBgs.length];
        return (
          <div
            key={phase.step}
            data-phase-idx={i}
            style={{ background: bg, position: "relative", overflow: "hidden" }}
          >
            {/* Ghost number */}
            <div style={{
              position: "absolute", top: "-10px", right: "-10px",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(120px, 18vw, 220px)",
              color: "rgba(0,0,0,0.04)", fontWeight: 700, lineHeight: 1,
              pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Phase strip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "16px",
              padding: "22px 40px",
              background: "rgba(0,0,0,0.04)",
              borderTop: "1px solid rgba(0,0,0,0.07)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "13px",
                color: project.accent, letterSpacing: "0.02em", fontStyle: "italic",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.12)" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#999" }}>
                {phase.step.split("—")[1]?.trim().toUpperCase() ?? phase.step.toUpperCase()}
              </span>
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "52px 40px 72px", position: "relative", zIndex: 1 }}>
              <FadeUp>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
                  lineHeight: 1.1, marginBottom: "32px",
                }}>
                  {phase.title}
                </h2>
              </FadeUp>

              {/* Content bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {phase.content.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: j * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: "grid", gridTemplateColumns: "20px 1fr", gap: "12px",
                      alignItems: "start",
                    }}
                  >
                    <div style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: project.accent, marginTop: "8px", flexShrink: 0,
                    }} />
                    <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.75" }}>{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Image placeholder */}
              {phase.imageNote && (
                <FadeUp delay={0.15}>
                  <div style={{
                    background: "rgba(0,0,0,0.05)", borderRadius: "14px",
                    padding: "52px 32px", textAlign: "center",
                    border: "1.5px dashed rgba(0,0,0,0.1)",
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "10px", opacity: 0.3 }}>🖼</div>
                    <p style={{ fontSize: "12px", color: "#AAA", letterSpacing: "0.05em" }}>
                      {phase.imageNote.toUpperCase()}
                    </p>
                  </div>
                </FadeUp>
              )}
            </div>
          </div>
        );
      })}

      {/* ── Research references (Starmory) ── */}
      {project.research && (
        <div style={{ background: "#111", padding: "60px 40px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeUp>
              <p style={{ fontSize: "11px", color: "#444", letterSpacing: "0.12em", marginBottom: "24px" }}>
                GROUNDED IN RESEARCH
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {project.research.map((r, i) => (
                  <motion.span
                    key={r}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{
                      background: project.accent + "18",
                      color: project.accent,
                      borderRadius: "8px", padding: "8px 14px", fontSize: "13px",
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {r}
                  </motion.span>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      )}

      {/* ── Closing & CTA ── */}
      <div style={{ background: "#FAFAF8", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {project.closing && (
            <FadeUp>
              <div style={{
                borderLeft: `4px solid ${project.bg}`,
                paddingLeft: "28px", marginBottom: "56px",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px", color: "#1A1A1A",
                  lineHeight: "1.55", fontStyle: "italic", fontWeight: 400,
                }}>
                  {project.closing}
                </p>
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.1}>
            <div style={{
              background: project.bg, borderRadius: "20px",
              padding: "36px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px",
            }}>
              <div>
                <p style={{ fontSize: "13px", color: project.textColor, opacity: 0.5, marginBottom: "4px" }}>
                  Want to explore it?
                </p>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "24px",
                  color: project.textColor, fontWeight: 400,
                }}>
                  View the prototype
                </p>
              </div>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: project.textColor, color: project.bg,
                  borderRadius: "100px", padding: "13px 26px",
                  fontSize: "14px", textDecoration: "none",
                  display: "inline-flex", alignItems: "center", gap: "6px",
                }}
              >
                View prototype <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ── Prev / Next ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr",
        borderTop: "1px solid rgba(0,0,0,0.07)",
      }}>
        {prev && (
          <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "48px 40px",
              textDecoration: "none", background: prev.bg,
              borderRight: next ? "1px solid rgba(255,255,255,0.08)" : "none",
              height: "100%",
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

      {/* ── All projects ── */}
      <div style={{ background: "#111", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#333", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === project.slug ? p.bg : "transparent",
                color: p.slug === project.slug ? p.textColor : "#444",
                border: p.slug === project.slug ? "none" : "1px solid #222",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== project.slug) { e.currentTarget.style.borderColor = "#444"; e.currentTarget.style.color = "#888"; } }}
                onMouseLeave={(e) => { if (p.slug !== project.slug) { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#444"; } }}
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
