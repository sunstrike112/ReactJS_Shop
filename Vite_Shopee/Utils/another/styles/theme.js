import { extendTheme } from '@chakra-ui/react';
import { cardTheme } from './cardTheme';
import { inputTheme } from './inputTheme';

const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};

const theme = extendTheme({
  components: {
    Card: cardTheme,
    Input: inputTheme,
    Drawer: {
      parts: ['dialog', 'header', 'body'],
      variants: {
        primary: {
          dialog: {
            margin: '30px auto 0px',
            width: '870px',
            height: '95vh',
          },
        },
        secondary: {
          dialog: {
            background: 'green',
          },
        },
      },
    },
  },
  colors: {
    primary: '#FF0080',
    secondary: '#00FF8F',
  },
  breakpoints,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
});

export { theme };
