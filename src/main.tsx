import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'assets/css/index.css'

import { StoreProvider } from './store';
import { RouletteProvider } from './roulette';
import App from './App.tsx'


import { registerSW } from './utils/pwa-utils';

registerSW();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <RouletteProvider>
        <App />
      </RouletteProvider>
    </StoreProvider>
  </StrictMode>,
)
