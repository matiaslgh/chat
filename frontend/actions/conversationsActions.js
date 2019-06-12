import { getMessages } from '../network/api';
import { constants } from '../reducers/conversationsReducer';

const { ADD_CONVERSATION, ADD_NEW_MESSAGE, ADD_OLD_MESSAGES } = constants;

export const addConversation = (currentUserId, otherUserId) => async dispatch => {
  const messages = await getMessages(currentUserId, otherUserId);
  dispatch({
    type: ADD_CONVERSATION,
    userId: otherUserId,
    messages,
  });
};

export const addNewMessage = (userId, message) => ({
  type: ADD_NEW_MESSAGE,
  userId,
  message,
});

export const addOldMessages = (
  currentUserId,
  otherUserId,
  firstMessageIdAlreadyHad
) => async dispatch => {
  const messages = await getMessages({ currentUserId, otherUserId, firstMessageIdAlreadyHad });
  dispatch({
    type: ADD_OLD_MESSAGES,
    userId: otherUserId,
    messages,
  });
};

export default {
  addConversation,
  addNewMessage,
  addOldMessages,
};
