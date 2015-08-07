// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('ExampleController', function($scope, $cordovaFileTransfer) {
      $scope.data = 'none';
      $scope.fileUpload = function() {
        console.log('upload function is called');
        var file = document.getElementById('file').files[0]; 
        var filePath =  cordova.file.externalRootDirectory + file.name;
        console.log(filePath);
        console.log(file);
        var fileData = new FileReader();
        fileData.onloadend = function(e){
          $scope.data = e.target.result;
        } 
        fileData.readAsBinaryString(file);

        var options = {
           fileKey: "avatar",
           fileName: file.name,
           chunkedMode: false,
           mimeType: file.type
        }

        $cordovaFileTransfer.upload("http://192.168.56.1:1337/file/upload", $scope.data, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        });

        

      }
});