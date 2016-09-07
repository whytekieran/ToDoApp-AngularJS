var app = angular.module('MainApp', []);

app.controller('app', function($scope){
	
	var dontRun = 0;
	$scope.tasks = [];//array to hold tasks
	var taskData = localStorage['taskList']; //Get data from browser cache and pass to variable
	
	if(taskData != undefined)//each page refesh check if the variable isnt empty and if it isnt
	{
		//We pass it to tasks array which is looped over using ng-repeat, this outputs our tasks even if page 
		//has been refreshed. Tasks are outputted as list items because ng-repeat attribute for tasks array is inside
		//a HTML list item
		$scope.tasks = JSON.parse(taskData);	
	}
	
	$scope.searchEnter = function(){//keyup event for task input field
		if(event.keyCode == 13 && $scope.task != null)//check if enter key was pressed and input is not empty
		{
			$scope.addTask(); //call the add task function, otherwise nothing 
		}
	}
	
	$scope.addTask = function(){
		//When created take the value 'task' which is binded to scope using ng-model and push to the tasks array as 
		//a JSON object along with an status = false property
		//This array will then be looped over using ng-repeat back in the HTML
		$scope.tasks.push({'taskMessage':$scope.task, 'status':"false"});
		localStorage['taskList'] = JSON.stringify($scope.tasks); //add the array to the browser cache (in case of refresh)
		$scope.task = "";	//make the input filed empty after new task has been added
	}
	
	//double click event for the task inside the list. If the task is double clicked we find which task was clicked 
	//then make its content editable. If we double click again it stops being editable
	$scope.contentEdit = function(task){ //passing the index of the edited item
		
		if(event.target.contentEditable == "false")
		{
			event.target.contentEditable = "true";
		}
		else
		{
			event.target.contentEditable = "false";
		}
		
		$scope.tasks[task].taskMessage = event.target.innerText;
		localStorage['taskList'] = JSON.stringify($scope.tasks);
	}
	
	//key down eventfor task inside the list. If we hit enter key call the contentEdit() function which stops editable
	$scope.editEnter = function(task){//passing the index of the item thats been edited
		if(event.keyCode == 13)
		{
			$scope.contentEdit(task);
		}
	}
	
	//change event for checkbox which is checked if task is completed. We pass the index of the clicked checkbox into
	//function and check its status. if true(complete) then make false(incomplete) and vice versa. This event is triggered
	//when checkbox is clicked.
	$scope.statusChanged = function(x){

		if($scope.tasks[x].status == "true")
		{
			$scope.tasks[x].status = "false";
		}
		else if($scope.tasks[x].status == "false")
		{
			$scope.tasks[x].status = "true";
		}
		
		localStorage['taskList'] = JSON.stringify($scope.tasks);
	}
});


