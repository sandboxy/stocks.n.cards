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
ASSUMPTIONS:
-Today is April 8, 2016.
-Trading occurs on Saturday and Sunday.
-Each transaction represents one traded stock
*/

/*
COMPLEXITY:
-The space complexity of the solution is linear in respect to the number of stocks that each friend trades.
-The time complexity of the solution is greater than linear but less than quadratic. The formula is n*m+n*o+o+o, where n=the number of friends, m=7, and o=the number of stocks.

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
    'gt': [
      '2016-03-31,BUY,BSC',
      '2016-04-01,BUY,GOOG',
      '2016-04-02,BUY,YHOO',
      '2016-04-03,BUY,GOOG',
      '2016-04-04,BUY,YHOO',
      '2016-04-05,BUY,GOOG',
      '2016-04-06,BUY,GOOG',
      '2016-04-07,BUY,GOOG',
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
    'tim': [
      '2016-03-31,BUY,BSC',
      '2016-04-01,SELL,GOOG',
      '2016-04-02,SELL,GOOG',
      '2016-04-03,BUY,YHOO',
      '2016-04-04,SELL,GOOG',
      '2016-04-05,BUY,YHOO',
      '2016-04-06,SELL,YHOO',
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
  var db = {};
  var result = {};
  var resultingString = "";
  var resultingArray = [];

  var friendsList = getFriendsListForUser(user);
  var friendsListLen = friendsList.length;
  var friendsListLem = friendsList.length - 1;

  for (var i = 0; i < friendsListLen; i++) {
    var friend = friendsList[i];
    var allTx = getTradeTransactionsForUser(friend);
    var allTxLen = allTx.length;
    var allTxLem = allTx.length - 1;
    db[friend] = {};

    getTradeTransactionsForUser(friend).forEach(function(tx) {
      var txType = tx.split(",")[1];
      var stock = tx.split(",")[2];
      if (db[friend][stock] === undefined) {
        db[friend][stock] = {};
        db[friend][stock].BUY = 0;
        db[friend][stock].SELL = 0;
        db[friend][stock].txType = "";
      }
      if (txType === "BUY") {
        db[friend][stock].BUY += 1;
      }
      if (txType === "SELL") {
        db[friend][stock].SELL += 1;
      }

      if (db[friend][stock].BUY > db[friend][stock].SELL) {
        db[friend][stock].txType = "BUY";
      }
      if (db[friend][stock].BUY < db[friend][stock].SELL) {
        db[friend][stock].txType = "SELL";
      }

      if (!result[stock]) {
        result[stock] = {};
        result[stock].BUY = 0;
        result[stock].SELL = 0;
        result[stock].netPos = "";
      }

    });

    if (i === friendsListLem) {
      for (var friend in db) {
        for (var stock in db[friend]) {
          var s = db[friend][stock];
          if (s.txType === "SELL") {
            result[stock].SELL += 1;
          }
          if (s.txType === "BUY") {
            result[stock].BUY += 1;
          }
        }
      }
    }
  }

  for (var stock in result) {
    if (result[stock].SELL > result[stock].BUY) {
      result[stock].netPos = "SELL";
      result[stock].netPosValue = result[stock].SELL;
    }
    if (result[stock].SELL < result[stock].BUY) {
      result[stock].netPos = "BUY";
      result[stock].netPosValue = result[stock].BUY;
    }
    if (!!result[stock].netPosValue) {
      resultingArray.push("" + result[stock].netPosValue + "," + result[stock].netPos + "," + stock);
    }
  }

  return resultingArray.sort(function(a, b) {
    return parseInt(b) - parseInt(a);
  });
};

// getRankedListOfAlerts("gt");

//HTML
var main = document.getElementById("main") || "test";

main.onclick = function() {
  getRankedListOfAlerts("gt").forEach(function(alertt) {
    alert(alertt);
  });
}
