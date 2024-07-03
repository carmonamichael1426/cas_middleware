function addRow(tableID){
	var count = $('#'+tableID+' tr').length;
	$.ajax({
		type:"POST",
		url:"./../employee/template/addrow.php",
		data:{ n : count },
		success:function(data){
			$("#"+tableID).append(data);
		}
	});

	/*var table=document.getElementById(tableID);
	var rowCount=table.rows.length;
	var row=table.insertRow(rowCount);

	var cell1=row.insertCell(0);
	var element1=document.createElement("input");
	element1.type="checkbox";
	element1.name="chkbox[]";
	cell1.appendChild(element1);
	// var cell2=row.insertCell(1);
	// cell2.innerHTML=rowCount+1;

	var cell2=row.insertCell(1);
	var element2=document.createElement("input");
	element2.type="text";
	element2.name="item[]";
	cell2.appendChild(element2);

	var cell3=row.insertCell(2);
	var element3=document.createElement("input");
	// element5.type="number";
	element3.value="0.00"
	element3.name="cost[]";
	element3.id="amount1";
	cell3.appendChild(element3);		

	var cell4=row.insertCell(3);
	var element4=document.createElement("input");
	element4.type="number";
	element4.name="quantity[]";
	element4.id="quantity";
	element4.onkeypress = function(){
		multiply();
	}
	cell4.appendChild(element4);

	var cell5=row.insertCell(4);
	var element5=document.createElement("input");
	element5.type="text";
	element5.name="unit[]";
	cell5.appendChild(element5);

	var cell6=row.insertCell(5);
	var element6=document.createElement("input");
	element6.type="number";
	element6.name="amount[]";
	element6.id="amount";
	element6.disabled = "disabled";
	cell6.appendChild(element6);*/
}
 function deleteRow(tableID){
 	try{ 
 		var table=document.getElementById(tableID);
 		var rowCount=table.rows.length;
 		for(var i = 0; i < rowCount; i++){
 			var row=table.rows[i];
 			var chkbox=row.cells[0].childNodes[0];
 			if(null != chkbox && true == chkbox.checked){ 
 				if (rowCount <= 1) {
 					// no effect
 					alert("Cannot Delete All Rows!"); 
 					break;
 					};
 				table.deleteRow(i);
 				rowCount--;
 				i--; 				
 			}}}
 			catch(e){
 				alert(e);
 			}}
 