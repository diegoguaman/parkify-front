import { create } from 'zustand';

interface ModalState {
  open: boolean;
  content: React.ReactNode;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  content: null,
  openModal: (content) => set({ open: true, content }),
  closeModal: () => set({ open: false, content: null }),
}));