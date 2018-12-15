import("./siteFunctions.js");
var siteFunctions = new SiteFunctions();

function startSite() {
  $("#map-trigger-button").on("click", function() {
    updateSelectedNeighborhood();
  });
}
$(document).ready(startSite);

document.addEventListener("DOMContentLoaded", function() {
  if (document.querySelectorAll("#map").length > 0) {
    var js_file = document.createElement("script");
    js_file.type = "text/javascript";
    js_file.src =
      "https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyDZq1jagcthd0iaAuWmD2tV8tpvuaet5mY&";
    document.getElementsByTagName("head")[0].appendChild(js_file);
  }
});

function updateSelectedNeighborhood(neigh) {
  fetch("/species.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      replaceCurrentSpecies(data[neigh]);
    });
}

// function makeUL(array) {
//   // Create the list element:
//   var list = document.createElement("ul");

//   for (var i = 0; i < array.length; i++) {
//     // Create the list item:
//     var item = document.createElement("li");

//     // Set its contents:
//     item.appendChild(document.createTextNode(array[i].species));

//     // Add it to the list:
//     list.appendChild(item);
//   }

//   // Finally, return the constructed list:
//   return list;
// }

function replaceCurrentSpecies(data) {
  var mostCommon = `You are most likely to see ${data.most_common.species}.`;
  var mostCommonProbability = `There is ${siteFunctions.aOrAn(data)} ${
    data.most_common.probability[0]
  } (${data.most_common.probability[1]} - ${
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
  $("#tester").html(siteFunctions.makeUL(data.less_common.species));

  //$("#selected-neighborhood").text(data.neighborhood);
  window.species = data;
}

var map;

window.initMap = function() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(41.83, -87.71),
    zoom: 10,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeId: "terrain"
  });

  var kmlLayer = new google.maps.KmlLayer({
    url:
      "https://gist.githubusercontent.com/mfidino/6d5b9197351e27dfe102de6405d4b354/raw/0f22d2ccbe9a91106620cc3b58c06ffe2d3e1749/neighborhood.kml",
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  kmlLayer.addListener("click", function(event) {
    var neighborhoodName = event.featureData.name;
    //console.log(`${neighborhoodName}`);
    updateSelectedNeighborhood(`${neighborhoodName}`);
    $("#selected-neighborhood").text(`${neighborhoodName}`);
  });
};
