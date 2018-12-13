var assert = require("assert");
var SiteFunctions = require("../source/siteFunctions");
var siteFunctions = new SiteFunctions();

describe("makeUL", function() {
  it("should return number of characters in a string", function() {
    var target = "<ul><li>raccoon</li><li>deer</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon", "deer"]), target);
    var target2 = "<ul><li>raccoon</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon"]), target2);
    var target3 = "<ul><li>raccoon</li><li>deer</li><li>coyote</li></ul>";
    assert.equal(siteFunctions.makeUL(["raccoon", "deer", "coyote"]), target3);
  });
});
