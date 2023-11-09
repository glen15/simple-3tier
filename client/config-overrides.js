const webpack = require('webpack');

module.exports = function override(config, env) {
  // 웹팩 폴리필 설정
  config.resolve.fallback = {
    ...config.resolve.fallback, // 기존 설정을 유지
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'), // stream 추가
    buffer: require.resolve('buffer/') // buffer 추가
  };

  // DefinePlugin 설정을 추가하여 process 및 Buffer 전역 변수를 제공
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser', // process 추가
      Buffer: ['buffer', 'Buffer'], // Buffer 추가
    }),
  ];

  return config;
};
