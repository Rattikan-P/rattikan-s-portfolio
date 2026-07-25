import { motion } from "motion/react";

const uxSkills = [
  "User Research & Interviews", "Persona Development", "User Flow & Journey Mapping",
  "Information Architecture", "Wireframing & Prototyping", "Usability Testing",
  "Design Systems", "HMW / MoSCoW Prioritization",
];
const frontendSkills = ["Vue.js", "TypeScript", "JavaScript", "HTML / CSS", "Tailwind CSS", "Dart (Flutter)"];
const backendSkills = ["SQL / PostgreSQL", "Supabase", "Docker"];
const seSkills = ["UML & Diagramming", "System Architecture", "ERD Design", "SRS Documentation"];
const softSkills = [
  { emoji: "🗣", skill: "Communication" },
  { emoji: "🤝", skill: "Team Collaboration" },
  { emoji: "🔍", skill: "Problem Solving" },
  { emoji: "🎯", skill: "Attention to Detail" },
  { emoji: "🔄", skill: "Adaptability" },
  { emoji: "💡", skill: "User Empathy" },
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
        borderRadius: "8px", padding: "7px 14px", fontSize: "13px",
        border: "1px solid rgba(0,0,0,0.06)", cursor: "default",
        display: "inline-block", transition: "background 0.2s, color 0.2s",
      }}
    >
      {name}
    </motion.span>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" style={{ background: "#F7F5F2", padding: "100px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.12em", marginBottom: "12px" }}>
            SKILLS & TOOLS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 52px)",
              color: "#1A1A1A", letterSpacing: "-0.02em", fontWeight: 400,
            }}>
            What I bring to the team
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {/* UX / SE card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "#FFFFFF", borderRadius: "20px", padding: "36px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF6B35" }} />
              <h3 style={{ fontSize: "12px", color: "#AAA", letterSpacing: "0.1em" }}>UX / UI DESIGN</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {uxSkills.map((s, i) => <Tag key={s} name={s} accent="#FF6B35" delay={i * 0.04} />)}
            </div>

            <div style={{ borderTop: "1px solid #F0F0EE", paddingTop: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2D5016" }} />
                <h3 style={{ fontSize: "12px", color: "#AAA", letterSpacing: "0.1em" }}>SOFTWARE ENGINEERING</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {seSkills.map((s, i) => <Tag key={s} name={s} accent="#2D5016" delay={i * 0.05} />)}
              </div>
            </div>
          </motion.div>

          {/* Frontend / Backend card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "#FFFFFF", borderRadius: "20px", padding: "36px", border: "1px solid rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#A78BFA" }} />
              <h3 style={{ fontSize: "12px", color: "#AAA", letterSpacing: "0.1em" }}>FRONTEND</h3>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
              {frontendSkills.map((s, i) => <Tag key={s} name={s} accent="#A78BFA" delay={i * 0.05} />)}
            </div>

            <div style={{ borderTop: "1px solid #F0F0EE", paddingTop: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#E8522A" }} />
                <h3 style={{ fontSize: "12px", color: "#AAA", letterSpacing: "0.1em" }}>BACKEND & CLOUD</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {backendSkills.map((s, i) => <Tag key={s} name={s} accent="#E8522A" delay={i * 0.06} />)}
              </div>
            </div>
          </motion.div>

          {/* Soft skills card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "#1A1A1A", borderRadius: "20px", padding: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2EC4B6" }} />
              <h3 style={{ fontSize: "12px", color: "#444", letterSpacing: "0.1em" }}>SOFT SKILLS</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {softSkills.map(({ emoji, skill }, i) => (
                <motion.div key={skill}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "default" }}>
                  <span style={{ fontSize: "20px" }}>{emoji}</span>
                  <span style={{ fontSize: "15px", color: "#888" }}>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            marginTop: "20px", background: "#FFFFFF", borderRadius: "16px",
            padding: "24px 32px", display: "flex", gap: "32px", alignItems: "center",
            flexWrap: "wrap", border: "1px solid rgba(0,0,0,0.05)",
          }}>
          <p style={{ fontSize: "11px", color: "#CCC", letterSpacing: "0.1em", flexShrink: 0 }}>TOOLS</p>
          {["Figma", "FigJam", "VS Code", "Git", "Supabase", "Flutter", "Notion", "Miro"].map((t, i) => (
            <motion.span key={t}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              style={{ fontSize: "14px", color: "#888" }}>
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
