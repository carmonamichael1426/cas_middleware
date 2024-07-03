	/* ................................................................ */
	function filter_ebmledger(){
		var message_diag = new BootstrapDialog.show({
			size: BootstrapDialog.SIZE_MEDIUM,
			type: BootstrapDialog.TYPE_DEFAULT,
			title: '<b class="fnt14"><i class="glyphicon glyphicon-align-justify"></i> VIEW EBM LEDGER CONTENT</b>',
			message: function(dialog) {
				var content = $('<div></div>');
				var page = dialog.getData('pageToLoad');
				content.load(page);
				return content;
			},
			data: {'pageToLoad':'template/deduction_posting/deduction_ajaxpages-table.php?ebm_ldgerfilter'},
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
				var deduction_dateSlct = $('#deduction_dateSlct').val();
				var dedtype = $('.dedtype').val();
				var bu_select = $('.buname').val();
			  	window.location.href = '?id=ebs_ledgercontent&ded_date='+deduction_dateSlct+'&ded_type='+dedtype+'&bu='+bu_select;
			}
			}]
			});
			message_diag.getModalContent().css('border-radius', '2px');
			message_diag.getModalHeader().css({'padding':'1.3% 7%'});
			message_diag.getModalFooter().css({'padding':'1.2% 7%', 'background-color':'#fcf8e3'});
			message_diag.getModalBody().css({'padding':'1.2% 7%', 'height':'140px'});
	}

	 function upldfile_name(val){
        var filname = val.replace(/\\/g,'/').replace( /.*\//, '' );

        $('input[id=filenameItem]').val(filname);
        var filenameSET = $('input[id=filenameItem]').val();
        var splitfilename = filenameSET.split('.');
        if(jQuery.inArray(splitfilename[splitfilename.length-1], ['txt', 'csv']) != -1) {
        } else {
            var message_diag = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b><img src="assets/img/icon/warning.png" width="25"> WARNING:</b>',
                message:"Invalid filetype. Please select any file with (csv, txt) extension.",
                draggable: true,
                closable: false,
                buttons: [{
                label: 'Okay',
                cssClass: 'btn-default btn-fill btn-sm',
                action: function(error_dialog) {
                    error_dialog.close();
                    $('input[type=file]').val(null);
                    $('input[id=filenameItem]').val(null);
                }
                }]
                });
                message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
                message_diag.getModalContent().css('border-radius', '2px');
                message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
                message_diag.getModalBody().css({'padding':'2% 5%', 'height':'70px'});
        }
    }



    function cnvtrfile_name(val){
        var filname = val.replace(/\\/g,'/').replace( /.*\//, '' );
        $('input[id=filenameItem]').val(filname);
        var filenameSET = $('input[id=filenameItem]').val();
        // var splitfilename = filenameSET.split('.');
    }



    function viewcsv(data, prevurl, TOTAL_){
    	var filname = 'RegularCA';
        var buttonBACK = '&nbsp;<a href="'+data+'" id="btnback" class="btn btn-default btn-sm pull-right" style="margin-right:5px;"><i class="fa fa-arrow-circle-o-down"></i> Download</a>';
            buttonBACK += '<button id="btnback" class="btn btn-primary btn-sm pull-right" onclick=\'backurl("'+prevurl+'")\' style="margin-right:5px;"><i class="fa fa-arrow-circle-o-left"></i> Back</button>';
        var filename = data.replace(/\\/g,'/').replace( /.*\//, '' );
        $('#deductioncontainer').html('<div class="loaderdiv"></div>');
        $('label#pagetitle').html(filename+'&nbsp;&nbsp;(<span style="color:#009900;">TOTAL</span>: '+TOTAL_+')&nbsp; ');
        $('label#pagetitle').after(buttonBACK);
        $.get('template/deduction_posting/archive-ajaxpage.php', {'csvcontentview':data}, function(data){
            setTimeout(function(){ $('#deductioncontainer').html(data)}, 500);
						console.log(data);
            // console.clear();
            $('div.tooltip').remove();
        });
    }



    function backurl(foldername){
        $('[id ^=btnback]').remove();
			var datededuction = $('select.datededuction').val().replace(/\s/, '');
        $('#deductioncontainer').html('<div class="loaderdiv"></div>');

        $.post('template/deduction_posting/archive-ajaxpage.php', {
        	'foldercontent':foldername, 
        	'year':datededuction
        }, function(data){
			$('div#deductioncontainer').html(data);

		});
    }


    function removecsv(iD, filename){
        $('div.tooltip').remove();
        var message_diag = new BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_DEFAULT,
            title: '<b><img src="assets/img/icon/warning.png" width="25"> WARNING:</b>',
            message: filename+" will be disable for deduction posting. Do you want to continue?",
            draggable: true,
            closable: false,
            buttons: [{
            label: 'Cancel',
            cssClass: 'btn-default btn-fill btn-sm',
            action: function(datalog) {
                datalog.close();
            }
            },{
            label: 'Proceed',
            cssClass: 'btn-info btn-fill btn-sm',
            action: function(datalog) {
                $('tr[name='+iD+']').fadeOut('fast');
                $.post('template/deduction_posting/archive-ajaxpage.php', {'removeCSV':iD}, function(data){
                    datalog.close();
                });
            }
            }]
            });
            message_diag.getModalHeader().css({'padding':'1.8% 5%', 'border-radius':'1px'});
            message_diag.getModalContent().css('border-radius', '2px');
            message_diag.getModalFooter().css({'padding':'1.5% 5%', 'background-color':'#fcf8e3'});
            message_diag.getModalBody().css({'padding':'2% 5%', 'height':'80px'});
    }
	/* ................................................................*/


	$(document).ready(function(){

		/* ---------------------------------------------------------------- */
		/* ---------------------------------------------------------------- */



		/* ---- FOLDER SELECTION ------------------------------------------ */
		$('span.dir-file').on('click', function(){
			$('img#pstSECTcsv').attr({'src':'../assets/icon_index/uncck.png'});
			$('#oldlabel').show();
			$('#oldlabel2').show();
			$('#imagelabel').hide();

			var datededuction 	= $('select.datededuction').val().replace(/\s/, '');
			var dir_file 		= $('span[id=dir-'+$(this).attr('name')+']').attr('name');

			$('span[id^=dir]').html('<i class="fa fa-folder-o fa-fw" ></i>');
			$('span[id=dir-'+$(this).attr('name')).html('<i class="fa fa-folder-open-o fa-fw" ></i>');

			$('span#posting-menu').removeAttr('style');
			$(this).css({'padding-left':'20px', 'background-color':'#eee', 'cursor':'pointer', 'color':'#009900'});
			$('select.datededuction').attr({
				'for':$(this).attr('name')
			});


			$('div#deductioncontainer').html('<img src="../assets/img/loading.gif" width="19">&nbsp;&nbsp;Please wait...');
			if($('span[id=dir-'+$(this).attr('name')+']').attr('for') === 'remittance'){
				$.post('template/deduction_posting/deduction_ajaxpages-table.php', {
					'DIR_selection':'', 
					'dir':dir_file, 
					'dateselected': datededuction 
				}, function(data){
						$('div#deductioncontainer').html(data);
				});

			}else{
				$.post('template/deduction_posting/deduction_ajaxpages-table.php', {
					'DIR_selectpayroll':'', 
					'dir':dir_file, 
					'dateselected': datededuction 
				}, function(data){
						$('div#deductioncontainer').html(data);
				});
			}

		});

		$('span.dir-file2').on('click', function(){
			$('img#pstSECTcsv').attr({'src':'../assets/icon_index/uncck.png'});
			$('#oldlabel').hide();
			$('#oldlabel2').hide();
			$('#imagelabel').show();

			var datededuction = $('select.datededuction').val().replace(/\s/, '');
			var dir_file = $('span[id=dir-'+$(this).attr('name')+']').attr('name');

			$('span[id^=dir]').html('<i class="fa fa-folder-o fa-fw" ></i>');
			$('span[id=dir-'+$(this).attr('name')).html('<i class="fa fa-folder-open-o fa-fw" ></i>');

			$('span#posting-menu').removeAttr('style');
			$(this).css({'padding-left':'20px', 'background-color':'#eee', 'cursor':'pointer', 'color':'#009900'});
			$('select.datededuction').attr({'for':$(this).attr('name')});


			$('div#deductioncontainer').html('<img src="../assets/img/loading.gif" width="19">&nbsp;&nbsp;Please wait...');
			if($('span[id=dir-'+$(this).attr('name')+']').attr('for') === 'remittance'){

				$.post('template/deduction_posting/archive-ajaxpage.php', {'foldercontent':dir_file, 'year':datededuction}, function(data){
						$('div#deductioncontainer').html(data);

				});

			}else{

				$.post('template/deduction_posting/archive-ajaxpage.php', {'foldercontent':dir_file, 'year':datededuction}, function(data){
						$('div#deductioncontainer').html(data);
				});
			}

		});
		/* ---------------------------------------------------------------- */
		$('span.old-file').on('click', function(){

			var spaname = $('input#old').val();
			if(spaname == 'old_files'){
			window.location.href = '?id=ebs_posting';
			}else{
			window.location.href = '?id=ebs_posting&type=old_files';
			}

		});

		/* ----------------- SELECT DEDUCTION DATE ------------------------ */
		$('select.datededuction').on('change', function(){
			$('img#pstSECTcsv').attr({'src':'../assets/icon_index/uncck.png'});

			var remtype = $('span[id=dir-'+$(this).attr('for')+']').attr('for');
			var datededuction = $(this).val().replace(/\s/, '');
			var dir_file = $('span[id=dir-'+$(this).attr('for')+']').attr('name');
			if(remtype === 'remittance'){
				$('div#deductioncontainer').html('<img src="../assets/img/loading.gif" width="19">&nbsp;&nbsp;Please wait...');
				$.post('template/deduction_posting/deduction_ajaxpages-table.php', {
					'DIR_selection':'', 
					'dir':dir_file, 
					'dateselected': datededuction 
				}, function(data){
					$('div#deductioncontainer').html(data);
				});

			}else{

				$.post('template/deduction_posting/deduction_ajaxpages-table.php', {
					'DIR_selectpayroll':'', 
					'dir':dir_file, 
					'dateselected': datededuction 
				}, function(data){
						$('div#deductioncontainer').html(data);
				});
			}


		});
		/* ---------------------------------------------------------------- */

		/* --------- VIEW CSV CONTENT ------------------------------------- */
		$('.viewhrmsarchive').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
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
		/* ---------------------------------------------------------------- */




		/* ------------- IMG SECLECTION OF FILE --------------------------- */
			$('img[id=pstSECTcsv]').on('click', function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'uncck.png'){
					$(this).attr({'src':'../assets/icon_index/cck.png'});
					$('img.pstimgcsv').attr({'src':'../assets/icon_index/cck.png'});
				}else{
					$(this).attr({'src':'../assets/icon_index/uncck.png'});
					$('img.pstimgcsv').attr({'src':'../assets/icon_index/uncck.png'});
				}
			});

			$('img.pstimgcsv').on('click', function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'uncck.png'){
					$(this).attr({'src':'../assets/icon_index/cck.png'});
				}else{
					$(this).attr({'src':'../assets/icon_index/uncck.png'});
				}
			});
		/* ---------------------------------------------------------------- */



		/* -------------------BUTTON RUN POSTING SCRIPT ------------------- */
		$('#bntdedposting').on('click', function(){
			$('div.modal, div.modal-backdrop').remove();
			var file_list = [];
			$('img.pstimgcsv').each(function(){
				var img = $(this).attr('src').split('/')[3];
				if(img === 'cck.png'){
					file_list.push($(this).attr('id'));
				}
			});
			if(file_list.length == 0 ){
				alert("CSV file list can't be empty. Please select any available file from the table.");
			}else{
			var message_diag = new BootstrapDialog.show({
				size: BootstrapDialog.SIZE_SMALL,
				type: BootstrapDialog.TYPE_DEFAULT,
				title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> DEDUCTION POSTING:</b>',
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
				  	window.location.href = '?id=ebs_runupload&file='+file_list;
				}
				}]
				});
				message_diag.getModalContent().css('border-radius', '2px');
				message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
				message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
				message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'80px'});
			}
		});
		/* ---------------------------------------------------------------- */



	});