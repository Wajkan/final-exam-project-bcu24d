import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../styling/AudioPlayer.css'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/smartConfig'
import { useWriteContract, useConnection } from 'wagmi'

interface Track {

  src: string
  title: string
  artist: string

}

const playlist: Track[] = [
  {
    src: '/audio/Burgundy-Chances.mp3',
    title: 'Chances',
    artist: 'Burgundy'
  },
  {
    src: '/audio/Dagored-Happiness-In-My-Soul.mp3',
    title: 'Dagored',
    artist: 'Happiness In My Soul'
  },
  {
    src: '/audio/Moavii-Foreign.mp3',
    title: 'Foreign',
    artist: 'Moavii'
  }
]


const PageThree = () => {


  const [ currentTrack, setCurrentTrack ] = useState( 0 );

  const [ listeningTime, setListeningTime ] = useState( [0, 0, 0] );  // Artist 1 , 2 , 3 

  const { address, isConnected } = useConnection();
  const { data: hash, writeContract } = useWriteContract();
  // const writeContract = useWriteContract();


  // CONTROLLER SETTINGS
  const handleClickPrevious = () => {

    setCurrentTrack((prev) => 
      prev === 0 ? playlist.length - 1 : prev - 1
    )

  }

  const handleClickNext = () => {
    
    setCurrentTrack((prev) => 
      (prev + 1) % playlist.length
    )

  }

  // LISTENING TIME CALCULATIONS
  const handleListeningTime = () => {
    
    setListeningTime(playtimeCount => {

      const newPlaytime = [...playtimeCount]
      
      newPlaytime [ currentTrack ] = newPlaytime [ currentTrack ] + 1
      
      return newPlaytime;
    
    })

  };


    const calculateListeningTimeModulus = () => {

      const total = listeningTime.reduce(( sum, time ) => sum + time, 0)

      if (total === 0) return [ 0, 0, 0 ]
      
      return listeningTime.map(time => Math.round((time / total) * 100))

    }

  console.log('Listening Time:', listeningTime) 

  // HANDLE PAYOUT TO ARTISTS

  console.log('Transaction hash:', hash)


  const handlePaymentToArtists = () => {

    const payoutPercentage = calculateListeningTimeModulus()

    const payoutPercentageAsBigInt = payoutPercentage.map(p => BigInt(p)) 

    console.log('Paying out:', payoutPercentageAsBigInt)
  
    writeContract({

      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'payoutToArtists',
      args: [payoutPercentageAsBigInt]
      
    })
  }


  return (
    <>
  
<div>

 <h2>Listening Time</h2>
  
    <ul>

      {playlist.map((track, index) => (

      <li key= { index }>
      
        { track.artist } : {listeningTime[ index ]} seconds ({calculateListeningTimeModulus()[index]}%);
      
      </li>

      ))}

  </ul>

</div>

<button 
  onClick={handlePaymentToArtists}
  disabled={!isConnected}
>
  End Subscription
</button>


      
      <AudioPlayer
        src={playlist[currentTrack].src}
        header={`${playlist[currentTrack].artist} - ${playlist[currentTrack].title}`}
        showSkipControls
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        autoPlayAfterSrcChange={false}
        listenInterval={1000}
        onListen={handleListeningTime}
      />


{hash && (
  <div>
    <p>Transaction: {hash}</p>
  </div>
)}


    
 
  </>
  )
}

export default PageThree