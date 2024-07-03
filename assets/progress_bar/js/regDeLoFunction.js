// (RDRB)
//update Oct. 10 //used in piConSetup.php

// checks and unchecks checkboxes
function checkAll(){
  $("input[id='chkBox']").prop("checked", true);
}

function unCheckAll(){
  $("input[id='chkBox']").prop("checked", false);
}

function getBusinessName(){
  
  var code_C = $("[name='code']").val();
				
  // $(".loadImg1").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');
		
  //displaying business unit
  $.ajax({
    type:"POST",
    url:"../benefits/template/RegDeLo/formLoader.php?request=load_bU",
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
    url:"../benefits/template/RegDeLo/formLoader.php?request=load_department",
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

  var c_code = $("[name = 'code']").val();
  var b_code = $("[name = 'b_code']").val();
  var d_code = $("[name = 'dept_code']").val();
			
  //employee
			
  $(".respSection").html('<img src="../assets/img/loader.gif" alt="" width="16" height="16" border="0" /> <span class = "loading_msg">Please Wait....</span>');

  $.ajax({
  type:"POST",
  url:"../benefits/template/RegDeLo/formLoader.php?request=l_sec",
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
  });  //end ajax
 }  //end function getSection

function searchEmp(){

  var empName = $("[name = 'f_name']").val();

  $.ajax({
  type:"POST",
  url:"../benefits/template/RegDeLo/formLoader.php?request=f_emp",
  data : {empName:empName},
  success:function(data){
    data.data.trim();
    $(".setData").html(data);
    if(empName == ""){
      $(".setData").html('Data not loaded');
    }
  }
  });  //end ajax request
}  //end searhEmployee function

function loadTable(){

  var com = $("[name = 'code']").val();
  var bu = $("[name = 'b_code']").val();
  var dept = $("[name = 'dept_code']").val();

  if(com == ''){
    alert("Please select Company!");
    return;
  }
  if(bu ==''){
    alert("Please select Business Unit!");
    return;
  }

  $.ajax({
    type: "POST",
    url: "../benefits/template/RegDeLo/formLoader.php?request=loadDetails",
    data: {c_code:com, b_code:bu, d_code:dept},
    success: function(data){
      
      $("#setTable").html(data);
    
    }
  });
}

function addNewBracket(type){

    var sb = $("input[name='salBra']").val();
    var rf = $("input[name='rangeFrom']").val();
    var rt = $("input[name='rangeTo']").val();
    var er = $("input[name='emp1Share']").val();
    var ee = $("input[name='emp2Share']").val();

    $.ajax({
          type: "POST",
          url: "../payroll/template/RegDeLo/newBracketCode.php?type="+type,
          data: { sb:sb, rf:rf, rt:rt, er:er, ee:ee },
          success: function(data){
            if(data == 'Ok'){
              setTimeout(function(){window.location.reload();},1000);
              alert("New Bracket Added Successfully."); 
            }else{
              setTimeout(function(){window.location.reload();},1000);
              alert("Failed to add new bracket.");
            }        
          }
        }); 
}

function conUpdate(id){

  var data= id.split('*');

  var arrayEmpId=data[0];
  var arrayType=data[1];

  BootstrapDialog.show({
    type: BootstrapDialog.TYPE_PRIMARY,
    size: BootstrapDialog.SIZE_SMALL,
    title: "Set New Deductions",
    draggable:false,
    closable:true,
    autoResize: true,
    resizable: false,
      message: function(dialog) {
        var $message = $('<div></div>');
        var pageToLoad = dialog.getData('pageToLoad');
        $message.load(pageToLoad);
    
        return $message;
        },
        data: {
            'pageToLoad':'../payroll/template/RegDeLo/updateDeductions.php?emp_ID='+arrayEmpId+'&type='+arrayType
        }
    });
}

//used to update the Contributions Tables (SSS,PH,PI)
function conTableUpdate(type){

  var buttonVal = $(":checked").val(); //ticked radio buttons
  var arrayTypeTab = type;  //proccess type(SSS,PI,PH)

  if(buttonVal == undefined){
    alert("Please tick radio button to select a row!");
  }else {
    BootstrapDialog.show({
      type: BootstrapDialog.TYPE_SUCCESS,
      size: BootstrapDialog.SIZE_NORMAL,
      title: "Update Bracket",
      draggable:true,
      closable: true,
      autoResize:true,
      message: function(dialog){
        var $message = $("<div style='height:250px;'></div>");
        var pageToLoad = dialog.getData('pageToLoad');
        $message.load(pageToLoad);
        return $message;
      },
      data:{
        'pageToLoad':'../payroll/template/RegDeLo/updateConTable.php?sal_bra='+buttonVal+'&proctype='+arrayTypeTab
      }
    });
  }
}


//used to delete the Contributions Tables (SSS,PH,PI)
function conTableDelete(type){

  var buttonVal = $(":checked").val(); //ticked radio buttons
  var arrayTypeTab = type;  //proccess type(SSS,PI,PH)

   if(buttonVal == undefined){
    alert("Please tick radio button to select a row!");
  }else {
    BootstrapDialog.show({
      type: BootstrapDialog.TYPE_WARNING,
      size: BootstrapDialog.SIZE_NORMAL,
      title: "Delete Bracket",
      draggable:true,
      closable: true,
      autoResize:true,
      message: function(dialog){
        var $message = $("<div style='height:250px;'></div>");
        var pageToLoad = dialog.getData('pageToLoad');
        $message.load(pageToLoad);
        return $message;
      },
      data:{
        'pageToLoad':'../payroll/template/RegDeLo/deleteConTable.php?sal_bra='+buttonVal+'&proctype='+arrayTypeTab
      }
    });
  }
}

function filterDimension(procType){

  var com_code = $("select[name='code']").val();   //Company Code
  var bu_code  = $("select[name='b_code']").val();   //Business Code
  var dept_code = $("select[name='dept_code']").val();   //Department Code

  if(com_code == ""){
    alert("Please select company!");
    exit();
  }else if(bu_code == ""){
    alert("Please select business unit!");
    exit();
  }else if(dept_code == ""){
    alert("Please select department!");
    exit();
  }
  // $.get("../payroll/template/RegDeLo/filterPayrollCode.php?type="+procType,function(data,status){
  //     alert("Data: " + data + "\nStatus: " + status);
  //   });

  $.get("../payroll/template/RegDeLo/searchDimension.php?type="+procType+"&c_code="+com_code+"&bu_code="+bu_code+"&d_code="+dept_code,function(data,status){
    if(status == 'success'){
      $("#tempTable").hide();
      $("#queriedData").html(data);
      // alert(status);
    }
  });
}

function setBracketToAllEmp(procType){
  BootstrapDialog.show({
    type: BootstrapDialog.TYPE_DEFAULT,
    title: "Deduction Bracketing",
    message: $("<div></div>").load("../payroll/template/RegDeLo/setBracketModal.php?type="+procType),
    closable: true,
    draggable: true,
    buttons: [{
      label: 'Select',
      cssClass: 'btn-primary btn-sm',
      icon: 'glyphicon glyphicon-record',
      action: function(dialogRef) {
        var getVal  = dialogRef.getModalBody().find("input[type='radio']:checked").val(); //get the value of optRadSet[] in setBracketModal.php
        var getEE   = dialogRef.getModalBody().find("input[class="+getVal+"]").val();  //gets the value of hidden input in setBracketModal.php and used getEE as array index
        var chckVal = $("input[type='checkbox']:checked");  //returns array of checkboxes searchDimension.php
        var tempC = "";

        for(var c=0; c<chckVal.length; c++){
          if(chckVal[c].checked == true){
            tempC += chckVal[c].value + "|"
            // alert(chckVal[c].value);
          }
        }
        // alert(tempC);
        if(getVal == undefined){
          alert('Please select one bracket!');
        }else{

          BootstrapDialog.show({
            title: 'Confirmation',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            message: 'You are about to select new bracket. Proceed?',
            buttons: [{
              label: 'No',
              icon: 'glyphicon glyphicon-ban-circle',
              action: function(dialog) {
                BootstrapDialog.closeAll();
              }
            }, {
              label: 'Yes',
              cssClass: 'btn-success',
              icon: 'glyphicon glyphicon-ok',
              action: function(dialog) {

                // $("input[id='chkBox']").prop("disabled", true);  //diable the checkbox 
                // $("button[id='btnSave_']").prop("disabled", false);  //enable Save button

                var textvAR = tempC.split("|");
                for(var d = 0; d<textvAR.length-1; d++){
                  $("input[id='txtBracket_"+textvAR[d]+"']").val(Number(getVal));  //sets the value of input boxes
                  $("input[id='txtDeduction_"+textvAR[d]+"']").val(getEE);
                }
                BootstrapDialog.closeAll();
              }
            }]
          });

          //======================================================================================================================
          //delete this!!!
          // BootstrapDialog.confirm('You are about to select new bracket. Proceed?', function(result){  //asks for confirmation
          //   if(result) {
          //     var textvAR = tempC.split("|");
          //     for(var d = 0; d<textvAR.length-1; d++){
          //       $("input[id='txtBracket_"+textvAR[d]+"']").val(Number(getVal));  //sets the value of input boxes
          //       $("input[id='txtDeduction_"+textvAR[d]+"']").val(getEE);
          //     }
          //     dialogRef.close();
          //   }else {
          //     dialogRef.close();
          //   }
          // });

          // var textvAR = tempC.split("|");
          // for(var d = 0; d<textvAR.length-1; d++){ 
          //   $("input[id='txtBracket_"+textvAR[d]+"']").val(Number(getVal));  //sets the value of input boxes
          //   $("input[id='txtDeduction_"+textvAR[d]+"']").val(getEE);
          //   // alert(textvAR[d]);
          // }
          // dialogRef.close();
          //======================================================================================================================

        } 
      }
    },{ //end-begin buttons
      label: 'Close',
      cssClass: 'btn-primary btn-sm',
      icon: 'glyphicon glyphicon-remove',
      action: function(dialogRef){
        dialogRef.close();
      }
    }] //end buttons
  });
}

function saveConSetup(setUpType){
  var chckVal = $("input[type='checkbox']");
      // array_setup_values = new Array();
      var get_val = $("input[class='txtEmp_']");
      var accumu_val = '';
      
      for(i=1; i<=get_val.length; i++){
        accumu_val += $("input[id='txtEmp_"+i+"']").val() + "_" + $("input[id='txtDeduction_"+i+"']").val() + "_" + $("input[id='txtBracket_"+i+"']").val() + "|\n";
        // accumu += gettheVal[i].value + "|\n";
      }
      // alert(get_val.length);
      alert(accumu_val);

      $.ajax({
        type: "POST",
        // url: "../payroll/template/RegDeLo/saveConSetup.php?arr_val=" + accumu_val,
        url: "../payroll/template/RegDeLo/saveConSetup.php?type=" + setUpType,
        // url: "../payroll/template/RegDeLo/saveConSetup.php",
        data: {arrVar:accumu_val},
        success: function(data){
          BootstrapDialog.show({
            type: BootstrapDialog.TYPE_SUCCESS,
            size: BootstrapDialog.SIZE_SMALL,
            title: 'Saved',
            message: 'Contributions Setup is now update.',
          });
          $("#txtBck").html(data);
        }
      });



  // var getInputVal = "";
  // var conCatVal = "";
  // i = 1;

  // $(".txtEmp_").each(function(){
  //   getInputVal = $("input[id='txtEmp_"+i+"']").val();
  //   conCatVal += getInputVal + "|";
  //   ++i;
  // });
  // // alert(i);
  // alert(conCatVal);

  // for(var i=1; i<chckVal.length; i++){
  //   getInputVal = $("input[id='txtDeduction_"+i+"']").val();
  //   if(getInputVal != ''){
  //     conCatVal += getInputVal + "|";
  //   }
  // }
  // alert(conCatVal);
}
