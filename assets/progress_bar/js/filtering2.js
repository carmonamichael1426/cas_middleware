
// For charge_form.php (Employee's Credit)
	
	function comp_c2(){


		


		var code_C = $("[name = 'code']").val();
			
			
			$(".resp1").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
		
				//displaying business unit
				$.ajax({
				type:"POST",
				url:"../employee/ajaxprocess.php?request=l_bu2",
				data : { code_C:code_C },
				success:function(data){
						
					data = data.trim();	
					
					$(".bub").hide();
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
	
	function bunit_u2(){


		var code_C = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();



			$(".resp2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
			
			$.ajax({
				type:"POST",
				url:"../employee/ajaxprocess.php?request=l_dept2",
				data : { code_C:code_C, b_code:b_code },
				success:function(data){
						
					data = data.trim();	
					 
					$(".resp2").hide();
					$("#dept").hide();
					$(".depo").hide();
					$(".company").html(data);					

						//<!--------------- hide if the selected is no value ---------------------->
							
							if(b_code == ""){
								
								// $("#dept").show();
								$(".company").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->

				}
			
			});
	}
	


	function dept2(){




		var c_code = $("[name = 'code']").val();
		var b_code = $("[name = 'b_code']").val();
		var d_code = $("[name = 'dept_code']").val();
		

		
			//employee
			
			$(".respSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

			$.ajax({
				type:"POST",
				url:"../employee/ajaxprocess.php?request=l_sec",
				data : { c_code:c_code, b_code:b_code, d_code:d_code },
				success:function(data){
						
					data = data.trim();	
		
					$(".respSection").html('');
					$("#sect").hide();
					// $(".depo").hide();
					$(".section").html(data);

						//<!--------------- hide if the selected is no value ---------------------->
							
							if(d_code == ""){
								
								$("#sect").show();
								// $(".depo").hide();
								$(".section").html('');	
							}


						//<!----------- End  hide of if the selected is no value ---------------------->

				}
			
			});
						
	
	}

	