/// <reference path="typings/angularjs/angular.d.ts"/>

(function() {

  angular.module('sample', []);
  angular.module('sample').controller('MainCtrl', function($q, $exceptionHandler, $scope, ListService) {
    var main = this;
    main.showNew = false;
    main.questionName = "fred"
    main.questionChoices = "1,2,3"
    getAllQuestions();
    
    function getAllQuestions(){
      ListService.getAllQuestions().then(function(data) {
        main.questions = data;
      }).catch(function(error) {
        $exceptionHandler(error);
      });
      
    }
    main.makeChoice = function(choiceIdUrl){
      var qId = "/" + choiceIdUrl.split("/")[1] + "/" + choiceIdUrl.split("/")[2];
      ListService.setChoice(choiceIdUrl).then(function(data) {
         main.getSpecificQuestion(qId);
      }).catch(function(error) {
        $exceptionHandler(error);
      });
    };
    main.getSpecificQuestion = function(qId) {
      ListService.getQuestion(qId).then(function(data) {
        $scope.chosenQuestion = data; //pretty sure this isn't right...but oh well
      }).catch(function(error) {
        $exceptionHandler(error);
      });
    };
    main.addNewQuestion = function(){
      if(main.showNew){
        ListService.createQuestion(main.questionName,main.questionChoices).then(function(data){
          getAllQuestions();
        }).catch(function(error){
          $exceptionHandler(error);
        });
      }else{
        main.questionName = "";
        main.questionChoices = "";
      }
      main.showNew = !main.showNew;
    }
  });
})();