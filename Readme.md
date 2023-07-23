# WAR Card Game - Automated Version

This project is an automated version of the classic card game WAR. The game is designed to be played between two players, and the entire game will be played out instantly without any user input required. The game will run inside your browser's console.

## Game Rules

1. The game is played with a standard 52-card deck.
2. Each player starts with half of the deck, and their goal is to win all the cards.
3. In each round, both players play the top card from their hand.
4. The player with the higher card value wins the round and takes both cards.
5. In the event of a tie, a "war" occurs, and each player adds three more cards to the pot and then plays the next card.
6. The player with the higher card value after the "war" wins all the cards in the pot.
7. The game continues until one player has all the cards or until a predetermined number of rounds is reached.

## Classes and Methods

### Card Class

Represents a standard playing card.

#### Properties

- `suit`: The suit of the card (e.g., "♠", "♥", "♣", "♦").
- `face`: The face or value of the card (e.g., "A", "2", "3", ..., "10", "J", "Q", "K").

### Deck Class

Represents a deck of cards that can be shuffled or drawn.

#### Properties

- `cards`: An array to hold the cards in the deck.

#### Methods

- `create()`: Initializes and populates the deck with 52 cards.
- `shuffle()`: Shuffles the cards in the deck randomly.
- `draw()`: Draws the top card from the deck.
- `peek()`: Allows for the entire deck of cards to be inspected or viewed.

### Player Class

Represents a card player.

#### Properties

- `name`: The name of the player.
- `hand`: An array to hold the player's cards in hand.

#### Methods

- `hand()`: Returns the cards currently in the player's hand.
- `flip()`: Returns the first card in the player's hand and removes it from the hand.
- `add(card)`: Adds the specified card to the player's hand.
- `drawCardFromDeck(deck)`: Draws a card from the deck and adds it to the player's hand.

### WarGame Class

Represents a game of War.

#### Properties

- `player1`: An instance of the `Player` class representing player 1.
- `player2`: An instance of the `Player` class representing player 2.
- `player1Points`: The points scored by player 1.
- `player2Points`: The points scored by player 2.

#### Methods

- `play()`: Play the game of War.

## How to Run the Game

1. Download or clone the repository to your local machine.
2. Open the `index.html` file in your browser.
3. Open the browser's developer console (usually accessible through the browser's developer tools).
4. The game will automatically run, and the winner will be announced in the console.

Enjoy playing the classic card game WAR with this automated version!

## Implementation Details

The project consists of four main classes:

1. `Card`: Represents a standard playing card with properties `suit` and `face`. It also provides methods for calculating the card value and returning its string representation.

2. `Deck`: Represents a deck of cards that can be shuffled and drawn. The deck can be created with a custom set of cards or a standard 52-card deck. It has methods for shuffling, drawing cards, and inspecting the entire deck.

3. `Player`: Represents a card player with properties `name` and `hand`. The player has methods for viewing and manipulating their hand, including adding cards and drawing cards from the deck.

4. `WarGame`: Represents a game of War, with instances of `Player` representing the two players. The game is played automatically, and the winner is determined based on the number of points earned by each player.

To run the game, simply open the `index.html` file in your browser and check the browser's developer console for the game results.
