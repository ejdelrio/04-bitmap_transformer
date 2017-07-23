'use srict';

const fs = require('fs');
const transform = require('../lib/transformer.js');


module.exports = (path) => {

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
    this.buffer = buffer;

    this.transformedBMP = new TransformedBMP(buffer, this);

  };

  const TransformedBMP = function(asset, parent) {
    this.header = asset.slice(0, 14);
    this.DIB = asset.slice(14, parent.headerSize);

    if(parent.colorTableStartPoint) this.colorPalette = asset.slice(14 + parent.headerSize, parent.pixelTableStart);
    this.pixelTable = asset.slice(parent.pixelTableStart);

    this.colorArr = this.colorPalette.toString('hex');
    this.assetLength = asset.length;

  };

  TransformedBMP.prototype.compileBuffer = function() {
    let newColorPalette = new Buffer(this.colorArr, 'hex');
    return Buffer.concat([this.header, this.DIB, newColorPalette, this.pixelTable], this.assetlength);
  };

  TransformedBMP.prototype.newFile = function(fileName) {
    let newBuffer = this.compileBuffer();
    fs.writeFile(`../assets/${fileName}.bmp`, (err) => {
      if(err) console.error(err);
      console.log('verifier#: ' + newBuffer.readUInt32LE(58));
    });
  };

  fs.readFile(path, (err, asset) => {
    if(err) console.error(err);

    let bitmap = new Bitmap(asset);
    transform.blueShift(bitmap);
    bitmap.transformedBMP.newFile('red');
  });



};

module.exports(`${__dirname}/../assets/palette-bitmap.bmp`);

//bitmap.readUInt8(1078)
//Used to get color palette index
