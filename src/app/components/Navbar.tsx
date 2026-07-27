import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Menu, X, ArrowRight, Mail, Linkedin, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "../data/projects";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Work", href: "work" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

// Floating blob for mobile menu
function FloatingBlob({ x, y, size, color, duration }: {
  x: string; y: string; size: string; color: string; duration: number;
}) {
  return (
    <motion.div
      animate={{ y: ["0%", "-12%", "0%"], x: ["0%", "6%", "0%"], scale: [1, 1.05, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", top: y, left: x,
        width: size, height: size, borderRadius: "50%",
        background: color, filter: "blur(50px)",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

// Decorative dot pattern
function DotPattern() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, opacity: 0.03 }}
      width="100%"
      height="100%"
    >
      <defs>
        <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  // Detect current project page → pick up its brand color
  const slug = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const project = projects.find((p) => p.slug === slug);
  const textColor = project ? project.textColor : "#1A1A1A";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add/remove body class when menu opens/closes
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("mobile-menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Track active section on scroll
  useEffect(() => {
    // Clear active section when not on home
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = navLinks.map((link) => document.getElementById(link.href)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          if (mostVisible.intersectionRatio > 0.2) {
            setActiveSection(mostVisible.target.id);
          }
        }
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollForHero = () => {
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScrollForHero);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollForHero);
    };
  }, [isHome]);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  // Navbar background
  const navBg = project
    ? scrolled || menuOpen
      ? project.bg
      : "transparent"
    : scrolled || menuOpen
      ? "rgba(255,255,255,0.95)"
      : "transparent";
  const navBlur = (!project && scrolled) || menuOpen;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: navBg,
          backdropFilter: navBlur ? "blur(12px)" : "none",
          borderBottom: !project && scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "20px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button
            onClick={() => {
              setMenuOpen(false);
              if (isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "22px",
              color: textColor, textDecoration: "none",
              letterSpacing: "-0.02em", fontStyle: "italic",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
          >
            Ratti.
          </button>

          <div className="hidden md:flex" style={{ alignItems: "center", gap: "36px" }}>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  fontSize: "14px", color: textColor, background: "none",
                  border: "none", cursor: "pointer",
                  transition: "opacity 0.2s", letterSpacing: "0.02em",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== link.href) e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== link.href) e.currentTarget.style.opacity = "0.65";
                }}
              >
                {activeSection === link.href && (
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "#FF6B35",
                  }} />
                )}
                <span style={{
                  opacity: activeSection === link.href ? 1 : 0.65,
                  fontWeight: activeSection === link.href ? 500 : 400,
                }}>
                  {link.label}
                </span>
              </button>
            ))}
            <a
              href="https://drive.google.com/file/d/1D0GKb8JGfyhlqowX2eYQhD3dUsEArl5-/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: textColor, color: project ? project.bg : "#FFFFFF", borderRadius: "100px",
                padding: "10px 22px", fontSize: "13px",
                letterSpacing: "0.02em", textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              My Resume ↗
            </a>
          </div>

          <button
            className="flex md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: textColor, position: "relative",
              zIndex: menuOpen ? 52 : "auto",
              opacity: menuOpen ? 0 : 1,
              pointerEvents: menuOpen ? "none" : "auto",
              transition: "opacity 0.2s",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Close button for mobile menu - outside the menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.button
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMenuOpen(false)}
            className="md:hidden"
            style={{
              position: "fixed", top: 20, right: 20,
              background: "rgba(255,255,255,0.95)", border: "none",
              cursor: "pointer", color: "#1A1A1A", zIndex: 60,
              padding: "10px", borderRadius: "50%",
              boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <X size={18} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: project ? project.bg : "#FAFAF8", zIndex: 49,
              display: "flex", flexDirection: "column",
            }}
          >
            {/* Animated background blobs */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
              <FloatingBlob x="60%" y="10%" size="280px" color="rgba(255,107,53,0.15)" duration={8} />
              <FloatingBlob x="80%" y="60%" size="220px" color={project ? `${project.accent}20` : "rgba(26,26,26,0.08)"} duration={10} />
              <FloatingBlob x="-10%" y="70%" size="200px" color="rgba(150,200,255,0.12)" duration={12} />
              <FloatingBlob x="20%" y="-10%" size="180px" color="rgba(255,180,100,0.1)" duration={9} />
            </div>

            {/* Dot pattern overlay */}
            <DotPattern />

            {/* Content */}
            <div style={{
              position: "relative", zIndex: 1,
              flex: 1, display: "flex", flexDirection: "column",
              justifyContent: "center", alignItems: "center",
              padding: "40px 24px"
            }}>
              {/* Menu Label */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  position: "absolute", top: 28, left: 28,
                  fontSize: "11px", letterSpacing: "0.15em",
                  textTransform: "uppercase", opacity: 0.5,
                  color: textColor,
                }}
              >
                Menu
              </motion.div>

              {/* Large Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ marginBottom: "40px", textAlign: "center" }}
              >
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (isHome) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      navigate("/");
                    }
                  }}
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "48px",
                    color: textColor, textDecoration: "none",
                    letterSpacing: "-0.03em", fontStyle: "italic",
                    lineHeight: 1, background: "none", border: "none", cursor: "pointer", padding: 0,
                  }}
                >
                  Ratti.
                </button>
              </motion.div>

              {/* Navigation Links */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: "100%", maxWidth: 280 }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: "100%" }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      style={{
                        fontFamily: "var(--font-sans)", fontSize: "24px",
                        color: textColor, background: "none", border: "none",
                        cursor: "pointer", textAlign: "center",
                        letterSpacing: "-0.02em", width: "100%",
                        padding: "10px 16px",
                        transition: "all 0.3s ease",
                        fontWeight: 300,
                        borderRadius: "10px",
                        position: "relative",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.fontWeight = "400";
                        e.currentTarget.style.background = "rgba(255,255,255,0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.fontWeight = "300";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Decorative line */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                style={{
                  width: "60px", height: "2px",
                  background: `rgba(${textColor === "#FFFFFF" ? "255,255,255" : "0,0,0"}, 0.15)`,
                  margin: "32px 0",
                  borderRadius: "2px",
                }}
              />

              {/* Resume Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="https://drive.google.com/file/d/1D0GKb8JGfyhlqowX2eYQhD3dUsEArl5-/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: textColor, color: project ? project.bg : "#FFFFFF",
                    borderRadius: "100px", padding: "16px 32px",
                    fontSize: "15px", textDecoration: "none",
                    display: "inline-flex", alignItems: "center", gap: "10px",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    letterSpacing: "0.02em",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                  }}
                >
                  My Resume <ArrowRight size={16} strokeWidth={2.5} />
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                style={{
                  display: "flex", gap: "12px", marginTop: "36px"
                }}
              >
                {[
                  { href: "mailto:rattikan.mm01@gmail.com", icon: Mail, label: "Email" },
                  { href: "https://www.linkedin.com/in/rattikan-muangmoon-9b0534405/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://github.com/Rattikan-P", icon: Github, label: "GitHub" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      width: "44px", height: "44px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(0,0,0,0.08)",
                      background: "rgba(255,255,255,0.9)",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.12) translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
                      e.currentTarget.style.borderColor = textColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1) translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
                    }}
                  >
                    <Icon size={18} color="#1A1A1A" strokeWidth={1.5} />
                  </a>
                ))}
              </motion.div>

              {/* Footer text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{
                  position: "absolute", bottom: 36,
                  fontSize: "11px", color: textColor,
                  opacity: 0.4, letterSpacing: "0.05em",
                }}
              >
                © 2026 Rattikan Muangmoon
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
