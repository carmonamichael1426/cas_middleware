<?php
	$get_connection = $this->BIR_mod->get_connection($database_id);
         foreach($get_connection  as $con)
         {
                $username    = $con['username'];
                $password    = $con['password']; 
                $connection  = $con['db_name'];
                $sub_db_name = $con['sub_db_name'];
         }
         $connect      = odbc_connect($connection, $username, $password);

         $table        = '['.$sub_db_name.'$Trans_ Sales Entry]';


         $table_query  = "SELECT COUNT(*) AS EntryCount FROM ".$table."WHERE [Item No_]= '629305'";
         $result       = odbc_exec($connect, $table_query);
         if ($result) 
         {
                // Fetch the result row
                $row = odbc_fetch_array($result);
                
                // Retrieve the EntryCount value
                $entryCount = $row['EntryCount'];
                
                // Output the EntryCount value
                echo "Entry Count: " . $entryCount;
         }
         else
         {
                // Error handling if query execution fails
                echo "Query execution failed.";
         }



         $table_query  = "SELECT  * FROM ".$table." WHERE [Item No_]= '629305'";
         $table_row    = odbc_exec($connect, $table_query);

         $counter = 0;
         if(odbc_num_rows($table_row) > 0)
         {
             while(odbc_fetch_row($table_row))
             {
                 $vendor = odbc_result($table_row, 6); 
                 $counter ++;
                 echo  "<br>".$vendor."--line->".$counter;
                 flush();
                 ob_flush();
                 usleep(100); 
             }
         }  
 ?>