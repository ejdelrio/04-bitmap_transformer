'use strict';

const bitmapper = require('./model/bitmap.js');
const transform = require('./lib/transformer.js');

let transformations = Object.keys(transform);
let fileName = 'palette-bitmap';

console.log(bitmapper);

for(let i = 1; i < transformations.length; i++) {
  bitmapper(`./assets/${fileName}.bmp`, transform[transformations[i]], `${fileName}-${transformations[i]}`);
}
