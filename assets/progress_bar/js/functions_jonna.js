// =======================FOR EMPLOYEE'S CREDIT=======================

// --------AUTO-SUGGEST (credit_limit) pos_search.php ---------

function suggest(inputString){
        if(inputString.length == 0) {
            $('#suggestions').fadeOut();
            $("#position").val('');
            $("#company").val('');
            $("#department").val('');
            $("#business_unit").val('');
            $("#photo").val('');
            $("#credit_limit").val('');
        } else {
            $('#name').addClass('load');
            $.post("template/EmpCredit/autosuggest.php", {queryString: ""+inputString+""}, function(data){
                if(data.length >0) {
                    $('#suggestions').fadeIn();
                    $('#suggestionsList').show().html(data);
                    $('#name').removeClass('load');
                }
            });
        }
    }

function fill(thisVal) {
    $('#name').val(thisVal);
    setTimeout("$('#suggestions').fadeOut();", 600);
    var temp = thisVal.split("*");
    var empid = temp[0];
    $.ajax({
        type:"POST",
        url:"template/EmpCredit/autosuggest.php",
        data:{ empid : empid },
        success:function(data){
            //alert(empid);
            var new_data = data.split("|");
            $("#position").val(new_data[0]);
            $("#company").val(new_data[1]);
            $("#department").val(new_data[2]);
            $("#business_unit").val(new_data[3]);
            $("#photo").val(new_data[4]);
            $("#emptype").val(new_data[5]);
            $("#eocdate").val(new_data[6]);

            // $("#credit_limit").focus();
            $("#photo").html('<img src="'+new_data[4]+'" style="width: 170px; height: 170px; margin-top: 1.3%; border-radius: 5px;">');
            
            //setTimeout("$('#pic').fadeOut();", 10);
            $('#pic').hide(0);

            if (new_data[5] == "Contractual" || new_data[5] =="NESCO") {
                // for the remaining credit limit
                if(new_data[7] ==""){
                    $("#acl_reg_div").html('&#8369;&nbsp;<input value="0.00" class="form-control input-sm red" id="acl_con" name="aggr_acl" style="width: 43%;" readonly>');
                    $('#acl_balance').hide();
                }else{
                    $("#acl_reg_div").html('&#8369;&nbsp;<input value="'+new_data[7]+'" class="form-control input-sm red" id="acl_con" name="aggr_acl" style="width: 43%;" readonly>');
                    $('#acl_balance').hide();
                }
                // for the aggregate credit limit
                $("#aggr_reg_div").html('&#8369;&nbsp;<input value="'+new_data[10]+'" class="form-control input-sm red" id="acl_areg" name="acl_all" style="width: 42%;" readonly>');
                $('#acl').hide();
            }else if (new_data[5] == "Regular" || new_data[5] == "NESCO Regular"){
                // for the remaining credit limit
                if(new_data[8] == ""){
                    $("#acl_reg_div").html('&#8369;&nbsp;<input value="0.00" class="form-control input-sm red" id="acl_reg" name="aggr_acl" style="width: 43%;" readonly>');
                    $('#acl_balance').hide();
                }else{                
                    $("#acl_reg_div").html('&#8369;&nbsp;<input value="'+new_data[8]+'" class="form-control input-sm red" id="acl_reg" name="aggr_acl" style="width: 43%;" readonly>');
                    $('#acl_balance').hide();
                }
                // for the aggregate credit limit                    
                $("#aggr_reg_div").html('&#8369;&nbsp;<input value="'+new_data[9]+'" class="form-control input-sm red" id="acl_acon" name="acl_all" style="width: 42%;" readonly>');
                $('#acl').hide();
            };
        }
    });
}

// -------- END of AUTO-SUGGEST (credit_limit) pos_search.php ---------

// -------- AUTO-SUGGEST Employee Only charge_form.php ---------

function suggest2(inputString2){
        if(inputString2.length == 0) {
            $('#suggestions2').fadeOut();
            $("#position").val('');
            $("#company").val('');
            $("#department").val('');
            $("#business_unit").val('');
            $("#credit_limit").val('');
        } else {
            $('#approved_by').addClass('load');
            $.post("template/EmpCredit/autosug_emp.php", {queryString: ""+inputString2+""}, function(data){
                if(data.length >0) {
                    $('#suggestions2').fadeIn();
                    $('#suggestionsList2').show().html(data);
                    $('#approved_by').removeClass('load');
                }
            });
        }
    }

function fill2(thisVal) {
    $('#sales_sup').val(thisVal);
    setTimeout("$('#suggestions2').fadeOut();", 600);
    var temp = thisVal2.split("*");
    var empid = temp[0];
    $.ajax({
        type:"POST",
        url:"template/EmpCredit/autosug_emp.php",
        data:{ empid : empid },
        success:function(data){
            //alert(data);
            var new_data = data.split("|");
            $("#position").val(new_data[0]);
            $("#company").val(new_data[1]);
            $("#department").val(new_data[2]);
            $("#business_unit").val(new_data[3]);
            $("#credit_limit").focus();
        }
    });
}

// -------- END of AUTO-SUGGEST Employee Only charge_form.php ---------
 
// -----------Save Data to DB (credit_limit.php)----------

    function saveThis(){
        var credit_limit = $("#credit_limit").val();
        var name = $("#name").val();
        var temp = name.split("*");
        var empid = temp[0];
        
        $.ajax({
            type: "POST",
            url: "template/EmpCredit/save.php",
            data: { empid : empid, credit_limit : credit_limit },
            success: function(data){
                //alert(data)
                if(data == "Ok"){
                    alert("Save!");
                    window.location.reload();
                }
                else {
                    alert(data);
                }
            }
        });
    }


// ----------END FOR AUTO-SUGGEST (credit_limit.php)------------

// ==================    P     A      Y      R       O       L       L      ====================

// ==========FOR FILTER EMPLOYEE (payroll-set_creditlimit.php)=============

function filterE(){
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

    if(c_code == ""){
        alert("Please Select Any Company.");
        //errCom();
        return;
    }

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

    // $(".ajax_resp").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
    $.ajax({
        type:"POST",
        url:"ajaxprocess.php?request=filter_emp_shift",
        data : { getName:getName, c_code:c_code, b_code:b_code, d_code:d_code, s_code:s_code, s_s_code:s_s_code, u_code:u_code },
        success:function(data){
            data = data.trim();
            // alert(data);
            $("#filter").show();
            //$("#hide").show();
            $(".accompany").hide(); 
            $(".employeeFilter").fadeIn();
            $(".showEmp").html(data);
            $(".ajax_resp").html('');
        }
    });     
}

    // -------------- FILTER REGULAR EMPLOYEES (payroll) class.frajax.php-----------------

    function filterE_reg(){
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

        if(c_code == ""){
            alert("Please Select Any Company.");
            //errCom();
            return;
        }

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

        // $(".ajax_resp").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=filter_emp_shift_reg",
            data : { getName:getName, c_code:c_code, b_code:b_code, d_code:d_code, s_code:s_code, s_s_code:s_s_code, u_code:u_code },
            success:function(data){
                data = data.trim();
                // alert(data);
                $(".accompany").hide(); 
                $(".employeeFilter").fadeIn();
                $(".showEmp").html(data);
                $(".ajax_resp").html('');
    
            }
        });     
    }

    // -------------- END OF FILTER REGULAR EMPLOYEES (payroll) class.frajax.php-----------------

    // -------------- FILTER CONTRACTUAL EMPLOYEES (payroll) class.frajax.php-----------------

    function filterE_con(){
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

        if(c_code == ""){
            alert("Please Select Any Company.");
            //errCom();
            return;
        }

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

        // $(".ajax_resp").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=filter_emp_shift_con",
            data : { getName:getName, c_code:c_code, b_code:b_code, d_code:d_code, s_code:s_code, s_s_code:s_s_code, u_code:u_code },
            success:function(data){
                data = data.trim();
                // alert(data);
                $(".accompany").hide(); 
                $(".employeeFilter").fadeIn();
                $(".showEmp").html(data);
                $(".ajax_resp").html('');
    
            }
        });     
    }
    // -------------- END OF FILTER CONTRACTUAL EMPLOYEES (payroll) class.frajax.php-----------------

    // ---------for check boxes (payroll - set_creditlimit) class.frajax.php-----------
    function cboxAll(){
        $(".cbox_").prop("checked",true);
        // alert('blah');
    }
    
    function uncboxAll(){
        $(".cbox_").prop("checked",false);
    }
    
    function closeE(){
        $(".employeeFilter").hide();
        $(".accompany").fadeIn();   
    }
    // ---------end for check boxes-----------

    // -------to view checked employee (payroll - modal) set_creditlimit.php------
    
    function upreview(){
        var conf_empty = "";
        var temp = "";
        var a = document.getElementsByName('chck[]');

        for(var i = 0;i<a.length;i++) {
        
            if(a[i].checked == true) {
        
                conf_empty = "true";
                
                id = a[i].value;
                temp += id + "&";                              
            }               
        }

        if(conf_empty == ""){
            var dialog = new BootstrapDialog({
                size: BootstrapDialog.SIZE_SMALL,
                message: function(dialogRef){
                    var $message = $('<h4 class="text-center text-danger">Please Select Employee(s) !</h4>');
                    var $button = $('<br><br><button class="btn btn-primary btn-md">OK</button>');
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

            
            return;
        }   

        $(".resp4").html('');
        $(".empPreview").html('');
        $("#chkEmp").modal("show");         
        $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
    
        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=viewChkEmp",
            data : { temp:temp },
            success:function(data){
            // setTimeout(function(){
                $(".resp4").html('');
                //data = data.trim();
                var new_data = data.split("|");
                $(".emp_id").val(new_data[0]);
                $(".fullname").val(new_data[1]);
                $(".position").val(new_data[2]);
                $(".empPreview").html(new_data);
            //  },500);
            }
        });     
    }



// -------to view checked regular employee (payroll - modal) set_creditlimit.php------
    function upreview_reg(){
        var conf_empty = "";
        var temp = "";
        var a = document.getElementsByName('chck[]');

        for(var i = 0;i<a.length;i++) {
            if(a[i].checked == true) {
                conf_empty = "true";
                id = a[i].value;
                temp += id + "&";                              
            }               
        }
                
        if(conf_empty == ""){
        alert("Please Select Employee(s) !");
        }   else{

        $(".resp4").html('');
        $(".empPreview").html('');
        $("#chkEmp").modal("show");         
        $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=viewChkEmp_reg",
            data : { temp:temp },
            success:function(data){
                $(".resp4").html('');
                var new_data = data.split("|");
                $(".emp_id").val(new_data[0]);
                $(".fullname").val(new_data[1]);
                $(".position").val(new_data[2]);
                $(".empPreview").html(new_data);
            }
        });   
        }  
    }


// -------to view checked regular employee (payroll - modal) set_creditlimit.php------
    function upreview_con(){
        var conf_empty = "";
        var temp = "";
        var a = document.getElementsByName('chck[]');

        for(var i = 0;i<a.length;i++) {
            if(a[i].checked == true) {
                conf_empty = "true";
                id = a[i].value;
                temp += id + "&";                              
            }               
        }

        if(conf_empty == ""){
        alert("Please Select Employee(s) !");
        }   else{


        $(".resp4").html('');
        $(".empPreview").html('');
        $("#chkEmp").modal("show");         
        $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=viewChkEmp_con",
            data : { temp:temp },
            success:function(data){
            //setTimeout(function(){
                $(".resp4").html('');
                //data = data.trim();
                var new_data = data.split("|");
                $(".emp_id").val(new_data[0]);
                $(".fullname").val(new_data[1]);
                $(".position").val(new_data[2]);
                $(".empPreview").html(new_data);
            //  },500);
            }
        });     
    }
}
// -------end of view checked regular employee (modal)------

    function saveACL_reg(){
        var val = document.getElementById('check_reg').value;       
        var acl_value_reg = document.form1.allowed_amount.value;               
        var emp_id = "";
 
        var a = document.getElementsByName('empid[]');

        for(var i = 0;i<a.length;i++) {
            emp_id += a[i].value+"&";  
       
        }
        alert(acl_value_reg);

         var message_diag = new BootstrapDialog.show({
                        size: BootstrapDialog.SIZE_SMALL,
                        type: BootstrapDialog.TYPE_DEFAULT,
                        title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EC CREDIT LIMIT SET-UP </b>',
                        message: '<span class="fnt14">Do you want to save this transaction?</span>',
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
                                title: '<b class="fnt14"> CREDIT SET-UP</b>',
                                message:img_loader,
                                draggable: true, 
                                closable: false  
                                });
                                loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
                                loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
                                loader.getModalFooter().remove();
                                loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});   
                                
                                $.post('../payroll/template/EmpCredit/save_acl_amount.php?request=save_acl_reg',
                                {acl_value_reg:acl_value_reg, emp_id:emp_id, val:val },
                                function(data){


                                setTimeout(location.reload.bind(location), 2000);
                                }); 

                        }
                        }]
                        });
                        message_diag.getModalContent().css('border-radius', '2px');
                        message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
                        message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fff'});
                        message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'60px'});  



    }
    // ----End of Save Credit Limit for Regular Employees ----

    // ----Save Credit Limit for Contractual Employees ----
    function saveACL_con(){
        var val = document.getElementById('check_con').value;       
        var acl_value_con = document.form1.allowed_amount.value;           
        var emp_id = "";

        var a = document.getElementsByName('empid[]');
            
        for(var i = 0;i<a.length;i++) {
            emp_id += a[i].value+"&";  
        }

        var message_diag = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EC CREDIT LIMIT SET-UP </b>',
                message: '<span class="fnt14">Do you want to save this transaction?</span>',
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
                        title: '<b class="fnt14"> CREDIT SET-UP</b>',
                        message:img_loader,
                        draggable: true, 
                        closable: false  
                        });
                        loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
                        loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
                        loader.getModalFooter().remove();
                        loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});   
                        
                        $.post('../payroll/template/EmpCredit/save_acl_contractual.php?request=save_acl_con',
                        {acl_value_con:acl_value_con, emp_id:emp_id, val:val },
                        function(data){


                        setTimeout(location.reload.bind(location), 2000);
                        }); 

                }
                }]
                });
                message_diag.getModalContent().css('border-radius', '2px');
                message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
                message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fff'});
                message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'60px'});  
    }

    // ----Save Credit Limit for Contractual Employees ----

    // -------- Sort By Month-Day (view_deductions.php) ----------
    function select_month(datas){
        var get_year = $("[name = 'year']").val();
        $.ajax({
            type: "GET",
            url: "../payroll/template/EmpCredit/show_mon_year.php?sel_month="+datas+"&sel_year="+get_year+"&get=on_deductions",
            success: function(data){
                $('#show_query').hide().html(data).fadeIn('slow');  
            }
        });
    }
    // -------- End of Sort By Month-Day (view_deductions.php) ----------

    // -------- Sort By Year (view_deductions.php) ----------
    function select_year(datas){
        var get_month_day = $("[name = 'month_day']").val();
        $.ajax({
            type: "GET",
            url: "../payroll/template/EmpCredit/show_mon_year.php?sel_month="+get_month_day+"&sel_year="+data+"&get=on_deductions",
            success: function(data){
                $('#show_query').hide().html(data).fadeIn('slow');  
            }
        });
    }
    // -------- End of Sort By Year (view_deductions.php) ----------

    // -----------------  to view employees for (payroll) export_TF_pos (modal) ------------------

    function view_emps_modal(vieww){
       message_diag = BootstrapDialog.show({
            type: BootstrapDialog.TYPE_PRIMARY,
            title: '<b class="fnt14"><img src="../assets/img/doc2.png" width="20"> Text Files Monitoring</b>',
            size: BootstrapDialog.SIZE_WIDE,
            message: function(dialog) {
                var $message = $('<div></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);

                return $message;
            },
            data: { 
                'pageToLoad' : '../payroll/template/EmpCredit/view_emps_modal.php?getDan='+vieww 
            }
        });
        message_diag.getModalContent().css('border-radius', '2px');
        // message_diag.getModalHeader().css({'padding':'1.7% 5.5%'});

        message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#fcf8e3'});
        message_diag.getModalBody().css({'padding':'1.5% 5.5%', 'height':'510px'}); 
    }

function savetxt(id){
    alert(id);
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


function alertsmew(){
    // alert("sadsad");
            var conf_empty = "";
            var temp = "";
            var a = $("input[type='checkbox']");
            // var asd = $('#ch').val();

            for(var i=0;i < a.length;i++) {
            if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;    
            alert(temp);
            }               
            }
                if (conf_empty == ''){
                alert("Please Select Employee(s)!");                    
                }else{
                $.post('template/EmpCredit/updatesalall.php',
                { temp:temp },
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
}
// -----------------  end of view employees for (payroll) export_TF_pos (modal) ------------------

// -----------------  to view employees for (payroll) (modal) ------------------

function adjust_acl_modal(empid,cur_val){
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: 'ADJUST CREDIT LIMIT',
        size: BootstrapDialog.SIZE_SMALL,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: { 
            'pageToLoad' : '../payroll/template/EmpCredit/adjust_acl.php?modal='+empid+'&cur_val='+cur_val
        }
    });
}

function adjustACL(empid){
    var val = $("#adjust_acl").val();       

    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'This adjustment will take effect after the approval by ???',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok-sign',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "../payroll/template/EmpCredit/adjust_acl.php",
                    data: { emp_id:empid, val:val },
                    success: function(data){
                        if(data == "Ok"){
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success">Successfully Save!</h3>');
                                    var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                                    $button.on('click', {dialogRef: dialogRef}, function(event){
                                        BootstrapDialog.closeAll();
                                    });
                                    $message.append($button);
                            
                                    return $message;
                                },
                                closable: false
                            });
                        } else {
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-danger">'+data+'</h3>');
                                    var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                                    $button.on('click', {dialogRef: dialogRef}, function(event){
                                        event.data.dialogRef.close();
                                    });
                                    $message.append($button);
                            
                                    return $message;
                                },
                                closable: false
                            });
                        }
                        dialog.realize();
                        dialog.getModalHeader().hide();
                        dialog.getModalFooter().hide();
                        dialog.getModalBody().css('background-color', '#FFF');
                        dialog.getModalBody().css('color', '#F00');
                        dialog.open();
                    }
                });
                dialog.close();
            }
        }, {
            label: 'No',
            icon: 'glyphicon glyphicon-remove-sign',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    }); 
}
// -----------------  end of view employees for (payroll) export_TF_pos (modal) ------------------

// ----------------- generate CSV File (Generate Deduction List) deduction_exec/ec_exec.php -----------------

function generate_csv(){
    var b = document.getElementsByName('payroll_id[]');
    var c = document.getElementsByName('emp_name[]');
    var d = document.getElementsByName('dept_name[]');
    var e = document.getElementsByName('ded_amt[]');
    // var f = document.getElementsByName('amount[]');
    var par = "";
    var par1 = "";
    var par2 = "";
    var par3 = "";
    // var par4 = "";

    for(var i = 0;i<b.length;i++){
        par  += b[i].value+"|"; 
        par1 += c[i].value+"|";
        par2 += d[i].value+"|";
        par3 += e[i].value+"|";
        // par4 += f[i].value+"|"; 
    }

    $.ajax({
        type: "POST",
        url: "../payroll/template/deduction_exec/ec_csv.php",
        data: {par:par, par1:par1, par2:par2, par3:par3},
        success: function(data){
            if(data){
                alert("Successfully generate file for this cut off period!");
                window.open(data, '_blank');
            } else {
                alert("You can only export deduction list once in each cut off period!");
            }
        }
    });
}

// ----------------- end of generate CSV File (Generate Deduction List) deduction_exec/ec_exec.php -----------------

// -----------------  to view employees for (payroll) export_TF_pos (modal) ------------------
function displayInquiry(emp_ID){
    if(emp_ID){
        var thisid = emp_ID;
    } else {
        var emp_id = $("[name = 'search_emp']").val();
        var empdata = emp_id.split("*");
        var thisid = empdata[0];
    }
  
    $('#display_inquiry').html("<span style='display:block;width:120px;margin:20px auto;'><img src='.././././assets/img/loader.gif'> Please Wait.....</span>");
    $.ajax({
        type: "POST",
        url: "template/EmpCredit/credit_inquiry.php",
        data: { thisid:thisid },
        success: function(data){
            $("#search_employee").hide();
            $("a#inquire").hide();
            $("#display_inquiry").show();
            setTimeout(function(){
                $('#display_inquiry').html(data);
            }, 100);
        }
    });
}


function saveParticulars2(){
    var name = $("#name").val();
    var temp = name.split("*");
    var empid = temp[0];
    var trans_no = $("#trans_no").val();
    var trans_date = $("#transaction_date").val();
    var comp_code = $("[name = 'comp_code']").val();
    var bu_code = $("[name = 'bunit_code']").val();
    var dept_code = $("[name = 'dept_code']").val();
    var total_amount = $("[name = 'total_amount']").val();
    var manual_term = $("[name = 'manual_term']").val();
    var receipt_no = $("#receipt_no").val();
    var term = $("[name = 'term1']").val();
    var aggr_acl = $("[name = 'aggr_acl']").val();
    var encoded_by = $("[name = 'encoded_by']").val();

    var b = document.getElementsByName('item[]');
    var c = document.getElementsByName('cost[]');
    var d = document.getElementsByName('quantity[]');
    var e = document.getElementsByName('unit[]');
    var f = document.getElementsByName('amount[]');
    var par = "";
    var par1 = "";
    var par2 = "";
    var par3 = "";
    var par4 = "";
    var manual_ded = [];

    for(var i = 0;i<b.length;i++){
        par += b[i].value+"|"; 
        par1 += c[i].value+"|";
        par2 += d[i].value+"|";
        par3 += e[i].value+"|";
        par4 += f[i].value+"|"; 
    }
    // total_amount = total_amount;

    manual_ded.push([empid, trans_date, trans_no, receipt_no, total_amount, comp_code, bu_code, dept_code, term, encoded_by, par, par1, par2, par3, par4, manual_term]);

    if (receipt_no == '' && total_amount == "0.00"   )  {

            alert("All Fields Required! ");
            window.location.reload();

    }else if (aggr_acl < total_amount) {
           
            alert("Not Enough Credit Limit.");
            // window.location.reload();

    }else{
    
        var message_diag = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EC CREDIT SET-UP :</b>',
                message: '<span class="fnt14">Do you want to save this transaction?</span>',
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
                        // alert(manual_ded);
                        $.post('template/EmpCredit/ec_upload.php',
                        {'manual_ded':manual_ded},
                        function(data){
                        message_diag.close();

                        var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
                        var loader = new BootstrapDialog.show({
                        size: BootstrapDialog.SIZE_SMALL,
                        type: BootstrapDialog.TYPE_DEFAULT,
                        title: '<b class="fnt14"> MANUAL POS</b>',
                        message:img_loader,
                        draggable: true, 
                        closable: false  
                        });
                        loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
                        loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
                        loader.getModalFooter().remove();
                        loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});   
                        setTimeout(location.reload.bind(location), 2000);
                        }); 

                }
                }]
                });
                message_diag.getModalContent().css('border-radius', '2px');
                message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
                message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
                message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'60px'});  
        
    }
}



// --------------Cancel Transaction (employee) charge_form.php--------------
function cancelTransaction(){
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to cancel?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                window.location.reload();
            }
        }, {
            label: 'No',
            icon: 'glyphicon glyphicon-ban-circle',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
}
// ----------- End of Cancel Transaction-----------

// ----------Multiply values (employee) charge_form.php------------
function multiply(n){
    var manual_term = $("[name = 'manual_term']").val();
    var qty = $('input[id^="quantity'+n+'"]').val();
    var price = $('input[id^="amount'+n+'"]').val();
    var total = $('input[id^="total'+n+'"]');
    var myTotal = qty * price;
    var num = myTotal.toFixed(2);
    $('input[id^="total'+n+'"]').val(num); 

    var rowId = $('#table_charge tr').length;
    var value = 0;
    $("#table_charge [id^=total]").each(function() {      
        value += Number($(this).val());
        var overall = value.toFixed(2);
        $('input[name^="total_amount"]').val(overall);
    });
//alert(num);
    if (value > manual_term) {
     //  console.log(price);
        // $('#term_ko').attr("name","term2");
        // $("#terms").show();
        $("#sam").html('<label style="margin-right: 5%;">Term(s)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</label>'+
                        '&nbsp;<select id="terms" name="term1" class="form-control input-sm" style="width: 50%;" required>'+
                        '<option value="">Please Select...</option>'+
                        '<option value="2">2 terms</option>'+
                        '<option value="3">3 terms</option>'+
                        '<option value="4">4 terms</option>'+
                        '<option value="5">5 terms</option>'+
                       ' <option value="6">6 terms</option>'+
                    '</select>');
    };

    if (value <= manual_term) {
        // $('#term_ko').show();
        // $("#terms").hide();
        $("#sam").html('<label style="margin-right: 5%;">Term(s)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</label>'+
                        '<input type="hidden" id="term1" name="term1" value= "1" class="form-control input-sm" style="width: 50%;">'+
                       '<input type="text" id="term_ko" name="" value="1 term" placeholder="1 term" class="form-control" style="width: 50%; text-align: right;" required readonly="">');
    };
}
// ---------- End of Multiply values (employee) charge_form.php------------

// ----------Total values (employee) charge_form.php------------
function totalRow(){
    var rowId = $('#table_charge tr').length;
    var value = 0;
     $("#table_charge [id^=total]").each(function() {      
        value += parseFloat($(this).val());
        alert(value);
     });
}
// ----------End of Total values (employee) charge_form.php------------

// -------- For Numeric Input (employee) charge_form.php -----------
function isNumberKey(evt){
  var charCode = (evt.which) ? evt.which : event.keyCode
  if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    return false;

  return true;
}
// --------End For Numeric Input (employee) charge_form.php -----------

// ================== E N D  O F   E      M     P      L      O      Y      E      E   =====================


// =================  S     U     P     E      R     V     I     S     O     R  ===================
function reloadpage(){    
    window.location.reload()
}

// --------- View Transaction Details (supervisor) display_table_request.php-------
function viewTransaction(empid){
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: 'View Transaction',
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: { 
            'pageToLoad' : '../supervisor/template/EmpCredit/view_transaction.php?tid='+empid 
        }
    });
}


// ---------- Approve Transaction (supervisor) approve_trans.php ----------

function approveTrans(emp_id){
    var trans_date = $("#transaction_date").val();
    var receipt_no = $("#receipt_no").val();
    var total_amount = $("[name = 'total_amount']").val();
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to validate this transaction?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok-sign',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "../supervisor/template/EmpCredit/approve_trans.php?request=approve_trans",
                    data:{ receipt_no:receipt_no, total_amount:total_amount, trans_date:trans_date, emp_id:emp_id },
                    success: function(data){
                        if(data == "Ok"){
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success">Successfully Validated!</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
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
                                    var $message = $('<h3 class="text-center text-danger">'+data+'</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
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
            icon: 'glyphicon glyphicon-remove-sign',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });    
}


// -----------Disapprove Transaction (supervisor) disapprove_trans.php------------

// function disapproveTrans(emp_id){
//     var receipt_no = $("#receipt_no").val();
//     BootstrapDialog.show({
//         title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
//         type: BootstrapDialog.TYPE_DANGER,
//         size: BootstrapDialog.SIZE_SMALL,
//         closable:false,
//         draggable:true,
//         message: 'Do you want to disapprove this transaction?',
//         buttons: [{
//             label: 'Yes',
//             icon: 'glyphicon glyphicon-ok-sign',
//             cssClass: "btn-md btn-success",
//             action: function(dialog) {
//                 $.ajax({
//                     type: "POST",
//                     url: "../supervisor/template/EmpCredit/disapprove_trans.php?request=disapprove_trans",
//                     data: { receipt_no:receipt_no, emp_id:emp_id },
//                     success: function(data){
//                         if(data == "Ok"){
//                             var dialog = new BootstrapDialog({
//                                 size: BootstrapDialog.SIZE_SMALL,
//                                 message: function(dialogRef){
//                                     var $message = $('<h3 class="text-center text-success">Successfully Save!</h3>');
//                                     var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
//                                     $button.on('click', {dialogRef: dialogRef}, function(event){
//                                         event.data.dialogRef.close();
//                                         window.location.reload();
//                                     });
//                                     $message.append($button);
                            
//                                     return $message;
//                                 },
//                                 closable: false
//                             });
//                             dialog.realize();
//                             dialog.getModalHeader().hide();
//                             dialog.getModalFooter().hide();
//                             dialog.getModalBody().css('background-color', '#FFF');
//                             dialog.getModalBody().css('color', '#F00');
//                             dialog.open();
//                         } else {
//                              var dialog = new BootstrapDialog({
//                                 size: BootstrapDialog.SIZE_SMALL,
//                                 message: function(dialogRef){
//                                     var $message = $('<h3 class="text-center text-danger">'+data+'</h3>');
//                                     var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
//                                     $button.on('click', {dialogRef: dialogRef}, function(event){
//                                         event.data.dialogRef.close();
//                                         window.location.reload();
//                                     });
//                                     $message.append($button);
                            
//                                     return $message;
//                                 },
//                                 closable: false
//                             });
//                             dialog.realize();
//                             dialog.getModalHeader().hide();
//                             dialog.getModalFooter().hide();
//                             dialog.getModalBody().css('background-color', '#FFF');
//                             dialog.getModalBody().css('color', '#F00');
//                             dialog.open();
//                         }
//                     }
//                 });
//             }
//         }, {
//             label: 'No',
//             icon: 'glyphicon glyphicon-remove-sign',
//             cssClass: "btn-md btn-danger",
//             action: function(dialog) {
//                 dialog.close();
//             }
//         }]
//     });
// }


// -------------- View Only (supervisor) view_only.php --------------

function viewOnly(empid){
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: 'View Transaction',
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: { 
            'pageToLoad' : '../supervisor/template/EmpCredit/view_only.php?tid='+empid 
        }
    });
}


// ---------------- View Details (supervisor) view_trans_details.php ----------------

function viewDetails1(nameoff){
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: 'View Transaction Details',
        size: BootstrapDialog.SIZE_NORMAL,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: { 
            'pageToLoad' : '../supervisor/template/EmpCredit/view_trans_details.php?getDan='+nameoff 
        }
    });
}


// ---------------- View Details - already REVIEWED (supervisor) view_trans_details_reviewed.php ----------------

function viewDetails_rev(reviewed){
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: 'View Transaction Details',
        
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);

            return $message;
        },
        data: { 
            'pageToLoad' : '../supervisor/template/EmpCredit/view_trans_details_reviewed.php?getDan='+reviewed 
        }
    });
}

// ---------------- End of View Details - already REVIEWED (supervisor) view_trans_details_reviewed.php ----------------

// ----------------- Filter Total Amount (supervisor) ec_manual_requests.php ------------------

function filterToAmount(){
    // $("[name = 'one']").show();
    // $("[name = 'two']").show();
    // $("#input1").show();
    // $("#input2").show(); 
    // $("#to").show();
    $("#hidden_input").show(); 
}

function displayFilter(){
// if (type == 'pendingEC'){
    var one = $("[name = 'one']").val();
    var two = $("[name = 'two']").val();
    var stat = $("[name = 'stat']").val();

    $('#display_range').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");
    $.ajax({
        type: "POST",
        url: "template/EmpCredit/display_range.php?request=my_range",
        data: { one:one, two:two, status:stat },
        success: function(data){
            $("#mainTable").hide();
            $("#display_range").show();
            // if(data == "Ok"){
            //    //alert("Save!");
            //    $('#display_range').html(data);
            //     window.location.reload();
            // }
            // else {
            //     alert(data);
            // }
            setTimeout(function(){
                $('#display_range').html(data);
            }, 100);
        }
    });
// }
}
// ----------------- Filter Total Amount (supervisor) ec_manual_requests.php ------------------

// ----------------- Hide Filter input (supervisor) ec_manual_requests.php ------------------

 function hide_input(){
       $("#hidden_input").hide();
       window.location.reload(); 
}

// ----------------- End of Hide Filter input (supervisor) ec_manual_requests.php ------------------

// ----------------- Review Transactions (supervisor) ec_manual_request w/ view_trans_details.php (modal) ------------------

function reviewTrans(emp_id){
    var receipt_no = $("#receipt_no").val();
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to continue?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok-sign',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "../supervisor/template/EmpCredit/review_request.php?request=review_trans",
                    data: { emp_id:emp_id, receipt_no:receipt_no },
                    success: function(data){
                        if (data == "Successfully Reviewed. Thank You."){
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success">Successfully Reviewed!</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
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
                        }else{
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-danger">'+data+'</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
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
            icon: 'glyphicon glyphicon-remove-sign',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
}

// ----------------- End of Review Transactions (supervisor) ec_manual_request w/ view_trans_details.php (modal) ------------------


// ----------------- view checked employees for (supervisor) ec_manual_request (modal) ------------------

    function viewChecked(){
        var a = document.getElementsByName('chk[]');
        var c_empty = "";
        var temp = "";

        for (var i = 0; i < a.length; i++) {
            if(a[i].checked == true){
                c_empty = "true";
                id = a[i].value;
                temp += id + "&";
            }
        }

        if (c_empty == "") {
            var dialog = new BootstrapDialog({
                size: BootstrapDialog.SIZE_SMALL,
                message: function(dialogRef){
                    var $message = $('<h4 class="text-center text-danger">Please Select Employee(s) !</h4>');
                    var $button = $('<br><br><button class="btn btn-primary btn-md">OK</button>');
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
            return;
        }
        $(".resp4").html('');
        $(".empPreview").html('');
        //$("#chkEmpes").modal("show");         
        $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=viewCHECKED",
            data : { temp:temp },
            success:function(data){
                //setTimeout(function(){
                    // $(".resp4").html('');
                    // data = data.trim();
                    //alert(data);
                    // var new_data = data.split("|");
                    // $(".emp_id").val(new_data[0]);
                    // $(".fullname").val(new_data[1]);
                    // $(".position").val(new_data[2]);
                    // $(".empPreview").html(data);
                // },500);
                BootstrapDialog.show({
                    title: 'VIEW CHECKED EMPLOYEE(S)',
                    type: BootstrapDialog.TYPE_PRIMARY,
                    //size: BootstrapDialog.SIZE_LARGE,
                    message: function(dialogRef){
                        var $message = $(''+data+'');
                        //var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                        //$button.on('click', {dialogRef: dialogRef}, function(event){
                            // event.data.dialogRef.close();
                            //BootstrapDialog.closeAll();
                            // window.location.reload();
                       // });
                        //$message.append($button);
                
                        return $message;
                    },
                    closable: true
                });
            }
        });
    }



// -----------------  end of view checked employees for (supervisor) ec_manual_request (modal) ------------------

// ----------------- view checked REVIEWED employees for (supervisor) ec_manual_request (modal) ------------------

    function viewChecked_rev(){
        var a = document.getElementsByName('chk[]');
        var c_empty = "";
        var temp = "";

        for (var i = 0; i < a.length; i++) {
            if(a[i].checked == true){
                c_empty = "true";
                id = a[i].value;
                temp += id + "&";
            }
        }

        if (c_empty == "") {
            var dialog = new BootstrapDialog({
                size: BootstrapDialog.SIZE_SMALL,
                message: function(dialogRef){
                    var $message = $('<h4 class="text-center text-danger">Please Select Employee(s) !</h4>');
                    var $button = $('<br><br><button class="btn btn-primary btn-md">OK</button>');
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
            return;
        }

        $(".resp4").html('');
        $(".empPreview").html('');
        //$("#chkEmpes").modal("show");         
        $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

        $.ajax({
            type:"POST",
            url:"ajaxprocess.php?request=viewCHECKED_rev",
            data : { temp:temp },
            success:function(data){
                //setTimeout(function(){
                    // $(".resp4").html('');
                    // data = data.trim();
                    //alert(data);
                    // var new_data = data.split("|");
                    // $(".emp_id").val(new_data[0]);
                    // $(".fullname").val(new_data[1]);
                    // $(".position").val(new_data[2]);
                    // $(".empPreview").html(data);
                // },500);
                BootstrapDialog.show({
                    title: 'VIEW CHECKED EMPLOYEE(S)',
                    type: BootstrapDialog.TYPE_PRIMARY,
                    //size: BootstrapDialog.SIZE_LARGE,
                    message: function(dialogRef){
                        var $message = $(''+data+'');
                        //var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                        //$button.on('click', {dialogRef: dialogRef}, function(event){
                            // event.data.dialogRef.close();
                            //BootstrapDialog.closeAll();
                            // window.location.reload();
                       // });
                        //$message.append($button);
                
                        return $message;
                    },
                    closable: true
                });
            }
        });
    }

// -----------------  end of view checked REVIEWED employees for (supervisor) ec_manual_request (modal) ------------------



// ----------------- select term for (supervisor) ec_manual_request (modal) ------------------

function selectTerm(){
    var par_id = "";
    var a = document.getElementsByName('chk[]');
    var set_term = $("[name = 'set_terms']").val();

    for(var i = 0; i < a.length; i++){
        if(a[i].checked == true){
            c_empty = "true";
            id = a[i].value;
            par_id += id + "&";
        }
    }

    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span>  Warning',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Do you want to continue?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok-sign',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "../supervisor/template/EmpCredit/select_term.php?request=set_term",
                    data: { par_id:par_id, set_term:set_term },
                    success: function(data){
                        if (data == "Successfully Reviewed. Thank You."){
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-success">Successfully Reviewed!</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
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
                        }else{
                            var dialog = new BootstrapDialog({
                                size: BootstrapDialog.SIZE_SMALL,
                                message: function(dialogRef){
                                    var $message = $('<h3 class="text-center text-danger">'+data+'</h3>');
                                    var $button = $('<br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                                    $button.on('click', {dialogRef: dialogRef}, function(event){
                                        event.data.dialogRef.close();
                                        dialog.close();
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
            icon: 'glyphicon glyphicon-remove-sign',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    });
}

// -----------------  end of multiple set status to "Reviewed" for (supervisor) ec_manual_request (modal) ------------------

// -----------------  to view Duplicates during file upload (supervisor) import_export_TF.php (modal) ------------------

function viewDuplicate(dup){
    $.ajax({
        type:"GET",
        url:"../supervisor/template/EmpCredit/duplicate_upload.php?request="+dup,
        success:function(data){
            BootstrapDialog.show({
                title: 'VIEW DUPLICATES',
                type: BootstrapDialog.TYPE_PRIMARY,
                //size: BootstrapDialog.SIZE_LARGE,
                message: function(dialogRef){
                    var $message = $(''+data+'');
                    //var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                    //$button.on('click', {dialogRef: dialogRef}, function(event){
                        // event.data.dialogRef.close();
                        //BootstrapDialog.closeAll();
                        // window.location.reload();
                   // });
                    //$message.append($button);

                    return $message;
                },
                closable: true
            });
        }
    });
}

// ----------------- end to view Duplicates during file upload (supervisor) import_export_TF.php (modal) ------------------

// -----------------  to view Text Files with Transactions during file upload (supervisor) end_of_day.php (modal) ------------------



function viewTF_wTrans(trans){
    
     var message_diag = new BootstrapDialog.show({
        // size: BootstrapDialog.SIZE_WIDE,
        type: BootstrapDialog.TYPE_DEFAULT,
        title: '<b class="fnt14"><img src="../assets/img/creditcon.png" width="20">&nbsp; REGULAR CREDIT : </b>',
        message: function(dialog) {
            var content = $('<div></div>');
            var page = dialog.getData('pageToLoad');
            content.load(page);    
            return content;
        },  
        data: {'pageToLoad':'template/EmpCredit/viewTF.php'},
        draggable: true, 
        closable: false,           
        buttons: [{
        label: 'Close',
        cssClass: 'btn-default btn-fill btn-sm',
        action: function(error_dialog) {
    

            error_dialog.close();
        }
        },{
        label: 'Update Salary No',
        cssClass: 'btn-success btn-fill btn-sm',
        action: function(error_dialog) {
            var conf_empty = "";
            var temp = "";
            var a = $("input[type='checkbox']");

            for(var i=0;i < a.length;i++) {
            if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;    
            }               
            }
                if (conf_empty == ''){
                alert("Please Select Employee(s)!");                    
                }else{
                $.post('template/EmpCredit/updatesalall.php',
                { temp:temp },
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

        }
        },{
        label: 'Proceed',
        cssClass: 'btn-success btn-fill btn-sm',
        action: function(error_dialog) {
            var sss = $('.sad').attr('alt');
            // if(sss == ""){
            //     // alert("sadasd");
            // }
            var x = 's';
            var conf_empty = "";
            var temp = "";
            var a = $("input[type='checkbox']");

            for(var i=0;i < a.length;i++) {
            if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;     
            }               
            }
                if (conf_empty == ''){
                alert("Please Select Employee(s)!");    
                }else if(sss != ''){
                alert(sss);
                }else{
                $.post('template/EmpCredit/upload_new.php',
                {'forupload':x},
                function(data){
                message_diag.close();

                var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
                var loader = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"><i class="glyphicon glyphicon-list"></i> UPLOAD EC TEXT FILES </b>',
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
        }
        }]
        });
        message_diag.getModalContent().css('border-radius', '2px');
        message_diag.getModalHeader().css({'padding':'2% 5.5%', 'height':'1%'});
        message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#e8f1ef'});
        message_diag.getModalBody().css({'padding':'1.5% 5.5%', }); 

}




function specialcredit(trans){
    
     var message_diag = new BootstrapDialog.show({
        // size: BootstrapDialog.SIZE_WIDE,
        type: BootstrapDialog.TYPE_DEFAULT,
        title: '<b class="fnt14"><img src="../assets/img/creditcon.png" width="20">&nbsp; SPECIAL CREDIT : </b>',
        message: function(dialog) {
            var content = $('<div></div>');
            var page = dialog.getData('pageToLoad');
            content.load(page);    
            return content;
        },  
        data: {'pageToLoad':'template/EmpCredit/specialcred.php'},
        draggable: true, 
        closable: false,           
        buttons: [{
        label: 'Close',
        cssClass: 'btn-default btn-fill btn-sm',
        action: function(error_dialog) {
    

            error_dialog.close();
        }
        },{
        label: 'Update Salary No',
        cssClass: 'btn-success btn-fill btn-sm',
        action: function(error_dialog) {
            var conf_empty = "";
            var temp = "";
            var a = $("input[type='checkbox']");

            for(var i=0;i < a.length;i++) {
            if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;    
            }               
            }
                if (conf_empty == ''){
                alert("Please Select Employee(s)!");                    
                }else{
                $.post('template/EmpCredit/updatesalall.php',
                { temp:temp },
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

        }
        },{
        label: 'Proceed',
        cssClass: 'btn-success btn-fill btn-sm',
        action: function(error_dialog) {
            var sss = $('.sad').attr('alt');
            // if(sss == ""){
            //     // alert("sadasd");
            // }
            var x = 's';
            var conf_empty = "";
            var temp = "";
            var a = $("input[type='checkbox']");

            for(var i=0;i < a.length;i++) {
            if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;     
            alert(temp);
            }               
            }
                if (conf_empty == ''){
                alert("Please Select Employee(s)!");    
                }else if(sss != ''){
                alert(sss);
                }else{
                $.post('template/EmpCredit/upload_special.php',
                {'forupload':x},
                function(data){
                message_diag.close();

                var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
                var loader = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"><i class="glyphicon glyphicon-list"></i> UPLOAD EC TEXT FILES </b>',
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
        }
        }]
        });
        message_diag.getModalContent().css('border-radius', '2px');
        message_diag.getModalHeader().css({'padding':'1% 5.5%', 'height':'1%'});
        message_diag.getModalFooter().css({'padding':'1.2% 5.5%', 'background-color':'#e8f1ef'});
        message_diag.getModalBody().css({'padding':'1.5% 5.5%', }); 

}

// ----------------- end of view Text Files with Transactions during file upload (supervisor) end_of_day.php (modal) ------------------

// ----------------- upload Text Files for (supervisor) upload_new.php (modal) ------------------

function UpdateTxt(sal){
    var explodethem = sal.split("|");
    var salno = explodethem[0];
    var filename = explodethem[1];
    var get = $("[name = 'sal_no']").val();
   
    if(salno == ""){
        var dialog = new BootstrapDialog({
            size: BootstrapDialog.SIZE_SMALL,
            message: function(dialogRef){
                var $message = $('<h4 class="text-center text-danger">Please Select Transaction(s)!</h4>');
                var $button = $('<br><br><button class="btn btn-primary btn-md">OK</button>');
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
        return;
    }else{

            var dialog = new BootstrapDialog({
                size: BootstrapDialog.SIZE_SMALL,
                message: function(dialogRef){
                    var $message = $('<h3 class="text-center text-danger">Success!</h3>');
                    var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">OK</i></button>');
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

    $.ajax({
        type:"POST",
        url:"template/EmpCredit/updatesal.php",
        data : { salno:salno, filename: filename },
        success:function(data){
            $("#hideme").hide();
            window.location.reload();

            //window.open('/EBS/supervisor/template/EmpCredit/upload_new.php', '_blank');
        }
    });    

   
    }




// ----------------- end for upload Text Files for (supervisor) upload_new.php (modal) ------------------


// =================== A     C     C     O     U     N     T     I     N    G  ======================

// --------- View Summary of Transaction in POS Text File (show_postledger.php)------------

function view_summary(summa){
    var explodethem = summa.split("*");
    var pay_id = explodethem[0];
    var first_cu = explodethem[1];
    var second_cu = explodethem[2];
    var ref_no = explodethem[3];

    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: 'View Transaction Summary', // +pay_id+','+get_year+','+mon1+','+mon2+','+day1+','+day2,
        size: BootstrapDialog.SIZE_NORMAL,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
            return $message;
        },
        data: { 
            'pageToLoad' : '../accounting/template/EmpCredit/view_trans_summary.php?pay_id='+pay_id+'&first_cu='+first_cu+'&second_cu='+second_cu+'&ref_no='+ref_no
        }
    });
}



// -------- Sort By Month-Day (show_postledger.php) ----------

    function select_cutoff(cutoff){
        var get_mon_day = $("[name = 'mon_day']").val();
        var get_year = $("[name = 'year']").val();
        var mon1 = get_mon_day.slice(0,2);         
        var mon2 = get_mon_day.slice(9,11);         
        var day1 = get_mon_day.slice(3,5);         
        var day2 = get_mon_day.slice(12,14);
 
        $.ajax({
            type: "GET",
            // url: "../accounting/template/EmpCredit/show_postledger.php?sel_mon1="+get_mon1+"&sel_mon2="+get_mon2+"&sel_day1="+get_day1+"&sel_day2="+get_day2+"&sel_year="+get_year+"&get=on_cutoffs",
            url: "../accounting/template/EmpCredit/show_postledger.php?sel_mon1="+mon1+"&sel_mon2="+mon2+"&sel_day1="+day1+"&sel_day2="+day2+"&sel_year="+get_year+"&get=on_cutoffs",
            success: function(data){
                $('#show_postledger').hide().html(data).fadeIn('slow');  
            }
        });
    }
// -------- End of Sort By Month-Day (show_postledger.php) ----------

// -------- Sort By Month-Day (show_postledger.php) ----------
    function select_cutoff2(cutoff){
        var get_mon_day = $("[name = 'mon_day']").val();
        var get_year = $("[name = 'year']").val();
        var mon1 = get_mon_day.slice(0,2);         
        var mon2 = get_mon_day.slice(9,11);         
        var day1 = get_mon_day.slice(3,5);         
        var day2 = get_mon_day.slice(12,14);
        // var temp = cutoff.split(" to ");
        // var date1 = temp[0];          
        // var date2 = temp[1];          
        // alert(get_year);
        $.ajax({
            type: "GET",
            // url: "../accounting/template/EmpCredit/show_postledger.php?sel_mon1="+get_mon1+"&sel_mon2="+get_mon2+"&sel_day1="+get_day1+"&sel_day2="+get_day2+"&sel_year="+get_year+"&get=on_cutoffs",
            url: "../accounting/template/EmpCredit/show_debtors.php?sel_mon1="+mon1+"&sel_mon2="+mon2+"&sel_day1="+day1+"&sel_day2="+day2+"&sel_year="+get_year+"&get=on_cutoffs2",
            success: function(data){
                $('#show_debtors1').hide().html(data).fadeIn('slow');  
            }
        });
    }
// -------- End of Sort By Month-Day (show_postledger.php) ----------

// -------- Sort By Month-Day (show_postledger.php) ----------
    function select_cutoff3(cutoff){
        var get_mon_day = $("[name = 'mon_day']").val();
        var get_year = $("[name = 'year']").val();
        var mon1 = get_mon_day.slice(0,2);         
        var mon2 = get_mon_day.slice(9,11);         
        var day1 = get_mon_day.slice(3,5);         
        var day2 = get_mon_day.slice(12,14);
        // var temp = cutoff.split(" to ");
        // var date1 = temp[0];          
        // var date2 = temp[1];          
        // alert(get_year);
        $.ajax({
            type: "POST",
            // url: "../accounting/template/EmpCredit/show_postledger.php?sel_mon1="+get_mon1+"&sel_mon2="+get_mon2+"&sel_day1="+get_day1+"&sel_day2="+get_day2+"&sel_year="+get_year+"&get=on_cutoffs",
            url: "../accounting/template/EmpCredit/ec_postledger.php?sel_mon1="+mon1+"&sel_mon2="+mon2+"&sel_day1="+day1+"&sel_day2="+day2+"&sel_year="+get_year+"&get=on_cutoffs2",
            success: function(data){
                // $('#show_debtors1').hide().html(data).fadeIn('slow');  
            }
        });
    }

// -------- End of Sort By Month-Day (show_postledger.php) ----------

// -------- Sort By Month-Day (show_postledger.php) ----------
    function summary_period(period){
        var get_mon_day = $("[name = 'mon_day']").val();
        var get_year = $("[name = 'year']").val();
        var mon1 = get_mon_day.slice(0,2);         
        var mon2 = get_mon_day.slice(9,11);         
        var day1 = get_mon_day.slice(3,5);         
        var day2 = get_mon_day.slice(12,14);
        $.ajax({
            type: "POST",
            url: "../payroll/template/deduction_exec/data_text_query.php?query_101="+md_ebmsel+"&dataemp="+emp_idthis+"&sel_mon1="+mon1+"&sel_mon2="+mon2+"&sel_day1="+day1+"&sel_day2="+day2+"&sel_year="+get_year+"&get=on_cutoffs2",
            success: function(data){
                setTimeout(function(){                             
                $('#data_query').hide().html(datas).fadeIn('slow'); 
                $('div#bus').attr({style:'display:inline-block;width:27%;'});
                $('.periods select').on('change',function (){
                  select_cutoff(this.value);
                });
               },250);       
            }
        });
    }

// -------- End of Sort By Month-Day (show_postledger.php) ----------

// -------- AUTO-SUGGEST Employee Only (master_list.php, display_inquiry.php) ---------
function suggest3(inputString3){
    if(inputString3.length == 0) {
        $('#suggestions3').fadeOut();
        $("#position").val('');
        $("#company").val('');
        $("#department").val('');
        $("#business_unit").val('');
        $("#credit_limit").val('');
    } else {
        $('#approved_by').addClass('load');
        $.post("template/EmpCredit/autosug_emp.php", {queryString: ""+inputString3+""}, function(data){
            if(data.length >0) {
                $('#suggestions3').fadeIn();
                $('#suggestionsListf').show().html(data);
                $('#approved_by').removeClass('load');
            }
        });
    }
}

function fill3(thisVal) {
    $('#search_emp').val(thisVal);
    setTimeout("$('#suggestions3').fadeOut();", 600);
    var temp = thisVal.split("*");
    var empid = temp[0];
    // alert(empid);
    $.ajax({
        type:"POST",
        url:"template/EmpCredit/autosug_emp.php",
        data:{ empid : empid },
        success:function(data){
            //alert(data);
            var new_data = data.split("|");
            $("#position").val(new_data[0]);
            $("#company").val(new_data[1]);
            $("#department").val(new_data[2]);
            $("#business_unit").val(new_data[3]);
            $("#credit_limit").focus();
        }
    });
}

// -------- END of AUTO-SUGGEST Employee Only (master_list.php) ---------

// -------- Display ledger of employee (master_list.php) ---------
function displayLedger(){
// if (type == 'pendingEC'){
    var emp_id = $("[name = 'search_emp']").val();
    var empdata = emp_id.split("*");
    var thisid = empdata[0];
  
    $('#display_ledger').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");
    $.ajax({
        type: "POST",
        url: "template/EmpCredit/display_ledger.php?request=my_ledger",
        data: { thisid:thisid },
        success: function(data){
            $("#search_employee").hide();
            $("#display_ledger").show();
            setTimeout(function(){
                $('#display_ledger').html(data);
            }, 100);
        }
    });
// }
}
// -------- Display ledger of employee (master_list.php) ---------


// ----------------- view checked employees for (accounting) ec_postledger (modal) ------------------
function viewChecked_post(){
    var a = document.getElementsByName('chkp[]');
    var c_empty = "";
    var temp = "";

    for (var i = 0; i < a.length; i++) {
        if(a[i].checked == true){
            c_empty = "true";
            id = a[i].value;
            temp += id + "&";
        }
    }

    if (c_empty == "") {
        var dialog = new BootstrapDialog({
            size: BootstrapDialog.SIZE_SMALL,
            message: function(dialogRef){
                var $message = $('<h4 class="text-center text-danger">Please Select Employee(s) !</h4>');
                var $button = $('<br><br><button class="btn btn-primary btn-md">OK</button>');
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
        return;
    }

    $(".resp4").html('');
    $(".empPreview").html('');
    //$("#chkEmpes").modal("show");         
    $(".resp4").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

    $.ajax({
        type:"POST",
        url:"ajaxprocess.php?request=viewCHECKED_post",
        data : { temp:temp },
        success:function(data){
            //setTimeout(function(){
                // $(".resp4").html('');
                // data = data.trim();
                //alert(data);
                // var new_data = data.split("|");
                // $(".emp_id").val(new_data[0]);
                // $(".fullname").val(new_data[1]);
                // $(".position").val(new_data[2]);
                // $(".empPreview").html(data);
            //},500);
        BootstrapDialog.show({
            title: 'VIEW CHECKED EMPLOYEE(S)',
            type: BootstrapDialog.TYPE_PRIMARY,
            //size: BootstrapDialog.SIZE_LARGE,
            message: function(dialogRef){
                var $message = $(''+data+'');
                //var $button = $('<br><br><button class="btn btn-primary btn-md"><i class="glyphicon glyphicon-ok">&nbsp;OK</i></button>');
                //$button.on('click', {dialogRef: dialogRef}, function(event){
                    // event.data.dialogRef.close();
                    //BootstrapDialog.closeAll();
                    // window.location.reload();
               // });
                //$message.append($button);
        
                return $message;
            },
            closable: true
        });
        dialog.realize();
        dialog.getModalHeader().hide();
        dialog.getModalFooter().hide();
        dialog.getModalBody().css('background-color', '#FFF');
        dialog.getModalBody().css('color', '#F00');
        dialog.open();
        }
    });
}
// -----------------  end of view checked employees for (accounting) ec_postledger (modal) ------------------

// ----------------- view ledger per employee for accounting (display_leger.php & display_ledger_details.php) -------------------
function display_more(info){
    var infos = info.split("*");
    var emp_id = infos[0];
    // var ref_no = infos[1];
    var amort_ref = infos[2];
    // alert(amort_ref);

    $('#display_more_ledger').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");

    $.ajax({
        type: "POST",
        url: "template/EmpCredit/display_ledger_details.php?request=show_ledger",
        data: {emp_id:emp_id, amort_ref:amort_ref},
    success: function(data){
        $("#first_table").hide();
        $("#footer_down").hide();
        $("#display_ledger_details").show();
        setTimeout(function(){
            $('#display_ledger_details').html(data);
        },100);
    }
    });
}

// ----------------- end of view ledger per employee for accounting (display_leger.php) -------------------

// ----------------- filter transactions per business unit for accounting (filter_transactions.php) -------------------
function filter_trans_bu(){
    var comp_code = $("[name = 'code']").val();
    var bu_code = $("[name = 'b_code']").val();
    var pos_name = $("[name = 'pos_name']").val();
    $('#filtered_data').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");

    $.ajax({
        type: "POST",
        url: "../accounting/template/EmpCredit/filter_per_bu.php?request=filter_trans_bu",
        data: {comp_code:comp_code, bu_code:bu_code, pos_name:pos_name},
    success: function(data){
        setTimeout(function(){
            $('#collapseOne').attr({class:"panel-collapse collapse"});
            $('#show_postledger').hide().html(data).fadeIn('slow'); 
        }, 100);
    }
    });
}
// ----------------- end for filter transactions per business unit for accounting (filter_transactions.php) -------------------

// ----------- BACK function (filter_per_bu.php)-----------
function back(){
    $("#filtered_data").hide();
    $("#main_div").fadeIn('slow');
}
// ----------- end of BACK function (filter_per_bu.php)-----------

// -------- AUTO-SUGGEST FILTER TRANSACTIONS PER EMPLOYEE (filter_transactions.php) ---------
function suggest_per_emp(inputString){
    if(inputString.length == 0) {
        $('#suggestions').fadeOut();
        $("#position").val('');
        $("#company").val('');
        $("#department").val('');
        $("#business_unit").val('');
        $("#photo").val('');
        $("#credit_limit").val('');
    }else{
        $('#name').addClass('load');
        $.post("template/EmpCredit/autosuggest.php", {queryString: ""+inputString+""}, function(data){
            if(data.length >0) {
                $('#suggestions').fadeIn();
                $('#suggestionList_emp').show().html(data);
                $('#name').removeClass('load');
            }
        });
    }
}

function fill_per_emp(thisVal) {
    $('#name').val(thisVal);
    setTimeout("$('#suggestions').fadeOut();", 600);
    var temp = thisVal.split("*");
    var empid = temp[0];
    $.ajax({
        type:"POST",
        url:"template/EmpCredit/autosuggest.php",
        data:{ empid : empid },
        success:function(data){
            //alert(empid);
            var new_data = data.split("|");
            $("#position").val(new_data[0]);
            $("#company").val(new_data[1]);
            $("#department").val(new_data[2]);
            $("#business_unit").val(new_data[3]);
            $("#photo").val(new_data[4]);
            $("#emptype").val(new_data[5]);
            $("#eocdate").val(new_data[6]);

            // $("#credit_limit").focus();
            $("#photo").html('<img src="'+new_data[4]+'" style="width: 170px; height: 170px; margin-top: 1.3%; border-radius: 5px;">');
            
            //setTimeout("$('#pic').fadeOut();", 10);
            $('#pic').hide(0);            
        }
    });
}

// ----------------- filter transactions per employee for accounting (filter_transactions.php) -------------------
function filter_per_emp(){
    var name = $("#name").val();
    var temp = name.split("*");
    var emp_id = temp[0];
    var names = temp[1];
    $('#filtered_data').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");

    $.ajax({
        type: "POST",
        url: "../accounting/template/EmpCredit/filter_per_emp.php?request=filter_trans_emp",
        data: { emp_id:emp_id, names:names },
        success: function(data){
            $("#main_div").hide();
            $("#filtered_data").show();
            setTimeout(function(){
                $('#collapseTwo').attr({class:"panel-collapse collapse"});
                $('#filtered_data').html(data);
            }, 100);
        }
    });
}
// ----------------- end for filter transactions per employee for accounting (filter_transactions.php) -------------------

// ----------------- filter transactions per day for accounting (filter_transactions.php) -------------------
function filter_per_day(){
    var from_date = $("#from_date").val();
    var to_date = $("#to_date").val();
    $('#show_postledger').html("<img src='.././././assets/img/loader.gif'> Please Wait.....");

    $.ajax({
        type: "POST",
        url: "../accounting/template/EmpCredit/filter_per_day.php?request=filter_trans_day",
        data: {from_date:from_date, to_date:to_date},
        success: function(data){
            // alert(data);
            $("#main_div").hide();
            $("#show_postledger").show();
            setTimeout(function(){
                $('#collapseThree').attr({class:"panel-collapse collapse"});
                $('#show_postledger').html(data);
            }, 100);
        }
    });
}

// =================== E N D   O F    A     C     C     O     U     N     T     I     N    G  ======================

function generateCSVs(){
    var conf_empty = "";
    var temp = "";
    var a = $("input[type='checkbox']"); //document.getElementsByName('chck[]');

    for(var i=0;i < a.length;i++) {
        if(a[i].checked == true) {
            conf_empty = "true";
            id = a[i].value + "&";
            temp += id;    

        }               
    }
  
    if(conf_empty == ""){
            alert("Process can't be completed.  Please select Trasnsactions. ");
    }else{
    var message_diag = new BootstrapDialog.show({
                size: BootstrapDialog.SIZE_SMALL,
                type: BootstrapDialog.TYPE_DEFAULT,
                title: '<b class="fnt14"><i class="glyphicon glyphicon-align-right"></i> EC CREDIT SET-UP :</b>',
                message: '<span class="fnt14">Do you want to save this transaction?</span>',
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
                        // alert(manual_ded);
                        $.post('template/EmpCredit/ec_genfile.php',
                        {'par':temp},
                        function(data){
                        message_diag.close();

                        var img_loader = '<img src="../assets/icon_index/ec2.gif" width="150"><br />';
                        var loader = new BootstrapDialog.show({
                        size: BootstrapDialog.SIZE_SMALL,
                        type: BootstrapDialog.TYPE_DEFAULT,
                        title: '<b class="fnt14"> <i class="glyphicon glyphicon-ok-circle"></i> Approve Credits</b>',
                        message:img_loader,
                        draggable: true, 
                        closable: false  
                        });
                        loader.getModalHeader().css({'padding':'2.5% 6.5%'});  
                        loader.getModalContent().css({'margin-top':'60%', 'border-radius':'2px'});
                        loader.getModalFooter().remove();
                        loader.getModalBody().css({'padding':'0% 0%', 'text-align':'center', 'background-color':'#fff', 'height':'130px'});   
                        setTimeout(location.reload.bind(location), 2000);
                        }); 

                }
                }]
                });
                message_diag.getModalContent().css('border-radius', '2px');
                message_diag.getModalHeader().css({'padding':'2.5% 6.5%'});
                message_diag.getModalFooter().css({'padding':'1.8% 6.5%', 'background-color':'#fcf8e3'});
                message_diag.getModalBody().css({'padding':'2.5% 6.5%', 'height':'60px'});  

}
}

//=============== functions for inline editor of amount =================
function inline_edit(el, i, empId, action, type){
    el.hide();
    var num = Number(el.val()).toFixed(2);
    var obj = [{emp_id:empId, amt:num}];

        BootstrapDialog.show({
            title: '<span class="glyphicon glyphicon-warning-sign"></span> <h4 style="display:inline-block;margin:0;padding:0;">Remarks</h4>',
            type: BootstrapDialog.TYPE_DANGER,
            size: BootstrapDialog.SIZE_SMALL,
            closable:false,
            draggable:true,
            message: '<textarea id="remarks" style="resize:none;width:100%;"></textarea><p style="font-family:calibri, sans-serif;font-size:12px;line-height:14px;margin:0;"><span style="color:red;padding-right:10px;">Note:</span>This adjustment will take effect upon the approval by ???</p>',
            buttons: [{
                label: 'Yes',
                icon: 'glyphicon glyphicon-ok-sign',
                cssClass: "btn-md btn-success",
                action: function(dialog) {
                    var remarks = $('textarea#remarks').val();
                    $.ajax({
                        type: "POST",
                        url: "../payroll/template/EmpCredit/adjust_acl.php",
                        data: { adjust:obj, remarks:remarks, type:'ads'},
                        success: function(data){
                            if(action){
                                action+'()';
                            } else {
                                window.location.reload();
                            }
                        }
                    });
                    dialog.close();
                }
            }, {
                label: 'No',
                icon: 'glyphicon glyphicon-remove-sign',
                cssClass: "btn-md btn-danger",
                action: function(dialog) {
                    dialog.close();
                }
            }]
        }); 
    // }
    return num;
}

function inline_edit2(el, i, empId, type){
    var num = Number(el.val()).toFixed(2);
    var obj = [{emp_id:empId, amt:num, acl_id:i}];
    $.ajax({
        type: "POST",
        url: "../incorporator/template/EmpCredit/approve_acl.php",
        data: { adjust:obj, type:type },
        success: function(data){
          //window.location.reload();
        }
    });
    el.hide();
    return num;
}

function inline_edit_icon(elem){
      $(elem).append('<span class="glyphicon glyphicon-pencil" style="color:blue;margin-left:10px;"></span>');
}
function inline_hide_icon(elem){
      $(elem).remove();
}

function approve_acl(id,indx){
    var acl = $("input#acl");
    var amt = Number($(acl[indx-1]).val()).toFixed(2);
    $.ajax({
        type: "POST",
        url: "../incorporator/template/EmpCredit/approve_acl.php",
        data: { acl_id:id, amt:amt },
        success: function(data){
          window.location.reload();
        }
    });
}

function dsapprove_acl(id){
    BootstrapDialog.show({
        title: '<span class="glyphicon glyphicon-warning-sign"></span> <h4 style="display:inline-block;margin:0;padding:0;">???</h4>',
        type: BootstrapDialog.TYPE_DANGER,
        size: BootstrapDialog.SIZE_SMALL,
        closable:false,
        draggable:true,
        message: 'Are you sure you want to remove this request?',
        buttons: [{
            label: 'Yes',
            icon: 'glyphicon glyphicon-ok-sign',
            cssClass: "btn-md btn-success",
            action: function(dialog) {
                $.ajax({
                    type: "POST",
                    url: "../incorporator/template/EmpCredit/approve_acl.php",
                    data: { acl_id:id, stat:'DISAPPROVED' },
                    success: function(data){
                      window.location.reload();
                    }
                });
                dialog.close();
            }
        }, {
            label: 'No',
            icon: 'glyphicon glyphicon-remove-sign',
            cssClass: "btn-md btn-danger",
            action: function(dialog) {
                dialog.close();
            }
        }]
    }); 
}
//=============== end functions for inline editor of amount =================

//=============== for pagination ======================
function paginate(offset,tblID){
    var rowsShown = 10;

    $('table#'+tblID+' tbody tr').hide();
    $('table#'+tblID+' tbody tr').slice(0, rowsShown).show();

    var currPage = offset - 1;
    var startItem = currPage * rowsShown;
    var endItem = startItem + rowsShown;

    $('table#'+tblID+' tbody tr').hide().slice(startItem, endItem).
      css('display','table-row').animate({opacity:1}, 300);
}



function numbersOnly(elem){
    elem.keydown(function(e){
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || 
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: Ctrl+C
            (e.keyCode == 67 && e.ctrlKey === true) || 
             // Allow: Ctrl+X
            (e.keyCode == 88 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
}

function formatNumbers(amt){
    if(isNaN(parseFloat(amt))) {
        return "0.00"; //if the input is invalid just set the value to 0.00
    }
    var num = parseFloat(amt);
    return (num / 100).toFixed(2); //move the decimal up to places return a X.00 format
}
// ====================END FOR EMPLOYEE'S CREDIT===========================

