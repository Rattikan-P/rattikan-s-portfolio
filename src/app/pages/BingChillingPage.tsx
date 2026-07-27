import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentProjects, projects } from "../data/projects";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { PrototypeCarousel } from "@/app/components/PrototypeCarousel";
import { Lightbox } from "@/app/components/Lightbox";
import userFlowImg from "@/imports/User_flow_of_webstore_pages__1_.png";
import backOfficeImg from "@/imports/bingChilliing-backend.drawio.png";

const BG = "#F2C4CE";
const DARK = "#1A1A1A";
const ACCENT = "#C0405A";

const PHASES = [
  { num: "01", label: "RESEARCH" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "BUILD" },
];

const PHASE_BG = ["#FAFAF8", "#F2EDF0", "#FAFAF8"];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function Img({ src, alt, description }: { src: string; alt: string; description?: string }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsLightboxOpen(true)}
        style={{
          borderRadius: "16px", overflow: "hidden",
          border: "1px solid rgba(192,64,90,0.1)",
          background: "#FFFFFF",
          boxShadow: "0 4px 32px rgba(192,64,90,0.06)",
          cursor: "zoom-in",
        }}>
        <ImageWithFallback
          src={src}
          alt={alt}
          style={{ width: "100%", display: "block", objectFit: "contain" }}
        />
      </motion.div>
      {description && (
        <p style={{ fontSize: "11px", color: "#BBB", marginTop: "10px", textAlign: "center" }}>
          {description}
        </p>
      )}
      <Lightbox
        isOpen={isLightboxOpen}
        src={src}
        alt={alt}
        onClose={() => setIsLightboxOpen(false)}
      />
    </div>
  );
}

function PhaseStrip({ num, label }: { num: string; label: string }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "16px",
      padding: "22px 40px",
      background: "rgba(192,64,90,0.05)",
      borderTop: "1px solid rgba(192,64,90,0.1)",
    }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", color: ACCENT, fontStyle: "italic" }}>{num}</span>
      <div style={{ width: "1px", height: "16px", background: "rgba(0,0,0,0.1)" }} />
      <span style={{ fontSize: "10px", letterSpacing: "0.14em", fontWeight: 600, color: "#AAA" }}>{label}</span>
    </div>
  );
}

function SideProgress({ activePhase }: { activePhase: number }) {
  return (
    <div style={{
      position: "fixed", right: "28px", top: "50%", transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "10px", zIndex: 50,
    }}>
      {PHASES.map((_, i) => (
        <motion.div key={i}
          animate={{ width: i === activePhase ? 24 : 6, background: i === activePhase ? ACCENT : "rgba(0,0,0,0.15)" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ height: "6px", borderRadius: "100px" }}
        />
      ))}
    </div>
  );
}

export function BingChillingPage() {
  const { prev, next } = getAdjacentProjects("bingchilling");
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-bing-phase]");
    const observers: IntersectionObserver[] = [];
    sections.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActivePhase(Number((el as HTMLElement).dataset.bingPhase)); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <SideProgress activePhase={activePhase} />

      {/* ── Hero ── */}
      <div style={{ background: BG, padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute", bottom: "-60px", right: "-20px",
            fontFamily: "var(--font-display)", fontSize: "clamp(180px, 24vw, 340px)",
            lineHeight: 1, color: "rgba(192,64,90,0.07)", fontWeight: 700,
            pointerEvents: "none", userSelect: "none", letterSpacing: "-0.05em",
          }}
        >05</motion.div>

        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link to="/" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: DARK, opacity: 0.4, textDecoration: "none", fontSize: "13px",
              letterSpacing: "0.03em", transition: "opacity 0.2s", marginBottom: "48px",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.4")}
            >
              <ArrowLeft size={14} /> Back to work
            </Link>
          </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center" }}>
        <div style={{ flex: "1.25 1 340px" }}>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: DARK, opacity: 0.35, letterSpacing: "0.1em" }}>05 · 2025</span>
            <span style={{ fontSize: "11px", color: DARK, background: "rgba(0,0,0,0.07)", borderRadius: "4px", padding: "2px 8px", opacity: 0.75 }}>Art Toy E-Commerce Platform</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6.5vw, 84px)",
              lineHeight: 1, color: DARK, letterSpacing: "-0.03em", marginBottom: "20px", fontWeight: 400,
            }}>
            BingChilling
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{ fontSize: "18px", color: DARK, opacity: 0.6, maxWidth: "560px", lineHeight: "1.7", marginBottom: "48px" }}>
            An e-commerce platform for art toy collectibles: designed for the collector who browses for the story,
            not just the product. Two completely different user journeys built on one system.
          </motion.p>

          {/* Meta */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "1px", background: "rgba(192,64,90,0.2)", borderRadius: "14px",
              overflow: "hidden", maxWidth: "700px",
            }}>
            {[
              { label: "My role", value: "Full-stack Product Designer" },
              { label: "Team", value: "4-person team" },
              { label: "Platform", value: "Web App" },
            ].map((m) => (
              <div key={m.label} style={{ background: "#FDE8ED", padding: "14px 18px" }}>
                <p style={{ fontSize: "10px", color: DARK, opacity: 0.35, letterSpacing: "0.08em", marginBottom: "3px" }}>{m.label.toUpperCase()}</p>
                <p style={{ fontSize: "13px", color: DARK, lineHeight: "1.4" }}>{m.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "48px", marginTop: "40px", flexWrap: "wrap" }}>
            {[
              { value: "11", label: "Use cases implemented" },
              { value: "2", label: "User journeys: shopper + admin" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "54px", color: ACCENT, lineHeight: 1, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "13px", color: DARK, opacity: 0.45 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ flex: "0.9 1 300px" }}
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.3 }}
            style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.18))" }}
          >
            <img
              src="/projects/bing-chilling/hero.png"
              alt="BingChilling — art toy e-commerce platform"
              style={{ width: "100%", display: "block" }}
            />
          </motion.div>
        </motion.div>

        </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ background: "#FDE8ED", padding: "18px 40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {["E-Commerce", "UX/UI Design", "Full-stack", "Web", "Express.js", "MySQL"].map((t) => (
            <span key={t} style={{
              background: "rgba(192,64,90,0.1)", color: ACCENT, borderRadius: "100px",
              padding: "6px 16px", fontSize: "12px", border: "1px solid rgba(192,64,90,0.25)",
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ═══ 01 RESEARCH ═══ */}
      <div data-bing-phase="0" style={{ background: PHASE_BG[0], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(192,64,90,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>01</div>
        <PhaseStrip num="01" label="RESEARCH" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Understanding the art toy collector
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              Art toy collectors don't browse the way typical shoppers do; they shop for the story, the scarcity, and the brand world.
              We identified 4 user characteristics that shaped every design decision.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "32px" }}>
            {[
              { type: "Visually-driven shoppers", desc: "Prominent product images with multi-angle carousel slides. Thumbnail navigation for instant comparison. The product image is the first, and most important, trust signal." },
              { type: "Detail-oriented collectors", desc: "Comprehensive product information. Clear variant options (single box vs. whole set). Detailed specifications; because collectors compare across platforms before committing." },
              { type: "Impulse buyers", desc: "Visual discount badges and new arrival indicators create urgency without being aggressive. The brand story pulls them in; the deal closes them." },
              { type: "Multi-device users", desc: "Responsive Bootstrap grid ensures the collection browsing experience works on desktop (discovery mode) and mobile (deal checking on the go)." },
            ].map((u, i) => (
              <motion.div key={u.type}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: "#FFFFFF", borderRadius: "12px", padding: "22px 24px",
                  border: "1px solid rgba(192,64,90,0.08)",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: ACCENT, flexShrink: 0 }} />
                  <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{u.type}</p>
                </div>
                <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.65" }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>

          <FadeUp delay={0.1}>
            <div style={{
              background: ACCENT + "0E", borderRadius: "14px", padding: "24px 28px",
              borderLeft: `4px solid ${ACCENT}`,
            }}>
              <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em", marginBottom: "10px", fontWeight: 600 }}>KEY INSIGHT</p>
              <p style={{ fontSize: "15px", color: DARK, lineHeight: "1.65", opacity: 0.8 }}>
                Art toy buyers are shopping for the <em>story and status</em> of an object, not just its function.
                The product page must communicate brand world: scarcity, authenticity, and aesthetic; not just specs and price.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* ═══ 02 DESIGN ═══ */}
      <div data-bing-phase="1" style={{ background: PHASE_BG[1], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(192,64,90,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>02</div>
        <PhaseStrip num="02" label="DESIGN" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Two journeys. One design system.
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              The core design challenge: a single visual system serving two completely different users; the collector browsing limited drops, and the admin managing inventory in bulk.
            </p>
          </FadeUp>

          {/* Customer use cases */}
          <FadeUp delay={0.05}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: ACCENT }} />
                <p style={{ fontSize: "12px", color: ACCENT, letterSpacing: "0.08em", fontWeight: 600 }}>CUSTOMER: 8 USE CASES</p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["UC1: Register & Login", "UC2: Search Products", "UC3: View Product Detail",
                  "UC4: Add to Cart", "UC5: Manage Basket", "UC6: Checkout",
                  "UC7: Order Completion", "UC8: Contact Shop"].map((uc, i) => (
                  <motion.span key={uc}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    style={{
                      background: "#FFFFFF", color: DARK, borderRadius: "8px",
                      padding: "7px 14px", fontSize: "12px",
                      border: "1px solid rgba(192,64,90,0.12)",
                    }}>{uc}</motion.span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Admin use cases */}
          <FadeUp delay={0.08}>
            <div style={{ marginBottom: "36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: DARK }} />
                <p style={{ fontSize: "12px", color: DARK, letterSpacing: "0.08em", fontWeight: 600, opacity: 0.5 }}>ADMIN: 3 USE CASES</p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {["UC9: Manage Products (CRUD + search, filter, sort, pagination)",
                  "UC10: Manage Categories",
                  "UC11: Sales Dashboard (weekly / monthly / yearly)"].map((uc, i) => (
                  <motion.span key={uc}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    style={{
                      background: DARK, color: "#CCC", borderRadius: "8px",
                      padding: "7px 14px", fontSize: "12px",
                    }}>{uc}</motion.span>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* User flow diagram */}
          <FadeUp delay={0.12}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.08em", marginBottom: "14px", fontWeight: 600 }}>USER FLOW: WEBSTORE PAGES</p>
              <Img
                src={userFlowImg}
                alt="User flow diagram for BingChilling webstore pages: showing all customer and admin journeys"
                description="Complete user flow: from landing page through checkout, account management, and admin back-office"
              />
            </div>
          </FadeUp>

          {/* Surface breakdown */}
          <FadeUp delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { surface: "Storefront", approach: "Editorial product pages: brand world first, specs second. Carousel for multi-angle images. Variant buttons (single box / whole set) that update price and stock in real time. Scarcity and discount indicators." },
                { surface: "Admin dashboard", approach: "Designed for speed: statistics cards (orders, revenue), Chart.js sales graph (weekly / monthly / yearly), best sellers list, recent orders table with pagination." },
                { surface: "Shared system", approach: "Single Figma component library across both surfaces; consistent typography, spacing, button hierarchy, and icon standards. Bootstrap grid for responsive behaviour across desktop and mobile." },
              ].map((d, i) => (
                <motion.div key={d.surface}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  style={{
                    background: "#FFFFFF", borderRadius: "12px", padding: "20px 24px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "grid", gridTemplateColumns: "130px 1fr", gap: "20px", alignItems: "start",
                  }}>
                  <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{d.surface}</p>
                  <p style={{ fontSize: "13px", color: "#555", lineHeight: "1.65" }}>{d.approach}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Hi-fi prototype */}
          <FadeUp>
            <p style={{ fontSize: "14px", color: "#1A1A1A", opacity: 0.6, marginBottom: "24px", lineHeight: "1.6", maxWidth: "100%" }}>
              The final product: e-commerce platform balancing art toy collector experience with back-office efficiency.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.12em", marginBottom: "14px", fontWeight: 600 }}>
              HI-FI PROTOTYPE
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <PrototypeCarousel
              images={[
                "/projects/bing-chilling/prototypes/prototype-desktop.png",
                "/projects/bing-chilling/prototypes/prototype-mobile.png",
              ]}
              alt="BingChilling hi-fi prototype"
            />
          </FadeUp>
        </div>
      </div>

      {/* ═══ 03 BUILD ═══ */}
      <div data-bing-phase="2" style={{ background: PHASE_BG[2], position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-10px", right: "-10px",
          fontFamily: "var(--font-display)", fontSize: "clamp(120px, 18vw, 220px)",
          color: "rgba(192,64,90,0.04)", fontWeight: 700, lineHeight: 1, pointerEvents: "none", userSelect: "none",
        }}>03</div>
        <PhaseStrip num="03" label="BUILD" />
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "56px 40px 72px", position: "relative", zIndex: 1 }}>
          <FadeUp>
            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 40px)",
              color: DARK, letterSpacing: "-0.02em", fontWeight: 400, lineHeight: 1.1, marginBottom: "14px",
            }}>
              Database to front-end, end-to-end
            </h2>
            <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.75", maxWidth: "100%", marginBottom: "40px" }}>
              Built the full application stack: MySQL schema, RESTful Express.js API, EJS templates, and external API integrations.
              Role-based sessions separate customer and admin throughout. The team collaborated via Git and shipped the app through Docker deployment.
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "28px" }}>
              {[
                { layer: "Frontend", stack: ["EJS templates", "Bootstrap grid", "Chart.js", "SweetAlert2", "Iconify"] },
                { layer: "Backend", stack: ["Express.js", "mysql2", "bcrypt", "express-session", "nodemailer"] },
                { layer: "External APIs", stack: ["Google Maps API", "File API", "Canvas API", "Drag & Drop API", "Fetch API"] },
              ].map((t) => (
                <div key={t.layer} style={{
                  background: "#FFFFFF", borderRadius: "12px", padding: "20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <p style={{ fontSize: "11px", color: ACCENT, letterSpacing: "0.08em", marginBottom: "12px", fontWeight: 600 }}>{t.layer.toUpperCase()}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {t.stack.map((s) => (
                      <span key={s} style={{ fontSize: "12px", color: "#666" }}>· {s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Back office flow diagram */}
          <FadeUp delay={0.08}>
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "11px", color: "#AAA", letterSpacing: "0.08em", marginBottom: "14px", fontWeight: 600 }}>ADMIN BACK OFFICE: SYSTEM FLOW</p>
              <Img
                src={backOfficeImg}
                alt="Admin back office flow: Login, Dashboard, Category Management (Add/Edit/Delete), Product Management (Add/Edit/Delete)"
                description="Admin flow: Login → Dashboard → Category & Product management with full CRUD operations"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { feature: "Product catalogue", detail: "MySQL schema with variant management (single box / whole set / custom), discount %, stock tracking, and multi-image upload with drag & drop and canvas resizing." },
                { feature: "Shopping cart", detail: "Session-persistent cart updated in real time. Quantity validation against stock. Total price recalculates on every change without page reload." },
                { feature: "Checkout & orders", detail: "Delivery method selection, payment method (QR, Bank Transfer, Credit/Debit, COD), order confirmation with duplicate-access prevention on refresh." },
                { feature: "Admin dashboard", detail: "Chart.js sales graph with weekly / monthly / yearly toggle. Statistics cards (orders, revenue, products). Best sellers list. Recent orders with pagination." },
                { feature: "Auth & sessions", detail: "bcrypt password hashing. express-session for role-based access; customers and admins handled separately. Login accepts both username and email." },
                { feature: "Contact & maps", detail: "Contact form with nodemailer; saves to CONTACTS table + emails shop. Google Maps API embeds CAMT location on the contact page." },
              ].map((f, i) => (
                <motion.div key={f.feature}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  style={{
                    background: "#FFFFFF", borderRadius: "12px", padding: "18px 22px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    display: "grid", gridTemplateColumns: "150px 1fr", gap: "20px", alignItems: "start",
                  }}>
                  <p style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>{f.feature}</p>
                  <p style={{ fontSize: "13px", color: "#666", lineHeight: "1.65" }}>{f.detail}</p>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Closing quote */}
      <div style={{ background: "#FAFAF8", padding: "72px 40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeUp>
            <div style={{ borderLeft: `4px solid ${BG}`, paddingLeft: "28px", margin: "48px 0 56px" }}>
              <p style={{
                fontFamily: "var(--font-display)", fontSize: "22px", color: DARK,
                lineHeight: "1.55", fontStyle: "italic", fontWeight: 400,
              }}>
                Building BingChilling end-to-end reinforced that solid execution only earns its keep when it serves
                a real emotional need, here, the collector's relationship with the objects they hunt for.
                Every schema, session, and screen was in service of that story.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{
              background: BG, borderRadius: "20px", padding: "36px 40px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              flexWrap: "wrap", gap: "20px",
            }}>
              <div>
                <p style={{ fontSize: "12px", color: DARK, opacity: 0.4, marginBottom: "4px" }}>Want to explore it?</p>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: DARK, fontWeight: 400 }}>View the project</p>
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <motion.a
                  href="https://www.figma.com/proto/IwY4fgYyhyrWUqvg3E2M1M/Project?node-id=38-3605&p=f&t=62P5KEsJIY7rXZwr-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=38%3A3605"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: DARK, color: BG, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none" }}
                >
                  View prototype ↗
                </motion.a>
                <motion.a
                  href="https://github.com/Rattikan-P/bingchilling"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ background: "transparent", color: DARK, borderRadius: "100px", padding: "13px 26px", fontSize: "14px", textDecoration: "none", border: "1.5px solid rgba(26,26,26,0.3)" }}
                >
                  GitHub ↗
                </motion.a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Prev / Next */}
      <div style={{ display: "grid", gridTemplateColumns: prev ? (next ? "1fr 1fr" : "1fr") : "1fr", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        {prev && (
          <motion.div whileHover={{ opacity: 0.88 }}>
            <Link to={`/${prev.slug}`} style={{
              display: "flex", flexDirection: "column", padding: "48px 40px", textDecoration: "none",
              background: prev.bg, borderRight: next ? "1px solid rgba(0,0,0,0.08)" : "none", height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <ArrowLeft size={14} color={prev.textColor} style={{ opacity: 0.5 }} />
                <span style={{ fontSize: "11px", color: prev.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>PREVIOUS</span>
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: prev.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{prev.title}</p>
            </Link>
          </motion.div>
        )}
        {next && (
          <motion.div whileHover={{ opacity: 0.88 }}>
            <Link to={`/${next.slug}`} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end",
              padding: "48px 40px", textDecoration: "none", background: next.bg, height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", color: next.textColor, opacity: 0.5, letterSpacing: "0.08em" }}>NEXT</span>
                <ArrowRight size={14} color={next.textColor} style={{ opacity: 0.5 }} />
              </div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: next.textColor, letterSpacing: "-0.02em", fontWeight: 400 }}>{next.title}</p>
            </Link>
          </motion.div>
        )}
      </div>

      {/* All projects */}
      <div style={{ background: "#111", padding: "40px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.1em", marginBottom: "16px" }}>ALL PROJECTS</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {projects.map((p) => (
              <Link key={p.slug} to={`/${p.slug}`} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px", borderRadius: "100px", textDecoration: "none", fontSize: "13px",
                background: p.slug === "bingchilling" ? "#FFFFFF" : "transparent",
                color: p.slug === "bingchilling" ? "#111" : "#888",
                border: p.slug === "bingchilling" ? "none" : "1px solid #333",
                transition: "all 0.2s",
              }}
                onMouseEnter={(e) => { if (p.slug !== "bingchilling") { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#CCC"; } }}
                onMouseLeave={(e) => { if (p.slug !== "bingchilling") { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#888"; } }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.bg, flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
