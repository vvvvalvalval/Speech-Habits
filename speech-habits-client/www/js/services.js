'use strict';

/* Services */

/**
 * Module for services of Speech Habits.
 */
var speechHabitsServices = angular.module('speechHabitsServices', []);

/**
 * We expose here a service that is used to retrieve the list of available teachers.
 */
speechHabitsServices.factory('fetchAvailableTeachers', ['getMockData',
    function (getMockData) {
        return function (doWithTeachersList) {
            getMockData(function (dataFacade) {
                doWithTeachersList(dataFacade.getAllTeachers());
            });
        };
    }]);

/**
 * We expose here a service that is used to retrieve all the expressions of a teacher
 */
speechHabitsServices.factory('fetchTeacherExpressions', ['getMockData',
    function (getMockData) {
        return function (teacherId) {
            return function (doWithExpressions) {
                getMockData(function (dataFacade) {
                    doWithExpressions(dataFacade.expressionsOf(teacherId));
                });

            };
        };
    }]);

/**
 * That service lets us access some mock data. It injects a facade object for the data into a callback function.
 */
speechHabitsServices.factory('getMockData', ['$http',
    function ($http) {

        /**
         * Creates from the parameterized fixture data a facade exposing methods for obtaining the list of teachers and the list of expressions of a teacher.
         * @param {Object} fixtureData the fixture data retrieved in the teachers-fixture.json file.
         */
        function dataFacadeOf(fixtureData) {
            // A function that returns an array with all the teachers
            function getAllTeachers() {
                var result = [];
                var currentTeacher;
                for (var i = 0; i < fixtureData.length; i++) {
                    currentTeacher = fixtureData[i];
                    result[i] = {
                        'id': currentTeacher.id,
                        'name': currentTeacher.name
                    };
                }
                return result;
            }

            // that function finds a teacher from his ID
            function findTeacherById(teacherId) {
                var currentTeacher;
                for (var i = 0; i < fixtureData.length; i++) {
                    currentTeacher = fixtureData[i];
                    if (currentTeacher['id'] == teacherId) {
                        return currentTeacher;
                    }
                }
            }

            /**
             * Returns an array listing the expressions of the specified teacher.
             * @param teacherId the ID of the teacher
             * @returns {Array} the expressions of the teacher.
             */
            function expressionsOf(teacherId) {
                return findTeacherById(teacherId)['expressions'];
            }

            /*
             * The facade that will be exposed for the fixture data.
             */
            var dataFacade = {
                'getAllTeachers': getAllTeachers,
                'expressionsOf': expressionsOf
            };

            return dataFacade;
        }

        return function (doWithMockData) {

            $http.get('teachers-fixture.json').success(function (fixtureData) {
                doWithMockData(dataFacadeOf(fixtureData));
            });
        };
    }]);

/**
 * Functional service for requesting the incrementation of an expression's counter, that consumes an expression id, and an object with 2 callbacks methods named 'doIfAccepted()' and 'doIfRejected'.
 */
speechHabitsServices.factory('requestIncrement', ['$http', function ($http) {

    function fetchIncrementAnswer(isAcceptedCallback) {
        //mock implementation for now :
        isAcceptedCallback(true);

    }

    return function (exprId, incrementCallBack) {

        fetchIncrementAnswer(function isAcceptedCallback(isAccepted) {
            if (isAccepted) {
                incrementCallBack.doIfAccepted();
            } else {
                incrementCallBack.doIfRejected();
            }
        });

    };
}]);
