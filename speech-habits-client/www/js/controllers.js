"use strict";

var speechHabitsControllers = angular.module('speechHabitsControllers', []);

/*
 * Here's the controller displaying the list of available teachers.
 * We use the availableTeachers service to retrieve the list of available teachers.
 */
speechHabitsControllers.controller('TeachersListController', ['$scope','availableTeachers',
function($scope,availableTeachers) {

	/**
	 * The list of available teachers.
	 */
	$scope.teachersList = availableTeachers();
}]);

/**
 * Here we declare the controller for a single room.
 */
speechHabitsControllers.controller('roomController', ['$scope', '$routeParams','teacherExpressions',
function($scope, $routeParams, teacherExpressions) {

	//retrieving the ID of the current teacher from the route parameters
	var currentTeacherId = $routeParams['teacherId'];

	/**
	 * 
	 * @param {int} teacherId : the ID of the teacher whose expressions are to be fetched.
	 */
	function obtainExpressions(teacherId){
		//current implementation is a mock : always returns the same expressions, without heeding the teacher id
		/*return [
			newExpression("Basically"),
			newExpression("By the way"),
			newExpression("Somewhere, somehow"),
			newExpression("At this point in time"),
			newExpression("Having said that")
		];*/
		var expressions = teacherExpressions(teacherId);
		var result = [];
		var currentExpression;
		
		for(var i = 0; i < expressions.length; i++){
			currentExpression = expressions[i];
			result[i] = newExpression(currentExpression.text, currentExpression.id);
		}
		
		return result;
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
			
			return function(exprText, myId){
				// hidden variable for the counter
				var myCounter = 0;
				
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
