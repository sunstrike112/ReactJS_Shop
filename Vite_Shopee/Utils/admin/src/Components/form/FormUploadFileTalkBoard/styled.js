import { Form } from 'antd'
import styled from 'styled-components'

export const WrapperFormItem = styled(Form.Item)`
  height: max-content;
  width: 100%;
  margin-bottom: 10px;

  .ant-input {
    min-height: 38px;
    border-radius: 4px;
  }

  .ant-form-item {
    margin-bottom: 0;
  }

  .ant-form-item-label {
    font-size: 14px;
    overflow: unset;
    white-space: unset;
    .ant-form-item-no-colon {
      height: 100%;
    }
  }

  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    .upload__form {
      width: 100%;
    }
  }

  .ant-upload-select {
    .ant-btn {
      padding: 12px 28px;
      height: auto;
      border-radius: 6px;
      border-color: ${({ theme }) => theme.talk_primary};
      color: ${({ theme }) => theme.talk_primary};
    }
  }

  .ant-btn {
    min-width: 230px;
  }

  .ant-upload-list {
    margin-top: 10px;
    .ant-upload-list-text-container {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .upload__error {
    margin-top: 6px;
  }

  .upload__info {
    position: absolute;
    top: ${({ positionTopIcon }) => positionTopIcon && `${positionTopIcon}px`};
    left: ${({ positionLeftIcon }) => positionLeftIcon && `${positionLeftIcon}px`};
  }
`

export const WrapperLabel = styled.div`
  width: 100%;
  font-size: 13px;
`

export const File = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  .content {
    width: 50%;
    display: flex;
    margin-right: 17px;
    &__file {
      display: flex;
      flex: 1;
      &--text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .anticon {
        margin-right: 8px;
      }
    }
    .anticon {
      display: flex;
      align-items: center;
      color: ${({ error, theme }) => (error ? theme.error_ant : theme.text_primary)};
    }
  }
`
