import { motion } from "motion/react";
import { MessageSquare, Users, Lightbulb, Target, RefreshCw, HeartHandshake } from "lucide-react";

const uxSkills = [
  "User Research", "Persona", "User Flow", "IA", "Wireframing", "Prototyping",
  "Usability Testing", "Design Systems", "HMW", "MoSCoW",
];
const frontendSkills = ["Vue.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Dart/Flutter"];
const backendSkills = ["SQL", "PostgreSQL", "Supabase", "Docker"];
const seSkills = ["UML", "System Architecture", "ERD", "SRS", "Testing"];
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

function Tag({ name, accent, delay = 0 }: { name: string; accent: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, backgroundColor: accent, color: "#fff" }}
      style={{
        background: "#F5F5F3", color: "#444",
        borderRadius: "6px", padding: "5px 10px", fontSize: "12px",
        border: "1px solid rgba(0,0,0,0.05)", cursor: "default",
        display: "inline-block", transition: "all 0.2s",
      }}
    >
      {name}
    </motion.span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" style={{ background: "#F7F5F2", padding: "100px 24px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "11px", color: "#BBB", letterSpacing: "0.15em", marginBottom: "10px" }}>
            SKILLS & TOOLS
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 42px)",
            color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
          }}>
            What I bring to the team
          </h2>
          <div style={{ width: "40px", height: "1px", background: "rgba(0,0,0,0.1)", margin: "20px auto 0" }} />
        </motion.div>

        {/* Cards Grid - 3 columns, all same size */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}>

          {/* UX/UI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              background: "#FFFFFF", borderRadius: "16px", padding: "24px",
              border: "1px solid rgba(255,107,53,0.12)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF6B35" }} />
              <h3 style={{ fontSize: "12px", color: "#FF6B35", letterSpacing: "0.08em", fontWeight: 600 }}>
                UX / UI
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {uxSkills.map((s, i) => <Tag key={s} name={s} accent="#FF6B35" delay={i * 0.02} />)}
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            style={{
              background: "#FFFFFF", borderRadius: "16px", padding: "24px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#A78BFA" }} />
              <h3 style={{ fontSize: "12px", color: "#888", letterSpacing: "0.08em", fontWeight: 500 }}>
                FRONTEND
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {frontendSkills.map((s, i) => <Tag key={s} name={s} accent="#A78BFA" delay={i * 0.03} />)}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.11 }}
            style={{
              background: "#FFFFFF", borderRadius: "16px", padding: "24px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#E8522A" }} />
              <h3 style={{ fontSize: "12px", color: "#888", letterSpacing: "0.08em", fontWeight: 500 }}>
                BACKEND
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {backendSkills.map((s, i) => <Tag key={s} name={s} accent="#E8522A" delay={i * 0.04} />)}
            </div>
          </motion.div>

          {/* Software Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              background: "#FFFFFF", borderRadius: "16px", padding: "24px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2D5016" }} />
              <h3 style={{ fontSize: "12px", color: "#888", letterSpacing: "0.08em", fontWeight: 500 }}>
                SOFTWARE ENG.
              </h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {seSkills.map((s, i) => <Tag key={s} name={s} accent="#2D5016" delay={i * 0.03} />)}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.17 }}
            style={{
              background: "#FFFFFF", borderRadius: "16px", padding: "24px",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#666" }} />
              <h3 style={{ fontSize: "12px", color: "#888", letterSpacing: "0.08em", fontWeight: 500 }}>
                TOOLS
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tools.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  title={tool.name}>
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    style={{ width: "16px", height: "16px", objectFit: "contain" }}
                  />
                  <span style={{ fontSize: "12px", color: "#888" }}>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills - Dark card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: "#1A1A1A", borderRadius: "16px", padding: "24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2EC4B6" }} />
              <h3 style={{ fontSize: "12px", color: "#444", letterSpacing: "0.08em", fontWeight: 500 }}>
                SOFT SKILLS
              </h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {softSkills.map(({ icon: Icon, skill }, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.04 }}
                  whileHover={{ x: 3 }}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "default" }}>
                  <Icon size={14} style={{ color: "#2EC4B6" }} />
                  <span style={{ fontSize: "12px", color: "#888" }}>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
