import { DHMAssets } from 'dhm/assets/index';
import styled, { keyframes } from 'styled-components';

const Loading = styled.div`
  position: ${({ isContent = false }) => (isContent ? 'absolute' : 'fixed')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const LoadingImg = styled.img`
  animation: ${animation} 1s linear infinite;
`;
export function LoadingCommon({ ...props }) {
  return (
    <Loading {...props}>
      <LoadingImg src={DHMAssets.Loading} alt='loading' />
    </Loading>
  );
}
