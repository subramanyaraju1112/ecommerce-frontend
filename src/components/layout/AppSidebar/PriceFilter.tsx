import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
    priceRange: [number, number]
    minPriceInput: string
    maxPriceInput: string
    onSliderChange: (value: [number, number]) => void
    onMinChange: (value: string) => void
    onMaxChange: (value: string) => void
}

const PriceFilter: React.FC<Props> = ({
    priceRange,
    minPriceInput,
    maxPriceInput,
    onSliderChange,
    onMinChange,
    onMaxChange,
}) => (
    <div className="space-y-3">
        <h3 className="font-medium">Price Range</h3>
        <Slider value={priceRange} onValueChange={onSliderChange} max={1500} min={0} step={10} />
        <div className="flex gap-2">
            <div className="flex-1 flex flex-col gap-1">
                <Label>Min</Label>
                <Input value={minPriceInput} onChange={(e) => onMinChange(e.target.value)} />
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <Label>Max</Label>
                <Input value={maxPriceInput} onChange={(e) => onMaxChange(e.target.value)} />
            </div>
        </div>
    </div>
)

export default PriceFilter
