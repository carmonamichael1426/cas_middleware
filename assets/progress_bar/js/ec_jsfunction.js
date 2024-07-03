/* FUNCTION SCHEDULE FORM ------------------------------------ */
function schedFORM(details){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AMORTIZATION SCHEDULE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ce_amortizationform='+details},
		draggable: true,
		closable: false,
		buttons: [{
		label: 'Close',
		cssClass: 'btn-default btn-fill pull-left btn-sm',
		action: function(error_dialog) {
			error_dialog.close();
		}
		},{
		label: 'Show Sched.',
		cssClass: 'btn-default btn-fill btn-sm',
		action: function(error_dialog) {
			var coveredamount = $('.coveredamount').val();
			var Dedamount = $('.Dedamount').val();
			var scheduled_date = $('#scheduled_date').val();
			if(Dedamount.replace(/\s/g, '') == '' || scheduled_date.replace(/\s/g, '') == ''){
				alert("Process can't be completed. Please check the amortization form.");
			}else{
				$.post('template/EmpCredit/ec_actg-ajaxpage.php',
					{'testSCHEDULE':'', 'coveredamount':coveredamount, 'Dedamount':Dedamount, 'scheduled_date':scheduled_date},
					function(data){
					$('div.scheduleContain').html(data);
				});
			}
		}
		},{
		label: 'Proceed',
		cssClass: 'btn-success btn-fill btn-sm',
		action: function(error_dialog) {
			var emptype = $('.emptype').val();
			var coveredamount = $('.coveredamount').val();
			var Dedamount = $('.Dedamount').val();
			var scheduled_date = $('#scheduled_date').val();
			var dedcode = $('.dedcode').val();

			var file_list = [];

			var oTable = document.getElementById('ammort_table');
		    var rowLength = oTable.rows.length;
		    for (i = 1; i < rowLength; i++){
			    var oCells = oTable.rows.item(i).cells;
			    var cellLength = oCells.length;
			    for(var j = 1; j < cellLength; j++){
			        var cellVal = oCells.item(j).innerHTML;
		    		file_list.push([cellVal]);
			    }
		    }

			if(Dedamount.replace(/\s/g, '') == '' || scheduled_date.replace(/\s/g, '') == ''){
				alert("Process can't be completed. Please check the amortization form.");
			}else{
				$.post('template/EmpCredit/ec_actg-ajaxpage.php',
					{'saveSCHEDULE':details, 'ammort_DET': file_list},
					function(data){
					error_dialog.close();
					window.location.reload();
				});
			}

		}
		}]
		});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'500px'});
}



function changed_sched(details){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AMORTIZATION SCHEDULE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ce_changeSCHED='+details},
		draggable: true,
		closable: false,
		buttons: [{
		label: 'Close',
		cssClass: 'btn-default btn-fill pull-left btn-sm',
		action: function(error_dialog) {
			error_dialog.close();
		}
		},{
		label: 'Show Sched.',
		cssClass: 'btn-default btn-fill btn-sm',
		action: function(error_dialog) {
			var coveredamount = $('.coveredamount').val();
			var Dedamount = $('.Dedamount').val();
			var scheduled_date = $('#scheduled_date').val();
			if(Dedamount.replace(/\s/g, '') == '' || scheduled_date.replace(/\s/g, '') == ''){
				alert("Process can't be completed. Please check the amortization form.");
			}else{
				$.post('template/EmpCredit/ec_actg-ajaxpage.php',
					{'testSCHEDULE':'', 'coveredamount':coveredamount, 'Dedamount':Dedamount, 'scheduled_date':scheduled_date},
					function(data){
					$('div.scheduleContain').html(data);
				});
			}
		}
		},{
		label: 'Proceed',
		cssClass: 'btn-success btn-fill btn-sm',
		action: function(error_dialog) {
			var coveredamount = $('.coveredamount').val();
			var Dedamount = $('.Dedamount').val();
			var scheduled_date = $('#scheduled_date').val();
			if(Dedamount.replace(/\s/g, '') == '' || scheduled_date.replace(/\s/g, '') == ''){
				alert("Process can't be completed. Please check the amortization form.");
			}else{
				$.post('template/EmpCredit/ec_actg-ajaxpage.php',
					{'changeSCHEDULE':details, 'coveredamount':coveredamount, 'Dedamount':Dedamount, 'scheduled_date':scheduled_date},
					function(data){
					error_dialog.close();
					window.location.reload();
				});
			}

		}
		}]
		});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'510px'});
}




/* FUNCTION SHOW ENTRY DETAILS ------------------------------- */
function detailsperENTRY(details){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> ENTRY DETAILS:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
			console.log(content);
			
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ec_entryDETAILS='+details},
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

function savetxt(id){
    var empid = id;

                $.post('template/EmpCredit/ec_genfile.php',
                { empid : empid },
                function(data){
                // setTimeout(message_diag.close(), 2500);
                var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
                var loader = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"> UPLOAD EC TEXT FILES</b>',
                message:img_loader,
                draggable: true,
                closable: false

                });

                loader.getModalHeader().css({'padding':'2.5% 6.5%'});
                loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
                loader.getModalFooter().remove();
                loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});
                setTimeout(location.reload.bind(location), 3000);
                });
}

/* FUNCTION SHOW ENTRY DETAILS ------------------------------- */
function detailsperENTRYAMORTIZED(ammortID){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> ENTRY DETAILS:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ec_masterDETAILS='+ammortID},
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
		message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'430px'});
}




/* EC EMPLOYEE DEDUCTION SCHEDULE ----------------------------------- */
function schedule_EC(amrtCODE){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION SCHEDULE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxtable.php?scheme_amort='+amrtCODE},
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
		message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'420px'});
}


function DeducitonMOnitor(refcode){
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION SCHEDULE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxtable.php?deduction_monitoring='+refcode},
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
		message_diag.getModalHeader().css({'padding':'0.7% 3%'});
		message_diag.getModalFooter().css({'padding':'0.8% 3%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'0.7% 3%', 'height':'640px'});
}

function EZbalance(refcode){
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION BALANCE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxtable.php?deduction_balance='+refcode},
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
		message_diag.getModalHeader().css({'padding':'0.7% 3%'});
		message_diag.getModalFooter().css({'padding':'0.8% 3%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'0.7% 3%', 'height':'540px'});
}

$(document).ready(function($){

	/* A C C O U N T I N G ===========================================*/
	$('#aeamortization').on('click', function(){
		$('div.modal, div.modal-backdrop').remove();
 		$(this).attr("disabled", true);
		var file_list = [];
		$('img.imgCE').each(function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'cck.png'){
				var amt = $('.amnt').val();
				file_list.push([$(this).attr('id'), $(this).attr('alt'), $('input[for=amt'+$(this).attr('alt')+']').val()]);
			}
		});

		if(file_list.length == 0 ){
			alert(" Please select any available employee from the table.");
		}else{

			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EC AMORTIZATION:</b>',
				message: '<span class="fnt14">Employee deductions will automatically be affected by this process. Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,

						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().hide();
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'10% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'190px'});

 						$.post('template/EmpCredit/ec_actg-ajaxpage.php',
	              		{'ec_setamort':file_list},
	              		function(data){
						// setInterval(window.location.reload(), 10000);
						setTimeout(location.reload.bind(location), 3000);
	              		});

				}
				}]
				});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
			message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
		}
	});

	/*SELECT DATE RANGES ============================================ */
	$('.selectDATErange').on('change', function(){
		var date_ = $(this).val();
		var img  = '<center><img src="../assets/img/grandtotal.gif" style="padding-top:90px;"></center>';
		$('.deductiontable').html(img);
		$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_range':$(this).val()}, function(data){
			$('.deductiontable').html(data);
		});
	});
	 // ==============================================================

	$('.selectDATErangeNesco').on('change', function(){
		var date_ = $(this).val();
		var img  = '<center><img src="../assets/img/grandtotal.gif" style="padding-top:90px;"></center>';
		$('.deductiontable').html(img);
		$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_rangeNesco':$(this).val()}, function(data){
			$('.deductiontable').html(data);
		});
	});

	$('.rangegen').on('change', function(){
		var date_ = $(this).val();
		$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'rangegen':$(this).val()}, function(data){
			$('.deductiontable').html(data);

		});
	});

	// ============ DEDUCTION POSTING ====================================================================================================
	$('#nescoded_date').on('change', function(){
		var date_ = $(this).val();
		var type = $(this).attr('for');
		$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'posting_nesco':'' , 'type':type, 'date':date_}, function(data){
			$('.deductiontable').html(data);
		});
	});
	$('#franchiseded_date').on('change', function(){
		var date_ = $(this).val();
		var type = $(this).attr('for');
		var comp = $(this).attr('alt');
		$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'posting_franchise':'' , 'type':type, 'date':date_, 'compcode':comp}, function(data){
			$('.deductiontable').html(data);
		});
	});
	// ====================================================================================================================================

	$('#nesco_auditdate').on('change', function(){
		var date_ = $(this).val();
		var type = $(this).attr('for');
		var etype = $(this).attr('alt');
		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'nescoauditrange':'' , 'type':type, 'date':date_, 'emptype':etype}, function(data){
			$('.deductiontable').html(data);
		});
	});

	$('#nesco_auditdateALTA').on('change', function(){
		var date_ = $(this).val();
		var type = $(this).attr('for');
		var etype = $(this).attr('alt');
		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'nescoauditrangeALTA':'' , 'type':type, 'date':date_, 'emptype':etype}, function(data){
			$('.deductiontable').html(data);
		});
	});
	/*SELECT EMPLOYEE TYPE =========================================== */
	$('.nescAud').on('click', function(){
		var nesc = $(this).attr('for');
		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'nescAud':$(this).attr('for')}, function(data){
			$('.deductiontable').html(data);
			// alert(nesc);
		});
	});
	// /*AE--------------------------------------------------------------------*/

	$('.AltAud').on('click', function(){
		var AE = $(this).attr('for');
		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'AltAud':AE}, function(data){
			$('.deductiontable').html(data);

		});
	});

	// $('.nescoMonitor').on('click', function(){
	// 	var nesMon = $(this).attr('for');
	// 	$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'nesMonitor':$(this).attr('for')}, function(data){
	// 		$('.deductiontable').html(data);
	// 		alert(nesMon);
	// 	});
	// });



	/*================================================================*/

	/*=================================================================*/
	$('#ecbtnBUselectB').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM	,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> EC BALANCES</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?selectBU'},
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
				window.open('?id=ec_monitoring&BU='+bulist, '_self');
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.5% 5%'});
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'450px'});


		// window.location.href = "?id=ec_monitoring&BU=";
	});


	/* SELECT BU FILTER ============================================== */
	$('#ecbtnBUselect').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM	,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> EC MONITORING</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?selectBU'},
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
				window.open('?id=ec_monitoring&BU='+bulist, '_self');
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.5% 5%'});
			message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.5% 5%', 'height':'450px'});


		// window.location.href = "?id=ec_monitoring&BU=";
	});
	/* =============================================================== */




	/* IAD FUNCTIONS ================================================= */
	 	// function select all
	 	$('.auditSelecTall').on('click', function(){
	 		var img_ = $(this).attr('src').split('/')[3];
	 		if(img_ === 'uncck.png'){
	 			$(this).attr('src', '../assets/icon_index/cck.png');
	 			$('.imgCE').attr('src', '../assets/icon_index/cck.png');
	 		}else{
	 			$(this).attr('src', '../assets/icon_index/uncck.png');
	 			$('.imgCE').attr('src', '../assets/icon_index/uncck.png');
	 		}
	 	});

	 	$('.imgCE').on('click', function(){

	 		var img_ = $(this).attr('src').split('/')[3];
	 		if(img_ === 'uncck.png'){
	 			$(this).attr('src', '../assets/icon_index/cck.png');
	 		}else{
	 			$(this).attr('src', '../assets/icon_index/uncck.png');
	 		}
	 	});


	 	// FUNCTION SET AUDIT =============================================
	 	$('.deduction_setup').on('click', function(){
	 		$(this).attr("disabled", true);
	 		var EC_emplist = [];
	 		$('.imgCE').each(function(){
	 			var img_ = $(this).attr('src').split('/')[3];
	 			var imgVL = $(this).attr('name');
	 			if(img_ == 'cck.png'){
	 				EC_emplist.push(imgVL);
	 			}
	 		});
	 		if(EC_emplist.length > 0){
	 			$.post('template/EmpCredit/ec_iad-ajaxpage.php', {'set_audited':EC_emplist}, function(data){
	 				alert("Transactions Successfully Submitted!");
	 				window.location.reload();
	 			});
	 		}else{
	 			alert("Process can't be completed. Please select any available employee from the list.");
	 		}
	 	});

	 	$('.check_deduct').on('click', function(){
	 		$(this).attr("disabled", true);
	 		var audit = 'sdfsfs';
	 			$.post('template/EmpCredit/ec_iad-ajaxpage.php', {'check_deduct':audit}, function(data){
	 				alert("Transactions Successfully Updated!");
	 				window.location.reload();
	 			});
	 	});

	 	$('.update_pcc').on('click', function(){
	 		$(this).attr("disabled", true);
	 		var bunit = $(this).attr('alt');
	 		var cutoff = $('#nesco_auditdate').val();
	 			$.post('template/EmpCredit/ec_iad-ajaxpage.php', {'update_pcc':bunit, 'ded_date':cutoff}, function(data){
	 				alert("PCC Successfully Updated!");
	 				window.location.reload();
	 			});
	 	});

	 	$('.deduction_setup_del').on('click', function(){
	 		var EC_emplist = [];
	 		$('.imgCE').each(function(){
	 			var img_ = $(this).attr('src').split('/')[3];
	 			var imgVL = $(this).attr('name');
	 			if(img_ == 'cck.png'){
	 				EC_emplist.push(imgVL);
	 			}
	 		});
	 		if(EC_emplist.length > 0){
	 			$.post('template/EmpCredit/ec_iad-ajaxpage.php', {'deleteerror':EC_emplist}, function(data){
	 			});
	 		}else{
	 			alert("Process can't be completed. Please select any available employee from the list.");
	 		}

	 	});

	 	/* FILTER DATE DEDUCTION ====================================*/
	 	$('select.filtDATE').on('change', function(){
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
	 		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'filterDEDUCTIONsummary':dateDED},  function(data){
	 			$('.deductiontable').html(data);
	 		});
	 	});

	 	$('select.filtNESCO').on('change', function(){
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
	 		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'filterNesco':dateDED},  function(data){
	 			$('.deductiontable').html(data);
	 		});
	 	});

	 	// ============ ALTA DEDUCTIONS =======================================================================

	 	$('select.filtDATEalta').on('change', function(){
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
	 		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'filterDEDUCTIONsummaryALTA':dateDED},  function(data){
	 			$('.deductiontable').html(data);
	 		});
	 	});

	 	$('select.filtNESCOalta').on('change', function(){
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
	 		$.post('template/EmpCredit/ec_iad-ajaxtable.php', {'filterNescoALTA':dateDED},  function(data){
	 			$('.deductiontable').html(data);
	 		});
	 	});

	 	// ========================================================================================================

	 	$('select.filterPayroll').on('change', function(){
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
	 		$.post('template/EmpCredit/ec_payrollajaxtable.php', {'filterDEDUCTIONsummary':dateDED},  function(data){
	 			$('.deductiontable').html(data);
	 		});
	 	});


	 $('.nescode').on('click', function(idx){
		var refcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> CREDIT DETAILS:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ec_detsded='+refcode},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'400px'});
			$('.modal')[0].remove();
	});

	 $('.auddetails').on('click', function(idx){
		var refcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> CREDIT DETAILS:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_iad-ajaxpage.php?ec_detsded='+refcode},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'400px'});
			$('.modal')[0].remove();
	});

// --------------------------------------------------------------------- //


	/* --------------------------------------------------------------- */

	$('#ecnescoded').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					var amt = $('.amnt').val();
					file_list.push([$(this).attr('id'), $(this).attr('alt'), $(this).attr('for'), $('input[for=amt'+$(this).attr('alt')+']').val()]);
				}
			});
			if(file_list.length == 0 ){
				alert(" Please select any available employee from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> NESCO DEDUCTION POSTING:</b>',
				message: '<span class="fnt14">Employee deductions will automatically be affected by this process. Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						// img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">POSTING CREDITS</b>';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"> DEDUCTING NESCO CREDITS ...</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

 						$.post('template/EmpCredit/ec_actg-ajaxpage.php',
	              		{'forposting':file_list},
	              		function(data){
						setTimeout(location.reload.bind(location), 2000);
	              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});


		// ---------------------- CREDIT APPROVAL ---------------------------------------
		$('.approvecred').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var remarks = $(this).attr('for');
			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push([$(this).attr('id'), $(this).attr('alt'), $(this).attr('for'), remarks]);
				}
			});

			if(file_list.length == 0 ){
				alert(" Please select any available employee from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> SUPERVISOR CREDIT APPROVAL:</b>',
				message: '<span class="fnt14">Credit will still be pending for accounting confirmation. Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						// img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">POSTING CREDITS</b>';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"> SUPERVISOR APPROVAL</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

 						$.post('template/EmpCredit/ec_sup-ajaxpage.php',
	              		{'forapproval':file_list},
	              		function(data){
						// setInterval(window.location.reload(), 10000);
						setTimeout(location.reload.bind(location), 3000);
	              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});

		$('.batchapprove').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var remarks = $(this).attr('for');
			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push([$(this).attr('id'), $(this).attr('alt'), $(this).attr('for'), remarks, $(this).attr('ctrl')]);
				}
			});

			if(file_list.length == 0 ){
				alert(" Please select any available employee from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> SUPERVISOR CREDIT APPROVAL:</b>',
				message: '<span class="fnt14">Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="fa fa-spinner fa-spin"></i> SUPERVISOR APPROVAL</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

 						$.post('template/EmpCredit/ec_sup-ajaxpage.php',
	              		{'batchapproval':file_list},
	              		function(data){
						setTimeout(location.reload.bind(location), 3000);
	              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});

	/* --------------------------------------------------------------- */

	$('.uploaditem').on('click', function(){
			var pic = $(this).val();
			//alert(pic);
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> VIEW ITEM:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						//alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ec_itemdets='+pic},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					window.location.reload();

					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fff'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'440px'});
					$('.modal')[0].remove();

		});

		$('.checking').on('click', function(idx){
		var refcode = $(this).attr('id');
		// alert(refcode);
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> EMPLOYEE DETAILS:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?empcheck='+refcode},
			draggable: true,
			closable: true,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('width', '400px');
			dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'150px'});
			$('.modal')[0].remove();
		});

		$('.approvaldetails').on('click', function(idx){
			var refcode = $(this).attr('id');
			// alert(refcode);

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_sup-ajaxpage.php?ec_approvaldets='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'460px'});
				$('.modal')[0].remove();
		});

		$('.batchdetails').off().on('click', function(idx){// to update
			var refcode = $(this).attr('id');
			// alert(refcode);

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_sup-ajaxpage.php?ec_batchdetails='+refcode},
				draggable: true,
				closable: true,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			                  window.location.reload();
			              }
			          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
		});

		$('.cred_remove').on('click', function(){
			var det = $(this).attr('id');

			$.post('template/EmpCredit/ec_sup-ajaxpage.php', {'remove_item':det}, function(data){
					
			});

			$.ajax({
				method: 'post',
				url: 'template/EmpCredit/ec_sup-ajaxpage.php?ec_ajaxdetails='+det,
				data:{},
				success: function(data){
					$('.ajaxbatchdetails').html(data);
				},
			});
			alert('Item successfully removed...');
		});

		$('.save_creditQTY').on('click', function(){

			var file_list = [];
			var id = $(this).attr('id');
			var det = $(this).attr('alt');
			var qty = $('.qty').val();
			var tcost = $('.tcost').val();

			file_list.push([id, qty, tcost]);

			$.post('template/EmpCredit/ec_sup-ajaxpage.php', {'update_credit':file_list}, function(data){
					
			});

			$.ajax({
				method: 'post',
				url: 'template/EmpCredit/ec_sup-ajaxpage.php?ec_ajaxdetails='+det,
				data:{},
				success: function(data){
					$('.ajaxbatchdetails').html(data);
				},
			});
			// alert('Item successfully removed...');
		});

		$('.ecindi').on('click', function(){
			var refcode = $(this).attr('id');
			// alert(refcode);

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ec_indi='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'460px'});
				// $('.modal')[0].remove();

		});



		$('.inbatchdetails').on('click', function(){
			var refcode = $(this).attr('id');

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ecindi='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
				// $('.modal')[0].remove();
		});


		$('.itemrelease').on('click', function(idx){

			$('div.modal, div.modal-backdrop').remove();
			var remarks = $(this).attr('for');
			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push([$(this).attr('alt'), remarks]);
				}
			});

			if(file_list.length == 0 ){
				alert(" Please select any available employee from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> ITEM RELEASING:</b>',
				message: '<span class="fnt14">Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						// img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">POSTING CREDITS</b>';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="fa fa-spinner fa-spin"></i> Individual Item Release</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

 						$.post('template/EmpCredit/ec_incharge-ajaxpage.php',
	              		{'ec_release':file_list},
	              		function(data){
						// setInterval(window.location.reload(), 10000);
						setTimeout(location.reload.bind(location), 1500);
	              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});


	$('.batchrelease').on('click', function(idx){
			$('div.modal, div.modal-backdrop').remove();
			var remarks = $(this).attr('for');
			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push([$(this).attr('alt'), $(this).attr('id'), remarks]);
				}
			});
			if(file_list.length == 0 ){
				alert(" Please select any available employee from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> ITEM RELEASING:</b>',
				message: '<span class="fnt14">Do you want to procceed?</span>',
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

	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br/>';
						// img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">POSTING CREDITS</b>';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<center><b class="fnt14"><i class="fa fa-spinner fa-spin"></i> Releasing of Items...</b></center>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%', 'text-align':'center'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

 						$.post('template/EmpCredit/ec_incharge-ajaxpage.php',
	              		{'ec_batchrelease':file_list},
	              		function(data){
						setTimeout(location.reload.bind(location), 1500);
	              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});

		$('.viewitem').on('click', function(){
			var pic = $(this).val();
			// alert(pic);
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> VIEW ITEM:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						//alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_emp-ajaxpage.php?ec_itemdets='+pic},
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
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


		});

		$('.creditdetails').on('click', function(idx){
			var refcode = $(this).attr('id');
			// alert(refcode);

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> CREDIT DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_emp-ajaxpage.php?ec_creditdetails='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
				$('.modal')[0].remove();
		});

		$('.viewitemsup').on('click', function(){
			var pic = $(this).val();
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> VIEW ITEM:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						//alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_sup-ajaxpage.php?ec_itemdets='+pic},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					window.location.reload();

					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});
					// $('.modal')[0].remove();
		});

		// $('.filterreport').on('click', function(){
		// 	$('div.modal, div.modal-backdrop').remove();

		// 	var credtype = $(this).attr('id');
		// 	var nesco = $(this).val();

		// 	var message_diag = new BootstrapDialog.show({
		// 			size: BootstrapDialog.SIZE_SMALL,
		// 			type: BootstrapDialog.TYPE_DEFAULT,
		// 			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> Generate Report :</b>',
		// 			message: function(dialog) {
		// 				var content = $('<div></div>');
		// 				var page = dialog.getData('pageToLoad');
		// 				content.load(page);
		// 				return content;
		// 			},
		// 			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?filter_rep='},
		// 			draggable: true,
		// 			closable: false,
		// 			buttons: [{
		// 			label: 'Close',
		// 			cssClass: 'btn-default btn-fill btn-sm',
		// 			action: function(error_dialog) {

		// 				error_dialog.close();
		// 			}
		// 			},{
		// 			label: 'Filter',
		// 			cssClass: 'btn-success btn-fill btn-sm '+credtype,
		// 			action: function(error_dialog) {
		// 				var file_list 		= [];	
		// 				var reptype 		= $('.reptype').val();
		// 				var Emptype 		= $('.Emptype').val();
		// 				var scheduled_date 	= $('#scheduled_date').val();
		// 				var deptcred 		= $('.dept').val();
		// 				var bunit 			= $('.bunitLoc').val();
		// 				var credtype 		= $(this).attr('class').split(' ')[4];

		// 				file_list.push([reptype, Emptype, scheduled_date, deptcred, bunit, credtype]);

		// 				if (scheduled_date != ''){
		// 					if(reptype == 'Undeducted'){
	 // 							window.open('template/EmpCredit/ec_reportpdf.php?ec_summary='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);
		// 						error_dialog.close();
		// 					}else if(reptype == 'Slip'){
		// 						window.open('template/EmpCredit/ec_reportslip.php?ec_aegenerate='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);
		// 						error_dialog.close();
		// 					}else{
		// 						window.open('template/EmpCredit/ec_reportsDMY.php?ec_summary='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);

		// 					}
		// 				}else{
		// 					if(reptype == 'perBU'){
		// 						window.open('template/EmpCredit/ec_reportsBU.php?ec_perBU='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);
		// 						error_dialog.close();

		// 					}else if(reptype == 'pending'){
	 // 							window.open('template/EmpCredit/ec_aereports.php?ec_undeducted='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);
		// 						error_dialog.close();
		// 					}else{
		// 					alert("Process can't be completed. Please select deduction date.");
		// 					}
		// 				}
		// 			}
		// 			}]
		// 			});
		// 			message_diag.getModalContent().css('border-radius', '2px');
		// 			message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		// 			message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
		// 			message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'250px'});


		// });

		$('.repType').on('change', function(){
			var type = $('.repType').val();
			var emp  = $('.empType').val();
			if (type == 'Daily') {
				$('.excel_rep').prop('disabled', false);
			}else if (type == 'Yearly'){
				$('.excel_rep').prop('disabled', false);
				$('.empType').prop('disabled', true);
			}else if (type == 'Slip'){
				$('.excel_rep').prop('disabled', true);
				$('.empType').prop('disabled', false);
				$(".empType[value='Alturas Employee']").prop("disabled", true);
				// $(".empType[value='Alturas Employee']").attr("disabled", "disabled
				// emp[1].disabled = true;
			}else{
				$('.excel_rep').prop('disabled', true);
			}
		});

		$('.excel_rep').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var file_list 	= [];
			var empType 	= $('.empType').val();
			var repType 	= $('.repType').val();
			var sched_date 	= $('#sched_date').val();
			var cred_type 	= $(this).attr("id");
			var bunit 		= $('.bunit').val();

			if(sched_date == '' ){
				alert("Please select date... ");
			}else{
				file_list.push([repType, empType, sched_date, cred_type, bunit]);
				if(repType == 'Daily'){
					window.open('template/EmpCredit/excel/ec_excel_daily.php?ec_summary='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}else if(repType == 'Yearly'){
					// window.open('template/EmpCredit/excel/ec_excel_yearly.php?ec_summary='+file_list,'_blank');
					window.open('template/EmpCredit/excel/ec_excel_perDay.php?ec_summary='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}
			}	
		});

		$('.pdf_rep').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var file_list 	= [];
			var empType 	= $('.empType').val();
			var repType 	= $('.repType').val();
			var sched_date 	= $('#sched_date').val();
			var cred_type 	= $(this).attr("id");
			var bunit 		= $('.bunit').val();

			if(sched_date == '' ){
				alert("Please select date... ");
			}else{

				file_list.push([repType, empType, sched_date, bunit, cred_type]);

				if(repType == 'Undeducted'){
					window.open('template/EmpCredit/ec_reportpdf.php?ec_summary='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}else if(repType == 'Deducted'){
					window.open('template/EmpCredit/ec_report_deducted.php?ec_deducted='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}else if(repType == 'SOA'){
					window.open('template/EmpCredit/ec_report_central.php?ec_central_soa='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}else if(repType == 'Slip'){
					window.open('template/EmpCredit/ec_reportslip.php?ec_aegenerate='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);
					error_dialog.close();
				}else{
					window.open('template/EmpCredit/ec_reportsDMY.php?ec_summary='+file_list,'_blank');
					setTimeout(location.reload.bind(location), 700);

				}
			}	
		});



		$('.empsign').on('click', function(){
			var pic = $(this).attr("id");
			// alert(pic);
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> VIEW SIGNATURE AND ITEM:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						//alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_sup-ajaxpage.php?empsign='+pic},
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
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


		});

		$('.errorupdate').on('click', function(){
	 		// var EC_emplist = [];
	 		alert('dasd');
	 		// $('.imgCE').each(function(){
	 		// 	var img_ = $(this).attr('src').split('/')[3];
	 		// 	var imgVL = $(this).attr('name');
	 		// 	if(img_ == 'cck.png'){
	 		// 		EC_emplist.push(imgVL);
	 		// 	}
	 		// });
			window.open('template/EmpCredit/ec_iad-ajaxpage.php?updateerror','_blank');

	 		// if(EC_emplist.length > 0){
	 		// 	$.post('template/EmpCredit/ec_iad-ajaxpage.php', {'set_audited':EC_emplist}, function(data){
	 		// 		window.location.reload();
	 		// 		// alert(data);
	 		// 	});
	 		// }else{
	 		// 	alert("Process can't be completed. Please select any available employee from the list.");
	 		// }

		});

		$('.updateemp').on('click', function(){
			window.open('template/EmpCredit/ec_sup-ajaxpage.php?updateempno','_blank');

		});

		$('.viewitemindividuals').on('click', function(){
			var pic = $(this).val();
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_WIDE,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> VIEW ITEM:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						//alert(page);
				  		return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_individualmodal.php?ec_itemdets='+pic},
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
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


		});

		$('.empdets').off().on('click', function(){
			var dets = $(this).val();
			var message_diag = new BootstrapDialog.show({
					// size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> Credit Entry Details:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_emp-ajaxpage.php?ec_empdets='+dets},
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
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


		});

		$('.empLedger').off().on('click', function(){
			var emp = $(this).val();
			// alert(emp);
			var message_diag = new BootstrapDialog.show({
					// size: BootstrapDialog.SIZE_WIDE,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> Credit Entry Details:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_sup-ajaxtable.php?ec_empLedger='+emp},
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
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});


		});

		$('.iadsummary').on('click', function(){
			var file_list = [];
			var type = $(this).attr("id");
			var bu   = $(this).attr("for");
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
			file_list.push([type, dateDED, bu]);
			// alert(file_list);
			var emp = $('.emp').attr('id');

			if(typeof emp == 'undefined'){
			alert('No Available Data on the selected Deduction Date.');
			setTimeout(location.reload.bind(location), 700);

			}else{
			window.open('template/EmpCredit/ec_report_cutoff.php?ec_summary='+file_list,'_blank');
			setTimeout(location.reload.bind(location), 700);
			}

		});

		$('.iadsummary_excel').on('click', function(){
			var file_list = [];
			var type = $(this).attr("id");
			var credt = $(this).attr("for");
	 		var dateDED = $('#dedyear').val()+'-'+$('#dedmonth').val()+'-'+$('#dedday').val();
			var emp = $('.emp').attr('id');
			file_list.push([type, dateDED, credt]);
			// alert(file_list);

			if(typeof emp == 'undefined'){
			alert('No Available Data on the selected Deduction Date.');
			setTimeout(location.reload.bind(location), 700);

			}else{
			window.open('template/EmpCredit/excel/index.php?ec_summary='+file_list,'_blank');
			setTimeout(location.reload.bind(location), 700);
			}

		});

		// $('.iad_report').on('click', function(){
		// 	var credtype = $(this).attr('id');
		// 	var nesco = $(this).val();

		// 	var message_diag = new BootstrapDialog.show({
		// 			size: BootstrapDialog.SIZE_SMALL,
		// 			type: BootstrapDialog.TYPE_DEFAULT,
		// 			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> Generate Report :</b>',
		// 			message: function(dialog) {
		// 				var content = $('<div></div>');
		// 				var page = dialog.getData('pageToLoad');
		// 				content.load(page); 
		// 				return content;
		// 			},
		// 			data: {'pageToLoad':'template/EmpCredit/ec_iad-ajaxpage.php?filter_rep='},
		// 			draggable: true, 
		// 			closable: false,           
		// 			buttons: [{
		// 			label: 'Close',
		// 			cssClass: 'btn-default btn-fill btn-sm',
		// 			action: function(error_dialog) {

		// 				error_dialog.close();
		// 			}
		// 			},{
		// 			label: 'Filter',
		// 			cssClass: 'btn-success btn-fill btn-sm',
		// 			action: function(error_dialog) {
		// 				var file_list = [];	
		// 				var reptype = $('.reptype').val();
		// 				var Emptype = $('.Emptype').val();
		// 				var scheduled_date = $('#scheduled_date').val();
		// 				var deptcred = $('.ctype').val();
		// 				file_list.push([reptype, Emptype, scheduled_date, deptcred]);

		// 						window.open('template/EmpCredit/ec_reportpdf.php?ec_summary='+file_list,'_blank');
		// 						setTimeout(location.reload.bind(location), 700);
		// 						error_dialog.close();

		// 			}
		// 			}]
		// 			});
		// 			message_diag.getModalContent().css('border-radius', '2px');
		// 			message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		// 			message_diag.getModalFooter().css({'padding':'1.2% 3.5%', 'background-color':'#dff0d8'});
		// 			message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'260px'});	

		// });

/* ----------------- I T E M  T R AN S F E R --------------------- */
	$('.itemtransfer').on('click', function(idx){
		var file_list = [];
			$('img.imgCE').each(function(index){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){

					file_list.push([$(this).attr('alt') + '-' + $(this).attr('for')]);
				}
			});

			if(file_list.length == 0 ){
				alert(" Please select any available items from the table.");
			}else{
				var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="fa fa-exchange"></i> <b> ITEM TRANSFER REQUEST :</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ec_transfer='+file_list},
				draggable: true,
				closable: false,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }, {
			              label: 'Proceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {

							var emp_searchHR = $('#ecic').val();
							var fadstsno = $('input#fadstsno').val();
							var transferBU = $('.selectBU').val();
							var ststransactDATE = $('input#ststransactDATE').val();
							var item_DETAILS = [];
							
							$('input.stsqty').each(function(){
								var itemDET = $(this).attr('name').split('|');
								item_DETAILS.push([itemDET[0], itemDET[1], itemDET[2], $(this).val(), itemDET[3]]);
							});

							if(item_DETAILS.length == 0 || transferBU == null){
								alert("Process can't be completed. Please provide check you stock tranfer form.");
							}else{
								var con = confirm("Do you want to transfer this items? Click 'OK' to proceed.");
								if(con == true){
									$.post('template/EmpCredit/ec_incharge-ajaxpage.php', {'transferstock':'', 'attention':emp_searchHR,
									'fadstsno':fadstsno,
									'transferBU':transferBU,
									'ststransactDATE':ststransactDATE,
									'item_DETAILS':item_DETAILS}, function(data){
										 dialog.close();
										 window.location.reload();
									});
								}
							}
		              	}
			          }]
				});
			dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fff'});
			dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'485px'});
			}
	});

	$('.itemreceive').on('click', function(idx){
			// $('div.modal, div.modal-backdrop').remove();
			var remarks = $(this).attr('for');
			var file_list = [];
			$('img.imgCE').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push([$(this).attr('alt'), remarks, $(this).attr('for'), $(this).attr('id')]);
				}
			});

			if(file_list.length == 0 ){
				alert(" Please select any available item from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> INCHARGE ITEM RECEIVING:</b>',
				message: '<span class="fnt14">Credit will still be pending for accounting confirmation. Do you want to procceed?</span>',
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


 						$.post('template/EmpCredit/ec_incharge-ajaxpage.php',
	              		{'ec_itemreceive':file_list},
	              		function(data){
	              		message_diag.close();

	              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"> ITEM RECEIVING</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});
						setTimeout(location.reload.bind(location), 1500);
	  		        		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});

	/* --------------------------------------------------------------- */
		$('.inchargereport').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var br = $('.batchrelease').attr('alt');
			var credtype = $(this).attr('for');
			var nesco = $(this).val();
			var inch = $(this).attr('alt');

			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> Generate Report :</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?filter_rep='+inch},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					},{
					label: 'Filter',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						var file_list = [];
						var batno = $('.batno').val();
						var Emptype = $('.Emptype').val();

						file_list.push([batno, Emptype, credtype, br]);
						
						if(inch == '033402'){
							window.open('template/EmpCredit/ec_inchargereport_DP.php?ec_summary='+file_list,'_blank');
							error_dialog.close();
						}else{
 							window.open('template/EmpCredit/ec_inchargereport.php?ec_summary='+file_list,'_blank');
							error_dialog.close();
						}
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'200px'});


		});

		$('.store_rep_central').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var br = $('.batchrelease').attr('alt');
			var credtype = $(this).attr('for');
			var nesco = $(this).val();
			var inch = $(this).attr('alt');

			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> Generate Report :</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?filter_rep_store_central='+inch},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {
						error_dialog.close();
					}
					},{
					label: 'Filter',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						var file_list = [];
						var batno = $('.batno').val();
						var Emptype = $('.Emptype').val();

						file_list.push([batno, Emptype, inch]);
	 							window.open('template/EmpCredit/ec_interCentral_batchreport.php?ec_summary='+file_list,'_blank');
								// setTimeout(location.reload.bind(location), 700);
								error_dialog.close();
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'200px'});


		});

		$('.uploadcredit').on('click', function(){

			var x = "dsfsf";
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> END OF DAY UPLOAD:</b>',
				message: '<span class="fnt14">Credit will still be pending for accounting confirmation. Do you want to proceed?</span>',
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

              		message_diag.close();

              		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
					var loader = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><i class="fa fa-spinner fa-spin"></i> CREDIT UPLOAD</b>',
					message:img_loader,
					draggable: true,
					closable: false
					});
					loader.getModalHeader().css({'padding':'2% 4.5%'});
					loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
					loader.getModalFooter().remove();
					loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});

					$.post('template/EmpCredit/upload_new.php',
              		{'forupload':x},

              		function(data){
						setTimeout(location.reload.bind(location), 1500);
              			loader.hide();
              		});

				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
		});

		$('.inchargebatchdetails').off().on('click', function(idx){
			var refcode = $(this).attr('id');
			// alert(refcode);
			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ec_batchdetails='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
		});

		$('.uploadbatchdetails').off().on('click', function(idx){
			var refcode = $(this).attr('id');
			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ec_batchdetails='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
		});
$('.exportall').on('click', function(idx){
	var emplist = $(this).attr('id');

		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> TEXT FILE EXPORT:</b>',
			message: '<span class="fnt14">All unexported text files will be exported. Do you want to procceed?</span>',
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

				window.location.href = '?id=ec_export'

			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
			message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
	});



	$('.selectall').on('click', function(idx){
    $('input:checkbox').not(this).prop('checked', this.checked);
	});

	$('.setlimit').on('click', function(){

			var dets = $('.chk').attr('name');
	 		var sList = "";
			$('.chk').each(function () {
			    var cb = $(this).val();
			    if (this.checked){
			    sList += (sList=="" ? cb  : "," + cb);
				}
			});
			
			// alert(sList);
			if(sList == ""){
				alert("Please Select Employee!");
			}else{
			var message_diag = new BootstrapDialog.show({
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> Set Credit Limit:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?setlimit='+sList},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					},{
					label: '<i class="fa fa-check-square-o"></i> Set Credit Limit',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {

						var file_list = [];
						$('img.imgSET').each(function(){
							var img = $(this).attr('src').split('/')[3];
							var val = $(this).attr('id');
			    			file_list += (img=="cck.png" ? "," + val : "," + '0');

						});
	              		message_diag.close();
              			var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="fa fa-spinner fa-spin"></i> SET CREDIT LIMIT :</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});
						// alert(sList);
						$.post('template/EmpCredit/ec_payrollajaxtable.php', {'updatecredit': sList}, function(data){
						setTimeout(location.reload.bind(location), 1900);
		 			});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'450px'});
				}
		});

	$('.set_ca').on('click', function(){

			var dets = $('.chk').attr('name');
	 		var sList = "";
			$('.chk').each(function () {
			    var cb = $(this).val();
			    if (this.checked){
			    sList += (sList=="" ? cb  : "," + cb);
				}
			});
			console.log(sList);
			if(sList == ""){
				alert("Please Select Employee!");
			}else{
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,

					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> Set CA Limit:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?cacredits='+sList},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					},{
					label: '<i class="fa fa-check-square-o"></i> Set Credit Limit',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {

						var file_list = [];
						$('img.imgSET').each(function(){
							var img = $(this).attr('src').split('/')[3];
							var val = $(this).attr('id');

					    	if(img === 'cck.png'){
							file_list.push([$(this).attr('id')]);
							}
						});

						$.post('template/EmpCredit/ec_payrollajaxtable.php', {'set_ca': sList, 'credtype':file_list}, function(data){
	              		message_diag.close();
	              		console.log(data);
              			var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"> SET CA LIMIT :</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});
						setTimeout(location.reload.bind(location), 3000);
		 			});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'150px'});
				}
		});

	$('.unset_ca').on('click', function(){

			var dets = $('.chk').attr('name');
	 		var sList = "";
			$('.chk').each(function () {
			    var cb = $(this).val();
			    if (this.checked){
			    sList += (sList=="" ? cb  : "," + cb);
				}
			});
			console.log(sList);
			if(sList == ""){
				alert("Please Select Employee!");
			}else{
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,

					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b class="fnt14"><img src="../assets/img/cart.png" width="20"> Unset CA Limit:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?caunset='+sList},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					},{
					label: '<i class="fa fa-check-square-o"></i>Proceed',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {

						var file_list = [];
						$('img.imgSET').each(function(){
							var img = $(this).attr('src').split('/')[3];
							var val = $(this).attr('id');

					    	if(img === 'cck.png'){
							file_list.push([$(this).attr('id')]);
							}
						});

						$.post('template/EmpCredit/ec_payrollajaxtable.php', {'unset_ca': sList, 'credtype':file_list}, function(data){
	              		message_diag.close();
	              		console.log(data);
              			var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
						var loader = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"> SET CA LIMIT :</b>',
						message:img_loader,
						draggable: true,
						closable: false
						});
						loader.getModalHeader().css({'padding':'2.5% 6.5%'});
						loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
						loader.getModalFooter().remove();
						loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});
						setTimeout(location.reload.bind(location), 3000);
		 			});
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'150px'});
				}
		});

		$('.filtercredit').on('click', function(){
			var dets = $(this).val();
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b style="font-family: calibri"><i class="fa fa-filter"></i> FILTER EMPLOYEE:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						// alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?filtercredlimit='+dets},
					draggable: true,
					closable: false,
					buttons: [{
					label: '<i class="fa fa-filter"></i>Filter',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						var file_list = [];
						var emptype = $("[name = 'emptype']").val();
    					var comcode = $("[name = 'company_code']").val();
    					var bunit = $("[name = 'bunit_code']").val();
    					var depcode = $("[name = 'dept_code']").val();
    					var secode = $("[name = 'sec_code']").val();

						file_list.push([comcode, bunit, depcode, secode, emptype]);
						window.open('?id=set_credit&BU='+file_list, '_self');
						setTimeout(location.reload.bind(location), 700);
						error_dialog.close();
					}
					},{
					label: 'Close',
					cssClass: 'btn-default btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 3.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});
		});

// 		FOR CA FILTER
		$('.filterca').on('click', function(){
			var dets = $(this).val();
			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_MEDIUM,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<b style="font-family: calibri"><i class="fa fa-filter"></i> FILTER EMPLOYEE:</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						// alert(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?filter_ca_credlimit='+dets},
					draggable: true,
					closable: false,
					buttons: [{
					label: '<i class="fa fa-filter"></i>Filter',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						var file_list = [];
						var emptype = $("[name = 'emptype']").val();
    					var comcode = $("[name = 'company_code']").val();
    					var bunit = $("[name = 'bunit_code']").val();
    					var depcode = $("[name = 'dept_code']").val();
    					var secode = $("[name = 'sec_code']").val();

						file_list.push([comcode, bunit, depcode, secode, emptype]);
						window.open('?id=set_ca&BU='+file_list, '_self');
						setTimeout(location.reload.bind(location), 700);
						error_dialog.close();
					}
					},{
					label: 'Close',
					cssClass: 'btn-default btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 3.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});
		});


	$('.updatebal').on('click', function(){
		alert('asdasd');
			var refcode = 'asdsa';
			// alert(refcode);

			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_payrollajaxtable.php?updatebal='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'460px'});
		});
	$('.iadledger').on('click', function(){
			var date_ = $(this).attr('for');

			var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION BALANCEs:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_iad-ajaxtable.php?ec_iadledger='+date_},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
				error_dialog.close();
				// $('div.dataTables_info')[1].remove();
				// $('div.dataTables_paginate')[1].remove();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'0.7% 3%'});
			message_diag.getModalFooter().css({'padding':'0.8% 3%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'0.7% 3%', 'height':'450px'});
		});
	$('.batload').on('click', function(){
			   	var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
				var loader = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"> Please Wait . . .</b>',
				message:img_loader,
				draggable: true,
				closable: false
				});
				loader.getModalHeader().css({'padding':'2.5% 6.5%'});
				loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
				loader.getModalFooter().remove();
				loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'150px'});

			// $.post('?id=ec_batch', {'nescoauditrange':'' , 'type':type, 'date':date_, 'emptype':etype}, function(data){
			// 	$('.deductiontable').html(data);
				window.open('?id=ec_batch', '_self');

				// setTimeout(location.reload.bind(location), 900);
	});

	$('.itemsetup').off().on('click', function(){
			var message_diag = new BootstrapDialog.show({
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> ITEM SET-UP:</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);    
				return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?ecitemsetup'},
			draggable: true, 
			closable: false,           
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog) {
				error_dialog.close();
			}
			},{
			label: '<i class="fa fa-upload"></i> Add Item',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog) {
				
			var exp = $('#expirydate').val();
			var start = $('#start_date').val();
			var end = $('#end_date').val();
			var refno = $('.refno').val();
				var unit = $('.uom').val().split('|')[0];
				// var discounted = $('.discounted').attr('placeholder');
				
				var file_list = [$('.icode').val(), $('.idesc').val(), $('.iprice').val(), unit,$('.iquan').val(),$('.remarks').val(),exp,start,end,refno];
	
				$.post('template/EmpCredit/ec_incharge-ajaxpage.php', {'inchargeitemset':'', 'itemref': file_list}, function(data){
          		message_diag.close();

			   	var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
				var loader = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"> Loading Items</b>',
				message:img_loader,
				draggable: true, 
				closable: false  
				});
				loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
				loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
				loader.getModalFooter().remove();
				loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'150px'});   
				setTimeout(location.reload.bind(location), 500);
 				});
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '1px');
			message_diag.getModalHeader().css({'padding':'0.7% 3%'});
			message_diag.getModalFooter().css({'padding':'0.8% 3%', 'background-color':'#eaf9e9'});
			message_diag.getModalBody().css({'padding':'0.7% 3%', 'height':'300px'});
		});

$('.deleteitem').on('click', function(idx){
	// alert($(this).val());
	// var emplist = $(this).attr('id');
	var del_id = $(this).val();
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> Delete Item</b>',
		message: '<span class="fnt14">Are you sure to delete this item?</span>',
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
			$.post('template/EmpCredit/ec_incharge-ajaxpage.php', {'deleteitem':del_id}, function(data){
					window.location.reload();
			});

		}
		}]
		});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
		message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});	
	});

// ============== ACCTG ADJUSTMENT ============================================================================
		

		$('.credit_det').off().on('click', function(idx){

			var file_list = [];
			var id = $(this).attr('id');
			var empid = $(this).val();
			var total = $(this).attr('alt');
			file_list.push([empid,  total, id,]);
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> CREDIT DETAILS:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var footerBack = dialog.getButton('back');
				var footerProceed = dialog.getButton('proceed');
				var page = dialog.getData('pageToLoad');
					content.load(page);
					footerBack.hide(); 
					footerProceed.hide();    
					return content;
			},
			data: {'pageToLoad':'template/EmpCredit/ec_actg-ajaxpage.php?ec_credit_det='+file_list},
			draggable: true, 
			closable: false,           
		    buttons: [{
	            label: 'Close',
	            cssClass: 'btn-default btn-fill btn-sm',
	            action: function(dialog) {
	                dialog.close();
	            }
	            },{
	        	id: 'back',	
	            label: '<i class="glyphicon glyphicon-chevron-left"></i> Back',
	            cssClass: 'btn-primary btn-fill btn-sm',
	            action: function(dialog) {
	            	$.post('template/EmpCredit/ec_actg-ajaxpage.php', {'ec_credit_back': file_list}, function(data){
					$('.scheduleContain').html(data);
						var footerBack = dialog.getButton('back');
						var footerProceed = dialog.getButton('proceed');
						footerBack.hide(); 
						footerProceed.hide();
						console.log(data);
					});
	            }
	            },{
	        	id: 'proceed',	
	            label: '<i class="glyphicon glyphicon-ok"></i> Update',
	            cssClass: 'btn-danger btn-fill btn-sm',
	            action: function(dialog) {
	                var file_list = [];
					$('img.imgCE').each(function(){				
						var img = $(this).attr('src').split('/')[3];
						if(img === 'cck.png'){
							var id 		= $(this).attr('alt');
							var itemid 	= $('.cost_'+id).attr('for');
							var qty 	= $('.qty_'+id).val();
							var cost 	= $('.cost_'+id).val();
							var tcost 	= $('.total_'+id).val();
							var transno = $('.cost_'+id).attr('alt');
							var empid 	= $('.qty_'+id).attr('for');
							var bcode 	= $(this).attr('id');
							file_list.push([id, itemid, qty, cost, tcost, transno, empid, bcode]);	
							
						}
					});
					if(file_list.length == 0 ){
						alert(" No table selected");
					}else{			
					var message_diag = new BootstrapDialog.show({
						size: BootstrapDialog.SIZE_SMALL,
						type: BootstrapDialog.TYPE_DEFAULT,
						title: '<b class="fnt14"><i class="glyphicon glyphicon-check"></i> ADJUSTMENT</b>',
						message: '<span class="fnt14">Do you want to proceed?</span>',
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
							cssClass: 'btn-primary btn-fill btn-sm',
							action: function(error_dialog) {
								$.post('template/EmpCredit/ec_actg-ajaxpage.php',
				      			{'ec_adj_overide':file_list},
				      			function(data){
				      				message_diag.close();
						      		var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
									var loader = new BootstrapDialog.show({
										size: BootstrapDialog.SIZE_SMALL,
										type: BootstrapDialog.TYPE_DEFAULT,
										title: '<b class="fnt14"> PROCESSING ADJUSTMENTS</b>',
										message:img_loader,
										draggable: true, 
										closable: false  
									});
									loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
									loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
									loader.getModalFooter().remove();
									loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});   
									setTimeout(location.reload.bind(location), 500);
				      			});	
							}
						}]
						});
						message_diag.getModalContent().css('border-radius', '2px');
						message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
						message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
						message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});	
					}
	            }
    
          	}]
			});
			dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.2% 2%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 2%', 'height':'400px'});
		});

		// =========== PER STORE ADJUSTMENT EXCEPT ALTA ===============================================================
		$('.selectDATE_AcctgNESCO').on('change', function(){
		var date_ = $(this).val();
		
			$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_AcctgNESCO':$(this).val()}, function(data){
				$('.deductiontable').html(data);
				});
		});

		$('.selectDATE_AcctgAE').on('change', function(){
		var date_ = $(this).val();
		
			$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_AcctgAE':$(this).val()}, function(data){
				$('.deductiontable').html(data);
				});
		});
		// ============================================================================================================

		// ============ ALTA ADJUSTMENTS ==============================================================================
		// $('.selectDATE_AcctgAltaNESCO').on('change', function(){
		// var date_ = $(this).val();
		
		// 	$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_AcctgAltaNESCO':$(this).val()}, function(data){
		// 		$('.deductiontable').html(data);
		// 		});
		// });

		// $('.selectDATE_AcctgAltaAE').on('change', function(){
		// var date_ = $(this).val();
		
		// 	$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_AcctgAltaAE':$(this).val()}, function(data){
		// 		$('.deductiontable').html(data);
		// 		});
		// });
		// ============================================================================================================
		// ============ CENTRAL CREDIT ==============================================================================
		$('.selectDATE_centralCreditAE').on('change', function(){
		var date_ = $(this).val();
		
			$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_centralCreditAE':$(this).val()}, function(data){
				$('.deductiontable').html(data);
				});
		});

		$('.selectDATE_centralCreditNESCO').on('change', function(){
		var date_ = $(this).val();
		
			$.post('template/EmpCredit/ec_actg-ajaxtable.php', {'selectDATE_centralCreditNESCO':$(this).val()}, function(data){
				$('.deductiontable').html(data);
				});
		});

		// ============================================================================================================
		$('.cost').on('keyup', function(){
			var qty 	= $('.qty').val();
			var cost 	= $(this).val();
			var tcost 	= qty*cost;
			alert(tcost);
	 			$('.tcost').attr('placeholder',(Math.round(tcost).toFixed(2)));

		});
// ============== END ACCTG ADJUSTMENT =====================================================================
// ============== Michael Bayot ============================================================================		

	    $('.per_buRep').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var credtype = $(this).attr('for');
			var nesco = $(this).val();
			var inch = $(this).attr('alt');

			var message_diag = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> Generate Report :</b>',
					message: function(dialog) {
						var content = $('<div></div>');
						var page = dialog.getData('pageToLoad');
						content.load(page);
						return content;
					},
					data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?per_buRep='+inch},
					draggable: true,
					closable: false,
					buttons: [{
					label: 'Close',
					cssClass: 'btn-default btn-fill btn-sm',
					action: function(error_dialog) {

						error_dialog.close();
					}
					},{
					label: 'Filter',
					cssClass: 'btn-success btn-fill btn-sm',
					action: function(error_dialog) {
						var file_list = [];
						var batno = $('.batno').val();
						var Emptype = $('.Emptype').val();
						var BuLoc = $('.bunit').val();


						file_list.push([batno, Emptype, BuLoc]);
	 							window.open('template/EmpCredit/ec_batchreport.php?ec_summary='+file_list,'_blank');
								setTimeout(location.reload.bind(location), 700);
								error_dialog.close();

					}
					}]
					});
					message_diag.getModalContent().css('border-radius', '2px');
					message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
					message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#dff0d8'});
					message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'200px'});
		});

		$('.per_buItemDet').off().on('click', function(idx){
			var refcode = $(this).attr('id');
			// alert(refcode);
			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?per_buItemDet='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
		});

		$('.per_buItemDet_upload').off().on('click', function(idx){
			var refcode = $(this).attr('id');
			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_MEDIUM,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> TRANSACTION DETAILS:</span></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);
					return content;
				},
				data: {'pageToLoad':'template/EmpCredit/ec_incharge-ajaxpage.php?per_buItemDet_upload='+refcode},
				draggable: true,
				closable: true,
				    buttons: [{
				              label: 'Close',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.2% 5.4%', 'background-color':'#dff0d8'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'450px'});
		});

		$('.gen_soaAE').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var details 	= $('.selectDATE_centralCreditAE').val();
			
			if (!details) {
				alert('Please Select Deduction Date...')
			}
			else{
			window.open('template/EmpCredit/ec_reportSOA.php?ec_central_soa='+details,'_blank');
			setTimeout(location.reload.bind(location), 700);
			error_dialog.close();
			}
		});

		$('.gen_soaNESCO').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();

			var details 	= $('.selectDATE_centralCreditNESCO').val();

			if (!details) {
				alert('Please Select Deduction Date...')
			}
			else{
			window.open('template/EmpCredit/ec_reportSOA.php?ec_central_soa='+details,'_blank');
			setTimeout(location.reload.bind(location), 700);
			error_dialog.close();
			}
		});
// ==========================================================================================================
// ==========================================================================================================
		$('.pay_cutoff').on('change', function(){
			var date = $(this).val();
  			$('#loader').show();
			$.post('template/EmpCredit/ec_payrollajaxtable.php', {'pay_summary':date}, function(data){
				$('.summary').html(data);
				$.post('template/EmpCredit/ec_payrollajaxtable.php', {'pay_grandtotal':date}, function(data){
					$('.overall').html(data);
					$.post('template/EmpCredit/ec_payrollajaxtable.php', {'pay_table':date}, function(data){
						$('.deductiontable').html(data);
						$('#loader').fadeOut('slow');
					});
				});
			});
		}).change();

		$('.payroll_rep').on('click', function(){
			var cutoff 	= $('.pay_cutoff').val();
			var date = new Date();
			var today_date = date.getFullYear() + '-' + (date.getMonth() + 1)+ '-' + date.getDate();

			if(today_date <= cutoff){
				window.open('template/EmpCredit/ec_deduction_report.php?ec_payroll_rep='+cutoff,'_blank');
				setTimeout(location.reload.bind(location), 700);
				error_dialog.close();
			}else{
				window.open('template/EmpCredit/ec_deducted_report.php?ec_payroll_rep='+cutoff,'_blank');
				setTimeout(location.reload.bind(location), 700);
				error_dialog.close();
			}
		});
// ==========================================================================================================
		$('#updateBtn').on('click', function(){
			var batch = 'asd';
			var img  = '<center><img src="../assets/img/grandtotal.gif" style="padding-top:90px;"></center>';
			$('.deductiontable').html(img);
			$.post('template/EmpCredit/update_batch.php', {'update_cred':batch}, function(data){
				$('.deductiontable').html(data);
				setTimeout(location.reload.bind(location), 200);
			});
		});
});




