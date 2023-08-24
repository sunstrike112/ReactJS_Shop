import styled, { keyframes } from 'styled-components';
import { Box } from '@chakra-ui/react';

const Container = styled(Box)`
  position: relative;
`;

const rotation = keyframes`
  0% {
    opacity: 0.8;
  }
  30% {
    transform: rotate(180deg);
    opacity: 1;
  }
  40% {
    transform: rotate(360deg);
    opacity: 1;
  }
  80% {
    transform: rotate(720deg);
    opacity: 0.8;
  }
  81% {
    opacity: 0;
  }
  100% {
    transform: rotate(0deg);
    opacity: 0;
  }
`;
const Support = styled.div`
  width: 1rem;
  height: 1rem;
  position: absolute;
  animation: ${rotation} 3.8s linear infinite;
  animation-delay: ${({ index }) => `${0.15 + index * 0.15}s`};
`;
const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #000;
  position: relative;
  top: 37px;
  left: 7px;
`;

export function LoadingAnimation({ ...props }) {
  return (
    <Container {...props}>
      {[...Array(6)].map((_, index) => (
        <Support key={index} index={index}>
          <Dot />
        </Support>
      ))}
    </Container>
  );
}
