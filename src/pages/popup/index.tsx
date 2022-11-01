import { createRoot } from 'react-dom/client'

import { HandlesProvider } from './store'

import './index.css'
import Popup from './Popup'

const root = createRoot(document.querySelector('#app') as HTMLElement)
root.render(
  <HandlesProvider>
    <Popup />
  </HandlesProvider>
)
