'use srict';

const fs = require('fs');
const transform = require('../lib/transformer.js');


<<<<<<< HEAD
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
=======
const bitmapper = module.exports = {};
>>>>>>> 5f8521b8dee8fbf050d5d7ae6388b096ec062bdc


<<<<<<< HEAD
    let bitmap = new Bitmap(asset);
    console.log(bitmap);
    callback(bitmap);
    bitmap.newFile(newFileName);
=======
function Bitmap(buffer) {
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
}

Bitmap.prototype.newFile = function(fileName) {
  let newBuffer = this.buffer;
  fs.writeFile(`./assets/${fileName}.bmp`, newBuffer, (err) => {
    if(err) console.error(err);
    console.log(`${fileName}.bmp created!!`);
>>>>>>> 5f8521b8dee8fbf050d5d7ae6388b096ec062bdc
  });
};

bitmapper.Bitmap = Bitmap;

<<<<<<< HEAD
=======

bitmapper.renderImage = function(path, callback, newFileName) {
  fs.readFile(path, (err, asset) => {
    if(err) console.error(err);
    let bitmap = new bitmapper.Bitmap(asset);
    callback(bitmap);
    bitmap.newFile(newFileName);
  });
>>>>>>> 5f8521b8dee8fbf050d5d7ae6388b096ec062bdc
};
