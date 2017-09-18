var app = app || {};

app.AppView = Backbone.View.extend({
  el: $('#myfoods'),

  events: {

  },
  initialize: function() {
    // this.listenTo(app.foodList, 'change', this.render);
    this.listenTo(app.foodList, 'add', this.addOne);
    // this.listenTo(app.foodList, 'remove', this.remove);

    // this.list = $('#suggests-food');
    app.foodList.each(function(food) {
      var view = new app.FoodView({model: food});
      this.$el.append(view.render().el);

    }, this);

    console.log("appView has been initialized.")
  },

  addOne: function(model) {
    var view = new app.FoodView({model: model});
    this.$el.append(view.render().el);
  },
  changed: function() {
      console.log("firebase changed");
  },
  render: function() {
      console.log("render function been called.");
    return this;
  }
});
