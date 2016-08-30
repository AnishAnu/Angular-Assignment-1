app.factory('myService',function($http)
{
	//service -- Search
	var myservice = {};
	myservice.getSearchServ = function(txtSearch)
	{
		
		return $http.get("http://localhost:8080/Bank?firstname="+txtSearch);
	};	
	//service --viewall
	myservice.viewAllServ= function()
	{
		
		return $http.get("http://localhost:8080/Bank/?&_start=0&_limit=50");
	};
	//delete-- row
	myservice.deleteServ= function(id)
	{
		console.log(id);
		return $http.delete("http://localhost:8080/Bank/"+id);
	};
	//edit-- row
	myservice.editServ= function(id)
	{
		console.log(id);
		return $http.get("http://localhost:8080/Bank/"+id);
	};
	//update -- row
	myservice.updateServ= function(id,newdata)
	{
		console.log(id);
		return $http.put("http://localhost:8080/Bank/"+id,newdata);
	};
	//add-new data
	myservice.addNewServ= function(newdata)
	{
		console.log(newdata);
		return $http.post("http://localhost:8080/Bank/",newdata);
	};
return myservice;
});