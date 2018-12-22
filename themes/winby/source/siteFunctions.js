class SiteFunctions {
  // Function to make html for unordered list of less common animals
  makeUL(animals) {
    return `<ul class="card-text">${animals
      .map(a => `<li>${a}</li>`)
      .join("")}</ul>`;
  }

  makeCommonSpeciesText(animals) {
    return `<h5 class="card-text">You are most likely to see ${animals}.</h5>`;
  }

  makeCommonProbabilityText(speciesArray) {
    var mostCommonProb = `<p class="card-text">There is ${this.aOrAn(
      speciesArray.most_common.probability
    )}`;
    mostCommonProb += ` ${speciesArray.most_common.probability[0]}`;
    mostCommonProb += ` (${speciesArray.most_common.probability[1]} - ${
      speciesArray.most_common.probability[2]
    })%`;
    mostCommonProb += ` probability that ${speciesArray.most_common.species.toLowerCase()} are in the ${
      speciesArray.neighborhood
    } community area.</p>`;

    return mostCommonProb;
  }

  makeSpeciesImage(speciesArray) {
    var block_html = `<img class="most-common-species-image" src="/images/${
      speciesArray.most_common.image
    }" alt="${speciesArray.most_common.species.toLowerCase()} drawing">`;
    return block_html;
  }

  makeLessCommonHeader(neighborhood) {
    return `<h5 class="card-text">Other species you may see in ${neighborhood} are:</h5>`;
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

  makeMostCommonHeader(data) {
    return `<h4 class="card-title">${data.neighborhood}</h4>`;
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

  makeSpeciesCard(data) {
    var block_html = `<div class="row"><div class="col-sm-8"><div class="card border-0">`;
    block_html += this.makeMostCommonHeader(data);
    block_html += `<div class="card-body">`;
    block_html += this.makeCommonSpeciesText(data.most_common.species);
    block_html += this.makeCommonProbabilityText(data);
    block_html += this.makeLessCommonHeader(data.neighborhood);
    block_html += this.makeUL(data.less_common.species);
    block_html += `</div></div></div><div class="col-sm-1">`;
    block_html += this.makeSpeciesImage(data);
    block_html += `</div></div>`;
    return block_html;
  }

  // Call the updating functions.
  replaceCurrentSpecies(data) {
    $("#speciesCard").html(`<div class="row">
      <div class="col-sm-8">
        <div class="card border-0">
          <h4 class="card-title">
            Norwood Park
          </h4>
          <div class="card-body">
            <h5 class="card-text">You are most likely to see raccoon.</h5>
            <p class="card-text">There is an 83 (75 - 90)% probability that raccoon are in the Norwood Park community area.</p>
            <h5 class="card-text">Other species you may see in Norwood Park are:</h5>
            <ul class="card-text"><li>coyote</li><li>gray squirrel</li></ul>
          </div>
        </div>
          </div>
            <div class="col-sm-1">
            <img class="most-common-species-image" src="/images/raccoon.png" alt="raccoon drawing">
          </div>
    </div>`);
    $("#species-card").html(this.makeSpeciesCard(data));

    window.species = data;
  }
}

// Lame way of dealing with module.exports (which we need for mocha) in scripts we load in the HTML
// There's 100% a better way of doing this, but done trying to figure out a better *easier* way - Seth
var module;
if (module) {
  module.exports = SiteFunctions;
}
