var app = angular.module("myApp",[]);
         //custom directive--------------------------
app.directive('cusDir',function(){
	return{
		restrict:'AE',
		templateUrl:'cusDir.html'
	}
});
app.controller("controller1", function($scope,myService){	

	
				    //search------------------------------------------
				    $scope.searchBy = function(){		    
				    getSearch();
				    	function getSearch(){
				    	myService.getSearchServ($scope.txtSearch)
				    	.success(function(response){				    	 
				         $scope.view1 = response;
				    	})
				    	.error(function(error){
				    	 $scope.view1 = error.statusText;
				    	});
				    	};
				    };
				    //view all----------------------------------------
				    $scope.viewAll = function()
				    {
				    	
     			         viewAllDetails();
				    	 function viewAllDetails()
				    	 {				    	 	
				    	 	myService.viewAllServ()
				    	 	.success(function(response)
				    	 	{
				    	 		alert("load all");
				    	 		$scope.view1 = response;
				    	 	})
				    	 	.error(function(error)
				    	 	{				    	 		
				    	 		$scope.view1 = error.statusText;
				    	 	});
				    	 };
				    };
				    //Delete data-------------------------------------------
				    $scope.removeRow = function(id){				  
				         deletedata(id);
				    	 function deletedata(id)
				    	 {			    	 	
				    	 	myService.deleteServ(id)
				    	 	.success(function(response)
				    	 	{		    	 		
				    	 		
				    	 		$scope.view1 = response;
				    	 	})
				    	 	.error(function(error)
				    	 	{				    	 	
				    	 		$scope.view1 = error.statusText;
				    	 	});
				    	 };

				    }; 
				    //edit row--------------------------------------------------
				    $scope.editRow = function(id){				    	
				    	editdata(id);
				    	function editdata(id)
				    	{				    	
				    		myService.editServ(id)
				    		.success(function(response)
				    		{				    			
				    			$scope.newdata = response;
				    		})
				    		.error(function(error)
				    		{				    			
				    			$scope.newdata = error.statusText;
				    		});
				    	};
				    };
				    //update -- row---------------------------------------------
				    $scope.updateRow = function(id,newdata){				    	
				    	updatedata(id);
				    	function updatedata(id,newdata)
				    	{				    		
				    		myService.updateServ(id,$scope.newdata)
				    		.success(function(response)
				    		{				    			
				    			$scope.view1 = [response];
				    		})
				    		.error(function(error)
				    		{				    			
				    			$scope.view1 = error.statusText;
				    		});
				    	};
				    };
				    //add- new data------------------------------------------------
				    $scope.addNewRow = function(){				    	
				    	addNewdata();
				    	function addNewdata()
				    	{				    		
				    		myService.addNewServ($scope.newdata)
				    		.success(function(response)
				    		{				    		
				    			$scope.view1 = [response];
				    		})
				    		.error(function(error)
				    		{				    		
				    			$scope.view1 = error.statusText;
				    		});
				    	};
				    };
				    //Hide & show-----------------------------------------------
				    $scope.Addnewcus=function(){

					$scope.submithide=false;
					$scope.updateHide=true;
					$scope.newdata={};
					
					}
					$scope.editHide=function(){
					$scope.submithide=true;
					$scope.updateHide=false;
					}
});


				   

	