 //Reading in our GeoJSON files
var us_states = "/us_states";
var us_county = "/us_county";


// Use L.geoJSON to create a geoJSON layer

county1 = "Autauga"
county2 =  "McCulloch"
function rendercounty(county) {
  d3.json(county).then(data =>{
    
    // filter county data to have only county and county2 info
    console.log(data.features)
    county1_data = data.features.filter(d => d.properties.NAME == county1)
    county2_data = data.features.filter(d => d.properties.NAME == county2)
    console.log(county1_data)
    console.log(county2_data)
    
    renderMap(us_states, county1_data, county2_data)

  }); 

};
rendercounty(us_county)


// Grabbing our State GeoJSON data..
function renderMap(state, county1_data, county2_data) {
  d3.json(state).then(data => {

      stateData = data['features'];

      // Use L.geoJSON to create a geoJSON layer
      var stateLayer = L.geoJSON(stateData, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`);
            }
        });
      console.log(county1)
      var county1_Layer = L.geoJSON(county1_data, {
        onEachFeature: function (feature, layer) {
          L.marker(layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`));
            }
        });

      var county2_Layer = L.geoJSON(county2_data, {
        onEachFeature: function (feature, layer) {
          L.marker(layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`));
            }
        });
    
        // Define streetmap, lightmap, and darkmap layers
      var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      });

      var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });

      var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "dark-v10",
        accessToken: API_KEY
      });

    
      // Define a baseMaps object to hold our base layers
      
      var baseMaps2 = {
        "Street Map": streetmap,
        "Light Map": lightmap,
        "Dark Map" : darkmap      
      };

      // Create overlay object to hold our overlay layer
    
      var overlayMaps2 = {
        State: stateLayer,
        County1: county1_Layer,
        County2 : county2_Layer    
      };

      var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 4,
        layers: [lightmap, county1_Layer, county2_Layer]

      });

    
      L.control.layers(baseMaps2, overlayMaps2, {
        collapsed: false
      }).addTo(myMap);

    });
  };


  /*==================================================================
  MOUSE OVER EVENT-TO CLASSIFY
  ====================================================================
  */

/*========================================================================
START OF COUNTY 1 MAP
=========================================================================
*/





/*========================================================================
END OF COUNTY 1 MAP
=========================================================================
*/


