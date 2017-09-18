var app = app || {};

var ENTER_KEY = 13;
var resultSearch;
$(function() {
    console.log("App beginning");

    // test firebase
    app.foodList = new app.FoodList();
    // attrs = {
    //   name: 'apple', calories: 400
    //   // new app.Food({name: 'milk', calories: 500}),
    //   // new app.Food({name: 'banana', calories: 700}),
    //   // new app.Food({name: 'bread', calories: 800}),
    // };
    // app.foodList.reset();
    // app.foodList.fetch();
    // app.foodList.create(attrs, {wait: false});   //成功保存数据到firebase
    // app.foodList.on('sync', function(collection) {
    // console.log("collection is loaded ", collection.toJSON());
    // });
    // test end




    new app.AppView();
    new app.InstantsView();

    var search = $('#box');
    var submit = $('#submit');



    submit.on('click', function() {
        var content = search.val();
        $.ajax({
            url: 'https://trackapi.nutritionix.com/v2/search/instant',
            // url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
            contentType: "application/json",
            dataType: "json",
            method: "get",
            headers: {
                "x-app-id": '7421141e',
                "x-app-key": 'cf1dd8c3e54e823aa843479c32b1f9dc',
                "x-remote-user-id": "0"
            },
            data: {
                query: content,
                  branded: false,
                  common: true,
                  self: false
            },

            success: function(result) {
                var r = result.common;
                r.forEach(function(e) {
                    if(e.photo.thumb) {
                        app.Instants.add({
                            name: e.food_name,
                            image: e.photo.thumb
                        });
                    }
                });
            },
            error: function() {
                alert("获取食物名称失败。");
            }
        });
    });
});