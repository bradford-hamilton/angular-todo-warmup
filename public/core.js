var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  //when landing on page get all todos and show them
  $http.get('/api/todos')
    .success(function(data) {
      $scope.todos = data;
      console.log(data);
    })
    .error(function(error) {
      console.log('Error: ' + error);
    });

  //when submitting add form, send text to node API
  $scope.createTodo = function() {
    $http.post('api/todos', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; //clear form for user
        $scope.todos = data;
        console.log(data);
      })
      .error(function(error) {
        console.log('Error: ' + error);
      });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/todos/' + id)
      .success(function(data) {
          $scope.todos = data;
          console.log(data);
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    };


}
