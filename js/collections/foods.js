var app = app || {};

var FoodList = Backbone.Firebase.Collection.extend({

    model: app.Food,

    // 使用Firebase，存储和同步数据
    url: 'https://todo-3c7f8.firebaseio.com/todos',


});

app.Foods = new FoodList();

// a test
app.Foods.on('sync', function(collection) {
    console.log("collection is loaded ", collection);
});
