import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

export function ThemeProviderCharka({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
      <GlobalStyle />
    </ChakraProvider>
  );
}
