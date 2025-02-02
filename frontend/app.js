var app = angular.module('studentApp', []);

app.controller('studentCtrl', function ($scope, $http) {
  $scope.student = {};
  $scope.students = [];
  $scope.message = '';

  const API_URL = "https://your-backend-url.onrender.com"; // Replace with your Render backend URL

  // Function to add a student
  $scope.addStudent = function () {
    if (!$scope.student.name || !$scope.student.age || !$scope.student.course || !$scope.student.roomNo) {
      $scope.message = 'All fields are required!';
      return;
    }

    $http.post(`${API_URL}/add-student`, $scope.student)
      .then(function (response) {
        $scope.message = response.data.message || 'Student added successfully!';
        $scope.student = {}; // Clear form after submission
        $scope.getStudents(); // Refresh student list
      })
      .catch(function (error) {
        console.error('Error adding student:', error);
        $scope.message = 'Error adding student!';
      });
  };

  // Function to fetch all students
  $scope.getStudents = function () {
    $http.get(`${API_URL}/students`)
      .then(function (response) {
        $scope.students = response.data;
      })
      .catch(function (error) {
        console.error('Error fetching students:', error);
      });
  };

  // Function to delete a student
  $scope.deleteStudent = function (name) {
    $http.delete(`${API_URL}/delete-student/${name}`)
      .then(function (response) {
        $scope.message = response.data.message || 'Student deleted successfully!';
        $scope.getStudents(); // Refresh student list
      })
      .catch(function (error) {
        console.error('Error deleting student:', error);
        $scope.message = 'Error deleting student!';
      });
  };
});
