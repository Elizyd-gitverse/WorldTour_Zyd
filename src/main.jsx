import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>

     {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}

      <App />
      <Toaster 
         position='top-center' 
         gutter={12} 
         containerStyle={{margin: '12px'}}
         toastOptions={{
          success: {
            duration: 3000
          },

          error: {
            duration: 5000
          },

          style: {
            fontSize: '11px',
            padding: '12px 7px',
            color: 'var(--color-dark--0)',
            backgroundColor: 'var(--color-brand--1)'
          }
         }}
         />
    </QueryClientProvider>
  </React.StrictMode>,
)
