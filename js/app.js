// Angularjs with firebase

var tttApp = angular.module('tttApp', ['firebase']);
tttApp.controller('tttCtrl', ['$scope', '$firebase', function($scope, $firebase){
$scope.cells2 = {cells:['','','','','','','','',''], currentMark : 'o'};
var tttDetails = $firebase (new Firebase("https://turnapp.firebaseio.com/data"));

//tttDetails.$asObject().$bindTo($scope, 'tttDetails');

tttDetails.$bind($scope,"cells2");
$scope.$watch('cells2', function(){

});


// // Dealing with an Object  
// var firebase = new Firebase("https://turnapp.firebaseio.com/ttt")
// var tttDetails = $firebase(firebase);
// var tttDetailsObject = tttDetails.asObject();
// tttDetailsObject.$bindTo($scope, 'tttDetails');

// var tttDetails = $firebase(new Firebase("https://turnapp.firebaseio.com/"));
// tttDetails.$asObject().$bindTo($scope, 'tttDetails');


  // var currentMark = 'o';
  var empty = true;
  moves = 1;
  gameover = false;
  grid = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];
  $scope.leftScore = 0;
  $scope.rightScore = 0;

// Drawing Markers for Player1 and two
  $scope.drawMark = function($index) {
    if (gameover == false && $scope.cells2.cells[$index] == '') {
      if ($scope.cells2.currentMark == 'o') {
        $scope.cells2.cells[$index] = 'x';
        $scope.cells2.currentMark = 'x';
      } else {
        $scope.cells2.cells[$index] = 'o';
        $scope.cells2.currentMark = 'o';
      }
    }
    var row = Math.floor($index/3);
    var column = ($index % 3);
    grid[row][column] = $scope.cells2.currentMark;
    if (gameover == false) evaluateWin();
  }
// Winning Logic!
  var evaluateWin = function() {
    if (grid[0][0] == "x" && grid[0][1] == "x" && grid[0][2] == "x") {
      xwin();
    } else if (grid[1][0] == "x" && grid[1][1] == "x" && grid[1][2] == "x") {
      xwin();
    } else if (grid[2][0] == "x" && grid[2][1] == "x" && grid[2][2] == "x") {
      xwin();
    } else if (grid[0][0] == "x" && grid[1][0] == "x" && grid[2][0] == "x") {
      xwin();
    } else if (grid[0][1] == "x" && grid[1][1] == "x" && grid[2][1] == "x") {
      xwin();
    } else if (grid[0][2] == "x" && grid[1][2] == "x" && grid[2][2] == "x") {
      xwin();
    } else if (grid[0][0] == "x" && grid[1][1] == "x" && grid[2][2] == "x") {
      xwin();
    } else if (grid[0][2] == "x" && grid[1][1] == "x" && grid[2][0] == "x") {
      xwin();
    } else if (grid[0][0] == "o" && grid[0][1] == "o" && grid[0][2] == "o") {
      owin();
    } else if (grid[1][0] == "o" && grid[1][1] == "o" && grid[1][2] == "o") {
      owin();
    } else if (grid[2][0] == "o" && grid[2][1] == "o" && grid[2][2] == "o") {
      owin();
    } else if (grid[0][0] == "o" && grid[1][0] == "o" && grid[2][0] == "o") {
      owin();
    } else if (grid[0][1] == "o" && grid[1][1] == "o" && grid[2][1] == "o") {
      owin();
    } else if (grid[0][2] == "o" && grid[1][2] == "o" && grid[2][2] == "o") {
      owin();
    } else if (grid[0][0] == "o" && grid[1][1] == "o" && grid[2][2] == "o") {
      owin();
    } else if (grid[0][2] == "o" && grid[1][1] == "o" && grid[2][0] == "o") {
      owin();
    } else if (moves == 9) {
      var messagebox = document.getElementById('message');
      $scope.leftMessage = "draw...";
      $scope.rightMessage = "draw...";
    } else {
      moves += 1;
    }
  }

  $scope.setName1 = function(player1Name) {
    $scope.player1Name = '';
  }

  $scope.setName2 = function(player2Name) {
    $scope.player2Name = '';
  }

  $scope.removeFocus1 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }

  $scope.removeFocus2 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }

  var xwin = function () {
    $scope.leftMessage = $scope.player1Name + " wins!";
    gameover = true;
    $scope.leftScore += 1;
  }

  var owin = function () {
    $scope.rightMessage = $scope.player2Name + " wins!";
    gameover = true;
    $scope.rightScore += 1;
  }
// Board Reset!
  $scope.clearBoard = function() {
    console.log('clear the board');
    for (var j = 0; j < $scope.cells2.cells.length; j++) {
      $scope.cells2.cells[j] = '';
    }
    $scope.leftMessage = "";
    $scope.rightMessage = "";
    $scope.cells2.currentMark = 'o';
    var empty = true;
    moves = 1;
    gameover = false;
    grid = [
        [ "" , "" , "" ],
        [ "" , "" , "" ],
        [ "" , "" , "" ]
      ];
  };

}]);