import { useEffect, useMemo, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

import ActiveFilter from "./ActiveFilter"
import CategoryFilter from "./CategoryFilter"
import PriceFilter from "./PriceFilter"
import RatingFilterSection from "./RatingFilterSection"
import StockFilter from "./StockFilter"
import BrandFilter from "./BrandFilter"

import { RATING_OPTIONS } from "@/types"

import { useGetProductsQuery } from "@/redux/features/products/productsApi"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/redux/app/store"
import {
    setCategories,
    setBrands,
    setStock,
    setRating,
    setPriceRange,
    clearAllFilters,
} from "@/redux/features/filters/filtersSlice"
import throttle from "@/utils/throttle"

const Sidebar: React.FC = () => {
    const dispatch = useDispatch()
    const filters = useSelector((state: RootState) => state.filters)

    const { data } = useGetProductsQuery(undefined)
    const products = data?.products ?? []
    const totalCount = products.length


    /* ---------- TOP 5 CATEGORIES ---------- */
    const categories = useMemo(() => {
        const map = new Map<string, number>()
        products.forEach((p) => {
            map.set(p.category, (map.get(p.category) ?? 0) + 1)
        })
        return Array.from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id, label: id, count }))
    }, [products])

    /* ---------- TOP 5 BRANDS ---------- */
    const allBrands = useMemo(() => {
        const map = new Map<string, number>()
        products.forEach((p) => {
            if (!p.brand) return
            map.set(p.brand, (map.get(p.brand) ?? 0) + 1)
        })
        return Array.from(map.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id, label: id, count }))
    }, [products])

    /* ---------- BRAND SEARCH (LOCAL UI STATE) ---------- */
    const [brandSearch, setBrandSearch] = useState("")
    const filteredBrands = useMemo(
        () =>
            allBrands.filter((b) =>
                b.label.toLowerCase().includes(brandSearch.toLowerCase())
            ),
        [allBrands, brandSearch]
    )

    /* ---------- PRICE ---------- */
    const priceBounds = useMemo<[number, number]>(() => {
        if (!products.length) return [0, 0]
        const prices = products.map((p) => p.price)
        return [Math.min(...prices), Math.max(...prices)]
    }, [products])

    const [minPriceInput, setMinPriceInput] = useState(String(priceBounds[0]))
    const [maxPriceInput, setMaxPriceInput] = useState(String(priceBounds[1]))

    useEffect(() => {
        if (!products.length) return
        dispatch(setPriceRange(priceBounds))
        setMinPriceInput(String(priceBounds[0]))
        setMaxPriceInput(String(priceBounds[1]))
    }, [priceBounds, products.length, dispatch])

    /* ---------- OPTIONS ---------- */
    const stockOptions = [
        { id: "in-stock", label: "In Stock" },
        { id: "low-stock", label: "Low Stock" },
        { id: "out-of-stock", label: "Out of Stock" },
    ]

    /* ---------- ACTIVE FILTER COUNT ---------- */
    const activeFilterCount = useMemo(() => {
        return (
            filters.categories.length +
            filters.brands.length +
            filters.stock.length +
            (filters.rating !== "all" ? 1 : 0) +
            (filters.priceRange[0] !== priceBounds[0] ||
                filters.priceRange[1] !== priceBounds[1]
                ? 1
                : 0)
        )
    }, [filters, priceBounds])

    const filteredCount = useMemo(() => {
        let result = [...products]

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
            const minRating =
                filters.rating === "4+" ? 4 :
                    filters.rating === "3+" ? 3 : 0

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

        return result.length
    }, [
        products,
        filters.categories,
        filters.brands,
        filters.priceRange,
        filters.rating,
        filters.stock,
    ])

    const clampPriceRange = (range: [number, number]): [number, number] => [
        Math.max(priceBounds[0], range[0]),
        Math.min(priceBounds[1], range[1]),
    ]

    const throttledSetPriceRange = useMemo(
        () =>
            throttle((range: [number, number]) => {
                dispatch(setPriceRange(clampPriceRange((range))))
            }, 200),
        [dispatch]
    )


    return (
        <aside className="w-full md:w-[280px] lg:w-[300px] h-full flex flex-col bg-background md:border-r border-r-0">
            {/* Active Filters - Above sidebar content */}
            <ActiveFilter
                activeFilterCount={activeFilterCount}
                selectedCategories={filters.categories}
                selectedBrands={filters.brands}
                selectedStock={filters.stock}
                selectedRating={filters.rating}
                priceRange={filters.priceRange}
                categories={categories}
                brands={allBrands}
                stockOptions={stockOptions}
                onRemoveCategory={(id) =>
                    dispatch(setCategories(filters.categories.filter((x) => x !== id)))
                }
                onRemoveBrand={(id) =>
                    dispatch(setBrands(filters.brands.filter((x) => x !== id)))
                }
                onRemoveStock={(id) =>
                    dispatch(setStock(filters.stock.filter((x) => x !== id)))
                }
                onRemoveRating={() => dispatch(setRating("all"))}
                onClearPrice={() => dispatch(setPriceRange(priceBounds))}
            />


            {/* Header */}
            <div className="p-4 md:p-6 pb-0 shrink-0">
                <h2 className="text-lg font-semibold mb-1">Filters</h2>
                <p className="text-sm text-muted-foreground">Showing {filteredCount}/{totalCount}</p>
            </div>

            {/* Scrollable filter content */}
            <div className="flex-1 min-h-0">
                <ScrollArea className="h-full">
                    <div className="p-4 md:p-6 space-y-6">
                        <CategoryFilter
                            categories={categories}
                            selected={filters.categories}
                            onToggle={(id) =>
                                dispatch(
                                    setCategories(
                                        filters.categories.includes(id)
                                            ? filters.categories.filter((x) => x !== id)
                                            : [...filters.categories, id]
                                    )
                                )
                            }
                        />


                        <PriceFilter
                            priceRange={filters.priceRange}
                            minPriceInput={minPriceInput}
                            maxPriceInput={maxPriceInput}
                            onSliderChange={throttledSetPriceRange}
                            onMinChange={setMinPriceInput}
                            onMaxChange={setMaxPriceInput}
                        />

                        <RatingFilterSection
                            options={RATING_OPTIONS}
                            selected={filters.rating}
                            onChange={(v) => dispatch(setRating(v))}
                        />

                        <StockFilter
                            options={stockOptions}
                            selected={filters.stock}
                            onToggle={(id) =>
                                dispatch(
                                    setStock(
                                        filters.stock.includes(id)
                                            ? filters.stock.filter((x) => x !== id)
                                            : [...filters.stock, id]
                                    )
                                )
                            }
                        />

                        <BrandFilter
                            brands={filteredBrands}
                            search={brandSearch}
                            onSearch={setBrandSearch}
                            selected={filters.brands}
                            onToggle={(id) =>
                                dispatch(
                                    setBrands(
                                        filters.brands.includes(id)
                                            ? filters.brands.filter((x) => x !== id)
                                            : [...filters.brands, id]
                                    )
                                )
                            }
                        />
                    </div>
                </ScrollArea>
            </div>


            {/* Clear All - Fixed at bottom */}
            <div className="shrink-0 p-4 border-t" >
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => dispatch(clearAllFilters())}
                >
                    Clear All Filters
                </Button>
            </div >
        </aside >
    )
}

export default Sidebar