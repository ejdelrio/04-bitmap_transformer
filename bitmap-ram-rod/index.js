'use strict';

const bitmapper = require('./model/bitmap.js');
const transform = require('./lib/transformer.js');

let transformations = Object.keys(transform);

for(let i = 1; i < transformations.length; i++) {
  bitmapper('./assets/palette-bitmap.bmp', transform[transformations[i]], transformations[i]);
}
