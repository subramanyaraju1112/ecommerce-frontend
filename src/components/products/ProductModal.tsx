import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ProductRating from "@/components/products/ProductRating"
import type { Product } from "@/types"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import { toggleCompare } from "@/redux/features/compare/compareSlice"
import type { RootState } from "@/redux/app/store"

type Props = {
  product: Product | null
  open: boolean
  onClose: () => void
}

const ProductModal: React.FC<Props> = ({ product, open, onClose }) => {
  const dispatch = useDispatch()
  const compareIds = useSelector((s: RootState) => s.compare.ids)

  if (!product) return null

  const isCompared = compareIds.includes(product.id)

  const handleCompare = () => {
    if (!isCompared && compareIds.length >= 3) {
      toast.error("You can compare a maximum of 3 products", {
        duration: 4000,
      })
      return
    }

    dispatch(toggleCompare(product.id))

    toast.success(
      isCompared
        ? "Product removed from comparison"
        : "Product added to comparison",
      { duration: 4000 }
    )

    onClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent
        aria-label={`Details for ${product.title}`}
        className="
          max-w-5xl p-0 overflow-hidden
          data-[state=open]:animate-in
          data-[state=closed]:animate-out
          data-[state=open]:fade-in-0
          data-[state=closed]:fade-out-0
          data-[state=open]:zoom-in-95
          data-[state=closed]:zoom-out-95
          duration-300
        "
      >
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-xl font-semibold">
            {product.title}
          </DialogTitle>
          <DialogDescription>
            Detailed information about the selected product
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="flex items-center justify-center bg-muted rounded-lg p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="max-h-[420px] w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <ProductRating rating={product.rating} />
              {product.reviews?.length ? (
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              ) : null}
            </div>

            {/* Price */}
            <div className="text-3xl font-bold">
              ₹{product.price}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-2 text-sm">
              {product.brand && (
                <Badge variant="secondary">
                  Brand: {product.brand}
                </Badge>
              )}
              <Badge variant="outline">
                Category: {product.category}
              </Badge>
            </div>

            {/* Stock */}
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">
                  In Stock · {product.stock} available
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* CTA */}
            <div className="mt-auto pt-4">
              <Button
                className="w-full"
                variant={isCompared ? "outline" : "default"}
                onClick={handleCompare}
              >
                {isCompared ? "Remove from Compare" : "Add to Compare"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal
