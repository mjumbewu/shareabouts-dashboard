var Shareabouts = Shareabouts || {};

(function($, B, S) {

  S.MapView = B.View.extend({
    initialize: function() {
      // Initialize the map.
      var map = L.map('map').setView([41.0130657870063, -97.646484375], 4);
      L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-a1dcgmtr/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
      }).addTo(map);
      
      this.map = map;
    }
  });

})(jQuery, Backbone, Shareabouts);
