/* eslint-disable react/prop-types */
import { EditOutlined } from '@ant-design/icons'
import { Button, Row } from 'antd'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import { Table, TBody, Td, Th, Tr } from 'Themes/facit'
import { replaceToPassword } from 'Utils'

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
`

const MailServerInfo = ({ t, setIsEdit, emailServer }) => {
  const MailServerInfoRows = useMemo(() => [
    { name: t('host'), value: emailServer?.host },
    { name: t('fromName'), value: emailServer?.senderName },
    { name: t('email'), value: emailServer?.userName },
    { name: t('password'), value: replaceToPassword(emailServer?.password || '') },
    { name: t('port'), value: emailServer?.port },
    { name: t('protocol'), value: emailServer?.protocol }
  ].map((item) => (
    <Tr>
      <Th>{item.name}</Th>
      <Td>{item.value || '-'}</Td>
    </Tr>
  )), [t, emailServer])

  const handleShowEdit = () => {
    setIsEdit(true)
  }

  return (
    <Container>
      <Table>
        <TBody>
          {MailServerInfoRows}
        </TBody>
      </Table>
      <Row justify="center">
        <Button
          onClick={handleShowEdit}
          icon={<EditOutlined />}
          size="large"
          type="primary"
        >
          {t('common:change')}
        </Button>
      </Row>
    </Container>
  )
}

export default memo(MailServerInfo)
