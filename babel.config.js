// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-class-properties',
      {
        loose: true, // Ensure this matches across all plugins
      },
    ],
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true, // Ensure this matches across all plugins
      },
    ],
    [
      '@babel/plugin-transform-private-property-in-object',
      {
        loose: true, // Ensure this matches across all plugins
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@services': './src/services',
          '@components': './src/components',
          '@styles' : './src/styles'
        },
      },
    ],
  ],
};
