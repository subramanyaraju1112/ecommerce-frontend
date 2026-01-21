import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader className="p-3">
        <Skeleton className="h-40 w-full rounded-md" />
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-4 w-24" />
      </CardContent>
    </Card>
  )
}

export default ProductCardSkeleton
