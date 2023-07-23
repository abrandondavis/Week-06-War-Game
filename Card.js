const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const Suits = require('./Suits');
const Faces = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];

// This is just a class layout example
// Card {
//   property suit;
//   property face;  
//
//   ctor(suit, face);
// 
//   function getValue();
//   function toString();
// }


describe('Card', () => {
  describe('#constructor', () => {
    it ('should take a suit and value', (done) => {
      /* Arrange */
      let expectedSuit = '♥';
      let expectedFace = 'A';

      /* Act / Invoke */
      let card = new Card(expectedSuit, expectedFace);
    
      /* Assert */
      expect(card.suit).to.equal(expectedSuit);
      expect(card.face).to.equal(expectedFace);

      done();
    });

    it ('should throw Error if no parameters provided', (done) => {
      expect(() => {
        /* Arrange */
        /* Act / Invoke */
        let card = new Card();
      }).to.throw(Error); /* Assert */
      done();
    });

    it ('should throw Error if suit is not valid', (done) => {
      expect(() => {
        /* Arrange */
        /* Act / Invoke */
        let card = new Card('A', 'A');
      }).to.throw(Error);
      done();
        /* Assert */
    });

    it ('should throw Error if face is not valid', (done) => {
      expect(() => {
        /* Arrange */
        /* Act / Invoke */
        let card = new Card('♠', 'W');
      }).to.throw(Error);
      done();
      /* Assert */
    });
  });
  describe('#toString', () => {
    it ('should return suit and card face', (done) => {
      /* Arrange */
      const card = new Card('♠', 'A');
    
      /* Act / Invoke */
      const result = card.toString();
    
      /* Assert */
      expect(result).to.equal('♠A');
      done();
    });
  });
  describe('#getValue', () => {
    it ('with ♠A should return 1', () => {
      /* Arrange */
      let expectedValue = 1;
      let card = new Card('♠', 'A');
    
       /* Act / Invoke */
       let value = card.getValue();
    
       /* Assert */
       expect(value).to.be.equal(expectedValue);
    });

    it ('with ♠Q should return 10', () => {
      /* Arrange */
      let expectedValue = 10;
      let card = new Card('♠', 'Q');
    
       /* Act / Invoke */
       let value = card.getValue();
    
       /* Assert */
       expect(value).to.be.equal(expectedValue);
    });

    it ('with ♠K should return 10', (done) => {
      /* Arrange */
    let expectedValue = 10;
    let card = new Card('♠', 'K');
  
     /* Act / Invoke */
     let value = card.getValue();
  
     /* Assert */
     expect(value).to.be.equal(expectedValue);
     done();
    });

    it ('with ♠10 should return 10', (done) => {
      /* Arrange */
      let expectedValue = 10;
      let card = new Card('♠', '10');
    
       /* Act / Invoke */
       let value = card.getValue();
    
       /* Assert */
       expect(value).to.be.equal(expectedValue);
       done();
    });

    it ('with ♠2 should return 2', () => {
      /* Arrange */
      let expectedValue = 2;
      let card = new Card('♠', '2');
    
       /* Act / Invoke */
       let value = card.getValue();
    
       /* Assert */
       expect(value).to.be.equal(expectedValue);
    });

    it ('with ♠7 should return 7', () => {
      /* Arrange */
      let expectedValue = 7;
      let card = new Card('♠', '7')
    
      /* Act / Invoke */
      let value = card.getValue();
    
      /* Assert */
      expect(value).to.be.equal(expectedValue);
    });
  });
});

/**
 * Represents a standard playing card.
 */
class Card {
  suit;
  face;

  /**
   * Creates a new player card.
   * @param {String} suit The suit of the card. Accepted values: '♠', '♥', '♣', '♦'
   * @param {String} face The face or value of the card. Accepted values: 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
   */
  constructor(suit, face) {
    if (Suits.indexOf(suit) === -1) {
      throw Error(`Invalid suit specified. Valid values are: ${ Suits.join(',') }`);
    }
    if (Faces.indexOf(face) === -1) {
      throw Error(`Invalid face specified. Valid values are: ${ Faces.join(',') }`);
    }

    this.suit = suit;
    this.face = face;
  }

  /**
   * Calculates the value of the specified card.
   * @returns The value of the specified card.
   */
  getValue() {
    switch(this.face) {
      case 'A': 
        return 1;
      case 'J':
      case 'Q':
      case 'K': 
        return 10;
      
      default:
        let value = parseInt(this.face, 10);
        if (value) {
          return value;
        }
        return 0;
    }
  }

  /**
   * Returns the string representation of the object.
   * @returns {String} The string representation of the object
   */
  toString() {
    return `${ this.suit }${ this.face }`;
  }
}

module.exports = {
  Card : Card,
  Faces : Faces
};