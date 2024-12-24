const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

//const path = require('path');

const config = getDefaultConfig(process.cwd());

module.exports = withNativeWind(config, { input: './global.css' })