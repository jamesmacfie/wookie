var wookie = angular.module('wookie', ['firebase', 'ui.bootstrap']).
  //Items - firebase
  value('fbItemsURL', 'https://<name>.firebaseio.com/items/').
  factory('Items', function(angularFireCollection, fbItemsURL) {
    return angularFireCollection(fbItemsURL);
  }).
  //Products - firebase
  value('fbProductsURL', 'https://<name>.firebaseio.com/products/').
  factory('Products', function(angularFireCollection, fbProductsURL) {
    return angularFireCollection(fbProductsURL);
  }).
  config(function($routeProvider) {
    $routeProvider.
      //Items
      when('/', {
        title: "Items",
        controller:ListItemsCtrl, 
        templateUrl:'items.html',
        activeTab: 'item'
      }).
      when('/item/edit/:itemId', {
        title: "Edit item",
        controller:EditItemCtrl, 
        templateUrl:'item.html',
        activeTab: 'item'
      }).
      when('/item/new', {
        title: "New item",
        controller:CreateItemCtrl, 
        templateUrl:'item.html',
        activeTab: 'item'
      }).
      //Products
      when('/products', {
        title: "Products",
        controller:ListProductsCtrl, 
        templateUrl:'products.html',
        activeTab: 'product'
      }).
      when('/product/edit/:productId', {
        title: "Edit product",
        controller:EditProductCtrl, 
        templateUrl:'product.html',
        activeTab: 'product'
      }).
      when('/product/new', {
        title: "New product",
        controller:CreateProductCtrl, 
        templateUrl:'product.html',
        activeTab: 'product'
      }).
      otherwise({redirectTo:'/'});
  });
  
wookie.run(['$location', '$rootScope', 'Products', function($location, $rootScope, Products) {
  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.title = current.title;
    $rootScope.activeTab = current.activeTab;
  });
  
  $rootScope.getActiveTab = function(url){
    return $rootScope.activeTab == url;
  }
  
  $rootScope.getImage = function(id){
    if (!id) return {id: 0, name: 'No image selected'};
    var im;

    for (i = 0; i < Images.length; i++) {
      if (Images[i]['id'] == id) {
        im = Images[i];
        break;
      }
    }
    return im;
  }
  
  $rootScope.getProduct = function(id){
    if (!id) return {id: 0, name: 'No product selected'};
    var prod;

    for (i = 0; i < Products.length; i++) {
      if (Products[i].$id == id) {
        prod = Products[i];
        break;
      }
    }
    
    return prod;
  }
}]); 
  
//Items
function ListItemsCtrl($rootScope, $scope, Items) {
  $scope.items = Items;
}

function CreateItemCtrl($scope, $location, $timeout, Items) {
  $scope.item = {};
  $scope.save = function() {
    Items.add($scope.item, function() {
      $timeout(function() { $location.path('/'); });
    });
  }
  $scope.setProduct=function(id){
    $scope.item.product = id;
  }
}

function EditItemCtrl($scope, $location, $routeParams, angularFire, fbItemsURL) {
  angularFire(fbItemsURL + $routeParams.itemId, $scope, 'remote', {}).
  then(function() {
    $scope.item = angular.copy($scope.remote);
    $scope.item.$id = $routeParams.itemId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.item);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.item);
      $location.path('/');
    };
    $scope.setProduct=function(id){
      $scope.item.product = id;
    }  
  });
}

//Products
function ListProductsCtrl($scope, $route, Products) {
  $scope.products = Products;
}

function CreateProductCtrl($scope, $location, $timeout, Products) {
  $scope.product = {};
  $scope.save = function() {
    Products.add($scope.product, function() {
      $timeout(function() { $location.path('/products'); });
    });
  }
  $scope.setImage = function(id){
    $scope.product.image = id;
  }
}

function EditProductCtrl($scope, $location, $routeParams, angularFire, fbProductsURL) {
  angularFire(fbProductsURL + $routeParams.productId, $scope, 'remote', {}).
  then(function() {
    $scope.product = angular.copy($scope.remote);
    $scope.product.$id = $routeParams.productId;
    $scope.isClean = function() {
      return angular.equals($scope.remote, $scope.product);
    }
    $scope.destroy = function() {
      $scope.remote = null;
      $location.path('/');
    };
    $scope.save = function() {
      $scope.remote = angular.copy($scope.product);
      $location.path('/products');
    };
    $scope.setImage=function(id){
      $scope.product.image = id;
    }
  });
}

function dropdownProductCtrl($scope, Products) {
  $scope.products = Products;
}

function dropdownImageCtrl($scope) {
  $scope.images = Images;
}

//Product images
var Images = [
  {
    id: 1,
    name: 'Chicken',
    src: "img/chicken.jpg"
  },
  {
    id: 2,
    name: 'Chicken breast',
    src: "img/chicken-breast.jpg"
  },
  {
    id: 3,
    name: 'Chicken Legs',
    src: "img/chicken-legs.jpg"
  },
  {
    id: 4,
    name: 'Chicken Roast',
    src: "img/chicken-roast.jpg"
  },
  {
    id: 5,
    name: 'Beef',
    src: "img/beef.jpg"
  },
  {
    id: 6,
    name: 'Beef mince',
    src: "img/beef-mince.jpg"
  },
  {
    id: 7,
    name: 'Beef roast',
    src: "img/beef-roast.jpg"
  },
  {
    id: 8,
    name: 'Pies',
    src: "img/pies.jpg"
  },
  {
    id: 9,
    name: 'Brocolli',
    src: "img/brocolli.jpg"
  },
  {
    id: 10,
    name: 'Cauliflower',
    src: "img/cauliflower.jpg"
  },
  {
    id: 11,
    name: 'Corn',
    src: "img/corn.jpg"
  },
  {
    id: 12,
    name: 'Cat',
    src: "img/cat.jpg"
  },
  {
    id: 13,
    name: 'Avocado',
    src: "img/avocado.jpg"
  },
  {
    id: 14,
    name: 'Pear',
    src: "img/pear.jpg"
  },
  {
    id: 15,
    name: 'Apple',
    src: "img/apple.jpg"
  },
  {
    id: 16,
    name: 'Orange',
    src: "img/orange.jpg"
  },
  {
    id: 17,
    name: 'Lemon',
    src: "img/lemon.jpg"
  },
  {
    id: 18,
    name: 'Pork roast',
    src: "img/pork-roast.jpg"
  },
  {
    id: 19,
    name: 'Pork chops',
    src: "img/pork-chops.jpg"
  },
  {
    id: 20,
    name: 'Pork',
    src: "img/pork.jpg"
  },
  {
    id: 21,
    name: 'Beans',
    src: "img/beans.jpg"
  },
  {
    id: 22,
    name: 'Peas',
    src: "img/peas.jpg"
  },
  {
    id: 23,
    name: 'Ice cream',
    src: "img/ice-cream-strawberry.jpg"
  },
  {
    id: 24,
    name: 'Ice',
    src: "img/ice.jpg"
  },
  {
    id: 25,
    name: 'Mixed veges',
    src: "img/mixed-veges.jpg"
  },
  {
    id: 26,
    name: 'Pizza',
    src: "img/pizza.jpg"
  },
  {
    id: 27,
    name: 'Curry',
    src: "img/curry.jpg"
  },
  {
    id: 28,
    name: 'Spagetti',
    src: "img/spaghetti.jpg"
  },
  {
    id: 29,
    name: 'Lasagne',
    src: "img/lasagne.jpg"
  },
  {
    id: 30,
    name: 'Burger patties',
    src: "img/burger-patties.jpg"
  },
  {
    id: 31,
    name: 'Sausages',
    src: "img/sausages.jpg"
  },
  {
    id: 32,
    name: 'Fries',
    src: "img/fries.jpg"
  },
  {
    id: 33,
    name: 'Potato wedges',
    src: "img/potato-wedges.jpg"
  },
  {
    id: 33,
    name: 'Tomato sauce',
    src: "img/tomato-sauce.jpg"
  },
  {
    id: 34,
    name: 'Berries',
    src: "img/berries.jpg"
  },
  {
    id: 35,
    name: 'Hash browns',
    src: "img/hash-browns.jpg"
  },
  {
    id: 36,
    name: 'Bread - naan',
    src: "img/bread-naan.jpg"
  },
  {
    id: 37,
    name: 'Bread',
    src: "img/bread.jpg"
  }
];

function nameCompare(a,b) {
  if (a.name < b.name)
     return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}


