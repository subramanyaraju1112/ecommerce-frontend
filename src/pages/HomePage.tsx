import { useOutletContext, useSearchParams } from "react-router-dom"
import {
  ProductCard,
  ProductListItem,
  ProductModal,
} from "@/components/products"
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton"
import { useGetProductsQuery } from "@/redux/features/products/productsApi"
import { sortProducts, type Product, type SortKey } from "@/types"
import { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/app/store"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"

import { toast } from "sonner"
import { toggleCompare } from "@/redux/features/compare/compareSlice"
import { CompareButton, CompareModal } from "@/components/compare"

type LayoutContext = {
  view: "grid" | "list"
  sort: SortKey
  search: string
}

const PAGE_SIZE = 24

const HomePage: React.FC = () => {
  const { view, sort, search } = useOutletContext<LayoutContext>()
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.filters)
  const comparedIds = useSelector((state: RootState) => state.compare.ids)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data, isLoading, isError } = useGetProductsQuery(undefined)

  /* ---------- ERROR TOAST (ONCE) ---------- */
  const errorShownRef = useRef(false)

  if (isError && !errorShownRef.current) {
    errorShownRef.current = true
    toast.error("Failed to load products. Retry?", {
      duration: 4000,
      action: {
        label: "Retry",
        onClick: () => window.location.reload(),
      },
    })
  }

  // Pagination
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") ?? 1)

  // Filter
  const filteredProducts: Product[] = useMemo(() => {
    if (!data?.products) return []

    let result = [...data.products]

    // Search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    }

    // Category
    if (filters.categories.length) {
      result = result.filter((p) =>
        filters.categories.includes(p.category)
      )
    }

    // Brand
    if (filters.brands.length) {
      result = result.filter(
        (p) => p.brand && filters.brands.includes(p.brand)
      )
    }

    // Price
    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] &&
        p.price <= filters.priceRange[1]
    )

    // Rating
    if (filters.rating !== "all") {
      const minRating = filters.rating === "4+" ? 4 : 3
      result = result.filter((p) => p.rating >= minRating)
    }

    // Stock
    if (filters.stock.length) {
      result = result.filter((p) => {
        if (filters.stock.includes("in-stock")) return p.stock > 20
        if (filters.stock.includes("low-stock"))
          return p.stock > 0 && p.stock <= 20
        if (filters.stock.includes("out-of-stock")) return p.stock === 0
        return true
      })
    }

    return sortProducts(result, sort)
  }, [
    data?.products,
    search,
    sort,
    filters.categories,
    filters.brands,
    filters.priceRange,
    filters.rating,
    filters.stock,
  ])

  const compareProducts = useMemo(() => {
    if (!data?.products) return []

    return data.products.filter((p) =>
      comparedIds.includes(p.id)
    )
  }, [data?.products, comparedIds])

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE)

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, page])

  const setPage = (p: number) => {
    searchParams.set("page", String(p))
    setSearchParams(searchParams)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <CompareButton onClick={() => setOpen(true)} />
      </div>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && paginatedProducts.length === 0 && (
        <div>No products found</div>
      )}

      {!isLoading && paginatedProducts.length > 0 && (
        <>
          {/* Products */}
          {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                  isCompared={comparedIds.includes(product.id)}
                  onCompareChange={() =>
                    dispatch(toggleCompare(product.id))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                  isCompared={comparedIds.includes(product.id)}
                  onCompareChange={() =>
                    dispatch(toggleCompare(product.id))
                  }
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="hover:cursor-pointer"
                    onClick={() => setPage(Math.max(1, page - 1))}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        className="hover:cursor-pointer"
                        isActive={page === pageNumber}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  )
                })}

                <PaginationItem>
                  <PaginationNext
                    className="hover:cursor-pointer"
                    onClick={() =>
                      setPage(Math.min(totalPages, page + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      {/* Compare Modal */}

      <CompareModal open={open} onClose={() => setOpen(false)} products={compareProducts} />
    </div>
  )
}

export default HomePage
