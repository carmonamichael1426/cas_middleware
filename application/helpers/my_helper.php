<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('download_send_headers'))
{
function download_send_headers($filename, $data = null) {
ob_clean();
// disable caching
$now = gmdate("D, d M Y H:i:s");
header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
header("Last-Modified: {$now} GMT");

// force download
header("Content-Type: application/force-download");
header("Content-Type: application/octet-stream");
header("Content-Type: application/download");

// disposition / encoding on response body
header("Content-Disposition: attachment;filename={$filename}");
header("Content-Transfer-Encoding: binary");


echo $data;
}
}

if ( ! function_exists('array_group_by'))
{
function array_group_by(array $arr, callable $key_selector) {
$result = array();
foreach ($arr as $i) {
$key = call_user_func($key_selector, $i);
$result[$key][] = $i;
}
return $result;
}
}

if ( ! function_exists('ellipsis'))
{
function ellipsis($str, $length=30) {
if(strlen($str) > $length)
{
$str = substr($str, 0, $length) . '...';
}

return $str;
}
}

if ( ! function_exists('arrayToString'))
{
function arrayToString( array &$row_fields, $delimiter = ',', $enclosure = '"', $encloseAll = false, $eol = PHP_EOL, $nullToMysqlNull = false ) {
$delimiter_esc = preg_quote($delimiter, '/');
$enclosure_esc = preg_quote($enclosure, '/');

$output = array();
foreach ($row_fields as $fields) {
$row = array();
foreach ( $fields as $field ) {
if ($field === null && $nullToMysqlNull) {
$row[] = 'NULL';
continue;
}

// Enclose fields containing $delimiter, $enclosure or whitespace
if ( $encloseAll || preg_match( "/(?:${delimiter_esc}|${enclosure_esc})/", $field ) ) {
$row[] = $enclosure . str_replace($enclosure, $enclosure . $enclosure, $field) . $enclosure;
}
else {
$row[] = $field;
}
}

$output[] = implode( $delimiter, $row );
}

return implode($eol, $output).$eol;
}
}


if ( ! function_exists('getSequenceNo')){


/*
ARGUMENTS
# Seq (Array)
[
code
number
lpad
pad_string
definition
]

# Option (Array)
[
table
column
]

# Use (Boolean) // If FALSE returns the next sequence no.
// If TRUE return the next sequence no. and update the record to have a new sequence no.)



*/

function getSequenceNo(Array $seq, Array $option, $useNext = false){
$seq = (object) $seq;
$option = (object) $option;

$CI = &get_instance();

$db = &$CI->db;


$query = $db->query("
SELECT
*,
concat( `code`, lpad(`number`, `lpad`, `pad_string`)) as sequence
FROM
sequence
WHERE
code = '$seq->code'
LIMIT
1
");


if($query->num_rows() == 0)
{
unset($seq->table);

$db->insert('sequence', (array)$seq);
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);


}else{
$seq = $query->row();

$seq->number++;
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);

}


$update_result = true;


do {
$existing = true;
while ($existing) {
$fquery = $db->query("
SELECT
*
FROM
$option->table
WHERE
$option->column = '$seq->sequence'
");

if($fquery->num_rows() == 0){
$existing = false;

if(!$useNext){
return $seq->sequence;
}

}else{

if(!$useNext){
$db->update('sequence', ['number' => $seq->number], ['code'=>$seq->code]);
}

$seq->number++;
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);
}
}

$db->update('sequence', ['number' => $seq->number], ['code'=>$seq->code]);

if($useNext && $db->affected_rows() == 0){
$update_result = false;
$seq->number++;
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);
}else{
$update_result = true;
}

} while(!$update_result);

return $seq->sequence;

}


function getSequenceNo2(Array $seq, Array $option, $useNext = false){
$seq = (object) $seq;
$option = (object) $option;

$CI = &get_instance();
$db = &$CI->db;

if (!$db->table_exists($seq->table))
{

$dbforge = $CI->dbforge();

$dbforge->add_field([
'id'=> [
'type' =>'INT',
'unsigned' =>TRUE,
'auto_increment' =>TRUE,
'null' =>FALSE
],
'generated_by' => [
'type' => 'INT',
'constraint' => '10',
'null' => TRUE,
]
]);

$dbforge->add_key('id', TRUE);
$dbforge->create_table($seq->table);

$db->query("ALTER TABLE $seq->table AUTO_INCREMENT = $seq->number");

}


/*$sequence = getSequenceNo(
[
'code' => "B",
'number' => '1',
'lpad' => '7',
'pad_string' => '0',
'description' => "SOA No. Sequence"
],
[
'table' => 'soa',
'column' => 'soa_no'
],
$useNext)*/


$query = $db->query("
SELECT
count(id) as `count`,
max(id) as `max`
FROM
$seq->table;
")->row();


if($query->count == 0)
{
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);
}else{
$seq->number = $query->max++;
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);
}

$existing = true;

while ($existing) {
$fquery = $db->query("
SELECT
*
FROM
$option->table
WHERE
$option->column = '$seq->sequence'
");

if($fquery->num_rows() == 0){
$existing = false;

if(!$useNext){
return $seq->sequence;
}


}else{

if(!$useNext){
$db->query("ALTER TABLE $seq->table AUTO_INCREMENT = $seq->number");
}

$seq->number++;
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);
}
}

$db->insert($seq->table, ['generated_by'=> $CI->session->userdata('id')]);

$seq->number = $db->insert_id();
$seq->sequence = $seq->code. str_pad($seq->number, $seq->lpad, $seq->pad_string, STR_PAD_LEFT);

return $seq->sequence;

}

}

if( ! function_exists('JSONResponse')){
function JSONResponse($data){
header('Content-Type: application/json');
die(json_encode($data));
}
}

if( ! function_exists('save_uploaded_file')){

function save_uploaded_file($targetPath, $field_name, $tenant_id="")
{
$date = new DateTime();
$timeStamp = $date->getTimestamp();
$filename;

$tmpFilePath = $_FILES[$field_name]['tmp_name'];
//Make sure we have a filepath
if ($tmpFilePath != "")
{
//Setup our new file path
$filename = $tenant_id . $timeStamp . $_FILES[$field_name]['name'];
$newFilePath = $targetPath . $filename;
//Upload the file into the temp dir
move_uploaded_file($tmpFilePath, $newFilePath);
}

return $filename;
}
}


if ( !function_exists('validDate'))
{
function validDate($date){

$vdate = date('Y-m-d', strtotime($date));

if($vdate == '1970-01-01') {
return false;
}

list($year, $month, $day) = explode('-', $vdate);
if(!checkdate ( $month, $day, $year )){
return false;
}

return preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$date) ? true : false;
}
}