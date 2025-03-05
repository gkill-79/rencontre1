// components/Carousel.tsx
import React from "react";

const Carousel = () => {
  const frames = Array.from({ length: 30 }, (_, i) => `Frame ${i + 1}`);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        overflowY: "scroll",
        height: "80vh",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {frames.map((frame, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            textAlign: "center",
            borderRadius: "4px",
          }}
        >
          {frame}
        </div>
      ))}
    </div>
  );
};

export default Carousel;

