import { create } from "zustand";

interface StoreApp{
    activeAccordionId: number | null; 
    toggleAccordion:(id:number)=>void;
}
export const useAppStoreAccordition= create<StoreApp>()((set)=>({
    activeAccordionId: null, 
   
    toggleAccordion(id:number) {
         set((state)=>({
             activeAccordionId:state.activeAccordionId===id? null: id
         }))
    } 
}))