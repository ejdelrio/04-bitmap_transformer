'use srict';

const fs = require('fs');

var bitmap;
fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, (err, asset) => {
  if(err) console.error(err);
  bitmap = new Bitmap(asset);
});

const Bitmap = function(buffer) {
  this.width = buffer.readUInt32LE(22);
  this.height = buffer.readUInt32LE(18);
  this.pixelOffset = buffer.readUInt32LE(18);
  this.size = buffer.readUInt32LE(2);
  this.type = buffer.toString('utf-8', 0, 2);

};
