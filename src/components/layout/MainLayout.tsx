import { useState } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import { Menu, X } from "lucide-react"

import Header from "./Header"
import Sidebar from "./AppSidebar/Sidebar"

import type { SortKey } from "@/types"

const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [view, setView] = useState<"grid" | "list">("grid")
    const [searchParams, setSearchParams] = useSearchParams()

    const sort = (searchParams.get("sort") as SortKey) ?? "price-asc"

    const setSort = (value: SortKey) => {
        searchParams.set("sort", value)
        setSearchParams(searchParams)
    }

    const search = searchParams.get("q") ?? ""

    const setSearch = (value: string) => {
        const params = new URLSearchParams(searchParams)

        if (value.trim()) {
            params.set("q", value)
        } else {
            params.delete("q")
        }

        setSearchParams(params)
    }

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="border-b flex items-center">
                {/* Mobile hamburger */}
                <button
                    className="md:hidden p-4"
                    onClick={() => setIsSidebarOpen(true)}
                    aria-label="Open filters"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className="flex-1">
                    <Header
                        view={view}
                        onViewChange={setView}
                        sort={sort}
                        onSortChange={setSort}
                        search={search}
                        onSearchChange={setSearch} />
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop sidebar */}
                <aside className="hidden md:block shrink-0">
                    <Sidebar />
                </aside>

                {/* Mobile sidebar (FULL SCREEN) */}
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md md:hidden"
                            onClick={() => setIsSidebarOpen(false)}
                        />

                        {/* Sidebar panel */}
                        <aside className="fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm bg-background md:hidden flex flex-col shadow-xl">
                            {/* Header aligned to sidebar width */}
                            <div className="shrink-0 sticky top-0 z-50 flex justify-end px-4 py-3 border-b bg-background">
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    aria-label="Close filters"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Scrollable content */}
                            <div className="flex-1 min-h-0 overflow-hidden">
                                <Sidebar />
                            </div>
                        </aside>
                    </>
                )}

                {/* Main content */}
                <main className="flex-1 overflow-auto">
                    <div className="w-full max-w-7xl p-4">
                        <Outlet context={{ view, sort, search }} />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default MainLayout
