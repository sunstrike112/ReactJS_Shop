import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../../../../themes'

export const WorkSpaceItem = styled.div`
  width: calc(25% - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${MEDIA_WIDTHS.upToMedium}px) {
    width: calc(50% - 10px);
  }

  .ant-spin-nested-loading {
    width: 100%;
  }

  .card_item {
    border-radius: 10px;
    width: 100%;

    &_img {
      width: 100%;
      height: 250px;
      object-fit: contain;
      @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
        height: 200px;
      }
    }

    .ant-card-body {
      padding: 10px;
    }

    &.active {
      border-color: transparent;
      box-shadow: 0 1px 2px -2px rgb(0 0 0 / 16%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 5px 12px 4px rgb(0 0 0 / 9%);
    }
  }

  .workspace_name {
    margin-top: 10px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
