'use strict';

const transform = module.exports = {};

transform.modify = (buffer, blueCallback, greenCallback, redCallback) => {
  let newColors = buffer.transformedBMP.colorArr;
  for (let i = 3; i < newColors.length; i+=4) {
    let grey = (newColors[i - 3] + newColors[i - 2] + newColors[i - 1]) / 3;
    newColors[i - 3] = blueCallback(newColors[i - 3], newColors[i - 2], newColors[i - 1], grey);
    newColors[i - 2] = greenCallback(newColors[i - 2], newColors[i - 3], newColors[i - 1], grey);
    newColors[i - 1] = redCallback(newColors[i - 1], newColors[i - 2], newColors[i - 3], grey);
  }
  buffer.transformedBMP.colorArr = Buffer.from(newColors);
};

transform.blueShift = function(buffer) {
  transform.modify(buffer,
    hexBlue => hexBlue,
    () => 0,
    () => 0
  );
};

transform.redShift = function(buffer) {
  transform.modify(buffer,
    () => 0,
    () => 0,
    hexRed => hexRed
  );
};

transform.greenShift = function(buffer) {
  transform.modify(buffer,
    () => 0,
    hexGreen => hexGreen,
    () => 0
  );
};

transform.noGreen = function(buffer) {
  transform.modify(buffer,
    (blue) => blue,
    () => 0,
    (red) => red
  );
};

transform.noBlue = function(buffer) {
  transform.modify(buffer,
    () => 0,
    (green) => green,
    (red) => red
  );
};

transform.noRed = function(buffer) {
  transform.modify(buffer,
    (blue) => blue,
    (green) => green,
    () => 0
  );
};

transform.blackOut = function(buffer) {
  transform.modify(buffer,
    () => 0,
    () => 0,
    () => 0
  );
};

transform.whiteOut = function(buffer) {
  transform.modify(buffer,
    () => 255,
    () => 255,
    () => 255
  );
};

transform.greyScale = function(buffer) {
  transform.modify(buffer,
    (blue, green, red, grey) => (grey),
    (blue, green, red, grey) => (grey),
    (blue, green, red, grey) => (grey)
  );
};
