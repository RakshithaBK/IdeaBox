/* *********************************************************
Developed by : Basavaraj, Gowthan and Pooja Kumari

* Idea submission
* Can check idea 
* Can uncheck ideas
* Add more ideas from dropdown ($scope.addClicked)
* Remove ideas clicking checked and remove from list ($scope.removeUnchecked )

1.	I should get a page where my idea can be submitted.
2.	I should be able to submit the name and describe my idea.
3.	I should be able to explain the problem and provide the solution for my idea.
4.	I should be able to convey the vision of idea.
5.	I should be able to submit more than one idea.

***********************************************/

var app = angular.module('myApp');

app.controller('ideaSubmissionCtrl', function($scope,postAllIdeasService){
	
	$scope.categoryPrimaryList = [{name : 'Cloud', isChecked : false},{name : 'Analytics', isChecked : false}, {name :'Digitization', isChecked : false},{name :'Security', isChecked : false},{name :'IOT', isChecked : false},{name :'Mobility', isChecked : false}];
	$scope.origionalSecondaryDropDown = ['Testing', 'Migration','Abc','Xyz', 'Basava'];	//To maintain original copy to remove items for unchecked
	$scope.secondarydropdown = ['Testing', 'Migration','Abc','Xyz', 'Basava'];	
	$scope.$watch(function(){
		var myEl = angular.element(document.querySelectorAll('.switch'));		
		$scope.categoryPrimaryList.length >= 9 ? myEl.addClass('switch-resize') : myEl.removeClass('switch-resize');	
	});
	
	$scope.sendSelected = [];
			
	$scope.myIdeas ={};
	$scope.myIdeas.ideaName = ""; 
	$scope.myIdeas.interested = "";
	$scope.myIdeas.technologies = "";
	$scope.myIdeas.why_used = "";
	$scope.myIdeas.category = "";
	$scope.myIdeas.mentor = [];
	$scope.myIdeas.practice_category = "";
	$scope.myIdeas.practice_mentor = [];
	$scope.categoryValues = null;
	postAllIdeasService.getCategoryServiceFunction().then(function(response){
	
		//$scope.categoryValues = response.data.data[0].categories;
		console.log($scope.categoryValues);
	}); 
	/* Add items from drop down list */
	$scope.addClicked = function(item, e){	
		$scope.categoryPrimaryList.push({name : $scope.secondarydropdown[item], isChecked : true });
		$scope.secondarydropdown.splice(item, 1);
		angular.element(document.querySelector('.dropdown-list')).hide();
		e.stopPropagation();
	};
	/* Remove Items from clicked list */
	$scope.removeUnchecked = function(clickedItem, e){
		if($scope.origionalSecondaryDropDown.indexOf(clickedItem) != -1){ // using $scope.origionalSecondaryDropDown
			index = $scope.categoryPrimaryList.findIndex(x => x.name == clickedItem);
			$scope.secondarydropdown.push(clickedItem);
			$scope.categoryPrimaryList.splice(index,1);
		}	
		e.stopPropagation();	
	};
	
	$scope.addMentors = function(event){
		var mentName = angular.element('#mentName').val();
		var mentEmail = angular.element('#mentemail').val();
		console.log(mentName,mentEmail );
		//$scope.practice_mentor.push({mentorName : mentName, mentorEmail :mentEmail });
		$scope.myIdeas.mentor.push(mentName);	
		angular.element('#mentName').val('');
		angular.element('#mentemail').val('');
		event.stopPropagation();
	}
	
	$scope.myIdeas.postIdeasFunction = function(){
		
		var checkedValue = null; 
		var inputElements = document.getElementsByClassName('categoryCheckBox');
		for(var i=0; inputElements[i]; ++i){
			  if(inputElements[i].checked){
				   checkedValue = inputElements[i].value;
				   $scope.sendSelected.push(checkedValue);
			  }
		}
		
		/*var datas = {
			"name":$scope.myIdeas.ideaName,
			"why_interested":$scope.myIdeas.interested,
			"technologies":$scope.myIdeas.technologies,
			"justification":$scope.myIdeas.why_used,
			"mentors":$scope.myIdeas.mentor,
			"category":$scope.sendSelected
		} */
		
		var datas = {
          "name":$scope.myIdeas.ideaName,
           "description":$scope.myIdeas.interested,
            "technologies":$scope.myIdeas.technologies,
            "justification":$scope.myIdeas.why_used,
            "category":$scope.sendSelected,
            "mentors":$scope.myIdeas.mentor,
           "status":"inprogress",
           "owner":"yash",
           "members":"yash"
		}
		console.log(datas);		
		$scope.showpara = false;
		$scope.showparaError = false;
		postAllIdeasService.postIdeaServiceFunction(datas).then(function(response){
			console.log(response);
			if(response.statusText == 'OK'){				
				$scope.showpara = true;
			}
			else {
				$scope.showparaError = true;
			}			
		});
	};			
})
.factory('postAllIdeasService',function($http){
	var service = {};	
	
	service.postIdeaServiceFunction = function(datas){
		console.log('in service');
		return $http({
			method : 'POST',
			data : datas,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/postIdea'
		})
	};
	
	service.getCategoryServiceFunction= function(){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getCategories'
		})
	};
	
	return service;
	
}); 

