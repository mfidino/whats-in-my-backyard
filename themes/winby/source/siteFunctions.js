class SiteFunctions {
  makeUL(animals) {
    return `<ul>${animals.map(a => `<li>${a}</li>`).join("")}</ul>`;
  }
}

// Lame way of dealing with module.exports (which we need for mocha) in scripts we load in the HTML
// There's 100% a better way of doing this, but done trying to figure out a better *easier* way - Seth
var module;
if (module) {
  module.exports = SiteFunctions;
}
