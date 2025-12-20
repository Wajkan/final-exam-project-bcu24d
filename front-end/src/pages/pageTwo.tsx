import { useReadContract } from "wagmi"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../config/smartConfig"

const PageTwo = () => {
  
  const result = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getArtists',

  });
  
    console.log('Artists:', result.data)
  
  return (
    <div>
      
      <h1>Registed Artists</h1>

      <ul>

        {result.data?.map(( artist, index ) => (

          <li key = { index }>
            
            Artist { index } :  {artist}
          
          </li>

        ))}
      </ul>

    </div>

  )
}

export default PageTwo