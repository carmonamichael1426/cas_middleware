<?php

class BIR_mod extends CI_Model
{
     function __construct()
     {
          parent::__construct();
          $this->nav = $this->load->database('navision', TRUE);
     }

     function get_last_upload($table, $db_id, $date)
     {
          try {
               $query = $this->db->select()
                    ->where('db_id', $db_id)
                    ->like('date_', $date, 'right')
                    ->order_by('sales_id', 'DESC')
                    ->limit(1)
                    ->get($table);

               return $query->row_array();
          } catch (Exception $e) {
               $e->errorMessage();
          }
     }

     function get_connection($db_id, $store)
     {
          $this->db->select('*');
          $this->db->from('database as db');
          if ($db_id != '') {
               $this->db->where('db_id', $db_id);
          }

          if ($store != '') {
               $this->db->where('store', $store);
          }

          $query = $this->db->get();
          return $query->result_array();
     }

     function get_store_location($store_no)
     {
          $this->db->select('*');
          $this->db->from('database as db');
          $this->db->where('db.store_location !=', '');
          $this->db->where('db.store_no', $store_no);
          $this->db->group_by('db.store_no');
          $query = $this->db->get();
          return $query->result_array();
     }

     function select_native($query_string)
     {
          $query = $this->nav->query($query_string);
          return $query->result_array();
     }

     function get_vendor_details($vendor_code)
     {
          $this->nav->select('*')
               ->from('nav_vendor')
               ->where('vendor_code', $vendor_code)
               ->where('type_', 'CON SI');
          $query = $this->nav->get();
          return $query->result_array();
     }


     function select_nav($table, $select, $where, $group_by)
     {
          $this->nav->select($select);
          $this->nav->from($table);
          $this->nav->where($where);
          if ($group_by != '') {
               $this->nav->group_by($group_by);
          }
          $query = $this->nav->get();
          return $query->result_array();
     }


     function select_mpdi($table, $select, $where)
     {
          $this->db->select($select);
          $this->db->from($table);
          $this->db->where($where);
          $query = $this->db->get();
          return $query->result_array();
     }


     //function check_nav_item_masterfile($item_code,$description,$extended_description,$vendor_no,$item_division,$item_department_code,$item_group_code,$no_stock_posting)
     function check_nav_item_masterfile($column_data)
     {
          $this->nav->select('*');
          $this->nav->from('nav_item_masterfile');
          $this->nav->where($column_data);
          // $this->nav->where('item_code',$item_code);           
          // $this->nav->where('description',$description);         
          // $this->nav->where('extended_description',$extended_description);
          // $this->nav->where('vendor_no',$vendor_no);           
          // $this->nav->where('item_division',$item_division);       
          // $this->nav->where('item_department_code',$item_department_code);
          // $this->nav->where('item_group_code',$item_group_code);     
          // $this->nav->where('no_stock_posting',$no_stock_posting);    
          $query = $this->nav->get();


          return $query->result_array();
     }

     function get_nav_accumulated_sales_ledger_width_variance($db_id, $dateFrom, $dateTo)
     {
          $db_details = $this->get_connection($db_id, '');
          $store_code = $db_details[0]['store_no'];

          $this->nav->select('*,( ( (total_net_sales - vat_amount) + vat_amount ) - (cash_sales+card_sales+( ABS(remove_entry) - ABS(float_entry) ) ) ) as variance');
          $this->nav->from('nav_accumulated_sales_ledger');
          $this->nav->where('store_code', $store_code);
          $this->nav->where('date(acc_date) >=', $dateFrom);
          $this->nav->where('date(acc_date) <=', $dateTo);
          $this->nav->order_by('pos_terminal', 'asc');
          $this->nav->order_by('date(acc_date)', 'asc');

          $query = $this->nav->get();
          // var_dump($this->nav->last_query($query));
          return $query->result_array();
     }

     function get_nav_accumulated_sales_ledger_width_variance_monthly($db_id, $dateFrom, $dateTo)
     {
          $db_details = $this->get_connection($db_id, '');
          $store_code = $db_details[0]['store_no'];

          $this->nav->select('pos_terminal, sum(total_net_sales) as total_net_sales, 
          sum(vat_amount) as vat_amount, sum(no_item_sold) as no_item_sold, sum(cash_sales) as cash_sales, 
          sum(card_sales) as card_sales, sum(remove_entry) as remove_entry, sum(float_entry) as float_entry, 
          sum(vatable_sales) as vatable_sales, sum(vat_exempt_sales) as vat_exempt_sales, 
          sum(old_accumulated_sales) as old_accumulated_sales, sum(new_accumulated_sales) as new_accumulated_sales,
          ( ( (SUM(total_net_sales) - SUM(vat_amount)) + SUM(vat_amount) ) - (SUM(cash_sales)+SUM(card_sales)+(ABS(SUM(remove_entry)) - SUM(float_entry) ) ) ) 
          as variance');
          $this->nav->from('nav_accumulated_sales_ledger');
          $this->nav->where('store_code', $store_code);
          $this->nav->where('date(acc_date) >=', $dateFrom);
          $this->nav->where('date(acc_date) <=', $dateTo);
          $this->nav->group_by('pos_terminal');
          $this->nav->order_by('pos_terminal', 'asc');
          $this->nav->order_by('date(acc_date)', 'asc');

          $query = $this->nav->get();
          // echo($this->nav->last_query($query));
          return $query->result_array();
     }





     function insert_table_nav($table, $insert_data)
     {
          try {
               $this->nav->insert($table, $insert_data);
               return $this->nav->insert_id();
          } catch (Exception $e) {
               log_message("ERROR", __FUNCTION__ . " - " . $e->error_log);
          }
     }


     function insert_batch($table, $insert_data)
     {
          $this->nav->insert_batch($table, $insert_data);
          return $this->nav->insert_id();
     }


     function update_table_nav($table, $column_data, $column_filter)
     {
          $this->nav->set($column_data);
          $this->nav->where($column_filter);
          $this->nav->update($table);
     }

     function find_nav_accumulated_sales_ledger($pos_terminal, $acc_date, $store, $total_net_sales)
     {
          $this->nav->select('*');
          $this->nav->from('nav_accumulated_sales_ledger');

          if ($pos_terminal != '') {
               $this->nav->where('pos_terminal', $pos_terminal);
          }

          if ($acc_date != '') {
               $this->nav->where('acc_date', $acc_date);
          }

          if ($store != '') {
               $this->nav->where('store_code', $store);
          }

          if ($total_net_sales != '') {
               $this->nav->where('total_net_sales', $total_net_sales);
          }


          $query = $this->nav->get();
          return $query->result_array();
     }


     function get_nav_accumulated_sales_ledger($dateFrom, $dateTo, $filter, $store, $select, $pos_terminal)
     {
          if (in_array($filter, array('sum sales type', 'group by acc_date & store_code'))) {
               // $this->nav->select('sum('.$sales_type.') as '.$sales_type);
               $this->nav->select($select);
          } else {
               $this->nav->select('*');
          }


          $this->nav->from('nav_accumulated_sales_ledger');

          $this->nav->where('date(acc_date) >=', $dateFrom);
          $this->nav->where('date(acc_date) <=', $dateTo);

          if ($pos_terminal != '') {
               $this->nav->where('pos_terminal', $pos_terminal);
          }

          if ($store != '') {
               $this->nav->where('store_code', $store);
          }

          if ($filter == 'group by acc_date & store_code') {
               $this->nav->group_by('acc_date');
               $this->nav->group_by('store_code');
          }


          $query = $this->nav->get();
          // var_dump($this->nav->last_query($query));
          return $query->result_array();
     }

     public function get_db_id($db_id)
     {
          $this->db->where('db_id', $db_id);
          $query = $this->db->get('database');
          return $query->row();
     }

     function get_nav_account_masterfile($store)
     {
          $this->nav->select('*');
          $this->nav->from('nav_account_masterfile as mstfl');
          $this->nav->join('nav_formula as frm', 'frm.formula_id = mstfl.formula_id', 'INNER');
          $this->nav->where('mstfl.store', $store);
          $query = $this->nav->get();
          return $query->result_array();
     }


     function find_sales_entry($item_code, $vendor_no, $date_, $receipt_no, $transaction_no, $pos_terminal_no, $db_id, $line_no)
     {
          $this->nav->select('*');
          $this->nav->from('nav_tran_sales_bir_consolidated');
          $this->nav->where('item_code', $item_code);
          //$this->nav->where('vendor_no',$vendor_no);
          $this->nav->where('line_no', $line_no);
          //$this->nav->where('quantity',$quantity);
          $this->nav->where('date_', $date_);
          $this->nav->where('receipt_no', $receipt_no);
          $this->nav->where('transaction_no', $transaction_no);
          $this->nav->where('pos_terminal_no', $pos_terminal_no);
          $this->nav->where('db_id', $db_id);
          $query = $this->nav->get();
          return $query->result_array();
     }



     function get_bir_si_entry($dateFrom, $dateTo, $database_id)
     {


          $this->nav->select('*');
          $this->nav->from('nav_tran_sales_bir_consolidated as bir');
          $this->nav->join('nav_vendor as vendor', 'vendor.vendor_code = bir.vendor_no', 'inner');
          $this->nav->where('DATE(bir.date_) >=', $dateFrom);
          $this->nav->where('DATE(bir.date_) <=', $dateTo);
          $this->nav->where_in('bir.db_id', $database_id);
          $this->nav->where('vendor.type_', 'SI');
          $this->nav->order_by('bir.transaction_no', 'asc');
          $query = $this->nav->get();
          // MAO NI PANG PRINT UG QUERY
          // echo $this->nav->last_query();
          return $query->result_array();
     }


     function get_bir_si_entry_v2($database_id, $store, $acc_date, $pos_terminal)
     {
          $this->nav->select('*');
          $this->nav->from('nav_tran_sales_bir_consolidated as bir');
          $this->nav->join('nav_vendor as vendor', 'vendor.vendor_code = bir.vendor_no', 'inner');
          $this->nav->where('bir.db_id', $database_id);
          $this->nav->where('bir.store_no', $store);
          $this->nav->where('bir.date_', $acc_date);
          $this->nav->where('pos_terminal_no', $pos_terminal);
          $this->nav->where('vendor.type_', 'SI');
          $this->nav->order_by('bir.transaction_no', 'asc');
          $query = $this->nav->get();
          return $query->result_array();
     }



     function get_bir_si_entry_v4($database_id, $store, $acc_date, $total_net_sales, $no_item_sold, $vendor_type, $department)
     {
          // var_dump($database_id,$store,$acc_date,$total_net_sales,$no_item_sold,$vendor_type,$department);

          if ($database_id == 39) {
               $data_b = 'in (41,42,43,44,45,46,47,48,49,50,51,52,53,54,55)';
          } else {
               $data_b = 'in (' . $database_id . ')';
          }

          if ($vendor_type == 'SI') {
               $where = " = 'SI'  ";
               $where_main = " AND  bir.no_stock_posting = '0' )) ";
               $where_net = " AND  cons.no_stock_posting = '0')) ";
               $where_qty = " AND  con.no_stock_posting = '0' )) ";
          } else {
               $where = " != 'SI'  ";
               $where_main = ") OR (vendor.type_ = 'SI' AND bir.no_stock_posting = '1'))";
               // $where_net  = ") OR (vend.type_ = 'SI' AND cons.no_stock_posting = '1')";
               // $where_qty  = ") OR (ven.type_ = 'SI' AND con.no_stock_posting = '1')";
          }

          if ($vendor_type == 'SI') {


               $query = $this->nav->query("
                                      SELECT 
                                              *,sum(bir.net_amount) as total_net_amount,sum(bir.quantity) as total_qty
                                      FROM 
                                            nav_tran_sales_bir_consolidated AS bir
                                      INNER JOIN nav_vendor AS vendor ON vendor.vendor_code = bir.vendor_no
                                      WHERE
                                            bir.db_id           " . $data_b . "
                                            AND bir.store_no    = '" . $store . "'
                                            AND date(bir.date_) = '" . $acc_date . "'                                            
                                            AND ((vendor.type_    " . $where . $where_main . "
                                            
                                            AND (
                                                  SELECT
                                                         SUM(net_amount)
                                                    FROM 
                                                         nav_tran_sales_bir_consolidated as cons
                                                    INNER JOIN nav_vendor AS vend ON vend.vendor_code = cons.vendor_no     
                                                  WHERE
                                                         cons.db_id            " . $data_b . "
                                                    AND 
                                                         cons.store_no        = '" . $store . "'
                                                    AND
                                                         date(cons.date_)     = '" . $acc_date . "'                                                   
                                                    AND
                                                         ((vend.type_    " . $where . $where_net . "  
                                                      

                                                ) <= " . $total_net_sales . "
                                            AND 
                                               (
                                                  select
                                                         sum(quantity)
                                                  FROM 
                                                         nav_tran_sales_bir_consolidated as con
                                                  INNER JOIN nav_vendor AS ven ON ven.vendor_code = con.vendor_no
                                                  WHERE
                                                         con.db_id            " . $data_b . "
                                                    AND
                                                         con.store_no        = '" . $store . "'
                                                    AND 
                                                         date(con.date_)    = '" . $acc_date . "'                                                   
                                                    AND
                                                         ((ven.type_    " . $where . $where_qty . "    
                                                      

                                               ) <= " . $no_item_sold . "

                                        #group by bir.sales_id 
                                         group by bir.item_code     
                                        ORDER BY
                                            bir.transaction_no ASC

                                            ;
                                  ");
               // echo $this->nav->last_query();     //pang echo sa query                                                                      

          } else {
               $query = $this->nav->query("
                                      SELECT 
                                              *,sum(bir.net_amount) as total_net_amount,sum(bir.quantity) as total_qty
                                      FROM 
                                            nav_tran_sales_bir_consolidated AS bir
                                     INNER JOIN (
                                                     SELECT vendor_code, MAX(CASE WHEN type_ = 'SI' THEN 'SI' ELSE type_ END) AS type_
                                                     FROM nav_vendor                  
                                                     GROUP BY vendor_code
                                                ) AS vendor ON vendor.vendor_code = bir.vendor_no
                                      WHERE
                                            bir.db_id           " . $data_b . "
                                            AND bir.store_no    = '" . $store . "'
                                            AND date(bir.date_) = '" . $acc_date . "'                                           
                                            AND ((vendor.type_    " . $where . $where_main . "                                   

                                        group by bir.sales_id 
                                             
                                        ORDER BY
                                            bir.transaction_no ASC

                                            ;
                                  ");
               // $query = $this->nav->query("
               //                       SELECT 
               //                               *
               //                       FROM 
               //                             nav_tran_sales_bir_consolidated AS bir
               //                       INNER JOIN (
               //                                         SELECT vendor_code, MAX(type_) AS max_type
               //                                         FROM nav_vendor
               //                                         GROUP BY vendor_code
               //                                  ) AS vendor ON vendor.vendor_code = bir.vendor_no
               //                       WHERE
               //                             bir.db_id           = '".$database_id."'
               //                             AND bir.store_no    = '".$store."'
               //                             AND bir.date_       = '".$acc_date."'                                           
               //                             AND (vendor.type_    ".$where.$where_main."                                           
               //                             AND vendor.department = '".$department."'  

               //                         group by bir.sales_id 

               //                         ORDER BY
               //                             bir.transaction_no ASC

               //                             ;
               //                   ");
          }

          return $query->result_array();
     }




     function get_bir_si_entry_v3($database_id, $store, $acc_date, $pos_terminal, $total_net_sales, $no_item_sold, $vendor_type)
     {

          if ($vendor_type == 'SI') {
               $where = " = 'SI'  ";
               $where_main = " AND  bir.no_stock_posting = '0' ) ";
               $where_net = " AND  cons.no_stock_posting = '0') ";
               $where_qty = " AND  con.no_stock_posting = '0' ) ";
          } else {
               $where = " != 'SI'  ";
               $where_main = ") OR (vendor.type_ = 'SI' AND bir.no_stock_posting = '1')";
               $where_net = ") OR (vend.type_ = 'SI' AND cons.no_stock_posting = '1')";
               $where_qty = ") OR (ven.type_ = 'SI' AND con.no_stock_posting = '1')";
          }

          if ($vendor_type == 'SI') {


               $query = $this->nav->query("
                                      SELECT 
                                              *
                                      FROM 
                                            nav_tran_sales_bir_consolidated AS bir
                                      INNER JOIN nav_vendor AS vendor ON vendor.vendor_code = bir.vendor_no
                                      WHERE
                                            bir.db_id           = '" . $database_id . "'
                                            AND bir.store_no    = '" . $store . "'
                                            AND bir.date_       = '" . $acc_date . "'
                                            AND pos_terminal_no = '" . $pos_terminal . "'
                                            AND (vendor.type_    " . $where . $where_main . "

                                            AND (
                                                  SELECT
                                                         SUM(net_amount)
                                                    FROM 
                                                         nav_tran_sales_bir_consolidated as cons
                                                    INNER JOIN nav_vendor AS vend ON vend.vendor_code = cons.vendor_no     
                                                  WHERE
                                                         cons.db_id           = '" . $database_id . "'
                                                    AND 
                                                         cons.store_no        = '" . $store . "'
                                                    AND
                                                         cons.date_           = '" . $acc_date . "'
                                                    AND 
                                                         cons.pos_terminal_no = '" . $pos_terminal . "'
                                                    AND
                                                         (vend.type_    " . $where . $where_net . "   

                                                ) <= " . $total_net_sales . "
                                            AND 
                                               (
                                                  select
                                                         sum(quantity)
                                                  FROM 
                                                         nav_tran_sales_bir_consolidated as con
                                                  INNER JOIN nav_vendor AS ven ON ven.vendor_code = con.vendor_no
                                                  WHERE
                                                         con.db_id           = '" . $database_id . "'
                                                    AND
                                                         con.store_no        = '" . $store . "'
                                                    AND 
                                                         con.date_           = '" . $acc_date . "'
                                                    AND
                                                         con.pos_terminal_no = '" . $pos_terminal . "'
                                                    AND
                                                         (ven.type_    " . $where . $where_qty . "       

                                               ) <= " . $no_item_sold . "

                                        group by bir.sales_id 
                                             
                                        ORDER BY
                                            bir.transaction_no ASC

                                            ;
                                  ");
          } else {
               $query = $this->nav->query("
                                      SELECT 
                                              *
                                      FROM 
                                            nav_tran_sales_bir_consolidated AS bir
                                      INNER JOIN nav_vendor AS vendor ON vendor.vendor_code = bir.vendor_no
                                      WHERE
                                            bir.db_id           = '" . $database_id . "'
                                            AND bir.store_no    = '" . $store . "'
                                            AND bir.date_       = '" . $acc_date . "'
                                            AND pos_terminal_no = '" . $pos_terminal . "'
                                            AND (vendor.type_    " . $where . $where_main . "                                           
                                              

                                        group by bir.sales_id 
                                             
                                        ORDER BY
                                            bir.transaction_no ASC

                                            ;
                                  ");
          }



          return $query->result_array();
     }
}
