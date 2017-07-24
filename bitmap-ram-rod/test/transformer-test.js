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
        if(err) return console.error(err);
        let bitBuffer = new bitmapper.Bitmap(asset);
        let header = asset.toString('hex', 0, 14);
        let DIB = asset.toString('hex', 14, 54);
        let colorPallete = asset.toString('hex', 54, 1078);
        let pixelArray = asset.toString('hex', 1078, asset.length);

        transform.modify(bitBuffer, () => 0, () => 0, () => 0);
        expect(asset.toString('hex', 0, 14)).to.equal(header);
        expect(asset.toString('hex', 14, 54)).to.equal(DIB);
        expect(asset.toString('hex', 54, 1078)).not.to.equal(colorPallete);
        expect(asset.toString('hex', 1078, asset.length)).to.equal(pixelArray);
        done();
      });
    });
  });
});
