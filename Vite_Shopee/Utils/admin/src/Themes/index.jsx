/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react'
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css
} from 'styled-components'
import colors from './colors'
import { fontSize, fontWeight } from './fonts'
import MSMINCHO from '../Assets/fonts/mincho/msmincho.ttf'
import MEIRYO from '../Assets/fonts/meiryo/meiryo.ttf'
import MEIRYOB from '../Assets/fonts/meiryo/meiryob.ttf'
import GOTHIC from '../Assets/fonts/gothic/GOTHIC.TTF'
import GOTHICB from '../Assets/fonts/gothic/GOTHICB.TTF'
import GOTHICBI from '../Assets/fonts/gothic/GOTHICBI.TTF'
import GOTHICI from '../Assets/fonts/gothic/GOTHICI.TTF'
import KOKORO from '../Assets/fonts/kokoro/kokoro.otf'

export const MEDIA_WIDTHS = {
  upToUnderExtraSmall: 328,
  upToExtraSmall: 480,
  upToSmall: 768,
  upToMedium: 1024,
  upToLarge: 1200
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce(
  (accumulator, size) => {
    accumulator[size] = (a, b, c) => css`
			@media (max-width: ${MEDIA_WIDTHS[size]}px) {
				${css(a, b, c)}
			}
		`
    return accumulator
  },
  {}
)
const input = {
  input_small: '380px',
  input_medium: '512px',
  input_large: '810px'
}

export const theme = () => ({
  ...colors,
  ...fontSize,
  ...fontWeight,
  grids: {
    sx: 8,
    sm: 16,
    md: 24,
    lg: 32
  },
  // font size for text
  size_16: '16px',
  size_17: '17px',
  size_18: '18px',
  size_14: '14px',
  size_13: '13px',
  size_12: '12px',

  ...input,
  // media queries
  mediaWidth: mediaWidthTemplates
})

export default function ThemeProvider({ children, themeGlobal }) {
  return (
    <StyledComponentsThemeProvider theme={themeGlobal}>
      {children}
    </StyledComponentsThemeProvider>
  )
}

export const ThemedGlobalStyle = createGlobalStyle`
html, body {
  width: 100%;
  height: 100%;

  @font-face {
    font-family: 'MS Mincho';
    src: url(${MSMINCHO}?) format('truetype');
  }

  @font-face {
    font-family: 'Meiryo';
    src: url(${MEIRYO}?) format('truetype');
  }

  @font-face {
    font-family: 'Meiryo';
    font-weight: bold;
    src: url(${MEIRYOB}?) format('truetype');
  }

  @font-face {
    font-family: 'Century Gothic';
    src: url(${GOTHIC}?) format('truetype');
  }

  @font-face {
    font-family: 'Century Gothic';
    font-weight: bold;
    src: url(${GOTHICB}?) format('truetype');
  }

  @font-face {
    font-family: 'Century Gothic';
    font-weight: bold;
    font-style: italic;
    src: url(${GOTHICBI}?) format('truetype');
  }

  @font-face {
    font-family: 'Century Gothic';
    font-style: italic;
    src: url(${GOTHICI}?) format('truetype');
  }

	@font-face {
	font-family: 'Kokono';
	font-weight: bold;
  font-style: italic;
	src: url(${KOKORO}?) format('truetype');
}
}
body {
  font-family: 'Poppins', system-ui, -apple-system, "MS Mincho", "Meiryo", "Century Gothic"
  "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
  "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Segoe UI Symbol", "Noto Color Emoji";
  background-color: ${({ theme }) => theme.white};
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
  #root {
    width: 100%;
    height: 100%;
  }

  // remove unnecessary whitespace in formTimePicker
  .ant-picker-time-panel-column {
    &:after {
      content: none;
    }
  }
}

.truncate {
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// antd custom
.ant-dropdown {
  width: 300px;  // overwrite width of ant-design
  .ant-dropdown-menu {
    border-radius: 1rem;
    .ant-dropdown-menu-item, .ant-dropdown-menu-submenu {
      border-radius: 1rem;
      padding: 0.5rem;
      margin: .25rem .5rem;
      color: #808191;
      &:not(.ant-dropdown-menu-item-disabled) {
        &:hover {
          background-color: #f0effb;
          color: #6c5dd3;
          .logout-icon {
            fill: #6c5dd3;
          }
        }
      }
      .ant-dropdown-menu-title-content {
        display: flex;
        align-items: center;
      }
      .ant-dropdown-menu-submenu-title{
        display: flex;
        align-items: center;
        padding: 0;
        background: transparent;
        color: #808191;
        &:hover {
          background-color: #f0effb;
          color: #6c5dd3;
          .logout-icon {
            fill: #6c5dd3;
          }
        }
      }
    }
    .ant-dropdown-menu-item-divider {
      width: 90%;
      margin: 0 auto;
    }
}
}
.ant-btn {
  border-radius: .75rem;
  &.ant-btn-primary {
    background-color: #4d69fa;
    border-color: #4d69fa;
  }

  &.ant-btn-primary[disabled] {
    background-color: #f5f5f5;
    border-color: #d9d9d9;
  }
}

.ant-input, .ant-input-affix-wrapper {
  color: ${({ theme }) => theme.text_primary};
  font-size: .8rem;
  font-weight: 600;
  border: 1px solid #f8f9fa;
  background-color: #f8f9fa;
  border-radius: 1rem !important;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:focus, &:hover {
    background-color: #f8f9fa;
    border-color: #b6aee9;
    outline: 0;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(108 93 211 / 25%);
  }
}

.input-number {
  border: 1px solid #f8f9fa;
  background-color: #f8f9fa;
  border-radius: 1rem !important;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:focus, &:hover {
    color: #323232;
    background-color: #f8f9fa;
    border-color: #b6aee9;
    outline: 0;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(108 93 211 / 25%);
  }

  & .prefix {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
  & .ant-input-number {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

		&.ant-input-number-status-error {
			input {
				border: 1px solid ${({ theme }) => theme.error_ant};
				background: white;
			}
		}

    & .ant-input-number-input {
      color: ${({ theme }) => theme.text_primary};
			background-color: ${({ theme }) => theme.bg_input};
      font-size: .8rem;
      font-weight: 600;
			border-radius: 1rem;


    }
    & .ant-input-number-handler-wrap {
      background-color: transparent;
    }
  }
}


.ant-select {
  color: ${({ theme }) => theme.text_primary};
  font-size: .8rem;
  font-weight: 600;
  border: 1px solid #f8f9fa;
  background-color: #f8f9fa;
  border-radius: 1rem !important;
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%);
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:focus, &:hover {
    color: #323232;
    background-color: #f8f9fa;
    border-color: #b6aee9;
    outline: 0;
    box-shadow: inset 0 1px 2px rgb(0 0 0 / 8%), 0 0 0 0.25rem rgb(108 93 211 / 25%);
  }

  & .ant-select-selector {
    background-color: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }
}

.ant-message {
  z-index: 9999;
}
.ant-tree {
  border-radius: .75rem;
}

.ant-popover {
  max-width: 600px;
  .ant-popover-inner {
    border-radius: .75rem;
    .ant-popover-message-title {
      white-space: pre-wrap;
    }
    .ant-popover-buttons {
      text-align: center !important;
    }
  }

  &.tooltip-actions-right{
    .ant-popover-inner {
      .ant-popover-buttons {
        text-align: right;
      }
    }
  }

  &.tooltip-actions-left{
    .ant-popover-inner {
      .ant-popover-buttons {
        text-align: left;
      }
    }
  }

  &.group-popover, &.attribute-popover {
    max-width: 200px;
    .ant-popover-inner-content {
      max-height: 350px;
      overflow: auto;
      .ant-tag {
        margin-bottom: .25rem;
        white-space: unset;
      }
    }
  }
}

.preview-modal {
  .ant-modal-title {
    width: 90%;
  }
}

.row-dragging {
  z-index: 1000;
  max-width: 100%;
}

.ant-tabs-tab-active{
  background: #5d4eb3;
}

.ant-select-dropdown:not(.ant-select-dropdown-hidden):not(.no-scroll) .rc-virtual-list-scrollbar {
  display: block !important; /* important to overwrite inline style display: none */
}
.ant-select-tree-list-scrollbar {
  &.ant-select-tree-list-scrollbar-show {
    display: block !important; /* important to overwrite inline style display: none */
  }
}
`
