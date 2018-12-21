class SiteFunctions {
  // Function to make html for unordered list of less common animals
  makeUL(animals) {
    return `<ul>${animals.map(a => `<li>${a}</li>`).join("")}</ul>`;
  }

  makeCommonSpeciesText(animals) {
    return `You are most likely to see ${animals}.`;
  }

  makeCommonProbabilityText(speciesArray) {
    var mostCommonProb = `There is ${this.aOrAn(
      speciesArray.most_common.probability
    )}`;
    mostCommonProb += ` ${speciesArray.most_common.probability[0]}`;
    mostCommonProb += ` (${speciesArray.most_common.probability[1]} - ${
      speciesArray.most_common.probability[2]
    })%`;
    mostCommonProb += ` probability that ${speciesArray.most_common.species.toLowerCase()} are in the ${
      speciesArray.neighborhood
    } community area.`;

    return mostCommonProb;
  }

  makeSpeciesImage(speciesArray) {
    var block_html = `<img class="most-common-species-image" src="${
      speciesArray.most_common.image
    }" alt="${speciesArray.most_common.species.toLowerCase()} drawing">`;
    return block_html;
  }

  makeLessCommonHeader(neighborhood) {
    return `Other species you may see in ${neighborhood} are:`;
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

  selectNeighborhoodJson(neigh) {
    fetch("/species.json")
      .then(speciesJson => speciesJson.json())
      .then(data => {
        try {
          this.replaceCurrentSpecies(data[neigh]);
        } catch (e) {
          console.log(e);
        }
      });
  }
  // Call the updating functions.
  replaceCurrentSpecies(data) {
    $("#most-common-species-text").text(
      this.makeCommonSpeciesText(data.most_common.species)
    );
    $("#most-common-probability-text").text(
      this.makeCommonProbabilityText(data)
    );
    $("#changing-image").html(this.makeSpeciesImage(data));
    $("#less-common-species-header").text(
      this.makeLessCommonHeader(data.neighborhood)
    );
    $("#less-common-species-list").html(this.makeUL(data.less_common.species));
    window.species = data;
  }
}

// Lame way of dealing with module.exports (which we need for mocha) in scripts we load in the HTML
// There's 100% a better way of doing this, but done trying to figure out a better *easier* way - Seth
var module;
if (module) {
  module.exports = SiteFunctions;
}
