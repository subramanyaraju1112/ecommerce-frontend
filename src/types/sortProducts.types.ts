import type { Product } from "@/types"
import type { SortKey } from "@/types"

export const sortProducts = (
  products: Product[],
  sort: SortKey
): Product[] => {
  const sorted = [...products]

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)

    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating)

    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating)

    case "name-asc":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      )

    case "name-desc":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      )

    default:
      return sorted
  }
}
