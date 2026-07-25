import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start * 10) / 10);
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <div ref={ref}>{count}{suffix}</div>;
}

const STATS = [
  { label: "Cumulative GPA", value: 3.80, suffix: "", display: "3.80", color: "#FF6B35" },
  { label: "Expected graduation", raw: "Mar 2027", color: "#A78BFA" },
  { label: "SUS score — Whisker Haven", value: 85, suffix: "", display: "85", color: "#2EC4B6" },
  { label: "Task completion rate", raw: "100%", color: "#22C55E" },
];

export function AboutSection() {
  return (
    <section id="about" style={{ background: "#FAFAF8", padding: "100px 32px" }}>
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "80px", alignItems: "center",
      }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ fontSize: "12px", color: "#CCC", letterSpacing: "0.12em", marginBottom: "16px" }}>
            ABOUT ME
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 52px)",
              color: "#1A1A1A", letterSpacing: "-0.02em",
              lineHeight: "1.1", marginBottom: "28px", fontWeight: 400,
            }}>
            Still learning,
            <br />
            <span style={{ fontStyle: "italic", color: "#FF6B35" }}>still growing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "16px", color: "#555", lineHeight: "1.75", marginBottom: "20px" }}>
            Final-year Software Engineering student at Chiang Mai University
            with a strong focus on UX/UI Design and hands-on development experience.
            Skilled in user research, wireframing, prototyping, and design systems.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: "16px", color: "#555", lineHeight: "1.75", marginBottom: "36px" }}>
            My technical background grounds my designs in feasibility —
            I understand what can actually be built and design with that in mind.
            Seeking a Semester 2 Co-op Internship to bring a user-centred,
            technically-informed design approach to real products.
          </motion.p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: `0 8px 32px ${s.color}22` }}
                style={{
                  background: "#FFFFFF", borderRadius: "16px", padding: "22px",
                  border: "1px solid rgba(0,0,0,0.06)", cursor: "default",
                  transition: "box-shadow 0.3s",
                }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "34px",
                  color: s.color, lineHeight: 1, marginBottom: "6px",
                }}>
                  {s.raw ? s.raw : (
                    <CountUp target={s.value!} suffix={s.suffix} />
                  )}
                </div>
                <div style={{ fontSize: "12px", color: "#AAA", lineHeight: "1.4" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            style={{
              width: "100%", aspectRatio: "1",
              background: "linear-gradient(145deg, #FFF0E4, #FFE4F0)",
              borderRadius: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(255,140,80,0.15)",
              boxShadow: "0 8px 40px rgba(255,100,80,0.08)",
            }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "56px", opacity: 0.25 }}>📷</div>
              <p style={{ fontSize: "11px", color: "#CCC", letterSpacing: "0.08em", marginTop: "8px" }}>
                YOUR PHOTO
              </p>
            </div>
          </motion.div>

          {/* University card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: "#1A1A1A", borderRadius: "16px", padding: "24px",
              display: "flex", alignItems: "flex-start", gap: "16px",
            }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "12px",
              background: "linear-gradient(135deg, #FF6B35, #FF3D77)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", flexShrink: 0,
            }}>🎓</div>
            <div>
              <p style={{ fontSize: "14px", color: "#FFFFFF", marginBottom: "4px" }}>
                College of Arts, Media and Technology
              </p>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "2px" }}>Chiang Mai University</p>
              <p style={{ fontSize: "12px", color: "#555" }}>BSc Software Engineering · GPA 3.80 · Expected Mar 2027</p>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{
              background: "#FFF8F5", borderRadius: "16px", padding: "20px 24px",
              display: "flex", gap: "24px", border: "1px solid rgba(255,140,80,0.1)",
            }}>
            {[
              { flag: "🇹🇭", lang: "Thai", level: "Native" },
              { flag: "🇬🇧", lang: "English", level: "B1" },
              { flag: "🇨🇳", lang: "Mandarin", level: "Elementary" },
            ].map(({ flag, lang, level }) => (
              <div key={lang} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "22px", marginBottom: "4px" }}>{flag}</div>
                <p style={{ fontSize: "13px", color: "#333" }}>{lang}</p>
                <p style={{ fontSize: "11px", color: "#AAA" }}>{level}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
