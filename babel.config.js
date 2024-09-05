module.exports = ( api ) => {
  api.cache( true )
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  }
}
