var val_AR = "";
var employee_type = "";

function reloadWindow()
{   
    // if(val_AR.replace(/\s/g, '') == '')
    // {

    // }
    // else
    // {
        window.location.reload();
    // }
}

function submitted(){
    $.alert.open({
        content: 'Successfully Submitted!',
        callback: function() {
            window.location.reload();
        }
    });
}

function hrNotify()
{
    $.alert.open({
        title: 'Alert',
        content: 'You have reviewed/printed the application from the HR. If you wan\'t to print it again, please select the second option',
        icon: 'warning',
        callback: function() {
           
        }
    });
}

function underDevelopment()
{
     $.alert.open({
        title: 'Alert',
        content: 'File Under Development',
        icon: 'warning',
        callback: function() {
           
        }
    });
}

function mngtNotify()
{
    $.alert.open({
        title: 'Alert',
        content: 'Your application was directly approved by the management. Focus on printing the application form from the management. If you wan\'t to print it again, please select the first option',
        icon: 'warning',
        callback: function() {
           
        }
    });
}

function forwarded(){
    $.alert.open({
        content: 'Successfully Forwarded!',
        callback: function() {
            window.location.reload();
        }
    });
}

function approved(){
    $.alert.open({
        content: 'Successfully Approved!',
        callback: function() {
            window.location.reload();
        }
    });
}

function disapproved(){
    $.alert.open({
        content: 'Successfully Disapproved!',
        callback: function() {
            window.location.reload();
        }
    });
}

function warning(data){
    $.alert.open({
        title: 'Alert',
        content: ''+data+'',
        icon: 'warning',
        callback: function() {
            // window.location.reload();
        }
    });
}

function warning_hr(data)
{
    $.alert.open({
        title: 'Alert',
        content: ''+data+'',
        icon: 'warning',
        callback: function() {

        }
    });
}

function updated(){
    $.alert.open({
        content: 'Successfully Updated!',
        callback: function() {
            window.location.reload();
        }
    });
}

function deleted(){
    $.alert.open({
        content: 'Successfully Deleted!',
        callback: function() {
            window.location.reload();
        }
    });
}

function undo(){
    $.alert.open({
        content: 'Successfully Retrieved!',
        callback: function() {
            window.location.reload();
        }
    });
}

function dormAddress(data){
    $.alert.open({
        content: ''+data+'',
        width: 420
    });
}

function restriction(data){
    $.alert.open({
        title: 'Alert',
        content: 'Oops! Only '+data+' Can Apply!',
        icon: 'warning',
        callback: function() {
            window.location.reload();
        }
    });
}

function noSpaceLeft(){
    $.alert.open({
        title: 'Alert',
        content: 'Sorry, there\'s no space left in this room!<br>You can apply to another room or dormitory.',
        icon: 'warning',
        callback: function() {
            window.location.reload();
        }
    });
}

function alertDormName($dorm_name, $room_no){
    $.alert.open({
        title: 'Alert',
        content: 'You can\'t proceed! You occupied at '+$dorm_name+' Room # '+$room_no+'!',
        width: '380',
        icon: 'warning',
        callback: function() {
            window.location.reload();
        }
    });
}

function dormHeadMoreOption(x)
{
   var count = $.trim($(x).closest("tr").find("td:nth-child(1)").text());
   // var emp_id = $.trim($(x).closest("tr").find("td:nth-child(2)").text());
   var payment_period = $.trim($(x).closest("tr").find("label").text());

   // console.log(payment_period);
   // // var deduction_data = $.trim($(x).closest("tr").find("input[type=checkbox]").val());
   
   // if(deduction_data != "")
   // {
       var data = payment_period.split('/');
       var date_from = data[0].trim();
       var date_to = data[1].trim();
       $.trim($(x).closest("tr").find("input[type=date]").attr('style', ''));
       $.trim($(x).closest("tr").find("label").attr('style', 'display: none;'));
       $.trim($(x).closest("tr").find("p").attr('style', ''));
       // $.trim($(x).closest("tr").find("a").text('Done').attr('onclick', 'updatePaymentPeriod(this)'));
       $.trim($(x).closest("tr").find("td:nth-child(11)").find("a").text('Done').attr('onclick', 'updatePaymentPeriod(this)'));
       $('#for_edit_from_'+count).val(date_from);
       $('#for_edit_to_'+count).val(date_to);
   // }
   // else
   // {
   //     warning("You Can Only Set The Payment Period During The Deduction!");
   // }
}

function updatePaymentPeriod(x)
{
    var count      = $.trim($(x).closest("tr").find("td:nth-child(1)").text());
    // var dormapp_id = $.trim($(x).closest("tr").find("td:nth-child(11)").text());
    var dormapp_id = $.trim($(x).closest("tr").find("td:nth-child(13)").text());
    var ded_date = $.trim($(x).closest("tr").find("td:nth-child(14)").text());
    var data       = "";
    var date_from  = $('#for_edit_from_'+count).val();
    var date_to    = $('#for_edit_to_'+count).val();
    // var payment_period  = $.trim($(x).closest("tr").find("label").text());
    // var period = payment_period.split('/');
    // var from   = period[0].trim();
    // var to     = period[1].trim();
    // var deduction_data1 = $.trim($(x).closest("tr").find("input[type=checkbox]").val());
    // var deduction_data2 = deduction_data1.split('|');
    // var data1 = deduction_data2[0].trim();
    // var data2 = deduction_data2[1].trim();
    // var data3 = deduction_data2[2].trim();
    // var data4 = deduction_data2[3].trim();
    // var data5 = deduction_data2[4].trim();
    // var data6 = deduction_data2[5].trim();//not included
    // var data7 = deduction_data2[6].trim();//not included
    // var data8 = deduction_data2[7].trim();
    // var data9 = deduction_data2[8].trim();

    var dateFrom = new Date(date_from);
    var dateTo   = new Date(date_to);
    // console.log(dateFrom, dateTo);

    // alert(date_from+' '+date_to);
    if(dateFrom.getTime() <= dateTo.getTime())
    {
        // if(date_from != from || date_to != to)
        // {
            $.ajax({
                type: 'ajax',
                method: 'post',
                async: false,
                dataType: 'json',
                // url: 'template/Dormitory/getRentalAmount.php',
                url: 'http://172.16.161.34:8080/EBS/dormitoryhead/template/Dormitory/getRentalAmount.php',
                data: {date_from:date_from, date_to:date_to, dormapp_id:dormapp_id, ded_date:ded_date},
                success: function(data){
                    $.trim($(x).closest("tr").find("td:nth-child(7)").text(data));
                    $.trim($(x).closest("tr").find("td:nth-child(9)").text(data));
                },
            });
            
            // var data8 = $.trim($(x).closest("tr").find("td:nth-child(7)").text());
        // }

        // data = data1+'|'+data2+'|'+data3+'|'+data4+'|'+data5+'|'+date_from+'|'+date_to+'|'+data8+'|'+data9;

        // $.trim($(x).closest("tr").find("input[type=checkbox]").val(data));
        $.trim($(x).closest("tr").find("input[type=date]").attr('style', 'display: none;'));
        $.trim($(x).closest("tr").find("td:nth-child(5)").find("label").attr('style', '').text(date_from+'/'+date_to));
        $.trim($(x).closest("tr").find("p").attr('style', 'display: none;'));
        $.trim($(x).closest("tr").find("td:nth-child(11)").find("a").text('Change Payment Period').attr('onclick', 'dormHeadMoreOption(this)'));
    }
    else
    {
        alert('Invalid Payment Period');
    }  
}

function forExitedMoreOptions(x)
{
    var count = $.trim($(x).closest("tr").find("td:nth-child(1)").text());
    var emp_id = $.trim($(x).closest("tr").find("td:nth-child(2)").text());
    var payment_period = $.trim($(x).closest("tr").find("label").text());

     var data = payment_period.split('/');
     var date_from = data[0].trim();
     var date_to = data[1].trim();
     $.trim($(x).closest("tr").find("input[type=date]").attr('style', ''));
     $.trim($(x).closest("tr").find("label").attr('style', 'display: none;'));
     $.trim($(x).closest("tr").find("p").attr('style', ''));
     $.trim($(x).closest("tr").find("a").text('Done').attr('onclick', 'forExitUpdatePaymentPeriod(this)'));
     $('#for_exit_edit_from_'+count).val(date_from);
     $('#for_exit_edit_to_'+count).val(date_to);
}

function forExitUpdatePaymentPeriod(x)
{
    var count = $.trim($(x).closest("tr").find("td:nth-child(1)").text());
    var dormapp_id = $.trim($(x).closest("tr").find("td:nth-child(11)").text());
    var data  = "";
    var date_from = $('#for_exit_edit_from_'+count).val();
    var date_to   = $('#for_exit_edit_to_'+count).val();
    var payment_period  = $.trim($(x).closest("tr").find("label").text());
    var period = payment_period.split('/');
    var from   = period[0].trim();
    var to     = period[1].trim();
    var deduction_data1 = $.trim($(x).closest("tr").find("input[type=checkbox]").val());
    var deduction_data2 = deduction_data1.split('|');
    var data1 = deduction_data2[0].trim();
    var data2 = deduction_data2[1].trim();
    var data3 = deduction_data2[2].trim();
    var data4 = deduction_data2[3].trim();
    var data5 = deduction_data2[4].trim();
    var data6 = deduction_data2[5].trim();//not included
    var data7 = deduction_data2[6].trim();//not included
    var data8 = deduction_data2[7].trim();
    var data9 = deduction_data2[8].trim();

    var dateFrom = new Date(date_from);
    var dateTo   = new Date(date_to);

    if(dateFrom.getTime() < dateTo.getTime())
    {
        if(date_from != from || date_to != to)
        {
            $.ajax({
                type: 'ajax',
                method: 'post',
                async: false,
                dataType: 'json',
                url: 'template/Dormitory/getRentalAmount.php?request=getRentAmount',
                data: {date_from:date_from, date_to:date_to, dormapp_id:dormapp_id},
                success: function(data){
                    $.trim($(x).closest("tr").find("td:nth-child(7)").text(data));
                },
            });
            
            var data8 = $.trim($(x).closest("tr").find("td:nth-child(7)").text());
        }

        data = data1+'|'+data2+'|'+data3+'|'+data4+'|'+data5+'|'+date_from+'|'+date_to+'|'+data8+'|'+data9;

        $.trim($(x).closest("tr").find("input[type=checkbox]").val(data));
        $.trim($(x).closest("tr").find("input[type=date]").attr('style', 'display: none;'));
        $.trim($(x).closest("tr").find("label").attr('style', '').text(date_from+'/'+date_to));
        $.trim($(x).closest("tr").find("p").attr('style', 'display: none;'));
        $.trim($(x).closest("tr").find("a").text('Change Payment Period').attr('onclick', 'forExitedMoreOptions(this)'));
    }
    else
    {
        alert('Invalid Payment Period');
    }
}

function ldiNumberOfDays(id, value)
{
    var days = parseInt(value);
    var ded_data = $.trim($(id).closest("tr").find("td:nth-child(10)").find("input").val());
    var dormapp_id = $.trim($(id).closest("tr").find("td:nth-child(11)").text());
    var split_data = ded_data.split('|');

    // console.log(split_data);
    if(days > 1)
    {
       $.ajax({
          method: 'post',
          // async: false,
          dataType: 'json',
          url: 'template/Dormitory/getLDIRentalAmount.php',
          data: {dormapp_id:dormapp_id, days:days},
          success: function(data){
              $(id).closest("tr").find("td:nth-child(7)").text(data);
              $(id).closest("tr").find("td:nth-child(10)").find("input").val(split_data[0]+'|'+split_data[1]+'|'+split_data[2]+'|'+split_data[3]+'|'+split_data[4]+'|'+split_data[5]+'|'+split_data[6]+'|'+data+'|'+split_data[8]);         
          },
       });
    }
    else
    {
       $(id).closest("tr").find("td:nth-child(10)").find("input").val(ded_data);
    }
}

function walkinPayment(x)
{
    var emp_id       = $.trim($(x).closest("tr").find("td:nth-child(3)").text());
    var name         = $.trim($(x).closest("tr").find("td:nth-child(4)").text());
    var bu_dept      = $.trim($(x).closest("tr").find("td:nth-child(5)").text());
    var dorm         = $.trim($(x).closest("tr").find("td:nth-child(6)").text());
    var dorm_id      = $.trim($(x).closest("tr").find("td:nth-child(8)").text());
    var dormavail_id = $.trim($(x).closest("tr").find("td:nth-child(9)").text());
    var emp_type     = $.trim($(x).closest("tr").find("td:nth-child(10)").text());
    var data         = bu_dept.split('/');
    var bu           = data[0].trim();
    var dept         = data[1].trim();
    var temp_date    = $('#temp_date').val();
    var employee_type = emp_type.substring(0, 5);

    
    if(employee_type == 'NESCO' || employee_type == 'Promo')
    {
        $("#pay_month").removeAttr('disabled');

        $.ajax({
            type: 'ajax',
            method: 'post',
            async: false,
            dataType: 'json',
            url: 'template/Dormitory/acctg_walkin_payment_function.php?request=getDeductionDates',
            data: {emp_id:emp_id},
            success: function(data){
                $("#modal_acctg_walkinpayment").modal('show');
                $('#btnSubmitPayment').attr('onclick', 'submitNescoPromoPayment()');
                $('#emp_type').val(employee_type);
                $('#pay_cash').attr('disabled', true);
                $('#pay_month').removeAttr('style');
                $('#label').attr('style', 'color:red;');
                $('#span').text('The field above shows occupant\'s current rental');
                $('#occupant_name').val(name);
                $('#emp_id').val(emp_id)
                $('#occupant_bu').val(bu);
                $('#occupant_dept').val(dept);
                $('#dorm_name').val(dorm);
                $('#dorm_id').val(dorm_id);
                $('#dormavail_id').val(dormavail_id);
               
                $.each(data,function (i, data){
                    $('#pay_month').append($('<option/>',{
                        value:data.dsm_deductiondate,
                        text:data.dsm_deductiondate
                    }));
                });  
            },
        });

        $.ajax({
            type: 'ajax',
            method: 'post',
            async: false,
            dataType: 'json',
            url: 'template/Dormitory/acctg_walkin_payment_function.php?request=getRental',
            data: {emp_id:emp_id},
            success: function(data){
                if(data != false || data != '')
                {
                    $('#rental').val(data.dsm_coveredamt);
                    $("#pay_cash").removeAttr('disabled');
                }
                else
                {
                    $('#rental').attr('value', '0.00');
                }
            },
        });
    }
    else
    {
        $.ajax({
            type: 'post',
            url: 'template/Dormitory/acctg_walkin_payment_function.php?request=getDetails',
            data: {emp_id:emp_id, temp_date:temp_date},
            success: function(data){
                var data   = $.parseJSON(data);
                $("#modal_acctg_walkinpayment").modal('show');
                $('#occupant_name').val(name);
                $('#emp_id').val(emp_id)
                $('#occupant_bu').val(bu);
                $('#occupant_dept').val(dept);
                $('#dorm_name').val(dorm);
                $('#dorm_id').val(dorm_id);
                $('#dormavail_id').val(dormavail_id);
                $('#rental').val(data);
                $('#ded_date').val(temp_date);
            },
        });
    }
}

function getBalance()
{
    var deduction_date = $("#pay_month").val();
    var emp_id = $("#emp_id").val();
    var emp_type = $('#emp_type').val();
    var url_add = "";

    if(emp_type == 'NESCO')
    {
        url_add = 'template/Dormitory/acctg_walkin_payment_function.php?request=getNescoBalance';
    }
    else if(emp_type == 'Promo')
    {
        url_add = 'template/Dormitory/acctg_walkin_payment_function.php?request=getPromoBalance';
    }

    $.ajax({
        type: 'ajax',
        method: 'post',
        async: false,
        dataType: 'json',
        url: url_add,
        data: {deduction_date:deduction_date, emp_id:emp_id},
        success: function(data){
            if(data != false || data.aud_balance > 0)
            {
                $("#rental").val(data.aud_balance);
                $("#pay_cash").removeAttr('disabled');
                $('#btnSubmitPayment').attr('onclick', 'submitNescoBalPayment()');
                $('#span').text('The field above shows the balance of the selected Deduction Date');
            }
            else
            {
                // $('#btnSubmitPayment').attr('onclick', 'submitNescoBalPayment()');
                alert("No Balance Found In This Selected Deduction Date!");
            }
        },
    });
}

function submitNescoPromoPayment()
{   
    var request_type = "";
    var emp_id  = $("#emp_id").val();
    var dorm_id = $("#dorm_id").val();
    var dormavail_id = $("#dormavail_id").val();
    var rental  = $("#rental").val();
    var pay_amount = $('#pay_cash').val().trim();
    var emp_type = $('#emp_type').val(); 

    if(pay_amount.replace(/\s/g, '') == '')
    {
        $('#pay_cash').focus();
    }
    else if(val_AR.replace(/\s/g, '') == '')
    {
        alert('AR Code is required!');
    }
    else
    {
        if(confirm("Are You Sure Do You Want To Submit This Payment?"))
        {
            $.ajax({
                type: 'post',
                url: 'template/Dormitory/acctg_walkin_payment_function.php?request=SubmitNescoPayment',
                // url: 'template/Dormitory/acctg_walkin_payment_function.php?request='+request_type+'',
                data: {emp_id:emp_id, dorm_id:dorm_id, dormavail_id:dormavail_id, rental:rental, pay_amount:pay_amount, val_AR: val_AR},
                success: function(data){
                    if(data == 'Ok')
                    {
                        alert('Successfully Payed!');
                        window.location.reload();
                    }
                    else
                    {
                        alert(data);
                    }
                },
            });
        }
        else
        {

        }
    }
}

function submitNescoBalPayment()
{
    var deduction_date = $("#pay_month").val();
    var emp_id         = $("#emp_id").val();
    var dorm_id        = $("#dorm_id").val();
    var dormavail_id   = $("#dormavail_id").val();
    var rental         = $("#rental").val();
    var pay_amount     = $('#pay_cash').val().trim();

    if(pay_amount.replace(/\s/g, '') == '')
    {
        $('#pay_cash').focus();
    }
    else if(val_AR.replace(/\s/g, '') == '')
    {
        alert('AR Code is required!');
    }
    else
    {
        if(confirm("Are You Sure Do You Want To Submit This Payment?"))
        {
            $.ajax({
                type: 'post',
                url: 'template/Dormitory/acctg_walkin_payment_function.php?request=SubmitNescoBalPayment',
                data: {deduction_date:deduction_date, emp_id:emp_id, dorm_id:dorm_id, dormavail_id:dormavail_id, rental:rental, pay_amount:pay_amount, val_AR:val_AR},
                success: function(data){
                    if(data == 'Ok')
                    {
                        alert('Successfully Payed!');
                        window.location.reload();
                    }
                    else
                    {
                        alert(data);
                    }
                },
            });
        }
        else
        {

        }
    }
}

function validateAR(x)
{
    val_AR = x.trim();
}

function submitPayment()
{
    var emp_id       = $("#emp_id").val();
    var dorm_id      = $('#dorm_id').val();
    var dormavail_id = $('#dormavail_id').val();
    var rental       = $('#rental').val();
    var pay_amount   = $('#pay_cash').val().trim();
    var temp_date    = $('#temp_date').val();
    // var ar_code = $('#ar_code').val();

    if(pay_amount.replace(/\s/g, '') == '')
    {
        $('#pay_cash').focus();
    }
    else if(val_AR.replace(/\s/g, '') == '')
    {
        alert('AR Code is required!');
    }
    else
    {
        if(confirm("Are You Sure Do You Want To Submit This Payment?"))
        { 
            $.ajax({
                type: 'post',
                url: 'template/Dormitory/acctg_walkin_payment_function.php?request=submitPayment',
                data: {emp_id:emp_id, dorm_id:dorm_id, dormavail_id:dormavail_id, rental:rental, pay_amount:pay_amount, val_AR:val_AR, temp_date:temp_date},
                success: function(data){
                    if(data == 'Ok')
                    {
                        alert('Successfully Payed!');
                        window.location.reload();
                    }
                    else
                    {
                        alert(data);
                    }
                },
            });
        }
        else
        {

        }
    }
}

function termsConditionsModal(){

    var dorm_id        = $('#dorm_id').text();
    var room_id        = $('#room_id').text();
    var rental         = $('#rental').text();
    var date_occupancy = $('#date_occupancy').val();

    if (date_occupancy !== "") {
        $.ajax({
            type: "POST",
            url: "template/Dormitory/save_application.php?request=check",
            data: {dorm_id:dorm_id, room_id:room_id, rental:rental, date_occupancy:date_occupancy},
            success: function(data){
                data = data.trim();
                if (data == "Ok"){
                    $('#modal_terms_conditions').modal('show');
                }
                else{
                    warning(data);
                }
            }
        });
    }else {
        $.alert.open('warning', 'Effective date of occupancy is void!');
    }

}

function dormitoryApplication(){

var dorm_id        = $('#dorm_id').text();
var room_id        = $('#room_id').text();
var rental         = $('#rental').text();
var date_occupancy = $('#date_occupancy').val();

if (date_occupancy !== "") {
    $.alert.open('confirm', 'Are you sure to submit this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url: "template/Dormitory/save_application.php?request=dormitory",
                data: {dorm_id:dorm_id, room_id:room_id, rental:rental, date_occupancy:date_occupancy},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        submitted();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });
}else {
    $.alert.open('warning', 'Effective date of occupancy is void!');
}

}

function updateDormApplicationModal(){

$('#modal_update_application').modal('show');

}

function updateDormApplication(){

var selectDorm     = $('#selectDorm').val();
var rental         = $('#dorm_rental').val();
var date_occupancy = $('#date_occupancy1').val();

if(selectDorm.replace(/\s/g, '') == ''){
    $('#selectDorm').focus();
}else if(date_occupancy.replace(/\s/g, '') == ''){
    $('#date_occupancy1').focus();
}else{
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Are you sure to update your request?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/update_application.php?request=updateDormitory",
                    data: {selectDorm:selectDorm, rental:rental, date_occupancy:date_occupancy},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY UPDATED!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });

}

}

function dormitoryApplicationStatus(entryid){

var dormapp_id = entryid;
var tempD      = "";
var temp       = "";
var y          = 0;

var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";
var incorpname = "";
var datetime   = "";

tempE = dormapp_id;

temp += tempE +"&";

var temp_sup  = $("#supname_"+tempE).html().trim();
var temp_dt1  = $("#datetime1_"+tempE).html().trim();
var temp_hrd  = $("#hrdname_"+tempE).html().trim();
var temp_dt2  = $("#datetime2_"+tempE).html().trim();
var temp_inco = $("#incorpname_"+tempE).html().trim();
var temp_dt   = $("#datetime_"+tempE).html().trim();

supervisor += temp_sup + "&"; 
datetime1  += temp_dt1 + "&"; 
hrd        += temp_hrd + "&"; 
datetime2  += temp_dt2 + "&";
incorpname += temp_inco + "&"; 
datetime   += temp_dt + "&";

$('#modal_requisition_status').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewRequisitionStatus",
data: {temp:temp, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2, incorpname:incorpname, datetime:datetime},
success: function(data){
    data = data.trim();
    $("#requisition_status").html(data);
}
});

}

function disapprovedApplicationDetails(entryid){

var dormapp_id = entryid;
var tempD      = "";
var temp       = "";
var y          = 0;

var disapprovedby   = "";
var datedisapproved = "";
var remson          = "";

tempE = dormapp_id;

temp += tempE +"&";

var temp_disappby = $("#disapprovedby_"+tempE).html().trim();
var temp_dtdisapp = $("#datedisapproved_"+tempE).html().trim();
var temp_remson   = $("#remson_"+tempE).html().trim();

disapprovedby   += temp_disappby + "&"; 
datedisapproved += temp_dtdisapp + "&"; 
remson          += temp_remson + "&"; 

$('#disapproved_application_details').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewDisapprovedApplication",
data: {temp:temp, disapprovedby:disapprovedby, datedisapproved:datedisapproved, remson:remson},
success: function(data){
    data = data.trim();
    $("#application_details").html(data);
}
});

}

function cancelledApplicationDetails(entryid){

var dormapp_id = entryid;
var tempD      = "";
var temp       = "";
var y          = 0;

var cancelledby   = "";
var datecancelled = "";
var remson          = "";

tempE = dormapp_id;

temp += tempE +"&";

var temp_cancelby = $("#cancelledby_"+tempE).html().trim();
var temp_dtcancel = $("#datecancelled_"+tempE).html().trim();
var temp_remson   = $("#remson_"+tempE).html().trim();

cancelledby   += temp_cancelby + "&"; 
datecancelled += temp_dtcancel + "&"; 
remson        += temp_remson + "&"; 

$('#cancelled_application_details').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewCancelledApplication",
data: {temp:temp, cancelledby:cancelledby, datecancelled:datecancelled, remson:remson},
success: function(data){
    data = data.trim();
    $("#cancelled_details").html(data);
}
});

}

function empRequestDeleteApp($id){

var pen_dormapp_id = $id;

$.alert.open('confirm', 'Are you sure you want to delete your request?', function(button) {
    if (button == 'yes'){
        $.ajax({
            type: "POST",
            url:"template/Dormitory/delete_application_request.php?request=deleteReq",
            data:{pen_dormapp_id:pen_dormapp_id},
            success: function(data){
                data = data.trim();
                if (data == "Ok") {
                    deleted();
                }
                else {
                    warning(data);
                }
            }
        });
    }
    else if (button == 'no'){
        window.location.reload();
    }
    else{
        window.location.reload();
    }
});

}

function empRequestUndoApp($id){

var del_dormapp_id = $id;

$.alert.open('confirm', 'Are you sure you want to retrieve your request?', function(button) {
    if (button == 'yes'){
        $.ajax({
            type: "POST",
            url:"template/Dormitory/undo_application_request.php?request=undoReq",
            data:{del_dormapp_id:del_dormapp_id},
            success: function(data){
                data = data.trim();
                if (data == "Ok") {
                    undo();
                }
                else {
                    warning(data);
                }
            }
        });
    }
    else if (button == 'no'){
        window.location.reload();
    }
    else{
        window.location.reload();
    }
});

}

function dormitoryExitApplicationModal(){

$('#modal_exit_application').modal('show');

}

function dormitoryExitApplication(){

var dorm_id          = $('#dorm_id').text();
var emp_reason       = $('#emp_reason').val();
var date_effectivity = $('#date_effectivity').val();
var contact_number   = $('#contact_number').val();

if(emp_reason.replace(/\s/g, '') == ''){
    $('#emp_reason').focus();
}else if(date_effectivity.replace(/\s/g, '') == ''){
    $('#date_effectivity').focus();
}else if(contact_number.replace(/\s/g, '') == ''){
    $('#contact_number').focus();
}else{
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Are you sure to submit this request?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/save_exit_application.php?request=exitDormitory",
                    data: {dorm_id:dorm_id, emp_reason:emp_reason, date_effectivity:date_effectivity, contact_number:contact_number},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY SUBMITTED!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });

}

}

function updateDormExitApplicationModal(){

$('#modal_update_exit_application').modal('show');

}

function updateDormExitApplication(){

var selectDormExit   = $('#selectDormExit').val();
var date_effectivity = $('#date_effectivity1').val();
var contact_number   = $('#contact_number1').val();
var emp_reason       = $('#emp_reason1').val();

if(selectDormExit.replace(/\s/g, '') == ''){
    $('#selectDormExit').focus();
}else if(date_effectivity.replace(/\s/g, '') == ''){
    $('#date_effectivity1').focus();
}else if(contact_number.replace(/\s/g, '') == ''){
    $('#contact_number1').focus();
}else if(emp_reason.replace(/\s/g, '') == ''){
    $('#emp_reason1').focus();
}else{
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Are you sure to update your request?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/update_exit_application.php?request=updateExitDormitory",
                    data: {selectDormExit:selectDormExit, date_effectivity:date_effectivity, contact_number:contact_number, emp_reason:emp_reason},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY UPDATED!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });

}

}

function dormitoryExitApplicationStatus(entryid){

var dormexit_id = entryid;
var tempD       = "";
var temp        = "";
var y           = 0;

var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";
var incorpname = "";
var datetime   = "";

tempE = dormexit_id;

temp += tempE +"&";

var temp_sup  = $("#x_supname_"+tempE).html().trim();
var temp_dt1  = $("#x_datetime1_"+tempE).html().trim();
var temp_hrd  = $("#x_hrdname_"+tempE).html().trim();
var temp_dt2  = $("#x_datetime2_"+tempE).html().trim();
var temp_inco = $("#x_incorpname_"+tempE).html().trim();
var temp_dt   = $("#x_datetime_"+tempE).html().trim();

supervisor += temp_sup + "&"; 
datetime1  += temp_dt1 + "&"; 
hrd        += temp_hrd + "&"; 
datetime2  += temp_dt2 + "&";
incorpname += temp_inco + "&"; 
datetime   += temp_dt + "&";

$('#modal_exit_requisition_status').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewExitRequisitionStatus",
data: {temp:temp, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2, incorpname:incorpname, datetime:datetime},
success: function(data){
    data = data.trim();
    $("#exit_requisition_status").html(data);
}
});

}

function disapprovedExitApplicationDetails(entryid){

var dormexit_id = entryid;
var tempD       = "";
var temp        = "";
var y           = 0;

var disapprovedby   = "";
var datedisapproved = "";
var remson          = "";

tempE = dormexit_id;

temp += tempE +"&";

var temp_disappby = $("#x_disapprovedby_"+tempE).html().trim();
var temp_dtdisapp = $("#x_datedisapproved_"+tempE).html().trim();
var temp_remson   = $("#x_remson_"+tempE).html().trim();

disapprovedby   += temp_disappby + "&"; 
datedisapproved += temp_dtdisapp + "&"; 
remson          += temp_remson + "&"; 

$('#disapproved_exit_application_details').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewExitDisapprovedApplication",
data: {temp:temp, disapprovedby:disapprovedby, datedisapproved:datedisapproved, remson:remson},
success: function(data){
    data = data.trim();
    $("#exit_application_details").html(data);
}
});

}

function cancelledExitApplicationDetails(entryid){

var dormexit_id = entryid;
var tempD       = "";
var temp        = "";
var y           = 0;

var cancelledby   = "";
var datecancelled = "";
var remson        = "";

tempE = dormexit_id;

temp += tempE +"&";

var temp_cancelby = $("#x_cancelledby_"+tempE).html().trim();
var temp_dtcancel = $("#x_datecancelled_"+tempE).html().trim();
var temp_remson   = $("#x_remson_"+tempE).html().trim();

cancelledby   += temp_cancelby + "&"; 
datecancelled += temp_dtcancel + "&"; 
remson        += temp_remson + "&"; 

$('#cancelled_exit_application_details').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewExitCancelledApplication",
data: {temp:temp, cancelledby:cancelledby, datecancelled:datecancelled, remson:remson},
success: function(data){
    data = data.trim();
    $("#cancelled_exit_details").html(data);
}
});

}

function empRequestDeleteExitApp($id){

var pen_dormexitapp_id = $id;

$.alert.open('confirm', 'Are you sure you want to delete your request?', function(button) {
    if (button == 'yes'){
        $.ajax({
            type: "POST",
            url:"template/Dormitory/delete_exit_application_request.php?request=deleteReq",
            data:{pen_dormexitapp_id:pen_dormexitapp_id},
            success: function(data){
                data = data.trim();
                if (data == "Ok") {
                    deleted();
                }
                else {
                    warning(data);
                }
            }
        });
    }
    else if (button == 'no'){
        window.location.reload();
    }
    else{
        window.location.reload();
    }
});

}

function empRequestUndoExitApp($id){

var del_dormexitapp_id = $id;

$.alert.open('confirm', 'Are you sure you want to retrieve your request?', function(button) {
    if (button == 'yes'){
        $.ajax({
            type: "POST",
            url:"template/Dormitory/undo_exit_application_request.php?request=undoReq",
            data:{del_dormexitapp_id:del_dormexitapp_id},
            success: function(data){
                data = data.trim();
                if (data == "Ok") {
                    undo();
                }
                else {
                    warning(data);
                }
            }
        });
    }
    else if (button == 'no'){
        window.location.reload();
    }
    else{
        window.location.reload();
    }
});

}

function empDeductionMonitoring(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var x     = 0;
var y     = 0;

$('#modal_emp_deduction_monitoring').modal('show');

}

function supervisorApprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/supervisor_approve.php?request=approve",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function supervisorDisapprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormapp_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormappIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormappIDDis[]');
                    var remson = '';
                    var dormapp_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormapp_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/supervisor_disapprove.php?request=disapprove",
                                        data:{dormapp_id:dormapp_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function supervisorViewReviewed(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&";
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewed",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function supervisorViewApproved(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApproved",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function supervisorApproveExit(){

var a           = document.getElementsByName('chck[]');
var tempD       = "";
var temp        = "";
var x           = 0;
var y           = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/supervisor_approve_exit.php?request=approve",
                data:{dormexit_id:dormexit_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function supervisorDisapproveExit(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormexit_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormexitIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY EXIT APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormexitIDDis[]');
                    var remson = '';
                    var dormexit_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormexit_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/supervisor_disapprove_exit.php?request=disapprove",
                                        data:{dormexit_id:dormexit_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function supervisorViewReviewedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewedExit",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function supervisorViewApprovedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApprovedExit",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function hrdApprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/hrd_approve.php?request=approve",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning_hr(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function hrdDisapprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormapp_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormappIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormappIDDis[]');
                    var remson = '';
                    var dormapp_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormapp_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/hrd_disapprove.php?request=disapprove",
                                        data:{dormapp_id:dormapp_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function hrdViewReviewed(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewed",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function hrdViewApproved(){
   
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApproved",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function hrdGenApproved(){
    var code = $(this).attr('id');
    // var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
    var message_diag = new BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE APPROVED REQUEST</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_SMALL,
        message: function(dialog) {
            var content = $('<div></div>');
            var page = dialog.getData('pageToLoad');
            content.load(page);    
            return content;
        },
        data: {
            'pageToLoad':'template/Dormitory/hrd_ajax_page.php?dormGenApp'
        },
        draggable: true, 
        closable: false,           
        buttons: [{
        label: 'CLOSE',
        cssClass: 'btn btn-danger btn-sm',
        action: function(error_dialog) {
            error_dialog.close();
        }
        },{
        label: 'PROCEED',
        cssClass: 'btn btn-success btn-sm',
        action: function(error_dialog) {
            var date_from = $('input#date_from').val();
            var date_to   = $('input#date_to').val();

            window.open('../hr/template/Dormitory/hrd_report_pdf.php?type=hrd_approved&date_from='+date_from+'&date_to='+date_to, '_blank');            
        }
        }]
    });
    message_diag.getModalHeader().css({'background-color':'#2a3f54'});
    message_diag.getModalBody().css({'height':'180px'});
}

function hrdApproveExit(){

var a           = document.getElementsByName('chck[]');
var tempD       = "";
var temp        = "";
var x           = 0;
var y           = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/hrd_approve_exit.php?request=approve",
                data:{dormexit_id:dormexit_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function hrdDisapproveExit(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormexit_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormexitIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY EXIT APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormexitIDDis[]');
                    var remson = '';
                    var dormexit_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormexit_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/hrd_disapprove_exit.php?request=disapprove",
                                        data:{dormexit_id:dormexit_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function hrdViewReviewedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewedExit",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function hrdViewApprovedExit(){
    
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApprovedExit",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function hrdGenApprovedExit(){
    var code = $(this).attr('id');
    // var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
    var message_diag = new BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE APPROVED REQUEST</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_SMALL,
        message: function(dialog) {
            var content = $('<div></div>');
            var page = dialog.getData('pageToLoad');
            content.load(page);    
            return content;
        },
        data: {
            'pageToLoad':'template/Dormitory/hrd_ajax_page.php?dormGenExitApp'
        },
        draggable: true, 
        closable: false,           
        buttons: [{
        label: 'CLOSE',
        cssClass: 'btn btn-danger btn-sm',
        action: function(error_dialog) {
            error_dialog.close();
        }
        },{
        label: 'PROCEED',
        cssClass: 'btn btn-success btn-sm',
        action: function(error_dialog) {
            var date_from = $('input#date_from').val();
            var date_to   = $('input#date_to').val();

            window.open('../hr/template/Dormitory/hrd_report_pdf.php?type=hrd_approved_exit&date_from='+date_from+'&date_to='+date_to, '_blank');            
        }
        }]
    });
    message_diag.getModalHeader().css({'background-color':'#2a3f54'});
    message_diag.getModalBody().css({'height':'180px'});
}

function hrdDeductionMonitoring(entryid, DEDdata){

var dormapp_id = entryid;
var tempD      = "";
var temp       = "";
var y          = 0;

var ded_date  = "";
var ref_code  = "";
var dorm_name = "";
var debit     = "";
var credit    = "";
var balance   = "";

tempE = dormapp_id;

$('#modal_hrd_deduction_monitoring').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewDeductionMonitoring",
data: {encodeDATA:DEDdata},
success: function(data){
    data = data.trim();
    $("#hrd_deduction_monitoring").html(data);
}
});

}

function employeeSetupModal(){

var a       = document.getElementsByName('chck[]');
var tempD   = "";
var temp    = "";
var x       = 0;
var y       = 0;
var counter = 0;
var genType = "";
    
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        var gender = $('input[id^="gender_'+a[i].value+'"]').val();
        var dormapp_id = a[i].value;

        if(genType == "") {
            genType = gender;
        }

        if(genType != gender) {
            counter++;
        }

        x++;
    }
}

if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}else if(counter > 0) {
    $.alert.open('warning', 'Not allowed! It should be the same gender!');
}
else {
    $('#modal_employee_setup').modal('show');
}

}

function submitEmployeeSetup(){

var date_occupancy  = $('#date_occupancy').val();
var slctd_dormitory = $('#selectDormitory').val();
var building        = $("[name='bldg_code']").val();
var floor           = $("[name='flr_code']").val();
var room_no         = $("[name='rm_code']").val();
var room_type       = $("[name='rm_type']").val();
var dormavail_id    = $("[name='drmavl_id']").val();

if(date_occupancy.replace(/\s/g, '') == ''){
    $('#date_occupancy').focus();
}else if(slctd_dormitory.replace(/\s/g, '') == ''){
    $('#selectDormitory').focus();
}else if(building.replace(/\s/g, '') == ''){
    $("[name='bldg_code']").focus();
}else if(floor.replace(/\s/g, '') == ''){
    $("[name='flr_code']").focus();
}else if(room_no.replace(/\s/g, '') == ''){
    $("[name='rm_code']").focus();
}else{
    var dormapp_id = "";
    var a = document.getElementsByName('chck[]');

    for(var i = 0;i<a.length;i++) {
        if(a[i].checked == true) {
            dormapp_id += a[i].value+"&";
        }
    }

    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to proceed?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialogConfirm) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/save_employee_setup.php?request=setEmployeeSetup",
                    data: {dormapp_id:dormapp_id, date_occupancy:date_occupancy, slctd_dormitory:slctd_dormitory, room_type:room_type, dormavail_id:dormavail_id},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY SET!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
                                    $button.on('click', {dialogRef: dialogRef}, function(event){
                                        event.data.dialogRef.close();
                                        dialogConfirm.close();                                        
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
        }, {
            label: 'No',
            icon: 'glyphicon glyphicon-ban-circle',
            cssClass: "btn-sm btn-danger",
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });
}

}

function hrdCancel(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormapp_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">CANCELLATION REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormappIDCan[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'CANCEL',
            icon: 'glyphicon glyphicon-ban-circle',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormappIDCan[]');
                    var remson = '';
                    var dormapp_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormapp_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/hrd_cancel.php?request=cancel",
                                        data:{dormapp_id:dormapp_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY CANCELLED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function hrdUpdateDateExit(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormexit_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">EXACT DATE OF EXIT :</label>'+
                                        '<input type="date" class="form-control" name="dateEffectivity[]" style="width:220px;">'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormexitID[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY EXIT APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'UPDATE',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                    var a = document.getElementsByName('dateEffectivity[]');
                    var b = document.getElementsByName('dormexitID[]');
                    var dateEffect = '';
                    var dormexit_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            dateEffect += a[c].value+'&';
                            dormexit_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                            message: '<center>Do you want to proceed?</center>',
                            closable: false,
                            buttons: [{
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/update_exact_date_exit.php?request=updateDateExit",
                                        data:{dormexit_id:dormexit_id, dateEffect:dateEffect},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY UPDATED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

// AJAX call for autocomplete 
$(document).ready(function(){
    $("#search_box").keyup(function(){
        $("#search_box").attr({'for':''});
        $.ajax({
        type: "POST",
        url: "template/Dormitory/add_new_dormitory.php",
        data:'keyword='+$(this).val(),
        beforeSend: function(){
            $("#search_box").css("background","#FFF url(../assets/img/loading.gif) no-repeat 490px");
        },
        success: function(data){
            $("#suggestion_box").show();
            $("#suggestion_box").html(data);
            $("#search_box").css("background","#FFF");
        }
        });
    });
});

//To select employee name
function selectEmpName(emp_name, emp_id) {
$("#search_box").val(emp_name).attr({'for':emp_id});
$("#suggestion_box").hide();
}

function addDormitory(){

var dorm_name   = $('#dorm_name').val();
var dorm_abbrev = $('#dorm_abbrev').val();
var search_box  = $('#search_box').attr('for');
var rental      = $('.rental').val();
var rmoo        = $('.rmoo').val();
var rfoo        = $('.rfoo').val();
var rmno        = $('.rmno').val();
var rfno        = $('.rfno').val();
var rp          = $('.rp').val();
var rpm         = $('.rpm').val();

if(dorm_name.replace(/\s/g, '') == ''){
    $('#dorm_name').focus();
}else if(dorm_abbrev.replace(/\s/g, '') == ''){
    $('#dorm_abbrev').focus();
}else if(search_box.replace(/\s/g, '') == ''){
    $('#search_box').focus();
}else{
    $.alert.open('confirm', 'Do you want to proceed?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url: "template/Dormitory/save_dormitory.php?request=saveDormitory",
                data: {dorm_name:dorm_name, dorm_abbrev:dorm_abbrev, search_box:search_box, rental:rental, rmoo:rmoo, rfoo:rfoo, rmno:rmno, rfno:rfno, rp:rp, rpm:rpm},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        submitted();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });
}

}

function viewDormitories(){

$('#modal_view_dormitories').modal('show');

}

function viewRentals(dorm_id, dorm_name, dormDATA){

var str = dorm_name;
var res = str.toUpperCase();

$('#modal_view_rentals').modal('show');
$('.dorm_name').html(res);
$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewRentals",
data: {dormID:dorm_id, encodeDATA:dormDATA},
success: function(data){
    data = data.trim();
    $("#view_rentals").html(data);
}
});

}

function dormitorySetup(){

$('#modal_dormitory_setup').modal('show');    

}

function submitDormSetup(){

var selectDorm    = $('#selectDorm').val();
var building      = $('#building').val();
var floor         = $('#floor').val();
var room_number   = $('#room_number').val();
var roomType      = $('#roomType').val();
var room_capacity = $('#room_capacity').val();

if(selectDorm.replace(/\s/g, '') == ''){
    $('#selectDorm').focus();
}else if(building.replace(/\s/g, '') == ''){
    $('#building').focus();
}else if(floor.replace(/\s/g, '') == ''){
    $('#floor').focus();
}else if(room_number.replace(/\s/g, '') == ''){
    $('#room_number').focus();
}else if(roomType.replace(/\s/g, '') == ''){
    $('#roomType').focus();
}else if(room_capacity.replace(/\s/g, '') == ''){
    $('#room_capacity').focus();
}else{
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Are you sure to update your request?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/submit_dormitory_setup.php?request=dormitorySetup",
                    data: {selectDorm:selectDorm, building:building, floor:floor, room_number:room_number, roomType:roomType, room_capacity:room_capacity},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY SUBMITTED!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });

}

}

function dormitoryCode(){

var dorm_code = $("[name='dorm_code']").val();

$(".bldg").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0"/><span class="loading_msg">Please Wait....</span>');

$.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=l_building",
    data: {dorm_code:dorm_code},
    success:function(data){
        data = data.trim(); 

        $(".bldg").hide();
        $("#setupBuilding").hide();
        $(".building").html(data);

        if(dorm_code == ""){
            $("#setupBuilding").show();
            $(".building").html('');   
        }
    }
});           

}
    
function building_code(){

var dorm_code = $("[name='dorm_code']").val();
var bldg_code = $("[name='bldg_code']").val();

$(".flr").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0"/><span class="loading_msg">Please Wait....</span>');

$.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=l_floor",
    data: {dorm_code:dorm_code, bldg_code:bldg_code},
    success:function(data){
        data = data.trim(); 

        $(".flr").hide();
        $("#setupFloor").hide();
        $(".floor").html(data);

        if(bldg_code == ""){
            $("#setupFloor").show();
            $(".floor").html(''); 
        }
    }
});

}

function floor_code(){

var dorm_code = $("[name='dorm_code']").val();
var bldg_code = $("[name='bldg_code']").val();
var flr_code  = $("[name='flr_code']").val();

$(".room_num").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0"/><span class="loading_msg">Please Wait....</span>');

$.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=l_room_number",
    data: {dorm_code:dorm_code, bldg_code:bldg_code, flr_code:flr_code},
    success:function(data){
        data = data.trim(); 

        $(".room_num").html('');
        $("#setupRoomNumber").hide();
        $(".room_number").html(data);

        if(flr_code == ""){
            $("#setupRoomNumber").show();
            $(".room_number").html(''); 
        }
    }
});

}

function room_code(){

var dorm_code = $("[name='dorm_code']").val();
var bldg_code = $("[name='bldg_code']").val();
var flr_code  = $("[name='flr_code']").val();
var rm_code   = $("[name='rm_code']").val();

$(".room_tp").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0"/><span class="loading_msg">Please Wait....</span>');

$.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=l_room_type",
    data: {dorm_code:dorm_code, bldg_code:bldg_code, flr_code:flr_code, rm_code:rm_code},
    success:function(data){
        data = data.trim();                 

        $(".room_tp").html('');
        $("#setupRoomType").hide();
        $(".room_type").html(data);

        if(rm_code == ""){
            $("#setupRoomType").show();
            $(".room_type").html(''); 
        }
    }
}); 

}

function incorpViewReviewed(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewed",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function incorpApprove(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var x     = 0;
var y     = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/incorp_approve.php?request=approve",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function incorpDisapprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormapp_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormappIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormappIDDis[]');
                    var remson = '';
                    var dormapp_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormapp_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/incorp_disapprove.php?request=disapprove",
                                        data:{dormapp_id:dormapp_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function incorpViewApproved(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_sup  = $("#supname_"+tempE).html().trim();
        var temp_dt1  = $("#datetime1_"+tempE).html().trim();
        var temp_hrd  = $("#hrdname_"+tempE).html().trim();
        var temp_dt2  = $("#datetime2_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApproved",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function incorpViewDisapproved(){
    
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";
var remson     = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app    = $("#applicant_"+tempE).html().trim();
        var temp_inco   = $("#incorpname_"+tempE).html().trim();
        var temp_dt     = $("#datetime_"+tempE).html().trim();
        var temp_remson = $("#remson_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";
        remson     += temp_remson + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_disapproved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataDeclined",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime, remson:remson},
    success: function(data){
        data = data.trim();
        $("#disapproved_details").html(data);
    }
    });
   
}

}

function incorpViewReviewedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app = $("#applicant_"+tempE).html().trim();
        var temp_sup = $("#supname_"+tempE).html().trim();
        var temp_dt1 = $("#datetime1_"+tempE).html().trim();
        var temp_hrd = $("#hrdname_"+tempE).html().trim();
        var temp_dt2 = $("#datetime2_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewed",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function incorpApproveExit(){

var a           = document.getElementsByName('chck[]');
var tempD       = "";
var temp        = "";
var x           = 0;
var y           = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/incorp_approve_exit.php?request=approve",
                data:{dormexit_id:dormexit_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function incorpDisapproveExit(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data = dormexit_id.split('&');
    var $content = $("<div class='row' style='height:360px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-6 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#appname_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-12 form-group">'+
                                        '<label style="font-family:calibri;">DISAPPROVAL REMARKS :</label>'+
                                        '<textarea class="form-control" name="remson[]"></textarea>'+
                                        '<input type="hidden" value="'+$data[x]+'" name="dormexitIDDis[]">'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');
        $no++;
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY EXIT APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'DECLINE',
            icon: 'glyphicon glyphicon-trash',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('remson[]');
                    var b = document.getElementsByName('dormexitIDDis[]');
                    var remson = '';
                    var dormexit_id = '';
                    var y = 0;
                    
                    for(var c = 0;c<a.length;c++) {
                        if(a[c].value.trim()) {
                            remson += a[c].value+'&';
                            dormexit_id += b[c].value+'&';
                            y++
                        }   
                    }
                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/incorp_disapprove_exit.php?request=disapprove",
                                        data:{dormexit_id:dormexit_id, remson:remson},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY DECLINED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function incorpViewApprovedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var hrd        = "";
var datetime2  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_sup  = $("#supname_"+tempE).html().trim();
        var temp_dt1  = $("#datetime1_"+tempE).html().trim();
        var temp_hrd  = $("#hrdname_"+tempE).html().trim();
        var temp_dt2  = $("#datetime2_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime2  += temp_dt2 + "&";
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApproved",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, hrd:hrd, datetime2:datetime2, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function incorpViewDisapprovedExit(){
    
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";
var remson     = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app    = $("#applicant_"+tempE).html().trim();
        var temp_inco   = $("#incorpname_"+tempE).html().trim();
        var temp_dt     = $("#datetime_"+tempE).html().trim();
        var temp_remson = $("#remson_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";
        remson     += temp_remson + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_disapproved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataDeclined",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime, remson:remson},
    success: function(data){
        data = data.trim();
        $("#disapproved_details").html(data);
    }
    });
   
}

}

function dormheadApprove(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/dormhead_approve.php?request=approve",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function dormheadDisapprove(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var x     = 0;
var y     = 0;

var dormapp_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to decline this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/dormhead_disapprove.php?request=disapprove",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        disapproved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function dormheadViewReviewed(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var dormhead   = "";
var datetime2  = "";
var hrd        = "";
var datetime3  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app   = $("#applicant_"+tempE).html().trim();
        var temp_sup   = $("#supname_"+tempE).html().trim();
        var temp_dt1   = $("#datetime1_"+tempE).html().trim();
        var temp_dhead = $("#dheadname_"+tempE).html().trim();
        var temp_dt2   = $("#datetime2_"+tempE).html().trim();
        var temp_hrd   = $("#hrdname_"+tempE).html().trim();
        var temp_dt3   = $("#datetime3_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        dormhead   += temp_dhead + "&";
        datetime2  += temp_dt2 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime3  += temp_dt3 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewed",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, dormhead:dormhead, datetime2:datetime2, hrd:hrd, datetime3:datetime3},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function dormheadViewApproved(){
    
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant   = "";
var incorpname  = "";
var datetime    = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApproved",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function dormheadApproveExit(){

var a = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var x     = 0;
var y     = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to approve this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/dormhead_approve_exit.php?request=approve",
                data:{dormexit_id:dormexit_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function dormheadDisapproveExit(){

var a           = document.getElementsByName('chck[]');
var tempD       = "";
var temp        = "";
var x           = 0;
var y           = 0;

var dormexit_id = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormexit_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Are you sure to decline this request?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/dormhead_disapprove_exit.php?request=disapprove",
                data:{dormexit_id:dormexit_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        disapproved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

function dormheadViewReviewedExit(){

var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var supervisor = "";
var datetime1  = "";
var dormhead   = "";
var datetime2  = "";
var hrd        = "";
var datetime3  = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app   = $("#applicant_"+tempE).html().trim();
        var temp_sup   = $("#supname_"+tempE).html().trim();
        var temp_dt1   = $("#datetime1_"+tempE).html().trim();
        var temp_dhead = $("#dheadname_"+tempE).html().trim();
        var temp_dt2   = $("#datetime2_"+tempE).html().trim();
        var temp_hrd   = $("#hrdname_"+tempE).html().trim();
        var temp_dt3   = $("#datetime3_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        supervisor += temp_sup + "&"; 
        datetime1  += temp_dt1 + "&"; 
        dormhead   += temp_dhead + "&";
        datetime2  += temp_dt2 + "&"; 
        hrd        += temp_hrd + "&"; 
        datetime3  += temp_dt3 + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_reviewed_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataReviewedExit",
    data: {temp:temp, applicant:applicant, supervisor:supervisor, datetime1:datetime1, dormhead:dormhead, datetime2:datetime2, hrd:hrd, datetime3:datetime3},
    success: function(data){
        data = data.trim();
        $("#reviewed_details").html(data);
    }
    });
   
}

}

function dormheadViewApprovedExit(){
    
var a     = document.getElementsByName('chck[]');
var tempD = "";
var temp  = "";
var y     = 0;

var applicant  = "";
var incorpname = "";
var datetime   = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        tempE = a[i].value;
        
        if(tempE != ""){
            tempD = "True";
        }

        temp += tempE +"&";
        
        var temp_app  = $("#applicant_"+tempE).html().trim();
        var temp_inco = $("#incorpname_"+tempE).html().trim();
        var temp_dt   = $("#datetime_"+tempE).html().trim();

        applicant  += temp_app + "&"; 
        incorpname += temp_inco + "&"; 
        datetime   += temp_dt + "&";

        y++;
    }
}
    
if(tempD == ""){
    $.alert.open('warning', 'Please select first!');
}
else {
    $('#modal_approved_details').modal('show');

    $.ajax({
    type: "POST",
    url: "template/Dormitory/ajaxprocess.php?request=viewDataApprovedExit",
    data: {temp:temp, applicant:applicant, incorpname:incorpname, datetime:datetime},
    success: function(data){
        data = data.trim();
        $("#approved_details").html(data);
    }
    });
   
}

}

function allowToExit(){

var a          = document.getElementsByName('chck[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";

for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    $.alert.open('confirm', 'Do you wish to continue?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/allow_to_exit.php?request=allow",
                data:{dormapp_id:dormapp_id},
                success: function(data){
                    data = data.trim();
                    if (data == "Ok") {
                        approved();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }
    });         
}

}

/* FUNCTION TO SUBMIT DEDUCTION SUMMARY */
function submitDeductionSummary(){

var arrayed_data = [];

$('.cbox_').each(function(){
    if($(this).is(':checked')){
        arrayed_data.push($(this).val());
    }
});

if(arrayed_data.length > 0){
    $.alert.open('confirm', 'This information will set as basis for accounting proccess.<br/>Do you wish to proceed?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/submit_dormitory_rental.php?request=submit_dr",
                data:{arrayed_data:arrayed_data},
                success: function(data){                    
                    data = data.trim();
                    if (data == "Ok") {
                        submitted();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }       
    });         
}else{
    $.alert.open('warning', 'Please select first!');
}

}

function submitEarlyDeduction()
{
    var arrayed_data = [];

    $('.cbox_').each(function(){
        if($(this).is(':checked')){
            arrayed_data.push($(this).val());
        }
    });

    if(arrayed_data.length > 0)
    {   
        $.alert.open('confirm', 'This information will set as basis for accounting proccess.<br/>Do you wish to proceed?', function(button) {
            if(button == 'yes')
            {
                // alert('THIS FUNCTION IS NOT READY TO USE. THANK YOU!');    
                $.ajax({
                    type: 'post',
                    url: 'template/Dormitory/submit_dormitory_rental.php?request=submit_early_dr',
                    data: {arrayed_data:arrayed_data},
                    success: function(data){
                        if (data == "Ok") 
                        {
                            submitted();
                        }
                        else 
                        {
                            warning(data);
                        }
                    },
                });
            }
            else if(button == 'no')
            {
                window.location.reload();
            }
        });
    }
    else
    {
        $.alert.open('warning', 'Please select first!');
    }
}

function submitDeductionCharges(){

var a          = document.getElementsByName('chck[]');
var b          = document.getElementsByName('dappid[]');
var c          = document.getElementsByName('did[]');
var d          = document.getElementsByName('david[]');
var e          = document.getElementsByName('empid[]');
var f          = document.getElementsByName('occname[]');
var g          = document.getElementsByName('dept[]');
var h          = document.getElementsByName('buname[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
var dappid     = "";
var did        = "";
var david      = "";
var empid      = "";
var occname    = "";
var dept       = "";
var buname     = "";
    
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"|";
        dappid     += b[i].value+"*";
        did        += c[i].value+"*";
        david      += d[i].value+"*";
        empid      += e[i].value+"*";
        occname    += f[i].value+"*";
        dept       += g[i].value+"*";
        buname     += h[i].value+"*";
        x++;
    }
}
    
if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">RELATED CHARGES</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_WIDE,
        closable: false,
        draggable: true,
          message: function(dialog) {
            var $message = $('<div>Loading Please Wait...</div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad': 'template/Dormitory/ajaxprocess.php?request=charges&ids='+dormapp_id+'&dappid='+dappid+'&did='+did+'&david='+david+'&empid='+empid+'&occname='+occname+'&dept='+dept+'&buname='+buname
        },
        buttons: [{
            label: 'SUBMIT DEDUCTION',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                var dappid        = document.getElementsByName('dormappID[]');
                var did           = document.getElementsByName('dormID[]');
                var david         = document.getElementsByName('dormavailID[]');
                var empid         = document.getElementsByName('empID[]');
                var dept          = document.getElementsByName('deptCODE[]');
                var eb            = document.getElementsByName('cboxEB[]');
                var ebamt         = document.getElementsByName('ebChargeAmt[]');
                var dr            = document.getElementsByName('cboxDR[]');
                var dramt         = document.getElementsByName('drChargeAmt[]');
                var oc            = document.getElementsByName('otherCharge[]');
                var ocamt         = document.getElementsByName('otherChargeAmt[]');
                var dd            = document.getElementsByName('deductionDate[]');
                var counter       = $("[name='counter']").val();
                var dormapp_id    = '';
                var dorm_id       = '';
                var dormavail_id  = '';
                var emp_id        = '';
                var dept_code     = '';
                var eb_charge     = '';
                var eb_charge_amt = '';
                var dr_charge     = '';
                var dr_charge_amt = '';
                var o_charge      = '';
                var o_charge_amt  = '';
                var ded_date      = '';
                var x             = 0;
                var y             = 0;

                var sign = "";
                for (var i = 0; i < counter; i++) {

                    var btnOthers = $("#otherCharge_"+i).val().trim();
                    var dedDate   = $("#deductionDate_"+i).val().trim();
                    
                    // if((eb[i].checked == true || dr[i].checked == true || btnOthers != "") && (dedDate != "")) {
                    if((dr[i].checked == true || btnOthers != "") && (dedDate != "")) {
                        sign += "true*";
                    }else {                        
                        sign += "false*";
                    }

                }

                var ctrNum = 0;
                var return_sign = sign.split("*");
                for (var r = 0; r < return_sign.length -1; r++) {
                    if(return_sign[r] == "true"){
                        ctrNum++;
                    }

                }
                
                for(var i = 0; i<dr.length; i++) {
                    // if(eb[i].checked == true) {
                    //     eb_charge     += eb[i].value+'&';
                    //     eb_charge_amt += ebamt[i].value+'&';
                    //     x++
                    // }else {
                    //     eb_charge     += "&";
                    //     eb_charge_amt += "&";
                    // }

                    if(dr[i].checked == true) {
                        dr_charge     += dr[i].value+'&';
                        dr_charge_amt += dramt[i].value+'&';
                        x++
                    }else {
                        dr_charge += "&";
                        dr_charge_amt += "&";
                    }

                    if(oc[i].value != "") {
                        o_charge     += oc[i].value+'&';
                        o_charge_amt += ocamt[i].value+'&';
                        x++
                    }else {
                        o_charge     += "&";
                        o_charge_amt += "&";
                    }
                    
                    dormapp_id   += dappid[i].value+'&';
                    dorm_id      += did[i].value+'&';
                    dormavail_id += david[i].value+'&';
                    emp_id       += empid[i].value+'&';  
                    dept_code    += dept[i].value+'&';  
                    ded_date     += dd[i].value+'&';  
                }

                if (counter != ctrNum) {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        size: BootstrapDialog.SIZE_SMALL,
                        title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                        message: "<center>Please don't leave empty field(s).</center>",
                        closable: false,
                        buttons: [{
                            label: 'OK',
                            cssClass: 'btn-primary btn-sm',
                            icon: 'glyphicon glyphicon-ok',
                            action: function(dialog1){
                                dialog1.close();
                            }
                        }]
                    });
                }else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        size: BootstrapDialog.SIZE_SMALL,
                        title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                        message: '<center>Are you sure you want to decline this request?</center>',
                        closable: false,
                        buttons: [{
                            label: 'YES',
                            cssClass: 'btn-success btn-sm',
                            icon: 'glyphicon glyphicon-ok',
                            action: function(dialog2){
                                var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                $button.disable();
                                $button.spin();
                                $.ajax({
                                    type:"POST",
                                    url:"template/Dormitory/submit_dormitory_related_charges.php?request=submit_drc",
                                    data:{dormapp_id:dormapp_id, dorm_id:dorm_id, dormavail_id:dormavail_id, emp_id:emp_id, dept_code:dept_code, eb_charge:eb_charge, eb_charge_amt:eb_charge_amt, dr_charge:dr_charge, dr_charge_amt:dr_charge_amt, o_charge:o_charge, o_charge_amt:o_charge_amt, ded_date:ded_date},
                                    success:function(data){
                                        if(data == "Ok"){
                                            var dialog = new BootstrapDialog({
                                                size: BootstrapDialog.SIZE_SMALL,
                                                message: function(dialogRef){
                                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY SUBMITTED!</b><br/></h3>');
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
                                                var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                            label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
                window.location.reload();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
       
}

}

function dormheadDeductionMonitoring(entryid, DEDdata){

    var dormapp_id = entryid;
    var tempD      = "";
    var temp       = "";
    var y          = 0;

    var ded_date  = "";
    var ref_code  = "";
    var dorm_name = "";
    var debit     = "";
    var credit    = "";
    var balance   = "";

    tempE = dormapp_id;

    $('#modal_dormhead_deduction_monitoring').modal('show');

    $.ajax({
        type: "POST",
        url: "template/Dormitory/ajaxprocess.php?request=viewDeductionMonitoring",
        data: {encodeDATA:DEDdata},
        success: function(data){
            data = data.trim();
            $("#dormhead_deduction_monitoring").html(data);
        }
    });

}

function manageOccupant(dormapp_id, dorm_id, dormavail_id, room_type)
{
    window.location.href = "http://172.16.161.34:8080/EBS/ebs_ad2/exec/pages/Dormitory/index.php/get_occupant_details/"+dormapp_id+"/"+dorm_id+"/"+dormavail_id+"/"+room_type;
}

function dormheadExitApplication(){

var a          = document.getElementsByName('chck[]');
var b          = document.getElementsByName('fetch_data[]');
var tempD      = "";
var temp       = "";
var x          = 0;
var y          = 0;

var dormapp_id = "";
var fetch_data = "";
     
for(var i = 0;i<a.length;i++) {
    if(a[i].checked == true) {
        dormapp_id += a[i].value+"&";
        fetch_data += b[i].value+"&";
        x++;
    }
}

if(x == 0) {
    $.alert.open('warning', 'Please select first!');
}
else {
    var $data  = dormapp_id.split('&');
    var $data1 = fetch_data.split('&');
    var $content = $("<div class='row' style='height:358px;overflow-y:scroll'></div>");
    var $no = 1;
    var dlength = $data.length-1;
    for(var x=0;x<$data.length-1;x++){
        $content.append('<div class="col-xs-12 col-md-12">'+
                            '<div class="row">'+
                                '<div class="col-md-12 form-group">'+
                                    '<label style="font-family:calibri;">'+$no+'. NAME: <label class="text-danger">'+$("#occupant_"+$data[x]).html().trim()+'</label></label><br>'+
                                '</div>'+
                            '</div>'+

                            '<div class="row">'+
                                '<div style="margin-left:14px; margin-top:-14px;">'+
                                    '<div class="col-md-6 form-group">'+
                                        '<label style="font-family:calibri;">REASON :</label>'+
                                        '<textarea class="form-control" name="reason[]" rows="5"></textarea>'+
                                    '</div>'+
                                    '<div class="col-md-6 form-group">'+
                                        '<label style="font-family:calibri;">DATE EXIT :</label>'+
                                        '<input type="date" class="form-control" name="dateEffectivity[]">'+
                                        '<label style="font-family:calibri; margin-top:11px;">CONTACT # :</label>'+
                                        '<input type="text" class="form-control" name="contactNumber[]" onkeypress="validate(event)" maxlength="15" placeholder="Ex. 09123456789 / 0912-345-6789">'+
                                    '</div>'+
                                    '<input type="hidden" value="'+$data[x]+'" name="dormappID[]">'+
                                    '<input type="hidden" value="'+$data1[x]+'" name="fetchData[]">'+
                                '</div>'+                               
                            '</div>'+
                        '</div>');
        $no++;
    }   

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' RECORD(S) OF DORMITORY EXIT APPLICATION</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'EXIT',
            icon: 'glyphicon glyphicon-ban-circle',
            cssClass: "btn-sm btn-primary",
            action: function(dialog) {
                    var a = document.getElementsByName('reason[]');
                    var b = document.getElementsByName('dateEffectivity[]');
                    var c = document.getElementsByName('contactNumber[]');
                    var d = document.getElementsByName('dormappID[]');
                    var e = document.getElementsByName('fetchData[]');
                    var reason     = '';
                    var dateEffect = '';
                    var contactNum = '';
                    var dormappID  = '';
                    var fetchData  = '';
                    var y = 0;
                    
                    for(var x = 0;x<a.length;x++) {
                        if(a[x].value.trim() && b[x].value && c[x].value) {
                            reason     += a[x].value+'&';
                            dateEffect += b[x].value+'&';
                            contactNum += c[x].value+'&';
                            dormappID  += d[x].value+'&';
                            fetchData  += e[x].value+'&';
                            y++
                        }   
                    }

                    if(y == 0) {
                        BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            size: BootstrapDialog.SIZE_SMALL,
                            title: '<i class="glyphicon glyphicon-warning-sign"></i> Warning',
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
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
                            message: "<center>Please don't leave empty field(s).</center>",
                            closable: false,
                            buttons: [{
                                label: 'OK',
                                cssClass: 'btn-primary btn-sm',
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
                            message: '<center>Do you want to proceed?</center>',
                            closable: false,
                            buttons: [{
                                label: 'YES',
                                cssClass: 'btn-success btn-sm',
                                icon: 'glyphicon glyphicon-ok',
                                action: function(dialog2){
                                    var $button = this; // 'this' here is a jQuery object that wrapping the <button> DOM element.
                                    $button.disable();
                                    $button.spin();
                                    $.ajax({
                                        type:"POST",
                                        url:"template/Dormitory/dormhead_exit_application.php?request=exit",
                                        data:{reason:reason, dateEffect:dateEffect, contactNum:contactNum, dormappID:dormappID, fetchData:fetchData},
                                        success:function(data){
                                            if(data == "Ok"){
                                                var dialog = new BootstrapDialog({
                                                    size: BootstrapDialog.SIZE_SMALL,
                                                    message: function(dialogRef){
                                                        var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY SUBMITTED!</b><br/></h3>');
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
                                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                                label: 'NO',
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
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'}); 
}

}

function validate(evt){
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\-/;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

/* CONFIRMATION OF END OF RENTAL - DATE OF EFFECTIVITY */
function confirmEndDate(primaryID){

var dormapp_id = primaryID;

$('#modal_end_rental').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/acctg_masterfile_ajax_page.php?dormapp_id="+dormapp_id,
data: {dormapp_id:dormapp_id},
success: function(data){
    data = data.trim();
    $("#end_rental").html(data);
}
});

}

function updateCoveredDate(){

var dormapp_id = $('#dormapp_id').val();
var dateTo     = $('#date_to').val();
var coveredAmt = $('#covered_amt').val();

if(dateTo.replace(/\s/g, '') == ''){
    $('#date_to').focus();
}else{
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to proceed?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-sm btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/update_covered_date.php?request=updateCoveredDate",
                    data: {dormapp_id:dormapp_id, dateTo:dateTo, coveredAmt:coveredAmt},
                    success: function(data){
                        data = data.trim();
                        if(data == "Ok"){                            
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY UPDATED!</b><br/></h3>');
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
                                    var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
            action: function(dialogItself){
                dialogItself.close();
                // event.data.dialogItself.close();
            }
        }]
    });
}

}

function viewReason(msg){

    var reason = msg;

    $.alert.open({
        title: 'Reason',
        maxHeight: 60,
        width: 350,
        content: "<div class='row'>"+
                    "<div class='col-md-12 text-left'>"+reason+"</div>"+
                "</div>"
    });

}

function dedProcessDetails($dorm_head, $dt_forwarded){

    $.alert.open({
        title: 'Details',
        maxHeight: 80,
        width: 415,
        content: "<div class='row'>"+
                    "<div class='col-md-5 text-left'>Forwarded By</div>"+
                    "<div class='col-md-7 text-left'>"+$dorm_head+"</div>"+
                    "<div class='col-md-5 text-left'>Date Forwarded</div>"+
                    "<div class='col-md-7 text-left'>"+$dt_forwarded+"</div>"+
                "</div>"
    });

}

function acctgDeductionMonitoring(entryid, DEDdata){

    var dormapp_id = entryid;
    var tempD      = "";
    var temp       = "";
    var y          = 0;

    var ded_date  = "";
    var ref_code  = "";
    var dorm_name = "";
    var debit     = "";
    var credit    = "";
    var balance   = "";

    tempE = dormapp_id;

    $('#modal_acctg_deduction_monitoring').modal('show');

    $.ajax({
        type: "POST",
        url: "template/Dormitory/ajaxprocess.php?request=viewDeductionMonitoring",
        data: {encodeDATA:DEDdata},
        success: function(data){
            data = data.trim();
            $("#acctg_deduction_monitoring").html(data);
        }
    });

}

function acctgForwardDeduction(){

    var dormapp_id = [];
    var dorm_id    = $('select#dorm_list').val();

    $('.cbox_').each(function(){
        if($(this).is(':checked')){
            dormapp_id.push($(this).val());
        }
    });

    if(dormapp_id.length > 0){
        $.alert.open('confirm', 'Forward Deduction?', function(button) {
            if (button == 'yes'){
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/forward_deduction.php?request=forwardDeduction",
                    data:{app_code:dormapp_id, dorm_id:dorm_id},
                    success: function(data){                    
                        data = data.trim();
                        if (data == "Ok") {
                            forwarded();
                        }
                        else {
                            warning(data);
                        }
                    }
                });
            }
            else if (button == 'no'){
                window.location.reload();
            }
            else{
                window.location.reload();
            }       
        });         
    }else{
        $.alert.open('warning', 'Please select first!');
    }

}

function acctgFinaliseBalance()
{
    var balance_data = [];
    var dorm_id    = $('select#dorm_list').val();

    $('.cbox_').each(function(){
        if($(this).is(':checked')){
            balance_data.push($(this).val());
        }
    });
    // alert(balance_data);
    if(balance_data.length > 0){
        $.alert.open('confirm', 'Forward Balance?', function(button) {
            if (button == 'yes'){
                $.ajax({
                    type: "POST",
                    url: "template/Dormitory/AcctgFunction.php?request=processFinaliseBalance",
                    data: {balance_data:balance_data, dorm_id:dorm_id},
                    success: function(data){                    
                        data = data.trim();
                        if (data == "Ok") {
                            // forwarded();
                            alert(data);
                        }
                        else {
                            warning(data);
                        }
                    }
                });
            }
            else if (button == 'no'){
                window.location.reload();
            }
            else{
                window.location.reload();
            }       
        });         
    }else{
        $.alert.open('warning', 'Please select first!');
    }
}

function acctgDedBreakdown($rental_amt, $charge_amt, $balance_amt, $total_ded_amt, $dormapp_id, $ded_date, $emp_id){

    // $.alert.open({
    //     title: 'Details',
    //     maxHeight: 100,
    //     width: 334,
    //     content: "<div class='row'>"+
    //                 "<div class='col-md-8'>Rental Amount</div>"+
    //                 "<div class='col-md-4 text-right'>"+$rental_amt+"</div>"+
    //                 "<div class='col-md-8'>Charge Amount</div>"+
    //                 "<div class='col-md-4 text-right'>"+$charge_amt+"</div>"+
    //                 "<div class='col-md-8'>Balance Amount</div>"+
    //                 "<div class='col-md-4 text-right'>"+$balance_amt+"</div>"+
    //                 "<div class='col-md-8 text-danger' style='font-weight:bold;'>Total Amount</div>"+
    //                 "<div class='col-md-4 text-right text-danger' style='font-weight:bold;'>"+$total_ded_amt+"</div>"+
    //             "</div>"
    // });
     $.ajax({
         type: 'ajax',
         method: 'post',
         async: false,
         dataType: 'json',
         url: 'template/Dormitory/AcctgFunction.php?request=getBalanceDetails',
         data: {$dormapp_id:$dormapp_id, $ded_date:$ded_date, $emp_id:$emp_id},
         success: function(data){
            console.log(data);
            $.alert.open({
                title: 'Details',
                maxHeight: 100,
                width: 334,
                content: "<div class='row'>"+
                            "<div class='col-md-8'>Rental Amount</div>"+
                            "<div class='col-md-4 text-right'>"+data.rental+"</div>"+
                            "<div class='col-md-8'>Charge Amount</div>"+
                            "<div class='col-md-4 text-right'>"+$charge_amt+"</div>"+
                            "<div class='col-md-8'>Balance Amount</div>"+
                            "<div class='col-md-4 text-right'>"+data.balance+"</div>"+
                            "<div class='col-md-8 text-danger' style='font-weight:bold;'>Total Amount</div>"+
                            "<div class='col-md-4 text-right text-danger' style='font-weight:bold;'>"+data.total+"</div>"+
                        "</div>"
            });
         },
     });

}

function acctgProcessDeduction(){

var arrayed_data = [];

$('.cbox_').each(function(){
    if($(this).is(':checked')){
        var vals = $(this).val();
        var ids  = vals.split("|");
        var amt  = $('input[id^="ded_amt_'+ids[0]+'"]').val();
        var fVal = vals + "|" + amt;
        arrayed_data.push(fVal);
    }
});

if(arrayed_data.length > 0){
    $.alert.open('confirm', 'Employee deductions will automatically be affected by this process. Do you want to proceed?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/acctg_deduction_ajax_page.php",
                data:{arrayed_data:arrayed_data},
                success: function(data){                    
                    data = data.trim();
                    if (data == "Ok") {
                        submitted();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }       
    });         
}else{
    $.alert.open('warning', 'Please select first!');
}

}

function iadDedBreakdown($rental_amt, $charge_amt, $balance_amt, $total_ded_amt){

    $.alert.open({
        title: 'Details',
        maxHeight: 100,
        width: 334,
        content: "<div class='row'>"+
                    "<div class='col-md-8'>Rental Amount</div>"+
                    "<div class='col-md-4 text-right'>"+$rental_amt+"</div>"+
                    "<div class='col-md-8'>Charge Amount</div>"+
                    "<div class='col-md-4 text-right'>"+$charge_amt+"</div>"+
                    "<div class='col-md-8'>Balance Amount</div>"+
                    "<div class='col-md-4 text-right'>"+$balance_amt+"</div>"+
                    "<div class='col-md-8 text-danger' style='font-weight:bold;'>Total Amount</div>"+
                    "<div class='col-md-4 text-right text-danger' style='font-weight:bold;'>"+$total_ded_amt+"</div>"+
                "</div>"
    });

}

/* FUNCTION TO SET DEDUCTION SUMMARY */
function setDeductionSummary(){

var dormapp_id = [];
var dorm_id    = $('select#dorm_list').val();

$('.cbox_').each(function(){
    if($(this).is(':checked')){
        dormapp_id.push($(this).val());
    }
});

// alert(dormapp_id);

if(dormapp_id.length > 0){
    $.alert.open('confirm', 'Do you wish to proceed?', function(button) {
        if (button == 'yes'){
            $.ajax({
                type: "POST",
                url:"template/Dormitory/iad_set_deduction.php?request=set_deduction",
                data:{app_code:dormapp_id, dorm_id:dorm_id},
                success: function(data){                    
                    data = data.trim();
                    // alert(data);
                    if (data == "Ok") {
                        submitted();
                    }
                    else {
                        warning(data);
                    }
                }
            });
        }
        else if (button == 'no'){
            window.location.reload();
        }
        else{
            window.location.reload();
        }       
    });         
}else{
    $.alert.open('warning', 'Please select first!');
}

}

function iadDeductionMonitoring(entryid, DEDdata){

var dormapp_id = entryid;
var tempD      = "";
var temp       = "";
var y          = 0;

var ded_date  = "";
var ref_code  = "";
var dorm_name = "";
var debit     = "";
var credit    = "";
var balance   = "";

tempE = dormapp_id;

$('#modal_iad_deduction_monitoring').modal('show');

$.ajax({
type: "POST",
url: "template/Dormitory/ajaxprocess.php?request=viewDeductionMonitoring",
data: {encodeDATA:DEDdata},
success: function(data){
    data = data.trim();
    $("#iad_deduction_monitoring").html(data);
}
});

}

function seeMore($dormavail_id){
    var a          = $dormavail_id;
    var tempD      = "";
    var temp       = "";
    var x          = 0;
    var y          = 0;

    var b = "";

    var $data = b.split('&');
    var $content = $("<div class='row' style='margin-left:80px'></div>");
    var $no = 1;
    var dlength = $data.length-1;     

    for(var x=0;x<=3;x++){
        $content.append(''+
                            '<img style="height:200px; width:200px" class="img-thumbnail" src='+$("#image"+$no+"_"+$dormavail_id).val()+'>'+
                        '');                                
                                
        if($no % 2 == 0){
            $content.append('<br>');
        }
        $no++;        
    }

    var dialogMain = BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-zoom-in"></span> <label style="font-family:calibri; font-size:18px;">DISPLAYING '+x+' IMAGES</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        closable:false,
        draggable:true,
        message: $content,
        buttons: [{
            label: 'CLOSE',
            icon: 'glyphicon glyphicon-remove',
            cssClass: "btn-sm btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
    dialogMain.getModalHeader().css({'background-color':'#2a3f54'});               
}

function dormRemittancesList(){
    var message_diag = new BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">FILTER REMITTANCE LIST</label>',
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        message: function(dialog) {
            var content = $('<div></div>');
            var page = dialog.getData('pageToLoad');
            content.load(page);    
            return content;
        },
        data: {
            'pageToLoad':'../payroll/template/Dormitory/payroll_remittances_ajax_page.php?remittances_list'
        },
        draggable: true, 
        closable: false,           
        buttons: [{
        label: 'CLOSE',
        cssClass: 'btn btn-danger btn-sm',
        action: function(error_dialog) {
            error_dialog.close();
        }
        },{
        label: 'PROCEED',
        cssClass: 'btn btn-success btn-sm',
        action: function(error_dialog) {
            error_dialog.close();                   
            var deductiondate = $('input#deduction_date').val();
            var dorm_id       = $('select#dorm_name').val();
            var pcc_code      = $('.pcclist').val();

            $.post('../payroll/template/Dormitory/dormitory_table_ajax_page.php', {
                'filter_remittances_list':'', 'deductiondate':deductiondate, 'dorm_id':dorm_id, 'pcc_code':pcc_code
            }, function(data){
                $('div#dorm_deduction_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

                $('a.rmtt_pdfbtn').attr({
                    'href':'template/Dormitory/dormitory_remittances_pdf.php?filter_remittances_list&dorm_id='+dorm_id+'&deductiondate='+deductiondate+'&pcc_code='+pcc_code
                });
                setTimeout(function(){
                    $('div#dorm_deduction_container').html(data);
                }, 1000);
            });     
            console.clear();            
        }
        }]
    });
    message_diag.getModalHeader().css({'background-color':'#2a3f54'});
    message_diag.getModalBody().css({'height':'220px'});
}


$(document).ready(function(){

    $('select.hrdempsetuplctdorm').on('change', function(){        
        $('div#hrd_empsetup_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="360"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/hrd_masterfile_ajax_page.php', {'dorm_id_es':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#hrd_empsetup_container').html(data);
            }, 1000);
        });         
    });

    $('select.hrdcancelapplctdorm').on('change', function(){        
        $('div#hrd_cancelapp_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="360"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/hrd_masterfile_ajax_page.php', {'dorm_id_ca':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#hrd_cancelapp_container').html(data);
            }, 1000);
        });         
    });

    $('select.hrdupdatedateexitlctdorm').on('change', function(){        
        $('div#hrd_updatedateexit_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="360"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/hrd_masterfile_ajax_page.php', {'dorm_id_ude':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#hrd_updatedateexit_container').html(data);
            }, 1000);
        });         
    });

    /* SELECT DEDUCTION DATE RENTAL (DORMITORY HEAD ACCESS) */
   $('select.dormLctDateRental').on('change', function(){
        // $('#businessUnit').val('');
        // $('#empType').val('');
        var deduction_date = $('select#ded_yrs_rntl').val()+'-'+$('select#ded_ctoff_rntl').val();
        var ded_yrs_rntl   = $('#ded_yrs_rntl').val();
        var ded_ctoff_rntl = $('#ded_ctoff_rntl').val();
        var business_unit = $('#businessUnit').val();
        var emp_type      = $('#empType').val();
    
        if(ded_yrs_rntl && ded_ctoff_rntl){
            $('div#dorm_deduction_container_rental').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="362"></span></center>'); 
            $.post('template/Dormitory/dormhead_ajax_page.php', {'view_deduction_rental':deduction_date, 'business_unit':business_unit, 'emp_type':emp_type},
            function(data){
                setTimeout(function(){
                    $('div#dorm_deduction_container_rental').html(data);
                }, 1000);
            });   
       }else{
            $.alert.open('warning', 'Please don\'t leave empty fields.');
       }              
    });

    $('select.getbybusinessUnit').on('change', function(){
        var ded_yrs_rntl   = $('#ded_yrs_rntl').val();
        var ded_ctoff_rntl = $('#ded_ctoff_rntl').val();
        var business_unit = $('#businessUnit').val();
        var emp_type      = $('#empType').val();

        if(business_unit && emp_type)
        {
            $('div#dorm_deduction_container_rental').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="362"></span></center>'); 
            $.post('template/Dormitory/dormhead_ajax_page.php', {'view_emp_by_bu':business_unit, 'emp_type':emp_type},
            function(data){
                setTimeout(function(){
                    $('div#dorm_deduction_container_rental').html(data);
                }, 1000);
                business_unit = '';
                emp_type = '';
                $('#ded_yrs_rntl').val('');
                $('#ded_ctoff_rntl').val('');
            });    
        }
        else
        {
            $.alert.open('warning', 'Please don\'t leave the SELECT BUSINESS UNIT/SELECT EMPLOYEE TYPE field empty!');
        }              
    });

    /* SELECT DEDUCTION DATE CHARGES (DORMITORY HEAD ACCESS) */
    $('select.dormLctDateCharges').on('change', function(){
        var deduction_date  = $('select#ded_yrs_chrgs').val()+'-'+$('select#ded_ctoff_chrgs').val();
        var ded_yrs_chrgs   = $('select#ded_yrs_chrgs').val().trim();
        var ded_ctoff_chrgs = $('select#ded_ctoff_chrgs').val().trim();

        if(ded_yrs_chrgs && ded_ctoff_chrgs){
            $('div#dorm_deduction_container_charges').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="362"></span></center>'); 
            $.post('template/Dormitory/dormhead_ajax_page.php', {'view_deduction_charges':deduction_date},
            function(data){
                setTimeout(function(){
                    $('div#dorm_deduction_container_charges').html(data);
                }, 1000);
            });   
       }else{
            $.alert.open('warning', 'Please don\'t leave empty field!');
       }              
    });

    /* SELECT DEDUCTION DATE REPORT (DORMITORY HEAD ACCESS) */
    $('select.dormLctDateReport').on('change', function(){
        $('div#dorm_deduction_container_report').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="362"></span></center>');

        var deduction_date = $('select#ded_yrs_rprt').val()+'-'+$('select#ded_ctoff_rprt').val();

        $.post('template/Dormitory/dormhead_ajax_page.php', {'view_deduction_report':deduction_date},
        function(data){
            setTimeout(function(){
                $('div#dorm_deduction_container_report').html(data);
            }, 1000);
        });         
    });

    $('.dormGenReport').on('click', function(){
        var code = $(this).attr('id');
        // var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE UNAUDITED PRINTABLES</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {
                'pageToLoad':'template/Dormitory/dormhead_ajax_page.php?dormGenRprt'
            },
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn btn-danger btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn btn-success btn-sm',
            action: function(error_dialog) {
                var deductiondate = $('input#deduction_date').val();
                var filerpdf      = $('img[name=imgUSED]').attr('id');
                var reporttype    = $('select.typereport').val();
                var employee_type = $('select.typeemployee').val();
                var payroll_personnel = $('select.payroll_emp').val();
                var dorm_id = $('#dorm_id').val();

                // if(payroll_personnel === "")
                // {
                //     alert("PLEASE SELECT A PAYROLL PERSONNEL!!");
                //     return true;
                // }

                if(filerpdf === 'ALL'){  
                    // if(employee_type === 'Alturas_emp'){
                    if(employee_type === 'Alturas_emp' || employee_type === 'Franchise_emp'){
                        if(reporttype === 'dedsummary'){
                            // if(payroll_personnel != "")
                            // {
                                // window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summaryPCC&date='+deductiondate+'&payroll_personnel='+payroll_personnel, '_blank');
                                window.open('http://172.16.161.100/EBS/Dormitory_CI/get_datas_for_summary/'+deductiondate+'/'+dorm_id+'/'+payroll_personnel+'/'+employee_type+'/current', '_blank');
                            // }
                            // else
                            // {
                            //     window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summary&date='+deductiondate+'&emp_type='+employee_type, '_blank');
                            // }
                        }else if(reporttype === 'dedslip'){
                            // window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_slip&date='+deductiondate+'&emp_type='+employee_type, '_blank');
                            alert("Deduction Slip is not allowed for Alturas and Franchise Employees");
                        }
                    }
                    else if(employee_type === 'Nesco_emp'){
                        if(reporttype === 'dedsummary'){
                            // window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summary&date='+deductiondate+'&emp_type='+employee_type, '_blank');
                            window.open('http://172.16.161.100/EBS/Dormitory_CI/get_datas_for_summary/'+deductiondate+'/'+dorm_id+'/'+payroll_personnel+'/'+employee_type+'/current', '_blank');
                        }else if(reporttype === 'dedslip'){
                            window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_slip&date='+deductiondate+'&emp_type='+employee_type, '_blank');
                        }
                    }
                    else if(employee_type === 'No_payroll'){
                         window.open('http://172.16.161.100/EBS/Dormitory_CI/get_datas_for_summary/'+deductiondate+'/'+dorm_id+'/'+payroll_personnel+'/'+employee_type+'/current', '_blank');
                    }
                }
                else if(filerpdf === 'PCC'){
                    var pcc = $('.pcclist').val();                    
                    if(reporttype === 'dedsummary'){
                        window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summaryPCC&date='+deductiondate+'&PCC='+pcc, '_blank');
                    }else if(reporttype === 'dedslip'){
                        window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_slipPCC&date='+deductiondate+'&PCC='+pcc, '_blank');
                    }
                }            
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'height':'330px'});           
    });

    $('.dormGenReportPerBU').on('click', function(){
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">SELECT BUSINESS UNIT</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/dormhead_ajax_page.php?dormGenRprtPerBU'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn-danger btn-fill btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn-success btn-fill btn-sm',
            action: function(error_dialog) {
                var deductiondate = $('input#deduction_date').val();
                var reporttype    = $('select.typereport').val();
                var emp_type      = $('select.typeemployee').val();
                var BUSet         = '';

                if(reporttype === 'dedsummary'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            BUSet+=$(this).attr('id').replace(/img/g, '')+'|';
                        }
                    });
                    window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summaryPerBU&date='+deductiondate+'&BU='+BUSet+'&emp_type='+emp_type, '_blank');
                }else if(reporttype === 'dedslip'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            BUSet+=$(this).attr('id').replace(/img/g, '')+'|';
                        }
                    });
                    window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_slipPerBU&date='+deductiondate+'&BU='+BUSet+'&emp_type='+emp_type, '_blank');
                }
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'484px'});           
    });

    $('.dormGenReportPerEmpType').on('click', function(){
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">SELECT EMPLOYEE TYPE</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/dormhead_ajax_page.php?dormGenRprtPerEmpType'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn-danger btn-fill btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn-success btn-fill btn-sm',
            action: function(error_dialog) {
                var deductiondate = $('input#deduction_date').val();
                var reporttype    = $('select.typereport').val();
                var emptypeSet    = '';

                if(reporttype === 'dedsummary'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            // emptypeSet+=$(this).attr('id').replace(/img/g, '')+'|';
                            emptypeSet+=$(this).data('value')+'|';
                        }
                    });
                    window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_summaryPerEmpType&date='+deductiondate+'&empType='+emptypeSet, '_blank');
                }else if(reporttype === 'dedslip'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            // emptypeSet+=$(this).attr('id').replace(/img/g, '')+'|';
                            emptypeSet+=$(this).data('value')+'|';
                        }
                    });
                    window.open('../dormitoryhead/template/Dormitory/dormhead_report_pdf.php?type=dorm_deduction_slipPerEmpType&date='+deductiondate+'&empType='+emptypeSet, '_blank');
                }
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'484px'});           
    });



    $("button#reset").on('click', function(){
        $("#selectDormitory").val('');

        $("#setupBuilding").show();
        $(".building").html('');

        $("#setupFloor").show();
        $(".floor").html('');

        $("#setupRoomNumber").show();
        $(".room_number").html('');

        $("#setupRoomType").show();
        $(".room_type").html('');
        $(".imgPrev").remove();
    });

    if(window.File && window.FileList && window.FileReader){
        $("#gallery").on("change",function(e) {
            var files = e.target.files,
            filesLength = files.length;

            for (var i=0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;
 
                    $("div#imgSelector").after("<div class='col-xs-3'><img class='imgPrev' style='width:100px; padding:5px; box-shadow:5px 5px 5px #2222;' src=\""+e.target.result+"\"></div>");
                });
                fileReader.readAsDataURL(f);
            }

        });
    }else{
        alert("Your browser doesn't support to File API");
    }

    $("#photo_post").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url : "template/Dormitory/save_images.php?request=saveImages",
            data: formData,
            enctype: 'multipart/form-data',
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend:function(){
                // $('#form-action input').attr("disabled",true);
                $("#modal-button").text("Uploading, Please Wait...");
                //$("#modal-button").button('loading');
            },
            success: function(data) {
                // var data = data.split("+");
                if(data == "Ok")
                {
                    setTimeout(function(){
                        var dialog = new BootstrapDialog({
                            size: BootstrapDialog.SIZE_SMALL,
                            message: function(dialogRef){
                                var $message = $('<h3 class="text-center text-success"><b>SUCCESSFULLY UPLOADED!</b><br/></h3>');
                                var $button = $('<br><button class="btn btn-primary btn-sm">OK</button>');
                                $button.on('click', {dialogRef: dialogRef}, function(event){
                                    event.data.dialogRef.close();
                                    $("#modal-button").text("Post Event");

                                    $("#selectDormitory").val('');

                                    $("#setupBuilding").show();
                                    $(".building").html('');

                                    $("#setupFloor").show();
                                    $(".floor").html('');

                                    $("#setupRoomNumber").show();
                                    $(".room_number").html('');

                                    $("#setupRoomType").show();
                                    $(".room_type").html('');

                                    $("#gallery").val('');
                                    $(".imgPrev").remove();
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
                    }, 1000);
                }
                else
                {
                    var dialog = new BootstrapDialog({
                        size: BootstrapDialog.SIZE_SMALL,
                        message: function(dialogRef){
                            var $message = $('<h3 class="text-center text-success"><b>'+data+'</b><br/></h3>');
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
                    // $("#modal-button").text("Post Event");
                }
            },
            error: function( xhr, status, errorThrown ) {
                $("#modal-button").text("Post Event");
                alert( "Sorry, there was a problem!" );
            }
        });

    });



    /* SELECT DEDUCTION DATE (ACCOUNTING ACCESS) */
    $('select.acctgmasterfilelctdorm').on('change', function(){        
        $('div#acctg_masterfile_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_masterfile_ajax_page.php', {'dorm_id':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_masterfile_container').html(data);
            }, 1000);
        });         
    });
    
    $('select.acctgsummarylctdata').on('change', function(){
        $('div#acctg_summary_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_summary_ajax_page.php', {'view_deduction':deduction_date, 'dorm_id':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_summary_container').html(data);
            }, 1000);
        });         
    });

    $('select.acctgdeductionlctdatanesco').on('change', function(){
        $('div#acctg_deduction_container_nesco').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_deduction_ajax_page.php', {'view_deduction_nesco':deduction_date, 'dorm_id_nesco':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_deduction_container_nesco').html(data);
            }, 1000);
        });         
    });

    $('select.acctgdeductionlctdatapromo').on('change', function(){
        $('div#acctg_deduction_container_promo').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_deduction_ajax_page.php', {'view_deduction_promo':deduction_date, 'dorm_id_promo':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_deduction_container_promo').html(data);
            }, 1000);
        });         
    });

    $('select.acctgdeductionlctdatcydem').on('change', function(){
        $('div#acctg_deduction_container_cydem').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_deduction_ajax_page.php', {'view_deduction_cydem':deduction_date, 'dorm_id_promo':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_deduction_container_cydem').html(data);
            }, 1000);
        });         
    });


    $('select.acctgoccupantslctactive').on('change', function(){
        $('div#acctg_occupants_container_active').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_occupants_ajax_page.php', {'dorm_id_active':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_occupants_container_active').html(data);
            }, 1000);
        });         
    });

    $('select.acctgoccupantslctinactive').on('change', function(){
        $('div#acctg_occupants_container_inactive').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/acctg_occupants_ajax_page.php', {'dorm_id_inactive':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#acctg_occupants_container_inactive').html(data);
            }, 1000);
        });         
    });

    $('.acctgGenReport').on('click', function(){
        var code    = $(this).attr('id');
        var dorm_id = $('select#dorm_list').val();
        // var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE UNAUDITED PRINTABLES</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/acctg_summary_ajax_page.php?acctgGenRprt'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn btn-danger btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn btn-success btn-sm',
            action: function(error_dialog) {                
                    var deductiondate = $('input#deduction_date').val();
                    var filerpdf      = $('img[name=imgUSED]').attr('id');
                    var reporttype    = $('select.typereport').val();
                    var dorm_id       = $('select#dorm_name').val();
                    var employee_type = $('select.typeemployee').val();

                    if(filerpdf === 'ALL'){
                        if(employee_type == 'Alturas Employee')
                        {
                            if(reporttype === 'dedsummary'){
                                window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_summary&date='+deductiondate+'&dorm_id='+dorm_id+'&emp_type='+employee_type, '_blank');
                            }else if(reporttype === 'dedslip'){
                                window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_slip&date='+deductiondate+'&dorm_id='+dorm_id+'&emp_type='+employee_type, '_blank');
                            }
                        }
                        else if(employee_type == 'Nesco Employee')
                        {
                            if(reporttype === 'dedsummary'){
                                window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_summary&date='+deductiondate+'&dorm_id='+dorm_id+'&emp_type='+employee_type, '_blank');
                            }else if(reporttype === 'dedslip'){
                                window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_slip&date='+deductiondate+'&dorm_id='+dorm_id+'&emp_type='+employee_type, '_blank');
                            }
                        }
                    }
                    else if(filerpdf === 'PCC'){
                        var pcc = $('.pcclist').val();                    
                        if(reporttype === 'dedsummary'){
                            window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_summaryPCC&date='+deductiondate+'&dorm_id='+dorm_id+'&PCC='+pcc, '_blank');
                        }else if(reporttype === 'dedslip'){
                            window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_slipPCC&date='+deductiondate+'&dorm_id='+dorm_id+'&PCC='+pcc, '_blank');
                        }
                    }
                            
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'height':'370px'});           
    });

    $('.acctgGenReportPerBU').on('click', function(){
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">SELECT BUSINESS UNIT</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/acctg_summary_ajax_page.php?acctgGenRprtPerBU'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn-danger btn-fill btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn-success btn-fill btn-sm',
            action: function(error_dialog) {
                var deductiondate = $('input#deduction_date').val();
                var reporttype    = $('select.typereport').val();
                var dorm_id       = $('select#dorm_name').val();
                var emp_type      = $('select.typeemployee').val();
                var BUSet         = '';

                if(reporttype === 'dedsummary'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            BUSet+=$(this).attr('id').replace(/img/g, '')+'|';
                        }
                    });
                    window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_summaryPerBU&date='+deductiondate+'&dorm_id='+dorm_id+'&BU='+BUSet+'&emp_type='+emp_type, '_blank');
                }else if(reporttype === 'dedslip'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            BUSet+=$(this).attr('id').replace(/img/g, '')+'|';
                        }
                    });
                    window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_slipPerBU&date='+deductiondate+'&dorm_id='+dorm_id+'&BU='+BUSet+'&emp_type='+emp_type, '_blank');
                }
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'545px'});           
    });

    $('.acctgGenReportPerEmpType').on('click', function(){
        var message_diag = new BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">SELECT EMPLOYEE TYPE</label>',
            type: BootstrapDialog.TYPE_PRIMARY,
            size: BootstrapDialog.SIZE_MEDIUM,
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/acctg_summary_ajax_page.php?acctgGenRprtPerEmpType'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn-danger btn-fill btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn-success btn-fill btn-sm',
            action: function(error_dialog) {
                var deductiondate = $('input#deduction_date').val();
                var reporttype    = $('select.typereport').val();
                var dorm_id       = $('select#dorm_name').val();
                var emptypeSet    = '';

                if(reporttype === 'dedsummary'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            // emptypeSet+=$(this).attr('id').replace(/img/g, '')+'|';
                            emptypeSet+=$(this).data('value')+'|';
                        }
                    });
                    window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_summaryPerEmpType&date='+deductiondate+'&dorm_id='+dorm_id+'&empType='+emptypeSet, '_blank');
                }else if(reporttype === 'dedslip'){
                    $('img[id^=img]').each(function(){
                        var img_SRC = $(this).attr('src').split('/')[3];
                        if(img_SRC == 'cck.png'){                          
                            // emptypeSet+=$(this).attr('id').replace(/img/g, '')+'|';
                            emptypeSet+=$(this).data('value')+'|';
                        }
                    });
                    window.open('../accounting/template/Dormitory/acctg_report_pdf.php?type=acctg_deduction_slipPerEmpType&date='+deductiondate+'&dorm_id='+dorm_id+'&empType='+emptypeSet, '_blank');
                }
            }
            }]
        });
        message_diag.getModalHeader().css({'background-color':'#2a3f54'});
        message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'515px'});           
    });

    $('.acctgGenReportAudited').on('click', function(){
        var code = $(this).attr('id');
        var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();
        var message_diag = new BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE PDF COPY</label>',
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/acctg_summary_ajax_page.php?acctgGenRprtAudited'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn btn-danger btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn btn-success btn-sm',
            action: function(error_dialog) {
                var filerpdf = $('img[name=imgUSED]').attr('id');
                var reporttype = $('.typereport').val();
                if(filerpdf === 'ALL'){
                    if(reporttype === 'dedsummary'){
                        window.open('../iad/template/Dormitory/iad_report_pdf.php?type=iad_deduction_summary&date='+date_filter+'&dorm_id='+dorm_id, '_blank');
                    }else if(reporttype === 'dedslip'){
                        window.open('../iad/template/Dormitory/iad_report_pdf.php?type=iad_deduction_slip&date='+date_filter+'&dorm_id='+dorm_id, '_blank');
                    }
                }else if(filerpdf === 'PCC'){
                var pcc = $('.pcclist').val();
                    if(reporttype === 'dedsummary'){
                        window.open('../iad/template/Dormitory/iad_report_pdf.php?type=iad_deduction_summaryPCC&date='+date_filter+'&PCC='+pcc+'&dorm_id='+dorm_id, '_blank');
                    }else if(reporttype === 'dedslip'){
                        window.open('../iad/template/Dormitory/iad_report_pdf.php?type=iad_deduction_slipPCC&date='+date_filter+'&PCC='+pcc+'&dorm_id='+dorm_id, '_blank');
                    }
                }            
            }
            }]
            });
            message_diag.getModalHeader().css({'background-color':'#2a3f54'});
            message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'240px'});           
    });
    //created july 22
    $('.acctgGenReportMonthly').on('click', function(){
        // var code = $(this).attr('id');
        // var date_filter = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        // var dorm_id = $('select#dorm_list').val();
        var message_diag = new BootstrapDialog.show({
            size: BootstrapDialog.SIZE_SMALL,
            type: BootstrapDialog.TYPE_PRIMARY,
            title: '<span class="glyphicon glyphicon-print"></span> <label style="font-family:calibri; font-size:18px;">GENERATE MONTHLY REPORT</label>',
            message: function(dialog) {
                var content = $('<div></div>');
                var page = dialog.getData('pageToLoad');
                content.load(page);    
                return content;
            },
            data: {'pageToLoad':'template/Dormitory/acctg_summary_ajax_page.php?acctgGenReportMonthly'},
            draggable: true, 
            closable: false,           
            buttons: [{
            label: 'CLOSE',
            cssClass: 'btn btn-danger btn-sm',
            action: function(error_dialog) {
                error_dialog.close();
            }
            },{
            label: 'PROCEED',
            cssClass: 'btn btn-success btn-sm',
            action: function(error_dialog) {
                var deduction_date = $('.deduction_date').val();
                var month = $('.month').val();

                // if(deduction_date === '')
                // {
                //     alert("Please Select Deduction!");
                // }
                // else if(month === '')
                // {
                //     alert("Please Select Month!");
                // }
                // else
                // {
                        window.open('../accounting/template/Dormitory/DormMonthlyReport.php?deduction_date='+deduction_date+'&month='+month+'');
                // }  
            }
            }]
            });
            message_diag.getModalHeader().css({'background-color':'#2a3f54'});
            message_diag.getModalBody().css({'padding':'2% 7.5%', 'height':'150px'});           
    });

    /* SELECT DEDUCTION DATE (IAD ACCESS) */
    $('select.auditlctdorm').on('change', function(){        
        $('div#iad_audit_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/iad_ajax_page.php', {'audit_dorm_id':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#iad_audit_container').html(data);
            }, 1000);
        });         
    });

    $('select.iadlctdate').on('change', function(){        
        $('div#iad_deduction_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var deduction_date = $('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val();
        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/iad_ajax_page.php', {'view_deduction':deduction_date, 'dorm_id':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#iad_deduction_container').html(data);
            }, 1000);
        });         
    });

    $('select.iadmasterfilelctdorm').on('change', function(){        
        $('div#iad_masterfile_container').html('<center><span class="font14"><img src="../assets/img/circle.gif" width="400"></span></center>');

        var dorm_id = $('select#dorm_list').val();

        $.post('template/Dormitory/iad_ajax_page.php', {'mstrfile_dorm_id':dorm_id},
        function(data){
            setTimeout(function(){
                $('div#iad_masterfile_container').html(data);
            }, 1000);
        });         
    });

    /* SELECT DEDUCTION SUMMARY LIST  (PDF - REPORT IAD ACCESS) */
    $('a#iad_summary').on('click', function(data){
        window.open('template/Dormitory/iad_report_pdf.php?type=iad_deduction_summary&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val()+'&dorm_id='+$('select#dorm_list').val(), '_blank');
    });

    /* SELECT DEDUCTION SLIP LIST  (PDF - REPORT IAD ACCESS) */
    $('a#iad_slip').on('click', function(data){
        window.open('template/Dormitory/iad_report_pdf.php?type=iad_deduction_slip&date='+$('select#ded_yrs').val()+'-'+$('select#ded_ctoff').val()+'&dorm_id='+$('select#dorm_list').val(), '_blank');
    });

});