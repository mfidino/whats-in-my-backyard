function startSite() {
  $("#map-trigger-button").on("click", function() {
    updateSelectedNeighborhood();
  });

  // asynchronously get google maps script
  // manually using ajax so that we cache the script
  // fetch(
  //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZq1jagcthd0iaAuWmD2tV8tpvuaet5mY&libraries=places"
  // ).then(function(response) {
  //   return initMap();
  // });
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
//var src = "/neighborhood.kml";
//"https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml";

window.initMap = function() {
  console.log("bois");
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(41.928274, -87.706678),
    zoom: 10,
    mapTypeId: "terrain"
  });

  // var ctaLayer = new google.maps.KmlLayer({
  //   url: "http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml",
  //   map: map
  // });

  var kmlLayer = new google.maps.KmlLayer({
    url:
      "https://gist.githubusercontent.com/mfidino/6d5b9197351e27dfe102de6405d4b354/raw/0f22d2ccbe9a91106620cc3b58c06ffe2d3e1749/neighborhood.kml",
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });
  kmlLayer.addListener("click", function(event) {
    var content = event.featureData.infoWindowHtml;
    var testimonial = document.getElementById("capture");
    testimonial.innerHTML = content;
  });
};
