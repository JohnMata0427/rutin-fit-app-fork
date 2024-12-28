const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  '@': `${__dirname}/app`,
  '@assets': `${__dirname}/assets`,
}

module.exports = withNativeWind(config, { input: './global.css' });
