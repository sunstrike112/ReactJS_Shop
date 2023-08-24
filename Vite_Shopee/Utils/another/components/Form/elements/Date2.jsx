/* eslint-disable no-nested-ternary */
import { Box, FormLabel, Img, Input, Text } from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import ja from 'date-fns/locale/ja';
import { DHMAssets } from 'dhm/assets/index';
import LanguageContext, { currentLanguage } from 'dhm/contexts/TranslateContext';
import { formService } from 'dhm/services/form';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useFormContext } from 'react-hook-form';

// const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];
// const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

// const locale = {
//   localize: {
//     day: (n) => days[n],
//     month: (n) => months[n],
//   },
//   formatLong: {
//     date: () => 'mm/dd/yyyy',
//   },
// };
export function InputFormDate({
  name,
  label,
  methods,
  max,
  typeShow = 'full',
  onlyView = false,
  showIcon = false,
  width,
  borderColor,
  background = '',
  pointerEvents = 'auto',
  inputProps = {},
  showBoxBlank = false,
  ...rest
}) {
  const { getValidation, statusValidation } = formService;
  const { formState } = useFormContext();
  const { tForm } = useContext(LanguageContext);
  const { errors } = formState;
  const { control } = methods;

  const specCase = ['endDate'];
  const verifySpecCase = specCase.includes(name);
  const showRequired = Boolean(statusValidation(name).isRequired || verifySpecCase);
  return (
    <Box position='relative' pointerEvents={rest?.disabled ? 'none' : 'auto'}>
      {label && (
        <FormLabel htmlFor={name}>
          <Box position='relative' width='fit-content'>
            {label}
            {!onlyView && showRequired && (
              <Box
                position='absolute'
                right={currentLanguage('jp') ? '-40px' : '-50px'}
                fontSize='8px'
                top='4px'
                color={COLORS.white}
                background={COLORS.danger_300}
                padding='2px 8px'
              >
                {tForm('required')}
              </Box>
            )}
          </Box>
        </FormLabel>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={null}
        rules={{
          validate: (key) =>
            getValidation(name)
              .validate({ [name]: key })
              .catch((e) => e.errors[0]),
        }}
        render={({ field }) => (
          <Box position='relative' width={width}>
            {showBoxBlank ? (
              <Box
                height='38px'
                bg='#fff'
                border={BORDERS.border_1(`#b7b7b7`)}
                cursor='not-allowed'
                pointerEvents='all'
              />
            ) : (
              <DatePicker
                locale={currentLanguage('jp') ? ja : ''}
                dateFormat={typeShow === 'month' ? 'yyyy/MM' : 'yyyy/MM/dd'}
                placeholderText=''
                onChange={(date) => {
                  // eslint-disable-next-line no-unused-expressions
                  date ? field.onChange(new Date(date).toISOString()) : field.onChange(null);
                }}
                selected={field.value ? parseISO(field.value) : null}
                isClearable={!rest?.disabled}
                customInput={
                  <Input
                    bg={background}
                    pointerEvents={pointerEvents}
                    border={
                      rest?.disabled
                        ? BORDERS.border_1(`#464646`)
                        : errors[name]
                        ? BORDERS.border_2('red')
                        : BORDERS.border_1(COLORS.gray_700)
                    }
                    boxShadow={rest?.disabled && `none !important`}
                    {...inputProps}
                  />
                }
                todayButton={tForm('today')}
                maxDate={max || null}
                showMonthYearPicker={typeShow === 'month'}
                {...rest}
              />
            )}

            {Boolean(showIcon) && (
              <Img position='absolute' top='12px' right='8px' zIndex='0' src={DHMAssets.ICON_CALENDAR} />
            )}
          </Box>
        )}
      />
      {!rest?.disabled && errors[name] && (
        <Text fontSize='14px' color='red.500' mt='0.5rem'>
          {errors[name].message}
        </Text>
      )}
    </Box>
  );
}
