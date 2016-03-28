var dataset = 'https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/master/Landmark/Public_Art/LANDMARK_PublicArt.geojson';
var myData;
var myRectangle = [];

$(document).ready(function() {
  $.ajax(dataset).done(function(result) {
    var parsed = JSON.parse(result);
    myData = _.chain(parsed).value();
    var layer = L.geoJson(myData, {
    }).addTo(map);
  });
});

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
    rectangle: true,
  }
});

map.addControl(drawControl);

map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  var id = L.stamp(layer);
  var shape = layer.toGeoJSON();
  var drawLayer = [];
  drawLayer.push(layer);

  myRectangle = {
    "type": "FeatureCollection",
    "features": [shape]
  };
  var Within = turf.within(myData, myRectangle);

  function clearSidebar() {
    $('#shapes').empty();
  }
  if(typeof layer !=='undefined') {
    map.removeLayer(layer);
  }

  clearSidebar();

  _.each(Within.features, function(element) {
    var template = '<div  class = "shape" id= "shape-'+element.id+'" data-id = "'+element.id+'"> <p> <b>Title: '+element.properties.Title+' </b><br> '+element.properties.First_Name+' '+element.properties.Last_Name+'</p> </div>';
    $('#shapes').append(template);
    $('[data-id = "'+element.id+'"]').on('click',function() {
      var clickId = $(this).data('id');
      var point =_.filter(Within.features,function(ob) {
        return ob.id === clickId;
      });

      L.geoJson(point, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        }
      }).addTo(map);
    });
  });
});
