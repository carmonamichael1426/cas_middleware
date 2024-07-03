<!-- <?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Maintenance | EBM</title>
	<link rel="shortcut icon" type="image/png" href="assets/dist/img/latest.png"/>
	<link rel="bookmark" href="assets/dist/img/latest.png"/>

	<style type="text/css">

	::selection { background-color: #E13300; color: white; }
	::-moz-selection { background-color: #E13300; color: white; }

	body, html {
		height: 100%;
		margin: 0;
		font: 400 15px/1.8 "Lato", sans-serif;
		color: #777;
	}

	.bgimg-1, .bgimg-2, .bgimg-3 {
		position: relative;
		opacity: 0.65;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;

	}
	
	.bgimg-1 {
		background-image: url(assets_admin/img/maintenance.jpg);
		height: 100%;
	}

	.caption {
		position: absolute;
		left: 0;
		top: 30%;
		width: 100%;
		text-align: center;
		color: #000;
	}

	.caption span.border {
		background-color: #111;
		color: #fff;
		padding: 18px;
		font-size: 25px;
		letter-spacing: 10px;
	}

	h3 {
		letter-spacing: 5px;
		text-transform: uppercase;
		font: 20px "Lato", sans-serif;
		color: #111;
	}
	</style>
</head>
<body>
	<div class="bgimg-1">
		<div class="caption">
			<span class="border">System is under maintenance.</span><br>
			<span class="border">This may take a while.</span><br>
			<span>
				<a class="btn btn-danger" href="javascript:history.back()">Go Back</a>
			</span>
		  </div>
	</div>
</body>
</html> -->

<!DOCTYPE html>
<html lang="id" dir="ltr">

<head>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
     <meta name="description" content="" />
     <meta name="author" content="" />

     <!-- Title -->
     <title>Sorry, This Page Can&#39;t Be Accessed</title>
     <link rel="stylesheet" href="<?php echo base_url();?>assets/css/font-awesome.css" />
     <link rel="stylesheet" href="<?php echo base_url();?>assets/css/bootstrap.min.css" integrity="" crossorigin="anonymous" />
     <style type="text/css">
          #footer{
               text-align: center;
               position: fixed;
               margin-left: 530px;
               bottom: 0px
          }
     </style>
</head>

<body class="bg-dark text-white py-5">
     <div class="container py-5">
          <div class="row">
               <div class="col-md-2 text-center">
                    <p><i class="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 400</p>
               </div>
               <div class="col-md-10">
                    <h3>OPPSSS!!!! Sorry...</h3>
                    <p>Maintenance Break<br/>This may take a while...</p>
                    <a class="btn btn-danger" href="javascript:history.back()">Go Back</a>
               </div>
          </div>
     </div>

     <div id="footer" class="text-center">
          2020 © EC Shop. ALL Rights Reserved.
     </div>
</body>

</html>