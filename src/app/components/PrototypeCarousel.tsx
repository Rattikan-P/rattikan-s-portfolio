import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PrototypeCarouselProps {
  images: string[];
  alt?: string;
}

export function PrototypeCarousel({ images, alt = "Prototype" }: PrototypeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  // Single image - no carousel needed
  if (images.length === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginTop: "48px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          maxWidth: "900px",
          margin: "48px auto 0",
          background: "#fff",
        }}
      >
        <img
          src={images[0]}
          alt={alt}
          style={{ width: "100%", height: "auto", maxHeight: "700px", objectFit: "contain", display: "block" }}
        />
      </motion.div>
    );
  }

  // Multiple images - show carousel
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: "900px",
        margin: "48px auto 0",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
        position: "relative",
        background: "#fff",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ width: "100%", height: "auto", maxHeight: "700px", objectFit: "contain", display: "block" }}
        />
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#fff"}
        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
      >
        <ChevronLeft size={18} style={{ color: "#333" }} />
      </button>

      <button
        onClick={goToNext}
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(0,0,0,0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#fff"}
        onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.9)"}
      >
        <ChevronRight size={18} style={{ color: "#333" }} />
      </button>

      {/* Dots indicator */}
      <div style={{
        position: "absolute",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "8px",
      }}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: index === currentIndex ? "#fff" : "rgba(255,255,255,0.5)",
              border: index === currentIndex ? "none" : "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
