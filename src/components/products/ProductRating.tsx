import { Star } from "lucide-react"

type Props = {
  rating: number
}

const ProductRating: React.FC<Props> = ({ rating }) => {
  const rounded = Math.round(rating)

  return (
    <div className="flex items-center gap-1 text-sm">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rounded
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

export default ProductRating
