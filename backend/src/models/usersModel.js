async function getPassAndIdFromUsername(username) {
  // TODO: Check if user was passed
  // TODO: Check if the user is already logged in
  // TODO: Search into db
  if (username) {
    return {
      password: 'password123',
      id: 123,
    };
  }
  throw new Error('User does not exist');
}

module.exports = {
  getPassAndIdFromUsername,
};
