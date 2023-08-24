import { Checkbox } from '@chakra-ui/react';
import { Form } from 'dhm/containers/form';
import { COLORS } from 'dhm/utils/constants/style';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  .chakra-checkbox__control {
    width: 32px;
    height: 32px;
  }
`;

export function CheckboxForm2({ name, label, type, onlyView, onChange, ...rest }) {
  const { FormContainer } = Form;
  const formProps = {
    name,
    label,
    onlyView,
    type,
    formElement: (connectForm) => (
      <Wrapper>
        <Checkbox
          colorScheme={COLORS.white}
          iconColor={COLORS.black_primary}
          borderColor={COLORS.gray_700}
          width='100%'
          onChange={onChange}
          {...connectForm}
          {...rest}
        >
          {label}
        </Checkbox>
      </Wrapper>
    ),
  };

  return <FormContainer {...formProps} />;
}

CheckboxForm2.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  onlyView: PropTypes.bool,
};

CheckboxForm2.defaultProps = {
  isChecked: false,
  onChange: () => {},
  onlyView: false,
};
