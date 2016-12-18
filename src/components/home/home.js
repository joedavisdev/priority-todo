/* global angular, storage */

angular.module('app.home', [])
    .controller("HomeController", ['$scope', '$location', HomeController]);

function HomeController($scope, $location) {
    var self = this;
    self.properties = {
        priorities: [1,2,3,4,5],
        priority_colours: ["#EB7C76","#FFD677","#C8CE7D","#8CC685","#4BBC8F"]
    },
    self.defaultTodo = function() {
        return {
            title:"",
            priority:3
        };
    },
    $scope.addTodo = function(todo) {
        if(todo.title === "") return;
        var priority_colour = self.properties.priority_colours[todo.priority-1];
        var priority_style = "background-color: " + priority_colour;
        $scope.todos.push({
            title:todo.title,
            priority:todo.priority,
            priority_style:priority_style});
        $scope.new_todo = self.defaultTodo();
        self.updateStorage();
    },
    $scope.editTodo = function(todo) {
        $scope.new_todo = {
            title:todo.title,
            priority:todo.priority
        };
        $scope.deleteTodo(todo);
    },
    $scope.deleteTodo = function(todo) {
        var found_index = self.findByTitle(todo.title);
        if(found_index !== -1) {
            $scope.todos.splice(found_index,1);
        }
        self.updateStorage();
    },
    self.updateStorage = function() {
        self.sortTodos();
        storage.setItem('todos',$scope.todos);
    },
    self.sortTodos = function() {
        $scope.todos = $scope.todos.sort(dynamicSort('priority'));
    },
    self.findByTitle = function(title) {
        var found_index = -1;
        for (var i = 0; i < $scope.todos.length; i++) {
            if(title === $scope.todos[i].title) {
                found_index = i;
                break;
            }
        }
        return found_index;
    },
    self.init = (function() {
        $scope.properties = self.properties;
        $scope.new_todo = self.defaultTodo();
        $scope.todos = storage.getItem('todos');
        if($scope.todos === null) {
            $scope.todos = [];
        }
        self.sortTodos();
        $scope.priority_buttons = [];
        for (var i = 0; i < $scope.properties.priorities.length; i++) {
            var priority_colour = self.properties.priority_colours[i];
            var priority_style = "background-color: " + priority_colour;
            var button = {
                value: $scope.properties.priorities[i],
                style:priority_style
            };
            $scope.priority_buttons.push(button);
        }
    })();
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
function dynamicSortMultiple() {
    /*
     * save the arguments object as it will be overwritten
     * note that arguments object is an array-like object
     * consisting of the names of the properties to sort by
     */
    var props = arguments;
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        /* try getting a different result from 0 (equal)
         * as long as we have extra properties to compare
         */
        while(result === 0 && i < numberOfProperties) {
            result = dynamicSort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    };
}