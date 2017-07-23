'use srict';

const fs = require('fs');
const transform = require('../lib/transformer.js');


module.exports = (path, callback, newFileName) => {

  const Bitmap = function(buffer) {
    this.type = buffer.toString('utf-8', 0, 2);
    this.pixelTableStart = buffer.readUInt16LE(10);
    this.bitsPerPixel = buffer.readUInt16LE(28);
    this.headerSize = buffer.readUInt16LE(14);

    this.bitsPerPixel < 16 ?
    this.colorTableStartPoint = this.headerSize + 14 :
    this.pixelTableStart = this.headerSize + 14 ;

    this.pixelTableEnd = buffer.length;

    this.colorTableStartPoint ?
    this.colorTableEndPoint = this.pixelTableStart:
    null;

    this.transformedBMP = new TransformedBMP(buffer, this);

  };

  const TransformedBMP = function(asset, parent) {
    this.header = asset.slice(0, 14);
    this.DIB = asset.slice(14, parent.headerSize + 14);

    if(parent.colorTableStartPoint) this.colorPalette = asset.slice(14 + parent.headerSize, parent.pixelTableStart);
    this.pixelTable = asset.slice(parent.pixelTableStart);

    this.colorArr = Array.prototype.slice.call(this.colorPalette);
    this.assetLength = asset.length;

  };

  TransformedBMP.prototype.compileBuffer = function() {
    return Buffer.concat([this.header, this.DIB, this.colorArr, this.pixelTable], this.assetlength);
  };

  TransformedBMP.prototype.newFile = function(fileName) {
    let newBuffer = this.compileBuffer();
    fs.writeFile(`./assets/${fileName}.bmp`, newBuffer, (err) => {
      if(err) console.error(err);
      console.log('verifier#: ' + newBuffer.readUInt32LE(58));
    });
  };

  fs.readFile(path, (err, asset) => {
    if(err) console.error(err);

    let bitmap = new Bitmap(asset);
    callback(bitmap);
    bitmap.transformedBMP.newFile(newFileName);
  });



};
