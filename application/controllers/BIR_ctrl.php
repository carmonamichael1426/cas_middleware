<?php

/**
 * @property BIR_mod $BIR_mod
 * @property $load
 * @property $ppdf
 */

class BIR_ctrl extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->model('BIR_mod');
    }

    //http://172.16.174.201:81/test_navision/test_bir/BIR_ctrl/dashboard
    function dashboard()
    {

        $data['database_list'] = $this->BIR_mod->get_connection('', '');

        $this->load->view('bir/bir_head_ui', $data);
    }

    function load_server()
    {
        if (isset($_POST['store'])) {
            $store = $_POST['store'];
            $database_list = $this->BIR_mod->get_connection('', $store);
            $html = '';

            foreach ($database_list as $list) {
                if (
                    (
                        (strstr($list['db_name'], '_BE')) ||
                        (strstr($list['db_name'], 'POS') ||
                            (strstr($list['db_name'], 'WDG')) ||
                            (strstr($list['db_name'], 'PLANNING_')) ||
                            (strstr($list['db_name'], 'CDC_SRV_SQL')) ||
                            (strstr($list['db_name'], 'ICM_SM_BACKEND_SQL')) ||
                            (strstr($list['db_name'], 'ALTURAS')) ||
                            strstr($list['db_name'], 'HF_TEST')) && !preg_match("/\d/", $list['db_name']) ||
                        (strstr($list['connection_name'], '_BE'))
                    )
                    ||
                    (in_array($list['db_name'], array('ASC_CDC', 'CENTRAL_CONS_170_11', 'FR_DC_NATIVE', 'PHARMA_DC_NATIVE', 'HF_DC')))
                    || strstr($list['db_name'], 'ACCTG') ||
                    strstr($list['db_name'], "TAL_") || strstr($list['db_name'], "ICM_MAIN") || strstr($list['db_name'], "ASC_")
                ) {
                    $store_location = '';
                    if ($list['db_name'] == 'ICM_SM_BACKEND_SQL') {
                        $store_location = ' - ' . $list['store_location'];
                    }
                    $html .= '<option value="' . $list['db_id'] . '">' . $list['connection_name'] . $store_location . '</option>';
                }
            }
            $data['html'] = $html;
        }


        if (isset($_POST['db_id'])) {
            $db_id = $_POST['db_id'];
            $database_list = $this->BIR_mod->get_connection($db_id, '');
            $data['nav_type'] = $database_list[0]['nav_type'];
        }



        echo json_encode($data);
    }


    function check_row_textfile()
    {
        $fileContent = $_POST['file_content']; // JSON string of the file content
        $filecontent = json_decode($fileContent);
    }


    function check_textfile()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $db_id = $_POST['db_id'];
        $database_details = $this->BIR_mod->get_connection($db_id, '');
        $fileContent = $_POST['file_content']; // JSON string of the file content
        $filecontent = json_decode($fileContent);
        $response = '';

        for ($a = 0; $a < count($filecontent); $a++) {

            $separator = (strstr($filecontent[$a], '","')) ? '","' : '"|"';
            $row_data = explode($separator, $filecontent[$a]);

            if (count($row_data) == 8) //if item 
            {
                $response = 'proceed';
                break;
            } else
                if (in_array(count($row_data), array(47, 48, 51))) //if nav_accumulated_sales_ledger siya nga csv 
                {

                    $store_code = str_replace(',', '', $row_data[2]);
                    if ($store_code == $database_details[0]['store_no']) {
                        $response = 'proceed';
                    } else {
                        $response = 'Incorrect File selection in accumulated sales ledger File';
                    }
                    break;
                } else
                    if (in_array(count($row_data), array(70, 75, 74))) //if nav_tran_sales_bir_consolidated siya nga csv 
                    {
                        $store_no = $row_data[31];

                        if ($store_no == $database_details[0]['store_no']) {
                            $response = 'proceed';
                        } else {
                            $response = 'Incorrect File selection in Tran Sales Entry File';
                        }
                        break;
                    }
            if (in_array(count($row_data), array(13))) {
                $table = 'nav_account_masterfile';
                $select = '*';
                $where['dimension_1'] = $row_data[6];
                $where['dimension_2'] = $row_data[7];

                $search_dept = $this->BIR_mod->select_nav($table, $select, $where, '');
                if (empty($search_dept)) {
                    $response = 'dimension_1 -->' . $row_data[6] . '     dimension_2--->' . $row_data[7] . ' not found in table nav_account_masterfile';
                } else {
                    $store_code = $search_dept[0]['store'];
                    $table = 'database';
                    $select = '*';
                    $where_['store_no'] = $store_code;
                    $search_database = $this->BIR_mod->select_mpdi($table, $select, $where_);

                    if (empty($search_database)) {
                        $response = "store_no " . $store_code . ' not found in table nav_account_masterfile';
                    } else
                        if ($search_database[0]['db_id'] == $db_id) {
                            $response = 'proceed';
                        } else {
                            $response = 'Invalid Selection of File';
                        }
                }
                break;
            } else {
                $response = 'invalid file';
                break;
            }
        }

        $data['store_no'] = $database_details[0]['store_no'];
        $data['response'] = $response;
        echo json_encode($data);

        ini_set('memory_limit', $memory_limit);
    }


    function progess_bar()
    {
        $html = '
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <meta charset="utf-8">
                            <title>DATA UPLOAD</title>
                            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">     
                            <link href="' . base_url() . 'assets/css/datatables.min.css" rel="stylesheet" type="text/css"/>
                            <link href="' . base_url() . 'assets/css/googleapis.css" rel="stylesheet" type="text/css"/>
                            <link rel="<?php echo base_url();  ?>assets/css/sweetalert.css">


                    <!--imported -->

                            <!-- <link rel="shortcut icon" type="image/png" href="../assets/img/latest.png"> -->
                            <link href="' . base_url() . 'assets/css/site.min.css" rel="stylesheet"/>
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/font-awesome.css" rel="stylesheet">
                            <script src="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            </script><link href="' . base_url() . 'assets/progress_bar/css/custom.css" ?v2="" rel="stylesheet">
                            <link rel="stylesheet" type="text/css" href="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap-datetimepicker.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/dormcss.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link rel="stylesheet" href="' . base_url() . 'assets/progress_bar/js/jquery-ui/jquery-ui.css">
                            <link href="' . base_url() . 'assets/progress_bar/alert/css/alert.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/alert/themes/default/theme.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/extendedcss.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <!-- <link href="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.css?ts=<?=time()?>&quot;" rel="stylesheet"> -->
                            <script src="' . base_url() . 'assets/progress_bar/js/jquery-1.10.2.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap.min.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap-dialog.js?2"></script>

                            <script src="' . base_url() . 'assets/progress_bar/js/jquery.metisMenu.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTablesDontDelete/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/ebsdeduction_function.js?<?php echo time()?>"></script>
                            <script src="' . base_url() . 'assets/js/sweetalert.js"></script>    
                            <script src="' . base_url() . 'assets/js/sweetalert2.all.min.js"></script>
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

        return $html;
    }


    function check_db_details()
    {
        $db_id = $_POST['db_id'];

        $db_details = $this->BIR_mod->get_connection($db_id, '');

        $store_no = $db_details[0]['store_no'];
        $account_details = $this->BIR_mod->get_nav_account_masterfile($store_no);

        if (!empty($account_details)) {
            $dimension_1 = $account_details[0]['dimension_1'];
            $dimension_2 = $account_details[0]['dimension_2'];
        } else {
            $dimension_1 = '';
            $dimension_2 = '';
        }

        $data['dimension_1'] = $dimension_1;
        $data['dimension_2'] = $dimension_2;

        $data['store'] = $db_details[0]['display_name'];
        $data['store_no'] = $db_details[0]['store_no'];
        $data['nav_type'] = $db_details[0]['nav_type'];

        echo json_encode($data);
    }


    function generate_transfer_qty_native()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);
        echo $this->progess_bar();

        flush();
        ob_flush();

        // inserting the data to the database ------------------------------------------------------------------

        // Retrieve the uploaded file content
        $fileContent = $_POST['file_content']; // JSON string of the file content
        // Convert the JSON string back to the original file content
        $filecontent = json_decode($fileContent);

        $store_no = $_POST['store_no'];
        $db_id = $_POST['db_id'];
        $invoice_type = $_POST['invoice_type'];

        $get_connection = $this->BIR_mod->get_connection($db_id, '');
        $store = $get_connection[0]['store'] . '-' . $get_connection[0]['department'];

        if (strstr($filecontent[0], '","')) {
            $separator = '","';
        } else {
            $separator = '"|"';
        }

        $rowproC = 1;
        $total_files = count($filecontent);

        for ($a = 0; $a < count($filecontent); $a++) {

            $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

            if ($filecontent != '') {

                $explode_row = explode($separator, $filecontent[$a]);

                if (count($explode_row) == 13) // if G/L Entry nga table siya
                {
                    $table = 'nav_gl_table';
                    $select = '*';
                    $where = array();
                    $where['db_id'] = $db_id;
                    $where['store_no'] = $store_no;
                    $where['posting_date'] = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[0])));
                    $where['gl_account_no'] = $explode_row[1];
                    $where['document_type'] = $explode_row[2];
                    $where['document_no'] = $explode_row[3];
                    $where['description'] = $explode_row[4];
                    $where['amount'] = $explode_row[5];
                    $group_by = '';

                    $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);

                    if (empty($search_row)) {
                        $insert_data = array();
                        $insert_data['db_id'] = $db_id;
                        $insert_data['store_no'] = $store_no;
                        $insert_data['posting_date'] = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[0])));
                        $insert_data['gl_account_no'] = $explode_row[1];
                        $insert_data['document_type'] = $explode_row[2];
                        $insert_data['document_no'] = $explode_row[3];
                        $insert_data['description'] = $explode_row[4];
                        $insert_data['amount'] = $explode_row[5];
                        $insert_data['dimension_1'] = $explode_row[6];
                        $insert_data['dimension_2'] = $explode_row[7];
                        $insert_data['source_code'] = $explode_row[8];
                        $insert_data['journal_batch_name'] = $explode_row[9];
                        $insert_data['source_type'] = $explode_row[10];
                        $insert_data['source_no'] = $explode_row[11];
                        $insert_data['external_doc_no'] = str_replace('"', '', $explode_row[12]);
                        $this->BIR_mod->insert_table_nav($table, $insert_data);
                    } else {
                        $column_filter = array();
                        $column_filter['db_id'] = $db_id;
                        $column_filter['store_no'] = $store_no;
                        $column_filter['posting_date'] = date('Y-m-d', strtotime($explode_row[0]));
                        $column_filter['gl_account_no'] = $explode_row[1];
                        $column_filter['document_type'] = $explode_row[2];
                        $column_filter['document_no'] = $explode_row[3];
                        $column_filter['description'] = $explode_row[4];
                        $column_filter['amount'] = $explode_row[5];
                        $column_data = array();
                        $column_data['dimension_1'] = $explode_row[6];
                        $column_data['dimension_2'] = $explode_row[7];
                        $column_data['source_code'] = $explode_row[8];
                        $column_data['journal_batch_name'] = $explode_row[9];
                        $column_data['source_type'] = $explode_row[10];
                        $column_data['source_no'] = $explode_row[11];
                        $column_filter['external_doc_no'] = str_replace('"', '', $explode_row[12]);
                        $this->BIR_mod->update_table_nav($table, $column_data, $column_filter);
                    }
                } else
                    if (count($explode_row) == 7)  //if Sales Header siya   
                    {
                        if ($invoice_type == 'SALES') {
                            $table = 'nav_sales_inv_header';
                            $to_no_name = 'bill_to_cust_no';
                            $to_name_name = 'bill_to_name';
                        } else {
                            $table = 'nav_purch_inv_header';
                            $to_no_name = 'pay_to_vendor_no';
                            $to_name_name = 'pay_to_name';
                        }

                        $where = array();
                        $db_id = $db_id;
                        $store_no = $store_no;
                        $to_no = str_replace('"', '', $explode_row[0]);
                        $posting_date = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[1])));
                        $location_code = $explode_row[2];
                        $dimension_1 = $explode_row[3];
                        $dimension_2 = $explode_row[4];
                        $no = $explode_row[5];
                        $to_name = str_replace('"', '', $explode_row[6]);
                        $group_by = '';

                        $where['db_id'] = $db_id;
                        $where['store_no'] = $store_no;
                        $where[$to_no_name] = $to_no;
                        $where['posting_date'] = $posting_date;
                        $where['location_code'] = $location_code;
                        $where['dimension_1'] = $dimension_1;
                        $where['dimension_2'] = $dimension_2;
                        $where['no'] = $no;
                        $select = '*';

                        $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);
                        if (empty($search_row)) {
                            $insert_data = array();
                            $insert_data['db_id'] = $db_id;
                            $insert_data['store_no'] = $store_no;
                            $insert_data[$to_no_name] = $to_no;
                            $insert_data['posting_date'] = $posting_date;
                            $insert_data['location_code'] = $location_code;
                            $insert_data['dimension_1'] = $dimension_1;
                            $insert_data['dimension_2'] = $dimension_2;
                            $insert_data['no'] = $no;
                            $insert_data[$to_name_name] = $to_name;
                            $this->BIR_mod->insert_table_nav($table, $insert_data);
                        }
                    } else
                        if (count($explode_row) == 9)  //if Sales Line siya   
                        {
                            if ($invoice_type == 'SALES') {
                                $table = 'nav_sales_inv_line';
                            } else {
                                $table = 'nav_purch_inv_line';
                            }

                            $line_no = str_replace('"', '', $explode_row[0]);
                            $no = $explode_row[1];
                            $description = $explode_row[2];
                            $quantity = $explode_row[3];
                            $unit_of_measure_code = $explode_row[4];
                            $variant_code = $explode_row[5];
                            $document_no = $explode_row[6];
                            $dimension_1 = $explode_row[7];
                            $dimension_2 = str_replace('"', '', $explode_row[8]);
                            $select = '*';
                            $group_by = '';

                            $where = array();
                            $where['db_id'] = $db_id;
                            $where['store_no'] = $store_no;
                            $where['line_no'] = $line_no;
                            $where['no'] = $no;
                            $where['description'] = $description;
                            $where['quantity'] = $quantity;
                            $where['unit_of_measure_code'] = $unit_of_measure_code;
                            $where['variant_code'] = $variant_code;
                            $where['document_no'] = $document_no;
                            $where['dimension_1'] = $dimension_1;
                            $where['dimension_2'] = $dimension_2;

                            $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);

                            if (empty($search_row)) {
                                $insert_data = array();
                                $insert_data['db_id'] = $db_id;
                                $insert_data['store_no'] = $store_no;
                                $insert_data['line_no'] = $line_no;
                                $insert_data['no'] = $no;
                                $insert_data['description'] = $description;
                                $insert_data['quantity'] = $quantity;
                                $insert_data['unit_of_measure_code'] = $unit_of_measure_code;
                                $insert_data['variant_code'] = $variant_code;
                                $insert_data['document_no'] = $document_no;
                                $insert_data['dimension_1'] = $dimension_1;
                                $insert_data['dimension_2'] = $dimension_2;
                                $this->BIR_mod->insert_table_nav($table, $insert_data);
                            }
                        }
            }

            echo '<script language="JavaScript">';
            echo '$("span.filename").text("Inserting Lines to the Database");';
            echo '$("div#percontent").css({"width":"' . $percent . '"});';
            echo '$("span.status").text("Status: ' . $percent . ' Complete");';
            echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
            echo '$("span.empname").text("Entry: ");';
            echo '</script>';
            flush();
            ob_flush();
        }
        // end of inserting the data to the database ------------------------------------------------------------------

        // consolidating the data --------------------------------------------------------------------------------------

        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];

        $filter_arr = array($_POST['filter_doc']);
        $col_name_arr = array('document_no');

        if ($_POST['filter_vend_cust'] != '') {
            array_push($filter_arr, $_POST['filter_vend_cust']);
            array_push($col_name_arr, 'source_no');
        }

        if (isset($_POST['filter_doc'])) {
            $filter_arr = array($_POST['filter_doc']);
            $col_name_arr = array('document_no');

            if ($_POST['filter_vend_cust'] != '') {
                array_push($filter_arr, $_POST['filter_vend_cust']);
                array_push($col_name_arr, 'source_no');
            }

            $final_where = '';
            for ($a = 0; $a < count($col_name_arr); $a++) {
                $where_between = '';
                $where_in = '';
                if (strstr($filter_arr[$a], "|")) {
                    $exp_filter = explode("|", $filter_arr[$a]);
                    for ($b = 0; $b < count($exp_filter); $b++) {
                        if (strstr($exp_filter[$b], "..")) {
                            $exp_range = explode("..", $exp_filter[$b]);
                            $where_between .= "(" . $col_name_arr[$a] . " BETWEEN " . "'" . $exp_range[0] . "' AND " . "'" . $exp_range[1] . "'" . ") OR ";
                        } else {
                            $where_in .= "'" . $exp_filter[$b] . "',";
                        }
                    }
                }

                if (!strstr($filter_arr[$a], "|") && !strstr($filter_arr[$a], "..")) {
                    $final_where .= " AND (" . $col_name_arr[$a] . " IN ('" . $filter_arr[$a] . "'))";
                }

                if (!strstr($filter_arr[$a], "|") && strstr($filter_arr[$a], "..")) {
                    $exp_range = explode("..", $filter_arr[$a]);
                    $final_where .= " AND (" . $col_name_arr[$a] . " BETWEEN " . "'" . $exp_range[0] . "' AND " . "'" . $exp_range[1] . "'" . ") ";
                }


                if ($where_in != '' && $where_between != '') {
                    $where_in = "OR (" . $col_name_arr[$a] . " IN (" . substr($where_in, 0, -1) . "))";
                } else
                    if ($where_in != '' && $where_between == '') {
                        $where_in = " (" . $col_name_arr[$a] . " IN (" . substr($where_in, 0, -1) . "))";
                    }

                $where_between = substr($where_between, 0, -3);

                if ($where_between != '' || $where_in != '') {
                    $final_where .= "AND 
                                        (" . $where_between . " " . $where_in . ")  
                                        ";
                }
            }
            $WHERE = $final_where;
        } else {
            $WHERE = "";
        }

        $table = 'nav_gl_table';

        $table_query = "  
                                    SELECT
                                            *
                                    FROM 
                                            " . $table . " 
                                    WHERE 
                                            posting_date >= '" . $dateFrom . "'
                                    AND
                                            posting_date <= '" . $dateTo . "'    
                                            " . $WHERE . "";


        $gl_details = $this->BIR_mod->select_native($table_query);

        $document_num_arr = array();

        if (!empty($gl_details)) {
            foreach ($gl_details as $r_gl) {
                $found = false;

                foreach ($document_num_arr as $doc) {
                    if ($doc["document_num"] === $r_gl['document_no'] && $doc["source_type"] === $r_gl['source_type']) {
                        $found = true;
                        break;
                    }
                }

                if ($found == false) {
                    array_push($document_num_arr, array('document_num' => $r_gl['document_no'], 'source_type' => $r_gl['source_type']));
                }
            }
        }

        $rowproC = 1;
        $total_files = count($document_num_arr);
        $document_list = '';
        if (count($document_num_arr) > 0) {

            foreach ($document_num_arr as $doc_arr) {

                $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                $document_list .= $doc_arr['document_num'] . '_';

                if ($doc_arr['source_type'] == 'Customer') //if Customer ang source type sa table Sales Invoice Line ka mu look up
                {
                    $table = 'nav_sales_inv_line';
                    $table2 = 'nav_sales_inv_header';
                    $store_location = 'bill_to_name'; //Bill-to Name
                    $transfer = 'TRANSFER TO ';
                } else
                    if ($doc_arr['source_type'] == 'Vendor') //if Vendor and source type    
                    {
                        $table = 'nav_purch_inv_line';
                        $table2 = 'nav_purch_inv_header';
                        $store_location = 'pay_to_name';
                        $transfer = 'TRANSFER FROM ';
                    }


                $table_query = "  
                                            SELECT
                                                    line.line_no,
                                                    line.no,
                                                    line.description,                                                                                              
                                                    line.quantity,    
                                                    line.unit_of_measure_code,           
                                                    line.variant_code,                                
                                                    header.$store_location,
                                                    header.posting_date,
                                                    header.location_code,
                                                    header.dimension_1,
                                                    header.dimension_2
                                            FROM 
                                                    " . $table2 . " as header
                                            INNER JOIN  " . $table . "  AS  line ON line.document_no = header.no
                                            WHERE 
                                                    line.document_no = '" . $doc_arr['document_num'] . "'
                                                    ";

                $line_header_details = $this->BIR_mod->select_native($table_query);

                if (!empty($line_header_details)) {
                    foreach ($line_header_details as $sl_gl) {
                        $insert_data = array();
                        $insert_data['store'] = $store;
                        $insert_data['db_id'] = $db_id;
                        $insert_data['document_no'] = $doc_arr['document_num'];
                        $insert_data['line_no'] = $sl_gl['line_no'];
                        $insert_data['item_code'] = $sl_gl['no'];
                        $insert_data['description'] = $sl_gl['description'];
                        $insert_data['quantity'] = $sl_gl['quantity'];
                        $insert_data['date_'] = $sl_gl['posting_date'];
                        $insert_data['source_code'] = $sl_gl['location_code'];
                        $insert_data['dimension_1'] = $sl_gl['dimension_1'];
                        $insert_data['dimension_2'] = $sl_gl['dimension_2'];
                        $insert_data['variant_code'] = $sl_gl['variant_code'];
                        $insert_data['unit_of_measure'] = $sl_gl['unit_of_measure_code'];
                        $insert_data['store_location'] = $transfer . $sl_gl[$store_location];
                        $insert_data['source_type'] = $doc_arr['source_type'];

                        $select = '*';
                        $table = 'nav_transfer';
                        $where = array();
                        $where['store'] = $store;
                        $where['db_id'] = $db_id;
                        $where['document_no'] = $doc_arr['document_num'];
                        $where['line_no'] = $sl_gl['line_no'];
                        $where['date_'] = $sl_gl['posting_date'];


                        $check_line = $this->BIR_mod->select_nav($table, $select, $where, '');
                        if (empty($check_line)) {
                            if (
                                ($doc_arr['source_type'] == 'Customer' && $sl_gl['quantity'] > 1) ||
                                ($doc_arr['source_type'] == 'Vendor')
                            ) {
                                $this->BIR_mod->insert_table_nav($table, $insert_data);
                            }
                        } else {
                            $this->BIR_mod->update_table_nav($table, $insert_data, $where);
                        }

                        echo '<script language="JavaScript">';
                        echo '$("span.filename").text("Document Number ' . $doc_arr['document_num'] . ' inserted in the Database");';
                        echo '</script>';
                        flush();
                        ob_flush();
                    }
                }

                echo '<script language="JavaScript">';
                //echo '$("span.filename").text("Done");';          
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Entry: ");';
                echo '</script>';
                flush();
                ob_flush();
            }
        }

        if (strstr($document_list, '_')) {
            $document_list = substr($document_list, 0, -1);
        }

        echo ' <div class="col-sm-12 row">                                                
                        <button class="btn btn-success btn-lg btn-center" style="margin-left:129px; height: 115px; width: 514px; font-size: 31px; display: inline-block;margin-bottom:20px;"  onclick="generate_transfer_pqt(\'' . $document_list . '\',\'' . $dateFrom . '\',\'' . $dateTo . '\',\'' . $store . '\')">Generate Transfer Quantity Textfile</button> 
                    </div>';

        echo '<script>
                                window.io = 
                                    {
                                        open: function(verb, url, data, target){
                                            var form = document.createElement("form");
                                            form.action = url;
                                            form.method = verb;
                                            form.target = target || "_self";
                                            if (data) {
                                                for (var key in data) {
                                                    var input = document.createElement("textarea");
                                                    input.name = key;
                                                    input.value = typeof data[key] === "object"
                                                        ? JSON.stringify(data[key])
                                                        : data[key];
                                                    form.appendChild(input);
                                                }

                                            }
                                            form.style.display = "none";
                                            document.body.appendChild(form);
                                            form.submit();
                                            document.body.removeChild(form);
                                        }
                                    };  


                                function generate_transfer_pqt(document_list,from,to,store)
                                {
                                    var document_arr = document_list.split("_");
                                
                                    for(var a=0;a<document_arr.length;a++)
                                    {                                    
                                        io.open("POST", "' . base_url() . 'BIR_ctrl/generate_transfer_pqt", 
                                        {                               
                                            //"document_arr" : JSON.stringify(document_arr),
                                            "document_no":document_arr[a],
                                            "from":from,
                                            "to":to,
                                            "store":store    
                                        },"_blank");       
                                    }

                                    console.log(document_arr);
                                }
                    </script>    
                ';

        //end of consolidating the data --------------------------------------------------------------------------------------

        ini_set('memory_limit', $memory_limit);
    }





    function generate_transfer_qty()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        echo $this->progess_bar();

        flush();
        ob_flush();


        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $db_id = $_POST['db_id'];


        $get_connection = $this->BIR_mod->get_connection($db_id, '');
        $store = $get_connection[0]['store'] . '-' . $get_connection[0]['department'];

        foreach ($get_connection as $con) {
            $servername = $con['server_address'];
            $username = $con['username'];
            $password = $con['password'];
            $connection = $con['db_name'];
            $sub_db_name = $con['sub_db_name'];
        }

        $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);
        $filter_type = ($_POST['filter_type'] === 'ENTRY_NO') ? "[Entry No_]" : "[Document No_]";
        $table = '[' . $sub_db_name . '$G_L Entry]';
        $table_query = "SELECT * FROM $table WHERE [Posting Date] BETWEEN '$dateFrom' AND '$dateTo' 
                        AND $filter_type BETWEEN '{$_POST['entry_start']}' AND '{$_POST['entry_end']}' ";

        $gl_row = odbc_exec($connect, $table_query);
        $document_num_arr = array();

        if (odbc_num_rows($gl_row) > 0) {
            while ($r_gl = odbc_fetch_array($gl_row)) {

                $found = false;

                foreach ($document_num_arr as $doc) {
                    if ($doc["document_num"] === $r_gl['Document No_'] && $doc["source_type"] === $r_gl['Source Type']) {
                        $found = true;
                        break;
                    }
                }

                if ($found == false) {
                    array_push($document_num_arr, array('document_num' => $r_gl['Document No_'], 'source_type' => $r_gl['Source Type']));
                }
            }
        }

        $rowproC = 1;
        $total_files = count($document_num_arr);
        $document_list = '';

        if (count($document_num_arr) > 0) {
            foreach ($document_num_arr as $doc_arr) {
                $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                $document_list .= $doc_arr['document_num'] . '_';

                if ($doc_arr['source_type'] == '1') //if Customer ang source type sa table Sales Invoice Line ka mu look up
                {

                    $table = '[' . $sub_db_name . '$Sales Invoice Line]';
                    $table2 = '[' . $sub_db_name . '$Sales Invoice Header]';
                    $store_location = 'Bill-to Name';
                    $transfer = 'TRANSFER TO ';
                } else
                    if ($doc_arr['source_type'] == '2') //if Vendor and source type    
                    {
                        $table = '[' . $sub_db_name . '$Purch_ Inv_ Line]';
                        $table2 = '[' . $sub_db_name . '$Purch_ Inv_ Header]';
                        $store_location = 'Pay-to Name';
                        $transfer = 'TRANSFER FROM ';
                    }

                $table_query = "  
                                        SELECT
                                               line.[Line No_],
                                               line.[No_],
                                               line.[Description],                                                                                              
                                               line.[Quantity],    
                                               line.[Unit of Measure Code],           
                                               line.[Variant Code],                                
                                               header.[$store_location],
                                               header.[Posting Date],
                                               header.[Location Code],
                                               header.[Shortcut Dimension 1 Code],
                                               header.[Shortcut Dimension 2 Code]
                                        FROM 
                                               " . $table2 . " as header
                                        INNER JOIN  " . $table . "  AS  line ON line.[Document No_] = header.[No_]
                                        WHERE 
                                               line.[Document No_] = '" . $doc_arr['document_num'] . "'
                                               ";
                $sl_row = odbc_exec($connect, $table_query);
                if (odbc_num_rows($sl_row) > 0) {
                    while ($sl_gl = odbc_fetch_array($sl_row)) {
                        $insert_data['store'] = $store;
                        $insert_data['db_id'] = $db_id;
                        $insert_data['document_no'] = $doc_arr['document_num'];
                        $insert_data['line_no'] = $sl_gl['Line No_'];
                        $insert_data['item_code'] = $sl_gl['No_'];
                        $insert_data['description'] = $sl_gl['Description'];
                        $insert_data['quantity'] = $sl_gl['Quantity'];
                        $insert_data['date_'] = $sl_gl['Posting Date'];
                        $insert_data['source_code'] = $sl_gl['Location Code'];
                        $insert_data['dimension_1'] = $sl_gl['Shortcut Dimension 1 Code'];
                        $insert_data['dimension_2'] = $sl_gl['Shortcut Dimension 2 Code'];
                        $insert_data['variant_code'] = $sl_gl['Variant Code'];
                        $insert_data['unit_of_measure'] = $sl_gl['Unit of Measure Code'];
                        $insert_data['store_location'] = $transfer . $sl_gl[$store_location];
                        $insert_data['source_type'] = $doc_arr['source_type'];

                        $select = '*';
                        $table = 'nav_transfer';
                        $where['store'] = $store;
                        $where['db_id'] = $db_id;
                        $where['document_no'] = $doc_arr['document_num'];
                        $where['line_no'] = $sl_gl['Line No_'];
                        $where['date_'] = $sl_gl['Posting Date'];




                        $check_line = $this->BIR_mod->select_nav($table, $select, $where, '');
                        if (empty($check_line)) {
                            if (
                                ($doc_arr['source_type'] == '1' && $sl_gl['Quantity'] > 1) ||
                                ($doc_arr['source_type'] == '2')
                            ) {
                                $this->BIR_mod->insert_table_nav($table, $insert_data);
                            }
                        } else {
                            $this->BIR_mod->update_table_nav($table, $insert_data, $where);
                        }
                    }
                }

                echo '<script language="JavaScript">';
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Entry: ");';
                echo '</script>';
                flush();
                ob_flush();
            }
        }

        if (strstr($document_list, '_')) {
            $document_list = substr($document_list, 0, -1);
        }


        echo ' <div class="col-sm-12 row">                                                
                     <button class="btn btn-success btn-lg btn-center" style="margin-left:129px; height: 115px; width: 514px; font-size: 31px; display: inline-block;margin-bottom:20px;"  onclick="generate_transfer_pqt(\'' . $document_list . '\',\'' . $dateFrom . '\',\'' . $dateTo . '\',\'' . $store . '\')">Generate Transfer Quantity Textfile</button> 
                </div>';

        echo '<script>
                             window.io = 
                                {
                                    open: function(verb, url, data, target){
                                        var form = document.createElement("form");
                                        form.action = url;
                                        form.method = verb;
                                        form.target = target || "_self";
                                        if (data) {
                                            for (var key in data) {
                                                var input = document.createElement("textarea");
                                                input.name = key;
                                                input.value = typeof data[key] === "object"
                                                    ? JSON.stringify(data[key])
                                                    : data[key];
                                                form.appendChild(input);
                                            }

                                        }
                                        form.style.display = "none";
                                        document.body.appendChild(form);
                                        form.submit();
                                        document.body.removeChild(form);
                                    }
                                };  


                             function generate_transfer_pqt(document_list,from,to,store)
                             {
                                 var document_arr = document_list.split("_");
                              
                                 for(var a=0;a<document_arr.length;a++)
                                 {                                    
                                      io.open("POST", "' . base_url() . 'BIR_ctrl/generate_transfer_pqt", 
                                      {                               
                                         //"document_arr" : JSON.stringify(document_arr),
                                         "document_no":document_arr[a],
                                         "from":from,
                                         "to":to,
                                         "store":store    
                                      },"_blank");       
                                 }

                                 console.log(document_arr);
                             }
                </script>    
               ';




        ini_set('memory_limit', $memory_limit);
    }


    function generate_transfer_pqt()
    {
        $from = $_POST['from'];
        $to = $_POST['to'];
        $store = $_POST['store'];
        $document_no = $_POST['document_no'];
        $textfile = 'Transfers_' . $document_no . "_" . $from . " to " . $to;

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $textfile . '.PQT"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $select = '*';
        $table = 'nav_transfer';
        $where['document_no'] = $document_no;
        $document_details = $this->BIR_mod->select_nav($table, $select, $where, '');

        if (!empty($document_details)) {
            foreach ($document_details as $doc) {

                if (in_array($doc['source_type'], array('1', 'Customer'))) //if Customer ang source type sa table Sales Invoice Line ka mu look up
                {
                    $column_5 = 'Negative Adjmt.';
                } else
                    if (in_array($doc['source_type'], array('2', 'Vendor'))) //if Vendor and source type  
                    {
                        $column_5 = 'Positive Adjmt.';
                    }

                echo 'ITEM<|>' .
                    $doc['line_no'] . '<|>' .
                    $doc['item_code'] . '<|>' .
                    date('m/d/y', strtotime(date($doc['date_']))) . '<|>' .
                    $column_5 . '<|>' .
                    $doc['document_no'] . '<|>' .
                    $doc['description'] . '<|>' .
                    $doc['source_code'] . '<|>' .
                    '<|>' .
                    round($doc['quantity']) .
                    '<|>' .
                    '<|>' .
                    '<|>' .
                    'ITEMJNL' . '<|>' .
                    $doc['dimension_1'] . '<|>' .
                    $doc['dimension_2'] . '<|>' .
                    'ST-TRANS' . '<|>' .
                    $doc['variant_code'] . '<|>' .
                    $doc['unit_of_measure']
                    . "\n"; //for live
            }
        }

    }

    function run_gl_entry_middleware()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $db_id = $_POST['db_id'];
        $db_details = $this->BIR_mod->get_connection($db_id, '');

        echo $this->progess_bar();

        flush();
        ob_flush();

        if ($db_details[0]['nav_type'] == 'NATIVE' && isset($_POST['module'])) {
            if ($_POST['module'] == 'transfers_middleware') {

                // inserting the data to the database ------------------------------------------------------------------

                $fileContent = $_POST['file_content']; // JSON string of the file content
                $filecontent = json_decode($fileContent);

                $store_no = $_POST['store_no'];
                $db_id = $_POST['db_id'];
                $invoice_type = $_POST['invoice_type'];

                $get_connection = $this->BIR_mod->get_connection($db_id, '');
                $store = $get_connection[0]['store'] . '-' . $get_connection[0]['department'];

                if (strstr($filecontent[0], '","')) {
                    $separator = '","';
                } else {
                    $separator = '"|"';
                }

                $rowproC = 1;
                $total_files = count($filecontent);

                for ($a = 0; $a < count($filecontent); $a++) {

                    $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                    if ($filecontent != '') {

                        $explode_row = explode($separator, $filecontent[$a]);

                        if (count($explode_row) == 13) // if G/L Entry nga table siya
                        {
                            $table = 'nav_gl_table';
                            $select = '*';
                            $where = array();
                            $where['db_id'] = $db_id;
                            $where['store_no'] = $store_no;
                            $where['posting_date'] = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[0])));
                            $where['gl_account_no'] = $explode_row[1];
                            $where['document_type'] = $explode_row[2];
                            $where['document_no'] = $explode_row[3];
                            $where['description'] = $explode_row[4];
                            $where['amount'] = $explode_row[5];
                            $group_by = '';

                            $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);

                            if (empty($search_row)) {
                                $insert_data = array();
                                $insert_data['db_id'] = $db_id;
                                $insert_data['store_no'] = $store_no;
                                $insert_data['posting_date'] = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[0])));
                                $insert_data['gl_account_no'] = $explode_row[1];
                                $insert_data['document_type'] = $explode_row[2];
                                $insert_data['document_no'] = $explode_row[3];
                                $insert_data['description'] = $explode_row[4];
                                $insert_data['amount'] = $explode_row[5];
                                $insert_data['dimension_1'] = $explode_row[6];
                                $insert_data['dimension_2'] = $explode_row[7];
                                $insert_data['source_code'] = $explode_row[8];
                                $insert_data['journal_batch_name'] = $explode_row[9];
                                $insert_data['source_type'] = $explode_row[10];
                                $insert_data['source_no'] = $explode_row[11];
                                $insert_data['external_doc_no'] = str_replace('"', '', $explode_row[12]);
                                $this->BIR_mod->insert_table_nav($table, $insert_data);
                            } else {
                                $column_filter = array();
                                $column_filter['db_id'] = $db_id;
                                $column_filter['store_no'] = $store_no;
                                $column_filter['posting_date'] = date('Y-m-d', strtotime($explode_row[0]));
                                $column_filter['gl_account_no'] = $explode_row[1];
                                $column_filter['document_type'] = $explode_row[2];
                                $column_filter['document_no'] = $explode_row[3];
                                $column_filter['description'] = $explode_row[4];
                                $column_filter['amount'] = $explode_row[5];
                                $column_data = array();
                                $column_data['dimension_1'] = $explode_row[6];
                                $column_data['dimension_2'] = $explode_row[7];
                                $column_data['source_code'] = $explode_row[8];
                                $column_data['journal_batch_name'] = $explode_row[9];
                                $column_data['source_type'] = $explode_row[10];
                                $column_data['source_no'] = $explode_row[11];
                                $column_filter['external_doc_no'] = str_replace('"', '', $explode_row[12]);
                                $this->BIR_mod->update_table_nav($table, $column_data, $column_filter);
                            }
                        } else
                            if (count($explode_row) == 7)  //if Sales Header siya   
                            {
                                if ($invoice_type == 'SALES') {
                                    $table = 'nav_sales_inv_header';
                                    $to_no_name = 'bill_to_cust_no';
                                    $to_name_name = 'bill_to_name';
                                } else {
                                    $table = 'nav_purch_inv_header';
                                    $to_no_name = 'pay_to_vendor_no';
                                    $to_name_name = 'pay_to_name';
                                }

                                $where = array();
                                $db_id = $db_id;
                                $store_no = $store_no;
                                $to_no = str_replace('"', '', $explode_row[0]);
                                $posting_date = date('Y-m-d', strtotime(str_replace('"', '', $explode_row[1])));
                                $location_code = $explode_row[2];
                                $dimension_1 = $explode_row[3];
                                $dimension_2 = $explode_row[4];
                                $no = $explode_row[5];
                                $to_name = str_replace('"', '', $explode_row[6]);
                                $group_by = '';


                                $where['db_id'] = $db_id;
                                $where['store_no'] = $store_no;
                                $where[$to_no_name] = $to_no;
                                $where['posting_date'] = $posting_date;
                                $where['location_code'] = $location_code;
                                $where['dimension_1'] = $dimension_1;
                                $where['dimension_2'] = $dimension_2;
                                $where['no'] = $no;
                                $select = '*';


                                $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);
                                if (empty($search_row)) {
                                    $insert_data = array();
                                    $insert_data['db_id'] = $db_id;
                                    $insert_data['store_no'] = $store_no;
                                    $insert_data[$to_no_name] = $to_no;
                                    $insert_data['posting_date'] = $posting_date;
                                    $insert_data['location_code'] = $location_code;
                                    $insert_data['dimension_1'] = $dimension_1;
                                    $insert_data['dimension_2'] = $dimension_2;
                                    $insert_data['no'] = $no;
                                    $insert_data[$to_name_name] = $to_name;
                                    $this->BIR_mod->insert_table_nav($table, $insert_data);
                                }
                            } else if (count($explode_row) == 9)  //if Sales Line siya   
                            {
                                if ($invoice_type == 'SALES') {
                                    $table = 'nav_sales_inv_line';
                                } else {
                                    $table = 'nav_purch_inv_line';
                                }

                                $line_no = str_replace('"', '', $explode_row[0]);
                                $no = $explode_row[1];
                                $description = $explode_row[2];
                                $quantity = $explode_row[3];
                                $unit_of_measure_code = $explode_row[4];
                                $variant_code = $explode_row[5];
                                $document_no = $explode_row[6];
                                $dimension_1 = $explode_row[7];
                                $dimension_2 = str_replace('"', '', $explode_row[8]);

                                $where = array();
                                $where['db_id'] = $db_id;
                                $where['store_no'] = $store_no;
                                $where['line_no'] = $line_no;
                                $where['no'] = $no;
                                $where['description'] = $description;
                                $where['quantity'] = $quantity;
                                $where['unit_of_measure_code'] = $unit_of_measure_code;
                                $where['variant_code'] = $variant_code;
                                $where['document_no'] = $document_no;
                                $where['dimension_1'] = $dimension_1;
                                $where['dimension_2'] = $dimension_2;
                                $select = '*';
                                $group_by = '';

                                $search_row = $this->BIR_mod->select_nav($table, $select, $where, $group_by);

                                if (empty($search_row)) {
                                    $insert_data = array();
                                    $insert_data['db_id'] = $db_id;
                                    $insert_data['store_no'] = $store_no;
                                    $insert_data['line_no'] = $line_no;
                                    $insert_data['no'] = $no;
                                    $insert_data['description'] = $description;
                                    $insert_data['quantity'] = $quantity;
                                    $insert_data['unit_of_measure_code'] = $unit_of_measure_code;
                                    $insert_data['variant_code'] = $variant_code;
                                    $insert_data['document_no'] = $document_no;
                                    $insert_data['dimension_1'] = $dimension_1;
                                    $insert_data['dimension_2'] = $dimension_2;
                                    $this->BIR_mod->insert_table_nav($table, $insert_data);
                                }
                            }
                    }

                    echo '<script language="JavaScript">';
                    echo '$("span.filename").text("Inserting Lines to the Database");';
                    echo '$("div#percontent").css({"width":"' . $percent . '"});';
                    echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                    echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                    echo '$("span.empname").text("Entry: ");';
                    echo '</script>';
                    flush();
                    ob_flush();
                }


                $dateFrom = $_POST['dateFrom'];
                $dateTo = $_POST['dateTo'];
                $fileName = 'FROM_' . $dateFrom . '_TO_' . $dateTo;
                $table = 'nav_gl_table';

                $where_in = '';
                $where_between = '';
                $WHERE = '';

                if (
                    (isset($_POST['filter_gl']) && $_POST['filter_gl'] != '')
                ) {
                    $filter_arr = array($_POST['filter_gl']);
                    $col_name_arr = array($_POST['filter_type']);

                    for ($b = 0; $b < count($col_name_arr); $b++) {

                        $filter_type = $col_name_arr[$b];
                        $filter = $filter_arr[$b];



                        if (strstr($filter, '|')) {
                            $exp_filter = explode("|", $filter);

                            for ($a = 0; $a < count($exp_filter); $a++) {
                                if (strstr($exp_filter[$a], '..')) {
                                    $exp_range = explode("..", $exp_filter[$a]);
                                    $where_between .= "(" . $filter_type . " BETWEEN '" . $exp_range[0] . "' AND '" . $exp_range[1] . "') OR ";
                                } else {
                                    $where_in .= "'" . $exp_filter[$a] . "',";
                                }
                            }

                            $where_between = substr($where_between, 0, -3);
                            $where_in = "(" . $filter_type . " in (" . substr($where_in, 0, -1) . "))";
                        }

                        if ($where_between != '' && $where_in != '') {
                            $final_where = $where_between . " OR " . $where_in;
                        } else
                            if ($where_between == '' && $where_in != '') {
                                $final_where = $where_in;
                            } else {
                                $final_where = $where_between;
                            }



                        if (!strstr($filter, '|') && !strstr($filter, '..')) {
                            $final_where = "" . $filter_type . "  in ('" . $filter . "')";
                        }

                        if (!strstr($filter, '|') && strstr($filter, '..')) {
                            $exp_range = explode("..", $filter);
                            $final_where .= "" . $filter_type . " BETWEEN '" . $exp_range[0] . "' AND '" . $exp_range[1] . "'";
                        }
                    }



                    $WHERE .= "AND (" . $final_where . ")";
                } else
                    if (isset($_POST['filter_doc'])) {
                        $filter_arr = array($_POST['filter_doc']);
                        $col_name_arr = array('document_no');

                        if ($_POST['filter_vend_cust'] != '') {
                            array_push($filter_arr, $_POST['filter_vend_cust']);
                            array_push($col_name_arr, 'source_no');
                        }

                        $final_where = '';
                        for ($a = 0; $a < count($col_name_arr); $a++) {
                            $where_between = '';
                            $where_in = '';
                            if (strstr($filter_arr[$a], "|")) {
                                $exp_filter = explode("|", $filter_arr[$a]);
                                for ($b = 0; $b < count($exp_filter); $b++) {
                                    if (strstr($exp_filter[$b], "..")) {
                                        $exp_range = explode("..", $exp_filter[$b]);
                                        $where_between .= "(" . $col_name_arr[$a] . " BETWEEN " . "'" . $exp_range[0] . "' AND " . "'" . $exp_range[1] . "'" . ") OR ";
                                    } else {
                                        $where_in .= "'" . $exp_filter[$b] . "',";
                                    }
                                }
                            }

                            if (!strstr($filter_arr[$a], "|") && !strstr($filter_arr[$a], "..")) {
                                $final_where .= " AND (" . $col_name_arr[$a] . " IN ('" . $filter_arr[$a] . "'))";
                            }

                            if (!strstr($filter_arr[$a], "|") && strstr($filter_arr[$a], "..")) {
                                $exp_range = explode("..", $filter_arr[$a]);
                                $final_where .= " AND (" . $col_name_arr[$a] . " BETWEEN " . "'" . $exp_range[0] . "' AND " . "'" . $exp_range[1] . "'" . ") ";
                            }


                            if ($where_in != '' && $where_between != '') {
                                $where_in = "OR (" . $col_name_arr[$a] . " IN (" . substr($where_in, 0, -1) . "))";
                            } else
                                if ($where_in != '' && $where_between == '') {
                                    $where_in = " (" . $col_name_arr[$a] . " IN (" . substr($where_in, 0, -1) . "))";
                                }

                            $where_between = substr($where_between, 0, -3);

                            if ($where_between != '' || $where_in != '') {
                                $final_where .= "AND 
                                                                    (" . $where_between . " " . $where_in . ")  
                                                                    ";
                            }
                        }
                        $WHERE = $final_where;
                    } else {
                        $WHERE = "";
                    }

                $table_query = "  
                                                        SELECT
                                                                *
                                                        FROM 
                                                                " . $table . " 
                                                        WHERE 
                                                                posting_date >= '" . $dateFrom . "'
                                                        AND
                                                                posting_date <= '" . $dateTo . "'    
                                                                " . $WHERE;


                $head_line_deatails = $this->BIR_mod->select_native($table_query);

                $rowproC = 1;
                $total_files = count($head_line_deatails);
                $document_no_arr = array();

                if (!empty($head_line_deatails)) {

                    foreach ($head_line_deatails as $row) {

                        if (!in_array($row['document_no'], $document_no_arr)) {
                            array_push($document_no_arr, $row['document_no']);
                        }

                        $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                        $table = 'nav_gl_entry';
                        $select = '*';

                        $Posting_Date = date('Y-m-d', strtotime(str_replace('"', '', $row['posting_date'])));

                        $column['gl_db_id'] = $db_id;
                        $column['Posting_Date'] = $Posting_Date;
                        $column['gl_account_no'] = $row['gl_account_no'];
                        $document_type = $row['document_type'];
                        $column['document_type'] = $document_type;

                        $column['document_no'] = $row['document_no'];
                        $column['description'] = $row['description'];
                        $column['Amount'] = str_replace(',', '', $row['amount']);
                        $column['dimension_1'] = $row['dimension_1'];
                        $column['Dimension_2'] = $row['dimension_2'];
                        $column['source_code'] = $row['source_code'];
                        $column['journal_batch_name'] = $row['journal_batch_name'];

                        $source_type = $row['source_type'];
                        $column['source_type'] = $source_type;
                        $column['source_no'] = trim($row['source_no']);
                        $column['external_document_no'] = trim(str_replace('"', '', $row['external_doc_no']));
                        $column['textfile_name'] = $fileName;

                        // check if unsay source type----------------------------------------------------------------------------------------

                        if (in_array($row['source_type'], array('1', 'Customer'))) //if Customer ang source type sa table Sales Invoice Line ka mu look up
                        {

                            $table3 = 'nav_sales_inv_line';
                            $table4 = 'nav_sales_inv_header';
                            $store_location = 'bill_to_name';
                            $transfer = 'TRANSFER TO ';
                        } else
                            if (in_array($row['source_type'], array('2', 'Vendor'))) //if Vendor and source type    
                            {
                                $table3 = 'nav_purch_inv_line';
                                $table4 = 'nav_purch_inv_header';
                                $store_location = 'pay_to_name';
                                $transfer = 'TRANSFER FROM ';
                            }

                        $query_string = "  
                                                                                    SELECT
                                                                                        line.line_no,
                                                                                        line.no,
                                                                                        line.description,                                                                                              
                                                                                        line.quantity,    
                                                                                        line.unit_of_measure_code,           
                                                                                        line.variant_code,                                
                                                                                        header.$store_location,
                                                                                        header.posting_date,
                                                                                        header.location_code,
                                                                                        header.dimension_1,
                                                                                        header.dimension_2
                                                                                    FROM 
                                                                                        " . $table4 . " as header
                                                                                    INNER JOIN  " . $table3 . "  AS  line ON line.document_no = header.no
                                                                                    WHERE 
                                                                                        line.document_no = '" . $row['document_no'] . "'
                                                                                        ";

                        $sl_row = $this->BIR_mod->select_native($query_string);


                        if (!empty($sl_row)) {
                            foreach ($sl_row as $sl_gl) {
                                $column['store_location'] = $sl_gl[$store_location];
                            }
                        }

                        //end of  check if unsay source type----------------------------------------------------------------------------------------

                        $check_gl = $this->BIR_mod->select_nav($table, $select, $column, '');

                        if (empty($check_gl)) {

                            $this->BIR_mod->insert_table_nav($table, $column);
                        }


                        echo '<script language="JavaScript">';
                        echo '$("span.filename").text("GL account no - ' . $row['Document No_'] . '");';
                        echo '$("div#percontent").css({"width":"' . $percent . '"});';
                        echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                        echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                        echo '$("span.empname").text("Entry: ");';
                        echo '</script>';
                        flush();
                        ob_flush();
                    }
                } else {
                    echo "there is no data here";
                }
            }
            // end of inserting the data to the database ------------------------------------------------------------------

        } else if ($db_details[0]['nav_type'] == 'NATIVE') {


            $fileContent = $_POST['file_content']; // JSON string of the file content
            $filecontent = json_decode($fileContent);
            $fileName = $_POST['fileName'];

            $rowproC = 1;
            $total_files = count($filecontent);

            $document_no_arr = array();

            for ($a = 0; $a < count($filecontent); $a++) {

                $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                if (strstr($filecontent[$a], '","')) {
                    $separator = '","';
                } else {
                    $separator = '"|"';
                }

                $row_data = explode($separator, $filecontent[$a]);

                if (count($row_data) == 13) {

                    $table = 'nav_gl_entry';
                    $select = '*';

                    $Posting_Date = date('Y-m-d', strtotime(str_replace('"', '', $row_data[0])));

                    $column['gl_db_id'] = $db_id;
                    $column['Posting_Date'] = $Posting_Date;
                    $column['gl_account_no'] = $row_data[1];
                    $column['document_type'] = $row_data[2];
                    $column['document_no'] = $row_data[3];
                    $column['description'] = $row_data[4];
                    $column['Amount'] = str_replace(',', '', $row_data[5]);
                    $column['dimension_1'] = $row_data[6];
                    $column['Dimension_2'] = $row_data[7];
                    $column['source_code'] = $row_data[8];
                    $column['journal_batch_name'] = $row_data[9];
                    $column['source_type'] = trim($row_data[10]);
                    $column['source_no'] = trim($row_data[11]);
                    $column['external_document_no'] = trim(str_replace('"', '', $row_data[12]));
                    $column['textfile_name'] = $fileName;

                    $check_gl = $this->BIR_mod->select_nav($table, $select, $column, '');

                    if (empty($check_gl)) {

                        $this->BIR_mod->insert_table_nav($table, $column);
                    }

                    if (!in_array($row_data[3], $document_no_arr)) {
                        array_push($document_no_arr, $row_data[3]);
                    }

                    str_replace('"', '', $row_data[0]);
                }


                echo '<script language="JavaScript">';
                echo '$("span.filename").text("GL account no - ' . $row_data[1] . '");';
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Entry: ");';
                echo '</script>';
                flush();
                ob_flush();
            }
        } else if ($db_details[0]['nav_type'] == 'SQL') {
            $dateFrom = $_POST['dateFrom'];
            $dateTo = $_POST['dateTo'];
            $fileName = 'FROM_' . $dateFrom . '_TO_' . $dateTo;

            $get_connection = $this->BIR_mod->get_connection($db_id, '');

            foreach ($get_connection as $con) {
                $servername = $con['server_address'];
                $username = $con['username'];
                $password = $con['password'];
                $connection = $con['db_name'];
                $sub_db_name = $con['sub_db_name'];
            }
            $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);

            $filter_type = ($_POST['filter_type'] === 'ENTRY_NO') ? "[Entry No_]" : "[Document No_]";
            $table = '[' . $sub_db_name . '$G_L Entry]';

            $table_query = "SELECT * FROM $table WHERE [Posting Date] BETWEEN '$dateFrom' AND '$dateTo' 
                            AND $filter_type BETWEEN '{$_POST['entry_start']}' AND '{$_POST['entry_end']}' ";

            $table_row = odbc_exec($connect, $table_query);
            $rowproC = 1;
            $total_files = odbc_num_rows($table_row);
            $document_no_arr = array();

            if (odbc_num_rows($table_row) > 0) {

                while ($row = odbc_fetch_array($table_row)) {

                    if (!in_array($row['Document No_'], $document_no_arr)) {
                        array_push($document_no_arr, $row['Document No_']);
                    }

                    $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";
                    $Posting_Date = date('Y-m-d', strtotime(str_replace('"', '', $row['Posting Date'])));
                    $table = 'nav_gl_entry';
                    $select = '*';

                    $column['gl_db_id'] = $db_id;
                    $column['Posting_Date'] = $Posting_Date;
                    $column['gl_account_no'] = $row['G_L Account No_'];

                    if ($row['Document Type'] == 2) {
                        $document_type = 'Invoice';
                    } else {
                        $document_type = 'Credit Memo';
                    }
                    $column['document_type'] = $document_type;
                    $column['document_no'] = $row['Document No_'];
                    $column['description'] = $row['Description'];
                    $column['Amount'] = str_replace(',', '', $row['Amount']);
                    $column['dimension_1'] = $row['Global Dimension 1 Code'];
                    $column['Dimension_2'] = $row['Global Dimension 2 Code'];
                    $column['source_code'] = $row['Source Code'];
                    $column['journal_batch_name'] = $row['Journal Batch Name'];

                    if ($row['Source Type'] == 1) {
                        $source_type = 'Customer';
                    } else {
                        $source_type = 'Vendor';
                    }
                    $column['source_type'] = $source_type;
                    $column['source_no'] = trim($row['Source No_']);
                    $column['external_document_no'] = trim(str_replace('"', '', $row['External Document No_']));
                    $column['textfile_name'] = $fileName;
                    $column['transaction_type'] = (@$_POST['transaction_type'] === 'null') ? NULL : @$_POST['transaction_type'];
                    $column['entry_no'] = $row['Entry No_'];

                    if ($row['Source Type'] == '1')
                    //if Customer ang source type sa table Sales Invoice Line ka mu look up
                    {
                        $table3 = '[' . $sub_db_name . '$Sales Invoice Line]';
                        $table4 = '[' . $sub_db_name . '$Sales Invoice Header]';
                        $store_location = 'Bill-to Name';
                        $transfer = 'TRANSFER TO ';
                    } else if ($row['Source Type'] == '2') //if Vendor and source type    
                    {
                        $table3 = '[' . $sub_db_name . '$Purch_ Inv_ Line]';
                        $table4 = '[' . $sub_db_name . '$Purch_ Inv_ Header]';
                        $store_location = 'Pay-to Name';
                        $transfer = 'TRANSFER FROM ';
                    } else {
                        $store_location = $table4 = $table3 = '';
                    }

                    if (is_int(strpos($row['Document No_'], "'"))) {
                        $rowproC++;
                        continue;
                    }

                    $check_entry_no = ['entry_no' => $column['entry_no']];
                    $check_gl = $this->BIR_mod->select_nav($table, $select, $check_entry_no, '');

                    if (empty($check_gl)) {
                        $this->BIR_mod->insert_table_nav($table, $column);
                    } else {
                        $filter['entry_no'] = $column['entry_no'];
                        $this->BIR_mod->update_table_nav($table, $column, $filter);
                    }

                    echo '<script language="JavaScript">';
                    echo '$("span.filename").text("GL account no - ' . $row['Document No_'] . '");';
                    echo '$("div#percontent").css({"width":"' . $percent . '"});';
                    echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                    echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                    echo '$("span.empname").text("Entry: ");';
                    echo '</script>';
                    flush();
                    ob_flush();
                }
            } else {
                echo "there is no data here";
            }
        }

        $document_string = '"' . implode('", "', $document_no_arr) . '"';

        $url = (isset($_POST['nav_type']))
            ? 'BIR_ctrl/generate_gl_textfile_sql'
            : 'BIR_ctrl/generate_gl_textfile_';

        $data = [
            'document_string' => $document_string,
            'url' => $url,
            'nav_type' => $_POST['nav_type'],
            'filename' => "'$fileName'",
            'transaction_type' => $_POST['transaction_type'],
            'db_name' => $db_details[0]['db_name'],
            'filter_type' => $_POST['filter_type'],
            'entry_start' => $_POST['entry_start'],
            'entry_end' => $_POST['entry_end']
        ];

        $this->load->view('bir/run_gl_entry', $data);

        ini_set('memory_limit', $memory_limit);
    }


    function generate_gl_textfile()
    {
        $doc_no = $_POST['doc_no'];

        $table = "nav_gl_entry";
        $select = "*";
        $where['document_no'] = $doc_no;
        $group_by = 'document_no';
        $gl_entry_list = $this->BIR_mod->select_nav($table, $select, $where, $group_by);

        $data['gl_entry_list'] = $gl_entry_list;
        echo json_encode($data);
    }


    function generate_gl_textfile_GL_middleware()
    {
        $document_no = $_POST['document_no'];
        $textfile = $_POST['textfile_name'];
        $textfile_name = 'GL_Mid_' . $document_no . '_' . $textfile;

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $textfile_name . '.PJN"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();


        $table = "nav_gl_entry";
        $select = "*";
        $where['textfile_name'] = $textfile;
        $where['document_no'] = $document_no;
        $gl_entry_list = $this->BIR_mod->select_nav($table, $select, $where, '');

        $line_no = 10000;
        foreach ($gl_entry_list as $gl) {
            $table = 'nav_account_masterfile';
            $where_mstfl['dimension_1'] = $gl['dimension_1'];
            $where_mstfl['dimension_2'] = $gl['Dimension_2'];

            $nav_account_details = $this->BIR_mod->select_nav($table, $select, $where_mstfl, '');

            //$exempted_gl_account_no = array('10.10.01.03.01','10.10.01.03.02','10.10.01.03.03','10.10.01.03.04');
            $exempted_gl_account_no = array('10.20.01.01.01.01');
            $excempted_store = array('ASC-S0010');

            if (in_array($nav_account_details[0]['store'], $excempted_store)) {
                if (in_array($gl['gl_account_no'], $exempted_gl_account_no)) {
                    $column_3 = $gl['source_type'];
                    $column_4 = $gl['source_no'];
                } else {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                }
            } else

                if (($gl['source_type'] == '' && $gl['source_no'] == '')) {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                } else {
                    $column_3 = $gl['source_type'];
                    $column_4 = $gl['source_no'];
                }

            if ($gl['gl_account_no'] == '10.10.01.03.02') {
                $column_3 = $gl['source_type'];
                $column_4 = $gl['source_no'];
            } else
                if ($gl['gl_account_no'] == '10.20.01.01.01.02') {
                    $column_3 = 'Vendor';
                    $column_4 = $gl['source_no'];
                } else {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                }

            $column_8 = $gl['description'];
            $column_8_first_50 = substr($column_8, 0, 50);

            echo 'GENERAL' . '<|>' .
                $line_no . '<|>' .
                $column_3 . '<|>' .
                $column_4 . '<|>' .
                date('m/m/y', strtotime($gl['Posting_Date'])) . '<|>' .
                '' . '<|>' .
                $gl['document_no'] . '<|>' .
                trim($column_8_first_50) . '<|>' .
                number_format($gl['Amount'], 2) . '<|>' .
                $gl['dimension_1'] . '<|>' .
                $gl['Dimension_2'] . '<|>' .
                'GENJNL' . '<|>' .
                'GJNL-NONTR' . '<|>' .
                '' . '<|>' .
                '' . '<|>' .
                '' . '<|>' .
                $gl['external_document_no'] . '<|>' .
                '' . "\n";
            $line_no += 10000;
        }
    }

    function generate_gl_textfile_sql()
    {
        if ($_POST['filter_type'] === 'ENTRY_NO' || $_POST['entry_start'] == $_POST['entry_end']) {
            $this->generate_gl_textfile_one_file();
        } else {
            $this->generate_gl_textfile_multiple_file();
        }
    }

    function generate_gl_textfile_one_file()
    {
        $document_no = $_POST['document_no'];
        $document_no = json_decode($document_no);

        $textfile = $_POST['textfile_name'];
        $transaction_type = $_POST['transaction_type'];
        $db_name = $_POST['db_name'];
        $entry_start = $_POST['entry_start'];
        $textfile_name = "GL_{$entry_start}_{$transaction_type}_$db_name";

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $textfile_name . '.PJN"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $line_no = 10000;

        for ($a = 0; $a < count($document_no); $a++) {

            $table = "nav_gl_entry";
            $select = "*";
            $where['textfile_name'] = $textfile;
            $where['document_no'] = $document_no[$a];
            $gl_entry_list = $this->BIR_mod->select_nav($table, $select, $where, '');

            foreach ($gl_entry_list as $gl) {
                $table = 'nav_account_masterfile';
                $where_mstfl['dimension_1'] = $gl['dimension_1'];
                $where_mstfl['dimension_2'] = $gl['Dimension_2'];

                $nav_account_details = $this->BIR_mod->select_nav($table, $select, $where_mstfl, '');

                $exempted_gl_account_no = array('10.20.01.01.01.01', '10.20.01.01.01.02', ' 10.20.01.01.01.01', '10.20.01.01.01.03', '10.20.01.01.01.04', '10.20.01.01.01.05', '10.20.01.01.01.06');
                $excempted_store = array('ASC-S0010');

                $gl_acc = [
                    '10.10.01.03.01',
                    '10.10.01.03.02',
                    '10.10.01.03.03',
                    '10.10.01.03.04'
                ];

                if (in_array($gl['gl_account_no'], $gl_acc)) {
                    $column_3 = $gl['source_type'];
                    $column_4 = $gl['source_no'];
                } else if (in_array($gl['gl_account_no'], $exempted_gl_account_no)) {
                    $column_3 = 'Vendor';
                    $column_4 = $gl['source_no'];
                } else {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                }

                if ($gl['source_type'] == 'Vendor') {
                    $transfer = 'TRANSFER FR ';
                } else if ($gl['source_type'] == 'Customer') {
                    $transfer = 'TRANSFER TO ';
                }

                $column_8 = $gl['description'];
                $column_8_first_50 = substr($column_8, 0, 50);
                $amount = number_format($gl['Amount'], 2);

                if ($amount === '0.00') {
                    continue;
                }

                if ($transaction_type === 'JV') {
                    $gl['source_code'] = 'GENJNL';
                }

                $delimiter = '<|>';
                $date = date('m/d/y', strtotime($gl['Posting_Date']));

                $output = [
                    'GENERAL',
                    $line_no,
                    $column_3,
                    $column_4,
                    $date,
                    '',
                    $gl['document_no'],
                    $column_8,
                    $amount,
                    $gl['dimension_1'],
                    $gl['Dimension_2'],
                    $gl['source_code'],
                    $gl['transaction_type'],
                    '',
                    '',
                    '',
                    $gl['external_document_no'],
                    '',
                ];

                // if ($gl['transaction_type'] !== "CONS DED") {
                //     unset($output[6]);
                // }

                echo implode($delimiter, $output) . "\n";

                $line_no += 10000;
            }
        }
    }

    function generate_gl_textfile_multiple_file()
    {
        $document_no = $_POST['document_no'];
        $document_no = json_decode($document_no);
        $textfile = $_POST['textfile_name'];

        for ($a = 0; $a < count($document_no); $a++) {
            $line_no = 10000;
            $where['textfile_name'] = $textfile;
            $where['document_no'] = $document_no[$a];
            $gl_entry_list = $this->BIR_mod->select_nav("nav_gl_entry", "*", $where, '');

            foreach ($gl_entry_list as $gl) {
                /*--- Conditional Structures ---*/

                $exempted_gl_account_no = array('10.20.01.01.01.01', '10.20.01.01.01.02', ' 10.20.01.01.01.01', '10.20.01.01.01.03', '10.20.01.01.01.04', '10.20.01.01.01.05', '10.20.01.01.01.06');
                $excempted_store = array('ASC-S0010');

                $gl_acc = [
                    '10.10.01.03.01',
                    '10.10.01.03.02',
                    '10.10.01.03.03',
                    '10.10.01.03.04'
                ];

                if (in_array($gl['gl_account_no'], $gl_acc)) {
                    $column_3 = $gl['source_type'];
                    $column_4 = $gl['source_no'];
                } else if (in_array($gl['gl_account_no'], $exempted_gl_account_no)) {
                    $column_3 = 'Vendor';
                    $column_4 = $gl['source_no'];
                } else {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                }

                if ($gl['source_type'] == 'Vendor') {
                    $transfer = 'TRANSFER FR ';
                } else if ($gl['source_type'] == 'Customer') {
                    $transfer = 'TRANSFER TO ';
                }

                $column_8 = $gl['description'];
                $column_8_first_50 = substr($column_8, 0, 50);
                $amount = number_format($gl['Amount'], 2);

                if ($amount === '0.00') {
                    continue;
                }

                /*--- Conditional Structures ---*/

                $delimiter = '<|>';
                $date = date('m/d/y', strtotime($gl['Posting_Date']));

                $output = [
                    'GENERAL',
                    $line_no,
                    $column_3,
                    $column_4,
                    $date,
                    '',
                    $gl['document_no'],
                    $column_8,
                    $amount,
                    $gl['dimension_1'],
                    $gl['Dimension_2'],
                    $gl['source_code'],
                    $gl['transaction_type'],
                    '',
                    '',
                    '',
                    $gl['external_document_no'],
                    '',
                ];

                // if ($gl['transaction_type'] !== "CONS DED") {
                //     unset($output[6]);
                // }

                $array[] = implode($delimiter, $output);
                $line_no += 10000;
            }

            $datasets[$document_no[$a]] = $array;
            $array = [];
        }

        $this->generate_gl_zip($datasets);
    }

    function generate_gl_zip($dataset)
    {
        $start = $_POST['entry_start'];
        $end = $_POST['entry_end'];
        $file_name = "GL_{$start}_$end";
        header('Content-Type: application/zip');
        header('Content-Disposition: attachment; filename="' . $file_name . '.zip"');

        $zip = new ZipArchive();
        $tempZip = tempnam(sys_get_temp_dir(), "$file_name");
        $zip->open($tempZip, ZipArchive::CREATE);

        $transaction_type = $_POST['transaction_type'];
        $db_name = $_POST['db_name'];

        foreach ($dataset as $index => $data) {
            $filename = "GL_{$index}_{$transaction_type}_$db_name.pjn";

            $tempFile = tempnam(sys_get_temp_dir(), 'dataset');
            file_put_contents($tempFile, implode("\n", $data));

            $zip->addFile($tempFile, $filename);
        }

        $zip->close();
        readfile($tempZip);
        unlink($tempZip);
    }


    function generate_gl_textfile_()
    {
        $document_no = $_POST['document_no'];
        $textfile = $_POST['textfile_name'];
        $textfile_name = 'GL_Transfer_' . $document_no . '_' . $textfile;

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $textfile_name . '.PJN"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $table = "nav_gl_entry";
        $select = "*";
        $where['textfile_name'] = $textfile;
        $where['document_no'] = $document_no;
        $gl_entry_list = $this->BIR_mod->select_nav($table, $select, $where, '');

        $line_no = 10000;
        foreach ($gl_entry_list as $gl) {
            $table = 'nav_account_masterfile';
            $where_mstfl['dimension_1'] = $gl['dimension_1'];
            $where_mstfl['dimension_2'] = $gl['Dimension_2'];

            // $nav_account_details    = $this->BIR_mod->select_nav($table, $select, $where_mstfl, '');
            // $exempted_gl_account_no = array('10.20.01.01.01.01');
            // $excempted_store        = array('ASC-S0010');

            if ($gl['gl_account_no'] == '10.10.01.03.02') {
                $column_3 = $gl['source_type'];
                $column_4 = $gl['source_no'];
            } else
                if ($gl['gl_account_no'] == '10.20.01.01.01.02') {
                    $column_3 = 'Vendor';
                    $column_4 = $gl['source_no'];
                } else {
                    $column_3 = 'G/L Account';
                    $column_4 = $gl['gl_account_no'];
                }

            if ($gl['source_type'] == 'Vendor') {
                $transfer = 'TRANSFER FR ';
            } else
                if ($gl['source_type'] == 'Customer') {
                    $transfer = 'TRANSFER TO ';
                }

            $column_8 = $transfer . $gl['store_location'];
            $column_8_first_50 = substr($column_8, 0, 50);

            echo 'GENERAL' . '<|>' .
                $line_no . '<|>' .
                $column_3 . '<|>' .
                $column_4 . '<|>' .
                date('m/m/y', strtotime($gl['Posting_Date'])) . '<|>' .
                '' . '<|>' .
                $gl['document_no'] . '<|>' .
                trim($column_8_first_50) . '<|>' .
                number_format($gl['Amount'], 2) . '<|>' .
                $gl['dimension_1'] . '<|>' .
                $gl['Dimension_2'] . '<|>' .
                'GENJNL' . '<|>' .
                'GLTRANSFER' . '<|>' .
                '' . '<|>' .
                '' . '<|>' .
                '' . '<|>' .
                $gl['external_document_no'] . '<|>' .
                '' . "\n";
            $line_no += 10000;
        }
    }


    function load_native_item_table()
    {
        $line = $_POST['line'];
        $row_data = explode('","', $line);

        $transaction_no = str_replace('"', '', $row_data[0]);
        $line_no = $row_data[1];
        $receipt_no = $row_data[2];
        $barcode_no = $row_data[3];
        $item_code = $row_data[4];
        $sales_staff = $row_data[5];
        $item_department = $row_data[6];
        $item_group = $row_data[7];
        $price = $row_data[8];
        $net_price = $row_data[9];
        $quantity = $row_data[10];
        $vat_code = $row_data[11];
        $transaction_status = $row_data[12];
        $disc_amount = $row_data[13];
        $cost_amount = $row_data[14];
        $date_ = date('Y-m-d', strtotime($row_data[15]));
        $time_ = date('H:i:s', strtotime($row_data[16]));
        $shift_no = $row_data[17];
        $shift_date = $row_data[18];
        $net_amount = $row_data[19];
        $vat_amount = $row_data[20];
        $promotion_no = $row_data[21];
        $standard_net_price = $row_data[22];
        $disc_amt_from_std_price = $row_data[23];
        $statement_no = $row_data[24];
        $customer_no = $row_data[25];
        $section = $row_data[26];
        $shelf = $row_data[27];
        $statement_code = $row_data[28];
        $item_disc_group = $row_data[29];
        $transaction_code = $row_data[30];
        $store_no = $row_data[31];
        $item_number_scanned = $row_data[32];
        $keyboard_item_entry = $row_data[33];
        $price_in_barcode = $row_data[34];
        $price_change = $row_data[35];
        $weight_manually_entered = $row_data[36];
        $line_was_discounted = $row_data[37];
        $scale_item = $row_data[38];
        $weight_item = $row_data[39];
        $return_no_sale = $row_data[40];
        $item_corrected_line = $row_data[41];
        $type_of_sale = $row_data[42];
        $linked_no_not_orig = $row_data[43];
        $orig_of_linked_item_list = $row_data[44];
        $pos_terminal_no = $row_data[45];
        $staff_id = $row_data[46];
        $item_posting_group = $row_data[47];
        $total_rounded_amt = $row_data[48];
        $counter = $row_data[49];
        $variant_code = $row_data[50];
        $line_discount = $row_data[51];
        $replicated = $row_data[52];
        $customer_discount = $row_data[53];
        $infocode_discount = $row_data[54];
        $cust_invoice_discount = $row_data[55];
        $unit_of_measure = $row_data[56];
        $uom_quantity = $row_data[57];
        $uom_price = $row_data[58];
        $total_discount = $row_data[59];
        $total_disc_percentage = $row_data[60];
        $tot_disc_info_line_no = $row_data[61];
        $periodic_disc_type = $row_data[62];
        $periodic_disc_group = $row_data[63];
        $periodic_discount = str_replace('"', '', $row_data[64]);
        $discount_amt_for_printing = $row_data[65];
        $item_division = $row_data[66];
        $addon_code = $row_data[67];
        $addon_percentage = $row_data[68];
        $used_amount = $row_data[69];
        $item_internal_type = $row_data[70];
        $crm_loyalty_card = $row_data[71];
        $crm_loyalty_card_type = $row_data[72];
        $crm_earned_points = $row_data[73];
        $item_points = str_replace('"', '', $row_data[74]);

        $database_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];

        $data['button'] = ' <button class="btn btn-success btn-lg btn-center" style="margin-left:300px;"  onclick="generate_textfile(' . "'" . $dateFrom . "','" . $dateTo . "','" . $database_id . "','SI'" . ')">Generate Quantity Sold</button> 
                             <button class="btn btn-success btn-lg btn-center" style="margin-left:50px;"  onclick="generate_ledger_textfile(' . "'" . $dateFrom . "','" . $dateTo . "','" . $database_id . "'" . ')">Generate Sales Ledger</button>
                             <button type="button" class="btn btn-lg btn-danger" style="margin-left: 289px;" data-dismiss="modal">
                                            <i class="bx bx-x d-block d-sm-none"></i>
                                            <span class="d-none d-sm-block ">Close</span>
                             </button>  
                             <script> 
                              window.io = {
                                                open: function(verb, url, data, target){
                                                    var form = document.createElement("form");
                                                    form.action = url;
                                                    form.method = verb;
                                                    form.target = target || "_self";
                                                    if (data) {
                                                        for (var key in data) {
                                                            var input = document.createElement("textarea");
                                                            input.name = key;
                                                            input.value = typeof data[key] === "object"
                                                                ? JSON.stringify(data[key])
                                                                : data[key];
                                                            form.appendChild(input);
                                                        }

                                                    }
                                                    form.style.display = "none";
                                                    document.body.appendChild(form);
                                                    form.submit();
                                                    document.body.removeChild(form);
                                                }
                                            };

                                              
                                function generate_textfile(dateFrom,dateTo,database_id,vendor_type)
                                {                              

                                      io.open("POST", "' . base_url() . 'BIR_ctrl/generate_textfile", { 
                                                                                                        "dateFrom":dateFrom,
                                                                                                        "dateTo":dateTo,
                                                                                                        "database_id":database_id,
                                                                                                        "vendor_type":vendor_type
                                                                                                  },"_blank");       
                                }


                                function generate_ledger_textfile(dateFrom,dateTo,database_id)
                                {                              

                                      io.open("POST", "' . base_url() . 'BIR_ctrl/generate_ledger_textfile", { 
                                                                                                        "dateFrom":dateFrom,
                                                                                                        "dateTo":dateTo,
                                                                                                        "database_id":database_id
                                                                                                  },"_blank");       
                                }
                              </script>  

                             ';

        $get_connection = $this->BIR_mod->get_connection(5, '');

        foreach ($get_connection as $con) {

            $servername = $con['server_address'];
            $username = $con['username'];
            $password = $con['password'];
            $connection = $con['db_name'];
            $sub_db_name = $con['sub_db_name'];
        }

        $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);
        $table = '[' . $sub_db_name . '$Item]';

        $table_query = "SELECT
                                * 
                         FROM 
                              " . $table . "                                         
                         WHERE
                               [No_] = '" . $item_code . "' 
                             ";
        $table_row = odbc_exec($connect, $table_query);

        if (odbc_num_rows($table_row) > 0) {
            while (odbc_fetch_row($table_row)) {
                $vendor_no = odbc_result($table_row, 24);
                $description = odbc_result($table_row, 4);
            }
        }

        $insert_data['db_id'] = $database_id;
        $insert_data['transaction_no'] = $transaction_no;
        $insert_data['line_no'] = $line_no;
        $insert_data['receipt_no'] = $receipt_no;
        $insert_data['barcode_no'] = $barcode_no;
        $insert_data['item_code'] = $item_code;
        $insert_data['sales_staff'] = $sales_staff;
        $insert_data['item_department'] = $item_department;
        $insert_data['item_group'] = $item_group;
        $insert_data['price'] = $price;
        $insert_data['net_price'] = $net_price;
        $insert_data['quantity'] = str_replace('-', '', $quantity);
        $insert_data['vat_code'] = $vat_code;
        $insert_data['transaction_status'] = $transaction_status;
        $insert_data['disc_amount'] = $disc_amount;
        $insert_data['cost_amount'] = str_replace('-', '', $cost_amount);
        $insert_data['date_'] = $date_;
        $insert_data['time_'] = $time_;
        $insert_data['shift_no'] = $shift_no;
        $insert_data['shift_date'] = $shift_date;
        $insert_data['net_amount'] = str_replace('-', '', $net_amount);
        $insert_data['vat_amount'] = $vat_amount;
        $insert_data['promotion_no'] = $promotion_no;
        $insert_data['standard_net_price'] = $standard_net_price;
        $insert_data['disc_amt_from_std_price'] = $disc_amt_from_std_price;
        $insert_data['statement_no'] = $statement_no;
        $insert_data['customer_no'] = $customer_no;
        $insert_data['section'] = $section;
        $insert_data['shelf'] = $shelf;
        $insert_data['statement_code'] = $statement_code;
        $insert_data['item_disc_group '] = $item_disc_group;
        $insert_data['transaction_code'] = $transaction_code;
        $insert_data['store_no        '] = $store_no;
        $insert_data['item_number_scanned'] = $item_number_scanned;
        $insert_data['keyboard_item_entry'] = $keyboard_item_entry;
        $insert_data['price_in_barcode'] = $price_in_barcode;
        $insert_data['price_change'] = $price_change;
        $insert_data['weight_manually_entered'] = $weight_manually_entered;
        $insert_data['line_was_discounted'] = $line_was_discounted;
        $insert_data['scale_item'] = $scale_item;
        $insert_data['weight_item'] = $weight_item;
        $insert_data['return_no_sale'] = $return_no_sale;
        $insert_data['item_corrected_line'] = $item_corrected_line;
        $insert_data['type_of_sale'] = $type_of_sale;
        $insert_data['linked_no_not_orig'] = $linked_no_not_orig;
        $insert_data['orig_of_linked_item_list'] = $orig_of_linked_item_list;
        $insert_data['pos_terminal_no'] = $pos_terminal_no;
        $insert_data['staff_id'] = $staff_id;
        $insert_data['item_posting_group'] = $item_posting_group;
        $insert_data['total_rounded_amt '] = str_replace('-', '', $total_rounded_amt);
        $insert_data['counter'] = $counter;
        $insert_data['variant_code'] = $variant_code;
        $insert_data['line_discount'] = $line_discount;
        $insert_data['replicated'] = $replicated;
        $insert_data['customer_discount'] = $customer_discount;
        $insert_data['infocode_discount'] = $infocode_discount;
        $insert_data['cust_invoice_discount'] = $cust_invoice_discount;
        $insert_data['unit_of_measure'] = $unit_of_measure;
        $insert_data['uom_quantity'] = $uom_quantity;
        $insert_data['uom_price'] = $uom_price;
        $insert_data['total_discount'] = $total_discount;
        $insert_data['total_disc_percentage'] = $total_disc_percentage;
        $insert_data['tot_disc_info_line_no'] = $tot_disc_info_line_no;
        $insert_data['periodic_disc_type'] = $periodic_disc_type;
        $insert_data['periodic_disc_group'] = $periodic_disc_group;
        $insert_data['periodic_discount'] = $periodic_discount;
        $insert_data['discount_amt_for_printing'] = $discount_amt_for_printing;
        $insert_data['item_division'] = $item_division;
        $insert_data['addon_code'] = $addon_code;
        $insert_data['addon_percentage'] = $addon_percentage;
        $insert_data['used_amount'] = $used_amount;
        $insert_data['item_internal_type'] = $item_internal_type;
        $insert_data['crm_loyalty_card'] = $crm_loyalty_card;
        $insert_data['crm_loyalty_card_type'] = $crm_loyalty_card_type;
        $insert_data['crm_earned_points'] = $crm_earned_points;
        $insert_data['item_points'] = $item_points;
        $insert_data['vendor_no'] = $vendor_no;
        $insert_data['description'] = $description;

        $search_sales = $this->BIR_mod->find_sales_entry($item_code, $vendor_no, $date_, $receipt_no, $transaction_no, $pos_terminal_no, $database_id, $line_no);
        if (empty($search_sales)) {
            $table = 'nav_tran_sales_bir_consolidated';
            $this->BIR_mod->insert_table_nav($table, $insert_data);
        }


        echo json_encode($data);
    }






    function generate_pof_()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $database_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $get_connection = $this->BIR_mod->get_connection($database_id, '');
        $store_name = $get_connection[0]['db_name'];





        foreach ($get_connection as $con) {

            $servername = $con['server_address'];
            $username = $con['username'];
            $password = $con['password'];
            $connection = $con['db_name'];
            $sub_db_name = $con['sub_db_name'];
        }
        // $connect      = odbc_connect($connection, $username, $password);
        $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);



        $table = '[' . $sub_db_name . '$Purch_ Inv_ Header]';
        $table_query = "  
                          SELECT
                                 *
                          FROM 
                                 " . $table . " 
                          WHERE 
                                [Posting Date] >= '" . $dateFrom . "'
                          AND
                                [Posting Date] <= '" . $dateTo . "'    
                                 ";

        $table_row = odbc_exec($connect, $table_query);




        if (odbc_num_rows($table_row) > 0) {

            while ($row = odbc_fetch_array($table_row)) {

                echo $row['No_'] . '<|>' .
                    $row['Buy-from Vendor No_'] . '<|>' .
                    date('m/d/y', strtotime(date($row['Posting Date']))) . '<|>' .
                    date('m/d/y', strtotime(date($row['Posting Date']))) . '<|>' .
                    date('m/d/y', strtotime(date($row['Order Date']))) . '<|>' .
                    $row['Location Code'] . '<|>' .
                    $row['Vendor Invoice No_'] . '<|>' .
                    $row['Shortcut Dimension 1 Code'] . '<|>' .
                    $row['Shortcut Dimension 2 Code'] . '<|>' .
                    round($row['Payment Discount _'], 2) . "\n";

            }
        } else {
            echo "there is no data here";
        }



        ini_set('memory_limit', $memory_limit);
    }



    function generate_pof_sof()
    {
        $type = $_POST['type'];

        echo '
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <meta charset="utf-8">
                            <title>DATA UPLOAD</title>
                            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">     
                            <link href="' . base_url() . 'assets/css/datatables.min.css" rel="stylesheet" type="text/css"/>
                            <link href="' . base_url() . 'assets/css/googleapis.css" rel="stylesheet" type="text/css"/>
                            <link rel="<?php echo base_url();  ?>assets/css/sweetalert.css">


                    <!--imported -->

                            <!-- <link rel="shortcut icon" type="image/png" href="../assets/img/latest.png"> -->
                            <link href="' . base_url() . 'assets/css/site.min.css" rel="stylesheet"/>
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/font-awesome.css" rel="stylesheet">
                            <script src="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            </script><link href="' . base_url() . 'assets/progress_bar/css/custom.css" ?v2="" rel="stylesheet">
                            <link rel="stylesheet" type="text/css" href="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap-datetimepicker.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/dormcss.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link rel="stylesheet" href="' . base_url() . 'assets/progress_bar/js/jquery-ui/jquery-ui.css">
                            <link href="' . base_url() . 'assets/progress_bar/alert/css/alert.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/alert/themes/default/theme.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/extendedcss.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <!-- <link href="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.css?ts=<?=time()?>&quot;" rel="stylesheet"> -->
                            <script src="' . base_url() . 'assets/progress_bar/js/jquery-1.10.2.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap.min.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap-dialog.js?2"></script>

                            <script src="' . base_url() . 'assets/progress_bar/js/jquery.metisMenu.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTablesDontDelete/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/ebsdeduction_function.js?<?php echo time()?>"></script>
                            <script src="' . base_url() . 'assets/js/sweetalert.js"></script>    
                            <script src="' . base_url() . 'assets/js/sweetalert2.all.min.js"></script>
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
                                        <span class="col-md-12 pdd fnt13 empname" >PO Numer: </span>
                                        <span class="col-md-12 pdd fnt13 filename"></span>
                                         
                                  </div>
                             </div>
                    ';

        flush();
        ob_flush();
        usleep(100);


        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $database_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $filter_start = $_POST['filter_start'];
        $filter_end = $_POST['filter_end'];
        $dateTo = $_POST['dateTo'];
        $get_connection = $this->BIR_mod->get_connection($database_id, '');
        $store_name = $get_connection[0]['db_name'];

        foreach ($get_connection as $con) {
            $servername = $con['server_address'];
            $username = $con['username'];
            $password = $con['password'];
            $connection = $con['db_name'];
            $sub_db_name = $con['sub_db_name'];
        }

        $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);
        $header_arr = array();

        switch ($type) {
            case 'POF':
                $table = '[' . $sub_db_name . '$Purch_ Inv_ Header]';
                break;
            case 'SOF':
                $table = '[' . $sub_db_name . '$Sales Invoice Header]';
                break;
            case 'POC':
                $table = '[' . $sub_db_name . '$Purch_ Cr_ Memo Hdr_]';
                break;
            case 'SOC':
                $table = '[' . $sub_db_name . '$Sales Cr_Memo Header]';
                break;
            default:
                break;
        }

        $table_query = "SELECT * FROM $table WHERE [No_] BETWEEN '$filter_start' AND '$filter_end' ";
        $table_row = odbc_exec($connect, $table_query);

        $rowproC = 1;
        $total_files = odbc_num_rows($table_row);

        if (odbc_num_rows($table_row) > 0) {

            while ($row = odbc_fetch_array($table_row)) {

                $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                $header_data = array(
                    "_Number" => $row['No_'],
                    "Posting_Date" => $row['Posting Date'],
                    "Location_Code" => $row['Location Code'],
                    "Global_Dimmension_1" => $row['Shortcut Dimension 1 Code'],
                    "Global_Dimmension_2" => $row['Shortcut Dimension 2 Code']
                );

                switch ($type) {
                    case 'POF':
                        $header_data["Vendor_Number"] = $row['Buy-from Vendor No_'];
                        $header_data["Document_Date"] = $row['Posting Date'];
                        $header_data["Vendor_Invoice_Number"] = $row['Vendor Invoice No_'];
                        $header_data["Invoice_Discount"] = $row['Payment Discount _'];
                        $header_data["Order_Date"] = $row['Order Date'];
                        break;
                    case 'SOF':
                        $header_data["Vendor_Number"] = $row['Sell-to Customer No_'];
                        $header_data["Document_Date"] = $row['Shipment Date'];
                        $header_data["Vendor_Invoice_Number"] = $row['External Document No_'];
                        $header_data["Order_Date"] = $row['Order Date'];
                        $header_data["Invoice_Discount"] = 'No';
                        break;
                    case 'POC':
                        $header_data["Vendor_Number"] = $row['Buy-from Vendor No_'];
                        $header_data["Document_Date"] = $row['Posting Date'];
                        $header_data["Vendor_Invoice_Number"] = $row['Vendor Cr_ Memo No_'];
                        $header_data["Invoice_Discount"] = $row['Payment Discount _'];
                        $header_data["Order_Date"] = $row['Posting Date'];
                        break;
                    case 'SOC':
                        $header_data["Vendor_Number"] = $row['Sell-to Customer No_'];
                        $header_data["Document_Date"] = $row['Shipment Date'];
                        $header_data["Vendor_Invoice_Number"] = $row['Vendor Cr_ Memo No_'];
                        $header_data["Order_Date"] = $row['Posting Date'];
                        $header_data["Invoice_Discount"] = 'No';
                        break;
                }

                array_push($header_arr, $header_data);

                echo '<script language="JavaScript">';
                echo '$("span.filename").text("PO Numer: ' . $row['No_'] . '");';
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Fetching Purch_ Inv_ Line Table: ");';
                echo '</script>';
                str_repeat(' ', 1024 * 64);
                flush();
                ob_flush();
                //usleep(100); 

            }
        } else {
            echo "there is no data here";
        }

        if (!empty($header_arr)) {
            $line_arr = array();
            $rowproC = 1;
            $total_files = count($header_arr);

            foreach ($header_arr as $head) {

                $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                switch ($type) {
                    case 'POF':
                        $prefix_file_name = 'Purch';
                        $table = '[' . $sub_db_name . '$Purch_ Inv_ Line]';
                        break;
                    case 'SOF':
                        $prefix_file_name = 'Sales';
                        $table = '[' . $sub_db_name . '$Sales Invoice Line]';
                        break;
                    case 'POC':
                        $prefix_file_name = 'Purch_Cr_Memo';
                        $table = '[' . $sub_db_name . '$Purch_ Cr_ Memo Line]';
                        break;
                    case 'SOC':
                        $prefix_file_name = 'Sales_Cr_Memo';
                        $table = '[' . $sub_db_name . '$Sales_ Cr_ Memo Line]';
                        break;
                }

                $table_query = "  
                                  SELECT
                                         *
                                  FROM 
                                         " . $table . " 
                                  WHERE 
                                         [Document No_] =  '" . $head['_Number'] . "'                                  
                                         ";

                $table_row = odbc_exec($connect, $table_query);

                if (odbc_num_rows($table_row) > 0) {
                    while ($row = odbc_fetch_array($table_row)) {
                        array_push(
                            $line_arr,
                            array(
                                "_Number" => $row['Document No_'],
                                "Line_No" => $row['Line No_'],
                                "Item_Number" => $row['No_'],
                                "Quantity" => $row['Quantity'],
                                "Unit_of_Measure" => $row['Unit of Measure Code'],
                                "Direct_Unit_Cost" => $row['Direct Unit Cost'],
                                "Line_Amount_Including_Vat" => $row['Amount Including VAT'],
                                "Line_Discount" => $row['Line Discount Amount'],
                                "Inv_Disc_Amount" => $row['Inv_ Discount Amount']
                            )
                        );
                    }
                }

                echo '<script language="JavaScript">';
                echo '$("span.filename").text("PO Numer: ' . $head['_Number'] . '");';
                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                echo '$("span.empname").text("Fetching Purch_ Inv_ Line: ");';
                echo '</script>';
                str_repeat(' ', 1024 * 64);
                flush();
                ob_flush();
                //usleep(100);  
            }

            $file_name = $prefix_file_name . " Inv and Line " . $store_name;

            echo "
                   <script>
                                window.io = 
                                {
                                    open: function(verb, url, data, target){
                                        var form = document.createElement('form');
                                        form.action = url;
                                        form.method = verb;
                                        form.target = target || '_self';
                                        if (data) {
                                            for (var key in data) {
                                                var input = document.createElement('textarea');
                                                input.name = key;
                                                input.value = typeof data[key] === 'object'
                                                    ? JSON.stringify(data[key])
                                                    : data[key];
                                                form.appendChild(input);
                                            }

                                        }
                                        form.style.display = 'none';
                                        document.body.appendChild(form);
                                        form.submit();
                                        document.body.removeChild(form);
                                    }
                                };
                  </script> ";


            foreach ($header_arr as $head) {
                $txt = $head['_Number'] . '<|>' .
                    $head['Vendor_Number'] . '<|>' .
                    date('m/d/y', strtotime(date($head['Posting_Date']))) . '<|>' .
                    date('m/d/y', strtotime(date($head['Document_Date']))) . '<|>' .
                    date('m/d/y', strtotime(date($head['Order_Date']))) . '<|>' .
                    $head['Location_Code'] . '<|>' .
                    $head['Vendor_Invoice_Number'] . '<|>' .
                    $head['Global_Dimmension_1'] . '<|>' .
                    $head['Global_Dimmension_2'] . '<|>' .
                    round($head['Invoice_Discount'], 2) . '^';



                foreach ($line_arr as $line) {
                    if ($head['_Number'] == $line['_Number'] && round($line["Quantity"]) > 0) {

                        $txt .= $line["Line_No"] . '<|>' .
                            $line["Item_Number"] . '<|>' .
                            round($line["Quantity"], 2) . '<|>' .
                            $line["Unit_of_Measure"] . '<|>' .
                            round($line["Direct_Unit_Cost"], 2) . '<|>' .
                            round($line["Line_Amount_Including_Vat"], 2) . '<|>' .
                            round($line["Line_Discount"], 2) . '<|>' .
                            round($line["Inv_Disc_Amount"], 2) . '*';
                    }
                }




                echo ' <script>  
                                  var file_name = "' . $head['_Number'] . '-' . $file_name . '";          
                                  var txt       = "' . $txt . '";
                                  var type      = "' . $type . '";
                                  io.open("POST", "' . base_url() . 'BIR_ctrl/generate_pof_txt", 
                                                                                             { 
                                                                                                "file_name":file_name,   
                                                                                                "txt":txt,   
                                                                                                "type":type 
                                                                                              },"_blank");
                        </script> ';



                flush();
                ob_flush();
            }
        }
    }


    function generate_pof_txt()
    {
        $type = $_POST['type'];

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $_POST['file_name'] . '.' . $type . '"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $txt = str_replace('^', "\n\n", $_POST['txt']);
        $txt = str_replace('*', "\n", $txt);

        echo $txt;
    }

    function gl_dashboard()
    {
        $this->load->view('bir/GL_dashboard');
    }

    function sales_consolidator_ui()
    {
        $this->load->view('bir/sales_consolidator_ui');
    }

    function pof_sof_ui()
    {
        $this->load->view('bir/pof_sof_ui');
    }

    function gl_middleware_ui()
    {
        $this->load->view('bir/gl_middleware_ui');
    }

    function load_main_js()
    {
        $this->load->view('bir/main_js');
    }


    function transfers_ui()
    {
        $this->load->view('bir/transfers_ui');
    }


    function load_item_table()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $fileContent = $_POST['file_content'];
        $filecontent = json_decode($fileContent);
        $nav_type = $_POST['nav_type'];
        $function_start = floor(microtime(true) * 1000);

        echo '
                    <!DOCTYPE html>
                    <html>
                    <head>
                            <meta charset="utf-8">
                            <title>DATA UPLOAD</title>
                            <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">     
                            <link href="' . base_url() . 'assets/css/datatables.min.css" rel="stylesheet" type="text/css"/>
                            <link href="' . base_url() . 'assets/css/googleapis.css" rel="stylesheet" type="text/css"/>
                            <link rel="<?php echo base_url();  ?>assets/css/sweetalert.css">


                    <!--imported -->

                            <!-- <link rel="shortcut icon" type="image/png" href="../assets/img/latest.png"> -->
                            <link href="' . base_url() . 'assets/css/site.min.css" rel="stylesheet"/>
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/font-awesome.css" rel="stylesheet">
                            <script src="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            </script><link href="' . base_url() . 'assets/progress_bar/css/custom.css" ?v2="" rel="stylesheet">
                            <link rel="stylesheet" type="text/css" href="' . base_url() . 'assets/progress_bar/css/bootstrap-dialog.css">
                            <link href="' . base_url() . 'assets/progress_bar/css/bootstrap-datetimepicker.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/dormcss.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css" rel="stylesheet">
                            <link rel="stylesheet" href="' . base_url() . 'assets/progress_bar/js/jquery-ui/jquery-ui.css">
                            <link href="' . base_url() . 'assets/progress_bar/alert/css/alert.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/alert/themes/default/theme.css" rel="stylesheet">
                            <link href="' . base_url() . 'assets/progress_bar/css/extendedcss.css?ts=<?=time()?>&quot;" rel="stylesheet">
                            <!-- <link href="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.css?ts=<?=time()?>&quot;" rel="stylesheet"> -->
                            <script src="' . base_url() . 'assets/progress_bar/js/jquery-1.10.2.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap.min.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/bootstrap-dialog.js?2"></script>

                            <script src="' . base_url() . 'assets/progress_bar/js/jquery.metisMenu.js?2"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTables/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/dataTablesDontDelete/jquery.dataTables.min.js?2" type="text/javascript" charset="utf-8"></script>
                            <script src="' . base_url() . 'assets/progress_bar/js/ebsdeduction_function.js?<?php echo time()?>"></script>
                            <script src="' . base_url() . 'assets/js/sweetalert.js"></script>    
                            <script src="' . base_url() . 'assets/js/sweetalert2.all.min.js"></script>
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
                                        <span class="col-md-6 pdd fnt13 empname">Initializing Database <img src="' . base_url() . 'assets/img/giphy.gif" height="20"></span>
                                        <span class="col-md-5 pdd fnt13 toright remaining_time"></span>
                                        <span class="col-md-12 pdd fnt13 filename">Preparing Data for Upload <img src="' . base_url() . 'assets/img/giphy.gif" height="20"></span>
                                        <span class="col-md-12 pdd fnt13 transcode"></span>
                                         
                                </div>
                            </div>
                    ';
        flush();
        ob_flush();
        usleep(100);

        $database_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $get_connection = $this->BIR_mod->get_connection($database_id, '');
        $department = $get_connection[0]['department'];

        if ($nav_type == 'SQL' && $database_id == 39 || $database_id == 40) // if WDG siya
        {

            $wdg_terminals_db_id = array(41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55);

            /*----------------------------------------------------------------------------------
            | Uploading data for nav_tran_sales_bir_consolidated per WDG Terminal
            -----------------------------------------------------------------------------------*/

            if ($database_id == 39) {
                for ($a = 0; $a < count($wdg_terminals_db_id); $a++) {

                    echo '<script language="JavaScript">';
                    echo '$("span.empname").text("Terminal: ' . ($a + 1) . ' out of ' . count($wdg_terminals_db_id) . '");';
                    echo '</script>';
                    str_repeat(' ', 1024 * 64);
                    flush();
                    ob_flush();

                    $get_connection = $this->BIR_mod->get_connection($wdg_terminals_db_id[$a], '');
                    foreach ($get_connection as $con) {
                        $servername = $con['server_address'];
                        $username = $con['username'];
                        $password = $con['password'];
                        $connection = $con['db_name'];
                        $sub_db_name = $con['sub_db_name'];
                        $store_dept = $con['store'] . '-' . $con['department'];
                    }

                    $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);
                    $table = '[' . $sub_db_name . '$Sales Invoice Line]';
                    $table_2 = '[' . $sub_db_name . '$Item]';
                    $table_3 = '[' . $sub_db_name . '$Barcodes]';
                    $table_4 = '[' . $sub_db_name . '$Sales Invoice Header]';

                    $table_query = "
                                        SELECT 
                                                *
                                        FROM   " . $table_4 . " as head
                                        INNER JOIN " . $table . " AS line on line.[Document No_] = head.[No_]
                                        INNER JOIN " . $table_2 . " AS item    ON item.[No_] = line.[No_]
                                        INNER JOIN " . $table_3 . " AS barcode ON barcode.[Item No_] = item.[No_]  AND barcode.[Unit of Measure Code] = item.[Base Unit of Measure]
                                        WHERE
                                               line.[Shipment Date] >= '" . $dateFrom . "' 
                                         AND 
                                               line.[Shipment Date] <= '" . $dateTo . "'        
    
                                     ";
                    $table_row = odbc_exec($connect, $table_query);
                    $rowproC = 1;
                    $total_files = odbc_num_rows($table_row);

                    if (odbc_num_rows($table_row) > 0) {
                        while ($row = odbc_fetch_array($table_row)) {

                            $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                            echo '<script language="JavaScript">';
                            echo '$("span.empname").text("Terminal: ' . ($a + 1) . ' out of ' . count($wdg_terminals_db_id) . '");';
                            echo '</script>';
                            flush();
                            ob_flush();

                            $transaction_no = $row['Document No_'];
                            $line_no = $row['Line No_'];
                            $receipt_no = $row['Sell-to Customer No_'];
                            $barcode_no = $row['Barcode No_'];
                            $item_code = $row['Item No_'];
                            $sales_staff = '';
                            $item_department = '';
                            $item_group = '';
                            $price = $row['Amount'];
                            $net_price = $row['Amount Including VAT'];
                            $vendor_no = $row['Vendor No_'];
                            $date_ = $row['Shipment Date'];
                            $pos_terminal_no = $row['Wholesale Terminal No_'];
                            $db_id = $wdg_terminals_db_id[$a];

                            $exp_quantity = explode(".", $row['Quantity']);

                            $quantity = ($exp_quantity[0] == '-')
                                ? $exp_quantity[0] . '0.' . $exp_quantity[1]
                                : $row['Quantity'];

                            $insert_data['description'] = $row['Description'];
                            $insert_data['no_stock_posting'] = $row['No Stock Posting'];
                            $insert_data['store'] = $store_dept;
                            $insert_data['quantity'] = $quantity;
                            $insert_data['db_id'] = $wdg_terminals_db_id[$a];
                            $insert_data['date_'] = $row['Shipment Date'];
                            $insert_data['net_amount'] = $row['Amount'];
                            $insert_data['vat_amount'] = $row['Amount Including VAT'];
                            $insert_data['transaction_no'] = $transaction_no;
                            $insert_data['line_no'] = $line_no;
                            $insert_data['receipt_no'] = $receipt_no;
                            $insert_data['barcode_no'] = $barcode_no;
                            $insert_data['item_code'] = $item_code;
                            $insert_data['price'] = $price;
                            $insert_data['net_price'] = $net_price;
                            $insert_data['pos_terminal_no'] = $row['Wholesale Terminal No_'];
                            $insert_data['vendor_no'] = $vendor_no;
                            $insert_data['store_no'] = $row['Wholesale Code'];

                            $search_sales = $this->BIR_mod->find_sales_entry($item_code, $vendor_no, $date_, $receipt_no, $transaction_no, $pos_terminal_no, $db_id, $line_no);
                            $table = 'nav_tran_sales_bir_consolidated';

                            if (empty($search_sales)) {
                                $this->BIR_mod->insert_table_nav($table, $insert_data);
                            } else {
                                $column_filter['item_code'] = $item_code;
                                $column_filter['vendor_no'] = $vendor_no;
                                $column_filter['date_'] = $date_;
                                $column_filter['receipt_no'] = $receipt_no;
                                $column_filter['transaction_no'] = $transaction_no;
                                $column_filter['pos_terminal_no'] = $pos_terminal_no;
                                $column_filter['db_id'] = $db_id;
                                $column_filter['line_no'] = $line_no;

                                $this->BIR_mod->update_table_nav($table, $insert_data, $column_filter);
                            }

                            echo '<script language="JavaScript">';
                            echo '$("span.filename").text("ITEM CODE - ' . $item_code . '");';
                            echo '$("div#percontent").css({"width":"' . $percent . '"});';
                            echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                            echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                            echo '$("span.empname").text("Terminal: ' . ($a + 1) . ' out of ' . count($wdg_terminals_db_id) . '");';
                            echo '</script>';
                            flush();
                            ob_flush();
                        }
                    }
                }
            }

            /*----------------------------------------------------------------------------------
            | Uploading data for nav_accumulated_sales_ledger from ASC & UBAY CONSOLIDATOR 
            -----------------------------------------------------------------------------------*/

            $id = ($database_id == 39) ? 101 : 40;
            $get_connection = $this->BIR_mod->get_connection($id, '');

            foreach ($get_connection as $con) {
                $servername = $con['server_address'];
                $username = $con['username'];
                $password = $con['password'];
                $connection = $con['db_name'];
                $sub_db_name = $con['sub_db_name'];
            }

            $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect);
            $Transaction_tbl = '[' . $sub_db_name . '$Accumulated Sales Ledger]';
            $table_query = "SELECT * FROM $Transaction_tbl WHERE [Date] BETWEEN '$dateFrom' AND '$dateTo'";
            $table_ledger_query = odbc_exec($connect, $table_query);
            $total_files = odbc_num_rows($table_ledger_query);

            $counter = 0;
            $rowproC = 1;

            if ($total_files > 0) {

                while ($ldg_row = odbc_fetch_array($table_ledger_query)) {

                    $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                    $pos_terminal = $ldg_row['POS Terminal No_'];
                    $acc_date = $ldg_row['Date'];
                    $store = $ldg_row['Store No_'];
                    $total_net_sales = $ldg_row['Total Net Sales'];
                    $vat_amount = $ldg_row['Vat Amount'];
                    $no_item_sold = $ldg_row['No_ of Item Sold'];
                    $cash_sales = $ldg_row['Cash Sales'];
                    $card_sales = $ldg_row['Card Sales'];
                    $float_entry = $ldg_row['Float Entry'];
                    $remove_entry = $ldg_row['Remove Entry'];

                    $insert_accum_data['pos_terminal'] = $pos_terminal;
                    $insert_accum_data['acc_date'] = $acc_date;
                    $insert_accum_data['store_code'] = $store;
                    $insert_accum_data['total_net_sales'] = $total_net_sales;
                    $insert_accum_data['vat_amount'] = $vat_amount;
                    $insert_accum_data['no_item_sold'] = $no_item_sold;
                    $insert_accum_data['cash_sales'] = $cash_sales;
                    $insert_accum_data['card_sales'] = $card_sales;

                    $exp_float = explode('.', $float_entry);

                    if ($exp_float[0] == '') {
                        $float_entry = '0' . $float_entry;
                    }

                    $exp_remove_entry = explode('.', $remove_entry);

                    if ($exp_remove_entry[0] == '') {
                        $remove_entry = '0' . $remove_entry;
                    }

                    $insert_accum_data['float_entry'] = $float_entry;
                    $insert_accum_data['remove_entry'] = $remove_entry;

                    $vat_exempt_sales = $ldg_row['Vat Exempt Sales'];
                    $vatable_sales = $ldg_row['Vatable Sales'];
                    $old_accumulated_sales = $ldg_row['Old Accumulated Sales'];
                    $new_accumulated_sales = $ldg_row['New Accumulated Sales'];

                    $insert_accum_data['vatable_sales'] = $vatable_sales;
                    $insert_accum_data['vat_exempt_sales'] = $vat_exempt_sales;
                    $insert_accum_data['old_accumulated_sales'] = $old_accumulated_sales;
                    $insert_accum_data['new_accumulated_sales'] = $new_accumulated_sales;

                    $table = 'nav_accumulated_sales_ledger';
                    $search_acc = $this->BIR_mod->find_nav_accumulated_sales_ledger($pos_terminal, $acc_date, $store, $total_net_sales);

                    if (empty($search_acc)) {
                        $this->BIR_mod->insert_table_nav($table, $insert_accum_data);
                    } else {
                        $column_filter = array();
                        $column_filter['pos_terminal'] = $pos_terminal;
                        $column_filter['acc_date'] = $acc_date;
                        $column_filter['store_code'] = $store;
                        $column_filter['total_net_sales'] = $total_net_sales;

                        $this->BIR_mod->update_table_nav($table, $insert_accum_data, $column_filter);
                    }

                    echo '<script language="JavaScript">';
                    echo '$("span.empname").text("Terminal: ' . $pos_terminal . '");';
                    echo '$("div#percontent").css({"width":"' . $percent . '"});';
                    echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                    echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                    echo '</script>';
                    flush();
                    ob_flush();
                }
            }
        } else
            if ($nav_type == 'SQL') {
                foreach ($get_connection as $con) {
                    $servername = $con['server_address'];
                    $username = $con['username'];
                    $password = $con['password'];
                    $connection = $con['db_name'];
                    $sub_db_name = $con['sub_db_name'];
                    $store_dept = $con['store'] . '-' . $con['department'];
                }

                /*---Initializing Connections---*/

                $connect = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password)
                    or die("Connection failed: " . $connect);
                $Entry = "[{$sub_db_name}\$Trans_ Sales Entry]";
                $Item = "[{$sub_db_name}\$Item]";


                /*---Getting last uploaded entry on consolidated table for Upload Continuation---*/

                $last_upload = $this->BIR_mod->get_last_upload('nav_tran_sales_bir_consolidated', $database_id, $dateFrom);
                $db_transaction_no = $last_upload['transaction_no'];


                /*----------------------------------------------------------------------------------
                | Query for data needed to be Uploaded for nav_tran_sales_bir_consolidated
                -----------------------------------------------------------------------------------*/

                $table_query = "SELECT * 
                            FROM $Entry AS entry_
                            INNER JOIN $Item AS item ON item.[No_] = entry_.[Item No_]
                            WHERE [Date] BETWEEN '$dateFrom' AND '$dateTo'
                            AND [Transaction No_] >= '$db_transaction_no'";

                $table_row = odbc_exec($connect, $table_query);
                $total_fetched = odbc_num_rows($table_row);
                $counter = 0;

                $rowproC = 1;
                $total_files = $total_fetched;


                if ($total_fetched > 0) {

                    /*---Looping for Each Rows on the Result---*/
                    $fetch_start = floor(microtime(true) * 1000);

                    while ($row_trans_sales = odbc_fetch_array($table_row)) {

                        /*--- Calculating percentage Status for the upload UI ----*/

                        $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                        /*--------- Assigning Variables -------- */

                        $vendor_no = $row_trans_sales['Vendor No_'];
                        $transaction_no = $row_trans_sales['Transaction No_'];
                        $line_no = $row_trans_sales['Line No_'];
                        $receipt_no = $row_trans_sales['Receipt No_'];
                        $barcode_no = $row_trans_sales['Barcode No_'];
                        $item_code = $row_trans_sales['Item No_'];
                        $sales_staff = $row_trans_sales['Sales Staff'];
                        $item_department = odbc_result($table_row, 8);
                        $item_group = odbc_result($table_row, 9);
                        $price = $row_trans_sales['Price'];
                        $net_price = $row_trans_sales['Net Price'];
                        $exp_quantity = explode(".", odbc_result($table_row, 12));
                        $vat_code = $row_trans_sales['VAT Code'];
                        $disc_amount = $row_trans_sales['Discount Amount'];
                        $cost_amount = $row_trans_sales['Cost Amount'];
                        $date_ = $row_trans_sales['Date'];
                        $time_ = $row_trans_sales['Time'];
                        $shift_no = $row_trans_sales['Shift No_'];
                        $shift_date = $row_trans_sales['Shift Date'];
                        $net_amount = $row_trans_sales['Net Amount'];
                        $vat_amount = $row_trans_sales['VAT Amount'];
                        $promotion_no = $row_trans_sales['Promotion No_'];
                        $standard_net_price = $row_trans_sales['Standard Net Price'];
                        $disc_amt_from_std_price = $row_trans_sales['Disc_ Amount From Std_ Price'];
                        $customer_no = $row_trans_sales['Customer No_'];
                        $section = $row_trans_sales['Section'];
                        $shelf = $row_trans_sales['Shelf'];
                        $statement_code = $row_trans_sales['Statement Code'];
                        $item_disc_group = $row_trans_sales['Item Disc_ Group'];
                        $transaction_code = $row_trans_sales['Transaction Code'];
                        $store_no = $row_trans_sales['Store No_'];
                        $item_number_scanned = $row_trans_sales['Item Number Scanned'];
                        $keyboard_item_entry = $row_trans_sales['Keyboard Item Entry'];
                        $price_in_barcode = $row_trans_sales['Price in Barcode'];
                        $price_change = $row_trans_sales['Price Change'];
                        $weight_manually_entered = $row_trans_sales['Weight Manually Entered'];
                        $line_was_discounted = $row_trans_sales['Line was Discounted'];
                        $scale_item = $row_trans_sales['Scale Item'];
                        $weight_item = $row_trans_sales['Weight Item'];
                        $return_no_sale = $row_trans_sales['Return No Sale'];
                        $item_corrected_line = $row_trans_sales['Item Corrected Line'];
                        $type_of_sale = $row_trans_sales['Type of Sale'];
                        $linked_no_not_orig = $row_trans_sales['Linked No_ not Orig_'];
                        $orig_of_linked_item_list = $row_trans_sales['Orig_ of a Linked Item List'];
                        $pos_terminal_no = $row_trans_sales['POS Terminal No_'];
                        $staff_id = $row_trans_sales['Staff ID'];
                        $item_posting_group = $row_trans_sales['Item Posting Group'];
                        $total_rounded_amt = $row_trans_sales['Total Rounded Amt_'];
                        $counter = $row_trans_sales['Counter'];
                        $variant_code = $row_trans_sales['Variant Code'];
                        $line_discount = $row_trans_sales['Line Discount'];
                        $replicated = $row_trans_sales['Replicated'];
                        $customer_discount = $row_trans_sales['Customer Discount'];
                        $infocode_discount = $row_trans_sales['Infocode Discount'];
                        $cust_invoice_discount = $row_trans_sales['Cust_ Invoice Discount'];
                        $unit_of_measure = $row_trans_sales['Unit of Measure'];
                        $uom_quantity = $row_trans_sales['UOM Quantity'];
                        $uom_price = $row_trans_sales['UOM Price'];
                        $total_discount = $row_trans_sales['Total Discount'];
                        $tot_disc_info_line_no = $row_trans_sales['Tot_ Disc Info Line No_'];
                        $periodic_disc_type = $row_trans_sales['Periodic Disc_ Type'];
                        $periodic_disc_group = $row_trans_sales['Periodic Disc_ Group'];
                        $periodic_discount = $row_trans_sales['Periodic Discount'];
                        $discount_amt_for_printing = $row_trans_sales['Discount Amt_ For Printing'];
                        $description = $row_trans_sales['Description'];
                        $addon_code = odbc_result($table_row, 69);
                        $addon_percentage = odbc_result($table_row, 70);
                        $used_amount = odbc_result($table_row, 71);
                        $no_stock_posting = $row_trans_sales['No Stock Posting'];

                        /*--------- Assigning Variables -------- */

                        /*--- Updating quantity results on SQL ----*/

                        if ($exp_quantity[0] == '-') {
                            $quantity = $exp_quantity[0] . '0.' . $exp_quantity[1];
                        } elseif (in_array($database_id, array(5))) {
                            $quantity = odbc_result($table_row, 12);
                        } else {
                            $quantity = $row_trans_sales['Quantity'];
                        }

                        /*---Updating the variables stated this is needed because some of the database doesn't have the same column---*/

                        if (in_array($database_id, array(5))) {
                            $transaction_status = odbc_result($table_row, 14);
                            $statement_no = odbc_result($table_row, 26);
                            $total_disc_percentage = odbc_result($table_row, 62);
                        } else {
                            $transaction_status = $row_trans_sales['xTransaction Status'];
                            $statement_no = $row_trans_sales['xStatement No_'];
                            $total_disc_percentage = $row_trans_sales['Total Disc__'];
                        }

                        /*---Same scenarion on the recent if statement 38,23 are for ALTA CITA databases---*/

                        if (!in_array($database_id, array(38, 23))) {
                            $item_internal_type = odbc_result($table_row, 72);
                            $crm_loyalty_card = odbc_result($table_row, 73);
                            $crm_loyalty_card_type = odbc_result($table_row, 74);
                            $crm_earned_points = odbc_result($table_row, 75);
                            $item_points = odbc_result($table_row, 76);
                            $item_division = $row_trans_sales['Item Division'];
                        } else {
                            $item_division = $row_trans_sales['Division Code'];
                        }

                        $db_id = $database_id;

                        $insert_data = array(
                            'store' => $store_dept,
                            'db_id' => $db_id,
                            'transaction_no' => $transaction_no,
                            'line_no' => $line_no,
                            'receipt_no' => $receipt_no,
                            'barcode_no' => $barcode_no,
                            'item_code' => $item_code,
                            'sales_staff' => $sales_staff,
                            'item_department' => $item_department,
                            'item_group' => $item_group,
                            'price' => $price,
                            'net_price' => $net_price,
                            'quantity' => $quantity, //str_replace('-','',$quantity);
                            'vat_code' => $vat_code,
                            'transaction_status' => $transaction_status,
                            'disc_amount' => $disc_amount,
                            'cost_amount' => $cost_amount, //str_replace('-','',$cost_amount);
                            'date_' => $date_,
                            'time_' => $time_,
                            'shift_no' => $shift_no,
                            'shift_date' => $shift_date,
                            'net_amount' => $net_amount, //str_replace('-','',$net_amount);
                            'vat_amount' => $vat_amount,
                            'promotion_no' => $promotion_no,
                            'standard_net_price' => $standard_net_price,
                            'disc_amt_from_std_price' => $disc_amt_from_std_price,
                            'statement_no' => $statement_no,
                            'customer_no' => $customer_no,
                            'section' => $section,
                            'shelf' => $shelf,
                            'statement_code' => $statement_code,
                            'item_disc_group' => $item_disc_group,
                            'transaction_code' => $transaction_code,
                            'store_no' => $store_no,
                            'item_number_scanned' => $item_number_scanned,
                            'keyboard_item_entry' => $keyboard_item_entry,
                            'price_in_barcode' => $price_in_barcode,
                            'price_change' => $price_change,
                            'weight_manually_entered' => $weight_manually_entered,
                            'line_was_discounted' => $line_was_discounted,
                            'scale_item' => $scale_item,
                            'weight_item' => $weight_item,
                            'return_no_sale' => $return_no_sale,
                            'item_corrected_line' => $item_corrected_line,
                            'type_of_sale' => $type_of_sale,
                            'linked_no_not_orig' => $linked_no_not_orig,
                            'orig_of_linked_item_list' => $orig_of_linked_item_list,
                            'pos_terminal_no' => $pos_terminal_no,
                            'staff_id' => $staff_id,
                            'item_posting_group' => $item_posting_group,
                            'total_rounded_amt' => $total_rounded_amt, //str_replace('-','',$total_rounded_amt);
                            'counter' => $counter,
                            'variant_code' => $variant_code,
                            'line_discount' => $line_discount,
                            'replicated' => $replicated,
                            'customer_discount' => $customer_discount,
                            'infocode_discount' => $infocode_discount,
                            'cust_invoice_discount' => $cust_invoice_discount,
                            'unit_of_measure' => $unit_of_measure,
                            'uom_quantity' => $uom_quantity,
                            'uom_price' => $uom_price,
                            'total_discount' => $total_discount,
                            'total_disc_percentage' => $total_disc_percentage,
                            'tot_disc_info_line_no' => $tot_disc_info_line_no,
                            'periodic_disc_type' => $periodic_disc_type,
                            'periodic_disc_group' => $periodic_disc_group,
                            'periodic_discount' => $periodic_discount,
                            'discount_amt_for_printing' => $discount_amt_for_printing,
                            'item_division' => $item_division,
                            'addon_code' => $addon_code,
                            'addon_percentage' => $addon_percentage,
                            'used_amount' => $used_amount,
                            'vendor_no' => $vendor_no,
                            'description' => $description,
                            'no_stock_posting' => $no_stock_posting
                        );

                        /*--- Additional data for ALTA CITA ---*/

                        if (!in_array($database_id, array(38, 23))) {
                            $insert_data['item_internal_type'] = $item_internal_type;
                            $insert_data['crm_loyalty_card'] = $crm_loyalty_card;
                            $insert_data['crm_loyalty_card_type'] = $crm_loyalty_card_type;
                            $insert_data['crm_earned_points'] = $crm_earned_points;
                            $insert_data['item_points'] = $item_points;
                        }

                        $counter++;

                        /*--- $search_sales checks if the data is duplicated ---*/

                        $search_sales = $this->BIR_mod->find_sales_entry($item_code, $vendor_no, $date_, $receipt_no, $transaction_no, $pos_terminal_no, $db_id, $line_no, $line_no);
                        $table = 'nav_tran_sales_bir_consolidated';

                        /*--- Inserts data per batch ---*/

                        $batchSize = 1000;

                        if (empty($search_sales)) {
                            $batchData[] = $insert_data;
                            if (count($batchData) === $batchSize) {
                                $this->BIR_mod->insert_batch($table, $batchData);
                                $batchData = array();
                            }
                        } else {
                            $column_filter = array();
                            $column_filter['item_code'] = $item_code;
                            $column_filter['vendor_no'] = $vendor_no;
                            $column_filter['date_'] = $date_;
                            $column_filter['receipt_no'] = $receipt_no;
                            $column_filter['transaction_no'] = $transaction_no;
                            $column_filter['pos_terminal_no'] = $pos_terminal_no;
                            $column_filter['db_id'] = $db_id;
                            $column_filter['line_no'] = $line_no;

                            $this->BIR_mod->update_table_nav($table, $insert_data, $column_filter);
                        }

                        /*--- Calculates time remaining ---*/

                        $batched_array = floor(microtime(true) * 1000);
                        $time_per_process = abs($fetch_start - $batched_array) / 60000;
                        $insert_rate = ($time_per_process > 0) ? $rowproC / $time_per_process : 1;
                        $remaining_time = round((($total_files - $rowproC) / $insert_rate), 1);

                        /*--- Updates Uploading UI percentage ---*/

                        echo '<script language="JavaScript">
                    $("span.filename").text("Item Code - ' . $item_code . '");
                    $("span.remaining_time").text("Appx ≈ Time Remaining ' . $remaining_time . ' min");
                    $("span.transcode").text("Transaction Number - ' . $transaction_no . '");
                    $("div#percontent").css({"width":"' . $percent . '"});
                    $("span.status").text("Status: ' . $percent . ' Complete");
                    $("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");
                    $("span.empname").text("Uploading Trans Sales Entry: ");
                    </script>';
                        str_repeat(' ', 1024 * 64);
                        flush();
                        ob_flush();
                        usleep(100);
                    }

                    if (!empty($batchData)) {
                        $this->db->insert_batch($table, $batchData);
                    }

                    odbc_free_result($table_row);
                }

                /*----------------------------------------------------------------------------------
                | Query for data needed to be Uploaded for nav_accumulated_sales_ledger
                -----------------------------------------------------------------------------------*/

                $table_query = "SELECT DISTINCT [POS Terminal No_]
                            FROM $Entry AS entry_
                            INNER JOIN $Item AS item ON item.[No_] = entry_.[Item No_]
                            WHERE [Date] BETWEEN '$dateFrom' AND '$dateTo'";

                $pos_query = odbc_exec($connect, $table_query);
                $total_pos = odbc_num_rows($pos_query);

                $rowproC = $total_fetched + 2;
                $total_files = $total_pos + $total_fetched;

                if ($total_pos > 0) {
                    while ($row_pos_terminal = odbc_fetch_array($pos_query)) {

                        $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";

                        /*---Initializing POS server and consolidator for Accumulated Sales Ledger---*/

                        $pos_db_id_arr = array(5, 25, 38, 23);
                        $pos_conso_arr = array(22, 24, 98, 99);

                        for ($a = 0; $a < count($pos_db_id_arr); $a++) {
                            if ($database_id == $pos_db_id_arr[$a]) //if  server sql siya
                            {
                                $get_connection = $this->BIR_mod->get_connection($pos_conso_arr[$a], '');
                                foreach ($get_connection as $con) {
                                    $servername = $con['server_address'];
                                    $username = $con['username'];
                                    $password = $con['password'];
                                    $connection = $con['db_name'];
                                    $sub_db_name = $con['sub_db_name'];
                                }

                                $connect2 = odbc_connect("Driver={SQL Server};Server=$servername;Database=$connection;", $username, $password) or die("Connection failed: " . $connect2);

                                /*--- Same scenarion on the statement above 38,23 are for ALTA CITA databases ----*/

                                if (in_array($pos_db_id_arr[$a], array(38, 23))) {
                                    $Transaction_tbl = '[' . $sub_db_name . '$End Of Day Ledger Entry]';
                                } else {
                                    $Transaction_tbl = '[' . $sub_db_name . '$Accumulated Sales Ledger]';
                                }

                                /*--- SQL Query for getting Accumulated Sales Ledger ---*/

                                $table_query = "SELECT *
                                            FROM $Transaction_tbl
                                            WHERE [Date] BETWEEN '$dateFrom' AND '$dateTo'
                                            AND [POS Terminal No_] = '{$row_pos_terminal['POS Terminal No_']}'";

                                $table_ledger_query = odbc_exec($connect2, $table_query);

                                if (odbc_num_rows($table_ledger_query) > 0) {

                                    /*--- Fetching each Rows ---*/

                                    while ($row = odbc_fetch_array($table_ledger_query)) {


                                        if (in_array($pos_db_id_arr[$a], array(38, 23))) {
                                            $vat_exempt_table = "VAT Exempt Sales";
                                        } else {
                                            $vat_exempt_table = "Vat Exempt Sales";
                                        }

                                        if (!isset($row[$vat_exempt_table])) {
                                            $row[$vat_exempt_table] = 0;
                                        }

                                        $vat_exempt_sales = $row[$vat_exempt_table];
                                        $vatable_sales = $row['Vatable Sales'];
                                        $old_accumulated_sales = $row['Old Accumulated Sales'];
                                        $new_accumulated_sales = $row['New Accumulated Sales'];

                                        $pos_terminal = odbc_result($table_ledger_query, 5);
                                        $acc_date = odbc_result($table_ledger_query, 6);
                                        $store = odbc_result($table_ledger_query, 4);
                                        $total_net_sales = odbc_result($table_ledger_query, 14);
                                        $vat_amount = odbc_result($table_ledger_query, 18);
                                        $no_item_sold = odbc_result($table_ledger_query, 24);
                                        $cash_sales = odbc_result($table_ledger_query, 42);
                                        $card_sales = odbc_result($table_ledger_query, 43);

                                        /*--- Updating data based on the server 5 = ICM, 25 = ICM HF, & 38,23 = ALTA ---*/

                                        if ($pos_db_id_arr[$a] == 5) {
                                            $float_entry = odbc_result($table_ledger_query, 141);
                                            $remove_entry = odbc_result($table_ledger_query, 142);
                                        } else if ($pos_db_id_arr[$a] == 25) {
                                            $float_entry = odbc_result($table_ledger_query, 138);
                                            $remove_entry = odbc_result($table_ledger_query, 139);
                                        } else if (in_array($pos_db_id_arr[$a], array(38, 23))) {
                                            $pos_terminal = $row['POS Terminal No_'];
                                            $acc_date = $row['Date'];
                                            $store = $row['Store No_'];
                                            $total_net_sales = $row['Total Net Sales'];
                                            $vat_amount = $row['Total VAT Amount'];
                                            $no_item_sold = $row['No_ of Item Sold'];
                                            $cash_sales = $row['Cash Tender Amount'];
                                            $card_sales = $row['Bankard Tender Amount'];
                                            $float_entry = $row['Float Entry'];
                                            $remove_entry = $row['Remove Tender'];
                                        }

                                        /*--- Intializing array data for insertion ---*/

                                        $insert_accum_data['pos_terminal'] = $pos_terminal;
                                        $insert_accum_data['acc_date'] = $acc_date;
                                        $insert_accum_data['store_code'] = $store;
                                        $insert_accum_data['total_net_sales'] = $total_net_sales;
                                        $insert_accum_data['vat_amount'] = $vat_amount;
                                        $insert_accum_data['no_item_sold'] = $no_item_sold;
                                        $insert_accum_data['cash_sales'] = $cash_sales;
                                        $insert_accum_data['card_sales'] = $card_sales;
                                        $insert_accum_data['float_entry'] = $float_entry;
                                        $insert_accum_data['remove_entry'] = $remove_entry;
                                        $insert_accum_data['vatable_sales'] = $vatable_sales;
                                        $insert_accum_data['vat_exempt_sales'] = $vat_exempt_sales;
                                        $insert_accum_data['old_accumulated_sales'] = $old_accumulated_sales;
                                        $insert_accum_data['new_accumulated_sales'] = $new_accumulated_sales;

                                        /*--- $search_acc checks if the data is duplicated ---*/

                                        $table = 'nav_accumulated_sales_ledger';
                                        $search_acc = $this->BIR_mod->find_nav_accumulated_sales_ledger($pos_terminal, $acc_date, $store, $total_net_sales);

                                        /*--- If no duplicates Insert Data else Update Data ---*/

                                        if (empty($search_acc)) {
                                            $this->BIR_mod->insert_table_nav($table, $insert_accum_data);
                                        } else {
                                            $column_filter = array();
                                            $column_filter['pos_terminal'] = $pos_terminal;
                                            $column_filter['acc_date'] = $acc_date;
                                            $column_filter['store_code'] = $store;
                                            $column_filter['total_net_sales'] = $total_net_sales;

                                            $this->BIR_mod->update_table_nav($table, $insert_accum_data, $column_filter);
                                        }



                                        echo '<script language="JavaScript">
                                    $("span.filename").text("POS Terminal - ' . $row_pos_terminal['POS Terminal No_'] . '");
                                    $("span.transcode").text("");
                                    $("span.remaining_time").text("");
                                    $("div#percontent").css({"width":"' . $percent . '"});
                                    $("span.status").text("Status: ' . $percent . ' Complete");
                                    $("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");
                                    $("span.empname").text("Uploading Accumulated Sales Ledger: ");
                                    </script>';
                                        str_repeat(' ', 1024 * 64);
                                        flush();
                                        ob_flush();
                                        usleep(100);
                                    }
                                    /*--- Ends While Loop for fetching data per Row ---*/
                                }

                                odbc_close($connect2);
                            }
                        }
                    }
                }
            } else {

                $counter = 0;
                $rowproC = 1;
                $total_files = count($filecontent);

                $store_dept = $get_connection[0]['store'] . '-' . $get_connection[0]['department'];
                $department = $get_connection[0]['department'];

                $date_arr = array();

                for ($a = 0; $a < count($filecontent); $a++) {

                    $percent = ($total_files > 0) ? intval($rowproC / $total_files * 100) . "%" : "100%";


                    if (strstr($filecontent[$a], '","')) {
                        $separator = '","';
                    } else {
                        $separator = '"|"';
                    }


                    $row_data = explode($separator, $filecontent[$a]);

                    if (count($row_data) == 8) //if item 
                    {


                        $item_code = str_replace('"', '', $row_data[0]);
                        $description = $row_data[1];
                        $extended_description = $row_data[2];
                        $vendor_no = $row_data[3];
                        $item_division = $row_data[4];
                        $item_department_code = $row_data[5];
                        $item_group_code = $row_data[6];
                        $no_stock_posting = str_replace('"', '', $row_data[7]);
                        $column_data['item_code'] = $item_code;
                        $column_data['department'] = $department;
                        $clean_description = $this->removeSpecialCharacters($description);
                        $column_data['description'] = $clean_description;
                        $clean_extended_description = $this->removeSpecialCharacters($extended_description);
                        $column_data['extended_description'] = $clean_extended_description;
                        $column_data['vendor_no'] = $vendor_no;
                        $column_data['item_division'] = $item_division;
                        $column_data['item_department_code'] = $item_department_code;
                        $column_data['item_group_code'] = $item_group_code;
                        $column_data['no_stock_posting'] = $no_stock_posting;
                        $column_filter['item_code'] = $item_code;
                        $column_filter['department'] = $department;
                        //$column_filter['vendor_no']          = $vendor_no;     

                        $check_masterfile = $this->BIR_mod->check_nav_item_masterfile($column_filter);

                        $table = 'nav_item_masterfile';
                        if (empty($check_masterfile)) {
                            $this->BIR_mod->insert_table_nav($table, $column_data);
                        } else {
                            $this->BIR_mod->update_table_nav($table, $column_data, $column_filter);
                        }

                        $date_ = $_POST['dateFrom'];


                        array_push($date_arr, $date_, $date_);




                        echo '<script language="JavaScript">';
                        echo '$("span.filename").text("Item Code -' . $item_code . ' ");';
                        echo '$("div#percontent").css({"width":"' . $percent . '"});';
                        echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                        echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                        echo '$("span.empname").text("Entry: ");';
                        echo '</script>';
                        str_repeat(' ', 1024 * 64);
                        flush();
                        ob_flush();
                        usleep(100);
                    } else
                        if (in_array(count($row_data), array(47, 48, 51))) //if nav_accumulated_sales_ledger siya nga csv 
                        {
                            $pos_terminal = $row_data[3];
                            $acc_date = date('Y-m-d', strtotime($row_data[1]));
                            $store_code = str_replace(',', '', $row_data[2]);
                            $total_net_sales = str_replace(',', '', $row_data[11]);
                            $vat_amount = str_replace(',', '', $row_data[15]);
                            $no_item_sold = str_replace(',', '', $row_data[21]);
                            $cash_sales = str_replace(',', '', $row_data[40]);
                            $card_sales = str_replace(',', '', $row_data[41]);



                            if (count($row_data) == 47) {

                                $float_entry = str_replace(',', '', $row_data[45]);
                                $remove_entry = str_replace(array(",", '"'), '', $row_data[46]);
                            } else
                                if (count($row_data) == 48) {
                                    $float_entry = str_replace(',', '', $row_data[46]);
                                    $remove_entry = str_replace(array(",", '"'), '', $row_data[47]);
                                } else
                                    if (count($row_data) == 51) {
                                        $float_entry = str_replace(',', '', $row_data[49]);
                                        $remove_entry = str_replace(array(",", '"'), '', $row_data[50]);
                                    }



                            $vatable_sales = str_replace(',', '', $row_data[16]);
                            $old_accumulated_sales = str_replace(',', '', $row_data[31]);
                            $new_accumulated_sales = str_replace(',', '', $row_data[32]);
                            $vat_exempt = str_replace(',', '', $row_data[35]);




                            $insert_accum_data['pos_terminal'] = $pos_terminal;
                            $insert_accum_data['acc_date'] = $acc_date;
                            $insert_accum_data['store_code'] = $store_code;
                            $insert_accum_data['total_net_sales'] = $total_net_sales;
                            $insert_accum_data['vat_amount'] = $vat_amount;
                            $insert_accum_data['no_item_sold'] = $no_item_sold;
                            $insert_accum_data['cash_sales'] = $cash_sales;
                            $insert_accum_data['card_sales'] = $card_sales;
                            $insert_accum_data['float_entry'] = $float_entry;
                            $insert_accum_data['remove_entry'] = $remove_entry;

                            //newly added
                            $insert_accum_data['vatable_sales'] = $vatable_sales;
                            $insert_accum_data['old_accumulated_sales'] = $old_accumulated_sales;
                            $insert_accum_data['new_accumulated_sales'] = $new_accumulated_sales;
                            $insert_accum_data['vat_exempt_sales'] = $vat_exempt;



                            $table = 'nav_accumulated_sales_ledger';

                            $search_acc = $this->BIR_mod->find_nav_accumulated_sales_ledger($pos_terminal, $acc_date, $store_code, $total_net_sales);


                            if (empty($search_acc)) {
                                $this->BIR_mod->insert_table_nav($table, $insert_accum_data);
                            } else {
                                $column_filter['pos_terminal'] = $pos_terminal;
                                $column_filter['acc_date'] = $acc_date;
                                $column_filter['store_code'] = $store_code;
                                $column_filter['total_net_sales'] = $total_net_sales;

                                $this->BIR_mod->update_table_nav($table, $insert_accum_data, $column_filter);
                            }


                            if (!in_array($acc_date, $date_arr)) {
                                array_push($date_arr, $acc_date);
                            }


                            echo '<script language="JavaScript">';
                            echo '$("span.filename").text("Terminal - ' . $pos_terminal . '");';
                            echo '$("div#percontent").css({"width":"' . $percent . '"});';
                            echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                            echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                            echo '$("span.empname").text("Entry: ");';
                            echo '</script>';
                            str_repeat(' ', 1024 * 64);
                            flush();
                            ob_flush();
                            usleep(100);
                        } else
                            if (in_array(count($row_data), array(70, 75, 74))) //if nav_tran_sales_bir_consolidated siya nga csv 
                            {
                                $transaction_no = str_replace('"', '', $row_data[0]);
                                @$line_no = $row_data[1];
                                @$receipt_no = $row_data[2];
                                @$barcode_no = $row_data[3];
                                @$item_code = $row_data[4];
                                @$sales_staff = $row_data[5];
                                @$item_department = $row_data[6];
                                @$item_group = $row_data[7];
                                @$price = str_replace(',', '', $row_data[8]);
                                @$net_price = str_replace(',', '', $row_data[9]);
                                @$quantity = str_replace(',', '', $row_data[10]);
                                @$vat_code = $row_data[11];
                                @$transaction_status = $row_data[12];
                                @$disc_amount = $row_data[13];
                                @$cost_amount = str_replace(',', '', $row_data[14]);
                                @$date_ = date('Y-m-d', strtotime($row_data[15]));
                                @$time_ = date('H:i:s', strtotime($row_data[16]));
                                @$shift_no = $row_data[17];
                                @$shift_date = $row_data[18];
                                @$net_amount = str_replace(',', '', $row_data[19]);
                                @$vat_amount = str_replace(',', '', $row_data[20]);
                                @$promotion_no = $row_data[21];
                                @$standard_net_price = $row_data[22];
                                @$disc_amt_from_std_price = $row_data[23];
                                @$statement_no = $row_data[24];
                                @$customer_no = $row_data[25];
                                @$section = $row_data[26];
                                @$shelf = $row_data[27];
                                @$statement_code = $row_data[28];
                                @$item_disc_group = $row_data[29];
                                @$transaction_code = $row_data[30];
                                @$store_no = $row_data[31];
                                @$item_number_scanned = $row_data[32];
                                @$keyboard_item_entry = $row_data[33];
                                @$price_in_barcode = $row_data[34];
                                @$price_change = $row_data[35];
                                @$weight_manually_entered = $row_data[36];
                                @$line_was_discounted = $row_data[37];
                                @$scale_item = $row_data[38];
                                @$weight_item = $row_data[39];
                                @$return_no_sale = $row_data[40];
                                @$item_corrected_line = $row_data[41];
                                @$type_of_sale = $row_data[42];
                                @$linked_no_not_orig = $row_data[43];
                                @$orig_of_linked_item_list = $row_data[44];
                                @$pos_terminal_no = $row_data[45];
                                @$staff_id = $row_data[46];
                                @$item_posting_group = $row_data[47];
                                @$total_rounded_amt = str_replace(',', '', $row_data[48]);
                                @$counter = $row_data[49];
                                @$variant_code = $row_data[50];
                                @$line_discount = $row_data[51];
                                @$replicated = $row_data[52];
                                @$customer_discount = $row_data[53];
                                @$infocode_discount = $row_data[54];
                                @$cust_invoice_discount = $row_data[55];
                                @$unit_of_measure = $row_data[56];
                                @$uom_quantity = $row_data[57];
                                @$uom_price = $row_data[58];
                                @$total_discount = $row_data[59];
                                @$total_disc_percentage = $row_data[60];
                                @$tot_disc_info_line_no = $row_data[61];
                                @$periodic_disc_type = $row_data[62];
                                @$periodic_disc_group = $row_data[63];
                                @$periodic_discount = str_replace(',', '', $row_data[74]);
                                @$discount_amt_for_printing = $row_data[65];
                                @$item_division = $row_data[66];
                                @$addon_code = $row_data[67];
                                @$addon_percentage = $row_data[68];
                                @$used_amount = $row_data[69];
                                @$item_internal_type = $row_data[70];
                                @$crm_loyalty_card = $row_data[71];
                                @$crm_loyalty_card_type = $row_data[72];
                                @$crm_earned_points = $row_data[73];
                                @$item_points = str_replace(',', '', $row_data[74]);

                                $filter_item['item_code'] = $item_code;
                                $item_details = $this->BIR_mod->check_nav_item_masterfile($filter_item);

                                if (!empty($item_details)) {
                                    $vendor_no = $item_details[0]['vendor_no'];
                                    if ($item_details[0]['no_stock_posting'] == 'Yes') {
                                        $no_stock_posting = 1;
                                    } else {
                                        $no_stock_posting = 0;
                                    }

                                    $description = $item_details[0]['description'];
                                } else {
                                    $vendor_no = 'no setup';
                                    $no_stock_posting = 'no setup';
                                    $description = 'no setup';
                                }


                                $db_id = $database_id;

                                $insert_data['store'] = $store_dept;
                                $insert_data['db_id'] = $db_id;
                                $insert_data['transaction_no'] = $transaction_no;
                                $insert_data['line_no'] = $line_no;
                                $insert_data['receipt_no'] = $receipt_no;
                                $insert_data['barcode_no'] = $barcode_no;
                                $insert_data['item_code'] = $item_code;
                                $insert_data['sales_staff'] = $sales_staff;
                                $insert_data['item_department'] = $item_department;
                                $insert_data['item_group'] = $item_group;
                                $insert_data['price'] = $price;
                                $insert_data['net_price'] = $net_price;
                                $insert_data['quantity'] = $quantity;
                                $insert_data['vat_code'] = $vat_code;
                                $insert_data['transaction_status'] = $transaction_status;
                                $insert_data['disc_amount'] = $disc_amount;
                                $insert_data['cost_amount'] = $cost_amount;
                                $insert_data['date_'] = $date_;
                                $insert_data['time_'] = $time_;
                                $insert_data['shift_no'] = $shift_no;
                                $insert_data['shift_date'] = $shift_date;
                                $insert_data['net_amount'] = $net_amount;
                                $insert_data['vat_amount'] = $vat_amount;
                                $insert_data['promotion_no'] = $promotion_no;
                                $insert_data['standard_net_price'] = $standard_net_price;
                                $insert_data['disc_amt_from_std_price'] = $disc_amt_from_std_price;
                                $insert_data['statement_no'] = $statement_no;
                                $insert_data['customer_no'] = $customer_no;
                                $insert_data['section'] = $section;
                                $insert_data['shelf'] = $shelf;
                                $insert_data['statement_code'] = $statement_code;
                                $insert_data['item_disc_group '] = $item_disc_group;
                                $insert_data['transaction_code'] = $transaction_code;
                                $insert_data['store_no        '] = $store_no;
                                $insert_data['item_number_scanned'] = $item_number_scanned;
                                $insert_data['keyboard_item_entry'] = $keyboard_item_entry;
                                $insert_data['price_in_barcode'] = $price_in_barcode;
                                $insert_data['price_change'] = $price_change;
                                $insert_data['weight_manually_entered'] = $weight_manually_entered;
                                $insert_data['line_was_discounted'] = $line_was_discounted;
                                $insert_data['scale_item'] = $scale_item;
                                $insert_data['weight_item'] = $weight_item;
                                $insert_data['return_no_sale'] = $return_no_sale;
                                $insert_data['item_corrected_line'] = $item_corrected_line;
                                $insert_data['type_of_sale'] = $type_of_sale;
                                $insert_data['linked_no_not_orig'] = $linked_no_not_orig;
                                $insert_data['orig_of_linked_item_list'] = $orig_of_linked_item_list;
                                $insert_data['pos_terminal_no'] = $pos_terminal_no;
                                $insert_data['staff_id'] = $staff_id;
                                $insert_data['item_posting_group'] = $item_posting_group;
                                $insert_data['total_rounded_amt '] = $total_rounded_amt;
                                $insert_data['counter'] = $counter;
                                $insert_data['variant_code'] = $variant_code;
                                $insert_data['line_discount'] = $line_discount;
                                $insert_data['replicated'] = $replicated;
                                $insert_data['customer_discount'] = $customer_discount;
                                $insert_data['infocode_discount'] = $infocode_discount;
                                $insert_data['cust_invoice_discount'] = $cust_invoice_discount;
                                $insert_data['unit_of_measure'] = $unit_of_measure;
                                $insert_data['uom_quantity'] = $uom_quantity;
                                $insert_data['uom_price'] = $uom_price;
                                $insert_data['total_discount'] = $total_discount;
                                $insert_data['total_disc_percentage'] = $total_disc_percentage;
                                $insert_data['tot_disc_info_line_no'] = $tot_disc_info_line_no;
                                $insert_data['periodic_disc_type'] = $periodic_disc_type;
                                $insert_data['periodic_disc_group'] = $periodic_disc_group;
                                $insert_data['periodic_discount'] = $periodic_discount;
                                $insert_data['discount_amt_for_printing'] = $discount_amt_for_printing;
                                $insert_data['item_division'] = $item_division;
                                $insert_data['addon_code'] = $addon_code;
                                $insert_data['addon_percentage'] = $addon_percentage;
                                $insert_data['used_amount'] = $used_amount;
                                $insert_data['item_internal_type'] = $item_internal_type;
                                $insert_data['crm_loyalty_card'] = $crm_loyalty_card;
                                $insert_data['crm_loyalty_card_type'] = $crm_loyalty_card_type;
                                $insert_data['crm_earned_points'] = $crm_earned_points;
                                $insert_data['item_points'] = $item_points;
                                $insert_data['vendor_no'] = $vendor_no;
                                $insert_data['no_stock_posting'] = $no_stock_posting;
                                $insert_data['description'] = $description;


                                $search_sales = $this->BIR_mod->find_sales_entry($item_code, $vendor_no, $date_, $receipt_no, $transaction_no, $pos_terminal_no, $db_id, $line_no);



                                $table = 'nav_tran_sales_bir_consolidated';
                                if (empty($search_sales)) {
                                    if ($receipt_no != '') {
                                        $this->BIR_mod->insert_table_nav($table, $insert_data);
                                    }
                                } else {

                                    $column_filter['item_code'] = $item_code;
                                    //$column_filter['vendor_no']       = $vendor_no;
                                    $column_filter['store'] = $store_dept;
                                    $column_filter['date_'] = $date_;
                                    $column_filter['receipt_no'] = $receipt_no;
                                    $column_filter['transaction_no'] = $transaction_no;
                                    $column_filter['pos_terminal_no'] = $pos_terminal_no;
                                    $column_filter['db_id'] = $db_id;
                                    $column_filter['line_no'] = $line_no;

                                    $this->BIR_mod->update_table_nav($table, $insert_data, $column_filter);
                                }

                                echo '<script language="JavaScript">';
                                echo '$("span.filename").text("ITEM CODE - ' . $item_code . '");';
                                echo '$("div#percontent").css({"width":"' . $percent . '"});';
                                echo '$("span.status").text("Status: ' . $percent . ' Complete");';
                                echo '$("span.rowprocess").text("Processed Row: ' . $rowproC++ . ' out of ' . $total_files . '");';
                                echo '$("span.empname").text("Entry: ");';
                                echo '</script>';
                                str_repeat(' ', 1024 * 64);
                                flush();
                                ob_flush();
                                usleep(100);
                                if (!in_array($date_, $date_arr)) {
                                    array_push($date_arr, $date_);
                                }
                            }
                }


                usort($date_arr, function ($a, $b) {
                    $date1 = strtotime(str_replace('/', '-', $a));
                    $date2 = strtotime(str_replace('/', '-', $b));

                    return $date1 - $date2;
                });

                $dateFrom = $date_arr[0];

                $dateTo = $date_arr[count($date_arr) - 1];
            }

        $fetch_end = floor(microtime(true) * 1000);
        $time_elapsed = round(($fetch_end - $function_start) / 60000, 2);

        echo '    <!-- Rest of the content... -->
                        <div>                             
                              <button class="btn btn-success btn-lg btn-center" style="margin-left:341px; height: 115px; width: 368px; font-size: 31px; display: inline-block;"  onclick="generate_textfile(' . "'" . $dateFrom . "','" . $dateTo . "','" . $database_id . "','SI'" . ')">Generate Quantity Sold</button> 
                              <button class="btn btn-success btn-lg btn-center" style="margin-left: 92px; height: 111px; width: 359px; font-size: 31px; display: inline-block;"  onclick="generate_ledger_textfile(' . "'" . $dateFrom . "','" . $dateTo . "','" . $database_id . "'" . ')">Generate Sales Ledger</button>                              
                              <br><br><button class="btn btn-success btn-lg btn-center" style="margin-left:538px; height: 115px; width: 478px; font-size: 31px; display: inline-block;"  onclick="generate_textfile(' . "'" . $dateFrom . "','" . $dateTo . "','" . $database_id . "','DR_CON'" . ')">Generate NON SI Quantity Sold</button> 
                        </div>
                        <script>
                        $("span.empname").text("Upload Complete : ");
                        $("span.filename").text("Time Elapsed ' . $time_elapsed . ' Minutes");
                        $("span.transcode").text("");
                                window.io = {
                                                open: function(verb, url, data, target){
                                                    var form = document.createElement("form");
                                                    form.action = url;
                                                    form.method = verb;
                                                    form.target = target || "_self";
                                                    if (data) {
                                                        for (var key in data) {
                                                            var input = document.createElement("textarea");
                                                            input.name = key;
                                                            input.value = typeof data[key] === "object"
                                                                ? JSON.stringify(data[key])
                                                                : data[key];
                                                            form.appendChild(input);
                                                        }

                                                    }
                                                    form.style.display = "none";
                                                    document.body.appendChild(form);
                                                    form.submit();
                                                    document.body.removeChild(form);
                                                }
                                            };


                                function generate_textfile(dateFrom,dateTo,database_id,vendor_type)
                                {                              

                                      io.open("POST", "' . base_url() . 'BIR_ctrl/generate_textfile", { 
                                                                                                        "dateFrom":dateFrom,
                                                                                                        "dateTo":dateTo,
                                                                                                        "database_id":database_id,
                                                                                                        "vendor_type":vendor_type
                                                                                                  },"_blank");       
                                }


                                function generate_ledger_textfile(dateFrom,dateTo,database_id)
                                {                              

                                      io.open("POST", "' . base_url() . 'BIR_ctrl/generate_ledger_textfile", { 
                                                                                                        "dateFrom":dateFrom,
                                                                                                        "dateTo":dateTo,
                                                                                                        "database_id":database_id
                                                                                                  },"_blank");       
                                }

                        </script>
                    </body>
                    </html>';
        flush();
        ob_flush();
        usleep(100);
        ini_set('memory_limit', $memory_limit);
    }


    function removeSpecialCharacters($string)
    {
        $pattern = '/[^a-zA-Z0-9\'"\s-]/';
        $cleanString = preg_replace($pattern, '', $string);

        return $cleanString;
    }

    public function get_db_id($db_id)
    {
        $result = $this->BIR_mod->get_db_id($db_id);
        echo json_encode($result);
    }

    function generate_ledger_textfile()
    {
        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);

        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $database_id = $_POST['database_id'];
        $database_details = $this->BIR_mod->get_connection($database_id, '');
        $file_name = 'POS_SALES_GEN_JNL_' . $database_details[0]['db_name'] . "_FROM_" . $dateFrom . "_TO_" . $dateTo;

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $file_name . '.PJN"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $sales_details = $this->BIR_mod->get_nav_accumulated_sales_ledger($dateFrom, $dateTo, 'group by acc_date & store_code', $database_details[0]['store_no'], '', '');
        $line_number = 10000;
        foreach ($sales_details as $sales) {
            $mast_list = $this->BIR_mod->get_nav_account_masterfile($sales['store_code']);
            foreach ($mast_list as $mast) {
                $sales_type = $mast['sales_type'];
                $select = $mast['formula'];

                $sales_type_details = $this->BIR_mod->get_nav_accumulated_sales_ledger($dateFrom, $dateTo, 'sum sales type', $database_details[0]['store_no'], $select, '');
                $database_details = $this->BIR_mod->get_store_location($sales['store_code']);
                $store_no_arr = explode('-', $sales['store_code']);
                $amount = round($sales_type_details[0][$sales_type], 2);

                if (in_array($sales_type, array('tot_sales', 'vat_amount'))) {
                    $final_amount = '-' . $amount;
                    $show = 'yes';
                } else
                    if (in_array($sales_type, array('variance'))) {
                        $final_amount = $amount;
                        $show = 'yes';
                    } else {
                        $final_amount = $amount;
                        $show = 'yes';
                    }

                if ($final_amount === 0.0) {
                    continue;
                }


                if ($show == 'yes') {

                    echo 'GENERAL<|>' .
                        $line_number . '<|>' .
                        $mast['account_type'] . '<|>' .
                        $mast['account_no'] . '<|>' .
                        date('m/d/Y', strtotime(date($sales['acc_date']))) . '<|>' .
                        '<|>' .
                        $store_no_arr[0] . '-' . $database_details[0]['department'] . '-' . date('mdY', strtotime(date($sales['acc_date']))) . '<|>' .
                        $store_no_arr[0] . '-' . $database_details[0]['department'] . '-' . date('mdy', strtotime(date($sales['acc_date']))) . ' Sales' . '<|>' .
                        $final_amount . '<|>' .
                        $mast['dimension_1'] . '<|>' .
                        $mast['dimension_2'] . '<|>' .
                        'GENJNL' . '<|>' .
                        'POS SALES' . '<|>' .
                        '' . '<|>' .
                        '' . '<|>' .
                        '' . '<|>' .
                        '' . '<|>' .
                        '' . "\n";
                }

                $line_number += 10000;
            }
        }
    }
    // function generate_ledger_textfile()
    // {
    //     $memory_limit = ini_get('memory_limit');
    //     ini_set('memory_limit', -1);
    //     ini_set('max_execution_time', 0);

    //     // Check if required POST variables are set
    //     if (!isset($_POST['dateFrom']) || !isset($_POST['dateTo']) || !isset($_POST['database_id'])) {
    //         die('Missing required parameters.');
    //     }

    //     $dateFrom = $this->input->post('dateFrom', true);
    //     $dateTo = $this->input->post('dateTo', true);
    //     $database_id = $this->input->post('database_id', true);

    //     $database_details = $this->BIR_mod->get_connection($database_id, '');
    //     if (empty($database_details)) {
    //         die('Invalid database details.');
    //     }

    //     $file_name = 'POS_SALES_GEN_JNL_' . $database_details[0]['db_name'] . "_FROM_" . $dateFrom . "_TO_" . $dateTo;

    //     header('Content-Type: text/plain');
    //     header('Content-Disposition: attachment; filename="' . $file_name . '.PJN"');
    //     header("Content-Transfer-Encoding: binary");

    //     ob_start();

    //     $sales_details = $this->BIR_mod->get_nav_accumulated_sales_ledger($dateFrom, $dateTo, 'group by acc_date & store_code', $database_details[0]['store_no'], '', '');
    //     if ($sales_details === false) {
    //         ob_end_clean();
    //         die('Error retrieving sales details.');
    //     }

    //     $line_number = 10000;
    //     foreach ($sales_details as $sales) {
    //         $mast_list = $this->BIR_mod->get_nav_account_masterfile($sales['store_code']);
    //         if ($mast_list === false) {
    //             ob_end_clean();
    //             die('Error retrieving master list.');
    //         }

    //         foreach ($mast_list as $mast) {
    //             $sales_type = $mast['sales_type'];
    //             $select = $mast['formula'];

    //             $sales_type_details = $this->BIR_mod->get_nav_accumulated_sales_ledger($dateFrom, $dateTo, 'sum sales type', $database_details[0]['store_no'], $select, '');
    //             if ($sales_type_details === false) {
    //                 ob_end_clean();
    //                 die('Error retrieving sales type details.');
    //             }

    //             $store_location = $this->BIR_mod->get_store_location($sales['store_code']);
    //             if ($store_location === false) {
    //                 ob_end_clean();
    //                 die('Error retrieving store location.');
    //             }

    //             $store_no_arr = explode('-', $sales['store_code']);
    //             $amount = round($sales_type_details[0][$sales_type], 2);

    //             if (in_array($sales_type, array('tot_sales', 'vat_amount'))) {
    //                 $final_amount = '-' . $amount;
    //                 $show = 'yes';
    //             } elseif (in_array($sales_type, array('variance'))) {
    //                 $final_amount = $amount;
    //                 $show = 'yes';
    //             } else {
    //                 $final_amount = $amount;
    //                 $show = 'yes';
    //             }

    //             if ($final_amount === 0.0) {
    //                 continue;
    //             }

    //             if ($show == 'yes') {
    //                 echo 'GENERAL<|>' .
    //                     $line_number . '<|>' .
    //                     $mast['account_type'] . '<|>' .
    //                     $mast['account_no'] . '<|>' .
    //                     date('m/d/Y', strtotime($sales['acc_date'])) . '<|>' .
    //                     '<|>' .
    //                     $store_no_arr[0] . '-' . $store_location[0]['department'] . '-' . date('mdY', strtotime($sales['acc_date'])) . '<|>' .
    //                     $store_no_arr[0] . '-' . $store_location[0]['department'] . '-' . date('mdy', strtotime($sales['acc_date'])) . ' Sales' . '<|>' .
    //                     $final_amount . '<|>' .
    //                     $mast['dimension_1'] . '<|>' .
    //                     $mast['dimension_2'] . '<|>' .
    //                     'GENJNL' . '<|>' .
    //                     'POS SALES' . '<|>' .
    //                     '' . '<|>' .
    //                     '' . '<|>' .
    //                     '' . '<|>' .
    //                     '' . '<|>' .
    //                     '' . "\n";
    //             }

    //             $line_number += 10000;
    //         }
    //     }

    //     ob_end_flush();
    // }


    function generate_textfile()
    {

        $memory_limit = ini_get('memory_limit');
        ini_set('memory_limit', -1);
        ini_set('max_execution_time', 0);


        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $database_id = $_POST['database_id'];
        $vendor_type = $_POST['vendor_type'];


        $database_details = $this->BIR_mod->get_connection($database_id, '');
        $department = $database_details[0]['department'];

        $file_name = 'POS_SALES_GEN_QTY_' . $vendor_type . '_' . $database_details[0]['display_name'] . "__FROM_" . $dateFrom . "_TO_" . $dateTo;

        if ($database_id == 39) {
            $database_arr = array(41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55); //mga counter sa wdg
        } else {
            $database_arr = array($database_id);
        }

        $si_entries = $this->BIR_mod->get_bir_si_entry($dateFrom, $dateTo, $database_arr);

        $payment_arr = array();
        $transact_arr = array();

        header('Content-Type: text/plain');
        header('Content-Disposition: attachment; filename="' . $file_name . '.PQT"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $select = '(sum(total_net_sales) + sum(vat_amount)) as tot_net_sales,
                        sum(no_item_sold) as tot_item_sold,
                        acc_date
                        ';
        $filter = 'group by acc_date & store_code';
        $store = $database_details[0]['store_no'];

        $line_arr = array();
        $line_number = 10000;

        $date_1 = $dateFrom;
        $date_2 = $dateTo;
        $all_date = array();

        $current_date = strtotime($date_1);

        while ($current_date <= strtotime($date_2)) {
            $all_date[] = date('Y-m-d', $current_date);
            $current_date = strtotime('+1 day', $current_date);
        }

        for ($a = 0; $a < count($all_date); $a++) {

            $ledger_list = $this->BIR_mod->get_nav_accumulated_sales_ledger($all_date[$a], $all_date[$a], $filter, $store, $select, '');

            if ($ledger_list == []) {
                log_message('error', 'nav_accumulated_sales_ledger is empty');
            }

            foreach ($ledger_list as $ldg) {
                $total_net_sales = $ldg['tot_net_sales'];
                $acc_date = $ldg['acc_date'];
                $no_item_sold = $ldg['tot_item_sold'];

                $si_entries = $this->BIR_mod->get_bir_si_entry_v4($database_id, $store, $acc_date, $total_net_sales, $no_item_sold, $vendor_type, $department);

                foreach ($si_entries as $entry) {
                    $transaction_no = trim(str_replace(',', '', $entry['transaction_no']));

                    $mast_list = $this->BIR_mod->get_nav_account_masterfile($entry['store_no']);

                    foreach ($mast_list as $mast) {
                        $dimension_1 = $mast['dimension_1'];
                        $dimension_2 = $mast['dimension_2'];
                        $source_code = $mast['source_code'];
                    }

                    $line_no = trim(str_replace(',', '', $entry['line_no']));
                    $receipt_no = trim(str_replace(',', '', $entry['receipt_no']));
                    $barcode_no = trim(str_replace(',', '', $entry['barcode_no']));
                    $item_code = trim(str_replace(',', '', $entry['item_code']));
                    $description = trim(str_replace(',', '', $entry['description']));
                    $sales_staff = trim(str_replace(',', '', $entry['sales_staff']));
                    $item_department = trim(str_replace(',', '', $entry['item_department']));
                    $item_group = trim(str_replace(',', '', $entry['item_group']));
                    $price = trim(str_replace(',', '', $entry['price']));
                    $net_price = trim(str_replace(',', '', $entry['net_price']));

                    //$quantity                  = trim(str_replace(',','',$entry['quantity']));
                    $quantity = trim(str_replace(',', '', $entry['total_qty']));

                    $vat_code = trim(str_replace(',', '', $entry['vat_code']));
                    $transaction_status = trim(str_replace(',', '', $entry['transaction_status']));
                    $disc_amount = trim(str_replace(',', '', $entry['disc_amount']));
                    $cost_amount = trim(str_replace(',', '', $entry['cost_amount']));
                    $date_ = trim(str_replace(',', '', $entry['date_']));
                    $time_ = trim(str_replace(',', '', $entry['time_']));
                    $shift_no = trim(str_replace(',', '', $entry['shift_no']));
                    $shift_date = trim(str_replace(',', '', $entry['shift_date']));

                    //$net_amount                = trim(str_replace(',','',$entry['net_amount']));
                    $net_amount = trim(str_replace(',', '', $entry['total_net_amount']));

                    $vat_amount = trim(str_replace(',', '', $entry['vat_amount']));
                    $promotion_no = trim(str_replace(',', '', $entry['promotion_no']));
                    $standard_net_price = trim(str_replace(',', '', $entry['standard_net_price']));
                    $disc_amt_from_std_price = trim(str_replace(',', '', $entry['disc_amt_from_std_price']));
                    $statement_no = trim(str_replace(',', '', $entry['statement_no']));
                    $customer_no = trim(str_replace(',', '', $entry['customer_no']));
                    $section = trim(str_replace(',', '', $entry['section']));
                    $shelf = trim(str_replace(',', '', $entry['shelf']));
                    $statement_code = trim(str_replace(',', '', $entry['statement_code']));
                    $item_disc_group = trim(str_replace(',', '', $entry['item_disc_group']));
                    $transaction_code = trim(str_replace(',', '', $entry['transaction_code']));
                    $store_no = trim(str_replace(',', '', $entry['store_no']));
                    $item_number_scanned = trim(str_replace(',', '', $entry['item_number_scanned']));
                    $keyboard_item_entry = trim(str_replace(',', '', $entry['keyboard_item_entry']));
                    $price_in_barcode = trim(str_replace(',', '', $entry['price_in_barcode']));
                    $price_change = trim(str_replace(',', '', $entry['price_change']));
                    $weight_manually_entered = trim(str_replace(',', '', $entry['weight_manually_entered']));
                    $line_was_discounted = trim(str_replace(',', '', $entry['line_was_discounted']));
                    $scale_item = trim(str_replace(',', '', $entry['scale_item']));
                    $weight_item = trim(str_replace(',', '', $entry['weight_item']));
                    $return_no_sale = trim(str_replace(',', '', $entry['return_no_sale']));
                    $item_corrected_line = trim(str_replace(',', '', $entry['item_corrected_line']));
                    $type_of_sale = trim(str_replace(',', '', $entry['type_of_sale']));
                    $linked_no_not_orig = trim(str_replace(',', '', $entry['linked_no_not_orig']));
                    $orig_of_linked_item_list = trim(str_replace(',', '', $entry['orig_of_linked_item_list']));
                    $pos_terminal_no = trim(str_replace(',', '', $entry['pos_terminal_no']));
                    $staff_id = trim(str_replace(',', '', $entry['staff_id']));
                    $item_posting_group = trim(str_replace(',', '', $entry['item_posting_group']));
                    $total_rounded_amt = trim(str_replace(',', '', $entry['total_rounded_amt']));
                    $counter = trim(str_replace(',', '', $entry['counter']));
                    $variant_code = trim(str_replace(',', '', $entry['variant_code']));
                    $line_discount = trim(str_replace(',', '', $entry['line_discount']));
                    $replicated = trim(str_replace(',', '', $entry['replicated']));
                    $customer_discount = trim(str_replace(',', '', $entry['customer_discount']));
                    $infocode_discount = trim(str_replace(',', '', $entry['infocode_discount']));
                    $cust_invoice_discount = trim(str_replace(',', '', $entry['cust_invoice_discount']));
                    $unit_of_measure = trim(str_replace(',', '', $entry['unit_of_measure']));
                    $uom_quantity = trim(str_replace(',', '', $entry['uom_quantity']));
                    $uom_price = trim(str_replace(',', '', $entry['uom_price']));
                    $total_discount = trim(str_replace(',', '', $entry['total_discount']));
                    $total_disc_percentage = trim(str_replace(',', '', $entry['total_disc_percentage']));
                    $tot_disc_info_line_no = trim(str_replace(',', '', $entry['tot_disc_info_line_no']));
                    $periodic_disc_type = trim(str_replace(',', '', $entry['periodic_disc_type']));
                    $periodic_disc_group = trim(str_replace(',', '', $entry['periodic_disc_group']));
                    $periodic_discount = trim(str_replace(',', '', $entry['periodic_discount']));
                    $discount_amt_for_printing = trim(str_replace(',', '', $entry['discount_amt_for_printing']));
                    $item_division = trim(str_replace(',', '', $entry['item_division']));
                    $addon_code = trim(str_replace(',', '', $entry['addon_code']));
                    $addon_percentage = trim(str_replace(',', '', $entry['addon_percentage']));
                    $used_amount = trim(str_replace(',', '', $entry['used_amount']));
                    $item_internal_type = trim(str_replace(',', '', $entry['item_internal_type']));
                    $crm_loyalty_card = trim(str_replace(',', '', $entry['crm_loyalty_card']));
                    $crm_loyalty_card_type = trim(str_replace(',', '', $entry['crm_loyalty_card_type']));
                    $crm_earned_points = trim(str_replace(',', '', $entry['crm_earned_points']));
                    $item_points = trim(str_replace(',', '', $entry['item_points']));
                    $statement_no = trim(str_replace(',', '', $entry['statement_no']));

                    $time_arr = explode(' ', $time_);
                    $shift_date_arr = explode(' ', $shift_date);

                    if ($time_ == '') {
                        $time_ = "";
                    } else
                        if (count($time_arr) == 2) {
                            if ($time_arr[1] == '00:00:00.000') {
                                $time_ = "";
                            } else {
                                $time_ = date('h:i:s A', strtotime($time_arr[1]));
                            }
                        } else {
                            if ($shift_date_arr[0] == '00:00:00.000') {
                                $time_ = "";
                            } else {
                                $time_ = date('h:i:s A', strtotime($time_arr[0]));
                            }
                        }

                    if ($shift_date == '') {
                        $shift_date = "";
                    } else
                        if (count($shift_date_arr) == 2) {
                            if ($shift_date_arr[1] == '00:00:00.000') {
                                $shift_date = "";
                            } else {
                                $shift_date = date('h:i:s A', strtotime($shift_date_arr[1]));
                            }
                        } else {
                            if ($shift_date_arr[0] == '00:00:00.000') {
                                $shift_date = "";
                            } else {
                                $shift_date = date('h:i:s A', strtotime($shift_date_arr[0]));
                            }
                        }

                    if ($transaction_code == 0) {
                        $transaction_code = 'Item on File';
                    } else {
                        $transaction_code = 'Item/Barcode Not On File';
                    }

                    if ($item_number_scanned == 0) {
                        $item_number_scanned = 'No';
                    } else {
                        $item_number_scanned = 'Yes';
                    }


                    if ($keyboard_item_entry == 0) {
                        $keyboard_item_entry = 'No';
                    } else {
                        $keyboard_item_entry = 'Yes';
                    }


                    if ($price_in_barcode == 0) {
                        $price_in_barcode = 'No';
                    } else {
                        $price_in_barcode = 'Yes';
                    }

                    if ($price_change == 0) {
                        $price_change = 'No';
                    } else {
                        $price_change = 'Yes';
                    }

                    if ($weight_manually_entered == 0) {
                        $weight_manually_entered = 'No';
                    } else {
                        $weight_manually_entered = 'Yes';
                    }

                    if ($line_was_discounted == 0) {
                        $line_was_discounted = 'No';
                    } else {
                        $line_was_discounted = 'Yes';
                    }

                    if ($scale_item == 0) {
                        $scale_item = 'No';
                    } else {
                        $scale_item = 'Yes';
                    }

                    if ($weight_item == 0) {
                        $weight_item = 'No';
                    } else {
                        $weight_item = 'Yes';
                    }


                    if ($return_no_sale == 0) {
                        $return_no_sale = 'No';
                    } else {
                        $return_no_sale = 'Yes';
                    }

                    if ($item_corrected_line == 0) {
                        $item_corrected_line = 'No';
                    } else {
                        $item_corrected_line = 'Yes';
                    }

                    if ($type_of_sale == 0) {
                        $type_of_sale = 'Item Sale';
                    }

                    if ($linked_no_not_orig == 0) {
                        $linked_no_not_orig = 'No';
                    } else {
                        $linked_no_not_orig = 'Yes';
                    }


                    if ($orig_of_linked_item_list == 0) {
                        $orig_of_linked_item_list = 'No';
                    } else {
                        $orig_of_linked_item_list = 'Yes';
                    }

                    if ($replicated == 0) {
                        $replicated = 'NO';
                    } else {
                        $replicated = 'Yes';
                    }



                    $store_arr = explode('-', $store_no);
                    $statement_no_arr = explode('-', $statement_no);
                    if ($statement_no_arr[0] == 'SM') {
                        $department = 'SMKT';
                    } else {
                        $department = 'none';
                    }


                    $store_location = $this->BIR_mod->get_store_location($store_no);
                    $final_qty = str_replace("-", '', round($quantity));


                    if ($vendor_type == 'SI') {
                        echo 'ITEM<|>' .
                            $line_number . '<|>' .
                            $item_code . '<|>' .
                            date('m/d/y', strtotime(date($date_))) . '<|>' .
                            'Sale<|>' .
                            $store_arr[0] . '-' . $store_location[0]['department'] . date('mdY', strtotime(date($date_))) . '<|>' .
                            $description . '<|>' .
                            $store_location[0]['store_location'] . '<|>' .
                            '<|>' .
                            $final_qty .
                            '<|>' .
                            '<|>' .
                            '<|>' .
                            $source_code . '<|>' .
                            $dimension_1 . '<|>' .
                            $dimension_2 . '<|>' .
                            'POS QTY' . '<|>' .
                            $variant_code . '<|>' .
                            $unit_of_measure
                            . "\n"; //for live
                    } else {
                        echo 'ITEM,' .
                            $entry['sales_id'] . ',' .
                            $line_number . ',' .
                            $item_code . ',' .
                            date('m/d/y', strtotime(date($date_))) . ',' .
                            'Sale,' .
                            $store_arr[0] . '-' . date('mdY', strtotime(date($date_))) . ',' .
                            $description . ',' .
                            $store_arr[0] . '-' . $department . ',' .
                            ',' .
                            round($quantity) .
                            ',' .
                            ',' .
                            ',' .
                            $source_code . ',' .
                            $dimension_1 . ',' .
                            $dimension_2 . ',' .
                            $store_arr[0] . '-' . $department . ',' .
                            $variant_code . ',' .
                            $unit_of_measure . ',' .
                            $net_amount . ',' .
                            $entry['pos_terminal_no'] . ',' .
                            $entry['type_'] . ',' .
                            $entry['vendor_code'] . ',' .
                            $entry['no_stock_posting'] . ',' .
                            $entry['sales_id'] . ',' .
                            $entry['line_no']
                            . "\n";    //for testing          
                    }


                    $line_number += 10000;
                }
            }
        }

        ini_set('memory_limit', $memory_limit);
    }


    function convert_excel_filename($all_date, $bu_name, $report_period = NULL)
    {
        $getDate = explode('-', $all_date[0]);
        $dateObj = DateTime::createFromFormat('!m', $getDate[1]);
        $monthName = strtoupper($dateObj->format('M'));

        $getStore = explode('_', $bu_name);
        $full_filename = ($report_period == NULL)
            ? "Sales Ledger Report_{$getStore[0]}_{$getStore[1]}_{$monthName}_$getDate[2]"
            : "Sales Ledger Report_{$getStore[0]}_{$getStore[1]}_{$monthName}";

        return $full_filename;
    }


    function generate_ledger_report_excel_monthly()
    {
        $db_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $store_name = $_POST['store_name'];
        $bu_name = $_POST['bu_name'];

        $date_1 = $dateFrom;
        $date_2 = $dateTo;
        $all_date = array();
        $current_date = strtotime($date_1);

        while ($current_date <= strtotime($date_2)) {
            $all_date[] = date('Y-m-d', $current_date);
            $current_date = strtotime('+1 day', $current_date);
        }

        $file_name = $this->convert_excel_filename($all_date, $bu_name, "monthly");

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $file_name . '.xls"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $border = 1;
        $html = '';
        $html = '<div class="row">
                                    <strong style="color:red;">   Store:</strong><a>' . $store_name . '</a><br>
                                    <strong style="color:red;">   Business Unit Server:</strong><a>' . $bu_name . '</a><br>

                 </div>';
        echo $html;

        $ledger_details = $this->BIR_mod->get_nav_accumulated_sales_ledger_width_variance_monthly($db_id, $all_date[0], end($all_date));
        $line_counter = 0;
        if (!empty($ledger_details)) {
            $total_net_sales = 0;
            $vatable_sales = 0;
            $vat_exempt_sales = 0;
            $vat_amount = 0;
            $cash_sales = 0;
            $card_sales = 0;
            $float_entry = 0;
            $remove_entry = 0;
            $variance = 0;
            $total_cash = 0;
            $no_item_sold = 0;
            $old_accumulated_sales = 0;
            $new_accumulated_sales = 0;

            $html = '<div class="row">
                                    <strong style="color:red;"> Date: From ' . date('M d,Y', strtotime($all_date[0])) . '  To ' . date('M d,Y', strtotime(end($all_date))) . '</strong>
                          </div>';
            $html .= '   <table cellspacing="1" cellpadding="1" border="' . $border . '"  style="text-align: center;font-size:10px;color:black;">
                                <tr style="color:blue;">
                                      <th><strong>POS TERMINAL</strong></th>
                                      <th><strong>TOTAL NET SALES</strong></th>
                                      <th><strong>VATABLE SALES</strong></th>                                      
                                      <th><strong>VAT EXEMPT SALES</strong></th>                                      
                                      <th><strong>VAT AMOUNT</strong></th>
                                      <th><strong>CASH SALES</strong></th>
                                      <th><strong>CARD SALES</strong></th>
                                      <th><strong>REMOVE ENTRY</strong></th>
                                      <th><strong>TOTAL CASH SALES</strong></th>
                                      <th><strong>NON CASH</strong></th>
                                      <th><strong>NO. ITEM SOLD</strong></th>
                                      <th><strong>OLD ACCUMULATED SALES</strong></th>
                                      <th><strong>NEW ACCUMULATED SALES</strong></th>
                                </tr>
                                <tbody>  
                          ';

            $decimal_style = "text-align:right;";
            foreach ($ledger_details as $led) {
                $total_net_sales += round($led['total_net_sales'], 2);
                $vatable_sales += round($led['vatable_sales'], 2);
                $vat_exempt_sales += round($led['vat_exempt_sales'], 2);
                $vat_amount += round($led['vat_amount'], 2);
                $csh_sales = round($led['cash_sales'], 2);
                $cash_sales += $csh_sales;
                $card_sales += round($led['card_sales'], 2);

                $rem_entry = (round(abs($led['remove_entry']), 2) - round(abs($led['float_entry']), 2));
                $remove_entry += $rem_entry;
                $tot_cash = ($csh_sales + $rem_entry);
                $total_cash += $tot_cash;
                $variance += round($led['variance'], 2);
                $no_item_sold += round($led['no_item_sold'], 2);
                $old_accumulated_sales += round($led['old_accumulated_sales'], 2);
                $new_accumulated_sales += round($led['new_accumulated_sales'], 2);

                $html .= '
                                  <tr>
                                       <td>' . $led['pos_terminal'] . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['total_net_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['vatable_sales'], 2) . '</td>                                       
                                       <td style="' . $decimal_style . '">' . number_format($led['vat_exempt_sales'], 2) . '</td>                                       
                                       <td style="' . $decimal_style . '">' . number_format($led['vat_amount'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($csh_sales, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['card_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($rem_entry, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($tot_cash, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['variance'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['no_item_sold'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['old_accumulated_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['new_accumulated_sales'], 2) . '</td>
                                  </tr>
                              ';
            }

            $html .= '<tr>
                                        <td><strong style="color:green;"><strong>TOTAL</strong></strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_net_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vatable_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vat_exempt_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vat_amount, 2) . '</strong></td>                                        
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($cash_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($card_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($remove_entry, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_cash, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($variance, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($no_item_sold, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($old_accumulated_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($new_accumulated_sales, 2) . '</strong></td>
                                  </tr>
                                 ';

            $html .= '    </tbody>
                             </table>
                          ';

            echo $html;
        }

        exit();
    }

    function generate_ledger_report_excel()
    {
        $db_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $store_name = $_POST['store_name'];
        $bu_name = $_POST['bu_name'];

        $date_1 = $dateFrom;
        $date_2 = $dateTo;
        $all_date = array();

        $current_date = strtotime($date_1);

        while ($current_date <= strtotime($date_2)) {
            $all_date[] = date('Y-m-d', $current_date);
            $current_date = strtotime('+1 day', $current_date);
        }

        $file_name = $this->convert_excel_filename($all_date, $bu_name);

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $file_name . '.xls"');
        header("Content-Transfer-Encoding: binary");
        ob_clean();

        $border = 1;
        $html = '';
        $html = '<div class="row">
                    <strong style="color:red;">   Store:</strong><a>' . $store_name . '</a><br>
                    <strong style="color:red;">   Business Unit Server:</strong><a>' . $bu_name . '</a><br>
                 </div>';
        echo $html;

        for ($a = 0; $a < count($all_date); $a++) {
            $ledger_details = $this->BIR_mod->get_nav_accumulated_sales_ledger_width_variance($db_id, $all_date[$a], $all_date[$a]);
            $line_counter = 0;

            if (!empty($ledger_details)) {
                $total_net_sales = $vatable_sales = $vat_exempt_sales = $vat_amount = $cash_sales = $card_sales = $float_entry = $remove_entry = $variance = $total_cash = $no_item_sold = $old_accumulated_sales = $new_accumulated_sales = 0;

                $html = '<div class="row">
                                    <strong style="color:red;"> Date:' . date('M d,Y', strtotime($all_date[$a])) . '</strong>
                          </div>';
                $html .= '   <table cellspacing="1" cellpadding="1" border="' . $border . '"  style="text-align: center;font-size:10px;color:black;">
                                <tr style="color:blue;">
                                      <th><strong>POS TERMINAL</strong></th>
                                      <th><strong>TOTAL NET SALES</strong></th>
                                      <th><strong>VATABLE SALES</strong></th>                                      
                                      <th><strong>VAT EXEMPT SALES</strong></th>                                      
                                      <th><strong>VAT AMOUNT</strong></th>
                                      <th><strong>CASH SALES</strong></th>
                                      <th><strong>CARD SALES</strong></th>
                                      <th><strong>REMOVE ENTRY</strong></th>
                                      <th><strong>TOTAL CASH SALES</strong></th>
                                      <th><strong>NON CASH</strong></th>
                                      <th><strong>NO. ITEM SOLD</strong></th>
                                      <th><strong>OLD ACCUMULATED SALES</strong></th>
                                      <th><strong>NEW ACCUMULATED SALES</strong></th>

                                </tr>
                                <tbody>  
                          ';

                $decimal_style = "text-align:right;";

                foreach ($ledger_details as $led) {
                    $total_net_sales += round($led['total_net_sales'], 2);
                    $vatable_sales += round($led['vatable_sales'], 2);
                    $vat_exempt_sales += round($led['vat_exempt_sales'], 2);
                    $vat_amount += round($led['vat_amount'], 2);
                    $csh_sales = round($led['cash_sales'], 2);
                    $cash_sales += $csh_sales;
                    $card_sales += round($led['card_sales'], 2);
                    $rem_entry = (abs($led['remove_entry']) - abs($led['float_entry']));
                    $remove_entry += $rem_entry;
                    $tot_cash = ($csh_sales + $rem_entry);
                    $total_cash += $tot_cash;
                    $variance += round($led['variance'], 2);
                    $no_item_sold += round($led['no_item_sold'], 2);
                    $old_accumulated_sales += round($led['old_accumulated_sales'], 2);
                    $new_accumulated_sales += round($led['new_accumulated_sales'], 2);

                    if ($led['total_net_sales'] == '.000') {
                        continue;
                    }

                    $html .= '
                                  <tr>
                                       <td>' . $led['pos_terminal'] . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['total_net_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['vatable_sales'], 2) . '</td>                                       
                                       <td style="' . $decimal_style . '">' . number_format(abs($led['vat_exempt_sales']), 2) . '</td>                                       
                                       <td style="' . $decimal_style . '">' . number_format($led['vat_amount'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($csh_sales, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['card_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format(abs($rem_entry), 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($tot_cash, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['variance'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['no_item_sold'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['old_accumulated_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['new_accumulated_sales'], 2) . '</td>
                                  </tr>
                              ';
                    if ($line_counter == 28) {

                        $html .= '    </tbody>
                             </table><br><br><br>
                          ';

                        echo $html;

                        $html = '<div class="row">
                                    <strong style="color:red;"> Date:' . date('M d,Y', strtotime($all_date[$a])) . '</strong>
                                   </div>';
                        $html .= '   <table cellspacing="1" cellpadding="1" border="' . $border . '"  style="text-align: center;font-size:10px;color:black;">
                                        <tr style="color:blue;">
                                              <th><strong>POS TERMINAL</strong></th>
                                              <th><strong>TOTAL NET SALES</strong></th>
                                              <th><strong>VATABLE SALES</strong></th>                                      
                                              <th><strong>VAT EXEMPT SALES</strong></th>                                      
                                              <th><strong>VAT AMOUNT</strong></th>
                                              <th><strong>CASH SALES</strong></th>
                                              <th><strong>CARD SALES</strong></th>
                                              <th><strong>REMOVE ENTRY</strong></th>
                                              <th><strong>TOTAL CASH SALES</strong></th>
                                              <th><strong>NON CASH</strong></th>
                                              <th><strong>NO. ITEM SOLD</strong></th>
                                              <th><strong>OLD ACCUMULATED SALES</strong></th>
                                              <th><strong>NEW ACCUMULATED SALES</strong></th>
                                        </tr>
                                        <tbody>  
                                 ';
                        $line_counter = 0;
                    } else {
                        $line_counter += 1;
                    }
                }

                $html .= '<tr>
                                        <td><strong style="color:green;"><strong>TOTAL</strong></strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_net_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vatable_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format(abs($vat_exempt_sales), 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vat_amount, 2) . '</strong></td>                                        
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($cash_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($card_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format(abs($remove_entry), 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_cash, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($variance, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($no_item_sold, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($old_accumulated_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($new_accumulated_sales, 2) . '</strong></td>
                                  </tr>
                                 ';

                $html .= '    </tbody>
                             </table>
                          ';

                echo $html;
            }
        }

        exit();
    }


    function generate_ledger_report()
    {
        $db_id = $_POST['db_id'];
        $dateFrom = $_POST['dateFrom'];
        $dateTo = $_POST['dateTo'];
        $store_name = $_POST['store_name'];
        $bu_name = $_POST['bu_name'];

        $date_1 = $dateFrom;
        $date_2 = $dateTo;
        $all_date = array();

        $current_date = strtotime($date_1);

        while ($current_date <= strtotime($date_2)) {
            $all_date[] = date('Y-m-d', $current_date);
            $current_date = strtotime('+1 day', $current_date);
        }

        $this->ppdf = new TCPDF();
        $this->ppdf->SetTitle("Sales Ledger Report");
        $this->ppdf->SetMargins(5, 15, 5, true);
        $this->ppdf->setPrintHeader(false);
        $this->ppdf->SetFont('', '', 10, '', true);
        $this->ppdf->SetAutoPageBreak(false);

        $border = 1;
        $html = '';
        $html = '<div class="row">
                                    <strong style="color:red;">   Store:</strong><a>' . $store_name . '</a><br>
                                    <strong style="color:red;">   Business Unit Server:</strong><a>' . $bu_name . '</a><br>

                 </div>';


        for ($a = 0; $a < count($all_date); $a++) {
            $ledger_details = $this->BIR_mod->get_nav_accumulated_sales_ledger_width_variance($db_id, $all_date[$a], $all_date[$a]);
            $line_counter = 0;
            if (!empty($ledger_details)) {
                $total_net_sales = 0;
                $vat_amount = 0;
                $no_item_sold = 0;
                $cash_sales = 0;
                $card_sales = 0;
                $float_entry = 0;
                $remove_entry = 0;
                $variance = 0;
                $total_cash = 0;
                $this->ppdf->AddPage("L");
                $html .= '<div class="row">
                                    <strong style="color:red;"> Date:' . date('M d,Y', strtotime($all_date[$a])) . '</strong>
                          </div>';
                $html .= '   <table cellspacing="1" cellpadding="1" border="' . $border . '"  style="text-align: center;font-size:10px;color:black;">
                                <tr style="color:blue;">
                                      <th><strong>POS TERMINAL</strong></th>
                                      <th><strong>TOTAL NET SALES</strong></th>
                                      <th><strong>VAT AMOUNT</strong></th>
                                      <th><strong>NO. ITEM SOLD</strong></th>
                                      <th><strong>CASH SALES</strong></th>
                                      <th><strong>CARD SALES</strong></th>
                                      <th><strong>REMOVE ENTRY</strong></th>
                                      <th><strong>TOTAL CASH SALES</strong></th>
                                      <th><strong>NON CASH</strong></th>
                                </tr>
                                <tbody>  
                          ';

                $decimal_style = "text-align:right;";
                foreach ($ledger_details as $led) {
                    $total_net_sales += round($led['total_net_sales'], 2);
                    $vat_amount += round($led['vat_amount'], 2);
                    $no_item_sold += round($led['no_item_sold'], 2);
                    $csh_sales = round($led['cash_sales'], 2);
                    $cash_sales += $csh_sales;
                    $card_sales += round($led['card_sales'], 2);

                    $rem_entry = (round($led['remove_entry'], 2) - round($led['float_entry'], 2));
                    $remove_entry += $rem_entry;
                    $tot_cash = ($csh_sales + $rem_entry);
                    $total_cash += $tot_cash;
                    $variance += round($led['variance'], 2);


                    $html .= '
                                  <tr>
                                       <td>' . $led['pos_terminal'] . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['total_net_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['vat_amount'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['no_item_sold'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($csh_sales, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['card_sales'], 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($rem_entry, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($tot_cash, 2) . '</td>
                                       <td style="' . $decimal_style . '">' . number_format($led['variance'], 2) . '</td>
                                  </tr>
                              ';
                    if ($line_counter == 28) {

                        $html .= '    </tbody>
                             </table>
                          ';
                        $html .= '<br><br><br><table><tr><td align="center">Page ' . $this->ppdf->getAliasNumPage() . ' of ' . $this->ppdf->getAliasNbPages() . '</td></tr></table>';
                        $this->ppdf->writeHTML($html, true, false, false, false, '');
                        $this->ppdf->AddPage("L");


                        $html = '<div class="row">
                                    <strong style="color:red;"> Date:' . date('M d,Y', strtotime($all_date[$a])) . '</strong>
                                   </div>';
                        $html .= '   <table cellspacing="1" cellpadding="1" border="' . $border . '"  style="text-align: center;font-size:10px;color:black;">
                                        <tr style="color:blue;">
                                             <th><strong>POS TERMINAL</strong></th>
                                             <th><strong>TOTAL NET SALES</strong></th>
                                             <th><strong>VAT AMOUNT</strong></th>
                                             <th><strong>NO. ITEM SOLD</strong></th>
                                             <th><strong>CASH SALES</strong></th>
                                             <th><strong>CARD SALES</strong></th>
                                             <th><strong>REMOVE ENTRY</strong></th>
                                             <th><strong>TOTAL CASH SALES</strong></th>
                                             <th><strong>NON CASH</strong></th>
                                        </tr>
                                        <tbody>  
                                 ';

                        $line_counter = 0;
                    } else {
                        $line_counter += 1;
                    }
                }

                $html .= '<tr>
                                        <td><strong style="color:green;"><strong>TOTAL</strong></strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_net_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($vat_amount, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($no_item_sold, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($cash_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($card_sales, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($remove_entry, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($total_cash, 2) . '</strong></td>
                                        <td style="color:green;' . $decimal_style . '"><strong>' . number_format($variance, 2) . '</strong></td>
                                  </tr>
                                 ';

                $html .= '    </tbody>
                             </table>
                          ';

                $html .= '<br><br><br><table><tr><td align="center">Page ' . $this->ppdf->getAliasNumPage() . ' of ' . $this->ppdf->getAliasNbPages() . '</td></tr></table>';

                $this->ppdf->writeHTML($html, true, false, false, false, '');

                // Define footer content



                //$this->ppdf->writeHTML($html, true, false, false, false, '');
            }
        }


        ob_end_clean();
        $this->ppdf->Output();
    }
}
