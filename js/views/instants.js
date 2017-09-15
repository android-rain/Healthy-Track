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
                // // timezone: "Asia/Shanghai",
                // // consumed_at: null,
                // // lat: null,
                // // lng: null,
                // meal_type: 0,
                // use_branded_foods: false
            }),

            success: function(result) {
                console.log(result);
            },
            error: function() {
                console.log("Get info failed");
            }
        });
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