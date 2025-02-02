var app = angular.module('studentApp', []);

app.controller('studentCtrl', function ($scope, $http) {
  $scope.student = {}; // Initialize student data
  $scope.students = []; // Initialize array to hold students
  $scope.message = '';

  // Function to add a student
  $scope.addStudent = function () {
    if (!$scope.student.name || !$scope.student.age || !$scope.student.course || !$scope.student.roomNo) {
      $scope.message = 'All fields are required!';
      return;
    }

    $http.post('http://localhost:3000/add-student', $scope.student)
      .then(function (response) {
        $scope.message = response.data.message || 'Student added successfully!';
        $scope.student = {}; // Clear form after submission
      })
      .catch(function (error) {
        console.error('Error adding student:', error);
        $scope.message = 'Error adding student!';
      });
  };

  // Function to fetch all students (triggered by "Load Students" button)
  $scope.getStudents = function () {
    $http.get('http://localhost:3000/students')
      .then(function (response) {
        $scope.students = response.data; // Assign data to $scope.students
      })
      .catch(function (error) {
        console.error('Error fetching students:', error);
      });
  };

  // Function to delete a student
  $scope.deleteStudent = function (name) {
    $http.delete(`http://localhost:3000/delete-student/${name}`)
      .then(function (response) {
        $scope.message = response.data.message || 'Student deleted successfully!';
        $scope.getStudents(); // Refresh the list after deletion
      })
      .catch(function (error) {
        console.error('Error deleting student:', error);
        $scope.message = 'Error deleting student!';
      });
  };
});
