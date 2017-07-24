'use strict'

const expect = require('chai').expect;
const fs = require('fs');
const transform = require('./../lib/transformer.js');
const bitmapper = require('./../model/bitmap.js');

let path = './../assets/palette-bitmap.bmp';

describe('Transformer Module Tests', () => {
  describe('#modify', () => {
    it('Should modify the color palette of a bitmap', (done) => {
      fs.readFile('./../assets/palette-bitmap.bmp', (err, asset) => {
        if(err) return console.error(err);
        
      });
    });
  });
});
