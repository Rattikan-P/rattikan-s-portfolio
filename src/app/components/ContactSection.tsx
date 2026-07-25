import { Mail, Linkedin, Phone, MapPin, ArrowUpRight, Github } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" style={{ background: "#1A1A1A", padding: "100px 32px 60px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <p style={{ fontSize: "12px", color: "#444", letterSpacing: "0.12em", marginBottom: "20px" }}>
            LET'S TALK
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(40px, 6vw, 76px)",
            color: "#FFFFFF", letterSpacing: "-0.03em",
            lineHeight: "1.1", marginBottom: "16px", fontWeight: 400,
          }}>
            Still learning,{" "}
            <span style={{ fontStyle: "italic", color: "#F5A623" }}>still growing.</span>
            <br />
            I'd love the chance to contribute.
          </h2>
          <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.6", maxWidth: "460px", margin: "0 auto 48px" }}>
            Thank you for taking the time to look through my work.
            I'm seeking a Semester 2 Co-op Internship — if you'd like to talk,
            my inbox is always open.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:rattikan.mm01@gmail.com"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#F5A623", color: "#1A1A1A",
                borderRadius: "100px", padding: "14px 28px",
                fontSize: "14px", textDecoration: "none",
                transition: "opacity 0.2s", letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Mail size={15} /> rattikan.mm01@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/rattikan-muangmoon-9b0534405/"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "transparent", color: "#FFFFFF",
                border: "1.5px solid #333", borderRadius: "100px",
                padding: "14px 28px", fontSize: "14px", textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#666")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
            >
              <Linkedin size={15} /> rattikan-muangmoon
            </a>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px", marginBottom: "60px",
        }}>
          {[
            { icon: Phone, label: "Phone", value: "+66 828906026", href: "tel:+66828906026", color: "#F5A623" },
            { icon: Mail, label: "Email", value: "rattikan.mm01@gmail.com", href: "mailto:rattikan.mm01@gmail.com", color: "#2EC4B6" },
            { icon: Linkedin, label: "LinkedIn", value: "rattikan-muangmoon", href: "https://www.linkedin.com/in/rattikan-muangmoon-9b0534405/", color: "#A78BFA" },
            { icon: Github, label: "GitHub", value: "Rattikan-P", href: "https://github.com/Rattikan-P", color: "#86EFAC" },
            { icon: MapPin, label: "Location", value: "Chiang Mai, Thailand", href: "#", color: "#F5A623" },
          ].map(({ icon: Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#252525", borderRadius: "14px", padding: "18px 20px",
                textDecoration: "none", border: "1px solid #2A2A2A",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#2D2D2D";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#252525";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Icon size={16} color={color} />
                </div>
                <div>
                  <p style={{ fontSize: "10px", color: color, letterSpacing: "0.06em", marginBottom: "2px" }}>
                    {label.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "13px", color: "#FFFFFF" }}>{value}</p>
                </div>
              </div>
              <ArrowUpRight size={14} color="#444" />
            </a>
          ))}
        </div>

        <div style={{
          borderTop: "1px solid #2A2A2A", paddingTop: "32px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-display)", fontSize: "22px",
            color: "#333", letterSpacing: "-0.02em", fontWeight: 400, fontStyle: "italic",
          }}>
            Ratti.
          </p>
          <p style={{ fontSize: "12px", color: "#3A3A3A", letterSpacing: "0.03em" }}>
            © 2025 · Rathikan Muangmoon · UX/UI Design · User Research & Prototyping
          </p>
        </div>
      </div>
    </section>
  );
}
