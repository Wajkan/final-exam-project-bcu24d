import { useWriteContract, useConnection, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/smartConfig'

const PageOne = () => {
  

  const { address, isConnected } = useConnection();
  const  writeContract  = useWriteContract();

  
  const result = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasActiveSubscription',
    args: address ? [address] : undefined,

  });


  
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

          <h1>Subscribe</h1>

          {!isConnected && <p>Please connect your wallet first</p>}
                
          {result.data ? (

            <button>Subscription Active ✅</button>

          ) : (

            <button onClick={handleSubscribe} disabled={!isConnected}>

              Subscribe (0.02 ETH)

            </button>

          )}

    </div>

  )
}

export default PageOne