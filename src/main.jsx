import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import { AppProvider } from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'

createRoot(document.getElementById('root')).render(
  <AppProvider i18n={{}}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
)
