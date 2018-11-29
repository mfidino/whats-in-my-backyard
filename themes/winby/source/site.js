function startSite() {
  $("#map-trigger-button").on("click", function() {
    updateSelectedNeighborhood();
  });
}
$(document).ready(startSite);

document.addEventListener("DOMContentLoaded", function() {
  console.log("eventListen");
  if (document.querySelectorAll("#map").length > 0) {
    var js_file = document.createElement("script");
    js_file.type = "text/javascript";
    js_file.src =
      "https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyDZq1jagcthd0iaAuWmD2tV8tpvuaet5mY&";
    document.getElementsByTagName("head")[0].appendChild(js_file);
  }
});

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

var map;

window.initMap = function() {
  console.log("bois");
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
    console.log(neighborhoodName);
    //updateSelectedNeighborhood(neighborhoodName);
    $("#selected-neighborhood").text(`You have selected: ${neighborhoodName}`);
  });
};
