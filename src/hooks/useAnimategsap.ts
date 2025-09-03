import { useEffect } from "react";
import { gsap } from "gsap";
import useAnimationStore from "@/store/useAnimationStore";
 
type UseAnimateGsapProps = {
  opacity?: number;
  y?: number;
  duration?: number;
  delay?: number;
};

export const useAnimateGsap = ({
  opacity = 0,
  y = 0,
  duration = 1,
  delay = 0.3,
}: UseAnimateGsapProps = {}) => {
 
  const {
    headerRef,
    textRef,
    imageRef,
    mobileImageRef,
    setHeaderRef,
    setTextRef,
    setImageRef,
    setMobileImageRef,
    containerRef,
    setContainerRef
  } = useAnimationStore();

 
  useEffect(() => {
    if (headerRef) {
      gsap.fromTo(
        headerRef,
        { opacity: 0, y: y },
        { opacity: opacity, y: 0, duration: duration, ease: "power3.out" }
      );
    }

    if (textRef) {
      gsap.fromTo(
        textRef,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: delay }
      );
    }

    if (imageRef) {
      gsap.fromTo(
        imageRef,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
      );
    }

    if (mobileImageRef) {
      gsap.fromTo(
        mobileImageRef,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7 }
      );
    }
    if(containerRef){
        gsap.fromTo(
            mobileImageRef,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7 }
          );
    }
  }, [
    headerRef,
    textRef,
    imageRef,
    mobileImageRef,
    opacity,
    y,
    duration,
    delay,
    containerRef
  ]);
 
  return {
    setHeaderRef,
    setTextRef,
    setImageRef,
    setMobileImageRef,
    containerRef,
    setContainerRef
  };
};
