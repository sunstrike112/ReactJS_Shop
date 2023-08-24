import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import rootReducer from './reducer';

const immutableStateTransformer = (state) => {
  if (state.toJS) {
    return fromJS(state.toJS());
  }
  return state;
};

const middleware = [...getDefaultMiddleware({ immutableCheck: { isImmutable: immutableStateTransformer } }), thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;
