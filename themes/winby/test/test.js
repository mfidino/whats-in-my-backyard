var assert = require("assert");
var SiteFunctions = require("../source/siteFunctions");
var siteFunctions = new SiteFunctions();

describe("makeUL", function() {
  it("should return an html block for an unordered list given an array of species names", function() {
    var target = "<ul><li>raccoon</li><li>deer</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon", "deer"]), target);
    var target2 = "<ul><li>raccoon</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon"]), target2);
    var target3 = "<ul><li>raccoon</li><li>deer</li><li>coyote</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon", "deer", "coyote"]), target3);
  });
});

describe("aOrAn", function() {
  it("should return 'an' if a number is between 80-89, otherwise 'a'", function() {
    var target1 = "an";
    assert.equal(siteFunctions.aOrAn([81, 75, 90]), target1);
    var target2 = "a";
    assert.equal(siteFunctions.aOrAn([70, 45, 97]), target2);
    var target3 = "an";
    assert.equal(siteFunctions.aOrAn([80.32, 65, 98]), target3);
  });
});
