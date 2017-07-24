'use strict';

const transform = module.exports = {};

transform.modify = (parent, blueCallback, greenCallback, redCallback) => {

  const helper = (bmp, position) => (callback) => (...ind) => {
    return bmp.writeUInt8(callback(
      bmp.readUInt8(ind[0]), bmp.readUInt8(ind[1]), bmp.readUInt8(ind[2])),
    position);
  };

  let start = parent.colorTableStartPoint;
  let end = parent.colorTableEndPoint;
  
  for (let i = 3 + start; i < end; i+=4) {
    helper(parent.buffer, i - 3)(blueCallback)(i-3, i-2, i-1);
    helper(parent.buffer, i - 2)(greenCallback)(i-2, i-3, i-1);
    helper(parent.buffer, i - 1)(redCallback)(i-1, i-2, i-3);
  }
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
    (first, second, third) => (first + second + third) / 3,
    (first, second) => second,
    (first, second, third) => third
  );
};

transform.invert = function(buffer) {
  let helper = (val) => 255 - val;
  transform.modify(buffer,
    helper,
    helper,
    helper
  );
};
