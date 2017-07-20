'use srict';

const fs = require('fs');

var bitmap;
fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, (err, asset) => {
  if(err) console.error(err);
  bitmap = new Bitmap(asset);
  console.log(bitmap);
});

const Bitmap = function(buffer) {
  this.width = buffer.readUInt32LE(22);
  this.height = buffer.readUInt32LE(18);
  this.pixelTableStart = buffer.readUInt32LE(10);
  this.size = buffer.readUInt32LE(2);
  this.type = buffer.toString('utf-8', 0, 2);
  this.bitsPerPixel = buffer.readUInt32LE(28);
  this.headerSize = buffer.readUInt32LE(14);

  this.bitsPerPixel < 16 ?
  this.colorTableStartPoint = this.headerSize + 14 :
  this.pixelTableStart = this.headerSize + 14 ;

  this.pixelTableEnd = buffer.length;
  this.colorTableStartPoint ?
  this.colorTableEndPoint = this.pixelTableStart:
  null;
  this.buffer = buffer;
};
