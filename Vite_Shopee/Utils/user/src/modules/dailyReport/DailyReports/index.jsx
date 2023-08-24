import { Col, Pagination, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { EMPTYLIST } from '../../../assets'
import { Image, TextPrimary } from '../../../components'
import { Wrapper } from './styled'
import HomeLayout from '../../layouts/home'
import { Topic, HeaderBlock } from '../components'
import { useDailyReports } from '../../../hooks'

const DailyReports = () => {
  // Use hooks
  const { t } = useTranslation()
  const { dailyReports, loadDailyReportsAction } = useDailyReports()
  const { data, pagination, filter, isLoading } = dailyReports
  // End use hooks

  const handleOnChangePage = (page, pageSize) => {
    loadDailyReportsAction({ data: { ...filter, page, limit: pageSize } })
  }

  useEffect(() => {
    loadDailyReportsAction({ data: { ...filter } })
  }, [])

  return (
    <HomeLayout>
      <Wrapper>
        <Row gutter={[32]}>
          <Col span={24} className="header-block">
            <HeaderBlock
              filter={filter}
              loadDailyReportsAction={loadDailyReportsAction}
              dailyReportsTotal={pagination.total}
            />
          </Col>
          <Col span={24} className="reports-wrapper">
            <Spin spinning={isLoading}>
              {pagination.total > 0
                ? data.map((dailyReport) => <Topic key={dailyReport.id} dailyReport={dailyReport} />)
                : (
                  <Col span={24} className="list-empty">
                    <Image src={EMPTYLIST} />
                    <TextPrimary color="grey" fontSize="size_16">
                      {t('common.no_data')}
                    </TextPrimary>
                  </Col>
                )}

            </Spin>
            {pagination.total > 0 && (
            <Pagination
              total={pagination.total}
              current={pagination.page}
              pageSize={pagination.limit}
              showSizeChanger
              onChange={handleOnChangePage}
              pageSizeOptions={[20, 50, 100]}
              locale={{ items_per_page: `/ ${t('talk_board.page')}` }}
            />
            )}
          </Col>
        </Row>
      </Wrapper>
    </HomeLayout>
  )
}

export default DailyReports
