import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ScrollButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setIsVisible(scrollTop > 50);
      setIsAtBottom(scrollTop + windowHeight >= docHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="scroll-button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={isAtBottom ? scrollToTop : scrollToBottom}
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "1px solid rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          zIndex: 100,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
        }}
        title={isAtBottom ? "Back to top" : "Scroll to bottom"}
      >
        {isAtBottom ? (
          <ArrowUp size={20} style={{ color: "#FF6B35" }} />
        ) : (
          <ArrowDown size={20} style={{ color: "#666" }} />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
