import { MESS_ERROR } from 'dhm/utils/constants/messageId';
import { useEffect } from 'react';
import { STATUS } from 'dhm/utils/constants/type';

export function ValidationError({
  statusWatch,
  setError,
  actionRequiredWatch,
  whenEndWatch,
  clearError,
  whatTodoWatch,
}) {
  useEffect(() => {
    if (!Object.values(STATUS).includes(statusWatch)) {
      setError('status', {
        type: 'invalid',
        message: MESS_ERROR.OVERVIEW_INFO.status,
      });
    } else {
      clearError('status');
    }
  }, [statusWatch]);

  useEffect(() => {
    if (actionRequiredWatch ? 1 : 0) {
      if (!whenEndWatch) {
        setError('whenEnd', {
          type: 'required',
          message: MESS_ERROR.OVERVIEW_INFO.whenEnd,
        });
      } else {
        clearError('whenEnd');
      }

      if (
        whatTodoWatch === null ||
        whatTodoWatch === '' ||
        whatTodoWatch === undefined ||
        whatTodoWatch?.length === 0
      ) {
        setError('whatTodo', {
          type: 'required',
          message: MESS_ERROR.OVERVIEW_INFO.whatTodo,
        });
      } else {
        clearError('whatTodo');
      }
    } else {
      clearError('whenEnd');
      clearError('whatTodo');
    }
  }, [whenEndWatch, whatTodoWatch, actionRequiredWatch]);
  return null;
}
