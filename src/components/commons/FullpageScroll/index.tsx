import React, { useEffect, useRef, useState } from "react";

import { useScrollStore } from "../../../store/scroll";

interface Props {
  children: React.ReactNode[];
}

const FullPageScroll: React.FC<Props> = ({ children }: Props) => {
  const [index, setIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { sectionType } = useScrollStore();
  const isScrolling = useRef(false);

  const scrollToSection = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWheel = (e: WheelEvent) => {
    if (isScrolling.current || sectionType === "horizontal") return;

    isScrolling.current = true;
    setTimeout(() => (isScrolling.current = false), 800);

    if (e.deltaY > 0 && index < children.length - 1) {
      setIndex((prev) => {
        const next = prev + 1;
        scrollToSection(next);
        return next;
      });
    } else if (e.deltaY < 0 && index > 0) {
      setIndex((prev) => {
        const prevIndex = prev - 1;
        scrollToSection(prevIndex);
        return prevIndex;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [index, sectionType]);

  return (
    <div>
      {children.map((children, i) => (
        <div
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          style={{ height: "100vh", overflow: "hidden" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default FullPageScroll;
