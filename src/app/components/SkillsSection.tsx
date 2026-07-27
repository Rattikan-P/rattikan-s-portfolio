import { motion } from "motion/react";
import { MessageSquare, Users, Lightbulb, Target, RefreshCw, HeartHandshake } from "lucide-react";

const uxSkills = [
  "User Research", "Persona", "User Flow", "IA", "Wireframing", "Prototyping",
  "Usability Testing", "Design Systems",
];
const frontendSkills = ["Vue.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Dart/Flutter"];
const backendSkills = ["SQL", "PostgreSQL", "Supabase", "Docker"];
const seSkills = ["UML", "System Architecture", "ERD", "SRS", "Requirements Gathering", "Documentation", "Testing"];
const tools = [
  { name: "Figma", logo: "/logos/figma-logo.png" },
  { name: "VS Code", logo: "/logos/vscode-logo.png" },
  { name: "Git/GitHub", logo: "/logos/github-logo.png" },
  { name: "Docker", logo: "/logos/docker-logo.png" },
  { name: "Postman", logo: "/logos/postman-logo.png" },
  { name: "Android Studio", logo: "/logos/android-studio-logo.png" },
];
const softSkills = [
  { icon: MessageSquare, skill: "Communication" },
  { icon: Users, skill: "Team Collaboration" },
  { icon: Lightbulb, skill: "Problem Solving" },
  { icon: Target, skill: "Attention to Detail" },
  { icon: RefreshCw, skill: "Adaptability" },
  { icon: HeartHandshake, skill: "User Empathy" },
];

function Tag({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: "#F5F5F3", color: "#666",
        borderRadius: "6px", padding: "5px 10px", fontSize: "12px",
        border: "1px solid rgba(0,0,0,0.08)", cursor: "default",
        display: "inline-block", fontWeight: 500,
      }}
    >
      {name}
    </motion.span>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      style={{
        background: "#F7F5F2",
        padding: "clamp(80px, 10vw, 120px) clamp(20px, 4vw, 24px)",
        backgroundImage: `radial-gradient(circle, #CCC 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <p style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.12em", marginBottom: "16px" }}>
            SKILLS & TOOLS
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4vw, 42px)",
            color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
          }}>
            What I bring to the team
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="responsive-grid-3">

          {/* UX/UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              background: "#FFFFFF", borderRadius: "20px", padding: "clamp(16px, 2.5vw, 24px)",
              border: "2px solid rgba(255,107,53,0.4)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>🎨</span>
              <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#FF6B35", letterSpacing: "0.06em", fontWeight: 600 }}>
                UX / UI
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {uxSkills.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "#F5F5F3", color: "#666",
                    borderRadius: "6px", padding: "5px 11px", fontSize: "clamp(10px, 1.4vw, 11px)",
                    border: "1px solid rgba(0,0,0,0.08)", cursor: "default",
                    display: "inline-block", fontWeight: 500,
                  }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Development - Frontend + Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="dev-card-span-2 dev-card-mobile-third dev-card-tablet-third"
            style={{
              background: "#FFFFFF", borderRadius: "20px", padding: "clamp(16px, 2.5vw, 24px)",
              border: "1px solid rgba(167,139,250,0.1)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>💻</span>
              <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#1A1A1A", letterSpacing: "0.06em", fontWeight: 600 }}>
                DEVELOPMENT
              </h3>
            </div>
            <div className="dev-card-split">
              {/* Frontend */}
              <div>
                <p style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: "#1A1A1A", marginBottom: "10px", fontWeight: 600 }}>FRONTEND</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {frontendSkills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.85, y: 8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: "#F5F5F3", color: "#666",
                        borderRadius: "6px", padding: "5px 11px", fontSize: "clamp(10px, 1.4vw, 11px)",
                        border: "1px solid rgba(0,0,0,0.08)", cursor: "default",
                        display: "inline-block", fontWeight: 500,
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
              {/* Divider */}
              <div className="divider" style={{ width: "1px", height: "100%", minHeight: "60px", background: "rgba(0,0,0,0.1)" }} />
              {/* Backend */}
              <div>
                <p style={{ fontSize: "clamp(10px, 1.4vw, 11px)", color: "#1A1A1A", marginBottom: "10px", fontWeight: 600 }}>BACKEND</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {backendSkills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.85, y: 8 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.02, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: "#F5F5F3", color: "#666",
                        borderRadius: "6px", padding: "5px 11px", fontSize: "clamp(10px, 1.4vw, 11px)",
                        border: "1px solid rgba(0,0,0,0.08)", cursor: "default",
                        display: "inline-block", fontWeight: 500,
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Software Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.11 }}
            className="se-card-mobile-second se-card-tablet-second"
            style={{
              background: "#FFFFFF", borderRadius: "20px", padding: "clamp(16px, 2.5vw, 24px)",
              border: "2px solid rgba(255,107,53,0.4)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>📐</span>
              <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#FF6B35", letterSpacing: "0.06em", fontWeight: 600 }}>
                SOFTWARE ENG.
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {seSkills.map((s, i) => <Tag key={s} name={s} delay={i * 0.03} />)}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            className="tools-card-mobile-fourth tools-card-tablet-fourth"
            style={{
              background: "#FFFFFF", borderRadius: "20px", padding: "clamp(16px, 2.5vw, 24px)",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>🛠️</span>
              <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#1A1A1A", letterSpacing: "0.06em", fontWeight: 600 }}>
                TOOLS
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "default" }}
                  title={tool.name}>
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    style={{ width: "clamp(14px, 2vw, 18px)", height: "clamp(14px, 2vw, 18px)", objectFit: "contain" }}
                  />
                  <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#777" }}>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.17 }}
            className="softskills-card-mobile-fifth softskills-card-tablet-fifth"
            style={{
              background: "#FFFFFF", borderRadius: "20px", padding: "clamp(16px, 2.5vw, 24px)",
              border: "1px solid rgba(0,0,0,0.04)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 32px)" }}>🤝</span>
              <h3 style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#1A1A1A", letterSpacing: "0.06em", fontWeight: 600 }}>
                SOFT SKILLS
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {softSkills.map(({ icon: Icon, skill }, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                  style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "default" }}>
                  <Icon size={14} style={{ color: "#666" }} />
                  <span style={{ fontSize: "clamp(10px, 1.4vw, 12px)", color: "#666" }}>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
