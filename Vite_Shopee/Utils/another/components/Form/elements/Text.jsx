import { Flex, Input } from '@chakra-ui/react';
import { Form } from 'dhm/containers/form';
import { COLORS } from 'dhm/utils/constants/style';
import { addColonIntoString, addCommasCurrency } from 'dhm/utils/helpers/method';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toKatakana } from 'wanakana';

const WrapperFlex = styled(Flex)`
  .chakra-input:disabled {
    opacity: 0.6;
  }
`;

export function InputForm({
  name,
  label,
  defaultValue,
  onlyView,
  setValue,
  styleWrapperForm,
  styleError,
  otherOnInput = null,
  ...rest
}) {
  const { FormContainer } = Form;
  const handleInputKana = (event) => {
    const { value } = event.target;
    const kana = toKatakana(value);
    event.target.value = kana;
  };
  const handleInputCurrency = (event) => {
    const { value } = event.target;
    setValue(name, addCommasCurrency(value.replace(/[^0-9]/g, '')));
  };
  const handleInputOvertime = (event) => {
    const { value } = event.target;
    setValue(name, addColonIntoString(value.replace(/[^0-9]/g, '')));
  };
  const chooseSetValue = {
    employeeNameKana: handleInputKana,
    unitPrice: handleInputCurrency,
    sellTeam: handleInputCurrency,
    monthlyOtLimit: handleInputOvertime,
  };
  const formProps = {
    name,
    label,
    onlyView,
    formElement: (connectForm) => (
      <WrapperFlex>
        <Input
          onInput={chooseSetValue[name] || otherOnInput || null}
          background={COLORS.white}
          borderColor={rest?.isDisabled ? `#646464 !important` : COLORS.gray_700}
          boxShadow={rest?.isDisabled && `none !important`}
          marginLeft='1px'
          {...connectForm}
          {...rest}
        />
      </WrapperFlex>
    ),
    isDisabled: rest?.isDisabled,
    styleWrapperForm,
    styleError,
  };
  return <FormContainer {...formProps} />;
}

InputForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.object,
};

InputForm.defaultProps = {
  label: '',
  validation: {},
  // defaultValue: '',
};
