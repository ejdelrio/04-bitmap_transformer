'use strict' ;

const fs = require('fs');
const expect = require('chai').expect;
const bitmapper = require(`${__dirname}/../model/bitmap.js`);

let path = '../assets/palette-bitmap.bmp';

describe('Constructor Test', function() {
  describe('not an object', function() {
    it('should return an error', function() {
      bitmapper.Bitmap();
      expect(bitmapper.Bitmap()).to.be.an('error');
    });
  });

  describe('Bitmap object', function() {
    it('should instantiate an object', function(done) {
      fs.readFile(path, (err, asset) => {
        if(err) console.error(err);
        let bitmap = new bitmapper.Bitmap(asset);
        expect(bitmap).to.be.an('object');
        done();
      });
    });
    it('should have all Constructor properties', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) console.error(err);
        let result = new bitmapper.Bitmap(asset);
        expect(result).to.have.property('type');
        expect(result).to.have.property('pixleTableStart', 10);
        expect(result).to.have.property('headerSize', 14);
        expect(result).to.have.property('colorTableStartPoint', 'this.header' + 14);
        expect(result).to.have.property('pixelTableEnd','buffer.length');
        done();
      });
    });
  });
});
