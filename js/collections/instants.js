var app = app || {};

app.InstantList = Backbone.Collection.extend({
    model: app.Instant,


});

app.Instants = new app.InstantList();