/* eslint-disable react/prop-types */
import React, { useMemo, useRef, useState, memo } from 'react'
import { Tooltip } from 'antd'
import { TextPrimary, Image } from '../../..'
import { useOnClickOutside, useHistories, useCourseList, useCourseStudying } from '../../../../hooks'
import { AVATAR_DEFAULT } from '../../../../assets'
import { Wrapper } from './styled'
import { getFileFromS3 } from '../../../../utils'
import { ROUTES_NAME } from '../../../../constants'

const Workspaces = (props) => {
  const { t, userId, userRole, workspaceid, currentWorkspace, workspaces, getProfile } = props
  const history = useHistories()
  const { resetFilterCourseListAction } = useCourseList({ userId })
  const { resetFilterMyPageAction } = useCourseStudying({ userRole })

  const workspacesEl = useRef()
  const [isActiveWS, setIsActiveWS] = useState(false)

  useOnClickOutside(workspacesEl, () => setIsActiveWS(false))

  const handleActiveWorkspace = () => {
    setIsActiveWS(!isActiveWS)
  }

  const handleChooseWS = (companyId) => {
    resetFilterCourseListAction()
    resetFilterMyPageAction()
    getProfile({
      userId,
      workspaceid: companyId,
      hasRequestRedirectHome: true,
      callback: () => {
        setIsActiveWS(false)
      }
    })
  }

  const handleRedirectWSScreen = () => {
    history.push(ROUTES_NAME.WORKSPACES)
  }

  const menusWS = useMemo(() => (workspaces.length >= 6 ? workspaces.slice(0, 6) : workspaces), [workspaces])

  return (
    <Wrapper ref={workspacesEl} isActive={isActiveWS}>
      <Tooltip title={currentWorkspace.companyName} placement="left">
        <Image
          className="workspace_avatar"
          onClick={workspaces.length > 1 ? handleActiveWorkspace : null}
          src={getFileFromS3(currentWorkspace.imagePath)}
          srcDefault={AVATAR_DEFAULT}
          alt="avatar_img"
        />
      </Tooltip>
      {isActiveWS && (
      <div className="workspace_box">
        {menusWS.map((workspace, index) => {
          if (index === 5) {
            return (
              <div
                key={index}
                aria-hidden="true"
                onClick={handleRedirectWSScreen}
                className="workspace_item see_more"
              >
                <TextPrimary className="see_more_text">{t('common.header.see_more')}</TextPrimary>
              </div>
            )
          }
          return (
            <div
              key={index}
              aria-hidden="true"
              onClick={() => handleChooseWS(workspace.companyId)}
              className={`workspace_item ${+workspace.companyId === +workspaceid && 'active'}`}
            >
              <Image className="workspace_item_img" alt="lang_img" src={getFileFromS3(workspace.imagePath) || AVATAR_DEFAULT} />
              <TextPrimary className="workspace_item_name">{workspace.companyName}</TextPrimary>
            </div>
          )
        })}
      </div>
      )}
    </Wrapper>
  )
}
export default memo(Workspaces)
