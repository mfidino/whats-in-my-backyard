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
          image: "coyote.png"
        }
      }),
      target1
    );
    var target1 = `<img class="most-common-species-image" src="/images/raccoon.png" alt="raccoon drawing">`;
    assert.equal(
      siteFunctions.makeSpeciesImage({
        most_common: {
          species: "Raccoon",
          image: "raccoon.png"
        }
      }),
      target1
    );
  });
});

describe("makeLessCommonHeader", function() {
  it("Returns text that says other species you may see in a neighborhood", function() {
    var target1 = "Other species you may see in Norwood Park are:";
    assert.equal(siteFunctions.makeLessCommonHeader("Norwood Park"), target1);
    var target2 = "Other species you may see in Logan Square are:";
    assert.equal(siteFunctions.makeLessCommonHeader("Logan Square"), target2);
  });
});

describe("makeSpeciesCard", function() {
  it("Returns the html for the species card after clicking on a neighborhood", function() {
    var target1 = `<div class="row"><div class="col-sm-8"><div class="card border-0"><h4 class="card-title">Norwood Park</h4><div class="card-body"><h5 class="card-text">You are most likely to see raccoon.</h5><p class="card-text">There is an 83 (75 - 90)% probability that raccoon are in the Norwood Park community area.</p><h5 class="card-text">Other species you may see in Norwood Park are:</h5><ul class="card-text"><li>coyote</li><li>gray squirrel</li></ul></div></div></div><div class="col-sm-1"><img class="most-common-species-image" src="/images/raccoon.png" alt="raccoon drawing"></div></div>`;
    assert.equal(
      siteFunctions.makeSpeciesCard({
        neighborhood: "Norwood Park",
        most_common: {
          species: "raccoon",
          probability: [83, 75, 90],
          image: "raccoon.png"
        },
        less_common: {
          species: ["coyote", "gray squirrel"],
          probability: {
            coyote: [80, 60, 85],
            "gray squirrel": [45, 30, 75]
          }
        }
      }),
      target1
    );
  });
});
