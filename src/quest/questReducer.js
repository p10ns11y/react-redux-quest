import { createRegExReducer } from '../utils';

const initialState = {};

function requestStatusHandler (state = {}, action) {
  if (!action.meta) { return state; }

  const { operation, slicedStateKey} = action.meta;
  if (!operation || !slicedStateKey) { return state; }

  const operationOnstateSlice = `${operation.toLowerCase()}.${slicedStateKey}`;

  const nextState = {
    ...state,
    [operationOnstateSlice]: action.isRequest
  };

  return nextState;

  return Object.defineProperty(nextState, 'statusOf', {
    get: function () {
      return (s) => nextState[s];
    }
  });
}

// Any action that ends with REQUEST/SUCCESS/FAIL go throw `handlerFn` reducer
export const createQuestReducer = (handlerFn) =>
  createRegExReducer(initialState)({
    REQUEST: (state, action) => handlerFn(state, action),
    SUCCESS: (state, action) => handlerFn(state, action),
    FAIL: (state, action) => handlerFn(state, action)
  });

const questReducer = createQuestReducer(requestStatusHandler);

export default questReducer;
