const types = {
  TEXT: 1,
  IMAGE: 2,
  VIDEO: 3,
};

const getTypeFromString = (str = '') => {
  return types[str.toUpperCase()]; // TODO: || throw new InvalidType(str);
};

module.exports = {
  ...types,
  getTypeFromString,
};
