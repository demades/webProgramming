var url = "https://disease.sh/v3/covid-19/countries";

var style = new ol.style.Style({
  fill: new ol.style.Fill({
    color: "rgba(255, 255, 255, 0.6)"
  }),
  stroke: new ol.style.Stroke({
    color: "#319FD3",
    width: 1
  }),
  text: new ol.style.Text({
    font: "12px Calibri,sans-serif",
    fill: new ol.style.Fill({
      color: "#000"
    }),
    stroke: new ol.style.Stroke({
      color: "#fff",
      width: 3
    })
  })
});

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: "data/geojson/countries.geojson",
    format: new ol.format.GeoJSON()
  }),
  style: function (feature) {
    style.getText().setText(feature.get("name"));
    return style;
  }
});

var openstreetMapStandard = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: true,
  title: 'OSMStandard'
});

var map = new ol.Map({
layers: [vectorLayer, openstreetMapStandard],
target: "map",
view: new ol.View({
  center: [0, 0],
  zoom: 2
})
});


var highlightStyle = new ol.style.Style({
  stroke: new ol.style.Stroke({
    color: "#f00",
    width: 1
  }),
  fill: new ol.style.Fill({
    color: "rgba(255,0,0,0.1)"
  }),
  text: new ol.style.Text({
    font: "12px Calibri,sans-serif",
    fill: new ol.style.Fill({
      color: "#000"
    }),
    stroke: new ol.style.Stroke({
      color: "#f00",
      width: 3
    })
  })
});

var featureOverlay = new ol.layer.Vector({
  source: new ol.source.Vector(),
  map: map,
  style: function (feature) {
    highlightStyle.getText().setText(feature.get("name"));
    return highlightStyle;
  }
});

var highlight;
var displayFeatureInfo = function (pixel) {
  var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });

  var info = document.getElementById("info");
  if (feature) {
    fetch(url)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (data) {
        for (let prop in data) {
          if (data[prop].country === feature.get("name")) {
            window.alert("For the country: " + data[prop].country + '\n' +
            "deaths : " + data[prop].deaths + '\n' +
            "cases: " + data[prop].cases + '\n' +
            "recovered: " + data[prop].recovered);

            ;
            info.innerHTML = data[prop].country + " " + data[prop].deaths + " " +
            "deaths : " + data[prop].deaths + " " +
            "cases: " + data[prop].cases + " " + 
            "recovered: " + data[prop].recovered;

          }
        }
      });
  } else {
    info.innerHTML = "&nbsp;";
  }

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};

// map.on("pointermove", function (evt) {
//   if (evt.dragging) {
//     return;
//   }
//   var pixel = map.getEventPixel(evt.originalEvent);
//   displayFeatureInfo(pixel);
// });

map.on("click", function (evt) {
  displayFeatureInfo(evt.pixel);
});