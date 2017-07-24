'use strict';

const expect = require('chai').expect;
const fs = require('fs');
const transform = require('./../lib/transformer.js');
const bitmapper = require(`${__dirname}/../model/bitmap.js`);

let path = `${__dirname}/../assets/palette-bitmap.bmp`;

fs.readFile(path, (err, asset) => {
  if(err) return console.error(err);
  let bitBuffer = bitmapper(asset);
  let header = asset.toString('hex', 0, 14);
  let DIB = asset.toString('hex', 14, 54);
  let colorPallete = asset.toString('hex', 54, 1078);
  let pixelArray = asset.toString('hex', 1078, asset.length);
});

  transform.modify(bitBuffer, () => 0, () => 0, () => 0);

  describe('Transformer Module Tests', () => {
    describe('#modify', () => {
      it('The file header should remain the same', () => {
        expect(asset.toString('hex', 0, 14)).to.equal(header);
      });
      it('The DIB header should remain the same', () => {
        expect(asset.toString('hex', 14, 54)).to.equal(DIB);
      });
      it('The color palette should be modified', () => {
        expect(asset.toString('hex', 54, 1078)).not.to.equal(colorPallete);
      });
      it('The pixel array should remain the same', () => {
        expect(asset.toString('hex', 1078, asset.length)).to.equal(pixelArray);
      });
    });
  });
