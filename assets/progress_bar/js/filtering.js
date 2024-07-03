

	
	function comp_c(){


		


		var code_C = $("[name = 'code']").val();
			
			
			$(".resp1").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
		
				//displaying business unit
				$.ajax({
				type:"POST",
				url:"../payroll/ajaxprocess.php?request=l_bu",
				data : { code_C:code_C },
				success:function(data){
						
					data = data.trim();	
					
					$(".resp1").hide();
					$("#bu").hide();
					$(".business_unit").html(data);
			

						//<!--------------- hide if the selected is no value ---------------------->
							
							if(code_C == ""){
								
								$("#bu").show();
								$(".business_unit").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->
				}




			
			});				
			

			
	}
	
	function bunit_u(){


		var code_C = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();



			$(".resp2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
			
			$.ajax({
				type:"POST",
				url:"../payroll/ajaxprocess.php?request=l_dept",
				data : { code_C:code_C, b_code:b_code },
				success:function(data){
						
					data = data.trim();	
					 
					$(".resp2").hide();
					$("#dept").hide();
					$(".company").html(data);					

						//<!--------------- hide if the selected is no value ---------------------->
							
							if(b_code == ""){
								
								$("#dept").show();
								$(".company").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->

				}
			
			});
	}
	


	function dept(){




		var c_code = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();
		var d_code = $("[name = 'dept_code']").val();
		

		
			//employee
			
			$(".respSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

			$.ajax({
				type:"POST",
				url:"../payroll/ajaxprocess.php?request=l_sec",
				data : { c_code:c_code, b_code:b_code, d_code:d_code },
				success:function(data){
						
					data = data.trim();	
		
					$(".respSection").html('');
					$("#sect").hide();
					$(".section").html(data);

						//<!--------------- hide if the selected is no value ---------------------->
							
							if(d_code == ""){
								
								$("#sect").show();
								$(".section").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->

				}
			
			});
						
	
	}

	function sect(){

	

		var c_code = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();
		var d_code = $("[name = 'dept_code']").val();
		var sect_code = $("[name = 'sect_code']").val();

			$(".respSubSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');


			$.ajax({
				type:"POST",
				url:"../payroll/ajaxprocess.php?request=l_subsec",
				data : { c_code:c_code, b_code:b_code, d_code:d_code, sect_code:sect_code },
				success:function(data){
					
					data = data.trim();					
					
					$(".respSubSection").html('');
					$("#sub_sect").hide();
					$(".sub_section").html(data);


						//<!--------------- hide if the selected is no value ---------------------->
							
							if(sect_code == ""){
								
								$("#sub_sect").show();
								$(".sub_section").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->


				}
			
			});	

	}

	function sub_sect(){

		

		var c_code = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();
		var d_code = $("[name = 'dept_code']").val();
		var sect_code = $("[name = 'sect_code']").val();
		var sub_sect_code = $("[name = 'sub_sect_code']").val();
 
 

		$(".employeeFilter").hide();
		$(".showEmp").html('');

		
			$(".respUnit").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');


			$.ajax({
				type:"POST",
				url:"../payroll/ajaxprocess.php?request=l_unit",
				data : { c_code:c_code, b_code:b_code, d_code:d_code, sect_code:sect_code, sub_sect_code:sub_sect_code },
				success:function(data){
					
					data = data.trim();	
					
					$(".respUnit").html('');
					$("#unit").hide();
					$(".unit").html(data);


						//<!--------------- hide if the selected is no value ---------------------->
							
							if(sub_sect_code == ""){
								
								$("#unit").show();
								$(".unit").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->

				}
			
			});	

	}


	function unit(){

			
		//<! ------------ dtr ---------->
			$(".discutoff").fadeOut();
		//<! --------- end of dtr ---------->

	}
	

		// ----Save Credit Limit for Regular Employees ----	

	// function saveACL_reg(){
	// 	var val = document.getElementById('check_reg').value;		
	// 	var acl_value_reg = document.form1.allowed_amount.value;		
	// 	//var module_code = document.form1.module_code.value;		
	// 	var emp_id = "";
	// 	// alert(module_code);
	// 	// return;
	// 	var a = document.getElementsByName('empid[]');
	// 	for(var i = 0;i<a.length;i++) {
	// 		emp_id += a[i].value+"&";				
	// 	}


	// 		$.ajax({
	// 			type: "POST",
	// 			url: "../payroll/template/EmpCredit/save_acl_amount.php?request=save_acl_reg",
	// 			data: { acl_value_reg:acl_value_reg, emp_id:emp_id, val:val },
	// 			success: function(data){
	// 				//alert(data);	
	// 				if(data == "Ok"){

	// 					alert("Save!");
	// 					//window.location.reload();
	// 				}
	// 				else{
	// 					alert(data);
	// 				}
	// 			}
	// 		});
	// }
	
	// ----End of Save Credit Limit for Regular Employees ----

	// ----Save Credit Limit for Contractual Employees ----

	// function saveACL_con(){
	// 	var val = document.getElementById('check_con').value;		
	// 	var acl_value_con = document.form1.allowed_amount.value;		
	// 	//var module_code = document.form1.module_code.value;		
	// 	var emp_id = "";
	// 	// alert(module_code);
	// 	// return;
	// 	var a = document.getElementsByName('empid[]');
	// 	for(var i = 0;i<a.length;i++) {
	// 		emp_id += a[i].value+"&";				
	// 	}


	// 		$.ajax({
	// 			type: "POST",
	// 			url: "../payroll/template/EmpCredit/save_acl_contractual.php?request=save_acl_con",
	// 			data: { acl_value_con:acl_value_con, emp_id:emp_id, val:val },
	// 			success: function(data){
	// 				if(data == "Ok"){
	// 					alert("Save!");
	// 					// window.location.reload();
	// 				}
	// 				else{
	// 					alert(data);
	// 				}
	// 			}
	// 		});
	// }

	// ----Save Credit Limit for Contractual Employees ----

	




	
