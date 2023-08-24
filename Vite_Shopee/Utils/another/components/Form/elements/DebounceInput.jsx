import { SearchIcon } from '@chakra-ui/icons';
import { Box, Flex, Input } from '@chakra-ui/react';
import { BoxTextFlex } from 'dhm/components/Box/BoxText';
import { useMouseOver } from 'dhm/hooks/useMouseOver';
import { COLORS } from 'dhm/utils/constants/style';
import _ from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

export function InputDebounceForm({ action, debounce = 500, label, haveIconSearch = false, ...props }) {
  const [suggestedValues, setSuggestedValues] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [ref, isMouseOver] = useMouseOver();
  const inputRef = useRef(null);
  const getSessionValues = () => {
    const savedValues = sessionStorage.getItem('suggestedValues');
    return savedValues ? JSON.parse(savedValues) : [];
  };

  const updateSuggestedValues = (value) => {
    const savedValues = getSessionValues();
    const filteredValues = savedValues.filter((savedValue) => savedValue.toLowerCase().includes(value.toLowerCase()));
    const limitedValues = filteredValues.slice(0, 6); // Limit to a maximum of 6 values
    setSuggestedValues(limitedValues);
  };

  const saveToSessionStorage = (value) => {
    if (value.trim() === '') return; // Don't save empty value
    const savedValues = getSessionValues();
    if (savedValues.includes(value)) return; // Avoid saving duplicate values
    savedValues.unshift(value);
    sessionStorage.setItem('suggestedValues', JSON.stringify(savedValues));
  };

  const handleChange = _.debounce((event) => {
    const { value } = event.target;
    updateSuggestedValues(value);
    setSelectedValue(value);
  }, debounce);

  const handleInputClick = () => {
    const value = sessionStorage.getItem('suggestedValue') || '';
    updateSuggestedValues(value);
  };

  const handleInputFocus = () => {
    const value = sessionStorage.getItem('suggestedValue') || '';
    updateSuggestedValues(value);
  };

  const handleSuggestionClick = (value) => {
    action(value);
    setSelectedValue(value);
    setSuggestedValues([]);
    // inputRef.current.blur();
  };

  const handleInputBlur = () => {
    if (!isMouseOver) {
      saveToSessionStorage(selectedValue);
      action(selectedValue);
      setTimeout(() => {
        setSuggestedValues([]);
      }, 200);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      saveToSessionStorage(selectedValue);
      action(selectedValue);
    }
  };

  useEffect(() => {
    setSelectedValue(props.value || '');
  }, [props.value]);

  return (
    <Box ref={ref} position='relative'>
      <Box>{label}</Box>
      <Input
        ref={inputRef}
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          handleChange(e);
        }}
        onClick={handleInputClick}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyPress}
        background={COLORS.white}
        border='1px solid #646464'
        paddingRight='30px'
        {...props}
      />
      {haveIconSearch && <SearchIcon pointerEvents='none' zIndex='50' position='absolute' top='12px' right='12px' />}
      {suggestedValues.length > 0 && (
        <Box
          position='absolute'
          top='100%'
          left='0'
          right='0'
          background={COLORS.white}
          boxShadow='md'
          zIndex='999'
          border='1px solid black'
          // onClick={(e) => e.stopPropagation()}
        >
          {suggestedValues.map((value, index) => (
            <Flex
              justifyContent='space-between'
              key={index}
              p='2'
              borderBottom={index < suggestedValues.length - 1 ? '0.5px' : 'none'}
              onClick={() => handleSuggestionClick(value)}
              cursor='pointer'
            >
              <BoxTextFlex fontSize='16px'>{value}</BoxTextFlex>
              <Box
                onClick={(e) => {
                  e.stopPropagation();
                  const savedValues = getSessionValues();
                  const filteredValues = savedValues.filter((savedValue) => savedValue !== value);
                  sessionStorage.setItem('suggestedValues', JSON.stringify(filteredValues));
                  updateSuggestedValues(selectedValue);
                }}
                paddingTop='5px'
              >
                <RiDeleteBinLine />
              </Box>
            </Flex>
          ))}
        </Box>
      )}
    </Box>
  );
}
