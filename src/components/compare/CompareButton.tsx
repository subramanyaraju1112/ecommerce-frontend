import type { RootState } from "@/redux/app/store"
import { useSelector } from "react-redux"
import { Button } from "../ui/button"

const CompareButton = ({ onClick }: { onClick: () => void }) => {
    const count = useSelector((s: RootState) => s.compare.ids.length)

    return (
        <Button
            variant="outline"
            disabled={count < 2}
            onClick={onClick}
        >
            Compare ({count})
        </Button>
    )
}

export default CompareButton