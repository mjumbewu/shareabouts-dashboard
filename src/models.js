var Shareabouts = Shareabouts || {};

(function(B, S) {

  // Make all Backbone ajax calls use json-p.
  var origSync = B.sync;
  B.sync = function(method, model, options) {
    options || (options = {});
    options.data = options.data || {};
    options.data.format = 'json-p';
    options.dataType = 'jsonp';
    
    return origSync(method, model, options);
  };


  // Dataset model
  S.Dataset = B.Model.extend({
    initialize: function() {
      this.places = new S.Places();
      this.places.dataset = this;
      
      this.on('change:places', this.onChangePlacesAttr, this);
    },
    
    onChangePlacesAttr: function(dataset, placesData) {
      this.setPlaces(placesData);
    },
    
    setPlaces: function(placesData) {
      this.places.url = function() { return placesData.url; };
    }
  });
  S.Datasets = B.Collection.extend({
    addByUrl: function(url) {
      var dataset = new S.Dataset();
      
      dataset.url = function() { return url; }
      dataset.fetch({
        success: _.bind(function() {
          this.add(dataset);
          dataset.places.fetch();
        }, this)
      });
      
      return dataset;
    }
  });
  
  
  // Place model
  S.Place = B.Model.extend({});
  S.Places = B.Collection.extend({});

})(Backbone, Shareabouts);
