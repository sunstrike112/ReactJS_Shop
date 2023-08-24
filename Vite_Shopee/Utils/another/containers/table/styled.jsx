import { Box, TableContainer, Tooltip } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/index';
import styled from 'styled-components';

const StyledTable = styled(TableContainer)`
  ::-webkit-scrollbar:horizontal {
    height: 12px;
  }
  ::-webkit-scrollbar:vertical {
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    background: #cfcfcf;
  }
  border: 1px solid rgba(224, 224, 224, 1);
`;
const BoxContent = styled(Box)`
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const defaultSizeTable = {
  heightCell: '30px ',
  padding: '9px 30px',
  paddingHeader: '17.8px 30px',
  fontSize: '14px',
};
const BoxSizingTable = styled(Box)`
  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 2px;
    background: #646464;
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer.isResizing {
    background: ${COLORS.neutral_250};
    opacity: 1;
  }

  @media (hover: hover) {
    .resizer {
      opacity: 0.5;
    }

    *:hover > .resizer {
      opacity: 1;
    }
  }
`;

const CustomTooltip = styled(Tooltip)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 15;
  -webkit-box-orient: vertical;
`;

const propsViewHistory = {
  normal: {
    border: BORDERS.border_1(COLORS.gray_700),
    colorHeader: COLORS.white,
    bgHeader: COLORS.master_primary,
  },
  viewHistory: {
    border: BORDERS.border_1(COLORS.gray_700),
    colorHeader: COLORS.prime_shade_2,
    bgHeader: 'none',
  },
  gradient: {
    border: BORDERS.border_1(COLORS.gray_700),
    colorHeader: COLORS.white,
    bgHeader: COLORS.brand_1,
  },
};
export { StyledTable, BoxContent, defaultSizeTable, BoxSizingTable, CustomTooltip, propsViewHistory };
