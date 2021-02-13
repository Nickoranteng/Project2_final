
// ****************************************
// **** Build Housing Pricing Function ****
// ****************************************
function Initialize(){

    var county1_SEL = "Autauga, AL";
    var county2_SEL = "Baldwin, AL";
                
    housingPricing(county1_SEL, county2_SEL);
    rentalPricing(county1_SEL, county2_SEL);
    mapViz(county1_SEL, county2_SEL);
    housingTable(county1_SEL, county2_SEL);
    console.log(`Initialise is running-VERA`)
  };
  Initialize();

function housingPricing(county1_SEL, county2_SEL) {

    // Access Home Values data from the endpoint
    d3.json("/home_values").then(data => {
        
        // select city1 input values
        // var citySelector1 = d3.select("#city1").property();
        citySelector1 = county1_SEL;
        var string1 = citySelector1.split(", ");
        
        var county_name1 = string1[0]
        var county1 = `${county_name1} County`

        var state1 = string1[1]
    
        // var county_name1 = "Lee";
        // var county1 = `${county_name1} County`; 
        // var state1 = "FL"
        
        // select city2 input value
        // var citySelector2 = d3.select("#city2").property();
        citySelector2 = county2_SEL;
        var string2 = citySelector2.split(", ");
        
        var county_name2 = string2[0]
        var county2 = `${county_name2} County`

        var state2 = string2[1]

        // var county_name2 = "Arlington";
        // var county2 = `${county_name2} County`; 
        // var state2 = "VA" 

        // filter data based on counties and states
        var result1 = data.filter(record => (record.RegionName == county1) & (record.State == state1))
        var result2 = data.filter(record => (record.RegionName == county2) & (record.State == state2))
        
        // select data for home values and years
        for (let result of result1) {
            var years_county1 = Object.keys(result).slice(5, 305)
            var values_county1 = Object.values(result).slice(5, 305);
        }

        for (let result of result2) {
            var years_county2 = Object.keys(result).slice(5, 305)
            var values_county2 = Object.values(result).slice(5, 305);
        }

        // Plotly - Line Plot
        trace1 = {
            type: 'scatter',
            x: years_county1,
            y: values_county1,
            mode: 'lines',
            name: `${county_name1}, ${state1}`,
            line: {
            color: '#17BECF',
            width: 2
            }
        };
        
        trace2 = {
            type: 'scatter',
            x: years_county2,
            y: values_county2,
            mode: 'lines',
            name: `${county_name2}, ${state2}`,
            line: {
            color: '#7F7F7F',
            width: 2
            }
        };
        
        var layout = {
            // width: 600,
            // height: 400, 
            title: `Housing Pricing - ${county_name1} ${state1} vs. ${county_name2} ${state2}`
            // plot_bgcolor='rgb(235, 237, 239)'
        };

        var data = [trace1, trace2];
        
        Plotly.newPlot('homeValues', data, layout);
    })
};


// ***************************************
// **** Build Rental Pricing Function ****
// ***************************************
function rentalPricing(county1_SEL, county2_SEL) {
    // rental pricing data
    d3.json("/rental_pricing").then(data => {

        // console.log(data)
        // // create variables for two counties
        // var county_name1 = "Lee";
        // var county1 = `${county_name1}`; 
        // var state1 = "FL"
        
        // var county_name2 = "Arlington";
        // var county2 = `${county_name2}`; 
        // var state2 = "VA" 
        
        // select city1 input values
        // var citySelector1 = d3.select("#city1").property();
        citySelector1 = county1_SEL
        var string1 = citySelector1.split(", ");
        
        var county_name1 = string1[0]
        var county1 = `${county_name1}`

        var state1 = string1[1]
        
        // select city2 input value
        // var citySelector2 = d3.select("#city2").property();
        citySelector2 = county2_SEL
        var string2 = citySelector2.split(", ");
        
        var county_name2 = string2[0]
        var county2 = `${county_name2}`

        var state2 = string2[1]


        // filter data based on counties and states
        var result1 = data.filter(record => (record.County == county1) & (record.State == state1))
        var result2 = data.filter(record => (record.County == county2) & (record.State == state2))
        
        // select data for home values and years
        for (let result of result1) {
            var years_county1 = Object.keys(result).slice(2, 90)
            var values_county1 = Object.values(result).slice(2, 90);
        }

        for (let result of result2) {
            var years_county2 = Object.keys(result).slice(2, 90)
            var values_county2 = Object.values(result).slice(2, 90);
        }

        // Plotly - Line Plot
        trace1 = {
            type: 'scatter',
            x: years_county1,
            y: values_county1,
            mode: 'lines',
            name: `${county1}, ${state1}`,
            line: {
            color: '#17BECF',
            width: 2
            }
        };
        
        trace2 = {
            type: 'scatter',
            x: years_county2,
            y: values_county2,
            mode: 'lines',
            name: `${county2}, ${state2}`,
            line: {
            color: '#7F7F7F',
            width: 2
            }
        };
        
        var layout = {
            // width: 600,
            // height: 400, 
            title: `Rental Pricing - ${county1} ${state1} vs. ${county2} ${state2}`,
        };

        var data = [trace1, trace2];
        
        Plotly.newPlot('rentalPricing', data, layout);
    })
};


// ****************************************
// ******* Build Map Viz Function *********
// ****************************************

function mapViz(county1_SEL, county2_SEL) {
    
    var mapTitle = d3.select("#mapTitle").text("Housing Pricing in the US")   
  
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
    });  // .addTo(myMap)

    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
    });

    // only one base layer can be shown at a time
    var baseMaps = {
        'Ligh base map': light,
        'Dark base map': dark
    }

    // ************************
    // ***** Layers Start******
    // ************************

    // Load in geojson data
    // var geoData = "static/data/zillow_with_county1.geojson";
    var geoData = "/geodata";
    var geojson;

    // function choropleth(geoData){
    d3.json(geoData).then(data => {

        console.log(data)
        // *****************************
        // ***** Choropleth Layer ******
       // ******************************

        // Create a new choropleth layer
        geojsonLayer = L.choropleth(data, {

            // Define what  property in the features to use
            valueProperty: "2020-12-31",

            // Set color scale
            scale: ["#ffffb2", "#b10026"],

            // Number of breaks in step range
            steps: 10,

            // q for quartile, e for equidistant, k for k-means
            mode: "q",
            style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
            },

            // Binding a pop-up to each layer
            onEachFeature: function(feature, layer) {
            layer.bindPopup(`<h5>${feature.properties.RegionName}, ${feature.properties.state}</h5>
                                <br><p>Housing Price in 2020: $${feature.properties["2020-12-31"]}</p>`);
            }
        }); // .addTo(myMap)   End of choropleth layer

        // *************************
        // ***** County Layers ******
        // *************************
        
        // var citySelector1 = d3.select("#city1").property();
        citySelector1 = county1_SEL
        var string1 = citySelector1.split(", ");
        
        var county_name1 = string1[0]
        var county1 = `${county_name1} County`

        var state1 = string1[1]
        
        // select city2 input value
        // var citySelector2 = d3.select("#city2").property();
        citySelector2 = county2_SEL
        var string2 = citySelector2.split(", ");
        
        var county_name2 = string2[0]
        var county2 = `${county_name2} County`

        var state2 = string2[1]
    
        // console.log(data.features)  
        var dataFeatures = data.features
        
        var result1 = dataFeatures.filter(d => d.properties.RegionName == county1 & d.properties.state == state1)
        var result2 = dataFeatures.filter(d => d.properties.RegionName == county2 & d.properties.state == state2)
        // var result3 = dataFeatures.filter(d => d.properties["2020-12-31"] > 213000)
        // console.log(result3)
        
        var county1_Layer = L.geoJSON(result1, {
            onEachFeature: function(feature, layer) {
                L.marker(layer.bindPopup(`<h5>${county1}</h5>`))
            }
        })

        var county2_Layer = L.geoJSON(result2, {
            onEachFeature: function(feature, layer) {
                L.marker(layer.bindPopup(`<h5>${county2}</h5>`))
            }
        })

        // *************************************
        // ***** Layers and Control Panel ******
        // *************************************

        // define map layers
        var overlayMaps = {
            "Housing Pricing": geojsonLayer,
            "County 1" : county1_Layer,
            "County 2" : county2_Layer
        };

        // Create base map
        var myMap = L.map("housingMap", {
            center: [37.0902, -95.7129],
            zoom: 4,
            layers: [light, geojsonLayer, county1_Layer, county2_Layer]
            });   

        // Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
      })
    };

    // }

// ****************************************
// ******* Build Map Viz Function *********
// ****************************************
function housingTable(county1_SEL, county2_SEL) {
    // add table title
    // var tableTitle = d3.select("#tableDiv").text("Home Values Comparison");
    // // add table head
    
    
    // var thead = d3.select("#housing-head");
    
    // var tr = thead.append("tr")
    // tr.html("")
    // tr.append("th").text("State");
    // tr.append("th").text("County");
    // tr.append("th").text("2020 Housing Pricing")
    
    // '/sortedValues'
    d3.json("/home_values").then(data => {
        // console.log(data)
        // add table body
        var tbody = d3.select("#housing-tbody");
        tbody.html("")
        
        
    // var citySelector1 = d3.select("#city1").property();
    citySelector1 = county1_SEL
    var string1 = citySelector1.split(", ");
    var county_name1 = string1[0]
    var county1 = `${county_name1} County`
    var state1 = string1[1]
    // select city2 input value
    // var citySelector2 = d3.select("#city2").property();
    citySelector2 = county2_SEL
    var string2 = citySelector2.split(", ");
    var county_name2 = string2[0]
    var county2 = `${county_name2} County`
    var state2 = string2[1]
    // filter data based on counties and states
    var result1 = data.filter(record => (record.RegionName == county1) & (record.State == state1))
    var result2 = data.filter(record => (record.RegionName == county2) & (record.State == state2))
    // select data for home values and years
    for (let result of result1) {
        var years_county1 = Object.keys(result).slice(299)
        var y_county1 = years_county1[0]
        var values_county1 = Object.values(result).slice(299);
        var v_county1 = values_county1[0]
        var row = tbody.append("tr");
        row.append("td").text(result.State)
        row.append("td").text(result.RegionName);
        row.append("td").text(v_county1);
    }
    for (let result of result2) {
        var years_county2 = Object.keys(result).slice(299)
        var y_county2 = years_county2[0]
        var values_county2 = Object.values(result).slice(299);
        var v_county2 = values_county2[0]
        var row = tbody.append("tr");
        row.append("td").text(result.State)
        row.append("td").text(result.RegionName);
        row.append("td").text(v_county2);
    }
     })
};


// ****************************************
// **** Add Event Listener to Dropdown ****
// ****************************************
// var selector = d3.select("#housingPricing")

// selector.on('click', function(event) {
//     housingPricing(event);
//     rentalPricing(event);
//     mapViz(event);
//     housingTable(event);

// })

function processSubmit() {
    console.log('test');
    document.getElementById('ThisMap').innerHTML = '<div class="col-5 map-container" id="map">This is row for city one bar chart </div>';
    input_tokens = document.getElementsByClassName('token-input-token');
  
    county1_SEL = input_tokens[0].innerText.replace('×','').replace('\n','').trim();
    county2_SEL = input_tokens[1].innerText.replace('×','').replace('\n','').trim();
    
    console.log(county1_SEL);
    console.log(county2_SEL);
    //console.log(input_tokens[0]);
   
    housingPricing(county1_SEL, county2_SEL);
    rentalPricing(county1_SEL, county2_SEL);
    mapViz(county1_SEL, county2_SEL);
    housingTable(county1_SEL, county2_SEL);
    
 
  }

  document.getElementById('submit').addEventListener('click', processSubmit);
  
  



