/* eslint-disable no-undef */
/* eslint-disable no-console */
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectSaga, useInjectReducer } from 'Stores'
import { isSafari } from 'Utils'
import saga from 'Modules/course/recording/store/saga'
import reducer from 'Modules/course/recording/store/reducer'
import {
  uploadRecording,
  getFolderRecording,
  checkExistFileName
} from 'Modules/course/recording/store/actions'
import {
  makeSelectUploadSuccess,
  makeParentFolderId,
  makeSelectLoading,
  makeSelectIsExistFileName
} from 'Modules/course/recording/store/selectors'
import { delay } from 'lodash'

const isObject = (o) => o && !Array.isArray(o) && Object(o) === o

const validateMediaTrackConstraints = (mediaType) => {
  let supportedMediaConstraints = null

  if (navigator.mediaDevices) {
    supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints()
  }

  if (supportedMediaConstraints === null) {
    return
  }

  let unSupportedMediaConstraints = Object.keys(mediaType).filter(
    (constraint) => !supportedMediaConstraints[constraint]
  )

  if (unSupportedMediaConstraints.length !== 0) {
    let toText = unSupportedMediaConstraints.join(',')
    console.error(
      `The following constraints ${toText} are not supported on this browser.`
    )
  }
}

export const useMediaRecorder = ({
  blobOptions,
  mediaRecorderOptions,
  mediaStreamConstraints = {}
}) => {
  const mediaChunks = useRef([])
  const mediaStream = useRef(null)
  const mediaRecorder = useRef(null)
  const webcamStream = useRef(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [isStartRecording, setIsStartRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(null)
  const [mediaFile, setMediaFile] = useState(null)

  async function getSeekableBlob(inputBlob) {
    if (typeof EBML === 'undefined') {
      throw new Error('Please link: https://cdn.webrtc-experiment.com/EBML.js')
    }
    const reader = new EBML.Reader()
    const decoder = new EBML.Decoder()
    const { tools } = EBML
    const fileReader = new FileReader()
    await fileReader.readAsArrayBuffer(inputBlob)
    fileReader.onloadend = function () {
      const validEmlType = ['m', 'u', 'i', 'f', 's', '8', 'b', 'd']
      const ebmlElms = decoder.decode(this.result)
      const elms = ebmlElms?.filter((elm) => validEmlType.includes(elm.type))
      elms.forEach((element) => {
        reader.read(element)
      })
      reader.stop()
      const refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues)
      const body = this.result.slice(reader.metadataSize)
      const newBlob = new Blob([refinedMetadataBuf, body], {
        type: 'video/mp4'
      })
      const file = new File([newBlob], 'video.mp4', { type: 'video/mp4', lastModified: new Date().getTime() })
      setMediaFile(file)
    }
  }
  const onClear = () => {
    setMediaFile(null)
    setCurrentTime(null)
    setIsStartRecording(false)
    setStatus('idle')
    setError(null)
    mediaChunks.current = []
    mediaRecorder.current = null
    mediaStream.current = null
    webcamStream.current = null
  }

  const handleStop = () => {
    const blobPropertyBag = {
      type: 'video/mp4',
      ...blobOptions
    }
    const blob = new Blob(mediaChunks.current, blobPropertyBag)
    if (isSafari) {
      const file = new File([blob], 'video.mp4', { type: 'video/mp4', lastModified: new Date().getTime() })
      setMediaFile(file)
    } else {
      getSeekableBlob(blob)
    }
    setStatus('stopped')
  }

  const checkExistCamera = async () => {
    const enumerateDevices = await window.navigator.mediaDevices.enumerateDevices()
    return enumerateDevices.some((deviceInfo) => deviceInfo.kind === 'videoinput')
  }

  const checkExistMicro = async () => {
    const enumerateDevices = await window.navigator.mediaDevices
      .enumerateDevices()
    return enumerateDevices.some((deviceInfo) => deviceInfo.kind === 'audioinput')
  }

  const handleMediaDataAvailable = (e) => {
    if (e.data) {
      mediaChunks.current.push(e.data)
    }
  }
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop()
      mediaRecorder.current.removeEventListener(
        'dataavailable',
        handleMediaDataAvailable
      )
      mediaRecorder.current.removeEventListener('stop', handleStop)
      mediaRecorder.current = null
      setStatus('stopped')
    }
    if (!mediaRecorder.current) {
      setMediaFile(null)
      setCurrentTime(null)
      setIsStartRecording(false)
      setStatus('idle')
      setError(null)
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach((track) => track.stop())
      mediaStream.current = null
      mediaChunks.current = []
    }

    if (webcamStream.current) {
      webcamStream.current.getTracks().forEach((track) => track.stop())
      webcamStream.current = null
    }
  }
  function startRecording() {
    if (error) {
      setError(null)
    }

    setStatus('acquiring_media')
    checkExistCamera().then((isExistCamera) => {
      checkExistMicro().then((isExistMicro) => {
        window.navigator.mediaDevices.getUserMedia({
          ...mediaStreamConstraints,
          audio: isExistMicro
        })
          .then((streamOfWebcam) => {
            window.navigator.mediaDevices.getDisplayMedia({
              ...mediaStreamConstraints
            })
              .then((stream) => {
                mediaStream.current = stream
                if (isExistCamera) {
                  if (isExistMicro) {
                    streamOfWebcam
                      .getAudioTracks()
                      .forEach((audioTrack) => stream.addTrack(audioTrack))
                    webcamStream.current = streamOfWebcam
                  } else {
                    webcamStream.current = streamOfWebcam
                  }
                } else if (isExistMicro && !isExistCamera) {
                  streamOfWebcam
                    .getAudioTracks()
                    .forEach((audioTrack) => stream.addTrack(audioTrack))
                  webcamStream.current = streamOfWebcam
                }
              }).then(() => {
                setStatus('ready')
                setIsStartRecording(true)
              })
              .catch(() => {
                onClear()
              })
          })
          .catch(() => {
            window.navigator.mediaDevices.getDisplayMedia({
              ...mediaStreamConstraints
            })
              .then((stream) => {
                mediaStream.current = stream
              }).then(() => {
                setStatus('ready')
                setIsStartRecording(true)
              })
              .catch(() => {
                onClear()
              })
          })
      })
    })
  }

  useEffect(() => {
    if (isStartRecording) {
      setCurrentTime(3)
    }
  }, [isStartRecording])

  useEffect(() => {
    if (isStartRecording) {
      const interval = setInterval(() => {
        setCurrentTime((times) => (times <= 0 ? 0 : times - 1))
      }, 1000)
      return () => clearInterval(interval)
    }
    return () => { }
  }, [currentTime, isStartRecording])

  useEffect(() => {
    if (currentTime === 0 && isStartRecording && mediaStream.current) {
      delay(async () => {
        mediaChunks.current = []
        if (mediaStream && mediaStream.current) {
          mediaRecorder.current = await new MediaRecorder(mediaStream.current)
          mediaRecorder.current.addEventListener(
            'dataavailable',
            handleMediaDataAvailable
          )
          mediaRecorder.current.addEventListener('stop', handleStop)
          mediaRecorder.current.start()
          setStatus('recording')
          setIsStartRecording(false)
          setCurrentTime(null)
        }
      }, 100)
    }
  }, [currentTime, mediaStream.current, isStartRecording])

  useEffect(() => {
    if (mediaStream && mediaStream.current && mediaStream.current.getVideoTracks) {
      mediaStream.current.getVideoTracks()[0].addEventListener('ended', stopRecording)
    }
    return () => {
      if (mediaStream && mediaStream.current && mediaStream.current.getVideoTracks) {
        mediaStream.current.getVideoTracks()[0].removeEventListener('ended', stopRecording)
      }
    }
  }, [mediaStream.current])

  useEffect(() => {
    if (!window.MediaRecorder) {
      throw new ReferenceError(
        'MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.'
      )
    }

    if (!window.navigator.mediaDevices.getDisplayMedia) {
      throw new ReferenceError(
        'This browser does not support screen capturing'
      )
    }

    if (isObject(mediaStreamConstraints.video)) {
      validateMediaTrackConstraints(mediaStreamConstraints.video)
    }

    if (isObject(mediaStreamConstraints.audio)) {
      validateMediaTrackConstraints(mediaStreamConstraints.audio)
    }

    if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
      if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
        console.error(
          'The specified MIME type supplied to MediaRecorder is not supported by this browser.'
        )
      }
    }
  }, [mediaStreamConstraints, mediaRecorderOptions])

  return {
    error,
    status,
    stopRecording,
    startRecording,
    get liveStream() {
      if (mediaStream.current) {
        return new MediaStream(mediaStream.current.getVideoTracks())
      }
      return null
    },
    get webcam() {
      if (webcamStream.current) {
        return new MediaStream(webcamStream.current.getVideoTracks())
      }
      return null
    },
    checkExistCamera,
    currentTime,
    isStartRecording,
    mediaFile,
    onClear
  }
}

export const useRecording = () => {
  useInjectSaga({ key: 'recording', saga })
  useInjectReducer({ key: 'recording', reducer })
  const dispatch = useDispatch()
  const uploadRecord = (payload) => dispatch(uploadRecording(payload))
  const getFolderId = () => dispatch(getFolderRecording())

  const isUploadSuccess = useSelector(makeSelectUploadSuccess())
  const parentFolderId = useSelector(makeParentFolderId())

  const isLoading = useSelector(makeSelectLoading())
  const isExistFileName = useSelector(makeSelectIsExistFileName())

  return {
    uploadRecord,
    isUploadSuccess,
    getFolderId,
    parentFolderId,
    isLoading,
    checkExistFileName: (payload) => dispatch(checkExistFileName(payload)),
    isExistFileName
  }
}
