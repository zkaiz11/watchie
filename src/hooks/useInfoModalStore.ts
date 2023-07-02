import { create } from 'zustand';

export interface ModalStoreInterface {
  movieId?: number;
  isOpen: boolean;
  openModal: (movieId: number) => void;
  closeModal: () => void;
}

const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: number) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModalStore;
