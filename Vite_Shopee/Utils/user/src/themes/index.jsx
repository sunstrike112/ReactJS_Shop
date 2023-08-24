/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css } from 'styled-components'
import colors from './colors'
import { fontSize, fontWeight } from './fonts'

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
  upToVeryLager: 1440,
  upToBigLager: 1690,
  upToExtraLarge: 1920
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (a, b, c) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {})

const input = {
  input_stretch: '100%',
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
  ...input,
  mediaWidth: mediaWidthTemplates
})

export default function ThemeProvider({ children, themeGlobal }) {
  return <StyledComponentsThemeProvider theme={themeGlobal}>{children}</StyledComponentsThemeProvider>
}

export const ThemedGlobalStyle = createGlobalStyle`
html, body {
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
}

body {
  background-color: ${({ theme }) => theme.bg_primary};
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    background-color: ${({ theme }) => theme.white};
  }
  #root {
    width: 100%;
    min-height: 100vh;
  }
  .select__dropdown {
    padding: 0;
    .ant-select-item {
      &.ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
        background: ${({ theme }) => theme.green_light};
      }
      &:hover {
        background: ${({ theme }) => theme.green_light};
      }
    }
  }
  .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled), .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover {
    background: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.green};
    font-weight: ${({ theme }) => theme.fw_400};
  }
  .ant-cascader-menu-item:hover {
    background: ${({ theme }) => theme.white};
  }
  .ant-cascader-menu-item-active {
    .ant-cascader-menu-item-expand-icon {
      color: ${({ theme }) => theme.green};
      &:hover {
        color: ${({ theme }) => theme.green};
      }
    }
  }
  .ant-cascader-menu-item:hover {
    color: ${({ theme }) => theme.green};
    .ant-cascader-menu-item-expand-icon {
      color: ${({ theme }) => theme.green};
    }
  }
  .ant-cascader-menu {
    min-width: 240px;
  }
  .ant-cascader-menus {
    left: 284px !important;
    top: 64px !important;
  }
  .ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner  {
    background-color: ${({ theme }) => theme.green};
    border-color: ${({ theme }) => theme.green};
  }
  .ant-select-tree-checkbox-checked .ant-select-tree-checkbox-inner:hover  {
    border-color: ${({ theme }) => theme.green};
  }
  .ant-select-tree-switcher {
    width: 17px;
  }
  .ant-tree-select-dropdown {
    width: 306px !important;
  }
  .ant-popover-inner {
    border-radius: 8px;
    box-shadow: 2px 12px 32px rgba(0, 0, 0, 0.2);
  }
  .ant-select-tree-treenode:hover {
    background: ${({ theme }) => theme.green_light};
  }
  .ant-select-tree .ant-select-tree-node-content-wrapper:hover {
    background: none;
  }
  .ant-tree-select-dropdown {
    padding: 0px;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input{
    min-height: 35px;
  }
  .ant-btn-two-chinese-chars > *:not(.anticon) { 
    letter-spacing: 0 !important; 
  }
  .ant-notification.ant-notification-topRight {
    .ant-notification-notice-close {
      top: 10px;
      right: 10px;
    }
  }
  /* customize paging for app */
  .ant-pagination-item a {
    &:hover {
      color: #00C271;
    }
  }

  .ant-pagination-item {
    &:hover {
      border-color: #00C271;
    }
  }
  
  .ant-pagination-item-active a {
    color: #00C271;
  }
  .ant-pagination-item-active {
    border-color: #00C271;
  }
  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
    &:hover {
      border-color: #00C271;
      color: #00C271;
    }
  }

  .ant-dropdown-menu {
    padding: 0;
  }

  .modal__users__active {
    .ant-modal-content {
      border-radius: 12px;
      .ant-modal-body {
        padding: 0;
      }
    }
  }
}
`
