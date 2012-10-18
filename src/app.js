var Shareabouts = Shareabouts || {};

(function(S) {

  S.App = function() {
    this.datasets = new S.Datasets();
    
    this.mapView = new S.MapView({datasets: this.datasets});
    this.datasetListView = new S.DatasetList({
      collection: this.datasets,
      el: '#dataset-list-wrapper',
      app: this
    });
  };
  
  S.App.prototype = {
    addDataset: function(url) {
      return this.datasets.addByUrl(url);
    }
  };

})(Shareabouts);
