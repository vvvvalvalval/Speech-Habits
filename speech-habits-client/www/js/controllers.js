"use strict";

var speechHabitsControllers = angular.module('speechHabitsControllers', []);

/*
 * Here's the controller displaying the list of available teachers
 */
speechHabitsControllers.controller('TeachersListController', ['$scope',
function($scope) {

	$scope.message="Coucou!";

	/**
	 *Factory function that returns a newly created teacher with the specified name.
	 *The returned teacher has 'id' and 'name' properties.
	 * @param {String} name
	 */
	var makeNewTeacher = ( function() {

			//private incrementor to generate IDs
			var nextId = 0;

			function makeNewId() {
				var result = nextId;
				nextId += 1;
				return result;
			};

			return function(name) {
				var currentId = makeNewId();

				return {
					'id' : currentId,
					'name' : name
				};
			};
		}());

	/**
	 * The list of available teachers.
	 */
	$scope.teachersList = [
		makeNewTeacher("Philippe Ginier-Gillet"),
		makeNewTeacher("Bruno Martinaud"),
		makeNewTeacher("Chuck Norris")
	];
}]);

/**
 * Here we declare the controller for a single room.
 */
speechHabitsControllers.controller('roomController', ['$scope', '$routeParams',
function($scope, $routeParams) {

	//retrieving the ID of the current teacher from the route parameters
	var currentTeacherId = $routeParams['teacherId'];

	/**
	 * 
	 * @param {int} teacherId : the ID of the teacher whose expressions are to be fetched.
	 */
	function obtainExpressions(teacherId){
		//current implementation is a mock : always returns the same expressions, without heeding the teacher id
		return [
			newExpression("Basically"),
			newExpression("By the way"),
			newExpression("Somewhere, somehow"),
			newExpression("At this point in time"),
			newExpression("Having said that")
		];
	};

	function requestIncrement(exprId, incrementCallback){
		//Mmmmh... I don't know... do I increment you?
		// Ok, I'll increment you
		incrementCallback();
	};

	/**
	 * Factory function for creating new expressions.
	 * The created expression exposes methods for obtaining the current count, and asking to increment it.
	 * @param {String} exprText the text of the expression to create
	 */
	var newExpression = ( function() {
			//private incrementor to generate IDs
			var nextId = 0;

			function makeNewId() {
				var result = nextId;
				nextId += 1;
				return result;
			};
			
			return function(exprText){
				// hidden variable for the counter
				var myCounter = 0;
				var myId = makeNewId();
				
				var incrementMe = function(){
					myCounter += 1;
				};
				
				var getCount = function(){
					return myCounter;
				};
				
				var askIncrement = function(){
					requestIncrement(myId, incrementMe);
				};
				
				return {
					'id': myId,
					'text': exprText,
					'getCount': getCount,
					'askIncrement': askIncrement	
				};
			};
			
		}());
	
	//exposing the expressions of the teacher in scope
	$scope.expressions = obtainExpressions(currentTeacherId);
		
}]);
