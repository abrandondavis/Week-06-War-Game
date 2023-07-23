const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;

describe('Suits', () => {
  describe('#array', () => {
    it('should contain four values', (done) => {
      expect(Suits.length).to.equal(4);

      done();
    });
    it('should contain "♠"', (done) => {
      let expectedSuit = '♠';
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♥"', (done) => {
      let expectedSuit = '♥';
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♣"', (done) => {
      let expectedSuit = '♣';
      expect(Suits).to.contain(expectedSuit);

      done();
    });
    it('should contain "♦"', (done) => {
      let expectedSuit = '♦';
      expect(Suits).to.contain(expectedSuit);

      done();
    });
  });
});

const Suits = [ '♠', '♥', '♣', '♦' ];
//const Suits = ['\u2666', '\u2665', '\u2666', '\u2663'];

module.exports = Suits;
