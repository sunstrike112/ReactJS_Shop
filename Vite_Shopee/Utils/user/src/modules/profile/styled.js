/* eslint-disable eol-last */
import styled from 'styled-components'
import { TextNormal } from '../../components'
import { MEDIA_WIDTHS } from '../../themes'

export const ProfileWrapper = styled.div`
  padding: 48px 332px;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    padding: 48px 80px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 48px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 48px 20px;
  }

  .content {
    padding: 32px;
    border: 1px solid ${({ theme }) => theme.grey_blur};
    border-radius: 8px;
    color: ${({ theme }) => theme.text_primary};
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      padding: 24px;
    }

    @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
      padding: 16px;
    }
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      padding: 15px;
    }

    &__header {
      display: flex;
      align-items: center;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        flex-direction: column;
      }
      &--avatar {
        margin-right: 25px;
        width: 180px;
        height: 180px;
        border-radius: 90px;
        object-fit: cover;
        @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
          margin-bottom: 20px;
          margin-right: 0;
        }
      }
      &--profile {
        .wrapper-icon {
          display: flex;
          flex-direction: row;
          img {
            margin-right: 5px;
          }
        }
        p {
          @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
            text-align: center;
          }
        }
        p:nth-child(1) {
          margin-bottom: 8px;
        }
        p:nth-child(5) {
          margin-bottom: 15px;
        }
        &__edit {
          display: flex;
          align-items: center;
          border: none;
          background: transparent;
          cursor: pointer;
          @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }
          span {
            margin-left: 6px;
            color: ${({ theme }) => theme.green} !important;
            font-size: ${({ theme }) => theme.size_15};
          }
        }
      }
    }
    &__info {
      margin-top: 52px;
      max-width: 100%;
      &--title {
        margin-bottom: 20px;
        @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
          text-align: center;
        }
      }
      tbody {
        tr {
          td {
            padding-bottom: 32px;
            p {
              text-align: justify;
              word-break: break-all;
              &.text__overview {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
            }
          }
          td:nth-child(1) {
            width: 250px;
            display: flex;
            align-items: start;
            @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
              width: 105px;
            }
          }
        }
      }
    }
  }
`
export const Wrapper = styled.div`
  padding: 48px 50px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    padding: 48px 20px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    padding: 60px 36px;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    padding: 48px 24px;
  }
  .title {
    margin-bottom: 24px;
  }
`
export const ProfileEditContent = styled.div`
  display: flex;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    flex-direction: column;
  }
`
export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  background: ${({ theme, readOnly }) => (!readOnly ? theme.white : theme.grey_blur)};
  border-radius: 4px;
  outline: none;
  &.input__pass {
    width: 50%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      width: 100%;
    }
  }
  &:focus {
    border: 1px solid ${({ theme, readOnly }) => (!readOnly ? theme.green : theme.grey_blur)};
  }
  &.error {
    border-color: ${({ theme }) => theme.text_danger};
  }
`

export const InputPrefix = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  background: ${({ theme, readOnly }) => (!readOnly ? theme.white : theme.grey_blur)};
  border-radius: 4px;
  outline: none;

  &:focus-within {
    border: 1px solid ${({ theme, readOnly }) => (!readOnly ? theme.green : theme.grey_blur)};
  }

  &.error {
    border-color: ${({ theme }) => theme.text_danger};
  }

  input {
    padding-left: 0;
    padding-right: 0;
    border: none;

    &:focus {
      border: none;
    }
  }
`

export const InputItem = styled.div`
  flex: 1;
  display: flex;
  margin: 0 -8px;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column;
    width: 100%;
    margin: 0;
  }

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    width: 80px;
    margin: 0;
  }
`
export const InputBox = styled.div`
  flex: 1;
  margin: 0 8px;
  position: relative;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    margin: 0 0 36px 0;
  }
  &.dropdown {
    flex: 0.5;
  }
  &.dropdown__gender {
    flex: 0.5;
    padding-right: 16px;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
      padding-right: 0;
    }
  }
  p {
    position: absolute;
    left: 0;
    top: 105%;
  }
  p.character {
    position: initial;
    font-style: italic;
  }
  .plan-select {
    width: 50%;
    .ant-select-selector {
      width: 100%;
      padding: 12px 16px;
      height: fit-content;
      border: 1px solid ${({ theme }) => theme.grey_blur};
      background: ${({ theme, readOnly }) => (!readOnly ? theme.white : theme.grey_blur)};
      border-radius: 4px;
      outline: none;
    }
  }
`

export const InputWithoutTitle = styled.div`
  padding-bottom: 36px;
  padding-left: 205px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding-left: 0;
  }
  div {
    position: relative;
    margin: 0;
    p {
      position: absolute;
      left: 0;
      top: 105%;
    }
  }
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${({ isShowErrorName }) => (isShowErrorName ? '6px' : '36px')};
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 0;
  }
  p {
    &:nth-child(1) {
      width: 205px;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        margin-bottom: 10px;
      }

      @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
        width: 140px;
      }
    }
    span {
      color: ${({ theme }) => theme.text_danger};
      margin-left: 4px;
    }
  }
`
export const Textarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.grey_blur};
  border-radius: 4px;
  outline: none;
  &.input__pass {
    width: 50%;
    @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
      width: 100%;
    }
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.green};
  }
`

export const ErrorName = styled(TextNormal)`
  padding-bottom: 12px;
  margin-left: 205px;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    margin-left: 148px;
  }
`

export const InputCustom = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 33.33%;
  p {
    margin: 0 8px;
  }
  .dropdown {
    @media screen and (max-width: 768px) {
      .ant-select .ant-select-selector {
        padding: 8px;
      }
    }
  }
`
