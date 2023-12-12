import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider, cacheExchange, fetchExchange } from 'urql'
import App from './App.tsx'
import './index.css'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  suspense: true,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
