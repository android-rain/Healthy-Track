var app = app || {};

app.FoodView = Backbone.View.extend({

    tagName: 'li',

    foodTpl: _.template($("#nutrition-template").html()),

    events: {
      // 'click': '',
    },


    initialize: function() {
        this.listenTo(this.model, 'remove', this.remove);
        console.log("initialize a FoodView");
    },

    render: function() {
      this.$el.html(this.foodTpl(this.model.attributes));
      return this;
    },

    addFood: function() {
      console.log(this.$el.text());
    }

});
