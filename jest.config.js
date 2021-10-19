module.exports = {
  moduleNameMapper: {
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@theme/(.*)$': '<rootDir>/theme/$1',
    '^@covid/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'jest-expo',
  reporters: ['default', 'jest-junit'],
  setupFiles: ['dotenv/config', './node_modules/reflect-metadata/Reflect.js'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: [
    './node_modules/reflect-metadata/Reflect.js',
    // 'node_modules/(react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*|@codler/react-native-keyboard-aware-scroll-view|victory-.*)',
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',

    // '<rootDir>/node_modules/(react-clone-referenced-element|@react-native-community|react-navigation|@react-navigation/.*|@unimodules/.*|native-base|react-native-code-push)',
    '@sentry/.*',
    'sentry-expo',
  ],
};
