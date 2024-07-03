<?php

session_start();

require_once("../db/dbcon.php");
require_once("../db/dbcon2.php");

@$id = $_GET['id'];

switch ($id) {
	// Employee's Credits --------------------------------------------------------- EMPLOYEE'S CREDITS
	case 'EC_postledger': 
		$template = "EmpCredit/ec_postledger.php";
		break;
	case 'EC_debtors_list': 
		$template = "EmpCredit/debtors_list.php";
		break;
	case 'debtors_list': 
		$template = "EmpCredit/debtors_list.php";
		break;
	case 'ammort_sched': 
		$template = "EmpCredit/ammort_sched.php";
		break;
	case 'master_list': 
		$template = "EmpCredit/master_list.php";
		break;
	case 'display_ledgers': 
		$template = "EmpCredit/display_ledger.php";
		break;
	case 'filter_transactions': 
		$template = "EmpCredit/filter_transactions.php";
		break;



	/* CASH ADVANCE II  ------------------------------------------------------------ CASH ADVANCE II */
	case 'ca_regular':
		$template = "CashAdvance/ca_regular_amortization.php";
		$ca_amortize = "active";
		break;

	case 'ca_monitoring':
		$template = "CashAdvance/ca_monitoring.php";
		$monitoring = "active";
		break;

	case 'ca_special':
		$template = "CashAdvance/ca_special_amortization.php";
		$ca_amortize = "active";
		break;

	case 'ca_finalization';
		$template = "CashAdvance/ca_finalization.php";
		$finalization = "active";
		break;

	//manual input special balance..
	case 'ca_balance';  
		$template = "CashAdvance/ca_special_balance.php";
		$ca_balance = "active";
		break;

		


	// Company Housing Program ----------------------------------------------------- COMPANY HOUSING PROGRAM

	case 'mhhp_homepartners':
		$template 		= "Mhhp/mhhp_homepartners.php";
		$homepartners 	= "active";
		$jscss_prop 	= 'mhhp';
		break;

	case 'mhhp_summary':
		$template 		= "Mhhp/mhhp_deduction-page.php";
		$deduction 		= "active";
		$jscss_prop 	= 'mhhp';
		break;

	case 'mhhp_hbt-homepartners':
		$template 		= "Mhhp/mhhp_hbt-homepartners.php";
		$homepartners 	= "active";
		$jscss_prop 	= 'mhhp';
		break;

	case 'hbt_summary':
		$template 		= "Mhhp/mhhp_hbt-deductionpage.php";
		$deduction 		= "active";
		$jscss_prop 	= 'mhhp';
		break;

	case 'mhhp_site-list':
		$template 		= "Mhhp/mhhp_site-list.php";
		$homepartners	= "active";
		$jscss_prop 	= 'mhhp';
		break;

	case 'site_summary':
		$template 		= "Mhhp/mhhp_site-deductionpage.php";
		$deduction 		= "active";
		$jscss_prop 	= 'mhhp';
		break;








	// Employee Allowance Module ------------------------------------------------------- EMPLOYEE ALLOWANCE MODULE
	case 'eam_hm':
		$template = "EmployeeAlllowancemodule/eam_hm.php";	
		break;
	case 'eam_reLD':
		$template = "EmployeeAlllowancemodule/eam_relSE.php";
		break;
	case 'eam_hisTY':
		$template = "EmployeeAlllowancemodule/eam_trvhistory.php";
		break;
	case 'eam_LIQUIDATE':
		$template = "EmployeeAlllowancemodule/eam_liquidated.php";
		break;
	case 'eam_liQDATA':
		$template = "EmployeeAlllowancemodule/eam_liQDATA.php";
		break;
	case 'eam_REPORTS':
		$template = "EmployeeAlllowancemodule/eam_reportsMONITORING.php";
		break;
	case 'eam_OTH_acc':
		$template = "EmployeeAlllowancemodule/eam_other_acc.php";
		break;

	// UNIFORMS MODULE ------------------------------------------------------- UNIFORMS MODULE
	case 'uni_accounting': 
		$template = "uniforms/uni_.php";
		break;		
	// ---------------------------------------------------------------------------------------



	/* EMPLOYEE CREDITS -------------------------------------------------------------------- */
	case 'ec_amortize':
		$template = "EmpCredit/ec_amortization-page.php";
		$ec_amrotize = "active";
		break;

	case 'ec_amortNesco':
		$template = "EmpCredit/ec_amortNesco.php";
		$ec_amrotize = "active";
		break;

	case 'ec_nesdeduct':
		$template = "EmpCredit/ec_nesdeduction.php";
		$ec_nesdeduct = "active";
		break;

	case 'ec_monitoring':
		$template = "EmpCredit/ec_creditmonitoring.php";
		$monitoring = "active";
		break;

	case 'ec_monitorNesco':
		$template = "EmpCredit/ec_monitoringNesco.php";
		$monitoring = "active";
		break;

	case 'ec_balances':
		$template = "EmpCredit/ec_balances.php";
		$ec_balance = "active";
		break;

	case 'ec_confirm':
		$template = "EmpCredit/ec_confirm.php";
		$ec_confirm = "active";
		break;
	
	case 'ec_batch':
		$template = "EmpCredit/ec_confirm-batch.php";
		$ec_confirm = "active";
		break;

	case 'ec_reports':
		$template = "EmpCredit/ec_reports.php";
		$ec_reports = "active";
		break;

	case 'ec_nescoreports':
		$template = "EmpCredit/ec_nescoreports.php";
		$ec_reports = "active";
		break;


	case 'ec_balances_nesco':
		$template = "EmpCredit/ec_balances_nesco.php";
		$ec_balance = "active";
		break;

	case 'ec_ajax':
		$template = "EmpCredit/ec_actg-ajaxtable.php";
		//$ec_amrotize = "active";
		break;
	/* ----------------------------------------------------------------------------------------- */



	/* AR BALANCES ----------------------------------------------------------------------------- */
	case 'ar_balances':
		$template = "CashAdvance/ar_balances.php";
		$ARbalances = "active";
		break;
	/* ----------------------------------------------------------------------------------------- */


	/* DORMITORY ----------------------------------------------------------------------- */
	case 'dormMasterFile':
		$template = "Dormitory/dormitory_masterfile.php";
		$masterfile = "active";
		break;

	case 'dormSummary':
		$template = "Dormitory/dormitory_summary.php";
		$summary = "active";
		break;
		
	case 'dormNesco':
		$template = "Dormitory/nesco_dormitory_deduction.php";
		$nesco = "active";
		break;

	case 'dormPromo':
		$template = "Dormitory/promo_dormitory_deduction.php";
		$nesco = "active";
		break;
	/* ----------------------------------------------------------------------------------------- */

	/* CSF QUEARY ------------------------------------------------------------------------------ */
	case 'cfs_amortozationsetup':
		$template = "Customerfinancialservice/cfs_amortization-setup.php";
		$amortize = "active";
		break;
	case 'cfs_monitoring':
		$template = "Customerfinancialservice/cfs_financing-masterfile.php";
		$monitoring = "active";
		break;
	case 'cfs_jvsetup':
		$template = "Customerfinancialservice/cfs_jvsetup.php";
		$jvsetup = "active";
		break;
	case 'fin_checkbal':
		$template = "Customerfinancialservice/checkbal.php";
		$checkbal = "active";
		break;
	/* ----------------------------------------------------------------------------------------- */






	/* MEAL ALLOWANCES ------------------------------------------------------------------------- */
	case 'aml_budget-request':
		$template = "Empmealallowance/aml_budgetreqlist.php";
		$budget = "active";
		break;

	case 'aml_budget-released':
		$template = "Empmealallowance/aml_budgetrellist.php";
		$budget = "active";
		break;


	/* ----------------------------------------------------------------------------------------- */














	case 'upld_CSV_inn':
		$template = "txt_csv_uploading.php";	
		break;
	case 'ABOUT':
		$template = "aboutus.php";
		break;
	case 'txt_genImm':
		$template = "txt_data_imm.php";
		break;
	default: 
	    $template = "home.php";
	    $title = "Home";
	    break;
}

@include("template/header.php");
@include("template/body.php");
@include("template/footer.php");

?>


