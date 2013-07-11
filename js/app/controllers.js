//HomeController
myApp.controller("HomeController", function($scope,$routeParams, $location, $http) {
    $scope.categoryurl="transport";

    $scope.goToItemList = function(){
        $location.path('/itemslist/'+$scope.categoryurl);
    } 

    $scope.goToCatInit = function(){
        $location.path('/catinit');
    }
});
//ItemsController
myApp.controller("ItemsController", function($scope,$routeParams, $location, $http, itemsFactory) {
    var categoryUrl = ($routeParams.categoryurl || "transport");
    categoryUrl=categoryUrl.replace(/%2F/gi, "%2F");
    $scope.categoryUrl=categoryUrl;
    $scope.currentPage = 1;
    $scope.predicate = 'info.views';
    $scope.reverse = true;
    $scope.items = [];
    initItems();
    
    function initItems(){
        itemsFactory.getItems(categoryUrl,$scope.currentPage).success(function(data){
            updateItemsInfo(data);
        });
    }    
    function updateItemsInfo(items){
        $scope.items=items;
        var i=0;
        addItem(i);
    }

    function addItem(i){
      itemsFactory.getItemInfo($scope.items.result.ads[i].id)
      .success(function(data){
        $scope.items.result.ads[i++].info=data.result;
        if(i<$scope.items.result.ads.length){
            addItem(i);
        }
    })
      .error(function(data) {
          i++;
      });
  }

  $scope.numberOfPages=function(){
    return 5;                
}
$scope.previousPage = function(){
    $scope.currentPage-=1;
    initItems();
}
$scope.nextPage = function(){
    $scope.currentPage+=1;
    initItems();
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

//ConfigController
myApp.controller("CatInitController", function($scope,$routeParams,$location, $http, catInitFactory) {
    $scope.catconfig = [];
    init();
    function init(){
        catInitFactory.getConfig('categories.json').success(function(data){
            $scope.catconfig=data;
        });
    }    
});

//ConfigController
myApp.controller("CatBrowseController", function($scope,$routeParams,$location, $http, catBrowseFactory) {
    var parentUrl = ($routeParams.parenturl || "transport");
    $scope.categories = [];
    $scope.counters = [];
    init();
    function init(){
        catBrowseFactory.getChildren(parentUrl).success(function(data){
            $scope.categories=JSON.parse(JSON.stringify(data).replace(/\//g, '%252F').replace(/%2F/gi, '%252F'));
            catBrowseFactory.getCounters(parentUrl).success(function(data){
                $scope.counters=data;
            });
        });

    }    
           // function encodeSlash(uri) { return uri.replace(/\//g, '%252F').replace(/%2F/gi, '%252F'); } 
            //function decodeSlash(uri) { return uri.replace(/%2F/gi, "/"); }
        });
