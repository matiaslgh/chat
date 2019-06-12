const ADD_CONVERSATION = 'ADD_CONVERSATION';
const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';
const ADD_OLD_MESSAGES = 'ADD_OLD_MESSAGES';

export const constants = { ADD_CONVERSATION, ADD_NEW_MESSAGE, ADD_OLD_MESSAGES };

const conversationsReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONVERSATION:
      return {
        ...state,
        [action.userId]: action.messages,
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        [action.userId]: [...state[action.userId], action.message],
      };
    case ADD_OLD_MESSAGES:
      return {
        ...state,
        [action.userId]: [...state[action.userId], action.messages],
      };
    default:
      return state;
  }
};

export default conversationsReducer;
