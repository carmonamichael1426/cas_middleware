<?php
/**
 * 
 */
class simplify extends CI_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('session');
        //$this->db2 = $this->load->database('hr', TRUE);
        //$this->db3 = $this->load->database('cons', TRUE);
    }


    function populate_header_table($table_id,$header)
    {

       $html='
                <table id="'.$table_id.'" class="table table-striped table-bordered dataTable no-footer" style="background-color: rgb(5, 68, 104);">
                    <thead style="text-align: center;color:white;">
                        <tr>';
                                for($a=0;$a<count($header);$a++)
                                {
                                    $html.='<th style="text-align:center;">'.$header[$a].'</th>';
                                }                    

       $html.='         </tr>
                    </thead>
                    <tbody> 
            ';

        return $html;    
    }





    function populate_table_rows($rows,$style,$tr_class)
    {
        $html='<tr class="'.$tr_class.'" >';
            for($b=0;$b<count($rows);$b++)
            {              
                $html.=' 
                         <td style="'.$style[$b].'">'.$rows[$b].'</td>    
                       ';  
            }
        $html.='</tr>';

        return $html;        
    }


    // function get_employee_details($emp_id)
    // {
    //     $query=$this->db3->query("
    //                                 SELECT 
    //                                        * 
    //                                 FROM
    //                                        pis.employee3 as emp
    //                                 JOIN 
    //                                        pis.applicant as app on app.app_id = emp.emp_id        
    //                                 WHERE
    //                                        emp.emp_id='".$emp_id."'
    //                             ");
    //     return $query->result_array();

    // }


    // function get_employee_details_byPCC($payroll_no)
    // {
    //     $query=$this->db3->query("
    //                                 SELECT 
    //                                        * 
    //                                 FROM
    //                                        pis.employee3
    //                                 WHERE
    //                                       payroll_no='".$payroll_no."'
    //                             ");
    //     return $query->result_array();
    // }

    // function custom_query($SELECT,$FROM,$INNER_JOIN,$WHERE,$ORDER_BY)
    // {
    //     $query=$this->db2->query($SELECT.$FROM.$INNER_JOIN.$WHERE.$ORDER_BY);
    //     return $query->result_array();
    // }



    // public function get_cc_group()
    // {
    //       /*return $this->db2->select('g.cc_id, g.cc_group_name')->from('cc_group g')
    //                   ->join('cc_group_access ga', 'ga.cc_id = g.cc_id')                  
    //                   ->group_by('g.cc_id')
    //                   ->order_by('cc_group_name', 'asc')
    //                   ->get()->result_array();*/

    //      $query=$this->db2->query("
    //                                 SELECT 
    //                                        g.cc_id,
    //                                        g.cc_group_name
    //                                 FROM 
    //                                        cc_group AS g
    //                                 INNER JOIN 
    //                                        cc_group_access as ga  on ga.cc_id=g.cc_id
    //                                 GROUP BY 
    //                                        g.cc_id  
    //                                 ORDER BY 
    //                                       cc_group_name ASC                
    //                               ");  
    //      return $query->result_array();           
    // } 


    // public function get_company_name()
    // {
    //     $query = $this->db2->query("
    //                                     SELECT
    //                                            *
    //                                     FROM
    //                                            pis.locate_company
    //                                     where
    //                                           status = 'active';

    //                                ");
    //     return $query->result_array();
    // }


    // public function get_pcc_byGroup($gid)
    // {
    //   /*return $this->db->select('pcc_code, pcc_name')->from('cc_pcc')
    //               ->where('cc_id', $gid)
    //               ->order_by('pcc_code', 'asc')
    //               ->get()->result_array();*/

    //   $query=$this->db2->query(" 
    //                                 SELECT 
    //                                        pcc_code,
    //                                        pcc_name   
    //                                 FROM 
    //                                        cc_pcc        
    //                                 WHERE      
    //                                        cc_id='".$gid."'
    //                                 ORDER BY   
    //                                        pcc_code ASC 
    //                            ");            
    //   return $query->result_array();
    // }


    // public function get_department_name($company_code,$bunit_code)
    // {
    //     $query = $this->db2->query("
    //                                   SELECT
    //                                            *
    //                                   FROM
    //                                           pis.locate_department
    //                                   where 
    //                                           company_code = '".$company_code."' 
    //                                      AND 
    //                                           bunit_code   = '".$bunit_code."'            

    //                                ");
    //     return $query->result_array();
    // }


    //  public function get_bunit_name($company_code,$and)
    // {
    //     $query = $this->db2->query("
    //                                   SELECT
    //                                            *
    //                                   FROM
    //                                           pis.locate_business_unit
    //                                   where 
    //                                           company_code = '".$company_code."'".$and);
    //     return $query->result_array();
    // }




    // public function get_cutoff($company_code,$bunit_code)
    // {
    //     $query=$this->db2->query(" 
    //                                 SELECT 
    //                                         *
    //                                   FROM  
    //                                        pis.cut_off
    //                                   WHERE     
    //                                        cc ='".$company_code."' 
    //                                    AND     
    //                                        bc ='".$bunit_code."'
    //                              ");
    //     return $query->result_array();
    // }

    // public function get_ecic_users($emp_id)
    // {
    //     $query = $this->db2->query("
    //                                     SELECT 
    //                                            *
    //                                     FROM 
    //                                           tbl_other_ded_users
    //                                     WHERE 
    //                                           emp_id='".$emp_id."'      
    //                                ");

    //     return $query->result_array();
    // }


    public function check_session()
    {
        $emp_id = $this->session->userdata('emp_id');
        if(!empty($emp_id))
        {
            $emp_arr = $this->get_ecic_users($emp_id);
            if(!empty($emp_arr))
            {
                foreach($emp_arr as $emp)
                {
                   return $emp['usertype'];                  
                }
            }
            else 
            {
                header("Location: /hrms/employee/index.php");
            }   
        }
        else 
        {
            //session_destroy();
            header("Location: /hrms/employee/index.php");
        }
    }


    // function search_emp($emp)
    // {
    //     $query = $this->db2->query("
    //                                     SELECT 
    //                                            * 
    //                                     FROM 
    //                                            pis.employee3 
    //                                     WHERE 
    //                                            name like '%".$emp."%'    
    //                                         OR 
    //                                            emp_id like  '%".$emp."%'

    //                                     limit 10;      

    //                                ");     

    //     return $query->result_array();
    // }

}    