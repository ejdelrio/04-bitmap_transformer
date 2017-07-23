'use strict';

const transform = module.exports = {};

transform.modify = (parent, blueCallback, greenCallback, redCallback) => {

  const helper = function(callback, bmp, ...ind) {
    return callback(bmp.buffer.readUInt8(ind[0]), bmp.buffer.readUInt8(ind[1]), bmp.buffer.readUInt8(ind[2]));
  };

  for (let i = 3 + parent.colorTableStartPoint; i < parent.colorTableEndPoint; i+=4) {
    parent.buffer.writeUInt8(helper(blueCallback, parent, i-3, i-2, i-1), i - 3);
    parent.buffer.writeUInt8(helper(greenCallback, parent, i-2, i-3, i-1), i - 2);
    parent.buffer.writeUInt8(helper(redCallback, parent, i-1, i-2, i-3), i - 1);
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
