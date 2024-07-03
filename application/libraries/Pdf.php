<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
require_once dirname(__FILE__) . '/fpdf/fpdf.php';
class Pdf extends FPDF
{
    function __construct()
    {
        parent::__construct();
    }

    function Footer()
    {
        $this->SetY(-14);
        $this->SetFont('Arial','',8);
        $this->Cell(15,0,'Run Date:',0,0,'L');
        $this->Cell(80,0,date('F d, Y: H:m:s A'),0,0,'L');
        $this->SetFont('Arial','I',7);
        $this->Cell(80,0,'Page '.$this->PageNo(),0,0,'C');
        $this->SetY(-12);
    }
}

class newPDF extends FPDF
{ 
    public $__currentY=0;         
    function Header()
    {
        parent::Header();
        $this->__currentY = $this->GetY();
    }
}