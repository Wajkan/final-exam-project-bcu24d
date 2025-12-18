import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Router'

import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from './config/wagmi'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


function App() {

    return ( 
    
    <WagmiProvider config={ wagmiConfig }>

        <QueryClientProvider client={ queryClient }>

            <RouterProvider router={ router } />

        </QueryClientProvider>

    </WagmiProvider>

    )
}

export default App
