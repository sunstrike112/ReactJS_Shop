import { useState } from 'react';

const useComboState = (initialState) => {
  const [state, _setState] = useState(initialState);
  const setState = (obj) => _setState((old) => ({ ...old, ...obj }));
  return {
    state,
    setState,
  };
};

export default useComboState;
