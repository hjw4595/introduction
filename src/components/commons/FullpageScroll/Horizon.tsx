import React, { useRef, useEffect, useState } from "react";

import { useScrollStore } from "../../../store/scroll";

interface Props {
  children: React.ReactNode[];
}

const HorizontalScrollSection: React.FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const isScrolling = useRef(false);

  const setSectionType = useScrollStore((state) => state.setSectionType);

  const scrollToSlide = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const slide = container.children[index] as HTMLElement;
    if (slide) {
      slide.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  const handleWheel = (e: WheelEvent) => {
    const wheelup = e.deltaY > 0;
    const wheeldown = e.deltaY < 0;
    e.preventDefault();

    if (isScrolling.current) return;

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 600);

    if (wheelup) {
      if (current < children.length - 1) {
        const next = current + 1;
        setCurrent(next);
        scrollToSlide(next);
        setSectionType("horizontal");
      } else {
        setSectionType("vertical");
      }
    }
    if (wheeldown) {
      if (current > 0) {
        const prev = current - 1;
        setCurrent(prev);
        scrollToSlide(prev);
        setSectionType("horizontal");
      } else {
        setSectionType("vertical");
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [current]);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      {children.map((child, i) => (
        <div key={i} style={{ minWidth: "100vw", height: "100%" }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default HorizontalScrollSection;
