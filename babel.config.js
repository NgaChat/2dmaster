module.exports = function(api) {
  api.cache(true);

  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@styles' : './src/styles'
          // Add more aliases as needed
        },
      },
    ],
  ];

  return {
    presets,
    plugins,
  };
};
