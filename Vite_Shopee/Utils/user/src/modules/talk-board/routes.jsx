import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import { CustomRoute } from '../../components'
import DetailTalkBoardScreen from './detail_talk_board'
import TalkBoardScreen from '.'

export default function TalkBoardRoutes() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <CustomRoute exact path={path} component={TalkBoardScreen} />
      <CustomRoute exact path={`${path}/:talkBoardId`} component={DetailTalkBoardScreen} />
    </Switch>
  )
}
