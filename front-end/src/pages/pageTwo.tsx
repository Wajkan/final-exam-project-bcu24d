import { useReadContract, useBalance } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/smartConfig"
import { formatEther } from "viem"
import '../styling/pageTwo.css'

const PageTwo = () => {

  // Get all registered artists from contract
  const result = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'viewAllRegisteredArtists',

  })

  
  // Get their balances to display
  const artistOneBalance = useBalance({

    address: result.data?.[0]?.wallet

  })

  const artistTwoBalance = useBalance({

    address: result.data?.[1]?.wallet

  })

  const artistThreeBalance = useBalance({

    address: result.data?.[2]?.wallet

  })

  console.log('Artists:', result.data)
  
  return (
  
  <div className="page-two-wrapper">

    <div className="artist-list">

    <ul>

      <h2>Registered Artists</h2>

      {result.data?.map((artist, index) => (
            
            <li key={index}>

               <div>
                
                  <p>Artist Name: {artist.name}</p>
                  <p>Wallet: {artist.wallet}</p>
                  <p>Total Earnings: {formatEther(artist.totalAmountEarned)} ETH</p>

               </div>
              
            </li> 

      ))}

    </ul>

    </div>

    <div className="accountbalances-list">  

    <h2>Balances</h2>

      <ul>

          <li>
            {result.data?.[0]?.name}: {artistOneBalance.data ? formatEther(artistOneBalance.data.value) : 'reading...'} ETH
          </li>

          <li>
            {result.data?.[1]?.name}: {artistTwoBalance.data ? formatEther(artistTwoBalance.data.value) : 'reading...'} ETH
          </li>

          <li>
            {result.data?.[2]?.name}: {artistThreeBalance.data ? formatEther(artistThreeBalance.data.value) : 'reading...'} ETH
          </li>

      </ul>

    </div>

  </div>
  )
}

export default PageTwo