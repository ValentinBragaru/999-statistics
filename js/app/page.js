var myApp = angular.module('AngularChromeEx', []);

myApp.config(function ($routeProvider){
    $routeProvider
    .when('/',{
        controller:'ItemsController',
        templateUrl:chrome.extension.getURL('itemsList.html')
    })
    .when('/view2',{
        controller:'ItemsController',
        templateUrl: chrome.extension.getURL('view2.html')
    }) 
    .when('/iteminfo/:itemid',{
        controller:'ItemInfoController',
        templateUrl: chrome.extension.getURL('itemInfo.html')
    })
    .otherwise({redirectTo:'/'})
});

//itemsFactory
myApp.factory('itemsFactory', function($http) {
 return{
    getItems : function() {
        return $http({
            url: 'http://999.md/backend/search/category?query=&page=1&per_page=100&category_url=transport%2Fcars',
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

myApp.controller("ItemsController", function($scope, $location, $http, itemsFactory) {
    $scope.items = [];
    initItems();
    
    function initItems(){
        itemsFactory.getItems().success(function(data){
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

  $scope.changeView = function(view){
    $location.path(view);
}
});

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



