type Props = {
    stock: number
}

const StockBadge: React.FC<Props> = ({ stock }) => {
    if (stock === 0) {
        return (
            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">
                Out of Stock
            </span>
        )
    }

    if (stock < 20) {
        return (
            <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                Low Stock
            </span>
        )
    }

    return (
        <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
            In Stock
        </span>
    )
}

export default StockBadge
