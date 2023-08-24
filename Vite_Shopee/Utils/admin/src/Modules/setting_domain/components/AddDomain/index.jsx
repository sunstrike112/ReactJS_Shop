import React, { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput, NormalButton } from 'Components'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Schema from './schema'

const Wrapper = styled.section`
  width: 100%;
  padding: 16px;
  margin-top: 1rem;
  background: ${({ theme }) => theme.white};
  border-radius: 1rem;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);
  .ant-form-item {
    margin-bottom: 0;
  }
`

const SubmitButton = styled(NormalButton)`
  background: ${({ theme }) => theme.bg_primary};
  border: 1px solid ${({ theme }) => theme.bg_primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: .75rem;
  padding: .5rem 1.75rem;
  height: max-content;
  border-radius: .75rem;
  &:hover, &:focus {
    background-color: #5d4eb3;
    border-color: #5d4eb3;
    color: ${({ theme }) => theme.white};
  }
`

const DEFAULT_VALUE = {
  domain: ''
}

const AddDomain = ({ t, isAdding, addDomainAction, handleLoadData }) => {
  const form = useForm({
    resolver: yupResolver(Schema(t)),
    defaultValues: DEFAULT_VALUE
  })
  const { handleSubmit, reset } = form

  const onSubmit = useCallback((formData) => {
    const { domain } = formData
    const data = { domain }
    addDomainAction({
      data,
      callback: {
        done: () => {
          reset(DEFAULT_VALUE)
          handleLoadData()
        }
      }
    })
  }, [])

  return (
    <form>
      <FormProvider {...form}>
        <Wrapper>
          <h2 style={{ textAlign: 'center', marginBottom: 30 }}>{t('explain')}</h2>
          <Row gutter={24} justify="center">
            <Col span={10}>
              <FormInput
                t={t}
                name="domain"
              />
            </Col>
            <SubmitButton
              htmlType="submit"
              onClick={handleSubmit(onSubmit)}
              loading={isAdding}
            >
              {t('common:add')}
            </SubmitButton>
          </Row>
        </Wrapper>
      </FormProvider>
    </form>

  )
}

AddDomain.propTypes = {
  t: PropTypes.any,
  isAdding: PropTypes.bool,
  addDomainAction: PropTypes.func,
  handleLoadData: PropTypes.func
}

export default AddDomain
