import { create } from "zustand"

const initialOptions = {
	isOpen: false,
}
export const useModalStore = create()((set) => ({
	modalOptions: initialOptions,
	setModalOptions: (options) => set({ modalOptions: options }),
}))