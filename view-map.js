var Shareabouts = Shareabouts || {};

(function($, B, S) {

  S.MapView = B.View.extend({
    initialize: function() {
      // Initialize the map.
      var map = L.map('map').setView([41.0130657870063, -97.646484375], 4);
      L.tileLayer('http://{s}.tiles.mapbox.com/v3/examples.map-a1dcgmtr/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
      }).addTo(map);
      
      this.lmap = map;
      this.datasets = this.options.datasets;
      
      this.datasetLayers = {};
      
      this.datasets.on('add', this.onAddDataset, this);
    },
    
    onAddDataset: function(dataset) {
      var view = this.datasetLayers[dataset.cid] = new S.DatasetLayer({
        dataset: dataset, map: this
      });
      view.render().lgroup.addTo(this.lmap);
    }
  });
  
  S.DatasetLayer = B.View.extend({
    initialize: function() {
      _.bindAll(this);
      
      this.dataset = this.options.dataset;
      this.places = this.dataset.places;
      
      this.resetPlaceMarkers();

      this.places.on('add', this.onAddPlace, this);
      this.places.on('reset', this.onResetPlaces, this);
    },
    
    onResetPlaces: function() {
      this.resetPlaceMarkers();
    },
    
    onAddPlace: function(place) {
      this.addPlaceMarker(place);
    },
    
    resetPlaceMarkers: function() {
      if (!this.lgroup)
        this.lgroup = L.layerGroup([]);
        
      this.markers = {};
      this.lgroup.clearLayers();
      this.places.each(this.addPlaceMarker); 
    },
    
    addPlaceMarker: function(place) {
      var location = place.get('location'),
          marker = this.markers[place.cid] = L.marker([location.lat, location.lng]);
      console.log(location.lat, location.lon);
      marker.addTo(this.lgroup);
    },
    
    render: function() {
      return this;
    }
  });

})(jQuery, Backbone, Shareabouts);
