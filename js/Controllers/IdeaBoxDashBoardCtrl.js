//var app = angular.module('myApp');
app.controller('IdeaBoxDAshBoardCtrl',function($scope, IdeaBoxDAshBoardServices){
	$scope.scrollIndexs = [];
	var logged_User = localStorage.getItem('formdata');
    logged_User = JSON.parse(logged_User);
    $scope.user = logged_User.username;
    // console.log($scope.user);
	IdeaBoxDAshBoardServices.getAllDashBoardIdeas().then(function(response){
		// console.log(response.data.data);
		$scope.populateIdeas = response.data.data;
		$scope.scrollIndexs = response.data.data;
	});
	
	IdeaBoxDAshBoardServices.getIncompleteIdeasService().then(function(response){
		// console.log('coming',response.data);
		$scope.incompleteIdeas = response.data.data;
	});
	
	IdeaBoxDAshBoardServices.getCompleteIdeasService().then(function(response){
		// console.log('coming',response.data);
		$scope.completeIdeas = response.data.data;
	});
	
	IdeaBoxDAshBoardServices.getOwnerDataService().then(function(response){
		// console.log('coming',response.data);
		$scope.ownerData = response.data.data;
	});
	
	
	IdeaBoxDAshBoardServices.getAllRequests().then(function(response){
		// console.log('coming requests',response.data);
		$scope.completeRequests = response.data.data;
	});
	
	$scope.gridDetails = [0,1,2,3,4]; //dummy variable
	
	$scope.dummy = [1,2];
		
	$scope.NoofClicks = Math.floor($scope.scrollIndexs.length / 3);
			
	var innerwidthOfscroll = $(angular.element(document.querySelectorAll('.outer-div'))).innerWidth();
	var innerWidthScr = $(angular.element(document.querySelectorAll('.sliding-container'))).innerWidth() - 15;
	$scope.isEnable = true;
	$scope.isEnableLeft = false;
	
	
	
	
	
	
	
	$scope.scrollingWidth = 0;
	$scope.currentClick = 0;
	$scope.clickRight = function(){
		if($scope.scrollIndexs.length <= 3){ 
			$scope.isEnable = false;
			$scope.isEnableLeft = false;			
		}
		else {
			$scope.scrollingWidth += innerWidthScr;
			$(angular.element(document.querySelectorAll('.outer-div'))).animate({right: $scope.scrollingWidth+'px'});
			$scope.isEnableLeft = true;
			$scope.currentClick += 1;
			if(($scope.currentClick == $scope.NoofClicks) || ($scope.scrollIndexs.length % 3 == 0)){
					$scope.isEnable = false;		
			}			
		}		
	}
	
	$scope.clickPrevious = function(){
		if($scope.scrollIndexs.length <= 3){ 
			$scope.isEnable = false;
			$scope.isEnableLeft = false;			
		}
		else {
			$scope.scrollingWidth -= innerWidthScr;
			$(angular.element(document.querySelectorAll('.outer-div'))).animate({right: $scope.scrollingWidth+'px'});
			$scope.currentClick -= 1;
			$scope.isEnable = true;	
			if($scope.currentClick == 0){
					$scope.isEnableLeft = false; 
			}
		}
		
	}
	
	$scope.showThisList = true;
	
	$scope.changestoList = function(){	
		$scope.showThisList = true;
	}
	
	$scope.changestoGrid = function(){
		$scope.showThisList = false;	
	}
	
	$scope.likeIt = function(likedThis){
		var data1 = likedThis;
		console.log(data1);
		IdeaBoxDAshBoardServices.likeItService(data1).then(function(response){
			console.log(response.data);
			
		});
	}
	


	$scope.showDetails = function(ideaItem){
		console.log("ideaitem",ideaItem);		
		IdeaBoxDAshBoardServices.getIdeasDetails(ideaItem).then(function(response){
			console.log(response.data.data);
			$scope.showIndividualDetails = response.data.data;
			console.log("details",response.data.data[0].details.likes);
			console.log($scope.showIndividualDetails);
			 $scope.val = response.data.data[0].details.likes;
			
			 $scope.follow = response.data.data[0].details.following;
			console.log("before follow",$scope.follow);
			$scope.id=ideaItem;
		});	
	}
	
	
	
	$scope.updateidea = function(likedThis,desc){
		console.log(likedThis);		
		var datas = {
			_id : likedThis,
			update : desc
		}
		console.log(datas);
		if(desc === "" || desc === undefined){
			alert("Please enter updated message");
		}else{
			IdeaBoxDAshBoardServices.updateIdeaService(datas).then(function(response){
				console.log(response.data);	
				alert("updated successfully");		
				
			});
			
		}
			
	};

	$scope.shareideacall = function(ideaItem){
		console.log('inside share idea');
		console.log(ideaItem);
		$('#see-more-page').hide();	
		$('.navbar-fixed-top').css('display', 'block');
		window.location.href ='#shareyouridea';
		
		IdeaBoxDAshBoardServices.editIdea(ideaItem).then(function(response){
				console.log(response.data);							
		});
		
	}
	
	$scope.boolean_follow=false;
	
	$scope.increment_following= function() {
		
		
	 if($scope.boolean_follow==false)
		  {
			  
			  IdeaBoxDAshBoardServices.followService($scope.id).then(function(response)
	            {
				  
				   if(response.data.status==true){
		             document.getElementById("follow").src = "images/Idea detail_assets/Link_blue.png";
			         $scope.boolean_follow=true;
				
                     $scope.follow  = response.data.data[0].details.following;
			        }
				   else if(response.data.status==false){
				 
				 alert(response.data.data)
				 
			 }
		        });
	      }
	  
	  else if($scope.boolean_follow==true)
	      {
		 
		 IdeaBoxDAshBoardServices.unfollowService($scope.id).then(function(response)
				{
		
		             document.getElementById("follow").src = "images/Following.png";
		             $scope.boolean_follow=false;
                     $scope.follow  -= 1; 
			        
				
			     });
		
		   }
		
		};
	
	
	$scope.liked=false;
	
  $scope.increment_likes= function() {
	  
	   if($scope.liked==false)
		  {
			  
			  
	                 IdeaBoxDAshBoardServices.likeItService($scope.id).then(function(response)
			                    {
						              $scope.data=response.data.status;
						      
						            if( $scope.data==true)
										{
		                                 document.getElementById("likes").src = "images/thumps_up_blue.jpg";
		                                 $scope.liked=true;
										
		                                 $scope.val = response.data.data[0].details.likes;
										}
						            else if( $scope.data==false){
										 
	                                         alert(response.data.status);									
									    }
			                     });
		  }
	  
	    else if($scope.liked==true)
		  {
			
			 IdeaBoxDAshBoardServices.unlikeService($scope.id).then(function(response)
			                    {
		                                document.getElementById("likes").src = "images/Thumps UP_Grey.png";
		                                  $scope.liked=false;
				                         
		                                 $scope.val -= 1; 
			                     });
		       
		   }
	  
	  
	 };
  //$scope.ratings = [];
  // $scope.displayRatings = function(){  
	  // IdeaBoxDAshBoardServices.likeItService().then(function(response){
		  // $scope.ratings = response.data;
		  // $scope.remaingCnt = 5 - $scope.ratings;
	  // });
  // }
	
});

app.factory('IdeaBoxDAshBoardServices', function($http){
	
	var service = {};
	
	var filterdata = {"status":"inprogress"};
	
	service.getAllDashBoardIdeas = function(){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getAllIdeas'
		})
	}
	
	service.likeItService = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/likes'
		})
	};
	
	service.editIdea = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/editIdea'
		})
	};
	
	
	service.unlikeService = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/unlike'
		})
	};
	
	service.updateIdeaService = function(datas){		
		return $http({
			method : 'PUT',
			data : datas,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/ideaUpdates'
		})
	};
	
	service.followService = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/following'
		})
	};
	
	service.unfollowService = function(datas){
		var datas1 = {"_id":datas};
		return $http({
			method : 'PUT',
			data : datas1,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/unfollow'
		})
	};


	service.getIncompleteIdeasService = function(){	
		return $http({
			method : 'POST',
			data : filterdata,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/filterIdeas'
		})
		
	};
	var filterdatacomplete = {"status":"completed"};
	service.getCompleteIdeasService = function(){	
		return $http({
			method : 'POST',
			data : filterdatacomplete,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/filterIdeas'
		})
		
	};
	
	var getOwnerData = {"name":"jagadeesh"};
	service.getOwnerDataService = function(){	
		return $http({
			method : 'POST',
			data : getOwnerData,
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getOwner'
		})
		
	};
	
	service.getIdeasDetails = function(ideaItem){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/getIdea/'+ideaItem
		})
	};
	
	service.getAllRequests = function(){
		return $http({
			method : 'GET',
			url : 'http://ec2-34-248-114-187.eu-west-1.compute.amazonaws.com:5000/api/requests'
		})
	}
	
	
	return service;
});
app.directive('showMoreDetails', function(){	
	return {
		restrict : 'EA',
		templateUrl : 'partials/IdeaDetail.html',
		controller : 'IdeaBoxDAshBoardCtrl'
	}	
});