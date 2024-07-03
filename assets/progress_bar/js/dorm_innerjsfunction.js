function number_inp(evt){
		var charCode = (evt.which) ? evt.which : event.keyCode
		if ((charCode != 45 || $(element).val().indexOf('-') != -1) &&
		(charCode > 46 || $(element).val().indexOf('.') != -1) &&
		(charCode < 48 || charCode > 57))
		return false;
	};


$(document).ready(function(){
	// PER BUSINESS UNIT TABLE ROW SELECTION
	$('tr.TR-bu').on('click', function(){
		var getID = $(this).attr('id');
		var img_ = $('img#img'+getID).attr('src').split('/')[3];
		if(img_ == 'uncck.png'){
			$('img#img'+getID).attr({'src':'../assets/icon_index/cck.png'});
		}else{
			$('img#img'+getID).attr({'src':'../assets/icon_index/uncck.png'});
		}		
	});

	// PER EMPLOYEE TYPE TABLE ROW SELECTION
	$('tr.TR-emptype').on('click', function(){
		var getID = $(this).attr('id');
		var img_ = $('img#img'+getID).attr('src').split('/')[3];
		if(img_ == 'uncck.png'){
			$('img#img'+getID).attr({'src':'../assets/icon_index/cck.png'});
		}else{
			$('img#img'+getID).attr({'src':'../assets/icon_index/uncck.png'});
		}		
	});

	// VERIFY & CACULATE AMOUNT (IN-CASH AMOUNT) -----------------------------
	$('input.amtPRESENTED').on('keyup', function(){

		if(parseFloat($(this).attr('name')) < parseFloat($(this).val().replace(/\s/g, ''))){
			alert('Partial Payment must not greater than the current balance.');
			var presentAMT = parseFloat($(this).attr('name'));	
			$(this).val(presentAMT.toFixed(2));
			var iterest_org = parseFloat($(this).attr('name').replace(/\s/g, ''));
			var principal_AMT  = parseFloat($('input.amrtamount').val())-parseFloat($('input.amtINTEREST').val().replace(/\s/g, ''));
			var curren_BAL  = parseFloat($('input.balCURRENT').val().replace(/\s/g, ''));
			$('input.amtPRINCIPAL').val(parseFloat(principal_AMT+presentAMT).toFixed(2));
			$('input.balPAYABLE').val('0.00');
		}else{
			var presentAMT = parseFloat($(this).val().replace(/\s/g, ''));
			var iterest_org = parseFloat($(this).attr('name').replace(/\s/g, ''));
			var principal_AMT  = parseFloat($('input.amrtamount').val())-parseFloat($('input.amtINTEREST').val().replace(/\s/g, ''));
			var curren_BAL  = parseFloat($('input.balCURRENT').val().replace(/\s/g, ''));
			$('input.amtPRINCIPAL').val(parseFloat(principal_AMT+presentAMT).toFixed(2));
			$('input.balPAYABLE').val(parseFloat(curren_BAL-presentAMT).toFixed(2));
		}			

	});


	//  -------------------------------------------------------------------
	$('a.DeductionMnthly').on('click', function(){
		var data = $(this).attr('name').split('|');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> MONTHLY DEDUCTION DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?getDEduduction_monthdetails='+data[0]+'&montselect='+data[1]},
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
			message_diag.getModalHeader().css({'padding':'1.5% 4%'});
			message_diag.getModalFooter().css({'padding':'1.2% 4%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 4%', 'height':'450px'});			
		});



		/* TERMS CALCULATION ---------------------------------------------------- */
		$('.numterms').on('change', function(){
			var date_start = $('input#startdate').val().replace(/\s/, '');
			var current_val = $('input.balCURRENT').val().replace(/\s/, '');
			var amrt_amount = $('input.amtPRESENTED').val().replace(/\s/, '');
			var terms = $(this).val().replace(/\s/, '');
			var code = $(this).attr('id');
			if(date_start == ''
				|| current_val == ''
				|| amrt_amount == ''
				|| terms == ''){
				alert('Please check your information.');
			}else{
				$.post('template/Mhhp/mhhp_actg-ajaxpage.php',
					{'adv_pay-calculateterms':'',
					'code':code,
					'date_start':date_start,
					'current_val':current_val,
					'amrt_amount':amrt_amount,
					'terms':terms},
					function(data){
					$('div.termscovered').html(data);
				});
			}
		});
		/* ---------------------------------------------------------------------- */


		/*.......................................................... */
		/* SELECT PDF TYPE REPORT ---------------------------------- */
		$('.imgpdfType').on('click', function(){
			$('.imgpdfType').attr({'src':'../assets/icon_index/uncck.png', 'name':''});
			var imgsrc = $(this).attr('src').split('/')[3];
			var id_ = $(this).attr('id');
			if(imgsrc == 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png', 'name':'imgUSED'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png', 'name':''});
			}

			if(id_ == 'PCC'){
				$('.pcclist').prop({'readonly':false});
				$('.pcclist').focus();
			}else{
				$('.pcclist').prop({'readonly':true});
			}
		});
		/* --------------------------------------------------------- */


		/* ======================================================================================== */
		/* FUNCTION ALLOCATE AMOUNT PAID (WALK IN PAYMENT) ======================================== */
		$('input.wlkpay-AMT').on('keyup', function(){
			var undeductedTTL = $('.undeductedTTL').attr('for').replace(/\s/, '');	
			var amountAMRT = $('.mtnhlAMRT').attr('for').replace(/\s/, '');	

			var amounttender = $(this).val().replace(/\s/, '');			
			if(amounttender == ''){ amounttender = 0; }
			var ttltobepaid = parseFloat(undeductedTTL) + parseFloat(amountAMRT);
			if(parseFloat(amounttender) <= parseFloat(undeductedTTL)){
				 $('.undeductedTTL').val(parseFloat(parseFloat(undeductedTTL) - parseFloat(amounttender)).toFixed(2));
				 $('.mtnhlAMRT').val(parseFloat(amountAMRT).toFixed(2));

			}else if(amounttender <= ttltobepaid) {
				$('.undeductedTTL').val('0.00');
				$('.mtnhlAMRT').val(parseFloat(ttltobepaid - parseFloat(amounttender)).toFixed(2));
			}else if(amounttender > ttltobepaid){
				alert('Amount must not be greater than the total payable for this date.');
				$('.undeductedTTL').val('0.00');
				$('.mtnhlAMRT').val('0.00');
				$(this).val(ttltobepaid.toFixed(2));
			}
		});




		/* ========================================================================== */
		/* FUNCTION FILTER WALKIN DATE SELECTION ==================================== */
		$('.wkn_deddate').on('change', function(){
			var undeductedTTL = $('.undeductedTTL').attr('for').replace(/\s/, '');	
			var dateselected = $(this).val();
			var reqcode = $(this).attr('name');
			$.post('template/Mhhp/mhhp_actg-ajaxpage.php',
			{'wkn_filterdate':'',
			 'wkndeddate':dateselected,
			 'reqcode':reqcode
			},
			function(data){
				console.clear();
				var retrivedata = data.split('[◄*')[1].split('*◄]')[0];
				var dfeltamt = $('.mtnhlAMRT').attr('title');
				if(retrivedata === 'NONE'){
					$('.undeductedTTL').val('0.00');	
					$('.mtnhlAMRT').attr({'for':'0.00'}).val('0.00');
					$('.wlkpay-AMT').val('0.00');
					$('button.wknsavebtn').prop('disabled', true);
						var contentMSG = '<img src="../assets/icon_index/dateinvalid.png" width="40">';
							contentMSG +='<b style="font-size:14px;">&nbsp;&nbsp;&nbsp;&nbsp;INVALID DATE</b>';
						
						var errorinvalid = new BootstrapDialog.show({
							size: BootstrapDialog.SIZE_SMALL,
							type: BootstrapDialog.TYPE_DEFAULT,
							title: '',
							message: contentMSG,
							draggable: true, 
							closable: true,           
							buttons: [{
							label: 'Close',
							cssClass: 'btn-default btn-fill btn-sm',
							action: function(error_dialog) {
							error_dialog.close();
							}
							}]
							});
							errorinvalid.getModalContent().css({'border-radius':'2px', 'margin-top':'45%'});
							errorinvalid.getModalHeader().remove();
							errorinvalid.getModalFooter().remove();
							errorinvalid.getModalBody().css({'padding':'6% 10%', 'height':'75px'});	
						setTimeout(function(){
							errorinvalid.close('modal');
						}, 2000);


				}else if(retrivedata === 'DEFLT'){
					$('.undeductedTTL').val(undeductedTTL);
					$('.mtnhlAMRT').attr({'for':dfeltamt}).val(dfeltamt);
					$('.wlkpay-AMT').val('0.00');
					$('button.wknsavebtn').prop('disabled', false);
				}else{
					var amountdefault = retrivedata.split('|')[1];
					$('.mtnhlAMRT').attr({'for':amountdefault}).val(amountdefault);
					$('button.wknsavebtn').prop('disabled', false);
				}
				console.log(data);
			});
		});




		/* ================================================================================== */
		/* INCASH PAYMENT (CURRENT BALANCE CALCULATION ) ==================================== */
		$('.hbt_amount').on('keyup', function(){
			var value_ 		= $(this).val();
			var currentbal_ = $(this).attr('for');
			var amt_balance = parseFloat(currentbal_) - parseFloat(value_);
			if(parseFloat(currentbal_) >= parseFloat(value_) ){
				$('.hbt_crntBAL').val(amt_balance.toFixed(2));
			}else{
				alert("amount must not be greater than the current balance.");
				$(this).val('0.00');
				$('.hbt_crntBAL').val(currentbal_);
			}
		});
		/* ================================================================================= */





		/* ================================================================================== */
		/* FUNCTION CHECK/UNCHECK IMG - UNDEDUCTED AMOUNT =================================== */
		$('button.undedselectall').on('click', function(){
			var for_ = $(this).attr('for');
			if(for_ == 0){
				$(this).attr({'for':'1', 'class':'btn btn-danger active btn-sm undedselectall'}).html('<i class="fa fa-times"></i> Unselect All');
				$('img[id^=imgUDED_]').attr({'src':'../assets/icon_index/cck.png'});				
			}else{
				$(this).attr({'for':'0', 'class':'btn btn-default btn-sm undedselectall'}).html('<i class="fa fa-check" style="color:#009900"></i> Select All');
				$('img[id^=imgUDED_]').attr({'src':'../assets/icon_index/uncck.png'});				
			}
		});


		$('img[id^=imgUDED_]').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}

		});


		$('input[name^=amt_]').on('keyup', function(){
			var reqcode_ 	= $(this).attr('name').split('_')[1];
			var dflt_amt 	= $(this).attr('for').split('|');
			var amountinP 	= $(this).val();
			var baseamt_ 	= parseFloat(dflt_amt[1]);

			if(parseFloat(dflt_amt[0]) >= parseFloat(amountinP)){
				var total_amtDEDUCTION = baseamt_ + parseFloat(amountinP);
				$('td#ttl_'+reqcode_).html(total_amtDEDUCTION.toFixed(2));
			}else{
				alert('Amount to inputed must be greater than to the undeducted amount.');	
				var total_amtDEDUCTION = baseamt_ + parseFloat(dflt_amt[0]);
				$(this).val(parseFloat(dflt_amt[0]).toFixed(2));	
				$('td#ttl_'+reqcode_).html(total_amtDEDUCTION.toFixed(2));		
			}
		});




	/* ============================================================================= */
	/* SET UNDEDUCTED AMOUNT FOR THE NEXT DEDUCTION DAY ============================ */
	// undedamountset 
	$('.undedamountset').on('click', function(){
		var list_ = [];
		

		$('img[id^=imgUDED_]').each(function(idx){
			var img_ 		= $(this).attr('src').split('/')[3];
			var reqcode_W 	= $(this).attr('id').split('_')[1];
			if(img_ == 'cck.png'){
				list_.push(reqcode_W+'|'+$('input[name=amt_'+reqcode_W+']').val());
			}

		});




		var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> FORWARD AMOUNT:</b>',
					message: "Deduction Type: Habitat\n The amount will be added to the base deductions for the next deduction pertaining to the person you've selected. Do you wish to proceed?",
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
						$.post('template/Mhhp/mhhp_actg-ajaxpage.php',{'forward_undeductedamt':list_}, function(data){
							alert('------------------ Amount successfully forwarded ------------------ ');
							window.location.reload();
						});						
					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});



	});






		/* ================================================================================== */
		/* INCASH PAYMENT (CURRENT BALANCE CALCULATION ) ==================================== */
		$('.site_amount').on('keyup', function(){
			var value_ 		= $(this).val();
			var currentbal_ = $(this).attr('for');
			var amt_balance = parseFloat(currentbal_) - parseFloat(value_);
			if(parseFloat(currentbal_) >= parseFloat(value_) ){
				$('.site_crntBAL').val(amt_balance.toFixed(2));
			}else{
				alert("amount must not be greater than the current balance.");
				$(this).val('0.00');
				$('.site_crntBAL').val(currentbal_);
			}
		});
		/* ================================================================================= */






});