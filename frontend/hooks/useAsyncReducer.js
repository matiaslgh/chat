import { useReducer } from 'react';

function useAsyncReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = action => {
    if (typeof action === 'function') {
      action(dispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, asyncDispatch];
}

export default useAsyncReducer;
