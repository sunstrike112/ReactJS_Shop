import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../themes'

export const EditWrapper = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 8px;
  button {
    border-radius: 6px;
    margin-left: 205px;
    margin-top: 10px;
    padding: 12px 28px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 100%;
      margin-left: 0;
    }
  }
`
export const EditHeader = styled.div`
  padding: 33px;
  border-bottom: 1px solid ${({ theme }) => theme.grey_blur};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 15px;
  }
`
export const EditBody = styled.div`
  padding: 33px 20px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 15px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 16px;
  }
`

export const ContentImage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 6px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column;
  }
  .require {
    margin-bottom: 32px;
  }
  .upload {
    width: max-content;
    padding: 8px 28px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.green};
    border-radius: 6px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      width: 100%;
      justify-content: center;
    }
    input {
      display: none;
    }
    &__text {
      margin-left: 10px;
    }
  }
`

export const ContentInfo = styled.div`
  margin-top: 48px;
`

export const Avatar = styled.div`
  position: relative;
  margin-right: 25px;
  display: flex;
  min-width: 180px;
  width: 180px;
  height: 180px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    margin-right: 0;
    margin-bottom: 20px;
  }

  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    border: solid 2px ${({ theme }) => theme.grey_blur};
  }

  .upload-avatar {
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: solid 2px ${({ theme }) => theme.green};
    justify-content: center;
    align-items: center;
    bottom: 10px;
    right: 20px;
    background: ${({ theme }) => theme.white};
    img {
      width: 24px;
      height: 24px;
    }
  }
  
  .remove {
    display: none;
  }

  :hover {
    .remove {
    display: ${({ isEmpty }) => (isEmpty ? 'flex' : 'none')};
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    top: 10px;
    right: 20px;
    background: ${({ theme }) => theme.white};
    img {
      width: 20px;
      height: 22px;
      }
    }
  }
`

export const UpdateImageBtnWrapper = styled.div`
  display: flex;

  .edit__image-btn {
    margin-top: 0;
    margin-left: 18px;

    p {
      margin: auto;
    }

    &:disabled {
      background-color: #cccccc;
    }
  }
`

export const UpdateImageDeleteWrapper = styled.div`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${({ theme }) => theme.primary_btn};
    border-color: ${({ theme }) => theme.primary_btn};
  }
  
  margin-bottom: 1rem;
`
