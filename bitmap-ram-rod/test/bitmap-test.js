'use strict' ;

const fs = require('fs');
const expect = require('chai').expect;
const bitmap = require(`${__dirname}/../model/bitmap.js`);

describe('Constructor Test', function() {
  describe('not an object', function() {
    it('should return an error', function(done) {
      let result = ();
      expect(err).to.be.an('error');
      done();
      });
    });
  
    describe('if an object', function() {
      it('Instantiate Object', function() {
        let result = bitmapConstructor();
        expect(result).to.be.an('object');
    });
  });
});
