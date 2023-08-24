import { Textarea } from '@chakra-ui/react';
import { Form } from 'dhm/containers/form';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toKatakana } from 'wanakana';

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

export function FormTextArea({ name, label, defaultValue, onlyView, height, styleError, ...rest }) {
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
        <Textarea onInput={chooseSetValue[name] || null} background={COLORS.white} {...connectForm} {...rest} />
      </Wrapper>
    ),
    isDisabled: rest?.isDisabled,
    styleError,
  };
  return <FormContainer {...formProps} />;
}

FormTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validation: PropTypes.object,
};

FormTextArea.defaultProps = {
  label: '',
  validation: {},
  // defaultValue: '',
};
