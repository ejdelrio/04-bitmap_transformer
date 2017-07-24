'use strict'

const expect = require('chai').expect;
const fs = require('fs');
const transform = require('./../lib/transformer.js');
const bitmapper = require('./../model/bitmap.js');

let path = `${__dirname}/../assets/palette-bitmap.bmp`;

describe('Transformer Module Tests', () => {
  describe('#modify', () => {
    it('Should modify the color palette of a bitmap', (done) => {
      fs.readFile(path, (err, originalAsset) => {
        if(err) return console.error(err);
        fs.readFile(path, (err, alteredAsset) => {
          if(err) return console.error(err);
          transform.modify(alteredAsset, () => 0, () => 0, () => 0);
          expect(originalAsset).not.to.equal(alteredAsset);
          done();
        });
      });
    });
  });
});

// let header = originalAsset.toString(0, 14);
//     let DIB = originalAsset.toString(14, 54);
//     let colorPalette = originalAsset.toString(54, 1078);
//     let pixelArray = originalAsset.toString(1078, originalAsset);
//
//     transform.modify(originalAsset, () => 0, () => 0, () => 0);
//     expect(originalAsset.toString(0, 14)).to.equal(header);
//     expect(originalAsset.toString(14, 54)).to.equal(DIB);
//     expect(originalAsset.toString(54, 1078)).not.to.equal(DIB);
//     expect(originalAsset.toString(1078, originalAsset.length)).to.equal(DIB);
//     done();
