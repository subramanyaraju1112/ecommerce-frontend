export type RatingFilter = "all" | "4+" | "3+"

export type RatingOption = {
  value: RatingFilter
  label: string
  stars: number
}

export const RATING_OPTIONS: RatingOption[] = [
  { value: "4+", label: "4+ stars", stars: 4 },
  { value: "3+", label: "3+ stars", stars: 3 },
  { value: "all", label: "All", stars: 0 },
]
