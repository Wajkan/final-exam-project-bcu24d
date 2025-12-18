import { createBrowserRouter } from 'react-router-dom'

import Home from '../pages/Home'
import PageOne from '../pages/pageOne'
import PageTwo from '../pages/pageTwo'
import PageThree from '../pages/pageThree'

import Layout from '../components/Layout'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,     
        element: <Home />
      },
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