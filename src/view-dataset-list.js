var Shareabouts = Shareabouts || {};

(function($, B, S) {

  S.DatasetList = B.View.extend({
    initialize: function() {
      this.itemViews = {};
      this.collection.on('add', this.onAddDataset, this);
    },
    
    events: {
      'submit #new-dataset-form': 'onClickAddDataset'
    },
    
    onClickAddDataset: function(evt) {
      evt.preventDefault();
      
      var $url = $('#new-dataset-form input[name="url"]');
      this.options.app.addDataset($url.val());
      
      // Clear the value and return to the box.
      $url.val('').focus();
    },
    
    onAddDataset: function(dataset) {
      var view = this.addDatasetListItem(dataset);
      this.$('ul').append(view.render().$el);
    },
    
    addDatasetListItem: function(dataset) {
      var listItemView = new S.DatasetListItem({model: dataset});
      this.itemViews[dataset.cid] = listItemView;
      return listItemView;
    },
    
    render: function() {
      return this;
    }
  });
  
  S.DatasetListItem = B.View.extend({
    tagName: 'li',
    
    render: function() {
      var dataset = this.model;
      this.$el.html(dataset.get('display_name') + ' (' + dataset.get('places').length + ' places)');
      return this;
    }
  });

})(jQuery, Backbone, Shareabouts);
