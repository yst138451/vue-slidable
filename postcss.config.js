const autoprefixer = require('autoprefixer');
const postCssEasings = require('postcss-easings');

module.exports = {
  plugins: [
    postCssEasings(),
    autoprefixer
  ]
};
