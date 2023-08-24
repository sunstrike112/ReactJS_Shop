/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from 'antd'
import { Submit, ClickAble, Input, Text } from 'Components'
import { NISSOKEN_LOGO } from 'Assets'
import { Wrapper, Form, Header, Content } from './styled'

const LoginScreen = () => {
  const { register, handleSubmit, setValue } = useForm()
  useEffect(() => {
    register('termOfUse')
    setValue('termOfUse', false)
  }, [])

  const onChecked = (e) => setValue('termOfUse', e.target.checked)

  const onSubmit = () => {}

  return (
    <Wrapper>
      <Header>
        <img src={NISSOKEN_LOGO} height={44} />
      </Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Text.label>ユーザ名</Text.label>
          <Input
            {...register('email')}
            name="email"
            style={{ marginTop: 8, marginBottom: 24 }}
          />
          <Text.label>ユーザ名</Text.label>

          <Input
            inputSize="input_small"
            name="password"
            {...register('password')}
            style={{ marginTop: 8, marginBottom: 16 }}
          />
          <ClickAble style={{ textAlign: 'end' }}>
            パスワードをお忘れですか?
          </ClickAble>
          <div>
            <Checkbox
              style={{ width: 16, fontSize: 18 }}
              size="medium"
              name="termOfUse"
              onChange={onChecked}
            >
              ユーザ名を記憶する
            </Checkbox>
          </div>
          <Submit
            value="ログイン"
            style={{ marginTop: 37, marginBottom: 42, color: '#fff' }}
          />
        </Content>
      </Form>
    </Wrapper>
  )
}

export default LoginScreen
