'use strict' ;

const fs = require('fs');
const expect = require('chai').expect;
const Bitmap = require(`${__dirname}/../model/bitmap.js`);

describe('Constructor Test', function() {
  describe('not an object', function() {
    it('should return an error', function(done) {
      let result = Bitmap();
      expect(err).to.be.an('error');
      done();
      });
    });
  
  describe('if an object', function() {
    it('should instantiate an object', function() {
      let result = Bitmap();
      expect(result).to.be.an('object');
    });
  });

  describe('if a type', function() {
    it('should be a type', function() {
      let result = Bitmap();
      expect(result).to.have.property('type');
    });
  });

  describe('if a pixel table', function() {
    it('should be pixel table', function() {
      let result = Bitmap();
      expect(result).to.have.property('pixleTableStart', 10);
    });
  });

  describe('if a headerSize', function() {
    it('should be a headerSize', function() {
      let result = Bitmap();
      expect(result).to.have.property('headerSize', 14);
    });
  });

  describe('if a colorTable', function() {
    it('should be a colorTable', function() {
      let result = Bitmap();
      expect(result).to.have.property('colorTableStartPoint', 'this.header' + 14);
    });
  });

  describe('if a pixelTableEnd', function() {
    it('should be a pixelTableEnd', function() {
      let result = Bitmap();
      expect(result).to.have.property('pixelTableEnd','buffer.length');
    });
  });
});
