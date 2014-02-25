"use strict";

//wrapped in function invocation to not pollute the global namespace.
(function () {

    /*
     * HELPER FUNCTIONS
     */

    var speechHabitsControllers = angular.module('speechHabitsControllers', []);

    /**
     * Utility function that merges several injectable bodies into one injectable body that sequentially executes them.
     *
     * We call 'injectable body' an array such as those used to create AngularJS services or controllers : an array that begins with services names, and which last element is a 'body' function into which the corresponding services are executed and that gets executed.
     *
     * @param injectable_bodies an array of injectable bodies, i.e an array of arrays, for which all elements are strings except for the last one that is a function.
     * @returns {Array} the injectable body that is obtained by merging all these injectable bodies : the services names list is the concatenation of all the services names list, and the body function executes all body function sequentially.
     */
    var merge_injectable_bodies = (function () {
        /**
         * a utility function for extracting sub-arrays
         * @param arr the array to extract from
         * @param start the first index (inclusive)
         * @param end the last index (exclusive)
         * @returns {Array}
         */
        function sub_array(arr, start, end) {
            var result = [];
            for (var i = start; i < end; i++) {
                result.push(arr[i]);
            }
            return result;
        }

        /**
         * utility function for extracting all elements from an array but the last one.
         * @param arr
         * @returns {Array}
         */
        function all_but_last(arr) {
            return sub_array(arr, 0, arr.length - 1);
        }

        //the function itself.
        return function (injectable_bodies) {
            var bodiesData = [];

            //executing that function creates an object for each injectable body with useful info.
            function extractBodiesData() {
                var currentArgs = [];
                var beginIndex = 0;
                var endIndex;
                for (var i = 0; i < injectable_bodies.length; i++) {
                    //an array with names and a function
                    currentArgs = injectable_bodies[i];
                    endIndex = beginIndex + currentArgs.length - 1;

                    bodiesData.push({
                        "servicesNames": all_but_last(currentArgs),
                        "beginIndex": beginIndex,
                        "endIndex": endIndex,
                        "bodyFunction": currentArgs[currentArgs.length - 1]
                    });

                    beginIndex = endIndex;
                }
            }

            var mergedBody = [];

            extractBodiesData();

            //adding all the services names.
            for (var i = 0; i < injectable_bodies.length; i++) {
                var servicesNames = bodiesData[i].servicesNames;
                for (var j = 0; j < servicesNames.length; j++) {
                    mergedBody.push(servicesNames[j]);
                }
            }

            //the function that is passed as the last argument of mergedArgs. Is injected with all the merged services.
            var wrappingFunction = function () {
                var currentBodyData, currentBody, currentInjectedServices;
                //for each args array, we retrieve the injected services and feed them to the corresponding body function.
                for (var i = 0; i < bodiesData.length; i++) {
                    //retrieving the data for the current body.
                    currentBodyData = bodiesData[i];
                    currentBody = currentBodyData.bodyFunction;

                    //building an argument array that are the services to inject into the current body function.
                    currentInjectedServices = sub_array(arguments, currentBodyData.beginIndex, currentBodyData.endIndex);

                    //calling the body function with the injected services.
                    currentBody.apply(null, currentInjectedServices);
                }
            }
            //appending the wrapping function that merges all the body function at the end of the merged arguments array.
            mergedBody.push(wrappingFunction);

            return mergedBody;
        };
    }());

    /**
     * That function creates a single controller for the application by sequentially injecting services into
     * @param name the name of the controller to create
     * @param separate_bodies an array of 'injectable body functions' such as the array that is passed as the second argument of angular.module(...).controller(name, injectableBody).
     */
    function controller_with_merged_bodies(name, separate_bodies) {

        //creating the controller by merging the injectable bodies.
        speechHabitsControllers.controller(name, merge_injectable_bodies(separate_bodies));
    }

    /**
     * Registers a controller for the application that check the logged-in state, i.e redirects to login page if the user has not yet logged in.
     * That protects the application from malicious users that would attempt to skip the login step by accessing a page by URL.
     * The arguments are those that would be used in a usual speechHabitsControllers.controller(name, injectableBody) invocation.
     * @param name
     * @param injectable_body
     */
    function login_checked_controller(name, injectable_body) {
        controller_with_merged_bodies(name, [
            ['$location', 'loggedInService', function ($location, loggedInService) {
                if (!loggedInService.hasLoggedIn()) {
                    $location.path("/login");
                }
            }],
            injectable_body
        ]);
    }


    /*
     * THE CONTROLLERS
     */

    /**
     * Controller relative to the user identification page.
     */
    //speechHabitsControllers.controller
    login_checked_controller('loginController', ['$scope', '$location', 'loggedInService', function ($scope, $location, loggedInService) {

        $scope.pseudo = loggedInService.getPseudo();

        $scope.login = function () {
            if ($scope.pseudo) {
                loggedInService.setPseudo($scope.pseudo);
            }
            $location.path("/teachersList");
        };


    }]);

    /**
     * Here's the controller displaying the list of available teachers.
     * We use the fetchAvailableTeachers service to retrieve the list of available teachers.
     */
    login_checked_controller('TeachersListController', ['$scope', 'fetchAvailableTeachers', 'loggedInService', '$location',
        function ($scope, fetchAvailableTeachers, loggedInService, $location) {

            // if not logged in, back to login page.
            if (!loggedInService.hasLoggedIn()) {
                $location.path('/login');
            }

            $scope.pseudo = loggedInService.getPseudo();
            /**
             * Getting the list of available teachers.
             */
            fetchAvailableTeachers(function (teachersData) {
                $scope.teachersList = teachersData;
            });

        }]);

    /**
     * Here we declare the controller for a single room.
     */
    login_checked_controller('roomController', ['$scope', '$routeParams', 'fetchTeacherExpressions', 'requestIncrement',
        function ($scope, $routeParams, fetchTeacherExpressions, requestIncrement) {

            //retrieving the ID of the current teacher from the route parameters
            var currentTeacherId = $routeParams['teacherId'];

            /**
             * Reads the specified expressions data and converts them into an array of expression objects exposing methods fr incrementing.
             * @param expressionsData
             * @returns {Array}
             */
            function makeExpressions(expressionsData) {
                var result = [];
                var currentExpression;

                for (var i = 0; i < expressionsData.length; i++) {
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
            function newExpression(exprText, myId) {
                // hidden variable for the counter
                var myCounter = 0;

                function incrementMe() {
                    myCounter += 1;
                };

                function getCount() {
                    return myCounter;
                };

                function askIncrement() {
                    requestIncrement(myId, {
                        "doIfAccepted": incrementMe,
                        "doIfRejected": function () {
                            console.log("Expression " + myId + " was rejected!")
                        }
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
            fetchTeacherExpressions(currentTeacherId)(function (expressionsData) {
                $scope.expressions = makeExpressions(expressionsData);
            });

        }]);

}());