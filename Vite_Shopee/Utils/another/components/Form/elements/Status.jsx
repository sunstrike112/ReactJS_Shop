import { Checkbox } from '@chakra-ui/react';
import { Form } from 'dhm/containers/form';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  .chakra-checkbox__control {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export function StatusForm({ name, type, onlyView, isChecked, onChange, ...rest }) {
  const { FormContainer } = Form;
  const formProps = {
    name,
    onlyView,
    type,
    formElement: (connectForm) => (
      <Wrapper>
        <Checkbox width='100%' value={isChecked} onChange={onChange} {...connectForm} {...rest} />
      </Wrapper>
    ),
  };

  return <FormContainer {...formProps} />;
}

StatusForm.propTypes = {
  name: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onlyView: PropTypes.bool,
};

StatusForm.defaultProps = {
  isChecked: false,
  onChange: () => {},
  onlyView: false,
};
