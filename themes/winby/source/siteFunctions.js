class SiteFunctions {
  // Function to make html for unordered list of less common animals
  makeUL(animals) {
    return `<ul>${animals.map(a => `<li>${a}</li>`).join("")}</ul>`;
  }
  // Function to return "an" if a number is between 80-89,
  // otherwise returns "a"
  aOrAn(number) {
    if (number[0] >= 80 && number[0] < 90) {
      return "an";
    } else {
      return "a";
    }
  }
  constructor() {
    var me = this;
  }

  selectNeighborhoodJson(neigh) {
    fetch("/species.json")
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        try {
          this.replaceCurrentSpecies(data[neigh]);
        } catch (e) {
          console.log(e);
        }
      });
  }

  replaceCurrentSpecies(data) {
    var mostCommon = `You are most likely to see ${data.most_common.species}.`;
    var mostCommonProbability = `There is ${this.aOrAn(
      data.most_common.probability
    )} ${data.most_common.probability[0]} (${
      data.most_common.probability[1]
    } - ${
      data.most_common.probability[2]
    })% probability that ${data.most_common.species.toLowerCase()} are in the ${
      data.neighborhood
    } community area.`;
    var block_html = `<img class="most-common-species-image" src="${
      data.most_common.image
    }" alt="${data.most_common.species.toLowerCase()} drawing">`;
    var lessCommon = `Other species you may see in ${data.neighborhood} are:`;

    $("#most-common-species-text").text(mostCommon);
    $("#most-common-probability-text").text(mostCommonProbability);
    $("#changing-image").html(block_html);
    $("#less-common-species-header").text(lessCommon);
    $("#less-common-species-list").html(this.makeUL(data.less_common.species));

    window.species = data;
  }
}

// function updateSelectedNeighborhood(neigh) {
//   fetch("/species.json")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       replaceCurrentSpecies(data[neigh]);
//     });
// }

// Lame way of dealing with module.exports (which we need for mocha) in scripts we load in the HTML
// There's 100% a better way of doing this, but done trying to figure out a better *easier* way - Seth
var module;
if (module) {
  module.exports = SiteFunctions;
}
