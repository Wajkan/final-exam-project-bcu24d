// import { useState } from 'react'
// import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css'
// import '../styling/AudioPlayer.css'


// interface Track {

//   src: string
//   title: string
//   artist: string

// }

// const playlist: Track[] = [
//   {
//     src: '/audio/Burgundy-Chances.mp3',
//     title: 'Chances',
//     artist: 'Burgundy'
//   },
//   {
//     src: '/audio/Dagored-Happiness-In-My-Soul.mp3',
//     title: 'Dagored',
//     artist: 'Happiness In My Soul'
//   },
//   {
//     src: '/audio/Moavii-Foreign.mp3',
//     title: 'Foreign',
//     artist: 'Moavii'
//   }
// ]


// const MusicPlayer = () => {


//   const [ currentTrack, setCurrentTrack ] = useState( 0 );

//   const [ listeningTime, setListeningTime ] = useState( [0, 0, 0] );  // Artist 1 , 2 , 3 


//   const handleClickPrevious = () => {

//     setCurrentTrack((prev) => 
//       prev === 0 ? playlist.length - 1 : prev - 1
//     )

//   }

//   const handleClickNext = () => {
    
//     setCurrentTrack((prev) => 
//       (prev + 1) % playlist.length
//     )

//   }

//   const handleListeningTime = () => {
    
//     setListeningTime(playtimeCount => {

//       const newPlaytime = [...playtimeCount]
      
//       newPlaytime [ currentTrack ] = newPlaytime [ currentTrack ] + 1
      
//       return newPlaytime;
    
//     })

//   };

//   console.log('Listening Time:', listeningTime) 


//   return (

  
      
//       <AudioPlayer
//         src={playlist[currentTrack].src}
//         header={`${playlist[currentTrack].artist} - ${playlist[currentTrack].title}`}
//         showSkipControls
//         onClickPrevious={handleClickPrevious}
//         onClickNext={handleClickNext}
//         onEnded={handleClickNext}
//         autoPlayAfterSrcChange={false}
//         listenInterval={1000}
//         onListen={handleListeningTime}
//       />
    
 

//   )
// }

// export default MusicPlayer