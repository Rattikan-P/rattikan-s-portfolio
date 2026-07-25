import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
const cmuLogo = "/logos/cmu-logo.png";

function CountUp({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
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
      else setCount(Number(start.toFixed(decimals)));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return <div ref={ref}>{typeof count === "number" ? count.toFixed(decimals) : count}{suffix}</div>;
}

const STATS = [
  { label: "Cumulative GPA", value: 3.80, decimals: 2, color: "#FF6B35" },
  { label: "Expected graduation", raw: "Mar 2027", color: "#A78BFA" },
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
            Still learning,{" "}
            <span style={{ fontStyle: "italic", color: "#FF6B35" }}>still growing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "16px", color: "#555", lineHeight: "1.75", marginBottom: "24px" }}>
            I'm <strong style={{ color: "#1A1A1A" }}>Rattikan</strong>, a final-year Software Engineering student at Chiang Mai University
            with a strong focus on UX/UI Design and hands-on development experience.
            Skilled in user research, wireframing, prototyping, and design systems.
          </motion.p>

          {/* University card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
            style={{
              background: "#1A1A1A", borderRadius: "12px", padding: "16px",
              display: "flex", alignItems: "flex-start", gap: "12px",
              marginBottom: "20px",
            }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "12px",
              background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              <img
                src={cmuLogo}
                alt="CMU Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "6px" }}
              />
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "#FFFFFF", marginBottom: "2px", lineHeight: "1.3" }}>
                College of Arts, Media and Technology
              </p>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "1px", lineHeight: "1.3" }}>Chiang Mai University</p>
              <p style={{ fontSize: "11px", color: "#555", lineHeight: "1.3" }}>BSc Software Engineering</p>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {STATS.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.18 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, boxShadow: `0 8px 32px ${s.color}22` }}
                style={{
                  background: "#FFFFFF", borderRadius: "12px", padding: "16px",
                  border: "1px solid rgba(0,0,0,0.06)", cursor: "default",
                  transition: "box-shadow 0.3s",
                }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "26px",
                  color: s.color, lineHeight: 1, marginBottom: "4px",
                }}>
                  {s.raw ? s.raw : (
                    <CountUp target={s.value!} decimals={s.decimals ?? 0} />
                  )}
                </div>
                <div style={{ fontSize: "11px", color: "#AAA", lineHeight: "1.3" }}>{s.label}</div>
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

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              background: "#FAFAFA", borderRadius: "10px", padding: "12px 16px",
              border: "1px solid rgba(0,0,0,0.04)",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
              {[
                { flag: "🇹🇭", lang: "Thai", level: "Native" },
                { flag: "🇬🇧", lang: "English", level: "Working Proficiency" },
                { flag: "🇨🇳", lang: "Mandarin", level: "Elementary" },
              ].map(({ flag, lang, level }) => (
                <div key={lang} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: "18px", marginBottom: "2px" }}>{flag}</div>
                  <p style={{ fontSize: "11px", color: "#666", lineHeight: "1.2" }}>{lang}</p>
                  <p style={{ fontSize: "10px", color: "#999", lineHeight: "1.2" }}>{level}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
