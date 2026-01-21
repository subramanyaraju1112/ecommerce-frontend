import { configureStore } from "@reduxjs/toolkit"
import { baseApi } from "@/redux/services"
import filtersReducer from "@/redux/features/filters/filtersSlice"
import compareReducer from "@/redux/features/compare/compareSlice"


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    filters: filtersReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
