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
    .when('/catinit',{
        controller:'CatInitController',
        templateUrl: chrome.extension.getURL('pages/catinit.html')
    })
    .when('/catbrowse/:parenturl',{
        controller:'CatBrowseController',
        templateUrl: chrome.extension.getURL('pages/catbrowse.html')
    })
    .otherwise({redirectTo:'/'})
});





