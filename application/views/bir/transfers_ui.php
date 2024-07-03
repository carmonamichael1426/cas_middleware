 <style>
 	.input-style {
 		width: 410px;
 		height: 70px;
 		font-size: 15px;
 		margin-left: 129px;
 		text-align: center;
 	}

 	.btn-style {
 		margin-left: 90px;
 		height: 75px;
 		width: 483px;
 		font-size: 20px;
 		display: inline-block;
 		margin-bottom: 15px;
 	}

 	.custom-input {
 		width: 238px;
 		height: 63px;
 		font-size: 13px;
 		margin-bottom: 12px;
 		margin-right: 5px;
 		text-align: center;
 		display: inline-block;
 	}
 </style>
 <div class="row" id="generate_report_div">
 	<div class="row" style="margin-left: 167px;">
 		<h3 style="margin-top: 1px; margin-bottom: 25px;">Transfers Middleware
 		</h3>
 	</div>
 	<div class="col-sm-12 row">
 		<select class="custom-input" id="filter_type" name="filter_type" style="margin-left: 75px; " required>
 			<option value="DOC_NO" disabled selected>Document No</option>
 			<!-- <option value="ENTRY_NO">Entry No</option>
 			<option value="DOC_NO">Document No</option> -->
 		</select>
 		<select class="custom-input" id="transaction_type" name="transaction_type" required>
 			<option disabled selected>Transaction Type:</option>
 			<option value="TRANS IN">Transfer In</option>
 			<option value="TRANS OUT">Transfer Out</option>
 		</select>
 	</div>
 	<div class="row">
 		<input type="text" class="custom-input" type="text" id="entry_start" name="entry_start" placeholder="Entry No Start" style="margin-left: 90px; ">
 		<input type="text" class="custom-input" type="text" id="entry_end" name="entry_end" placeholder="Entry No End">
 	</div>
 	<!-- <div class="row" style="margin-top:18px; margin-bottom:18px;">
 		<input class="input-style" type="text" id="filter_vend_cust" name="username" placeholder="Filter Vendor/ Customer">
 	</div> -->
 	<div class="row" style="margin-top: 5px;">
 		<button type="button" class="btn btn-success btn-style" data-dismiss="modal" onclick="run_gl_entry_transfer_middleware()">
 			<i class="bx bx-x d-block d-sm-none"></i>
 			<span class="d-none d-sm-block ">Run G/L Entry</span>
 		</button>
 	</div>
 	<div class="row" style="margin-top: 2px;">
 		<button class="btn btn-info btn-lg btn-center btn-style" onclick="generate_transfer_qty()">Transfer Quantity</button>
 	</div>
 </div>

 <script>
 	$(document).ready(function() {
 		updatePlaceholder();

 		$("#filter_type").change(function() {
 			updatePlaceholder();
 		});
 	});

 	function updatePlaceholder() {
 		var selectedOption = $("#filter_type option:selected").text();
 		if (selectedOption === "Document No") {
 			$("#entry_start").prop("placeholder", "Document No Start")
 				.prop("type", "text")
 			$("#entry_end").prop("placeholder", "Document No End")
 				.prop("type", "text")
 		} else {
 			$("#entry_start").prop("placeholder", "Entry No Start")
 				.prop("type", "number")
 			$("#entry_end").prop("placeholder", "Entry No End")
 				.prop("type", "number")
 		}
 	}

 	$("#js_div").load('<?php echo base_url(); ?>BIR_ctrl/load_main_js');
 </script>