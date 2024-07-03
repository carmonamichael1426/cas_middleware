<?php

class CAS_ctrl extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        // $this->load->model('simplify/simplify', 'simplify');
        // $this->load->model('simplify/pdf_simplify', 'pdf_');
        $this->load->model('BIR_mod');
    }

    function run_gl_entry_middleware()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $db_id = $_POST['db_id'];
        $db_details = $this->BIR_mod->get_connection($db_id, '');

        /**--------------------------------------------------
        |  HTML code header and processing data display
        --------------------------------------------------**/

        echo  '
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <meta charset="utf-8">
                            <title>DATA UPLOAD</title>
                            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">     

                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap.css" rel="stylesheet">
                            </script><link href="' . base_url() . 'assets/progress_bar/css/custom.css" ?v2="" rel="stylesheet">
                            <link rel="stylesheet" type="text/css" href="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/dormcss.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link rel="stylesheet" href="' . base_url() . 'assets/progress_bar/js/jquery-ui/jquery-ui.css">
                            <link href="' . base_url() . 'assets/progress_bar/css/extendedcss.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <script src="' . base_url() . 'assets/progress_bar/js/jquery-1.10.2.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap.min.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap-dialog.js?2"></script>
                    <!-- end of imported -->
                    </head>
                    <body>
                          <h1></h1>
 
                            <div class="col-md-12" style="margin-top:0%;padding:3px;">
                                <div class="col-md-12 pdd_1"></div>                                         
                                        <div class="row" style="padding-left: 18px;">                    
                                           <label class="col-md-12 pdd" style="margin:0px">
                                                <img src="' . base_url() . 'assets/icon_index/upload_im.PNG" width="30">
                                                PROCESSING DATA
                                                &nbsp;&nbsp;<img src="' . base_url() . 'assets/img/giphy.gif" height="20">
                                            </label>                                           
                                            <span class="col-md-7 pdd fnt13 status">Status: 0% Complete </span>                                            
                                            <span class="col-md-4 pdd fnt13 toright rowprocess"> 0</span>
                                        </div>
                                        <div class="progress row" style="height: 26px;margin:0px; padding:2px;"> 
                                            <div id="percontent" class="progress-bar progress-bar-pimary" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                                            </div>
                                        </div>
                                        <span class="col-md-12 pdd fnt13 empname" >Employee: </span>
                                        <span class="col-md-12 pdd fnt13 filename"></span>
                                         
                                  </div>
                             </div>
        ';

        flush();
        ob_flush();

        if ($db_details[0]['nav_type'] == 'NATIVE') {

            $fileContent = $_POST['file_content'];
            $filecontent = json_decode($fileContent);
            $fileName   = $_POST['fileName'];

            $row_process      = 1;
            $total_files  = count($filecontent);

            $document_no_arr = array();

            /**-------------------------------------
            |  Loop for uploading data to table
            --------------------------------------**/

            for ($a = 0; $a < count($filecontent); $a++) {

                $percent = ($row_process > 0 && $total_files > 0)
                    ? intval($row_process / $total_files * 100) . "%"
                    : "100%";

                $separator = (strstr($filecontent[$a], '","'))
                    ? '","'
                    : '"|"';

                $row_data = explode($separator, $filecontent[$a]);

                if (count($row_data) == 13) {

                    $table  = 'nav_gl_entry_transaction';
                    $select = '*';
                    $Posting_Date = date('Y-m-d', strtotime(str_replace('"', '', $row_data[0])));

                    $column = [
                        'gl_db_id'              => $db_id,
                        'Posting_Date'          => $Posting_Date,
                        'gl_account_no'         => $row_data[1],
                        'document_type'         => $row_data[2],
                        'document_no'           => $row_data[3],
                        'description'           => $row_data[4],
                        'Amount'                => str_replace(',', '', $row_data[5]),
                        'dimension_1'           => $row_data[6],
                        'Dimension_2'           => $row_data[7],
                        'source_code'           => $row_data[8],
                        'journal_batch_name'    => $row_data[9],
                        'source_type'           => trim($row_data[10]),
                        'source_no'             => trim($row_data[11]),
                        'external_document_no'  => trim(str_replace('"', '', $row_data[12])),
                        'textfile_name'         => $fileName,
                        'transaction_type'      => $_POST['transaction_type']

                    ];

                    /**-------------------------------------
                    |  Check for duplicates then upload
                    --------------------------------------**/

                    $check_gl =  $this->BIR_mod->select_nav($table, $select, $column, '');

                    if (empty($check_gl)) {
                        $this->BIR_mod->insert_table_nav($table, $column);
                    }

                    if (!in_array($row_data[3], $document_no_arr)) {
                        array_push($document_no_arr, $row_data[3]);
                    }

                    str_replace('"', '', $row_data[0]);
                }


                /**---------------------------
                |  Update Percentage bar
                ----------------------------**/

                echo '<script language="JavaScript">';
                echo '$("span.filename").text("GL account no - ' . $row_data[1] . '");';
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $row_process++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Entry: ");';
                echo '</script>';

                flush();
                ob_flush();
            }

            /**---------------------------------------------
             |  Button after data successfuly uploaded
             --------------------------------------------**/

            $data = [
                'document_string'   => '"' . implode('", "', $document_no_arr) . '"',
                'fileName'          => $_POST['fileName'],
                'url'               => 'CAS_ctrl/generate_gl_textfile_one_file'
            ];

            $this->load->view('generate_text_btn', $data);

            ini_set('memory_limit', $memory_limit);
        }
    }

    /**----------------------------------------------------------
     |  Generating one textfile / pjn file after uploading
     ---------------------------------------------------------**/

    function generate_gl_textfile_one_file()
    {
        $document_no = $_POST['document_no'];
        $document_no = json_decode($document_no);

        $textfile      = $_POST['textfile_name'];
        $textfile_name = 'GL_Transfer_' . $textfile;

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $textfile_name . '.PJN"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $line_no = 10000;

        for ($a = 0; $a < count($document_no); $a++) {
            $table                  = "nav_gl_entry_transaction";
            $select                 = "*";
            $where['textfile_name'] = $textfile;
            $where['document_no']   = $document_no[$a];
            $gl_entry_list          = $this->BIR_mod->select_nav($table, $select, $where, '');

            /**------------------------------------------------------------
             |  Loop for filtering if code exist on nav_vendor table
             -----------------------------------------------------------**/

            $proceed = true;
            foreach ($gl_entry_list as $gl) {
                if ($gl['source_type']  == 'Vendor') {
                    $search_vendor = $this->BIR_mod->get_vendor_details($gl['source_no']);
                    if (empty($search_vendor)) {
                        $proceed = false;
                    }
                }
            }

            /**-------------------------------------------------
             |  Loop for printing valid data into pjn file
             ------------------------------------------------**/

            if ($proceed === true) {
                foreach ($gl_entry_list as $gl) {

                    /**-----------------------------------------------------------
                     |  Condition for manipulating some data before printing
                     ----------------------------------------------------------**/
                    $exempted_gl_account_no = array(
                        '10.20.01.01.01.01', '10.20.01.01.01.02', ' 10.20.01.01.01.01', '10.20.01.01.01.03',
                        '10.20.01.01.01.04', '10.20.01.01.01.05', '10.20.01.01.01.06'
                    );

                    if ($gl['gl_account_no'] == '10.10.01.03.02') {
                        $column_3 = $gl['source_type'];
                        $column_4 = $gl['source_no'];
                    } else if (in_array($gl['gl_account_no'], $exempted_gl_account_no)) {
                        $column_3 = 'Vendor';
                        $column_4 = $gl['source_no'];
                    } else {
                        $column_3 = 'G/L Account';
                        $column_4 = $gl['gl_account_no'];
                    }

                    $column_8 = $gl['description'];

                    /**---------------------------
                     |  Printing data ...
                     --------------------------**/
                    echo 'GENERAL' . '<|>' .
                        $line_no . '<|>' .
                        $column_3 . '<|>' .
                        $column_4 . '<|>' .
                        date('m/m/y', strtotime($gl['Posting_Date'])) . '<|>' .
                        '' . '<|>' .
                        $gl['document_no'] . '<|>' .
                        $column_8 . '<|>' .
                        number_format($gl['Amount'], 2) . '<|>' .
                        $gl['dimension_1'] . '<|>' .
                        $gl['Dimension_2'] . '<|>' .
                        $gl['source_code'] . '<|>' .
                        $gl['transaction_type'] . '<|>' .
                        '' . '<|>' .
                        '' . '<|>' .
                        '' . '<|>' .
                        $gl['document_no'] . '<|>' .
                        '' . "\n";

                    $line_no += 10000;
                }
            }
        }
    }
}
