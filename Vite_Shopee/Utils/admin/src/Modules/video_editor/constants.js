/* eslint-disable no-unused-vars */
import { USER_ROLE, USER_WORKSPACE_ROLE } from 'Constants'
import {
  VIDEO_EDITOR_ARROW_UP,
  VIDEO_EDITOR_BLUE_CIRCLE,
  VIDEO_EDITOR_CLOSED,
  VIDEO_EDITOR_RECTANGLE,
  VIDEO_EDITOR_RED_CIRCLE,
  VIDEO_EDITOR_SQUARE,
  VIDEO_EDITOR_TRIANGLE,
  VIDEO_EDITOR_ARROW_UP_IMG,
  VIDEO_EDITOR_BLUE_CIRCLE_IMG,
  VIDEO_EDITOR_CLOSED_IMG,
  VIDEO_EDITOR_RECTANGLE_IMG,
  VIDEO_EDITOR_RED_CIRCLE_IMG,
  VIDEO_EDITOR_SQUARE_IMG,
  VIDEO_EDITOR_TRIANGLE_IMG
} from 'Assets'
import { getInitialColor } from './utils'
import ProjectListScreen from './project_list'
import ProjectEditScreen from './project_editor'

const { NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN } = USER_ROLE
export const RoutesName = {
  PROJECT_LIST: '/project-list',
  PROJECT_EDIT: '/project-list/editor/:projectId'
}

export const ROUTES = [
  {
    path: RoutesName.PROJECT_LIST,
    Component: ProjectListScreen,
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  },
  {
    path: RoutesName.PROJECT_EDIT,
    Component: ProjectEditScreen,
    rules: [NISSHOKEN_SUPER_ADMIN, NISSHOKEN_ADMIN, COMPANY_ADMIN, SUB_ADMINISTRATOR, COURSE_ADMIN],
    rulesWS: [USER_WORKSPACE_ROLE.COMPANY_ADMIN, USER_WORKSPACE_ROLE.WORKSPACE_ADMIN]
  }
]

export const VIDEO_STATUS = {
  PROCESSING: 'PROCESSING',
  EXPORTING: 'EXPORTING',
  EXPORTED: 'EXPORTED',
  ACTIVE: 'ACTIVE'
}

export const imagesData = [
  {
    value: VIDEO_EDITOR_CLOSED,
    label: 'CLOSED',
    src: VIDEO_EDITOR_CLOSED_IMG
  },
  {
    value: VIDEO_EDITOR_ARROW_UP,
    label: 'ARROW_UP',
    src: VIDEO_EDITOR_ARROW_UP_IMG
  },
  {
    value: VIDEO_EDITOR_BLUE_CIRCLE,
    label: 'CIRCLE',
    src: VIDEO_EDITOR_BLUE_CIRCLE_IMG
  },
  {
    value: VIDEO_EDITOR_SQUARE,
    label: 'SQUARE',
    src: VIDEO_EDITOR_SQUARE_IMG
  },
  {
    value: VIDEO_EDITOR_RED_CIRCLE,
    label: 'RED_CIRCLE',
    src: VIDEO_EDITOR_RED_CIRCLE_IMG
  },
  {
    value: VIDEO_EDITOR_RECTANGLE,
    label: 'RECTANGLE',
    src: VIDEO_EDITOR_RECTANGLE_IMG
  },
  {
    value: VIDEO_EDITOR_TRIANGLE,
    label: 'TRIANGLE',
    src: VIDEO_EDITOR_TRIANGLE_IMG
  }
]

export const STATUS_COLORS = {
  PROCESSING: '#13c2c2',
  EXPORTING: '#1890ff',
  EXPORTED: '#52c41a',
  ACTIVE: '#722ed1'
}

export const FONTS = [
  {
    label: 'Arial',
    value: 'Arial'
  },
  {
    label: 'Meiryo',
    value: 'Meiryo'
  },
  {
    label: 'MS Mincho',
    value: 'MS Mincho'
  },
  {
    label: 'Yu Gothic',
    value: 'Yu Gothic'
  },
  {
    label: 'MS Gothic',
    value: 'MS Gothic'
  }
]

export const FONTS_JP = [
  {
    label: 'Arial',
    value: 'Arial'
  },
  {
    label: 'メイリオ',
    value: 'Meiryo'
  },
  {
    label: 'ＭＳ 明朝',
    value: 'MS Mincho'
  },
  {
    label: '游ゴシック',
    value: 'Yu Gothic'
  },
  {
    label: 'ＭＳ ゴシック',
    value: 'MS Gothic'
  }
]

export const getNewTrack = ({
  id,
  initialEndTime,
  imageName,
  imageSrc,
  elementLabel,
  name,
  type,
  textStyle,
  ...rest
}) => ({
  id,
  imageName,
  imageSrc,
  type,
  xPosition: 0,
  trackTimePosition: 0,
  selector: id,
  color: getInitialColor(imageName),
  startTime: 0,
  endTime: initialEndTime,
  name,
  position: {
    x: 0,
    y: 0,
    rotate: 0,
    width: 100,
    height: imageName === 'RECTANGLE' ? 73 : 100,
    widthBound: 100,
    heightBound: imageName === 'RECTANGLE' ? 73 : 100,
    posX: 0,
    posY: 0,
    scale: 1
  },
  keepRatio: true,
  textStyle,
  isCreateNewItem: true,
  ...rest
})

export const TABSKEY = {
  LAYER: 'LAYER',
  ELEMENTS: 'ELEMENTS',
  TEXT: 'TEXT'
}

export const ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
}

export const FONT_SIZE = [
  {
    label: '18px',
    value: '18'
  },
  {
    label: '24px',
    value: '24'
  },
  {
    label: '30px',
    value: '30'
  },
  {
    label: '36px',
    value: '36'
  },
  {
    label: '42px',
    value: '42'
  },
  {
    label: '48px',
    value: '48'
  },
  {
    label: '54px',
    value: '54'
  },
  {
    label: '60px',
    value: '60'
  },
  {
    label: '66px',
    value: '66'
  },
  {
    label: '72px',
    value: '72'
  },
  {
    label: '76px',
    value: '76'
  },
  {
    label: '80px',
    value: '80'
  },
  {
    label: '86px',
    value: '86'
  },

  {
    label: '92px',
    value: '92'
  },
  {
    label: '100px',
    value: '100'
  },
  {
    label: '106px',
    value: '106'
  },
  {
    label: '112px',
    value: '112'
  },
  {
    label: '118px',
    value: '118'
  },
  {
    label: '124px',
    value: '124'
  },
  {
    label: '130px',
    value: '130'
  },
  {
    label: '136px',
    value: '136'
  },
  {
    label: '142px',
    value: '142'
  },
  {
    label: '150px',
    value: '150'
  },
  {
    label: '154px',
    value: '154'
  },
  {
    label: '160px',
    value: '160'
  }
]
