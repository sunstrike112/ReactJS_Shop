/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'

import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Image, TextPrimary } from '../../../../components'
import LessonLayout from '../lesson-layout'
import { WrapperPDF, LeftPDF, ContentPDF, ListPDF } from './styled'
import { PLUS, MINUS, CORNER_OUT } from '../../../../assets'
import { LESSON_TYPE } from '../../../../constants'
import { getFileFromS3 } from '../../../../utils'

const LessonPDF = ({
  courseDetail,
  lessonDetail,
  submitLesson,
  courseId,
  lessonId,
  countViewUnit,
  isLoading,
  historyId
}) => {
  const sliderRef = useRef()
  const slideImageRef = useRef()
  const refImage = useRef()

  const [currentPdf, setCurrentPdf] = useState(0)
  const [isToggle, setIsToggle] = useState(true)

  const next = () => {
    if (currentPdf + 1 < lessonDetail?.images.length) {
      setCurrentPdf(currentPdf + 1)
      sliderRef.current.scrollBy(0, slideImageRef.current.offsetHeight)
    }
  }

  const previous = () => {
    if (currentPdf > 0) {
      setCurrentPdf(currentPdf - 1)
      sliderRef.current.scrollBy(0, -slideImageRef.current.offsetHeight)
    }
  }
  const [isFullScreen, setIsFullScreen] = useState(false)
  const handle = useFullScreenHandle()

  const handleFullScreen = (resetTransform) => {
    if (!isFullScreen) {
      setIsFullScreen(true)
      handle.enter()
    } else {
      setIsFullScreen(false)
      handle.exit()
      resetTransform()
    }
  }

  const handleEsc = (event) => {
    switch (event.keyCode) {
      case 39: return next()
      case 38: return previous()
      case 37: return previous()
      case 40: return next()
      default: return null
    }
  }

  useEffect(() => {
    countViewUnit({ courseId, lessonId, typeUnit: LESSON_TYPE.LESSON })
  }, [lessonId])

  useEffect(() => {
    if (refImage && refImage.current) {
      refImage.current.scrollIntoView(true, { block: 'start', inline: 'nearest' })
    }
    if (lessonDetail && lessonDetail?.images && currentPdf === lessonDetail?.images.length - 1 && historyId) {
      submitLesson()
    }
    window.scrollTo(0, 0)

    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [currentPdf, historyId])

  const numberPdf = useMemo(() => {
    if (lessonDetail && lessonDetail?.images && lessonDetail?.images.length) {
      return `${currentPdf + 1}/${lessonDetail?.images.length}`
    }
    return ''
  }, [currentPdf])

  const handleSelectPdf = useCallback((index) => {
    setCurrentPdf(index)
    if (index < currentPdf) {
      sliderRef.current.scrollBy(0, -slideImageRef.current.offsetHeight)
    } else {
      sliderRef.current.scrollBy(0, slideImageRef.current.offsetHeight)
    }
  }, [currentPdf])

  return (
    <LessonLayout
      description={false}
      courseDetail={courseDetail}
      lessonDetail={lessonDetail}
      submitLesson={submitLesson}
      isLoading={isLoading}
      isToggle={isToggle}
      setIsToggle={setIsToggle}
    >
      <WrapperPDF>
        <div className="numberPdf">
          <TextPrimary className="text" fontWeight="fw_600">{numberPdf}</TextPrimary>
        </div>
        <LeftPDF ref={sliderRef} aria-hidden="true">
          {
            lessonDetail && lessonDetail?.images && lessonDetail?.images.length > 0 && lessonDetail?.images.map((image, index) => (
              <ListPDF key={index} id={index} currentpdf={currentPdf === index}>
                <Image onClick={() => handleSelectPdf(index)} src={getFileFromS3(image)} ref={slideImageRef} />
                <TextPrimary fontWeight="fw_600">{index + 1}</TextPrimary>
              </ListPDF>
            ))
          }
        </LeftPDF>
        {lessonDetail && lessonDetail?.images && lessonDetail?.images.length > 0 && (
          <ContentPDF isFullScreen={isFullScreen}>
            <TransformWrapper wheel={{ disabled: 'true' }}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <FullScreen
                  handle={handle}
                  onChange={(state) => {
                    if (!state) {
                      setIsFullScreen(false)
                      handle.exit()
                      resetTransform()
                    }
                  }}
                >
                  <div className="current-container">
                    <TransformComponent>
                      <Image
                        className="current-pdf"
                        ref={refImage}
                        src={getFileFromS3(lessonDetail?.images[currentPdf])}
                      />
                    </TransformComponent>
                    <div className="action">
                      <div aria-hidden="true" onClick={() => zoomIn()} className="box">
                        <Image src={PLUS} />
                      </div>
                      <div aria-hidden="true" onClick={() => zoomOut()} className="box">
                        <Image src={MINUS} />
                      </div>
                      <div aria-hidden="true" onClick={() => handleFullScreen(resetTransform)} className="box">
                        <Image src={CORNER_OUT} />
                      </div>
                    </div>
                  </div>
                </FullScreen>
              )}
            </TransformWrapper>
          </ContentPDF>
        )}
        <div className="course-info">
          <TextPrimary className="lesson-name" fontWeight="fw_600" fontSize="size_24">{lessonDetail?.unitName}</TextPrimary>
          <TextPrimary color="grey">{lessonDetail?.unitDetails}</TextPrimary>
        </div>
      </WrapperPDF>
    </LessonLayout>
  )
}
export default LessonPDF
