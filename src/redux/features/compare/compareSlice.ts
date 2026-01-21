// src/redux/features/compare/compareSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type CompareState = {
  ids: number[]
}

const MAX_COMPARE = 3

const initialState: CompareState = {
  ids: [],
}

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    toggleCompare(state, action: PayloadAction<number>) {
      const id = action.payload

      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
        return
      }

      if (state.ids.length >= MAX_COMPARE) {
        return
      }

      state.ids.push(id)
    },
    clearCompare(state) {
      state.ids = []
    },
  },
})

export const { toggleCompare, clearCompare } = compareSlice.actions
export default compareSlice.reducer
