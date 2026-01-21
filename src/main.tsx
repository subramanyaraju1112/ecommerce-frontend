import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/error/ErrorBoundary.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/app/store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>

    <Toaster position="top-right" richColors />
  </StrictMode>,
)
