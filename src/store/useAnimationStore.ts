import { create } from 'zustand';
 
type AnimationStore = {
  headerRef: HTMLElement | null;
  textRef: HTMLElement | null;
  imageRef: HTMLElement | null;
  mobileImageRef: HTMLElement | null;
  containerRef: HTMLElement | null;
  setHeaderRef: (ref: HTMLElement | null) => void;
  setTextRef: (ref: HTMLElement | null) => void;
  setImageRef: (ref: HTMLElement | null) => void;
  setMobileImageRef: (ref: HTMLElement | null) => void;
  setContainerRef: (ref: HTMLElement | null) => void;
};
 
const useAnimationStore = create<AnimationStore>((set) => ({
  headerRef: null,
  textRef: null,
  imageRef: null,
  containerRef:null,
  mobileImageRef: null,
  setHeaderRef: (ref) => set({ headerRef: ref }),
  setTextRef: (ref) => set({ textRef: ref }),
  setImageRef: (ref) => set({ imageRef: ref }),
  setMobileImageRef: (ref) => set({ mobileImageRef: ref }),
  setContainerRef(ref) {
        set({mobileImageRef: ref})
  },
}));

export default useAnimationStore;