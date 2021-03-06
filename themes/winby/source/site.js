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

var map;

window.initMap = function() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(41.83, -87.71),
    zoom: 10,
    streetViewControl: false,
    mapTypeControl: false,
    mapTypeId: "terrain",
    styles: [
      {
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#4bac42"
          }
        ]
      },
      {
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4bac42"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c2cedc"
          }
        ]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#586671"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.medical",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.medical",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.place_of_worship",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.place_of_worship",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.school",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.school",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.sports_complex",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "poi.sports_complex",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#c4cedb"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "road.local",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#ffffff"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#4da4bb"
          }
        ]
      },
      {
        featureType: "water",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#4da4bb"
          }
        ]
      }
    ]
  });
  google.maps.event.addDomListener(map, "click", function() {
    siteFunctions.clickInNeighborhoodWarning();
  });

  var kmlLayer = new google.maps.KmlLayer({
    url:
      "https://gist.githubusercontent.com/mfidino/6d5b9197351e27dfe102de6405d4b354/raw/a2b31ec4649e9ac0ed46dbe97a238a9ee1115874/neighborhood.kml",
    suppressInfoWindows: true,
    preserveViewport: true,
    map: map
  });

  kmlLayer.addListener("click", function(event) {
    var neighborhoodName = event.featureData.name;
    siteFunctions.selectNeighborhoodJson(neighborhoodName);
  });
};
