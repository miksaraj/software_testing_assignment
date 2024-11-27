module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  coveragePathIgnorePatterns: [
    '/src/.internal/'
  ]
};
