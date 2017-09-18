var app = app || {};

app.InstantView = Backbone.View.extend({
    tagName: 'li',

    template: _.template($("#instant-template").html()),

    events: {
        'click': 'getNutrition',
    },
    initialize: function() {
        _.bindAll(this, 'render'); //还是没明白什么意思
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(app.Instants, 'reset', this.remove);

    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        // this.$el.html( this.template( this.model.toJSON()));
        return this;
    },

    clear: function() {
        app.Instants.reset();
    },

    getNutrition: function() {
        var self = this;
        var content = this.model.get("name");  // get的参数需要用引号括起来
        $.ajax({
            url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
            contentType: "application/json",
            dataType: "json",
            method: "POST",
            headers: {
                "x-app-id": '7421141e',
                "x-app-key": 'cf1dd8c3e54e823aa843479c32b1f9dc',
                "x-remote-user-id": "0"
            },
            data: JSON.stringify({
                query: content,
                // num_servings: 1,
                // aggregate: "string",
                // line_delimited: false,
                // use_raw_foods: false,
                // include_subrecipe: false,
                timezone: "Asia/Shanghai",
                // // consumed_at: null,
                // // lat: null,
                // // lng: null,
                // meal_type: 0,
                // use_branded_foods: false
            }),

            success: function(result) {
                self.parseJSON(result);
                self.clear();
            },
            error: function() {
                alert("获取食物营养成分失败");
            }
        });
    },

    parseJSON: function(result) {
        var data = result.foods[0];
        var nutrionFacts = {};

        nutrionFacts.foodName = data.food_name;
        nutrionFacts.qty = data.serving_qty;
        nutrionFacts.unit = data.serving_unit;
        nutrionFacts.weight = data.serving_weight_grams;
        nutrionFacts.calories = data.nf_calories;
        nutrionFacts.fat = data.nf_total_fat;
        nutrionFacts.saturated = data.nf_saturated_fat;
        nutrionFacts.polyunsaturated = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 646;
        }).value;
        nutrionFacts.monounsaturated = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 645;
        }).value;
        nutrionFacts.cholesterol = data.nf_cholesterol;
        nutrionFacts.sodium = data.nf_sodium;
        nutrionFacts.potassium = data.nf_potassium;
        nutrionFacts.carbohydrates = data.nf_total_carbohydrate;
        nutrionFacts.fiber = data.nf_dietary_fiber;
        nutrionFacts.sugar = data.nf_sugars;
        nutrionFacts.protein = data.nf_protein;
        nutrionFacts.VA = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 318;
        }).value;
        nutrionFacts.VC = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 401;
        }).value;
        nutrionFacts.calcium = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 301;
        }).value;
        nutrionFacts.iron = data.full_nutrients.find(function(nutrients){
            return nutrients.attr_id === 303;
        }).value;

        // 创建一个model，存放在collection中，并同步到firebase
        app.foodList.create(nutrionFacts);
    }
});

app.InstantsView = Backbone.View.extend({
    el: $("#suggests-food"),

    events: {

    },

    initialize: function() {
        this.listenTo(app.Instants, 'add', this.addOne);
    },

    render: function() {
        _.bindAll(this, 'render', 'appendItem');


    },

    addOne: function(instant) {
        var view = new app.InstantView({
            model: instant
        });
        this.$el.append(view.render().el);
    }
});