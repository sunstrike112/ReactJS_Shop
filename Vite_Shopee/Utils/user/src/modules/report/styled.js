import styled from 'styled-components'
import { MEDIA_WIDTHS } from '../../themes'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 60px;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  flex-direction: column;
  align-self: center;
  background: ${({ theme }) => theme.white};
  border: 1px solid #F1F1F1;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 32px;
  margin: 24px 0;
  @media screen and (max-width: ${MEDIA_WIDTHS.upToLarge}px) {
    width: 100%;
  }
  @media screen and (max-width: ${MEDIA_WIDTHS.upToExtraSmall}px) {
    padding: 16px;
  }
  img {
    width: 100%;
    margin-top: 24px;
    margin-bottom: 12px;
  }
  span {
    margin-left: 4px;
  }

  .file {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    align-self: flex-end;
  }
  .mr_12 {
    margin-top: 12px;
  }
  .mr_40 {
    margin-top: 40px;
  }
  .nameReport {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .expect-16-9 {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    .current-image {
      position: absolute;
      border-radius: 4px;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }
`
export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  margin-top: ${({ marginTop }) => marginTop || '24px'};;
  background: ${({ theme, background }) => theme[background] || theme.white};
  padding: ${({ padding }) => padding || 0};
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F1F1F1;
  width: 100%;
  height: 1px;
  margin-top: 12px;
`

export const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, background }) => theme[background] || theme.white_blue};
  
  border-radius: 4px;
  border: ${({ border }) => border || 'none'};
  width: 50%;
  padding: 16px 32px;
  margin-top: 40px;
  margin-bottom: 80px;
  align-self: center;
`
