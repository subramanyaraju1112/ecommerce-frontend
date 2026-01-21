export type SortKey =
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc"
  | "name-asc"
  | "name-desc"

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Rating: Low to High", value: "rating-asc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
]
