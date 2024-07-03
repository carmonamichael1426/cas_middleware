<?php
$PDFContent = ''; 
if(isset($_POST['submit'])){ 
    if(!empty($_FILES["pdf"]["name"])){ 
        var_dump($_FILES["pdf"]["name"]);
      /*  $PDFfileName = basename($_FILES["pdf"]["name"]); 
        $PDFfileType = pathinfo($PDFfileName, PATHINFO_EXTENSION); 
         
        $allowTypes = array('pdf'); 
        var_dump($PDFfileType);
        if(in_array($PDFfileType, $allowTypes)){ 
            include 'vendor/autoload.php'; 
            $parser = new \Smalot\PdfParser\Parser(); 
             
            // Source file
            $PDFfile = $_FILES["pdf"]["tmp_name"]; 
            $PDF = $parser->parseFile($PDFfile); 
            $fileText = $PDF->getText(); 
             
            // line break 
            $PDFContent = nl2br($fileText); 
        }else{ 
            $PDFContent = '<p>only PDF file is allowed to upload.</p>'; 
        } */
    }else{ 
        $PDFContent = '<p>Please select a file.</p>'; 
    } 
} 
// Display content 
echo $PDFContent;

?>