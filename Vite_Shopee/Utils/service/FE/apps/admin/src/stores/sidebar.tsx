import {
  atom,
} from 'recoil';
import { LEFT_SIDE_BAR_WIDTH } from '@ss-fe-fw/constants'

export const sidebarState = atom({
  key: 'sidebarState', // unique ID (with respect to other atoms/selectors)
  default: {
    collapsed: false,
    collapsedWidth: LEFT_SIDE_BAR_WIDTH,
    layoutMarginLeft: LEFT_SIDE_BAR_WIDTH,
    broken: false,
    selectedKeys: [],
  }
});
