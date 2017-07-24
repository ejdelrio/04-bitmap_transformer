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
    this.buffer = buffer;

  };
  
  Bitmap.prototype.newFile = function(fileName) {
    let newBuffer = this.buffer;
    fs.writeFile(`./assets/${fileName}.bmp`, newBuffer, (err) => {
      if(err) console.error(err);
      console.log(`${fileName}.bmp created!!`);
    });
  };

  fs.readFile(path, (err, asset) => {
    if(err) console.error(err);

    let bitmap = new Bitmap(asset);
    callback(bitmap);
    bitmap.newFile(newFileName);
  });



};
