import { useAppStoreAccordition } from "@/store/useAccordition";
import { useRef, useEffect } from "react";
import  clsx from 'clsx';
interface AccordionProps {
  title: string;
  content: string;
  id: number;
}

export const AccordionDesign = ({ title, content, id }: AccordionProps) => {
  const activeAccordionId = useAppStoreAccordition((state) => state.activeAccordionId);
  const toggleAccordion = useAppStoreAccordition((state) => state.toggleAccordion);
  const isActive = activeAccordionId === id; 
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isActive
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isActive]);

  return (
    <div 
    
    className={clsx(
      "border border-gray-200 rounded-md mb-2 transition-all",
      
    )}
    
      
    
    >
      <button
        className={clsx(
          "  w-full text-left p-4 flex justify-between items-center transition-colors duration-300",
          isActive? 'bg-white transition-all': 'gradient-custom transition-all  text-white'
        )}
        
        onClick={() => toggleAccordion(id)}
        aria-expanded={isActive}
      >
        <span className="font-medium">{title}</span>
        <span className={`text-amber-500 transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}>
          {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          )}
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <div className="p-4 border-t border-gray-100 text-gray-700 bg-white">
          {content}
        </div>
      </div>
    </div>
  );
};
