// src/components/error/ErrorBoundary.tsx
import { Component, type ReactNode } from "react"

type Props = {
    children: ReactNode
}

type State = {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                    <h2 className="text-lg font-semibold">
                        Something went wrong
                    </h2>
                    <button
                        className="underline text-sm"
                        onClick={() => window.location.reload()}
                    >
                        Reload page
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
