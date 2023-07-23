const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const Suits = require('./Suits');
const Faces = require('./Card').Faces;
const Card = require('./Card').Card;

// This is a Deck class layout example
// Deck {
//   ctor(cards);
// 
//   function draw();
//   function shuffle();
// 
//   function peek();
//   function toString();
// }

describe('Deck', () => {
  describe('#constructor', () => {
    it ('with empty constructor will create a deck with 52 cards', () => {
      /* Arrange */
      let expectedCards = 52;
      
      /* Act / Invoke */
      let deck = new Deck();
    
      /* Assert */
      expect(deck.peek()).to.have.lengthOf(expectedCards)
    });

    it ('with empty constructor should initialize a standard deck', () => {
      /* Arrange */
      let expectedCards = [
        new Card('♠', 'A'), new Card('♠', '2'), new Card('♠', '3'), new Card('♠', '4'), new Card('♠', '5'), 
        new Card('♠', '6'), new Card('♠', '7'), new Card('♠', '8'), new Card('♠', '9'), new Card('♠', '10'), 
        new Card('♠', 'J'), new Card('♠', 'Q'), new Card('♠', 'K'),
        new Card('♥', 'A'), new Card('♥', '2'), new Card('♥', '3'), new Card('♥', '4'), new Card('♥', '5'), 
        new Card('♥', '6'), new Card('♥', '7'), new Card('♥', '8'), new Card('♥', '9'), new Card('♥', '10'), 
        new Card('♥', 'J'), new Card('♥', 'Q'), new Card('♥', 'K'),
        new Card('♣', 'A'), new Card('♣', '2'), new Card('♣', '3'), new Card('♣', '4'), new Card('♣', '5'), 
        new Card('♣', '6'), new Card('♣', '7'), new Card('♣', '8'), new Card('♣', '9'), new Card('♣', '10'), 
        new Card('♣', 'J'), new Card('♣', 'Q'), new Card('♣', 'K'),
        new Card('♦', 'A'), new Card('♦', '2'), new Card('♦', '3'), new Card('♦', '4'), new Card('♦', '5'), 
        new Card('♦', '6'), new Card('♦', '7'), new Card('♦', '8'), new Card('♦', '9'), new Card('♦', '10'), 
        new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),
      ];
    
      /* Act / Invoke */
      let deck = new Deck();
    
      /* Assert */
      expect(deck.peek()).to.have.lengthOf(expectedCards.length);
      expect(deck.peek()).to.have.deep.members(expectedCards);
    });

    it ('with array of cards, should initialize cards to provided values', (done) => {
      /* Arrange */
      let presetCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
      let expectedCards = [new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),];
    
      /* Act / Invoke */
      let deck = new Deck(presetCards);
    
      /* Assert */
      expect(deck.peek()).to.have.deep.members(expectedCards);
      done();
    });
  });
  describe('#shuffle', () => {
    it ('with empty deck should not throw error', (done) => {
      /* Arrange */
      const deck = new Deck([]);
    
      /* Act / Invoke */
      deck.shuffle();
    
      /* Assert */
      assert.doesNotThrow(() => deck.shuffle());
      done();
    });

    it ('with one card should remain unshuffled', (done) => {
      /* Arrange */
      const deck = new Deck([new Card('♦', 'A')]); // Create a deck with one card (Ace of Diamonds)
    
      /* Act / Invoke */
      deck.shuffle(); // Call the shuffle method on the deck
    
      /* Assert */
      expect(deck.peek()).to.have.lengthOf(1); // The deck should still have one card
      expect(deck.peek()[0]).to.deep.equal(new Card('♦', 'A')); // The card should be the same as the initial one
      done();
    });

    it ('should not remove or alter any existing cards in the deck', (done) => {
      /* Arrange */
      const originalDeck = new Deck();
      const shuffledDeck = new Deck();
    
      /* Act / Invoke */
      shuffledDeck.shuffle();
    
      /* Assert */

      // Check if every card in the shuffled deck exists in the original deck
      expect(shuffledDeck.peek().every(card => originalDeck.peek().some(originalCard => card.face === originalCard.face && card.suit === originalCard.suit))).to.be.true;

      // Check if every card in the original deck exists in the shuffled deck
      expect(originalDeck.peek().every(originalCard => shuffledDeck.peek().some(card => card.face === originalCard.face && card.suit === originalCard.suit))).to.be.true;
      done();
    });

    it ('with multiple cards should change position of at least one card', () => {
      /* Arrange */
      let deck = new Deck();
      let originalDeck = deck.peek();
    
      /* Act / Invoke */
      deck.shuffle();
    
      /* Assert */
      let changedPosition = false;
      deck.peek().forEach((card,index) => {
        let originalCard = originalDeck[index];
        if ((card.suit !== originalCard.suit) ||
            (card.face !== originalCard.face)) {
          changedPosition = true;
          return;
        }
      });
      expect(changedPosition).to.be.true;
    });
  });
  describe('#draw', () => {
    it ('with empty deck should return null', (done) => {
      /* Arrange */
      const emptyDeck = new Deck([]);
    
      /* Act / Invoke */
      const drawnCard = emptyDeck.draw();
    
      /* Assert */
      expect(drawnCard).to.be.null;
      done();
    });

    it ('should return card at the top of the deck', (done) => {
      /* Arrange */
      const deck = new Deck;
      const startingDeckSize = deck.peek().length;
    
      /* Act / Invoke */
      const drawnCard = deck.draw();
    
      /* Assert */
      expect(drawnCard).to.not.be.null;
      expect(deck.peek().length).to.equal(startingDeckSize - 1);
      done();
    });

    it ('should remove card from deck', (done) => {
      /* Arrange */
      const deck = new Deck;
      const startingDeckSize = deck.peek().length;
      
      /* Act / Invoke */
      const drawnCard = deck.draw();
    
      /* Assert */
      expect(deck.peek().length).to.equal(startingDeckSize - 1);
      done();
    });
  });
});

/**
 * Represents a deck of cards that can be shuffled or drawn.
 */
class Deck {
  /**
   * The cards contained in the deck.
   */
  // code here, declare private variable. no one should be able to peek at the deck? cheater!
  #cards;

  /**
   * Creates a new instance of Deck.
   * @param {Card[]} cards The optional list of cards to initialize the deck with. Leaving this parameter null will automatically create a standard 52 card desk.
   */
  constructor(cards) {
    if (cards && Array.isArray(cards)) {
      // Use the provided cards array if it's a valid array
      this.#cards = cards.slice(); // Make a copy to avoid modifying the original array
    } else {
      // If no cards are provided, create a standard deck
      this.#cards = this.#create();
    }
  }

  /**
   * Create or opens a brand new deck of cards.
   * @returns {Card[]} The freshly unwrapped deck
   */
  #create() {
    // return [
    //   new Card('♠', 'A'), new Card('♠', '2'), new Card('♠', '3'), new Card('♠', '4'), new Card('♠', '5'), 
    //   new Card('♠', '6'), new Card('♠', '7'), new Card('♠', '8'), new Card('♠', '9'), new Card('♠', '10'), 
    //   new Card('♠', 'J'), new Card('♠', 'Q'), new Card('♠', 'K'),
    //   new Card('♥', 'A'), new Card('♥', '2'), new Card('♥', '3'), new Card('♥', '4'), new Card('♥', '5'), 
    //   new Card('♥', '6'), new Card('♥', '7'), new Card('♥', '8'), new Card('♥', '9'), new Card('♥', '10'), 
    //   new Card('♥', 'J'), new Card('♥', 'Q'), new Card('♥', 'K'),
    //   new Card('♣', 'A'), new Card('♣', '2'), new Card('♣', '3'), new Card('♣', '4'), new Card('♣', '5'), 
    //   new Card('♣', '6'), new Card('♣', '7'), new Card('♣', '8'), new Card('♣', '9'), new Card('♣', '10'), 
    //   new Card('♣', 'J'), new Card('♣', 'Q'), new Card('♣', 'K'),
    //   new Card('♦', 'A'), new Card('♦', '2'), new Card('♦', '3'), new Card('♦', '4'), new Card('♦', '5'), 
    //   new Card('♦', '6'), new Card('♦', '7'), new Card('♦', '8'), new Card('♦', '9'), new Card('♦', '10'), 
    //   new Card('♦', 'J'), new Card('♦', 'Q'), new Card('♦', 'K'),
    // ];

    // let cards = [];
    // Suits.forEach((suit) => {
    //   Faces.forEach((face) => {
    //     cards.push(new Card(suit, face));
    //   });
    // });
    // return cards;

    return Suits.reduce((cards,suit) => {
      return cards.concat(Faces.map((face) => new Card(suit,face)));
    }, []);
  }


  // Updated shuffle using Fisher-Yates algorithm
  /**
   * Shuffles the cards in the deck.
   */
  shuffle() {
    if (this.#cards) {
      const totalCards = this.#cards.length;
  
      for (let index = totalCards - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        const cardToSwap = this.#cards[randomIndex];
  
        this.#cards[randomIndex] = this.#cards[index];
        this.#cards[index] = cardToSwap;
      }
    }
  }

  // Original shuffle method provided in class
  // shuffle() {
  //   if (this.#cards) {
  //     const totalCards = this.#cards.length;
  
  //     this.#cards.forEach((card, index) => {
  //       const randomIndex = Math.floor(Math.random() * totalCards);
  //       this.#cards[index] = this.#cards[randomIndex];
  //       this.#cards[randomIndex] = card;
  //     });
  //   }
  // }

  /**
   * Allows for the entire desk of cards to be inspected or viewed.
   * @returns {Card[]} The current cards contained in the deck.
   */
  peek() {
    return (this.#cards || []).map((card) => card);
  }

  /**
   * Removes the card from the top of the deck. If no cards are available, then null is returned.
   * @returns {Card} The card at the top of the deck, otherwise returns null.
   */
  draw() {
    if (this.#cards.length === 0) {
      return null;
    }
    return this.#cards.pop();
  }

  /**
   * Returns the string representation of the object.
   * @returns {String} The string representation of the object
   */
   toString() {
    return `${this.face}${this.suit}`;
  }
}

module.exports = Deck;