angular.module('v2.singlestep',[])
.run(function($templateCache) {
	$templateCache.put(
		'stepButtons.html',
		'<a class="video-control left-control" ng-click="previousFrame()">\
			<span class="glyphicon glyphicon-chevron-left"></span>\
		</a>\
		<a class="video-control right-control" ng-click="nextFrame()">\
			<span class="glyphicon glyphicon-chevron-right"></span>\
		</a>'
	);
})
.directive('sgSingleStep',function() {
	return {
		restrict: 'E',
		require:'^videogular',
		templateUrl:'stepButtons.html',
		scope: {
			sgFrameRate : '=',
			sgTheme : '='
		},
		link: function (scope,element,attrs,API) {

			//Init

			initTheme(scope.sgTheme);

			if(scope.sgFrameRate) {
				var frameDuration = 1 / scope.sgFrameRate;
				API.seekTime(0.01);
			} else {
				throw new Error('frameRate attribute is required on the stepButtons directive');
			}



			// User Event Functions

			scope.previousFrame = function previousFrame () {
				
				cleanCurrentTime();
				
				var currentTime = API.currentTime / 1000,
					duration = API.totalTime / 1000;

				if(currentTime != 0.01){
				  currentTime -= frameDuration;
				  API.seekTime(currentTime -= frameDuration);
				} else {
		          API.seekTime(API.totalTime / 1000);
		        }

		      	API.pause();
			};

			scope.nextFrame = function nextFrame () {
				
				cleanCurrentTime();
				
				var currentTime = API.currentTime / 1000,
					duration = API.totalTime / 1000;

				if(currentTime != duration - 0.04){
				  currentTime += frameDuration;
				  API.seekTime(currentTime += frameDuration);
				} else {
				  API.seekTime(0.01);
				}

				API.pause();
			};


			//Functions

			function initTheme (theme) {
				if(theme) {
					var headElem = angular.element(document).find("head");
					headElem.append("<link rel='stylesheet' href='" + theme + "'>");
				} else {
					throw new Error('A theme attribute is required on the singleStep directive');
				}
			}

			function cleanCurrentTime () {
				var currentTime = API.currentTime / 1000;
				var frameNumber = Math.trunc(currentTime / frameDuration);
				var currentTimeClean = frameNumber * frameDuration;
				console.log("frameNumber : " + currentTimeClean);
				currentTimeClean = +currentTimeClean.toFixed('6');
				currentTimeClean = parseFloat(currentTimeClean);
				currentTimeClean += 0.01;
				currentTimeClean = +currentTimeClean.toFixed('6');
				currentTimeClean = parseFloat(currentTimeClean);

				API.seekTime(currentTimeClean);
				console.log("currentTimeClean : " + currentTimeClean);

			}

		}
	}
});