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
	return function() {
		return mockData.getAllTeachers();
	};
}]);

/**
 * We expose here a service that is used to retrieve all the expressions of a teacher
 */
speechHabitsServices.factory('teacherExpressions', ['mockData',
function(mockData) {
	return function(teacherId) {
		return mockData.expressionsOf(teacherId);
	};
}]);

/**
 * That service lets us access some mock data.
 */
speechHabitsServices.factory('mockData', ['$http',
function($http) {
	var fixtureData = [{
		"id" : 0,
		"name" : "Philippe Ginier-Gillet",
		"expressions" : [{
			"id" : 0,
			"text" : "Basically"
		}, {
			"id" : 1,
			"text" : "By the way"
		}, {
			"id" : 2,
			"text" : "Bloody hell"
		}, {
			"id" : 3,
			"text" : "Somewhere somehow"
		}, {
			"id" : 4,
			"text" : "You realize that"
		}]
	}, {
		"id" : 1,
		"name" : "Bruno Martinaud",
		"expressions" : [{
			"id" : 5,
			"text" : "C'est très entrepreneurial"
		}, {
			"id" : 6,
			"text" : "Silicon Valley"
		}, {
			"id" : 7,
			"text" : "L'ADN de cette startup"
		}]
	}, {
		"id" : 2,
		"name" : "Chuck Norris",
		"expressions" : [{
			"id" : 8,
			"text" : "Wesh"
		}, {
			"id" : 9,
			"text" : "Nik sa reum"
		}, {
			"id" : 10,
			"text" : "Pran sa dent ta gueule"
		}]
	}];

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

	//This function returns
	function expressionsOf(teacherId) {
		return findTeacherById(teacherId)['expressions'];
	};

	return {
		'getAllTeachers' : getAllTeachers,
		'expressionsOf' : expressionsOf
	};
}]);
