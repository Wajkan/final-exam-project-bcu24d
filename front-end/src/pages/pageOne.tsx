import { useWriteContract, useConnection, useReadContract } from 'wagmi'
import { parseEther } from 'viem'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/smartConfig'
import '../styling/pageOne.css'

const PageOne = () => {
  
  // Wagmi
  const { address, isConnected } = useConnection();
  const  writeContract  = useWriteContract();


  // Confirm a user has a active subscription
  const subscription = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'subscriptions',
    args: address ? [address] : undefined,

  })


  // Format the date
  const formatDate = (timestamp: any) => {

    if (!timestamp) {
      return 'no timestamp found'
    }

    const date = new Date(Number(timestamp) * 1000)

    return date.toLocaleString()

  }


  // Confirm Subscription
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

  // console.log(subscription.data)


return (

<div className='page-one-wrapper'>

      <h1>Subscribe</h1>

      {!isConnected && <p>Please connect your wallet first</p>}
            
    {subscription.data?.[0] ? (

        <div className='subscription-confirmed-wrapper'>
          
          <button className="subscription-active-button">
            Subscription Active ✅
          </button>
          
          <div className="subscription-details">

            <h2>Subscription Details</h2>
            <p>Wallet: {address}</p>
            <p>Expires: {formatDate(subscription.data?.[2])}</p>


          </div>

        </div>

        ) : (

        <button className="subscribe-button" onClick={handleSubscribe} disabled={!isConnected}>
          Subscribe (0.02 ETH)
        </button>

      )}

    </div>
  )
}

export default PageOne