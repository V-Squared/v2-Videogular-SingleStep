angular.module('videoDemo')
.controller('videoCtrl',function($scope,$sce) {
   var vm = this;
   
   vm.playerReady = function playerReady (API) {
      vm.API = API;
      console.log(API);
   }
   
   
   
   vm.config = {
       sources: [
            {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
			   {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
		      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
        ]
   }
});