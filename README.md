# 健康跟踪应用
## 说明
用户可以搜索自己喜爱的食物，应用会推荐与之匹配的食物，并给出食物总量的卡路里。
## 依赖
* Backbone.js
* [Nutritionix API](https://developer.nutritionix.com/docs/v1_1)
## 功能需求
1. 搜索框，搜索`Nutritionix API`；
2. 列表，  显示搜索结果；
3. 点击,列表item，添加item到持久存储；
4. 列表，显示，持久存储数据；
5. 异步加载数据，并恰当处理所有错误（通知用户、不影响UI）；