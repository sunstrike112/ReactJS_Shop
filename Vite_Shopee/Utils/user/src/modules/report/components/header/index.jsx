/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react'

import { useTranslation } from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'
import { Header, Divider, Row } from '../../styled'
import { TextNormal, Image, ClickAble } from '../../../../components'
import { FILE } from '../../../../assets'
import { dateFormat, getFileFromS3 } from '../../../../utils'
import { REPORT_STATUS } from '../../constants'

const ReportHeader = ({
  nameReport,
  overview,
  imageOverview,
  status = REPORT_STATUS.RESUBMITTED,
  dateSubmit,
  point = 0,
  evaluate = '',
  fileAttachOverview = [],
  fileAttachFeedback = []
}) => {
  const { t } = useTranslation()

  const downloadEmployeeData = (item) => {
    fetch(getFileFromS3(item.socialPath), {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*'
      }
    })
      .then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]))
          const link = document.createElement('a')
          link.href = url
          const fileType = item.socialPath.split('.')
          const fileNameDownloaded = `${item.fileName ? item.fileName : `${new Date().getTime()}.${fileType[fileType?.length - 1]}`}`
          link.setAttribute('download', fileNameDownloaded)
          document.body.appendChild(link)
          link.click()
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const renderFileAttachOverview = useMemo(() => {
    if (fileAttachOverview && fileAttachOverview?.length > 0) {
      return fileAttachOverview.map((item) => (
        <ClickAble
          key={item.fileName}
          className="file mr_40"
          onClick={() => downloadEmployeeData(item)}
          download
        >
          <FILE />
          <span>{item.fileName}</span>
        </ClickAble>
      ))
    }
    return null
  }, [fileAttachOverview])
  const renderFileAttachFeedback = useMemo(() => {
    if (fileAttachFeedback && fileAttachFeedback?.length > 0) {
      return fileAttachFeedback.map((item, index) => (
        <ClickAble
          key={index}
          className="file mr_12"
          onClick={() => downloadEmployeeData(item)}
          download
        >
          <FILE />
          <span>{item.fileName ? item.fileName : t('report.download')}</span>
        </ClickAble>
      ))
    }
    return null
  }, [fileAttachFeedback])
  const renderUIFromStatus = () => {
    if (status === REPORT_STATUS.SUBMITTED || status === REPORT_STATUS.WAITING_FOR_RELEASE) {
      return (
        <>
          <Divider />
          <Row>
            <TextNormal fontSize="size_18" color="text_primary">
              {t('report.date_submit')}
            </TextNormal>
            <TextNormal fontSize="size_18" color="text_primary" fontWeight="bold">
              {dateFormat(dateSubmit)}
            </TextNormal>
          </Row>
        </>
      )
    }
    if (status === REPORT_STATUS.EVALUATION_COMPLETED) {
      return (
        <>
          <Divider />
          <Row>
            <TextNormal fontSize="size_18" color="text_primary">
              {t('report.date_submit')}
            </TextNormal>
            <TextNormal fontSize="size_18" color="text_primary" fontWeight="bold">
              {dateFormat(dateSubmit)}
            </TextNormal>
          </Row>
          {point !== null && (
            <Row>
              <TextNormal fontSize="size_18" color="text_primary">
                {t('report.total_score')}
              </TextNormal>
              <TextNormal fontSize="size_18" color="success" fontWeight="bold">

                {point !== null && t('report.point', { point })}
              </TextNormal>
            </Row>
          )}
          {evaluate && (
            <Row>
              <TextNormal fontSize="size_18" color="text_primary">
                {t('report.evaluate')}
              </TextNormal>
            </Row>
          )}
          {evaluate && (
            <Row background="bg_notify_box" style={{ wordBreak: 'break-all' }} padding={evaluate ? '16px' : '30px'} marginTop="12px">
              <TextNormal style={{ whiteSpace: 'pre-line' }} fontSize="size_18" color="text_primary">
                {ReactHtmlParser(evaluate, {
                  decodeEntities: true
                })}
              </TextNormal>
            </Row>
          )}
          {!!fileAttachFeedback?.length && (
            <Row>
              <TextNormal fontSize="size_18" color="text_primary">
                {t('report.result_explanation_file')}
              </TextNormal>
              <div>
                {renderFileAttachFeedback}
              </div>
            </Row>
          )}
        </>
      )
    }

    if (status === REPORT_STATUS.RESUBMITTED) {
      return (
        <>
          <Divider />
          <Row>
            <TextNormal fontSize="size_18" color="text_primary">
              {t('report.date_submit')}
            </TextNormal>
            <TextNormal fontSize="size_18" color="text_primary" fontWeight="bold">
              {dateFormat(dateSubmit)}
            </TextNormal>
          </Row>
          <Row>
            <TextNormal fontSize="size_18" color="text_primary">
              {t('report.total_score')}
            </TextNormal>
            <TextNormal fontSize="size_18" color="success" fontWeight="bold">

              {point !== null && t('report.point', { point })}
            </TextNormal>
          </Row>
          {evaluate && (
            <Row>
              <TextNormal fontSize="size_18" color="text_primary">
                {t('report.evaluate')}
              </TextNormal>
            </Row>
          )}
          {evaluate && (
            <Row background="bg_notify_box" style={{ wordBreak: 'break-all' }} padding={evaluate ? '16px' : '30px'} marginTop="12px">
              <TextNormal style={{ whiteSpace: 'pre-line' }} fontSize="size_18" color="text_primary">
                {ReactHtmlParser(evaluate, {
                  decodeEntities: true
                })}
              </TextNormal>
            </Row>
          )}
          {!!fileAttachFeedback?.length && (
            <Row>
              <TextNormal fontSize="size_18" color="text_primary">
                {t('report.result_explanation_file')}
              </TextNormal>
              <div>
                {renderFileAttachFeedback}
              </div>
            </Row>
          )}
        </>
      )
    }
    return <div />
  }

  return (
    <Header>
      <TextNormal className="nameReport" fontSize="size_24" fontWeight="bold">
        {nameReport}
      </TextNormal>
      <TextNormal fontSize="size_18" color="text_secondary">
        {overview}
      </TextNormal>
      {!!imageOverview && (
        <div className="expect-16-9">
          <Image class="current-image" src={getFileFromS3(imageOverview)} />
        </div>
      )}
      {renderFileAttachOverview}
      {renderUIFromStatus()}
    </Header>
  )
}

export default ReportHeader
