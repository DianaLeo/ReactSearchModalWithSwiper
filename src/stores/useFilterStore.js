import { create } from "zustand"

// export interface IFilter {
// 	search: string
// 	providers: number[]
// }

// interface IFilterStoreState {
// 	filter: IFilter
// 	setFilter: (filter: IFilter) => void
// 	globalFilter: IFilter
// 	setGlobalFilter: (filter: IFilter) => void
// }

const initialState = {
	filter: {
		search: "",
		providers: [],
	},
}

export const useFilterStore = create()((set) => ({
	filter: initialState.filter,
	setFilter: (filter) => set({ filter }),
	globalFilter: initialState.filter,
	setGlobalFilter: (globalFilter) => set({ globalFilter }),
}))
