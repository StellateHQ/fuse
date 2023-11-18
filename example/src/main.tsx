import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider, cacheExchange, createClient, fetchExchange } from 'urql'

const client = createClient({
  url: 'http://localhost:4000/graphql',
  exchanges: [cacheExchange, fetchExchange],
  suspense: true,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <Suspense fallback={<p>Loading...</p>}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>,
)
