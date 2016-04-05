describe("Stocks", function() {
  describe("getRankedListOfAlerts", function() {
    it("should return an array of alerts", function() {
      expect(Array.isArray(getRankedListOfAlerts("gt"))).toBeTruthy();
    });

    it("should return a string with 3 elements", function(){
      expect(getRankedListOfAlerts("gt")[0].split(",").length).toBe(3);
    });

  });
});


//write more unit tests for Stocks
/*
enumerate other unit test scenarios (code not required)
1. getRankedListOfAlerts should return a ranked list of alerts
2. getRankedListOfAlerts should only use stock transactions for the past week
3. getFriendsListForUser should return a list of user IDs that are unique to each user
*/
