/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react'
import { Modal as ModalAntd, Spin } from 'antd'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { CALENDAR_ICON, CLOSE, PASSWORD_ICON } from '../../../../assets'
import { Image, PrimaryButton, TextPrimary, TextSecondary } from '../../../../components'
import { formatTime } from '../../../../utils/utils'
import { MEDIA_WIDTHS } from '../../../../themes'
import { FULL_DATE_TIME } from '../../../../utils/date'
import { getFileFromS3 } from '../../../../utils'

const ModalWrapper = styled(ModalAntd)`
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  width: 40%!important;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: calc(100vw - 16px)!important;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    width: 60%!important;
  }
  .ant-modal-close-x {
    padding-top: 32px;
    height: auto;
    width: auto;
    padding-right: 32px;
    line-height: 0;
  }
  .ant-modal-content {
    border-radius: 12px;
  }
  .ant-modal-header {
    border-radius: 12px 12px 0 0;
    padding: 32px 32px 0 32px;
    border: none;
    width: 95%;
  }
.ant-modal-title {
    font-size: 20px
  }
  .ant-modal-body {
    padding: 20px;
  }
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    justify-content: center;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      flex-wrap: wrap;
    }
    .seminar-cover {
      width: 55%;
      margin-right: 32px;
      img {
        object-fit: cover;
        width: 100%;
        height: 160px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToVeryLager}px) {
        width: 45%;
        margin-right: 5px;
      }
      @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        width: 100%;
        margin-right: 0px;
        margin-bottom: 32px;
      }
    }
    .time_box {
      display: flex;
      width: 65%;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
        width: 100%;
        margin-right: 0px;
      }
      flex-direction: column;
      .time {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-bottom: 24px;
        .date {
          display: flex;
          align-items: center;
          p {
            color: ${({ theme }) => theme.progress_success};
          }
        }
        .seminar_time {
          display: flex;
          align-items: center;
          p {
            color: ${({ theme }) => theme.yellow};
          }
        }
      }
      .password {
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        p {color: #838383;}
      }
      .join_in_btn {
        border-radius: 4px;
        &:disabled {
          background: #ccc;
        }
      }
    }
  }

  button:disabled,
    button[disabled] {
    background-color: #d4c8c8;
    color: #666666;
    pointer-events: none;
  }
`

const DetailModal = ({
  isModalVisible,
  setIsModalVisible,
  seminar = null,
  removeSeminar
}) => {
  const { t } = useTranslation()
  const openLink = () => {
    window.open(seminar?.link, '_blank')
  }

  const checkInSeminarTime = (startTime, endTime) => startTime < moment().valueOf() && endTime > moment().valueOf()

  const handleDeleteSeminar = () => {
    removeSeminar()
  }

  return (
    <ModalWrapper
      visible={isModalVisible}
      footer={null}
      destroyOnClose
      centered
      title={seminar?.title}
      closeIcon={<CLOSE onClick={() => setIsModalVisible(false)} />}
      className="detail-modal"
      afterClose={() => handleDeleteSeminar()}
    >
      { seminar ? (
        <>
          <div className="top">
            {seminar?.imagePath && (
              <div className="seminar-cover">
                <Image src={getFileFromS3(seminar?.imagePath)} />
              </div>
            )}
            <div className="time_box">
              <div className="time">
                <div className="seminar_time">
                  <CALENDAR_ICON style={{ marginRight: 8 }} />
                  <TextPrimary fontSize="size_14" fontWeight="fw_600">
                    {`${formatTime(seminar?.startTime, FULL_DATE_TIME)} - ${formatTime(seminar?.endTime, FULL_DATE_TIME)}`}
                  </TextPrimary>
                </div>
              </div>
              {seminar?.password && (
                <div className="password">
                  <PASSWORD_ICON style={{ marginRight: 8 }} />
                  <TextPrimary fontSize="size_14" fontWeight="fw_600">
                    {seminar?.password}
                  </TextPrimary>
                </div>
              )}
              <PrimaryButton disabled={!checkInSeminarTime(seminar?.startTime, seminar?.endTime)} onClick={openLink} className="join_in_btn" title={t('seminar.join_in')} />
            </div>
          </div>
          <div className="description">
            <TextSecondary>
              <div dangerouslySetInnerHTML={{ __html: seminar?.description }} />
            </TextSecondary>
          </div>
        </>
      ) : (
        <div className="top" style={{ marginBottom: 0 }}>
          <Spin size="large" />
        </div>
      )}
    </ModalWrapper>
  )
}
export default DetailModal
