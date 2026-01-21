import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type RatingFilter = "all" | "3+" | "4+"

export interface FiltersState {
    categories: string[]
    brands: string[]
    stock: string[]
    rating: RatingFilter
    priceRange: [number, number]
}

const initialState: FiltersState = {
    categories: [],
    brands: [],
    stock: [],
    rating: "all",
    priceRange: [0, 1500],
}

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<string[]>) {
            state.categories = action.payload
        },
        setBrands(state, action: PayloadAction<string[]>) {
            state.brands = action.payload
        },
        setStock(state, action: PayloadAction<string[]>) {
            state.stock = action.payload
        },
        setRating(state, action: PayloadAction<RatingFilter>) {
            state.rating = action.payload
        },
        setPriceRange(state, action: PayloadAction<[number, number]>) {
            state.priceRange = action.payload
        },
        clearAllFilters() {
            return initialState
        },
    },
})

export const {
    setCategories,
    setBrands,
    setStock,
    setRating,
    setPriceRange,
    clearAllFilters,
} = filtersSlice.actions

export default filtersSlice.reducer
