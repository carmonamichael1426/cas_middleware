<style>
      .left-style {
            margin-left: 89px;
            height: 110px;
            width: 400px;
            font-size: 25px;
            display: inline-block;
            margin-bottom: 20px;
      }

      .right-style {
            margin-left: 50px;
            height: 110px;
            width: 400px;
            margin-bottom: 20px;
            font-size: 20px;
      }
</style>
<div class="row" id="generate_div">
      <div class="row">
            <button class="btn btn-success btn-lg btn-center left-style" onclick="generate_textfile('SI')"
                  title="NATIVE">
                  Quantity Sold</button>
            <button type="button" class="btn btn-info right-style" data-dismiss="modal"
                  onclick="generate_ledger_report()" title="SQL">
                  <i class="bx bx-x d-block d-sm-none"></i>
                  <span class="d-none d-sm-block ">Sales Ledger Report PDF</span>
            </button>
      </div>
      <div class="row">
            <button class="btn btn-success btn-lg btn-center left-style" onclick="generate_ledger_textfile()">Sales
                  Ledger</button>
            <button type="button" class="btn btn-info right-style" data-dismiss="modal"
                  onclick="generate_ledger_report_excel_excel()">
                  <i class="bx bx-x d-block d-sm-none"></i>
                  <span class="d-none d-sm-block ">Sales Ledger Report Excel (DAILY)</span>
            </button>
      </div>
      <div class="row">
            <button class="btn btn-success btn-lg btn-center left-style" onclick="generate_textfile('DR_CON')">NON SI
                  Quantity Sold</button>
            <button type="button" class="btn btn-info right-style" data-dismiss="modal"
                  onclick="generate_ledger_report_excel_monthly()">
                  <i class="bx bx-x d-block d-sm-none"></i>
                  <span class="d-none d-sm-block ">Sales Ledger Report Excel (MONTHLY)</span>
            </button>
      </div>
</div>
<script>
      $("#js_div").load('<?php echo base_url(); ?>BIR_ctrl/load_main_js');
</script>