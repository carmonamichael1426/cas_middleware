<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 

$route['default_controller']                                = 'BIR_ctrl/dashboard';
$route['404_override'] 										= '';
$route['translate_uri_dashes'] 								= FALSE;
$route['(:any)']                                            = 'mpdi/Mpdi_ctrl/home';


//MPDI===============================================================================================================

$route['home']                                             = 'Mpdi_ctrl/home';
$route['mpdi_ui']                                          = 'Mpdi_ctrl/mpdi_ui';
$route['search']                                           = 'Mpdi_ctrl/search';
$route['users']                                            = 'Mpdi_ctrl/usersPage';
$route['register']                                         = 'Mpdi_ctrl/registerClientAccount';
$route['userlog']                                          = 'Mpdi_ctrl/loginPage';
$route['login']                                            = 'Mpdi_ctrl/login';

//MPDI LOG===================================================================================================================

$route['loggedhome']                                       = 'Mpdi_log_ctrl/loggedhome';






/*mms==========================*/
$route['mms/dashboard_ui'] 	 								= 'Mms_ctrl/dashboard';
$route['mms/reorder_ui']									= 'Mms_ctrl/reorder_report_';

$route['mms/register']                                      = 'super_ctrl/registerUser';
$route['mms/users']                                      	= 'super_ctrl/users';

$route['mms/addkey_content'] 								= 'super_ctrl/addkey_content';
$route['mms/editkey_content'] 								= 'super_ctrl/editkey_content';
$route['mms/saveKey'] 										= 'super_ctrl/saveKey';

$route['mms/edituser_content'] 								= 'super_ctrl/edituser_content';
$route['mms/update'] 										= 'super_ctrl/updateUser';
