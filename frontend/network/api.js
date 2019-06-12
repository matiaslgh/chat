// import fetch from 'isomorphic-unfetch';

export const getMessages = (currentUser, otherUser) => {
  console.log('currentUser :', currentUser);
  console.log('otherUser :', otherUser);
  return [
    {
      id: 1,
      timestamp: '2018-07-07T02:59:21Z',
      sender: 1,
      recipient: 2,
      content: {
        type: 'text',
        text: 'Helloooo!',
      },
    },
  ];
};
