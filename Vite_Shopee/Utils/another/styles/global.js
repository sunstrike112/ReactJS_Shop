import { createGlobalStyle, css } from 'styled-components';
import { classCss } from './class';

const scrollbar = css`
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
`;
const hiddenCalendar = css`
  background-position: right;
  background-size: auto;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  width: auto;
`;
const resetCss = css`
  * {
    border-radius: 0;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    overflow: hidden;
    /* max-width: 1600px;
    margin: auto; */
    .chakra-modal__content-container {
      background: rgba(12, 9, 10, 0.3);
    }
  }
  div,
  span {
    white-space: pre-wrap;
  }
  input {
    position: relative;
    border-radius: 0 !important;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    ${hiddenCalendar}
  }
  input[type='month']::-webkit-calendar-picker-indicator {
    ${hiddenCalendar}
  }
  select {
    border-radius: 0 !important;
  }
  .react-datepicker__close-icon {
    right: 20px;
    ::after {
      line-height: 1.5px;
      background-color: #fff;
      color: hsl(0, 0%, 80%);
      font-size: 21px;
      font-weight: 500;
      transform: scale(1, 1.2) translateY(-1.1px);
    }
    &:hover {
      ::after {
        color: #999999;
      }
    }
  }
  .recharts-legend-wrapper {
    top: -8px !important;
    left: -2px !important;
  }

  /* Treeview checkbox */
  .filter_checked-icons {
    scale: 1.2;
    translate: 0 1px;
  }

  .rct-node-icon {
    padding: 0;
  }
  .disabled_collapse_treeview {
    .filter_checked-icons {
      &--expand {
        display: none;
      }
    }
  }
  .rct-node-leaf {
    label {
      display: flex;
      .rct-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        width: 175px;
      }
    }
  }
  // Reset RC-Tree
  .rc-tree-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    width: 185px;
  }
  .rc-tree-checkbox,
  .rc-tree-switcher {
    background-image: none !important;
    font-family: 'Font Awesome 6 Free';
    vertical-align: baseline !important;
  }
  .rc-tree-checkbox {
    scale: 1.2;
    width: 16px !important;
    height: 14px !important;
    &::before {
      content: '\f0c8';
    }
    &.rc-tree-checkbox-indeterminate {
      &::before {
        content: '\f146';
        font-weight: 800;
      }
    }
    &.rc-tree-checkbox-checked {
      &::before {
        content: '\f14a';
      }
    }
  }
  .rc-tree-switcher {
    &::before {
      content: '\f0fe';
    }
    &.rc-tree-switcher_open {
      &::before {
        content: '\f146';
      }
    }
    &.rc-tree-switcher-noop {
      &::before {
        opacity: 0 !important;
      }
    }
  }
`;

const resetDrawer = css`
  #chakra-modal-basic_info {
    max-width: 1000px;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${scrollbar}
    ${resetCss}
    ${resetDrawer}
    ${classCss}
`;

export { GlobalStyle };
