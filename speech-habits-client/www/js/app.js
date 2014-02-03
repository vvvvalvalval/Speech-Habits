"use strict";

/**
 * Here we declare the Speech Habits app
 */
angular.module('speechHabitsApp', 
['ngRoute','speechHabitsControllers'])
.config(['$routeProvider', function($routeProvider) {
	/*
	 * This part declares the routing configuration that will enable us to have multiple views
	 */
	$routeProvider.when('/teachersList', {
		templateUrl : 'partials/teachers_list.html',
		controller : 'TeachersListController'
	}).when('/rooms/:teacherId',{
		templateUrl : 'partials/room.html',
		controller : 'roomController'
	}).otherwise({
		redirectTo : '/teachersList'
	});
}]);
