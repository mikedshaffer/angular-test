angular.module('sample').service('ListService', function($http) {
  var baseUrl = "http://polls.apiblueprint.org";
  var svc = this;
  
  function getAllQuestions() {
    return getEP().then(function(){
      return doGet(baseUrl + svc.entrypoint + "?page=1",false).then(
        function(data) { 
          return data;
        } 
      );
    });
  }
  function getQuestion(questionId) { 
    return doGet(baseUrl + questionId,false).then(
      function(data) {
        return data;
      });
  }
  function doGet(urlString,cacheValue) {
    return $http.get(urlString,{ cache: cacheValue}).then(function(response) {
      return response.data;
    });
  }
  function doPost(urlString,payload){
    return $http.post(urlString,payload).then(function(response){
      return response.data;
    });
  }
  function getEP(){ 
    return doGet(baseUrl,true).then(function(data) { 
      svc.entrypoint = data.questions_url;
      return data.questions_url;
    });
  }
  function setChoice(choiceIdUrl){ 
    return doPost(baseUrl + choiceIdUrl,null).then(function(data){
      return data;
    });
  }
  function createNewQuestion(qName,qChoices){
    var newQuestion = {
      "question" : qName,
      "choices" : qChoices.split(",")
    };
    return getEP().then(function(){
      return doPost(baseUrl + svc.entrypoint + "?page=1",newQuestion).then(
        function(data) { 
          return data;
        } 
      );
    });
  }
  return {
    getAllQuestions: function() {
      return getAllQuestions();
    },
    getQuestion: function(questionId) {
      return getQuestion(questionId);
    },
    setChoice : function(choiceIdUrl){
      return setChoice(choiceIdUrl);
    },
    createQuestion : function(qName,qChoices){
      return createNewQuestion(qName,qChoices);
    }
  };

});