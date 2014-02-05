"use strict";

var speechHabitsControllers = angular.module('speechHabitsControllers', []);

/*
 * Here's the controller displaying the list of available teachers.
 * We use the fetchAvailableTeachers service to retrieve the list of available teachers.
 */
speechHabitsControllers.controller('TeachersListController', ['$scope','fetchAvailableTeachers',
function($scope,fetchAvailableTeachers) {

	/**
	 * Getting the list of available teachers.
	 */
	fetchAvailableTeachers(function(teachersData){
		$scope.teachersList = teachersData;
	});
	
}]);

/**
 * Here we declare the controller for a single room.
 */
speechHabitsControllers.controller('roomController', ['$scope', '$routeParams','fetchTeacherExpressions','requestIncrement',
function($scope, $routeParams, fetchTeacherExpressions,requestIncrement) {

	//retrieving the ID of the current teacher from the route parameters
	var currentTeacherId = $routeParams['teacherId'];

    /**
     * Reads the specified expressions data and converts them into an array of expression objects exposing methods fr incrementing.
     * @param expressionsData
     * @returns {Array}
     */
	function makeExpressions(expressionsData){
		var result = [];
		var currentExpression;
		
		for(var i = 0; i < expressionsData.length; i++){
			currentExpression = expressionsData[i];
			result[i] = newExpression(currentExpression.text, currentExpression.id);
		}
		
		return result;
	};

	/**
	 * Factory function for creating new expressions.
	 * The created expression exposes methods for obtaining the current count, and asking to increment it.
	 * @param {String} exprText the text of the expression to create
	 */
	function newExpression(exprText, myId){
				// hidden variable for the counter
				var myCounter = 0;
				
				function incrementMe(){
					myCounter += 1;
				};
				
				function getCount(){
					return myCounter;
				};
				
				function askIncrement(){
                    requestIncrement(myId,{
                        "doIfAccepted": incrementMe,
                        "doIfRejected": function(){console.log("Expression " + myId + " was rejected!")}
                    });
				};
				
				return {
					'id': myId,
					'text': exprText,
					'getCount': getCount,
					'askIncrement': askIncrement	
				};
			
		}
	
	//exposing the expressions of the teacher in scope
	fetchTeacherExpressions(currentTeacherId)(function(expressionsData){	
		$scope.expressions = makeExpressions(expressionsData);
	});
		
}]);
