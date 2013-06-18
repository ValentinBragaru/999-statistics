
//itemsFactory
myApp.factory('itemsFactory', function($http) {
 return{
    getItems : function(categoryUrl) {
        return $http({
            url: 'http://999.md/backend/search/category?page=1&per_page=100&category_url='+categoryUrl,
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

// configFactory
myApp.factory('catInitFactory', function($http) {
 return{
    getConfig : function(confName) {
        return $http({
            url: chrome.extension.getURL('conf/'+confName),
            method: 'GET'
        })
    }
}
});

// configFactory
myApp.factory('catBrowseFactory', function($http) {
 return{
    getChildren : function(parentUrl) {
        return $http({
            url: 'http://999.md/backend/categories/children?category_url='+parentUrl,
            method: 'GET'
        })
    }
}
});