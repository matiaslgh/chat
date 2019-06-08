module.exports = {
  testPathIgnorePatterns: ['/node_modules/', 'testUtils'],
  coveragePathIgnorePatterns: ['/node_modules/', '__tests__'],
  setupFilesAfterEnv: ['jest-extended'],
};
