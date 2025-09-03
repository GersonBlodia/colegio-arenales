"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SaveButton } from "../UI/button/SaveButton";
import { AccessInfoCard } from "../UI/card/AccessInfoCard";
import { ConsentOptions } from "./ConsentOptions";
import { ContextCurso } from "./ContextCurso";
import { WelcomeSection } from "./WelcomeSection";

export const CursoContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const animateContent = () => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        animateContent();
      }
    };

    gsap.set(containerRef.current, {  opacity: 0, y: 50 });

    if (window.scrollY > 100) {
      animateContent();
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ContextCurso className="mx-auto flex flex-col md:flex-row justify-between p-8 w-full md:w-[80%]">
      <div className="w-full md:w-1/2 pr-8" ref={containerRef}>
        <WelcomeSection />
        <ConsentOptions />
        <SaveButton />
      </div>

      {/* Diseño de card a la derecha */}
      <div className="w-full md:w-1/2">
        <AccessInfoCard />
      </div>
    </ContextCurso>
  );
};
