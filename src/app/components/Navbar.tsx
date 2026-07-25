import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "work" },
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Contact", href: "contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
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
              color: "#1A1A1A", textDecoration: "none",
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
                  fontSize: "14px", color: "#1A1A1A", background: "none",
                  border: "none", cursor: "pointer", opacity: 0.55,
                  transition: "opacity 0.2s", letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.55")}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#"
              style={{
                background: "#1A1A1A", color: "#FFFFFF", borderRadius: "100px",
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
            style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1A1A" }}
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
            background: "#FAFAF8", zIndex: 49,
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
                color: "#1A1A1A", background: "none", border: "none", cursor: "pointer",
              }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#"
            style={{
              background: "#1A1A1A", color: "#FFFFFF", borderRadius: "100px",
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
