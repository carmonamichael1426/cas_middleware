/* ========================= CA MODULE ========================= */
function ocDetails()
{
    BootstrapDialog.show({
		title: 'Outstanding Credit Ledger',
    	type: BootstrapDialog.TYPE_SUCCESS,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modal_OutCredit.php'
        },

		buttons: [{
				label: 'Close',
				icon: 'glyphicon glyphicon-remove',
				cssClass: "btn-sm btn-danger",
				action: function(dialog) {
					dialog.close();
				}
			}]
    });
}

function regDetails()
{
	BootstrapDialog.show({
		title: 'Regular CA Ledger',
    	type: BootstrapDialog.TYPE_SUCCESS,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modal_Regular.php'
        },

		buttons: [{
				label: 'Close',
				icon: 'glyphicon glyphicon-remove',
				cssClass: "btn-sm btn-danger",
				action: function(dialog) {
					dialog.close();
				}
			}]
    });
}

function specDetails()
{
	BootstrapDialog.show({
		title: 'Special CA Ledger',
    	type: BootstrapDialog.TYPE_SUCCESS,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modal_Special.php'
        },

		buttons: [{
				label: 'Close',
				icon: 'glyphicon glyphicon-remove',
				cssClass: "btn-sm btn-danger",
				action: function(dialog) {
					dialog.close();
				}
			}]
    });
}

function caMonRequest(nameoff, editable)
{
	BootstrapDialog.show({
		title: 'View Cash Advance Details',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modalca_view.php?getdata='+nameoff+'&editable='+editable
        }
    });
}

function empReqDelete($id){

	var pen_careq_id = $id;

	BootstrapDialog.show({
	type: BootstrapDialog.TYPE_DANGER,
	size: BootstrapDialog.SIZE_SMALL,
	title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
	message: '<center>Are you sure you want to delete your request? </center>',
	closable: false,
	buttons: [{
		label: 'Yes',
		cssClass: 'btn-success btn-sm',
		icon: 'glyphicon glyphicon-ok',
		action: function(dialog2){
			var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
			$button.disable();
			$button.spin();
			$.ajax({
				type:"POST",
				url:"template/CashAdvance/delete_request.php?request=deleteReq",
				data:{pen_careq_id:pen_careq_id},
				success:function(data){
					if(data == "DELETED"){
						var dialog = new BootstrapDialog({
							size: BootstrapDialog.SIZE_SMALL,
							message: function(dialogRef){
								var $message = $('<h3 class="text-center text-success">Successfully Deleted!</h3>');
								var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
								$button.on('click', {dialogRef: dialogRef}, function(event){
									event.data.dialogRef.close();
									window.location.reload();
								});
								$message.append($button);

								return $message;
							},
							closable: false
						});
						dialog.realize();
						dialog.getModalHeader().hide();
						dialog.getModalFooter().hide();
						dialog.getModalBody().css('background-color', '#FFF');
						dialog.getModalBody().css('color', '#F00');
						dialog.open();
					}
					else {
						alert(data);
					}
				}
			});
		}
	},{
		label: 'No',
		cssClass: 'btn-danger btn-sm',
		icon: 'glyphicon glyphicon-remove',
		action: function(dialog2){
			dialog2.close();
		}
	}]
});

}

function caReviewed(nameoff)
{
	BootstrapDialog.show({
		title: 'Reviewed Cash Advance Details',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modalca_Reviewed.php?getdata='+nameoff
        }
    });
}

function caApproved(nameoff)
{
	BootstrapDialog.show({
		title: 'Approved Cash Advance Details',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modalca_Approved.php?getdata='+nameoff
        }
    });
}

function caDisapproved(nameoff)
{
	BootstrapDialog.show({
		title: 'Approved Cash Advance Details',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modalca_Disapproved.php?getdata='+nameoff
        }
    });
}

function saveRequest()
{
	var caType = $('[name="caType"]:checked').val();
    var amtFigures = $('[name="amtFigures"]').val().trim();
	var empRemarks = $('[name="empRemarks"]').val();
	var rdate = $('[name="rdate"]').val();
	var cut_off = $('[name="cut_off"]').val();
	var chooseLike = $('[name="chooseLike"]').val();
	var stat = $('[name="stat"]').val();
	$.ajax({
		type: "POST",
		url: "template/CashAdvance/save_request.php?request=checkAmount",
		data: { caType : caType, amtFigures : amtFigures, rdate : rdate, cut_off : cut_off, empRemarks : empRemarks, chooseLike : chooseLike, stat : stat },
		success: function(data){
			var res_data = data.split("|");
			if (res_data[0] == "Not_allowed_Min") {
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_NORMAL,
					message: function(dialogRef){
						var $message = $("<h4 class='text-center text-danger'>Not allowed amount!<br>It must be above P"+res_data[1]+"<br></h4>");
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else if (res_data[0] == "Not_allowed_Max") {
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_NORMAL,
					message: function(dialogRef){
						var $message = $("<h4 class='text-center text-danger'>Over the limit!<br>Your current limit is P"+res_data[1]+"<br></h4>");
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else if ((res_data[0] == "ToCheque") || (res_data[0] == "ToPettyCash")) {
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_NORMAL,
					message: function(dialogRef){
						if (res_data[0] == "ToCheque") {
							var $message = $("<h4 class='text-center text-danger'>Over the PETTY CASH limit!<br>It must be below P"+res_data[1]+". Chance CASH ADVANCE TYPE to Special Cash Advance (Cheque)?<br></h4>");
						} else {
							var $message = $("<h4 class='text-center text-danger'>Below the minimum CHEQUE limit!<br>It must be below P"+res_data[1]+". Chance CASH ADVANCE TYPE to Special Cash Advance (Petty Cash)?<br></h4>");
						}
						var $button = $('<br><button style="margin-right:10px;width:100px;" class="btn btn-primary btn-sm">OK</button>');
						var $cancel = $('<button style="margin-right:10px;width:100px;" class="btn btn-danger btn-sm">CANCEL</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							if (res_data[0] == "ToCheque") {
								$('#btnSpecC').prop('checked', true);
							} else {
								$('#btnSpecPC').prop('checked', true);
							}
							event.data.dialogRef.close();
						});
						$cancel.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);
						$message.append($cancel);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else if (res_data[0] == "Allowed") {

				var msg = '';
				if (res_data[2] == "4A" && caType == "Regular CA") {
					msg = 'Above Regular Cash Advance limit ' + res_data[1] + '. Your request is subject for final approval of Ma\'am Nelita Fuertes after reviewed by the Supervisor. <br/> <br/>Continue?';
				} else {
					msg = 'Are you sure to submit this request?';
				}

				var intag = res_data[2];
				BootstrapDialog.show({
						title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
						type: BootstrapDialog.TYPE_DANGER,
						size: BootstrapDialog.SIZE_SMALL,
						closable:false,
						draggable:true,
						message: msg,
						buttons: [{
							label: 'Yes',
							icon: 'glyphicon glyphicon-ok',
							cssClass: "btn-sm btn-success",
							action: function(dialog) {
								   $.ajax({
										type: "POST",
										url: "template/CashAdvance/save_request.php?request=saveCA",
										data: { caType : caType, amtFigures : amtFigures, rdate : rdate, cut_off : cut_off, empRemarks : empRemarks, chooseLike : intag, stat : stat },
										success: function(data){
											data = data.trim();
											if(data == "SAVED"){
												BootstrapDialog.show({
												title: '<span class="glyphicon glyphicon-exclamation-sign"></span> Submitted',
												type: BootstrapDialog.TYPE_SUCCESS,
												size: BootstrapDialog.SIZE_SMALL,
												closable:false,
												draggable:true,
												message: 'Successfully Submitted!',
												buttons: [{
												label: 'OK',
												cssClass: "btn-sm btn-primary",
												action: function(dialog) {
													var dialog = new BootstrapDialog({
														size: BootstrapDialog.SIZE_SMALL,
														message: function(dialogRef){
															var $message = $('<h3 class="text-center text-success">Please remind your immediate superior to approve your Regular CA request.</h3>');
															var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
															$button.on('click', {dialogRef: dialogRef}, function(event){
																event.data.dialogRef.close();
																window.location.reload();
															});
															$message.append($button);

															return $message;
														},
														closable: false
													});
													dialog.realize();
													dialog.getModalHeader().hide();
													dialog.getModalFooter().hide();
													dialog.getModalBody().css('background-color', '#FFF');
													dialog.getModalBody().css('color', '#F00');
													dialog.open();
													}
												}]
												});
											}
											else {
												var dialog = new BootstrapDialog({
													size: BootstrapDialog.SIZE_SMALL,
													message: function(dialogRef){
														var $message = $('<h3 class="text-center text-success">'+data+'</h3>');
														var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
														$button.on('click', {dialogRef: dialogRef}, function(event){
															event.data.dialogRef.close();
															window.location.reload();
														});
														$message.append($button);

														return $message;
													},
													closable: false
												});
												dialog.realize();
												dialog.getModalHeader().hide();
												dialog.getModalFooter().hide();
												dialog.getModalBody().css('background-color', '#FFF');
												dialog.getModalBody().css('color', '#F00');
												dialog.open();
											}
									}
								});
							}
						}, {
							label: 'No',
							icon: 'glyphicon glyphicon-ban-circle',
							cssClass: "btn-sm btn-danger",
							action: function(dialog) {
								dialog.close();
								event.data.dialogRef.close();
							}
						}]
					});
			}
			else {
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_NORMAL,
					message: function(dialogRef){
						var $message = $("<h4 class='text-center text-danger'>"+res_data[0]+"<br></h4>");
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}

		}
	});


}

function cancelRequest()
{
	var caType = $('[name="caType"]:checked').val();
    var amtFigures = $('[name="amtFigures"]').val();
	var empRemarks = $('[name="empRemarks"]').val();


	if(amtFigures == '0.00' && !caType && !empRemarks){
		var dialog = new BootstrapDialog({
			size: BootstrapDialog.SIZE_SMALL,
            message: function(dialogRef){
                var $message = $('<h3 class="text-center text-danger">Nothing to cancel!</h3>');
                var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
                $button.on('click', {dialogRef: dialogRef}, function(event){
                    event.data.dialogRef.close();
                });
                $message.append($button);

                return $message;
            },
            closable: false
        });
        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('background-color', '#FFF');
        dialog.getModalBody().css('color', '#F00');
        dialog.open();
	}
	else{
		BootstrapDialog.show({
		title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
		type: BootstrapDialog.TYPE_DANGER,
		size: BootstrapDialog.SIZE_SMALL,
		closable:false,
		draggable:true,
		message: 'Are you sure to cancel this request?',
		buttons: [{
			label: 'Yes',
			icon: 'glyphicon glyphicon-ok',
			cssClass: "btn-sm btn-success",
			action: function(dialog) {
				  window.location.reload();
			}
		}, {
			label: 'No',
			icon: 'glyphicon glyphicon-ban-circle',
			cssClass: "btn-sm btn-danger",
			action: function(dialog) {
				dialog.close();
			}
		}]
	});
	}
}

function cboxAll(){

        $(".cbox_").prop("checked",true);

    }

function uncboxAll(){

        $(".cbox_").prop("checked",false);

}


function viewRequest(){

	 var a = document.getElementsByName('chck[]');
	 var tempD = "";
	 var temp = "";
	 var y = 0;
	 var catype = "";
	 var amt_temp = "";



	for(var i = 0;i<a.length;i++) {
		if(a[i].checked == true) {
			tempE = a[i].value;

			if(tempE != ""){
				tempD = "True";
			}

			temp += tempE +"&";
			catype = $("table  tr  td[class^='cattype_"+a[i].value+"']").html().trim(); 		//ca type sa datatables
			amt_temp += $("#amtf_"+a[i].value).html().trim() + "&";
			y++;

		}
	}

	if(tempD == ""){
		var dialog = new BootstrapDialog({
			size: BootstrapDialog.SIZE_SMALL,
			message: function(dialogRef){
				var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
				var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
				$button.on('click', {dialogRef: dialogRef}, function(event){
					event.data.dialogRef.close();
				});
				$message.append($button);

				return $message;
			},
			closable: false
		});
		dialog.realize();
		dialog.getModalHeader().hide();
		dialog.getModalFooter().hide();
		dialog.getModalBody().css('background-color', '#FFF');
		dialog.getModalBody().css('color', '#F00');
		dialog.open();
	}
	else {
			var $data = temp.split('&');
			var $content = $("<div class='row' style='height:350px;overflow-y:scroll'></div>");
			var $no = 1;
			var dlength = $data.length-1;
			for(var x=0;x<$data.length-1;x++){
				var $bal = $("#bal_"+$data[x]).html().trim().split('*');
				if ($bal[0] == 0) { $bal[0] = '0.00';}
				if ($bal[1] == 0) { $bal[1] = '0.00';}
				$content.append('<div class="col-xs-12 col-md-12">'+
										'<div class="row">'+
											'<div class="col-md-6 form-group">'+
												'<label style="font-family:calibri;">'+$no+'. Name: <label class="text-danger">'+$("#empname_"+$data[x]).html().trim()+'</label></label><br>'+
												'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Amount Requested: <label class="text-danger">&#8369; '+$("#amtf_"+$data[x]).html().trim()+'</label></label><br>'+
												"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Employee's Reason: <label class='text-danger'>"+$('#remarks_'+$data[x]).html().trim()+"</label></label><br>"+
											'</div>'+
											'<div class="col-md-6 form-group">'+
												'<label style="font-family:calibri;">Outstanding CA Balances:</label><br>'+
												'<label style="font-family:calibri;">Regular CA Balance: <label class="text-danger">&#8369; '+$bal[0]+'</label></label><br>'+
												// "<label style='font-family:calibri;'>Special CA Balance: <label class='text-danger'>&#8369;</label></label>
												"<br>"+
											'</div>'+
										'</div>'+

										'<div class="row">'+
											'<div style="margin-left:13px; margin-top:-15px; padding-left:15px; padding-right:23px;">'+
												'<div class="col-md-12 form-group">'+
													'<label style="font-family:calibri;">Approval Remarks / Disapproval Reason :</label>'+
													'<textarea class="form-control" name="remson[]"></textarea>'+
													'<input type="hidden" value="'+$data[x]+'" name="careq_idAppDis[]">'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'+
								 '</div>');
				$no++;
			}
			BootstrapDialog.show({
				title: '<span class="glyphicon glyphicon-zoom-in"></span> View '+y+' record(s) of Cash Advance Request',
				type: BootstrapDialog.TYPE_PRIMARY,
				size: BootstrapDialog.SIZE_NORMAL,
				closable:false,
				draggable:true,
				message: $content,
				buttons: [{
					label: 'Approve',
					icon: 'glyphicon glyphicon-ok',
					cssClass: "btn-sm btn-success",
					action: function(dialog) {
						var a = document.getElementsByName('remson[]');
						var b = document.getElementsByName('careq_idAppDis[]');
						var remson = '';
						var careq_id = '';
						var y = 0;

						for(var c = 0;c<a.length;c++) {
							if(a[c].value.trim()) {
								remson += a[c].value+'&';
								careq_id += b[c].value+'&';
								y++
							}
						}
						if(y == 0) {
							BootstrapDialog.show({
								type: BootstrapDialog.TYPE_DANGER,
								size: BootstrapDialog.SIZE_SMALL,
								title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
								message: "<center>Please don't leave empty fields.</center>",
								closable: false,
								buttons: [{
									label: 'Ok',
									cssClass: 'btn-primary btn-sm',
									icon: 'glyphicon glyphicon-ok',
									action: function(dialog1){
										dialog1.close();
									}
								}]
							});
						}
						else if(y != a.length){
							BootstrapDialog.show({
								type: BootstrapDialog.TYPE_DANGER,
								size: BootstrapDialog.SIZE_SMALL,
								title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
								message: "<center>Please don't leave empty fields.</center>",
								closable: false,
								buttons: [{
									label: 'Ok',
									cssClass: 'btn-default btn-sm',
									icon: 'glyphicon glyphicon-ok',
									action: function(dialog1){
										dialog1.close();
									}
								}]
							});
						}
						else {
							BootstrapDialog.show({
								type: BootstrapDialog.TYPE_DANGER,
								size: BootstrapDialog.SIZE_SMALL,
								title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
								message: '<center>Are you sure you want to approve this request?</center>',
								closable: false,
								buttons: [{
									label: 'Yes',
									cssClass: 'btn-success btn-sm',
									icon: 'glyphicon glyphicon-ok',
									action: function(dialog2){
										var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
										$button.disable();
										$button.spin();
										$.ajax({
											type:"POST",
											url:"template/CashAdvance/save_request.php?request=saveCA",
											data:{careq_id:careq_id,remson:remson,catype:catype,amt:amt_temp},
											success:function(data){
												if(data == "Ok"){
													var dialog = new BootstrapDialog({
														size: BootstrapDialog.SIZE_SMALL,
														message: function(dialogRef){
															var $message = $('<h3 class="text-center text-success">Successfully Approved!</h3>');
															var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
															$button.on('click', {dialogRef: dialogRef}, function(event){
																event.data.dialogRef.close();
																window.location.reload();
															});
															$message.append($button);

															return $message;
														},
														closable: false
													});
													dialog.realize();
													dialog.getModalHeader().hide();
													dialog.getModalFooter().hide();
													dialog.getModalBody().css('background-color', '#FFF');
													dialog.getModalBody().css('color', '#F00');
													dialog.open();
												}
												else {
													alert(data);
												}
											}
										});
									}
								},{
									label: 'No',
									cssClass: 'btn-danger btn-sm',
									icon: 'glyphicon glyphicon-remove',
									action: function(dialog2){
										dialog2.close();
									}
								}]
							});
						}
					}
				},{
					label: 'Disapprove',
					icon: 'glyphicon glyphicon-trash',
					cssClass: "btn-sm btn-primary",
					action: function(dialog) {
							var a = document.getElementsByName('remson[]');
							var b = document.getElementsByName('careq_idAppDis[]');
							var remson = '';
							var careq_id = '';
							var y = 0;

							for(var c = 0;c<a.length;c++) {
								if(a[c].value.trim()) {
									remson += a[c].value+'&';
									careq_id += b[c].value+'&';
									y++
								}
							}
							if(y == 0) {
								BootstrapDialog.show({
									type: BootstrapDialog.TYPE_DANGER,
									size: BootstrapDialog.SIZE_SMALL,
									title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
									message: "<center>Please don't leave empty fields.</center>",
									closable: false,
									buttons: [{
										label: 'Ok',
										cssClass: 'btn-primary btn-sm',
										icon: 'glyphicon glyphicon-ok',
										action: function(dialog1){
											dialog1.close();
										}
									}]
								});
							}
							else if(y != a.length){
								BootstrapDialog.show({
									type: BootstrapDialog.TYPE_DANGER,
									size: BootstrapDialog.SIZE_SMALL,
									title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
									message: "<center>Please don't leave empty fields.</center>",
									closable: false,
									buttons: [{
										label: 'Ok',
										cssClass: 'btn-default btn-sm',
										icon: 'glyphicon glyphicon-ok',
										action: function(dialog1){
											dialog1.close();
										}
									}]
								});
							}
							else {
								BootstrapDialog.show({
									type: BootstrapDialog.TYPE_DANGER,
									size: BootstrapDialog.SIZE_SMALL,
									title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
									message: '<center>Are you sure you want to decline this request?</center>',
									closable: false,
									buttons: [{
										label: 'Yes',
										cssClass: 'btn-success btn-sm',
										icon: 'glyphicon glyphicon-ok',
										action: function(dialog2){
											var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
											$button.disable();
											$button.spin();
											$.ajax({
												type:"POST",
												url:"template/CashAdvance/decline_request.php?request=declineCA",
												data:{careq_id:careq_id,remson:remson,catype:catype},
												success:function(data){
													if(data == "Ok"){
														var dialog = new BootstrapDialog({
															size: BootstrapDialog.SIZE_SMALL,
															message: function(dialogRef){
																var $message = $('<h3 class="text-center text-success">Successfully Declined!</h3>');
																var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
																$button.on('click', {dialogRef: dialogRef}, function(event){
																	event.data.dialogRef.close();
																	window.location.reload();
																});
																$message.append($button);

																return $message;
															},
															closable: false
														});
														dialog.realize();
														dialog.getModalHeader().hide();
														dialog.getModalFooter().hide();
														dialog.getModalBody().css('background-color', '#FFF');
														dialog.getModalBody().css('color', '#F00');
														dialog.open();
													}
													else {
														alert(data);
													}
												}
											});
										}
									},{
										label: 'No',
										cssClass: 'btn-danger btn-sm',
										icon: 'glyphicon glyphicon-remove',
										action: function(dialog2){
											dialog2.close();
										}
									}]
								});
							}
					}
				},{
					label: 'Close',
					icon: 'glyphicon glyphicon-ban-circle',
					cssClass: "btn-sm btn-danger",
					action: function(dialog) {
						dialog.close();
					}
				}]
			});
	}
}


function viewReviewed(){

		 var a = document.getElementsByName('chck[]');
		 var tempD = "";
		 var temp = "";
		 var y = 0;
		 var catype = "";
		 var amt = "";



		for(var i = 0;i<a.length;i++) {
			if(a[i].checked == true) {
				tempE = a[i].value;

				if(tempE != ""){
					tempD = "True";
				}

				temp += tempE +"&&";
				catype = $("table  tr  td[class^='cattype_"+a[i].value+"']").html().trim(); 		//ca type sa datatables
				amt = $("#amtf_"+a[i].value).html().trim();
				y++;
			}
		}

			if(tempD == ""){
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_SMALL,
					message: function(dialogRef){
						var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else {
				var $data = temp.split('&&');
					var $content = $("<div class='row' style='height:350px;overflow-y:scroll'></div>");
					var $no = 1;
					var dlength = $data.length-1;
					for(var x=0;x<$data.length-1;x++){
						$content.append('<div class="col-xs-12 col-md-12">'+
													'<div class="form-group">'+
														'<label style="font-family:calibri;">'+$no+'. Name: <label class="text-danger">'+$("#empname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Amount Requested: <label class="text-danger">P'+$("#amtf_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Employee's Remark: <label class='text-danger'>"+$('#empremarks_'+$data[x]).html().trim()+"</label></label><br>"+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Reviewed by: <label class="text-danger">'+$("#supname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Date & Time Reviewed: <label class="text-danger">'+$("#datetime_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Supervisor's Remark: <label class='text-danger'>"+$('#supremarks_'+$data[x]).html().trim()+"</label></label><br>"+
													'</div>'+
												'</div>');
						$no++;
					}
				BootstrapDialog.show({
					title: '<span class="glyphicon glyphicon-zoom-in"></span> View '+y+' record(s) of Cash Advance Request',
					type: BootstrapDialog.TYPE_PRIMARY,
					size: BootstrapDialog.SIZE_NORMAL,
					closable:false,
					draggable:true,
					message: $content,
					buttons: [{
						label: 'Close',
						icon: 'glyphicon glyphicon-ban-circle',
						cssClass: "btn-sm btn-danger",
						action: function(dialog) {
							dialog.close();
						}
					}]
				});
			}
}

function saveBal()
{
    var a = document.getElementsByName('chck[]');
	var b = document.getElementsByName('balSpecial[]');
	var tempD = "";
	var temp = "";
	var y = 0;
	var balSpecial = "";
	var emp_id = "";



	for(var i = 0;i<a.length;i++) {
		if(a[i].checked == true) {
			emp_id += a[i].value+"&";
			balSpecial += b[i].value+"&";

			y++;
		}
	}

		if(y == 0){
			var dialog = new BootstrapDialog({
				size: BootstrapDialog.SIZE_SMALL,
				message: function(dialogRef){
					var $message = $('<h3 class="text-center text-danger">Please select first.<br>Thank you.</h3>');
					var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
					$button.on('click', {dialogRef: dialogRef}, function(event){
						event.data.dialogRef.close();
					});
					$message.append($button);

					return $message;
				},
				closable: false
			});
			dialog.realize();
			dialog.getModalHeader().hide();
			dialog.getModalFooter().hide();
			dialog.getModalBody().css('background-color', '#FFF');
			dialog.getModalBody().css('color', '#F00');
			dialog.open();
		}
		else {

				BootstrapDialog.show({
				type: BootstrapDialog.TYPE_DANGER,
				size: BootstrapDialog.SIZE_SMALL,
				title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
				message: '<center>Are you sure you want to submit? </center>',
				closable: false,
				buttons: [{
					label: 'Yes',
					cssClass: 'btn-success btn-sm',
					icon: 'glyphicon glyphicon-ok',
					action: function(dialog2){
						var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
						$button.disable();
						$button.spin();
						$.ajax({
							type:"POST",
							url:"template/CashAdvance/save_balance.php?input=saveBal",
							data:{emp_id:emp_id,balSpecial:balSpecial},
							success:function(data){
								if(data == ""){
									var dialog = new BootstrapDialog({
										size: BootstrapDialog.SIZE_SMALL,
										message: function(dialogRef){
											var $message = $('<h3 class="text-center text-success">Successfully Saved!</h3>');
											var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
											$button.on('click', {dialogRef: dialogRef}, function(event){
												event.data.dialogRef.close();
												window.location.reload();
											});
											$message.append($button);

											return $message;
										},
										closable: false
									});
									dialog.realize();
									dialog.getModalHeader().hide();
									dialog.getModalFooter().hide();
									dialog.getModalBody().css('background-color', '#FFF');
									dialog.getModalBody().css('color', '#F00');
									dialog.open();
								}
								else {
									var dialog = new BootstrapDialog({
                                        size: BootstrapDialog.SIZE_SMALL,
                                        message: function(dialogRef){
                                            var $message = $('<h3 class="text-center text-danger">Duplicate<br>Employee ID(s) :<br><br>'+data+'</h3>');
                                            var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                                            $button.on('click', {dialogRef: dialogRef}, function(event){
                                                // event.data.dialogRef.close();
                                                 BootstrapDialog.closeAll();
                                                // window.location.reload();
                                            });
                                            $message.append($button);

                                            return $message;
                                        },
                                        closable: false
                                    });
                                    dialog.realize();
                                    dialog.getModalHeader().hide();
                                    dialog.getModalFooter().hide();
                                    dialog.getModalBody().css('background-color', '#FFF');
                                    dialog.getModalBody().css('color', '#F00');
                                    dialog.open();
								}
							}
						});
					}
				},{
					label: 'No',
					cssClass: 'btn-danger btn-sm',
					icon: 'glyphicon glyphicon-remove',
					action: function(dialog2){
						dialog2.close();
					}
				}]
			});
		}
}

function viewAcctgDetails(){

		 var a = document.getElementsByName('chck[]');
		 var tempD = "";
		 var temp = "";
		 var y = 0;
		 var catype = "";
		 var amt = "";



		for(var i = 0;i<a.length;i++) {
			if(a[i].checked == true) {
				tempE = a[i].value;

				if(tempE != ""){
					tempD = "True";
				}

				temp += tempE +"&&";
				catype = $("table  tr  td[class^='cattype_"+a[i].value+"']").html().trim(); 		//ca type sa datatables
				amt = $("#amtf_"+a[i].value).html().trim();
				y++;
			}
		}

			if(tempD == ""){
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_SMALL,
					message: function(dialogRef){
						var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else {
				var $data = temp.split('&&');
					var $content = $("<div class='row' style='height:350px;overflow-y:scroll'></div>");
					var $no = 1;
					var dlength = $data.length-1;
					for(var x=0;x<$data.length-1;x++){
						$content.append('<div class="col-xs-12 col-md-12">'+
													'<div class="form-group">'+
														'<label style="font-family:calibri;">'+$no+'. Name: <label class="text-danger">'+$("#empname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Amount Requested: <label class="text-danger">P'+$("#amtf_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Date & Time Requested: <label class="text-danger">'+$("#datetime_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Employee's Remark: <label class='text-danger'>"+$('#empremarks_'+$data[x]).html().trim()+"</label></label><br>"+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Reviewed by: <label class="text-danger">'+$("#supname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Date & Time Reviewed: <label class="text-danger">'+$("#datetime1_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Supervisor's Remark: <label class='text-danger'>"+$('#supremarks_'+$data[x]).html().trim()+"</label></label><br>"+
													'</div>'+
												'</div>');
						$no++;
					}
				BootstrapDialog.show({
					title: '<span class="glyphicon glyphicon-zoom-in"></span> View '+y+' record(s) of Cash Advance Request',
					type: BootstrapDialog.TYPE_PRIMARY,
					size: BootstrapDialog.SIZE_NORMAL,
					closable:false,
					draggable:true,
					message: $content,
					buttons: [{
						label: 'Close',
						icon: 'glyphicon glyphicon-ban-circle',
						cssClass: "btn-sm btn-danger",
						action: function(dialog) {
							dialog.close();
						}
					}]
				});
			}
}

function incorApprove()
{
    var a = document.getElementsByName('chck[]');
	var b = document.getElementsByName('amtFigures[]');
	var d = document.getElementsByName('incorRemarks[]');
	var c = document.getElementsByName('terms[]');

	var tempD = "";
	var temp = "";
	var x = 0;
	var y = 0;
	var amtFigures = "";
	var incorRemarks = "";
	var careq_id = "";
	var terms = "";



	for(var i = 0;i<a.length;i++) {
		if(a[i].checked == true) {
			careq_id += a[i].value+"&";
			amtFigures += b[i].value+"&";
			incorRemarks += d[i].value+"&";
			terms += c[i].value+"&";
			if(d[i].value.trim()){
				x++;
			}
			y++;
		}
	}

		if(y == 0){
			var dialog = new BootstrapDialog({
				size: BootstrapDialog.SIZE_SMALL,
				message: function(dialogRef){
					var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
					var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
					$button.on('click', {dialogRef: dialogRef}, function(event){
						event.data.dialogRef.close();
					});
					$message.append($button);

					return $message;
				},
				closable: false
			});
			dialog.realize();
			dialog.getModalHeader().hide();
			dialog.getModalFooter().hide();
			dialog.getModalBody().css('background-color', '#FFF');
			dialog.getModalBody().css('color', '#F00');
			dialog.open();
		}
		else {

				BootstrapDialog.show({
				type: BootstrapDialog.TYPE_DANGER,
				size: BootstrapDialog.SIZE_SMALL,
				title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
				message: '<center>Are you sure you want to submit? </center>',
				closable: false,
				buttons: [{
					label: 'Yes',
					cssClass: 'btn-success btn-sm',
					icon: 'glyphicon glyphicon-ok',
					action: function(dialog2){
						var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
						$button.disable();
						$button.spin();
						$.ajax({
							type:"POST",
							url:"template/CashAdvance/approve_amount.php?approve=amount",
							// data:{careq_id:careq_id,amtFigures:amtFigures,incorRemarks:incorRemarks},
							data:{careq_id:careq_id,amtFigures:amtFigures,incorRemarks:incorRemarks,terms:terms},
							success:function(data){
								if(data == "Ok"){
									var dialog = new BootstrapDialog({
										size: BootstrapDialog.SIZE_SMALL,
										message: function(dialogRef){
											var $message = $('<h3 class="text-center text-success">Successfully Approved!</h3>');
											var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
											$button.on('click', {dialogRef: dialogRef}, function(event){
												event.data.dialogRef.close();
												window.location.reload();
											});
											$message.append($button);

											return $message;
										},
										closable: false
									});
									dialog.realize();
									dialog.getModalHeader().hide();
									dialog.getModalFooter().hide();
									dialog.getModalBody().css('background-color', '#FFF');
									dialog.getModalBody().css('color', '#F00');
									dialog.open();
								}
								else {
									var dialog = new BootstrapDialog({
									size: BootstrapDialog.SIZE_SMALL,
									message: function(dialogRef){
										var $message = $('<h3 class="text-center text-success">'+data+'<br></h3>');
										var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
										$button.on('click', {dialogRef: dialogRef}, function(event){
											event.data.dialogRef.close();
											window.location.reload();
										});
										$message.append($button);

										return $message;
									},
									closable: false
								});
								dialog.realize();
								dialog.getModalHeader().hide();
								dialog.getModalFooter().hide();
								dialog.getModalBody().css('background-color', '#FFF');
								dialog.getModalBody().css('color', '#F00');
								dialog.open();
								}
							}
						});
					}
				},{
					label: 'No',
					cssClass: 'btn-danger btn-sm',
					icon: 'glyphicon glyphicon-remove',
					action: function(dialog2){
						dialog2.close();
					}
				}]
			});
		}
}

function incorDisapprove(){

	var a = document.getElementsByName('chck[]');
	var b = document.getElementsByName('incorRemarks[]');

	var careq_id = '';
	var incorRemarks = "";
	var y = 0;


	for(var i = 0;i<a.length;i++) {
		if(a[i].checked == true) {
			careq_id += a[i].value+"&";
			incorRemarks += b[i].value+"&";
			y++;
		}
	}

	if(y == 0){
		var dialog = new BootstrapDialog({
			size: BootstrapDialog.SIZE_SMALL,
			message: function(dialogRef){
				var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
				var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
				$button.on('click', {dialogRef: dialogRef}, function(event){
					event.data.dialogRef.close();
				});
				$message.append($button);

				return $message;
			},
			closable: false
		});
		dialog.realize();
		dialog.getModalHeader().hide();
		dialog.getModalFooter().hide();
		dialog.getModalBody().css('background-color', '#FFF');
		dialog.getModalBody().css('color', '#F00');
		dialog.open();
	}
	else{
			BootstrapDialog.show({
			type: BootstrapDialog.TYPE_DANGER,
			size: BootstrapDialog.SIZE_SMALL,
			title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
			message: '<center>Are you sure you want to decline? </center>',
			closable: false,
			buttons: [{
				label: 'Yes',
				cssClass: 'btn-success btn-sm',
				icon: 'glyphicon glyphicon-ok',
				action: function(dialog2){
					var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
					$button.disable();
					$button.spin();
					$.ajax({
						type:"POST",
						url:"template/CashAdvance/decline_request.php?request=declineCA",
						data:{careq_id:careq_id,incorRemarks:incorRemarks},
						success:function(data){
							if(data == "Ok"){
								var dialog = new BootstrapDialog({
									size: BootstrapDialog.SIZE_SMALL,
									message: function(dialogRef){
										var $message = $('<h3 class="text-center text-success">Successfully Declined!</h3>');
										var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
										$button.on('click', {dialogRef: dialogRef}, function(event){
											event.data.dialogRef.close();
											window.location.reload();
										});
										$message.append($button);

										return $message;
									},
									closable: false
								});
								dialog.realize();
								dialog.getModalHeader().hide();
								dialog.getModalFooter().hide();
								dialog.getModalBody().css('background-color', '#FFF');
								dialog.getModalBody().css('color', '#F00');
								dialog.open();
							}
							else {
								var dialog = new BootstrapDialog({
									size: BootstrapDialog.SIZE_SMALL,
									message: function(dialogRef){
										var $message = $('<h3 class="text-center text-success">'+data+'<br></h3>');
										var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
										$button.on('click', {dialogRef: dialogRef}, function(event){
											event.data.dialogRef.close();
											window.location.reload();
										});
										$message.append($button);

										return $message;
									},
									closable: false
								});
								dialog.realize();
								dialog.getModalHeader().hide();
								dialog.getModalFooter().hide();
								dialog.getModalBody().css('background-color', '#FFF');
								dialog.getModalBody().css('color', '#F00');
								dialog.open();
							}
						}
					});
				}
			},{
				label: 'No',
				cssClass: 'btn-danger btn-sm',
				icon: 'glyphicon glyphicon-remove',
				action: function(dialog2){
					dialog2.close();
				}
			}]
		});
	}

}

// {
	// label: 'Disapprove',
	// icon: 'glyphicon glyphicon-trash',
	// cssClass: "btn-sm btn-primary",
	// action: function(dialog) {
			// var a = document.getElementsByName('reason[]');
			// var b = document.getElementsByName('careq_idDis[]');
			// var reason = '';
			// var careq_id = '';
			// var y = 0;

			// for(var c = 0;c<a.length;c++) {
				// if(a[c].value.trim()) {
					// reason += a[c].value+'&';
					// careq_id += b[c].value+'&';
					// y++
				// }
			// }
			// if(y == 0) {
				// BootstrapDialog.show({
					// type: BootstrapDialog.TYPE_DANGER,
					// size: BootstrapDialog.SIZE_SMALL,
					// title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
					// message: "<center>Please don't leave empty fields!</center>",
					// closable: false,
					// buttons: [{
						// label: 'Ok',
						// cssClass: 'btn-primary btn-sm',
						// icon: 'glyphicon glyphicon-ok',
						// action: function(dialog1){
							// dialog1.close();
						// }
					// }]
				// });
			// }
			// else if(y != a.length){
				// BootstrapDialog.show({
					// type: BootstrapDialog.TYPE_DANGER,
					// size: BootstrapDialog.SIZE_SMALL,
					// title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
					// message: "<center>Please don't leave empty fields!</center>",
					// closable: false,
					// buttons: [{
						// label: 'Ok',
						// cssClass: 'btn-default btn-sm',
						// icon: 'glyphicon glyphicon-ok',
						// action: function(dialog1){
							// dialog1.close();
						// }
					// }]
				// });
			// }
			// else {
				// BootstrapDialog.show({
					// type: BootstrapDialog.TYPE_DANGER,
					// size: BootstrapDialog.SIZE_SMALL,
					// title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
					// message: '<center>Are you sure you want to decline this request?</center>',
					// closable: false,
					// buttons: [{
						// label: 'Yes',
						// cssClass: 'btn-success btn-sm',
						// icon: 'glyphicon glyphicon-ok',
						// action: function(dialog2){
							// var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
							// $button.disable();
							// $button.spin();
							// $.ajax({
								// type:"POST",
								// url:"template/CashAdvance/decline_request.php?request=declineCA",
								// data:{careq_id:careq_id,reason:reason,catype:catype},
								// success:function(data){
									// if(data == "Ok"){
										// var dialog = new BootstrapDialog({
											// size: BootstrapDialog.SIZE_SMALL,
											// message: function(dialogRef){
												// var $message = $('<h3 class="text-center text-success">Successfully Declined!</h3>');
												// var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
												// $button.on('click', {dialogRef: dialogRef}, function(event){
													// event.data.dialogRef.close();
													// window.location.reload();
												// });
												// $message.append($button);

												// return $message;
											// },
											// closable: false
										// });
										// dialog.realize();
										// dialog.getModalHeader().hide();
										// dialog.getModalFooter().hide();
										// dialog.getModalBody().css('background-color', '#FFF');
										// dialog.getModalBody().css('color', '#F00');
										// dialog.open();
									// }
									// else {
										// alert(data);
									// }
								// }
							// });
						// }
					// },{
						// label: 'No',
						// cssClass: 'btn-danger btn-sm',
						// icon: 'glyphicon glyphicon-remove',
						// action: function(dialog2){
							// dialog2.close();
						// }
					// }]
				// });
			// }
	// }
// }

function viewIncorDetails(){

		 var a = document.getElementsByName('chck[]');
		 var tempD = "";
		 var temp = "";
		 var y = 0;
		 var catype = "";
		 var amt = "";



		for(var i = 0;i<a.length;i++) {
			if(a[i].checked == true) {
				tempE = a[i].value;

				if(tempE != ""){
					tempD = "True";
				}

				temp += tempE +"&&";
				catype = $("table  tr  td span[class^='cattype_"+a[i].value+"']").html().trim(); 		//ca type sa datatables
				amt = $("#amtf_"+a[i].value).html().trim();
				y++;
			}
		}

			if(tempD == ""){
				var dialog = new BootstrapDialog({
					size: BootstrapDialog.SIZE_SMALL,
					message: function(dialogRef){
						var $message = $('<h3 class="text-center text-danger">Please select first.</h3>');
						var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
						$button.on('click', {dialogRef: dialogRef}, function(event){
							event.data.dialogRef.close();
						});
						$message.append($button);

						return $message;
					},
					closable: false
				});
				dialog.realize();
				dialog.getModalHeader().hide();
				dialog.getModalFooter().hide();
				dialog.getModalBody().css('background-color', '#FFF');
				dialog.getModalBody().css('color', '#F00');
				dialog.open();
			}
			else {
				var $data = temp.split('&&');
					var $content = $("<div class='row' style='height:350px;overflow-y:scroll'></div>");
					var $no = 1;
					var dlength = $data.length-1;
					for(var x=0;x<$data.length-1;x++){
						$content.append('<div class="col-xs-12 col-md-12">'+
													'<div class="form-group">'+
														'<label style="font-family:calibri;">'+$no+'. Name: <label class="text-danger">'+$("#empname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Employee Type: <label class="text-danger">'+$("#emptype_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Cash Advance Type: <label class="text-danger">'+$("#catype_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Amount Requested: <label class="text-danger">P'+$("#amtf_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Date & Time Requested: <label class="text-danger">'+$("#datetimereq_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Employee's Remark: <label class='text-danger'>"+$('#empremarks_'+$data[x]).html().trim()+"</label></label><br>"+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Status: <label class="text-danger">'+$("#status_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Reviewed by: <label class="text-danger">'+$("#supname_"+$data[x]).html().trim()+'</label></label><br>'+
														'<label style="font-family:calibri;">&nbsp;&nbsp;&nbsp;&nbsp;Date & Time Reviewed: <label class="text-danger">'+$("#datetimerev_"+$data[x]).html().trim()+'</label></label><br>'+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Supervisor's Remark: <label class='text-danger'>"+$('#supremarks_'+$data[x]).html().trim()+"</label></label><br>"+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Regular CA Balance: <label class='text-danger'>P"+$('#regbal_'+$data[x]).html().trim()+"</label></label><br>"+
														"<label style='font-family:calibri;'>&nbsp;&nbsp;&nbsp;&nbsp;Special CA Balance: <label class='text-danger'>P"+$('#specbal_'+$data[x]).html().trim()+"</label></label><br>"+
													'</div>'+
												'</div>');
						$no++;
					}
					BootstrapDialog.show({
					title: '<span class="glyphicon glyphicon-zoom-in"></span> View '+y+' record(s) of Cash Advance Request',
					type: BootstrapDialog.TYPE_PRIMARY,
					size: BootstrapDialog.SIZE_NORMAL,
					closable:false,
					draggable:true,
					message: $content,
					buttons: [{
						label: 'Close',
						icon: 'glyphicon glyphicon-ban-circle',
						cssClass: "btn-sm btn-danger",
						action: function(dialog) {
							dialog.close();
						}
					}]
				});
			}
}

function ackReport(nameoff)
{
	BootstrapDialog.show({
		title: '',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../accounting/template/CashAdvance/ackreport_view.php?getdata='+nameoff
        },

		buttons: [{
				label: 'Close',
				icon: 'glyphicon glyphicon-remove',
				cssClass: "btn-sm btn-danger",
				action: function(dialog) {
					dialog.close();
				}
			}]

    });
}

function debtors_lists()
{
    BootstrapDialog.show({
		title: ' ',
    	type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../accounting/template/CashAdvance/debtors_lists_view.php'
        },

		buttons: [{
				label: 'Close',
				icon: 'glyphicon glyphicon-remove',
				cssClass: "btn-sm btn-danger",
				action: function(dialog) {
					dialog.close();
				}
			}]
    });
}

function dedDetails(nameoff)
{
    BootstrapDialog.show({
		title: 'Deduction Details',
    	type: BootstrapDialog.TYPE_PRIMARY,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../accounting/template/CashAdvance/deduction_details.php?getData='+nameoff
        }
    });
}

function ledDetails(nameoff)
{

	var data_choose = nameoff.split('*')

    BootstrapDialog.show({
		title: "&nbsp;"+"<img src=../../hrms/"+data_choose[0]+" width='60px'>&nbsp;&nbsp;Ledger of " +data_choose[2]+"&nbsp;"+data_choose[3],
    	type: BootstrapDialog.TYPE_PRIMARY,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../supervisor/template/CashAdvance/ledger_details.php?getData='+data_choose[1]
        }
    });
}

function ledDetails2(nameoff)
{

	var data_choose = nameoff.split('*')

    BootstrapDialog.show({
		title: "&nbsp;"+"<img src=../../hrms/"+data_choose[0]+" width='60px'>&nbsp;&nbsp;Ledger of " +data_choose[2]+"&nbsp;"+data_choose[3],
    	type: BootstrapDialog.TYPE_PRIMARY,
		size: BootstrapDialog.SIZE_WIDE,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../incorporator/template/CashAdvance/ledger_details.php?getData='+data_choose[1]
        }
    });
}

function viewCABalance(nameoff)
{

	var data_choose = nameoff.split('|')

    BootstrapDialog.show({
		title: "<div class='col-xs-2'>"+"<center><img src=../../hrms/"+data_choose[0]+" width='60px'></center></div><div class='col-xs-10'><span>Outstanding Balances of</span><label style='width:450px;'>" +data_choose[2]+"&nbsp;["+data_choose[1]+"]</label></div>",
    	type: BootstrapDialog.TYPE_PRIMARY,
		size: BootstrapDialog.SIZE_NORMAL,
		closable: false,
		draggable: true,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: {
            'pageToLoad': '../incorporator/template/CashAdvance/ca_balance_details.php?getData='+data_choose[3]
        }
    });
}


// LOCATE ALL NEEDED


function getBusinessName(){

  var code_C = $("[name='code']").val();

  // $(".loadImg1").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

  //displaying business unit
  $.ajax({
    type:"POST",
    url:"../accounting/template/CashAdvance/formLoader.php?request=load_bU",
    data : { code_C:code_C },
    success:function(data){
      data = data.trim();
      // $(".loadImg1").hide();
      // $("#bu").hide();
      // $(".business_unit").html(data);
      $("#bu").html(data);
  //<!--------------- hide if the selected is no value ---------------------->
        if(code_C == ""){
        // $("#bu").show();
        // $(".business_unit").html('');
        $("#bu").html(data);
        }
    }
  });//end ajax
} //end function getBusinessName

function getDepartment(){
  //update Oct. 10 //used in piConSetup.php

  var code_C = $("[name = 'code']").val();
  var b_code = $("[name = 'b_code']").val();

  // $(".loadImg2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

  $.ajax({
    type:"POST",
    url:"../accounting/template/CashAdvance/formLoader.php?request=load_department",
    data : { code_C:code_C, b_code:b_code },
    success:function(data){
      data = data.trim();
      // $(".loadImg2").hide();
      // $("#dept").hide();
      // $(".company").html(data)
      $("#dept").html(data);
  //<!--------------- hide if the selected is no value -------------------------->
        if(b_code == ""){
          // $("#dept").show();
          // $(".company").html('');
          $("#dept").html('');
        }
    }
  }); //end ajax
}  //end function getDepartment

function getSection(){
  //update Oct. 10 //used in piConSetup.php

  var code_C = $("[name = 'code']").val();
  var b_code = $("[name = 'b_code']").val();
  var dept_code = $("[name = 'dept_code']").val();

  // $(".loadImg2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

  $.ajax({
    type:"POST",
    url:"../accounting/template/CashAdvance/formLoader.php?request=load_section",
    data : { code_C:code_C, b_code:b_code, dept_code:dept_code },
    success:function(data){
      data = data.trim();
      // $(".loadImg2").hide();
      // $("#dept").hide();
      // $(".company").html(data)
      $("#sec").html(data);
  //<!--------------- hide if the selected is no value -------------------------->
        if(b_code == ""){
          // $("#dept").show();
          // $(".company").html('');
          $("#sec").html('');
        }
    }
  }); //end ajax
}  //end function getSection

function getSubSection(){
  //update Oct. 10 //used in piConSetup.php

  var code_C = $("[name = 'code']").val();
  var b_code = $("[name = 'b_code']").val();
  var dept_code = $("[name = 'dept_code']").val();
  var sec_code = $("[name = 'sec_code']").val();

  // $(".loadImg2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

  $.ajax({
    type:"POST",
    url:"../accounting/template/CashAdvance/formLoader.php?request=load_subsection",
    data : { code_C:code_C, b_code:b_code, dept_code:dept_code, sec_code:sec_code },
    success:function(data){
      data = data.trim();
      // $(".loadImg2").hide();
      // $("#dept").hide();
      // $(".company").html(data)
      $("#ssec").html(data);
  //<!--------------- hide if the selected is no value -------------------------->
        if(b_code == ""){
          // $("#dept").show();
          // $(".company").html('');
          $("#ssec").html('');
        }
    }
  }); //end ajax
}  //end function getSection

function comp_c(){

	var code_C = $("[name = 'code']").val();

	$(".showEmp")	.html("");

		$(".resp1").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

			//displaying business unit
			$.ajax({
			type:"POST",
			url:"../payroll/template/deduction_exec/ajaxprocess.php?request=l_bu",
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
	$(".showEmp")	.html("");


		$(".resp2").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

		$.ajax({
			type:"POST",
			url:"../payroll/template/deduction_exec/ajaxprocess.php?request=l_dept",
			data : { code_C:code_C, b_code:b_code },
			success:function(data){

				data = data.trim();

				$(".resp2").hide();
				$("#dept").hide();
				$(".department").html(data);

					//<!--------------- hide if the selected is no value ---------------------->

						if(b_code == ""){

							$("#dept").show();
							$(".department").html('');
						}


					//<!----------- End  hide of if the selected is no value ---------------------->

			}

		});
}

function dept(){

	var c_code = $("[name = 'code']").val();
	var b_code = $("[name = 'b_code']").val();
	var d_code = $("[name = 'dept_code']").val();

	$(".showEmp")	.html("");

		//employee

		$(".respSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

		$.ajax({
			type:"POST",
			url:"../payroll/template/deduction_exec/ajaxprocess.php?request=l_sec",
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

	$(".showEmp")	.html("");

	$(".respSubSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');


		$.ajax({
			type:"POST",
			url:"../payroll/template/deduction_exec/ajaxprocess.php?request=l_subsec",
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

	$(".showEmp")	.html("");

	$(".employeeFilter").hide();



		$(".respUnit").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');


		$.ajax({
			type:"POST",
			url:"../payroll/template/deduction_exec/ajaxprocess.php?request=l_unit",
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

function sortSalNoIad(){

	BootstrapDialog.show({
	title: 'Sort according to Salary Number',
	type: BootstrapDialog.TYPE_PRIMARY,
	size: BootstrapDialog.SIZE_NORMAL,
	closable: false,
	draggable: true,
	message: function(dialog) {
		var $message = $('<div></div>');
		var pageToLoad = dialog.getData('pageToLoad');
		$message.load(pageToLoad);

		return $message;
	},
		data: {
		'pageToLoad': '../iad/template/audit_exec/sortSalNo.php'
	},

	buttons: [{
		label: 'Filter',
		id: 'filter_me',
		icon: 'glyphicon glyphicon-filter',
		cssClass: "btn-sm btn-primary",
		action: function(dialog) {
		filterDept();
		}
		},{
			label: 'Close',
			id:'close_me',
			icon: 'glyphicon glyphicon-remove',
			cssClass: "btn-sm btn-danger",
			action: function(dialog) {
			dialog.close();
			}
		}]

	});

}

function sortEmpNameIad(){

	BootstrapDialog.show({
	title: 'Sort according to Employee Name',
	type: BootstrapDialog.TYPE_PRIMARY,
	size: BootstrapDialog.SIZE_NORMAL,
	closable: false,
	draggable: true,
	message: function(dialog) {
		var $message = $('<div></div>');
		var pageToLoad = dialog.getData('pageToLoad');
		$message.load(pageToLoad);

		return $message;
	},
		data: {
		'pageToLoad': '../iad/template/audit_exec/sortEmpName.php'
	},

	buttons: [{
		label: 'Filter',
		id: 'filter_me',
		icon: 'glyphicon glyphicon-filter',
		cssClass: "btn-sm btn-primary",
		action: function(dialog) {
		filterDept();
		}
		},{
			label: 'Close',
			id:'close_me',
			icon: 'glyphicon glyphicon-remove',
			cssClass: "btn-sm btn-danger",
			action: function(dialog) {
			dialog.close();
			}
		}]

	});

}

function sortSalNoPayroll(Var){

	var getVar = Var.split(',');

	BootstrapDialog.show({
	title: 'Sort according to Salary Number',
	type: BootstrapDialog.TYPE_PRIMARY,
	size: BootstrapDialog.SIZE_NORMAL,
	closable: false,
	draggable: true,
	message: function(dialog) {
		var $message = $('<div></div>');
		var pageToLoad = dialog.getData('pageToLoad');
		$message.load(pageToLoad);

		return $message;
	},
		data: {
		'pageToLoad': '../payroll/template/deduction_exec/sortSalNo.php?get_prepBy='+getVar[0]+'&get_decDate='+getVar[1],
	},

	buttons: [{
		label: 'Filter',
		id: 'filter_me',
		icon: 'glyphicon glyphicon-filter',
		cssClass: "btn-sm btn-primary",
		action: function(dialog) {
		filterDept();
		}
		},{
			label: 'Close',
			id:'close_me',
			icon: 'glyphicon glyphicon-remove',
			cssClass: "btn-sm btn-danger",
			action: function(dialog) {
			dialog.close();
			}
		}]

	});

}

function sortEmpNamePayroll(Var){

	var getVar = Var.split(',');

	BootstrapDialog.show({
	title: 'Sort according to Employee Name',
	type: BootstrapDialog.TYPE_PRIMARY,
	size: BootstrapDialog.SIZE_NORMAL,
	closable: false,
	draggable: true,
	message: function(dialog) {
		var $message = $('<div></div>');
		var pageToLoad = dialog.getData('pageToLoad');
		$message.load(pageToLoad);

		return $message;
	},
		data: {
		'pageToLoad': '../payroll/template/deduction_exec/sortEmpName.php?get_prepBy='+getVar[0]+'&get_decDate='+getVar[1],
	},

	buttons: [{
		label: 'Filter',
		id: 'filter_me',
		icon: 'glyphicon glyphicon-filter',
		cssClass: "btn-sm btn-primary",
		action: function(dialog) {
		filterDept();
		}
		},{
			label: 'Close',
			id:'close_me',
			icon: 'glyphicon glyphicon-remove',
			cssClass: "btn-sm btn-danger",
			action: function(dialog) {
			dialog.close();
			}
		}]

	});

}

function filterDept(){

var slethis = $("#slethis").val();

var c_code = $("[name = 'code']").val();
var b_code = $("[name = 'b_code']").val();
var d_code = $("[name = 'dept_code']").val();
var s_code = $("[name = 'sect_code']").val();
var s_s_code = $("[name = 'sub_sect_code']").val();
var u_code = $("[name = 'unit']").val();


var code_name = $("[name = 'code'] option:selected").text();
var b_code_name = $("[name = 'b_code'] option:selected").text();
var d_code_name = $("[name = 'dept_code'] option:selected").text();
var s_code_name = $("[name = 'sect_code'] option:selected").text();
var s_s_code_name = $("[name = 'sub_sect_code'] option:selected").text();
var u_code_name = $("[name = 'unit'] option:selected").text();

var getName = "";



//<!-------------------- get the selected name -------------------->

	if(b_code == ""){

		getName = code_name;
	}

	if(d_code == ""){

		getName = b_code_name;
	}


	if(s_code == ""){

		getName = d_code_name;
	}

	if(s_s_code == ""){

		getName = s_code_name;
	}

	if(u_code == ""){

		getName = s_s_code_name;
	}

	if(u_code != "" && u_code != null){

		getName = u_code_name;
	}


//<!------------------- end of get the selected name --------------->


	if(b_code == null){
		b_code = "";
	}

	if(d_code == null){
		d_code = "";
	}

	if(s_code == null){
		s_code = "";
	}

	if(s_s_code == null){
		s_s_code = "";
	}

	if(u_code == null){
		u_code = "";
	}


		// $.ajax({
		// type:"POST",
		// url:"template/audit_exec/formLoader.php?request=filterEmp",
		// data : { getName:getName, c_code:c_code,
				 // b_code:b_code, d_code:d_code, s_code:s_code, s_s_code:s_s_code, u_code:u_code, slethis:slethis  },
		// success:function(data){
		// alert(data);
			// BootstrapDialog.show({
				// title:'title',
				// message: $('<div>'+data+'</div>'),
				// buttons:[
								// {
									// label:'close',
									// cssClass:'btn btn-flat btn-danger',
									// action: function(dialogRef)
										// {
											// dialogRef.close();
										// }
								// }
							// ]



			// });

		// //	$("#thids").html('');
		// //	$(".appendData").html(data);
		// }

	// });

}

