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
  { label: "Expected graduation", raw: "Mar 2027", color: "#999", prominent: false },
  { label: "Cumulative GPA", value: 3.80, decimals: 2, color: "#FF6B35", prominent: true },
];

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        background: "#FAFAF8",
        padding: "120px 32px",
        backgroundImage: `radial-gradient(circle, #D1D1D1 1px, transparent 1px)`,
        backgroundSize: "24px 24px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "48px" }}>
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
              lineHeight: "1.1", fontWeight: 400,
            }}>
            Still learning,{" "}
            <span style={{ fontStyle: "italic", color: "#FF6B35" }}>still growing.</span>
          </motion.h2>
        </motion.div>

        {/* Main Content: Photo + Description */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "40px", alignItems: "center", marginBottom: "32px" }}>
          {/* Photo - Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid #FFFFFF",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            }}
          >
            <img
              src="/about-photo.jpg"
              alt="Rattikan"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Description - Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.75", marginBottom: "16px" }}>
              I'm <strong style={{ color: "#1A1A1A" }}>Rattikan</strong>, a final-year Software Engineering student at Chiang Mai University
              with a strong focus on UX/UI Design and hands-on development experience.
            </p>
            <p style={{ fontSize: "16px", color: "#777", lineHeight: "1.75" }}>
              Skilled in user research, wireframing, prototyping, design systems, and technical documentation, backed by a technical background that grounds designs in feasibility.
            </p>
          </motion.div>
        </div>

        {/* Middle: University + Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          {/* University Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
            style={{
              background: "#1A1A1A", borderRadius: "16px", padding: "20px",
              display: "flex", alignItems: "center", gap: "16px",
            }}
          >
            <div style={{
              width: "56px", height: "56px", borderRadius: "14px",
              background: "#FFFFFF",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, overflow: "hidden",
            }}>
              <img
                src={cmuLogo}
                alt="CMU Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
              />
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "#FFFFFF", marginBottom: "2px", lineHeight: "1.35" }}>
                College of Arts, Media and Technology
              </p>
              <p style={{ fontSize: "12px", color: "#888", marginBottom: "1px", lineHeight: "1.35" }}>Chiang Mai University</p>
              <p style={{ fontSize: "11px", color: "#555", lineHeight: "1.35" }}>BSc Software Engineering</p>
            </div>
          </motion.div>

          {/* Stats - Separate Cards */}
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              whileHover={s.prominent ? { y: -3, boxShadow: `0 8px 24px ${s.color}22` } : {}}
              style={{
                background: "#FFFFFF", borderRadius: "16px", padding: "20px",
                border: "1px solid rgba(0,0,0,0.04)", textAlign: "center",
                transition: s.prominent ? "box-shadow 0.2s" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "32px",
                color: s.color, lineHeight: 1, marginBottom: "8px",
              }}>
                {s.raw ? s.raw : (
                  <CountUp target={s.value!} decimals={s.decimals ?? 0} />
                )}
              </div>
              <div style={{ fontSize: "11px", color: "#AAA", lineHeight: "1.3" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bottom: Languages - Chips only */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
        >
          {[
            { flag: "🇹🇭", lang: "Thai", level: "Native" },
            { flag: "🇬🇧", lang: "English", level: "Working Proficiency" },
            { flag: "🇨🇳", lang: "Mandarin", level: "Elementary" },
          ].map(({ flag, lang, level }) => (
            <motion.span
              key={lang}
              whileHover={{ y: -2, backgroundColor: "#F5F5F5" }}
              style={{
                fontSize: "13px", color: "#666",
                display: "flex", alignItems: "center", gap: "6px",
                padding: "8px 16px", borderRadius: "100px",
                border: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: "#FFFFFF",
                cursor: "default",
                transition: "all 0.2s",
              }}
            >
              <span style={{ fontSize: "16px" }}>{flag}</span>
              <span>{lang}</span>
              <span style={{ fontSize: "11px", color: "#999" }}>· {level}</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
