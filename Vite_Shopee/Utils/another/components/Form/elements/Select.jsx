import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import { Form } from 'dhm/containers/form';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import styled from 'styled-components';
import { formService } from 'dhm/services/form';
import { messages } from 'dhm/services/form/messages';
import { useContext, useEffect, useMemo, useState } from 'react';
import LanguageContext from 'dhm/contexts/TranslateContext';

const Wrapper = styled.div`
  .react-select {
    > div {
      border-radius: 0px;
      border: ${BORDERS.border_1(COLORS.gray_700)};
    }
  }
`;

const DEFAULT_VALUE = {
  value: '',
  label: '',
};

const { FormContainer } = Form;

export function SelectForm({
  name,
  label,
  options,
  methods,
  originValue,
  stylesProps,
  onlyView,
  defaultValue = DEFAULT_VALUE,
  styleWrapperForm = {},
  customOption = [],
  trackingValueCustom = null,
  styleError,
  otherOnChange = () => {},
  preventSelect = false,
  ...rest
}) {
  const [trickTracking, setTrickTracking] = useState(false);
  useEffect(() => {
    if (trackingValueCustom && trickTracking) {
      if (trackingValueCustom !== originValue) {
        methods?.setValue(name, null);
        setTrickTracking(false);
      }
    }
  }, [trickTracking, trackingValueCustom]);
  const { statusValidation } = formService;
  const OPTIONS = useMemo(() => [...options, ...customOption], [options, customOption]);
  const { tForm } = useContext(LanguageContext);
  const formProps = {
    name,
    label,
    onlyView,
    formElement: (connectForm) => (
      <Wrapper>
        <ReactSelect
          className='react-select'
          placeholder=''
          {...connectForm}
          onChange={(value) => {
            !preventSelect && methods?.setValue(name, value?.value || null);
            otherOnChange(value);
            if (value?.value === trackingValueCustom) {
              setTrickTracking(true);
            }
            if (value) {
              methods?.clearErrors(name);
            } else if (statusValidation(name).isRequired) {
              methods?.setError(name, {
                type: 'required',
                message: messages[name]?.required,
              });
            }
          }}
          options={OPTIONS}
          {...rest}
          noOptionsMessage={() => tForm('noData')}
          defaultValue={originValue ? OPTIONS.find((option) => option.value === originValue) : defaultValue}
          value={methods?.getValues(name) && OPTIONS.find((option) => option.value === methods?.getValues(name))}
          styles={{
            menu: (provided) => ({
              ...provided,
              zIndex: 100,
              border: 'red',
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
        />
      </Wrapper>
    ),
    styleWrapperForm,
    styleError,
  };

  return <FormContainer {...formProps} />;
}

SelectForm.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
};

SelectForm.defaultProps = {
  label: '',
};
