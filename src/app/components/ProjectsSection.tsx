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

      <div style={{ padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 32px)", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <div className={`project-card-grid ${isEven ? "even" : "odd"}`}>
          {isEven && (project.image ? (
            <motion.img
              whileHover={{ scale: project.slug === "starmory" ? 1.18 : 1.02 }}
              initial={{ scale: project.slug === "starmory" ? 1.15 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={project.image}
              alt={project.title}
              className="project-image"
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="project-image"
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
          ))}

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
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
              fontFamily: "var(--font-display)", fontSize: project.slug === "whisker-haven" ? "clamp(24px, 7vw, 72px)" : "clamp(32px, 5vw, 72px)",
              lineHeight: "1.0", color: project.textColor,
              letterSpacing: "-0.02em", marginBottom: "20px", fontWeight: 400,
              whiteSpace: project.slug === "whisker-haven" ? "nowrap" : "normal",
            }}>
              {project.title}
            </h2>

            <p style={{
              fontSize: "clamp(14px, 2vw, 16px)", color: project.textColor, opacity: 0.75,
              lineHeight: "1.75", maxWidth: "500px", marginBottom: "24px",
              wordWrap: "break-word", overflowWrap: "break-word",
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
              <div className="stats-flex" style={{ marginBottom: "28px" }}>
                {project.stats.map((s) => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 40px)",
                      color: project.textColor, lineHeight: 1, marginBottom: "2px",
                    }}>{s.value}</div>
                    <div style={{ fontSize: "12px", color: project.textColor, opacity: 0.5 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
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
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {project.prototypeLink && (
                  <motion.a
                    href={project.prototypeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View Figma prototype"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${project.textColor}30`,
                      background: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <img src="/logos/figma-logo.png" alt="Figma" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                  </motion.a>
                )}
                {project.githubLink && (
                  <motion.a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View code on GitHub"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                      width: "38px", height: "38px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1.5px solid ${project.textColor}30`,
                      background: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    <img src="/logos/github-logo.png" alt="GitHub" style={{ width: "16px", height: "16px", objectFit: "contain" }} />
                  </motion.a>
                )}
              </div>
            </div>
          </div>

          {!isEven && (project.image ? (
            <motion.img
              whileHover={{ scale: project.slug === "whisker-haven" ? 1.04 : 1.02 }}
              initial={{ scale: project.slug === "whisker-haven" ? 1.02 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              src={project.image}
              alt={project.title}
              className="project-image"
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.03, rotate: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="project-image"
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
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <section id="work">
      <div style={{ background: "#FAFAF8", padding: "clamp(60px, 8vw, 80px) clamp(20px, 4vw, 32px) 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.12em", marginBottom: "12px", textAlign: "center" }}>
            SELECTED WORK
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 56px)",
              color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
              textAlign: "center",
            }}>
            Projects I&apos;m proud of
          </motion.h2>
        </div>
      </div>

      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} isEven={i % 2 === 0} />
      ))}
    </section>
  );
}
