/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { FormInput, SubmitButton, TextNormal } from '../../../../components'
import { Box, Wrapper, WrapperButton } from './styled'

const DEFAULT_VALUE = {
  searchText: '',
  sortType: 'DESC'
}

const SearchBlock = ({ filter, loadDailyReportsAction }) => {
  // Use hooks
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

  useEffect(() => {
    if (filter) {
      if (filter.searchText) setValue('searchText', filter.searchText)
    }
  }, [filter])

  return (
    <Wrapper>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleSearchTalkBoard)}>
          <TextNormal
            fontSize="size_16"
            color="success"
            fontWeight="fw_600"
          >
            {t('dailyReports.searchByReportContent')}
          </TextNormal>
          <Box>
            <FormInput
              t={t}
              name="searchText"
              onKeyDown={handleEnterSearch}
            />
          </Box>
        </form>
      </FormProvider>

      <WrapperButton>
        <SubmitButton
          className="btn__search"
          title={t('talk_board.search')}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleSubmit(handleSearchTalkBoard)}
        />
        <SubmitButton
          className="btn__reset"
          title={t('talk_board.reset')}
          fontWeight="fw_500"
          fontSize="size_14"
          onClick={handleSubmit(handleResetTalkBoard)}
        />
      </WrapperButton>
    </Wrapper>
  )
}

export default memo(SearchBlock)
