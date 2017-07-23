'use strict';

const bitmap = require('../model/bitmap.js');


transform.modify = (buffer, blueCallback, greenCallback, redCallback) => {
  let newColors = buffer.transformedBMP.colorPalette;
  for (let i = 7; i < newColors.length; i++) {
    blueCallback(newColors[i - 7]);
    blueCallback(newColors[i - 6]);
    greenCallback(newColors[i - 5]);
    greenCallback(newColors[i - 4]);
    redCallback(newColors[i - 3]);
    redCallback(newColors[i - 2]);
  }
};

transform.redShift = function(buffer) {
  this.modify(buffer,
    hexBlue => hexBlue,
    hexGreen => hexGreen = '0',
    hexRed => hexRed = '0'
  );
};

transform.blueShift = function(buffer) {
  this.modify(buffer,
    hexBlue => hexBlue = '0',
    hexGreen => hexGreen = '0',
    hexRed => hexRed
  );
};

transform.greenShift = function(buffer) {
  this.modify(buffer,
    hexBlue => hexBlue = '0',
    hexGreen => hexGreen,
    hexRed => hexRed = '0'
  );
};
