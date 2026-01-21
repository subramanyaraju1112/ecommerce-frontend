import { Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/layout"
import { HomePage } from "./pages"
import { Provider } from "react-redux"
import { store } from "./redux/app/store"
import ErrorBoundary from "./components/error/ErrorBoundary"

function App() {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<ErrorBoundary>
          <MainLayout />
        </ErrorBoundary>}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Provider>

  )
}

export default App
