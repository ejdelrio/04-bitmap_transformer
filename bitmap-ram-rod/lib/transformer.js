'use strict';

const transform = module.exports = {};

transform.modify = (buffer, blueCallback, greenCallback, redCallback) => {
  let newColors = buffer.transformedBMP.colorArr.split('');
  for (let i = 7; i < newColors.length; i+=8) {
    newColors[i - 7] = blueCallback(newColors[i - 7]);
    newColors[i - 6] = blueCallback(newColors[i - 6]);
    newColors[i - 5] = greenCallback(newColors[i - 5]);
    newColors[i - 4] = greenCallback(newColors[i - 4]);
    newColors[i - 3] = redCallback(newColors[i - 3]);
    newColors[i - 2] = redCallback(newColors[i - 2]);
  }
  buffer.transformedBMP.colorArr = newColors.join('');
};

transform.blueShift = function(buffer) {
  transform.modify(buffer,
    hexBlue => hexBlue,
    () => '0',
    () => '0'
  );
};

transform.redShift = function(buffer) {
  transform.modify(buffer,
    () => '0',
    () => '0',
    hexRed => hexRed
  );
};

transform.greenShift = function(buffer) {
  transform.modify(buffer,
    () => '0',
    hexGreen => hexGreen,
    () => '0'
  );
};

transform.blackOut = function(buffer) {
  transform.modify(buffer,
    () => '0',
    () => '0',
    () => '0'
  );
};
