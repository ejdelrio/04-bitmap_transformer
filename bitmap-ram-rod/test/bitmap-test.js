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
    it('should have a key type with a value of BM', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('type', 'BM');
        done();
      });
    });
    it('should have a key pixelTableStart with a value of 1078', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('pixelTableStart', 1078);
        done();
      });
    });
    it('should have a key bitsPerPixel with a value of 8', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('bitsPerPixel', 8);
        done();
      });
    });
    it('should have a key headerSize with a value of 40', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('headerSize', 40);
        done();
      });
    });
    it('should have a key colorTableStartPoint with a value of 54', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('colorTableStartPoint', 54);
        done();
      });
    });
    it('should have a key pixelTableEnd with a value of 11078', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('pixelTableEnd', 11078);
        done();
      });
    });
    it('should have a key colorTableEndPoint with a value of 1078', () => {
      bitmapper(path, (err,data) =>{
        expect(err).to.equal(null);
        expect(data).to.have.property('colorTableEndPoint', 1078);
        done();
      });
    });
  });
});
