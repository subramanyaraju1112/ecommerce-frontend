import { useEffect, useState } from "react"
import { Check, ChevronDown, LayoutGrid, List, Search, X } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

import { SORT_OPTIONS } from "@/types"
import type { SortKey } from "@/types"

type Props = {
    view: "grid" | "list"
    onViewChange: (v: "grid" | "list") => void

    sort: SortKey
    onSortChange: (s: SortKey) => void

    search: string
    onSearchChange: (value: string) => void
}


const Header: React.FC<Props> = ({
    view,
    onViewChange,
    sort,
    onSortChange,
    search,
    onSearchChange,
}) => {
    const [value, setValue] = useState(search)
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        setValue(search)
    }, [search])

    // Debounced search (300ms)
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(value)
            setIsSearching(false)
        }, 300)

        return () => clearTimeout(timer)
    }, [value])

    const handleClear = () => {
        setValue("")
        onSearchChange("")
    }

    return (
        <header className="p-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold italic">Market</h1>
            <div className="flex gap-2 items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1 border rounded px-3 py-2 text-sm">
                        Sort
                        <ChevronDown size={16} />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        {SORT_OPTIONS.map((option) => (
                            <DropdownMenuItem
                                key={option.value}
                                onClick={() => onSortChange(option.value)}
                                className="flex items-center justify-between"
                            >
                                {option.label}
                                {sort === option.value && <Check size={14} />}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="hidden md:block w-full max-w-2xl">
                    <InputGroup className="max-w-2xl">
                        <InputGroupInput
                            placeholder="Search products..."
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                                setIsSearching(true)
                            }}
                        />

                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>

                        {value && (
                            <InputGroupAddon
                                onClick={handleClear}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <X size={18} />
                            </InputGroupAddon>
                        )}

                        <InputGroupAddon align="inline-end">
                            {isSearching ? "Searching..." : ""}
                        </InputGroupAddon>
                    </InputGroup>
                </div>
                <div className="flex border rounded-md overflow-hidden shrink-0">
                    <button
                        onClick={() => onViewChange("grid")}
                        className={`p-2 transition hover:cursor-pointer ${view === "grid"
                            ? "bg-gray-400 text-white"
                            : "hover:bg-gray-100"
                            }`}
                        aria-label="Grid view"
                    >
                        <LayoutGrid size={18} />
                    </button>

                    <button
                        onClick={() => onViewChange("list")}
                        className={`p-2 transition hover:cursor-pointer ${view === "list"
                            ? "bg-gray-400 text-white"
                            : "hover:bg-gray-100"
                            }`}
                        aria-label="List view"
                    >
                        <List size={18} />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header