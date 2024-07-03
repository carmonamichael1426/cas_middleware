<style>
     .custom-input {
          width: 238px;
          height: 63px;
          font-size: 13px;
          margin-bottom: 12px;
          margin-right: 5px;
          text-align: center;
          display: inline-block;
     }

     input::-webkit-outer-spin-button,
     input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
     }
</style>
<div class="row" id="generate_report_div">
     <div class="col-sm-12 row" style="margin-bottom: 12px;">
          <div class="row" style="margin-left: 212px;">
               <h3 style="margin-top: 1px; margin-bottom: 25px;">G/L Middleware</h3>
          </div>
          <div class="col-sm-12 row">
               <select class="custom-input" id="filter_type" name="filter_type" style="margin-left: 75px; " required>
                    <option value="ENTRY_NO" disabled selected>Filter Type:</option>
                    <option value="ENTRY_NO">Entry No</option>
                    <option value="DOC_NO">Document No</option>
               </select>
               <select class="custom-input" id="transaction_type" name="transaction_type" required>
                    <option disabled selected>Transaction Type:</option>
                    <option value="CONS DED">Concession</option>
                    <option value="GEN EXP">Expense</option>
                    <option value="GJNL-NONTR">Non-Trade</option>
                    <option value="JV">Journal Voucher</option>
               </select>
          </div>
          <input type="number" class="custom-input" type="text" id="entry_start" name="entry_start"
               placeholder="Entry No Start" style="margin-left: 75px; ">
          <input type="number" class="custom-input" type="text" id="entry_end" name="entry_end"
               placeholder="Entry No End">

          <div class="col-sm-12 row">
               <button type="button" class="btn btn-success" data-dismiss="modal"
                    style="margin-left: 75px; height: 77px;width: 483px; font-size: 25px; text-shadow: 1px; margin-top: 8px;"
                    onclick="run_gl_entry_middleware()">
                    <i class="bx bx-x d-block d-sm-none"></i>
                    <span class="d-none d-sm-block ">Run Middleware</span>
               </button>
          </div>
     </div>
</div>
<script>
     $(document).ready(function () {
          updatePlaceholder();

          $("#filter_type").change(function () {
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