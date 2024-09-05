function config( api ) {
  api.cache( true )
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-typescript',
      '@babel/preset-env',
      '@babel/preset-react',
    ],
  }
}

module.exports = config
