var app = app || {};

app.Food = Backbone.Model.extend({
    defaults: {
        name: 'SomeFood',
        calories: '1000',
    },

    initialize: function() {
        console.log("Model has been initialized");
    }
});


