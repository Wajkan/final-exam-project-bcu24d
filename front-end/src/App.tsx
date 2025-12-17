import { RouterProvider } from 'react-router-dom'
import { Router } from './Router'

import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './config/wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


function App() {

    return ( 
    
    <WagmiProvider config={ wagmiConfig }>

        <QueryClientProvider client={ queryClient }>

            <RouterProvider router={ Router } />

        </QueryClientProvider>

    </WagmiProvider>

    )
}

export default App
