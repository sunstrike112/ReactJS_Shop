/* eslint-disable react/prop-types */
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'react-i18next'

import ReactAudioPlayer from 'react-audio-player'
import Image from '../image'
import { TextNormal } from '../text'
import Video from '../video'
import { Wrapper } from './styles'
import { getFileFromS3 } from '../../utils'

const Media = ({ urlSocial = [] }) => urlSocial.map((media) => {
  if (media.type === 'IMAGE') {
    return <Image key={media.socialPath} src={getFileFromS3(media.socialPath)} alt="question_image" />
  }

  if (media.type === 'MP4') {
    return <Video key={media.socialPath} src={getFileFromS3(media.socialPath)} />
  }

  if (media.type === 'MP3') {
    return (
      <ReactAudioPlayer
        key={media.socialPath}
        src={getFileFromS3(media.socialPath)}
        controls
        className="audio"
      />
    )
  }

  return null
})
const Question = ({
  currentNumber,
  questions,
  isRequired,
  isInCorrectAnswer,
  className
}) => {
  const { t } = useTranslation()
  const html = questions?.questionName
  const renderColorQuestion = () => {
    switch (isInCorrectAnswer) {
      case true:
        return 'error'
      case false:
        return 'green'
      default:
        return 'primary'
    }
  }
  const renderBgQuestion = () => {
    switch (isInCorrectAnswer) {
      case true:
        return 'rgba(231, 76, 60, 0.1)'
      case false:
        return 'rgba(7, 207, 132, 0.1)'
      default:
        return 'rgba(43, 85, 239, 0.1)'
    }
  }
  return (
    <Wrapper className={className} isInCorrectAnswer={isInCorrectAnswer}>
      <div className="question-header">
        <div className="question-number" style={{ background: renderBgQuestion() }}>
          <TextNormal fontWeight="fw_600" color={renderColorQuestion()}>{currentNumber + 1}</TextNormal>
        </div>
        {isRequired
          && (
            <div className="question-block">
              <TextNormal fontWeight="fw_600" color="yellow">{t('common.required')}</TextNormal>
            </div>
          )}
      </div>
      <div className="question-title">
        {ReactHtmlParser(html, {
          decodeEntities: true
        })}
      </div>
      <Media
        urlSocial={questions?.urlSocial || []}
      />
    </Wrapper>
  )
}
export default Question
