import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

type Category = {
    id: string
    label: string
    count: number
}

type Props = {
    categories: Category[]
    selected: string[]
    onToggle: (id: string) => void
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onToggle }) => (
    <div className="space-y-3">
        <h3 className="font-medium">Categories</h3>
        {categories.map((category) => (
            <div key={category.id} className="flex justify-between">
                <div className="flex gap-2">
                    <Checkbox checked={selected.includes(category.id)} onCheckedChange={() => onToggle(category.id)} />
                    <Label>{category.label}</Label>
                </div>
                <span className="text-xs text-muted-foreground">({category.count})</span>
            </div>
        ))}
    </div>
)

export default CategoryFilter
