'use strict'

const expect = require('chai').expect;
const fs = require('fs');
const transform = require('./../lib/transformer.js');
const bitmapper = require('./../model/bitmap.js');

let path = './assets/palette-bitmap.bmp';

describe('Transformer Module Tests', () => {
  describe('#modify', () => {
    it('Should modify the color palette of a bitmap', (done) => {
      fs.readFile(path, (err, asset) => {
        let bitBuffer = new bitmapper.Bitmap(asset);

        if(err) return console.error(err);
        transform.modify(bitBuffer, () => 0, () => 0, () => 0);
        console.log(bitBuffer.buffer.toString('hex', 54, 300));
        console.log(asset.toString('hex', 54, 300));
        done();
      });
    });
  });
});
