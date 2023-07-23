const Suits = [ '♠', '♥', '♣', '♦' ];
const Faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];


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
        const Faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
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

  /**
 * Represents a game of War.
 */
  class WarGame {
    constructor() {
      const deck = new Deck();
      deck.shuffle();
  
      this.player1 = new Player('Player 1');
      this.player2 = new Player('Player 2');
  
      // Deal cards to players
      while (deck.peek().length > 0) {
        this.player1.add(deck.draw());
        this.player2.add(deck.draw());
      }
  
      this.player1Points = 0;
      this.player2Points = 0;
    }
  
    /**
     * Play the game of War.
     */
    play() {
      // Play the game
      while (this.player1.hand().length > 0 && this.player2.hand().length > 0) {
        const card1 = this.player1.flip();
        const card2 = this.player2.flip();
  
        //console.log(`Player 1: ${card1.toString()}`);
        //console.log(`Player 2: ${card2.toString()}`);
  
        const value1 = card1.getValue();
        const value2 = card2.getValue();
  
        if (value1 > value2) {
          this.player1Points++;
          //console.log('Player 1 wins this round!');
        } else if (value1 < value2) {
          this.player2Points++;
          //console.log('Player 2 wins this round!');
        } else {
          //console.log('It\'s a tie! War!');
        }
      }
  
      // Determine the winner
      if (this.player1Points > this.player2Points) {
        console.log(`Player 1 points: ${this.player1Points}`);
        console.log(`Player 2 points: ${this.player2Points}`);
        console.log('Player 1 wins the game!');
      } else if (this.player1Points < this.player2Points) {
        console.log(`Player 1 points: ${this.player1Points}`);
        console.log(`Player 2 points: ${this.player2Points}`);
        console.log('Player 2 wins the game!');
      } else {
        console.log(`Player 1 points: ${this.player1Points}`);
        console.log(`Player 2 points: ${this.player2Points}`);
        console.log('It\'s a tie! No one wins the game!');
      }
    }
  }
  
  // ... (remaining code)
  
  // Create a new game instance and play it
  const warGame = new WarGame();
  warGame.play();
  console.log('---------------------------');

  module.exports = {
    WarGame,
    Deck,
    Player,
    Card,
  };