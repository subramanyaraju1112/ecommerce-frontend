import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

type Category = { id: string; label: string }
type Brand = { id: string; label: string }
type StockOption = { id: string; label: string }

type Props = {
  activeFilterCount: number
  selectedCategories: string[]
  selectedBrands: string[]
  selectedStock: string[]
  selectedRating: string
  priceRange: [number, number]
  categories: Category[]
  brands: Brand[]
  stockOptions: StockOption[]
  onRemoveCategory: (id: string) => void
  onRemoveBrand: (id: string) => void
  onRemoveStock: (id: string) => void
  onRemoveRating: () => void
  onClearPrice: () => void
}

const ActiveFilter: React.FC<Props> = ({
  activeFilterCount,
  selectedCategories,
  selectedBrands,
  selectedStock,
  selectedRating,
  priceRange,
  categories,
  brands,
  stockOptions,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveStock,
  onRemoveRating,
  onClearPrice,
}: Props) => {
  if (activeFilterCount === 0) return null

  return (
    <div className="p-4 border-b bg-muted/50 shrink-0">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Active Filters</span>
        <Badge variant="secondary">{activeFilterCount}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedCategories.map((id) => {
          const c = categories.find((x) => x.id === id)
          return (
            <Badge key={id} variant="outline" className="gap-1">
              {c?.label}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onRemoveCategory(id)} />
            </Badge>
          )
        })}

        {selectedBrands.map((id) => {
          const b = brands.find((x) => x.id === id)
          return (
            <Badge key={id} variant="outline" className="gap-1">
              {b?.label}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onRemoveBrand(id)} />
            </Badge>
          )
        })}

        {selectedStock.map((id) => {
          const s = stockOptions.find((x) => x.id === id)
          return (
            <Badge key={id} variant="outline" className="gap-1">
              {s?.label}
              <X className="w-3 h-3 cursor-pointer" onClick={() => onRemoveStock(id)} />
            </Badge>
          )
        })}

        {selectedRating !== "all" && (
          <Badge variant="outline" className="gap-1">
            {selectedRating} stars
            <X className="w-3 h-3 cursor-pointer" onClick={onRemoveRating} />
          </Badge>
        )}

        {(priceRange[0] > 0 || priceRange[1] < 1500) && (
          <Badge variant="outline" className="gap-1">
            ${priceRange[0]} - ${priceRange[1]}
            <X className="w-3 h-3 cursor-pointer" onClick={onClearPrice} />
          </Badge>
        )}
      </div>
    </div>
  )
}

export default ActiveFilter
