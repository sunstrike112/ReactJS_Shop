import { createContext } from 'react';
import { createCanBoundTo, createContextualCan } from '@casl/react';
import ability from './ability';

// export default createCanBoundTo(ability);
export const AbilityContext = createContext(null);
export const Can = createContextualCan(AbilityContext.Consumer);
