import { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../styling/AudioPlayer.css'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config/smartConfig'
import { useWriteContract, useConnection, useReadContract } from 'wagmi'
import '../styling/pageThree.css'

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


  // Set current track for music player
  const [currentTrack, setCurrentTrack] = useState(0)
  

  // Count seconds played per song
  const [artistOneSeconds, setArtistOneSeconds] = useState(0)
  const [artistTwoSeconds, setArtistTwoSeconds] = useState(0)
  const [artistThreeSeconds, setArtistThreeSeconds] = useState(0)


  // Wagmi
  const { address, isConnected } = useConnection()
  const writeContract  = useWriteContract()


  // Change track
  const handleClickPrevious = () => {

    if (currentTrack === 0) {

      setCurrentTrack(playlist.length - 1)

    } else {

      setCurrentTrack(currentTrack - 1)

    }
  }

  const handleClickNext = () => {

    if (currentTrack === playlist.length - 1) {

      setCurrentTrack(0)

    } else {

      setCurrentTrack(currentTrack + 1)

    }
  }

  // Listeningtime per artist
  const handleListeningTime = () => {

    if (currentTrack === 0) {

      setArtistOneSeconds(artistOneSeconds + 1)

    } else if (currentTrack === 1) {

      setArtistTwoSeconds(artistTwoSeconds + 1)

    } else if (currentTrack === 2) {

      setArtistThreeSeconds(artistThreeSeconds + 1)

    }
  }

  // Send seconds played to smart contract
  const handlePaymentToArtists = () => {

    const listeningSeconds = [
      BigInt(artistOneSeconds),
      BigInt(artistTwoSeconds),
      BigInt(artistThreeSeconds)
    ]

    console.log('Paying out based on seconds:', listeningSeconds)

     writeContract.mutate({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'payoutToArtists',
      args: [listeningSeconds]
    })

  }


  // Get subscription info
  const subscription = useReadContract({

    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'subscriptions',
    args: address ? [address] : undefined,

  })


  return (

    <div className="page-three-wrapper">
      
      <div className="listening-time">

        <h2>Listening Time</h2>
        
        <ul>
          <li>{playlist[0].artist}: {artistOneSeconds} seconds</li>
          <li>{playlist[1].artist}: {artistTwoSeconds} seconds</li>
          <li>{playlist[2].artist}: {artistThreeSeconds} seconds</li>
        </ul>
        
      </div>

      {subscription.data?.[0] && (
        <button className="simulate-payout-button" onClick={handlePaymentToArtists} disabled={!isConnected}>
          Simulate Payment To Artists
        </button>
      )}

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
    </div>
  )
}

export default PageThree