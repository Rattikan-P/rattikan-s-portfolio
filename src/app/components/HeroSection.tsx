import { ArrowDown, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function FloatingBlob({ x, y, size, color, duration }: {
  x: string; y: string; size: string; color: string; duration: number;
}) {
  return (
    <motion.div
      animate={{ y: ["0%", "-18%", "0%"], x: ["0%", "8%", "0%"], scale: [1, 1.08, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", top: y, left: x,
        width: size, height: size, borderRadius: "50%",
        background: color, filter: "blur(60px)",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

export function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 12,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const stagger = (i: number) => ({ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #FFFBF7 0%, #FFF0E4 45%, #FFE8F4 100%)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px 32px 80px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Animated blobs */}
      <FloatingBlob x="60%" y="5%" size="500px" color="rgba(255,180,100,0.22)" duration={7} />
      <FloatingBlob x="70%" y="45%" size="360px" color="rgba(255,120,160,0.16)" duration={9} />
      <FloatingBlob x="-5%" y="55%" size="320px" color="rgba(150,200,255,0.18)" duration={11} />
      <FloatingBlob x="30%" y="-10%" size="280px" color="rgba(200,255,180,0.14)" duration={8} />

      {/* Parallax circle decoration */}
      <motion.div
        animate={{ x: mouse.x * 0.6, y: mouse.y * 0.6 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        style={{
          position: "absolute", top: "12%", right: "12%",
          width: "320px", height: "320px", borderRadius: "50%",
          border: "1px solid rgba(255,140,80,0.2)", pointerEvents: "none", zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: mouse.x * -0.4, y: mouse.y * -0.4 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{
          position: "absolute", top: "18%", right: "18%",
          width: "200px", height: "200px", borderRadius: "50%",
          border: "1px solid rgba(255,100,150,0.15)", pointerEvents: "none", zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={stagger(0)}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.7)", borderRadius: "100px",
                padding: "7px 18px", marginBottom: "36px",
                backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)",
                boxShadow: "0 2px 16px rgba(255,140,80,0.1)",
              }}>
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", display: "inline-block" }}
                />
                <span style={{ fontSize: "12px", color: "#555", letterSpacing: "0.04em" }}>
                  Open to Co-op Internship · Semester 2
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={stagger(1)}
              style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(52px, 8vw, 100px)",
                lineHeight: "1.0", color: "#1A1A1A", letterSpacing: "-0.03em",
                marginBottom: "20px", fontWeight: 400,
              }}>
              Hello,{" "}
              <motion.span
                style={{ fontStyle: "italic", display: "inline-block" }}
                animate={{ rotate: [-1, 1, -1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                I am Ratti!
              </motion.span>
            </motion.h1>

            {/* Sub */}
            {/* Buttons */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={stagger(4)}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
              <motion.button
                onClick={scrollToWork}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  background: "#FF6B35",
                  color: "#FFFFFF", border: "none",
                  borderRadius: "100px", padding: "14px 28px",
                  fontSize: "14px", cursor: "pointer", letterSpacing: "0.02em",
                  boxShadow: "0 4px 16px rgba(255,107,53,0.35)",
                }}
              >
                View my work ↓
              </motion.button>
              <motion.a
                href="#"
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(255,255,255,0.65)", color: "#1A1A1A",
                  border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: "100px",
                  padding: "14px 28px", fontSize: "14px",
                  letterSpacing: "0.02em", textDecoration: "none",
                  backdropFilter: "blur(10px)", display: "inline-block",
                }}
              >
                My Resume ↗
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={stagger(5)}
              style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
              {[
                { href: "mailto:rattikan.mm01@gmail.com", icon: <Mail size={14} />, label: "rattikan.mm01@gmail.com" },
                { href: "https://www.linkedin.com/in/rattikan-muangmoon-9b0534405/", icon: <Linkedin size={14} />, label: "rattikan-muangmoon" },
              ].map((l) => (
                <motion.a key={l.label} href={l.href}
                  whileHover={{ x: 3 }}
                  style={{ color: "#999", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", textDecoration: "none", transition: "color 0.2s", pointerEvents: "auto", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#1A1A1A")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
                >
                  {l.icon} {l.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToWork}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          background: "none", border: "none", cursor: "pointer", color: "#BBAA99",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        }}
      >
        <span style={{ fontSize: "10px", letterSpacing: "0.1em" }}>SCROLL</span>
        <ArrowDown size={14} />
      </motion.button>
    </section>
  );
}
