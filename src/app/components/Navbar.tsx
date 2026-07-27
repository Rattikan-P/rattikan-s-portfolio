import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Menu, X } from "lucide-react";
import { projects } from "../data/projects";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Work", href: "work" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

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
        // Find the entry with the largest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          // Only set active if section is significantly visible (more than 20%)
          if (mostVisible.intersectionRatio > 0.2) {
            setActiveSection(mostVisible.target.id);
          }
        }
      },
      { threshold: Array.from({ length: 100 }, (_, i) => i / 100) }
    );

    sections.forEach((section) => observer.observe(section));

    // Also clear active section when near top (hero section)
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

  // Navbar background:
  // - Project page: brand color (solid when scrolled, subtle blur when at top over hero)
  // - Home: transparent at top, frosted white when scrolled
  const navBg = project
    ? scrolled
      ? project.bg
      : "transparent"
    : scrolled
      ? "rgba(255,255,255,0.95)"
      : "transparent";
  const navBlur = !project && scrolled;

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
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-display)", fontSize: "22px",
              color: textColor, textDecoration: "none",
              letterSpacing: "-0.02em", fontStyle: "italic",
            }}
          >
            Ratti.
          </Link>

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
              href="#"
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
            style={{ background: "none", border: "none", cursor: "pointer", color: textColor }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: project ? project.bg : "#FAFAF8", zIndex: 49,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "32px",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                fontFamily: "var(--font-display)", fontSize: "42px",
                color: textColor, background: "none", border: "none", cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#"
            style={{
              background: textColor, color: project ? project.bg : "#FFFFFF", borderRadius: "100px",
              padding: "14px 32px", fontSize: "16px", textDecoration: "none", marginTop: "16px",
            }}
          >
            My Resume ↗
          </a>
        </div>
      )}
    </>
  );
}
