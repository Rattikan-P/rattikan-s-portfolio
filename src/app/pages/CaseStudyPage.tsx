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
    <div className="side-progress">
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
        padding: "clamp(80px, 12vw, 120px) clamp(24px, 5vw, 40px) clamp(48px, 8vw, 80px)",
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
            fontSize: "clamp(120px, 26vw, 340px)",
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
              fontSize: "clamp(11px, 1.5vw, 13px)", letterSpacing: "0.03em",
              transition: "opacity 0.2s", marginBottom: "clamp(28px, 5vw, 48px)",
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
            style={{
              fontSize: "clamp(10px, 1.4vw, 11px)", color: project.textColor,
              opacity: 0.4, letterSpacing: "0.1em", marginBottom: "12px",
              wordBreak: "break-word", overflowWrap: "break-word",
            }}
          >
            {project.number} / {project.year} · {project.subtitle}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 10vw, 100px)",
              lineHeight: 1, color: project.textColor, letterSpacing: "-0.03em",
              marginBottom: "clamp(16px, 3vw, 20px)", fontWeight: 400,
              wordBreak: "break-word", overflowWrap: "break-word",
            }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontSize: "clamp(14px, 2vw, 18px)", color: project.textColor, opacity: 0.65,
              maxWidth: "560px", lineHeight: "1.7", marginBottom: "clamp(28px, 5vw, 44px)",
              wordBreak: "break-word", overflowWrap: "break-word",
            }}
          >
            {project.longDescription}
          </motion.p>

          {/* Meta grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="meta-grid"
            style={{
              gap: "1px",
              background: isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)",
              borderRadius: "14px", overflow: "hidden", maxWidth: "700px",
            }}
          >
            {[
              { label: "My role", value: project.role },
              { label: "Platform", value: project.platform },
            ].map((m) => (
              <div key={m.label} style={{
                background: isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                padding: "clamp(12px, 2vw, 14px) clamp(14px, 2.5vw, 18px)",
              }}>
                <p style={{
                  fontSize: "clamp(9px, 1.2vw, 10px)", color: project.textColor,
                  opacity: 0.4, letterSpacing: "0.08em", marginBottom: "3px",
                  wordBreak: "break-word", overflowWrap: "break-word",
                }}>
                  {m.label.toUpperCase()}
                </p>
                <p style={{
                  fontSize: "clamp(11px, 1.5vw, 13px)", color: project.textColor,
                  lineHeight: "1.4", wordBreak: "break-word", overflowWrap: "break-word",
                }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          {project.stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="stats-flex"
              style={{ marginTop: "clamp(28px, 5vw, 40px)" }}
            >
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 54px)", color: project.textColor, lineHeight: 1, marginBottom: "4px" }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: project.textColor, opacity: 0.5 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Tags row */}
      <div style={{ background: "#F3F1EE", padding: "clamp(14px, 2.5vw, 18px) clamp(24px, 5vw, 40px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              background: "#FFFFFF", color: "#666", borderRadius: "100px",
              padding: "6px clamp(12px, 2vw, 16px)", fontSize: "clamp(10px, 1.4vw, 12px)", border: "1px solid rgba(0,0,0,0.08)",
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
              fontSize: "clamp(80px, 18vw, 220px)",
              color: "rgba(0,0,0,0.04)", fontWeight: 700, lineHeight: 1,
              pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
            }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Phase strip */}
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "clamp(16px, 3vw, 22px) clamp(24px, 5vw, 40px)",
              background: "rgba(0,0,0,0.04)",
              borderTop: "1px solid rgba(0,0,0,0.07)",
            }}>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(11px, 1.5vw, 13px)",
                color: project.accent, letterSpacing: "0.02em", fontStyle: "italic",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.12)" }} />
              <span style={{ fontSize: "clamp(9px, 1.2vw, 10px)", letterSpacing: "0.14em", fontWeight: 600, color: "#999" }}>
                {phase.step.split(":")[1]?.trim().toUpperCase() ?? phase.step.toUpperCase()}
              </span>
            </div>

            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "clamp(36px, 6vw, 52px) clamp(24px, 5vw, 40px) clamp(48px, 8vw, 72px)", position: "relative", zIndex: 1 }}>
              <FadeUp>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 3vw, 40px)",
                  color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
                  lineHeight: 1.1, marginBottom: "clamp(24px, 4vw, 32px)",
                }}>
                  {phase.title}
                </h2>
              </FadeUp>

              {/* Content bullets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(10px, 2vw, 14px)", marginBottom: "clamp(28px, 5vw, 36px)" }}>
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
                    <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#555", lineHeight: "1.75" }}>{item}</p>
                  </motion.div>
                ))}
              </div>

              {/* Image placeholder */}
              {phase.imageNote && (
                <FadeUp delay={0.15}>
                  <div style={{
                    background: "rgba(0,0,0,0.05)", borderRadius: "14px",
                    padding: "clamp(36px, 6vw, 52px) clamp(24px, 4vw, 32px)", textAlign: "center",
                    border: "1.5px dashed rgba(0,0,0,0.1)",
                  }}>
                    <div style={{ fontSize: "clamp(20px, 4vw, 28px)", marginBottom: "10px", opacity: 0.3 }}>🖼</div>
                    <p style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#AAA", letterSpacing: "0.05em" }}>
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
        <div style={{ background: "#111", padding: "clamp(40px, 6vw, 60px) clamp(24px, 5vw, 40px)" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <FadeUp>
              <p style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: "#444", letterSpacing: "0.12em", marginBottom: "clamp(16px, 3vw, 24px)" }}>
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
                      borderRadius: "8px", padding: "clamp(6px, 1.2vw, 8px) clamp(10px, 2vw, 14px)", fontSize: "clamp(11px, 1.5vw, 13px)",
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
      <div style={{ background: "#FAFAF8", padding: "clamp(48px, 7vw, 72px) clamp(24px, 5vw, 40px)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {project.closing && (
            <FadeUp>
              <div style={{
                borderLeft: `4px solid ${project.bg}`,
                paddingLeft: "clamp(20px, 4vw, 28px)", marginBottom: "clamp(36px, 6vw, 56px)",
              }}>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(16px, 3vw, 22px)", color: "#1A1A1A",
                  lineHeight: "1.55", fontStyle: "italic", fontWeight: 400,
                }}>
                  {project.closing}
                </p>
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.1}>
            <div className="prototype-cta" style={{
              background: project.bg, borderRadius: "20px",
              padding: "clamp(24px, 4vw, 36px) clamp(24px, 5vw, 40px)",
            }}>
              <div>
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", color: project.textColor, opacity: 0.5, marginBottom: "4px" }}>
                  Want to explore it?
                </p>
                <p style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(18px, 3vw, 24px)",
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
                  borderRadius: "100px", padding: "clamp(11px, 2vw, 13px) clamp(20px, 3.5vw, 26px)",
                  fontSize: "clamp(12px, 1.5vw, 14px)", textDecoration: "none",
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
      <div className={`prev-next-grid ${prev && next ? "both" : ""}`}>
        {prev && (
          <motion.div whileHover={{ opacity: 0.88 }} style={{ opacity: 1 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "clamp(32px, 5vw, 48px) clamp(24px, 5vw, 40px)",
              textDecoration: "none", background: prev.bg,
              borderRight: next ? "1px solid rgba(255,255,255,0.08)" : "none",
              height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <ArrowLeft size={14} color={prev.textColor} style={{ opacity: 0.5 }} />
                <span style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: prev.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>PREVIOUS</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 28px)", color: prev.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>
                {prev.title}
              </p>
            </Link>
          </motion.div>
        )}
        {next && (
          <motion.div whileHover={{ opacity: 0.88 }} className="next-project" style={{ opacity: 1 }}>
            <Link to={`/${next.slug}`} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              padding: "clamp(32px, 5vw, 48px) clamp(24px, 5vw, 40px)", textDecoration: "none", background: next.bg, height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: next.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>NEXT</span>
                <ArrowRight size={14} color={next.textColor} style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 28px)", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>
                {next.title}
              </p>
            </Link>
          </motion.div>
        )}
      </div>

      {/* ── All projects ── */}
      <div style={{ background: "#111", padding: "clamp(32px, 5vw, 40px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: "#666", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "clamp(6px, 1.2vw, 8px) clamp(14px, 2.5vw, 18px)", borderRadius: "100px", textDecoration: "none", fontSize: "clamp(11px, 1.5vw, 13px)",
                background: p.slug === project.slug ? "#FFFFFF" : "transparent",
                color: p.slug === project.slug ? "#111" : "#888",
                border: p.slug === project.slug ? "none" : "1px solid #333",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== project.slug) { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#CCC"; } }}
                onMouseLeave={(e) => { if (p.slug !== project.slug) { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; } }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.bg, flexShrink: 0, border: `1px solid ${project.textColor}15` }} />
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
