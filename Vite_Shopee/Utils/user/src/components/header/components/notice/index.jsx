/* eslint-disable react/prop-types */
import React, { memo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ICON_NOTICE, ICON_NOTICE_ACTIVE } from '../../../../assets'
import NoticeBox from '../../../../modules/notices'
import { TextPrimary, IconButton } from '../../..'
import { useOnClickOutside } from '../../../../hooks'

const NoticeNumber = styled.div`
  position: absolute;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  display: flex;
  left: 10px;
  align-items: center;
  top: 0px;
  font-size: 12px;
  justify-content: center;
  background: ${({ theme }) => theme.error};
`
const Notice = ({ notifyUnRead }) => {
  const [isNotice, setIsNotice] = useState(false)
  const noticeEl = useRef()
  useOnClickOutside(noticeEl, () => setIsNotice(false))

  return (
    <div ref={noticeEl}>
      <div style={{ position: 'relative', marginRight: 16 }}>
        <IconButton
          height={48}
          width={48}
          src={!isNotice ? ICON_NOTICE : ICON_NOTICE_ACTIVE}
          direction="row"
          onClick={() => setIsNotice(!isNotice)}
        />
        {notifyUnRead > 0 && (
          <NoticeNumber>
            <TextPrimary color="white">{notifyUnRead}</TextPrimary>
          </NoticeNumber>
        )}
      </div>
      {isNotice && <NoticeBox setIsNotice={setIsNotice} />}
    </div>
  )
}

export default memo(Notice)
