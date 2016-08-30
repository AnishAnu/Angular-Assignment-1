$(document).ready(function(){
	var checkHeading = 1;
	var $bankdetails = $('#bankdetails');
	var $allbankdetails = $('#allbankdetails');
	var datas = $('#allbankdetails').html();
	var headings = $('#templateheading').html();
	var start = 0;
	var msg;
	$('#prev').hide();
	$('#next').hide();

	//search----------------------------------------
       $("#search").click(function(){
       $("#xyz").remove();
       //console.log("hai");
       $bankdetails.html("");
       var title = $('#customername').val();
       //console.log(title);
            //Ajax search----------------------------
    		$.ajax({
			type:"GET",
			url : 'http://localhost:8080/Bank?firstname='+title+'&_start=0&_limit=50',
			success: function(result){
				var obj = result;
				var Search = obj.Search;
				//console.log(Search);
                $bankdetails.append(Mustache.render(headings));
				$.each(result,function(i,bank){
				$bankdetails.append(Mustache.render(datas,bank));
				});
				//console.log("After Each");
			},
		    error: function(){
		 	alert("Invalid search");
		}	
	    }); //end of ajax code for search
    	}); //end   

		  //add new customer
		  $("#submitbtn").click('submit', function(e){
              e.preventDefault();
		  	 //$bankdetails.html("");
		  	    var $ID = $('#txtId').val();
		  	    var $NAME = $('#txtName');
		  	    var $ACCOUNTNUMBER = $('#txtAccountNumber');
		  	    var $ACCOUNTTYPE = $('#txtAccountType');
		  	    var $AGE = $('#txtAge');
		  	    var $ADDRESS = $('#txtAddress');
		  	    var $CONTACT = $('#txtContact');
		  	    

		  	     var newcustomer = {
		  	                id:$ID,
		  	                firstname:$NAME.val(),
		  	                accountnumber:$ACCOUNTNUMBER.val(),
		  	                accounttype:$ACCOUNTTYPE.val(),
		  	                age:$AGE.val(),
		  	                address:$ADDRESS.val(),
		  	                phone:$CONTACT.val(),
		  	            };
		  	          //  console.log(newcustomer);
		  	          valid = true;
		  	          validationform();
		  	            if(valid)
		  	            {
		        		  //Ajax for new customer-------------------
				  	      $.ajax({
							type:"POST",
							url : 'http://localhost:8080/Bank/',
							data:newcustomer,
							success:function(newcustomer)
							{
								$('#myModal').modal('toggle');
								if(checkHeading == 1)
								{
						    		$bankdetails.append(Mustache.render(headings));
						    	}
						    	checkHeading ++;
								$bankdetails.append(Mustache.render(datas,newcustomer));
							}
						  });
		  	      		  window.alert("successfully Insert");
		  	  			}
		  	  			else
		  	  			{
		  	  				alert(valid + " " + msg);
		  	  			}
			  });   //end of add newcustomer

           //delete--------------------------
            $('#bankdetails').delegate('#deletebtn','click',function() {
            	var tr = $(this).closest('tr');
            	 $.ajax({
            	 	type:'DELETE',
            	 	url:'http://localhost:8080/Bank/'+$(this).attr('data-id'),
            	 	success:function(){
            	 	tr.fadeOut(100,function(){
            	 	$(this).remove();
            	 		});
            	 	},
            	 	error:function(){
            	 		alert('error on delete');
            	 	}
            	 });
            	 window.alert('successfully deleted');
            });

            // view all details----------------------------------------------
            $('#btnviewall').click(function(){
            	$bankdetails.html("");
            	$('#prev').hide();
            	  	//$("#xyz").remove();
            	  	//$("#customername").val('');            	
            	$.ajax({
			           type:"GET",
			           url : 'http://localhost:8080/Bank/?_limit=10',
			            success: function(result){
			            	var obj = result;
							$.each(result,function(i,obj){
					        $bankdetails.append(Mustache.render(datas,obj));
				      });             
                  }
               });  
            		$('#prev').show();
	                $('#next').show(); 
            });
// ----------------pagination----------------------
var totalrecords = 0;
var page = 1;
$(function(){
	$.ajax({
		type: "GET",
		url: 'http://localhost:8080/Bank/',
		success: function(alldata){
			totalrecords = alldata.length;
			//console.log(totalrecords);
		},
		error:function(){
			alert('error');
		}
	});
});
                       //------function  display for next and prev
							function viewAll(records) {
								$('#templateheading').show();
								$('#prev').show();
								$('#next').show();
								$('#bankdetails').append(Mustache.render(datas,records));
							}
							
// ------------------prev button
if(page <=1 ){
		$('#prev').prop("disabled",true);
	}
$('#prev').on('click',function(){
	//console.log(page);
	
	$('#bankdetails').empty();

	if(page <= totalrecords)
	{
		page = page-1;
		$('#next').prop("disabled",false);
		$.ajax({
			type:'GET',		
		    url:'http://localhost:8080/Bank/?&_page='+page+'&_limit=10', 
		    success:function(item) {
			$.each(item,function(i,records){
				viewAll(records);
			});
			},
		    error:function() {
			alert('ERROR on loading Server');
		}
	});

	}
	if(page <=1 ){
		$('#prev').prop("disabled",true);
	}
	
});
				//--------------next
				$('#next').on('click',function() {
					if(page == 0 )
					{
						$('#prev').hide();
					}
					if(page == totalrecords)
					{
						$('#next').hide();
					}
					//console.log(page);
					$('#bankdetails').empty();
					if(page < totalrecords)
					{        
						page = page+1;
						$('#prev').prop("disabled",false);
						
						$.ajax({
							type:'GET',
				     		url:'http://localhost:8080/Bank/?&_page='+page+'&_limit=10', 
					    	success:function(item) {
							$.each(item,function(i,records){
								viewAll(records);
								//console.log("viewed");
							});         
						},
						error:function() {
							alert('ERROR on loading Server');
						}
					});
					}
					if(page == totalrecords)
					{
						$('#next').prop("disabled",true);
					}
				});
// ...........................edit--------------------
    $('#bankdetails').delegate('#editbtn','click',function() {
    	$('#submitbtn').hide();
    	$('#updatebtn').show();
    	//$('#txtName').val("firstname");
       	 $('#myModal').modal('toggle');
 	  $.ajax({
         	 	type:'GET',
         	 	url:'http://localhost:8080/bank/'+$(this).attr('data-id'),
             	 	success:function(result){
             	 		//console.log(result);
             	 		 $('#txtId').val(result.id);
             	 		 txtId.disabled = true;
            	 		 $('#txtName').val(result.firstname);
            	 		 $('#txtAccountNumber').val(result.accountnumber);
            	 		 $('#txtAccountType').val(result.accounttype);
            	 		 $('#txtAge').val(result.age);
            	 		 $('#txtAddress').val(result.address);
            	 		 $('#txtContact').val(result.phone);

      	}
 	});

 });

    //------------------update----------------------
    $('#updatebtn').click(function(){

            	var $updtID = $('#txtId');
		  	    var $updtNAME = $('#txtName');
		  	    var $updtACCOUNTNUMBER = $('#txtAccountNumber');
		  	    var $updtACCOUNTTYPE = $('#txtAccountType');
		  	    var $updtAGE = $('#txtAge');
		  	    var $updtADDRESS = $('#txtAddress');
		  	    var $updtCONTACT = $('#txtContact');

		  	    var updtcustomer={
		  	                //id:$updtID.val(),
		  	                firstname:$updtNAME.val(),
		  	                accountnumber:$updtACCOUNTNUMBER.val(),
		  	                accounttype:$updtACCOUNTTYPE.val(),
		  	                age:$updtAGE.val(),
		  	                address:$updtADDRESS.val(),
		  	                phone:$updtCONTACT.val(),
		  	            };
		  	           // console.log(updtcustomer);

		  	             $.ajax({
					        type:"PUT",
					       url :'http://localhost:8080/Bank/'+$updtID.val(),
					data:updtcustomer,
					success:function(updtcustomer){
				    $bankdetails.append(Mustache.render(headings));
					$bankdetails.append(Mustache.render(datas,updtcustomer));

						}		
					});	
		  	             window.alert("successfully Updated");  	          
		  	             $('#myModal').modal('hide');
		  	             //location.reload();

    });

    // ------------------clear fields -------------
              function clearAll(records) {
								$('#txtName').val('');
								$('#txtAccountNumber').val('');
								$('#txtAccountType').val('');
								$('#txtAddress').val('');
								$('#txtAge').val('');
								$('#txtContact').val('');
							}
							 $("#addNewUser").click(function(){
                                clearAll();
                                $("#txtId").hide();
                                $("#updatebtn").hide();
                                $("#submitbtn").show();
							 });


							 //----------Validation-------------
							 function validationform()
							 {
							 	valid = true;
							 	var cusName = $('#txtName').val();
							 	var cusAccno = $('#txtAccountNumber').val();
							 	var cusAccType = $('#txtAccountType').val();
							 	var cusAge = $('#txtAge').val();
							 	var cusAddress = $('#txtAddress').val();
							 	var cusContact = $('#txtContact').val();
							   var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
							 						 	
							 	if(cusContact == null || cusContact == "" || !cusContact.match(phoneno) || cusContact.indexOf(" ")!=-1)
							 	{

							 		console.log(cusContact);
							 		msg="fill Contact";
							 		valid=false;
							 	}	
							 	if(cusAddress == null || cusAddress == "")
							 	{
							 		console.log(cusAddress);
							 		msg="fill Address";
							 		valid=false;
							 	}	
							 	if(cusAge == null || cusAge == "" || isNaN(cusAge)|| cusAge < 1 || cusAge > 100)
							 	{
							 		console.log(cusAge);
							 		msg="fill Age between 1 & 100";
							 		valid=false;
							 	}	
							 	if(cusAccType == null || cusAccType == "")
							 	{
							 		console.log(cusAccType);
							 		msg="fill A/c Type";
							 		valid=false;
							 	}	
							 	if(cusAccno == null || cusAccno == "")
							 	{
							 		console.log(cusAccno);
							 		msg="fill A/c No";
							 		valid=false;
							 	} 	
							 	if(cusName == null || cusName == "")
							 	{
							 		console.log(cusName);
							 		msg="fill name";
							 		valid=false;
							 	}					 
							 								 	
							 	
							 }
  });




