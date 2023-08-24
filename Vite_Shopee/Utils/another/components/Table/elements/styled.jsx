import { Tag } from '@chakra-ui/react';
import styled from 'styled-components';

const WrapperTable = styled.div``;

const status = {
  active: {
    color: 'green',
  },
  inactive: {
    color: 'red',
  },
};
function StatusText({ type, children }) {
  return (
    <Tag size='md' colorScheme={status[type].color}>
      {children}
    </Tag>
  );
}

export { WrapperTable, StatusText };
