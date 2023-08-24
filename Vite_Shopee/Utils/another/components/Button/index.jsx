import { Button } from '@chakra-ui/react';
import { BORDERS, COLORS } from 'dhm/utils/constants/style';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LanguageContext from 'dhm/contexts/TranslateContext';

export function DHMButton({ buttonType, text, children, isDragging = false, ...props }) {
  const { tForm, tLogin } = useContext(LanguageContext);
  const defaultProps = {
    variant: 'outline',
  };
  const typeText = {
    cancel: tForm('cancel'),
    register: tForm('register'),
    yes: tForm('yes'),
    no: tForm('no'),
    signIn: tLogin('sign_in'),
    update: tForm('update'),
    deleteMulti: tForm('delete_multiple'),
    save: tForm('save'),
    inviteUser: tForm('invite_user'),
  };
  const typeButton = {
    create: {
      main: COLORS.primary_900,
      hover: COLORS.primary_800,
    },
    denial: {
      bg: COLORS.gray_600,
      main: COLORS.white,
      hover: COLORS.gray_400,
    },
    import: {
      bg: COLORS.gray_600,
      main: COLORS.white,
      hover: COLORS.primary_800,
    },
    master: {
      main: COLORS.primary_900,
      hover: COLORS.primary_900,
    },
    info: {
      main: COLORS.info,
      hover: COLORS.info,
    },
    delete: {
      main: COLORS.pink_shade_1,
      hover: COLORS.pink_shade_2,
    },
    primary: {
      main: COLORS.white,
      hover: COLORS.prime_shade_1,
      bg: COLORS.blue_primary,
    },
    other: {
      main: COLORS.white,
      bg: COLORS.violet_primary,
      hover: COLORS.primary_800,
    },
    cancel: {
      main: COLORS.white,
      hover: COLORS.neutral_500,
      bg: COLORS.neutral_300,
    },
    yesDelete: {
      main: 'black',
      hover: COLORS.waring_700,
      bg: COLORS.waring_400,
      noBorder: true,
    },
    cancelDelete: {
      main: COLORS.waring_400,
      hover: COLORS.waring_700,
      bg: COLORS.white,
    },
  };
  return (
    <Button
      border={BORDERS.border_1(typeButton[buttonType]?.noBorder ? 'none' : typeButton[buttonType].main)}
      color={typeButton[buttonType].main}
      bg={isDragging ? COLORS.business : typeButton[buttonType].bg || COLORS.white}
      _hover={{ bg: typeButton[buttonType].hover, color: COLORS.white }}
      borderRadius={BORDERS.radius_0}
      {...defaultProps}
      {...props}
    >
      {typeText[text] || text}
      {children}
    </Button>
  );
}
DHMButton.propTypes = {
  buttonType: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
};

DHMButton.defaultProps = {
  buttonType: 'other',
  children: null,
  text: '',
};
