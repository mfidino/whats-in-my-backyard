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

describe("makeCommonSpeciesText", function() {
  it("Returns text that says what the most common species is", function() {
    var target1 = "You are most likely to see raccoon.";
    assert.equal(siteFunctions.makeCommonSpeciesText("raccoon"), target1);
    var target2 = "You are most likely to see opossum.";
    assert.equal(siteFunctions.makeCommonSpeciesText("opossum"), target2);
  });
});

describe("makeCommonProbabilityText", function() {
  it("Returns text that says the probability the most common species is in a selected community area", function() {
    var target1 =
      "There is a 95 (80 - 100)% probability that coyote are in the O'Hare community area.";
    assert.equal(
      siteFunctions.makeCommonProbabilityText({
        neighborhood: "O'Hare",
        most_common: {
          species: "coyote",
          probability: [95, 80, 100]
        }
      }),
      target1
    );
    var target2 =
      "There is an 83 (75 - 90)% probability that raccoon are in the Norwood Park community area.";
    assert.equal(
      siteFunctions.makeCommonProbabilityText({
        neighborhood: "Norwood Park",
        most_common: {
          species: "Raccoon",
          probability: [83, 75, 90]
        }
      }),
      target2
    );
  });
});

describe("makeSpeciesImage", function() {
  it("Returns html block with path to the most common species photo and alt text.", function() {
    var target1 = `<img class="most-common-species-image" src="/images/coyote.png" alt="coyote drawing">`;
    assert.equal(
      siteFunctions.makeSpeciesImage({
        most_common: {
          species: "coyote",
          image: "/images/coyote.png"
        }
      }),
      target1
    );
    var target1 = `<img class="most-common-species-image" src="/images/raccoon.png" alt="raccoon drawing">`;
    assert.equal(
      siteFunctions.makeSpeciesImage({
        most_common: {
          species: "Raccoon",
          image: "/images/raccoon.png"
        }
      }),
      target1
    );
  });
});
