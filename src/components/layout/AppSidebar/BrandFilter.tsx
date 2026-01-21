import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"


type Brand = {
    id: string
    label: string
    count: number
}

type Props = {
    brands: Brand[]
    search: string
    onSearch: (value: string) => void
    selected: string[]
    onToggle: (id: string) => void
}

const BrandFilter: React.FC<Props> = ({ brands, search, onSearch, selected, onToggle }) => (
    <div className="space-y-3">
        <h3 className="font-medium">Brands</h3>
        <Input placeholder="Search..." value={search} onChange={(e) => onSearch(e.target.value)} />
        <ScrollArea className="max-h-64">
            {brands.map((brand) => (
                <div key={brand.id} className="flex justify-between">
                    <div className="py-1 flex gap-2">
                        <Checkbox checked={selected.includes(brand.id)} onCheckedChange={() => onToggle(brand.id)} />
                        <Label>{brand.label}</Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                </div>
            ))}
        </ScrollArea>
    </div>
)

export default BrandFilter
