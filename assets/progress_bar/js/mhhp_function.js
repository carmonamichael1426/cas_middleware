	function int_input(evt){
		var charCode = (evt.which) ? evt.which : event.keyCode
		if ((charCode != 45 || $(element).val().indexOf('-') != -1) &&
		(charCode > 46 || $(element).val().indexOf('.') != -1) &&
		(charCode < 48 || charCode > 57))
		return false;
	};

	function message_box(element){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b>',
		message:"Some field found empty, Please review your application.",
		draggable: true, 
		closable: false,           
		buttons: [{
		label: 'Okay',
		cssClass: 'btn-default btn-fill btn-sm',
		action: function(error_dialog) {
		  error_dialog.close();
		  $(element).focus();
		}
		}]
		});
		message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	}

	// GET FILNAME 
	function upldfile_name(val){
		var filname = val.replace(/\\/g,'/').replace( /.*\//, '' );
		$('input[id=filenameItem]').val(filname);
	};



	




	/* ======================================================================== */
	/* ======================================================================== */
	/* ACCOUNTING MODULE CATEGORIZE EMPLOYEE PAYMENT ========================== */
	function accpaymentmode(reqcode_, paytype){

		var divTT = '<span class="col-md-12 pdd fnt13">';
			divTT += 'Requisition Code : '+reqcode_;
			divTT += '</span>';


			divTT += '<span class="col-md-12 pdd_1 fnt13"></span>';

			divTT += '<span class="col-md-12 pdd fnt13">';
			divTT += 'Select Payment Mode: ';
			divTT += '</span>';

			if(paytype == 'DEDUCTION'){
				var ded_ = 'cck.png'; 
				var incs = 'uncck.png';
			}else{
				var ded_ = 'uncck.png'; 
				var incs = 'cck.png';
			}


			divTT += '<span class="col-md-12 pdd_1 fnt13">';
			divTT += '<img id="DEDUCTION" src="../assets/icon_index/'+ded_+'" class="pyMD" width="19" onclick=\'pyMD(this.id)\' style="cursor:pointer"> Salary Deduction';
			divTT += '</span>';


			divTT += '<span class="col-md-12 pdd fnt13">';
			divTT += '<img id="INCASH" src="../assets/icon_index/'+incs+'" class="pyMD" width="19" onclick=\'pyMD(this.id)\' style="cursor:pointer"> In-cash Payment';
			divTT += '</span>';



		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"> PAYMENT MODE:</b>',
			message: divTT,
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Update',
			cssClass: 'btn-danger	 btn-fill btn-sm',
			action: function(chgpytype) {
				var PYtype_ = 'DEDUCTION';

				$('.pyMD').each(function(idx){
					var imgFG = $(this).attr('src').split('/')[3];
					if(imgFG == 'cck.png'){
						PYtype_ = $(this).attr('id');
					}
				});

			  	var confirm_ = confirm("Changing Payment type will automatically reflect to housing data monitoring. Click OK to proceed.");
			  	if(confirm_ == true){
			  		$.post('template/Mhhp/mhhp_actg-ajaxpage.php', {'paymenttype_exec':reqcode_, 'type_':PYtype_}, function(){
			  			chgpytype.close();
			  			window.location.reload();
			  		});
			  	}
			}
			},{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 8%', 'height':'100px'});

	}


	/* ============================================================ */
	/* CHECK PAYMENT MODE ========================================= */
	function pyMD(pytype){
		$('.pyMD').attr({'src':'../assets/icon_index/uncck.png'});
		$('img#'+pytype).attr({'src':'../assets/icon_index/cck.png'});

	}






	/* ======================================================================= */
	/* HABITAT CHANGE AMORTIZATION SCHEDUEL ================================== */
	function hbt_changeschedule(reqcode_){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CHANGE AMORTIZATION SCHEDULE : '+reqcode_+'</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?hbt_changeschedule='+reqcode_},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {

				/* ================================================================================================= */
				/* ================================================================================================= */
				var schedtype_ 		= 'monthlysched';
				$('.imgsched').each(function(idx){
					var img_ = $(this).attr('src').split('/')[3];
					if(img_ == 'cck.png'){
						schedtype_ = $(this).attr('id');
					}
				});
				var currentbalance 	= $('input.currentbalance').val().replace(/\s/g, '');
				var amortamount 	= $('input.amortamount').val().replace(/\s/g, '');	
				var dateeffect 		= $('input.dateeffect').val().replace(/\s/g, '');

				if(currentbalance != 0 && amortamount !=0){
					var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SAVE NEW SCHEDULE:</b>',
						message: "You are about to submit a new amortization data for "+reqcode_+".  Do you wish to proceed?",
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
							$('div.sched_table').html('<span class="col-md-12 " style="font-size:15px;" ><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
							$.post('template/Mhhp/mhhp_ajaxpage.php',
								{'hbt_changeschedule':reqcode_, 'currentbalance':currentbalance, 'amortamount':amortamount, 'deduction_date':dateeffect, 'schedtype_':schedtype_},
								function(data){
									alert("------------ Amortization Schedutle was Successfully Change --------------");
									window.location.reload();
									// $('div.scheddiv_hbt').html(data);	
								});							  
						}
						}]
						});
						message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'80px'});	
						/* ================================================================================================= */
						/* ================================================================================================= */			
				}
			}
			},{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'0.8% 3.5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'0.8% 3.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'0.8% 3.5%', 'height':'530px'});
	}






	function hbt_imgtbl(img, reqcode){
		if(img == 'cck.png'){
			$('img#'+reqcode).attr({'src':'../assets/icon_index/uncck.png', 'onclick':"hbt_imgtbl('uncck.png', '"+reqcode+"')"});
		}else{
			$('img#'+reqcode).attr({'src':'../assets/icon_index/cck.png', 'onclick':"hbt_imgtbl('cck.png', '"+reqcode+"')"});
		}
	}




	/* =========================                        */
	/* =========================                        */
	/* FUNCTION GET SAMPLE ============================ */
	function mhhp_remittanceslist(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> FILTER REMMITANCE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?remittanceslist_'},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				error_dialog.close();					
				var post_cutoff	 = $('input.post-cutoff').val();
				var chp_type	 = $('select.chp_type').val();
				/*var pcc_code	 = $('input.pcc_code').val().replace(/\s/g, '');*/
				var pcc_code	 = $('textarea.pcc_code').val();

					$.post('../payroll/template/Mhhp/mhhp_ajaxpage-table.php', {
						'filterremittanceslist':'', 'post_cutoff':post_cutoff, 'chp_type':chp_type, 'pcc_code':pcc_code
					}, function(data){
						
						if(chp_type == 'Mhhp'){ 
							$('u.mhhptype_').html('MARCELA HOMES'); 
						}else{ 
							$('u.mhhptype_').html('HABITAT SUBDIVISION'); 
						}

						$('a.rmtt_pdfbtn').attr({
							'href':'template/Mhhp/mhhp_remittancesPDF.php?filterremittanceslist&type='+chp_type+'&post_cutoff='+post_cutoff+'&pcc_code='+pcc_code
						});						
						$('div#mhhpdeductioncontainer').html(data);

						
					});		
				console.clear();			
				}
			},{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'220px'});
	}


	function viewPCC_code_thelma(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_thelma='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'160px'});
	}


	function viewPCC_code_tagaro(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_tagaro='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}

	function viewPCC_code_lucy(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_lucy='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}

	function viewPCC_code_juliet(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_juliet='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}



	function viewPCC_code_sague(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_sague='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}

	function viewPCC_code_oclida(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_oclida='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}

	function viewPCC_code_tudtud(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_tudtud='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}

	function viewPCC_code_balatero(PCC_code){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> PCC CODE LIST : </b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {
				'pageToLoad':'../payroll/template/Mhhp/mhhp_payroll-ajaxpage.php?viewPCC_code_balatero='+PCC_code
			},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  		error_dialog.close();
				}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 8%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.2% 8%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 8%', 'height':'100px'});
	}



	/*                            ================ */
	/*                            ================ */
	/*                            ================ */
	/*                            ================ */
	/*                            ================ */
	/*                            ================ */
	/* SITE DEVELOPMENT FUNCTION  ================ */
	/* ===============                             */
	/* ===============                             */
	/* ===============                             */
	/* ===============                             */
	/* ===============                             */
	/* ===============                             */





	/* ================================================================================= */
	/* ================================================================================= */
	/* FUNCTION GET EXTRACT LI-SEARCHED EMPLOYEE DETAILS =============================== */
	function emp_extract(module_, details_){
		if(module_ === 'siteDEV'){
			var value_li = details_.split('|');
			$('ul#emp_list').fadeOut();
			$('input.empidHR').val(value_li[0]);
			$('input#emp_searchHR').val(value_li[3]);
			$('span.spanPosition').html(value_li[1]);
			$('span.spanDepartment').html(value_li[2]);
		}

	}


















	$(document).ready(function(){ 

		// EMPLOYEE SEARCH ---------------------------------
		$('input[id^=kin]').on('keyup', function(){
			var inpt_align = $(this).attr('id');
			var value = $(this).val();
			if(value.replace(/\s/g, '') !=''){
				$.post('template/Mhhp/mhhp_ajaxpage.php',
				{'employee_seach_kin':value,
				 'kintype':inpt_align
				},
				function(data){
				$('ul[id='+inpt_align+'_list]').show().html(data);
				});
			}else{
				$('ul[id='+inpt_align+'_list]').hide();
			}
		});


	 // UNIT SELECT -------------------------------------- 
	 $('img.imgUNIT').on('click', function(){
	 	var img = $(this).attr('src').split('/')[3];
	 	$('img.imgUNIT').attr({'src':'../assets/icon_index/uncck.png', 'name':'null'});
	 	if(img == 'uncck.png'){
	 		$(this).attr({'src':'../assets/icon_index/cck.png', 'name':'unitselect'});
	 	}else{
	 		$(this).attr({'src':'../assets/icon_index/uncck.png'});
	 	}
	 });


	 // UNIT SELECT -------------------------------------- 
	 $('img.imgPROGRAM').on('click', function(){
	 	var img = $(this).attr('src').split('/')[3];
	 	$('img.imgPROGRAM').attr({'src':'../assets/icon_index/uncck.png', 'name':'null'});
	 	if(img == 'uncck.png'){
	 		$(this).attr({'src':'../assets/icon_index/cck.png', 'name':'programselect'});
	 	}else{
	 		$(this).attr({'src':'../assets/icon_index/uncck.png', 'name':'null'});
	 	}
	 });

	 // IMG CONFIRM REQUISITION -------------------------
	 $('img#imgverify').on('click', function(){
	 	var img = $(this).attr('src').split('/')[3];
	 	if(img == 'uncck.png'){
	 		$(this).attr({'src':'../assets/icon_index/cck.png'});
	 		$('button.subm_request').prop('disabled', false);
	 	}else{
	 		$(this).attr({'src':'../assets/icon_index/uncck.png'});
	 		$('button.subm_request').prop('disabled', true);
	 	}	 	
	 });

	 // REQUEST SUBMISSION -----------------------------------------

	 $('button.subm_request').on('click', function(){

		var unitselect 		= $('img[name=unitselect]').attr('id');
		var salaryRate 		= $('input.salaryRATE').val();
		var sp_award 		= $('textarea[name=sp_award]').val();

		var spouse_name 	= $('textarea[name=sp_award]').val();
		var spouse_word 	= $('input[name=spouse_word]').val();
		var spouse_salary 	= $('input[name=spouse_salary]').val();

		var child_1_name = $('input[name=child_1_name]').val();
		var child_2_name = $('input[name=child_2_name]').val();
		var child_3_name = $('input[name=child_3_name]').val();
		var child_1_bdate = $('input[name=child_1_bdate]').val();
		var child_2_bdate = $('input[name=child_2_bdate]').val();
		var child_3_bdate = $('input[name=child_3_bdate]').val();

		var kin_1_name = $('input[name=kin_1_name]').val();
		var kin_2_name = $('input[name=kin_2_name]').val();
		var kin_3_name = $('input[name=kin_3_name]').val();
		var kin_1_dept = $('input[name=kin_1_dept]').val();
		var kin_2_dept = $('input[name=kin_2_dept]').val();
		var kin_3_dept = $('input[name=kin_3_dept]').val();
		var kin_1_pos = $('input[name=kin_1_pos]').val();
		var kin_2_pos = $('input[name=kin_2_pos]').val();
		var kin_3_pos = $('input[name=kin_3_pos]').val();

		var exp_transpo = $('input[name=exp_transpo]').val();
		var exp_insur = $('input[name=exp_insur]').val();
		var exp_edu = $('input[name=exp_edu]').val();
		var exp_medi = $('input[name=exp_medi]').val();
		var exp_rent = $('input[name=exp_rent]').val();
		var exp_food = $('input[name=exp_food]').val();
		var exp_gasoline = $('input[name=exp_gasoline]').val();
		var exp_cloth = $('input[name=exp_cloth]').val();
		var exp_wateretc = $('input[name=exp_wateretc]').val();
		var exp_other = $('input[name=exp_other]').val();

		var qs_account_payable = $('textarea[name=qs_account_payable]').val();
		var qs_assets = $('textarea[name=qs_assets]').val();
		var qs_mh_aquiring = $('textarea[name=qs_mh_aquiring]').val();
		var qs_ampc_member = $('textarea[name=qs_ampc_member]').val();
		var qs_other = $('textarea[name=qs_other]').val();

		if(salaryRate.replace(/\s/g, '') == '')
			{ message_box('input.salaryRATE'); }
		else if(sp_award.replace(/\s/g, '') == '')
			{message_box('textarea[name=sp_award]');}
		else if(exp_transpo.replace(/\s/g, '') == '')
			{message_box('input[name=exp_transpo]');}
		else if(exp_insur.replace(/\s/g, '') == '')
			{message_box('input[name=exp_insur]');}
		else if(exp_edu.replace(/\s/g, '') == '')
			{message_box('input[name=exp_edu]');}
		else if(exp_medi.replace(/\s/g, '') == '')
			{message_box('input[name=exp_medi]');}
		else if(exp_rent.replace(/\s/g, '') == '')
			{message_box('input[name=exp_rent]'); }
		else if(exp_food.replace(/\s/g, '') == '')
			{message_box('input[name=exp_food]');  }
		else if(exp_gasoline.replace(/\s/g, '') == '')
			{message_box('input[name=exp_gasoline]');}
		else if(exp_cloth.replace(/\s/g, '') == '')
			{message_box('input[name=exp_cloth]');}
		else if(exp_wateretc.replace(/\s/g, '') == '')
			{message_box('input[name=exp_wateretc]');}
		else if(exp_other.replace(/\s/g, '') == '')
			{message_box('input[name=exp_other]');}
		else if(qs_account_payable.replace(/\s/g, '') == '')
			{message_box('textarea[name=qs_account_payable]');}
		else if(qs_assets.replace(/\s/g, '') == '')
			{message_box('textarea[name=qs_assets]');}
		else if(qs_mh_aquiring.replace(/\s/g, '') == '')
			{message_box('textarea[name=qs_mh_aquiring]');}
		else if(qs_ampc_member.replace(/\s/g, '') == '')
			{message_box('textarea[name=qs_ampc_member]');}
		else if(qs_other.replace(/\s/g, '') == '')
			{message_box('textarea[name=qs_other]');}
		else
		{	
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-transfer"></i>  SUBMITTING APPLICATION:</b>',
			message:"<span style='line-height:60px;'>&nbsp;&nbsp;Your application is being process &nbsp;&nbsp;<img src='../assets/icon_index/loadinganimation.gif' width='30'></span>",
			draggable: true, 
			closable: false
			});
			message_diag.getModalHeader().remove(); 
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().remove(); 
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'auto'});	
			$.post('template/Mhhp/mhhp_ajaxpage.php',{
				'request_submit':'',
				'unitselect':unitselect,
				'salaryrate':salaryRate,
				'sp_award':sp_award,
				'spouse_name':spouse_name,
				'spouse_word':spouse_word,
				'spouse_salary':spouse_salary,
				'child_1_name':child_1_name,
				'child_2_name':child_2_name,
				'child_3_name':child_3_name,
				'child_1_bdate':child_1_bdate,
				'child_2_bdate':child_2_bdate,
				'child_3_bdate':child_3_bdate,
				'kin_1_name':kin_1_name,
				'kin_2_name':kin_2_name,
				'kin_3_name':kin_3_name,
				'kin_1_dept':kin_1_dept,
				'kin_2_dept':kin_2_dept,
				'kin_3_dept':kin_3_dept,
				'kin_1_pos':kin_1_pos,
				'kin_2_pos':kin_2_pos,
				'kin_3_pos':kin_3_pos,
				'exp_transpo':exp_transpo,
				'exp_insur':exp_insur,
				'exp_edu':exp_edu,
				'exp_medi':exp_medi,
				'exp_rent':exp_rent,
				'exp_food':exp_food,
				'exp_gasoline':exp_gasoline,
				'exp_cloth':exp_cloth,
				'exp_wateretc':exp_wateretc,
				'exp_other':exp_other,
				'qs_account_payable':qs_account_payable,
				'qs_assets':qs_assets,
				'qs_mh_aquiring':qs_mh_aquiring,
				'qs_ampc_member':qs_ampc_member,
				'qs_other':qs_other},
				function(data){
					message_diag.close();
					window.location.href = "?id=mhhp-request";
				});
		}			
	 });
	// -------------------------------------------------------------



	// FUNCTION GET UNIT DETAILS ----------------------------------
	$('a.viewunitspec').on('click', function(){
		var code = $(this).attr('id').replace(/\s/g, '|');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> UNIT DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?unitdetailshow='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'0.9% 3.5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1% 3.5%', 'height':'370px'});
	});






	// FUNCTION REMOVE REQUEST -------------------------------------
	$('button.reqremove').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> WARNING:</b>',
			message:"This request <b>("+code+")</b> will permanently be removed from the record list. Do you want to proceed?",
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Cancel',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(_dialog) {
				$.post('template/Mhhp/mhhp_ajaxpage.php',
				{'remove_request':code},
				function(data){
					$('tr#row'+code).fadeOut();
					_dialog.close();
				});		
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});


	// FUNCTION SPOUSE DETAILS -------------------------------------
	$('a.childdetail').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> CHILDREN DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?children_details='+code},
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
			message_diag.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.1% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'200px'});
	});

	

	$('.ded_res').on('click', function(){
		var date_from = $('.ded_from').val(); 
		var date_to   = $('.ded_to').val();
		alert(date_from);
		alert(date_to);

	});	



	// FUNCTION SPOUSE DETAILS -------------------------------------
	$('a.spousedet').on('click', function(){
		var url = $(location).attr('href').split('?')[1].split('=')[1];
		var hideSTS = 'hide';
		if(url === 'mhhp_applicant'){ hideSTS = ''; }
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SPOUSE DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?spouse_details='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			}
			},{
			label: 'Edit Details',
			cssClass: hideSTS+' btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				$('.spousename').prop('disabled', false);
				$('.spousework').prop('disabled', false);
				$('.spousesalary').prop('disabled', false);

				$(this).remove();
				$('button.updatespouse').removeClass('hide');
			}
			},{
			label: 'Update Details',
			cssClass: 'hide btn-success btn-fill btn-sm updatespouse',
			action: function(error_dialog) {
				var spousename =  $('.spousename').val();
				var spousework =  $('.spousework').val();
				var spousesalary = $('.spousesalary').val();
				if(spousename.replace(/\s/g, '') != ''
				&& spousework.replace(/\s/g, '') != ''
				&& spousesalary.replace(/\s/g, '') != ''){
					var con = confirm("Do you want to update this applicant's spouse detail. Click 'OK' to proceed.");
					if(con == true){
						$.post('template/Mhhp/mhhp_ajaxpage.php', {'update_spouse':code,
						'spousename':spousename,
						'spousework':spousework,
						'spousesalary':spousesalary},
						function(data){
						error_dialog.close();
					});						
					}
				}else{
					alert('Some field found empty. Please check your information.');
				}

			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.4% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'230px'});
	});



	// FUNCTION RELATIVES DETAILS -------------------------------------
	$('a.kindet').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> KIN DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?kin_details='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 4%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.1% 4%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1% 4%', 'height':'170px'});
	});



	// FUNCTION EXPENSES DETAILS -------------------------------------
	$('a.expensedet').on('click', function(){
		var url = $(location).attr('href').split('?')[1].split('=')[1];
		var hideSTS = 'hide';
		if(url === 'mhhp_applicant'){ hideSTS = ''; }

		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EXPENSE DETAILS:'+url[1]+'</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?expense_details='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			},{
			label: 'Edit Details',
			cssClass: hideSTS+' btn-success btn-fill btn-sm editexpense',
			action: function(error_dialog) {
			  $('.transp').prop('disabled', false);
			  $('.insu').prop('disabled', false);
			  $('.education').prop('disabled', false);
			  $('.medicine').prop('disabled', false);
			  $('.rent').prop('disabled', false);
			  $('.food').prop('disabled', false);
			  $('.gas').prop('disabled', false);
			  $('.clothing').prop('disabled', false);
			  $('.ewt_exp').prop('disabled', false);
			  $('.other').prop('disabled', false);
			  $(this).remove();
			  $('button.updateexpense').removeClass('hide');
			}
			},{
			label: 'Update Details',
			cssClass: 'hide btn-success btn-fill btn-sm updateexpense',
			action: function(error_dialog) {

				var transp = $('.transp').val().replace(/\s/g, '');
				var insu = $('.insu').val().replace(/\s/g, '');
				var education = $('.education').val().replace(/\s/g, '');
				var medicine = $('.medicine').val().replace(/\s/g, '');
				var rent = $('.rent').val().replace(/\s/g, '');
				var food = $('.food').val().replace(/\s/g, '');
				var gas = $('.gas').val().replace(/\s/g, '');
				var clothing = $('.clothing').val().replace(/\s/g, '');
				var ewt_exp = $('.ewt_exp').val().replace(/\s/g, '');
				var other = $('.other').val().replace(/\s/g, '');
				var con = confirm("Do you want to update this expense details? Click 'OK' to proceed.");
				if(con == true){
					$.post('template/Mhhp/mhhp_ajaxpage.php', {'update_expense':code,
						'transp':transp,
						'insu':insu,
						'education':education,
						'medicine':medicine,
						'rent':rent,
						'food':food,
						'gas':gas,
						'clothing':clothing,
						'ewt_exp':ewt_exp,
						'other':other}, function(data){
						error_dialog.close();
					});
				}
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'425px'});

	});


	// FUNCTION STATEMENT DETAILS -------------------------------------
	$('a.statementdet').on('click', function(){
		var url = $(location).attr('href').split('?')[1].split('=')[1];
		var hideSTS = 'hide';
		if(url === 'mhhp_applicant'){ hideSTS = ''; }

		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> STATEMENT DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?statement_details='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			},{
			label: hideSTS+' Edit Details',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				$('.specaward').prop('disabled', false);
				$('.accpayable').prop('disabled', false);
				$('.qsassets').prop('disabled', false);
				$('.qsaquiring').prop('disabled', false);
				$('.qsampc').prop('disabled', false);
				$('.qsother').prop('disabled', false);
				$(this).remove();
				$('.updatedetails').removeClass('hide');
			}
			},{
			label: 'Update Details',
			cssClass: 'hide btn-success btn-fill btn-sm updatedetails',
			action: function(error_dialog) {
				var specaward = $('.specaward').val();
				var accpayable = $('.accpayable').val();
				var qsassets = $('.qsassets').val();
				var qsaquiring = $('.qsaquiring').val();
				var qsampc = $('.qsampc').val();
				var qsother = $('.qsother').val();
				if(specaward.replace(/\s/g, '')
				&& accpayable.replace(/\s/g, '')
				&& qsassets.replace(/\s/g, '')
				&& qsaquiring.replace(/\s/g, '')
				&& qsampc.replace(/\s/g, '')
				&& qsother.replace(/\s/g, '')){
					var con = confirm("Do you want to update this information. Click 'OK' to proceed.");
					if(con == true){
						$.post('template/Mhhp/mhhp_ajaxpage.php', {'update_statement':code,
						'specaward':specaward,
						'accpayable':accpayable,
						'qsassets':qsassets,
						'qsaquiring':qsaquiring,
						'qsampc':qsampc,
						'qsother':qsother}, function(data){
						error_dialog.close();
					});
					}
				}
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'560px'});

	});

	// -------------------------------------------------------------




	// FUNCTION INCORPORATOR REMARKS MODAL -------------------------------------
	$('.remarkinputinc').on('click', function(){
		var code = $(this).attr('id');
		var typeremark = $(this).attr('name');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> Application Remarks:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_inc-ajaxpage.php?applicationremark='+code+'&remarktype='+typeremark},
			draggable: true, 
			closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(data) {				
				  		data.close();					
				}
				},{
				label: 'Disapprove',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(dialog) {
				  var applremark = $('textarea.applremark').val();
					if(applremark.replace(/\s/g, '') == ''){
						alert("Action can't be completed, Please provide a remark for this application.");
						$('textarea.applremark').focus();
					}else{
						$.post('template/Mhhp/mhhp_inc-ajaxpage.php',
							{'remark_save_inc':code, 'action':'DISAPPROVED', 'remark':applremark},
							function(data){
								dialog.close();
								$('tr#row'+code).fadeOut();
							});
					}
				}
				},{
				label: 'Approve',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(dialog) {
				   var applremark = $('textarea.applremark').val();
					if(applremark.replace(/\s/g, '') == ''){
						alert("Action can't be completed, Please provide a remark for this application.");
						$('textarea.applremark').focus();
					}else{
						$.post('template/Mhhp/mhhp_inc-ajaxpage.php',
							{'remark_save_inc':code, 'action':'APPROVED', 'remark':applremark},
							function(data){
								dialog.close();
								$('tr#row'+code).fadeOut();
							});					
					}
				}
				}]
			});
			message_diag.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.3% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'200px'});
	});
	// -------------------------------------------------------------


		// FUNCTION HRD REMARKS MODAL -------------------------------------
	$('.remarkinput').on('click', function(){
		var code = $(this).attr('id');
		var typeremark = $(this).attr('name');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> Application Remarks:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_hr-ajaxpage.php?applicationremark='+code+'&remarktype='+typeremark},
			draggable: true, 
			closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(data) {				
				  		data.close();					
				}
				},{
				label: 'Disapprove',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(dialog) {
				  var applremark = $('textarea.applremark').val();
					if(applremark.replace(/\s/g, '') == ''){
						alert("Action can't be completed, Please provide a remark for this application.");
						$('textarea.applremark').focus();
					}else{
						$.post('template/Mhhp/mhhp_hr-ajaxpage.php',{
								'remark_save':code, 
								'action':'DISAPPROVED', 
								'remark':applremark
							},function(data){
								dialog.close();
								$('tr#row'+code).fadeOut();
							});
					}
				}
				},{
				label: 'Approve',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(dialog) {
				   var applremark = $('textarea.applremark').val();
					if(applremark.replace(/\s/g, '') == ''){
						alert("Action can't be completed, Please provide a remark for this application.");
						$('textarea.applremark').focus();
					}else{
						$.post('template/Mhhp/mhhp_hr-ajaxpage.php',
							{'remark_save':code, 'action':'APPROVED', 'remark':applremark},
							function(data){
								dialog.close();
								$('tr#row'+code).fadeOut();
								window.location.reload();
							});						
					}
				}
				}]
			});
			message_diag.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.3% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'200px'});
	});
	// -------------------------------------------------------------


	// FUNCTION HRD REMARKS (INCORPORATOR ACCESS) -------------------------------------
	$('.hrdremark').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> APPLICATION REMARKS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_inc-ajaxpage.php?applicationremarkscontent='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'420px'});
	});


	// FUNCTION HRD REMARKS (HRD ACCESS) -------------------------------------
	$('.application-remark').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> APPLICATION REMARKS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'../incorporator/template/Mhhp/mhhp_inc-ajaxpage.php?applicationremarkscontent='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'420px'});
	});



	// FUNCTION HRD REMARKS (HRD - OVERIDE INCORPORATOR's APPROVAL}) -------------------------------------
	$('.tagasapprove').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: "<b class='fnt14'><i class='glyphicon glyphicon-align-right'></i> APPLICATION INCORPORATOR'S APPROVAL :</b>",
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?tagasapprove='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			},{
			label: 'Approve',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				var remarks_con =  $('textarea.remcontent').val();
				if(remarks_con.replace(/\s/g, '') != ''){
					var con = confirm("Information will be considered as incorporator's approved application and marks as official home partners. Are sure you want to proceed?\nClick 'Ok' if yes ");
					  	if(con == true){
					  		$.post('template/Mhhp/mhhp_ajaxpage.php', {
					  			'tagasapprved-incorporator':code, 
					  			'remarkcontent':remarks_con
					  		}, function(){
								  error_dialog.close();
								  $('tr#row'+code).fadeOut();
					  		});
					  	}
				}else{
					$('textarea.remcontent').focus();
				}
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.3% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'300px'});
	});





	// FUNCTION HRD REMARKS (HRD ACCESS) -------------------------------------
	$('.req-collect').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> UPLOAD REQUIREMENTS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?uploadrequirements='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			  $(element).focus();
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			// message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalFooter().remove();
			message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'620px'});
	});


	// FUNCTION APPLICATION - DOCUMENTS(HRD-accesss)-------------------------------------
	$('.application-document').on('click', function(){
		var code = $(this).attr('id');
		var access = $(this).attr('name');
		var path = 'template/Mhhp/mhhp_ajaxpage.php?requirementdetail='+code;
		if(access != 'HRD'){
			path = '../hr/template/Mhhp/mhhp_ajaxpage.php?requirementdetail='+code;
		}

		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DOCUMENT DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':path},
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
			message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'560px'});
	});



	// FUNCTION APPLICATION - DOCUMENTS(EMPLOYEE-accesss)-------------------------------------
	$('.empapplication-document').on('click', function(){
		var code = $(this).attr('id');
		var access = $(this).attr('name');
		var path = 'template/Mhhp/mhhp_ajaxpage.php?employeedocuments='+code;	

		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DOCUMENT DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':path},
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
			message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'570px'});
	});



	// FUNCTION CREATE ENDORSEMENT LETTER =======================================================
	$('.req-endorse').on('click', function(){
		var code = $(this).attr('id');
		var unittype = $(this).attr('name');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SUBMIT ENDORSEMENT LETTER:</b>',
			message: "<span class='pdd_1 fnt14'>Endorsement will automatically be passed and viewed by the construction's access. Do you want to proceed?</span>",
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
				$.post('template/Mhhp/mhhp_ajaxpage.php', {
					'endorseAPPLICANT':code, 
					'unittype':unittype
				}, function(){
			  		error_dialog.close();
					$('tr#row'+code).fadeOut();
				});
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'1.7% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'100px'});
	});



	// SET PARTIAL DEDUCTION ========================================================================
	$('.partialamort').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PARTIAL DEDUCTION:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?partialamort='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				var deduction_date = $('input#deduction_date').val();
				var amt_partial = $('input.amt_partial').val();
				if(deduction_date.replace(/\s/g, '')==''){
					alert("Process can't be completed. Please provide a date.");
				}else if(amt_partial.replace(/\s/g, '')==''){
					alert("Process can't be completed. Please provide an amount");
					$('input.amt_partial').focus();
				}else{
					$.post('template/Mhhp/mhhp_ajaxpage.php',
						{'partialdeductionsave':code, 'dateeffect':deduction_date, 'partamount':amt_partial},
					function(data){
						window.location.reload();
					});
				}
			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'2.5% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'2.3% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'200px'});
	});


	// SET PARTIAL DEDUCTION DETAILS========================================================================
	$('.partialamortdetail').on('click', function(){
		var code = $(this).attr('id');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PARTIAL DEDUCTION DETAILS:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?partialamortdetails='+code},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
			  error_dialog.close();
			}
			},{
			label: 'Update',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {	
				var deduction_date = $('input#deduction_date').val();
				var amt_partial = $('input.amt_partial').val();
				if(deduction_date.replace(/\s/g, '')==''){
					alert("Process can't be completed. Please provide a date.");
				}else if(amt_partial.replace(/\s/g, '')==''){
					alert("Process can't be completed. Please provide an amount");
					$('input.amt_partial').focus();
				}else{
					con = confirm("This acction will effect to the next deduction date. Do you to proceed? Click 'OK' if yes.");
					if(con == true){
					$.post('template/Mhhp/mhhp_ajaxpage.php',
						{'partialdeductionsave':code, 'dateeffect':deduction_date, 'partamount':amt_partial},
					function(data){
						window.location.reload();
					});
					}
				}

			}
			}]
			});
			message_diag.getModalHeader().css({'padding':'2.5% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'2.3% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 5%', 'height':'250px'});
	});





	// CONSTRUCTION ACCESS ================================================

	// select requisition --------------------
	$('img.construct').on('click', function(data){
		var img = $(this).attr('src').split('/')[3];
		if(img == 'uncck.png'){
			$(this).attr({'src':'../assets/icon_index/cck.png'});
		}else{
			$(this).attr({'src':'../assets/icon_index/uncck.png'});
		}
	});

	// SELECT ALL REQUISITION =============================================
	$('img.allconstruct').on('click', function(){
		var img = $(this).attr('src').split('/')[3];
		if(img == 'uncck.png'){
			$(this).attr({'src':'../assets/icon_index/cck.png'});
			$('img.construct').attr({'src':'../assets/icon_index/cck.png'});
		}else{
			$(this).attr({'src':'../assets/icon_index/uncck.png'});
			$('img.construct').attr({'src':'../assets/icon_index/uncck.png'});
		}
	});


	// FUNCTION SET BTCH FOR CONSTRUCTION (Construction-access)-------------------------------------
	$('.setbactconstruction').on('click', function(){
		var batchcode = $(this).attr('name');
		var applicant = [];
		$('img.construct').each(function(idx){
			var img_val = $(this).attr('src').split('/')[3];
			if(img_val == 'cck.png'){
			applicant.push($(this).attr('id'));	
			}
		});
		if(applicant.length==0){
			var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> BUILDING CONSTRUCTION:</b>',
			message: "<span class='fnt14'><b>Batch Code: "+batchcode+"</b>\n Process can't be completed. Please select an applicant from the list below.</span>",
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
			message_diag.getModalHeader().css({'padding':'2.1% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2.1% 5%', 'height':'90px'});
		}else{
			var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> BUILDING CONSTRUCTION:</b>',
			message: "<span class='fnt14'><b>Batch Code: "+batchcode+"</b>\n Are you sure you want to set this applicant(s) for building construction?</span>",
			draggable: true, 
			closable: false,           
				buttons: [{
				label: 'cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Procceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					$.post('template/Mhhp/mhhp_cons-ajaxpage.php', {
						'setuniconstruction':batchcode, 
						'applicant':applicant
					},function(data){
				  		error_dialog.close();
				  		window.location.reload();
					});
				}
				}]
			});
			message_diag.getModalHeader().css({'padding':'2.1% 5%', 'border-radius':'1px'});   
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2.1% 5%', 'height':'90px'});
		}		

	});




	// FUNCTION BUILDING COST SETUP FORM ..............................
		$('button.setbuildingcost').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> BUILDING COST SETUP:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_cons-ajaxpage.php?costingform='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Submit Cost',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {	

					var single_cost 	= $('input.single_cost').val().replace(/\s/, '');
					var dup_cost 		= $('input.dup_cost').val().replace(/\s/, '');	
					var percentage 		= $('input.percentageApply').val().replace(/\s/, '');
					var exp_s_d 		= $('input.exp_s_d').val().replace(/\s/g, '');
					var exp_r_b 		= $('input.exp_r_b').val().replace(/\s/g, '');
					var exp_z_c_l 		= $('input.exp_z_c_l').val().replace(/\s/g, '');
					var exp_b_p 		= $('input.exp_b_p').val().replace(/\s/g, '');
					var exp_b_p_f_d 	= $('input.exp_b_p_f_d').val().replace(/\s/g, '');
					var reff_s_d 		= $('input.reff_s_d').val().replace(/\s/, '');
					var reff_r_b 		= $('input.reff_r_b').val().replace(/\s/, '');
					var reff_z_c_l 		= $('input.reff_z_c_l').val().replace(/\s/, '');
					var reff_b_p 		= $('input.reff_b_p').val().replace(/\s/, '');
					var reff_b_p_f_d 	= $('input.reff_b_p_f_d').val().replace(/\s/, '');	
					
					if(single_cost!=''
						&& dup_cost!=''
						&& percentage!=''
						&& exp_s_d!=''
						&& exp_r_b!=''
						&& exp_z_c_l!=''
						&& exp_b_p!=''
						&& exp_b_p_f_d!=''
						&& reff_s_d != ''
						&& reff_r_b != ''
						&& reff_z_c_l != ''
						&& reff_b_p != ''
						&& reff_b_p_f_d != ''){
						$.post('template/Mhhp/mhhp_cons-ajaxpage.php', {
							'set_project-cost':code,
							'single_cost':single_cost,
							'dup_cost':dup_cost,
							'percentage':percentage,
							'exp_s_d':exp_s_d,
							'exp_r_b':exp_r_b,
							'exp_z_c_l':exp_z_c_l,
							'exp_b_p':exp_b_p,
							'exp_b_p_f_d':exp_b_p_f_d,
							'reff_s_d':reff_s_d,
							'reff_r_b':reff_r_b,
							'reff_z_c_l':reff_z_c_l,
							'reff_b_p':reff_b_p,
							'reff_b_p_f_d':reff_b_p_f_d},
							function(data){
								// window.location.reload();
								// $('tr.row'+code).fadeOut();
								console.log(data);
							});
					}else{
						var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> BUILDING CONSTRUCTION:</b>',
						message: "<span class='fnt14'><b>Batch Code: "+code+"</b>\n Some fields found empty. Please check the unit costing form.</span>",
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
						message_diag.getModalHeader().css({'padding':'2.1% 5%', 'border-radius':'1px'});   
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'2.1% 5%', 'height':'90px'});						
					}	

				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'0.9% 5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'0.7% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 5%', 'height':'630px', 'overflow':'auto'});
		}); 


		// FUNCTION BUILDING COST SETUP FORM ..............................
		$('button.setconstructed').on('click', function(){
			var code = $(this).attr('id');
				var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> CONSTRUCTION STATUS:</b>',
				message: "<span class='fnt14'><b>Batch Code: "+code+"</b>\n Are you sure you want to set this project batch as 'CONTRCUTED BUILDING(s)'?</span>",
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
					$.post('template/Mhhp/mhhp_cons-ajaxpage.php', {
						'setasconstructed':code
					}, function(){
						// error_dialog.close();
						window.location.reload();
					});
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'2.1% 5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.1% 5%', 'height':'90px'});	
		}); 



	// FUNCTION BUILDING COST SETUP FORM ..............................
		$('button.bldgcostdetail').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PROJECT COST DETAILS:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_cons-ajaxpage.php?projectcostingdetail='+code},
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
				message_diag.getModalHeader().css({'padding':'0.9% 5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'0.7% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 5%', 'height':'630px', 'overflow':'auto'});
		}); 


		// FUNCTION SHOW BATCH APPLICANT LIST ..............................
		$('button.batchapplicant').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> APPLICANT LIST:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_cons-ajaxpage.php?batchapplicantlist='+code},
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
				message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'415px'});
		}); 


		// ADD NEW UNIT SPECIFICATION ===================================
		$('button.adnewspec').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> ADD NEW SPEC.:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_cons-ajaxpage.php?unitspecFORM='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalBody().css({'padding':'2% 5%', 'height':'550px'});
				message_diag.getModalHeader().remove();
				message_diag.getModalFooter().remove();
		});


		// FUNCTION REMOVE UNIT SPECIFICATION  ..............................
		$('button.removespec').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> REMOVE UNIT SPEC.</b>',
				message: 'Unit Spec. will automatically be deleted from the record list. Do you want to proceed?',
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
				  error_dialog.close();
				  $.post('template/Mhhp/mhhp_cons-ajaxpage.php', {'remove_unitspec':code}, function(){
				  	$('div.spec'+code).fadeOut();
				  });
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
		}); 



		// FUNCTION SET FINAL AMORTIZATION (HOUSING) ===================================
		$('.finalamort').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION FORM:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?finalamort-form='+code},
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
				message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'650px'});
		});


		// FUNCTION AMORTIZATION SCHEDULE(HOUSING) ===================================
		$('.mhhpamrtsched').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION SCHEDULE:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?amortschedule='+code
				},
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
				message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'550px'});
		});


		// FUNCTION SHOW AMORTIZATION SCHEDULE HISTORY (HOUSING) ===================================
		$('.mhhpamorthist').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION HISTORY:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?amorthistory='+code},
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
				message_diag.getModalHeader().css({'padding':'1.9% 7.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.7% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'510px'});
		});



		// FUNCTION SHOW AMORTIZATION SCHEDULE HISTORY (HOUSING) ===================================
		$('.empamorthist').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION HISTORY:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?amorthistory='+code},
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
				message_diag.getModalHeader().css({'padding':'1.9% 7.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.7% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'510px'});
		});



		/* HR GENERATE DEDUCTION REPORTS -------------------------------- */
			$('a.printable_deduction').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-justify"></i> GENERATE PRINTABLE DEDUCTION LIST :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?printables_deductionlist'},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Generate',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  var deduction_dateSlct = $('input#deduction_dateSlct').val();
				  var doctype = $('select.doctype').val();
				  window.open('../iad/template/Mhhp/mhhp_printablesPDF.php?cutoff='+deduction_dateSlct+'&infotype='+doctype, '_blank');	
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.9% 7.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.7% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'110px'});
			});
		/* -------------------------------------------------------------- */



		// FUNCTION SELECT ALL employee (IAD AUDIT) ===============
		$('img.slctmhhpimg').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'uncck.png'){
				$('img.imgmhhp').attr({'src':'../assets/icon_index/cck.png'});
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$('img.imgmhhp').attr({'src':'../assets/icon_index/uncck.png'});
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});


		// PER EMPLOYEE SELECTION (HOUSING IAD - AUDIT) ==========
		$('img.imgmhhp').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});


		// SET EMPLOYEE FORM DEDUCTIONS (HOUSING IAD - AUDIT) ===
		$('button.mhhpsetdeduction').off().on('click', function(){
			var typ_audit = $(this).attr('name');
			var requestlst = [];
			var date_ = $('input.post-cutoff').val();

			$('img.imgmhhp').each(function(idx){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					requestlst.push($(this).attr('id').replace(/\s/g, ''));
				}
			});
			if(date_ != ''){	
				if(requestlst.length == 0){
					var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> WARNING:</b>',
						message: "\nList can't be empty, Please select an employee from the table below.",
						draggable: true, 
						closable: false,           
						buttons: [{
							label: 'Cancel',
							cssClass: 'btn-default btn-fill btn-sm',
								action: function(error_dialog) {
								  error_dialog.close();
								}
							}]
					});
					message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
			
				}else{

					var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SET DEDUCTION:</b>',
					message: "Information will be set as basis for the next deduction. Do you want to proceed?",
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
					  error_dialog.close();
					  if(typ_audit == 'PRE'){
						$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
							'setdeduction_pre':requestlst
						}, function(data){
							window.location.reload();
						});
					  }else{
					  	var dateselect = $('input.post-cutoff').val();
						$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
							'setdeduction_post':requestlst, 'date_select':dateselect
						}, function(data){
							// $('div.mhhpsetpostaudit').html(data);
							window.location.reload();
						});
					  }		 

					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
				}
			}else{
				alert("Please select date first!");
			}
		});


		// SELECT DEDUCTION DATE (IAD ACCESS) =============================================================
		$('select.mhhpslctdate').on('change', function(){
			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();			
			$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
				'viewdeduction':deduction_date
			},function(data){
					$('div#mhhpdeductioncontainer').html(data);
					// setInterval(function(){
					// }, 1000);
				});			
		});


		$('select.mhhpslctdate_iad').on('change', function(){
			// alert('data');
			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();			
			$.post('../iad/template/Mhhp/mhhp_iad-ajaxpage.php', {
				'viewdeduction':deduction_date
			},
				function(data){
					$('div#mhhpdeductioncontainer').html(data);
				});			
		});



		// SELECT DEDUCTION SUMMARY LIST  (PDF - REPORT IAD ACCESS) ====================
		$('a#btn-actg-summary-pdf').on('click', function(data){
			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summary&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val(), '_blank');
		});

		$('a#btn-actg-slip-pdf').on('click', function(data){
			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slip&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val(), '_blank');
		});



		// SELECT DEDUCTION SUMMARY LIST  (PDF - REPORT IAD ACCESS) ====================
		$('a#btn-audited-summary-pdf').on('click', function(data){
			window.open('template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summary&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val(), '_blank');
		});


		// SELECT DEDUCTION SLIP LIST  (PDF - REPORT IAD ACCESS) =======================
		$('a#btn-audited-slip-pdf').on('click', function(data){
			window.open('template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slip&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val(), '_blank');
		});


		// GET PREVIOUS DEDUCTION LIST () ==============================================
		$('input.post-cutoff').on('change', function(){
			var date_slct = $(this).val();
			$('div.mhhpsetpostaudit').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
				'select_post_auditlist':date_slct
			},function(data){
					$('div.mhhpsetpostaudit').html(data);
			});

		});


		// SHOW TEST SCEHDULE (HR ACCESS)-----------------------------------
		$('button.createsched').on('click', function(){
			var serialcode = $(this).attr('id');

			var currentbalance = $('input.currentbalance').val().replace(/\s/g, '');
			var amortamount = $('input.amortamount').val().replace(/\s/g, '');
			var percentage = $('input.Percentage').val().replace(/\s/g, '');
			var dateeffect = $('input.dateeffect').val().replace(/\s/g, '');

			if(currentbalance != '' && amortamount !=''){
				$('div.sched_table').html('<span class="col-md-12 " style="font-size:15px;" ><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
				$.post('template/Mhhp/mhhp_ajaxpage.php',
					{'createshced_balanceentry':'', 'currentbalance':currentbalance, 'percentage':percentage, 'amortamount':amortamount, 'deduction_date':dateeffect},
					function(data){
							$('div.sched_table').html(data);	
					});
			}

		});

		
		$('input#emp_searchHR').on('keyup', function(){
			var valemp = $(this).val().replace(/\s/g, '');
			var nameVT = $(this).attr('name').replace(/\s/g, '');
			if(nameVT != 'SITE'){				
				if(valemp != ''){
					$.post('template/Mhhp/mhhp_ajaxpage.php', {'search_empHR':$(this).val()},
						function(data){
							$('ul#emp_list').show().html(data);
					});
				}else{
					$('ul#emp_list').fadeOut();
				}
				$('input.empidHR').empty();
			}
		});


		// BALANCES ENTRY SAVING FUNCTION ===================================
		$('button.blncsENTRYsave').on('click', function(){
			var imgUNIT = null;

			$('img.imgUNIT').each(function(){
				var imgSRC = $(this).attr('src').split('/')[3];
				if(imgSRC == 'cck.png'){
					imgUNIT = $(this).attr('id');
				}
			});

			var imgPROGRAM = null;
			$('img.imgPROGRAM').each(function(){
				var imgSRC = $(this).attr('src').split('/')[3];
				if(imgSRC == 'cck.png'){
					imgPROGRAM = $(this).attr('id');
				}
			});

			var empname = $('input#emp_searchHR').val();
			var empidHR = $('input.empidHR').val();
			var applieddate = $('input.applieddate').val();
			var undeductedamt = $('input.undeductedamt').val();
			var currentbalance = $('input.currentbalance').val();
			var amortamount = $('input.amortamount').val();
			var dateeffect = $('input.dateeffect').val();
			var percentage = $('input.Percentage').val().replace(/\s/g, '');
			if(imgUNIT != null
				&& imgPROGRAM != null
				&& empidHR.replace(/\s/g, '') != ''
				&& applieddate.replace(/\s/g, '') != ''
				&& undeductedamt.replace(/\s/, '') != ''
				&& currentbalance.replace(/\s/g, '') != ''
				&& amortamount.replace(/\s/g, '') != ''
				&& dateeffect.replace(/\s/g, '') != ''
				&& percentage.replace(/\s/g, ''))
			{	

				var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SUBMIT INFORMATION:</b>',
				message: "You are about to submit an amortization data for "+empname+". Are you sure you want to proceed?",
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
					$.post('template/Mhhp/mhhp_ajaxpage.php', {'saveBalanceEntry':'',
						'imgUNIT':imgUNIT,
						'imgPROGRAM':imgPROGRAM,
						'empname':empname,
						'empidHR':empidHR,
						'applieddate':applieddate,
						'undeducted':undeductedamt,
						'currentbalance':currentbalance,
						'amortamount':amortamount,
						'dateeffect':dateeffect,
						'percentage':percentage},
					function(data){
				  		window.location.reload();
				  		// $('div.dvtry').html(data);
					});
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'80px'});

			}else{
				var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> WARNING:</b>',
				message: "Some Field found empty, Please check the form for balances entry module.",
				draggable: true, 
				closable: false,           
				buttons: [{
				label: '&nbsp;okay&nbsp;',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});
			}

		});



		// DROP OFF DEDUCTION AMOUNT ==============================
		$('.dropoffamount').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DROP-OFF DEDUCTION:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?dropoffamort='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					var fixed_amt = $('input.fixedAMT').val();
					var sched_date = $('input#scheduled_date').val();
					var split_amt = $('input.dropoffAMT').val();
					var selectedDATE= $('input#deduction_dateSlct').val();
					var autoIMG = $('.splitauto').attr('id');

					if(fixed_amt.replace(/\s/g, '') != '' && split_amt.replace(/\s/g, '') != '' && selectedDATE.replace(/\s/g, '') != ''){
						$.post('template/Mhhp/mhhp_ajaxpage.php', {
							'saveDropoffDeduction':code,
							 'fixed_amt':fixed_amt, 
							 'sched_date':sched_date,
							 'split_amt':split_amt,
							 'selectedDATE':selectedDATE,
							 'autoIMG':autoIMG
						}, function(data){
				  			error_dialog.close();
				  			alert('Division of deduction ammount for '+sched_date+' was submitted successfully.');
						});
					}else{
						alert("Process can't be completed, Please check the Drop off form before submission.");
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 7.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.5% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'470px'});
		});



		// BU SELECTION =============================================
		$('a.selectBU-payroll').on('click', function(){
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SELECT BUSINESS UNIT:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_payroll-ajaxpage.php?list_BU'},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	// error_dialog.close();
				  	var buSET = '';
				  	$('img[id^=img]').each(function(){
				  		var img_SRC = $(this).attr('src').split('/')[3];
				  		if(img_SRC == 'cck.png'){				  			
				  			buSET+=$(this).attr('id').replace(/img/g, '')+'|';
				  		}
				  		window.open('?id=mhhp_deduction&bu_set=['+buSET+']', '_self');
				  	});
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().remove();   
				message_diag.getModalFooter().css({'padding':'1.5% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'455px'});			
		});




		// FUNCTION SELECT DATE FOR UNCLOSE DEDUCTION ======================
		$('.unCLS_dedPayroll').on('change', function(){
			var bulist = $('input[id=BUlist]').val().replace(/\s/, '');
			var date_select = $('select[id=ded_yrs]').val()+'-'+$('select[id=ded_ctoff]').val();
			$.post('template/Mhhp/mhhp_ajaxpage-table.php', {'getlistUNclose':date_select, 'bulist_of':bulist}, function(data){
				$('div[id=mhhpdeductioncontainer]').html(data);
			});
		});


		// FUNCTION SELECT DATE FOR REMITTANCE LIST =======================
		$('.remittancelist_Payroll').on('change', function(){
			var date_select = $('select[id=ded_yrs]').val()+'-'+$('select[id=ded_ctoff]').val();
			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			$.post('template/Mhhp/mhhp_ajaxpage-table.php', {'remittancelist':date_select}, function(data){
				$('div[id=mhhpdeductioncontainer]').html(data);
			});
		});


		// GENERATE CSV FILE (PAYROLL ACCESS) ============================
		$('.unclosededuction_csv').on('click', function(data){
			var bulist = $('input[id=BUlist]').val().replace(/\s/, '');
			var date_select = $('select[id=ded_yrs]').val()+'-'+$('select[id=ded_ctoff]').val();
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> Generate CSV File:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_payroll-ajaxpage.php?formgenerateCSV='+bulist+'&date-ded='+date_select},
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
					var csvtype = null;
					$('img[class^=img_]').each(function(idx){
						var img_ = $(this).attr('src').split('/')[3];
						if(img_ == 'cck.png'){
						csvtype = $(this).attr('class');
						}
					});
					var mhdedType = $('input.mhdedType').val();
					var mhdedCode = $('input.mhdedCode').val();
					var hbdedType = $('input.hbdedType').val();
					var hbdedCode = $('input.hbdedCode').val();

					if(csvtype == null){
						alert("Process can't be completed, Please select CSV File type.");
					}
					else if(mhdedType.replace(/\s/g, '') == ''
						|| mhdedCode.replace(/\s/g, '') == ''
						|| hbdedType.replace(/\s/g, '') == ''
						|| hbdedCode.replace(/\s/g, '') == ''){
						alert("Process can't be completed, Please specify a deduction details.");
						$('input.mhdedType').val();
						$('input.mhdedCode').val();
						$('input.hbdedType').val();
						$('input.hbdedCode').val();
					}
					else{
						window.location.href='template/Mhhp/mhhp_generate-csvfile.php?csvtype='+csvtype+'&bulist='+bulist+'&deddate='+date_select+'&mhdedType='+mhdedType+'&mhdedCode='+mhdedCode+'&hbdedType='+hbdedType+'&hbdedCode='+hbdedCode;
						error_dialog.close();
					}

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().remove();   
				message_diag.getModalFooter().css({'padding':'1.5% 7.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'410px'});		
		});



		/* ----------------- PAYROLL ACCESS SELECT DATE HRMS ARCHIVE -------- */
		$('.archdate').on('change', function(){
			var dateselect = $(this).val(); 
			$('#mhhpdeductioncontainer').html('<img src="../assets/img/loading.gif" width="20">&nbsp;&nbsp;Please wait...');
			$.post('template/Mhhp/mhhp_ajaxpage-table.php', {'selectdate_hrmsarchive':dateselect}, function(data){
				$('#mhhpdeductioncontainer').html(data);
			});
		});



		/* SELECTION (CSV ARCHIVE) ------------------------------------------ */
		$('#selectcsvbtn').on('click', function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
				$('img.per_imgcsv').attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
				$('img.per_imgcsv').attr({'src':'../assets/icon_index/uncck.png'});
			}
		});


		/* SELECTION (CSV ARCHIVE-INDIVIDUAL) ------------------------------- */
		$('.per_imgcsv').on('click', function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});


		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.viewhrmsarchive').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> CSV CONTENT MONITORING:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_payroll-ajaxpage.php?viewhrmscsvcontent='+code},
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
				message_diag.getModalHeader().css({'padding':'1% 4%'});
				message_diag.getModalFooter().css({'padding':'0.5% 4%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 4%', 'height':'500px'});			
		});	



		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.overallposting').on('click', function(){
			var filecsv = [];
			$('.per_imgcsv').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					var csv_dir = $(this).attr('id');
					filecsv.push(csv_dir);
				}
			});

			if(filecsv.length == 0){
				alert('Please CSV file on the table below.');
			}else{

			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> POST CSV CONTENT</b>',
				message: '<span class="fnt13">Posting this data will automatically affect the current information of designated employee for <b>housing deductions</b>. \n Are sure you want to proceed? </span>',
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();				  
				  	window.location.href = "?id=mhhp-hrmscsvposting&file="+filecsv;
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2% 6.5%'});
				message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});			
			}
		});



		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		// $('.csvposting').on('click', function(){
		// 	var filecsv = $(this).attr('id');
		// 	var message_diag = new BootstrapDialog.show({
		// 		size: BootstrapDialog.SIZE_SMALL,
		// 		type: BootstrapDialog.TYPE_DEFAULT,
		// 		title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> POST CSV CONTENT</b>',
		// 		message: '<span class="fnt13">Posting this data will automatically affect the current information of designated employee for <b>housing deductions</b>. \n Are sure you want to proceed? </span>',
		// 		draggable: true, 
		// 		closable: false,           
		// 		buttons: [{
		// 		label: 'cancel',
		// 		cssClass: 'btn-default btn-fill btn-sm',
		// 		action: function(error_dialog) {
		// 		  	error_dialog.close();
		// 		}
		// 		},{
		// 		label: 'Proceed',
		// 		cssClass: 'btn-success btn-fill btn-sm',
		// 		action: function(error_dialog) {
		// 		  	error_dialog.close();
		// 		  	// window.open('?id=mhhp-hrmscsvposting&file='+filecsv, '_self');
		// 		  	window.location.href = "?id=mhhp-hrmscsvposting&file="+filecsv;
		// 		}
		// 		}]
		// 		});
		// 		message_diag.getModalContent().css('border-radius', '2px');
		// 		message_diag.getModalHeader().css({'padding':'2% 6.5%'});
		// 		message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
		// 		message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});			
		// });



		/* ----------------- FUNCTION DEDUCTION MONITORING ------------------ */
		$('.mhhpdedmornitor').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				// title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DEDUCTION MONITORING:</b>',
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING : <span style="color:#009900">'+code+'</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?deductionmonitoring='+code
				},
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
				message_diag.getModalHeader().css({'padding':'1% 4%'});
				message_diag.getModalFooter().css({'padding':'0.5% 4%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 4%', 'height':'650px'});			
		});	



		/* PARTIAL DEDUCTION MODAL ================================ */
		$('.partialDEDuction').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PARTIAL DEDUCTIONS MONITORING:</b> ',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_ajaxpage.php?partialdeductionlist='+code},
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
				// message_diag.getModalHeader() 
				message_diag.getModalHeader().remove();
				message_diag.getModalFooter().css({'padding':'1.2% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 5%', 'height':'500px'});						
		});







		/* ------------------------------------ FUNCTION FOR ACCOUNTING ACCESS ----------------------------------------- */

		// FUNCTION AMORTIZATION SCHEDULE(HOUSING) ===================================
		$('.actgemployeeSCHED').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION SCHEDULE:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?amortschedule='+code},
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
				message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'550px'});
		});


		/* ----------------- FUNCTION DEDUCTION MONITORING ------------------ */
		// $(document).on('click','.actgdedcutionmonitor',function(){
		$('.actgdedcutionmonitor').off().on('click', function(){
			var coded = $(this).attr('id');
			// coded =	parseInt(coded, 10);
			console.log(coded);
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DEDUCTION MONITORING:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				// data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?deductionmonitoring='+code},
				data: {'pageToLoad':'../accounting/template/Mhhp/function/temp_ajax.php?deductionmonitoring='+coded},
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
				message_diag.getModalHeader().css({'padding':'1% 4%'});
				message_diag.getModalFooter().css({'padding':'0.5% 4%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 4%', 'height':'900px'});			
		});	


		/* PARTIAL DEDUCTION MODAL ================================ */
		$('.actgpartialDEDuction').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PARTIAL DEDUCTIONS MONITORING:</b> ',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?partialdeductionlist='+code},
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
				message_diag.getModalHeader().remove();
				message_diag.getModalFooter().css({'padding':'1.2% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 5%', 'height':'500px'});						
		});


		/* INCASH PAYMENT MODAL ================================ */
		$('.actgincashpayment').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEIDUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> IN-CASH PAYMENT :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?incashpaymentform='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {

					var balCURRENT = $('input.balCURRENT').val();
					var deduction_date = $('input#deduction_date').val();
					var amtINTEREST = $('input.amtINTEREST').val();
					var amtPRINCIPAL = $('input.amtPRINCIPAL').val();
					var balPAYABLE = $('input.balPAYABLE').val();
					var deduction_default = $('input.amtPRESENTED').attr('name');
					var amtPRESENTED = $('input.amtPRESENTED').val();
					
					if(parseFloat(deduction_default) > parseFloat(amtPRESENTED)){
						alert('Amount must not be less than to '+ deduction_default);
					}else{

						var con = confirm("This entry will automatically affect the current data of the designated employee for Housing Program. Click 'Ok' to proceed.");
						if(con == true){
							$.post('template/Mhhp/mhhp_actg-ajaxpage.php?saveincaspayment',
									{'code':code,
									'balCURRENT':balCURRENT,
									'deduction_date':deduction_date,
									'amtINTEREST':amtINTEREST,
									'amtPRINCIPAL':amtPRINCIPAL,
									'balPAYABLE':balPAYABLE,
									'amtPRESENTED':amtPRESENTED},
									function(data){
									window.location.reload();
									// error_dialog.close();	
									// $('div.alert-default').html(data);			
							});
						}
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.5% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 6.5%', 'height':'320px'});
		});



		/* INCASH PAYMENT MODAL ================================ */
		$('.actgadvancepayment').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEIDUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> ADVANCE PAYMENT :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?advancepaymentform='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: '<i class="fa fa-bookmark fa-fw"></i> History',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(error_dialog) {
				 	 var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_MEIDUM,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> IN-CASH PAYMENT HISTORY:</b>',
						message: function(dialog) {
							var content = $('<div></div>');
							var page = dialog.getData('pageToLoad');
							content.load(page);    
							return content;
						},
						data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?incashpaymenthistory='+code},
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
						message_diag.getModalHeader().css({'padding':'1.5% 6.5%', 'border-radius':'1px'});   
						message_diag.getModalFooter().css({'padding':'1.5% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'1% 6.5%', 'height':'450px'});
				}
				},{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill active btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					var date_start = $('input#startdate').val().replace(/\s/, '');
					var current_val = $('input.balCURRENT').val().replace(/\s/, '');
					var amrt_amount = $('input.amtPRESENTED').val().replace(/\s/, '');
					var terms = $('select.numterms').val().replace(/\s/, '');
					var code = $('select.numterms').attr('id');

					if(date_start == ''
					|| current_val == ''
					|| amrt_amount == ''
					|| terms == ''){
					alert('Please check your information.');
					}else{
						var con = confirm("This action will automaticaly affect the information of designated employe for housing deductions.\n Do wish to continue? click 'OK'");
						if(con == true){
							$.post('template/Mhhp/mhhp_actg-ajaxpage.php',
							{'adv_pay-saving':'',
							'code':code,
							'date_start':date_start,
							'current_val':current_val,
							'amrt_amount':amrt_amount,
							'terms':terms},
							function(data){
								window.location.reload();
							});
						}
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 5%', 'height':'450px'});
		});



		/* PARTIAL PAYMENT MODAL ================================ */
		$('.actgpartialpayment').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEIDUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i>PARTIAL  PAYMENT:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?partialpaymentform='+code},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: '<i class="fa fa-bookmark fa-fw"></i> History',
				cssClass: 'btn-default btn-fill btn-sm active pull-left',
				action: function(error_dialog) {
				  	 var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_MEIDUM,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> PARTIAL PAYMENT HISTORY:</b>',
						message: function(dialog) {
							var content = $('<div></div>');
							var page = dialog.getData('pageToLoad');
							content.load(page);    
							return content;
						},
						data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?partialpaymenthistory='+code},
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
						message_diag.getModalHeader().css({'padding':'1.5% 6.5%', 'border-radius':'1px'});   
						message_diag.getModalFooter().css({'padding':'1.5% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'1% 6.5%', 'height':'450px'});
				}
				},{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {

					var amtPRESENTED = $('input.amtPRESENTED').val();
					var deduction_date = $('input#deduction_date').val();
					var amtINTEREST = $('input.amtINTEREST').val();
					var amrtamount = $('input.amrtamount').val();
					if(amtPRESENTED.replace(/\s/g, '') == ''
						|| deduction_date.replace(/\s/g, '') == ''
						|| amtINTEREST.replace(/\s/g, '') == ''
						|| amrtamount.replace(/\s/g, '') == ''){
						alert("Process can't be completed. Please check your information.");
					}else{

						var con = confirm("Employee housing deductions will automaticaly be affected by this process. Do you want to proceed \n Click 'Ok' to proceed.");
						if(con == true){
							$.post('template/Mhhp/mhhp_actg-ajaxpage.php?savepartial_payment',
									{'code':code,
									'amtPRESENTED': amtPRESENTED},
									function(data){
									window.location.reload();
							});
						}
					}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'1.5% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 6.5%', 'height':'350px'});
		});

		

		// FUNCTION AMORTIZATION SCHEDULE(HOUSING-LEGAL DEPT) ===================================
		$('.legalmhhpamrtsched').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> AMORTIZATION SCHEDULE:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?amortschedule='+code},
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
				message_diag.getModalHeader().css({'padding':'0.9% 2.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 2.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1% 2.5%', 'height':'550px'});
		});


		/* ----------------- FUNCTION DEDUCTION MONITORING (HOUSING LEGAL DEPT) ------------------ */
		$('.legalmhhpdedmornitor').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DEDUCTION MONITORING:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?deductionmonitoring='+code},
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
				message_diag.getModalHeader().css({'padding':'1% 4%'});
				message_diag.getModalFooter().css({'padding':'0.5% 4%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.5% 4%', 'height':'900px'});			
		});	




		/* HOUSING PROGRAM DEDUCTION DETAILS ============================== */
		$('a.empDeductionMnthly').on('click', function(){
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
			message_diag.getModalHeader().css({'padding':'1.5% 7%'});
			message_diag.getModalFooter().css({'padding':'1.2% 7%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 7%', 'height':'450px'});			
		});
		/* ================================================================ */


		/* ------------- IMG SECLECTION OF FILE --------------------------- */	
		$('img.pstimgcsv').on('click', function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'uncck.png'){
				$(this).attr({'src':'../assets/icon_index/cck.png'});
			}else{
				$(this).attr({'src':'../assets/icon_index/uncck.png'});
			}
		});
		/* ---------------------------------------------------------------- */






		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */
		/* PDF SETUP ------------------------------------------------------ */
		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.pdfsetUPactg').on('click', function(){
			var code = $(this).attr('id');
			var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> GENERATE PDF COPY:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?pdfsetup_actg'
				},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn btn-default btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn btn-success btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	var filerpdf = $('img[name=imgUSED]').attr('id');
				  	var reporttype = $('.typereport').val();
				  	if(filerpdf === 'ALL'){
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summary&date='+date_filter, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slip&date='+date_filter, '_blank');
				  		}
				  	}else if(filerpdf === 'PCC'){
				  		var pcc = $('.pcclist').val();
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summaryPCC&date='+date_filter+'&PCC='+pcc, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slipPCC&date='+date_filter+'&PCC='+pcc, '_blank');
				  		}
				  	}

				
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 8%'});
				message_diag.getModalFooter().css({'padding':'2.5% 8%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 8%', 'height':'240px'});			
		});

		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */
		/* PDF SETUP ------------------------------------------------------ */
		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */

		/*============================= FOR HABITAT REPORT ==========================*/
		$('.pdfsetupHBT').on('click', function(){
			var code = $(this).attr('id');
			var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> GENERATE PDF COPY:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?pdfsetup_actg_hbt'
				},
				draggable: true, 
				closable: false,           
				buttons: [{
					label: 'Close',
					cssClass: 'btn btn-default btn-sm',
					action: function(error_dialog) {
					  	error_dialog.close();
					}
				},{
				label: 'Proceed',
				cssClass: 'btn btn-success btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	var filerpdf = $('img[name=imgUSED]').attr('id');
				  	var reporttype = $('.typereport').val();
				  	if(filerpdf === 'ALL'){
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summaryHBT&date='+date_filter, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slip_HBT&date='+date_filter, '_blank');
				  		}
				  	}else if(filerpdf === 'PCC'){
				  		var pcc = $('.pcclist').val();
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-summaryPCC_HBT&date='+date_filter+'&PCC='+pcc, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_deduction-slipPCC_HBT&date='+date_filter+'&PCC='+pcc, '_blank');
				  		}
				  	}

				
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 8%'});
				message_diag.getModalFooter().css({'padding':'2.5% 8%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 8%', 'height':'240px'});			
		});



		
		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */
		/* PDF SETUP ------------------------------------------------------ */
		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.printablesGEN').on('click', function(){
			var code = $(this).attr('id');
			// var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> GENERATE UNAUDITED PRINTABLES :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?printable_genACTG'
				},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn btn-default btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn btn-success btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	var deductiondate 	= $('input#deduction_date').val();
				  	var filerpdf 		= $('img[name=imgUSED]').attr('id');
				  	var reporttype 		= $('select.typereport').val();
				  	if(filerpdf === 'ALL'){
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_genprintSUMMARY&date='+deductiondate, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_genprintSLIP&date='+deductiondate, '_blank');
				  		}
				  	}else if(filerpdf === 'PCC'){
				  		var pcc = $('.pcclist').val();
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_genprintSUMMARYPCC&date='+deductiondate+'&PCC='+pcc, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_iad-reportPDF.php?type=mhhp_genprintSLIPPCC&date='+deductiondate+'&PCC='+pcc, '_blank');
				  		}
				  	}

				
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.3% 6%'});
				message_diag.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.3% 6%', 'height':'280px'});			
		});









		/* UNDEDUCTED LIST ================================================ */
		$('.undeductedlist').on('click', function(){
			var serial = $(this).attr('id');			
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> UNDEDUCTED MONITORING:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?getundeductedlist='+serial},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn-default btn-fill btn-sm pull-left',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Forwarded Amount History',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  	var histmessage = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> LIST OF FORWARDED AMOUNT:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);    
						return content;
					},
					data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?forwardamount_undeducted='+serial},
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(diagDATA) {
					  	diagDATA.close();
					}
					}]
					});
					histmessage.getModalContent().css('border-radius', '2px');
					histmessage.getModalHeader().css({'padding':'1.5% 7%'});
					histmessage.getModalFooter().css({'padding':'1.2% 7%', 'background-color':'#fcf8e3'});
					histmessage.getModalBody().css({'padding':'1.2% 7%', 'height':'400px'});	
				}
				},{
				label: 'Forward to next deduction',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
				  	var undeducted_total = $('.ttldeduction').attr('id');

				  	if(parseFloat(undeducted_total) > 0){
				  		var deductionnxt = $('.ttldeduction').attr('for');
						
						var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> FORWARD UNDEDUCTED AMOUNT</b>',
						message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);    
						return content;
						},
						data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?frwdUndFORM='+serial+'&amt='+undeducted_total},
						draggable: true, 
						closable: false,           
						buttons: [{
						label: 'cancel',
						cssClass: 'btn-default btn-fill btn-sm',
						action: function(error_dialog) {
						  	error_dialog.close();
						}
						},{
						label: 'Proceed',
						cssClass: 'btn-success btn-fill btn-sm',
						action: function(error_dialog) {
							var amtFRWD = $('input.amtFrd').val();
							var deddateFRWD = $('input#deduction_date').val();
							var con = confirm("This action will automatically increase the deduction of the respected employee. Do wis to forward this amount to iad access? \n Click 'Ok' to proceed. ");					  	
						  	if(con == true){
						  	$.post('template/Mhhp/mhhp_actg-ajaxpage.php', {'forwarddeduction':serial, 'amountunded':amtFRWD,  'nxtcutoff':deddateFRWD }, function(data){
						  		window.location.reload();
						  	});		  
						  	}
						}
						}]
						});
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalHeader().css({'padding':'2% 6.5%'});
						message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'150px'});				  	
				  	}


				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.7% 3.5%', 'height':'500px'});
		});		
		
		/* ================================================================ */
		/* ================================================================ */




		/* UNDEDUCTED LIST ================================================ */
		$('.empundeductedlist').on('click', function(){
			var serial = $(this).attr('id');			
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> UNDEDUCTED MONITORING:</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?getundeductedlist='+serial},
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
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.7% 3.5%', 'height':'500px'});
		});		
		
		/* ================================================================ */




		/* ================================================================== */
		/* ================================================================== */
		/* FUNCTION WALKIN  PAYMENTION FORM ================================= */
		$('.walkinpay').on('click', function(){
			var serial = $(this).attr('id');			
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> WALK-IN PAYMENT FORM: </b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?walkinpaymentform='+serial},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	console.clear();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm wknsavebtn',
				action: function(error_dialog) {
					var deduction_date 	= $('#deduction_date').val();
					var wlkpay_OR 		= $('.wlkpay-OR').val();
					var wlkpay_AMT		= $('.wlkpay-AMT').val();

					if(deduction_date.replace(/\s/g, '') == ''
					|| wlkpay_OR.replace(/\s/g, '') == ''						
					|| wlkpay_AMT.replace(/\s/g, '') == ''
					|| wlkpay_AMT.replace(/\s/g, '') == '0.00'){
						alert("Process cannot be completed.\nThe data needed for this action must be provided correctly.");
					}else{
					  	var con = confirm("This entry automatically affect with the existing information for "+serial+". Do want to continue? Click 'OK'");
					  	if(con === true){
					  		$.post('template/Mhhp/mhhp_actg-ajaxpage.php', {
					  			'walkinpaymentsave':serial,
					  			'deduction_date':deduction_date,
					  			'wlkpay_AMT':wlkpay_AMT,
					  			'wlkpay_OR':wlkpay_OR
					  		}, function(datares){
							  	console.log(datares);

									var contentMSG = '<img src="../assets/icon_index/successcheck.png" width="35">';
									contentMSG +='<b style="font-size:14px;">&nbsp;&nbsp;&nbsp;&nbsp;Transaction completed.</b>';

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
												window.location.reload();
							  					error_dialog.close();
										}, 1000);
					  		});					  	
					  	}
					}

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 6%'});
				message_diag.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.2% 6%', 'height':'365px'});
		});


		/* ================================================================== */
























		/* ================================================ */
		/* ================================================ */
		/* ================================================ */
		/* HABITAT JS FUNCTION ============================ */

		$('.createschedHBT').on('click', function(){
			var schedtype_ 		= 'monthlysched';
			$('.imgsched').each(function(idx){
				var img_ = $(this).attr('src').split('/')[3];
				if(img_ == 'cck.png'){
					schedtype_ = $(this).attr('id');
				}
			});
			var currentbalance 	= $('input.currentbalance').val().replace(/\s/g, '');
			var amortamount 	= $('input.amortamount').val().replace(/\s/g, '');	
			var dateeffect 		= $('input.dateeffect').val().replace(/\s/g, '');

			if(currentbalance != 0 && amortamount != 0){
				$('div.sched_table').html('<span class="col-md-12 " style="font-size:15px;" ><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
				$.post('template/Mhhp/mhhp_ajaxpage.php',
					{'createshced_balanceentryHBT':'', 'currentbalance':currentbalance, 'amortamount':amortamount, 'deduction_date':dateeffect, 'schedtype_':schedtype_},
					function(data){
							$('div.sched_table').html(data);	
					});
			}
		});


		$('.imgsched').on('click', function(idx){
			$('.imgsched').attr({'src':'../assets/icon_index/uncck.png'});
			$(this).attr({'src':'../assets/icon_index/cck.png'});
		});




		// BALANCES ENTRY SAVING FUNCTION ===================================
		$('button.blncsENTRYsaveHBT').on('click', function(){
			var imgUNIT = null;
			$('img.imgUNIT').each(function(){
				var imgSRC = $(this).attr('src').split('/')[3];
				if(imgSRC == 'cck.png'){
					imgUNIT = $(this).attr('id');
				}
			});

			var schedtype_ 		= 'monthlysched';
			$('.imgsched').each(function(idx){
				var img_ = $(this).attr('src').split('/')[3];
				if(img_ == 'cck.png'){
					schedtype_ = $(this).attr('id');
				}
			});

			var empname 		= $('input#emp_searchHR').val();
			var empidHR 		= $('input.empidHR').val();
			var applieddate 	= $('input.applieddate').val();
			// var undeductedamt 	= $('input.undeductedamt').val();
			var currentbalance 	= $('input.currentbalance').val();
			var amortamount 	= $('input.amortamount').val();
			var dateeffect 		= $('input.dateeffect').val();


			if(imgUNIT != null
				&& empidHR.replace(/\s/g, '') != ''
				&& applieddate.replace(/\s/g, '') != ''
				&& currentbalance.replace(/\s/g, '') != ''
				&& amortamount.replace(/\s/g, '') != ''
				&& dateeffect.replace(/\s/g, '') != ''
				&& schedtype_.replace(/\s/g, '') != '')
			{	

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SUBMIT INFORMATION:</b>',
					message: "You are about to submit an amortization data for "+empname+". Do you wish to proceed?",
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
						$.post('template/Mhhp/mhhp_ajaxpage.php', {'saveBalanceEntry_HBT':'',
							'imgUNIT':imgUNIT,
							'empname':empname,
							'empidHR':empidHR,
							'applieddate':applieddate,
							'currentbalance':currentbalance,
							'amortamount':amortamount,
							'dateeffect':dateeffect,
							'schedtype_':schedtype_},
						function(data){
							error_dialog.close();
							alert("\t\t\t----- Balance was successfully Save -----");
					  		window.location.reload();
					  		// $('div.miNS').html(data);
						});
					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'80px'});

			}else{
				var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> WARNING:</b>',
				message: "Some Field found empty, Please check the form for balances entry module.",
				draggable: true, 
				closable: false,           
				buttons: [{
				label: '&nbsp;okay&nbsp;',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});
			}

		});





		/* ====================================================== */
		/* ====================================================== */
		/* FUNCTION GET AMORTIZATION DETAILS (HABITAT) ========== */
		$('.hbtamortsched').on('click', function(){
			var code_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SCHEDULE: '+code_+'</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?hbt_amortsched_='+code_
				},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Change Schedule',
				cssClass: 'btn-danger btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				  hbt_changeschedule(code_);
				}
				},{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.9% 3.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0% 3.5%', 'height':'550px'});
		});

		/* ====================================================== */





		/* ================================================================== */
		/* ================================================================== */
		/* Change habitat paymentsched mode(DEFAULT/SPLITTED) =============== */
		$('.hrpayTmode').on('click', function(idx){
			var reqcode_ 		= $(this).attr('id');	
			var currentmode_ 	= $(this).attr('for');			
			if(currentmode_ == 1){
				var currentmode_CH 	= 'MONTHLYSCHED';
				var schedIN_ 		= 'per cut-off to monthly schedule';
			}
			else{
				var currentmode_CH 	= 'CUTOFFSCHED';
				var schedIN_ 		= 'monthly to per cut-off schedule';
			}

			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"> CHANGE SCHEDULE TYPE:</b>',
				message: "<span class='fnt13'>REQUEST CODE: "+reqcode_+"\nYou are about to change the payment scheme of this person from <u>"+schedIN_+"</u>.\nDo you wish to proceed?</span>",
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					$.post('template/Mhhp/mhhp_ajaxpage.php', {'hbt_changepayscheme':reqcode_, 'scheme_':currentmode_CH}, function(idx){
						window.location.reload();
				  		error_dialog.close();
					});
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'100px'});


		});













		/* ========================================================================= */
		/* ACCOUTING HABITAT JS FUNCTIONS ========================================== */
		$('.accpayTmode').on('click', function(){
			var reqcode_ 		= $(this).attr('id');	
			var currentmode_ 	= $(this).attr('for');			
			if(currentmode_ == 1){
				var currentmode_CH 	= 'DEDUCTION';
				var schedIN_ 		= 'in-cash to deduction payment type';
			}
			else{
				var currentmode_CH 	= 'INCASH';
				var schedIN_ 		= 'deduction to in-cash payment type';
			}


			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"> PAYMENT TYPE:</b>',
				message: "<span class='fnt13'>REQUEST CODE: "+reqcode_+"\nYou are about to change the payment scheme of this person from <u>"+schedIN_+"</u>.\nDo you wish to proceed?</span>",
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					$.post('template/Mhhp/mhhp_actg-ajaxpage.php', {'hbt_changepaytype':reqcode_, 'scheme_':currentmode_CH}, function(idx){
						window.location.reload();
				  		error_dialog.close();
					});
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'100px'});
		});








		/* ====================================================================== */
		/* HABITAT CHANGE PAYMENT LOCATION ====================================== */
		$('.accpayTloc').on('click', function(){
			var reqcode_ 		= $(this).attr('id');	
			var currentloc_ 	= $(this).attr('for');			
			if(currentloc_ == 1){
				var currentloc_CH 	= 'INTERNAL';
				var locationIN_ 	= 'Habitat office to internal accounting';
			}
			else{
				var currentloc_CH 	= 'HABITAT';
				var locationIN_ 	= 'Internal acounting to habitat office';
			}

			// alert(currentloc_CH);
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"> PAYMENT LOCATION:</b>',
				message: "<span class='fnt13'>REQUEST CODE: "+reqcode_+"\nYou are about to change the payment location of this person from <u>"+locationIN_+"</u>.\nDo you wish to proceed?</span>",
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn-success btn-fill btn-sm',
				action: function(error_dialog) {
					$.post('template/Mhhp/mhhp_actg-ajaxpage.php', {'hbt_changepaylocation_':reqcode_, 'hbtlocation_':currentloc_CH}, function(idx){
						window.location.reload();
				  		error_dialog.close();
					});
				}
				}]
				});
				message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'100px'});



		});







		$('.hbtact_cancel').on('click', function(idx){
			$('td[id^=tdr_]').each(function(idx){
				var num_ = $(this).attr('for');
				$(this).html(num_);
			});
			$('button.hbtact_proceed').prop('disabled',true);
			$('button.hbtact_cancel').prop('disabled',true);
		});


		$('.hbtactionSLCT').on('change', function(idx){	
			$('td[id^=tdr_]').each(function(idx){
				var reqcode = $(this).attr('id').split('_')[1];
				var img_TD 	= "<img id='"+reqcode+"' class='hvbtimg_' onclick=\"hbt_imgtbl('uncck.png', '"+reqcode+"')\" src='../assets/icon_index/uncck.png' style='width:20px;cursor:pointer' />";
				$(this).html(img_TD);
			});
			$('button.hbtact_proceed').prop('disabled',false);
			$('button.hbtact_cancel').prop('disabled',false);
		});


		$('.hbtact_proceed').on('click', function(data){
			var reqode_ = [];
			$('.hvbtimg_').each(function(){
				var img_ = $(this).attr('src').split('/')[3];
				if(img_ == 'cck.png'){
					reqode_.push($(this).attr('id'));
				}
			});


			if(reqode_.length != 0){
				var lst_str = "";
				for(var bn = 0; bn <= reqode_.length-1; bn++){
					lst_str += "&nbsp;&nbsp;&nbsp;*"+reqode_[bn]+"\n";
				}
				var module_CHNG = $('.hbtactionSLCT').val();
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"> CHANGE SCHEDULE TYPE:</b>',
					message: "<span class='fnt13'\nYou are about to change the payment scheme for the list of employee you've selectec.\nDo you wish to proceed?\nREQCODE:\n"+lst_str+"</span>",
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  error_dialog.close();
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						$.post('../accounting/template/Mhhp/mhhp_actg-ajaxpage.php', {'hbt_multi_changepayscheme':reqode_, 'scheme_':module_CHNG}, function(idx){
							window.location.reload();
					  		error_dialog.close();
						});
					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'100px', 'overflow':'auto'});
			}


		});






		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */
		/* PDF SETUP ------------------------------------------------------ */
		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.printablesGENHBT').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> GENERATE UNAUDITED PRINTABLES :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?printable_genACTG&type=habitat'
				},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn btn-default btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn btn-success btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	var deductiondate 	= $('input#deduction_date').val();
				  	var filerpdf 		= $('img[name=imgUSED]').attr('id');
				  	var reporttype 		= $('select.typereport').val();
				  	if(filerpdf === 'ALL'){
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_hbt-iad-UNAUDITEDPDF.php?TYPE_=hbt_LIST_UNUADITED&DATE='+deductiondate, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_hbt-iad-UNAUDITEDPDF.php?TYPE_=hbt_SLIP_UNUADITED&DATE='+deductiondate, '_blank');
				  		}
				  	}else if(filerpdf === 'PCC'){
				  		var pcc = $('.pcclist').val();
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_hbt-iad-UNAUDITEDPDF.php?TYPE_=hbt_PCC_LIST_UNUADITED&DATE='+deductiondate+'&PCC='+pcc, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_hbt-iad-UNAUDITEDPDF.php?TYPE_=hbt_PCC_SLIP_UNUADITED&DATE='+deductiondate+'&PCC='+pcc, '_blank');
				  		}
				  	}

				
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.3% 6%'});
				message_diag.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.3% 6%', 'height':'280px'});			
		});







		/* ========================================================================================== */
		/* ========================================================================================== */
		/* ========================================================================================== */
		/*  IAD JS FUNCTION - HABITAT =============================================================== */

		/* =================================================================== */
		// SELECT DEDUCTION DATE =============================================
		$('input.hbt-pre-cutoff').on('change', function(){
			var date_slct = $(this).val();
			$('div.mhhpsetpostaudit').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
				'hbt_dateselect_preaudit':date_slct
			},function(data){
				$('div.mhhpsetpostaudit').html(data);
			});
		});




		/* ===================================================================== */

		// SET EMPLOYEE FORM DEDUCTIONS (HOUSING IAD - AUDIT) ===
		$('button.hbtsetdeduction').on('click', function(){
			var typ_audit = $(this).attr('name');
			var requestlst = [];
			$('img.imgmhhp').each(function(idx){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					requestlst.push($(this).attr('for').replace(/\s/g, ''));
				}
			});


			if(requestlst.length == 0){
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> WARNING:</b>',
					message: "List can't be empty, Please select any available employee from the table below.",
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  error_dialog.close();
					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});
		
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET DEDUCTION:</b>',
					message: "Deduction Type: Habitat\nInformation will be set as basis for the deduction date you've selected. Do you wish to proceed?",
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
						$('div.modal-header').remove();
						$('div.modal-body').css({'height':'5%', 'text-align':'center'}).html('<img src="../assets/icon_index/ec.gif" style="width:70%;"><br><span style="line-height:50px;font-weight:bold;"><center>PLEASE WAIT...</center></span>');
						$('div.modal-footer').remove()
					 	$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {
					 		'hbt_set_deduction':requestlst
					 	}, function(data){
							error_dialog.close();
							alert("DEDUCTIONS WAS SUCCESSFULLY SET.");
							window.location.reload();
						});

					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
			}
		});




		/* ================================================================== */
		// HABITAT - SELECT DEDUCTION DATE (IAD ACCESS) =====================
		$('select.hbtslctdate').on('change', function(){
			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();			
			$.post('../iad/template/Mhhp/mhhp_iad-ajaxpage.php', {
				'habitat-viewdeduction':deduction_date
			},function(data){
				$('#hbt_audit-list').attr({
					'href':'../iad/template/Mhhp/mhhp_hbt-iad-AUDITEDPDF.php?TYPE_=hbt_LIST_AUDITED&DATE='+deduction_date
				});
				$('#hbt_audit-slip').attr({
					'href':'../iad/template/Mhhp/mhhp_hbt-iad-AUDITEDPDF.php?TYPE_=hbt_SLIP_AUDITED&DATE='+deduction_date
				});
				$('div#mhhpdeductioncontainer').html(data);							
			});	
		});





		/* ================================================================= */
		/* HABITAT GET DEDUCTION LIST ====================================== */
		$('.hbtdeductions').on('click', function(idx){
			var reqcode_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING : <span style="color:#009900">'+reqcode_+'</span></b>',
				message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
				},
				data: {
					'pageToLoad':'../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?hbt_deductionlist='+reqcode_
				},
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
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.7% 3.5%', 'height':'600px', 'overflow':'auto'});	

		});




		/* =================================================================================== */
		/* FUNCTION GET INCASH PAYMENT FORM ================================================== */

		$('.hbtincash').on('click', function(){
			var reqcode_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> IN-CASH PAYMENT MODULE: <span style="color:#009900">'+reqcode_+'</span></b>',
				message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
				},
				data: {'pageToLoad':'../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?hbt_incashpayment_form='+reqcode_},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {


						var deduction_date  = $('#deduction_date').val();
						var hbt_refcode  	= $('#hbt_refcode').val();
						var hbt_amount  	= $('.hbt_amount').val();
						if(deduction_date.replace(/\s/g, '') != ''
							&& hbt_refcode.replace(/\s/g, '') != ''
							&& hbt_amount.replace(/\s/g, '') != ''){

							var con = confirm("Do you to continue this transaction 'WALKIN PAYMENT' for habitat. Click 'OK' to proceed.")
							if(con == true){
								$.post('../payroll/template/deduction_posting/module_postingscript/posting-hbt_script.php', {
									'wkn_paymentexec':reqcode_,
									'deduction_date':deduction_date,
									'hbt_refcode':hbt_refcode,
									'hbt_amount':hbt_amount},
									function(data){
										// $('.vc_').html(data);
										error_dialog.close();
										window.location.reload();
								});
							}


						}else{
							alert("Process cannot be completed, Please check the payment form.");
						}



				}
				},{
				label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding': '2% 5%'});
				message_diag.getModalFooter().css({'padding': '2% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding': '2% 5%', 'height':'300px', 'overflow':'hidden'});	
		});







		/* =============================================================================================== */
		/* HABITAT UNDEDUCTED AMOUNT LIST ================================================================ */
		$('.hbt_undeductedamounlist').on('click', function(idx){
			var new_btnS = '<button class="btn btn-info btn-sm" onclick="return window.location.reload();" style="margin-right:3px;">&nbsp;&nbsp; <i class="fa fa-angle-double-left"></i> back &nbsp;&nbsp;</button>';
				new_btnS += '<button class="btn btn-default btn-sm undedselectall" for="0" style="margin-right:3px;width:85px;"><i class="fa fa-check" style="color:#009900"></i> Select All</button>';
				new_btnS += '<button class="btn btn-default btn-sm undedamountset" style="margin-right:3px;"><i class="fa fa-arrow-circle-o-right"></i> Forward Amount</button>';


			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			$.post('../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?hbt_undeductedamtlist', {}, function(data_){
				$('#pdfDFLT_mnth').remove();
				$('#pdfDFLT_yrs').remove();
				$('#pdfDFLT_fltr').remove();
				$('#pdfDFLT_btn').html(new_btnS);
				$('.lblhbtdeduction').html('<img src="../assets/img/approve_act.png" width="25"> COMPANY HOUSING PROGRAM - <span style="color:#009900;">UNDEDUCTED LIST</span>');
				$('#mhhpdeductioncontainer').html(data_);
			
			});
		});

		/* ========================================== */








		/*                                             ======================== */
		/*                                             ======================== */
		/*                                             ======================== */
		/*                                             ======================== */
		/* FUNCTION SITE DEVELOPMENT ========================================== */
		/* ========================                                             */
		/* ========================                                             */
		/* ========================                                             */
		/* ========================                                             */


		/* ==================================================================================================== */
		/* ==================================================================================================== */
		/* ADD NEW SITE DEVELOPMENT =========================================================================== */

		$('.site_newrecord').on('click', function(){
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SITE DEVELOPMENT ENTRY</b>',
				message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?site_entry'},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: '<i class="fa fa-calendar-o"></i> Show Schedule',
					cssClass: 'btn-default btn-fill btn-sm pull-left createschedHBT',
					action: function(error_dialog) {
					// error_dialog.close();
				}
				},{
				label: 'Submit',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {

					var subdTYPE_ 	= 'MHHP';
					$('.imgsched').each(function(idx){
						var img_ = $(this).attr('src').split('/')[3];
						if(img_ == 'cck.png'){
							subdTYPE_ = $(this).attr('id');
						}
					});
					var empname 		= $('input#emp_searchHR').val().replace(/\s/, '');
					var empidHR 		= $('input.empidHR').val().replace(/\s/, '');
					var currentbalance 	= $('input.currentbalance').val().replace(/\s/, '');
					var amortamount 	= $('input.amortamount').val().replace(/\s/, '');
					var dateeffect 		= $('input.dateeffect').val();
					if(empname != ''
					&& empidHR != ''
					&& currentbalance != ''
					&& amortamount != ''
					&& dateeffect != ''){


					var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> SUBMIT INFORMATION:</b>',
						message: "You are about to submit an amortization data for "+empname+". Do you wish to proceed?",
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
							$.post('../hr/template/Mhhp/mhhp_ajaxpage.php', {'site_save_entry':'', 'empname':empname, 'empidHR':empidHR, 'currentbalance':currentbalance, 'amortamount':amortamount, 'dateeffect':dateeffect, 'subdTYPE_':subdTYPE_}, function(data){
								alert("\t\t\t----- Balance was successfully Save -----");
						  		window.location.reload();
						  		// $('div.scheddiv_hbt').html(data);
							});

						}
						}]
						});
						message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'80px'});

					}else{

						var message_diag = new BootstrapDialog.show({
							size: BootstrapDialog.SIZE_SMALL,
							type: BootstrapDialog.TYPE_DEFAULT,
							title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> WARNING:</b>',
							message: "Some Field found empty, Please check the form for balances entry module.",
							draggable: true, 
							closable: false,           
							buttons: [{
							label: '&nbsp;okay&nbsp;',
							cssClass: 'btn-default btn-fill btn-sm',
							action: function(error_dialog) {
							  error_dialog.close();
							}
							}]
							});
							message_diag.getModalHeader().css({'padding':'1.9% 6.5%', 'border-radius':'1px'});   
							message_diag.getModalContent().css('border-radius', '2px');
							message_diag.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
							message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});

					}
				}
				},{
				label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.5% 6%'});
				message_diag.getModalFooter().css({'padding':'1.5% 6%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.5% 6%', 'height':'550px', 'overflow':'auto'});	

		});

	




		/* ====================================================================================== */
		/* ====================================================================================== */
		/* FUNCTION GET AMORTIZATION SHCEDULE (SITE DEV) ======================================== */
		$('.siteamortsched').on('click', function(){
			var code_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SITE DEVELOPMENT AMORTIZATION SCHEDULE: <span style="color:#009900">'+code_+'</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {'pageToLoad':'../hr/template/Mhhp/mhhp_ajaxpage.php?site_amortsched='+code_},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Cancel',
				cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'0.9% 3.5%', 'border-radius':'1px'});   
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0% 3.5%', 'height':'550px'});
		});








		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */
		/* PDF SETUP ------------------------------------------------------ */
		/* ----------------- FUNCTION  VIEW CSV CONTENT --------------------- */
		$('.site_printablesGEN').on('click', function(){
			var code = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> GENERATE UNAUDITED PRINTABLES :</b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Mhhp/mhhp_actg-ajaxpage.php?printable_genACTG&type=Site'
				},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Close',
				cssClass: 'btn btn-default btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				}
				},{
				label: 'Proceed',
				cssClass: 'btn btn-success btn-sm',
				action: function(error_dialog) {
				  	error_dialog.close();
				  	var deductiondate 	= $('input#deduction_date').val();
				  	var filerpdf 		= $('img[name=imgUSED]').attr('id');
				  	var reporttype 		= $('select.typereport').val();
				  	var subdi_type 		= $('select.subdi_type').val();
				  	if(filerpdf === 'ALL'){
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_site-iad-UNAUDITEDPDF.php?TYPE_=site_LIST_UNUADITED&subdivsion_='+subdi_type+'&DATE='+deductiondate, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_site-iad-UNAUDITEDPDF.php?TYPE_=site_SLIP_UNUADITED&subdivsion_='+subdi_type+'&DATE='+deductiondate, '_blank');
				  		}
				  	}else if(filerpdf === 'PCC'){
				  		var pcc = $('.pcclist').val();
				  		if(reporttype === 'dedsummary'){
				  			window.open('../iad/template/Mhhp/mhhp_site-iad-UNAUDITEDPDF.php?TYPE_=site_PCC_LIST_UNUADITED&subdivsion_='+subdi_type+'&DATE='+deductiondate+'&PCC='+pcc, '_blank');
				  		}else if(reporttype === 'dedslip'){
				  			window.open('../iad/template/Mhhp/mhhp_site-iad-UNAUDITEDPDF.php?TYPE_=site_PCC_SLIP_UNUADITED&subdivsion_='+subdi_type+'&DATE='+deductiondate+'&PCC='+pcc, '_blank');
				  		}
				  	}
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'1.3% 6%'});
				message_diag.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'1.3% 6%', 'height':'280px', 'overflow':'auto'});			
		});









        /*                                             ========================= */
        /*                                             ========================= */
        /*                                             ========================= */
        /*                                             ========================= */
		/* SITE DEVELOPEMENT (IAD ) ============================================ */
        /* =========================                                             */
        /* =========================                                             */
        /* =========================                                             */
        /* =========================                                             */


        /* =================================================================== */
		// SELECT DEDUCTION DATE =============================================
		$('input.site-pre-cutoff').on('change', function(){
			var date_slct = $(this).val();
			$('div.mhhpsetpostaudit').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {'site_dateselect_preaudit':date_slct},
			function(data){
				$('div.mhhpsetpostaudit').html(data);
			});
		});




		/* ===================================================================== */
		// SET EMPLOYEE FORM DEDUCTIONS (SITE IAD - AUDIT) =====================
		$('button.sitesetdeduction').on('click', function(){
			var typ_audit = $(this).attr('name');
			var requestlst = [];
			$('img.imgmhhp').each(function(idx){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					requestlst.push($(this).attr('for').replace(/\s/g, ''));
				}
			});


			if(requestlst.length == 0){
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> WARNING:</b>',
					message: "List can't be empty, Please select any available employee from the table below.",
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  error_dialog.close();
					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});
		
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET DEDUCTION:</b>',
					message: "Deduction Type: Habitat\nInformation will be set as basis for the deduction date you've selected. Do you wish to proceed?",
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
						$('div.modal-header').remove();
						$('div.modal-body').css({'height':'5%', 'text-align':'center'}).html('<img src="../assets/icon_index/ec.gif" style="width:70%;"><br><span style="line-height:50px;font-weight:bold;"><center>PLEASE WAIT...</center></span>');
						$('div.modal-footer').remove()
					 	$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {'hbt_set_deduction':requestlst}, function(data){
							error_dialog.close();
							alert("DEDUCTIONS WAS SUCCESSFULLY SET.");
							window.location.reload();
						});

					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
			}
		});





		/* ===================================================================== */

		// SET EMPLOYEE FORM DEDUCTIONS (HOUSING IAD - AUDIT) ===
		$('button.sitesetdeduction').on('click', function(){
			var typ_audit = $(this).attr('name');
			var requestlst = [];
			$('img.imgmhhp').each(function(idx){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					requestlst.push($(this).attr('for').replace(/\s/g, ''));
				}
			});

			// $('div.modal').remove();
			if(requestlst.length == 0){
				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> WARNING:</b>',
					message: "List can't be empty, Please select any available employee from the table below.",
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					  // error_dialog.close();
						$('.modal').modal('hide');

					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'50px'});
		
			}else{

				var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET DEDUCTION:</b>',
					message: "<b class='fnt14'>Deduction Type: Site Development</b>\n<span class='fnt13'>Information will be set as basis for the deduction belongin to the date you've selected. Do you wish to proceed?</span>",
					draggable: true, 
					closable: false,           
					buttons: [{
					label: 'Cancel',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
						$('.modal').modal('hide');
					}
					},{
					label: 'Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						$('div.modal-header').remove();
						$('div.modal-body').css({'height':'5%', 'text-align':'center'}).html('<img src="../assets/icon_index/ec.gif" style="width:70%;"><br><span style="line-height:50px;font-weight:bold;"><center>PLEASE WAIT...</center></span>');
						$('div.modal-footer').remove()
					 	$.post('template/Mhhp/mhhp_iad-ajaxpage.php', {'site_set_deduction':requestlst}, function(data){
					 		$('div.mhhpsetpostaudit').html(data);
							$('.modal').modal('hide');							
							// alert("DEDUCTIONS WAS SUCCESSFULLY SET.");
							// window.location.reload();
						});

					}
					}]
					});
					message_diag.getModalHeader().css({'padding':'2% 6.5%', 'border-radius':'1px'});   
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalFooter().css({'padding':'2% 6.5%', 'background-color':'#fcf8e3'});
					message_diag.getModalBody().css({'padding':'2% 6.5%', 'height':'90px'});
			}
		});




		/* ================================================================== */
		// SITE DEVELOPMENT - SELECT DEDUCTION DATE (IAD ACCESS) ============
		$('select.siteslctdate').on('change', function(){
			$('div#mhhpdeductioncontainer').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');	
			var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();			
			$.post('../iad/template/Mhhp/mhhp_iad-ajaxpage.php', {'site-viewdeduction':deduction_date},
				function(data){
				$('#site_mhhp-audit-list').attr({'href':'../iad/template/Mhhp/mhhp_site-iad-AUDITEDPDF.php?TYPE_=site_LIST_AUDITED&subdivsion_=MHHP&DATE='+deduction_date});
				$('#site_mhhp-audit-slip').attr({'href':'../iad/template/Mhhp/mhhp_site-iad-AUDITEDPDF.php?TYPE_=site_SLIP_AUDITED&subdivsion_=MHHP&DATE='+deduction_date});
				$('#site_hbt-audit-list').attr({'href':'../iad/template/Mhhp/mhhp_site-iad-AUDITEDPDF.php?TYPE_=site_LIST_AUDITED&subdivsion_=HBT&DATE='+deduction_date});
				$('#site_hbt-audit-slip').attr({'href':'../iad/template/Mhhp/mhhp_site-iad-AUDITEDPDF.php?TYPE_=site_SLIP_AUDITED&subdivsion_=HBT&DATE='+deduction_date});
				$('div#mhhpdeductioncontainer').html(data);					
			});			
		});





		/* ================================================================= */
		/* SITE GET DEDUCTION LIST ========================================= */
		$('.sitedeductions').on('click', function(idx){
			var reqcode_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING : <span style="color:#009900">'+reqcode_+'</span></b>',
				message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
				},
				data: {'pageToLoad':'../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?site_deductionlist='+reqcode_},
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
				message_diag.getModalHeader().css({'padding':'0.7% 3.5%'});
				message_diag.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'0.7% 3.5%', 'height':'600px', 'overflow':'auto'});	

		});



		/* =================================================================================== */
		/* FUNCTION GET INCASH PAYMENT FORM ================================================== */

		$('.siteincash').on('click', function(){
			var reqcode_ = $(this).attr('id');
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> IN-CASH PAYMENT MODULE: <span style="color:#009900">'+reqcode_+'</span></b>',
				message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
				},
				data: {'pageToLoad':'../accounting/template/Mhhp/mhhp_actg-ajaxpage.php?site_incashpayment_form='+reqcode_},
				draggable: true, 
				closable: false,           
				buttons: [{
				label: 'Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {


						var deduction_date  = $('#deduction_date').val();
						var site_refcode  	= $('#site_refcode').val();
						var site_amount  	= $('.site_amount').val();
						if(deduction_date.replace(/\s/g, '') != ''
							&& site_refcode.replace(/\s/g, '') != ''
							&& site_amount.replace(/\s/g, '') != ''){

							var con = confirm("Do you to continue this transaction 'WALKIN PAYMENT' for habitat. Click 'OK' to proceed.")
							if(con == true){
								$.post('../payroll/template/deduction_posting/module_postingscript/posting-site_script.php', {'wkn_paymentexec':reqcode_,
									'deduction_date':deduction_date,
									'site_refcode':site_refcode,
									'site_amount':site_amount},
									function(data){
										// $('.vc_').html(data);
										error_dialog.close();
										window.location.reload();
								});
							}


						}else{
							alert("Process cannot be completed, Please check the payment form.");
						}
					}
				},{
				label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
					error_dialog.close();
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding': '1.5% 5%'});
				message_diag.getModalFooter().css({'padding': '1.5% 5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding': '1.5% 5%', 'height':'300px', 'overflow':'hidden'});	
		});

	});	