import { useWriteContract, useConnection} from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/smartConfig'

const PageOne = () => {
  
  const { isConnected } = useConnection();
  const  writeContract  = useWriteContract();

  const handleSubscribe = () => {

    writeContract.mutate(
      {
        
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'subscribe',
        value: parseEther('0.02'),

      },
      {
        onSuccess: (data) => {

          console.log('Transaction sent!', data)

        },
        onError: (error) => {

          console.log('Transaction failed!', error)

        }
      }
    )
  }


  return (
    <div>

      <h1>Please Subscribe to my  music platform</h1>
      
      <button onClick={handleSubscribe} disabled={!isConnected}>

        Subscribe (0.02 ETH)

      </button>

      {!isConnected && <p>Please connect your wallet first</p>}

    </div>

  )
}

export default PageOne