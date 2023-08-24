/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-multi-assign */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default (props) => {
  const videoRef = React.useRef(null)
  const playerRef = React.useRef(null)
  const { options, onReady, tracks = [], ...rest } = props

  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current
      if (!videoElement) return

      const player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player)
      })
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [options, videoRef])

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        player.dispose()
        // playerRef.current = null
      }
    }
  }, [playerRef])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-big-play-centered" {...rest}>
        {tracks.map((trackInfo) => (
          <track {...trackInfo} />
        ))}
      </video>
    </div>
  )
}
