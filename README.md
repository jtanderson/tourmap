# TourMap

TL;DR: Ever see a band's tour given by a giant list of places and dates? The purpose of TourMap is to provide a simple wrapper for a web developer or site manager to interface with the [Google Maps API](http://https://developers.google.com/maps/documentation/javascript/). The objective is to allow the user to specify only the map's container, the locations to be listed, the order in which they will be visited, and the option to customize the map experience with at least some of the common display options for Google Maps.

## The Details

Enough talk! Let's see some code (in action [here](http://jtanderson.github.com/tourmap)):

```javascript
var options = {
  center: new google.maps.LatLng(-34.397, 150.644),
  zoom: 8,
  strokeColor: '#0000FF'
};
var stops = [
  {
    lat: -25.363882,
    lng: 131.044922,
    title: "My Marker",
    date: '07/14/2014',
    order: 1
  },
  {
    lat: -34.397,
    lng: 150.644,
    date: '07/15/2014',
    order: 2
  },
  {
    address: 'Falkirk Folk Club, Falkirk Scotland',
    geocode: true,
    date: '07/17/2014',
    order: 3
  }
];
tour = new TourMap('map-canvas', options);
tour.addStops(stops);
```

In the above example, a number of the key principles are demonstrated:

1. Creating the map is as simple as providing the DOM container `id` and [optionally] some options for the map.
2. The points on the map can be given in a batch object (or individually, check the `addStop` method in the source)
3. When creating the list of 'stops' on the map, one provides an `order` attribute so the map knows the path of travel to render, this way you don't have to fuss with copy/paste whole object blocks when the order changes. If no order is provided, they are ordered as they come.
4. Instead of providing latitude and longitude, the location of each map marker can be asynchronously geocoded by the Google Maps API from a plaintext address. To do so, specify the `geocode` attribute of a location with a value of `true` along with an `address` text field containing the search text to use for geocoding. Since this happens asynchronously (as per the Google Maps API), it is highly recommended that you first [find the coordinates yourself](https://support.google.com/maps/answer/18539?hl=en).

## Furthermore

This is totally a WIP and, since my primary occupation has not been
coding in a long time, will not be as graceful or up-to-date with
current practice as [your hip project here].
I don't even expect many people to find this useful, but I suspect that
if a curious enough developer finds this and is managing a site for any
group that "tours", then they can make some use of it.

In any case, I'm sure you can make it better, so fork away!

Check out the demo [here](http://jtanderson.github.io/tourmap). Add issues, break things, pull some requests, and have a jolly time.

## License

This software is provided under the GNU GPL v2.0 License.
