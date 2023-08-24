import React from 'react'
import { Table, TBody, Tr, Th, Td } from './styled'

const HeaderNotificationDetail = ({ t }) => (
  <Table>
    <TBody>
      <Tr>
        <Th>{t('post.create.startTime')}</Th>
        <Td>1</Td>
      </Tr>
      <Tr>
        <Th>{t('post.title')}</Th>
        <Td>2</Td>
      </Tr>
      <Tr>
        <Th>{t('post.text')}</Th>
        <Td>3</Td>
      </Tr>
      <Tr>
        <Th>{t('post.create.startTime')}</Th>
        <Td>4</Td>

      </Tr>
      <Tr>
        <Th>{t('post.create.endTime')}</Th>
        <Td>5</Td>
      </Tr>
      <Tr>
        <Th>{t('post.create.radio')}</Th>
        <Td>6</Td>
      </Tr>
    </TBody>
  </Table>
)

export default HeaderNotificationDetail
