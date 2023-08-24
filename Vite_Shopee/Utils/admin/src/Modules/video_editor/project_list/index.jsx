/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistories, useLoadProjectList } from 'Hooks'
import moment from 'moment'
import { Spin, Empty, Typography } from 'antd'
// import { UploadOutlined } from '@ant-design/icons'
import { FORMAT_TIME } from 'Constants/formatTime'
import { PROJECT_ICON } from 'Assets'
import { CardItem, UploadFile, FilterBlock } from './components'
import {
  Container,
  TitleBar,
  // ButtonStyled,
  Wrapper
} from './styled'

const ProjectIcon = PROJECT_ICON

const ProjectListScreen = () => {
  const { t } = useTranslation(['project'])
  const history = useHistories()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const {
    listProject,
    isLoading,
    pagination,
    deleteProjectAction
  } = useLoadProjectList()

  // const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)
  const renderProjectList = useMemo(() => {
    if (listProject && listProject.length > 0) {
      return listProject.map((item) => (
        <CardItem
          className="card-item"
          onRemoveProjectItem={() => deleteProjectAction({
            ids: [item.id]
          })}
          fileId={item.fileId}
          fileEditPath={item.fileEditPath}
          onEdit={() => {
            history.push(`/project-list/editor/${item.id}`)
          }}
          key={item.id}
          id={item.id}
          status={item.status}
          titleCard={item.projectName}
          isLinked={item.linked}
          srcThumb={item.thumb}
          lastDateEdit={item.modifiedAt ? moment(item.modifiedAt).format(FORMAT_TIME.DATE_HOUR_MINUTES) : null}
          filePath={item.filePath}
        />
      ))
    }
    return <div className="empty_project"><Empty description={t('common:empty_data')} /></div>
  }, [listProject])

  return (
    <Container>
      <Spin spinning={isLoading}>
        <TitleBar>
          <div className="left">
            <ProjectIcon />
            {t('project_list')}
          </div>
        </TitleBar>
        <FilterBlock />
        <Wrapper>
          <div className="list_top">
            <Typography.Text className="title_list">{t('video_list')} <span>{t('common:item')}: {pagination.total}</span></Typography.Text>
            {/* <ButtonStyled icon={<UploadOutlined />} className="btn_upload" onClick={showModal}>{t('upload')}</ButtonStyled> */}
          </div>
          <div className="list_project">
            {renderProjectList}
          </div>
        </Wrapper>
      </Spin>
      <UploadFile
        visible={isModalVisible}
        onCancel={handleCancel}
      />
    </Container>
  )
}

export default ProjectListScreen
