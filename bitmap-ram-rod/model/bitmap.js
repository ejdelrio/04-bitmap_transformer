'use srict';

const fs = require('fs');
const transform = require('../lib/transformer.js')


module.exports = (path, callback) => {


  fs.readFile(path, (err, asset) => {
    if(err) console.error(err);

    let transformArray = ['changeRed', 'changeBlue', 'changeGreen', 'grayscale', 'invert'];

    const Bitmap = function(buffer) {
      this.type = buffer.toString('utf-8', 0, 2);
      this.width = buffer.readUInt16LE(22);
      this.height = buffer.readUInt16LE(18);
      this.size = buffer.readUInt16LE(2);
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

      this.transformedBMP = new TransformedBMP(asset, this);

    };

    function TransformedBMP(asset, parent) {
      this.header = asset.slice(0, 14);
      this.DIB = asset.slice(14, 54);
      if(parent.colorTableStartPoint) this.colorPalette = asset.slice(14 + parent.headerSize, Bitmap.pixelTableStart);
      this.pixelTable = asset.slice(Bitmap.pixelTableStart);
    }

    let bitmap = new Bitmap(asset);




    let headerBuf = asset.slice(0,14);
    let DIBBuf = asset.slice(14, 54);
    let colorTableBuffer = asset.slice(54, Bitmap.pixelTableStart);
    //Same exact value. Delete one of these.
    let colorTableBuf = asset.slice(54, Bitmap.pixelTableStart);
    let pixMapBuf = asset.slice(Bitmap.pixelTableStart);

    // this takes the color table from buffer and puts it into an array

    let colorTableArr = Array.prototype.slice.call(colorTableBuffer);


    //changeRed

    if (transform === 'changeRed') {
      for (let i = 2; i < colorTableArr.length; i) {
        colorTableArr[i] = 255;
        i = i + 4;
      }
    };

    //grayscale

   if (transform === 'grayscale') {
     for (let i = 0; i < colorTableArr.length; i) {
       var grey = (colorTableArr[i] + colorTableArr[i + 1] + colorTableArr[i + 2]) / 3;
       colorTableArr[i] = grey;
       colorTableArr[i+1] = grey;
       colorTableArr[i+2] = grey;
       i = i + 4;
     }
   }

    //Push colorTableArr back into colorTableBuf
   let newColorTableBuf = Buffer.from(colorTableArr);

   //Recombine all four buffers
   let newImgBuf = Buffer.concat([headerBuf, DIBBuf, newColorTableBuf, pixMapBuf], asset.length);

   let newFilePath = path.slice(0, -4) + '-' + transform + '.bmp';

   fs.writeFile(newFilePath, newImgBuf, (err) => {if (err) {return callback(new Error(err));} });
   console.log('verifier#: ' + newImgBuf.readUInt32LE(58));
   console.log('complete: wrote new file \'' + newFilePath + '\'...');
  //  return callback(null, newImgBuf.readUInt32LE(58));

  });



};

//bitmap.readUInt8(1078)
//Used to get color palette index
