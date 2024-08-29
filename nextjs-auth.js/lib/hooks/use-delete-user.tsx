import { create } from "zustand";

interface State {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (open: boolean) => void;
}

export const useDeleteUser = create<State>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onChange: (open) => {
    if (!open) {
      set({ isOpen: false });
    }
  },
}));
