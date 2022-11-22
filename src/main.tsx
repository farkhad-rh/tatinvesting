import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { Routing } from '@components/routing'

import '@styles/tailwind.css'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <RecoilRoot>
      <Router>
        <Routing />
      </Router>
    </RecoilRoot>
  </StrictMode>
)
