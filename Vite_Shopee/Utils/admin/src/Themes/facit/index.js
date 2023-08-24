import styled from 'styled-components'
import { Divider as DividerAntd } from 'antd'
import { Link } from 'react-router-dom'
import { MEDIA_WIDTHS } from 'Themes'
import { Modal } from 'Components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 39px);
  display: flex;
  width: 100%;
  padding: 0 1rem;
  flex-direction: column;
	overflow-y: auto;
	overflow-x: hidden;
  color: ${({ theme }) => theme.text_primary};

  .anticon-search {
    margin-right: 0;
  }

  .form-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.white};
    border-radius: 0.75rem;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 5%);

    form {
      width: 70%;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
        width: 100%;
      }
    }

    .form-action-group {
      margin: 1rem 0;
      text-align: center;
    }
  }

  .ant-form.ant-form-horizontal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .ant-form.ant-form-horizontal > div:nth-child(1) {
      margin-right: 110px;
  }

  .ant-form-vertical .ant-form-item {
    flex-direction: row;
  }

  form.ant-form.ant-form-vertical {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dropdown-tree-select {
    padding: 0 4px 0 0;
    word-break: break-word;
  }

  .title{
    font-size: 18px;
    margin: 16px 0 16px 0;

    .title__main{
      font-weight: 600;
    }
  }

  .top-actions{
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .bottom-actions{
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }
  .ant-table-cell{
    padding: 5px 10px;
  }
`

// column table
export const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

// detail screen
export const Block = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: .75rem;
  margin: 1rem 0;
  padding: 1rem;
  .block-head {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`

// Row Wrapper
export const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    flex-direction: column;
  }
`

export const Table = styled.table`
  width: 70%;
  margin: 2rem auto;
  box-shadow: 0 .8rem 3rem rgba(0,0,0,.075);
  border-radius: .75rem;
`

export const TBody = styled.tbody`
  tr {
    &:first-child {
      td {
        &:first-child {
          border-top-left-radius: .75rem;
        }
        &:last-child {
          border-top-right-radius: .75rem;
        }
      }
    }
    &:last-child {
      td {
        &:first-child {
          border-bottom-left-radius: .75rem;
        }
        &:last-child {
          border-bottom-right-radius: .75rem;
        }
      }
    }
    &:not(:last-child) {
      border-bottom: ${({ theme }) => `1px solid ${theme.bd_divider}`};
    }
  }
`

export const Tr = styled.tr`
`

export const Th = styled.td`
  background-color: #d3dafe;
  border: none;
  width: 200px;
  padding: 1rem;
  font-weight: 600;
`

export const Td = styled.td`
  background-color: #e7eef8;
  border: none;
  padding: 1rem;
  white-space: pre-wrap;
  word-break: break-all;
  word-wrap: break-word;
`
// detail screen

// create/edit divider
export const Divider = styled(DividerAntd)`
  height: 2px;
  padding: 0;
  margin : 0;
`
// create/edit RightWrapper
export const Right = styled.div`
  display: flex;
  width: 70%;
  padding: ${({ noInput }) => (noInput ? '16px 16px 16px 27px' : '16px')};
  flex-direction: column;
  word-break: break-all;
	gap: ${({ gap }) => (gap || 0)};

  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    width: 100%;
  }

  &.row__box {
    flex-direction: row;
    justify-content: space-between;
  }


  .ant-form-item {
    margin-bottom: 0;
  }

  &.form-editor-content-question {
    .ant-row {
      margin-bottom: 0 !important;
    }
    p {
      margin-bottom: 0;
    }
  }
`

// back to home page
export const BackButton = styled(Link)`
  color: #4d69fa;
  background-color: ${({ active }) => (active ? '#edf0ff' : 'transparent')};
  padding: ${({ active }) => (active ? '.4rem .85rem' : 0)};
  border-radius: ${({ active }) => (active ? '.75rem' : 0)};
  & svg {
    margin-right: .5rem;
  }

  &:hover {
    color: #4d69fa;
    background-color: #edf0ff;
    padding: .4rem .85rem;
    border-radius: .75rem;
  }
`

export const ModalMobile = styled(Modal)`
	width: 100vw;
`
