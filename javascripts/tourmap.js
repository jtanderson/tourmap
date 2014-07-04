(function () {
  var defaultOptions = {

  };

  TourMap = function (map, options) {
    this.setOptions(options);
    this.map = map;
    this.stops = [];
  };

  TourMap.prototype.addStops = function (stops) {
    for ( var i=0; i < stops.length; i++ ){
      this.addStop(stops[i]);
    }
  }

  TourMap.prototype.addStop = function (stopObj) {
    if ( 'geocode' in stopObj && stopObj.geocode ){
      addGeocodedMarker.call(this, stopObj);
      return;
    }
    var location = new google.maps.LatLng(stopObj.lat, stopObj.lng);
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: 'title' in stopObj ? stopObj.title : ''
    });
    marker.date = stopObj.date;
    marker.order = stopObj.order;
    this.stops.push(marker);
    this.setCenter();
    this.fitBounds();
    this.drawTour();
  }

  TourMap.prototype.fitBounds = function() {
    var bounds = new google.maps.LatLngBounds();
    for ( var i=0; i<this.stops.length; i++ ){
      bounds = bounds.extend(this.stops[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }

  TourMap.prototype.setCenter = function() {
    var latAvg = 0;
    var lngAvg = 0;
    for ( var i=0; i<this.stops.length; i++ ) {
      latAvg += this.stops[i].getPosition().lat();
      lngAvg += this.stops[i].getPosition().lng();
    }
    latAvg = latAvg/parseFloat(this.stops.length);
    lngAvg = lngAvg/parseFloat(this.stops.length);
    this.map.setCenter(new google.maps.LatLng(latAvg, lngAvg));
  }

  TourMap.prototype.setMap = function (map) {
    this.map = map;
  }

  TourMap.prototype.setOptions = function(options) {
    for ( i in defaultOptions ){
      this[i] = i in options ? options[i] : defaultOptions[i];
    }
  };

  TourMap.prototype.drawTour = function() {
    var stops = this.stops.sort(stopSort);
    var coords = [];
    for ( i=0; i < stops.length; i++ ){
      coords.push(stops[i].getPosition());
    }
    var path = new google.maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2
    });
    path.setMap(this.map);
  }

  var stopSort = function(a, b){
    return a - b;
  }

  var addGeocodedMarker = function (stopObj) {
    var tour = this;
    var geocoder =  new google.maps.Geocoder();
    geocoder.geocode( { 'address': stopObj.address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        delete stopObj.geocode;
        stopObj.lat = results[0].geometry.location.lat();
        stopObj.lng = results[0].geometry.location.lng();
        tour.addStop(stopObj);
      } else {
        alert("Something got wrong " + status);
      }
    });
  }
}());
