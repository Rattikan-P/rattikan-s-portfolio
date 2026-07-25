import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import { motion } from "motion/react";

function ProjectCard({ project, isEven }: { project: typeof projects[0]; isEven: boolean }) {
  const borderStyle =
    project.textColor === "#FFFFFF" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ background: project.bg, position: "relative", overflow: "hidden" }}
    >
      {/* Ghost number */}
      <div style={{
        position: "absolute", top: "-20px",
        right: isEven ? "-10px" : "auto", left: isEven ? "auto" : "-10px",
        fontFamily: "var(--font-display)", fontSize: "clamp(180px, 22vw, 300px)",
        lineHeight: 1,
        color: project.textColor === "#FFFFFF" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        fontWeight: 700, pointerEvents: "none", userSelect: "none", letterSpacing: "0.02em",
      }}>
        {project.number}
      </div>

      <div style={{ padding: "80px 32px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isEven ? "1fr 500px" : "500px 1fr",
          gap: "48px", alignItems: "center",
        }}>
          {isEven && project.image && (
            <motion.img
              whileHover={{ scale: project.slug === "starmory" ? 1.45 : 1.02 }}
              initial={{ scale: project.slug === "starmory" ? 1.4 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />
          )}
          {isEven && !project.image && (
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%", aspectRatio: "4/3",
                background: "rgba(255,255,255,0.08)", borderRadius: "20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${borderStyle}`,
              }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "40px", opacity: 0.3, marginBottom: "8px" }}>🖼</div>
                <p style={{ fontSize: "11px", color: project.textColor, opacity: 0.25, letterSpacing: "0.08em" }}>PROJECT MOCKUP</p>
              </div>
            </motion.div>
          )}

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: project.textColor, opacity: 0.4, letterSpacing: "0.1em" }}>
                {project.number} · {project.year}
              </span>
              <span style={{
                fontSize: "11px", color: project.textColor, opacity: 0.6,
                background: project.tagBg, borderRadius: "4px", padding: "2px 8px",
              }}>
                {project.subtitle}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: "1.0", color: project.textColor,
              letterSpacing: "-0.02em", marginBottom: "20px", fontWeight: 400,
            }}>
              {project.title}
            </h2>

            <p style={{
              fontSize: "16px", color: project.textColor, opacity: 0.75,
              lineHeight: "1.75", maxWidth: "500px", marginBottom: "24px",
            }}>
              {project.description}
            </p>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
              {project.tags.map((tag, i) => (
                <motion.span key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{
                    background: project.tagBg, color: project.textColor,
                    borderRadius: "100px", padding: "5px 14px", fontSize: "12px",
                    border: `1px solid ${borderStyle}`, letterSpacing: "0.02em",
                  }}>
                  {tag}
                </motion.span>
              ))}
            </div>

            {project.stats && (
              <div style={{ display: "flex", gap: "32px", marginBottom: "28px", flexWrap: "wrap" }}>
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "40px",
                      color: project.textColor, lineHeight: 1, marginBottom: "2px",
                    }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: project.textColor, opacity: 0.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to={`/${project.slug}`}
                  style={{
                    background: project.textColor, color: project.bg,
                    borderRadius: "100px", padding: "12px 24px", fontSize: "13px",
                    textDecoration: "none", display: "inline-flex", alignItems: "center",
                    gap: "6px", letterSpacing: "0.02em",
                  }}>
                  View case study <ArrowUpRight size={13} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, x: 2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#"
                  style={{
                    background: "transparent", color: project.textColor,
                    borderRadius: "100px", padding: "12px 24px", fontSize: "13px",
                    textDecoration: "none", display: "inline-flex", alignItems: "center",
                    gap: "6px", letterSpacing: "0.02em",
                    border: `1.5px solid ${project.textColor}30`,
                  }}
                >
                  View prototype <ArrowUpRight size={13} />
                </a>
              </motion.div>
            </div>
          </div>

          {!isEven && project.image && (
            <motion.img
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={project.image}
              alt={project.title}
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />
          )}
          {!isEven && !project.image && (
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                width: "100%", aspectRatio: "4/3",
                background: "rgba(255,255,255,0.08)", borderRadius: "20px",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: `1px solid ${borderStyle}`,
              }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "40px", opacity: 0.3, marginBottom: "8px" }}>🖼</div>
                <p style={{ fontSize: "11px", color: project.textColor, opacity: 0.25, letterSpacing: "0.08em" }}>PROJECT MOCKUP</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="work">
      <div style={{ background: "#FAFAF8", padding: "80px 32px 40px", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.12em", marginBottom: "12px" }}>
          SELECTED WORK
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 56px)",
            color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
          }}>
          Projects I&apos;m proud of
        </motion.h2>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} isEven={i % 2 === 0} />
      ))}
    </section>
  );
}
