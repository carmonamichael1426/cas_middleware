var Base64 = {_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// INPUT NUMNBER ONLY .......................................
function int_(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
	if ((charCode != 45 || $(element).val().indexOf('-') != -1) &&
	(charCode > 46 || $(element).val().indexOf('.') != -1) &&
	(charCode < 48 || charCode > 57))
	return false;
};




/* ..............................................................*/
/* ..............................................................*/
/* ..............................................................*/
/* ..............................................................*/
/* FUNCTION GENERATE CSV FILE FOR RELEASING ======================== */
function Requestcsv(data, txtfile){
	if(data == ''){
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b>',
		message:"("+txtfile+") Text file for this report was already exist.",
		draggable: true,
		closable: false,
		buttons: [{
			label: 'Okay',
			cssClass: 'btn-default btn-fill btn-sm',
				action: function(error_dialog) {
				  error_dialog.close();
				}
			}]
		});
		message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	}else{
		var message_diag = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b>',
		message:"TEXT FILE : <u>"+txtfile+"</u><br />This information will be use by FAD System as basis for the released item. Do you want to continue? ",
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
				 	// error_dialog.close();
				   	window.open('template/Empuniforms/uni_CSV-reports.php?'+data, '_self');
					error_dialog.close();
				}
			}]
		});
		message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		message_diag.getModalContent().css('border-radius', '2px');
		message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
		message_diag.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	}
}






/* ..............................................................*/
/* ..............................................................*/
/* ..............................................................*/
/* ..............................................................*/
/* ..............................................................*/
// HR ACCESS (REPLACE ITEM REQUEST)................
function changeITEM(reqcode){
var box = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_WIDE,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> REPLACE ITEM:</b></span>',
	message: function(cont) {
		var content = $('<div></div>');
		var page = cont.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {'pageToLoad':'../employee/template/Empuniforms/uni_ajaxpagefix.php?change_item='+reqcode},
	draggable: true,
	closable: false,
	    buttons: [{
	              label: 'Close',
	              cssClass: 'btn-default btn-fill btn-sm',
	              action: function(cont) {
	                  cont.close();
	              }
	          },{
	              label: 'Released Item',
	              cssClass: 'btn-success btn-fill btn-sm',
	              action: function(cont) {
							var incost = document.getElementsByClassName('incost');
							var uniqty = document.getElementsByClassName('uniqty');
							var uniamt = document.getElementsByClassName('uniamt');
							var new_array = [];

							$('select.sizeUNI').each(function(idx){
								var fl_incost = incost[idx].value;
								var fl_uniqty = uniqty[idx].value;
								var fl_uniamt = uniamt[idx].value;
								if((fl_uniqty.replace(/\s/, '')!='') && (fl_uniqty.replace(/\s/, '')!=0)){
									var row_values = [$(this).val(), fl_incost, fl_uniqty, fl_uniamt];
									new_array.push(row_values);
								}
							});

							if(new_array.length !=0){
								var dialog = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> IFORMATION:</b></span>',
								message:'This Item will automatically replace the existing data from the record list. Do you want to procceed?',
								draggable: true,
								closable: false,
								    buttons: [{
								              label: 'Cancel',
								              cssClass: 'btn-default btn-fill btn-sm',
								              action: function(dialog) {
								                  dialog.close();
								              }
								          }, {
								              label: 'Procceed',
								              cssClass: 'btn-success btn-fill btn-sm',
								              action: function(dialog) {
						         				dialog.close();
												cont.close();
						         				$.post('../employee/template/Empuniforms/uni_ajaxpagefix.php', {'changeitem_exec':new_array, 'reqcode':reqcode},
												function(data){
													window.location.reload();
												});
							              	}
								          }]
								});
								dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
								dialog.getModalContent().css('border-radius', '2px');
								dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
								dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});

							}else{

								var dialog = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b></span>',
								message:"Please select uniform's type and number of item to be requested!",
								draggable: true,
								closable: false,
								    buttons: [{
								              label: 'Okay',
								              cssClass: 'btn-default btn-fill btn-sm',
								              action: function(dialog) {
								                  dialog.close();
								              }
								          }]
								});
								dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
								dialog.getModalContent().css('border-radius', '2px');
								dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
								dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
							}
	              }
	          }]
	});
	box.getModalHeader().css({'padding':'0.6% 2.7%', 'border-radius':'1px'});
	box.getModalContent().css('border-radius', '2px');
	box.getModalFooter().css({'padding':'0.6% 2.7%', 'background-color':'#fcf8e3'});
	box.getModalBody().css({'padding':'0.3% 2.7%', 'height':'550px'});
}




/* .............................................................. */
/* .............................................................. */
// SET AMORTIZATION SCHEDULE ...............................
function set_amortschedule(reqcode){
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> AMORTIZATION SETUP </b></span>',
	message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {
		'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?set_schedule='+reqcode
	},
	draggable: true,
	closable: false,
	    buttons: [{
	              label: 'Close',
	              cssClass: 'btn-default btn-fill btn-sm pull-left',
	              action: function(dialog) {
	                  dialog.close();
	              }
	          },{
	              label: 'Show Sched.',
	              cssClass: 'btn-default btn-fill btn-sm',
	              action: function(dialog) {
					var currentbal = $('.currentbal').val();
					var Dedamount = $('.Dedamount').val();
					var scheduled_date = $('#scheduled_date').val();
					if(currentbal.replace(/\s/g, '') == ''
					|| Dedamount.replace(/\s/g, '') == ''
					|| scheduled_date.replace(/\s/g, '') == ''){
					alert("Procces can't be complete. Please check you amortization setup form.");
					}else{
						$.post('template/Empuniforms/uni_ajaxpage.php', {
							'test_schedule':'', 'currentbal':currentbal, 'Dedamount':Dedamount, 'scheduled_date':scheduled_date
						}, function(data){
							$('.scheduleContain').html(data);
						});
					}
	              }
	          },{
	              label: 'Proceed',
	              cssClass: 'btn-success btn-fill btn-sm',
	              action: function(dialog) {
	              	var currentbal = $('.currentbal').val();
	              	var Dedamount = $('.Dedamount').val();
	              	var scheduled_date = $('#scheduled_date').val();
	    			if(currentbal.replace(/\s/g, '') == ''
					|| Dedamount.replace(/\s/g, '') == ''
					|| scheduled_date.replace(/\s/g, '') == ''){
	    				alert("Procces can't be complete. Please check you amortization setup form.");
	    			}else{
	    				var con = confirm("This schedule will used as basis for unifrom's deductions. Click 'OK' to proceed.");
						if(con == true){
		    				$.post('template/Empuniforms/uni_ajaxpage.php', {
		    					'save_newschedule':reqcode, 'currentbal':currentbal, 'Dedamount':Dedamount, 'scheduled_date':scheduled_date
		    				}, function(data){
								window.location.reload();
							});
						}
	    			}

	              }
	          }]
	});
	dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1% 5.4%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1% 5%', 'height':'470px'});
}





/* ............................................................................... */
/* ............................................................................... */
/* ............................................................................... */
/* ............................................................................... */
/* GET AMORTIZATION SCHEDULE ..........................................*/
function emp_amortschedule(reqcode, status){
	var accesspath = window.location.pathname.split('/')[2];
	var hidebtn = 'hide';
	if(accesspath == 'hr' && status === 'UNCLOSE'){ 
		hidebtn = null; 
	}

	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> AMORTIZATION SCHEDULE </b></span>',
	message: function(dialog) {
	var content = $('<div></div>');
	var page = dialog.getData('pageToLoad');
	content.load(page);
	return content;
	},
	data: {
		'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?employee_schedule='+reqcode
	},
	draggable: true,
	closable: false,
	buttons: [{
	          label: 'Close',
	          cssClass: 'btn-default btn-fill btn-sm',
	          action: function(dialog) {
	              dialog.close();
	          }
	      // },{
	      //     label:'Change Sched.',
	      //     cssClass:  hidebtn+' btn-success btn-fill btn-sm',
	      //     action: function(dialog) {
	      //     	set_amortschedule(reqcode);
	      //     }
	      }]
	});
	dialog.getModalHeader().css({'padding':'1.2% 5%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1% 5.4%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1% 5%', 'height':'350px'});
}





/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
/* CONFIRM PROMO PAYMENT UNIFORM REQUEST ................. */
function promoconfirmpayment(reqcode){
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> PROMO PAYMENT FORM</b></span>',
	message: function(dialog) {
	var content = $('<div></div>');
	var page = dialog.getData('pageToLoad');
	content.load(page);
	return content;
	},
	data: {
		'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?promo_paymentform='+reqcode
	},
	draggable: true,
	closable: false,
	buttons: [{
	          label: 'Cancel',
	          cssClass: 'btn-default btn-fill btn-sm',
	          action: function(dialog) {
	              dialog.close();
	          }
	      },{
	          label:'Proceed',
	          cssClass: 'btn-success btn-fill btn-sm',
	          action: function(dialog) {
	          	var paybleAmT = parseFloat(Base64.decode($('.paybleAmrT').attr('id')));
	          	var Receipnum = $('input.Receipnum').val();
	          	var amountPaid = parseFloat($('input.amountPaid').val());
	          	if(paybleAmT == amountPaid){
	          		if(Receipnum.replace(/\s/g, '') != ''){
		          		var con = confirm("You are about to closed this entry account. Do you want to proceed");
		          		if(con == true){
		          			$.post('template/Empuniforms/uni_ajaxpage.php', {
		          				'promo_paymentEXEC':reqcode,
		          				'paybleAmT':paybleAmT,
								'Receipnum':Receipnum,
								'amountPaid':amountPaid}, function(data){
									// alert(data);
									window.location.reload();
							})
		          		}
		          	}else{
		          		alert("Process can't be completed. Plese the correct information.");
		          	}
	          	}else{
		          	 alert("Amount must not be less/above than the payable amount.");
	          	}
	          }
	      }]
	});
	dialog.getModalHeader().css({'padding':'1.2% 6.5%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1% 6.5%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1% 6.5%', 'height':'310px'});
}



/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/* FUNCTION GET FILE GENERATED (RELEASING) ========================================== */
function releasedfilelist(filnameTXT){
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_WIDE,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> FILE GENERATED - RELEASED ITEM </b></span>',
	message: function(dialog) {
	var content = $('<div></div>');
	var page = dialog.getData('pageToLoad');
	content.load(page);
	return content;
	},
	data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?filegeneretedlist='+filnameTXT},
	draggable: true,
	closable: false,
	buttons: [{
	          label: 'Cancel',
	          cssClass: 'btn-default btn-fill btn-sm',
	          action: function(dialog) {
	              dialog.close();
	          }
	      }]
	});
	dialog.getModalHeader().css({'padding':'0.7% 3.5%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'0.7% 3.5%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'0.7% 3.5%', 'height':'450px'});
}




/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* FUNCTION CSV_CONTENT CONTENT ........................... */
function csv_contentfunction(filepath){
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_WIDE,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> TEXT FILE CONTENT</b></span>',
	message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?released-txfilecontent='+filepath},
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
	dialog.getModalHeader().css({'padding':'0.7% 3%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'0.7% 3%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'0.5% 3%', 'height':'500px'});
}








/* ......................................................... */
/* ......................................................... */
/* ......................................................... */
/* ......................................................... */
/* ......................................................... */
/* ......................................................... */
/* FUNCTION CSV REMOVE TEXT FILE ........................... */
function csv_removefunction(filepath, row){
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_SMALL,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> DELETE TEXT FILE</b></span>',
	message: 'This text file will use from <b>FAD system for inventory update</b>. Do you wish to remove this file?',
	draggable: true,
	closable: false,
	    buttons: [{
	              label: 'Cancel',
	              cssClass: 'btn-default btn-fill btn-sm',
	              action: function(dialog) {
	                  dialog.close();
	              }
	          },{
	              label: 'Remove',
	              cssClass: 'btn-danger btn-fill btn-sm',
	              action: function(dialog) {
	                  $.post('template/Empuniforms/uni_ajaxpage.php', {'remove_textfile':filepath}, function(data){
	                  dialog.close();
	                  $('tr#'+row).fadeOut();
	                  });
	              }
	          }]
	});
	dialog.getModalHeader().css({'padding':'1.7% 6.5%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1.7% 6.5%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1.5% 6.5%', 'height':'70px'});

}





/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* DEDUCTION TRANSFER FORM ........................ */
function btntrnscharge(serialCODE){
	// var serialCODE = $(this).attr('id');
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> TRANSFER DEDUCTION CHARGEsds</b></span>',
	message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?transferdeductionFORM='+serialCODE},
	draggable: true,
	closable: false,
	    buttons: [{
	              label: 'Cancel',
	              cssClass: 'btn-default btn-fill btn-sm',
	              action: function(dialog) {
	                  dialog.close();
	              }
	          },
	          {
	              label: 'Proceed',
	              cssClass: 'btn-success btn-fill btn-sm',
	              action: function(dialog) {
	                  var empsearch_box 	= $('#empsearch_box').attr('for');
	                  var strDATE_rep 		= $('#strDATE_rep').val();
	                  var actreason 		= $('.actreason').val();
						if(empsearch_box.replace(/\s/g, '') != ''
						&& strDATE_rep.replace(/\s/g, '') != ''
						&& actreason.replace(/\s/g, '') != ''){

						var con = confirm("This action will automatically affect the information for deduction to this account entry. Do you want to continue?");
						if(con == true){
							$.post('template/Empuniforms/uni_ajaxpage.php',
								{'savetransfer_exec':serialCODE,
								'empsearch_box':empsearch_box,
								'strDATE_rep':strDATE_rep,
								'actreason':actreason},
								function(resdata){
									dialog.close();
									window.location.reload();
								});
						}
						}else{
							var fileContet = $(this).attr('id');
							var errorDIAG = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								title: '',
								message: '<i class="fa fa-question-circle"></i><b> WARNING</b><br />Please provide the information required by this action',
								draggable: true,
								closable: false,
								buttons: [{
								label: 'Close',
								cssClass: 'btn-default btn-fill btn-sm',
								action: function(DIAGmodal) {
								DIAGmodal.close();
								}
								}]
								});
								errorDIAG.getModalHeader().remove();
								errorDIAG.getModalContent().css('border-radius', '2px');
								errorDIAG.getModalFooter().css({'padding':'2% 6%', 'background-color':'#fcf8e3'});
								errorDIAG.getModalBody().css({'padding':'2.5% 6%', 'height':'70px'});
						}
	              }
	          }]
	});
	dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1.3% 6%', 'height':'445px'});
}





/* ................................................................................. */
/* ................................................................................. */
/* ................................................................................. */
/* ................................................................................. */
/* SELECT FUNCTION SEARCHED PERSONNEL .................... */
function selectpersonnelSEARCHTRNS(id, name, position, subsi){
	$('input#empsearch_box').val(name).attr({'for':id});
	$('input.trnsposition').val(position);
	$('input.trnsdepartment').val(subsi);
	$('ul#personnelsearch').fadeOut();
}

function Req_Approve(reqcode){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> HR Request Form</b></span>',
		message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?hr_req_approve='+reqcode
		},
		draggable: true,
		closable: false,
		buttons: [{
	          label: 'Cancel',
	          cssClass: 'btn-default btn-fill btn-sm',
	          action: function(dialog) {
	              dialog.close();
	          }
	      },{
	          label:'Proceed',
	          cssClass: 'btn-success btn-fill btn-sm',
	          action: function(dialog) {
	          	var type 	  = $('input.itemtype').attr('id');
	          	var design 	  =	$('input.itemdesign').attr('id');
	          	var unit 	  =	$('input.updITEM01').val();
	          	var fad_cost  =	$('input.fadcost').val();
	          	var sel_price =	$('input.unitcost').val();
	          	var qty_	  =	$('input.unitqty').val();
	          	var details_  = null;

	          	var details_  = [reqcode, type, design, unit, fad_cost, sel_price, qty_];
          		var con = confirm("The details will be automatically update. Do you want to proceed");
          		if(con == true){
          			$.post('template/Empuniforms/uni_ajaxpage.php', {
          				'update_request':details_,
					}, function(data){
							window.location.reload();
					})
          		}
	          }
	      }]
	});
	dialog.getModalHeader().css({'padding':'1.2% 4%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1% 6.5%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1% 4%', 'height':'450px'});
}

/*=================================================================================================================*/
	/*============================ approve hr request by supervisor for stock supply ==================================*/
	/*=================================================================================================================*/
	function Req_Approve_sup(reqcode){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> HR Request Details</b></span>',
		message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?req_approve_sup='+reqcode
		},
		draggable: true,
		closable: false,
		buttons: [{
		          label: 'Cancel',
		          cssClass: 'btn-default btn-fill btn-sm',
		          action: function(dialog) {
		              dialog.close();
		          }
		      },{
		          label:'Proceed',
		          cssClass: 'btn-success btn-fill btn-sm',
		          action: function(dialog) {
		          	var code_ 	  = $('input.itemcode').attr('id');
		          	var type 	  = $('input.itemtype').attr('id');
		          	var design 	  =	$('input.itemdesign').attr('id');
		          	var unit 	  =	$('input.updITEM01').val();
		          	var sel_price =	$('input.unitcost').val();
		          	var qty_	  =	$('input.unitqty').val();
		          	var details_  = null;

		          	var details_  = [reqcode, type, design, unit, sel_price, qty_];
	          		var con = confirm("The details will be automatically update. Do you want to proceed");
	          		if(con == true){
	          			$.post('template/Empuniforms/uni_ajaxpage.php', {
	          				'update_request_sup':details_,
						}, function(data){
								window.location.reload();
						})
	          		}
		          }
		      }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 4%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 6.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'3% 4%', 'height':'250px'});
	}





/* UNIOFORM JS FUNCTIONS ============================================================ */
$(document).ready(function($){

/* HR JS FUNCTIONS ============================================*/


/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// MODAL FORM ITEM TYPE ......................................................

    $('button.additemtype').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b>NEW ITEM TYPE</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?newitemtype'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              var unit = document.getElementsByClassName('itemmunit');
		              var itemtype = [];
		              var itemmunit = [];
		              var trig_ = 0;

	              	$('input.itemtype').each(function(idx){
	              		var itm_unit = unit[idx].value;
	              		if($(this).val().replace(/\s/, '') != ''){
	              			if(itm_unit.replace(/\s/g, '') !=''){
								itemtype.push($(this).val());
								itemmunit.push(itm_unit);
	              			}else{
								alert('Some field found Empty!');
								trig_ = 1;
	              			}
	              		}
	              	});

	              	if((trig_ == 0) && (itemtype.length!=0)){
	              		var con = confirm("Do you want to add this information to the record list? Click 'OK' to proceed.");
	              		if(con == true){
							$.post('template/Empuniforms/uni_ajaxpage.php',	{
								'add_itemtype':'',
								'itemtype':itemtype,
								'itemmunit':itemmunit},
								function(data){
									dialog.close();
									window.location.reload();
							});
	              		}
	              	}

	              }
		    }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.1% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.2% 6%', 'height':'395px'});
		$('this.modal')[0].remove();
    });




/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// DELETE ITEM TYPE ......................................................
    $('button.stcktyperemove').on('click', function(){
    	var typecode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> REMOVE ITEM TYPE:</b></span>',
		message:'This data will automatically be remove from the list. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		         				dialog.close();
		              	$.post('template/Empuniforms/uni_ajaxpage.php',
		              		{'remove_itemtype':typecode},
		              		function(data){
		         				$('tr.type'+typecode).fadeOut();
		              		});
	              	}
		        }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5.5%', 'height':'auto'});
    });




/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// ADD NEW ITEM DESIGN ...................................................
	$('button.additemdesign').on('click', function(idx){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b>ITEM DESIGN:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?newitemdesign'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {

		              var detype 		= document.getElementsByClassName('designtype');
		              var gender 		= document.getElementsByClassName('slct_gender');
			          var status 		= document.getElementsByClassName('statfree');

		              var design_type 	= [];
		              var design_name 	= [];
		              var slcted_gender	= [];
			          var stat_free		= [];

		              var trig_ 		= 0;

		              	$('input.designame').each(function(idx){
		              		var de_type 	= detype[idx].value;
		              		var sel_gender 	= gender[idx].value;
		              		var free 		= status[idx].value;

		              		if($(this).val().replace(/\s/, '') != ''){
	              				design_type.push(de_type);
								slcted_gender.push(sel_gender);
								stat_free.push(free);
								design_name.push($(this).val());
		              		}
		              	});

		              	if((trig_ == 0) && (design_name.length!=0)){
		              		var con = confirm("Do you want to add this data to the record list? Click 'OK' to procceed.");
		              		if(con == true){
								$.post('template/Empuniforms/uni_ajaxpage.php',{
									'add_typedesign':'',
									'design_type':design_type,
									'design_name':design_name,
									'slcted_gender':slcted_gender,
									'stat_free':stat_free
								},
									function(data){
										dialog.close();
										window.location.reload();
										alert('SUCCESSFULLY SAVE!');
								});
		              		}
		              	}

	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.2% 6%', 'height':'400px'});
		$('this.modal')[0].remove();
	});





/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// FUNCTION ITEM DESIGN REMOVE.....................................
	$('button.stckdesignremove').on('click', function(idx){
		var de_code = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b>REMOVE DESIGN:</b></span>',
		message:'This data will automatically be remove from the list. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	$.post('template/Empuniforms/uni_ajaxpage.php',{
		              		'remove_itemdesign':de_code
		              	},function(data){
	         				dialog.close();
	         				$('tr.design'+de_code).fadeOut();
	              		});
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 7%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 7%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7%', 'height':'auto'});
	});






/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// ADD NEW ITEM TO INVENTORY ==============================
    $('.addnewitem').on('click', function(){
    	var itmcode = [];
		$('button.reqadded').each(function(idx){
			var btnvalue = $(this).attr('name');
			itmcode.push(btnvalue);
		});

		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/endorse.png" width="18"> <b>SETUP ITEM SIZE:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?newitemform='+itmcode
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {

		              	var item_value 			= [];
						var itemtype 			= document.getElementsByClassName('itemtype');
						var itemdesign 			= document.getElementsByClassName('itemdesign');
						var itemuitcost 		= document.getElementsByClassName('itemuitcost');
						var itemsellingprice 	= document.getElementsByClassName('itemsellingprice');
						var itemsize 			= document.getElementsByClassName('itemsize');
						var itemqty 			= document.getElementsByClassName('itemqty');
						var trig 				= 0;

		              	$('input.itemcode').each(function(idx){
	              			var itemtype_val 			= itemtype[idx].value;
	              			var itemdesign_val 			= itemdesign[idx].value;
	              			var itemuitcost_val 		= itemuitcost[idx].value;
	              			var itemsellingprice_val 	= itemsellingprice[idx].value;
	              			var itemsize_val 			= itemsize[idx].value;
	              			var itemqty_val 			= itemqty[idx].value;
		              		if($(this).val().replace(/\s/g, '') != ''){

		              			if(itemtype_val.replace(/\s/g, '') == ''){
		              				itemtype[idx].style.border = "1px solid red";trig = 1;
		              			}else if(itemdesign_val.replace(/\s/g, '') == ''){
		              				itemdesign[idx].style.border = "1px solid red";trig = 1;
		              			}else if(itemuitcost_val.replace(/\s/g, '') == ''){
		              				itemuitcost[idx].style.border = "1px solid red";trig = 1;
		              			}else if(itemsellingprice_val.replace(/\s/g, '') == ''){
		              				itemsellingprice[idx].style.border = "1px solid red";trig = 1;
		              			}else if(itemsize_val.replace(/\s/g, '') ==''){
		              				itemsize[idx].style.border = "1px solid red";trig = 1;
		              			}else{
									itemtype[idx].style.border = "1px solid #cccccc";
									itemdesign[idx].style.border = "1px solid #cccccc";
									itemuitcost[idx].style.border = "1px solid #cccccc";
									itemsellingprice[idx].style.border = "1px solid #cccccc";
									itemsize[idx].style.border = "1px solid #cccccc";
									var row_input = [$(this).val(),itemtype_val.split('-')[0],itemdesign_val,itemuitcost_val,itemsize_val,itemqty_val,itemsellingprice_val];
									item_value.push(row_input);
		              			}

		              		}
		              	});

		              	if(trig == 0){
		              		var con = confirm("Data will automatically add to the uniform's inventory. Do you want to procceed? click 'OK'.");
							if(con == true){
								$.post('template/Empuniforms/uni_ajaxpage.php',
								{'additem_inventory':'', 'item_value':item_value},
								function(data){
									window.location.reload();
									dialog.close();
								// $('div.itemform').html(item_value);
								});
							}
		              	}

	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'0.7% 3%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.5% 3%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 3%', 'height':'450px'});
		$('this.modal')[0].remove();
    });





/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/* HR STOCK TRANSFER FORM ===================================================== */
	$('.stsform').off('click').on('click', function(){
		var itemcode = [];
		$('.imgITEM').each(function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length == 0){
			alert("Process can't be completed. Please select an item from the table.");
		}else{
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>REQUEST FOR TRANSFER:</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?stsform='+itemcode},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {

							var emp_searchHR = $('input#emp_searchHR').attr('name');
							var fadstsno = $('input#fadstsno').val();
							var transferBU = $('select#transferBU').val();
							var ststransactDATE = $('input#ststransactDATE').val();
							var item_DETAILS = [];
							$('input.stsqty').each(function(){
								if($(this).val().replace(/\s/g, '') != ''){
									var itemDET = $(this).attr('name').split('|');
									item_DETAILS.push([itemDET[0], itemDET[1], itemDET[2], $(this).val()]);
								}
							});

							if(emp_searchHR.replace(/\s/g, '') == ''
							|| fadstsno.replace(/\s/g, '') == ''
							|| transferBU.replace(/\s/g, '') == ''
							|| ststransactDATE.replace(/\s/g, '') == ''
							|| item_DETAILS.length == 0 ){
								alert("Process can't be completed. Please provide check you stock tranfer form.");
							}else{
								var con = confirm("Do you want to transfer this uniform items? Click 'OK' to proceed.");
								if(con == true){
									$.post('template/Empuniforms/uni_ajaxpage.php', {'save_stocktransfer':'', 'attention':emp_searchHR,
									'fadstsno':fadstsno,
									'transferBU':transferBU,
									'ststransactDATE':ststransactDATE,
									'item_DETAILS':item_DETAILS}, function(data){
										 dialog.close();
										 window.location.reload();
										 // $('div.deductiontable').html(data);
									});
								}
							}
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'485px'});
		}

	});



/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/* check item =============================================== */
	$('.imgITEM').on('click', function(){
		var img = $(this).attr('src').split('/')[3];
		if(img === 'uncck.png'){
			$(this).attr('src', '../assets/icon_index/cck.png');
		}else{
			$(this).attr('src', '../assets/icon_index/uncck.png');
		}
	});
/* ========================================================= */

/* FOR EMPLOYEE PAYMENT TYPE ====================================================================== */
	$('.imgEMPtype').on('click', function(){
		$('.imgEMPtype').attr('src', '../assets/icon_index/uncck.png');
		$('img[id='+$(this).attr('id')+']').attr('src', '../assets/icon_index/cck.png');
	}).css({'cursor':'pointer'});
/* ================================================================================================ */


/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// UPDATE ITEM ================================================
	$('button.stckupdate').on('click', function(idx){
		var itemcode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>UPDATE ITEM</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?updateform='+itemcode
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {

		            /*var itemcode_orig 	= $('input.itemcode').attr('id');
	              	var itemcode 		= $('input.itemcode').val();
	              	var itemtype 		= $('select.itemtype').val();
	              	var itemdesign 		= $('select.itemdesign').val();
	              	var unitcost 		= $('input.unitcost').val();
	              	var fadcost 		= $('input.fadcost').val();
	              	var unitqty 		= $('input.unitqty').val();
		            var itemdetail 		= null;
		            var trig 			= 0;*/

		            var itemcode_orig 	= $('input.itemcode').attr('id');
	              	var itemcode 		= $('input.itemcode').val();
	              	var itemtype 		= $('input.itemtype').attr('id');
	              	var itemdesign 		= $('input.itemdesign').attr('id');
	              	var unitcost 		= $('input.unitcost').val();
	              	var fadcost 		= $('input.fadcost').val();
	              	var unitqty 		= $('input.unitqty').val();
		            var itemdetail 		= null;
		            var trig 			= 0;

		            	/*if(itemcode.replace(/\s/g, '')==''){
	            		$('input.itemcode').css({'border':'1px solid red'});
	            		trig = 1;
		            	}else if(itemtype.replace(/\s/g, '')==''){
	            		$('select.itemtype').css({'border':'1px solid red'});
	            		trig = 1;
		            	}else if(itemdesign.replace(/\s/g, '')==''){
	            		$('select.itemdesign').css({'border':'1px solid red'});
	            		trig = 1;
		            	}else if(unitcost.replace(/\s/g, '')==''){
	            		$('input.unitcost').css({'border':'1px solid red'});
	            		trig = 1;
	            		}else if(fadcost.replace(/\s/g, '')==''){
	            		$('input.fadcost').css({'border':'1px solid red'});
	            		trig = 1;
		            	}else if(unitqty.replace(/\s/g, '')==''){
	            		$('input.unitqty').css({'border':'1px solid red'});
	            		trig = 1;
		            	}else{
							$('input.itemcode').css({'border':'1px solid #cccccc'});
							$('select.itemtype').css({'border':'1px solid #cccccc'});
							$('select.itemdesign').css({'border':'1px solid #cccccc'});
							$('input.unitcost').css({'border':'1px solid #cccccc'});
							$('input.fadcost').css({'border':'1px solid #cccccc'});
							$('input.unitqty').css({'border':'1px solid #cccccc'});
		            		itemdetail = [itemcode, itemtype.split('-')[0], itemdesign, unitcost, unitqty, fadcost];
		            	}*/

		            	if(unitcost.replace(/\s/g, '')==''){
	            			$('input.unitcost').css({
	            				'border':'1px solid red'
	            			});
	            			trig = 1;
		            	}else if(unitqty.replace(/\s/g, '')==''){
	            			$('input.unitqty').css({
	            				'border':'1px solid red'
	            			});
	            			trig = 1;
		            	}
		            	var itemdetail = [itemcode_orig, itemcode, itemtype.split('-')[0],itemdesign, unitcost, fadcost, unitqty];
						/*if(itemdetail.length == 6 && trig != 1){
							var con = confirm('Item Detail will change automatically. Do you want to proceed? click OK if Yes');
							if(con == true){
							$.post('template/Empuniforms/uni_ajaxpage.php',
							{'update_item':itemdetail, 'code':itemcode_orig},
							function(data){
								window.location.reload();
							});
							}
			            }*/
			            if(trig != 1){
							$.post('template/Empuniforms/uni_ajaxpage.php',{
								'itemdetail_': itemdetail
							},
							function(data){
							var splits_ = data.replace(/\s/g, '').split('`');
								if(splits_.length == 2){
									window.location.reload();
									alert("Process connot be completed, this item is already edited please advise your supervisor to approve");
								}else{
									window.location.reload();
									alert('SUCCESSFULLY SAVE!');
								}
							});
		            	}

	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.2% 6%', 'height':'280px'});
		$('this.modal')[0].remove();
	});




/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
/*............................................................................*/
// REMOVE ITEM ============================================================
	$('button.stckremove').on('click', function(idx){
		var itemcode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> REMOVE ITEM:</b></span>',
		message:'This Item will automatically be remove from the list. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	$.post('template/EMpuniforms/uni_ajaxpage.php',
		              		{'remove_item':itemcode},
		              		function(data){
		         				dialog.close();
		         				$('tr.stck'+itemcode).fadeOut();
		              		});
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});



	/* ................................................................................. */
	/* ......................  GET STOCK TRANSFER DETAILS .............................. */
	/* ................................................................................. */
	$('.STS-detail').on('click', function(){
		var sts_code = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>STOCK TRANSFER DETAILS:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?stsdetails='+sts_code
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: '<i class="fa fa-print fa-fw"></i> PDF Copy',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
						 window.open('template/Empuniforms/uni_PDF-reports.php?uni_report=sts_ledger&sts='+sts_code, '_blank');
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'480px'});
		$('this.modal')[0].remove();
	});






	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* GET STOCK TRANSFER DETAILS ........................................ */
	$('.SRRHR-detail').on('click', function(){
		var sts_code = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>STOCK RECEIVED (HR) DETAILS:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?srrHR_details='+sts_code
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: '<i class="fa fa-print fa-fw"></i> PDF Copy',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
						 window.open('template/Empuniforms/uni_PDF-reports.php?uni_report=srrHR_ledger&sts='+sts_code, '_blank');
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'460px'});
		$('this.modal')[0].remove();
	});






	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	// REMOVE ITEM ============================================================
		$('button.STS-cancel').on('click', function(idx){
			var stscode = $(this).attr('id');
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> CANCEL TRASACTION:</b></span>',
			message:'This Item will automatically be remove from the list. Do you want to procceed?',
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              	$.post('template/EMpuniforms/uni_ajaxpage.php',
			              		{'remove_sts':stscode},
			              		function(data){
			         				dialog.close();
			         				$('tr.'+stscode).fadeOut();
			              		});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
		});




	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* GET STOCK RECEIVE DETAILS ........................................ */
	$('.SRR-detail').on('click', function(){
		var srr_code = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>STOCK RECEIVE DETAILS:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?srrdetails='+srr_code},
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
		dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'460px'});
	});






	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* RECEIVE STOCK DETAILS .............................................. */
	$('.SRR-receive').on('click', function(){
		var sts_code = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> RECEIVE ITEM:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?sts_receive='+sts_code},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Received',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	var srrcode = $('.srr-code').val();
		              	if(srrcode.replace(/\s/g, '') != ''){
		              		$.post('template/Empuniforms/uni_ajaxpage.php', {'save_srrreceive':sts_code, 'srrcode':srrcode}, function(data){
		                  		window.location.reload();
		                  		dialog.close();
		                  		// $('.content-div').html(data);
		              		});
		              	}else{
		              		alert("Process can't be completed. Please provide a stock receiving report code.");
		              	}
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 5.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 5.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 5.5%', 'height':'200px'});
	});





	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	/*............................................................................*/
	// REMOVE ITEM ============================================================
	$('button.SRR-decline').on('click', function(idx){
		var stscode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="fa fa fa-times fa-fw fa-fw"></i> <b> DECLINE TRASACTION:</b></span>',
		message:'This transaction will automatically be canceled. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Decline',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	$.post('template/EMpuniforms/uni_ajaxpage.php',
		              		{'decline_sts':stscode},
		              		function(data){
		         				window.location.reload();
		              		});
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});






	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	//OTHER DETAILS - EMPLOYEE'S REQUEST (HR ACCESS) ................
	$('.empreqdetails_other').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> REQUISITION DETAILS:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'../employee/template/Empuniforms/uni_ajaxpagefix.php?uni_reqdetails='+reqcode},
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
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'350px'});
	});





	/* ...................................................................................... */
	/* ...................................................................................... */
	/* ...................................................................................... */
	/* ...................................................................................... */
	/* ...................................................................................... */
	// REQUEST (ITEM DETAILS - HR ACCESS ) ...............................
	$('.empreqdetail_item').off('click').on('click', function(idx){

		var accesspath = window.location.pathname.split('/')[2];
		var hidebtn = 'hide';
		var trigset = 'Empset';
		var labelexec = 'Proceed';
		var btnhide = '';
		var reqcode = $(this).attr('id').split('|')[0];
		// var reqemp = $(this).attr('id').split('|')[1];
		if(accesspath == 'hr'){
			hidebtn = null;
			trigset = 'HR_release';
			labelexec = 'Release';
		}
		if($(this).attr('for') != 'PENDING'){
			btnhide = 'hide';
		}

		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> ITEM REQUESTED:</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {
				'pageToLoad':'../employee/template/Empuniforms/uni_ajaxpagefix.php?uni_reqitem='+reqcode+'&hrview'
			},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          },{
			              label: 'Replace Item',
			              cssClass: hidebtn+' btn-default btn-fill btn-sm '+btnhide,
			              action: function(dialog) {
			                dialog.close();
			                changeITEM(reqcode);
			              }
			          },{
			              	label: labelexec,
			              	cssClass: 'btn-default btn-success btn-sm '+btnhide,
			              	action: function(dialog) {
			                	var itm_val = [];
			                  	var rowC = 0;
			                  	$('input.uniqty').each(function(idx){
			                  		var itm_qty = $(this).val();
				                  	if((itm_qty.replace(/\s/g, '') != '') && (itm_qty.replace(/\s/g, '') !='0')){
					               		var id_row  = $(this).attr('id').split('qty')[1];
					                	var id_descode  = $(this).attr('name');
					                	itm_val.push([id_row, id_descode, $(this).val()]);
				                  	}else{
				                  		rowC = 1;
				                  	}
			                  	});

			                  	if(rowC == 0){
			                  		if(trigset == 'HR_release'){
			                  			var con_updt = confirm("Are you sure you want to release this uniform request?\n\n Click 'OK' to proceed.");
			                  		}else{
			                  			var con_updt = confirm("Are you sure you want to alter this uniform request?\n\n Click 'OK' to proceed.");
			                  		}
				                  	if(con_updt == true){
					                  	 $.post('../employee/template/Empuniforms/uni_ajaxpagefix.php',{
					                  	  'updt_itemreq':reqcode,
						                  'itm_det':itm_val,
						              	  'execpersonnel':trigset
						              	},
						                  function(data){
				                 			dialog.close();
						                  	window.location.reload();
						                  });
				                  	}
			                  	}else{
			                  		alert('Please provide Item quantity');
			                  }
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5.4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'420px'});
	});







	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	// FUNCTION GET DETAILS OF UNCLOSED REQUISITION .................
	$('.empreqprev_item').on('click', function(){
		var emp_ID = $(this).attr('id');
		var current_req = $(this).attr('for');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <i class="fa fa-question-circle fa-fw"></i> UNCLOSED ACCOUNT</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?prev_uncloserequisition='+emp_ID+'&current_req='+current_req},
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
		dialog.getModalHeader().css({'padding':'1.3% 5.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.3% 5.5%', 'background-color':'#dff0d8'});
		dialog.getModalBody().css({'padding':'1.3% 5.5%', 'height':'350px'});
	});






	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	/* ........................................................................... */
	//OTHER DETAILS - EMPLOYEE'S REQUEST (HR ACCESS) ................
	$('.hr_newuniformreq').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> REQUISITION FORM:</span></b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {
				'pageToLoad':'../employee/template/Empuniforms/uni_ajaxpagefix.php?HRnew_requisition'
			},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			              	 dialog.close();
			              }
			          },{
			              label: 'Proceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			                var	emp = $('.search_empname').attr('name');
							var incost = document.getElementsByClassName('incost');
							var uniqty = document.getElementsByClassName('uniqty');
							var uniamt = document.getElementsByClassName('uniamt');
							var new_array = [];

							$('select.sizeUNI_').each(function(idx){
								var fl_incost = incost[idx].value;
								var fl_uniqty = uniqty[idx].value;
								var fl_uniamt = uniamt[idx].value;

								$('.imgEMPtype').each(function(){
						      		var imgsrc = $(this).attr('src').split('/')[3];
						      		if(imgsrc == 'cck.png'){   
						      			imgEMPtype = $(this).attr('id'); 
							      	}
						      	});

								if((fl_uniqty.replace(/\s/, '')!='') && (fl_uniqty.replace(/\s/, '')!=0)){
									var row_values = [$(this).val(), fl_incost, fl_uniqty, fl_uniamt, imgEMPtype];
									new_array.push(row_values);
								}
							});

							if(new_array.length !=0 && emp != '' && emp != undefined){
								var dialog = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> IFORMATION:</b></span>',
								message:'This Item will automatically tag as released request. Do you want to procceed?',
								draggable: true,
								closable: false,
								    buttons: [{
								              label: 'Cancel',
								              cssClass: 'btn-default btn-fill btn-sm',
								              action: function(dialog) {
								                  dialog.close();
								              }
								          }, {
								              label: 'Procceed',
								              cssClass: 'btn-success btn-fill btn-sm',
								              action: function(dialog) {
						         				dialog.close();
						         				$.post('../employee/template/Empuniforms/uni_ajaxpagefix.php', {
						         					'new_emprequist':new_array,
						         					'emp_HR':emp
						         				},
												function(data){
													window.location.reload();
													// console.log(data);
												});
							              	}
								          }]
								});
								dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
								dialog.getModalContent().css('border-radius', '2px');
								dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
								dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});

							}else{

								var dialog = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b></span>',
								message:"Please select uniform's type and number of item to be requested or employee name is empty!",
								draggable: true,
								closable: false,
								    buttons: [{
								              label: 'Okay',
								              cssClass: 'btn-default btn-fill btn-sm',
								              action: function(dialog) {
								                  dialog.close();
								              }
								          }]
								});
								dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
								dialog.getModalContent().css('border-radius', '2px');
								dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
								dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
							}

			              }
			          }]			          
			});
			dialog.getModalHeader().css({'padding':'0.8% 3.5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'0.8% 3.5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'0.5% 3.5%', 'height':'550px'});
			$('this.modal')[0].remove();
	});




	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* DEDUCTION MONITORING ................................... */
	$('.btn-deduction').on('click', function(){
		var serialCODE = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> DEDUCTION MONITORING</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?deductionmonitoring='+serialCODE
		},
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
		dialog.getModalHeader().css({'padding':'0.7% 3%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.7% 3%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.5% 3%', 'height':'720px'});
		$('this.modal')[0].remove();
	});








	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* DEDUCTION TRANSFER DETAILS .......................... */
	$('.btntrnsCHGdetails').on('click', function(){
		var serialCODE 	= $(this).attr('id');
		var reqSTATUS 	= $(this).attr('for');
		var hidebtn		= null;
		if(reqSTATUS == 'DONE'){
			hidebtn = 'hide';
		}

		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> DETAILS - TRANSFER DEDUCTION CHARGE</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?transferdeductionDETAILS='+serialCODE},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Edit Details',
		              cssClass: hidebtn+' btn-warning btn-fill btn-sm btntrnscharge',
		              action: function(dialog) {
		                  btntrnscharge(serialCODE);
		              }
		          },{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.3% 6%', 'height':'475px'});
	});








	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* Incash Payment ................................................. */
	$('.btn-cashpayment').on('click', function(){
		var serialCODE = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> CASH BASIS PAYMENT</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?incashpaymentform='+serialCODE
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm btntrnscharge',
		              action: function(dialog) {
		              	var INCSHrefnum 	= $('.INCSHrefnum').val().replace(/\s/g, '');
		              	var INCSHamtpaid 	= $('.INCSHamtpaid').val().replace(/\s/g, '');

		              	if(INCSHrefnum != '' && INCSHamtpaid != ''){
		              		var con = confirm("This action will affect the amortization data  for this account. Do you wish to continue?");
		              		if(con == true){
								$.post('template/Empuniforms/uni_ajaxpage.php',{
									'saveINCASHpayment':serialCODE, 
									'INCSHrefnum':INCSHrefnum, 
									'INCSHamtpaid':INCSHamtpaid
								}, function(data){
									dialog.close(data);
									window.location.reload();
								});
		              		}
		              	}else{
		              		alert("Please provide the information needed for this transaction.");
		              	}
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.3% 6%', 'height':'350px'});
		$('this.modal')[0].remove();
	});







	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* SETUP REQUISITIION REPORT ..................... */
	$('.hr_reportRequisition').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_requisitionsetup'},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var imgEMPtype = null;
		                  $('.imgEMPtype').each(function(){
		                  		var imgsrc = $(this).attr('src').split('/')[3];
		                  		if(imgsrc == 'cck.png'){   
		                  			imgEMPtype = $(this).attr('id'); 
		                  		}
		                  });
		                  var type_rep = $('.type_rep').val();
		                  var strDATE_rep = $('#strDATE_rep').val();
		                  var endDATE_rep = $('#endDATE_rep').val();
		                  var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+type_rep+'|'+imgEMPtype);
		                  window.location.href= '?id=uni_requisitions&requisition='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'350px'});
		$('this.modal')[0].remove();
	});



	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* SETUP REQUISITIION REPORT ..................... */
	$('.hr_reportDeductions').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_deductionsetup'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var imgEMPtype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){
	                  			imgEMPtype = $(this).attr('id');
	                  		}
		                  });

		                  var type_rep = $('.type_rep').val();
		                  var deductiondate = $('#strDATE_rep').val();
		                  var report_set = Base64.encode(deductiondate+'|'+type_rep+'|'+imgEMPtype);
		                  window.location.href= '?id=uni_deductionreport&deduction_view='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'290px'});
		$('this.modal')[0].remove();
	});




	/* .................................................................................. */
	/* .................................................................................. */
	/* .................................................................................. */
	/* .................................................................................. */
	// HR REPORT SUPPLY SETUP FORM ....................
	$('.hr_reportSupplytmz').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> REPORT DETAILS SETUPsdsd</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_supplysetuptmz'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var reporttype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){ 
	                  			reporttype = $(this).attr('id'); 
	                  		}
		                  });

		                  var strDATE_rep = $('#strDATE_rep').val();
		                  var endDATE_rep = $('#endDATE_rep').val();
		                  var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+reporttype);
		                  window.location.href= '?id=uni_supplyreport&supply='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'260px'});
		$('this.modal')[0].remove();
	});





	/* .................................................................................. */
	/* .................................................................................. */
	/* .................................................................................. */
	/* .................................................................................. */
	//  ACCUMULATED REPORT SETUP FORM ==========================================================
	$('.hr_reportSupply').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_supplysetup'},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  	dialog.close();
		                  	var figuretype 	= null;
							var reportfreq 	= null;
							var reporttype 	= null;
							var reportenti 	= null;
							var strDATE_rep = $('input#strDATE_rep').val();
							var endDATE_rep = $('input#endDATE_rep').val();
							$('.imgrepType').each(function(){
								var imgsrc 	= $(this).attr('src').split('/')[3];
								if(imgsrc 	== 'cck.png'){ figuretype = $(this).attr('id'); }
							});
							$('.imgEMPfreq').each(function(){
								var imgsrc 	= $(this).attr('src').split('/')[3];
								if(imgsrc 	== 'cck.png'){ reportfreq = $(this).attr('id'); }
							});
							$('.imgEMPtype').each(function(){
								var imgsrc 	= $(this).attr('src').split('/')[3];
								if(imgsrc 	== 'cck.png'){ reporttype = $(this).attr('id'); }
							});
							$('.imgEMPentity').each(function(){
								var imgsrc 	= $(this).attr('src').split('/')[3];
								if(imgsrc 	== 'cck.png'){ reportenti = $(this).attr('id'); }
							});
							if(reportfreq != null
							&& figuretype != null
							&& reporttype != null
							&& reportenti != null
							&& strDATE_rep != ''
							&& endDATE_rep != ''){
							var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+reportfreq+'|'+reporttype+'|'+reportenti+'|'+figuretype);
							window.location.href= '?id=uni_reportconslt&format='+report_set;
							}


		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'375px'});
	});





	/* ................................................................. */
	/* ................................................................. */
	/* ................................................................. */
	/* ................................................................. */
	/* ...................manual deduction for nesco employee ...............*/
	$('.hr_deductionManual').on('click', function(){
		var amt_code = [];
		$('.imgAUD_').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'cck.png'){
				amt_code.push([$(this).attr('for'), $(this).attr('alt'),$(this).attr('id'), $('input[for=amt'+$(this).attr('alt')+']').val()])
			}
		});
		if(amt_code.length > 0){
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"> <b> MANUAL DEDUCTION:</b></span>',
			message:"You are about to set a deduction for those employee you've selected. Do you want to procceed?",
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Proceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              	$.post('template/Empuniforms/uni_nescodeduction.php',{
			              		'nesco_manualdeduction':amt_code
			              	},

			              		function(data){
			              		dialog.close();
			              		var img_loader = '<img src="../assets/icon_index/progress-bar-opt.gif" width="150"><br />';
								img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">UPDATING INVENTORY</b>';
								var loader = new BootstrapDialog.show({
								size: BootstrapDialog.SIZE_SMALL,
								type: BootstrapDialog.TYPE_DEFAULT,
								message:img_loader,
								draggable: true,
								closable: false
								});
								loader.getModalHeader().remove();
								loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
								loader.getModalFooter().remove();
								loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#f9f9f9', 'height':'190px'});
								setInterval(window.location.reload(), 2000);

			              		});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
		}else{
			alert('Please Select any available employee from the table.');
		}
	});






	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* ........................................................ */
	/* CSV_CONTENT RECEVING ............................ */
	$('.receive_view').on('click', function(){
		var fileContet = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> TEXT FILE CONTENT</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?txt_contentview='+fileContet
		},
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
		dialog.getModalHeader().css({'padding':'0.7% 3%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.7% 3%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.5% 3%', 'height':'500px'});
		$('this.modal')[0].remove();
	});






	/* ............................................................................. */
	/* ............................................................................. */
	/* ............................................................................. */
	/* ............................................................................. */
	// RUN/UPLOAD TEXTFILE ...................................................
	$('.srrtransact').off('click').on('click', function(){
		var filetxt = [];
		$('.imgITEM').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			var imgIDVAL = $(this).attr('id');
			if(img_ == 'cck.png'){
				filetxt.push(imgIDVAL);
			}
		});
		if(filetxt.length > 0){
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> PROCESS TEXTFILE - STOCK RECEIVING</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {
				'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?receive_updatestock='+filetxt
			},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          },{
			              label: 'Proceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			                  	var fadsrrno = $('.fadsrr').val();
			           			var txtfile = [];
				                $('.rem_removefile').each(function(){
				                 	txtfile.push($(this).attr('for'));
				                });
			           			if(fadsrrno.replace(/\s/g, '') != '' && txtfile.length > 0){
					               	dialog.close();
									var img_loader = '<img src="../assets/icon_index/progress-bar-opt.gif" width="150"><br />';
									img_loader += '<b style="font-size:16px;color:#6c5f5f;padding:10px;">UPDATING INVENTORY</b>';
									var loader = new BootstrapDialog.show({
										size: BootstrapDialog.SIZE_SMALL,
										type: BootstrapDialog.TYPE_DEFAULT,
										message:img_loader,
										draggable: true,
										closable: false
									});
									loader.getModalHeader().remove();
									loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
									loader.getModalFooter().remove();
									loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#f9f9f9', 'height':'190px'});
					               	$.post('template/Empuniforms/uni_ajaxpage.php', {
					               		'exec_process_receiving':'',
					               		'fad_srr':fadsrrno,
					               		'txt_files':txtfile
					               	},
					               	function(data){
											setInterval(function(){
				                  				window.location.reload();
				                  				$('#content-div').html(data);
											}, 4000);
					               	});
			           			}else{
			           				alert("Process can't be completed. Please Select a text file from the list");
			           			}
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'0.7% 4%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'0.7% 4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'0.5% 4%', 'height':'400px'});
		}else{
			alert("Please select any available file from the list.");
		}
		$('this.modal')[0].remove();
	});








	/* ............................................................................. */
	/* ............................................................................. */
	/* ............................................................................. */
	/* .............................................................................*/
	/* GET SRR DETAILS/LEDGER ................................ */
	$('.srrdetails').on('click', function(){
		var datalist = $(this).attr('id');
		var srr_code = $(this).attr('for');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> STOCK RECEIVED DETAILS</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?srr_ledger='+datalist+'&srrcode='+srr_code},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: '<i class="fa fa-print fa-fw"></i> PDF Copy',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  // dialog.close();
		              window.open('template/Empuniforms/uni_PDF-reports.php?uni_report=srr_ledger&srr='+datalist, '_blank');
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'0.7% 4%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.7% 4%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.5% 4%', 'height':'470px'});
	});
	/* ==================================================================================== */




	/* ==================================================================================== */
	/* ==================================================================================== */
	/* MANAUL DEDUCTION SELECT DATE ======================================================= */

	$('.manualdeductiondate').on('click', function(){
		var iddate 	= Base64.decode($(this).attr('id')).split('|');
		var emptype = $(this).attr('for');

		var lnkdiv 	= '<div class="col-md-12 pdd_1">';
		lnkdiv 		+= "<span class='fnt13'>Select Deduction date for uniform's manual deduction module</span>";
		lnkdiv 		+= '<div class="col-md-12 pdd_1"></div>';
		lnkdiv 		+= '</div>';
		lnkdiv		+= '<div class="col-md-12 pdd">';
		lnkdiv 		+= '<div class="col-md-6 pdd">';
		lnkdiv 		+= '<span class="fnt13" style="line-height:28px"> Deduction Date :</span>';
		lnkdiv 		+= '</div>';
		lnkdiv 		+= '<div class="col-md-6 pdd input-group date form_date" data-date-format="dd MM yyyy" data-link-field="dtp_input" data-link-format="yyyy-mm-dd">';
		lnkdiv 		+= '<span class="input-group-addon btn"><i class="fa fa-calendar fa-fw"></i></span>';
		lnkdiv 		+= '<select class="form-control input-sm nescodatslct">';
			for (var i = iddate.length - 1; i >= 0; i--) {
				if(iddate[i].replace(/\s/, '')!= ''){
					lnkdiv += '<option>'+iddate[i]+'</option>';
				}
			}
		lnkdiv 		+= '</select>';
		lnkdiv 		+= '</div>';
		lnkdiv 		+= '</div>';


		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> MANUAL DEDUCTION</b></span>',
		message: lnkdiv,
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	if(emptype == 'NESCO'){
		              		window.open('?id=uni_nescodeuduction&nescodate='+Base64.encode($('select.nescodatslct').val()), '_self');
		              	}else{
		              		window.open('?id=uni_aedeuduction&nescodate='+Base64.encode($('select.nescodatslct').val()), '_self');
		              	}
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.5% 8%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.5% 8%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.3% 8%', 'height':'80'});
		$('this.modal')[0].remove();
	});



	/* ........................................................... */
	/* ........................................................... */
	/* ........................................................... */
	/* ........................................................... */
	/* SAVE AS AUDITED DEDUCTIONS .................*/
	$('.unauditPDF').on('click', function(){
		var idtrg 			= $(this).attr('id');
		var audit_list 		= [];
		var audit_listPDF 	= '';
		$('.imgAUD_').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'cck.png'){
				audit_list.push($(this).attr('id'));
				audit_listPDF += $(this).attr('id')+'#';
			}
		});
		if(audit_list.length < 1){
			alert("Proccess can't be completed, Please select any person available on the list below.");
		}else{

			if(idtrg === 'ALLEMP'){
				var _typeDATA 	= '<div class="col-md-12 pdd">';
				_typeDATA 	+= '<span class="col-md-12 pdd_1">Select Presentation type: </span>';
				_typeDATA 	+= '<select class="form-control input-sm pdfTYPE">';
				_typeDATA 	+= '<option value="DEDSUMMARY">Deduction Summary</option>';
				_typeDATA 	+= '<option value="DEDSLIP">Deduction Slip</option>';
				_typeDATA 	+= '</select>';
				_typeDATA 	+= '</div">';

				var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> GENERATE PDF COPY</sapn></b>',
				message: _typeDATA+ "<br /><label style='color:#009900'>NOTE:</label><br /><span class='fnt13'>The list of employee you've select were unaudited data and necessarily be forwarded to internal audit department for pre-auditing.</span>",
				draggable: true,
				closable: false,
				    buttons: [{
				              label: 'Cancel',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }, {
				              label: 'Procceed',
				              cssClass: 'btn-success btn-fill btn-sm',
				              action: function(dialog) {
				              	dialog.close();
								window.open('template/Empuniforms/uni_PDF-reports.php?reportunaudited='+Base64.encode(audit_listPDF)+'&format='+$('.pdfTYPE').val(), '_blank');
			              	}
				          }]
				});
				dialog.getModalHeader().css({'padding':'3% 7%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'3% 7%', 'background-color':'#fcf8e3'});
				dialog.getModalBody().css({'padding':'3% 7%', 'height':'190px'});

			}else{

				var _typeDATA 	= '<div class="col-md-12 pdd">';
					_typeDATA 	+= '<span class="col-md-12 pdd_1">Select Presentation type: </span>';
					_typeDATA 	+= '<select class="form-control input-sm pdfTYPE">';
					_typeDATA 	+= '<option value="DEDSLIP">Deduction Slip</option>';
					_typeDATA 	+= '<option value="DEDSUMMARY">Deduction Summary</option>';
					_typeDATA 	+= '</select>';
					_typeDATA 	+= '</div">';

				var dialog = new BootstrapDialog.show({
					size: BootstrapDialog.SIZE_SMALL,
					type: BootstrapDialog.TYPE_DEFAULT,
					title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> GENERATE PDF COPY</sapn></b>',
					message: _typeDATA+ "<br /><label style='color:#009900'>WARNING:</label><br /><span class='fnt13'>The list of employee you've select will be set for deduction and can no longer be viewed as unaudited pertaining to this deduction date. Do you want to continue?</span>",
					draggable: true,
					closable: false,
					    buttons: [{
					              label: 'Cancel',
					              cssClass: 'btn-default btn-fill btn-sm',
					              action: function(dialog) {
					                  dialog.close();
					              }
					          }, {
					              label: 'Procceed',
					              cssClass: 'btn-success btn-fill btn-sm',
					              action: function(dialog) {
									$.post('../iad/template/uniforms/uni_iad_ajaxpage.php', {
										'set_deductions':audit_list
									},
									function(data){
										dialog.close();
										window.location.reload();
									});
									window.open('template/Empuniforms/uni_PDF-reports.php?reportunaudited='+Base64.encode(audit_listPDF)+'&format='+$('.pdfTYPE').val(), '_blank');
				              	}
					          }]
					});
					dialog.getModalHeader().css({'padding':'3% 7%', 'border-radius':'1px'});
					dialog.getModalContent().css('border-radius', '2px');
					dialog.getModalFooter().css({'padding':'3% 7%', 'background-color':'#fcf8e3'});
					dialog.getModalBody().css({'padding':'3% 7%', 'height':'190px'});
					$('this.modal')[0].remove();
			}
		}
	});












	/* ==================================================================================== */
	/* ==================================================================================== */
	/* ==================================================================================== */
	/* ==================================================================================== */
	/* ==================================================================================== */
	/* FUNCTION GET CSV FOR TRANSFERED ITEM ==================================== */
	// $('.STS-csv').html(){
	// 	var datalist = $(this).attr('id');
	// 	var srr_code = $(this).attr('for');
	// 	var dialog = new BootstrapDialog.show({
	// 	size: BootstrapDialog.SIZE_WIDE,
	// 	type: BootstrapDialog.TYPE_DEFAULT,
	// 	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> STOCK RECEIVED DETAILS</b></span>',
	// 	message: function(dialog) {
	// 		var content = $('<div></div>');
	// 		var page = dialog.getData('pageToLoad');
	// 		content.load(page);
	// 		return content;
	// 	},
	// 	data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?srr_ledger='+datalist+'&srrcode='+srr_code},
	// 	draggable: true,
	// 	closable: false,
	// 	    buttons: [{
	// 	              label: 'Close',
	// 	              cssClass: 'btn-default btn-fill btn-sm',
	// 	              action: function(dialog) {
	// 	                  dialog.close();
	// 	              }
	// 	          },{
	// 	              label: '<i class="fa fa-print fa-fw"></i> PDF Copy',
	// 	              cssClass: 'btn-success btn-fill btn-sm',
	// 	              action: function(dialog) {
	// 	                  // dialog.close();
	// 	              window.open('template/Empuniforms/uni_PDF-reports.php?uni_report=srr_ledger&srr='+datalist, '_blank');
	// 	              }
	// 	          }]
	// 	});
	// 	dialog.getModalHeader().css({'padding':'0.7% 4%', 'border-radius':'1px'});
	// 	dialog.getModalContent().css('border-radius', '2px');
	// 	dialog.getModalFooter().css({'padding':'0.7% 4%', 'background-color':'#fcf8e3'});
	// 	dialog.getModalBody().css({'padding':'0.5% 4%', 'height':'470px'});
	// }




	/* ========================================================*/
	/* ========================================================*/
	/* ========================================================*/
	/* ========================================================*/








	/* EMPLOYEE JS FUNCTIONS =============================================*/

	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* ................................................................................. */
	/* SELECT UNIFORM .............................................. */
	$('.slctdesign').css({'cursor':'pointer'});
	$('.slctdesign').on('click', function(){
		var dsGcode = $(this).attr('id');
		var ttprice = 0;
		var img_ = $('img.uni'+dsGcode).attr('src').split('/')[3];
		if(img_ === 'uncck.png'){
			$('img.uni'+dsGcode).attr({'src':'../assets/icon_index/cck.png'});
			$.post('template/Empuniforms/uni_ajaxpagefix.php',{
				'uniadd_selected':dsGcode
			},function(data){
				$('tbody.uniselected').append(data);
			});

		}else{
			$('img.uni'+dsGcode).attr({'src':'../assets/icon_index/uncck.png'});
			$('tr#tr'+dsGcode).remove();
		}

		$('input.uniamt').each(function(){
			ttprice = Math.abs(parseFloat($(this).val())+parseFloat(ttprice));
		});
		$('input.totalprice').val(ttprice);

	});





	// $('span.unilabel').on('click', function(){
	// var dscode = $(this).attr('id');
	// var imgsrc = $('img.uni'+dscode).attr('src').split('/')[3].split('.')[0];
	// var ttprice = 0;
	// if(imgsrc == 'uncck'){
	// 	$('img.uni'+dscode).attr({'src':'../assets/icon_index/cck.png'});
	// 	$.post('template/Empuniforms/uni_ajaxpage.php',
	// 	{'uniadd_selected':dscode},
	// 	function(data){
	// 		$('tbody.uniselected').append(data);
	// 	});
	// }else{
	// 	$('img.uni'+dscode).attr({'src':'../assets/icon_index/uncck.png'});
	// 	$('tr#tr'+dscode).remove();
	// }

	// $('input.uniamt').each(function(){
	// 	ttprice = Math.abs(parseFloat($(this).val())+parseFloat(ttprice));
	// });
	// $('input.totalprice').val(ttprice);
	// });





	/* ............................................................................... */
	/* ............................................................................... */
	/* ............................................................................... */
	/* ............................................................................... */
	/* ............................................................................... */
	// SAVE REQUEST .....................................
	$('button.unisubmit').on('click', function(idx){
		var incost = document.getElementsByClassName('incost');
		var uniqty = document.getElementsByClassName('uniqty');
		var uniamt = document.getElementsByClassName('uniamt');
		var new_array = [];

		$('select.sizeUNI_').each(function(idx){
			var fl_incost = incost[idx].value;
			var fl_uniqty = uniqty[idx].value;
			var fl_uniamt = uniamt[idx].value;

			$('.imgEMPtype').each(function(){
          		var imgsrc = $(this).attr('src').split('/')[3];
          		if(imgsrc == 'cck.png'){   
          			imgEMPtype = $(this).attr('id'); 
          		}
          	});
          	
			if((fl_uniqty.replace(/\s/g, '')!='') && (fl_uniqty.replace(/\s/g, '')!=0)){
				var row_values = [$(this).val(), fl_incost, fl_uniqty, fl_uniamt, imgEMPtype];
				new_array.push(row_values);
			}
		});
		if(new_array.length !=0){
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> IFORMATION:</b></span>',
			message:'This Item(s) will automatically be saved from the record list. Do you want to procceed?',
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
	      					$.post('template/Empuniforms/uni_ajaxpagefix.php', {
	      						'saverequest':new_array
	      					},function(data){
								window.location.href = "?id=uni_request-list";
							});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
		}else{
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b</span>',
			message:"Please select uniform's type and the number of item to be requested!",
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Okay',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
		}

	});






	/* .............................................................................................*/
	/* .............................................................................................*/
	/* .............................................................................................*/
	/* .............................................................................................*/
	/* REQUEST DETAILS ....................................................... */
	$('button.requestdetail').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i> <b> REQUISITION DETAILS:</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?uni_reqdetails='+reqcode},
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
			dialog.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5.4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'350px'});
	});






	/* ......................................................................................... */
	/* ......................................................................................... */
	/* ......................................................................................... */
	/* ......................................................................................... */
	/* ......................................................................................... */
	// REQUEST ITEM DETAILS ...............................
	$('button.reqitemdet').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var btnhide = '';
		if($(this).attr('for') != 'PENDING'){
			btnhide = 'hide';
		}

		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-align-left"></i><b> ITEM REQUESTED - <span style="color:#009900;">'+$(this).attr('for')+'</span></b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?uni_reqitem='+reqcode},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          },{
			              label: 'Update',
			              cssClass: 'btn-default btn-success btn-sm '+btnhide,
			              action: function(dialog) {

			                  // var item_det = document.getElementsByClassName('sizeON');
			                  var itm_val = [];
			                  var trig = 0;

			                  $('input.uniqty').each(function(idx){
			                  	var itm_qty = $(this).val();
			                  	if((itm_qty.replace(/\s/g, '') != '') && (itm_qty.replace(/\s/g, '') !='0')){
				                  	var id_row  = $(this).attr('id').split('qty')[1];
				                  	var id_descode  = $(this).attr('name');
				                  	itm_val.push([id_row, id_descode, $(this).val()]);
			                  	}else{
			                  		trig = 1;
			                  	}
			                  });

			                  if(trig == 0){
			                  	var con_updt = confirm("Are you sure you want to alter this request?\n\n Click 'OK' to proceed.");
			                  	if(con_updt == true){
				                  	 $.post('template/Empuniforms/uni_ajaxpage.php',
					                  {'updt_itemreq':reqcode,
					                  'itm_det':itm_val},
					                  function(data){
			                 			dialog.close();
					                  	window.location.reload();
					                  });
			                  	}
			                  }else{
			                  	alert('Please provide Item quantity');
			                  }

			              }
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.5% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5.4%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'405px'});
	});






	/* ............................................................................. */
	/* ............................................................................. */
	/* ............................................................................. */
	/* ............................................................................. */
	// REMOVE UNIFORM REQUEST (EMPLOYEE ACCESS) ............................................
	$('button.uniremove').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</sapn></b>',
			message:'<b>Request Code: '+reqcode+'</b>\n\nThis Item will automatically be removed from the record list. Do you want to procceed?',
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
								$.post('template/Empuniforms/uni_ajaxpagefix.php', {'emp_deleteUNIREQ':reqcode},
								function(data){
									$('tr.req'+reqcode).fadeOut();
								});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});






/*......................................................... */
/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* FUNCTION GET AMORTIZATION SCHEDULE .................*/
$('.btnschedule_emp').on('click', function(){
	var idcode = $(this).attr('id');
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="18"> <b> AMORTIZATION SCHEDULE </b></span>',
	message: function(dialog) {
	var content = $('<div></div>');
	var page = dialog.getData('pageToLoad');
	content.load(page);
	return content;
	},
	data: {'pageToLoad':'../hr/template/Empuniforms/uni_ajaxpage.php?employee_schedule='+idcode},
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
	dialog.getModalFooter().css({'padding':'1% 5.4%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1% 5%', 'height':'370px'});
});




/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* ........................................................ */
/* DEDUCTION MONITORING ................................... */
$('.btndeduction-emp').on('click', function(){
	var serialCODE = $(this).attr('id');
	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_WIDE,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> DEDUCTION MONITORING</b></span>',
	message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {'pageToLoad':'../hr/template/Empuniforms/uni_ajaxpage.php?deductionmonitoring='+serialCODE},
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
	dialog.getModalHeader().css({'padding':'0.7% 3%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'0.7% 3%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'0.5% 3%', 'height':'720px'});
});





	/* ========================================================*/
	/* ========================================================*/
	/* ========================================================*/
	/* ========================================================*/











/* ========================================================================== */
/* IAD ACCESS =============================================================== */
/* ========================================================================== */


/* ............................................................ */
/* ............................................................ */
/* ............................................................ */
/* ............................................................ */
/* GET DEDUCTION DATE PRE-AUDIT ................*/
$('.imgAUD_').css({
	'cursor':'pointer'
});
$('.deductiondate_pre').on('change', function(){
	window.location.href = "?id=uni_preaudit&ded_date="+$(this).val();
});



/* ........................................................... */
/* ........................................................... */
/* ........................................................... */
/* ........................................................... */
/* SELECT ALL DEDUCTIONS ..................................... */
$('.btnselec-audit').on('click', function(){
	var ids = $(this).attr('id');
	
	if(ids == 'selectall'){
		$('.imgAUD_').attr({
			'src':'../assets/icon_index/cck.png'
		});
		$(this).html('<i class="fa fa-circle-o fa-fw"></i>Unselect All').attr({
			'id':'unselectall'
		}).removeClass('btn-default').addClass('btn-danger');
	}else{
		$('.imgAUD_').attr({
			'src':'../assets/icon_index/uncck.png'
		});
		$(this).html('<i class="fa fa-check-circle-o fa-fw"></i>Select All').attr({
			'id':'selectall'
		}).removeClass('btn-danger').addClass('btn-default');
	}
});

$('.imgAUD_').on('click', function(){
	var img_ = $(this).attr('src').split('/')[3];
	if(img_ == 'uncck.png'){
		$(this).attr({'src':'../assets/icon_index/cck.png'});
	}else{
		$(this).attr({'src':'../assets/icon_index/uncck.png'});
	}
});
/* ........................................................... */
/* ........................................................... */
/* ........................................................... */
/* ........................................................... */



/* ........................................................... */
/* ........................................................... */
/* ........................................................... */
/* ........................................................... */
/* SAVE AS AUDITED DEDUCTIONS .................*/
$('.btnsave-audit').on('click', function(){
	var audit_list = [];
	$('.imgAUD_').each(function(){
		var img_ = $(this).attr('src').split('/')[3];
		if(img_ == 'cck.png'){
			audit_list.push($(this).attr('id'));
		}
	});
	if(audit_list.length < 1){
		alert("Proccess can't be completed, Please select any person available on the list below.");
	}else{
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> SET DEDUCTIONS:</sapn></b>',
			message:"<span class='fnt13'>This information will be use as a basis for uniform's deduction on the selected date. Do you want to procceed?</span>",
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {

								$.post('template/uniforms/uni_iad_ajaxpage.php', {
									'set_deductions':audit_list
								},function(data){
	         					dialog.close();
	         					// $('.tbl-container').html(data);
								window.location.reload();
								});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	}
});

















/* .................................................................. */
/* .................................................................. */
/* .................................................................. */
/* .................................................................. */
/* .................................................................. */
/* CANCEL AUDITED ....................... */
$('.btn-cancelaud').on('click', function(){
	var reqcode = $(this).attr('id');
	var row_val = $(this).attr('for');
	var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><a class="btn btn-danger btn-xs btnITDF"><i class="fa fa-question-circle"></i></a><b> CANCEL AS AUDITED</sapn></b>',
		message:"<span class='fnt13'>This information will be remove form the audited deductions. Do you want to procceed?</span>",
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
							$.post('template/uniforms/uni_iad_ajaxpage.php', {
								'cancel_audit':reqcode
							},
							function(data){
         					dialog.close();
							$('#tr'+row_val).fadeOut();

							});
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
});


/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
/* FILTER DEDUCTION DATE ..................... */
$('.ded-date').on('change', function(){
	$('.tbl-container').html('<img src="../assets/img/loading.gif" width="22"><span class="fnt14">&nbsp;&nbsp;&nbsp;Please wait...</span>');
	$.post('template/uniforms/uni_iad_ajaxpage.php',{
		'filter_dedductiondate':$('select#ded-year').val()+'-'+$('select#cut-off').val()
	}, function(data){
		$('.tbl-container').html(data);
	});
});



/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
//IAD ACCESS PDF REPORT (AUIDTED - DEDUCTION SUMMARY) ...........
$('a#btn-auditedsummary').off().on('click', function(data){
	var aud_yr 	= $('select#ded-year').val();
	var aud_day = $('select#cut-off').val();
	window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=audited-deduction-summary&cutoff='+aud_yr+'-'+aud_day, '_blank');
});



/* .............................................................. */
/* .............................................................. */
/* .............................................................. */
//IAD ACCESS PDF REPORT (AUIDTED - DEDUCTION SUMMARY) ...........
$('a#btn-auditedslip').on('click', function(data){
	var aud_yr = $('select#ded-year').val();
	var aud_day = $('select#cut-off').val();
	window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=audited-deduction-slip&cutoff='+aud_yr+'-'+aud_day, '_blank');
});
//IAD ACCESS PDF REPORT (AUIDTED - DEDUCTION SUMMARY) ...........



//-------------------------   IAD ACCESS PDF REPORT FOR SUPPLY -------------------------------------------------------------------------------
	$('a#btn-iadreport').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_supply&details='+details, '_blank');
	});

	$('a#btn-iadexcel').on('click', function(data){
		var detail_csv 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_supply_csv&detail_csv='+detail_csv, '_blank');
	});
//-------------------------   IAD ACCESS PDF REPORT FOR SUPPLY --------------------------------------------------------------------------------


// ------------------------   IAD ACCESS PDF REPORT FOR PAYMENT --------------------------------------------------------------------------------
	$('a#btn-paymentiad').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_payment_csv&detail_csv_payment='+details, '_blank');
	});
	$('a#btn-paymentiadPDF').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_payment_pdf&detail_pdf_payment='+details, '_blank');
	});
// -----------------------   IAD ACCESS PDF REPORT FOR PAYMENT ----------------------------------------------------------------------------------



// -----------------------   IAD ACCESS PDF REPORT FOR REQUEST ----------------------------------------------------------------------------------
	$('a#btn-requestiad').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		// alert(details);
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_request_csv&detail_csv_request='+details, '_blank');
	});
// -----------------------   IAD ACCESS PDF REPORT FOR REQUEST -----------------------------------------------------------------------------------


// -----------------------   IAD EXCEL REPORT INVENTORY  -----------------------------------------------------------------------------------------
	$('a#btn-invntryIADcsv').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		// alert(details);
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_inventory_csv&detail_csv_inventory='+details, '_blank');
	});
// -----------------------   IAD EXCEL REPORT INVENTORY  ------------------------------------------------------------------------------------------

// -----------------------   IAD ACCESS EXCEL REPORT ADJUSTMENTS ----------------------------------------------------------------------------------
	$('a#btn-iadadj').on('click', function(data){
		var adj_csv 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_adj_reportIAD&adj_csv='+adj_csv, '_blank');
	});

	$('a#btn-adjPDF').on('click', function(data){
		var details 	= $(this).attr('for').split('|');
		window.open('template/uniforms/uni_audit-report-PDF.php?pdf-report=iad_report_adj&adj_pdf='+details, '_blank');
	});
// -----------------------   IAD ACCESS EXCEL REPORT ADJUSTMENTS -----------------------------------------------------------------------------------

/* ............................................................. */
/* ............................................................. */
/* ............................................................. */
/* INDICATOR FOR TRANSFER DEDUCTION ................ */
$('a.btnITDF').off().on('click', function(){
	var DFLTheight	= '475px';
	var serialCODE 	= $(this).attr('id');
	var dsply 	= $(this).attr('for');
	if(dsply == 'USLDT'){ DFLTheight	= '190px'; }

	var dialog = new BootstrapDialog.show({
	size: BootstrapDialog.SIZE_MEDIUM,
	type: BootstrapDialog.TYPE_DEFAULT,
	title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b> DETAILS - TRANSFER DEDUCTION CHARGE</b></span>',
	message: function(dialog) {
		var content = $('<div></div>');
		var page = dialog.getData('pageToLoad');
		content.load(page);
		return content;
	},
	data: {
		'pageToLoad':'../hr/template/Empuniforms/uni_ajaxpage.php?transferdeductionDETAILS='+serialCODE
	},
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
	dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
	dialog.getModalContent().css('border-radius', '2px');
	dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
	dialog.getModalBody().css({'padding':'1.3% 6%', 'height':DFLTheight});
	});







	/* ================================================================================== */
	/* FUNCTION GET ITEM LOGS =========================================================== */
	$('.itemlogs').on('click', function(idx){
		var name_ 		= $(this).attr('name');
		var labelname 	= $(this).attr('for');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b>ITEM LOGS</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'../hr/template/Empuniforms/uni_ajaxpage.php?logs_iten='+name_+'&itemname='+Base64.encode(labelname)},
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
			dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'1.3% 6%', 'height':'350px'});
			$('this.modal')[0].remove();
	});
	/* ================================================================================== */

	$('button.cancelreq').on('click', function(idx){
		var itemcode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> REMOVE ITEM:</b></span>',
		message:'This Item will automatically be remove from the list. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		           	label: 'Procceed',
		            cssClass: 'btn-success btn-fill btn-sm',
		            action: function(dialog) {
		              	$.post('template/Empuniforms/uni_ajaxpage.php',{
		              		'remove_request':itemcode
		              	},
	              		function(data){
	         				dialog.close();
	         				$('tr.stck'+itemcode).fadeOut();
	         				window.location.reload();
	              		});
	              		//alert(itemcode);
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});

	/*============================= trigger the textbox to select bu to display ===================*/
	$(document).on('change', '.transBU', function() {
		var bu_select = $('#transferBU').val().split('|')[1];
		if (bu_select == undefined) {
			window.location.reload();
		}else{
			$('div.unidisplay').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');
			$.post('template/Empuniforms/uni_ajaxpage.php', {
				'select_bu':bu_select
			},function(data){
				$('div.unidisplay').html(data);
			});
		}
	});

	/*========================HR REQUEST FOR STOCKS======================*/
	$('.slctdesign_').css({'cursor':'pointer'});
	$('.slctdesign_').off('click').on('click', function(){
		var dsGcode = $(this).attr('id');
		var ttprice = 0;
		var img_ = $('img.uni'+dsGcode).attr('src').split('/')[3];
		if(img_ === 'uncck.png'){
			$('img.uni'+dsGcode).attr({
				'src':'../assets/icon_index/cck.png'
			});
			$.post('template/Empuniforms/uni_ajaxpage.php',{
				'uniadd_selected':dsGcode
			},function(data){
					$('tbody.uniselected_').append(data);
				});
		}else{
			$('img.uni'+dsGcode).attr({'src':'../assets/icon_index/uncck.png'});
			$('tr#tr'+dsGcode).remove();
		}

		$('input.uniamt').each(function(){
			ttprice = Math.abs(parseFloat($(this).val())+parseFloat(ttprice));
		});
		$('input.totalprice').val(ttprice);

	});


	// SAVE REQUEST FROM HR.....................................
	$('button.unisubmit_hr').on('click', function(idx){
		var incost = document.getElementsByClassName('incost');
		var uniqty = document.getElementsByClassName('uniqty');
		var uniamt = document.getElementsByClassName('uniamt');
		// var req_bu = $('#transferBU').val().split('|')[1];
		var req_bu = '0101';
		var new_array = [];
		$('select.sizeUNI_').each(function(idx){
			var fl_incost = incost[idx].value;
			var fl_uniqty = uniqty[idx].value;
			var fl_uniamt = uniamt[idx].value;
			if((fl_uniqty.replace(/\s/g, '')!='') && (fl_uniqty.replace(/\s/g, '')!=0)){
				var row_values = [$(this).val(), fl_incost, fl_uniqty, fl_uniamt];
				new_array.push(row_values);
			}
		});
		if(req_bu === undefined){
			alert('Please Select Business Unit first');
		}else{
			if(new_array.length !=0){
				var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> IFORMATION:</b></span>',
				message:'This Item(s) will automatically be saved from the record list. Do you want to procceed?',
				draggable: true,
				closable: false,
				    buttons: [{
				              label: 'Cancel',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }, {
				              label: 'Procceed',
				              cssClass: 'btn-success btn-fill btn-sm',
				              action: function(dialog) {
		         				dialog.close();
		      					$.post('template/Empuniforms/uni_ajaxpage.php', {
		      						'saverequest_hr':new_array,
		      						'req_bu':req_bu
		      					},
								function(data){
									var splitDs = data.replace(/\s/g, '').split('`');
									if(splitDs.length == 2){
										alert("This item code is already requested");
										window.location.href = "?id=uni_requested-stock-hr";
									}else{
										window.location.href = "?id=uni_requested-stock-hr";
									}
								});
			              	}
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
			}else{
				var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</b</span>',
				message:"Please select uniform's type and the number of item to be requested!",
				draggable: true,
				closable: false,
				    buttons: [{
				              label: 'Okay',
				              cssClass: 'btn-default btn-fill btn-sm',
				              action: function(dialog) {
				                  dialog.close();
				              }
				          }]
				});
				dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
				dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
			}
		}
		$('this.modal')[0].remove();

	});

	/*====================FOR HR SIDE==================*/
	$('.sizeUNI_').css({
		'cursor':'pointer'
	});
	$(document).on('change', '.sizeUNI_', function() {
		if($(this).val() != '') {
			var thisid = this.id.substr(3);
			//var cost_  = $('.sizeUNI option:selected').val().split('|')[2];
			$("#cost"+thisid).val($(this).val().split('|')[2]);
			$("#qty"+thisid).val('0');
			$("#amt"+thisid).val('0.00');
		}
		$('input.uniamt').each(function(){
			ttprice = Math.abs(parseFloat($(this).val())+parseFloat(ttprice));
		});
		//$('input.totalprice').val(ttprice);
		$('input.totalprice').val((ttprice).toFixed(2));
	});

	$('button.update_req').on('click', function(idx){
		var itecode_ 		= $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="19"><b>REQUEST DETAILS UPDATING</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {
				'pageToLoad':'../hr/template/Empuniforms/uni_ajaxpage.php?view_update='+itecode_
			},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Close',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              	}
			              },{
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
	         					var qty_ = $('input.reqQTY').val();
	         					var ttAmount_ = $('input.total_amnt').val();
	         					var details_ = [itecode_, qty_, ttAmount_];

								$.post('template/Empuniforms/uni_ajaxpage.php', {
									'req_details_':details_
								},function(data){
									$('tr.stck'+itecode_).fadeOut();
									window.location.reload();
									alert("SUCCESSFULLY UPDATE!");
								});
		              		}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.3% 6%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.3% 6%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'1.3% 6%', 'height':'280px'});
			$('this.modal')[0].remove();
	});

	$('button.remove_req_stock').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</sapn></b>',
			message:'<b>Request Code: '+reqcode+'</b>\n\nThis Item will automatically be removed from the record list. Do you want to procceed?',
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
								$.post('template/Empuniforms/uni_ajaxpage.php', {
									'delete_req_hr':reqcode
								},
								function(data){
									$('tr.stck'+reqcode).fadeOut();
									window.location.reload();
								});
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
			$('this.modal')[0].remove();
	});


	$('button.cancelstockreq').on('click', function(idx){
		var itemcode = $(this).attr('name');
		var bu_ = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> REMOVE ITEM:</b></span>',
		message:'This Item will automatically be remove from the list. Do you want to procceed?',
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		           	label: 'Procceed',
		            cssClass: 'btn-success btn-fill btn-sm',
		            action: function(dialog) {
		              	$.post('template/Empuniforms/uni_ajaxpage.php',{
		              		'delete_req_stock':itemcode,
		              		'bu':bu_
		              	},
	              		function(data){
	         				dialog.close();
	         				$('tr.stck'+itemcode).fadeOut();
	         				window.location.reload();
	              		});
	              		alert(bu_);
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});
	});


	// FUNCTION TO SELECT REQUESTED STOCK FROM DIFFERANT BU ===============
		$('img.slctmhhpimg').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'uncck.png'){
				$('img.imgmhhp').attr({
					'src':'../assets/icon_index/cck.png'
			});
				$(this).attr({
					'src':'../assets/icon_index/cck.png'
				});
			}else{
				$('img.imgmhhp').attr({
					'src':'../assets/icon_index/uncck.png'
			});
				$(this).attr({
					'src':'../assets/icon_index/uncck.png'
				});
			}
		});


	// FUNCTION TO SELECT REQUESTED STOCK FROM DIFFERANT BU ===============
		$('img.imgmhhp').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ == 'uncck.png'){
				$(this).attr({
					'src':'../assets/icon_index/cck.png'
				});
			}else{
				$(this).attr({
					'src':'../assets/icon_index/uncck.png'
				});
			}
		});
	// =========================== FUNCTION TO HR SIDE TO GET THE CHECK AND UNCHECK IMAGE IN ADJUSTMENTS ======================================
		$('img.slctimguni').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'uncck.png'){
				$('img.imguni').attr({
					'src':'../assets/icon_index/cck.png'
			});
				$(this).attr({
					'src':'../assets/icon_index/cck.png'
				});
			}else{
				$('img.imguni').attr({
					'src':'../assets/icon_index/uncck.png'
			});
				$(this).attr({
					'src':'../assets/icon_index/uncck.png'
				});
			}
		});


		$('img.imguni').on('click', function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'uncck.png'){
				$(this).attr({
					'src':'../assets/icon_index/cck.png'
				});
			}else{
				$(this).attr({
					'src':'../assets/icon_index/uncck.png'
				});
			}
		});
	// =========================== FUNCTION TO HR SIDE TO GET THE CHECK AND UNCHECK IMAGE IN ADJUSTMENTS ======================================

	/*========================================== HR ====================================================*/
	$('.stsform_').off('click').on('click', function(){
		var emp 	 = $('#req_by').val();
		var itemcode = [];
		var bu_ 	 = $('#transferBU').val().split('|');

		$('.imgmhhp').each(function(){
			var img = $(this).attr('src').split('/')[3];
			if(img === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length == 0){
			alert("Process can't be completed. Please select an item from the table.");
			$('.modal')[0].remove();
		}else{
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_WIDE,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>REQUEST FOR TRANSFER:</b></span>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {
				'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?stsform_='+itemcode+'&bu_slct='+bu_+'&emp_details='+encodeURI(emp)
			},
			draggable: true,
			closable: false,
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			                  window.location.reload();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {

							var emp_searchHR 	= $('input.emp_id').attr('id');
							var transferBU 		= $('input.dept_').attr('id');
							var fadstsno 		= $('input#fadstsno').val();
							var ststransactDATE = $('input#ststransactDATE').val();
							var req_qty	 		= $('input.stsqty_').val();
							var item_DETAILS 	= [];
							var item_code 		= [];
							var stck_qty		= [];
							var transBU 		= transferBU.split('|');

							$('input.stsqty_').each(function(){
								if($(this).val().replace(/\s/g, '') != ''){
									var itemDET = $(this).attr('name').split('|');
									item_DETAILS.push([itemDET[0], itemDET[1], itemDET[2], $(this).val()]);
									stck_qty.push(parseFloat(itemDET[0]));
									item_code.push(itemDET[2]);
								}
							});

							if(emp_searchHR.replace(/\s/g, '') == ''|| fadstsno.replace(/\s/g, '') == ''|| transferBU.replace(/\s/g, '') == ''
							|| ststransactDATE.replace(/\s/g, '') == '' || item_DETAILS.length == 0 ){
								alert("Process can't be completed. Please provide check you stock tranfer form.");
							}else{

								if(parseFloat(req_qty) > stck_qty){
									alert('WARNING . . . . .\nRequested quantity must not be greater than the stock!');
								}else{

									if(transBU[1] === '0221'){  // FOR TUBIGON BU
										var con = confirm("Do you want to transfer this uniform items? Click 'OK' to proceed.");
										if(con == true){
											$.post('template/Empuniforms/uni_ajaxpage.php', {
												'stocktrans_tubigon':'',
												'attention':emp_searchHR,
												'fadstsno':fadstsno,
												'transferBU':transferBU,
												'ststransactDATE':ststransactDATE,
												'item_DETAILS':item_DETAILS,
												'itemcode':item_code
											}, function(data){
												 dialog.close();
												 // alert(data);
												 window.location.reload();
											});
										}
									}else if(transBU[1] === '0202'){
										var con = confirm("Do you want to transfer this uniform items? Click 'OK' to proceed.");
										if(con == true){
											$.post('template/Empuniforms/uni_ajaxpage.php', {
												'stocktransfer_talibon':'',
												'attention':emp_searchHR,
												'fadstsno':fadstsno,
												'transferBU':transferBU,
												'ststransactDATE':ststransactDATE,
												'item_DETAILS':item_DETAILS,
												'itemcode':item_code
											}, function(data){
												 dialog.close();
												 window.location.reload();
											});
										}
									}else{ 	// FOR 34 SERVER
										// alert(transBU[1]);
										var con = confirm("Do you want to transfer this uniform items? Click 'OK' to proceed.");
										if(con == true){
											$.post('template/Empuniforms/uni_ajaxpage.php', {
												'save_stocktransfer_':'',
												'attention':emp_searchHR,
												'fadstsno':fadstsno,
												'transferBU':transferBU,
												'ststransactDATE':ststransactDATE,
												'item_DETAILS':item_DETAILS,
												'itemcode':item_code
											}, function(data){
												 dialog.close();
												 window.location.reload();
											});
										}

									}
								}
							}
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'485px'});
			$('.modal')[0].remove();
		}

	});

	$(document).on('change', '.transBU_', function() {
		var bu_select = $('#transferBU_').val().split('|')[1];
		if (bu_select == undefined) {
			window.location.reload();
		}else{
			$('div.mhhpsetpostaudit').html('<span class="fnt14"><img src="../assets/img/loading.gif" width="24"> Please wait...</span>');
			$.post('template/Empuniforms/uni_ajaxpage.php', {
				'select_bu_':bu_select
			},function(data){
				$('div.mhhpsetpostaudit').html(data);
			});
		}
	});


	/*==============================================================================================*/
	/* ===================================== accouting report  =====================================*/
	/*==============================================================================================*/
	$('.trans_report_acctng').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_transfer_acctng'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var bu = $('#transferBU').val().split('|');
		                  var strDATE_rep = $('#strDATE_rep').val();
		                  var endDATE_rep = $('#endDATE_rep').val();
		                  var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+bu);


		                  if(bu.length === 1){
		                  		alert("PLEASE SELECT BUSINESS UNIT FIRST!");
		                  		window.location.reload();
		                  }else{
		                  		window.location.href= '?id=uni_trans_report&transfer='+report_set;
		                  }
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'260px'});
		$('this.modal')[0].remove();
	});
	
	$('.recve_report_acctng').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_recieve_acctng'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var bu = $('#transferBU').val().split('|');
		                  var strDATE_rep = $('#strDATE_rep').val();
		                  var endDATE_rep = $('#endDATE_rep').val();
		                  var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+bu);


		                  if(bu.length === 1){
		                  		alert("PLEASE SELECT BUSINESS UNIT FIRST!");
		                  		window.location.reload();
		                  }else{
		                  		window.location.href= '?id=uni_rcving_report&recieve='+report_set;
		                  }
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'260px'});
		$('this.modal')[0].remove();
	});
	
	$('.select_bu_filter').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> SELECT BUSINESS UNIT</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_inventory_acctng'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var bu = $('#inventoryBU').val();
		                  var report_set = Base64.encode(bu);


		                  if(bu.length === 1){
		                  		alert("PLEASE SELECT BUSINESS UNIT FIRST!");
		                  		window.location.reload();
		                  }else{
		                  		window.location.href= '?id=uni_inve_report&inventory='+report_set;
		                  }
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'260px'});
		$('this.modal')[0].remove();
	});


	/* ................................................................................. */
	/* ......................  GET STOCK TRANSFER DETAILS .............................. */
	/* ................................................................................. */
	$('.STS_acctng_detail').on('click', function(){
		var sts_code = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_WIDE,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>STOCK TRANSFER DETAILS:</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?stsdetails='+sts_code
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: '<i class="fa fa-print fa-fw"></i> PDF Copy',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
						 window.open('template/Empuniforms/uni_PDF-reports.php?uni_report=sts_ledger&sts='+sts_code, '_blank');
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'0.8% 4.5%', 'height':'480px'});
		$('this.modal')[0].remove();
	});


/*=========================================================================================================================*/
/*========================================= FOR UPDATING THE GENDER =======================================================*/
	$('button.updategender').on('click', function(idx){
		var designcode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>UPDATE ITEM GENDER TYPE</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?updategender_form='+designcode
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {

		              	var itemgender 		= $('select.desgender').val();
			            var itemdetail 		= null;
			            var trig 			= 0;

		            	if(itemgender.replace(/\s/g, '') === ''){
	            			$('input.desgender').css({
	            				'border':'1px solid red'
	            			});
	            			trig = 1;
		            	}
		            	var itemdetail = [designcode, itemgender];
			            if(trig != 1){
							$.post('template/Empuniforms/uni_ajaxpage.php',{
								'itemdetail_gender': itemdetail
							},function(data){
								var splits_ = data.replace(/\s/g, '').split('`');
								if(splits_.length == 2){
									window.location.reload();
									alert("Process connot be completed, this item is already edited please advise your supervisor to approve");
								}else{
									window.location.reload();
									alert('SUCCESSFULLY SAVE!');
								}
							});
		            	}

	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 6%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'3% 6%', 'height':'180px', 'width':'580px'});
		$('this.modal')[0].remove();
	});
/*==========================================================================================================================================*/
				/*=========================== FOR UPDATING THE GENDER =========================================*/
/*==========================================================================================================================================*/


/*==========================================================================================================================================*/
				/*===================================== accouting report  =====================================*/
/*==========================================================================================================================================*/
	$('.supply_report_acctng').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b><img src="../assets/img/con_sdb.png" width="19"> REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?supply_transfer_acctng'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  	var strDATE_rep = $('#strDATE_rep').val();
		                  	var endDATE_rep = $('#endDATE_rep').val();
		                 	var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep);

                  			window.location.reload();
                  			window.location.href= '?id=uni_supp_report&release='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1% 7.5%', 'height':'180px'});
		$('this.modal')[0].remove();
	});

	// ======================================== SETUP SUPPLY REPORT IAD SIDE =======================================================
	$('.iad_report_supply').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/uniforms/uni_iad_ajaxpage.php?report_supply_iad'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                 var reporttype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){ 
	                  			reporttype = $(this).attr('id'); 
	                  		}
		                  });
		                  var strDATE_rep 	= $('#strDATE_rep').val();
		                  var endDATE_rep 	= $('#endDATE_rep').val();
		                  var report_set 	= Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+reporttype);
		                  window.location.href= '?id=uni_report_iad&supply='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'280px'});
		$('this.modal')[0].remove();
	});

	// ======================================== SETUP SUPPLY REPORT IAD SIDE =======================================================
	$('.iad_report_payment').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/uniforms/uni_iad_ajaxpage.php?iad_report_payment'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                 var imgEMPtype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){   
	                  			imgEMPtype = $(this).attr('id'); 
	                  		}
		                  });
		                  var type_rep = $('.type_rep').val();
		                  var deductiondate = $('#strDATE_rep').val();
		                  var report_set = Base64.encode(deductiondate+'|'+type_rep+'|'+imgEMPtype);
		                  window.location.href='?id=uni_report-iadpayment&iad_payment='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'280px'});
		$('this.modal')[0].remove();
	});

	/* --------------------------------- SETUP REQUISITIION REPORT ..................... */
	$('.iad_report_request').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {
			'pageToLoad':'template/uniforms/uni_iad_ajaxpage.php?iad_report_request'
		},
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                  var imgEMPtype = null;
		                  $('.imgEMPtype').each(function(){
		                  		var imgsrc = $(this).attr('src').split('/')[3];
		                  		if(imgsrc == 'cck.png'){   
		                  			imgEMPtype = $(this).attr('id'); 
		                  		}
		                  });
		                  var type_rep = $('.type_rep').val();
		                  var strDATE_rep = $('#strDATE_rep').val();
		                  var endDATE_rep = $('#endDATE_rep').val();
		                  var report_set = Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+type_rep+'|'+imgEMPtype);
		                  window.location.href= '?id=uni_report-request&iad_reqReport='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'350px'});   
		$('this.modal')[0].remove();
	});

	//  ----------------------------------------    ADJUSTMENTS  ---------------------------------------------------------------------------
    $('.item_adj').on('click', function(){
		var itemcode = [];
		$('.imguni').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length < 1){
			alert("Proccess can't be completed, Please select any uniforms available on the list below.");
		}else{		
			var reqcode = $(this).attr('id');
			var dialog = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_WIDE,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b> ADJUSTMENTS SETUP</sapn></b>',
				message: function(dialog) {
					var content = $('<div></div>');
					var page = dialog.getData('pageToLoad');
					content.load(page);    
					return content;
				},
				data: {
					'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?item_adj_='+itemcode
				},          
				draggable: true, 
				closable: false,
				    buttons: [{
				              label: 'Cancel',
				              cssClass: 'btn-default btn-fill btn-sm',
					              action: function(dialog) {
					                  dialog.close();
					              }
				          	  },{
					            label: 'Procceed',
					            cssClass: 'btn-success btn-fill btn-sm',
					            action: function(dialog) { 

				              		var adj_qty				= document.getElementsByClassName('input-qty');
				              		var oldqty				= document.getElementsByClassName('oldqty');
				              		var adj_type			= $('select.select-adj').val();
				              		var adj_reason			= $('.adj_reason').val();
				              		var item_adjforapproval = [];
				              		var itemcode 			= [];

						            $('input.input-qty').each(function(idx){
				                  		var qty 			= adj_qty[idx].value;
				                  		var code_ 			= $(this).attr('id');

				                  		if(qty.replace(/\s/g, '')!=''){
											item_adjforapproval.push([qty, adj_reason, code_]);	
				                  		}
				                  	});

						            if(adj_type != '' && adj_reason != ''){
										$.post('template/Empuniforms/uni_ajaxpage.php',{
											'item_adjforapproval':item_adjforapproval,
											'adj_type':adj_type
										},function(data){
	         								dialog.close();
											modal_successADJ();
										});	
						            }else{
						            	alert('Please fill up ADJUSTMENTS TYPE AND REASON field!');
						            }
			              		}
				          	}]
				});
				dialog.getModalHeader().css({'padding':'0.7% 4.5%', 'border-radius':'1px'});   
				dialog.getModalContent().css('border-radius', '2px');
				dialog.getModalFooter().css({'padding':'0.5% 4.5%', 'background-color':'#fcf8e3'});
				dialog.getModalBody().css({'padding':'0.8% 3%', 'height':'485px'}); 
				$('this.modal')[0].remove();
		}
    });
// ----------------------------------------    ADJUSTMENTS  -------------------------------------------------------------------------------
	function modal_successADJ(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/success.png" width="20"> <b> SUCCESS</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: You have successfully sent the request. This is for review in IAD side!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
						  window.location.href='?id=uni_inventory-adj';	
						  window.location.reload();
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
		$('this.modal')[0].remove();
	}
// ==============================================    FOR ADJUSTMENT REPORT  ===============================================================
	$('.iad_adj_report').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/uniforms/uni_iad_ajaxpage.php?report_iad-adj'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog){
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                 var reporttype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){ 
	                  			reporttype = $(this).attr('id'); 
	                  		}
		                  });
		                  var strDATE_rep 	= $('#strDATE_rep').val();
		                  var endDATE_rep 	= $('#endDATE_rep').val();
		                  var report_set 	= Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+reporttype);
		                  window.location.href= '?id=uni_adjreport-iad&adj='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'280px'});
		$('this.modal')[0].remove();
	});
// ==============================================    FOR ADJUSTMENT REPORT  ============================================================

// ==============================================    FOR IAD ADJUSTMENT REPORT  ============================================================
	$('.hr_adj_report').on('click', function(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><b> <img src="../assets/img/con_sdb.png" width="19">REPORT DETAILS SETUP</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?report_hr-adj'
		},
		draggable: true,
		closable: false,
		    buttons: [{
		              label: 'Close',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog){
		                  dialog.close();
		              }
		          },{
		              label: 'Proceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();

		                 var reporttype = null;
		                  $('.imgEMPtype').each(function(){
	                  		var imgsrc = $(this).attr('src').split('/')[3];
	                  		if(imgsrc == 'cck.png'){ 
	                  			reporttype = $(this).attr('id'); 
	                  		}
		                  });
		                  var strDATE_rep 	= $('#strDATE_rep').val();
		                  var endDATE_rep 	= $('#endDATE_rep').val();
		                  var report_set 	= Base64.encode(strDATE_rep+'|'+endDATE_rep+'|'+reporttype);
		                  window.location.href= '?id=uni_adj-reportHRD&adj='+report_set;
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'2.3% 7.5%', 'border-radius':'1px'});
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2.2% 7.5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 7.5%', 'height':'280px'});
		$('this.modal')[0].remove();
	});
// ==============================================    FOR IAD ADJUSTMENT REPORT  ============================================================
	
	$('button.deleteADJ').on('click', function(idx){
		var itemcode = $(this).attr('name');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><i class="glyphicon glyphicon-trash"></i> <b> REMOVE ITEM:</b></span>',
		message:'This Item will automatically be remove from the list. Do you want to procceed?',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'Cancel',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }, {
		              label: 'Procceed',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		              	$.post('template/Empuniforms/uni_ajaxpage.php',{
		              		'removeadj_item':itemcode
		              	},function(data){
	         				dialog.close();
	         				$('tr.stck'+itemcode).fadeOut();
	         				alert('SUCCESSFULLY DELETED!');
	         				window.location.reload();
	              		});	
	              	}
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});     
		$('this.modal')[0].remove();
	});

	$('button.reasonADJ').on('click', function(idx){
		var appid 		= $(this).attr('name');
		var itemcode 	= $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>LIST OF REASON FOR ADJUSTMENTS</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {
			'pageToLoad':'template/Empuniforms/uni_ajaxpage.php?appid='+appid+'&itemcode='+itemcode
		},
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 2%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.2% 4%', 'height':'280px'}); 
		$('this.modal')[0].remove(); 
	});

	$('button.reasonADJ_iad').on('click', function(idx){
		var appid 		= $(this).attr('name');
		var itemcode 	= $(this).attr('id');
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_MEDIUM,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/img/con_sdb.png" width="20"> <b>LIST OF REASON FOR ADJUSTMENTS</b></span>',
		message: function(dialog) {
			var content = $('<div></div>');
			var page = dialog.getData('pageToLoad');
			content.load(page);    
			return content;
		},
		data: {
			'pageToLoad':'template/uniforms/uni_iad_ajaxpage.php?itemcode='+itemcode+'&appid='+appid
		},
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.2% 2%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'1.2% 6%', 'background-color':'#fcf8e3'});
		dialog.getModalBody().css({'padding':'1.2% 4%', 'height':'280px'}); 
		$('this.modal')[0].remove(); 
	});

	$('button.disapprovedBTN').on('click', function(idx){
		var itemcode 	= [];
		var adjtype 	= $(this).attr('for');
		$('.imguni').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length < 1){
			alert("Proccess can't be completed, Please select any uniforms available on the list below.");
		}else{	
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-hand-right"></i> <b> DISAPPROVE REQUEST :</b></span>',
			message:'<i class="glyphicon glyphicon-hand-right"></i> WARNING: You are about to DISAPPROVE the request. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              	$.post('template/uniforms/uni_iad_ajaxpage.php',{
			              		'disapproveADJ':itemcode
			              	},function(data){
			                  	dialog.close();
			                  	disapprove_btn(adjtype);
		         				$('tr.stck'+itemcode).fadeOut();
		              		});	
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto', 'color':'red'});   
			$('this.modal')[0].remove();
		}  
	});

	function disapprove_btn(adjtype){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/success.png" width="20"> <b> SUCCESS</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: You have successfully DISAPPROVE the request.!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		                  if(adjtype === 'ADJUSTMENT'){
						  		window.location.href='?id=uni_reportiad_approvalADJ';	
		                  }else if(adjtype === 'NEGATIVE'){
						  		window.location.href='?id=uni_reportiad_approvalNEGATIVE';	
		                  }else if(adjtype === 'POSITIVE'){
						  		window.location.href='?id=uni_reportiad_approvalPOSITIVE';	
		                  }
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto', 'color':'red'});   
		$('this.modal')[0].remove();
	}


	$('button.approvedADJ').on('click', function(idx){
		var itemcode 	= [];
		// var adj_type 	= $('#adj_type').val();
		$('.imguni').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length < 1){
			alert("Proccess can't be completed, Please select any uniforms available on the list below.");
		}else{	
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-hand-right"></i> <b> APPROVE REQUEST :</b></span>',
			message:'You are about to approve the request. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              	$.post('template/uniforms/uni_iad_ajaxpage.php',{
			              		'approveADJ':itemcode
			              	},function(data){
			                  	dialog.close();
			                  	successADJ();
		         				$('tr.stck'+itemcode).fadeOut();
		              		});	
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
		}  
	});
	function successADJ(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/success.png" width="20"> <b> SUCCESS</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: You have successfully approved the request. The actual inventory is now changed!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
						  window.location.href='?id=uni_reportiad_approvalADJ';	
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
		$('this.modal')[0].remove();
	}

	$('button.approvedNEGATIVE').on('click', function(idx){
		var itemcode 	= [];
		$('.imguni').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length < 1){
			alert("Proccess can't be completed, Please select any uniforms available on the list below.");
		}else{	
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-hand-right"></i> <b> APPROVE REQUEST :</b></span>',
			message:'You are about to approve the request. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              
			              	$.post('template/uniforms/uni_iad_ajaxpage.php',{
			              		'approvedNEGATIVE':itemcode
			              	},function(data){
		         				if(data.trim() === 'ERROR'){
		         					errorMESSAGE();
		         				}else{
		                 			dialog.close();
		         					successnega();
			         				$('tr.stck'+itemcode).fadeOut();
		         				}
		              		});	
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
		}  
	});

	function successnega(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/success.png" width="20"> <b> SUCCESS</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: You have successfully approved the request. The actual inventory is now changed!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
						  window.location.href='?id=uni_reportiad_approvalNEGATIVE';	
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
		$('this.modal')[0].remove();
	}

	function errorMESSAGE(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/error.png" width="20"> <b> ERROR REQUEST</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: Please check the requested quantity. It must be equal or less than to previous quantity!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'OK',
		              cssClass: 'btn-default btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto', 'color': 'red'});   
		$('this.modal')[0].remove();
	}

	$('button.approvedPOSITIVE').on('click', function(idx){
		var itemcode 	= [];
		$('.imguni').each(function(){
			var img_ = $(this).attr('src').split('/')[3];
			if(img_ === 'cck.png'){
				itemcode.push($(this).attr('id'));
			}
		});
		if(itemcode.length < 1){
			alert("Proccess can't be completed, Please select any uniforms available on the list below.");
		}else{	
			var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14"><i class="glyphicon glyphicon-hand-right"></i> <b> APPROVE REQUEST :</b></span>',
			message:'You are about to approve the request. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
			              
			              	$.post('template/uniforms/uni_iad_ajaxpage.php',{
			              		'approvedPOSITIVE':itemcode
			              	},function(data){
		                 			dialog.close();
		         					successPOS();
			         				$('tr.stck'+itemcode).fadeOut();
		              		});	
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'2% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
		}  
	});

	function successPOS(){
		var dialog = new BootstrapDialog.show({
		size: BootstrapDialog.SIZE_SMALL,
		type: BootstrapDialog.TYPE_DEFAULT,
		title: '<span class="fnt14"><img src="../assets/icons/success.png" width="20"> <b> SUCCESS</b></span>',
		message: '<i class="glyphicon glyphicon-hand-right"></i>  NOTE: You have successfully approved the request. The actual inventory is now changed!',
		draggable: true, 
		closable: false,           
		    buttons: [{
		              label: 'DONE',
		              cssClass: 'btn-success btn-fill btn-sm',
		              action: function(dialog) {
		                  dialog.close();
						  window.location.href='?id=uni_reportiad_approvalPOSITIVE';	
		              }
		          }]
		});
		dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
		dialog.getModalContent().css('border-radius', '2px');
		dialog.getModalFooter().css({'padding':'2% 5%'});
		dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
		$('this.modal')[0].remove();
	}


	$('button.removeHRDREL').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14" style="color:red"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</sapn></b>',
			message:'<b style="color:red;">Request Code: '+reqcode+'</b>\n\nThis Item will automatically be removed from the record list. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
         						var img_loader = '<img src="../assets/icon_index/gears.gif" width="150"><br />';
								img_loader += '<b style="font-size:20px;color:maroon;padding:10px;">DELETING . . .</b>';
								var loader = new BootstrapDialog.show({
									size: BootstrapDialog.SIZE_SMALL,
									type: BootstrapDialog.TYPE_DEFAULT,
									message:img_loader,
									draggable: true,
									closable: false
								});
								loader.getModalHeader().remove();
								loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px','background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								loader.getModalFooter().remove();
								loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'height':'190px', 'background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								$.post('template/Empuniforms/uni_ajaxpage.php', {
									'delete_request':reqcode
								},function(data){
									console.log(data);
									// $('tr.req'+reqcode).fadeOut();
									setTimeout(function() {
										window.location.href="?id=uni_amortization-ae";					
									}, 2000);
								});			              		
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
	});	

	$('button.removeHRDRELNESCO').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14" style="color:red"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</sapn></b>',
			message:'<b style="color:red;">Request Code: '+reqcode+'</b>\n\nThis Item will automatically be removed from the record list. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
	         					var img_loader = '<img src="../assets/icon_index/gears.gif" width="150"><br />';
								img_loader += '<b style="font-size:20px;color:maroon;padding:10px;">DELETING . . .</b>';
								var loader = new BootstrapDialog.show({
									size: BootstrapDialog.SIZE_SMALL,
									type: BootstrapDialog.TYPE_DEFAULT,
									message:img_loader,
									draggable: true,
									closable: false
								});
								loader.getModalHeader().remove();
								loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px','background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								loader.getModalFooter().remove();
								loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'height':'190px', 'background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								$.post('template/Empuniforms/uni_ajaxpage.php', {
									'delete_request':reqcode
								},function(data){
									console.log(data);
									$('tr.req'+reqcode).fadeOut();	
									window.location.href="?id=uni_amortization-nesco";					
								});			              		
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
	});	

	$('button.removeHRDRELPROMO').on('click', function(idx){
		var reqcode = $(this).attr('id');
		var dialog = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_SMALL,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<span class="fnt14" style="color:red"><i class="glyphicon glyphicon-question-sign"></i> <b> WARNING:</sapn></b>',
			message:'<b style="color:red;">Request Code: '+reqcode+'</b>\n\nThis Item will automatically be removed from the record list. Do you want to procceed?',
			draggable: true, 
			closable: false,           
			    buttons: [{
			              label: 'Cancel',
			              cssClass: 'btn-default btn-fill btn-sm',
			              action: function(dialog) {
			                  dialog.close();
			              }
			          }, {
			              label: 'Procceed',
			              cssClass: 'btn-success btn-fill btn-sm',
			              action: function(dialog) {
	         				dialog.close();
	         					var img_loader = '<img src="../assets/icon_index/gears.gif" width="150"><br />';
								img_loader += '<b style="font-size:20px;color:maroon;padding:10px;">DELETING . . .</b>';
								var loader = new BootstrapDialog.show({
									size: BootstrapDialog.SIZE_SMALL,
									type: BootstrapDialog.TYPE_DEFAULT,
									message:img_loader,
									draggable: true,
									closable: false
								});
								loader.getModalHeader().remove();
								loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px','background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								loader.getModalFooter().remove();
								loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'height':'190px', 'background':'transparent','-webkit-box-shadow':'none','box-shadow':'none','border':'none'});
								$.post('template/Empuniforms/uni_ajaxpage.php', {
									'delete_request':reqcode
								},function(data){
									console.log(data);
									$('tr.req'+reqcode).fadeOut();	
									window.location.href="?id=uni_amortization-promo";					
								});			              		
		              	}
			          }]
			});
			dialog.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});   
			dialog.getModalContent().css('border-radius', '2px');
			dialog.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
			dialog.getModalBody().css({'padding':'2% 5%', 'height':'auto'});   
			$('this.modal')[0].remove();
	});	
	
});