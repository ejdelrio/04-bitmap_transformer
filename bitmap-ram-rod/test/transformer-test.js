'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const transform = require('./../lib/transformer.js');
const bitmapper = require('./../model/bitmap.js');

let path = './assets/palette-bitmap.bmp';

describe('Transformer Module Tests', () => {
  describe('#modify', () => {
    it('The file header should remain the same', (done) => {
      fs.readFile(path, (err, asset) => {
        let testBitmap = new bitmapper.Bitmap(asset);
        let header = asset.toString('hex', 0, 14);
        transform.modify(testBitmap, () => 0, () => 0, () => 0);
        expect(asset.toString('hex', 0, 14)).to.equal(header);
        done();
      });

    });
    it('The DIB header should remain the same', (done) => {
      fs.readFile(path, (err, asset) => {
        let testBitmap = new bitmapper.Bitmap(asset);
        let DIB = asset.toString('hex', 14, 54);
        transform.modify(testBitmap, () => 0, () => 0, () => 0);
        expect(asset.toString('hex', 14, 54)).to.equal(DIB);
        done();
      });
    });
    it('The color palette should be modified', (done) => {
      fs.readFile(path, (err, asset) => {
        let testBitmap = new bitmapper.Bitmap(asset);
        let colorPallete = asset.toString('hex', 54, 1078);
        transform.modify(testBitmap, () => 0, () => 0, () => 0);
        expect(asset.toString('hex', 54, 1078)).not.to.equal(colorPallete);
        done();
      });
    });
    it('The pixel array should remain the same', (done) => {
      fs.readFile(path, (err, asset) => {
        let testBitmap = new bitmapper.Bitmap(asset);
        let pixelArray = asset.toString('hex', 1078, asset.length);
        transform.modify(testBitmap, () => 0, () => 0, () => 0);
        expect(asset.toString('hex', 1078, asset.length)).to.equal(pixelArray);
        done();
      });
    });
  });
});
