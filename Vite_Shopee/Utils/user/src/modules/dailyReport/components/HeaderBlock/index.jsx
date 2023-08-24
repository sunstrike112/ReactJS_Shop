/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import { Divider } from 'antd'
import { FormInput, SubmitButton, TextNormal } from '../../../../components'
import { ROUTES_NAME } from '../../../../constants'
import { useHistories } from '../../../../hooks'
import Sort from './Sort'
import { FilterWrapper } from './styled'

const DEFAULT_VALUE = {
  searchText: '',
  sortType: 'DESC'
}

const DailyReportsHeader = ({ dailyReportsTotal, filter, loadDailyReportsAction }) => {
  // Use hooks
  const history = useHistories()
  const { t } = useTranslation()
  // End use hooks

  const form = useForm(
    { defaultValues: DEFAULT_VALUE }
  )
  const { handleSubmit, setValue, reset } = form

  const handleResetTalkBoard = () => {
    reset({
      searchText: DEFAULT_VALUE.searchText
    })
    loadDailyReportsAction({ data: {
      page: 1,
      limit: 20,
      sortType: filter.sortType
    } })
  }

  const handleSearchTalkBoard = (formData) => {
    const { searchText } = formData
    const dataSearch = {
      ...filter,
      page: 1,
      searchText: searchText.trim()
    }
    loadDailyReportsAction({ data: dataSearch })
  }

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(handleSearchTalkBoard)()
    }
  }

  const handleCreateTalkBoard = () => {
    history.push(ROUTES_NAME.DAILY_REPORT_CREATE)
  }

  useEffect(() => {
    if (filter.searchText) {
      setValue('searchText', filter.searchText)
    }
  }, [filter.searchText])

  return (
    <FilterWrapper id="reports-header">
      <div className="title">
        <TextNormal className="reports-title" fontWeight="fw_600" fontSize="size_24">
          {t('dailyReports.title')}
        </TextNormal>
        <div className="total">{dailyReportsTotal}</div>
      </div>
      <div className="filters">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleSearchTalkBoard)}>
            <FormInput
              t={t}
              name="searchText"
              onKeyDown={handleEnterSearch}
            />
          </form>
        </FormProvider>
        <SubmitButton
          className="btn__rounded btn__search"
          title={t('talk_board.search')}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleSubmit(handleSearchTalkBoard)}
        />
        <SubmitButton
          className="btn__rounded btn__reset"
          title={t('talk_board.reset')}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleSubmit(handleResetTalkBoard)}
        />
        <Divider type="vertical" className="divider" />
        <Sort t={t} />
        <SubmitButton
          className="btn__create"
          title={t('dailyReports.createDailyReport')}
          icon={<EditOutlined />}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleCreateTalkBoard}
        />
      </div>
    </FilterWrapper>
  )
}

export default memo(DailyReportsHeader)
