function startSite() {
  $("#map-trigger-button").on("click", function() {
    updateSelectedNeighborhood();
  });
}
$(document).ready(startSite);

function updateSelectedNeighborhood() {
  fetch("/species.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      replaceCurrentSpecies(data);
    });
}

function replaceCurrentSpecies(data) {
  $("#most-common-species-text").text(data.most_common.species);
  $("#selected-neighborhood").text(data.neighborhood);
  window.species = data;
}
