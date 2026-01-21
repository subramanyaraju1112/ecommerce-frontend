import { baseApi } from "@/redux/services"
import type { ProductsResponse } from "@/types/product.types"

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => ({
                url: "/products?limit=100",
                method: "GET"
            }),
            providesTags: ["Products"],
        }),
    }),
})

export const { useGetProductsQuery } = productsApi
