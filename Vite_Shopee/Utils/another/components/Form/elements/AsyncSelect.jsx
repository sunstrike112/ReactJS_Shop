import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getDropdown } from 'dhm/store/common/action';
import { Form } from 'dhm/containers/form';
import LanguageContext from 'dhm/contexts/TranslateContext';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import styled from 'styled-components';
import { formService } from 'dhm/services/form';
import { messages } from 'dhm/services/form/messages';
import { isHaveValueInArray } from 'dhm/utils/helpers/condition';

const Wrapper = styled.div`
  .react-select {
    > div {
      border-radius: 0px;
      border: ${BORDERS.border_1(COLORS.gray_700)};
    }
  }
`;

const { FormContainer } = Form;

export function AsyncSelectForm({
  typeDropdown,
  name,
  label,
  stylesProps,
  onlyView,
  originValue,
  defaultValue,
  methods,
  // isPreventSetValue = false,
  styleWrapperForm = {},
  styleError = {},
  ...rest
}) {
  const { statusValidation } = formService;
  const dispatch = useDispatch();
  const { dropdown } = useSelector((state) => state.common);
  const { tForm } = useContext(LanguageContext);
  const options = dropdown[typeDropdown] || [];
  useEffect(() => {
    if (!isHaveValueInArray(options, originValue)) {
      methods?.setValue(name, null);
    }
  }, []);
  useEffect(() => {
    const payload = {
      type: {
        codeListIds: [typeDropdown],
      },
    };
    dispatch(getDropdown(payload));
  }, []);

  const formProps = {
    name,
    label,
    onlyView,
    formElement: (connectForm) => (
      <Wrapper>
        <Select
          {...connectForm}
          className='react-select'
          onChange={(value) => {
            methods?.setValue(name, value?.value || null);
            if (value) {
              methods?.clearErrors(name);
            } else if (statusValidation(name).isRequired) {
              methods?.setError(name, {
                type: 'required',
                message: messages[name]?.required,
              });
            }
          }}
          defaultOptions
          options={options}
          defaultValue={originValue ? options.find((option) => option.value === originValue) : defaultValue}
          value={methods?.getValues(name) && options.find((option) => option.value === methods?.getValues(name))}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 100,
            }),
            control: (provided) => ({
              ...provided,
              border: methods?.formState?.errors[name]
                ? `${BORDERS.border_1('#E53E3E')} !important`
                : BORDERS.border_1(COLORS.gray_700),
              boxShadow: methods?.formState?.errors[name] ? '0 0 0 1px #E53E3E !important' : 'none',
              fontSize: '15px',
            }),
            ...stylesProps,
          }}
          isClearable
          noOptionsMessage={() => tForm('noData')}
          placeholder={tForm('placeholderSelect')}
          {...rest}
        />
      </Wrapper>
    ),
    styleWrapperForm,
    styleError,
  };

  return <FormContainer {...formProps} />;
}
