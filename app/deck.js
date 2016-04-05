/*
You are writing various card games, e.g. Blackjack, Poker for an online casino
site. Implement a deck of cards and an abstract game class that includes
common methods you would expect to use for different card games. You do not
need to create any concrete game implementations.
*/

/*
NOTES:
-Common methods I would expect would be
--shuffleDeck
--getHand
--getCurrentHand
--getCard
*/

//Implement a deck of cards
var deck = function deck() {
  var names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
  var Card = function(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
  };

  //return an array of cards, with each card being an object.
  return Array.prototype.concat.apply([], names.map(function(name, i) {
    return suits.map(function(suit) {
      return new Card(i + 1, name, suit);
    });
  }));

};

//Implement an abstract game class that includes common methods
var Game = function Game() {
  var currentHand = [];
  var currentDeck = deck();

  //to inspect the current deck of cards
  //this public method is here for demonstrative purpose only.
  //this would not be in production
  this.getDeck = function() {
    return currentDeck;
  };

  //to shuffle the deck of cards
  this.shuffleDeck = function() {
    var len = currentDeck.length;
    return currentDeck = currentDeck.map(function(card, i) {
      return currentDeck[parseInt(Math.random() * len, 10)];
    });
  };

  //to get the current Hand FOR ONE OF THE PLAYERS
  this.getCurrentHand = function(){
    return currentHand;
  };

  //to get a hand with n cards
  this.getHand = function(n) {
    //it will remove n cards from the currentDeck (the last n cards)
    //it will store the cards in currentHand
    //return an array of n cards
    if(currentHand.length > 0) {
      return "You already have a hand! Try getCard instead"
    }

    return currentHand = currentDeck.splice(-n);
  };

  //to get another card and add it to your hand
  this.getCard = function(){
    return currentDeck.push(currentDeck.pop());
  };
};

var game = new Game();
game.getDeck();
game.shuffleDeck();
game.getHand(3);
game.getCard();
//
