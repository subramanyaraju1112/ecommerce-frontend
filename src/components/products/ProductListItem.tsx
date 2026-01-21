import type { Product } from "@/types"
import { formatCurrency } from "@/utils/format"
import ProductRating from "./ProductRating"
import StockBadge from "./StockBadge"
import { Card, CardContent } from "../ui/card"
import { Checkbox } from "../ui/checkbox"

type Props = {
  product: Product
  onSelect: () => void
  isCompared: boolean
  onCompareChange: () => void
}

const ProductListItem: React.FC<Props> = ({
  product,
  onSelect,
  isCompared,
  onCompareChange,
}) => {
  return (
    <Card className="hover:shadow-sm transition relative">
      {/* Compare checkbox */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          checked={isCompared}
          onCheckedChange={onCompareChange}
          aria-label="Compare product"
        />
      </div>

      <CardContent
        className="flex gap-4 p-4 cursor-pointer"
        onClick={onSelect}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-28 w-28 object-contain shrink-0"
        />

        <div className="flex-1">
          <h3 className="font-semibold line-clamp-2">
            {product.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {product.brand}
          </p>

          <div className="mt-2">
            <ProductRating rating={product.rating} />
          </div>

          <div className="mt-3 flex items-center gap-4">
            <span className="font-bold">
              {formatCurrency(product.price)}
            </span>
            <StockBadge stock={product.stock} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductListItem
