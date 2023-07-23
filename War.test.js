const chai = require("chai");
const expect = chai.expect;
const { WarGame, Deck, Player, Card } = require('./War');

describe('WarGame', () => {
  it('should have two players with cards after the game starts', () => {
    const warGame = new WarGame();
    expect(warGame.player1.hand()).to.not.be.empty;
    expect(warGame.player2.hand()).to.not.be.empty;
  });

  it('should play the game and determine the winner correctly', () => {
    const warGame = new WarGame();
    warGame.play();
    // Add assertions to check the winner correctly based on points (e.g., expect(...).to.be.equal(...);)
    // For example:
    // expect(warGame.player1Points).to.be.above(warGame.player2Points);
  });
});

describe('Deck', () => {
    it('should have 52 cards after initialization', () => {
      const deck = new Deck();
      expect(deck.peek()).to.have.lengthOf(52);
    });
  
    it('should have cards of Card class in the deck', () => {
      const deck = new Deck();
      const cards = deck.peek();
      cards.forEach(card => {
        expect(card).to.be.an.instanceOf(Card);
      });
    });
  
    it('should shuffle the deck and change the order of cards', () => {
      const deck = new Deck();
      const originalOrder = deck.peek().map(card => card.toString());
      deck.shuffle();
      const shuffledOrder = deck.peek().map(card => card.toString());
      expect(originalOrder).to.not.eql(shuffledOrder);
    });
  
    it('should draw a card from the deck', () => {
      const deck = new Deck();
      const card = deck.draw();
      expect(card).to.be.an.instanceOf(Card);
    });
  });