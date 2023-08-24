import styled from 'styled-components'

export const EditorWrapper = styled.div`
  .area-text {
    border: 1px solid #F1F1F1;
    border-radius: 4px;
    resize: none;
    padding: 12px 17px;
    &:focus {
      box-shadow: 0 0 0 1px ${({ theme }) => theme.talk_primary};
    }
  .ant-btn {
    background: ${({ theme }) => theme.talk_primary};
    border: 1px solid ${({ theme }) => theme.talk_primary};
    padding: 12px 48px;
    height: fit-content;
    border-radius: 6px;
    &.disabled {
      color: rgba(0, 0, 0, 0.25);
      border-color: ${({ theme }) => theme.bg_border};
      background: ${({ theme }) => theme.white_disable};
    }
  }
  }
  .group-upload {
    display: flex;
    align-items: center;
    gap: 12px;
    .upload-image {
      border: 1px solid ${({ theme }) => theme.talk_primary};
      display: flex;
      align-items: center;
      padding: 12px 28px;
      color: ${({ theme }) => theme.talk_primary};
      gap: 8px;
      border-radius: 6px;
    }
  }

  .button__box {
    display: flex;
    justify-content: flex-end;
  }
`

export const EmptyCommentWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 42px;
  margin-bottom: 145px;
  img {
    margin-bottom: 8px;
  }
`

export const WrapperSpin = styled.div`
  .ant-spin {
    width: 100%;
  }
`
