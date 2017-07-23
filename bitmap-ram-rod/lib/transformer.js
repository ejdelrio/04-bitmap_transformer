'use strict';

const bitmap = require('../model/bitmap.js');


transform.modify = (buffer, blueCallback, greenCallback, redCallback) => {
  let newColors = buffer.transformedBMP.colorPalette;
  for (let i = 7; i < newColors.length; i++) {
    newColors[i - 7] = blueCallback(newColors[i - 7]);
    newColors[i - 6] = blueCallback(newColors[i - 6]);
    newColors[i - 5] = greenCallback(newColors[i - 5]);
    newColors[i - 4] = greenCallback(newColors[i - 4]);
    newColors[i - 3] = redCallback(newColors[i - 3]);
    newColors[i - 2] = redCallback(newColors[i - 2]);
  }
};

transform.redShift = function(buffer) {
  this.modify(buffer,
    hexBlue => hexBlue,
    () => '0',
    () => '0'
  );
};

transform.blueShift = function(buffer) {
  this.modify(buffer,
    () => '0',
    () => '0',
    hexRed => hexRed
  );
};

transform.greenShift = function(buffer) {
  this.modify(buffer,
    () => '0',
    hexGreen => hexGreen,
    () => '0'
  );
};
