/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import { EditOutlined, PaperClipOutlined } from '@ant-design/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Popover, Tag } from 'antd'
import
{
  FormInput,
  FormLabel, FormTextArea, ModalNonForm,
  Table,
  Text, Title
} from 'Components'
import { useReportManagement } from 'Hooks/report_management'

import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Divider, Right, Row, Wrapper } from 'Themes/facit'
import Schema from './schema'
import tableColumns from '../components/ColumnComment'

const ReportDetailScreen = () => {
  const { t } = useTranslation(['reportTemplateManagement'])
  const { reportId } = useParams()

  const {
    getReportDetailAction,
    reportDetail,
    loadCommentsDailyReportAction,
    comments
  } = useReportManagement()

  const { dataReport } = reportDetail

  const { pagination, isLoading } = comments
  const { total, limit: pageSize, page: currentPage } = pagination

  const form = useForm({
    resolver: yupResolver(Schema(t))
  })

  const [visibleErrorSize, setVisibleErrorSize] = useState(false)

  const {
    setValue
  } = form

  useEffect(() => {
    getReportDetailAction({ reportId })
    loadCommentsDailyReportAction({ data: { ...comments.filter, reportId: Number(reportId), limit: 10 } })
  }, [])

  const setInitData = () => {
    setValue('title', dataReport.title)
    setValue('content', dataReport.content)
    setValue('creator', dataReport.author.firstName)
    setValue('isPushNotification', dataReport.isPushNotification === 1 ? t('yes') : t('no'))
    setValue('isDraft', dataReport.isDraft === 0 ? t('no') : t('yes'))
    setValue('reportDate', moment(dataReport.reportDate).format('YYYY-MM-DD'))
    setValue('createdDate', moment(dataReport.createdDate).format('YYYY-MM-DD'))
    setValue('signinId', dataReport.author.signinId)
  }

  const columns = React.useMemo(
    () => tableColumns({ t, pagination }),
    [t, pagination]
  )

  const dataComments = React.useMemo(() => comments?.data?.map((comment) => ({
    ...comment
  })), [comments])

  const handleTableChange = (tablePaging) => {
    loadCommentsDailyReportAction({ data: {
      ...comments.filter,
      page: tablePaging.current,
      limit: tablePaging.pageSize
    } })
  }

  useEffect(() => {
    if (dataReport?.id) {
      setInitData()
    }
  }, [dataReport])

  return (
    <Wrapper>
      <Title icon={EditOutlined} title={t('report_title')} />
      <div className="form-wrapper">
        <form>
          <FormProvider {...form}>
            <Row>
              <FormLabel
                title={t('title')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="title"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('content')}
              />
              <Right>
                <FormTextArea
                  t={t}
                  name="content"
                  total={4000}
                  rows={4}
                  style={{ color: '#1A1A1A' }}
                  disabled
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('attachment')}
              />
              <Right>
                {dataReport?.reportFiles?.map((i) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PaperClipOutlined />
                    <Text.primary
                      className="content__file--text"
                      color={i.error ? 'error_ant' : 'text_thirsdary'}
                      fontSize="size_14"
                    >
                      {i.fileName}
                    </Text.primary>
                  </div>
                ))}
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('common:loginId')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="signinId"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('creator')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="creator"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('group')}
              />
              <Right>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {dataReport?.departments?.map((i) => (
                    <Popover
                      overlayClassName="group-popover"
                      content={i.name}
                    >
                      <Tag className="truncate" style={{ marginTop: '2px', marginBottom: '2px' }}>{i.name}</Tag>
                    </Popover>
                  ))}
                </div>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('attribute')}
              />
              <Right>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {dataReport?.attributes?.map((i) => (
                    <Popover
                      overlayClassName="group-popover"
                      content={i.name}
                    >
                      <Tag className="truncate" style={{ marginTop: '2px', marginBottom: '2px' }}>{i.name}</Tag>
                    </Popover>
                  ))}
                </div>
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('created_at')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="createdDate"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('report_date')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="reportDate"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('is_draft')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="isDraft"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
            <Row>
              <FormLabel
                title={t('is_push_notification')}
              />
              <Right>
                <FormInput
                  t={t}
                  name="isPushNotification"
                  maxLength={100}
                  disabled
                  style={{ color: '#1A1A1A' }}
                />
              </Right>
            </Row>
            <Divider />
          </FormProvider>
        </form>
      </div>
      <Table
        locale={{ emptyText: t('common:empty_data') }}
        dataSource={dataComments}
        columns={columns}
        total={total}
        currentPage={currentPage}
        pageSize={pageSize}
        onChange={handleTableChange}
        loading={isLoading}
        isHideDelete
      />
      {/* Modal warning exceeded limit */}
      <ModalNonForm
        size="small"
        visible={visibleErrorSize}
        cancel={false}
        onSubmit={() => setVisibleErrorSize(false)}
        onCancel={() => setVisibleErrorSize(false)}
        onSubmitText={t('common:agree')}
      >
        <Text.primary
          fontSize="size_16"
          style={{ textAlign: 'center' }}
        >
          {t('upload_file:talk_board.upload_exceed_limit')}
        </Text.primary>
      </ModalNonForm>
    </Wrapper>
  )
}

export default ReportDetailScreen
