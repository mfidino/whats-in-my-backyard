class SiteFunctions {
  makeUL(animals) {
    return `<ul>${animals.map(a => `<li>${a}</li>`).join("")}</ul>`;
  }

  aOrAn(data) {
    if (
      data.most_common.probability[0] >= 80 &&
      data.most_common.probability[0] < 90
    ) {
      return "an";
    } else {
      return "a";
    }
  }
}

// Lame way of dealing with module.exports (which we need for mocha) in scripts we load in the HTML
// There's 100% a better way of doing this, but done trying to figure out a better *easier* way - Seth
var module;
if (module) {
  module.exports = SiteFunctions;
}
