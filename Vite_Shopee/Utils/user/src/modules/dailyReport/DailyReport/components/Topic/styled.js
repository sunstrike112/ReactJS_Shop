import styled from 'styled-components'

export const StyledWrapper = styled.div`
  background-color: ${({ theme }) => theme.white};
  position: relative;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;
  margin-bottom: 20px;
  .title-wrapper {
    cursor: default;
    .date__group {
      .ant-space-item:nth-child(3) {
        cursor: pointer;
        padding-top: 5px;
      }
    }
  }
  .show__more {
    display: flex;
    cursor: pointer;
  }
  .content__des {
    line-height: ${({ lineHeight }) => `${lineHeight}`};
    margin-bottom: 8px;
    overflow-wrap: break-word;
    margin-right: 18px;
    display: -webkit-box;
    -webkit-line-clamp: ${({ isDisplayContentWithoutExpand }) => (isDisplayContentWithoutExpand ? 3 : 'unset')};
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    white-space: pre-wrap;
  }
  .content {
    .content__title {
      display: inline-block;
    }
    p {
      padding-right: 10px;
      word-break: break-word;
    }
  }
  .ant-dropdown {
    min-width: 180px;
    padding: 5px 0;
  }
  .ant-dropdown-menu-item {
    padding: 4px 12px;
    div {
      padding: 6px 14px;
    }
    &:hover {
      background-color: ${({ theme }) => theme.talk_hover};
    }
  }

  .date__group {
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-space-item img {
      padding-bottom: 3px;
    }
    .anticon {
      color: ${({ theme }) => theme.text_primary};
    }
  }

  .content {
    &__title {
      padding-bottom: 12px;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 103px;
        height: 1px;
        background-color: black;
      }
    }
    &__des {
      margin: 10px 0;
    }
    &__social {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  }

  .topic__media {
    width: 100%;
    overflow-y: hidden;
    .ant-image {
      margin-bottom: 16px;
      max-width: 458px;
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    &.show-more-media {
      max-height: max-content;
      overflow-y: unset;
      display: flex;
      flex-direction: column;
    }
  }
`

export const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 11px 14px;
  .text {
    margin-left: 14px;
  }
`
