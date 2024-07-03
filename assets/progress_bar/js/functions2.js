function suggest(inputString,n){

        if(inputString.length == 0) {
            $('#suggestions'+n).slowOut();
            $("#position"+n).val('');
            $("#department"+n).val('');
            $("#credit_limit").val('');
        } else {
            $('#name').addClass('load');
            $.post("template/CompanyHousingProg/autosug_kin.php", {queryString: ""+inputString+"", queryString1: n}, function(data){
                if(data.length >0) {
                    $('#suggestions'+n).slowIn();
                    $('#suggestionsList'+n).show().html(data);
                    $('[name="kin_'+n+'"]').removeClass('load');
                }
            });
        }
    }

       // suggestion function CHP--------------------------------------->

    function fill(thisVal,n) {

        setTimeout("$('#suggestions"+n+"').slowOut();", 600);
        var temp = thisVal.split("*");
        var empid = temp[0];
        $('[name="kin_'+n+'"]').val(temp[1].trim());
        $.ajax({
            type:"POST",
            url:"template/CompanyHousingProg/autosug_kin.php",
            data:{ empid : empid },
            success:function(data){
                var new_data = data.split("|");
                $("#position"+n).val(new_data[0]);
                $("#department"+n).val(new_data[1]);
                $("#credit_limit").focus();
            }
        });
    }
    



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


    // suggestion function CHP--------------------------------------->

function chp_view()
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_SUCCESS,
        title: 'None so far',
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad': '../employee/template/CashAdvance/modal_OutCredit.php'
        }
    });
}


// =======================CHP HRMS ==========================================

function chp_view_hr(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "VIEW APPLICANT INFORMATION:",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../supervisor/template/CompanyHousingProg/view_app_details.php?id='+id
        }
    });
}

function chp_del_applicant(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "DELETE APPLICANT'S FILE:",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../supervisor/template/CompanyHousingProg/del_CHP_applicant.php?id='+id
        }
    });
}

function chp_requirement(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        size: BootstrapDialog.SIZE_WIDE,
        title: "UPLOAD REQUIREMENTS:",
        message: function(dialog) {
            var $message = $('<div style="height:650px;"></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../supervisor/template/CompanyHousingProg/CHP-requirement.php?id='+id
        }
    });
}

function chp_endorse(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "SEND ENDORSEMENT LETTER:",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../supervisor/template/CompanyHousingProg/endorse.php?id='+id
        }
    });
}

function lg_view_bs(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "VIEW APPLICANT'S BANK STATEMENT :",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../legal/template/CompanyHousingProg/lg_view_bs.php?id='+id
        }
    });
}

function inc_remarks(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: "Write Remarks Here:",
        message: function(dialog) {
            var $message = $('<div style="padding:0px;border-top:2px solid white;border-radius:0px;" ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../incorporator/template/CompanyHousingProg/remarks.php?id='+id
        }
    });
}

function cs_set_con(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Applicant for Unit Construction :",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../construction/template/CompanyHousingProg/con_set_costruct.php?id='+id
        }
    });
}

function cs_set_cost(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Project Total Cost:",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../construction/template/CompanyHousingProg/con_set_cost.php?id='+id
        }
    });
}
//------chp------accounting---

function mm_amm(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Deduction Amount:",

        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../accounting/template/CompanyHousingProg/mm_ammortization.php?id='+id
        }
    });
}

function py_mm_amm(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Deduction Amount:",
        draggable:true,
        closable:false,
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../payroll/template/CompanyHousingProg/mm_ammortization.php?id='+id
        }
    });
}

function fixe_total(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Fixed Total For Employee's Amortization:",
        draggable:true,
        closable:false,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../accounting/template/CompanyHousingProg/amm_fix_total.php?id='+id
        }
    });
}

function view_ledger(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
		size: BootstrapDialog.SIZE_WIDE,
        title: "<img src='../assets/img/book.png' style='width:30px;'></img>&nbsp;Ledger Details:",
        draggable:true,
        closable:false,
		autoResize: true,
		resizable: false,
        message: function(dialog) {
            var $message = $('<div></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../accounting/template/CompanyHousingProg/ledger_details.php?id='+id
        }
    });
}

function fixe_total_hr(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Fixed Total For Employee's Amortization:",
        draggable:true,
        closable:false,
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../supervisor/template/CompanyHousingProg/amm_fix_total.php?id='+id
        }
    });
}




function set_partial(entry_id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        size: BootstrapDialog.SIZE_SMALL,
        title: "Partial Payment",
        draggable:true,
        closable:false,
        message: function(dialog) {
            var $message = $('<div style="height:400px;"></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../accounting/template/CompanyHousingProg/acc_partial_ent.php?id='+entry_id
        }
    });
}



function view_con_prof(value2)
{
	var value_on = value2.split('*');
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        title: "Basic data of "+value_on[1],
        draggable:true,
        // closable:false,
        message: function(dialog) {
            var $message = $('<div style="height:430px;"></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../construction/template/CompanyHousingProg/con_prof.php?id='+value_on[0]
        }
    });
}


function set_sd_cost(id)
{
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        title: "Set Project Cost for Single Residential Units:",
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../construction/template/CompanyHousingProg/con_sd_cost.php?id='+i1d
        }
    });
}

// payroll =================================================================================================================
function set_empsalary(sal)
{
    var name_this=sal.split("*");
    BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        size: BootstrapDialog.SIZE_SMALL,
        title: "Salary rate for "+name_this['1'],        
        closable:false,
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../payroll/template/CompanyHousingProg/set_empsal.php?salary='+name_this['0']+'&iddn='+name_this['2']
        }
    });
}



function set_inc(rag_unthis)
{

    var name_chk1 = document.getElementsByClassName("cbox_");

    var data_array = "";

    for(var dval=0; dval < name_chk1.length;dval++){

        var in_getthis = document.getElementsByClassName("cbox_")[dval].value;

        if(name_chk1[dval].checked){

            data_array += in_getthis + "|"    

       }

    }

     if(rag_unthis == 'rem'){
            var title_on = "Write a reason for Rejecting this aplication/s"  
        }else{
            var title_on = "Write a Remark for Approving this aplication/s"
        }

    if(data_array!=''){

        BootstrapDialog.show({
        type: BootstrapDialog.TYPE_PRIMARY,
        size: BootstrapDialog.SIZE_MEDIUM,
        title: title_on,             
        closable:false,
        message: function(dialog) {
            var $message = $('<div style="max-height:inherit;margin-bottom:1%;padding-bottom:4%;"></div>');       
            $message.load('../incorporator/template/CompanyHousingProg/re_ap_list.php?in_idt='+data_array+"&idt_action="+rag_unthis);    
            return $message;
        },
       
    });

    }else{

        alert('Please Select an applicant');
    }


}



// ==========================================================================================================================

function view_data_list(){
            BootstrapDialog.show({
            title: 'Button Hotkey',
            message: $('<textarea class="form-control" placeholder="Try to input multiple lines here..."></textarea>'),
            buttons: [{
                label: '(Enter) Button A',
                cssClass: 'btn-primary',
                hotkey: 13, // Enter.
                action: function() {
                    alert('You pressed Enter.');
                }
            }]
        });

}



    function about_us(){

        // alert('asfdsadfd');

                BootstrapDialog.show({
                type: BootstrapDialog.TYPE_INFO,
                size: BootstrapDialog.SIZE_WIDE,
                title: "EMPLOYEES BENEFITS MODUL",        
                
                message: function(dialog) {
                var $message = $('<div style="height:500px;overflow:auto;"></div>');
                var pageToLoad = dialog.getData('pageToLoad');
                $message.load(pageToLoad);

                return $message;
                },
                data: {

                'pageToLoad':'../About/aboutus.php'

                }
                });



                    // BootstrapDialog.show({
                    // type: BootstrapDialog.TYPE_PRIMARY,
                    // size: BootstrapDialog.SIZE_MEDIUM,
                    // title: title_on,             
                    // closable:false,
                    // message: function(dialog) {
                    // var $message = $('<div style="max-height:inherit;margin-bottom:1%;padding-bottom:4%;"></div>');       
                    // $message.load('../About/aboutus.php');    
                    // return $message;
                    // },
                    // });

    }



// employee view request status ===================================================================================

function view_req()
{    
        BootstrapDialog.show({
        type: BootstrapDialog.TYPE_DEFAULT,
        size: BootstrapDialog.SIZE_SMALL,
        title: "Salary rate for",        
        closable:false,
        message: function(dialog) {
            var $message = $('<div ></div>');
            var pageToLoad = dialog.getData('pageToLoad');
            $message.load(pageToLoad);
    
            return $message;
        },
        data: {
            'pageToLoad':'../payroll/template/CompanyHousingProg/set_empsal.php'

        }
    });
}

      function set_condataref(){

                      var name_chk1 = document.getElementsByClassName("cbox_");

                      var data_array = "";

                    for(var dval=0; dval < name_chk1.length;dval++){

                      var in_getthis = document.getElementsByClassName("cbox_")[dval].value;

                    if(name_chk1[dval].checked){

                       data_array += in_getthis + "|"    

                    }

                    }                  

                    if(data_array == ""){

                        alert("Please select an applicant from the list...");

                    }else{

                        var con_action = confirm("Are You Sure you want to set this applicant/s for Unit Construction?");

                        if(con_action==true){             

                         $.ajax({
                              type: "GET",
                              url: "../construction/template/CompanyHousingProg/con_set_exec.php?id_by="+data_array,
                              success: function(datas){                                                         
                                   window.location.reload();                                                                   
                              }                        
                          });
                        }                     

                    }

      }





      function reg_con_sup(ACdata){

                var name_chk1 = document.getElementsByClassName("cbox_");
                var data_array = "";
                for(var dval=0; dval < name_chk1.length;dval++){
                var in_getthis = document.getElementsByClassName("cbox_")[dval].value;
                if(name_chk1[dval].checked){
                data_array += in_getthis + "|"   
                }
                }                  

                if(ACdata === '2_set' ){ var act = 'Disapprove' }
                else{var act =  'Approve' }

                if(data_array == ""){
                // alert("Please select an applicant from the list...");

                var DIVCONT = 'Please Select any of the request from the list below. Thank you!';                     

                    var dialog = new BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: "WARNING: ",
                    message: ''+DIVCONT,
                    draggable: true,
                    closable: false,
                        buttons: [{             
                            label: 'Okay',
                            cssClass: 'btn-default btn-sm active',
                            action: function(dialog) {
                            dialog.close();
                        }
                        }]
                    });
                    dialog.getModalContent().css('border-radius', '3px');
                    dialog.getModalHeader().css({'padding':'2% 5%', 'border-radius':'0px'});
                    dialog.getModalBody().css({'height':'70px', 'padding':'2% 5%'});
                    dialog.getModalFooter().css({'padding':'2.5% 5%', 'border':'0px'});

                }  else{

                var DIVCONT = 'Please provide your remark to this request:<br /><br />';  
                    DIVCONT += '<textarea id="remarktx" class="form-control input-sm" style="height:75px;border-radius:1px;"></textarea>';                  

                    var dialog = new BootstrapDialog.show({
                    size: BootstrapDialog.SIZE_SMALL,
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: "Request Remark: ["+act+"]",
                    message: ''+DIVCONT,
                    draggable: true,
                    closable: false,
                        buttons: [{             
                            label: 'Cancel',
                            cssClass: 'btn-default btn-sm active',
                            action: function(dialog) {
                            dialog.close();
                        }
                        },{             
                            label: 'Proceed',
                            cssClass: 'btn-success btn-sm active',
                            action: function(dialog) {
                                var remdatas = $('textarea[id=remarktx]').val();
                                if(remdatas !== ''){
                                    $.ajax({
                                    type: "POST",
                                    url: "../supervisor/template/CompanyHousingProg/CHP-reject_delete.php",
                                    data:{id_by:data_array, remSET:remdatas, act_s:act},
                                    success: function(datas){            
                                         window.location.reload();                                                                   
                                    }  
                                    });
                                }
                                else{
                                    $('textarea[id=remarktx]').focus().attr({'placeholder':'Please provide your remerk here!'});
                                }
                                                    
                        }
                        }]
                    });
                    dialog.getModalContent().css('border-radius', '3px');
                    dialog.getModalHeader().css({'padding':'2% 4%', 'border-radius':'0px'});
                    dialog.getModalBody().css({'height':'110px', 'padding':'2% 4%'});
                    dialog.getModalFooter().css({'padding':'2% 4%', 'border':'0px'});

                }                     


      };





// ==========================================================================================================
function thids(){                                                                                         //=  
var in_name = document.getElementsByClassName("this_echo");                                               //=
for(z=0; z < in_name.length; z++){                                                                        //=
var in_name2 = document.getElementsByClassName("this_echo")[z].value;                                     //=
                                                                                                          //=
var this_noe = in_name2 + document.getElementsByClassName("this_echo")[z].value;                          //=     
                                                                                                          //=
                                                                                                          //=
}                                                                                                         //=
alert(this_noe);                                                                                          //=
// alert(in_name2.toFixed());                                                                             //=
}                                                                                                         //=
// ==========================================================================================================