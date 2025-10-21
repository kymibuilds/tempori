import { url } from "inspector";
import { create } from "zustand";

type coverImageStoreProps = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImage = create<coverImageStoreProps>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, url: undefined }),
  onReplace: (url: string) => set({ isOpen: true, url }),
}));
