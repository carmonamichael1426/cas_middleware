function Sched_AMORT(idcode){
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SETUP:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?csf_set-sched='+idcode},
		draggable: true, 
		closable: false,           
		buttons: [{
		label: 'Close.',
		cssClass: 'btn-default btn-fill btn-sm pull-left',
		action: function(error_dialog) {
			error_dialog.close();
		}
		},{
		label: 'Test Sched.',
		cssClass: 'btn-default btn-fill btn-sm',
		action: function(error_dialog){
			var amrt_deduction = $('.amrtData').val();
			var amrt_currentbal = $('.amrtData').attr('for');
			var scheduled_date = $('#scheduled_date').val();
			if(amrt_deduction.replace(/\s/g, '') == ''
			|| scheduled_date.replace(/\s/g, '') == ''){
			alert("Some field found empty. Please check you amortization form.");
			}else{
				$.post('template/Customerfinancialservice/cfs_actg-ajaxpage.php',
					{'showTESTsched':'',
					'amrt_deduction':amrt_deduction,
					'amrt_currentbal':amrt_currentbal,
					'scheduled_date':scheduled_date},
					function(data){
						$('.sched_TABLE').html(data);
				});
			}
		}
		},{
		label: 'Proceed',
		cssClass: 'btn-success btn-fill btn-sm',
		action: function(error_dialog) {

			var amrt_deduction = $('.amrtData').val();
			var amrt_currentbal = $('.amrtData').attr('for');
			var scheduled_date = $('#scheduled_date').val();
			if(amrt_deduction.replace(/\s/g, '') == ''
			|| scheduled_date.replace(/\s/g, '') == ''){
			alert("Some field found empty. Please check you amortization form.");
			}else{
				$.post('template/Customerfinancialservice/cfs_actg-ajaxpage.php',
					{'saveNewsched':idcode,
					'amrt_deduction':amrt_deduction,
					'amrt_currentbal':amrt_currentbal,
					'scheduled_date':scheduled_date},
					function(data){
						error_dialog.close();
						window.location.reload();
						// $('.sched_TABLE').html(data);
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




function cfssched_amort(idcode){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> AMORTIZATION SCHEDULE:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?cfs_schedule='+idcode},
		draggable: true, 
		closable: false,           
		buttons: [{
		label: '<i class="fa fa-calendar-o fa-fw"></i> Changed Sched.',
		cssClass: 'btn-success btn-fill btn-sm pull-left',
		action: function(error_dialog) {
			Sched_AMORT(idcode);
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
		message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});
		message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'400px'});		
}


function cfsdeduction_monitoring(idcode){
	var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> DEDUCTION MONITORING:</b>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?deduction_monitoring='+idcode},
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
		message_diag.getModalBody().css({'padding':'0.7% 3.5%', 'height':'650px'});		
}




$(document).ready(function($){

	/* LIST SELECTION  .................................................... */
	$('.cfs_listselection').on('click', function(){
		var img_DATA = $(this).text();
		if(img_DATA === 'Select All'){
			$(this).text('Unselect All');
			$('.imgUNAMRT').attr('src', '../assets/icon_index/cck.png');
		}else{
			$(this).text('Select All');
			$('.imgUNAMRT').attr('src', '../assets/icon_index/uncck.png');
		}
	});
	$('.imgUNAMRT').on('click', function(){
		var img_SRC = $(this).attr('src').split('/')[3];
		if(img_SRC === 'uncck.png'){
			$(this).attr('src', '../assets/icon_index/cck.png');
		}else{
			$(this).attr('src', '../assets/icon_index/uncck.png');
		}
	});
	/*--------------------------------------------------------------------- */


	/* SET UP SCHEDULE ---------------------------------------------------- */
	$('.cfs_scheduleSETUP').on('click', function(){
	var img_test = [];
	$('img.imgUNAMRT').each(function(){
		var img_ = $(this).attr('src').split('/')[3];
		if(img_ === 'cck.png'){
			img_test.push($(this).attr('id'));
		}
	});


	if(img_test.length > 0){
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AMORTIZATION SCHEDULE:</b>',
		message: 'This information will tag as amortized. Do you want to proceed?',
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
			$.post('template/Customerfinancialservice/cfs_actg-ajaxpage.php', {'save_amortization':img_test}, function(data){
				window.location.reload();
			});
		}
		}]
		});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalHeader().css({'padding':'2.3% 6%'});
		message_diag.getModalFooter().css({'padding':'2% 6%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'2% 6%', 'height':'70px'});			
	}else{
		alert("Process can't be completed, Please select any data available below.");
	}	
	});
	/* -------------------------------------------------------------------- */




	 /* IAD FUNCTION ====================================================== */
	 // SET DEDUCTIONS-------------------
	 $('.cfs_aidSETSCHED').on('click', function(){
	 	var img_test = [];
	$('img.imgUNAMRT').each(function(){
		var img_ = $(this).attr('src').split('/')[3];
		if(img_ === 'cck.png'){
			img_test.push($(this).attr('for'));
		}
	});


		if(img_test.length > 0){
			var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> SET AMORTIZATION SCHEDULE:</b>',
			message: "You are about to forward employee's deduction to payroll. Do you want to proceed?",
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
			$.post('template/Customerfinancialservice/cfs_iad-ajaxpage.php', {'set_deduction':img_test}, function(data){
			window.location.reload();
			});
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'2.3% 6%'});
			message_diag.getModalFooter().css({'padding':'2% 6%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 6%', 'height':'70px'});			
		}else{
			alert("Process can't be completed, Please select any data available below.");
		}
	 });
	 /* ------------------------------------------------------------------------------ */



	 /* FUNCTION POST AUDIT DEDUCTION ------------------------------------------------ */
	 
	 $('input#auditingdate').on('change', function(){
	 	$.post('template/Customerfinancialservice/cfs_ajaxtable.php', {'postaudit':$(this).val()}, function(rdata){
	 		$('div.iaddeductiontable').html(rdata);	
	 		console.clear();	
	 	});
	 });

	 /* ------------------------------------------------------------------------------ */



	 /* FILTER DEDUCTION DATE -------------------------------------------------------- */
	 $('.cfsiadFilterdate').on('change', function(){
		var cfsDay = $('#cfsDay').val().replace(/\s/g, '');
		var cfsMonth = $('#cfsMonth').val().replace(/\s/g, '');
		var cfsYear = $('#cfsYear').val().replace(/\s/g, '');
		$.post('template/Customerfinancialservice/cfs_ajaxtable.php', {'deductioniadfilterdate':'', 'dateFilter':cfsYear+'-'+cfsMonth+'-'+cfsDay}, function(data){
			$('.iaddeductiontable').html(data);
		});
	 });
	 /* ------------------------------------------------------------------------------ */


	/* CANCEL AUDIT ------------------------------------------------------------------ */
	$('.cancelAudit').on('click', function(){
		var id_audit = $(this).attr('id').split('|');
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> CANCEL DEDUCTION:</b>',
			message: "You are about to remove this data from the deductin list as of "+id_audit[1]+". Do you want to proceed?",
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
			$.post('template/Customerfinancialservice/cfs_iad-ajaxpage.php', {'iadcancel_DEDUCTION':id_audit[0]}, function(data){
				error_dialog.close();
				$('#TR'+id_audit[0]).fadeOut();
			});
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'2.3% 6%'});
			message_diag.getModalFooter().css({'padding':'2% 6%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'2% 6%', 'height':'70px'});
	});
	/* --------------------------------------------------------------------------- */


	/* GET PDF REPORT  (SUMMARY) ---------------------------------------------------------------*/
	$('.cfspsfSummary').on('click', function(){
		var cfsYear = $('#cfsYear').val().replace(/\s/g, '');
		var cfsMonth = $('#cfsMonth').val().replace(/\s/g, '');
		var cfsDay = $('#cfsDay').val().replace(/\s/g, '');
		
		window.open('template/Customerfinancialservice/cfs_reportPDF.php?type=deductionSummary&date='+cfsYear+'-'+cfsMonth+'-'+cfsDay, '_blank');
	});

	/* ========================= ACOUNTING MODAL REPORT ===============*/
	$('.rangereport').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> Select Date Range</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?rangereport'},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog){
				error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog){
				var date_from = $('input[name=date_from]').val();
				var date_to = $('input[name=date_to]').val();
				window.open('template/Customerfinancialservice/pdf.php?date_1='+date_from+'&date_2='+date_to, '_blank');
				gifterror_dialog.close();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.7% 5%'});
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.7% 5%', 'height':'100px'});
	});


	$('.deduction_summary').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> Select Date Range</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?deduction_summary'},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog){
				error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog){
				var date_from = $('#cfs_ded_sum_date').val();
				var date_to = $('input[name=date_to]').val();
				
				window.open('template/Customerfinancialservice/cfs_reportPDFDedSumarry.php?type=deductionSummary&date='+date_from, '_blank');
				gifterror_dialog.close();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.7% 5%'});
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.7% 5%', 'height':'100px'});
	});
	

	/*----------------Range report--------------------- */
	$('.dailyreport').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> Select Date</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?dailyreport'},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog){
				error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog){
				var date_from = $('input[name=date_from]').val();
			
				window.open('template/Customerfinancialservice/dailypdf.php?date_1='+date_from,'_blank');
				error_dialog.close();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.7% 5%'});
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.7% 5%', 'height':'100px'});
	});


	$('.accreport').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> Select Date</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?accreport'},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog){
				error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog){
				var date_from = $('input[name=date_from]').val();
			
				window.open('template/Customerfinancialservice/accountabilityreport.php?date_1='+date_from,'_blank');
				error_dialog.close();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.7% 5%'});
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.7% 5%', 'height':'100px'});			
	});


	$('.acctgReportSlip').on('click', function(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> Select Date</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Customerfinancialservice/cfs_actg-ajaxpage.php?genAcctgRprtSlip'},
			draggable: true,
			closable: false,
			buttons: [{
			label: 'Close',
			cssClass: 'btn-default btn-fill btn-sm',
			action: function(error_dialog){
				error_dialog.close();
			}
			},{
			label: 'Proceed',
			cssClass: 'btn-success btn-fill btn-sm',
			action: function(error_dialog){
				var ded_date = $('input#deduction_date').val();
				window.open('template/Customerfinancialservice/acctg_cfsreport_pdf.php?type=acctg_deduction_slip&ded_date='+ded_date,'_blank');
				error_dialog.close();
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.7% 5%'});
			message_diag.getModalFooter().css({'padding':'1.7% 5%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.7% 5%', 'height':'100px'});			
	});


		// $('.btnsetupjvs').click(function(){
			
		// 	$('.jvnochk').each(function(){
		// 	if($(this).is(":checked"))
		// 	{
		// 		var jvno = $('.jvnotxt').val();
		// 		alert(jvno);
  // 				// $.ajax({
  //     //                   url:"template/cfs/db-con/disapprove_req.php",
  //     //                   method:'post',
  //     //                   data:{updateid:id},
  //     //                   success:function(data)
  //     //                   {
  //     //                      alert("Successfully Disapproved");
  //     //                      location.reload();
  //     //                   }
  //     //           });
		// 	}
		//   });
	 //   	});

	 $('input#jvdate').on('change', function(){
	 	$.post('template/Customerfinancialservice/ajax/jvseldate.php', 
	 		{
	 			'postaudit':$(this).val()
	 		},
	 		function(rdata){
	 		$('div.jvtable').html(rdata);
	 		
	 	});
	 });


   	$('.jvnotxt').change(function(){
	   		var jvnum = $(this).val();
	   		var id = $(this).attr('id');

	   		$(this).attr("disabled", "disabled"); 
	   		alertify.error('JV Number Saved');

	   		$.ajax({
	                url:"template/Customerfinancialservice/ajax/jvset.php",
	                method:'post',
	                data:{jv:jvnum,id1:id},
	                success:function(data)
	                {
	                   
	                }
             });
	   	});



      $('.setokforccd').click(function(){
             $('.selToCcd').each(function(){
                if($(this).is(":checked")){



                    var id = $(this).val();
                   // alert(id);
                        $.ajax({
                                url:"template/Customerfinancialservice/ajax/accounting_stat.php",
                                method:'post',
                                data:{updateid:id},
                                success:function(data)
                                {
                                  
                                  
                                }

                        });
setTimeout(
  function() 
  {
  	alert('Pre Checking Successfully updated.')
    location.reload();
  }, 3000);
                   
                    }   
                 
                });

      }); 

      $('.setokall').click(function(){
   				$('.selToCcd').each(function(){
				 	this.checked = true;
				});
      }); 

	  $('.btntest').click(function(){
	   		alertify.success('JV Number Saved');
	  });


	    $('.btntest').click(function(){
	   		alertify.success('JV Number Saved');
	  });

	    
	  $('.more_bal').click(function(){
	   		var id = $(this).attr('id');
	   		var item_id = $(this).attr('for');
	   		var store_type = $(this).attr('alt');
 			

                        $.ajax({
                                url:"template/Customerfinancialservice/ajax/view_balance.php",
                                method:'post',
                                data:{
                                	id_p:id,
                                	item_id_p:item_id,
                                	store_type_p:store_type
                                },
                                success:function(data)
                                {
                                  $('.modal_view_more').modal('toggle');
                                  $('.ab_more_detail').html(data);
                                }

                        });
	   		
	  });

	 
	  $('.setdiscard').click(function(){
             $('.selToCcd').each(function(){
                if($(this).is(":checked")){



                    var id = $(this).val();
                   // alert(id);
                        $.ajax({
                                url:"template/Customerfinancialservice/ajax/accounting_stat1.php",
                                method:'post',
                                data:{updateid:id},
                                success:function(data)
                                {
                                  
                                  
                                }

                        });
setTimeout(
  function() 
  {
  	alert('Pre Checking Successfully updated.')
    location.reload();
  }, 3000);
                   
                    }   
                 
                });

      }); 
	/* --------------------------------------------------------------------------- */
});

