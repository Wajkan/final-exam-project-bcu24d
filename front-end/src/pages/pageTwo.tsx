import { useReadContract, useBalance } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/smartConfig"
import { formatEther } from "viem"
import '../styling/pageTwo.css'

const PageTwo = () => {

  // Get all registered artists from contract
  const result = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getArtists',

  })

  
  // Get their balances to display
  const artistOneBalance = useBalance({

    address: result.data?.[0]

  })

  const artistTwoBalance = useBalance({

    address: result.data?.[1]

  })

  const artistThreeBalance = useBalance({

    address: result.data?.[2]

  })

  console.log('Artists:', result.data)
  
  return (
  
  <div className="page-two-wrapper">

    <div className="artist-list">

    <ul>

      <h2>Registered Artists</h2>

      {result.data?.map((artist, index) => (

        <li key={index}>
          Artist {index}: {artist}
        </li>

      ))}

    </ul>

    </div>

    <div className="accountbalances-list">  

    <h2>Balances</h2>

    <ul>

      <li>Artist 0: {artistOneBalance.data ? formatEther(artistOneBalance.data.value) : 'reading balance...'} ETH</li>
      <li>Artist 1: {artistTwoBalance.data ? formatEther(artistTwoBalance.data.value) : 'reading balance...'} ETH</li>
      <li>Artist 2: {artistThreeBalance.data ? formatEther(artistThreeBalance.data.value) : 'reading balance...'} ETH</li>

    </ul>

    </div>

  </div>
  )
}

export default PageTwo