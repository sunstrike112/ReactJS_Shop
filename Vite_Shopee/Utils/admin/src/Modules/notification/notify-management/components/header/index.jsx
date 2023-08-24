import React, { useState } from 'react'
import { ICON_SEND } from 'Assets'
import { Text, NormalButton, SocialButton } from 'Components'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { POST_OPTION } from 'Constants/notifi'

import {
  Header,
  HeaderContent,
  InputWrapper,
  Tilde,
  Input,
  InputBox,
  DatePickerStyle,
  ListButton,
  FilterContent,
  SelectInput
} from './styled'

const HeaderNotification = ({ t, loadFindUserAction }) => {
  const { Option } = SelectInput
  const [form] = Form.useForm()

  const [dataSerch, setDataSearch] = useState({ statusToGet: 'all' })
  const handleChangeInput = (e, name) => {
    setDataSearch({ ...dataSerch, [name]: e?.target?.value })
  }
  const handleChangeDate = (date, name) => {
    setDataSearch({ ...dataSerch, [name]: date ? (new Date(date)).getTime() : '' })
  }

  const getDataCompleted = () => {
    loadFindUserAction({
      params: {
        limit: 100,
        page: 1,
        filter: dataSerch
      }
    })
  }

  const onReset = () => {
    form.resetFields()
    loadFindUserAction({
      params: {
        page: 1,
        limit: 100,
        filter: { statusToGet: 'ALL' }
      }
    })
    setDataSearch({ statusToGet: 'all' })
  }

  return (
    <Header>
      <Form form={form}>
        <Form.Item name="filter">
          <FilterContent>
            <HeaderContent>
              <InputWrapper>
                <Text.primary fontSize="size_14">{t('management.title_text')}</Text.primary>
                <InputBox>
                  <Input onChange={(e) => handleChangeInput(e, 'title')} value={dataSerch?.userName} />
                </InputBox>
              </InputWrapper>
              <InputWrapper>
                <Text.primary fontSize="size_14">{t('management.start_post')}</Text.primary>
                <InputBox>
                  <DatePickerStyle suffixIcon={null} placeholder={null} onChange={(date) => handleChangeDate(date, 'publicationStartFrom')} />
                  <Tilde>~</Tilde>
                  <DatePickerStyle suffixIcon={null} placeholder={null} onChange={(date) => handleChangeDate(date, 'publicationStartTo')} />
                </InputBox>
              </InputWrapper>
            </HeaderContent>
            <HeaderContent>
              <InputWrapper>
                <Text.primary fontSize="size_14">{t('management.new_status')}</Text.primary>
                <SelectInput
                  allowClear
                  onChange={(e) => setDataSearch({ ...dataSerch, 'statusToGet': e ? e.toUpperCase() : 'ALL' })}
                  value={dataSerch?.statusToGet?.toLocaleLowerCase()}
                >
                  {POST_OPTION?.map((item) => <Option value={item?.value}>{t(item?.label)}</Option>)}
                </SelectInput>
              </InputWrapper>
              <InputWrapper>
                <Text.primary fontSize="size_14">{t('management.end_post')}</Text.primary>
                <InputBox>
                  <DatePickerStyle suffixIcon={null} placeholder={null} onChange={(date) => handleChangeDate(date, 'publicationEndFrom')} />
                  <Tilde>~</Tilde>
                  <DatePickerStyle suffixIcon={null} placeholder={null} onChange={(date) => handleChangeDate(date, 'publicationEndTo')} />
                </InputBox>
              </InputWrapper>
            </HeaderContent>
          </FilterContent>
        </Form.Item>
        <ListButton>
          <SocialButton title={t('management.clear')} backgroundcolor="white" color="blueHight" onClick={onReset} />
          <NormalButton backround="blueHight" color="white" fill="none" stroke="white" onClick={getDataCompleted}>
            <ICON_SEND className="icon" />
            <span>{t('management.search')}</span>
          </NormalButton>
        </ListButton>
      </Form>
    </Header>
  )
}

HeaderNotification.propTypes = {
  loadFindUserAction: PropTypes.func
}

export default HeaderNotification
