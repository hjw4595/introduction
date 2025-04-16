import { create } from "zustand";

type SectionType = "vertical" | "horizontal";
type HorizonScrollType = "first" | "last";

interface ScrollStore {
  sectionType: SectionType;
  horizonScroll: HorizonScrollType;
  setSectionType: (type: SectionType) => void;
  setHorizonScroll: (type: HorizonScrollType) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  sectionType: "vertical",
  horizonScroll: "first",
  setSectionType: (type) => set({ sectionType: type }),
  setHorizonScroll: (type) => set({ horizonScroll: type }),
}));
