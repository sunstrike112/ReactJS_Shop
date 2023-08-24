import { Textarea } from '@chakra-ui/react';
import { Form } from 'dhm/containers/form';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toKatakana } from 'wanakana';
// import { regex } from 'dhm/services/form/regex';

const Wrapper = styled.div`
  .chakra-textarea {
    height: ${({ height }) => (height ? `${height}px` : '150px')};
    border: ${BORDERS.border_1(COLORS.gray_primary)};
    border-radius: 0px;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${COLORS.gray_primary};
    }
  }
`;

export function TextareaForm({ name, label, defaultValue, onlyView, height, styleError, styleWrapperForm, ...rest }) {
  const { FormContainer } = Form;
  const handleInputKana = (event) => {
    const { value } = event.target;
    const kana = toKatakana(value);
    event.target.value = kana;
  };
  const chooseSetValue = {
    employeeNameKana: handleInputKana,
  };
  const formProps = {
    name,
    label,
    onlyView,
    formElement: (connectForm) => (
      <Wrapper height={height}>
        <Textarea
          onInput={chooseSetValue[name] || null}
          background={COLORS.white}
          borderColor={rest?.isDisabled ? `#646464 !important` : COLORS.gray_700}
          boxShadow={rest?.isDisabled && `none !important`}
          {...connectForm}
          {...rest}
        />
      </Wrapper>
    ),
    isDisabled: rest?.isDisabled,
    styleError,
    styleWrapperForm,
  };
  return <FormContainer {...formProps} />;
}

TextareaForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.object,
};

TextareaForm.defaultProps = {
  label: '',
  validation: {},
  // defaultValue: '',
};
