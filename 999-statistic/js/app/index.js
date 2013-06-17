var myApp = angular.module('AngularChromeEx', []);

myApp.config(function ($routeProvider){
    $routeProvider
    .when('/',{
        controller:'HomeController',
        templateUrl:chrome.extension.getURL('pages/home.html')
    })
    .when('/itemslist/:categoryurl',{
        controller:'ItemsController',
        templateUrl: chrome.extension.getURL('pages/itemsList.html')
    }) 
    .when('/iteminfo/:itemid',{
        controller:'ItemInfoController',
        templateUrl: chrome.extension.getURL('pages/itemInfo.html')
    })
    .otherwise({redirectTo:'/'})
});

//itemsFactory
myApp.factory('itemsFactory', function($http) {
 return{
    getItems : function(categoryUrl) {
        return $http({
            url: 'http://999.md/backend/search/category?query=&page=1&per_page=100&category_url='+categoryUrl,
            method: 'GET'
        })
    },
    getItemInfo : function(itemId) {
        return $http({
            url: 'http://999.md/backend/view/ad?id='+itemId,
            method: 'GET'
        })
    }
}
});
// itemInfoFactory
myApp.factory('itemInfoFactory', function($http) {
 return{
    getItemInfo : function(itemId) {
        return $http({
            url: 'http://999.md/backend/view/ad?id='+itemId,
            method: 'GET'
        })
    }
}
});
//HomeController
myApp.controller("HomeController", function($scope, $location, $http) {
    $scope.categoryurl="transport%2Fcars";

    $scope.goToItemList = function(){
        $location.path('/itemslist/'+$scope.categoryurl);
    }
});
//ItemsController
myApp.controller("ItemsController", function($scope,$routeParams, $location, $http, itemsFactory) {
    var categoryUrl = ($routeParams.categoryurl || "transport%2Fcars");
    $scope.items = [];
    initItems();
    
    function initItems(){
        itemsFactory.getItems(categoryUrl).success(function(data){
            updateItemsInfo(data);
        });
    }    
    function updateItemsInfo(items){
        $scope.items=items;
        var i=0;
        //addItem(i);
    }

    function addItem(i){
      itemsFactory.getItemInfo($scope.items.result.ads[i].id).success(function(data){
        $scope.items.result.ads[i++].info=data.result;
        if(i<$scope.items.result.ads.length){
            addItem(i);
        }
    });
  }

});
//ItemInfoController
myApp.controller("ItemInfoController", function($scope,$routeParams,$location, $http, itemInfoFactory) {
    var itemId = ($routeParams.itemid || "");
    $scope.itemInfo = [];
    init();
    function init(){
        console.log(itemId);
        itemInfoFactory.getItemInfo(itemId).success(function(data){
            $scope.itemInfo=data;
        });
    }    
});



