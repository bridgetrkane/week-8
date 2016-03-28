/* =====================
Lab 1: Turf.js

"Our maps have only interpreted data in various ways; the point is to change it."


In the coming weeks, we'll be looking at ways to explore, analyze, and create data.
This will require us to build upon concepts that we've already mastered. Turf.js is a
javascript library which provides some excellent utilities for fast, in-browser
spatial analysis.

Recall that GeoJSON is a format for representing spatial objects in JSON. It encodes
not only the geometric entities themselves (Points, Lines, Polygons) but also associated
properties (these are the properties of Features) and collections thereof (FeatureGroups).

This is useful for sending spatial data over the wire (we can present these objects in text
since they are JSON). But the predictable structure of a geojson object (there are
infinitely many possible geojson objects, though they all meet the criteria specified
here: http://geojson.org/) also benefits us by offering a structure which our code can
expect.

Consider the functions you've written before: their input has depended on the type
of data they receive. If you write a function which expects an object that has an 'x' and
a 'y' property, you can access those within your function body:

function exampleFunction(someObject) {
  return someObject.x + someObject.y;
}
exampleFunction({x: 1, y: 22}) === 23

Turf leans on the predictable structure of geojson to provide its analytic functions.
Here, Turf lays out the types you can expect to find throughout its documentation:
http://turfjs.org/static/docs/global.html

Let's look to a turf function's docs: http://turfjs.org/static/docs/module-turf_average.html
==================================================================================================
name              - Type                        - Description
==================================================================================================
polygons          - FeatureCollection.<Polygon> - polygons with values on which to average
points            - FeatureCollection.<Point>   - points from which to calculate they average
field             - String                      - the field in the points features from which to
                                                  pull values to average
outputField       - String                      - the field in polygons to put results of the averages
==================================================================================================
Returns           - FeatureCollection.<Polygon> - polygons with the value of outField set to
                                                  the calculated averages
==================================================================================================

What this tells us is that turf.average takes four arguments. The first
argument is a FeatureCollection of Polygons, the second, is a FeatureCollection
of Points, the third and fourth is a bit of text.

With those inputs, a FeatureCollection of polygons is produced which has the average value
of "field" from the points (captured within a spatial join) stored on its properties' field
"outputField".

All of the functionality within turf can be similarly understood by looking to its documentation.
Turf documentation: http://turfjs.org/static/docs/
Turf examples: http://turfjs.org/examples.html


Each exercise in this lab involves the creation of GeoJSON (feel free to use geojson.io) and
the use of that GeoJSON in some turf functions.

NOTE: you can use geojson.io's table view to attach properties to your geometries!

Exercise 1: Finding the nearest point
Take a look at http://turfjs.org/static/docs/module-turf_nearest.html
Produce a Feature and a FeatureCollection (look to the in-documentation examples if this is
unclear) such that the single Point Feature is in Philadelphia and the nearest point in the
FeatureCollection (there should be at least two other points in this collection) happens
to be in New York City. Plot the NYC point and no others with the use of turf.nearest.

Exercise 2: Finding the average point value (a form of spatial join)
Docs here: http://turfjs.org/static/docs/module-turf_average.html
Produce one FeatureCollection of points (at least 5) and one of polygons (at least 2)
such that, by applying turf.average, you generate a new set of polygons in which one of
the polygons has the property "averageValue" with a value of 100.


Exercise 3: Tagging points according to their locations
http://turfjs.org/static/docs/module-turf_tag.html
It can be quite useful to 'tag' points in terms of their being within this or that
polygon. You might, for instance, want to color markers which represent dumpsters
according to the day that trash is picked up in that area. Create three polygons
and use properties on those polygons to color 5 points.


*STRETCH GOAL*
Exercise 4: Calculating a destination
A species of bird we're studying is said to travel in a straight line for 500km
during a migration before needing to rest. One bird in a flock we want to track
has a GPS tag which seems to be on the fritz. We know for a fact that it started
flying from [-87.4072265625, 38.376115424036016] and that its last known coordinate
was [-87.5830078125, 38.23818011979866]. Given this information, see if you can
determine where we can expect this flock of birds to rest.
===================== */

var markers = [];

//EXERCISE 1

var point =
    {
        "type": "Feature",
        "properties": {
        "marker-color": "#008080"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [
            -75.1688003540039,
            39.94975340768179
          ]
        }
  };

var against =
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.9712905883789,
          40.772221877329024
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -73.97403717041016,
          40.755319574776024
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -74.00012969970703,
          40.74907763805906
        ]
      }
    }
  ]
};

var nearest = turf.nearest(point, against);
nearest.properties['marker-color'] = '#008080';

var resultFeatures = against.features.concat(point);
var result = {
  "type": "FeatureCollection",
  "features": resultFeatures
};

L.geoJson(nearest).addTo(map);

console.log(nearest);

//EXERCISE 2

var points=

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
      "population": 125
    },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.16571044921875,
          39.93553945960995
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
      "population": 100
    },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.17257690429688,
          39.96185925653245
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
      "population": 80
    },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.14305114746094,
          39.95922773254976
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
      "population": 110
    },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.14923095703125,
          39.942910023503146
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
      "population": 80
    },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.18836975097656,
          39.95501708352986
        ]
      }
    }
  ]
};

var polygons =

{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.1904296875,
              39.95554342883535
            ],
            [
              -75.1904296875,
              39.970805680527725
            ],
            [
              -75.14785766601562,
              39.970805680527725
            ],
            [
              -75.14785766601562,
              39.95554342883535
            ],
            [
              -75.1904296875,
              39.95554342883535
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.14923095703125,
              39.94975340768179
            ],
            [
              -75.14923095703125,
              39.979750933720716
            ],
            [
              -75.11833190917969,
              39.979750933720716
            ],
            [
              -75.11833190917969,
              39.94975340768179
            ],
            [
              -75.14923095703125,
              39.94975340768179
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.18218994140625,
              39.93764541601623
            ],
            [
              -75.18218994140625,
              39.94975340768179
            ],
            [
              -75.13618469238281,
              39.94975340768179
            ],
            [
              -75.13618469238281,
              39.93764541601623
            ],
            [
              -75.18218994140625,
              39.93764541601623
            ]
          ]
        ]
      }
    }
  ]
};

var averaged = turf.average(
  polygons, points, 'population', 'pop_avg');

  var resultFeatures = points.features.concat(
    averaged.features);

    var result = {
      "type": "FeatureCollection",
      "features": resultFeatures
    };

    var eachFeature = function(feature, layer) {
      layer.bindPopup("Population average: " + feature.properties.pop_avg);
    };

    console.log(averaged);

    var average = L.geoJson(averaged, {
      onEachFeature: eachFeature,
    }).addTo(map);

// EXERCISE 3

var polygons = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        'fill': '#008080'
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.1791000366211,
              39.94448932676472
            ],
            [
              -75.1791000366211,
              39.95896457458144
            ],
            [
              -75.157470703125,
              39.95896457458144
            ],
            [
              -75.157470703125,
              39.94448932676472
            ],
            [
              -75.1791000366211,
              39.94448932676472
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'fill': '#FFA500'
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.16468048095703,
              39.92290236029078
            ],
            [
              -75.16468048095703,
              39.942910023503146
            ],
            [
              -75.14167785644531,
              39.942910023503146
            ],
            [
              -75.14167785644531,
              39.92290236029078
            ],
            [
              -75.16468048095703,
              39.92290236029078
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        'fill': '#F46B92'
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -75.16124725341797,
              39.96080665909224
            ],
            [
              -75.16124725341797,
              39.977120098439634
            ],
            [
              -75.13309478759766,
              39.977120098439634
            ],
            [
              -75.13309478759766,
              39.96080665909224
            ],
            [
              -75.16124725341797,
              39.96080665909224
            ]
          ]
        ]
      }
    }
  ]
};

var points=  {
      "type": "FeatureCollection",
      "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.14287948608398,
          39.97356831014807
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.1548957824707,
          39.93369669459385
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.1626205444336,
          39.95685927437669
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.17566680908203,
          39.946068593571304
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [
          -75.15026092529297,
          39.92421883365043
        ]
      }
    }
  ]
};

var tagged = turf.tag(points, polygons,
  'fill', 'color');

  var style = function(feature) {
    return {fillColor: '#fff'};
  };
  var result = L.geoJson(polygons, {
    style: style,
  }).addTo(map);

  var myStyle = function(feature) {
    return {fillColor: feature.properties.color};
  };

  layer = L.geoJson(tagged, {
    style: myStyle,
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    }
  }).addTo(map);
