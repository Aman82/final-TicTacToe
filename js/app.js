// Angularjs with firebase

//Create angular app and its dependency for firebase
var tttApp = angular.module('tttApp', ['firebase']);
//Create controller and connect to firebase
tttApp.controller('tttCtrl', ['$scope', '$firebase', function($scope, $firebase){
//Create cell2 object with property cells and currentMark
$scope.cells2 = {cells:['','','','','','','','',''], currentMark : 'o'};
//Connect to firebase
var tttDetails = $firebase (new Firebase("https://turnapp.firebaseio.com/data"));
//bind cell2 to $watch to check the state of the cell2 object
tttDetails.$bind($scope,"cells2");
$scope.$watch('cells2', function(){
});

  // var currentMark = 'o';
  
  //Create empty boolean variable
  var empty = true;
  //Variable to hold number of moves
   moves = 1;
  //boolean variable to check if game is over or not.
   gameover = false;
   //Array of Array to hold to hold value of user selections
  grid = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];
  //varibale to hold value of left side player score
  $scope.leftScore = 0;
  //varibale to hold value of right side player score
  $scope.rightScore = 0;

// Drawing Markers for Player1 and two
  $scope.drawMark = function($index) {
    //If game is not over and cells are still empty continue playing
    if (gameover == false && $scope.cells2.cells[$index] == '') {
    //Switch between players if current player is 'o' then change to X, if 'x'then change to 'o'.
      if ($scope.cells2.currentMark == 'o') {
        $scope.cells2.cells[$index] = 'x';
        $scope.cells2.currentMark = 'x';
      } else {
        $scope.cells2.cells[$index] = 'o';
        $scope.cells2.currentMark = 'o';
      }
    }
    //Calulate the value of current row using  Math.floor funtion
    var row = Math.floor($index/3);
    //Calculate the value of current column by using modulus operator.
    var column = ($index % 3);
    //Assing the vlaue fo grid array using row and column
    grid[row][column] = $scope.cells2.currentMark;
    //Check if game is over and if it over find the winners
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

  //set the value of playerName to empty string
  $scope.setName1 = function(player1Name) {
    $scope.player1Name = '';
  }
  //set the value of playerName to empty string
  $scope.setName2 = function(player2Name) {
    $scope.player2Name = '';
  }
  //set the value of playerName to empty string
  $scope.removeFocus1 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }
  //set the value of playerName to empty string
  $scope.removeFocus2 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }
  //If 'x' wind then display message
  var xwin = function () {
    $scope.leftMessage = $scope.player1Name + " wins!";
    gameover = true;
    $scope.leftScore += 1;
  }
  //If 'o' wind then display message
  var owin = function () {
    $scope.rightMessage = $scope.player2Name + " wins!";
    gameover = true;
    $scope.rightScore += 1;
  }
// Board Reset!
  $scope.clearBoard = function() {
    console.log('clear the board');
    //Clear the values of cell and reset to empty string
    for (var j = 0; j < $scope.cells2.cells.length; j++) {
      $scope.cells2.cells[j] = '';
    }
    //Reset value of left message to empty string
    $scope.leftMessage = "";
    //Reset value of right message to empty string
    $scope.rightMessage = "";
    //reset current marker to 'o'
    $scope.cells2.currentMark = 'o';
    //Set empty to variable to true. 
    var empty = true;
    //Reset number of moves to 1. Games starts from 1st move
    moves = 1;
    //Reset game over to false. 
    gameover = false;
    //Reset the board grid to empty value. 
    grid = [
        [ "" , "" , "" ],
        [ "" , "" , "" ],
        [ "" , "" , "" ]
      ];
  };

}]);