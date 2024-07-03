
	function SetAmortization(code){
		/* PARTIAL DEDUCTION MODAL ================================ */
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SETUP</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?amortizationdSetup='+code},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Show Sched.',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  	var amtApproved = $('input.amtApproved').val();
				  	var amtDeduction = $('input.amtDeduction').val();
				  	var scheduled_date = $('input#scheduled_date').val();

				  	if(amtApproved.replace(/\s/g, '') == ''){
				  		$('input.amtApproved').focus();
				  	}else if(amtDeduction.replace(/\s/g,  '') == '' || amtDeduction.replace(/\s/g,  '') == '0.00'){
				  		$('input.amtDeduction').focus();
				  	}else if(scheduled_date.replace(/\s/g, '') == ''){
				  		$('input#scheduled_date').focus();
				  	}else{
					  	$.post('template/CashAdvance/ca_actg-ajaxpage.php', {'sched_test':code, 'amtApproved':amtApproved, 'amtDeduction':amtDeduction, 'scheduled_date':scheduled_date}, function(data){
					  		$('div.schedlist').html(data);
					  	});
				  	}
				}
				},{
				label: 'Set Sched.',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					var amtApproved = $('input.amtApproved').val();
				  	var amtDeduction = $('input.amtDeduction').val();
				  	var scheduled_date = $('input#scheduled_date').val();
				  	if(amtApproved.replace(/\s/g, '') == ''){
				  		$('input.amtApproved').focus();
				  	}else if(amtDeduction.replace(/\s/g,  '') == '' || amtDeduction.replace(/\s/g,  '') == '0.00'){
				  		$('input.amtDeduction').focus();
				  	}else if(scheduled_date.replace(/\s/g, '') == ''){
				  		$('input#scheduled_date').focus();
				  	}else{
						var con = confirm("This iformation will set as final schedule for CA deduction. Are you sure you want to proceed? Click 'OK' to proceed.");
						if(con == true){
							$.post('template/CashAdvance/ca_actg-ajaxpage.php', {'save_schedule':code, 'amtApproved':amtApproved, 'amtDeduction':amtDeduction, 'scheduled_date':scheduled_date}, function(data){
								error_dialog.close();
								// $('.try').html(data);
								window.location.reload();
							});
						}
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 5.5%', 'height':'460px'});
	}

	// GET FILNAME
	function upldfile_name(val){
		var filname = val.replace(/\\/g,'/').replace( /.*\//, '' );
		$('input[id=filenameItem]').val(filname);
	};

	function schedulehistory(code){
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION HISTORY</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?historySchedule='+code},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 5.5%', 'height':'460px'});
	}



	// function imgSelectunprocess(){
		// 		/* CHECK UNCHECK EMPLOYEE (UNDEDUCTED EMPLOYEE) --------------------------- */
		// $('img#undedimg').on('click', function(){
		// 	var nameValue= $(this).attr('name');
		// 	var imgV = $(this).attr('src').split('/')[3];
		// 	if(imgV == 'uncck.png'){
		// 		$(this).attr({'src':'../assets/icon_index/cck.png'});
		// 	}else{
		// 		$(this).attr({'src':'../assets/icon_index/uncck.png'});
		// 	}
		// });
		// /* ------------------------------------------------------------------------ */
	// }


	$(document).ready(function(){

		$('img.imglclick').css({'cursor':'pointer'});
		$('img.imgreg').css({'cursor':'pointer'});

		$('img.imglclick').on('click', function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
				$('img.imgreg').attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
				$('img.imgreg').attr({'src':'../assets/icon_index/uncck.png'});
			}
		});

		$('img.imgreg').on('click', function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});


		// GET CUTOFF DATE ===============================================================
		$('select.dateslect').on('change', function(){
			var yearDte = $('select#yearDte').val();
			var ctoffDte = $('select#ctoffDte').val();
			var typequery = $(this).attr('name');
			var img = '<div class="col-md-12 pdd" style="padding:10% 0%;text-align:center"><img src="../assets/img/loading.gif" width="25"> Please wait...</div>';
			$('div.deductiontable').html(img);
			$.post('template/CashAdvance/ca_actg-ajaxpagetable.php', {'amortized_camonitoring':yearDte+'-'+ctoffDte, 'querytype':typequery}, function(data){
				setTimeout(function(){ $('div.deductiontable').html(data); }, 500);
			});
		});


		// GET DEDUCTINS DATE INFORMATION ================================================
		$('select.date_dedcutions').on('change', function(){

			var yearDte = $('select#yearDte').val();
			var ctoffDte = $('select#ctoffDte').val();
			var typequery = $(this).attr('name');
			var loaderdiv = '<span class="col-md-12 fnt14" style="text-align:center;padding:10% 0%;font-weight:bold;"><img src="../assets/img/loading.gif" width="25px"> Please wait...</span>';
			$('div.deductiontable').html(loaderdiv);
			$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'aiddeduction_camonitoring':yearDte+'-'+ctoffDte}, function(data){
				console.log(data);
				$('div.deductiontable').html(data);
			});
		});



		/* GET PDF REPORT  (SUMMARY) ---------------------------------------------------------------*/
		$('#btn-ca-audited-summary-pdf').on('click', function(){
			window.open('template/CashAdvance/ca_iad-reportPDF.php?type=ca_deduction-summary&date='+$('select#yearDte').val()+'-'+$('select#ctoffDte').val(), '_blank');
		});


		/* GET PDF REPORT  (SLIP) ---------------------------------------------------------------*/
		$('#btn-ca-audited-slip-pdf').on('click', function(){
			window.open('template/CashAdvance/ca_iad-reportPDF.php?type=ca_deduction-slip&date='+$('select#yearDte').val()+'-'+$('select#ctoffDte').val(), '_blank');
		});


		$('.scheduleAMRT').on('click', function(){
			var code = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SCHEDULE</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?amortizationdSchedule='+code},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Change Sched.',
				cssClass: 'btn-default btn-fill btn-sm pull-left ',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	SetAmortization(code);
				}
				},{
				label: 'Amrt. History',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(error_dialog) {
				  	schedulehistory(code);
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 5.5%', 'height':'460px'});
				$('.modal')[0].remove();

		});



		/* REGULAR CA AMORTIZATION */
		$('button.reg_setamrt').on('click', function(){
			req_id = [];
			$('img.imgreg').each(function(data){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					req_id.push($(this).attr('id'));
				}
			});

			if(req_id.length == 0){
					alert('Please select employee from the table.');
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SETUP</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?amortizationsetuP_regular'},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  		$.post('template/CashAdvance/ca_actg-ajaxpage.php?saveamort_regca', {'id_req':req_id}, function(data){
					  			error_dialog.close();
					  			window.location.reload();
					  		});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'2% 6.5%'});
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'85px'});
					$('.modal')[0].remove();
			}

		});


		$('button.deduction_setup').on('click', function(){
			req_id = [];
			$('img.imgreg').each(function(data){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					req_id.push($(this).attr('id'));
				}
			});

			if(req_id.length == 0){
					alert('Please select employee from the table.');
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AS DEDUCTION</b>',
					message: "<span class='fnt14'>This information will set as basis for employee's deduction on the designated date.</span>",
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  		$.post('template/CashAdvance/ca_actg-ajaxpage.php?setdeduction', {'id_req':req_id}, function(data){
					  			error_dialog.close();
					  			window.location.reload();
					  		});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'2% 6.5%'});
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'85px'});
			}

		});




		/* SET FOR RELEASING .............................. */
		$('button.releasing_setup').on('click', function(){
			req_id = [];
			$('img.imgreg').each(function(data){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					req_id.push($(this).attr('id'));
				}
			});

			if(req_id.length == 0){
					alert('Please select employee from the table.');
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET FOR RELEASING</b>',
					message: "<span class='fnt14'>This information will set as basis for releasing employee's Cash Advance on the designated date.</span>",
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  		$.post('template/CashAdvance/ca_actg-ajaxpage.php?setreleasing_amount', {'data_list':req_id}, function(data){
					  			error_dialog.close();
					  			window.location.reload();
					  		});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'2% 6.5%'});
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'85px'});
			}

		});
		/* ................................................ */


		$('.deduction_setup_POST').on('click', function(){
			var dateselect = $('input#auditingdate').val();
			req_id = [];
			$('img.imgreg').each(function(data){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					req_id.push($(this).attr('id'));
				}
			});

			if(req_id.length == 0 &&  dateselect.replace(/\s/g, '') != ''){
					alert('Please select employee from the table.');
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AS DEDUCTION</b>',
					message: "<span class='fnt14'>This information will set as basis for employee's deduction on the designated date.</span>",
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  		$.post('template/CashAdvance/ca_actg-ajaxpage.php?setdeduction_post', {'id_req':req_id, 'selectdate':dateselect}, function(data){
					  			error_dialog.close();
					  			window.location.reload();
					  		});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'2% 6.5%'});
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'85px'});
			}
		});

		/* FUNCTION GET POST DEDUCTION DATA ========================================== */
		$('#auditingdate').on('change', function(){
			var date_select = $(this).val();
			$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'postaudit_data':date_select}, function(data){
				$('div.auditdeduction').html(data);
			});
		});





		/* ------------------ FUNCTION SELECT BUSINESS UNIT ----------------------------- */

		$('.btnBUselect').on('click', function(){
			var catype = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?selectBU'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

						var bulist = '';
						$('img.imgBU').each(function(){
							var imgtype = $(this).attr('src').split('/')[3];
							if(imgtype === 'cck.png'){
								bulist +=$(this).attr('id')+'|';
							}
						});
						window.open('?id=ca_monitoring&bu='+bulist+'&caTYPE='+catype, '_self');
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5%'});
				message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'450px'});
				$('.modal')[0].remove();

		});




		/* ----------- BUSINESS UNIT SELECT FINALIZATION AMOUNT ------------------------------- */
		$('.finalizationbtnBUselect').on('click', function(){
			var catype = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?finalizationselectBU'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

						var bulist = '';
						$('img.imgBU').each(function(){
							var imgtype = $(this).attr('src').split('/')[3];
							if(imgtype === 'cck.png'){
								bulist +=$(this).attr('id')+'|';
							}
						});
						window.open('?id=ca_finalization&bu='+bulist+'&catype='+catype, '_self');
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5%'});
				message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'450px'});
		});





		/* ------------- SAVE FINAL AMOUNT -------------------------------------------------------  */

		$('.finalizationsaveAmt').on('click', function(){
			var req_id= $(this).attr('id');
			var amrtset = $('.amtslash'+req_id).val().replace(/\s/g, '');
			if(amrtset == '' || amrtset == '0.00'){
				alert("Amount must not be zero nor empry. Please provide the designated amount.");
				 $('.amtslash'+id).focus();
			}else{

			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET FINAL AMOUNT</b>',
				message: "<span class='fnt14'>The amount you've set will the basis on to be provided on the designated employee.\n\n Are you sure you want to proceed this action?</span>",
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

						$.post('template/CashAdvance/ca_actg-ajaxpage.php?setamountfinal', {'id_req':req_id, 'amrtset':amrtset}, function(data){
							error_dialog.close();
							$('tr#tr'+req_id).fadeOut();
						});
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2% 6.5%'});
				message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'120px'});
			}
		});



		$('.confirmAMtset').on('click', function(){
			var amount_id = [];
			var trig = 0;
			$('input#money').each(function(){
				var amrtset = $(this).val().replace(/\s/g, '');
				var req_id= $(this).attr('name');
				if(amrtset == '' || amrtset === '0.00'){
					trig = 1;
				}else{
					amount_id.push(amrtset+'|'+req_id);
				}
			});


			if(trig == 1 || (amount_id.length == 0)){
				alert("Process can't be completed, amount must not be zero nor empty. Please provide the designated amount.");
			}else{

			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET FINAL AMOUNT</b>',
				message: "<span class='fnt14'>The amount you've set will the basis on to be provided on the designated employee.\n\n Are you sure you want to proceed this action?</span>",
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					// alert(amount_id);
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?setamountfinal_overall', {'amount_id':amount_id}, function(data){
							error_dialog.close();
							window.location.reload();
						});
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2% 6.5%'});
				message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'120px'});
			}
		});



		/* ----------- CHANGE DEDUCTIONA AMOUNT ------------------------------- */
		$('.alteramountDeduction').on('click', function(){
			var catype = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CHANGE DEDUCTION AMOUNT</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?changeamountdeduction'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

						var bulist = '';
						$('img.imgBU').each(function(){
							var imgtype = $(this).attr('src').split('/')[3];
							if(imgtype === 'cck.png'){
								bulist +=$(this).attr('id')+'|';
							}
						});
						window.open('?id=ca_finalization&bu='+bulist+'&catype='+catype, '_self');
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2% 6.5%'});
				message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'450px'});
				$('.modal')[0].remove();
		});



		/* MODAL BALANCE ENTRY  ----------------------------------------------- */
		$('.special_balentry').on('click', function(){
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CASH ADVANCE BALANCES SETUP</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?ca_specialbanlancesentry'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

					var emp_searchHR = $('input#emp_searchHR').attr('name');
					var emp_name= $('input#emp_searchHR').val();
					var empsalaryno = $('span.empsalaryno').text();
					var cabalances = $('input.cabalances').val();

					if(emp_searchHR.replace(/\s/g, '') != ''
					|| emp_name.replace(/\s/g, '') != ''){
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'entryCAbalance':'',
							'emp_searchHR':emp_searchHR,
							'empsalaryno':empsalaryno,
							'cabalances':cabalances}, function(data){
							error_dialog.close();
							window.location.reload();
							// $('.contanerDIV').html(data);
						});
					}else{
						alert("Process can't be completed. Please provide the information needed to proceed.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'230px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */



		/* MODAL BALANCE ENTRY  ----------------------------------------------- */
		$('.cabalanceUpdate').on('click', function(){
			var idcode = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CASH ADVANCE BALANCES UPDATE</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?cabalanceupdate='+idcode},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-ca_ledger btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

					var caregbalances = $('input.caregbalances').val();
					var caspecbalances = $('input.caspecbalances').val();

					if(caregbalances.replace(/\s/g, '') != ''
					|| caspecbalances.replace(/\s/g, '') != ''){
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'updatebalances':'',
							'caregbalances':caregbalances,
							'caspecbalances':caspecbalances,
							'idcode':idcode}, function(data){
							error_dialog.close();
							window.location.reload();
						});
					}else{
						alert("Process can't be completed. Please provide the information needed to proceed.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'220px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */


		/* FUNCTION REMOVE BALANCE -------------------------------------------- */
		$('button.removeBAl').on('click', function(){
			var id = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> REMOVE BALANCES</b>',
				message: "<span class='fnt14'>This process will automatically affect CA balances' recording.\n Do you want to proceed this action?</span>",
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'removeIDbalances':id}, function(data){
							error_dialog.close();
							$('tr#'+id).fadeOut();
						});
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2% 6.5%'});
				message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'80px'});
				$('.modal')[0].remove();
		});
		/* -------------------------------------------------------------------- */





		/* MODAL BALANCE ENTRY  ----------------------------------------------- */
		$('.changeDEDUCTION').on('click', function(){
			var id = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> INCREASE DEDUCTION AMOUNT</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?changedDEDUCTIONform='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'History',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(error_dialog) {

					var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_MEDIUM,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> INCREASE DEDUCTION HISTORY</b>',
						message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
						},
						data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?increaseHISTORY='+id},
						draggable: true,
						closable: false,
						buttons: [{
						label: 'Close',
						cssClass: 'btn-default btn-fill btn-sm',
						action: function(error_dialog) {
							error_dialog.close();
						}
						}]
						});
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
						message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


				}
				},{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					var scheduled_date = $('input#scheduled_date').val();
					var totalbalance = $('input.totalbalance').val();

					if(scheduled_date.replace(/\s/g, '') != ''
					|| totalbalance.replace(/\s/g, '') != ''){
						var con = confirm("Do you want to increase the amount for deduction to this employee? Click 'OK' to proceed.");
						if(con == true){
							$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'saveincreaseDEDUCTION':'',
								'codeid':id,
								'scheduled_date':scheduled_date,
								'totalbalance':totalbalance}, function(data){
								error_dialog.close();
							});
						}
					}else{
						alert("Process can't be completed. Please provide the information needed to proceed.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'330px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */





		/* ACCOUNTING ACCESS (IN-CASH PAYMENT) -------------------------------- */
		$('a.caincash').on('click', function(){
			var id = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20">CASH PAYMENT</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?incashpaymentform='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'310px'});
				$('.modal')[0].remove();
		});
		/* -------------------------------------------------------------------- */



		/* CA MONITORING MODAL ------------------------------------------------ */
		$('a.cadeductiondetail').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var id = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpagetable.php?ca_deductionmonitoring='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
					$('div.dataTables_info')[1].remove();
					$('div.dataTables_paginate')[1].remove();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 3.5%', 'height':'650px'});
				$('.modal')[0].remove();
		});
		/* -------------------------------------------------------------------- */


		/* CA LEDGER MONITORING ----------------------------------------------- */
		$('a.empLedger').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var id = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA LEDGER</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpagetable.php?ca_ledger='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
					$('div.dataTables_info')[1].remove();
					$('div.dataTables_paginate')[1].remove();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.27% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'390px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */


		/* CA EMPLOYEE OUTSTANDING BALANCE LEDGER ----------------------------- */
		$('.ca_ledgerOUTSTANDING').on('click', function(){
			var id = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> EMPLOYEE CA - BALANCE MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpagetable.php?caledger_outstandingbalance='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
					$('div.dataTables_info')[1].remove();
					$('div.dataTables_paginate')[1].remove();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.7% 4%'});
				message_diag.getModalFooter().css({'padding':'0.5% 4%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 4%', 'height':'550px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */





		/* CA FINALIZATION DATE SELECTION ------------------------------------- */
		$('select.releasingSELECTION').on('change', function(){
			var date = $(this).val().replace(/\s/g, '');
			var catype = $(this).attr('id').replace(/\s/g, '');
			var bu = $(this).attr('name').replace(/\s/g, '');

			$.post('template/CashAdvance/ca_actg-ajaxpagetable.php',
				{'releasingdate_selection':date, 'ca_type':catype, 'buS':bu},
				function(data){
					$('div.deductiontable').html(data);
				})
		});
		/* -------------------------------------------------------------------- */



		/* PAYROLL DEDUCTION LIST SELECTION ----------------------------------- */
		$('select.ded_dateselect').on('change', function(){
			var day = $('select#ded_day').val().replace(/\s/g, '');
			var month = $('select#ded_month').val().replace(/\s/g, '');
			var year = $('select#ded_year').val().replace(/\s/g, '');

			$('div.deductiontable').html('<img src="../assets/img/loading.gif" width="23">&nbsp;&nbsp;Pelase Wait...');
			$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'selectdeduction_posted':'', 'date':year+'-'+month+'-'+day}, function(data){
				$('div.deductiontable').html(data);
			});

		});
		/* -------------------------------------------------------------------- */



		/* PAYROLL DEDUCTION LIST SELECTION ----------------------------------- */
		$('select.unprocesseddate').on('change', function(){
			var day = $('select#ded_day').val().replace(/\s/g, '');
			var month = $('select#ded_month').val().replace(/\s/g, '');
			var year = $('select#ded_year').val().replace(/\s/g, '');
			$('div.deductiontable').html('<img src="../assets/img/loading.gif" width="23">&nbsp;&nbsp;Pelase Wait...');
			$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'selected_unprocesseddate':'', 'date':year+'-'+month+'-'+day}, function(data){
				$('div.deductiontable').html(data);
			});
		});
		/* -------------------------------------------------------------------- */


		/* CHECK UNCHECK EMPLOYEE (UNDEDUCTED EMPLOYEE) --------------------------- */
		$('img#undedimg').on('click', function(){
			var nameValue= $(this).attr('name');
			var imgV = $(this).attr('src').split('/')[3];
			if(imgV == 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});
		/* ------------------------------------------------------------------------ */


		/* SELECT ALL UNPORCESS --------------------------------------------------- */
		$('img#unprcsltall').on('click', function(){
			var imgV = $(this).attr('src').split('/')[3];
			if(imgV == 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
				$('img[id^=undedimg]').attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
				$('img[id^=undedimg]').attr({'src':'../assets/icon_index/uncck.png'});
			}
		});
		/* ------------------------------------------------------------------------ */




		/* CA ACCOUNTING DISPPROVED ------------------------------------------------ */
		$('button.actgdisapproved').on('click', function(){
			var req_id = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CANCEL REQUEST</b>',
			message: "<span class='pdd_1' class='fnt14'><div class='col-md-12 pdd_1'></div>This CA request will tag as <b>disapproved</b> for the final approval. Do you want to proceed?</span>",
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
			  	error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		$.post('template/CashAdvance/ca_actg-ajaxpage.php', {'disapprovedCAREUQUEST':req_id}, function(data){
			  			error_dialog.close();
			  			window.location.reload();
			  		});
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'2% 6.5%'});
			message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'85px'});
			$('.modal')[0].remove();

		});
		/* ------------------------------------------------------------------------- */




		/* ........................................................................... */
		/* ........................................................................... */
		/* AR FUNCTION CATEGORY ...................................................... */

			$('.arBULIST').on('click', function(){
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM	,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA MONITORING</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?selectBU'},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
							var bulist = '';
							$('img.imgBU').each(function(){
								var imgtype = $(this).attr('src').split('/')[3];
								if(imgtype === 'cck.png'){
									bulist +=$(this).attr('id')+'|';
								}
							});
							window.open('?id=ar_balances&bu='+bulist, '_self');
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.5% 5%'});
					message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'450px'});
					$('.modal')[0].remove();

			});


		/* OUTSTANDING BALANCES ...................................................... */
		$('.outstandingbalance').on('click', function(){
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> OUTSTANDING BALANCES SETUP</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?AR_outstandingbalanceform'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {

					var emp_searchHR = $('input#emp_searchHR').attr('name');
					var emp_name= $('input#emp_searchHR').val();
					var empsalaryno = $('span.empsalaryno').text();
					var cabalances = $('input.cabalances').val();

					if(emp_searchHR.replace(/\s/g, '') != ''
					|| emp_name.replace(/\s/g, '') != ''){
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'ar_savingBALANCES':'',
							'emp_searchHR':emp_searchHR,
							'empsalaryno':empsalaryno,
							'cabalances':cabalances}, function(data){
							error_dialog.close();
							window.location.reload();
						});
					}else{
						alert("Process can't be completed. Please provide the information needed to proceed.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'200px'});
				$('.modal')[0].remove();


		});

		/* ........................................................................... */



		/* MODAL BALANCE ENTRY  ----------------------------------------------- */
		$('.ar_updateBALANCE').on('click', function(){
			var idcode = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CASH ADVANCE BALANCES UPDATE</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?ar_balanceupdateform='+idcode},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-ca_ledger btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					var caspecbalances = $('input.caspecbalances').val();
					if(caspecbalances.replace(/\s/g, '') != ''){
						$.post('template/CashAdvance/ca_actg-ajaxpage.php?', {'arupdate_execbalances':'',
							'caspecbalances':caspecbalances,
							'idcode':idcode}, function(data){
							error_dialog.close();
							window.location.reload();
						});
					}else{
						alert("Process can't be completed. Please provide the information needed to proceed.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
				message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'180px'});
				$('.modal')[0].remove();


		});
		/* -------------------------------------------------------------------- */




		// .....................................
		// .....................................
		// .....................................
		// .....................................
		/* CA AUDIT SELECTION DATE ....................................*/
		$('input.selectedDATE').on('change', function(data){
		window.location.href="?id=ca_audit&date_deduction="+$(this).val();
		});






		/* ................................... */
		/* ................................... */
		/* ................................... */
		/* ................................... */
		/* CA IAD FILTER BU .................. */
		$('.iadbtnBUfilter').on('click', function(){
			var catype = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?selectBU'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					var bulist = null;
					$('img.imgBU').each(function(){
						var imgtype = $(this).attr('src').split('/')[3];
						if(imgtype === 'cck.png'){
							bulist =$(this).attr('id');
						}
					});

					$('.iadbtnBUfilter').attr({'id':bulist});
					var dateSELECT = $('select#RELyrs_').val()+'-'+$('select#RELmth_').val()+'-'+$('select#RELday_').val();
					$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'filter_masterfile':'', 'bus':bulist, 'date_slc':dateSELECT}, function(data){
						$('.msfl_div').html(data);
						error_dialog.close();
					});
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5%'});
				message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'420px'});
				$('.modal')[0].remove();


		});
		/* ........................................................................... */




			/* ................................... */
		/* ................................... */
		/* ................................... */
		/* ................................... */
		/* CA IAD FILTER BU .................. */
		$('.iadbtnBUreleasing').on('click', function(){
			var catype = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM	,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CA RELEASING - FILTER BU </b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/CashAdvance/ca_actg-ajaxpage.php?selectBU'},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					var bulist = null;
					$('img.imgBU').each(function(){
						var imgtype = $(this).attr('src').split('/')[3];
						if(imgtype === 'cck.png'){
							bulist =$(this).attr('id');
						}
					});
					window.location.href = "?id=ca_releasing&bu-filter="+bulist;
					// $('.iadbtnBUfilter').attr({'id':bulist});
					// var dateSELECT = $('select#RELyrs_').val()+'-'+$('select#RELmth_').val()+'-'+$('select#RELday_').val();
					// $.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'filter_masterfile':'', 'bus':bulist, 'date_slc':dateSELECT}, function(data){
					// 	$('.msfl_div').html(data);
					// 	error_dialog.close();
					// });
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5%'});
				message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'420px'});
				$('.modal')[0].remove();


		});
		/* ........................................................................... */


		/* ........................................................................... */
		/* ........................................................................... */
		/* ........................................................................... */
		/* MASTERFILE SELECT DATE ........................... */
		$('.reldateFILTER').on('change', function(){
			var bulist = $('.iadbtnBUfilter').attr('id');
			var dateSELECT = $('select#RELyrs_').val()+'-'+$('select#RELmth_').val()+'-'+$('select#RELday_').val();
			$('.msfl_div').html("<img src='../assets/img/loading.gif' width='22' >&nbsp;&nbsp;Please wait...");
			$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'filter_masterfile':'', 'bus':bulist, 'date_slc':dateSELECT}, function(data){
				setTimeout(function(){ $('.msfl_div').html(data);}, 500);
				error_dialog.close();
			});
		});

		/* .................................................. */




		/* ................... IAD DEDUCTION MONITORING ....................... */
		/* CA MONITORING MODAL ------------------------------------------------ */
		$('button.aidcadeductiondetail').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var id = $(this).attr('id').replace(/CA/g, '');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'../accounting/template/CashAdvance/ca_actg-ajaxpagetable.php?ca_deductionmonitoring='+id},
				draggable: true,
				closable: false,
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
					error_dialog.close();
					$('div.dataTables_info')[1].remove();
					$('div.dataTables_paginate')[1].remove();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 3.5%', 'height':'650px'});
				$('.modal')[0].remove();

		});
		/* -------------------------------------------------------------------- */



		/* BUTTON SET UNPROCESSED DEDUCTION TO CLOSED ACCOUNT ----------------- */
		$('button#settoCLOSE').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var arrayIMG = [];
			$('img[id^=undedimg]').each(function(){
				var imgSLT = $(this).attr('src').split('/')[3];
				if(imgSLT == 'cck.png'){
				arrayIMG.push($(this).attr('name'));
				}
			});

			if(arrayIMG.length < 1){
				alert("Employee list cannot be empty, Please select any available employee from the table.");
			}else{
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET TO CLOSE CA ACCOUNT</b>',
					message: "<span class='pdd_1' class='fnt14'><div class='col-md-12 pdd_1'></div>The list of employee that you've select will be set as closed account. Do you want to continue this action?</span>",
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
						error_dialog.close();
						$('div.dataTables_info')[1].remove();
						$('div.dataTables_paginate')[1].remove();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						$.post('template/CashAdvance/ca_iad-ajaxpagetable.php', {'close_acountCA':arrayIMG}, function(data){
							error_dialog.close();
							window.location.reload();
							// $('div.deductiontable').html(data);
						});
						$('div.dataTables_info')[1].remove();
						$('div.dataTables_paginate')[1].remove();
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'2% 5.5%'});
					message_diag.getModalFooter().css({'padding':'2% 5.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 5.5%', 'height':'80px'});
					$('.modal')[0].remove();

			}

		});


	});