angular.module('videogular')
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
.directive('singleStep',function($timeout) {
	return {
		restrict: 'E',
		require:'^videogular',
		templateUrl:'stepButtons.html',
		scope: {
			frameRate : '@'
		},
		link: function (scope,element,attrs,API) {

			//Init

			if(scope.frameRate) {
				var frameDuration = 1 / scope.frameRate;
				API.seekTime(0.01);
			} else {
				throw new Error('frameRate attribute is required on the stepButtons directive');
			}




			// User Event Functions

			scope.previousFrame = function previousFrame () {
				var currentTime = API.currentTime / 1000,
					duration = API.totalTime / 1000;

				if(currentTime != 0.01)
				  API.seekTime(currentTime -= frameDuration);
		        else
		          API.seekTime(API.totalTime / 1000);

		      	cleanCurrentTime();
		      	API.pause();
			}

			scope.nextFrame = function nextFrame () {
				var currentTime = API.currentTime / 1000,
					duration = API.totalTime / 1000;

				if(currentTime != duration - 0.04)
				  API.seekTime(currentTime += frameDuration);
				else
				  API.seekTime(0);

				cleanCurrentTime();
				API.pause();
			}



			//Functions

			function cleanCurrentTime () {
				var currentTime = API.currentTime / 1000;
				var frameNumber = Math.trunc(currentTime / frameDuration);
				var currentTimeClean = frameNumber * frameDuration;
				currentTimeClean = +currentTimeClean.toFixed('6');
				currentTimeClean = parseFloat(currentTimeClean);
				currentTimeClean += 0.01;
				currentTimeClean = +currentTimeClean.toFixed('6');
				currentTimeClean = parseFloat(currentTimeClean);

				API.seekTime(currentTimeClean);
			}


			//Watchers

			scope.$watch(
				function () {
                    return API.currentState;
                },
                function(newState,oldState) {
                	if(newState == 'pause') cleanCurrentTime();
				}
			);

		}
	}
})
