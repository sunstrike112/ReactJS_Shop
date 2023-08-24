import { Pagination, Spin } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, TextNormal } from '../../../components'
import { DEFAULT_PAG, ROUTES_NAME } from '../../../constants'
import { useDailyReports, useHistories } from '../../../hooks'
import HomeLayout from '../../layouts/home'
import { StyledContent, StyledCreateButton, StyledCreateContainer, StyledTemplateButton, StyledTemplateContainer, StyledTemplateContent, StyledWrapper, TextCustom } from './styled'

const TemplateScreen = () => {
  // Use hooks
  const { t } = useTranslation()
  const history = useHistories()
  const { loadTemplatesAction, templates, deleteTemplateAction } = useDailyReports()
  const { data: listTemplate, isLoading, filter } = templates
  const { pagination } = templates
  const { total, limit: pageSize, page: currentPage } = pagination
  // End use hooks

  // Use states
  const [listData, setListData] = React.useState([])
  const [showPopupDelete, setShowPopupDelete] = React.useState(false)
  const [idDelete, setIdDelete] = React.useState(0)
  // End use states

  useEffect(() => {
    loadTemplatesAction({ params: { ...filter, page: pagination.page, limit: pagination.limit } })
  }, [])

  useEffect(() => {
    setListData(listTemplate)
  }, [listTemplate])

  const handleCreateTemplate = () => {
    history.push(ROUTES_NAME.TEMPLATE_CREATE)
  }

  const handleClickDetailTemplate = (id) => {
    history.push({
      pathname: `${ROUTES_NAME.TEMPLATE_DETAIL}/${id}`,
      state: 'detail'
    })
  }

  const handleDeleteTemplate = () => {
    deleteTemplateAction({ templateId: idDelete, filter: { ...filter, page: DEFAULT_PAG.page } })
  }

  const handleOnChangePage = (page, size) => {
    window.scrollTo(0, 0)
    loadTemplatesAction({
      params: { ...filter, page, limit: size }
    })
  }

  const renderListTemplate = useMemo(() => listData.map((item) => (
    <StyledTemplateContainer>
      <StyledTemplateContent>
        <TextCustom onClick={() => handleClickDetailTemplate(item.id)}>
          {item.title}
        </TextCustom>
      </StyledTemplateContent>
      <StyledTemplateButton
        className="delete"
        onClick={() => {
          setIdDelete(item.id)
          setShowPopupDelete(true)
        }}
      >
        {t('dailyReports.template.delete')}
      </StyledTemplateButton>
      <StyledTemplateButton
        className="edit"
        onClick={() => history.push(`${ROUTES_NAME.TEMPLATE_EDIT}/${item.id}`)}
      >
        {t('dailyReports.template.edit')}
      </StyledTemplateButton>
    </StyledTemplateContainer>
  )), [listData])

  return (
    <HomeLayout>
      <StyledWrapper>
        <StyledContent>
          <TextNormal fontSize="24" fontWeight="fw_600" className="title">
            {t('dailyReports.template.templates')}
          </TextNormal>
          <Spin spinning={isLoading}>
            {renderListTemplate}
            {total > 0 && (
            <Pagination
              total={total}
              current={currentPage}
              pageSize={pageSize}
              onChange={handleOnChangePage}
              pageSizeOptions={[20, 50, 100]}
              showSizeChanger
              locale={{ items_per_page: `/ ${t('talk_board.page')}` }}
            />
            )}
          </Spin>
          <StyledCreateContainer>
            <StyledCreateButton
              onClick={handleCreateTemplate}
            >
              {t('dailyReports.template.create')}
            </StyledCreateButton>
          </StyledCreateContainer>
        </StyledContent>
      </StyledWrapper>
      <Modal
        isModalVisible={showPopupDelete}
        setIsModalVisible={setShowPopupDelete}
        description={t('dailyReports.template.delete_template')}
        okText={t('common.yes')}
        cancelText={t('common.cancel')}
        onOk={() => handleDeleteTemplate(idDelete)}
        borderRadiusButton={6}
      />
    </HomeLayout>
  )
}
export default TemplateScreen
