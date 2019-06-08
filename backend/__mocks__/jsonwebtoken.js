/* global jest:true */
const jsonwebtoken = jest.genMockFromModule('jsonwebtoken');

jsonwebtoken.sign = jest.fn(() => 'HARD_CODED_VALID_TOKEN');

module.exports = jsonwebtoken;
