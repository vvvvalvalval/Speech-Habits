'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).value('version', '0.1');

/**
 * Module for services of Speech Habits.
 */
var speechHabitsServices = angular.module('speechHabitsServices', []);

/**
 * We expose here a service that is used to retrieve the list of available teachers
 */
speechHabitsServices.factory('availableTeachers', ['mockData',
function(mockData) {
	return function(teachersDataCallback) {
		mockData(function(dataFacade){
			teachersDataCallback(dataFacade.getAllTeachers());
		});
	};
}]);

/**
 * We expose here a service that is used to retrieve all the expressions of a teacher
 */
speechHabitsServices.factory('teacherExpressions', ['mockData',
function(mockData) {
	return function(teacherId) {
		return function(expressionsCallback){
			mockData(function(dataFacade){
				expressionsCallback(dataFacade.expressionsOf(teacherId));	
			});
			
		};
	};
}]);

/**
 * That service lets us access some mock data.
 */
speechHabitsServices.factory('mockData', ['$http',
function($http) {
	var fixtureData;

	// A function that returns an array with all the teachers
	function getAllTeachers() {
		var result = [];
		var currentTeacher;
		for (var i = 0; i < fixtureData.length; i++) {
			currentTeacher = fixtureData[i];
			result[i] = {
				'id' : currentTeacher.id,
				'name' : currentTeacher.name
			};
		}
		return result;
	};

	// that function finds a teacher from his ID
	function findTeacherById(teacherId) {
		var currentTeacher;
		for (var i = 0; i < fixtureData.length; i++) {
			currentTeacher = fixtureData[i];
			if (currentTeacher['id'] == teacherId) {
				return currentTeacher;
			}
		}
	};

	
	function expressionsOf(teacherId) {
		return findTeacherById(teacherId)['expressions'];
	};
	
	var dataFacade = {
		'getAllTeachers' : getAllTeachers,
		'expressionsOf' : expressionsOf
	};
	
	return function(mockDataCallback){
		/*
		 * We load the data once : intercept, cache and invoke.
		 */
		if(fixtureData){
			mockDataCallback(dataFacade);
		} else {
			$http.get('teachers-fixture.json').success(function(data){
				fixtureData = data;
				mockDataCallback(dataFacade);
			});
		}
	};
}]);
