<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>CAS Middleware </title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <link rel="shortcut icon" type="image/png" href="<?php echo base_url(); ?>assets/middleware.svg" />
    <link rel="bookmark" href="favicon_16.ico" />
    <!-- <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/bootstrap.min.css" /> -->
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/site.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/datatables.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/googleapis.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/css/sweetalert.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/fontawesome/css/all.min.css" />

    <script src="<?php echo base_url(); ?>assets/js/jquery-3.6.0.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/site.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/sweetalert.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/datatables.min.js"></script>
    <script src="<?php echo base_url(); ?>assets/js/sweetalert2.all.min.js"></script>
    <style>
        .progress-bar {
            width: 100%;
            height: 20px;
            background-color: #f0f0f0;
        }

        .progress {
            height: 100%;
            background-color: #00aaff;
            width: 0;
            transition: width 0.5s ease-in-out;
        }




        @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');

        * {
            list-style: none;
            text-decoration: none;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Open Sans', sans-serif;
        }

        body {
            background: #f2f2f2;
        }

        .wrapper .sidebar {
            background: #205c33;
            position: fixed;
            top: 0;
            left: 0;
            width: 260px;
            height: 100%;
            padding: 20px 0;
            transition: all 0.5s ease;
        }

        .wrapper .sidebar .profile {
            margin-bottom: 30px;
            text-align: center;
        }

        .wrapper .sidebar .profile img {
            display: block;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 0 auto;
        }

        .wrapper .sidebar .profile h3 {
            color: #ffffff;
            margin: 10px 0 5px;
        }

        .wrapper .sidebar .profile p {
            color: rgb(206, 240, 253);
            font-size: 14px;
        }

        .wrapper .sidebar ul li a {
            display: block;
            padding: 13px 30px;
            color: rgb(241, 237, 237);
            font-size: 15px;
            position: relative;
            margin-left: -3px;
        }

        .wrapper .sidebar ul li a .icon {
            color: #dee4ec;
            width: 30px;
            display: inline-block;
        }

        .wrapper .sidebar ul li a:hover,
        .wrapper .sidebar ul li a.selected {
            color: #0c7db1;

            background: white;
            border-right: 2px solid #3aa85d;
        }

        .wrapper .sidebar ul li a:hover .icon,
        .wrapper .sidebar ul li a.active .icon {
            color: #0c7db1;
        }

        .wrapper .sidebar ul li a:hover:before,
        .wrapper .sidebar ul li a.active:before {
            display: block;
        }

        .wrapper .section {
            width: calc(100% - 225px);
            margin-left: 225px;
            transition: all 0.5s ease;
        }

        .wrapper .section .top_navbar {
            background: #f2f2f2;
            height: 60px;
            display: flex;
            align-items: center;
            margin-left: 67px;
            margin-top: 25px;

        }

        .wrapper .section .top_navbar .hamburger a {
            font-size: 28px;
            color: #f4fbff;
        }

        .wrapper .section .top_navbar .hamburger a:hover {
            color: #a2ecff;
        }

        body.active .wrapper .sidebar {
            left: -225px;
        }

        body.active .wrapper .section {
            margin-left: 0;
            width: 100%;
            height: 100%;
        }


        /* Add your desired styling for the active menu item here */
        .sidebar-menu li.active {
            background-color: #d7dce48a;
            /* other styles... */
        }

        input[type=file] {
            width: 220px;
            max-width: 100%;
            color: #444;
            padding: 5px;
            background: #fff;
            border: 1px solid #555;
            height: 33px;
        }

        .custom-file-upload {
            border: 1px solid #ccc;
            display: inline-block;
            padding: 6px 12px;
            cursor: pointer;
        }

        #sales_txt_file,
        #generate_pof_sof {
            display: none;
        }

        .sidebar-divider {
            border: none;
            height: 1px;
            background-color: rgb(107, 142, 35);
            margin: 20px 15px;
            width: auto;
        }
    </style>
</head>

<body>

    <!-- modal here----------------------------------------------------------------------------------------- -->
    <div class="modal fade text-left" id="progress_modal" tabindex="-1" role="dialog" aria-labelledby="modal"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-xl custom-width-modal" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="report_label"> </h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <i data-feather="x"></i>
                    </button>
                </div>
                <div class="modal-body" id="report_body">
                    <div class="col-md-12 pdd_1"></div>
                    <div class="row" style="padding-left: 18px;">
                        <label class="col-md-12 pdd" style="margin:0px">
                            <img src="<?php echo base_url(); ?>assets/icon_index/upload_im.PNG" width="30">
                            PROCESSING DATA
                            &nbsp;&nbsp;<img src="<?php echo base_url(); ?>assets/img/giphy.gif" height="20">
                        </label>
                        <strong><span class="col-md-7 pdd fnt13 status">Status: 0% Complete </span></strong>
                        <span class="col-md-3 pdd fnt13 toright rowprocess" style="margin-left: 186px;"> 0</span>
                    </div>
                    <div class="progress row" style="height: 26px;margin:0px; padding:2px;">
                        <div id="percontent" class="progress progress-bar progress-bar-pimary" role="progressbar"
                            aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                        </div>
                    </div>
                    <strong><span class="col-md-12 pdd fnt13 filename"></span></strong>

                </div>
                <div class="row" id="button">
                </div>
            </div>
            <div class="modal-footer" id="footer_modal">

            </div>
        </div>
    </div>
    </div>


    <!-- end of modal here----------------------------------------------------------------------------------------- -->


    <div class="wrapper">
        <div class="section">
            <div class="top_navbar">
                <div class="row">
                    <label style="margin-right: 5px;">Store:</label>
                    <select style="height : 38px;" id="store_id" class="selectpicker" data-live-search="true"
                        onchange="filter_store()">
                        <?php
                        $store = array();
                        foreach ($database_list as $db) {
                            if (!in_array($db['store'], $store) && $db['store'] != '') {
                                array_push($store, $db['store']);
                                echo '<option value="' . $db['store'] . '">' . $db['store'] . '</option>';
                            }
                        }

                        ?>
                    </select>

                    <label style="margin-left: 12px; margin-right: 5px;">Server:</label>
                    <select style="height : 38px;" id="database_id" class="selectpicker" data-live-search="true"
                        onchange="filter_database()">
                        <?php
                        foreach ($database_list as $db) {
                            if (strstr($db['db_name'], 'POS')) {
                                echo '<option value="' . $db['db_id'] . '">' . $db['db_name'] . '</option>';
                            }
                        }

                        ?>
                    </select>
                    <label for="date_from" id="date_from_label"
                        style="margin-left: 15px; margin-right: 5px;">From:</label>
                    <input type="date" id="date_from" name="date" style="font-family:sans-serif;"
                        onchange="validateDates()">
                    <label for="date_to" id="date_to_label" style="margin-left:15px; margin-right: 5px;">To:</label>
                    <input type="date" id="date_to" name="date" style="font-family:sans-serif; margin-right: 10px;"
                        onchange="validateDates()">
                    <button type="button" class="btn btn-success" data-dismiss="modal"
                        style="margin-left: 24px; height:44px; width:160px;" onclick="load_items()">
                        <i class="bx bx-x d-block d-sm-none"></i>
                        <span class="d-none d-sm-block ">Run Middleware</span>
                    </button>
                </div>

            </div>

            <input id="sales_txt_file" type="file" onchange="revert_color('sales_txt_file')" name="files[]"
                multiple="multiple" style="margin-left: 286px; margin-top: 10px;" />

            <div id="body_div" style="padding: 30px; overflow-y: auto;">

            </div>

        </div>
        <!--Top menu -->
        <div class="sidebar">
            <div class="profile">
                <svg class="svg-icon"
                    style="width: 100px; height: 100px;vertical-align: middle;fill: currentColor;overflow: hidden;"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M194.74 471.86C212.93 326.93 328 211.92 472.87 193.72v-81c-189.59 18.81-340.33 169.54-359.16 359.14zM553.13 193.72c144.92 18.2 259.94 133.21 278.13 278.14h81c-18.8-189.6-169.54-340.33-359.13-359.16zM472.87 830.25C328 812.05 212.93 697 194.74 552.12h-81c18.83 189.59 169.57 340.32 359.16 359.16zM831.26 552.12C813.07 697 698.05 812.05 553.13 830.25v81c189.59-18.84 340.33-169.57 359.16-359.16z"
                        fill="#f2f2f2" />
                    <path
                        d="M83.299767 139.052228m26.664997-26.664996l3.422397-3.422397q26.664997-26.664997 53.329993 0l87.129698 87.129697q26.664997 26.664997 0 53.329994l-3.422397 3.422397q-26.664997 26.664997-53.329994 0l-87.129697-87.129698q-26.664997-26.664997 0-53.329993Z"
                        fill="#f2f2f2" />
                    <path
                        d="M140.066178 941.686112m-26.664997-26.664997l-3.422396-3.422397q-26.664997-26.664997 0-53.329993l87.129697-87.129698q26.664997-26.664997 53.329994 0l3.422396 3.422397q26.664997 26.664997 0 53.329993l-87.129697 87.129698q-26.664997 26.664997-53.329994 0Z"
                        fill="#f2f2f2" />
                    <path
                        d="M942.691576 884.927357m-26.664997 26.664997l-3.422396 3.422397q-26.664997 26.664997-53.329994 0l-87.129697-87.129698q-26.664997-26.664997 0-53.329993l3.422396-3.422397q26.664997-26.664997 53.329994 0l87.129697 87.129698q26.664997 26.664997 0 53.329993Z"
                        fill="#f2f2f2" />
                    <path
                        d="M885.932943 82.293666m26.664997 26.664997l3.422397 3.422397q26.664997 26.664997 0 53.329993l-87.129698 87.129698q-26.664997 26.664997-53.329993 0l-3.422397-3.422397q-26.664997-26.664997 0-53.329993l87.129698-87.129698q26.664997-26.664997 53.329993 0Z"
                        fill="#f2f2f2" />
                    <path d="M513 511.99m-160.53 0a160.53 160.53 0 1 0 321.06 0 160.53 160.53 0 1 0-321.06 0Z"
                        fill="#f2f2f2" />
                </svg>
                <h4 style="color: #f2f2f2;">CAS MIDDLEWARE</h4>
            </div>
            <!--profile image & text-->

            <ul class="sidebar-menu" data-widget="tree">

                <li class="active" onclick="gl_dashboard()">
                    <a href="#">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span> Dashboard</span>
                    </a>
                </li>
                <li onclick="sales_consolidator_ui()">
                    <a href="#">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span>Sales Consolidator</span>
                    </a>
                </li>
                <li onclick="pof_sof_ui()" id="generate_pof_sof">
                    <a href="#">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span>POF/SOF</span>
                    </a>
                </li>
                <li onclick="gl_middleware_ui()">
                    <a href="#">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span>G/L Middleware</span>
                    </a>
                </li>
                <li onclick="transfers_ui()">
                    <a href="#">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span>Transfers</span>
                    </a>
                </li>
                <hr class="sidebar-divider">
                <li>
                    <a href="http://172.16.43.148/cas-separator/" target="_blank">
                        <i class="fa fa-cog" style="margin-right: 5px;"></i> <span>CAS Separator</span>
                    </a>
                </li>
            </ul>
        </div>
        <!--menu item-->
    </div>


    </div>

    <div id="js_div"></div>

    <script>
        $("#js_div").load('<?php echo base_url(); ?>BIR_ctrl/load_main_js');

        // Redirect to dashboard page when page reloaded or refreshed
        window.onload = function () {
            gl_dashboard();
        };

        function gl_dashboard() {
            var loader = '<center><img src="<?php echo base_url(); ?>assets/img/preloader.gif" style="padding-top:120px; padding-bottom:120px;"></center>';
            $('#body_div').html(loader);
            var url = '<?php echo base_url(); ?>BIR_ctrl/gl_dashboard';
            // Load the content from the specified URL
            $("#body_div").load(url, function () {
                // Inject the weather widget script
                var script = document.createElement('script');
                script.src = 'https://weatherwidget.io/js/widget.min.js';
                document.body.appendChild(script);
            });
        }

        function sales_consolidator_ui() {
            var loader = ' <center><img src="<?php echo base_url(); ?>assets/img/preloader.gif" style="padding-top:120px; padding-bottom:120px;"></center>';
            $('#body_div').html(loader);
            $("#body_div").load('<?php echo base_url(); ?>BIR_ctrl/sales_consolidator_ui');
        }

        function pof_sof_ui() {
            var loader = ' <center><img src="<?php echo base_url(); ?>assets/img/preloader.gif" style="padding-top:120px; padding-bottom:120px;"></center>';
            $('#body_div').html(loader);
            $("#body_div").load('<?php echo base_url(); ?>BIR_ctrl/pof_sof_ui');
        }

        function gl_middleware_ui() {
            var loader = ' <center><img src="<?php echo base_url(); ?>assets/img/preloader.gif" style="padding-top:120px; padding-bottom:120px;"></center>';
            $('#body_div').html(loader);
            $("#body_div").load('<?php echo base_url(); ?>BIR_ctrl/gl_middleware_ui');
        }


        function transfers_ui() {
            var loader = ' <center><img src="<?php echo base_url(); ?>assets/img/preloader.gif" style="padding-top:120px; padding-bottom:120px;"></center>';
            $('#body_div').html(loader);
            $("#body_div").load('<?php echo base_url(); ?>BIR_ctrl/transfers_ui');
        }
    </script>
</body>

</html>