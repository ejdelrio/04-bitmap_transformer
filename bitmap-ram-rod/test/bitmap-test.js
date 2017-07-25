'use strict' ;

const fs = require('fs');
const expect = require('chai').expect;
const bitmapper = require(`${__dirname}/../model/bitmap.js`);

let path = './assets/palette-bitmap.bmp';

describe('Test for Bitmap object Constructor', () => {
  describe('Object construction', () => {
    it('Should have throw an err', (done) => {
      fs.readFile('./assets/not-an-image.bmp', (err) => {
        if(err) console.error(err);
        expect(err).to.be.an('error');
        done();
      });
    });
    it('Should create a new Bitmap object', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.be.an('object');
        done();
      });
    });
    it('Should have the same file type as the asset', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('type', 'BM');
        expect(testBitmap.type).to.equal(asset.toString('utf-8', 0, 2));
        done();
      });
    });
    it('Should have the same the same pixel table offset as the asset', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('pixelTableStart', 1078);
        expect(testBitmap.pixelTableStart).to.equal(asset.readUInt16LE(10));
        done();
      });
    });
    it('Should have the same bits per pixel as the asset', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('bitsPerPixel', 8);
        expect(testBitmap.bitsPerPixel).to.equal(asset.readUInt16LE(28));
        done();
      });
    });
    it('Should have the same header size as the asset', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('headerSize', 40);
        expect(testBitmap.headerSize).to.equal(asset.readUInt16LE(14));
        done();
      });
    });
    it('pixelTableEnd should equal the length of the buffer', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('pixelTableEnd', 11078);
        expect(testBitmap.pixelTableEnd).to.equal(asset.length);
        done();
      });
    });
    it('It\'s color table should end at the stored offset point', (done) => {
      fs.readFile(path, (err, asset) => {
        if(err) return console.error(err);
        let testBitmap = new bitmapper.Bitmap(asset);
        expect(testBitmap).to.have.property('colorTableEndPoint', 1078);
        expect(testBitmap.colorTableEndPoint).to.equal(asset.readUInt16LE(10));
        done();
      });
    });
  });
});
