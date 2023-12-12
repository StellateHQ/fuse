import React from 'react'
import ReactDOM from 'react-dom/client'
import { createClient, Provider } from 'fuse/client'
import App from './App.tsx'
import './index.css'

const client = createClient({
  url: 'http://localhost:4000/graphql',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
)
