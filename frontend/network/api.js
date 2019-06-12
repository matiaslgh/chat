// import fetch from 'isomorphic-unfetch';

export const getMessages = (currentUser, otherUser) => {
  console.log('currentUser :', currentUser);
  console.log('otherUser :', otherUser);
  return [
    {
      id: 0,
      timestamp: '2018-07-07T02:59:21Z',
      sender: 0,
      recipient: 0,
      content: {
        type: 'text',
        text: 'Helloooo!',
      },
    },
  ];
};
