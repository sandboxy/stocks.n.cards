describe("truthiness", function(){
  it("better be true...or else..", function(){
    expect(true).toBeTruthy();
  });

});

describe("truthiness2", function(){

  it("better be true...or else..too", function(){
    expect(false).toBeTruthy();
  });
});
