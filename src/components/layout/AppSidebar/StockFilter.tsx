import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type StockOption = {
    id: string
    label: string
}

type Props = {
    options: StockOption[]
    selected: string[]
    onToggle: (id: string) => void
}

const StockFilter: React.FC<Props> = ({ options, selected, onToggle }) => (
    <div className="space-y-3">
        <h3 className="font-medium">Stock Status</h3>
        {options.map((option) => (
            <div key={option.id} className="flex gap-2">
                <Checkbox checked={selected.includes(option.id)} onCheckedChange={() => onToggle(option.id)} />
                <Label>{option.label}</Label>
            </div>
        ))}
    </div>
)

export default StockFilter
