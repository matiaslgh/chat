import fetch from 'isomorphic-unfetch';

export const getMessages = async () => {
  const response = await fetch('http://localhost:3000/messages');
  const messages = await response.json();
  return { messages };
};
