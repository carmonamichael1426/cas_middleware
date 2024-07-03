<style>
      ::placeholder {
            text-align: center;
      }

      .text-info,
      .left-input,
      .right-input,
      .left-btn,
      .right-btn {
            margin-left: 185px;
            display: inline-block;
            text-align: center;
      }

      .text-info {
            height: 50px;
            width: 480px;
            font-size: 18px;
            margin-bottom: 9px;
            font-style: italic;
            font-family: times;
            color: rgb(32 92 51);
      }

      .left-input,
      .right-input {
            width: 238px;
            height: 63px;
            font-size: 12px;
            margin-bottom: 30px;
      }

      .left-btn,
      .right-btn {
            height: 80px;
            width: 235px;
            font-size: 24px;
            margin-bottom: 10px;
      }

      .right-input {
            margin-left: 2px;
      }

      .right-btn {
            margin-left: 5px;
      }
</style>
<div class="row" id="generate_div">
      <div class="row">
            <p class="text-info">If one doc# only kindly indicate the same doc# in the range</p>
      </div>
      <div class="row">
            <input class="left-input" type="text" id="filter_start" name="filter_start" placeholder="Doc# Range Start">
            <input class="right-input" type="text" id="filter_end" name="filter_end" placeholder="Doc# Range End">
      </div>
      <div class="row">
            <button id="pof" class="btn btn-success btn-lg btn-center left-btn" onclick="generate_pof_sof('POF')">POF</button>
            <button id="sof" class="btn btn-success btn-lg btn-center right-btn" onclick="generate_pof_sof('SOF')">SOF</button>
      </div>
      <div class="row">
            <button id="poc" class="btn btn-info btn-lg btn-center left-btn" onclick="generate_pof_sof('POC')">POC</button>
            <button id="soc" class="btn btn-info btn-lg btn-center right-btn" onclick="generate_pof_sof('SOC')">SOC</button>
      </div>
</div>
<script>
      $("#js_div").load('<?php echo base_url(); ?>BIR_ctrl/load_main_js');
</script>