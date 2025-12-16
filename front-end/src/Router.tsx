import { createBrowserRouter } from 'react-router-dom'

import PageOne from './pages/pageOne'
import PageTwo from './pages/pageTwo'
import PageThree from './pages/pageThree'

import Layout from './components/Layout'

// Routing

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/pageone",
        element: <PageOne />
      },
      {
        path: "/pagetwo", 
        element: <PageTwo />
      },
      {
        path: "/pagethree",
        element: <PageThree />
      },
    ]
  }
])