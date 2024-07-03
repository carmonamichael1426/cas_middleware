<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>DATA UPLOAD</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="<?= base_url('assets/css/datatables.min.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= base_url('assets/css/googleapis.css') ?>" rel="stylesheet" type="text/css" />
    <link rel="<?= base_url('assets/css/sweetalert.css') ?>">
    <!--imported -->
    <link href="<?= base_url('assets/css/site.min.css') ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/progress_bar/css/bootstrap.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/css/font-awesome.css') ?>" rel="stylesheet">
    <script src="<?= base_url('assets/progress_bar/css/bootstrap-dialog.css') ?>"></script>
    <link href="<?= base_url('assets/progress_bar/css/custom.css" ?v2="') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/css/bootstrap-dialog.css') ?>" rel="stylesheet" type="text/css" />
    <link href="<?= base_url('assets/progress_bar/css/bootstrap-datetimepicker.css?ts=') ?><?= time() ?>&quot;" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/css/dormcss.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/plugins/icheck-1.x/skins/square/blue.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/js/jquery-ui/jquery-ui.css') ?>" rel="stylesheet" />
    <link href="<?= base_url('assets/progress_bar/alert/css/alert.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/alert/themes/default/theme.css') ?>" rel="stylesheet">
    <link href="<?= base_url('assets/progress_bar/css/extendedcss.css?ts=') ?><?= time() ?>&quot;" rel="stylesheet">
    <script src="<?= base_url('assets/progress_bar/js/jquery-1.10.2.js?2') ?>"></script>
    <script src="<?= base_url('assets/progress_bar/js/bootstrap.min.js?2') ?>"></script>
    <script src="<?= base_url('assets/progress_bar/js/bootstrap-dialog.js?2') ?>"></script>

    <script src="<?= base_url('assets/progress_bar/js/jquery.metisMenu.js?2') ?>"></script>
    <script src="<?= base_url('assets/progress_bar/js/ebsdeduction_function.js?') ?><?php echo time() ?>"></script>
    <script src="<?= base_url('assets/js/sweetalert.js') ?>"></script>
    <script src="<?= base_url('assets/js/sweetalert2.all.min.js') ?>"></script>
    <!-- end of imported -->
</head>

<div class="col-md-12" style="margin-top:0%;padding:3px;">
    <div class="col-md-12 pdd_1"></div>
    <div class="row" style="padding-left: 18px;">
        <label class="col-md-12 pdd" style="margin:0px">
            <img src="<?= base_url('assets/icon_index/upload_im.PNG') ?>" width="30">
            PROCESSING DATA
            &nbsp;&nbsp;<img src="<?= base_url('assets/img/giphy.gif') ?>" height="20">
        </label>
        <span class="col-md-7 pdd fnt13 status">Status: 0% Complete </span>
        <span class="col-md-4 pdd fnt13 toright rowprocess"> 0</span>
    </div>
    <div class="progress row" style="height: 26px;margin:0px; padding:2px;">
        <div id="percontent" class="progress-bar progress-bar-pimary" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
        </div>
    </div>
    <span class="col-md-12 pdd fnt13 empname">Employee: </span>
    <span class="col-md-12 pdd fnt13 filename"></span>

</div>

<script>
    $(document).ready(function() {
        function updateProgressBar() {
            $.ajax({
                url: '<?= base_url('CAS_ctrl/run_gl_entry_middleware') ?>',
                method: 'GET',
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                }
            });
        }

        updateProgressBar();
    });
</script>