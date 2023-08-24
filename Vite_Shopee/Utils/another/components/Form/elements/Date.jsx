import PropTypes from 'prop-types';

import { Form } from 'dhm/containers/form';
import { Box, Input } from '@chakra-ui/react';
import { formatDateJP } from 'dhm/utils/helpers/format';
import { useEffect, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';

const { FormContainer } = Form;
export function DateForm({
  defaultDate,
  name,
  label,
  propsCalendar,
  methods = {},
  onlyView,
  typeShow = 'full',
  ...rest
}) {
  const [trickDay, setTrickDay] = useState('');
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    defaultDate && setTrickDay(formatDateJP(defaultDate, typeShow));
  }, []);
  const formProps = {
    name,
    label,
    onlyView,
    formElement: (connectForm) => {
      connectForm.onChange = (e) => {
        setTrickDay(formatDateJP(e.target.value, typeShow));
        // eslint-disable-next-line no-unused-expressions
        methods.formState?.errors[name] && methods?.clearErrors(name);
        methods?.setValue(name, e.target.value);
      };
      return (
        <Box position='relative'>
          {!onlyView && (
            <>
              <input
                {...connectForm}
                type={typeShow === 'full' ? 'date' : 'month'}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: rest?.isDisabled ? 0 : 50,
                  width: '100%',
                  height: '100%',
                  margin: '10px 0',
                }}
                {...propsCalendar}
              />
              <CalendarIcon position='absolute' right='12px' top='12px' />
            </>
          )}
          <Input value={trickDay} readOnly {...rest} disabled={onlyView} />
        </Box>
      );
    },
  };

  return <FormContainer {...formProps} />;
}

DateForm.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

DateForm.defaultProps = {
  label: '',
};
