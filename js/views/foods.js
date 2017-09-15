var app = app || {};

app.FoodView = Backbone.View.extend({

    tagName: 'li',

    // foodTpl: _.template(),

    events: {
      'click': 'addFood',
    },


    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
    },

    render: function() {
      this.$el.html('<p>' + this.model.get('name')+'</p>');
      return this;
    },

    addFood: function() {
      console.log(this.$el.text());
    }

});
