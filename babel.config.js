module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Outros plugins podem ser listados aqui
      'module:react-native-dotenv',
    ],
  };
};
