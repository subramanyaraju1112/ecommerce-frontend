import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import StarRating from "@/components/ui/star-rating"

import type { RatingFilter, RatingOption } from "@/types"

type Props = {
  options: RatingOption[]
  selected: RatingFilter
  onChange: (value: RatingFilter) => void
}

const RatingFilterSection: React.FC<Props> = ({
  options,
  selected,
  onChange,
}) => (
  <div className="space-y-3">
    <h3 className="font-medium">Rating</h3>

    <RadioGroup value={selected} onValueChange={onChange}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <RadioGroupItem value={option.value} />
          <Label className="flex items-center gap-2">
            {option.label}
            {option.stars > 0 && <StarRating rating={option.stars} />}
          </Label>
        </div>
      ))}
    </RadioGroup>
  </div>
)

export default RatingFilterSection
