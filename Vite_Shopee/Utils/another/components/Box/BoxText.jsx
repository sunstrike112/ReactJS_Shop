import { Box, Tooltip } from '@chakra-ui/react';
import styled from 'styled-components';

const BoxStyled = styled(Box)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${({ line }) => line || 1};
  -webkit-box-orient: vertical;
`;
const BoxFlex = styled(Box)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
function BoxText({ ...props }) {
  return (
    <Tooltip label={props.children}>
      <BoxStyled {...props} />
    </Tooltip>
  );
}

function BoxTextFlex({ contentTooltip = null, ...props }) {
  return (
    <Tooltip label={contentTooltip ?? props.children}>
      <BoxFlex fontSize='10px' {...props} />
    </Tooltip>
  );
}

export { BoxText, BoxTextFlex };
