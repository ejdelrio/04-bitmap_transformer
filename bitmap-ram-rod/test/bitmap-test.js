'use strict' ;

const fs = require('fs');
const expect = require('chai').expect;
const bitmapper = require(`${__dirname}/../model/bitmap.js`);

let path = `${__dirname}/../assets/palette-bitmap.bmp`;

describe('Constructor Test', function() {
  describe('not an object', function() {
    it('should return an error', function(done) {
      let result = bitmapper;
      expect(result).to.throw(Error);
      done();
    });
  });

  describe('bitmap object', function() {
    it('should instantiate an object', function() {
      bitmapper(path, (err, data) => {
        expect(err).to.equal(null);
        expect(data).to.be.an('object');
        done();
      });
    });
    it('should have all Constructor properties', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('type', 'BM');
        expect(data).to.have.property('pixelTableStart', 1078);
        expect(data).to.have.property('bitsPerPixel', 8);
        expect(data).to.have.property('headerSize', 40);
        expect(data).to.have.property('colorTableStartPoint', 54);
        expect(data).to.have.property('pixelTableEnd', 11078);
        expect(data).to.have.property('colorTableEndPoint', 1078);
        done();
      })
    })
  });
});
