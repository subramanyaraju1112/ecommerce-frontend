import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { clearCompare } from "@/redux/features/compare/compareSlice"
  import { useDispatch } from "react-redux"
  import type { Product } from "@/types"
  
  type Props = {
    open: boolean
    onClose: () => void
    products: Product[]
  }
  
  const CompareModal: React.FC<Props> = ({ open, onClose, products }) => {
    const dispatch = useDispatch()
  
    const limitedProducts = products.slice(0, 3)
  
    // 👇 dynamic column count
    const gridCols =
      limitedProducts.length === 1
        ? "md:grid-cols-1"
        : limitedProducts.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3"
  
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-6xl"
          aria-label="Compare products dialog"
        >
          <DialogHeader>
            <DialogTitle>Compare Products</DialogTitle>
            <DialogDescription>
              Below are the products comparison
            </DialogDescription>
          </DialogHeader>
  
          {/* Comparison grid */}
          <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
            {limitedProducts.map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="h-40 w-full object-contain"
                />
  
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.brand}
                </p>
  
                <p className="font-medium">₹{p.price}</p>
                <p>Rating: {p.rating}</p>
                <p>Stock: {p.stock}</p>
              </div>
            ))}
          </div>
  
          {/* Footer */}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
  
            <Button
              variant="destructive"
              onClick={() => {
                dispatch(clearCompare())
                onClose()
              }}
            >
              Clear
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default CompareModal
  