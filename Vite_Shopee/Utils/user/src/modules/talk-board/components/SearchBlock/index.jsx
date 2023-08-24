/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { SHOWLESS_ICON, SHOWMORE_ICON } from '../../../../assets'
import { FormInput, Image, SubmitButton, TextNormal, TextPrimary } from '../../../../components'
import { SORT_TYPE } from '../../../../constants'
import { useTalkBoard } from '../../../../hooks'
import SearchTag from './SearchTitle'
import { Box, Wrapper, WrapperButton } from './styled'

const DEFAULT_VALUE = {
  title: '',
  content: '',
  lstTagId: [],
  sortType: SORT_TYPE.DESC
}

const SearchBlock = ({ listTalkBoard, loadTalkBoardAction, filter }) => {
  const { t } = useTranslation()
  const { listTag } = useTalkBoard()

  const { page, limit } = listTalkBoard
  const [isShowMore, setIsShowMore] = useState(true)
  const [selectedTags, setSelectedTags] = useState([])

  const form = useForm()
  const { handleSubmit, setValue, reset } = form

  const handleResetTalkBoard = () => {
    reset({
      title: DEFAULT_VALUE.title,
      content: DEFAULT_VALUE.content
    })
    setSelectedTags([])
    loadTalkBoardAction({ params: {
      page: 1,
      limit: 100,
      filter: DEFAULT_VALUE
    } })
  }

  const handleSearchTalkBoard = (formData) => {
    loadTalkBoardAction({ params: {
      page: 1,
      limit,
      filter: {
        ...filter,
        title: formData.title.trim().toLowerCase(),
        lstTagId: selectedTags.map((tag) => tag.id)
      }
    } })
  }

  const handleEnterSearch = (event) => {
    if (event.code === 'Enter') {
      event.preventDefault()
      handleSubmit(handleSearchTalkBoard)()
    }
  }

  useEffect(() => {
    setValue('title', filter.title)
    loadTalkBoardAction({
      params: { page, limit, filter }
    })
  }, [])

  return (
    <Wrapper>
      <TextNormal fontSize="size_16" color="success" fontWeight="fw_600">
        {t('talk_board.search_by_tag')}
      </TextNormal>
      <Box>
        <SearchTag
          isShowMore={isShowMore}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        {listTag.length >= 10
          && (
          <div
            aria-hidden
            className="show__more"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {isShowMore ? (
              <>
                <TextPrimary fontSize="size_14" color="green">
                  {t('talk_board.show_more')}
                </TextPrimary>
                <Image src={SHOWMORE_ICON} />
              </>
            )
              : (
                <>
                  <TextPrimary fontSize="size_14" color="green">
                    {t('talk_board.show_less')}
                  </TextPrimary>
                  <Image src={SHOWLESS_ICON} />
                </>
              )}
          </div>
          )}
      </Box>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(handleSearchTalkBoard)}>
          <TextNormal
            fontSize="size_16"
            color="success"
            fontWeight="fw_600"
          >
            {t('talk_board.search_by_topic')}
          </TextNormal>
          <Box>
            <FormInput
              t={t}
              name="title"
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

export default SearchBlock
