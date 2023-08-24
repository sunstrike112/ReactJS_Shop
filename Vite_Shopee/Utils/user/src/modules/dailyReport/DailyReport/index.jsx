import { LeftCircleOutlined, RightCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Select, Spin, Tooltip } from 'antd'
import React, { useEffect, useState, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ARROW_LEFT, SHOW_MORE_ICON_V2, SHOW_LESS_ICON_V2 } from '../../../assets'
import { FormInput, Image, TextNormal } from '../../../components'
import { DEFAULT_PAG, ROUTES_NAME, TALK_BOARD_SORT } from '../../../constants'
import { useDailyReports, useHistories } from '../../../hooks'
import { normalizeAttributesTree, normalizeGroupsTree } from '../../../utils'
import HomeLayout from '../../layouts/home'
import CommentForm from './components/CommentForm'
import Comments from './components/Comments'
import Trees from './components/Trees'
import { StyledSearchWrapper, StyledContainer, StyledContent, StyledRedirectPageWrapper } from './styled'
import Topic from './components/Topic'

const TYPE_MOVE = {
  PREV: 'previous',
  NEXT: 'next'
}

const DailyReportDetailScreen = () => {
  // Use hooks
  const { t } = useTranslation()
  const { dailyReportId } = useParams()
  const history = useHistories()
  const { dailyReports: { filter: { sortType, searchText } }, dailyReport, comments, loadDailyReportAction, loadCommentsDailyReportAction, getPrevNextDailyReportAction } = useDailyReports()
  const form = useForm()
  const { handleSubmit } = form
  // End use hooks

  // Use states
  const [isFocusingSort, setIsFocusingSort] = useState(false)
  // End use states

  const onSearch = (formData) => {
    const { textSearch } = formData
    loadCommentsDailyReportAction({ data: { ...comments.filter, textSearch: textSearch.trim(), page: DEFAULT_PAG.page } })
  }

  const handleSelectOrder = (value) => {
    loadCommentsDailyReportAction({ data: { ...comments.filter, sortType: value } })
  }

  const handleChangePag = useCallback((currentPage, pageSize) => {
    loadCommentsDailyReportAction({ data: { ...comments.filter, page: currentPage, limit: pageSize } })
  }, [comments.filter])

  useEffect(() => {
    if (dailyReportId) {
      loadDailyReportAction({ dailyReportId })
      loadCommentsDailyReportAction({ data: { ...comments.filter, reportId: Number(dailyReportId) } })
    }
  }, [dailyReportId])

  const handleRedirectToAnotherDailyReport = (typeMove) => () => {
    getPrevNextDailyReportAction({
      queriesParam: { currentId: dailyReportId, typeMove },
      data: { searchText, sortType },
      history
    })
  }

  const redirectToDailyReports = () => {
    history.push(ROUTES_NAME.DAILY_REPORTS)
  }

  return (
    <HomeLayout>
      <StyledContainer>
        <Button className="back-btn" onClick={redirectToDailyReports}>
          <Image src={ARROW_LEFT} alt="arr-left" />
        </Button>
        <StyledContent>
          <Row gutter={[20]}>
            <Col span={24} xl={16}>
              <StyledRedirectPageWrapper>
                <Tooltip title={t('common.previous_button')}>
                  <Button
                    loading={dailyReport.isLoadingPrevNext && dailyReport.typeMove === TYPE_MOVE.PREV}
                    icon={<LeftCircleOutlined />}
                    size="large"
                    onClick={handleRedirectToAnotherDailyReport(TYPE_MOVE.PREV)}
                  />
                </Tooltip>
                <Tooltip title={t('common.next_button')}>
                  <Button
                    loading={dailyReport.isLoadingPrevNext && dailyReport.typeMove === TYPE_MOVE.NEXT}
                    icon={<RightCircleOutlined />}
                    size="large"
                    onClick={handleRedirectToAnotherDailyReport(TYPE_MOVE.NEXT)}
                  />
                </Tooltip>
              </StyledRedirectPageWrapper>
              <Topic dailyReport={dailyReport.data} />
              <CommentForm dailyReportId={dailyReport.data.id} />
            </Col>
            <Col span={24} xl={8}>
              <Trees
                departments={normalizeGroupsTree(dailyReport.data.lstDepartments || [])}
                attributes={normalizeAttributesTree(dailyReport.data.listAttributes || [])}
              />
              <Divider style={{ margin: '.625rem 0 .875rem 0' }} />
              <div className="comment__header">
                <TextNormal color="success" fontWeight="fw_700" fontSize="size_16">{t('common.comment')}</TextNormal>
                <Select
                  suffixIcon={<Image src={isFocusingSort ? SHOW_LESS_ICON_V2 : SHOW_MORE_ICON_V2} />}
                  onBlur={() => setIsFocusingSort(false)}
                  onClick={() => setIsFocusingSort((prev) => !prev)}
                  onChange={handleSelectOrder}
                  value={comments.filter.sortType}
                >
                  {TALK_BOARD_SORT.map((option) => (
                    <Select.Option
                      key={option.key}
                      value={option.value}
                    >
                      {t(`talk_board.${option.label}`)}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <Divider style={{ margin: '.625rem 0 .875rem 0' }} />
              <StyledSearchWrapper>
                <FormProvider {...form}>
                  <form onSubmit={handleSubmit(onSearch)}>
                    <FormInput
                      t={t}
                      prefix={<SearchOutlined onClick={handleSubmit(onSearch)} />}
                      name="textSearch"
                      placeholder={t('talk_board.search_comment_placeholder')}
                    />
                  </form>
                </FormProvider>
              </StyledSearchWrapper>
              <Spin spinning={comments.isLoading}>
                <Comments
                  comments={comments.data}
                  pagination={comments.pagination}
                  handleChangePag={handleChangePag}
                />
              </Spin>

            </Col>
          </Row>
        </StyledContent>
      </StyledContainer>
    </HomeLayout>
  )
}

export default DailyReportDetailScreen
