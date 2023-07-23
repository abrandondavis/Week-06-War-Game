const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const Card = require('./Card').Card;
const Deck = require('./Deck');

// Example Player class layout
// Player {
//   ctor(name, hand);
// 
//   function flip();
//   function add();
//   function drawCardFromDeck();
// 
//   function hand();
//   function toString();
// }



describe('Player', () => {
  describe('#constructor', () => {
    it ('with empty constructor will throw Error', (done) => {
      /* Arrange */
      const playerConstructor = () => new Player();
    
      /* Act / Invoke */
    
      /* Assert */
      expect(playerConstructor).to.throw(Error);
      done();
    });

    it ('with name sets name property', (done) => {
      /* Arrange */
      let newPlayer = new Player('Brandon');
    
      /* Act / Invoke */
    
      /* Assert */
      expect(newPlayer.name).to.equal('Brandon');
      done();
    });

    it ('with cards will initialize hand', (done) => {
      /* Arrange */
      let presetCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
      let expectedCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
      let player = new Player('Name', presetCards);

      /* Act / Invoke */
    
      /* Assert */
      expect(player.hand()).to.deep.equal(expectedCards);
      done();
    });
  });
  describe('#flip', () => {
    it ('with empty hand should return null', (done) => {
      /* Arrange */
      let emptyHand = new Player(1);
    
      /* Act / Invoke */
    
      /* Assert */
      expect(emptyHand.flip()).to.be.null;
      done();
    });

    it ('should return first card from the players hand', (done) => {
      /* Arrange */
      let presetCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
      let givenCards = new Player('Cards', presetCards);
      let expectedCard = new Card('♦', 'J');
    
      /* Act / Invoke */
      let flippedCard = givenCards.flip();
    
      /* Assert */
      expect(flippedCard).to.not.be.null;
      expect(flippedCard.suit).to.equal(expectedCard.suit);
      expect(flippedCard.face).to.equal(expectedCard.face);
      done();
    });

    it ('should remove card from players hand', (done) => {
      /* Arrange */
      let presetCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
      let givenCards = new Player('Cards', presetCards);
      const originalLength = givenCards.hand().length;
    
      /* Act / Invoke */
      const playedCard = givenCards.flip();
    
      /* Assert */
      expect(givenCards.hand().length).to.equal(originalLength - 1);
      done();
    });
  });
  describe('#add', () => {
    it ('with null card returns existing hand count', (done) => {
      /* Arrange */
      let basePlayer = new Player('player');
      const nullCard = null;
    
      /* Act / Invoke */
      const handCount = basePlayer.add(nullCard);
    
      /* Assert */
      expect(handCount).to.equal(0);
      done();
    });

    it ('with valid card adds card to hand', (done) => {
      /* Arrange */
      const testCard = new Card('♦', '5');
      const addedCard = new Card('♦', '5');
      const testPlayer = new Player('Bubba');
    
      /* Act / Invoke */
      testPlayer.add(testCard);
    
      /* Assert */
      expect(testPlayer.hand()).to.deep.include(addedCard);
      done();
    });

    it ('with empty hand adds card to hand', (done) => {
      /* Arrange */
      const addedCard = new Card('♦', '5');
      const testPlayer = new Player('Bubba');
      const zeroCards = testPlayer.hand().length;
    
      /* Act / Invoke */
      testPlayer.add(addedCard);
    
      /* Assert */
      expect(testPlayer.hand().length).to.equal(1);
      expect(zeroCards).to.equal(0);
      done();
    });
    it ('with non-Card object/instance doesnt add card to hand', (done) => {
      /* Arrange */
      const testPlayer = new Player('Bozo');
      const card = 'fish';
      const zeroCards = testPlayer.hand().length;
    
      /* Act / Invoke */
      testPlayer.add(card);
    
      /* Assert */
      expect(testPlayer.hand().length).to.equal(0);
      expect(zeroCards).to.equal(0);
      done();
    });
  });
  describe('#drawCardFromDeck', () => {
    it('with empty deck returns false', (done) => {
      /* Arrange */
      const testPlayer = new Player('Bubba');
      const emptyDeck = new Deck([]);
  
      /* Act */
      const result = testPlayer.drawCardFromDeck(emptyDeck);
  
      /* Assert */
      expect(result).to.be.false;
      done();
    });
  
    it('with non-Deck object/instance returns false', (done) => {
      /* Arrange */
      const testPlayer = new Player('Bubba');
  
      /* Act */
      const result = testPlayer.drawCardFromDeck({});
  
      /* Assert */
      expect(result).to.be.false;
      done();
    });
  
    it('with valid deck and empty hand adds drawn card to players hand', (done) => {
      /* Arrange */
      const testPlayer = new Player('Bubba');
      const validDeck = new Deck();
  
      /* Act */
      const result = testPlayer.drawCardFromDeck(validDeck);
  
      /* Assert */
      expect(result).to.be.true;
      expect(testPlayer.hand()).to.have.lengthOf(1);
      done();
    });
  
    it('with valid deck and existing hand adds drawn card to players hand', (done) => {
      /* Arrange */
      const testPlayer = new Player('Bubba', [new Card('♦', '5')]);
      const validDeck = new Deck();
  
      /* Act */
      const result = testPlayer.drawCardFromDeck(validDeck);
  
      /* Assert */
      expect(result).to.be.true;
      expect(testPlayer.hand()).to.have.lengthOf(2);
      done();
    });
  });
});







/**
 * Represents a card player.
 */
class Player {
  /**
   * The cards in the players hand.
   */
  #cards;
  // code here, declare private variable. no one should be able to peek at my cards!

  /**
   * Creates an instance of the Player class.
   * @param {String} name The name of the player.
   * @param {Card[]} cards The optional list of cards to put into the players hand. If not specified, then player has an empty hand.
   */
  constructor(name = "", cards = []) {
    if (!name) {
      throw Error(`Name not provided`)
    } else {
      this.name = name;
    }
    if (cards && Array.isArray(cards)) {
      this.#cards = cards.slice();
    } else {
      this.#cards = [];
    }
  }

  /**
   * Returns the cards currently in the players hand.
   * @returns {Card[]} The cards currently in the players hand.
   */
  hand() {
    /* code here */
    return this.#cards;
  }

  /**
   * Returns the first card in the players hand. Once flipped, the card is removed from the players hand.
   * @returns {Card} The current.
   */
  flip() {
    /* code here */
    if (this.#cards.length === 0) {
      return null;
    }
    return this.#cards.shift();
  }

  /**
   * Adds the specified card to the players hand.
   * @param {Card} card The card to add.
   * @returns {Number} The number of cards in the players hand.
   */
  add(card) {
    /* code here */
    if (card instanceof Card) {
      this.#cards.push(card);
    }
    return this.#cards.length;
  }

  /**
   * Draws a card from the deck and adds it to the users hand.
   * @param {Deck} deck The deck to draw the card from.
   * @returns {Boolean} True if a card was drawn, false if otherwise.
   */
   drawCardFromDeck(deck) {
    /* code here */
    if (deck instanceof Deck) {
      const drawnCard = deck.draw();
      if (drawnCard) {
        this.add(drawnCard);
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the string representation of the object.
   * @returns {String} The string representation of the object
   */
  toString() {
    return `Name:${this.name} Cards:${this.#cards}`;
  }
}

module.exports = Player;