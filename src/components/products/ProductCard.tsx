import { useState } from "react"
import type { Product } from "@/types"
import { formatCurrency } from "@/utils/format"
import ProductRating from "./ProductRating"
import StockBadge from "./StockBadge"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import { Checkbox } from "../ui/checkbox"

type Props = {
    product: Product
    onSelect: () => void
    isCompared: boolean
    onCompareChange: () => void
}

const ProductCard: React.FC<Props> = ({
    product,
    onSelect,
    isCompared,
    onCompareChange,
}) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <Card className="hover:shadow-md transition relative">
            {/* Compare checkbox */}
            <div
                className="absolute top-2 right-2 z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <Checkbox
                    checked={isCompared}
                    onCheckedChange={onCompareChange}
                    aria-label="Compare product"
                />
            </div>

            {/* Clickable area */}
            <div onClick={onSelect} className="cursor-pointer">
                <CardHeader className="p-3 relative">
                    {!imageLoaded && (
                        <Skeleton className="absolute inset-0 h-40 w-full rounded-md" />
                    )}

                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        className={`h-40 w-full object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </CardHeader>

                <CardContent className="p-3 pt-0 space-y-2">
                    <h3 className="text-sm font-semibold line-clamp-2">
                        {product.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                        {product.brand}
                    </p>

                    <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">
                            {formatCurrency(product.price)}
                        </span>
                        <StockBadge stock={product.stock} />
                    </div>

                    <ProductRating rating={product.rating} />
                </CardContent>
            </div>
        </Card>
    )
}

export default ProductCard
