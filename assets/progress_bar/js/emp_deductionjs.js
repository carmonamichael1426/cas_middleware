	$(document).ready(function(){
		$('select#ded_yrs').on('change', function(){
			var date_deduction = $('select#ded_yrs').val();
			$('div.deductionlist').html('<b class="fnt14"><img src="../assets/img/loading.gif" width="20"> Please wait..');
			$.post('template/emp_deductions/emp_ajaxpage.php', {'date_deductionlist':date_deduction}, function(data){
				setTimeout(function(){$('div.deductionlist').html(data); }, 1000);		
			});
		});
	});