import { Flex } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import styled from 'styled-components';

const WrapperFlex = styled(Flex)`
  .multi-select-react__control {
    border-radius: 0px;
    border: ${BORDERS.border_1(COLORS.gray_700)};
  }
  .multi-select-react__value-container {
    max-height: 65px;
    overflow: auto;
  }
  .multi-select-react__indicator-separator {
    display: none;
  }
  .chakra-button:hover,
  .chakra-button:hover[disabled] {
    background-color: ${COLORS.gray_700};
  }
`;

const FlexCard = styled(Flex)`
  min-width: 240px;
  height: 64px;
  position: relative;
  border: ${BORDERS.border_1(COLORS.gray_700)};
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
`;

const FlexRadioGroup = styled(Flex)`
  justify-content: space-around;
  align-items: center;
  position: absolute;
  right: -1px;
  top: -10px;
  width: 50px;
  height: 20px;
  background: #fff;
  border: ${BORDERS.border_1(COLORS.gray_700)};
  border-left: ${BORDERS.border_1(COLORS.gray_700)};
  border-bottom: ${BORDERS.border_1(COLORS.gray_700)};
`;

const FlexRadio = styled(Flex)`
  cursor: pointer;
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

const FlexRow = styled(Flex)`
  align-items: flex-end;
  height: 64px;
`;

const FlexTagList = styled(Flex)`
  padding-top: 10px;
  max-width: 960px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    /* background: ${COLORS.gray_500}; */
  }
  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray_primary};
  }
`;

export { WrapperFlex, FlexCard, FlexRow, FlexRadioGroup, FlexRadio, FlexTagList };
