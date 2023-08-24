import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Empty } from 'antd'
import moment from 'moment'
import { useSeminar } from '../../hooks'
import HomeLayout from '../layouts/home'
import { Container, Image, TextPrimary } from '../../components'
import Wrapper, { SeminarBox, SeminarListWrapper } from './styled'
import { CALENDAR, EMPTY_COURSE } from '../../assets'
import { formatTime, handleDayOfWeek } from '../../utils/utils'
import { DetailModal } from './components'
import { FULL_DATE_TIME } from '../../utils/date'
import { getFileFromS3 } from '../../utils'

const SeminarList = () => {
  const { t } = useTranslation()
  const { seminars, seminar: seminarDetail, getSeminars, getSeminarDetail, removeSeminar, isHaveData } = useSeminar()

  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(async () => {
    await getSeminars()
  }, [])

  const handleOpenPopup = async (seminarId) => {
    await getSeminarDetail(seminarId)
    setIsOpenModal(true)
  }

  const checkIsEmptySeminar = (seminarList) => {
    let lastSeminar = seminarList.result.sort((a, b) => a.endTime - b.endTime).slice(-1)
    return lastSeminar[0] && lastSeminar[0].endTime >= moment().valueOf()
  }

  const generateSeminar = (seminarsList) => (
    <SeminarListWrapper>
      { checkIsEmptySeminar(seminarsList) && (
        <>
          <div className="time">
            <CALENDAR />
            <TextPrimary fontSize="size_14" fontWeight="fw_600">
              <span className="calendar">
                {formatTime(seminarsList.time, 'MM/DD')} {t(handleDayOfWeek(formatTime(seminarsList.time, 'E')))}
              </span>
            </TextPrimary>
          </div>

          <div className="seminar-list">
            {seminarsList.result.sort((a, b) => a.startTime - b.startTime).map((seminar) => (
              <>
                {seminar.endTime >= moment().valueOf() && (
                <>
                  <SeminarBox onClick={() => handleOpenPopup(seminar.seminarId)}>
                    <div className="seminar-box">
                      <div className="seminar-box-time">
                        <TextPrimary className="seminar_time" fontSize="size_14" fontWeight="fw_600">
                          {`${formatTime(seminar.startTime, FULL_DATE_TIME)} -`}&nbsp;
                        </TextPrimary>
                        <TextPrimary className="seminar_time" fontSize="size_14" fontWeight="fw_600">
                          {`${formatTime(seminar.endTime, FULL_DATE_TIME)}`}
                        </TextPrimary>
                      </div>
                      <Image className="seminar_cover" src={getFileFromS3(seminar.imagePath)} />
                      <TextPrimary className="seminar_title" fontSize="size_16" fontWeight="fw_600">
                        {seminar.seminarTitle}
                      </TextPrimary>
                    </div>
                  </SeminarBox>
                </>
                )}
              </>
            ))}
          </div>
        </>
      )}
    </SeminarListWrapper>
  )
  return (
    <HomeLayout>
      <Wrapper>
        <Container>
          <div className="top">
            <div className="seminar-content">
              <div className={`seminar-block ${!seminars.length || !isHaveData ? 'is-empty' : ''}`}>
                {seminars.length && isHaveData ? seminars.map((seminar) => generateSeminar(seminar)) : <Empty image={EMPTY_COURSE} description={t('common.no_seminar')} />}
              </div>
            </div>
          </div>
          <DetailModal
            isModalVisible={isOpenModal}
            setIsModalVisible={setIsOpenModal}
            seminar={seminarDetail}
            removeSeminar={removeSeminar}
          />
        </Container>
      </Wrapper>
    </HomeLayout>
  )
}

export default SeminarList
