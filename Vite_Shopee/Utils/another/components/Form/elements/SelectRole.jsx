import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getDropdownRole } from 'dhm/store/common/action';
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

export function SelectRole({
  name,
  label,
  stylesProps,
  onlyView,
  originValue,
  defaultValue,
  methods,
  // isPreventSetValue = false,
  ...rest
}) {
  const { statusValidation } = formService;
  const dispatch = useDispatch();
  const { dropdownRole } = useSelector((state) => state.common);
  const { tForm } = useContext(LanguageContext);
  useEffect(() => {
    if (!isHaveValueInArray(dropdownRole, originValue)) {
      methods?.setValue(name, null);
    }
  }, []);
  useEffect(() => {
    dispatch(getDropdownRole());
  }, []);
  const options = dropdownRole.map((item) => ({
    value: item?.roleId,
    label: item?.roleId,
  }));
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
          {...rest}
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
            }),
            ...stylesProps,
          }}
          isClearable
          noOptionsMessage={() => tForm('noData')}
          placeholder={tForm('placeholderSelect')}
        />
      </Wrapper>
    ),
  };

  return <FormContainer {...formProps} />;
}
