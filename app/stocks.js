/*
Suppose your team needs to launch a new alerts feature called “Stocks Your
Friends are Trading'. The alerts logic is based on the following naïve rules:
• A user should only be alerted to stocks their friends have bought or sold in
the past week.
• BUY and SELL alerts are driven by the net number of friends buying a
stock – if 5 friends bought shares in GOOG, and 2 friends sold shares in
GOOG, the net number of friends buying GOOG is 3. If the net number is
> 0, we'd indicate more friends are buying GOOG (BUY alert); if < 0, more
friends are selling GOOG (SELL alert); and if 0, we ignore.
• Alerts are prioritized by activity trend, e.g. a net number of 5 friends selling
GOOG is shown before a net number of 4 friends buying YHOO.

Create these two functions to help you.
• getFriendsListForUser – returns a list of user IDs (strings that uniquely
identify a user) representing the friends of a user.
• getTradeTransactionsForUser – returns a list of trades represented by a
string “<date>,<BUY|SELL>,<ticker>', e.g. “2014-01-01,BUY,GOOG',
ordered by trade date with the most recent trade frst in the list.

Please:
1) Write a function that provides a ranked (high to low) list of alerts. You can
represent an alert by a string “<net_friends>,<BUY|SELL>,<ticker>', e.g.
“5,SELL,GOOG' to indicate a net number of 5 friends selling GOOG.
2) Write code for a few key unit tests for your code.
3) Enumerate other unit test scenarios (code not required).
4) Provide the space and time complexity of your solution.
*/

/*
NOTES:

*/

var getFriendsListForUser = function getFriendsListForUser(user) {
  var db = {
    'gt': ['tim', 'allen'],
    'tim': ['gt', 'eric'],
    'allen': ['gt', 'eric'],
    'eric': ['tim', 'allen'],
  };

  return db[user] ? db[user] : 'Enter a valid user';
};


var getTradeTransactionsForUser = function getTradeTransactionsForUser(user) {
  var db = {
    'gt': ['2016-03-31,BUY,BSC',
      '2016-04-01,BUY,GOOG',
      '2016-04-02,BUY,YHOO',
      '2016-04-03,BUY,GOOG',
      '2016-04-04,BUY,YHOO',
      '2016-04-05,BUY,GOOG',
      '2016-04-06,BUY,GOOG',
      '2016-04-07,BUY,GOOG',
    ],
    'tim': ['2016-03-31,BUY,BSC',
      '2016-04-01,SELL,GOOG',
      '2016-04-02,SELL,GOOG',
      '2016-04-03,BUY,YHOO',
      '2016-04-04,SELL,GOOG',
      '2016-04-05,BUY,YHOO',
      '2016-04-06,SELL,YHOO',
      '2016-04-07,SELL,GOOG',
    ],
    'allen': [
      '2016-03-31,BUY,BSC',
      '2016-04-01,BUY,GOOG',
      '2016-04-02,BUY,YHOO',
      '2016-04-03,SELL,GOOG',
      '2016-04-04,SELL,GOOG',
      '2016-04-05,BUY,YHOO',
      '2016-04-06,SELL,GOOG',
      '2016-04-07,SELL,GOOG',
    ],
    'eric': [
      '2016-03-31,BUY,BSC',
      '2016-04-01,BUY,GOOG',
      '2016-04-02,SELL,YHOO',
      '2016-04-03,SELL,GOOG',
      '2016-04-04,SELL,YHOO',
      '2016-04-05,BUY,GOOG',
      '2016-04-06,BUY,YHOO',
      '2016-04-07,SELL,GOOG',
    ],
  };

  return db[user] ? db[user].splice(-7) : 'Enter a valid user';
};

var getRankedListOfAlerts = function getRankedListOfAlerts(user) {
  //getTradeTransactionsForUser
  //getFriendsListForUser
  //this db is to keep track of each friend and their cumulative positions
  //format: {user:{stock: {buy:0, sell:0, netPos: something}}}
  var db = {};
  var result = {};
  var resultingString = "";
  var resultingArray = [];

  var friendsList = getFriendsListForUser(user);
  var friendsListLen = friendsList.length;
  var friendsListLem = friendsList.length - 1;

  //loop thru friendsList
  for (var i = 0; i < friendsListLen; i++) {
    var friend = friendsList[i];
    var allTx = getTradeTransactionsForUser(friend);
    var allTxLen = allTx.length;
    var allTxLem = allTx.length - 1;
    db[friend] = {};

    //loop thru allTx for that friend
    getTradeTransactionsForUser(friend).forEach(function(tx) {
      //in each tx string, go thru and get the stock name and the txType
      var txType = tx.split(",")[1];
      var stock = tx.split(",")[2];
      //if it doesnt exist, create it in the db
      if (db[friend][stock] === undefined) {
        db[friend][stock] = {};
        db[friend][stock].BUY = 0;
        db[friend][stock].SELL = 0;
        db[friend][stock].txType = "";
      }
      //append the stockName and txType to a db and increment buy/sell
      if (txType === "BUY") {
        db[friend][stock].BUY += 1;
      }
      if (txType === "SELL") {
        db[friend][stock].SELL += 1;
      }

      //then check to see which is greater, then reset the netPosForUser
      if (db[friend][stock].BUY > db[friend][stock].SELL) {
        db[friend][stock].txType = "BUY"
      }
      if (db[friend][stock].BUY < db[friend][stock].SELL) {
        db[friend][stock].txType = "SELL"
      }

      //initialize the result.stock for future
      if (!result[stock]) {
        result[stock] = {};
        result[stock].BUY = 0;
        result[stock].SELL = 0;
        result[stock].netPos = "";
      }

    });

    //now at this point, we have looped thru one the friends
    //after populating the last friend,
    if (i === friendsListLem) {
      //we should check the db and find the netPos for our friends
      for (var friend in db) {
        for (var stock in db[friend]) {
          var s = db[friend][stock];
          if (s.txType === "SELL") {
            result[stock].SELL += 1
          }
          if (s.txType === "BUY") {
            result[stock].BUY += 1
          }
        }
      }
    }
  }

  //populate the total netPosition.
  for (var stock in result) {
    //for each netPos in that stock, we increment result.stockname.SELL by 1 or result.stockname.BUY by 1.
    if (result[stock].SELL > result[stock].BUY) {
      //then compare which is greater. to change the result.stockname.netPos to Sell or Buy.
      result[stock].netPos = "SELL"
      result[stock].netPosValue = result[stock].SELL;
    }
    if (result[stock].SELL < result[stock].BUY) {
      result[stock].netPos = "BUY"
      result[stock].netPosValue = result[stock].BUY;
    }
    if (!!result[stock].netPosValue) {
      resultingArray.push("" + result[stock].netPosValue + "," + result[stock].netPos + "," + stock);
    }
  }

  //create the resultingString thats sorted
  ///prolly good to create a netPosValue too, so that it's easier to access
  //loop over the results array again?
  //push netPosValue, netPos, stock to an array as a string
  //sort the array by the netPosValue


  //after all this is done, we return the result.
  //in order to get 5, i need to get all the netPositions for each user&stock
  //format: {user:{stock: {buy:0, sell:0, netPos: something}}}
  //then using those netPositions, i can come up with a netPosition for all myFriends which will be returned
  //return {'5,SELL,GOOG','4,BUY,YHOO'} //unsorted

  return resultingArray.sort(function(a, b) {
    return parseInt(b) - parseInt(a)
  });


  //want a list of friends, with a new buyORsell for that week
  //then aggregate the buy/sell to come up with a new
  //now we have a unsorted list of trade transactions
  //sort the list by <ticker>
  //add each of the tickers to an object and increment/decrement one per BUY/SELL
  //getNetFriendsByTicker
  ///

  //{gt:{google: netTxType}}
  //then add all the netTxType. get the greater txtype then push them into a result array
  //return a list of alerts, ranked/sorted by netTxType.
  //['5,SELL,GOOG','4,BUY,YHOO']
  //theres a net of 5 people selling google
};

getRankedListOfAlerts("gt")
/*
ASSUMPTIONS:
-Today is April 8, 2016.
-Friends only started trading 7 days ago.
-Trading occurs on Saturday and Sunday.
-Each transaction represents one traded stock
*/
