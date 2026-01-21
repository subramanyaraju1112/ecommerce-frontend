
import { Button } from "@/components/ui/button"
import { AlertTriangle, RotateCcw } from "lucide-react"

type Props = {
    error?: Error
    resetErrorBoundary?: () => void
}

const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
    return (
        <div
            role="alert"
            aria-live="assertive"
            className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center px-6"
        >
            <AlertTriangle className="h-10 w-10 text-destructive" />

            <h2 className="text-xl font-semibold">
                Something went wrong
            </h2>

            <p className="text-sm text-muted-foreground max-w-md">
                We ran into an unexpected problem while loading this page.
                Please try again.
            </p>

            {error?.message && (
                <pre className="mt-2 max-w-md overflow-auto rounded bg-muted px-3 py-2 text-xs text-muted-foreground">
                    {error.message}
                </pre>
            )}

            <div className="flex gap-3 mt-4">
                <Button
                    variant="default"
                    onClick={resetErrorBoundary}
                    className="flex items-center gap-2"
                >
                    <RotateCcw className="h-4 w-4" />
                    Retry
                </Button>

                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </Button>
            </div>
        </div>
    )
}

export default ErrorFallback
